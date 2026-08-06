import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface City {
    id: number;
    name: string;
}

interface BecomePartnerProps {
    cities: City[];
}

const SPECIALITY_OPTIONS = ['22K Gold', 'Diamond', 'Bridal Sets', 'Bangles', 'Watches', 'Custom Design'];

export default function BecomePartner({ cities }: BecomePartnerProps) {
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        business_name: '',
        city_id: '',
        area: '',
        full_address: '',
        years_in_business: '',
        specialities: [] as string[],
        message: '',
    });

    const toggleSpeciality = (value: string) => {
        setData('specialities',
            data.specialities.includes(value)
                ? data.specialities.filter((s) => s !== value)
                : [...data.specialities, value]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/become-a-partner', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Become a Partner" />

            <section className="py-16 bg-[#faf9f6] animate-fade-in-up">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">
                            <i className="fa-solid fa-handshake mr-1" /> Join Our Network
                        </span>
                        <h1 className="font-luxury text-3xl md:text-4xl text-[#0f172a] font-bold mt-2">Become a Verified Partner</h1>
                        <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
                            List your jewellery shop on Pakistan's most trusted platform. Fill out the form below and our
                            team will review your application.
                        </p>
                        <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
                        {wasSuccessful && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                                <i className="fa-solid fa-circle-check" />
                                Thank you! Your application has been submitted for review.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Your Name *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter full name"
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Phone *</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="e.g. +923001234567"
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">WhatsApp</label>
                                    <input
                                        type="text"
                                        value={data.whatsapp}
                                        onChange={(e) => setData('whatsapp', e.target.value)}
                                        placeholder="e.g. +923001234567"
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                </div>

                                <div className="flex flex-col md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Business / Shop Name *</label>
                                    <input
                                        type="text"
                                        value={data.business_name}
                                        onChange={(e) => setData('business_name', e.target.value)}
                                        placeholder="e.g. Al-Karam Jewellers"
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.business_name && <span className="text-red-500 text-xs mt-1">{errors.business_name}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">City *</label>
                                    <select
                                        value={data.city_id}
                                        onChange={(e) => setData('city_id', e.target.value)}
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                    {errors.city_id && <span className="text-red-500 text-xs mt-1">{errors.city_id}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Area / Locality *</label>
                                    <input
                                        type="text"
                                        value={data.area}
                                        onChange={(e) => setData('area', e.target.value)}
                                        placeholder="e.g. Saddar"
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.area && <span className="text-red-500 text-xs mt-1">{errors.area}</span>}
                                </div>

                                <div className="flex flex-col md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Shop Address *</label>
                                    <input
                                        type="text"
                                        value={data.full_address}
                                        onChange={(e) => setData('full_address', e.target.value)}
                                        placeholder="Street, building, landmark..."
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.full_address && <span className="text-red-500 text-xs mt-1">{errors.full_address}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Years in Business</label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={data.years_in_business}
                                        onChange={(e) => setData('years_in_business', e.target.value)}
                                        placeholder="e.g. 10"
                                        className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Specialities</label>
                                <div className="flex flex-wrap gap-2">
                                    {SPECIALITY_OPTIONS.map((spec) => (
                                        <button
                                            type="button"
                                            key={spec}
                                            onClick={() => toggleSpeciality(spec)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                                                data.specialities.includes(spec)
                                                    ? 'bg-[#d4af37] border-[#d4af37] text-white'
                                                    : 'bg-[#faf9f6] border-gray-200 text-gray-600 hover:border-[#d4af37]'
                                            }`}
                                        >
                                            {spec}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Tell Us About Your Business</label>
                                <textarea
                                    rows={4}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Anything you'd like us to know..."
                                    className="bg-[#faf9f6] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] resize-vertical"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#d4af37] hover:bg-[#bda030] text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded shadow shadow-[#d4af37]/25 transition-all duration-300 active:scale-[0.98] hover-shine disabled:opacity-60"
                            >
                                {processing ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
