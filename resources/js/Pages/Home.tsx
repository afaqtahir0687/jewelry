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

            {/* Browse by City */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Local Directories</span>
                        <h2 className="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">Select Your City</h2>
                        <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {cities.map((city) => (
                            <Link key={city.id} href={`/jewellers/${city.slug}`} className="group bg-[#faf9f6] hover:bg-[#0f172a] border border-gray-100 hover:border-[#d4af37] p-6 text-center rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">
                                <div className="w-12 h-12 bg-[#d4af37]/10 group-hover:bg-[#d4af37]/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
                                    <i className="fa-solid fa-location-dot text-[#d4af37] text-lg"></i>
                                </div>
                                <h3 className="font-luxury text-lg font-bold text-[#0f172a] group-hover:text-white transition-colors duration-300">{city.name}</h3>
                                <span className="text-gray-400 text-xs block mt-1 group-hover:text-[#d4af37] font-semibold transition-colors duration-300">View Partners</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Partners */}

        </AppLayout>
    );
}

