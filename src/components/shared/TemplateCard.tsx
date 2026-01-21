import React from 'react';
import { Card, Tag, Button, Space, Typography } from 'antd';
import { Copy, Edit } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

const { Paragraph } = Typography;

interface TemplateCardProps {
    template: any;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
    const { t } = useI18n();

    // Status color mapping
    const statusColor = {
        approved: 'success',
        pending: 'warning',
        rejected: 'error',
    }[template.status as string] || 'default';

    const statusLabel = t.templates.status[template.status as keyof typeof t.templates.status] || template.status;

    return (
        <div className="bg-[#FAF8F3] rounded-lg border border-[#E9E4D9] p-6 hover:shadow-md transition-shadow relative">
            <div className="flex justify-between items-start mb-4">
                <Tag color={statusColor} className="rounded-full px-3 py-1 border-0 uppercase font-bold tracking-wide">
                    {statusLabel}
                </Tag>
                <Tag color="gold" className="rounded-full px-3 py-0.5 border-[#D4C391] text-[#7A693B] bg-[#EADDAD]">
                    {template.language}
                </Tag>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>

            <div className="text-xs text-gray-500 font-mono mb-6 uppercase tracking-wider">
                {template.category} • Quality: <span className="font-bold">{template.quality}</span>
            </div>

            <div className="bg-[#EFEDE6] rounded p-4 mb-6 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {template.content}
            </div>

            {/* Buttons removed as per requirement */}

            <div className="flex justify-between items-center pt-4 border-t border-[#E9E4D9]">
                <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                    <Copy size={16} />
                    <span className="text-sm font-medium">Copy ID</span>
                </div>

                <Button size="small" icon={<Edit size={14} />}>{t.common.edit}</Button>
            </div>
        </div>
    );
};

export default TemplateCard;
