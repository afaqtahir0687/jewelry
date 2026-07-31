import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete } from '@/lib/swal';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { City, PaginatedData } from '@/types';

interface CitiesIndexProps {
    cities: PaginatedData<City>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function CitiesIndex({ cities, filters }: CitiesIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/cities', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/cities', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, name: string) => {
        confirmDelete(
            'Delete City?',
            `Are you sure you want to delete city "${name}"? This action cannot be undone.`,
            () => router.delete(`/admin/cities/${id}`)
        );
    };

    const columns: Column<City>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { header: 'Name', accessorKey: 'name', sortable: true },
        { header: 'Slug', accessorKey: 'slug', sortable: true },
        { header: 'Jewellers', accessorKey: 'jewellers_count', sortable: true },
        {
            header: 'Actions',
            cell: (city) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/cities/${city.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(city.id, city.name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Cities">
            <Head title="Cities — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Cities</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage operation cities</p>
                </div>
                <Link href="/admin/cities/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add City
                    </Button>
                </Link>
            </div>

            <DataTable
                data={cities}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'id', direction: filters.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
