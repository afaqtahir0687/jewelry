import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { confirmDelete } from '@/lib/swal';
import type { Category, PaginatedData } from '@/types';

interface CategoriesIndexProps {
    categories: PaginatedData<Category>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function CategoriesIndex({ categories, filters }: CategoriesIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/categories', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/categories', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete Category?',
            `Are you sure you want to delete category "${name}"? This action cannot be undone.`,
            () => router.delete(`/admin/categories/${id}`)
        );
    };

    const columns: Column<Category>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { header: 'Name', accessorKey: 'name', sortable: true },
        { header: 'Slug', accessorKey: 'slug', sortable: true },
        { header: 'Products', accessorKey: 'products_count', sortable: true },
        {
            header: 'Actions',
            cell: (cat) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/categories/${cat.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(cat.id, cat.name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Categories">
            <Head title="Categories — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Categories</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage product categories</p>
                </div>
                <Link href="/admin/categories/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                </Link>
            </div>

            <DataTable
                data={categories}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'id', direction: filters.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
