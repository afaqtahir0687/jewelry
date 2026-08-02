import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';

interface SimpleCategory {
    id: number;
    name: string;
}

interface SubCategoriesCreateProps {
    categories: SimpleCategory[];
}

export default function SubCategoriesCreate({ categories }: SubCategoriesCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name:        '',
        slug:        '',
        description: '',
        image:       null as File | null,
        is_active:   true as boolean,
        sort_order:  0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/subcategories');
    };

    return (
        <AdminLayout title="Create Subcategory">
            <Head title="Create Subcategory — Admin" />

            <div className="mb-6">
                <Link href="/admin/subcategories" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Subcategories
                </Link>
                <h2 className="text-2xl font-bold text-white">Create Subcategory</h2>
            </div>

            <div className="max-w-xl rounded-xl border border-white/10 bg-white/5 p-6">
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                        <Label htmlFor="category_id">Parent Category *</Label>
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
                        >
                            <option value="">Select a category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-400 text-sm">{errors.category_id}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Subcategory Name *</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="e.g. Bridal Sets"
                            className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="bg-white/5 border-white/10 text-white text-xs font-mono"
                        />
                        {errors.slug && <p className="text-red-400 text-sm">{errors.slug}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold resize-vertical"
                        />
                        {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Subcategory Image File</Label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full bg-white/5 border border-white/10 text-white rounded px-2.5 py-1.5 text-xs file:bg-gold file:text-black file:border-0 file:rounded file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
                        />
                        {errors.image && <p className="text-red-400 text-sm">{errors.image}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sort_order">Sort Order</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', Number(e.target.value))}
                            className="bg-white/5 border-white/10 text-white w-32"
                        />
                        {errors.sort_order && <p className="text-red-400 text-sm">{errors.sort_order}</p>}
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer pt-2">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="w-4 h-4 accent-gold"
                        />
                        <div>
                            <span className="text-sm font-medium text-white">Active</span>
                            <p className="text-xs text-gray-400">Visible on the public website</p>
                        </div>
                    </label>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <Link href="/admin/subcategories">
                            <Button type="button" variant="outline" className="border-white/10 text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="bg-gold text-black hover:bg-gold/90">
                            {processing ? 'Creating...' : 'Create Subcategory'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
