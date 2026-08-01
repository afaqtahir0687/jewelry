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
                        <Button variant="outline" size="icon" className="h-8 w-8 border-white/10 text-gray-300 hover:text-white">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Edit SEO Meta Tag</h2>
                        <p className="text-sm text-gray-400 mt-1">Updating tags for: <span className="font-mono bg-white/10 px-1 rounded">{seoMeta.url_path}</span></p>
                    </div>
                </div>
            </div>

            <div className="max-w-xl rounded-xl border border-white/10 bg-white/5 p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="url_path" className="text-gray-200">URL Path <span className="text-red-400">*</span></Label>
                            <Input
                                id="url_path"
                                value={data.url_path}
                                onChange={e => setData('url_path', e.target.value)}
                                placeholder="e.g., / or /about-us"
                                className="bg-white/5 border-white/10 text-white"
                            />
                            {errors.url_path && <p className="text-sm text-red-400">{errors.url_path}</p>}
                            <p className="text-xs text-gray-400">Use exactly the URL path of the page (e.g. <code>/contact-us</code>). Use <code>/</code> for the homepage.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-gray-200">Meta Title <span className="text-red-400">*</span></Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Page Title"
                                className="bg-white/5 border-white/10 text-white"
                            />
                            {errors.title && <p className="text-sm text-red-400">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-200">Meta Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Brief summary of the page content for search engines..."
                                rows={3}
                                className="bg-white/5 border-white/10 text-white resize-y"
                            />
                            {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="keywords" className="text-gray-200">Meta Keywords</Label>
                            <Input
                                id="keywords"
                                value={data.keywords}
                                onChange={e => setData('keywords', e.target.value)}
                                placeholder="jewelry, gold, pakistan, online shop..."
                                className="bg-white/5 border-white/10 text-white"
                            />
                            {errors.keywords && <p className="text-sm text-red-400">{errors.keywords}</p>}
                            <p className="text-xs text-gray-400">Comma-separated keywords.</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <Link href="/admin/seo-metas">
                            <Button type="button" variant="outline" className="border-white/10 text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="bg-gold text-black hover:bg-gold/90">
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Updating...' : 'Update SEO Meta'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
