'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Send,
    Link as LinkIcon,
    FileText,
    Settings,
    Layers
} from 'lucide-react';

import { useI18n } from '@/lib/i18n/I18nContext';

const { Sider } = Layout;

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useI18n();

    const menuItems = [
        { key: '/dashboard', icon: <LayoutDashboard size={18} />, label: t.nav.dashboard },
        { key: '/contacts', icon: <Users size={18} />, label: t.nav.contacts },
        { key: '/tags', icon: <Users size={18} />, label: t.nav.tags },
        { key: '/connectors', icon: <Layers size={18} />, label: t.nav.connectors },
        { key: '/templates', icon: <MessageSquare size={18} />, label: t.nav.templates },
        { key: '/campaigns', icon: <Send size={18} />, label: t.nav.campaigns },
        { key: '/links', icon: <LinkIcon size={18} />, label: t.nav.links },
        { key: '/reports', icon: <FileText size={18} />, label: t.nav.reports },
        { key: '/settings', icon: <Settings size={18} />, label: t.nav.settings },
    ];

    // Determine active key (handle sub-routes)
    const activeKey = menuItems.find(item => pathname.startsWith(item.key))?.key || '/dashboard';

    return (
        <Sider width={260} className="border-r border-slate-800 h-screen fixed left-0 top-0 z-10" style={{ background: '#0f172a' }}>
            <div className="h-16 flex items-center justify-center border-b border-slate-800/50">
                <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Send size={18} className="text-white" />
                    </div>
                    SendAdmin
                </h1>
            </div>
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[activeKey]}
                style={{ background: 'transparent', borderRight: 0, paddingTop: 24, paddingLeft: 12, paddingRight: 12 }}
                items={menuItems}
                onClick={({ key }) => router.push(key)}
                className="custom-dark-menu"
            />
        </Sider>
    );
};

export default Sidebar;
