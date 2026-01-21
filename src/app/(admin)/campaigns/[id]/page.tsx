'use client';

import React, { useEffect, useState } from 'react';
import { Card, Progress, Row, Col, Tabs, Table, Tag, Button, Statistic, Space, Tooltip } from 'antd';
import { ArrowLeft, RefreshCw, AlertCircle, Download, CheckCircle, Smartphone, Play, Pause, Square } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import StatsCard from '@/components/dashboard/StatsCard';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const { t } = useI18n();
    const [percent, setPercent] = useState(45);
    const [status, setStatus] = useState('processing');

    const [isPaused, setIsPaused] = useState(false);

    // Simulation of progress
    useEffect(() => {
        if (status !== 'processing' || isPaused) return;

        const timer = setInterval(() => {
            setPercent(prev => {
                if (prev >= 100) {
                    setStatus('completed');
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5);
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [status, isPaused]);

    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);
    const handleStop = () => {
        setIsPaused(true);
        setStatus('failed');
    };

    const totalAudience = 1000;
    const failureCount = status === 'completed' ? 42 : Math.floor((percent / 100) * 42);
    const successSent = Math.floor((totalAudience * (percent / 100)) - failureCount);

    const failureData = [
        { key: '1', phone: '+1 555 0192', reason: 'Not on WhatsApp', time: '10:42 AM' },
        { key: '2', phone: '+1 555 0491', reason: 'Invalid Number', time: '10:43 AM' },
        { key: '3', phone: '+1 555 0111', reason: 'Rate Limited', time: '10:44 AM' },
    ];

    const clickData = [
        { key: '1', name: 'User 42', time: '10:45 AM', link: 'Question Set A' },
        { key: '2', name: 'User 12', time: '10:46 AM', link: 'Question Set A' },
    ];

    const statusLabel = t.campaignDetails.status[status as keyof typeof t.campaignDetails.status] || status.toUpperCase();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/campaigns">
                        <Button icon={<ArrowLeft size={16} />} type="text" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-gray-800">Q1 Webinar Invite</h2>
                            <Tag color={status === 'completed' ? 'green' : status === 'processing' ? 'blue' : 'red'}>{statusLabel}</Tag>
                            {status === 'processing' && (
                                <Space size="small">
                                    {!isPaused ? (
                                        <Button size="small" icon={<Pause size={14} />} onClick={handlePause}>{t.campaignDetails.controls.pause}</Button>
                                    ) : (
                                        <Button size="small" icon={<Play size={14} />} type="primary" onClick={handleResume}>{t.campaignDetails.controls.resume}</Button>
                                    )}
                                    <Button size="small" danger icon={<Square size={14} />} onClick={handleStop}>{t.campaignDetails.controls.stop}</Button>
                                </Space>
                            )}
                        </div>
                        <p className="text-gray-500">ID: {id} • Created on Jan 21, 2026</p>
                    </div>
                </div>
                {status === 'processing' && !isPaused && <Button loading>{t.campaignDetails.controls.sending}</Button>}
                {status === 'completed' && <Button icon={<Download size={16} />}>{t.common.export}</Button>}
            </div>

            <Card bordered={false} className="shadow-sm">
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="font-medium">{t.campaignDetails.sendingProgress}</span>
                        <span className="text-indigo-600 font-bold">{percent}%</span>
                    </div>
                    <Progress percent={percent} status="active" strokeColor="#4F46E5" showInfo={false} />
                </div>

                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={8}>
                        <Statistic title={t.campaignDetails.totalAudience} value={totalAudience} prefix={<Smartphone size={16} className="text-gray-400 mr-2" />} />
                    </Col>
                    <Col xs={24} sm={8}>
                        <Statistic title={t.campaignDetails.successSent} value={successSent} valueStyle={{ color: '#10B981' }} prefix={<CheckCircle size={16} className="text-green-500 mr-2" />} />
                    </Col>
                    <Col xs={24} sm={8}>
                        <Statistic title={t.campaignDetails.failures} value={failureCount} valueStyle={{ color: '#EF4444' }} prefix={<AlertCircle size={16} className="text-red-500 mr-2" />} />
                    </Col>
                </Row>
            </Card>

            <div className="bg-white rounded-lg shadow-sm">
                <Tabs
                    defaultActiveKey="1"
                    tabBarStyle={{ paddingLeft: 24, paddingRight: 24 }}
                    items={[
                        {
                            key: '1',
                            label: t.campaignDetails.tabs.failures,
                            children: (
                                <div className="p-4">
                                    <Table dataSource={failureData} pagination={false}>
                                        <Table.Column title={t.campaignDetails.table.phone} dataIndex="phone" />
                                        <Table.Column title={t.campaignDetails.table.reason} dataIndex="reason" render={(t) => <Tag color="error">{t}</Tag>} />
                                        <Table.Column title={t.campaignDetails.table.time} dataIndex="time" />
                                    </Table>
                                </div>
                            )
                        },
                        {
                            key: '2',
                            label: t.campaignDetails.tabs.clicks,
                            children: (
                                <div className="p-4">
                                    <Table dataSource={clickData} pagination={false}>
                                        <Table.Column title={t.nav.contacts} dataIndex="name" />
                                        <Table.Column title="Link Target" dataIndex="link" />
                                        <Table.Column title={t.campaignDetails.table.time} dataIndex="time" />
                                    </Table>
                                </div>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
}
