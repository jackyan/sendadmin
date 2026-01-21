'use client';

import React from 'react';
import { Row, Col, Card, Table, Tag, Progress, Button, Space } from 'antd';
import { Send, CheckCircle, MousePointer, Users, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatsCard from '@/components/dashboard/StatsCard';
import { MOCK_CAMPAIGNS } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function DashboardPage() {
    const { t } = useI18n();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    const columns = [
        {
            title: t.dashboard.campaignName,
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span className="font-medium text-indigo-900">{text}</span>,
        },
        {
            title: t.common.status,
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === 'completed' ? 'success' : status === 'processing' ? 'processing' : 'default';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: t.common.progress,
            key: 'progress',
            render: (_: any, record: any) => {
                const percent = record.total > 0 ? Math.round((record.sent / record.total) * 100) : 0;
                return <Progress percent={percent} size="small" status={record.status === 'failed' ? 'exception' : 'active'} />;
            }
        },
        {
            title: t.common.channel,
            dataIndex: 'channel',
            key: 'channel',
            render: (channel: string) => <Tag>{channel}</Tag>
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.dashboard.title}</h2>
                    <p className="text-gray-500">{t.dashboard.subtitle}</p>
                </div>
                <div className="flex gap-2">
                    <Button icon={<RefreshCw size={16} />} loading={loading} onClick={handleRefresh}>{t.common.refresh}</Button>
                    <Button type="primary" icon={<Send size={16} />} onClick={() => router.push('/campaigns/create')}>{t.campaigns.create}</Button>
                </div>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title={t.dashboard.stats.sent}
                        value={12543}
                        prefix={<Send size={18} className="mr-2 text-indigo-500" />}
                        trend={12}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title={t.dashboard.stats.success}
                        value="98.5%"
                        prefix={<CheckCircle size={18} className="mr-2 text-green-500" />}
                        trend={0.5}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title={t.dashboard.stats.click}
                        value="24.2%"
                        prefix={<MousePointer size={18} className="mr-2 text-orange-500" />}
                        trend={-2.1}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatsCard
                        title={t.dashboard.stats.newContacts}
                        value={850}
                        prefix={<Users size={18} className="mr-2 text-blue-500" />}
                        trend={8.4}
                    />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title={t.dashboard.recentCampaigns}>
                        <Table
                            dataSource={MOCK_CAMPAIGNS}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title={t.dashboard.systemHealth} className="h-full">
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{t.dashboard.whatsappConnector}</span>
                                    <Tag color="success">{t.dashboard.healthy}</Tag>
                                </div>
                                <Progress percent={100} showInfo={false} strokeColor="#10B981" size="small" />
                                <div className="text-xs text-gray-400 mt-1">Latency: 45ms</div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{t.dashboard.telegramConnector}</span>
                                    <Tag color="success">{t.dashboard.healthy}</Tag>
                                </div>
                                <Progress percent={100} showInfo={false} strokeColor="#10B981" size="small" />
                                <div className="text-xs text-gray-400 mt-1">Latency: 120ms</div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
