import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus, Star, Eye, EyeOff } from 'lucide-react';
import { confirmDelete } from '@/lib/swal';
import type { Category, PaginatedData } from '@/types';

interface AdminCategory extends Category {
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    products_count: number;
    created_at: string;
}

interface CategoriesIndexProps {
    categories: PaginatedData<AdminCategory>;
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
            `Are you sure you want to delete "${name}"? All associated products will lose their category reference.`,
            () => router.delete(`/admin/categories/${id}`)
        );
    };

    const handleToggleFeatured = (id: number) => {
        router.patch(`/admin/categories/${id}/toggle-featured`, {}, { preserveScroll: true });
    };

    const handleToggleActive = (id: number) => {
        router.patch(`/admin/categories/${id}/toggle-active`, {}, { preserveScroll: true });
    };

    const columns: Column<AdminCategory>[] = [
        {
            header: 'Image',
            cell: (cat) => (
                cat.image ? (
                    <img
                        src={cat.image.startsWith('http') ? cat.image : `/${cat.image}`}
                        alt={cat.name}
                        className="w-10 h-10 rounded-lg object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-500 text-xs">—</div>
                )
            ),
        },
        {
            header: 'Name',
            accessorKey: 'name',
            sortable: true,
            cell: (cat) => (
                <div>
                    <span className="font-medium text-white">{cat.name}</span>
                    <span className="text-gray-500 text-xs block">{cat.slug}</span>
                </div>
            ),
        },
        {
            header: 'Products',
            accessorKey: 'products_count',
            sortable: true,
            cell: (cat) => <span className="text-sm text-gray-300">{cat.products_count}</span>,
        },
        {
            header: 'Sort',
            accessorKey: 'sort_order',
            sortable: true,
            cell: (cat) => <span className="text-sm text-gray-400">{cat.sort_order}</span>,
        },
        {
            header: 'Featured',
            cell: (cat) => (
                <button
                    onClick={() => handleToggleFeatured(cat.id)}
                    title={cat.is_featured ? 'Remove from featured' : 'Mark as featured'}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-colors ${
                        cat.is_featured
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
                    }`}
                >
                    <Star size={12} fill={cat.is_featured ? 'currentColor' : 'none'} />
                    {cat.is_featured ? 'Featured' : 'Set Featured'}
                </button>
            ),
        },
        {
            header: 'Status',
            cell: (cat) => (
                <button
                    onClick={() => handleToggleActive(cat.id)}
                    title={cat.is_active ? 'Deactivate' : 'Activate'}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-colors ${
                        cat.is_active
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                >
                    {cat.is_active ? <><Eye size={12} /> Active</> : <><EyeOff size={12} /> Inactive</>}
                </button>
            ),
        },
        {
            header: 'Actions',
            cell: (cat) => (
                <div className="flex items-center gap-2 justify-end">
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
            ),
        },
    ];

    return (
        <AdminLayout title="Categories">
            <Head title="Categories — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Categories</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage jewellery categories. Toggle featured to show on homepage.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/subcategories">
                        <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white text-xs">
                            Subcategories
                        </Button>
                    </Link>
                    <Link href="/admin/categories/create">
                        <Button className="bg-gold text-black hover:bg-gold/90">
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </Link>
                </div>
            </div>

            <DataTable
                data={categories}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'sort_order', direction: filters.sortDirection || 'asc' }}
            />
        </AdminLayout>
    );
}
