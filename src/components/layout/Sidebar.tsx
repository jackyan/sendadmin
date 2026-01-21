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
        <Sider width={240} theme="light" className="border-r border-gray-200 h-screen fixed left-0 top-0 z-10">
            <div className="h-16 flex items-center justify-center border-b border-gray-100">
                <h1 className="text-xl font-bold text-indigo-600 tracking-tight">SendAdmin</h1>
            </div>
            <Menu
                mode="inline"
                selectedKeys={[activeKey]}
                style={{ borderRight: 0, paddingTop: 16 }}
                items={menuItems}
                onClick={({ key }) => router.push(key)}
            />
        </Sider>
    );
};

export default Sidebar;
