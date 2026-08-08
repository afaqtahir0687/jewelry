import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

interface NewsletterSignupProps {
    variant?: 'section' | 'compact';
}

export default function NewsletterSignup({ variant = 'section' }: NewsletterSignupProps) {
    const { data, setData, post, processing, errors, reset } = useForm({ email: '' });
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubscribed(true);
                setTimeout(() => setSubscribed(false), 6000);
            },
        });
    };

    if (variant === 'compact') {
        return (
            <div>
                {subscribed ? (
                    <div className="flex items-center gap-2 text-sm text-[#d4af37] bg-white/5 border border-[#d4af37]/30 rounded-sm px-4 py-2.5">
                        <i className="fa-solid fa-circle-check" /> Thank you for subscribing!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
                        <input
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 md:w-64 bg-white/10 border border-white/15 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#d4af37] hover:bg-[#bda030] text-[#3d1112] font-bold px-5 py-2.5 text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap disabled:opacity-60">
                            {processing ? 'Subscribing…' : 'Subscribe'}
                        </button>
                    </form>
                )}
                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
            </div>
        );
    }

    return (
        <section className="relative bg-gradient-to-br from-[#5c1a1b] via-[#3d1112] to-[#5c1a1b] py-16 md:py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#d4af37] rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#d4af37] rounded-full filter blur-3xl" />
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div data-aos="fade-up" className="w-14 h-14 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-6">
                    <i className="fa-solid fa-envelope-open-text text-[#d4af37] text-xl" />
                </div>

                <h2 data-aos="fade-up" data-aos-delay="80" className="font-luxury text-3xl md:text-4xl text-white font-bold mb-3">
                    Subscribe to Us
                </h2>
                <p data-aos="fade-up" data-aos-delay="140" className="text-cream/80 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                    Subscribe &amp; get exclusive jewellery offers in your inbox. By subscribing, you agree to receive promotional emails and offers from us — you can unsubscribe anytime.
                </p>

                <div data-aos="fade-up" data-aos-delay="200" className="max-w-md mx-auto">
                    {subscribed ? (
                        <div className="flex items-center justify-center gap-2 bg-white/10 border border-[#d4af37]/40 text-[#d4af37] rounded-sm px-5 py-4 font-semibold text-sm animate-fade-in-up">
                            <i className="fa-solid fa-circle-check text-lg" /> Thank you for subscribing!
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/95 border border-white/20 rounded-sm px-4 py-3.5 text-sm text-[#5c1a1b] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all duration-300"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#d4af37] hover:bg-[#bda030] text-[#3d1112] font-bold px-7 py-3.5 text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg hover-shine disabled:opacity-60 whitespace-nowrap">
                                {processing ? 'Subscribing…' : 'Subscribe Now'}
                            </button>
                        </form>
                    )}
                    {errors.email && <p className="text-xs text-red-300 mt-2">{errors.email}</p>}
                </div>
            </div>
        </section>
    );
}
