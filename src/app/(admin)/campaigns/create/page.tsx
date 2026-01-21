'use client';

import React from 'react';
import CampaignWizard from '@/components/business/CampaignWizard';
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function CreateCampaignPage() {
    const { t } = useI18n();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/campaigns">
                    <Button icon={<ArrowLeft size={16} />} type="text" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t.campaigns.create}</h2>
                    <p className="text-gray-500">{t.campaigns.wizard.subtitle}</p>
                </div>
            </div>
            <CampaignWizard />
        </div>
    );
}
