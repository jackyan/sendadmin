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

            <div className="bg-white p-4 rounded-xl shadow-sm border-none flex justify-between items-center">
                <Input
                    prefix={<Search size={16} className="text-gray-400" />}
                    placeholder={t.common.search}
                    className="w-full max-w-md bg-slate-50 border-transparent focus:bg-white transition-all"
                />
                <Space>
                    {selectedRowKeys.length > 0 && (
                        <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">
                            {selectedRowKeys.length} selected
                        </span>
                    )}
                    <Button icon={<Filter size={16} />} className="border-none shadow-sm text-slate-600 hover:text-indigo-600">{t.common.filters}</Button>
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
                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${channel === 'whatsapp' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                {channel ? channel.toUpperCase() : 'WHATSAPP'}
                            </span>
                        )}
                    />
                    <Column
                        title={t.contacts.fields.tags}
                        key="tags"
                        dataIndex="tags"
                        render={(tags: any) => {
                            const safeTags = Array.isArray(tags) ? tags : [];
                            return (
                                <div className="flex gap-1">
                                    {safeTags.map((tag: string) => (
                                        <span key={tag} className={`px-2 py-0.5 rounded text-xs font-medium ${tag === 'VIP' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            );
                        }}
                    />
                    <Column title={t.contacts.fields.status} dataIndex="status" key="status" render={() => (
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-sm text-slate-600">Active</span>
                        </div>
                    )} />
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
