import React from 'react';
import { Head, Link } from '@inertiajs/react';
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
    products_count: number;
    full_address: string;
}

interface CityProps {
    city: City;
    jewellers: Jeweller[];
    categories: Category[];
}

export default function CityPage({ city, jewellers, categories }: CityProps) {
    return (
        <AppLayout>
            <Head title={`Gold & Diamond Jewellers in ${city.name}`} />

            {/* City Hero */}
            <section class="bg-[#0f172a] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#d4af37]/10">
                <div class="absolute inset-0 opacity-10">
                    <div class="absolute top-1/2 left-1/3 w-80 h-80 bg-[#d4af37] rounded-full filter blur-3xl"></div>
                </div>
                <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span class="text-[#d4af37] tracking-widest uppercase font-semibold text-xs mb-3 block"><i class="fa-solid fa-location-dot mr-1"></i> Local Dedicated Portal</span>
                    <h1 class="font-luxury text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Gold and Diamond Jewellers in {city.name}
                    </h1>
                    <p class="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Connect with verified jewellers, request quotations, and book physical showroom appointments in {city.name}.
                    </p>
                </div>
            </section>

            {/* Content grid */}
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left 2 Columns */}
                    <div class="lg:col-span-2 space-y-8">
                        <h2 class="font-luxury text-2xl font-bold border-b border-gray-200 pb-3 mb-6">
                            Verified Jewellers in {city.name} ({jewellers.length})
                        </h2>

                        {jewellers.length === 0 ? (
                            <div class="bg-white p-8 rounded-lg border border-gray-200 text-center">
                                <i class="fa-solid fa-store-slash text-4xl text-gray-300 mb-4 block"></i>
                                <h3 class="font-luxury font-bold text-xl mb-2 text-[#0f172a]">Partner onboarding in progress</h3>
                                <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">
                                    We are currently auditing and onboarding premium jewelry shops in {city.name}. Submit your requirement and our team will assist you.
                                </p>
                                <Link href="/custom-jewellery" class="inline-block bg-[#d4af37] hover:bg-[#bda030] text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded shadow">
                                    Submit Inquiry
                                </Link>
                            </div>
                        ) : (
                            <div class="space-y-6">
                                {jewellers.map((j) => (
                                    <div key={j.id} class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col md:flex-row hover-shine">
                                        <div class="md:w-60 bg-[#faf9f6] relative flex-shrink-0 min-h-[180px] group/cover overflow-hidden">
                                            <img src={j.cover_image} alt={`${j.business_name} Cover`} class="w-full h-full object-cover absolute inset-0 group-hover/cover:scale-105 transition-transform duration-700" />
                                            <div class="absolute inset-0 bg-[#0f172a]/40 group-hover/cover:bg-[#0f172a]/50 transition-colors duration-300"></div>
                                            <div class="absolute inset-0 flex items-center justify-center p-4">
                                                <div class="w-16 h-16 rounded-full bg-white p-1 border shadow overflow-hidden transition-transform duration-500 group-hover/cover:scale-110">
                                                    <img src={j.logo} alt={`${j.business_name} Logo`} class="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="p-6 flex-grow flex flex-col justify-between">
                                            <div>
                                                <div class="flex items-center gap-3 mb-2 flex-wrap">
                                                    <h3 class="font-luxury text-xl font-bold text-[#0f172a]">{j.business_name}</h3>
                                                    <span class="bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-green-200"><i class="fa-solid fa-circle-check animate-pulse"></i> Verified</span>
                                                </div>
                                                <p class="text-xs text-gray-500 mb-3"><i class="fa-solid fa-map-marker-alt text-[#d4af37] mr-1"></i> {j.full_address}</p>
                                                
                                                <div class="flex flex-wrap gap-1.5 mb-4">
                                                    {j.specialities?.map((spec, idx) => (
                                                        <span key={idx} class="text-[10px] bg-[#faf9f6] text-[#0f172a]/80 px-2 py-0.5 rounded border border-gray-200 hover:border-[#d4af37] transition-colors">{spec}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-4 flex-wrap gap-4">
                                                <div class="text-xs text-gray-500">
                                                    <div><i class="fa-solid fa-gem text-[#d4af37] mr-1.5 animate-pulse"></i> {j.products_count} Designs Listed</div>
                                                    <div><i class="fa-solid fa-user-tie text-[#d4af37] mr-1.5"></i> {j.years_in_business} Yrs Experience</div>
                                                </div>
                                                <div class="flex gap-2">
                                                    <Link href={`/jeweller/${j.slug}`} class="border border-[#0f172a]/30 hover:border-[#d4af37] hover:text-[#d4af37] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-all duration-300 active:scale-[0.98]">
                                                        View Profile
                                                    </Link>
                                                    <Link href={`/custom-jewellery?jeweller_id=${j.id}`} class="bg-[#d4af37] hover:bg-[#bda030] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-all duration-300 hover-shine shadow shadow-[#d4af37]/15 active:scale-[0.98]">
                                                        Book Visit
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div class="bg-white p-8 rounded-lg border border-gray-200 mt-12">
                            <h3 class="font-luxury text-xl font-bold text-[#0f172a] mb-4">{city.name} Buying Guide</h3>
                            <p class="text-gray-500 text-sm leading-relaxed mb-4">
                                Gold rates in {city.name} fluctuate daily based on the international market and local bullion association rates. Always ensure you check the purity and demand invoice proofs before trading gold.
                            </p>
                        </div>
                    </div>

                    {/* Right column */}
                    <div class="space-y-8">
                        <div class="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 class="font-luxury text-lg font-bold text-[#0f172a] border-b border-gray-100 pb-3 mb-4">Coverage Areas</h3>
                            <ul class="space-y-2.5 text-sm text-gray-600">
                                {city.name.toLowerCase() === 'lahore' ? (
                                    <>
                                        <li><i class="fa-solid fa-circle-chevron-right text-[#d4af37] mr-2"></i> DHA (Phase 1-8)</li>
                                        <li><i class="fa-solid fa-circle-chevron-right text-[#d4af37] mr-2"></i> Gulberg (MM Alam Road)</li>
                                        <li><i class="fa-solid fa-circle-chevron-right text-[#d4af37] mr-2"></i> Liberty Market</li>
                                    </>
                                ) : (
                                    <>
                                        <li><i class="fa-solid fa-circle-chevron-right text-[#d4af37] mr-2"></i> Clifton & DHA</li>
                                        <li><i class="fa-solid fa-circle-chevron-right text-[#d4af37] mr-2"></i> Tariq Road</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
