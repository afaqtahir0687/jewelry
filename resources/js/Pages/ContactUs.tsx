import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ContactUs() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact-us', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Contact Us">
                <meta name="description" content="Get in touch with Online Jewelry Shop for any inquiries, support or feedback." />
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24">
                <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-luxury text-[#4a0e0e] mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have a question about our verified jewelers or need help with a custom order? 
                        We are here to help. Reach out to us anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in-left flex flex-col justify-center">
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#fff8f0] rounded-full flex items-center justify-center text-[#d4af37] shrink-0">
                                    <i className="fa-solid fa-location-dot text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-luxury font-semibold text-[#4a0e0e] mb-1">Our Office</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Jewelry Market, Lahore<br />
                                        Punjab, Pakistan
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#fff8f0] rounded-full flex items-center justify-center text-[#d4af37] shrink-0">
                                    <i className="fa-solid fa-phone text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-luxury font-semibold text-[#4a0e0e] mb-1">Phone Number</h3>
                                    <p className="text-gray-600 text-sm mb-1">03017730687</p>
                                    <p className="text-xs text-gray-500">Mon-Sat 9am to 6pm</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#fff8f0] rounded-full flex items-center justify-center text-[#d4af37] shrink-0">
                                    <i className="fa-solid fa-envelope text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-luxury font-semibold text-[#4a0e0e] mb-1">Email Address</h3>
                                    <p className="text-gray-600 text-sm">support@onlinejewelry.pk</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-[#d4af37]/20 animate-fade-in-right relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] rounded-t-lg"></div>
                        
                        <h2 className="text-2xl font-luxury text-[#4a0e0e] mb-6">Send a Message</h2>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Doe"
                                        className="bg-[#fff8f0] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="john@example.com"
                                        className="bg-[#fff8f0] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            
                            <div className="flex flex-col">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="How can we help?"
                                    className="bg-[#fff8f0] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Your Message *</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Write your message here..."
                                    className="bg-[#fff8f0] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37] resize-y"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-[#d4af37] hover:bg-[#bda030] text-white font-bold py-3 rounded shadow transition-all duration-300 active:scale-[0.98] uppercase tracking-wider text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
