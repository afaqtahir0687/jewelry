import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface City {
    id: number;
    name: string;
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
}

interface Review {
    id: number;
    customer_name: string;
    rating: number;
    comment: string;
}

interface Jeweller {
    id: number;
    business_name: string;
    slug: string;
    logo: string;
    cover_image: string;
    area: string;
    full_address: string;
    business_timings: string;
    years_in_business: number;
    payment_methods: string[];
    return_policy: string | null;
    specialities: string[];
    whatsapp: string;
    city: City;
    products: Product[];
    reviews: Review[];
}

interface JewellerProps {
    jeweller: Jeweller;
}

export default function JewellerPage({ jeweller }: JewellerProps) {
    return (
        <AppLayout>
            <Head title={`${jeweller.business_name} | Verified Jeweller`} />

            {/* Header */}
            <section class="relative bg-[#0f172a] text-white py-20 overflow-hidden">
                <div class="absolute inset-0">
                    <img src={jeweller.cover_image} alt={jeweller.business_name} class="w-full h-full object-cover opacity-30" />
                    <div class="absolute inset-0 bg-[#0f172a]/70 backdrop-blur-sm"></div>
                </div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div class="w-28 h-28 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                            <img src={jeweller.logo} alt={jeweller.business_name} class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div class="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start mb-2">
                                <h1 class="font-luxury text-3xl sm:text-4xl font-bold">{jeweller.business_name}</h1>
                                <div>
                                    <span class="bg-green-600 text-white text-xxs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check mr-1"></i> Verified</span>
                                </div>
                            </div>
                            <p class="text-sm text-gray-300"><i class="fa-solid fa-location-dot text-[#d4af37] mr-1.5"></i> {jeweller.area}, {jeweller.city.name}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profile Grid */}
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    <div class="lg:col-span-2 space-y-12">
                        <div class="bg-white p-8 rounded-lg border border-gray-200">
                            <h2 class="font-luxury text-xl font-bold border-b border-gray-100 pb-3 mb-6">About the Showroom</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Full Address</span>
                                    <p class="text-gray-700">{jeweller.full_address}</p>
                                </div>
                                <div>
                                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Timings</span>
                                    <p class="text-gray-700">{jeweller.business_timings}</p>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h2 class="font-luxury text-2xl font-bold border-b border-gray-200 pb-3 mb-6">Latest Designs</h2>
                            {jeweller.products.length === 0 ? (
                                <p class="text-gray-500 text-sm">No products listed by this jeweller yet.</p>
                            ) : (
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {jeweller.products.map((p) => {
                                        const parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                                        return (
                                            <div key={p.id} class="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col justify-between">
                                                <div class="h-56 bg-gray-100">
                                                    <img src={parsedImages[0]} alt={p.title} class="w-full h-full object-cover" />
                                                </div>
                                                <div class="p-5 flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <span class="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">{p.category.name}</span>
                                                        <h3 class="font-luxury font-bold text-lg text-[#0f172a] mt-1">{p.title}</h3>
                                                    </div>
                                                    <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                                                        <span class="text-[#d4af37] font-bold text-sm">
                                                            {p.price_on_request ? 'Price on Request' : `Rs. ${p.price}`}
                                                        </span>
                                                        <Link href={`/custom-jewellery?jeweller_id=${jeweller.id}`} class="bg-[#d4af37] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded">
                                                            Get Quote
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar lead capture */}
                    <div class="space-y-8">
                        <div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                            <h3 class="font-luxury text-xl font-bold text-[#0f172a] border-b border-gray-100 pb-3 mb-4 text-center">Contact Showroom</h3>
                            <a href={`https://wa.me/${jeweller.whatsapp}`} class="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded shadow mb-4">
                                <i class="fa-brands fa-whatsapp mr-1.5"></i> Chat on WhatsApp
                            </a>
                            <Link href={`/custom-jewellery?jeweller_id=${jeweller.id}`} class="w-full block text-center bg-[#d4af37] hover:bg-[#bda030] text-white font-bold py-3 rounded shadow">
                                Book Showroom Visit
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
