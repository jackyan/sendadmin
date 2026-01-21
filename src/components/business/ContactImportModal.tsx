'use client';

import React, { useState } from 'react';
import { Modal, Upload, Steps, Button, Select, Table, message, Tag } from 'antd';
import { useI18n } from '@/lib/i18n/I18nContext';
import { InboxOutlined, FileExcelOutlined, TagsOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';

interface ContactImportModalProps {
    open: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

const { Dragger } = Upload;


const ContactImportModal: React.FC<ContactImportModalProps> = ({ open, onCancel, onSuccess }) => {
    const { t } = useI18n();
    const [current, setCurrent] = useState(0);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [mapping, setMapping] = useState({ name: 'name', phone: 'phone', email: 'email' });
    const [tags, setTags] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleNext = () => setCurrent(current + 1);
    const handlePrev = () => setCurrent(current - 1);

    const handleImport = () => {
        setUploading(true);
        // Mock API call
        setTimeout(() => {
            setUploading(false);
            message.success('50 contacts imported successfully!');
            onSuccess();
        }, 1500);
    };

    const steps = [
        {
            title: t.importModal.step1,
            content: (
                <div className="py-8">
                    <Dragger
                        name="file"
                        multiple={false}
                        fileList={fileList}
                        beforeUpload={(file) => {
                            setFileList([file]);
                            return false; // Prevent auto upload
                        }}
                        onRemove={() => setFileList([])}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">{t.importModal.dragText}</p>
                        <p className="ant-upload-hint">{t.importModal.supportText}</p>
                    </Dragger>
                </div>
            ),
        },
        {
            title: t.importModal.step2,
            content: (
                <div className="py-8 space-y-4">
                    <p className="text-gray-500 mb-4">{t.importModal.mapTitle}</p>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <span className="font-medium">{t.importModal.fileCol}: "Full Name"</span>
                        <Select value={mapping.name} style={{ width: '100%' }} options={[{ label: 'Name', value: 'name' }, { label: 'Phone', value: 'phone' }]} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <span className="font-medium">{t.importModal.fileCol}: "Mobile"</span>
                        <Select value={mapping.phone} style={{ width: '100%' }} options={[{ label: 'Name', value: 'name' }, { label: 'Phone', value: 'phone' }]} />
                    </div>
                </div>
            ),
        },
        {
            title: t.importModal.step3,
            content: (
                <div className="py-8 space-y-4">
                    <p className="text-gray-500 mb-4">{t.importModal.tagTitle}</p>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center justify-center space-y-4">
                        <TagsOutlined style={{ fontSize: 24, color: '#6366f1' }} />
                        <Select
                            mode="tags"
                            style={{ width: '100%', maxWidth: 300 }}
                            placeholder={t.importModal.tagPlaceholder}
                            value={tags}
                            onChange={setTags}
                            options={[{ label: 'VIP', value: 'VIP' }, { label: 'New Lead', value: 'New Lead' }]}
                        />
                    </div>
                </div>
            )
        },
        {
            title: t.importModal.step4,
            content: (
                <div className="py-8">
                    <div className="bg-gray-50 p-4 rounded border border-gray-200 text-center">
                        <FileExcelOutlined style={{ fontSize: 32, color: '#10B981' }} />
                        <h3 className="mt-2 font-medium">{t.importModal.ready}</h3>
                        <p className="text-gray-500">File: {fileList[0]?.name}</p>
                        <p className="text-gray-500">{t.importModal.rowEst}: 50</p>
                        {tags.length > 0 && (
                            <div className="mt-2">
                                {tags.map(tag => <Tag key={tag} color="blue">{tag}</Tag>)}
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <Modal
            title={t.importModal.title}
            open={open}
            onCancel={onCancel}
            footer={[
                current > 0 && <Button key="prev" onClick={handlePrev}>{t.common.back}</Button>,
                current < steps.length - 1 && <Button key="next" type="primary" disabled={fileList.length === 0} onClick={handleNext}>{t.common.next}</Button>,
                current === steps.length - 1 && <Button key="submit" type="primary" loading={uploading} onClick={handleImport}>{t.importModal.importNow}</Button>,
            ]}
        >
            <Steps current={current} items={steps.map(s => ({ title: s.title }))} size="small" className="mb-4" />
            <div>{steps[current].content}</div>
        </Modal>
    );
};

export default ContactImportModal;
