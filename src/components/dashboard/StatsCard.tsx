'use client';

import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
    const isPositive = trend !== undefined && trend >= 0; // Define isPositive based on trend

    return (
        <Card bordered={false} bodyStyle={{ padding: '24px' }} className="h-full" loading={loading}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    {prefix && <div className="p-2 bg-indigo-50 rounded-lg mr-3">{prefix}</div>}
                    <span className="text-slate-500 font-medium text-sm">{title}</span>
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                        {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                        {Math.abs(trend)}%
                        <span className="text-slate-400 font-normal ml-1 text-xs">vs last week</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatsCard;
