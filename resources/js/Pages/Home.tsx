import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import ProductCard from '@/components/ProductCard';
import DiscountBadge from '@/components/DiscountBadge';
import Reveal from '@/Components/Reveal';
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

interface HomeProps {
    cities: City[];
    categories: Category[];
    latestArrivals: ProductCardType[];
    featuredCategories: FeaturedCategory[];
}

export default function Home({ cities, categories, latestArrivals, featuredCategories }: HomeProps) {
    const [searchSpeciality, setSearchSpeciality] = useState('');
    const [searchCityId, setSearchCityId] = useState('');
    const [searchBudget, setSearchBudget] = useState('');
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    const banners = [
        '/images/banner1.png',
        '/images/banner2.png',
        '/images/banner3.png',
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/find-a-jeweller', {
            speciality: searchSpeciality,
            city_id: searchCityId,
            budget: searchBudget,
        });
    };

    return (
        <AppLayout>
            <Head title="Find Trusted Jewellers in Pakistan" />

            {/* ── Hero Section ──────────────────────────────────────────── */}
            <section className="relative bg-[#0f172a] py-16 md:py-24 min-h-[420px] md:min-h-[620px] overflow-hidden">
                {/* Background Slider */}
                <div className="absolute inset-0 z-0">
                    {banners.map((src, index) => (
                        <div
                            key={src}
                            className={`absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${currentBannerIndex === index ? 'opacity-90' : 'opacity-0'
                                }`}
                            style={{
                                backgroundImage: `url('${src}')`,
                                backgroundPosition: '14% 18%',
                                transformOrigin: '14% 18%',
                                animation: currentBannerIndex === index ? 'kenBurns 4.6s ease-out forwards' : 'none',
                            }}
                        />
                    ))}
                    {/* Gradient Overlay for luxury feel and readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-[#0f172a]/15" />
                </div>

                <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up flex flex-col md:block items-center">
                    {/* Mobile/Tablet Badge (Hidden on Large Desktop) */}
                    <div className="lg:hidden flex justify-center w-full mb-6">
                        <div className="w-24 h-24 sm:w-28 sm:h-28">
                            <DiscountBadge />
                        </div>
                    </div>

                    <div className="relative w-full max-w-6xl mx-auto mb-10 flex items-center justify-center">
                        <h1 className="font-luxury text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight max-w-4xl mx-auto transition-transform duration-500 hover:scale-[1.01] px-4 md:px-12 lg:px-24">
                            Find Trusted Gold &amp; Diamond Jewellers Across Pakistan
                        </h1>

                        {/* Desktop Badge (Positioned exactly on the right) */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
                            <div className="w-32 h-32 xl:w-36 xl:h-36">
                                <DiscountBadge />
                            </div>
                        </div>
                    </div>

                    {/* Main Search Form */}
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-2xl border border-[#d4af37]/10">
                        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

                            <div className="flex flex-col text-left">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Looking For</label>
                                <select
                                    value={searchSpeciality}
                                    onChange={(e) => setSearchSpeciality(e.target.value)}
                                    className="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]">
                                    <option value="">Select Specialty</option>
                                    <option value="22K Gold">22K Gold</option>
                                    <option value="Solitaire Diamond Rings">Diamond Solitaires</option>
                                    <option value="Heritage Bridal Sets">Heritage Bridal Sets</option>
                                    <option value="Gold Bangles">Gold Bangles</option>
                                </select>
                            </div>

                            <div className="flex flex-col text-left">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Select City</label>
                                <select
                                    value={searchCityId}
                                    onChange={(e) => setSearchCityId(e.target.value)}
                                    className="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]">
                                    <option value="">Select City</option>
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
                                    className="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]">
                                    <option value="">Select Budget</option>
                                    <option value="Under Rs. 100,000">Under Rs. 100,000</option>
                                    <option value="Rs. 100,000 - 250,000">Rs. 100,000 – 250,000</option>
                                    <option value="Rs. 250,000 - 500,000">Rs. 250,000 – 500,000</option>
                                    <option value="Above Rs. 500,000">Above Rs. 500,000</option>
                                </select>
                            </div>

                            <div className="pt-4 md:pt-0">
                                <label className="hidden md:block text-xs font-bold text-transparent mb-1">Search</label>
                                <button
                                    type="submit"
                                    className="w-full bg-[#d4af37] hover:bg-[#bda030] text-white font-bold py-3.5 px-4 rounded text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover-shine">
                                    <i className="fa-solid fa-magnifying-glass mr-2" /> Find Jeweller
                                </button>
                            </div>

                        </form>

                        <div className="text-center mt-4">
                            <span className="text-xs text-gray-500">Or design your own dream ornament:
                                <Link href="/custom-jewellery" className="text-[#d4af37] font-bold hover:underline ml-1">
                                    Request Custom Jewellery Quote <i className="fa-solid fa-chevron-right text-[10px]" />
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Latest Arrivals ───────────────────────────────────────── */}
            {latestArrivals.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal className="text-center mb-12">
                            <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Fresh Designs</span>
                            <h2 className="font-luxury text-4xl md:text-5xl text-[#0f172a] font-bold mt-2">Latest Arrivals</h2>
                            <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                        </Reveal>

                        <HorizontalProductSlider products={latestArrivals} />
                    </div>
                </section>
            )}

            {/* ── Featured Categories with Product Sliders ─────────────── */}
            {featuredCategories.map((cat) => (
                <section key={cat.id} className="py-20 bg-[#faf9f6] border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal className="text-center mb-12">
                            <h2 className="font-luxury text-5xl md:text-6xl text-[#0f172a] font-bold">{cat.name}</h2>
                            <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                        </Reveal>

                        <HorizontalProductSlider products={cat.products} />

                        {cat.total_products > cat.products.length && (
                            <div className="text-center mt-8">
                                <Link
                                    href={`/${cat.slug}`}
                                    className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] text-white px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all duration-300">
                                    See More Designs ({cat.total_products - cat.products.length}+ more)
                                    <i className="fa-solid fa-arrow-right" />
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* ── Customer Reviews ──────────────────────────────────────── */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="text-center mb-12">
                        <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Customer Stories</span>
                        <h2 className="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">What Our Clients Say</h2>
                        <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                    </Reveal>
                    <Reveal delay={150}>
                        <ReviewsCarousel />
                    </Reveal>
                </div>
            </section>
        </AppLayout>
    );
}

// ── Horizontal Scrollable Product Slider ────────────────────────────────────

function HorizontalProductSlider({ products }: { products: ProductCardType[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth * 0.75;
        scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
    };

    if (!products || products.length === 0) return null;

    return (
        <div className="relative group">
            {/* Navigation Arrows (Top Right) */}
            <div className="absolute -top-16 right-0 hidden md:flex gap-2 z-10">
                <button
                    onClick={() => scroll('left')}
                    className="w-10 h-10 rounded-full bg-[#0f172a] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer border-2 border-transparent hover:border-white/20">
                    <i className="fa-solid fa-arrow-left-long text-sm" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="w-10 h-10 rounded-full bg-[#0f172a] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer border-2 border-transparent hover:border-white/20">
                    <i className="fa-solid fa-arrow-right-long text-sm" />
                </button>
            </div>

            {/* Scrollable container */}
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {products.map((product, idx) => (
                    <Reveal
                        key={product.id}
                        delay={Math.min(idx, 4) * 90}
                        className="flex-shrink-0 w-[calc(100%-20px)] sm:w-[calc(50%-15px)] md:w-[calc(33.33%-15px)] lg:w-[calc(25%-15px)]"
                    >
                        <ProductCard product={product} />
                    </Reveal>
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
                <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[#0f172a] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-x-0.5 cursor-pointer border-2 border-transparent hover:border-white/20" title="Previous">
                    <i className="fa-solid fa-arrow-left-long text-sm" />
                </button>
                <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[#0f172a] hover:bg-[#d4af37] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:translate-x-0.5 cursor-pointer border-2 border-transparent hover:border-white/20" title="Next">
                    <i className="fa-solid fa-arrow-right-long text-sm" />
                </button>
            </div>

            <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleReviews.map((rev, idx) => (
                    <div
                        key={rev.id}
                        className={`bg-[#faf9f6] border border-[#d4af37]/25 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 relative hover:-translate-y-1 ${direction === 'next' ? 'animate-review-next' : 'animate-review-prev'
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
                                <h4 className="font-luxury font-bold text-[#0f172a] text-sm tracking-wide">{rev.name}</h4>
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
