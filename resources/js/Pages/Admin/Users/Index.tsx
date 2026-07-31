import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { confirmDelete } from '@/lib/swal';
import type { User, PaginatedData } from '@/types';

interface UsersIndexProps {
    users: PaginatedData<User>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function AdminUsersIndex({ users, filters }: UsersIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/users', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/users', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete User?',
            `Are you sure you want to delete user "${name}"? This action cannot be undone.`,
            () => router.delete(`/admin/users/${id}`)
        );
    };

    const columns: Column<User>[] = [
        { header: 'Name', accessorKey: 'name', sortable: true },
        { header: 'Email', accessorKey: 'email', sortable: true },
        { 
            header: 'Roles', 
            cell: (u) => (
                <div className="flex gap-1 flex-wrap">
                    {u.roles?.map(role => (
                        <Badge key={role} variant="outline" className="border-gold/30 text-gold bg-gold/10">
                            {role}
                        </Badge>
                    )) || '—'}
                </div>
            )
        },
        { 
            header: 'Profile Status', 
            cell: (u) => (
                <span className="text-sm text-gray-400">
                    {u.roles?.includes('seller') 
                        ? (u.has_jeweller ? 'Has Jeweller Profile' : 'No Jeweller Profile') 
                        : '—'}
                </span>
            )
        },
        { header: 'Date Joined', accessorKey: 'created_at', sortable: true, cell: (u) => <span className="text-xs text-gray-400">{u.created_at}</span> },
        {
            header: 'Actions',
            cell: (u) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/users/${u.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(u.id, u.name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Users & Roles">
            <Head title="Users — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Users</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage system users</p>
                </div>
                <Link href="/admin/users/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add User
                    </Button>
                </Link>
            </div>

            <DataTable
                data={users}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
