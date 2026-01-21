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
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative border border-transparent hover:border-indigo-100 group">
            <div className="flex justify-between items-start mb-4">
                <Tag color={statusColor} className="rounded-full px-3 py-1 border-0 uppercase font-bold tracking-wide">
                    {statusLabel}
                </Tag>
                <Tag className="rounded-full px-3 py-0.5 border-0 bg-amber-50 text-amber-700 font-medium">
                    {template.language}
                </Tag>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{template.name}</h3>

            <div className="text-xs text-slate-500 font-medium mb-6 uppercase tracking-wider flex items-center gap-2">
                <span className="bg-slate-100 px-2 py-1 rounded">{template.category}</span>
                <span>•</span>
                <span>Quality: <span className="text-emerald-600 font-bold">{template.quality}</span></span>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 mb-6 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap border border-slate-100">
                {template.content}
            </div>

            {/* Buttons removed as per requirement */}

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
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
