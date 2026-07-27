import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface City {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
}

interface Product {
    id: number;
    title: string;
    slug: string;
    price_on_request: boolean;
    price: number | null;
    gold_purity: string | null;
    approximate_weight: string | null;
    status: string;
    images: string[] | string;
    jeweller: { business_name: string; city: City };
}

interface PaginatedProducts {
    data: Product[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface CategoryProps {
    category: Category;
    products: PaginatedProducts;
    cities: City[];
    categories: Category[];
    filters: {
        city_id?: string;
        status?: string;
        purity?: string;
        budget_max?: string;
    };
}

export default function CategoryPage({ category, products, cities, categories, filters }: CategoryProps) {
    const [cityId, setCityId] = useState(filters.city_id || '');
    const [status, setStatus] = useState(filters.status || '');
    const [purity, setPurity] = useState(filters.purity || '');
    const [budgetMax, setBudgetMax] = useState(filters.budget_max || '');

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(`/${category.slug}`, {
            city_id: cityId,
            status,
            purity,
            budget_max: budgetMax
        });
    };

    return (
        <AppLayout>
            <Head title={`${category.name} | Catalog`} />

            <section class="bg-[#0f172a] text-white py-16 relative overflow-hidden border-b border-[#d4af37]/10">
                <div class="absolute inset-0 opacity-15">
                    <img src={category.image} alt={category.name} class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-[#0f172a]"></div>
                </div>
                <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span class="text-[#d4af37] tracking-widest uppercase font-semibold text-xs mb-2 block">Catalogues</span>
                    <h1 class="font-luxury text-3xl md:text-5xl font-bold mb-4">{category.name}</h1>
                    <p class="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">{category.description}</p>
                </div>
            </section>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    <div class="lg:col-span-1">
                        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                            <h3 class="font-luxury text-base font-bold text-[#0f172a] border-b border-gray-100 pb-2">Filter Catalog</h3>
                            
                            <form onSubmit={handleFilterSubmit} class="space-y-4">
                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">City</label>
                                    <select 
                                        value={cityId} 
                                        onChange={(e) => setCityId(e.target.value)}
                                        class="w-full bg-[#faf9f6] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="">All Cities</option>
                                        {cities.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Availability</label>
                                    <select 
                                        value={status} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        class="w-full bg-[#faf9f6] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="">All Types</option>
                                        <option value="available">Available in Stock</option>
                                        <option value="made_to_order">Made to Order</option>
                                        <option value="design_inspiration">Design Inspiration</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Max Budget (PKR)</label>
                                    <input 
                                        type="number" 
                                        value={budgetMax} 
                                        onChange={(e) => setBudgetMax(e.target.value)}
                                        placeholder="e.g. 500000" 
                                        class="w-full bg-[#faf9f6] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]" 
                                    />
                                </div>

                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Gold Purity</label>
                                    <select 
                                        value={purity} 
                                        onChange={(e) => setPurity(e.target.value)}
                                        class="w-full bg-[#faf9f6] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="">All Purities</option>
                                        <option value="22K Gold">22K Gold</option>
                                        <option value="21K Gold">21K Gold</option>
                                        <option value="18K Gold">18K Gold</option>
                                    </select>
                                </div>

                                <div class="pt-4 flex gap-2">
                                    <button type="submit" class="w-full bg-[#d4af37] hover:bg-[#bda030] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow shadow-[#d4af37]/10">Filter</button>
                                    <Link href={`/${category.slug}`} class="w-full text-center border border-[#0f172a]/20 hover:bg-[#faf9f6] text-[#0f172a] text-xs font-bold uppercase tracking-wider py-2.5 rounded">Clear</Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="lg:col-span-3">
                        {products.data.length === 0 ? (
                            <div class="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-sm">
                                <i class="fa-solid fa-gem text-5xl text-gray-300 mb-4 block"></i>
                                <h3 class="font-luxury font-bold text-xl mb-2 text-[#0f172a]">No Designs Found</h3>
                                <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">No designs listed match your filters.</p>
                            </div>
                        ) : (
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.data.map((p) => {
                                    const parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                                    return (
                                        <div key={p.id} class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                                            <div class="h-48 bg-gray-100 relative">
                                                <img src={parsedImages[0]} alt={p.title} class="w-full h-full object-cover" />
                                                <span class="absolute top-3 right-3 bg-[#0f172a]/80 text-[#d4af37] text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                                                    {p.status.replace('_', ' ')}
                                                </span>
                                            </div>

                                            <div class="p-4 flex-grow flex flex-col justify-between">
                                                <div>
                                                    <h3 class="font-luxury font-bold text-base text-[#0f172a] line-clamp-1">{p.title}</h3>
                                                    <span class="text-[10px] text-gray-400 block mt-1"><i class="fa-solid fa-store mr-1 text-[#d4af37]"></i> {p.jeweller.business_name} ({p.jeweller.city.name})</span>
                                                </div>

                                                <div class="flex items-center justify-between border-t border-gray-100 pt-3 mt-4">
                                                    <span class="text-[#d4af37] font-bold text-sm">
                                                        {p.price_on_request ? 'Price on Request' : `Rs. ${p.price}`}
                                                    </span>
                                                    <Link href={`/custom-jewellery?jeweller_id=${p.jeweller.id}`} class="bg-[#d4af37] hover:bg-[#bda030] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                                                        Inquire
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
