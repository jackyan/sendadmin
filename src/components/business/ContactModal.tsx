import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space } from 'antd';
import { useI18n } from '@/lib/i18n/I18nContext';

interface ContactModalProps {
    open: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
    initialValues?: any;
}

export default function ContactModal({ open, onCancel, onOk, initialValues }: ContactModalProps) {
    const { t } = useI18n();
    const [form] = Form.useForm();

    // Reset form when modal opens or initialValues change
    useEffect(() => {
        if (open) {
            form.resetFields();
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.setFieldsValue({ tags: [], status: 'active', channel: 'whatsapp' });
            }
        }
    }, [open, initialValues, form]);

    return (
        <Modal
            title={initialValues ? t.common.edit : t.contacts.addContact}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={t.common.save}
            cancelText={t.common.cancel}
        >
            <Form form={form} layout="vertical" onFinish={onOk}>
                <Form.Item name="name" label={t.contacts.fields.name} rules={[{ required: true }]}>
                    <Input placeholder="John Doe" />
                </Form.Item>
                <Form.Item name="phone" label={t.contacts.fields.phone} rules={[{ required: true }]}>
                    <Input placeholder="+1234567890" />
                </Form.Item>
                <Form.Item name="channel" label={t.contacts.fields.channel} rules={[{ required: true }]}>
                    <Select options={[
                        { label: 'WhatsApp', value: 'whatsapp' },
                        { label: 'Telegram', value: 'telegram' },
                        { label: 'SMS', value: 'sms' }
                    ]} />
                </Form.Item>
                <Form.Item name="email" label={t.contacts.fields.email}>
                    <Input placeholder="john@example.com" />
                </Form.Item>
                <Form.Item name="tags" label={t.contacts.fields.tags}>
                    <Select mode="tags" placeholder="VIP, Lead..." options={[
                        { label: 'VIP', value: 'VIP' },
                        { label: 'Lead', value: 'Lead' },
                        { label: 'New', value: 'New' }
                    ]} />
                </Form.Item>
                <Form.Item name="status" label={t.contacts.fields.status}>
                    <Select options={[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' }
                    ]} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
