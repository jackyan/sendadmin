'use client';

import React, { useState } from 'react';
import { Card, Button, Avatar, Tag, Modal, QRCode, message } from 'antd';
import { Power, Settings, RefreshCw, MessageCircle } from 'lucide-react';

interface ChannelCardProps {
    id: string;
    type: 'whatsapp' | 'telegram' | 'instagram' | 'facebook';
    name: string;
    identifier?: string;
    status: 'connected' | 'disconnected' | 'error';
    quota?: string;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ id, type, name, identifier, status: initialStatus, quota }) => {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Connect Flow
    const handleConnect = () => {
        setIsModalOpen(true);
    };

    const confirmConnect = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStatus('connected');
            setIsModalOpen(false);
            message.success(`Successfully connected to ${name}`);
        }, 2000);
    };

    const handleDisconnect = () => {
        Modal.confirm({
            title: 'Disconnect Channel?',
            content: 'Existing campaigns using this channel might fail.',
            onOk: () => setStatus('disconnected')
        });
    };

    const getIcon = () => {
        switch (type) {
            case 'whatsapp': return 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';
            case 'telegram': return 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg';
            case 'instagram': return 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg';
            default: return '';
        }
    };

    return (
        <>
            <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                {status === 'connected' && <div className="absolute top-0 right-0 p-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div></div>}

                <div className="flex flex-col items-center text-center space-y-4 py-4">
                    <Avatar src={getIcon()} size={64} shape="square" className="bg-transparent" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                        {status === 'connected' ? (
                            <p className="text-indigo-600 font-medium">{identifier}</p>
                        ) : (
                            <p className="text-gray-400">Not connected</p>
                        )}
                    </div>

                    <div className="w-full pt-4 border-t border-slate-50 flex justify-center gap-2">
                        {status === 'connected' ? (
                            <>
                                <Button icon={<RefreshCw size={14} />}>Sync</Button>
                                <Button icon={<Settings size={14} />} onClick={() => message.info('Opens Config Drawer')}>Config</Button>
                                <Button danger icon={<Power size={14} />} onClick={handleDisconnect} />
                            </>
                        ) : (
                            <Button type="primary" onClick={handleConnect} className="w-full">Connect Now</Button>
                        )}
                    </div>

                    {status === 'connected' && quota && (
                        <div className="text-xs text-gray-400">Quota: {quota}</div>
                    )}
                </div>
            </Card>

            <Modal
                title={`Connect ${name}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={400}
            >
                <div className="flex flex-col items-center space-y-6 py-6">
                    <p className="text-center text-gray-500">Scan this code with your {name} mobile app to authorize.</p>
                    <QRCode value={`https://connect.provider.com/${type}/${id}`} size={200} />

                    <div className="w-full text-center">
                        <Button type="primary" loading={loading} onClick={confirmConnect} block>
                            Simulate Scan & Authorize
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ChannelCard;
