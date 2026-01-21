'use client';

import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
    title: string;
    value: string | number;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    trend?: number; // percentage
    loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, prefix, suffix, trend, loading }) => {
    return (
        <Card bordered={false} loading={loading} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
                title={<span className="text-gray-500 font-medium">{title}</span>}
                value={value}
                prefix={prefix}
                suffix={suffix}
                valueStyle={{ fontWeight: 600, color: '#111827' }}
            />
            {trend !== undefined && (
                <div className={clsx("flex items-center gap-1 mt-2 text-sm", trend >= 0 ? "text-green-600" : "text-red-500")}>
                    {trend >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span className="font-medium">{Math.abs(trend)}%</span>
                    <span className="text-gray-400 font-normal ml-1">vs last week</span>
                </div>
            )}
        </Card>
    );
};

export default StatsCard;
