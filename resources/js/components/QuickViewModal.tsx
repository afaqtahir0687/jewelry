import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import type { ProductCard as ProductCardType } from '@/types';

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductCardType | null;
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
    if (!product) return null;

    const productUrl = product.slug
        ? `/products/${product.id}/${product.slug}`
        : `/products/${product.id}/${product.id}`;

    const hasDiscount = !product.price_on_request && product.discount_price && Number(product.discount_price) > 0;
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

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-gray-500 transition-colors"
                        >
                            <i className="fa-solid fa-xmark text-lg" />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 bg-[#fff8f0] relative h-[300px] md:h-[500px]">
                            {product.primary_image ? (
                                <img
                                    src={product.primary_image}
                                    alt={product.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <i className="fa-solid fa-gem text-6xl text-gray-300" />
                                </div>
                            )}
                            {product.is_featured && (
                                <span className="absolute top-4 left-4 bg-[#d4af37] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                                    ✦ Featured
                                </span>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                            <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-2 block">
                                Quick View
                            </span>
                            <h2 className="font-luxury text-2xl md:text-3xl font-bold text-[#4a0e0e] mb-4">
                                {product.title}
                            </h2>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-[#d4af37] gap-1 text-sm">
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                </div>
                                <span className="text-gray-400 text-sm">({(product.id % 20) + 12} reviews)</span>
                            </div>

                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-3xl font-bold text-[#4a0e0e]">
                                    {displayPrice}
                                </span>
                                {hasDiscount && (
                                    <span className="text-gray-400 line-through text-lg mb-1">
                                        {originalPrice}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                                Experience unparalleled craftsmanship with this exquisite piece. 
                                Designed to elevate your style, it reflects the true essence of luxury and tradition.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <Link
                                    href={productUrl}
                                    className="flex-1 text-center bg-[#4a0e0e] hover:bg-[#b76e79] text-white font-bold py-3.5 px-6 rounded text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover-shine"
                                >
                                    View Full Details
                                </Link>
                                <Link
                                    href="/custom-jewellery"
                                    className="flex-1 text-center border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white font-bold py-3.5 px-6 rounded text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Request Quote
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
