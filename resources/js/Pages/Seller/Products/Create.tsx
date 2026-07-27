import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Category } from '@/types';

interface CreateProps {
    categories: Category[];
}

export default function SellerProductCreate({ categories }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: '',
        description: '',
        price_on_request: true,
        price: '',
        gold_purity: '',
        approximate_weight: '',
        stone_info: '',
        status: 'available',
        customisation_options: '',
        images: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/seller/products');
    };

    return (
        <SellerLayout title="Add New Design">
            <Head title="Add Design — Seller" />

            <div className="max-w-2xl space-y-6">
                <Link href="/seller/products">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white -ml-2">
                        <ArrowLeft size={16} className="mr-2" /> Back to Catalog
                    </Button>
                </Link>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Design Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Diamond Solitaire Wedding Ring"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category_id">Category</Label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold"
                                    required
                                >
                                    <option value="" className="bg-[#0f172a]">-- Select Category --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id} className="bg-[#0f172a]">{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-400 text-xs">{errors.category_id}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Product Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe craftsmanship details, cut, diamond counts..."
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                            />
                            {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                            <div className="flex items-center gap-2">
                                <input
                                    id="price_on_request"
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold"
                                    checked={data.price_on_request}
                                    onChange={(e) => setData('price_on_request', e.target.checked)}
                                />
                                <Label htmlFor="price_on_request" className="cursor-pointer">Price on Request</Label>
                            </div>

                            {!data.price_on_request && (
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (PKR)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="350000"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    {errors.price && <p className="text-red-400 text-xs">{errors.price}</p>}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="gold_purity">Gold Purity / Metal</Label>
                                <Input
                                    id="gold_purity"
                                    placeholder="e.g. 22K Gold, Platinum"
                                    value={data.gold_purity}
                                    onChange={(e) => setData('gold_purity', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="approximate_weight">Weight (approx)</Label>
                                <Input
                                    id="approximate_weight"
                                    placeholder="e.g. 12.5 grams"
                                    value={data.approximate_weight}
                                    onChange={(e) => setData('approximate_weight', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Availability</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none"
                                >
                                    <option value="available" className="bg-[#0f172a]">Ready Stock</option>
                                    <option value="made_to_order" className="bg-[#0f172a]">Made to Order</option>
                                    <option value="design_inspiration" className="bg-[#0f172a]">Design Only</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stone_info">Stone / Diamond Info</Label>
                            <Input
                                id="stone_info"
                                placeholder="e.g. 1.2ct VVS1 Emerald Cut Diamond"
                                value={data.stone_info}
                                onChange={(e) => setData('stone_info', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="customisation_options">Customisation Options</Label>
                            <Textarea
                                id="customisation_options"
                                placeholder="Available in white gold, customizable weight..."
                                value={data.customisation_options}
                                onChange={(e) => setData('customisation_options', e.target.value)}
                                rows={2}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="images">Upload Photos</Label>
                            <input
                                id="images"
                                type="file"
                                multiple
                                onChange={(e) => setData('images', Array.from(e.target.files ?? []))}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white/15 file:text-white file:cursor-pointer hover:file:bg-white/20"
                            />
                            {errors.images && <p className="text-red-400 text-xs">{errors.images}</p>}
                        </div>

                        <Button type="submit" className="w-full mt-4" disabled={processing}>
                            {processing ? 'Publishing...' : 'Publish Product Design'}
                        </Button>
                    </form>
                </div>
            </div>
        </SellerLayout>
    );
}
