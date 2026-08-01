import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

export default function PageCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/pages');
    };

    return (
        <AdminLayout title="Create Page">
            <Head title="Create Page — Admin" />

            <div className="flex items-center mb-6">
                <Link href="/admin/pages" className="mr-4 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-white">Create Page</h2>
                    <p className="text-gray-400 text-sm mt-1">Add a new dynamic page</p>
                </div>
            </div>

            <div className="bg-[#1e293b] rounded-lg border border-white/10 p-6 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-gray-300">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={e => {
                                    setData('title', e.target.value);
                                    if (!data.slug) {
                                        setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                    }
                                }}
                                className="bg-[#0f172a] border-white/10 text-white focus:border-gold"
                            />
                            {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug" className="text-gray-300">Slug</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                                className="bg-[#0f172a] border-white/10 text-white focus:border-gold"
                            />
                            {errors.slug && <p className="text-red-400 text-xs">{errors.slug}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-gray-300">Content (HTML allowed)</Label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            rows={10}
                            className="bg-[#0f172a] border-white/10 text-white focus:border-gold font-mono text-sm"
                        />
                        {errors.content && <p className="text-red-400 text-xs">{errors.content}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="rounded border-gray-300 text-gold focus:ring-gold"
                        />
                        <Label htmlFor="is_active" className="text-gray-300 cursor-pointer">Active (Visible to public)</Label>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/10">
                        <Button type="button" variant="ghost" className="mr-3 text-gray-400 hover:text-white" onClick={() => history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-gold text-black hover:bg-gold/90">
                            {processing ? 'Saving...' : 'Save Page'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
