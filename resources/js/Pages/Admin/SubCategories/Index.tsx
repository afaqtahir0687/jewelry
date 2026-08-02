import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { confirmDelete } from '@/lib/swal';
import type { PaginatedData } from '@/types';

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    category: string;
    category_id: number;
    is_active: boolean;
    sort_order: number;
    created_at: string;
}

interface SimpleCategory {
    id: number;
    name: string;
}

interface SubCategoriesIndexProps {
    subcategories: PaginatedData<SubCategory>;
    categories: SimpleCategory[];
    filters: { search?: string; category_id?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function SubCategoriesIndex({ subcategories, categories, filters }: SubCategoriesIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/subcategories', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/subcategories', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get('/admin/subcategories', { ...filters, category_id: e.target.value }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete Subcategory?',
            `Are you sure you want to delete "${name}"?`,
            () => router.delete(`/admin/subcategories/${id}`)
        );
    };

    const columns: Column<SubCategory>[] = [
        {
            header: 'Name',
            accessorKey: 'name',
            sortable: true,
            cell: (sc) => (
                <div>
                    <span className="font-medium text-white">{sc.name}</span>
                    <span className="text-gray-500 text-xs block">{sc.slug}</span>
                </div>
            ),
        },
        {
            header: 'Category',
            accessorKey: 'category',
            sortable: true,
            cell: (sc) => <span className="text-gray-300">{sc.category || '—'}</span>,
        },
        {
            header: 'Sort',
            accessorKey: 'sort_order',
            sortable: true,
            cell: (sc) => <span className="text-sm text-gray-400">{sc.sort_order}</span>,
        },
        {
            header: 'Status',
            cell: (sc) => (
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                    sc.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                    {sc.is_active ? <><Eye size={12} /> Active</> : <><EyeOff size={12} /> Inactive</>}
                </span>
            ),
        },
        {
            header: 'Actions',
            cell: (sc) => (
                <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/subcategories/${sc.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(sc.id, sc.name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Subcategories">
            <Head title="Subcategories — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Subcategories</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage product subcategories</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/categories">
                        <Button variant="outline" className="border-white/10 text-gray-300 hover:text-white text-xs">
                            Categories
                        </Button>
                    </Link>
                    <Link href="/admin/subcategories/create">
                        <Button className="bg-gold text-black hover:bg-gold/90">
                            <Plus className="mr-2 h-4 w-4" /> Add Subcategory
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mb-4 flex items-center justify-end">
                <select 
                    value={filters.category_id || ''} 
                    onChange={handleCategoryFilter}
                    className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <DataTable
                data={subcategories}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'sort_order', direction: filters.sortDirection || 'asc' }}
            />
        </AdminLayout>
    );
}
