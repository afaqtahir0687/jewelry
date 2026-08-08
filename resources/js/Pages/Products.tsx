import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import ProductCard from '@/components/ProductCard';
import type { ProductCard as ProductCardType, PaginatedData, Category } from '@/types';

interface City {
    id: number;
    name: string;
}

interface ProductsProps {
    products: PaginatedData<ProductCardType>;
    cities: City[];
    categories: Category[];
    filters: {
        category?: string;
        city_id?: string;
        budget?: string;
    };
}

const BUDGET_OPTIONS = [
    { value: 'Under Rs. 100,000', label: 'Under Rs. 100,000' },
    { value: 'Rs. 100,000 - 250,000', label: 'Rs. 100,000 – 250,000' },
    { value: 'Rs. 250,000 - 500,000', label: 'Rs. 250,000 – 500,000' },
    { value: 'Above Rs. 500,000', label: 'Above Rs. 500,000' },
];

export default function Products({ products, cities, categories, filters }: ProductsProps) {
    const [category, setCategory] = useState(filters.category || '');
    const [cityId, setCityId] = useState(filters.city_id || '');
    const [budget, setBudget] = useState(filters.budget || '');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const activeFilterCount = [category, cityId, budget].filter(Boolean).length;

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { category, city_id: cityId, budget });
        setMobileFiltersOpen(false);
    };

    const filterFormFields = (
        <>
            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#fff8f0] border border-gray-200 rounded px-2.5 py-2.5 text-xs focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Select City</label>
                <select
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    className="w-full bg-[#fff8f0] border border-gray-200 rounded px-2.5 py-2.5 text-xs focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
                >
                    <option value="">All Cities</option>
                    {cities.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Approximate Budget</label>
                <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#fff8f0] border border-gray-200 rounded px-2.5 py-2.5 text-xs focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
                >
                    <option value="">Any Budget</option>
                    {BUDGET_OPTIONS.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                </select>
            </div>

            <div className="pt-4 flex gap-2">
                <button type="submit" className="w-full bg-[#d4af37] hover:bg-[#bda030] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow shadow-[#d4af37]/10 transition-all duration-300 hover-shine active:scale-[0.98]">Apply</button>
                <Link href="/products" className="w-full text-center border border-[#5c1a1b]/20 hover:bg-[#fff8f0] text-[#5c1a1b] text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 active:scale-[0.98]">Clear</Link>
            </div>
        </>
    );

    return (
        <AppLayout>
            <Head title="Shop Jewellery | Online Jewelry Shop" />

            <section className="bg-gradient-to-b from-[#5c1a1b] to-[#3d1112] text-white py-14 relative overflow-hidden border-b border-[#d4af37]/20">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#d4af37] rounded-full filter blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block text-[#d4af37] tracking-[0.25em] uppercase font-semibold text-xs mb-3">Shop the Collection</span>
                    <h1 className="font-luxury text-3xl md:text-4xl font-bold">Browse Our Jewellery</h1>
                    <p className="text-sm text-gray-300 mt-2">Filter by category, city, and budget to find the perfect piece.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Mobile Filter Accordion Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-3.5 shadow-sm"
                    >
                        <span className="font-luxury font-bold text-sm text-[#5c1a1b] flex items-center gap-2">
                            <i className="fa-solid fa-sliders text-[#d4af37]" /> Filter Products
                            {activeFilterCount > 0 && (
                                <span className="bg-[#d4af37] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>
                            )}
                        </span>
                        <i className={`fa-solid fa-chevron-down text-xs text-[#5c1a1b] transition-transform duration-300 ${mobileFiltersOpen ? 'rotate-180 text-[#d4af37]' : ''}`} />
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

                    {/* Filter Sidebar (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div data-aos="fade-right" className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6 sticky top-24">
                            <h3 className="font-luxury text-base font-bold text-[#5c1a1b] border-b border-gray-100 pb-2">Filter Products</h3>
                            <form onSubmit={handleFilterSubmit} className="space-y-4">
                                {filterFormFields}
                            </form>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        <div data-aos="fade-up" className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <p className="text-sm text-[#5c1a1b]">
                                <span className="font-bold text-lg font-luxury">{products.total}</span>
                                <span className="text-gray-500"> results found</span>
                            </p>
                        </div>

                        {products.data.length === 0 ? (
                            <div className="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-sm">
                                <i className="fa-solid fa-gem text-5xl text-gray-300 mb-4 block"></i>
                                <h3 className="font-luxury font-bold text-xl mb-2 text-[#5c1a1b]">No Products Found</h3>
                                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">No products match your filter criteria. Try adjusting your filters.</p>
                                <Link href="/products" className="text-[#d4af37] font-bold text-sm hover:underline">
                                    Clear all filters
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.data.map((product, idx) => (
                                        <div key={product.id} data-aos="fade-up" data-aos-delay={Math.min(idx, 6) * 60}>
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>

                                {products.last_page > 1 && (
                                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
                                        {products.links?.map((link, i) => (
                                            <button
                                                key={i}
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                                className={`px-4 py-2 text-xs rounded border transition-all duration-200 ${
                                                    link.active
                                                        ? 'bg-[#d4af37] text-white border-[#d4af37] font-bold'
                                                        : link.url
                                                        ? 'bg-white text-[#5c1a1b] border-gray-200 hover:border-[#d4af37] hover:text-[#d4af37]'
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
