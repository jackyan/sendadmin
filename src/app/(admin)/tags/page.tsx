'use client';

import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Input, Modal, Form } from 'antd';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

const MOCK_TAGS = [
    { id: '1', name: 'VIP', count: 500, created: '2023-01-10' },
    { id: '2', name: 'Leads', count: 1200, created: '2023-01-12' },
    { id: '3', name: 'Q1 Webinar', count: 350, created: '2023-01-20' },
];

export default function TagsPage() {
    const { t } = useI18n();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleCreate = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const columns = [
        {
            title: t.tags?.table?.name || 'Tag Name', // Fallback until translations updated
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Tag color="blue">{text}</Tag>
        },
        {
            title: t.tags?.table?.count || 'Contacts',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: t.common.time,
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: t.common.actions,
            key: 'action',
            render: (_: any) => (
                <Space size="middle">
                    <Button type="text" icon={<Edit size={16} />} />
                    <Button type="text" danger icon={<Trash2 size={16} />} />
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.nav.tags || 'Tags'}</h2>
                    <p className="text-gray-500">{t.tags?.subtitle || 'Manage contact tags and segments.'}</p>
                </div>
                <Button type="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
                    {t.tags?.create || 'New Tag'}
                </Button>
            </div>

            <Card bordered={false} className="shadow-sm">
                <div className="mb-4 max-w-md">
                    <Input prefix={<Search size={16} className="text-gray-400" />} placeholder={t.common.search} />
                </div>
                <Table columns={columns} dataSource={MOCK_TAGS} rowKey="id" />
            </Card>

            <Modal title={t.tags?.create} open={isModalOpen} onOk={handleCreate} onCancel={() => setIsModalOpen(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label={t.tags?.table?.name} rules={[{ required: true }]}>
                        <Input placeholder="e.g. VIP Customers" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
