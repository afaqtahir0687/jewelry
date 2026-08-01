import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';

interface SeoMeta {
    id: number;
    url_path: string;
    title: string;
    description: string | null;
    keywords: string | null;
    og_image: string | null;
}

export default function Edit({ seoMeta }: { seoMeta: SeoMeta }) {
    const { data, setData, put, processing, errors } = useForm({
        url_path: seoMeta.url_path || '',
        title: seoMeta.title || '',
        description: seoMeta.description || '',
        keywords: seoMeta.keywords || '',
        og_image: seoMeta.og_image || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/seo-metas/${seoMeta.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit SEO Tag - ${seoMeta.url_path}`} />

            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/seo-metas">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit SEO Meta Tag</h1>
                        <p className="text-sm text-gray-500">Updating tags for: <span className="font-mono bg-gray-100 px-1 rounded">{seoMeta.url_path}</span></p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-3xl">
                <form onSubmit={submit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="url_path" className="text-gray-700">URL Path <span className="text-red-500">*</span></Label>
                            <Input
                                id="url_path"
                                value={data.url_path}
                                onChange={e => setData('url_path', e.target.value)}
                                placeholder="e.g., / or /about-us"
                                className="mt-1"
                            />
                            {errors.url_path && <p className="text-sm text-red-600 mt-1">{errors.url_path}</p>}
                            <p className="text-xs text-gray-500 mt-1">Use exactly the URL path of the page (e.g. <code>/contact-us</code>). Use <code>/</code> for the homepage.</p>
                        </div>

                        <div>
                            <Label htmlFor="title" className="text-gray-700">Meta Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Page Title"
                                className="mt-1"
                            />
                            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-gray-700">Meta Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Brief summary of the page content for search engines..."
                                rows={3}
                                className="mt-1"
                            />
                            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <Label htmlFor="keywords" className="text-gray-700">Meta Keywords</Label>
                            <Input
                                id="keywords"
                                value={data.keywords}
                                onChange={e => setData('keywords', e.target.value)}
                                placeholder="jewelry, gold, pakistan, online shop..."
                                className="mt-1"
                            />
                            {errors.keywords && <p className="text-sm text-red-600 mt-1">{errors.keywords}</p>}
                            <p className="text-xs text-gray-500 mt-1">Comma-separated keywords.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <Button type="submit" disabled={processing} className="bg-[#d4af37] hover:bg-[#b5952f] text-white">
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Updating...' : 'Update SEO Meta'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
