'use client';

import React, { useState } from 'react';
import { Steps, Card, Button, Form, Select, Input, Radio, Alert, Result, Divider } from 'antd';
import { User, MessageSquare, Link, Send, CheckCircle, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { MOCK_CHANNELS, MOCK_TEMPLATES } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n/I18nContext';



const CampaignWizard = () => {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [sending, setSending] = useState(false);
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

    const handleSend = () => {
        setSending(true);
        // Simulate API call
        setTimeout(() => {
            setSending(false);
            router.push('/campaigns/cp1'); // Redirect to mock detail
        }, 2000);
    };

    const steps = [
        { title: t.campaigns.steps.audience, icon: <User /> },
        { title: t.campaigns.steps.channel, icon: <Smartphone /> },
        { title: t.campaigns.steps.content, icon: <MessageSquare /> },
        { title: t.campaigns.steps.link, icon: <Link /> },
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
                            <Input placeholder="e.g. Q1 Webinar Invite" size="large" />
                        </Form.Item>
                        <Form.Item name="tags" label={t.campaigns.wizard.target} rules={[{ required: true }]}>
                            <Select mode="multiple" placeholder="Select tags" options={[{ label: 'VIP (500 users)', value: 'vip' }, { label: 'Leads (1200 users)', value: 'leads' }]} size="large" />
                        </Form.Item>
                        <Alert message="Estimated Audience Size: 1,700 contacts" type="info" showIcon />
                    </div>
                )}

                {/* Step 2: Channel */}
                {current === 1 && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <Form.Item name="channel" label="Select Channel" rules={[{ required: true }]}>
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
                            <Form.Item name="template" label="Message Template" rules={[{ required: true }]}>
                                <Select placeholder="Select a pre-approved template" options={MOCK_TEMPLATES.map(t => ({ label: t.name, value: t.id }))} />
                            </Form.Item>
                            <Form.Item name="custom_vars" label="Variables">
                                <Input placeholder="Enter value for {{name}}" disabled />
                                <div className="text-xs text-gray-400 mt-1">Variables are auto-filled from contact data.</div>
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
                        <Form.Item name="link_target" label="Interactive Landing Page (Question Set)" rules={[{ required: true }]}>
                            <Select placeholder="Select Question Set" options={[{ label: 'Q1 Survey', value: 'q1' }, { label: 'Product Feedback', value: 'q2' }]} />
                        </Form.Item>
                        <Alert
                            message="Unique Links Generated"
                            description="System will generate 1,700 unique short links. Clicks are tracked per user."
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
                            title="Ready to Send!"
                            subTitle="You are about to send messages to 1,700 contacts via WhatsApp."
                        />
                        <Divider />
                        <div className="grid grid-cols-2 text-left gap-4 bg-gray-50 p-6 rounded-lg">
                            <div>
                                <div className="text-gray-500 text-sm">Campaign Name</div>
                                <div className="font-medium">{form.getFieldValue('name')}</div>
                            </div>
                            <div>
                                <div className="text-gray-500 text-sm">Channel</div>
                                <div className="font-medium capitalize">{form.getFieldValue('channel')}</div>
                            </div>
                        </div>
                    </div>
                )}

            </Form>

            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                {current > 0 && <Button onClick={handlePrev}>{t.common.back}</Button>}
                {current < steps.length - 1 && <Button type="primary" onClick={handleNext}>{t.common.next}</Button>}
                {current === steps.length - 1 && <Button type="primary" loading={sending} onClick={handleSend} className="bg-green-600 hover:bg-green-700">{t.campaigns.wizard.ready}</Button>}
            </div>
        </Card>
    );
};

export default CampaignWizard;
