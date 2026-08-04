import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import type { ProductCard as ProductCardType } from '@/types';

interface ProductCardProps {
    product: ProductCardType;
}

/**
 * Reusable Product Card used across:
 * - Latest Arrivals (homepage)
 * - Featured Categories (homepage)
 * - Category pages
 * - Product detail page (related products)
 * - Search results
 *
 * Image 1 = primary; Image 2 = hover image (falls back to primary if only 1 image).
 */
export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

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
        <div className="group flex flex-col relative transition-all duration-300">
            {/* Image Container (Only this gets border/hover effect) */}
            <Link 
                href={productUrl} 
                className="block h-96 w-full bg-[#faf9f6] relative overflow-hidden rounded-2xl border border-gray-200 group-hover:border-gray-900 group-hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {primaryImage ? (
                    <>
                        {/* Primary Image */}
                        <img
                            src={primaryImage.startsWith('http') ? primaryImage : primaryImage}
                            alt={product.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                                isHovered && hoverImage !== primaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100 group-hover:scale-105'
                            }`}
                        />
                        {/* Hover Image (only shown if different from primary) */}
                        {hoverImage && hoverImage !== primaryImage && (
                            <img
                                src={hoverImage.startsWith('http') ? hoverImage : hoverImage}
                                alt={`${product.title} — alternate view`}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                }`}
                            />
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <i className="fa-solid fa-gem text-4xl text-gray-300" />
                    </div>
                )}

                {/* Status Badge */}
                <span className="absolute top-3 right-3 bg-[#0f172a]/80 text-[#d4af37] text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                    {statusLabel}
                </span>

                {/* Top Left Badge: Discount % OR Featured */}
                {hasDiscount && discountPercentage > 0 ? (
                    <span className="absolute top-3 left-3 bg-[#d4af37] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
                        -{discountPercentage}% OFF
                    </span>
                ) : product.is_featured ? (
                    <span className="absolute top-3 left-3 bg-[#d4af37] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
                        ✦ Featured
                    </span>
                ) : null}

                {/* Dark overlay on hover + Quick view button */}
                <div className={`absolute inset-0 bg-[#0f172a]/25 transition-opacity duration-300 flex flex-col justify-end p-4 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                    <span className="w-full text-center bg-[#d4af37] hover:bg-[#b8952b] text-white text-xs font-semibold py-2 rounded-lg shadow-lg transition-colors">
                        Quick view
                    </span>
                </div>
            </Link>

            {/* Card Body (Outside the bordered box, transparent background) */}
            <div className="pt-3 pb-1 flex flex-col justify-between">
                <div>
                    <Link href={productUrl}>
                        <h3 className="font-sans font-medium text-sm text-[#333] line-clamp-1 hover:text-[#d4af37] transition-colors duration-300 leading-snug">
                            {product.title}
                        </h3>
                    </Link>
 
                    {/* Mock/Real Reviews Stars */}
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                        <div className="flex text-[#d4af37] gap-0.5 text-xs">
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                        </div>
                        <span>{(product.id % 20) + 12} reviews</span>
                    </div>
                </div>
 
                <div className="mt-1.5 flex items-center gap-2">
                    {hasDiscount ? (
                        <>
                            <span className="font-bold text-sm text-[#7B0A26]">
                                {displayPrice}
                            </span>
                            <span className="text-gray-400 line-through text-xs">
                                {originalPrice}
                            </span>
                        </>
                    ) : (
                        <span className={`font-semibold text-sm ${product.price_on_request ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                            {displayPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
