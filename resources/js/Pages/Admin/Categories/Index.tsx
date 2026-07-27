import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Category, PaginatedData } from '@/types';

interface CategoriesIndexProps {
    categories: PaginatedData<Category>;
}

export default function AdminCategoriesIndex({ categories }: CategoriesIndexProps) {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const createForm = useForm({
        name: '',
    });

    const editForm = useForm({
        name: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/categories', {
            onSuccess: () => createForm.reset(),
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;
        editForm.patch(`/admin/categories/${editingCategory.id}`, {
            onSuccess: () => setEditingCategory(null),
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete category "${name}"?`)) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    const startEdit = (cat: Category) => {
        setEditingCategory(cat);
        editForm.setData('name', cat.name);
    };

    return (
        <AdminLayout title="Categories">
            <Head title="Categories — Admin" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* List Categories */}
                <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">All Categories</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{categories.total} total</p>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell className="font-medium">{cat.name}</TableCell>
                                    <TableCell className="font-mono text-xs text-gray-400">{cat.slug}</TableCell>
                                    <TableCell>{cat.products_count ?? 0}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 hover:text-gold"
                                                onClick={() => startEdit(cat)}
                                            >
                                                <Pencil size={14} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 hover:text-red-400"
                                                onClick={() => handleDelete(cat.id, cat.name)}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {categories.last_page > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                            <p className="text-sm text-gray-400">Page {categories.current_page} of {categories.last_page}</p>
                            <div className="flex gap-2">
                                {categories.prev_page_url && <Link href={categories.prev_page_url}><Button variant="outline" size="sm">Previous</Button></Link>}
                                {categories.next_page_url && <Link href={categories.next_page_url}><Button variant="outline" size="sm">Next</Button></Link>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Forms Column */}
                <div className="space-y-6">
                    {/* Create Category */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                        <h3 className="font-semibold text-white mb-4">Create Category</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-name">Category Name</Label>
                                <Input
                                    id="new-name"
                                    placeholder="e.g. Silver Rings"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    required
                                />
                                {createForm.errors.name && (
                                    <p className="text-red-400 text-xs">{createForm.errors.name}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={createForm.processing}>
                                Create Category
                            </Button>
                        </form>
                    </div>

                    {/* Edit Category */}
                    {editingCategory && (
                        <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
                            <h3 className="font-semibold text-gold mb-4">Edit Category</h3>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Category Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        required
                                    />
                                    {editForm.errors.name && (
                                        <p className="text-red-400 text-xs">{editForm.errors.name}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" className="flex-1" disabled={editForm.processing}>
                                        Save
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setEditingCategory(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
