import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import ProductCard from '@/components/ProductCard';
import type { ProductCard as ProductCardType, PaginatedData } from '@/types';

interface SubCategory {
    id: number;
    name: string;
}

interface CategoryDetail {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    banner_image?: string;
}

interface ProductShowProps {
    product: {
        id: number;
        title: string;
        slug: string;
        description?: string;
        price?: number | null;
        discount_price?: number | null;
        price_on_request: boolean;
        gold_purity?: string | null;
        approximate_weight?: string | null;
        stone_info?: string | null;
        status: string;
        customisation_options?: string | null;
        is_featured?: boolean;
        images: { id: number | null; url: string }[];
        category?: CategoryDetail | null;
        subcategory?: SubCategory | null;
    };
    relatedProducts: ProductCardType[];
}

export default function ProductShow({ product, relatedProducts }: ProductShowProps) {
    const [activeImage, setActiveImage] = useState(0);

    const statusLabel = product.status === 'available'
        ? 'In Stock'
        : product.status === 'made_to_order'
        ? 'Made to Order'
        : 'Design Inspiration';

    const hasDiscount = !product.price_on_request && !!product.discount_price && Number(product.discount_price) > 0;

    let discountPercentage = 0;
    if (hasDiscount && product.price) {
        discountPercentage = Math.round(((Number(product.price) - Number(product.discount_price)) / Number(product.price)) * 100);
    }

    const displayPrice = product.price_on_request
        ? 'Price on Request'
        : hasDiscount
        ? `Rs. ${Number(product.discount_price).toLocaleString()}`
        : product.price
        ? `Rs. ${Number(product.price).toLocaleString()}`
        : 'Price on Request';

    const originalPrice = product.price && !product.price_on_request
        ? `Rs. ${Number(product.price).toLocaleString()}`
        : null;

    const inquiryUrl = `/custom-jewellery?product_id=${product.id}&product_title=${encodeURIComponent(product.title)}`;

    return (
        <AppLayout>
            <Head title={`${product.title} | Online Jewelry Shop`} />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400 flex items-center gap-2">
                    <Link href="/" className="hover:text-[#d4af37]">Home</Link>
                    <i className="fa-solid fa-chevron-right text-[8px]" />
                    {product.category && (
                        <>
                            <Link href={`/${product.category.slug}`} className="hover:text-[#d4af37]">{product.category.name}</Link>
                            <i className="fa-solid fa-chevron-right text-[8px]" />
                        </>
                    )}
                    <span className="text-[#5c1a1b] font-semibold truncate max-w-xs">{product.title}</span>
                </div>
            </div>

            {/* Product Detail */}
            <section className="py-12 bg-[#fff8f0] animate-fade-in-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Image Gallery */}
                        <div>
                            {/* Main Image */}
                            <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md mb-4 aspect-square">
                                {hasDiscount && (
                                    <span className="absolute top-3 left-3 z-10 bg-[#d4af37] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                                        -{discountPercentage}% OFF
                                    </span>
                                )}
                                {product.images.length > 0 ? (
                                    <img
                                        src={product.images[activeImage]?.url}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <i className="fa-solid fa-gem text-6xl text-gray-300" />
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                                idx === activeImage ? 'border-[#d4af37] shadow-md' : 'border-transparent hover:border-gray-300'
                                            }`}>
                                            <img src={img.url} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col gap-6">
                            {/* Category & Subcategory badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {product.category && (
                                    <Link href={`/${product.category.slug}`} className="text-xs bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full font-semibold hover:bg-[#d4af37]/20 transition-colors">
                                        {product.category.name}
                                    </Link>
                                )}
                                {product.subcategory && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-semibold">
                                        {product.subcategory.name}
                                    </span>
                                )}
                                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                    product.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {statusLabel}
                                </span>
                                {product.is_featured && (
                                    <span className="text-xs bg-[#5c1a1b] text-[#d4af37] px-3 py-1 rounded-full font-semibold">✦ Featured</span>
                                )}
                            </div>

                            <h1 className="font-luxury text-3xl md:text-4xl font-bold text-[#5c1a1b] leading-tight">
                                {product.title}
                            </h1>

                            {/* Price */}
                            <div className="border-y border-gray-100 py-4">
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Price</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <p className={`text-2xl font-bold ${product.price_on_request ? 'text-gray-500 italic' : hasDiscount ? 'text-[#7B0A26]' : 'text-[#d4af37]'}`}>
                                        {displayPrice}
                                    </p>
                                    {hasDiscount && (
                                        <>
                                            <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
                                            <span className="bg-[#d4af37] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                                                -{discountPercentage}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Description</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Specs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.gold_purity && (
                                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Gold Purity</p>
                                        <p className="font-semibold text-[#5c1a1b] text-sm">{product.gold_purity}</p>
                                    </div>
                                )}
                                {product.approximate_weight && (
                                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Approx. Weight</p>
                                        <p className="font-semibold text-[#5c1a1b] text-sm">{product.approximate_weight}</p>
                                    </div>
                                )}
                                {product.stone_info && (
                                    <div className="bg-white rounded-lg p-4 border border-gray-100 col-span-2">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Stone Info</p>
                                        <p className="font-semibold text-[#5c1a1b] text-sm">{product.stone_info}</p>
                                    </div>
                                )}
                            </div>

                            {/* Customisation */}
                            {product.customisation_options && (
                                <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-lg p-4">
                                    <p className="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-1">
                                        <i className="fa-solid fa-paintbrush mr-1" /> Customisation Available
                                    </p>
                                    <p className="text-gray-600 text-sm">{product.customisation_options}</p>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Link
                                    href={inquiryUrl}
                                    className="flex-1 text-center bg-[#d4af37] hover:bg-[#bda030] text-white font-bold uppercase tracking-widest text-xs py-4 rounded shadow shadow-[#d4af37]/25 transition-all duration-300 active:scale-[0.98] hover-shine">
                                    <i className="fa-solid fa-gem mr-2" /> Request Custom Quote
                                </Link>
                                <a
                                    href="https://wa.me/923017730687"
                                    target="_blank"
                                    className="flex-1 text-center bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold uppercase tracking-widest text-xs py-4 rounded transition-all duration-300 active:scale-[0.98]">
                                    <i className="fa-brands fa-whatsapp mr-2" /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">You May Also Like</span>
                            <h2 className="font-luxury text-2xl md:text-3xl text-[#5c1a1b] font-bold mt-2">Related Designs</h2>
                            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-3" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </AppLayout>
    );
}
