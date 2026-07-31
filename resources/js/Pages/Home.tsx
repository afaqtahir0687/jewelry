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
            <section class="relative bg-[#0f172a] py-24 md:py-32 overflow-hidden">
                <div class="absolute inset-0 opacity-10">
                    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full filter blur-3xl"></div>
                    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
                </div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up">
                    <span class="text-[#d4af37] tracking-widest uppercase font-semibold text-xs mb-3 block animate-pulse">Premium Lead Generation Network</span>
                    <h1 class="font-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight max-w-4xl mx-auto mb-6 transition-transform duration-500 hover:scale-[1.01]">
                        Find Trusted Gold & Diamond Jewellers Across Pakistan
                    </h1>
                    <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
                        Browse exclusive designs, locate top physical stores in your city, request direct custom orders, or get quotes directly from verified artisans.
                    </p>

                    {/* Main Search Form */}
                    <div class="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-2xl border border-[#d4af37]/10">
                        <form onSubmit={handleSearchSubmit} class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            
                            <div class="flex flex-col text-left">
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Looking For</label>
                                <select 
                                    value={searchSpeciality} 
                                    onChange={(e) => setSearchSpeciality(e.target.value)}
                                    class="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                                >
                                    <option value="">Select Specialty</option>
                                    <option value="22K Gold">22K Gold</option>
                                    <option value="Solitaire Diamond Rings">Diamond Solitaires</option>
                                    <option value="Heritage Bridal Sets">Heritage Bridal Sets</option>
                                    <option value="Gold Bangles">Gold Bangles</option>
                                </select>
                            </div>

                            <div class="flex flex-col text-left">
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Select City</label>
                                <select 
                                    value={searchCityId} 
                                    onChange={(e) => setSearchCityId(e.target.value)}
                                    class="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div class="flex flex-col text-left">
                                <label class="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Approximate Budget</label>
                                <select 
                                    value={searchBudget} 
                                    onChange={(e) => setSearchBudget(e.target.value)}
                                    class="w-full bg-[#faf9f6] border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                                >
                                    <option value="">Select Budget</option>
                                    <option value="Under Rs. 100,000">Under Rs. 100,000</option>
                                    <option value="Rs. 100,000 - 250,000">Rs. 100,000 - 250,000</option>
                                    <option value="Rs. 250,000 - 500,000">Rs. 250,000 - 500,000</option>
                                    <option value="Above Rs. 500,000">Above Rs. 500,000</option>
                                </select>
                            </div>

                            <div class="pt-4 md:pt-0">
                                <label class="hidden md:block text-xs font-bold text-transparent mb-1">Search</label>
                                <button type="submit" class="w-full bg-[#d4af37] hover:bg-[#bda030] text-white font-bold py-3.5 px-4 rounded text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover-shine">
                                    <i class="fa-solid fa-magnifying-glass mr-2"></i> Find Jeweller
                                </button>
                            </div>

                        </form>

                        <div class="text-center mt-4">
                            <span class="text-xs text-gray-500">Or design your own dream ornament: 
                                <Link href="/custom-jewellery" class="text-[#d4af37] font-bold hover:underline ml-1">Request Custom Jewellery Quote <i class="fa-solid fa-chevron-right text-[10px]"></i></Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Type */}
            <section class="py-20 bg-[#faf9f6]">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <span class="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Exquisite Collections</span>
                        <h2 class="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">Browse by Jewellery Type</h2>
                        <div class="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4"></div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat) => (
                            <Link key={cat.id} href={`/${cat.slug}`} class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col hover-shine">
                                <div class="h-64 overflow-hidden relative">
                                    <img src={cat.image} alt={cat.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                    <div class="absolute inset-0 bg-[#0f172a]/20 group-hover:bg-[#0f172a]/30 transition-colors duration-300"></div>
                                </div>
                                <div class="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 class="font-luxury text-xl font-bold text-[#0f172a] group-hover:text-[#d4af37] transition-colors duration-300">{cat.name}</h3>
                                        <p class="text-gray-500 text-sm mt-2 leading-relaxed">{cat.description}</p>
                                    </div>
                                    <span class="text-[#d4af37] font-semibold text-xs tracking-wider uppercase mt-4 block">View Designs <i class="fa-solid fa-arrow-right ml-1 group-hover:translate-x-2 transition-transform duration-300"></i></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Browse by City */}
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <span class="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Local Directories</span>
                        <h2 class="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">Select Your City</h2>
                        <div class="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4"></div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {cities.map((city) => (
                            <Link key={city.id} href={`/jewellers/${city.slug}`} class="group bg-[#faf9f6] hover:bg-[#0f172a] border border-gray-100 hover:border-[#d4af37] p-6 text-center rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">
                                <div class="w-12 h-12 bg-[#d4af37]/10 group-hover:bg-[#d4af37]/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
                                    <i class="fa-solid fa-location-dot text-[#d4af37] text-lg"></i>
                                </div>
                                <h3 class="font-luxury text-lg font-bold text-[#0f172a] group-hover:text-white transition-colors duration-300">{city.name}</h3>
                                <span class="text-gray-400 text-xs block mt-1 group-hover:text-[#d4af37] font-semibold transition-colors duration-300">View Partners</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Partners */}
            <section class="py-20 bg-[#faf9f6]">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <span class="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Vetted & Recommended</span>
                        <h2 class="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">Featured Partner Jewellers</h2>
                        <div class="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4"></div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredJewellers.map((j) => (
                            <div key={j.id} class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col justify-between hover-shine">
                                <div>
                                    <div class="h-44 overflow-hidden relative group/cover">
                                        <img src={j.cover_image} alt={`${j.business_name} Cover`} class="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-700" />
                                        <div class="absolute inset-0 bg-[#0f172a]/40 group-hover/cover:bg-[#0f172a]/50 transition-colors duration-300"></div>
                                        
                                        <div class="absolute bottom-4 left-4 flex items-center gap-3">
                                            <div class="w-12 h-12 rounded-full border-2 border-white bg-white overflow-hidden shadow transition-transform duration-500 group-hover/cover:scale-110">
                                                <img src={j.logo} alt={`${j.business_name} Logo`} class="w-full h-full object-cover" />
                                            </div>
                                            <div class="text-white">
                                                <h3 class="font-luxury text-lg font-bold shadow-sm leading-tight transition-colors duration-300 group-hover/cover:text-[#d4af37]">{j.business_name}</h3>
                                                <span class="text-[10px] tracking-wider font-semibold text-[#d4af37] bg-[#0f172a]/80 px-2 py-0.5 rounded-full inline-flex items-center"><i class="fa-solid fa-circle-check mr-1 animate-pulse"></i> Verified</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="p-6">
                                        <div class="flex items-center justify-between text-xs text-gray-500 mb-4 border-b border-gray-100 pb-3">
                                            <span><i class="fa-solid fa-location-dot text-[#d4af37] mr-1"></i> {j.area}, {j.city.name}</span>
                                            <span><i class="fa-solid fa-award text-[#d4af37] mr-1"></i> {j.years_in_business} Years</span>
                                        </div>

                                        <div class="mb-4">
                                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Specialities</span>
                                            <div class="flex flex-wrap gap-1.5">
                                                {j.specialities?.map((spec, i) => (
                                                    <span key={i} class="text-[10px] bg-[#faf9f6] text-[#0f172a]/80 px-2 py-1 rounded border border-gray-200 hover:border-[#d4af37] transition-colors">{spec}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="p-6 pt-0 border-t border-gray-100 mt-auto flex gap-3">
                                    <Link href={`/jeweller/${j.slug}`} class="flex-1 text-center border border-[#0f172a]/30 hover:border-[#d4af37] hover:text-[#d4af37] text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 active:scale-[0.98]">
                                        View Profile
                                    </Link>
                                    <Link href={`/custom-jewellery?jeweller_id=${j.id}`} class="flex-1 text-center bg-[#d4af37] hover:bg-[#bda030] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 hover-shine shadow shadow-[#d4af37]/20 active:scale-[0.98]">
                                        Book Visit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
