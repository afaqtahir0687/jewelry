import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface City {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
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

interface PaginatedJewellers {
    data: Jeweller[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface SearchProps {
    jewellers: PaginatedJewellers;
    cities: City[];
    categories: Category[];
    filters: {
        city_id?: string;
        area?: string;
        speciality?: string;
        custom_order?: string;
        delivery?: string;
        repair?: string;
    };
}

export default function Search({ jewellers, cities, categories, filters }: SearchProps) {
    const [cityId, setCityId] = useState(filters.city_id || '');
    const [area, setArea] = useState(filters.area || '');
    const [speciality, setSpeciality] = useState(filters.speciality || '');
    const [customOrder, setCustomOrder] = useState(!!filters.custom_order);
    const [delivery, setDelivery] = useState(!!filters.delivery);
    const [repair, setRepair] = useState(!!filters.repair);

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/find-a-jeweller', {
            city_id: cityId,
            area,
            speciality,
            custom_order: customOrder ? '1' : '',
            delivery: delivery ? '1' : '',
            repair: repair ? '1' : ''
        });
    };

    return (
        <AppLayout>
            <Head title="Find Verified Jewellers" />

            <section class="bg-[#0f172a] text-white py-12 relative overflow-hidden border-b border-[#d4af37]/10">
                <div class="max-w-7xl mx-auto px-4 text-center">
                    <h1 class="font-luxury text-3xl md:text-4xl font-bold">Find a Local Verified Jeweller</h1>
                    <p class="text-xs text-gray-400 mt-2">Filter and search verified partners by city, area, specialty, and services.</p>
                </div>
            </section>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Filter Sidebar */}
                    <div class="lg:col-span-1">
                        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                            <h3 class="font-luxury text-base font-bold text-[#0f172a] border-b border-gray-100 pb-2">Filter Search</h3>
                            
                            <form onSubmit={handleFilterSubmit} class="space-y-4">
                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">City</label>
                                    <select 
                                        value={cityId} 
                                        onChange={(e) => setCityId(e.target.value)}
                                        class="w-full bg-[#faf9f6] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="">All Cities</option>
                                        {cities.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Area / Locality</label>
                                    <input 
                                        type="text" 
                                        value={area} 
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder="e.g. DHA, Clifton" 
                                        class="w-full bg-[#faf9f6] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]" 
                                    />
                                </div>

                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Specialty</label>
                                    <select 
                                        value={speciality} 
                                        onChange={(e) => setSpeciality(e.target.value)}
                                        class="w-full bg-[#faf9f6] border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="">All Specialties</option>
                                        <option value="22K Gold">22K Gold</option>
                                        <option value="Solitaire Diamond Rings">Diamond Solitaires</option>
                                        <option value="Heritage Bridal Sets">Heritage Bridal Sets</option>
                                        <option value="Gold Bangles">Gold Bangles</option>
                                    </select>
                                </div>

                                <div class="space-y-2 pt-2">
                                    <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Services</label>
                                    
                                    <label class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={customOrder} 
                                            onChange={(e) => setCustomOrder(e.target.checked)}
                                            class="rounded border-gray-300 text-[#d4af37] focus:ring-[#d4af37]" 
                                        />
                                        Custom Order Available
                                    </label>

                                    <label class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={delivery} 
                                            onChange={(e) => setDelivery(e.target.checked)}
                                            class="rounded border-gray-300 text-[#d4af37] focus:ring-[#d4af37]" 
                                        />
                                        Delivery Available
                                    </label>
                                </div>

                                <div class="pt-4 flex gap-2">
                                     <button type="submit" class="w-full bg-[#d4af37] hover:bg-[#bda030] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow shadow-[#d4af37]/10 transition-all duration-300 hover-shine active:scale-[0.98]">Apply</button>
                                     <Link href="/find-a-jeweller" class="w-full text-center border border-[#0f172a]/20 hover:bg-[#faf9f6] text-[#0f172a] text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 active:scale-[0.98]">Clear</Link>
                                 </div>
                            </form>
                        </div>
                    </div>

                    {/* Results list */}
                    <div class="lg:col-span-3">
                        {jewellers.data.length === 0 ? (
                            <div class="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-sm">
                                <i class="fa-solid fa-store-slash text-5xl text-gray-300 mb-4 block"></i>
                                <h3 class="font-luxury font-bold text-xl mb-2 text-[#0f172a]">No Jewellers Found</h3>
                                <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">No verified jewellers match your filter criteria.</p>
                            </div>
                        ) : (
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {jewellers.data.map((j) => (
                                     <div key={j.id} class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between hover-shine">
                                         <div>
                                             <div class="h-32 bg-[#faf9f6] relative overflow-hidden group/cover">
                                                 <img src={j.cover_image} alt="Cover" class="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-700" />
                                                 <div class="absolute inset-0 bg-[#0f172a]/30 group-hover/cover:bg-[#0f172a]/45 transition-colors duration-300"></div>
                                                 <div class="absolute bottom-3 left-3 flex items-center gap-2">
                                                     <div class="w-10 h-10 rounded-full bg-white p-0.5 border shadow overflow-hidden transition-transform duration-500 group-hover/cover:scale-110">
                                                         <img src={j.logo} alt="Logo" class="w-full h-full object-cover" />
                                                     </div>
                                                     <div class="text-white">
                                                         <h3 class="font-luxury font-bold text-sm leading-tight group-hover/cover:text-[#d4af37] transition-colors duration-300">{j.business_name}</h3>
                                                         <span class="text-[9px] bg-[#0f172a]/80 text-[#d4af37] px-1.5 py-0.5 rounded-full inline-flex items-center"><i class="fa-solid fa-circle-check mr-1 animate-pulse"></i> Verified</span>
                                                     </div>
                                                 </div>
                                             </div>
 
                                             <div class="p-5">
                                                 <div class="text-xxs text-gray-400 mb-2">
                                                     <i class="fa-solid fa-location-dot text-[#d4af37] mr-1"></i> {j.area}, {j.city.name}
                                                 </div>
                                                 <div class="flex flex-wrap gap-1">
                                                     {j.specialities?.map((spec, i) => (
                                                         <span key={i} class="text-[9px] bg-[#faf9f6] text-[#0f172a]/80 px-1.5 py-0.5 rounded border border-gray-200 hover:border-[#d4af37] transition-colors">{spec}</span>
                                                     ))}
                                                 </div>
                                             </div>
                                         </div>
 
                                         <div class="p-5 pt-0 border-t border-gray-100 mt-auto flex gap-2">
                                             <Link href={`/jeweller/${j.slug}`} class="flex-1 text-center border border-[#0f172a]/20 hover:border-[#d4af37] hover:text-[#d4af37] text-[10px] font-bold uppercase tracking-wider py-2 rounded transition-all duration-300 active:scale-[0.98]">
                                                 Profile
                                             </Link>
                                             <Link href={`/custom-jewellery?jeweller_id=${j.id}`} class="flex-1 text-center bg-[#d4af37] hover:bg-[#bda030] text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded transition-all duration-300 hover-shine active:scale-[0.98] shadow">
                                                 Book Visit
                                             </Link>
                                         </div>
                                     </div>
                                 ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
