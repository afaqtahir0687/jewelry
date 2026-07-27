import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Package, Calendar, AlertCircle } from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import type { SellerDashboardStats, Lead } from '@/types';

interface DashboardProps {
    stats: SellerDashboardStats | null;
    recentLeads: Array<Pick<Lead, 'id' | 'lead_id' | 'customer_name' | 'city' | 'category' | 'status' | 'budget' | 'created_at'>>;
    jeweller?: { business_name: string; is_verified: boolean };
    noJeweller?: boolean;
}

export default function SellerDashboard({ stats, recentLeads, jeweller, noJeweller }: DashboardProps) {
    if (noJeweller || !stats) {
        return (
            <SellerLayout title="Dashboard">
                <Head title="Dashboard — Seller" />
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 max-w-xl mx-auto mt-12 text-center space-y-4">
                    <AlertCircle className="mx-auto text-yellow-500" size={48} />
                    <h2 className="text-xl font-bold text-white">No Jeweller Profile Linked</h2>
                    <p className="text-gray-400 text-sm">
                        Your account is not linked to any registered Jeweller. Please contact the administrator to set up your business profile.
                    </p>
                </div>
            </SellerLayout>
        );
    }

    return (
        <SellerLayout title="Dashboard">
            <Head title="Seller Dashboard" />

            <div className="space-y-6">
                {/* Header Welcome */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Welcome back, {jeweller.business_name}</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Status: {jeweller.is_verified ? <span className="text-green-400 font-semibold">Verified Store</span> : <span className="text-yellow-500 font-semibold">Verification Pending</span>}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total My Leads"
                        value={stats.total_leads}
                        icon={<ClipboardList size={20} />}
                        description={`${stats.new_leads} new leads`}
                    />
                    <StatsCard
                        title="Pending Leads"
                        value={stats.pending_leads}
                        icon={<AlertCircle size={20} />}
                    />
                    <StatsCard
                        title="My Designs listed"
                        value={stats.total_products}
                        icon={<Package size={20} />}
                    />
                    <StatsCard
                        title="Appointments Today"
                        value={stats.appointments_today}
                        icon={<Calendar size={20} />}
                    />
                </div>

                {/* Recent Leads */}
                <div className="rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">Recent Leads Assigned to Me</h2>
                        <Link href="/seller/leads" className="text-sm text-gold hover:text-gold/80 transition-colors">
                            View all →
                        </Link>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Lead ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assigned</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentLeads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                                        No leads assigned yet
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recentLeads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell>
                                            <Link
                                                href={`/seller/leads/${lead.id}`}
                                                className="font-mono text-gold hover:text-gold/80 text-xs"
                                            >
                                                {lead.lead_id}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="font-medium">{lead.customer_name}</TableCell>
                                        <TableCell>{lead.city ?? '—'}</TableCell>
                                        <TableCell>{lead.category ?? '—'}</TableCell>
                                        <TableCell className="text-sm">{lead.budget ?? '—'}</TableCell>
                                        <TableCell><StatusBadge status={lead.status} /></TableCell>
                                        <TableCell className="text-gray-400 text-xs">{lead.created_at}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </SellerLayout>
    );
}
