import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface City {
    id: number;
    name: string;
    slug: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
}

interface Jeweller {
    id: number;
    business_name: string;
    slug: string;
    logo: string;
    cover_image: string;
    area: string;
    years_in_business: number;
    specialities: string[];
    city: City;
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
    category: { name: string };
    jeweller: { business_name: string; city: City };
}

interface HomeProps {
    cities: City[];
    categories: Category[];
    featuredJewellers: Jeweller[];
    latestProducts: Product[];
}

export default function Home({ cities, categories, featuredJewellers, latestProducts }: HomeProps) {
    const [searchSpeciality, setSearchSpeciality] = useState('');
    const [searchCityId, setSearchCityId] = useState('');
    const [searchBudget, setSearchBudget] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/find-a-jeweller', {
            speciality: searchSpeciality,
            city_id: searchCityId,
            budget: searchBudget
        });
    };

    return (
        <AppLayout>
            <Head title="Find Trusted Jewellers in Pakistan" />

            {/* Hero Section */}
            <section className="relative bg-[#0f172a] py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up">
                    <h1 className="font-luxury text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight max-w-4xl mx-auto mb-10 transition-transform duration-500 hover:scale-[1.01]">
                        Find Trusted Gold & Diamond Jewellers Across Pakistan
                    </h1>

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
                                    className="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                                >
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
                                    className="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                                >
                                    <option value="">Select Budget</option>
                                    <option value="Under Rs. 100,000">Under Rs. 100,000</option>
                                    <option value="Rs. 100,000 - 250,000">Rs. 100,000 - 250,000</option>
                                    <option value="Rs. 250,000 - 500,000">Rs. 250,000 - 500,000</option>
                                    <option value="Above Rs. 500,000">Above Rs. 500,000</option>
                                </select>
                            </div>

                            <div className="pt-4 md:pt-0">
                                <label className="hidden md:block text-xs font-bold text-transparent mb-1">Search</label>
                                <button type="submit" className="w-full bg-[#d4af37] hover:bg-[#bda030] text-white font-bold py-3.5 px-4 rounded text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover-shine">
                                    <i className="fa-solid fa-magnifying-glass mr-2"></i> Find Jeweller
                                </button>
                            </div>

                        </form>

                        <div className="text-center mt-4">
                            <span className="text-xs text-gray-500">Or design your own dream ornament:
                                <Link href="/custom-jewellery" className="text-[#d4af37] font-bold hover:underline ml-1">Request Custom Jewellery Quote <i className="fa-solid fa-chevron-right text-[10px]"></i></Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Type */}
            <section className="py-20 bg-[#faf9f6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Exquisite Collections</span>
                        <h2 className="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">Browse by Jewellery Type</h2>
                        <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat) => (
                            <Link key={cat.id} href={`/${cat.slug}`} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col hover-shine">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                    <div className="absolute inset-0 bg-[#0f172a]/20 group-hover:bg-[#0f172a]/30 transition-colors duration-300"></div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-luxury text-xl font-bold text-[#0f172a] group-hover:text-[#d4af37] transition-colors duration-300">{cat.name}</h3>
                                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">{cat.description}</p>
                                    </div>
                                    <span className="text-[#d4af37] font-semibold text-xs tracking-wider uppercase mt-4 block">View Designs <i className="fa-solid fa-arrow-right ml-1 group-hover:translate-x-2 transition-transform duration-300"></i></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            {/* Customer Reviews Section */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Customer Stories</span>
                        <h2 className="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">What Our Clients Say</h2>
                        <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4"></div>
                    </div>

                    <ReviewsCarousel />
                </div>
            </section>

            {/* Featured Partners */}

        </AppLayout>
    );
}

// Sub-component for auto-rotating testimonials/reviews (Shows 2 cards at a time)
function ReviewsCarousel() {
    const reviews = [
        {
            id: 1,
            name: "Ayesha Khan",
            city: "Lahore",
            rating: 5,
            review: "I ordered my bridal set through Online Jewelry Shop. The design process was super smooth, and the craftsmanship of the 22K gold set is absolutely breath-taking! Highly recommended for premium orders.",
            date: "1 week ago"
        },
        {
            id: 2,
            name: "Muhammad Ali",
            city: "Karachi",
            rating: 5,
            review: "Amazing platform! Was looking for an authentic diamond engagement ring. Got direct quotes from top verified jewellers in Karachi and bought the perfect solitaire. Transparency at its best.",
            date: "3 days ago"
        },
        {
            id: 3,
            name: "Zainab Bibi",
            city: "Islamabad",
            rating: 5,
            review: "Ordered custom gold bangles for my daughter's wedding. The jeweler was extremely professional, provided proper certification, and delivered exactly what was promised. 10/10 service!",
            date: "2 weeks ago"
        },
        {
            id: 4,
            name: "Faisal Qureshi",
            city: "Faisalabad",
            rating: 5,
            review: "The easiest way to find reliable jewelry shops in Pakistan. Got my gold rate locked and received the shipment safely with complete insurance. Will definitely buy again.",
            date: "5 days ago"
        }
    ];

    // Since we show 2 cards at a time, we will have 2 pages (Page 0: Reviews 1 & 2, Page 1: Reviews 3 & 4)
    const [currentPage, setCurrentPage] = React.useState(0);
    const totalPages = Math.ceil(reviews.length / 2);

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000); // Rotate pages every 6 seconds
        return () => clearInterval(interval);
    }, [totalPages]);

    // Get the two reviews for the current page
    const visibleReviews = [
        reviews[currentPage * 2],
        reviews[currentPage * 2 + 1]
    ].filter(Boolean);

    return (
        <div className="max-w-6xl mx-auto relative px-12 group">
            {/* Left Arrow */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#d4af37]/30 hover:border-[#d4af37] text-[#0f172a] hover:text-[#d4af37] flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10 cursor-pointer"
                title="Previous"
            >
                <i className="fa-solid fa-chevron-left text-sm"></i>
            </button>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ease-in-out">
                {visibleReviews.map((rev) => (
                    <div
                        key={rev.id}
                        className="bg-[#faf9f6] border border-[#d4af37]/25 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 relative hover:-translate-y-1"
                    >
                        {/* Quote icon background */}
                        <span className="absolute top-4 right-6 text-6xl text-[#d4af37]/10 font-serif">“</span>

                        {/* Stars */}
                        <div className="flex gap-1 mb-3 text-[#d4af37]">
                            {[...Array(rev.rating)].map((_, i) => (
                                <i key={i} className="fa-solid fa-star text-xs"></i>
                            ))}
                        </div>

                        {/* Feedback Text */}
                        <p className="text-gray-600 italic text-sm md:text-base leading-relaxed mb-6">
                            "{rev.review}"
                        </p>

                        {/* User details */}
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

            {/* Right Arrow */}
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#d4af37]/30 hover:border-[#d4af37] text-[#0f172a] hover:text-[#d4af37] flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10 cursor-pointer"
                title="Next"
            >
                <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>

            {/* Slider dots */}
            <div className="flex justify-center gap-2 mt-8">
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            idx === currentPage ? 'w-8 bg-[#d4af37]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

