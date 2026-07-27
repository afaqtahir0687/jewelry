import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Check, X, Trash2, Star } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/admin/StatusBadge';
import type { Review, PaginatedData } from '@/types';

interface ReviewsIndexProps {
    reviews: PaginatedData<Review>;
}

export default function AdminReviewsIndex({ reviews }: ReviewsIndexProps) {
    const handleStatus = (id: number, status: 'approved' | 'rejected') => {
        router.patch(`/admin/reviews/${id}`, { status });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this review?')) {
            router.delete(`/admin/reviews/${id}`);
        }
    };

    return (
        <AdminLayout title="Reviews Moderation">
            <Head title="Reviews Moderation — Admin" />

            <div className="rounded-xl border border-white/10 bg-white/5">
                <div className="px-6 py-4 border-b border-white/10">
                    <h2 className="font-semibold text-white">All Reviews</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{reviews.total} total reviews</p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Jeweller</TableHead>
                            <TableHead>Reviewer</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.data.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell className="font-medium">{r.jeweller ?? '—'}</TableCell>
                                <TableCell>{r.reviewer_name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-gold">
                                        <Star size={13} fill="currentColor" />
                                        <span className="text-sm font-semibold">{r.rating}/5</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-300 text-sm max-w-xs truncate" title={r.comment}>
                                    {r.comment ?? <span className="text-gray-500 italic">No comment</span>}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={r.status ?? 'pending'} />
                                </TableCell>
                                <TableCell className="text-xs text-gray-400">{r.created_at}</TableCell>
                                <TableCell className="text-right">
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {reviews.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">Page {reviews.current_page} of {reviews.last_page}</p>
                        <div className="flex gap-2">
                            {reviews.prev_page_url && <Link href={reviews.prev_page_url}><Button variant="outline" size="sm">Previous</Button></Link>}
                            {reviews.next_page_url && <Link href={reviews.next_page_url}><Button variant="outline" size="sm">Next</Button></Link>}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
