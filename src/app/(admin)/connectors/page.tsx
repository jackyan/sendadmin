'use client';

import React from 'react';
import { Row, Col, Alert } from 'antd';
import ChannelCard from '@/components/business/ChannelCard';
import { MOCK_CHANNELS } from '@/lib/mock-data';

import { useI18n } from '@/lib/i18n/I18nContext';

export default function ConnectorsPage() {
    const { t } = useI18n();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.connectors.title}</h2>
                    <p className="text-gray-500">{t.connectors.subtitle}</p>
                </div>
            </div>

            <Alert
                message="Compliance Warning"
                description="WhatsApp requires all business templates to be pre-approved. Ensure your account is verified by Meta."
                type="warning"
                showIcon
                closable
            />

            <Row gutter={[24, 24]}>
                {MOCK_CHANNELS.map((channel: any) => (
                    <Col xs={24} sm={12} lg={8} key={channel.id}>
                        <ChannelCard {...channel} quota="1000/day" />
                    </Col>
                ))}
                {/* Add a disconnected one for demo */}
                <Col xs={24} sm={12} lg={8}>
                    <ChannelCard id="new1" type="instagram" name="Instagram DM" status="disconnected" />
                </Col>
            </Row>
        </div>
    );
}
