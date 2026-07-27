import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { City, PaginatedData } from '@/types';

interface CitiesIndexProps {
    cities: PaginatedData<City>;
}

export default function AdminCitiesIndex({ cities }: CitiesIndexProps) {
    const [editingCity, setEditingCity] = useState<City | null>(null);

    const createForm = useForm({
        name: '',
    });

    const editForm = useForm({
        name: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/cities', {
            onSuccess: () => createForm.reset(),
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCity) return;
        editForm.patch(`/admin/cities/${editingCity.id}`, {
            onSuccess: () => setEditingCity(null),
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete city "${name}"?`)) {
            router.delete(`/admin/cities/${id}`);
        }
    };

    const startEdit = (city: City) => {
        setEditingCity(city);
        editForm.setData('name', city.name);
    };

    return (
        <AdminLayout title="Cities">
            <Head title="Cities — Admin" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* List Cities */}
                <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">All Cities</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{cities.total} total</p>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Jewellers</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cities.data.map((city) => (
                                <TableRow key={city.id}>
                                    <TableCell className="font-medium">{city.name}</TableCell>
                                    <TableCell className="font-mono text-xs text-gray-400">{city.slug}</TableCell>
                                    <TableCell>{city.jewellers_count ?? 0}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 hover:text-gold"
                                                onClick={() => startEdit(city)}
                                            >
                                                <Pencil size={14} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 hover:text-red-400"
                                                onClick={() => handleDelete(city.id, city.name)}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {cities.last_page > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                            <p className="text-sm text-gray-400">Page {cities.current_page} of {cities.last_page}</p>
                            <div className="flex gap-2">
                                {cities.prev_page_url && <Link href={cities.prev_page_url}><Button variant="outline" size="sm">Previous</Button></Link>}
                                {cities.next_page_url && <Link href={cities.next_page_url}><Button variant="outline" size="sm">Next</Button></Link>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Forms Column */}
                <div className="space-y-6">
                    {/* Create City */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                        <h3 className="font-semibold text-white mb-4">Create City</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-city-name">City Name</Label>
                                <Input
                                    id="new-city-name"
                                    placeholder="e.g. Peshawar"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    required
                                />
                                {createForm.errors.name && (
                                    <p className="text-red-400 text-xs">{createForm.errors.name}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={createForm.processing}>
                                Create City
                            </Button>
                        </form>
                    </div>

                    {/* Edit City */}
                    {editingCity && (
                        <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
                            <h3 className="font-semibold text-gold mb-4">Edit City</h3>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-city-name">City Name</Label>
                                    <Input
                                        id="edit-city-name"
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
                                        onClick={() => setEditingCity(null)}
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
