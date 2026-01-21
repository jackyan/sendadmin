'use client';

import React, { useState } from 'react';
import { Button, Table, Tag, Space, Input, Modal, Form, message } from 'antd';
import { Plus, Search, Copy, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { MOCK_LINKS } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function LinksPage() {
    const { t } = useI18n();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        message.success('Link copied!');
    };

    const columns = [
        {
            title: t.links.table.title,
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => <span className="font-medium text-indigo-900">{text}</span>
        },
        {
            title: t.links.table.url,
            dataIndex: 'id', // Simulating short link from ID
            key: 'url',
            render: (id: string) => {
                const url = `https://ln.k/${id}`;
                return (
                    <div className="flex items-center gap-2 group cursor-pointer p-1 rounded hover:bg-gray-50" onClick={() => handleCopy(url)}>
                        <span className="text-blue-500 font-mono text-sm">{url}</span>
                        <Copy size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                );
            }
        },
        {
            title: 'Target',
            dataIndex: 'target',
            key: 'target',
            render: (text: string) => <Tag>{text}</Tag>
        },
        {
            title: t.links.table.clicks,
            dataIndex: 'clicks',
            key: 'clicks',
            render: (count: number) => <span className="font-bold">{count}</span>
        },
        {
            title: t.links.table.created,
            dataIndex: 'created',
            key: 'created',
            render: (date: string) => <span className="text-gray-500">{date}</span>
        },
        {
            title: t.common.actions,
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button size="small" icon={<ExternalLink size={14} />} href={`https://ln.k/${record.id}`} target="_blank" />
                </Space>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.links.title}</h2>
                    <p className="text-gray-500">{t.links.subtitle}</p>
                </div>
                <Button type="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
                    {t.links.create}
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                    <Input
                        prefix={<Search size={16} className="text-gray-400" />}
                        placeholder={t.common.search}
                        className="max-w-md"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </div>
                <Table
                    dataSource={MOCK_LINKS}
                    columns={columns}
                    rowKey="id"
                />
            </div>

            <Modal
                title={t.links.create}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => {
                    message.success('Link created (Mock)');
                    setIsModalOpen(false);
                }}
            >
                <Form layout="vertical">
                    <Form.Item label="Link Title" required>
                        <Input placeholder="e.g. Q1 Campaign Landing" />
                    </Form.Item>
                    <Form.Item label="Destination URL" required>
                        <Input placeholder="https://example.com/landing-page" prefix={<LinkIcon size={14} />} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

