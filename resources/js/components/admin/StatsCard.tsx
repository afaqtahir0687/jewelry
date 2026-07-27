import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
    className?: string;
}

export default function StatsCard({ title, value, icon, description, className }: StatsCardProps) {
    return (
        <div className={cn(
            'rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/8 transition-all duration-200',
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <div className="text-gold opacity-80">{icon}</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            {description && (
                <p className="text-xs text-gray-500">{description}</p>
            )}
        </div>
    );
}
