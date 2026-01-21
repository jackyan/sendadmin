'use client';

import React, { useState } from 'react';
import { Button, Table, Tag, Space, Input, Modal, Form, message } from 'antd';
import { Plus, Search, Copy, ExternalLink, Link as LinkIcon, Eye } from 'lucide-react';
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
            key: 'url',
            render: (_: any, record: any) => {
                const isCampaign = record.type === 'campaign';
                const url = isCampaign ? t.links.table.dynamic : `https://ln.k/${record.id}`;

                return (
                    <div
                        className={`flex items-center gap-2 group p-1 rounded ${!isCampaign ? 'cursor-pointer hover:bg-gray-50' : 'text-gray-400 italic'}`}
                        onClick={() => !isCampaign && handleCopy(url)}
                    >
                        <span className={`${!isCampaign ? 'text-blue-500' : ''} font-mono text-sm`}>{url}</span>
                        {!isCampaign && <Copy size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                );
            }
        },
        {
            title: t.links.table.source,
            dataIndex: 'type',
            key: 'type',
            render: (type: 'manual' | 'campaign') => (
                <Tag color={type === 'manual' ? 'blue' : 'purple'}>
                    {type === 'manual' ? t.links.sources.manual : t.links.sources.campaign}
                </Tag>
            )
        },
        {
            title: 'Target',
            dataIndex: 'target',
            key: 'target',
            render: (text: string) => <Tag color="default">{text}</Tag>
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
                    <Button
                        size="small"
                        type="text"
                        icon={<Eye size={14} />}
                        className="text-indigo-600 flex items-center hover:bg-indigo-50"
                        onClick={() => window.open(`/s/demo`, '_blank')}
                    >
                        {t.links.table.preview}
                    </Button>
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

