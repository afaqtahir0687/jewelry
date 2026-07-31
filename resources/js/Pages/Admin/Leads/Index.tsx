import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete } from '@/lib/swal';
import type { Lead, PaginatedData } from '@/types';

interface LeadsIndexProps {
    leads: PaginatedData<Lead>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function AdminLeadsIndex({ leads, filters }: LeadsIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/leads', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/leads', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, leadId: string) => {
        confirmDelete(
            'Delete Lead?',
            `Are you sure you want to delete lead "${leadId}"? This action cannot be undone.`,
            () => router.delete(`/admin/leads/${id}`)
        );
    };

    const columns: Column<Lead>[] = [
        { 
            header: 'Lead ID', 
            accessorKey: 'lead_id', 
            sortable: true,
            cell: (lead) => <span className="font-mono text-gold text-xs">{lead.lead_id}</span>
        },
        { header: 'Customer', accessorKey: 'customer_name', sortable: true },
        { header: 'Phone', cell: (lead) => <span className="text-gray-400 text-sm">{lead.customer_phone}</span> },
        { header: 'City', cell: (lead) => lead.city?.name ?? '—' },
        { header: 'Category', cell: (lead) => lead.category?.name ?? '—' },
        { header: 'Jeweller', cell: (lead) => lead.jeweller?.business_name ?? '—' },
        { 
            header: 'Status', 
            accessorKey: 'status', 
            sortable: true,
            cell: (lead) => <StatusBadge status={lead.status} /> 
        },
        { header: 'Budget', accessorKey: 'budget', sortable: true, cell: (lead) => lead.budget ?? '—' },
        {
            header: 'Commission',
            cell: (lead) => (
                <span className="text-sm">
                    {lead.commission_amount
                        ? `${lead.commission_type === 'percentage' ? '3%' : 'Fixed'} · Rs.${lead.commission_amount}`
                        : '—'}
                </span>
            )
        },
        { header: 'Date', accessorKey: 'created_at', sortable: true, cell: (lead) => <span className="text-gray-400 text-xs">{lead.created_at}</span> },
        {
            header: 'Actions',
            cell: (lead) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/leads/${lead.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Eye size={15} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(lead.id, lead.lead_id)}
                    >
                        <Trash2 size={15} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Leads">
            <Head title="Leads — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Leads</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage customer leads</p>
                </div>
            </div>

            <DataTable
                data={leads}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
