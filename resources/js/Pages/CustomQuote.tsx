import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
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
    logo: string;
    area: string;
    city: City;
}

interface CustomQuoteProps {
    cities: City[];
    categories: Category[];
    selectedJeweller: Jeweller | null;
    productTitle?: string;
    productId?: string;
    categoryId?: string;
    productImage?: string;
}

export default function CustomQuote({ cities, categories, selectedJeweller, productTitle, productId, categoryId, productImage }: CustomQuoteProps) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_phone: '',
        city_id: selectedJeweller ? String(selectedJeweller.city.id) : '',
        category_id: categoryId ? String(categoryId) : '',
        product_id: productId ? String(productId) : '',
        jeweller_id: selectedJeweller ? String(selectedJeweller.id) : '',
        requirement_description: productTitle ? `I would like to request a custom quote similar to: ${productTitle}.\n\nMy additional requirements are:\n` : '',
        budget: '',
        reference_image: null as File | null,
        preferred_contact_time: '',
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (data.reference_image) {
            const url = URL.createObjectURL(data.reference_image);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [data.reference_image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/custom-jewellery');
    };

    return (
        <AppLayout>
            <Head title="Request Custom Quote" />

            <section class="py-16 bg-[#faf9f6] animate-fade-in-up">
                <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-8">
                        <span class="text-[#d4af37] tracking-widest uppercase font-semibold text-xs"><i class="fa-solid fa-gem mr-1 animate-spin" style={{ animationDuration: '3s' }}></i> Bespoke Craftsmanship</span>
                        <h1 class="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">Request Custom Jewellery Quote</h1>
                        <p class="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
                            Fill out the form below. We will generate a unique Lead ID, route your requirement to verified local partners, and get you quotes.
                        </p>
                        <div class="w-16 h-0.5 bg-[#d4af37] mx-auto mt-4"></div>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
                        <form onSubmit={handleSubmit} class="space-y-6">
                            
                            {productTitle && (
                                <div class="bg-[#0f172a] rounded border border-[#d4af37]/30 p-4 flex items-center justify-between shadow-md">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-[#d4af37]/20 text-[#d4af37] flex-shrink-0">
                                            <i class="fa-solid fa-ring text-lg"></i>
                                        </div>
                                        <div class="text-xs text-white">
                                            <span class="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Inquiring About Product</span>
                                            <strong class="font-luxury text-sm md:text-base text-[#d4af37]">{productTitle}</strong>
                                        </div>
                                    </div>
                                    {productImage && (
                                        <div class="w-16 h-16 rounded overflow-hidden border border-[#d4af37]/50 shadow-md ml-4 flex-shrink-0 bg-white">
                                            <img src={productImage} alt={productTitle} class="w-full h-full object-contain" />
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedJeweller && (
                                <div class="bg-[#d4af37]/5 rounded border border-[#d4af37]/20 p-4 flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full overflow-hidden border border-white bg-white">
                                            <img src={selectedJeweller.logo} alt="Logo" class="w-full h-full object-cover" />
                                        </div>
                                        <div class="text-xs text-[#0f172a]">
                                            <span class="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Sending Inquiry To</span>
                                            <strong class="font-luxury text-sm">{selectedJeweller.business_name}</strong>
                                            ({selectedJeweller.area}, {selectedJeweller.city.name})
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="flex flex-col">
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Your Name *</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={data.customer_name} 
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        placeholder="Enter full name" 
                                        class="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]" 
                                    />
                                    {errors.customer_name && <span class="text-red-500 text-xs mt-1">{errors.customer_name}</span>}
                                </div>

                                <div class="flex flex-col">
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Phone / WhatsApp *</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={data.customer_phone} 
                                        onChange={(e) => setData('customer_phone', e.target.value)}
                                        placeholder="e.g. +923001234567" 
                                        class="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]" 
                                    />
                                    {errors.customer_phone && <span class="text-red-500 text-xs mt-1">{errors.customer_phone}</span>}
                                </div>

                                <div class="flex flex-col">
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Your City *</label>
                                    <select 
                                        required 
                                        value={data.city_id} 
                                        onChange={(e) => setData('city_id', e.target.value)}
                                        class="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                    {errors.city_id && <span class="text-red-500 text-xs mt-1">{errors.city_id}</span>}
                                </div>

                                {!categoryId && (
                                    <div class="flex flex-col">
                                        <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Category *</label>
                                        <select 
                                            required
                                            value={data.category_id} 
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            class="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        {errors.category_id && <span class="text-red-500 text-xs mt-1">{errors.category_id}</span>}
                                    </div>
                                )}

                                <div class="flex flex-col">
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Approximate Budget (PKR)</label>
                                    <input 
                                        type="text" 
                                        value={data.budget} 
                                        onChange={(e) => setData('budget', e.target.value)}
                                        placeholder="e.g. Rs. 150,000 - 200,000" 
                                        class="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]" 
                                    />
                                </div>

                                <div class="flex flex-col">
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Preferred Contact Time</label>
                                    <input 
                                        type="text" 
                                        value={data.preferred_contact_time} 
                                        onChange={(e) => setData('preferred_contact_time', e.target.value)}
                                        placeholder="e.g. Afternoon, Evening" 
                                        class="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]" 
                                    />
                                </div>
                            </div>

                            <div class="flex flex-col">
                                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Specifications</label>
                                <textarea 
                                    rows={4} 
                                    value={data.requirement_description} 
                                    onChange={(e) => setData('requirement_description', e.target.value)}
                                    placeholder="Detail your requirements (e.g. Ring size, gold weight)" 
                                    class="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] resize-vertical"
                                />
                            </div>

                            <div class="flex flex-col">
                                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Upload Reference Image</label>
                                <div class="bg-[#faf9f6] border-2 border-dashed border-gray-300 hover:border-[#d4af37] rounded-lg p-6 text-center cursor-pointer relative transition-colors overflow-hidden">
                                    <input 
                                        type="file" 
                                        onChange={(e) => setData('reference_image', e.target.files ? e.target.files[0] : null)}
                                        class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                                    />
                                    {previewUrl ? (
                                        <div class="flex flex-col items-center justify-center">
                                            <img src={previewUrl} alt="Preview" class="max-h-32 object-contain rounded mb-2 shadow-sm" />
                                            <span class="text-xs text-[#d4af37] font-semibold">Change Image</span>
                                        </div>
                                    ) : (
                                        <div class="pointer-events-none">
                                            <i class="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2 group-hover:text-[#d4af37]"></i>
                                            <span class="text-xs text-gray-500 block">
                                                Click to upload reference design
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {errors.reference_image && <span class="text-red-500 text-xs mt-1">{errors.reference_image}</span>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                class="w-full bg-[#d4af37] hover:bg-[#bda030] text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded shadow shadow-[#d4af37]/25 transition-all duration-300 active:scale-[0.98] hover-shine"
                            >
                                {processing ? 'Submitting...' : 'Submit Quotation Request'}
                            </button>

                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
