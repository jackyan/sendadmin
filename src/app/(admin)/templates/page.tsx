'use client';

import React, { useState } from 'react';
import { Button, Input, Tabs, Row, Col, Space } from 'antd';
import { Plus, Search, Filter } from 'lucide-react';
import TemplateCard from '@/components/shared/TemplateCard';
import TemplateModal from '@/components/business/TemplateModal';
import { MOCK_TEMPLATES } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n/I18nContext';

const { TabPane } = Tabs;

export default function TemplatesPage() {
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);

    const filteredTemplates = MOCK_TEMPLATES.filter(template => {
        if (activeTab === 'all') return true;
        return template.status === activeTab;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.templates.title}</h2>
                    <p className="text-gray-500">{t.templates.subtitle}</p>
                </div>
                <Button type="primary" icon={<Plus size={16} />} size="large" onClick={() => setModalOpen(true)}>
                    {t.templates.create}
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    tabBarStyle={{ marginBottom: 24 }}
                    items={[
                        { label: t.templates.status.all, key: 'all' },
                        { label: t.templates.status.approved, key: 'approved' },
                        { label: t.templates.status.pending, key: 'pending' },
                        { label: t.templates.status.rejected, key: 'rejected' },
                    ]}
                />

                {/* Search Bar within tabs area or above grid */}
                <div className="flex gap-4 mb-6">
                    <Input
                        prefix={<Search size={16} className="text-gray-400" />}
                        placeholder={t.common.search}
                        className="max-w-md"
                    />
                    <Button icon={<Filter size={16} />}>{t.common.filters}</Button>
                </div>

                <Row gutter={[24, 24]}>
                    {filteredTemplates.map(template => (
                        <Col xs={24} md={12} xl={8} key={template.id}>
                            <TemplateCard template={template} />
                        </Col>
                    ))}
                </Row>
                <TemplateModal
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    onOk={(values) => {
                        console.log('Created Template', values);
                        setModalOpen(false);
                    }}
                />
            </div>
        </div>
    );
}

