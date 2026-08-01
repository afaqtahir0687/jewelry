import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-luxury text-[#0f172a] mb-4">Contact Us</h1>
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
                                <div className="w-12 h-12 bg-[#faf9f6] rounded-full flex items-center justify-center text-[#d4af37] shrink-0">
                                    <i className="fa-solid fa-location-dot text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-luxury font-semibold text-[#0f172a] mb-1">Our Office</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Jewelry Market, Lahore<br />
                                        Punjab, Pakistan
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#faf9f6] rounded-full flex items-center justify-center text-[#d4af37] shrink-0">
                                    <i className="fa-solid fa-phone text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-luxury font-semibold text-[#0f172a] mb-1">Phone Number</h3>
                                    <p className="text-gray-600 text-sm mb-1">03017730687</p>
                                    <p className="text-xs text-gray-500">Mon-Sat 9am to 6pm</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#faf9f6] rounded-full flex items-center justify-center text-[#d4af37] shrink-0">
                                    <i className="fa-solid fa-envelope text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-luxury font-semibold text-[#0f172a] mb-1">Email Address</h3>
                                    <p className="text-gray-600 text-sm">support@onlinejewelry.pk</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-[#d4af37]/20 animate-fade-in-right relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] rounded-t-lg"></div>
                        
                        <h2 className="text-2xl font-luxury text-[#0f172a] mb-6">Send a Message</h2>
                        
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="focus:ring-[#d4af37] focus:border-[#d4af37]"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="focus:ring-[#d4af37] focus:border-[#d4af37]"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="focus:ring-[#d4af37] focus:border-[#d4af37]"
                                    placeholder="How can we help?"
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="message">Your Message *</Label>
                                <Textarea
                                    id="message"
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="focus:ring-[#d4af37] focus:border-[#d4af37]"
                                    placeholder="Write your message here..."
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-[#d4af37] hover:bg-[#bda030] text-white font-semibold py-6 shadow-md transition-all uppercase tracking-wider text-sm mt-4"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
