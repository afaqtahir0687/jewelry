import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import type { ProductCard as ProductCardType } from '@/types';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
    product: ProductCardType;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const primaryImage = product.primary_image;
    const hoverImage   = product.hover_image ?? primaryImage;

    const productUrl = product.slug
        ? `/products/${product.id}/${product.slug}`
        : `/products/${product.id}/${product.id}`;

    const hasDiscount = !product.price_on_request && product.discount_price && Number(product.discount_price) > 0;

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

    const statusLabel = product.status === 'available'
        ? 'In Stock'
        : product.status === 'made_to_order'
        ? 'Made to Order'
        : 'Design Inspiration';

    return (
        <>
            <div className="group flex flex-col relative transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container (Only this gets border/hover effect) */}
                <div 
                    className="block h-56 sm:h-72 md:h-96 w-full bg-[#fff8f0] relative overflow-hidden rounded-2xl border border-gray-200 group-hover:border-[#d4af37]/50 group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)] transition-all duration-500 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Link href={productUrl} className="block w-full h-full">
                        {primaryImage ? (
                            <>
                                {/* Primary Image */}
                                <img
                                    src={primaryImage}
                                    alt={product.title}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                                        isHovered && hoverImage !== primaryImage ? 'opacity-0 scale-110' : 'opacity-100 scale-100 group-hover:scale-105'
                                    }`}
                                />
                                {/* Hover Image */}
                                {hoverImage && hoverImage !== primaryImage && (
                                    <img
                                        src={hoverImage}
                                        alt={`${product.title} — alternate view`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                                            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                                        }`}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <i className="fa-solid fa-gem text-4xl text-gray-300" />
                            </div>
                        )}
                    </Link>

                    {/* Status Badge */}
                    <span className="absolute top-3 right-3 bg-[#4a0e0e]/90 text-[#d4af37] text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">
                        {statusLabel}
                    </span>

                    {/* Top Left Badge */}
                    {hasDiscount && discountPercentage > 0 ? (
                        <span className="absolute top-3 left-3 bg-[#d4af37] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10 animate-pulse">
                            -{discountPercentage}% OFF
                        </span>
                    ) : product.is_featured ? (
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-[#d4af37] to-[#e8c766] text-[#4a0e0e] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-md z-10">
                            ✦ Featured
                        </span>
                    ) : null}

                    {/* Quick view button overlay */}
                    <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
                    }`}>
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setModalOpen(true);
                            }}
                            className="w-full text-center bg-white/90 backdrop-blur hover:bg-[#d4af37] hover:text-white text-[#4a0e0e] text-xs font-bold py-3 rounded-xl shadow-xl transition-colors tracking-widest uppercase"
                        >
                            Quick View
                        </button>
                    </div>
                </div>

                {/* Card Body */}
                <div className="pt-4 pb-2 flex flex-col justify-between px-1">
                    <div>
                        <Link href={productUrl}>
                            <h3 className="font-luxury font-bold text-lg text-[#0a0a0a] line-clamp-1 group-hover:text-[#d4af37] transition-colors duration-300 leading-snug">
                                {product.title}
                            </h3>
                        </Link>
    
                        {/* Reviews */}
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                            <div className="flex text-[#d4af37] gap-0.5 text-[10px]">
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                            </div>
                            <span>({(product.id % 20) + 12})</span>
                        </div>
                    </div>
    
                    <div className="mt-2.5 flex items-end gap-2.5">
                        {hasDiscount ? (
                            <>
                                <span className="font-bold text-base text-[#4a0e0e]">
                                    {displayPrice}
                                </span>
                                <span className="text-gray-400 line-through text-xs mb-0.5">
                                    {originalPrice}
                                </span>
                            </>
                        ) : (
                            <span className={`font-semibold text-base ${product.price_on_request ? 'text-gray-400 italic' : 'text-[#4a0e0e]'}`}>
                                {displayPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                product={product} 
            />
        </>
    );
}
