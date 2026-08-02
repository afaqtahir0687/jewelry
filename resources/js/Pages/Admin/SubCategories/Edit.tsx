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

interface SubCategory {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    is_active: boolean;
    sort_order: number;
}

interface SubCategoriesEditProps {
    subcategory: SubCategory;
    categories: SimpleCategory[];
}

export default function SubCategoriesEdit({ subcategory, categories }: SubCategoriesEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method:     'PATCH',
        category_id: String(subcategory.category_id),
        name:        subcategory.name,
        slug:        subcategory.slug || '',
        description: subcategory.description || '',
        image:       null as File | null,
        is_active:   subcategory.is_active,
        sort_order:  subcategory.sort_order,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Send as POST with PATCH method spoofing because of PHP/Multipart limitation
        post(`/admin/subcategories/${subcategory.id}`);
    };

    return (
        <AdminLayout title="Edit Subcategory">
            <Head title={`Edit ${subcategory.name} — Admin`} />

            <div className="mb-6">
                <Link href="/admin/subcategories" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Subcategories
                </Link>
                <h2 className="text-2xl font-bold text-white">Edit: {subcategory.name}</h2>
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
                            className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
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
                        <Label htmlFor="image">Subcategory Image</Label>
                        {subcategory.image && (
                            <img 
                                src={subcategory.image.startsWith('http') ? subcategory.image : `/storage/${subcategory.image}`} 
                                alt="preview" 
                                className="w-full h-32 object-cover rounded-lg mb-2 border border-white/10" 
                            />
                        )}
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
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
