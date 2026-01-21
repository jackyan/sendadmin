'use client';

import React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Layout style={{ minHeight: '100vh', background: '#F3F4F6' }}>
            <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center', background: 'transparent' }}>
                Antigravity Messaging ©2026
            </Footer>
        </Layout>
    );
}
