import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import type { Category } from '@/types';

interface AdminCategory extends Category {
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    banner_image?: string;
}

interface CategoriesEditProps {
    category: AdminCategory;
}

export default function CategoriesEdit({ category }: CategoriesEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method:      'PATCH',
        name:         category.name,
        description:  category.description   || '',
        image:        null as File | null,
        banner_image: null as File | null,
        is_active:    category.is_active,
        is_featured:  category.is_featured,
        sort_order:   category.sort_order    ?? 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Send as POST with PATCH method spoofing because of PHP/Multipart limitation
        post(`/admin/categories/${category.id}`);
    };

    return (
        <AdminLayout title="Edit Category">
            <Head title={`Edit ${category.name} — Admin`} />

            <div className="mb-6">
                <Link href="/admin/categories" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Categories
                </Link>
                <h2 className="text-2xl font-bold text-white">Edit: {category.name}</h2>
            </div>

            <div className="max-w-2xl rounded-xl border border-white/10 bg-white/5 p-6">
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name *</Label>
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
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Short description of this category..."
                            className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold resize-vertical"
                        />
                        {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="image">Category Image</Label>
                            {category.image && (
                                <img 
                                    src={category.image.startsWith('http') ? category.image : `/${category.image}`} 
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
                            <Label htmlFor="banner_image">Banner Image</Label>
                            {category.banner_image && (
                                <img 
                                    src={category.banner_image.startsWith('http') ? category.banner_image : `/${category.banner_image}`} 
                                    alt="banner preview" 
                                    className="w-full h-32 object-cover rounded-lg mb-2 border border-white/10" 
                                />
                            )}
                            <input
                                id="banner_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('banner_image', e.target.files ? e.target.files[0] : null)}
                                className="w-full bg-white/5 border border-white/10 text-white rounded px-2.5 py-1.5 text-xs file:bg-gold file:text-black file:border-0 file:rounded file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
                            />
                            {errors.banner_image && <p className="text-red-400 text-sm">{errors.banner_image}</p>}
                        </div>
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

                    <div className="flex flex-col sm:flex-row gap-6 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer">
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

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="w-4 h-4 accent-gold"
                            />
                            <div>
                                <span className="text-sm font-medium text-white">Featured</span>
                                <p className="text-xs text-gray-400">Show with product slider on homepage</p>
                            </div>
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <Link href="/admin/categories">
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
