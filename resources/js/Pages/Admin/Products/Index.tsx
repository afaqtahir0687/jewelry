import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2, Pencil, Plus } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete } from '@/lib/swal';
import type { Product, PaginatedData } from '@/types';

interface ProductsIndexProps {
    products: PaginatedData<Product>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function AdminProductsIndex({ products, filters }: ProductsIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/products', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/products', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, title: string) => {
        confirmDelete(
            'Delete Product?',
            `Are you sure you want to delete product "${title}"? This action cannot be undone.`,
            () => router.delete(`/admin/products/${id}`)
        );
    };

    const columns: Column<Product>[] = [
        {
            header: 'Image',
            cell: (p) => {
                // If backend uses product_images (objects) or images (strings)
                const firstImage = p.product_images && p.product_images[0]
                    ? (p.product_images[0].url || `/${p.product_images[0].path}`)
                    : null;
                return firstImage ? (
                    <img
                        src={firstImage.startsWith('http') ? firstImage : firstImage}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-500 text-xs">—</div>
                );
            }
        },
        { header: 'Title', accessorKey: 'title', sortable: true, cell: (p) => <span className="font-medium max-w-[200px] truncate block">{p.title}</span> },
        { header: 'Jeweller', cell: (p) => p.jeweller ?? '—' },
        { header: 'Category', cell: (p) => p.category ?? '—' },
        { 
            header: 'Price', 
            accessorKey: 'price',
            sortable: true,
            cell: (p) => (
                <span className="text-sm">
                    {p.price_on_request ? <span className="text-gold">On Request</span> : `Rs. ${p.price?.toLocaleString() ?? '—'}`}
                </span>
            )
        },
        { header: 'Gold', cell: (p) => <span className="text-sm text-gray-400">{p.gold_purity ?? '—'}</span> },
        { header: 'Status', accessorKey: 'status', sortable: true, cell: (p) => <StatusBadge status={p.status} /> },
        { header: 'Date', accessorKey: 'created_at', sortable: true, cell: (p) => <span className="text-xs text-gray-400">{p.created_at}</span> },
        {
            header: 'Actions',
            cell: (p) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/products/${p.id}/edit`}>
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
        <AdminLayout title="Products">
            <Head title="Products — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Products</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage jeweller products</p>
                </div>
                <Link href="/admin/products/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <DataTable
                data={products}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
