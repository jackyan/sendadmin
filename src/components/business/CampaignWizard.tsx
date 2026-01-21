'use client';

import React, { useState } from 'react';
import { Steps, Card, Button, Form, Select, Input, Radio, Alert, Result, Divider, Segmented, Upload, Modal, DatePicker } from 'antd';
import { User, MessageSquare, Link as LinkIcon, Send, CheckCircle, Smartphone, UploadCloud } from 'lucide-react';

const { Dragger } = Upload;
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { MOCK_CHANNELS, MOCK_TEMPLATES } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n/I18nContext';



const CampaignWizard = () => {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [sending, setSending] = useState(false);
    const [audienceType, setAudienceType] = useState<'tags' | 'import'>('tags');
    const { user } = useAppStore();
    const { t } = useI18n();

    const handleNext = async () => {
        try {
            await form.validateFields();
            setCurrent(current + 1);
        } catch (e) {
            // Validation failed
        }
    };

    const handlePrev = () => setCurrent(current - 1);

    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

    const handleSendNow = () => {
        setSending(true);
        // Simulate API call
        setTimeout(() => {
            setSending(false);
            router.push('/campaigns/cp1');
        }, 2000);
    };

    const handleScheduleConfirm = () => {
        setScheduleModalOpen(false);
        setSending(true);
        setTimeout(() => {
            setSending(false);
            router.push('/campaigns/cp1');
        }, 1500);
    };

    const steps = [
        { title: t.campaigns.steps.audience, icon: <User /> },
        { title: t.campaigns.steps.channel, icon: <Smartphone /> },
        { title: t.campaigns.steps.content, icon: <MessageSquare /> },
        { title: t.campaigns.steps.link, icon: <LinkIcon /> },
        { title: t.campaigns.steps.review, icon: <Send /> },
    ];

    return (
        <Card bordered={false} className="shadow-sm">
            <Steps current={current} items={steps.map(s => ({ title: s.title, icon: s.icon }))} className="mb-8" />

            <Form form={form} layout="vertical" initialValues={{ channel: 'whatsapp' }}>

                {/* Step 1: Audience */}
                {current === 0 && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <Form.Item name="name" label={t.campaigns.wizard.name} rules={[{ required: true }]}>
                            <Input placeholder={t.campaigns.wizard.namePlaceholder} size="large" />
                        </Form.Item>
                        <Form.Item name="audienceType" label={t.campaigns.wizard.target} initialValue="tags">
                            <Segmented
                                options={[
                                    { label: t.campaigns.wizard.audienceType.tags, value: 'tags' },
                                    { label: t.campaigns.wizard.audienceType.import, value: 'import' }
                                ]}
                                value={audienceType}
                                onChange={(val) => setAudienceType(val as 'tags' | 'import')}
                                block
                                className="mb-4"
                            />
                        </Form.Item>

                        {audienceType === 'tags' ? (
                            <Form.Item name="tags" rules={[{ required: true }]}>
                                <Select mode="multiple" placeholder={t.campaigns.wizard.selectTags} options={[{ label: `VIP (500 ${t.nav.contacts})`, value: 'vip' }, { label: `Leads (1200 ${t.nav.contacts})`, value: 'leads' }]} size="large" />
                            </Form.Item>
                        ) : (
                            <Form.Item name="file" rules={[{ required: true }]}>
                                <Dragger style={{ background: '#fff' }}>
                                    <p className="ant-upload-drag-icon">
                                        <UploadCloud />
                                    </p>
                                    <p className="ant-upload-text">{t.campaigns.wizard.upload.drag}</p>
                                    <p className="ant-upload-hint">{t.campaigns.wizard.upload.hint}</p>
                                </Dragger>
                            </Form.Item>
                        )}

                        <Alert
                            message={audienceType === 'tags' ? t.campaigns.wizard.estAudience : `${t.common.status}: 500 (${t.campaigns.wizard.audienceType.import})`}
                            type="info"
                            showIcon
                        />
                    </div>
                )}

                {/* Step 2: Channel */}
                {current === 1 && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <Form.Item name="channel" label={t.campaigns.wizard.selectChannel} rules={[{ required: true }]}>
                            <Radio.Group className="w-full grid grid-cols-2 gap-4">
                                {MOCK_CHANNELS.map(ch => (
                                    <Radio.Button key={ch.id} value={ch.type} className="h-24 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="font-bold capitalize">{ch.name}</div>
                                            <div className="text-xs text-gray-500">{ch.status}</div>
                                        </div>
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    </div>
                )}

                {/* Step 3: Content */}
                {current === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <Form.Item name="template" label={t.campaigns.wizard.template} rules={[{ required: true }]}>
                                <Select placeholder="Select a pre-approved template" options={MOCK_TEMPLATES.map(t => ({ label: t.name, value: t.id }))} />
                            </Form.Item>
                            <Form.Item name="custom_vars" label={t.campaigns.wizard.variables}>
                                <Input placeholder={t.campaigns.wizard.variablePlaceholder} disabled />
                                <div className="text-xs text-gray-400 mt-1">{t.campaigns.wizard.variableHelp}</div>
                            </Form.Item>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
                            <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                                <p className="text-sm">Hi <strong>John</strong>, welcome to our service! <br /><span className="text-blue-500">https://link.com/s/xyz</span></p>
                                <div className="text-right text-[10px] text-gray-400 mt-1">10:23 AM</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Link */}
                {current === 3 && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <Form.Item name="link_target" label={t.campaigns.wizard.landing} rules={[{ required: true }]}>
                            <Select placeholder={t.campaigns.wizard.selectLink} options={[{ label: 'Q1 Survey', value: 'q1' }, { label: 'Product Feedback', value: 'q2' }]} />
                        </Form.Item>
                        <Alert
                            message={t.campaigns.wizard.linkSuccess}
                            description={t.campaigns.wizard.linkDesc}
                            type="success"
                            showIcon
                        />
                    </div>
                )}

                {/* Step 5: Review */}
                {current === 4 && (
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <Result
                            icon={<CheckCircle className="text-indigo-600" size={64} />}
                            title={t.campaigns.wizard.review.title}
                            subTitle={t.campaigns.wizard.review.subtitle.replace('{count}', '1,700')}
                        />
                        <Divider />
                        <div className="grid grid-cols-2 text-left gap-4 bg-gray-50 p-6 rounded-lg">
                            <div>
                                <div className="text-gray-500 text-sm">{t.campaigns.wizard.review.campaignName}</div>
                                <div className="font-medium">{form.getFieldValue('name')}</div>
                            </div>
                            <div>
                                <div className="text-gray-500 text-sm">{t.campaigns.wizard.review.channel}</div>
                                <div className="font-medium capitalize">{form.getFieldValue('channel')}</div>
                            </div>
                        </div>
                    </div>
                )}

            </Form>

            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                {current > 0 && <Button size="large" onClick={handlePrev}>{t.common.back}</Button>}

                {current < steps.length - 1 && (
                    <Button size="large" type="primary" onClick={handleNext}>{t.common.next}</Button>
                )}

                {current === steps.length - 1 && (
                    <>
                        <Button size="large" onClick={() => setScheduleModalOpen(true)}>
                            {t.campaigns.wizard.review.schedule}
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            loading={sending}
                            onClick={handleSendNow}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {t.campaigns.wizard.review.sendNow}
                        </Button>
                    </>
                )}
            </div>

            <Modal
                title={t.campaigns.wizard.review.scheduleTitle}
                open={scheduleModalOpen}
                onCancel={() => setScheduleModalOpen(false)}
                onOk={handleScheduleConfirm}
                okText={t.campaigns.wizard.review.confirmSchedule}
            >
                <div className="py-8 text-center">
                    <DatePicker showTime size="large" className="w-full" placeholder={t.campaigns.wizard.review.selectTime} />
                </div>
            </Modal>
        </Card>
    );
};

export default CampaignWizard;
