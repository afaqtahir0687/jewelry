import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { confirmDelete } from '@/lib/swal';
import type { Jeweller, PaginatedData } from '@/types';

interface JewellersIndexProps {
    jewellers: PaginatedData<Jeweller>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function AdminJewellersIndex({ jewellers, filters }: JewellersIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/jewellers', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/jewellers', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete Jeweller?',
            `Are you sure you want to delete "${name}"? This will also delete all their leads, products and appointments.`,
            () => router.delete(`/admin/jewellers/${id}`)
        );
    };

    const handleToggleVerified = (id: number, isVerified: boolean) => {
        router.patch(`/admin/jewellers/${id}`, { is_verified: !isVerified }, { preserveScroll: true });
    };

    const columns: Column<Jeweller>[] = [
        { header: 'Business Name', accessorKey: 'business_name', sortable: true },
        { header: 'City', cell: (j) => j.city ?? '—' },
        { header: 'Phone', cell: (j) => <span className="text-sm text-gray-400">{j.phone}</span> },
        { 
            header: 'Verified', 
            accessorKey: 'is_verified',
            sortable: true,
            cell: (j) => (
                <button onClick={() => handleToggleVerified(j.id, j.is_verified)} title="Click to toggle">
                    {j.is_verified
                        ? <Badge variant="success"><CheckCircle size={12} className="mr-1" />Verified</Badge>
                        : <Badge variant="secondary"><XCircle size={12} className="mr-1" />Unverified</Badge>
                    }
                </button>
            )
        },
        { header: 'Leads', accessorKey: 'leads_count', sortable: true },
        { header: 'Products', accessorKey: 'products_count', sortable: true },
        { header: 'Reviews', accessorKey: 'reviews_count', sortable: true },
        { header: 'User Email', cell: (j) => <span className="text-xs text-gray-400">{j.user_email ?? '—'}</span> },
        {
            header: 'Actions',
            cell: (j) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/jewellers/${j.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(j.id, j.business_name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Jewellers">
            <Head title="Jewellers — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Jewellers</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage jewellers</p>
                </div>
                <Link href="/admin/jewellers/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Jeweller
                    </Button>
                </Link>
            </div>

            <DataTable
                data={jewellers}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
