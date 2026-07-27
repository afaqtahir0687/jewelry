import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Jeweller, PaginatedData } from '@/types';

interface JewellersIndexProps {
    jewellers: PaginatedData<Jeweller>;
}

export default function AdminJewellersIndex({ jewellers }: JewellersIndexProps) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete "${name}"? This will also delete all their leads, products and appointments.`)) {
            router.delete(`/admin/jewellers/${id}`);
        }
    };

    const handleToggleVerified = (id: number, isVerified: boolean) => {
        router.patch(`/admin/jewellers/${id}`, { is_verified: !isVerified });
    };

    return (
        <AdminLayout title="Jewellers">
            <Head title="Jewellers — Admin" />

            <div className="rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div>
                        <h2 className="font-semibold text-white">All Jewellers</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{jewellers.total} total</p>
                    </div>
                    <Link href="/admin/jewellers/create">
                        <Button size="sm">
                            <Plus size={16} className="mr-2" /> Add Jeweller
                        </Button>
                    </Link>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Business Name</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Leads</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead>Reviews</TableHead>
                            <TableHead>User Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jewellers.data.map((j) => (
                            <TableRow key={j.id}>
                                <TableCell className="font-medium">{j.business_name}</TableCell>
                                <TableCell>{j.city ?? '—'}</TableCell>
                                <TableCell className="text-sm text-gray-400">{j.phone}</TableCell>
                                <TableCell>
                                    <button onClick={() => handleToggleVerified(j.id, j.is_verified)} title="Click to toggle">
                                        {j.is_verified
                                            ? <Badge variant="success"><CheckCircle size={12} className="mr-1" />Verified</Badge>
                                            : <Badge variant="secondary"><XCircle size={12} className="mr-1" />Unverified</Badge>
                                        }
                                    </button>
                                </TableCell>
                                <TableCell>{j.leads_count ?? 0}</TableCell>
                                <TableCell>{j.products_count ?? 0}</TableCell>
                                <TableCell>{j.reviews_count ?? 0}</TableCell>
                                <TableCell className="text-xs text-gray-400">{j.user_email ?? '—'}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/jewellers/${j.id}/edit`}>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold">
                                                <Pencil size={14} />
                                            </Button>
                                        </Link>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 hover:text-red-400"
                                            onClick={() => handleDelete(j.id, j.business_name)}
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {jewellers.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">Page {jewellers.current_page} of {jewellers.last_page}</p>
                        <div className="flex gap-2">
                            {jewellers.prev_page_url && <Link href={jewellers.prev_page_url}><Button variant="outline" size="sm">Previous</Button></Link>}
                            {jewellers.next_page_url && <Link href={jewellers.next_page_url}><Button variant="outline" size="sm">Next</Button></Link>}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
