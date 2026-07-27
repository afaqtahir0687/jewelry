import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Store, Package, Calendar, Star, Users, TrendingUp, CheckCircle } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import type { AdminDashboardStats, Lead } from '@/types';

interface DashboardProps {
    stats: AdminDashboardStats;
    recentLeads: Array<Pick<Lead, 'id' | 'lead_id' | 'customer_name' | 'city' | 'category' | 'jeweller' | 'status' | 'created_at'>>;
}

export default function AdminDashboard({ stats, recentLeads }: DashboardProps) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Leads"
                        value={stats.total_leads}
                        icon={<ClipboardList size={20} />}
                        description={`${stats.new_leads} new leads`}
                    />
                    <StatsCard
                        title="Jewellers"
                        value={stats.total_jewellers}
                        icon={<Store size={20} />}
                        description={`${stats.verified_jewellers} verified`}
                    />
                    <StatsCard
                        title="Products Listed"
                        value={stats.total_products}
                        icon={<Package size={20} />}
                    />
                    <StatsCard
                        title="Appointments Today"
                        value={stats.appointments_today}
                        icon={<Calendar size={20} />}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Pending Reviews"
                        value={stats.pending_reviews}
                        icon={<Star size={20} />}
                    />
                    <StatsCard
                        title="Total Users"
                        value={stats.total_users}
                        icon={<Users size={20} />}
                    />
                    <StatsCard
                        title="New Leads"
                        value={stats.new_leads}
                        icon={<TrendingUp size={20} />}
                        description="Awaiting assignment"
                    />
                    <StatsCard
                        title="Verified Jewellers"
                        value={stats.verified_jewellers}
                        icon={<CheckCircle size={20} />}
                    />
                </div>

                {/* Recent Leads */}
                <div className="rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">Recent Leads</h2>
                        <Link href="/admin/leads" className="text-sm text-gold hover:text-gold/80 transition-colors">
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
                                <TableHead>Jeweller</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>When</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentLeads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                                        No leads yet
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recentLeads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell>
                                            <Link
                                                href={`/admin/leads/${lead.id}`}
                                                className="font-mono text-gold hover:text-gold/80 text-xs"
                                            >
                                                {lead.lead_id}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="font-medium">{lead.customer_name}</TableCell>
                                        <TableCell>{lead.city ?? '—'}</TableCell>
                                        <TableCell>{lead.category ?? '—'}</TableCell>
                                        <TableCell>{typeof lead.jeweller === 'string' ? lead.jeweller : lead.jeweller?.business_name ?? '—'}</TableCell>
                                        <TableCell><StatusBadge status={lead.status} /></TableCell>
                                        <TableCell className="text-gray-400 text-xs">{lead.created_at}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}
