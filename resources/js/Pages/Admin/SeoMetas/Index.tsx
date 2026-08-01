import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PaginatedData, PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface SeoMeta {
    id: number;
    url_path: string;
    title: string;
    description: string | null;
}

export default function Index({ seoMetas, filters }: PageProps & { seoMetas: PaginatedData<SeoMeta>, filters: { search?: string } }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/seo-metas', { search }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/seo-metas/${id}`, {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="SEO Meta Tags" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">SEO Meta Tags</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage SEO title and description tags for all pages.</p>
                </div>
                <Link href="/admin/seo-metas/create">
                    <Button className="bg-[#d4af37] hover:bg-[#b5952f] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add SEO Tag
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                    <form onSubmit={handleSearch} className="flex max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                            type="text" 
                            placeholder="Search by URL path or title..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9 bg-white"
                        />
                    </form>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-medium">URL Path</th>
                                <th className="px-6 py-4 font-medium">Meta Title</th>
                                <th className="px-6 py-4 font-medium">Meta Description</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {seoMetas.data.map((seo) => (
                                <tr key={seo.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                                            {seo.url_path}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{seo.title}</td>
                                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                                        {seo.description || <span className="text-gray-300 italic">None</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/seo-metas/${seo.id}/edit`}>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(seo.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                            {seoMetas.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                                <Search className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <p className="text-base font-medium text-gray-900">No SEO Meta Tags found</p>
                                            <p className="mt-1">Try adjusting your search or add a new one.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Pagination would go here if we extracted it, but we can just use simple nav for now */}
            {seoMetas.last_page > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                    {seoMetas.prev_page_url && (
                        <Link href={seoMetas.prev_page_url}>
                            <Button variant="outline" size="sm">Previous</Button>
                        </Link>
                    )}
                    {seoMetas.next_page_url && (
                        <Link href={seoMetas.next_page_url}>
                            <Button variant="outline" size="sm">Next</Button>
                        </Link>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
