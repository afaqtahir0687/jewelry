import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { confirmDelete } from '@/lib/swal';
import type { Role, PaginatedData } from '@/types';

interface RolesIndexProps {
    roles: PaginatedData<Role>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function RolesIndex({ roles, filters }: RolesIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/roles', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/roles', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete Role?',
            `Are you sure you want to delete role "${name}"? This action cannot be undone.`,
            () => router.delete(`/admin/roles/${id}`)
        );
    };

    const columns: Column<Role>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { header: 'Name', accessorKey: 'name', sortable: true },
        { 
            header: 'Permissions Count',
            cell: (role) => <span>{role.permissions?.length || 0}</span>
        },
        {
            header: 'Actions',
            cell: (role) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/roles/${role.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(role.id, role.name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Roles">
            <Head title="Roles — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Roles</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage system roles and their permissions</p>
                </div>
                <Link href="/admin/roles/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Role
                    </Button>
                </Link>
            </div>

            <DataTable
                data={roles}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'id', direction: filters.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
