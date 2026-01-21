'use client';

import React from 'react';
import { Layout, Avatar, Dropdown, theme } from 'antd';
import { User as UserIcon, Bell, Globe } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n/I18nContext';

const { Header: AntHeader } = Layout;

const Header = () => {
    const { token } = theme.useToken();
    const { user } = useAppStore();
    const { locale, setLocale, t } = useI18n();

    const userMenu = [
        { key: 'profile', label: 'Profile' },
        { key: 'logout', label: 'Logout', danger: true },
    ];

    const langMenu = [
        { key: 'en', label: 'English' },
        { key: 'cn', label: '中文' },
    ];

    return (
        <AntHeader style={{ background: token.colorBgContainer, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="border-b border-gray-100 sticky top-0 z-10">
            <div>
                {/* Breadcrumb could go here */}
                <span className="text-gray-500 text-sm">Workspace / Default</span>
            </div>

            <div className="flex items-center gap-4">
                <Dropdown menu={{ items: langMenu, onClick: ({ key }) => setLocale(key as any) }}>
                    <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg flex items-center gap-1 transition-colors">
                        <Globe size={18} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700 uppercase">{locale}</span>
                    </div>
                </Dropdown>

                <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </div>

                <Dropdown menu={{ items: userMenu }}>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 px-2 rounded-lg transition-colors">
                        <Avatar size="small" icon={<UserIcon size={16} />} style={{ backgroundColor: token.colorPrimary }} />
                        <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
                    </div>
                </Dropdown>
            </div>
        </AntHeader>
    );
};

export default Header;
