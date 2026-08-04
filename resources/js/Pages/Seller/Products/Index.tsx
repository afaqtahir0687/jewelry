import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/admin/StatusBadge';
import { confirmDelete } from '@/lib/swal';
import type { Product, PaginatedData } from '@/types';

interface ProductsIndexProps {
    products: PaginatedData<Product>;
}

export default function SellerProductsIndex({ products }: ProductsIndexProps) {
    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete Catalog Design?',
            `Are you sure you want to delete design "${name}"? This action cannot be undone.`,
            () => router.delete(`/seller/products/${id}`)
        );
    };

    return (
        <SellerLayout title="My Designs & Catalog">
            <Head title="My Products — Seller" />

            <div className="rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div>
                        <h2 className="font-semibold text-white">Catalog Designs</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{products.total} listed designs</p>
                    </div>
                    <Link href="/seller/products/create">
                        <Button size="sm">
                            <Plus size={16} className="mr-2" /> Add Design Product
                        </Button>
                    </Link>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Design Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price status</TableHead>
                            <TableHead>Gold Purity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date Added</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center text-gray-500 py-12">
                                    No products found in your catalog. Add some designs!
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.data.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>
                                        {p.images && p.images[0] ? (
                                            <img
                                                src={p.images[0].startsWith('http') ? p.images[0] : `/${p.images[0]}`}
                                                alt={p.title}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-500 text-[10px]">
                                                No Img
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium max-w-xs truncate">{p.title}</TableCell>
                                    <TableCell>{p.category ?? '—'}</TableCell>
                                    <TableCell>
                                        {p.price_on_request ? (
                                            <span className="text-gold text-xs font-semibold">On Request</span>
                                        ) : (
                                            `Rs. ${p.price?.toLocaleString()}`
                                        )}
                                    </TableCell>
                                    <TableCell className="text-gray-400 text-sm">{p.gold_purity ?? '—'}</TableCell>
                                    <TableCell><StatusBadge status={p.status} /></TableCell>
                                    <TableCell className="text-gray-400 text-xs">{p.created_at}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/seller/products/${p.id}/edit`}>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold">
                                                    <Pencil size={14} />
                                                </Button>
                                            </Link>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 hover:text-red-400"
                                                onClick={() => handleDelete(p.id, p.title)}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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
        </SellerLayout>
    );
}
