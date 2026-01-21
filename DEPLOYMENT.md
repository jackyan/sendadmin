# 部署指南与运维文档 (Deployment & Operations Guide)

本指南详细说明了如何将本项目部署到远程 Linux 服务器（如 Ubuntu/CentOS），并使用 Nginx 作为 Web 服务器和反向代理。

## 1. 环境依赖 (Environment Requirements)

在开始部署前，请确保服务器已安装以下组件：

- **Node.js**: 建议版本 v18.x, v20.x 或最新的 v22.x (LTS)
- **Nginx**: 用于反向代理和静态资源服务
- **PM2**: 用于 Node.js 进程守护

### 安装 Node.js (使用 nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
node -v # 检查版本
```

### 安装 PM2
```bash
npm install pm2 -g
```

---

## 2. 部署流程 (Deployment Steps)

### 第一步：同步代码
将代码上传至服务器目录（如 `/var/www/send-admin`）：
```bash
git clone <your-repo-url> /var/www/send-admin
cd /var/www/send-admin
```

### 第二步：安装依赖与构建
```bash
npm install
npm run build
```

### 第三步：使用 PM2 启动应用
Next.js 默认运行在 3000 端口。如果您需要修改端口（例如修改为 8080）：

**方法 A：直接在启动命令中指定**
```bash
pm2 start npm --name "send-admin" -- start -- -p 8080
```

### [推荐] 方法 B：通过环境变量指定
```bash
PORT=8080 pm2 start npm --name "send-admin" -- start
```

---

## 3. 直接使用 PM2 部署 (不使用 Nginx)

如果您不想使用 Nginx，希望直接通过 IP 或域名访问应用，通常需要将应用运行在 **80** (HTTP) 或 **443** (HTTPS) 端口。

### 如何运行在 80 端口：
在 Linux 系统中，监听 1024 以下的端口通常需要 Root 权限。

```bash
# 使用 sudo 赋予权限并启动
sudo PORT=80 pm2 start npm --name "send-admin" -- start
```

### 注意事项：
- **访问方式**：部署后，您可以直接通过 `http://你的服务器IP` 访问。
- **性能**：Next.js 自带的服务器支持生产环境，但在处理超高并发和 SSL 证书管理方面，Nginx 通常更专业。
- **SSL (HTTPS)**：如果不使用 Nginx，您可能需要在代码层面使用自定义 Server (不推荐) 或通过负载均衡器/CDN (如 Cloudflare) 来处理 HTTPS。

---

## 4. Nginx 反向代理配置 (如果您之后决定使用)

创建 Nginx 配置文件（如 `/etc/nginx/sites-available/send-admin`）：

```nginx
server {
    listen 80;
    server_name your-domain.com; # 替换为您的域名或 IP

    # 开启 Gzip 压缩提升效率
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    location / {
        proxy_pass http://localhost:3000; # 转发到 Next.js
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # 客户端真实 IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源长期缓存 (可选)
    location /_next/static {
        proxy_pass http://localhost:3000/_next/static;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

激活配置并重启 Nginx：
```bash
ln -s /etc/nginx/sites-available/send-admin /etc/nginx/sites-enabled/
nginx -t # 检查语法
systemctl restart nginx
```

---

## 4. 常见问题解决 (FAQ & Troubleshooting)

### Q: 访问页面出现 502 Bad Gateway
- **原因**：Next.js 应用未启动或端口被占用。
- **解决**：运行 `pm2 status` 检查应用状态。如果显示 `errored`，查看日志：`pm2 logs send-admin`。

### Q: 构建失败 (JavaScript heap out of memory)
- **原因**：由于服务器内存不足，构建过程崩溃。
- **解决**：增加 Swap 交换分区，或在构建时增加 Node 内存限制：
  `NODE_OPTIONS="--max-old-space-size=2048" npm run build`

### Q: 静态资源 (CSS/JS) 加载 404
- **原因**：Nginx 的 `location /_next/static` 配置路径不正确。
- **解决**：确保 Nginx 配置中的 `proxy_pass` 与端口一致，或者直接将静态资源指向文件系统（不推荐，反向代理更简单）。

### Q: 如何更新代码？
```bash
cd /var/www/send-admin
git pull
npm install
npm run build
pm2 restart send-admin
```

### Q: 域名无法访问 (Connection Refused)
- **原因**：防火墙未开放 80/443 端口。
- **解决**：使用 `ufw allow 80` 和 `ufw allow 443` (Ubuntu) 或检查云服务器的安全组设置。

---

## 5. 安全建议 (Recommended Security)

> [!TIP]
> 1. **启用 HTTPS**: 强烈建议使用 [Certbot](https://certbot.eff.org/) 安装 Let's Encrypt 证书。
> 2. **禁用 Root 运行**: 建议使用普通用户部署并管理 PM2 进程。
> 3. **环境变量管理**: 敏感信息（如 API Key）应存储在 `.env.production` 文件中，且不要提交到 Git。
