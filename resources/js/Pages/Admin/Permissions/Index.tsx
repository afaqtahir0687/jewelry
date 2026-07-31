import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { confirmDelete } from '@/lib/swal';
import type { Permission, PaginatedData } from '@/types';

interface PermissionsIndexProps {
    permissions: PaginatedData<Permission>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function PermissionsIndex({ permissions, filters }: PermissionsIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/permissions', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/permissions', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete Permission?',
            `Are you sure you want to delete permission "${name}"? This action cannot be undone.`,
            () => router.delete(`/admin/permissions/${id}`)
        );
    };

    const columns: Column<Permission>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { header: 'Name', accessorKey: 'name', sortable: true },
        {
            header: 'Actions',
            cell: (perm) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/permissions/${perm.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(perm.id, perm.name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Permissions">
            <Head title="Permissions — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Permissions</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage system permissions</p>
                </div>
                <Link href="/admin/permissions/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Permission
                    </Button>
                </Link>
            </div>

            <DataTable
                data={permissions}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'id', direction: filters.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
