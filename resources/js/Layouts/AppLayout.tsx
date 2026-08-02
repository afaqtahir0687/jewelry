import React, { useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { Toaster, toast } from 'sonner';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { flash, seo_meta, nav_categories = [] } = usePage<PageProps>().props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error)   toast.error(flash.error);
    }, [flash]);

    return (
        <div className="bg-[#faf9f6] font-sans text-[#0f172a] min-h-screen flex flex-col antialiased">
            {seo_meta && (
                <Head title={seo_meta.title}>
                    {seo_meta.description && <meta name="description" content={seo_meta.description} />}
                    {seo_meta.keywords    && <meta name="keywords"    content={seo_meta.keywords} />}
                </Head>
            )}

            {/* Top Premium Notification Bar */}
            <div className="bg-[#0f172a] text-[#d4af37] text-xs py-2 text-center tracking-widest uppercase font-semibold border-b border-[#d4af37]/20">
                <i className="fa-solid fa-gem mr-2" /> Connecting You to Pakistan's Most Trusted Verified Artisans <i className="fa-solid fa-gem ml-2" />
            </div>

            {/* Main Navigation Bar */}
            <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">

                        {/* Brand Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex flex-col">
                                <span className="font-luxury font-bold text-2xl tracking-wide text-[#0f172a]">ONLINE JEWELRY</span>
                                <span className="text-xs font-semibold tracking-widest text-[#d4af37] text-right uppercase -mt-1">SHOP</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Menu */}
                        <nav className="hidden md:flex space-x-6 lg:space-x-8 font-medium text-sm text-[#0f172a]/80">
                            <Link href="/" className="hover:text-[#d4af37] transition-colors duration-200">Home</Link>

                            {/* Categories Dropdown — dynamic */}
                            <div className="relative group flex items-center">
                                <button className="hover:text-[#d4af37] flex items-center gap-1.5 transition-colors duration-300 focus:outline-none cursor-pointer">
                                    Categories <i className="fa-solid fa-chevron-down text-[10px] transition-transform duration-300 group-hover:rotate-180" />
                                </button>
                                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 bg-white/95 backdrop-blur-md border border-[#d4af37]/20 rounded-md shadow-xl py-2.5 w-56 transition-all duration-300 z-50">
                                    {nav_categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/${cat.slug}`}
                                            className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-6 transition-all duration-300">
                                            {cat.name}
                                        </Link>
                                    ))}
                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <Link
                                            href="/categories"
                                            className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:bg-[#faf9f6] hover:pl-6 transition-all duration-300">
                                            <i className="fa-solid fa-grid-2 mr-1" /> All Categories
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/custom-jewellery" className="hover:text-[#d4af37] transition-colors duration-200">Custom Order</Link>
                        </nav>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="https://wa.me/923017730687" target="_blank" className="text-[#0f172a] hover:text-[#d4af37] text-lg px-2" title="WhatsApp">
                                <i className="fa-brands fa-whatsapp text-2xl text-green-500 hover:scale-110 transition-transform" />
                            </a>
                            <a href="tel:+923017730687" className="flex items-center gap-1.5 text-[#0f172a] hover:text-[#d4af37] transition-all duration-200 group" title="Call us">
                                <i className="fa-solid fa-phone text-lg group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-semibold tracking-wide">03017730687</span>
                            </a>
                            <Link href="/find-a-jeweller" className="border border-[#0f172a]/30 hover:border-[#d4af37] hover:text-[#d4af37] px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300">
                                Find a Jeweller
                            </Link>
                            <Link href="/custom-jewellery" className="bg-[#d4af37] hover:bg-[#bda030] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-md">
                                Get a Quote
                            </Link>
                        </div>

                        {/* Mobile menu toggle */}
                        <div className="md:hidden flex items-center gap-4">
                            <a href="https://wa.me/923017730687" target="_blank" title="WhatsApp">
                                <i className="fa-brands fa-whatsapp text-2xl text-green-500" />
                            </a>
                            <a href="tel:+923017730687" className="text-[#0f172a] hover:text-[#d4af37] transition-colors" title="Call us">
                                <i className="fa-solid fa-phone text-xl" />
                            </a>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#0f172a] hover:text-[#d4af37] focus:outline-none">
                                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Dropdown Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-md animate-fade-in">
                        <Link href="/" className="block font-medium hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Home</Link>

                        <div className="border-t border-gray-100 my-2 pt-2">
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Categories</span>
                            {nav_categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/${cat.slug}`}
                                    className="block pl-4 py-1 hover:text-[#d4af37]"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    {cat.name}
                                </Link>
                            ))}
                            <Link href="/categories" className="block pl-4 py-1 text-[#d4af37] font-semibold" onClick={() => setMobileMenuOpen(false)}>
                                All Categories →
                            </Link>
                        </div>

                        <Link href="/custom-jewellery" className="block font-medium hover:text-[#d4af37]" onClick={() => setMobileMenuOpen(false)}>Custom Order</Link>
                        <div className="pt-2 flex flex-col gap-2">
                            <Link href="/find-a-jeweller" className="text-center border border-[#0f172a]/30 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm" onClick={() => setMobileMenuOpen(false)}>
                                Find a Jeweller
                            </Link>
                            <Link href="/custom-jewellery" className="text-center bg-[#d4af37] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md" onClick={() => setMobileMenuOpen(false)}>
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Premium Footer */}
            <footer className="bg-[#0f172a] text-gray-400 pt-16 pb-24 md:pb-12 border-t border-[#d4af37]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

                        <div>
                            <Link href="/" className="flex flex-col mb-4">
                                <span className="font-luxury font-bold text-xl tracking-wide text-white">ONLINE JEWELRY</span>
                                <span className="text-[10px] font-semibold tracking-widest text-[#d4af37] uppercase -mt-1">SHOP</span>
                            </Link>
                            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                Connecting customers with certified and verified top-tier jewellers in Pakistan. Request quotes, browse inspirations and find physical shops with confidence.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#0f172a] flex items-center justify-center transition-all"><i className="fa-brands fa-facebook-f" /></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#0f172a] flex items-center justify-center transition-all"><i className="fa-brands fa-instagram" /></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#0f172a] flex items-center justify-center transition-all"><i className="fa-brands fa-tiktok" /></a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Top Cities</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/jewellers/lahore"    className="hover:text-[#d4af37] transition-colors">Lahore Jewellers</Link></li>
                                <li><Link href="/jewellers/karachi"   className="hover:text-[#d4af37] transition-colors">Karachi Jewellers</Link></li>
                                <li><Link href="/jewellers/islamabad" className="hover:text-[#d4af37] transition-colors">Islamabad Jewellers</Link></li>
                            </ul>
                        </div>

                        {/* Dynamic Categories in Footer */}
                        <div>
                            <h3 className="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Categories</h3>
                            <ul className="space-y-2 text-sm">
                                {nav_categories.slice(0, 6).map((cat) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="hover:text-[#d4af37] transition-colors">
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                                {nav_categories.length > 6 && (
                                    <li>
                                        <Link href="/categories" className="text-[#d4af37] hover:underline transition-colors">
                                            All Categories →
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/page/about-us"             className="hover:text-[#d4af37] transition-colors">About Us</Link></li>
                                <li><Link href="/contact-us"                className="hover:text-[#d4af37] transition-colors">Contact Us</Link></li>
                                <li><Link href="/page/faqs"                 className="hover:text-[#d4af37] transition-colors">FAQs</Link></li>
                                <li><Link href="/page/terms-and-conditions" className="hover:text-[#d4af37] transition-colors">Terms &amp; Conditions</Link></li>
                                <li><Link href="/page/privacy-policy"       className="hover:text-[#d4af37] transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Our Trust Guarantee</h3>
                            <p className="text-xs leading-relaxed text-gray-400 mb-2">
                                Online Jewelry Shop is a connection platform. All purchases, invoices, and product quality checks are the sole responsibility of the verified partner shop.
                            </p>
                            <div className="border-t border-white/10 pt-2 mt-2">
                                <span className="text-xs text-[#d4af37]"><i className="fa-solid fa-shield-halved mr-1" /> 100% Verified Sellers Only</span>
                            </div>
                        </div>

                    </div>

                    <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Online Jewelry Shop. All Rights Reserved. Powered by Pakistan Artisan Network.</p>
                    </div>
                </div>
            </footer>

            {/* Sticky Mobile Bottom Menu */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl py-3 px-6 z-50 flex justify-between items-center text-center">
                <Link href="/" className="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-house text-lg" />
                    <span className="text-[10px] font-bold">Home</span>
                </Link>
                <Link href="/categories" className="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-list text-lg" />
                    <span className="text-[10px] font-bold">Categories</span>
                </Link>
                <Link href="/find-a-jeweller" className="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-location-dot text-lg" />
                    <span className="text-[10px] font-bold">Cities</span>
                </Link>
                <a href="https://wa.me/923017730687" target="_blank" className="flex flex-col items-center gap-1 text-green-500">
                    <i className="fa-brands fa-whatsapp text-xl" />
                    <span className="text-[10px] font-bold">WhatsApp</span>
                </a>
                <Link href="/custom-jewellery" className="flex flex-col items-center gap-1 text-[#0f172a]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-gem text-lg" />
                    <span className="text-[10px] font-bold">Get Quote</span>
                </Link>
            </div>

            <Toaster richColors theme="light" position="top-right" closeButton />

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/923017730687"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-20 md:bottom-6 right-5 z-50 group flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-400/40 hover:scale-105"
                title="Chat on WhatsApp">
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
                <span className="relative flex items-center gap-2 px-4 py-3">
                    <i className="fa-brands fa-whatsapp text-2xl" />
                    <span className="text-sm font-semibold tracking-wide hidden sm:inline">03017730687</span>
                </span>
            </a>
        </div>
    );
}
