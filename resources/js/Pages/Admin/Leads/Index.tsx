import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import type { Lead, PaginatedData } from '@/types';

interface LeadsIndexProps {
    leads: PaginatedData<Lead>;
}

export default function AdminLeadsIndex({ leads }: LeadsIndexProps) {
    const handleDelete = (id: number, leadId: string) => {
        if (confirm(`Delete lead ${leadId}?`)) {
            router.delete(`/admin/leads/${id}`);
        }
    };

    return (
        <AdminLayout title="Leads">
            <Head title="Leads — Admin" />

            <div className="rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div>
                        <h2 className="font-semibold text-white">All Leads</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{leads.total} total leads</p>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lead ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Jeweller</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Commission</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={11} className="text-center text-gray-500 py-12">
                                    No leads found
                                </TableCell>
                            </TableRow>
                        ) : (
                            leads.data.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell>
                                        <span className="font-mono text-gold text-xs">{lead.lead_id}</span>
                                    </TableCell>
                                    <TableCell className="font-medium">{lead.customer_name}</TableCell>
                                    <TableCell className="text-gray-400 text-sm">{lead.customer_phone}</TableCell>
                                    <TableCell>{lead.city ?? '—'}</TableCell>
                                    <TableCell>{lead.category ?? '—'}</TableCell>
                                    <TableCell>{typeof lead.jeweller === 'string' ? lead.jeweller : '—'}</TableCell>
                                    <TableCell><StatusBadge status={lead.status} /></TableCell>
                                    <TableCell className="text-sm">{lead.budget ?? '—'}</TableCell>
                                    <TableCell className="text-sm">
                                        {lead.commission_amount
                                            ? `${lead.commission_type === 'percentage' ? '3%' : 'Fixed'} · Rs.${lead.commission_amount}`
                                            : '—'}
                                    </TableCell>
                                    <TableCell className="text-gray-400 text-xs">{lead.created_at}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/leads/${lead.id}`}>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold">
                                                    <Eye size={15} />
                                                </Button>
                                            </Link>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 hover:text-red-400"
                                                onClick={() => handleDelete(lead.id, lead.lead_id)}
                                            >
                                                <Trash2 size={15} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {leads.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">
                            Page {leads.current_page} of {leads.last_page}
                        </p>
                        <div className="flex gap-2">
                            {leads.prev_page_url && (
                                <Link href={leads.prev_page_url}>
                                    <Button variant="outline" size="sm">Previous</Button>
                                </Link>
                            )}
                            {leads.next_page_url && (
                                <Link href={leads.next_page_url}>
                                    <Button variant="outline" size="sm">Next</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
