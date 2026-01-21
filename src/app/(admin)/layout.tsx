'use client';

import React from 'react';
import { Layout } from 'antd';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const { Content } = Layout;

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Layout style={{ minHeight: '100vh' }} hasSider>
            <Sidebar />
            <Layout style={{ marginLeft: 260, background: '#f8fafc', transition: 'all 0.2s' }}>
                <Header />
                <Content style={{ margin: '20px', overflow: 'initial' }}>
                    <div className="w-full pb-12">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
