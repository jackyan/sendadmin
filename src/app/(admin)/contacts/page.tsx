'use client';

import React, { useState } from 'react';
import { Table, Button, Input, Space, Tag, Dropdown } from 'antd';
import { Search, Plus, Filter, Download, Upload, MoreHorizontal } from 'lucide-react';
import { MOCK_CONTACTS } from '@/lib/mock-data';
import ContactImportModal from '@/components/business/ContactImportModal';
import ContactModal from '@/components/business/ContactModal';

const { Column } = Table;

import { useI18n } from '@/lib/i18n/I18nContext';

export default function ContactsPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<any>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { t } = useI18n();

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };

    const handleEdit = (record: any) => {
        setEditingContact(record);
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
        // Mock delete
        console.log('Deleted', id);
    };

    const handleAdd = () => {
        setEditingContact(null);
        setModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.contacts.title}</h2>
                    <p className="text-gray-500">{t.contacts.subtitle}</p>
                </div>
                <Space>
                    <Button icon={<Download size={16} />}>{t.common.export}</Button>
                    <Button icon={<Upload size={16} />} onClick={() => setImportOpen(true)}>{t.common.import}</Button>
                    <Button type="primary" icon={<Plus size={16} />} onClick={handleAdd}>{t.contacts.addContact}</Button>
                </Space>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <Input
                    prefix={<Search size={16} className="text-gray-400" />}
                    placeholder={t.common.search}
                    className="w-full max-w-md"
                />
                <Space>
                    {selectedRowKeys.length > 0 && (
                        <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded">
                            {selectedRowKeys.length} selected
                        </span>
                    )}
                    <Button icon={<Filter size={16} />}>{t.common.filters}</Button>
                </Space>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <Table
                    dataSource={MOCK_CONTACTS}
                    rowKey="id"
                    rowSelection={rowSelection}
                    pagination={{ pageSize: 10 }}
                >
                    <Column title={t.contacts.fields.name} dataIndex="name" key="name" render={(t) => <span className="font-medium text-gray-900">{t}</span>} />
                    <Column title={t.contacts.fields.phone} dataIndex="phone" key="phone" />
                    <Column title={t.contacts.fields.email} dataIndex="email" key="email" />
                    <Column
                        title={t.contacts.fields.channel}
                        dataIndex="channel"
                        key="channel"
                        render={(channel) => (
                            <Tag color={channel === 'whatsapp' ? 'green' : 'blue'}>
                                {channel ? channel.toUpperCase() : 'WHATSAPP'}
                            </Tag>
                        )}
                    />
                    <Column
                        title={t.contacts.fields.tags}
                        dataIndex="tags"
                        key="tags"
                        render={(tags: string[]) => (
                            <>
                                {tags.map(tag => (
                                    <Tag key={tag} color={tag === 'VIP' ? 'gold' : 'blue'}>{tag}</Tag>
                                ))}
                            </>
                        )}
                    />
                    <Column title={t.contacts.fields.status} dataIndex="status" key="status" render={() => <Tag color="success">Active</Tag>} />
                    <Column
                        title={t.common.actions}
                        key="action"
                        render={(_, record: any) => (
                            <Space>
                                <Button type="text" size="small" onClick={() => handleEdit(record)}>{t.common.edit}</Button>
                                <Button type="text" danger size="small" onClick={() => handleDelete(record.id)}>{t.common.delete}</Button>
                            </Space>
                        )}
                    />
                </Table>
            </div>

            <ContactImportModal
                open={importOpen}
                onCancel={() => setImportOpen(false)}
                onSuccess={() => setImportOpen(false)}
            />

            <ContactModal
                open={modalOpen}
                initialValues={editingContact}
                onCancel={() => setModalOpen(false)}
                onOk={(values) => {
                    console.log('Saved', values);
                    setModalOpen(false);
                }}
            />
        </div>
    );
}
