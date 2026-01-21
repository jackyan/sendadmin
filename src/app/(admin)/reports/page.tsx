'use client';

import React from 'react';
import { Card, Table, Tabs, DatePicker, Button, Tag, Space, Tooltip } from 'antd';
import { Download, Filter, AlertCircle } from 'lucide-react';

import { useI18n } from '@/lib/i18n/I18nContext';

const { RangePicker } = DatePicker;

// Mock Data for logs
const SEND_LOGS = Array.from({ length: 20 }).map((_, i) => ({
    key: i,
    time: '2023-01-21 10:30:00',
    campaign: 'Q1 Webinar Invite',
    recipient: `+1 555 01${i.toString().padStart(2, '0')}`,
    channel: 'WhatsApp',
    status: i % 10 === 0 ? 'failed' : 'delivered'
}));

export default function ReportsPage() {
    const { t } = useI18n();
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.reports.title}</h2>
                    <p className="text-gray-500">{t.reports.subtitle}</p>
                </div>
                <Space>
                    <RangePicker />
                    <Button icon={<Filter size={16} />}>{t.common.filters}</Button>
                    <Button icon={<Download size={16} />}>{t.common.export}</Button>
                </Space>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <Tabs
                    defaultActiveKey="1"
                    tabBarStyle={{ paddingLeft: 24, paddingRight: 24 }}
                    items={[
                        {
                            key: '1',
                            label: t.reports.tabs.sendLogs,
                            children: (
                                <div className="p-4">
                                    <Table dataSource={SEND_LOGS} pagination={{ pageSize: 10 }}>
                                        <Table.Column title={t.reports.table.time} dataIndex="time" />
                                        <Table.Column title={t.reports.table.campaign} dataIndex="campaign" render={(t) => <span className="font-medium">{t}</span>} />
                                        <Table.Column title={t.reports.table.recipient} dataIndex="recipient" />
                                        <Table.Column title={t.reports.table.channel} dataIndex="channel" />
                                        <Table.Column title={t.reports.table.status} dataIndex="status" render={(s) => <Tag color={s === 'failed' ? 'red' : 'green'}>{s.toUpperCase()}</Tag>} />
                                    </Table>
                                </div>
                            )
                        },
                        {
                            key: '2',
                            label: (
                                <Tooltip title={t.reports.tabs.webhookHelp}>
                                    <Space>
                                        {t.reports.tabs.webhook}
                                        <AlertCircle size={14} className="text-gray-400" />
                                    </Space>
                                </Tooltip>
                            ),
                            children: (
                                <div className="p-4 flex justify-center items-center h-48 text-gray-400">
                                    No webhook events in the selected range.
                                </div>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
}
