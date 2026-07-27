import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Product, PaginatedData } from '@/types';

interface ProductsIndexProps {
    products: PaginatedData<Product>;
}

export default function AdminProductsIndex({ products }: ProductsIndexProps) {
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Delete product "${title}"?`)) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AdminLayout title="Products">
            <Head title="Products — Admin" />

            <div className="rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div>
                        <h2 className="font-semibold text-white">All Products</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{products.total} total</p>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Jeweller</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Gold</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.data.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>
                                    {p.images && p.images[0] ? (
                                        <img
                                            src={p.images[0].startsWith('http') ? p.images[0] : `/storage/${p.images[0]}`}
                                            alt={p.title}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-500 text-xs">—</div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium max-w-[200px] truncate">{p.title}</TableCell>
                                <TableCell>{p.jeweller ?? '—'}</TableCell>
                                <TableCell>{p.category ?? '—'}</TableCell>
                                <TableCell className="text-sm">
                                    {p.price_on_request ? <span className="text-gold">On Request</span> : `Rs. ${p.price?.toLocaleString() ?? '—'}`}
                                </TableCell>
                                <TableCell className="text-sm text-gray-400">{p.gold_purity ?? '—'}</TableCell>
                                <TableCell><StatusBadge status={p.status} /></TableCell>
                                <TableCell className="text-xs text-gray-400">{p.created_at}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 hover:text-red-400"
                                        onClick={() => handleDelete(p.id, p.title)}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {products.last_page > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">Page {products.current_page} of {products.last_page}</p>
                        <div className="flex gap-2">
                            {products.prev_page_url && <Link href={products.prev_page_url}><Button variant="outline" size="sm">Previous</Button></Link>}
                            {products.next_page_url && <Link href={products.next_page_url}><Button variant="outline" size="sm">Next</Button></Link>}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
