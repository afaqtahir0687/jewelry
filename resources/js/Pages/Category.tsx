import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import ProductCard from '@/components/ProductCard';
import type { ProductCard as ProductCardType, PaginatedData } from '@/types';

interface SubCategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    banner_image?: string;
}

interface CategoryProps {
    category: Category;
    subcategories: SubCategory[];
    products: PaginatedData<ProductCardType>;
    cities: { id: number; name: string }[];
    categories: Category[];
    filters: {
        subcategory_id?: string;
        status?: string;
        purity?: string;
        budget_max?: string;
    };
}

export default function CategoryPage({ category, subcategories, products, filters }: CategoryProps) {
    const [subcategoryId, setSubcategoryId] = useState(filters.subcategory_id || '');
    const [status,        setStatus]        = useState(filters.status || '');
    const [purity,        setPurity]        = useState(filters.purity || '');
    const [budgetMax,     setBudgetMax]     = useState(filters.budget_max || '');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const activeFilterCount = [subcategoryId, status, purity, budgetMax].filter(Boolean).length;

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(`/${category.slug}`, {
            subcategory_id: subcategoryId,
            status,
            purity,
            budget_max: budgetMax,
        });
        setMobileFiltersOpen(false);
    };

    const heroImage = category.banner_image || category.image;

    const filterFormFields = (
        <>
            {/* Subcategory Filter */}
            {subcategories.length > 0 && (
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Subcategory</label>
                    <select
                        value={subcategoryId}
                        onChange={(e) => setSubcategoryId(e.target.value)}
                        className="w-full bg-[#fff8f0] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]">
                        <option value="">All</option>
                        {subcategories.map((sc) => (
                            <option key={sc.id} value={sc.id}>{sc.name}</option>
                        ))}
                    </select>
                </div>
            )}

            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Availability</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#fff8f0] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]">
                    <option value="">All Types</option>
                    <option value="available">Available in Stock</option>
                    <option value="made_to_order">Made to Order</option>
                    <option value="design_inspiration">Design Inspiration</option>
                </select>
            </div>

            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Max Budget (PKR)</label>
                <input
                    type="number"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full bg-[#fff8f0] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]"
                />
            </div>

            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Gold Purity</label>
                <select
                    value={purity}
                    onChange={(e) => setPurity(e.target.value)}
                    className="w-full bg-[#fff8f0] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]">
                    <option value="">All Purities</option>
                    <option value="22K Gold">22K Gold</option>
                    <option value="21K Gold">21K Gold</option>
                    <option value="18K Gold">18K Gold</option>
                    <option value="18K White Gold">18K White Gold</option>
                </select>
            </div>

            <div className="pt-4 flex gap-2">
                <button
                    type="submit"
                    className="w-full bg-[#d4af37] hover:bg-[#bda030] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow shadow-[#d4af37]/10 transition-all duration-300 hover-shine active:scale-[0.98]">
                    Filter
                </button>
                <Link
                    href={`/${category.slug}`}
                    className="w-full text-center border border-[#4a0e0e]/20 hover:bg-[#fff8f0] text-[#4a0e0e] text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 active:scale-[0.98]">
                    Clear
                </Link>
            </div>
        </>
    );

    return (
        <AppLayout>
            <Head title={`${category.name} | Online Jewelry Shop`} />

            {/* Hero Banner */}
            <section className="bg-[#4a0e0e] text-white py-16 relative overflow-hidden border-b border-[#d4af37]/10">
                <div className="absolute inset-0 opacity-15">
                    {heroImage && (
                        <img 
                            src={heroImage.startsWith('http') ? heroImage : `/${heroImage}`} 
                            alt={category.name} 
                            className="w-full h-full object-cover" 
                        />
                    )}
                    <div className="absolute inset-0 bg-[#4a0e0e]/80" />
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs mb-2 block">Catalogues</span>
                    <h1 className="font-luxury text-3xl md:text-5xl font-bold mb-4">{category.name}</h1>
                    {category.description && (
                        <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">{category.description}</p>
                    )}
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in-up">
                {/* Mobile Filter Accordion Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-3.5 shadow-sm"
                    >
                        <span className="font-luxury font-bold text-sm text-[#4a0e0e] flex items-center gap-2">
                            <i className="fa-solid fa-sliders text-[#d4af37]" /> Filter Catalog
                            {activeFilterCount > 0 && (
                                <span className="bg-[#d4af37] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>
                            )}
                        </span>
                        <i className={`fa-solid fa-chevron-down text-xs text-[#4a0e0e] transition-transform duration-300 ${mobileFiltersOpen ? 'rotate-180 text-[#d4af37]' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileFiltersOpen ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
                            <form onSubmit={handleFilterSubmit} className="space-y-4">
                                {filterFormFields}
                            </form>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Filters (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6 transition-all duration-300 hover:shadow-md sticky top-24">
                            <h3 className="font-luxury text-base font-bold text-[#4a0e0e] border-b border-gray-100 pb-2">Filter Catalog</h3>

                            <form onSubmit={handleFilterSubmit} className="space-y-4">
                                {filterFormFields}
                            </form>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Result count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-semibold text-[#4a0e0e]">{products.total}</span> design{products.total !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {products.data.length === 0 ? (
                            <div className="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-sm">
                                <i className="fa-solid fa-gem text-5xl text-gray-300 mb-4 block" />
                                <h3 className="font-luxury font-bold text-xl mb-2 text-[#4a0e0e]">No Designs Found</h3>
                                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">No designs match your current filters.</p>
                                <Link href={`/${category.slug}`} className="text-[#d4af37] font-bold text-sm hover:underline">
                                    Clear all filters
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.data.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.last_page > 1 && (
                                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
                                        {products.links?.map((link, i) => (
                                            <button
                                                key={i}
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url)}
                                                className={`px-4 py-2 text-xs rounded border transition-all duration-200 ${
                                                    link.active
                                                        ? 'bg-[#d4af37] text-white border-[#d4af37] font-bold'
                                                        : link.url
                                                        ? 'bg-white text-[#4a0e0e] border-gray-200 hover:border-[#d4af37] hover:text-[#d4af37]'
                                                        : 'bg-white text-gray-300 border-gray-100 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
