import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete } from '@/lib/swal';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { PaginatedData } from '@/types';

interface Page {
    id: number;
    title: string;
    slug: string;
    is_active: boolean;
}

interface PagesIndexProps {
    pages: PaginatedData<Page>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function PagesIndex({ pages, filters }: PagesIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/pages', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/pages', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, title: string) => {
        confirmDelete(
            'Delete Page?',
            `Are you sure you want to delete the page "${title}"? This action cannot be undone.`,
            () => router.delete(`/admin/pages/${id}`)
        );
    };

    const columns: Column<Page>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { header: 'Title', accessorKey: 'title', sortable: true },
        { header: 'Slug', accessorKey: 'slug', sortable: true },
        { 
            header: 'Status', 
            cell: (p) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${p.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {p.is_active ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (p) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/pages/${p.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(p.id, p.title)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Manage Pages">
            <Head title="Pages — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Pages</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage website dynamic pages</p>
                </div>
                <Link href="/admin/pages/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Page
                    </Button>
                </Link>
            </div>

            <DataTable
                data={pages}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'id', direction: filters.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
