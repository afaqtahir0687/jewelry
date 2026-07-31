import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { Toaster, toast } from 'sonner';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { flash } = usePage<PageProps>().props;

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div class="bg-[#faf9f6] font-sans text-[#0f172a] min-h-screen flex flex-col antialiased">
            
            {/* Top Premium Notification Bar */}
            <div class="bg-[#0f172a] text-[#d4af37] text-xs py-2 text-center tracking-widest uppercase font-semibold border-b border-[#d4af37]/20">
                <i class="fa-solid fa-gem mr-2"></i> Connecting You to Pakistan's Most Trusted Verified Artisans <i class="fa-solid fa-gem ml-2"></i>
            </div>

            {/* Main Navigation Bar */}
            <header class="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-20 items-center">
                        
                        {/* Brand Logo */}
                        <div class="flex-shrink-0 flex items-center">
                            <Link href="/" class="flex flex-col">
                                <span class="font-luxury font-bold text-2xl tracking-wide text-[#0f172a]">ONLINE JEWELRY</span>
                                <span class="text-xs font-semibold tracking-widest text-[#d4af37] text-right uppercase -mt-1">SHOP</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Menu */}
                        <nav class="hidden md:flex space-x-6 lg:space-x-8 font-medium text-sm text-[#0f172a]/80">
                            <Link href="/" class="hover:text-[#d4af37] transition-colors duration-200">Home</Link>
                            <Link href="/find-a-jeweller" class="hover:text-[#d4af37] transition-colors duration-200">Verified Jewellers</Link>
                            
                            {/* Cities Dropdown */}
                            <div class="relative group flex items-center">
                                <button class="hover:text-[#d4af37] flex items-center gap-1.5 transition-colors duration-300 focus:outline-none cursor-pointer">
                                    Shop by City <i class="fa-solid fa-chevron-down text-[10px] transition-transform duration-300 group-hover:rotate-180"></i>
                                </button>
                                <div class="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 bg-white/95 backdrop-blur-md border border-[#d4af37]/20 rounded-md shadow-xl py-2.5 w-52 transition-all duration-300 z-50">
                                    <Link href="/jewellers/lahore" class="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">Lahore</Link>
                                    <Link href="/jewellers/karachi" class="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">Karachi</Link>
                                    <Link href="/jewellers/islamabad" class="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">Islamabad</Link>
                                </div>
                            </div>

                            {/* Categories Dropdown */}
                            <div class="relative group flex items-center">
                                <button class="hover:text-[#d4af37] flex items-center gap-1.5 transition-colors duration-300 focus:outline-none cursor-pointer">
                                    Categories <i class="fa-solid fa-chevron-down text-[10px] transition-transform duration-300 group-hover:rotate-180"></i>
                                </button>
                                <div class="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 bg-white/95 backdrop-blur-md border border-[#d4af37]/20 rounded-md shadow-xl py-2.5 w-52 transition-all duration-300 z-50">
                                    <Link href="/gold-jewellery" class="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">Gold Jewellery</Link>
                                    <Link href="/diamond-jewellery" class="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">Diamond Jewellery</Link>
                                    <Link href="/bridal-jewellery" class="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">Bridal Sets</Link>
                                    <Link href="/engagement-rings" class="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">Engagement Rings</Link>
                                </div>
                            </div>

                            <Link href="/custom-jewellery" class="hover:text-[#d4af37] transition-colors duration-200">Custom Order</Link>
                        </nav>

                        {/* Desktop CTA Buttons */}
                        <div class="hidden md:flex items-center space-x-4">
                            <a href="https://wa.me/+923001234567" target="_blank" class="text-[#0f172a] hover:text-[#d4af37] text-lg px-2">
                                <i class="fa-brands fa-whatsapp text-2xl text-green-500 hover:scale-110 transition-transform"></i>
                            </a>
                            <Link href="/find-a-jeweller" class="border border-[#0f172a]/30 hover:border-[#d4af37] hover:text-[#d4af37] px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300">
                                Find a Jeweller
                            </Link>
                            <Link href="/custom-jewellery" class="bg-[#d4af37] hover:bg-[#bda030] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-md">
                                Get a Quote
                            </Link>
                        </div>

                        {/* Mobile menu toggle */}
                        <div class="md:hidden flex items-center gap-4">
                            <a href="https://wa.me/+923001234567" target="_blank">
                                <i class="fa-brands fa-whatsapp text-2xl text-green-500"></i>
                            </a>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} class="text-[#0f172a] hover:text-[#d4af37] focus:outline-none">
                                <i class={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Dropdown Navigation */}
                {mobileMenuOpen && (
                    <div class="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-md animate-fade-in">
                        <Link href="/" class="block font-medium hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link href="/find-a-jeweller" class="block font-medium hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Verified Jewellers</Link>
                        <div class="border-t border-gray-100 my-2 pt-2">
                            <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cities</span>
                            <Link href="/jewellers/lahore" class="block pl-4 py-1 hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Lahore</Link>
                            <Link href="/jewellers/karachi" class="block pl-4 py-1 hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Karachi</Link>
                            <Link href="/jewellers/islamabad" class="block pl-4 py-1 hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Islamabad</Link>
                        </div>
                        <div class="border-t border-gray-100 my-2 pt-2">
                            <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Categories</span>
                            <Link href="/gold-jewellery" class="block pl-4 py-1 hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Gold Jewellery</Link>
                            <Link href="/diamond-jewellery" class="block pl-4 py-1 hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Diamond Jewellery</Link>
                            <Link href="/bridal-jewellery" class="block pl-4 py-1 hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Bridal Sets</Link>
                            <Link href="/engagement-rings" class="block pl-4 py-1 hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Engagement Rings</Link>
                        </div>
                        <Link href="/custom-jewellery" class="block font-medium hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Custom Order</Link>
                        <div class="pt-2 flex flex-col gap-2">
                            <Link href="/find-a-jeweller" class="text-center border border-[#0f172a]/30 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm" onClick={() => setMobileMenuOpen(false)}>
                                Find a Jeweller
                            </Link>
                            <Link href="/custom-jewellery" class="text-center bg-[#d4af37] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md" onClick={() => setMobileMenuOpen(false)}>
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main class="flex-grow">
                {children}
            </main>

            {/* Premium Footer */}
            <footer class="bg-[#0f172a] text-gray-400 pt-16 pb-24 md:pb-12 border-t border-[#d4af37]/10">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        
                        <div>
                            <Link href="/" class="flex flex-col mb-4">
                                <span class="font-luxury font-bold text-xl tracking-wide text-white">ONLINE JEWELRY</span>
                                <span class="text-[10px] font-semibold tracking-widest text-[#d4af37] uppercase -mt-1">SHOP</span>
                            </Link>
                            <p class="text-sm text-gray-400 mb-6 leading-relaxed">
                                Connecting customers with certified and verified top-tier jewellers in Pakistan. Request quotes, browse inspirations and find physical shops with confidence.
                            </p>
                            <div class="flex space-x-4">
                                <a href="#" class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#0f172a] flex items-center justify-center transition-all"><i class="fa-brands fa-facebook-f"></i></a>
                                <a href="#" class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#0f172a] flex items-center justify-center transition-all"><i class="fa-brands fa-instagram"></i></a>
                                <a href="#" class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#0f172a] flex items-center justify-center transition-all"><i class="fa-brands fa-tiktok"></i></a>
                            </div>
                        </div>

                        <div>
                            <h3 class="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Top Cities</h3>
                            <ul class="space-y-2 text-sm">
                                <li><Link href="/jewellers/lahore" class="hover:text-[#d4af37] transition-colors">Lahore Jewellers</Link></li>
                                <li><Link href="/jewellers/karachi" class="hover:text-[#d4af37] transition-colors">Karachi Jewellers</Link></li>
                                <li><Link href="/jewellers/islamabad" class="hover:text-[#d4af37] transition-colors">Islamabad Jewellers</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Categories</h3>
                            <ul class="space-y-2 text-sm">
                                <li><Link href="/gold-jewellery" class="hover:text-[#d4af37] transition-colors">Gold Jewellery</Link></li>
                                <li><Link href="/diamond-jewellery" class="hover:text-[#d4af37] transition-colors">Diamond Jewellery</Link></li>
                                <li><Link href="/bridal-jewellery" class="hover:text-[#d4af37] transition-colors">Bridal Sets</Link></li>
                                <li><Link href="/engagement-rings" class="hover:text-[#d4af37] transition-colors">Engagement Rings</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Our Trust Guarantee</h3>
                            <p class="text-xs leading-relaxed text-gray-400 mb-2">
                                Online Jewelry Shop is a connection platform. All purchases, invoices, and product quality checks are the sole responsibility of the verified partner shop.
                            </p>
                            <div class="border-t border-white/10 pt-2 mt-2">
                                <span class="text-xs text-[#d4af37]"><i class="fa-solid fa-shield-halved mr-1"></i> 100% Verified Sellers Only</span>
                            </div>
                        </div>

                    </div>

                    <div class="border-t border-white/5 pt-8 text-center text-xs text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Online Jewelry Shop. All Rights Reserved. Powered by Pakistan Artisan Network.</p>
                    </div>
                </div>
            </footer>

            {/* Sticky Mobile Bottom Menu */}
            <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl py-3 px-6 z-50 flex justify-between items-center text-center">
                <Link href="/" class="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i class="fa-solid fa-house text-lg"></i>
                    <span class="text-[10px] font-bold">Home</span>
                </Link>
                <Link href="/find-a-jeweller" class="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i class="fa-solid fa-list text-lg"></i>
                    <span class="text-[10px] font-bold">Categories</span>
                </Link>
                <Link href="/find-a-jeweller" class="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i class="fa-solid fa-location-dot text-lg"></i>
                    <span class="text-[10px] font-bold">Cities</span>
                </Link>
                <a href="https://wa.me/+923001234567" target="_blank" class="flex flex-col items-center gap-1 text-green-500">
                    <i class="fa-brands fa-whatsapp text-xl"></i>
                    <span class="text-[10px] font-bold">WhatsApp</span>
                </a>
                <Link href="/custom-jewellery" class="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i class="fa-solid fa-gem text-lg"></i>
                    <span class="text-[10px] font-bold">Get Quote</span>
                </Link>
            </div>
            <Toaster richColors theme="light" position="top-right" closeButton />
        </div>
    );
}
