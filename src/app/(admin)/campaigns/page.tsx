'use client';

import React from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { Plus, Eye } from 'lucide-react';
import Link from 'next/link';
import { MOCK_CAMPAIGNS } from '@/lib/mock-data';

import { useI18n } from '@/lib/i18n/I18nContext';

export default function CampaignsPage() {
    const { t } = useI18n();

    const columns = [
        { title: t.campaigns.wizard.name, dataIndex: 'name', key: 'name', render: (t: string) => <span className="font-medium">{t}</span> },
        {
            title: t.campaigns.steps.channel, dataIndex: 'channel', key: 'channel', render: (t: string) => (
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${t === 'whatsapp' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                    {t.toUpperCase()}
                </span>
            )
        },
        {
            title: t.common.status, dataIndex: 'status', key: 'status', render: (s: string) => {
                const colors = {
                    completed: 'bg-emerald-50 text-emerald-600',
                    processing: 'bg-blue-50 text-blue-600',
                    draft: 'bg-slate-100 text-slate-600',
                    failed: 'bg-rose-50 text-rose-600'
                };
                return (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${(colors as any)[s] || 'bg-slate-100'}`}>
                        {s.toUpperCase()}
                    </span>
                );
            }
        },
        {
            title: t.common.actions,
            key: 'action',
            render: (_: any, r: any) => (
                <Link href={`/campaigns/${r.id}`}>
                    <Button size="small" icon={<Eye size={14} />}>{t.common.view}</Button>
                </Link>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.campaigns.title}</h2>
                    <p className="text-gray-500">{t.campaigns.subtitle}</p>
                </div>
                <Link href="/campaigns/create">
                    <Button type="primary" icon={<Plus size={16} />}>{t.campaigns.create}</Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <Table dataSource={MOCK_CAMPAIGNS} columns={columns} rowKey="id" />
            </div>
        </div>
    );
}
