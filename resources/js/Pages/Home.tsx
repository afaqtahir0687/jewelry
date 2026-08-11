import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import ProductCard from '@/components/ProductCard';
import DiscountBadge from '@/components/DiscountBadge';
import Reveal from '@/Components/Reveal';
import WhyChooseUs from '@/Components/WhyChooseUs';
import NewsletterSignup from '@/Components/NewsletterSignup';
import FaqSection from '@/Components/FaqSection';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import type { Category, ProductCard as ProductCardType } from '@/types';

interface City {
    id: number;
    name: string;
    slug: string;
}

interface FeaturedCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    products: ProductCardType[];
    total_products: number;
}

interface Faq {
    id: number;
    question: string;
    answer: string;
}

interface HomeProps {
    cities: City[];
    categories: Category[];
    latestArrivals: ProductCardType[];
    featuredCategories: FeaturedCategory[];
    faqs: Faq[];
}

const BUDGET_OPTIONS = [
    { value: 'Under Rs. 100,000', label: 'Under Rs. 100,000' },
    { value: 'Rs. 100,000 - 250,000', label: 'Rs. 100,000 – 250,000' },
    { value: 'Rs. 250,000 - 500,000', label: 'Rs. 250,000 – 500,000' },
    { value: 'Above Rs. 500,000', label: 'Above Rs. 500,000' },
];

const SLIDES = [
    {
        image: '/images/banner1.webp',
        imageFallback: '/images/banner1.jpg',
        position: 'left top',
        eyebrow: 'Timeless Craftsmanship',
        heading: 'Find Trusted Gold & Diamond Jewellers',
        tagline: 'Discover certified artisans, transparent pricing and bespoke designs in one elegant marketplace.',
    },
    {
        image: '/images/banner2.webp',
        imageFallback: '/images/banner2.jpg',
        position: 'left top',
        eyebrow: 'Bridal & Heritage Sets',
        heading: 'Heirloom Pieces Crafted For a Lifetime',
        tagline: 'From heritage bridal sets to modern solitaires, connect with Pakistan\'s top jewellers.',
    },
    {
        image: '/images/banner3.webp',
        imageFallback: '/images/banner3.jpg',
        position: 'left top',
        eyebrow: 'Bespoke & Custom Orders',
        heading: 'Design Your Own Dream Ornament Today',
        tagline: 'Share your vision and get personalised quotes from top-rated artisans near you.',
    },
];

export default function Home({ cities, categories, latestArrivals, featuredCategories, faqs }: HomeProps) {
    const [searchCategory, setSearchCategory] = useState('');
    const [searchCityId, setSearchCityId] = useState('');
    const [searchBudget, setSearchBudget] = useState('');
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [otherSlidesLoaded, setOtherSlidesLoaded] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % SLIDES.length);
        }, 5500);
        return () => clearInterval(timer);
    }, []);

    // Defer loading the remaining slide images until after the first (LCP) image has painted,
    // so they don't compete for bandwidth/priority on initial load.
    useEffect(() => {
        const idle = ('requestIdleCallback' in window)
            ? (window as any).requestIdleCallback(() => setOtherSlidesLoaded(true))
            : setTimeout(() => setOtherSlidesLoaded(true), 1000);
        return () => {
            if ('cancelIdleCallback' in window) (window as any).cancelIdleCallback(idle);
            else clearTimeout(idle);
        };
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', {
            category: searchCategory,
            city_id: searchCityId,
            budget: searchBudget,
        });
    };

    const activeSlide = SLIDES[currentBannerIndex];

    return (
        <AppLayout>
            <Head title="Find Trusted Jewellers in Pakistan" />

            {/* ── Hero Banner Slider ────────────────────────────────────── */}
            <section className="relative bg-[#4a0e0e] min-h-[max(440px,calc(100dvh-6rem))] overflow-hidden flex items-center">
                {/* Background Slides */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentBannerIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={activeSlide.imageFallback}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover animate-[kenBurns_20s_ease-out_forwards]"
                                style={{ objectPosition: activeSlide.position }}
                                fetchPriority={currentBannerIndex === 0 ? 'high' : 'low'}
                                loading={currentBannerIndex === 0 ? 'eager' : 'lazy'}
                                decoding={currentBannerIndex === 0 ? 'sync' : 'async'}
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#4a0e0e]/60 to-[#0a0a0a]/40" />
                </div>

                <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                    <motion.div 
                        animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full filter blur-[100px]" 
                    />
                    <motion.div 
                        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37] rounded-full filter blur-[100px]" 
                    />
                </div>

                {/* Discount badge — pinned to a corner, never overlaps the centered heading */}
                <motion.div 
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hidden lg:block absolute top-8 right-6 xl:right-10 z-20"
                >
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="w-28 h-28 xl:w-32 xl:h-32 relative group"
                    >
                        <div className="absolute inset-0 rounded-full border border-[#d4af37]/30 border-dashed animate-[spin_10s_linear_infinite_reverse]" />
                        <DiscountBadge />
                    </motion.div>
                </motion.div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-6 sm:py-8">
                    <div className="text-center flex flex-col items-center">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="lg:hidden w-24 h-24 sm:w-28 sm:h-28 mb-4 relative"
                        >
                            <DiscountBadge />
                        </motion.div>

                        {/* Slide-specific text */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentBannerIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col items-center"
                            >
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-block text-[#d4af37] tracking-[0.25em] uppercase font-semibold text-xs mb-3 border border-[#d4af37]/40 rounded-full px-4 py-1.5 backdrop-blur-sm"
                                >
                                    {activeSlide.eyebrow}
                                </motion.span>

                                <h1 className="font-luxury text-3xl sm:text-4xl lg:text-6xl text-white font-bold leading-tight max-w-4xl mx-auto mb-3 px-4 flex items-center justify-center min-h-[64px] sm:min-h-[90px] lg:min-h-[140px] relative">
                                    {activeSlide.heading}
                                    {/* Animated gold underline */}
                                    <motion.div 
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                                        className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" 
                                    />
                                </h1>

                                <p className="text-cream/80 text-sm sm:text-base max-w-2xl mx-auto mb-5 leading-relaxed min-h-[40px] sm:min-h-[28px] flex items-center justify-center mt-4">
                                    {activeSlide.tagline}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide indicators */}
                        <div className="flex justify-center gap-2 mb-5">
                            {SLIDES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentBannerIndex(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentBannerIndex ? 'w-8 bg-[#d4af37]' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>

                        {/* Embedded Search Bar */}
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="w-full max-w-4xl mx-auto glass-card p-5 sm:p-6 rounded-2xl shadow-2xl border border-[#d4af37]/30 relative z-20"
                        >
                            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                                <div className="flex flex-col text-left">
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Category</label>
                                    <select
                                        value={searchCategory}
                                        onChange={(e) => setSearchCategory(e.target.value)}
                                        className="w-full bg-[#fff8f0] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors duration-300">
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col text-left">
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Select City</label>
                                    <select
                                        value={searchCityId}
                                        onChange={(e) => setSearchCityId(e.target.value)}
                                        className="w-full bg-[#fff8f0] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors duration-300">
                                        <option value="">All Cities</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col text-left">
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Approximate Budget</label>
                                    <select
                                        value={searchBudget}
                                        onChange={(e) => setSearchBudget(e.target.value)}
                                        className="w-full bg-[#fff8f0] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors duration-300">
                                        <option value="">Any Budget</option>
                                        {BUDGET_OPTIONS.map((b) => (
                                            <option key={b.value} value={b.value}>{b.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#4a0e0e] hover:bg-[#b76e79] text-white font-bold py-3.5 px-4 rounded text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover-shine">
                                    <i className="fa-solid fa-magnifying-glass mr-2" /> Search
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <span className="text-xs text-gray-500">Or design your own dream ornament:
                                    <Link href="/custom-jewellery" className="text-[#d4af37] font-bold hover:underline ml-1">
                                        Request Custom Jewellery Quote <i className="fa-solid fa-chevron-right text-[10px]" />
                                    </Link>
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Latest Arrivals ───────────────────────────────────────── */}
            {latestArrivals.length > 0 && (
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal className="text-center mb-10 md:mb-20">
                            <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Fresh Designs</span>
                            <h2 className="font-luxury text-2xl sm:text-3xl md:text-5xl text-[#4a0e0e] font-bold mt-2">Latest Arrivals</h2>
                            <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                        </Reveal>

                        <HorizontalProductSlider products={latestArrivals} />
                    </div>
                </section>
            )}

            {/* ── Featured Categories with Product Sliders ─────────────── */}
            {featuredCategories.map((cat) => (
                <section key={cat.id} className="py-12 md:py-20 bg-[#fff8f0] border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal className="text-center mb-10 md:mb-20">
                            <h2 className="font-luxury text-3xl sm:text-4xl md:text-6xl text-[#4a0e0e] font-bold">{cat.name}</h2>
                            <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                        </Reveal>

                        <HorizontalProductSlider products={cat.products} />

                        {cat.total_products > cat.products.length && (
                            <div className="text-center mt-8">
                                <Link
                                    href={`/${cat.slug}`}
                                    className="inline-flex items-center gap-2 bg-[#4a0e0e] hover:bg-[#b76e79] text-white px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all duration-300">
                                    See More Designs ({cat.total_products - cat.products.length}+ more)
                                    <i className="fa-solid fa-arrow-right" />
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* ── Why Choose Us ─────────────────────────────────────────── */}
            <WhyChooseUs />

            {/* ── Customer Reviews ──────────────────────────────────────── */}
            <section className="py-12 md:py-20 bg-[#fff8f0] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="text-center mb-10 md:mb-12">
                        <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Customer Stories</span>
                        <h2 className="font-luxury text-2xl sm:text-3xl md:text-4xl text-[#4a0e0e] font-bold mt-2">What Our Clients Say</h2>
                        <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                    </Reveal>
                    <Reveal delay={150}>
                        <ReviewsCarousel />
                    </Reveal>
                </div>
            </section>

            {/* ── FAQs ──────────────────────────────────────────────────── */}
            <FaqSection faqs={faqs} />
        </AppLayout>
    );
}

function HorizontalProductSlider({ products }: { products: ProductCardType[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth;
        scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
    };

    if (!products || products.length === 0) return null;

    return (
        <div className="relative group mt-2">
            {/* Navigation Arrows (Top Right) */}
            <div className="absolute -top-16 right-0 hidden md:flex gap-2 z-10">
                <button
                    onClick={() => scroll('left')}
                    className="w-10 h-10 rounded-full bg-[#4a0e0e] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer border-2 border-transparent hover:border-white/20">
                    <i className="fa-solid fa-arrow-left-long text-sm" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="w-10 h-10 rounded-full bg-[#4a0e0e] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer border-2 border-transparent hover:border-white/20">
                    <i className="fa-solid fa-arrow-right-long text-sm" />
                </button>
            </div>

            {/* Scrollable container */}
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto pt-1 pb-4 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="snap-start flex-shrink-0 w-[85vw] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-13.33px)] lg:w-[calc(25%-15px)]"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Reviews Carousel ────────────────────────────────────────────────────────

function ReviewsCarousel() {
    const reviews = [
        { id: 1, name: 'Ayesha Khan', city: 'Lahore', rating: 5, review: 'I ordered my bridal set through Online Jewelry Shop. The design process was super smooth, and the craftsmanship of the 22K gold set is absolutely breath-taking! Highly recommended for premium orders.', date: '1 week ago' },
        { id: 2, name: 'Muhammad Ali', city: 'Karachi', rating: 5, review: 'Amazing platform! Was looking for an authentic diamond engagement ring. Got direct quotes from top verified jewellers in Karachi and bought the perfect solitaire. Transparency at its best.', date: '3 days ago' },
        { id: 3, name: 'Zainab Bibi', city: 'Islamabad', rating: 5, review: 'Ordered custom gold bangles for my daughter\'s wedding. The jeweler was extremely professional, provided proper certification, and delivered exactly what was promised. 10/10 service!', date: '2 weeks ago' },
        { id: 4, name: 'Faisal Qureshi', city: 'Faisalabad', rating: 5, review: 'The easiest way to find reliable jewelry shops in Pakistan. Got my gold rate locked and received the shipment safely with complete insurance. Will definitely buy again.', date: '5 days ago' },
    ];

    const [currentPage, setCurrentPage] = React.useState(0);
    const [direction, setDirection] = React.useState<'next' | 'prev'>('next');
    const totalPages = Math.ceil(reviews.length / 2);

    const handleNext = () => {
        setDirection('next');
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };
    const handlePrev = () => {
        setDirection('prev');
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    React.useEffect(() => {
        const interval = setInterval(handleNext, 6000);
        return () => clearInterval(interval);
    }, [totalPages]);

    const visibleReviews = [reviews[currentPage * 2], reviews[currentPage * 2 + 1]].filter(Boolean);

    return (
        <div className="max-w-6xl mx-auto relative group">
            {/* Navigation Arrows (Top Right) */}
            <div className="absolute -top-16 right-0 hidden md:flex gap-2 z-10">
                <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[#4a0e0e] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-x-0.5 cursor-pointer border-2 border-transparent hover:border-white/20" title="Previous">
                    <i className="fa-solid fa-arrow-left-long text-sm" />
                </button>
                <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[#4a0e0e] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:translate-x-0.5 cursor-pointer border-2 border-transparent hover:border-white/20" title="Next">
                    <i className="fa-solid fa-arrow-right-long text-sm" />
                </button>
            </div>

            <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleReviews.map((rev, idx) => (
                    <div
                        key={rev.id}
                        className={`bg-[#fff8f0] border border-[#d4af37]/25 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 relative hover:-translate-y-1 ${direction === 'next' ? 'animate-review-next' : 'animate-review-prev'
                            }`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <span className="absolute top-4 right-6 text-6xl text-[#d4af37]/10 font-serif">"</span>
                        <div className="flex gap-1 mb-3 text-[#d4af37]">
                            {[...Array(rev.rating)].map((_, i) => (
                                <i
                                    key={i}
                                    className="fa-solid fa-star text-xs animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 100 + 200 + i * 60}ms` }}
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 italic text-sm md:text-base leading-relaxed mb-6">"{rev.review}"</p>
                        <div className="flex items-center justify-between border-t border-gray-200/50 pt-4">
                            <div>
                                <h4 className="font-luxury font-bold text-[#4a0e0e] text-sm tracking-wide">{rev.name}</h4>
                                <p className="text-xs text-gray-400">{rev.city}, Pakistan</p>
                            </div>
                            <span className="text-xs text-[#d4af37] font-semibold">{rev.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx >= currentPage ? 'next' : 'prev');
                            setCurrentPage(idx);
                        }}
                        className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentPage ? 'w-8 bg-[#d4af37]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
}
