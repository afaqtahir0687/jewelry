import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2, Check, X } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete, confirmAction, promptText } from '@/lib/swal';
import type { PaginatedData } from '@/types';

interface PartnerRequestRow {
    id: number;
    name: string;
    business_name: string;
    email: string;
    phone: string;
    city: string | null;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

interface PartnerRequestsIndexProps {
    requests: PaginatedData<PartnerRequestRow>;
    filters: { search?: string; status?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function PartnerRequestsIndex({ requests, filters }: PartnerRequestsIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/partner-requests', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/partner-requests', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleStatusFilter = (status: string) => {
        router.get('/admin/partner-requests', { ...filters, status: status || undefined }, { preserveState: true, preserveScroll: true });
    };

    const handleApprove = (id: number, name: string) => {
        confirmAction(
            'Approve Application?',
            `"${name}" will get a seller account and a live shop on the platform.`,
            'Yes, approve',
            () => router.patch(`/admin/partner-requests/${id}/approve`)
        );
    };

    const handleReject = (id: number, name: string) => {
        promptText(
            `Reject "${name}"?`,
            'Reason (optional) — shared with the applicant',
            'Reject Application',
            (reason) => router.patch(`/admin/partner-requests/${id}/reject`, { rejection_reason: reason })
        );
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete Application?',
            `Are you sure you want to delete "${name}"'s application? This action cannot be undone.`,
            () => router.delete(`/admin/partner-requests/${id}`)
        );
    };

    const columns: Column<PartnerRequestRow>[] = [
        { header: 'Business', accessorKey: 'business_name', sortable: true, cell: (r) => <span className="font-semibold text-white">{r.business_name}</span> },
        { header: 'Applicant', accessorKey: 'name', sortable: true },
        { header: 'Email', cell: (r) => <span className="text-gray-400 text-sm">{r.email}</span> },
        { header: 'Phone', cell: (r) => <span className="text-gray-400 text-sm">{r.phone}</span> },
        { header: 'City', cell: (r) => r.city ?? '—' },
        { header: 'Status', accessorKey: 'status', sortable: true, cell: (r) => <StatusBadge status={r.status} /> },
        { header: 'Applied', accessorKey: 'created_at', sortable: true, cell: (r) => <span className="text-gray-400 text-xs">{r.created_at}</span> },
        {
            header: 'Actions',
            cell: (r) => (
                <div className="flex items-center gap-1">
                    <Link href={`/admin/partner-requests/${r.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Eye size={15} />
                        </Button>
                    </Link>
                    {r.status === 'pending' && (
                        <>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:text-green-400 text-gray-400"
                                title="Approve"
                                onClick={() => handleApprove(r.id, r.business_name)}
                            >
                                <Check size={15} />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:text-red-400 text-gray-400"
                                title="Reject"
                                onClick={() => handleReject(r.id, r.business_name)}
                            >
                                <X size={15} />
                            </Button>
                        </>
                    )}
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        title="Delete"
                        onClick={() => handleDelete(r.id, r.business_name)}
                    >
                        <Trash2 size={15} />
                    </Button>
                </div>
            )
        }
    ];

    const STATUS_TABS = [
        { value: '', label: 'All' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
    ];

    return (
        <AdminLayout title="Partner Requests">
            <Head title="Partner Requests — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Partner Requests</h2>
                    <p className="text-gray-400 text-sm mt-1">Review "Become a Partner" applications from jewellers</p>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleStatusFilter(tab.value)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                            (filters.status ?? '') === tab.value
                                ? 'bg-gold/15 text-gold border border-gold/30'
                                : 'text-gray-400 border border-white/10 hover:bg-white/5'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <DataTable
                data={requests}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
