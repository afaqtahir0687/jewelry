import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { confirmDelete } from '@/lib/swal';
import { PaginatedData, PageProps } from '@/types';

interface SeoMeta {
    id: number;
    url_path: string;
    title: string;
    description: string | null;
}

interface SeoMetasIndexProps extends PageProps {
    seoMetas: PaginatedData<SeoMeta>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function Index({ seoMetas, filters }: SeoMetasIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/seo-metas', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/seo-metas', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number, path: string) => {
        confirmDelete(
            'Delete SEO Meta?',
            `Are you sure you want to delete SEO meta for "${path}"? This action cannot be undone.`,
            () => router.delete(`/admin/seo-metas/${id}`)
        );
    };

    const columns: Column<SeoMeta>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { header: 'URL Path', accessorKey: 'url_path', sortable: true },
        { header: 'Meta Title', accessorKey: 'title', sortable: true },
        {
            header: 'Meta Description',
            cell: (seo) => (
                <span className="max-w-xs truncate block" title={seo.description || ''}>
                    {seo.description || <span className="text-gray-500 italic">None</span>}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (seo) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/seo-metas/${seo.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(seo.id, seo.url_path)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="SEO Meta Tags">
            <Head title="SEO Meta Tags — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">SEO Meta Tags</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage SEO title and description tags for all pages.</p>
                </div>
                <Link href="/admin/seo-metas/create">
                    <Button className="bg-gold text-black hover:bg-gold/90">
                        <Plus className="mr-2 h-4 w-4" /> Add SEO Tag
                    </Button>
                </Link>
            </div>

            <DataTable
                data={seoMetas}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}
