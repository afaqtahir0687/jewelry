import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import type { Category } from '@/types';

interface CategoriesProps {
    categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
    return (
        <AppLayout>
            <Head title="All Jewellery Categories | Online Jewelry Shop" />

            {/* Page Hero */}
            <section className="bg-[#4a0e0e] text-white py-16 relative overflow-hidden border-b border-[#d4af37]/10">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#d4af37] rounded-full filter blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-yellow-500 rounded-full filter blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs mb-2 block">Browse Collections</span>
                    <h1 className="font-luxury text-3xl md:text-5xl font-bold mb-4">All Jewellery Categories</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
                        Explore our complete range of handcrafted jewellery collections — from traditional gold sets to modern diamond designs.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 bg-[#fff8f0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
                    {categories.length === 0 ? (
                        <div className="text-center py-20">
                            <i className="fa-solid fa-gem text-6xl text-gray-300 mb-4 block" />
                            <h3 className="font-luxury font-bold text-2xl text-[#4a0e0e] mb-2">No Categories Available</h3>
                            <p className="text-gray-500 text-sm">Check back soon for our collections.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/${cat.slug}`}
                                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col hover-shine">
                                    <div className="h-64 overflow-hidden relative">
                                        {cat.image ? (
                                            <img
                                                src={cat.image.startsWith('http') ? cat.image : `/${cat.image}`}
                                                alt={cat.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <i className="fa-solid fa-gem text-5xl text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-[#4a0e0e]/20 group-hover:bg-[#4a0e0e]/30 transition-colors duration-300" />

                                        {cat.is_featured && (
                                            <span className="absolute top-3 left-3 bg-[#d4af37] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                                ✦ Featured
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h2 className="font-luxury text-xl font-bold text-[#4a0e0e] group-hover:text-[#d4af37] transition-colors duration-300">
                                                {cat.name}
                                            </h2>
                                            {cat.description && (
                                                <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{cat.description}</p>
                                            )}
                                            {cat.products_count !== undefined && (
                                                <p className="text-[#d4af37] text-xs font-semibold mt-2">
                                                    {cat.products_count} Design{cat.products_count !== 1 ? 's' : ''}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-[#d4af37] font-semibold text-xs tracking-wider uppercase mt-4 block">
                                            View Collection <i className="fa-solid fa-arrow-right ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
