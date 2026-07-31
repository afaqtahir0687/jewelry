import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Check, X, Trash2, Star } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/admin/StatusBadge';
import { confirmDelete } from '@/lib/swal';
import type { Review, PaginatedData } from '@/types';

interface ReviewsIndexProps {
    reviews: PaginatedData<Review>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function AdminReviewsIndex({ reviews, filters }: ReviewsIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/reviews', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/reviews', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleStatus = (id: number, status: 'approved' | 'rejected') => {
        router.patch(`/admin/reviews/${id}`, { status }, { preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        confirmDelete(
            'Delete Review?',
            'Are you sure you want to delete this review? This action cannot be undone.',
            () => router.delete(`/admin/reviews/${id}`)
        );
    };

    const columns: Column<Review>[] = [
        { header: 'Jeweller', cell: (r) => r.jeweller ?? '—' },
        { header: 'Reviewer', accessorKey: 'reviewer_name', sortable: true },
        { 
            header: 'Rating', 
            accessorKey: 'rating',
            sortable: true,
            cell: (r) => (
                <div className="flex items-center gap-1 text-gold">
                    <Star size={13} fill="currentColor" />
                    <span className="text-sm font-semibold">{r.rating}/5</span>
                </div>
            )
        },
        { 
            header: 'Comment', 
            accessorKey: 'comment',
            cell: (r) => (
                <span className="text-gray-300 text-sm max-w-xs truncate block" title={r.comment}>
                    {r.comment ?? <span className="text-gray-500 italic">No comment</span>}
                </span>
            )
        },
        { header: 'Status', cell: (r) => <StatusBadge status={r.status ?? 'pending'} /> },
        { header: 'Date', accessorKey: 'created_at', sortable: true, cell: (r) => <span className="text-xs text-gray-400">{r.created_at}</span> },
        {
            header: 'Actions',
            cell: (r) => (
                <div className="flex items-center justify-end gap-2">
                    {(r.status !== 'approved') && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            onClick={() => handleStatus(r.id, 'approved')}
                            title="Approve"
                        >
                            <Check size={15} />
                        </Button>
                    )}
                    {(r.status !== 'rejected') && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => handleStatus(r.id, 'rejected')}
                            title="Reject"
                        >
                            <X size={15} />
                        </Button>
                    )}
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-gray-400 hover:text-red-400"
                        onClick={() => handleDelete(r.id)}
                        title="Delete"
                    >
                        <Trash2 size={15} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Reviews Moderation">
            <Head title="Reviews Moderation — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Reviews</h2>
                    <p className="text-gray-400 text-sm mt-1">Moderate customer reviews</p>
                </div>
            </div>

            <DataTable
                data={reviews}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
