import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete } from '@/lib/swal';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { PaginatedData } from '@/types';

interface Faq {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
}

interface FaqsIndexProps {
    faqs: PaginatedData<Faq>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function FaqsIndex({ faqs, filters }: FaqsIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/faqs', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/faqs', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, question: string) => {
        confirmDelete(
            'Delete FAQ?',
            `Are you sure you want to delete the FAQ "${question}"? This action cannot be undone.`,
            () => router.delete(`/admin/faqs/${id}`)
        );
    };

    const columns: Column<Faq>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { header: 'Question', accessorKey: 'question', sortable: true },
        { header: 'Order', accessorKey: 'sort_order', sortable: true },
        {
            header: 'Status',
            cell: (f) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${f.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {f.is_active ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (f) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/faqs/${f.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(f.id, f.question)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Manage FAQs">
            <Head title="FAQs — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">FAQs</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage frequently asked questions shown on the homepage</p>
                </div>
                <Link href="/admin/faqs/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add FAQ
                    </Button>
                </Link>
            </div>

            <DataTable
                data={faqs}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'sort_order', direction: filters.sortDirection || 'asc' }}
            />
        </AdminLayout>
    );
}
