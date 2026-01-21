import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useI18n } from '@/lib/i18n/I18nContext';

interface TemplateModalProps {
    open: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const { TextArea } = Input;

export default function TemplateModal({ open, onCancel, onOk }: TemplateModalProps) {
    const { t } = useI18n();
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
            // Default values
            form.setFieldsValue({
                tags: ['VIP'],
                content: 'Hello {{1}}, welcome to our exclusive community! Here is a 20% discount code for your first purchase: {{2}}. Link: {auto_generated_link}',
                language: 'en_US',
                category: 'MARKETING'
            });
        }
    }, [open, form]);

    return (
        <Modal
            title={t.templates.create}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={t.common.save}
            cancelText={t.common.cancel}
            width={600}
        >
            <Form form={form} layout="vertical" onFinish={onOk}>
                <Form.Item name="name" label={t.templates.fields.name} rules={[{ required: true }]}>
                    <Input placeholder="welcome_offer_v3" />
                </Form.Item>

                <Form.Item name="tags" label="选择群体标签" help="选择目标用户群体，系统将根据群体标签自动生成智能问答链接。" rules={[{ required: true }]}>
                    <Select mode="tags" options={[
                        { label: 'VIP 用户', value: 'VIP' },
                        { label: '潜在客户 (Lead)', value: 'Lead' },
                        { label: '新注册用户', value: 'New' }
                    ]} />
                </Form.Item>

                <Form.Item name="content" label={t.templates.fields.content} rules={[{ required: true }]}>
                    <TextArea rows={6} placeholder="输入模板内容，使用 {{1}} 作为占位符..." />
                </Form.Item>

                <Form.Item name="language" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="category" hidden>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
