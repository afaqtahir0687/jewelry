import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import type { PageProps } from '@/types';
import { Toaster, toast } from 'sonner';
import Navbar from '@/Components/Navbar/Navbar';
import NewsletterSignup from '@/Components/NewsletterSignup';
import AOS from 'aos';
import InstallAppBanner from '@/components/PWA/InstallAppBanner';


interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { flash, seo_meta, nav_categories = [] } = usePage<PageProps>().props;
    const pageUrl = usePage().url;
    const footerRef = React.useRef<HTMLElement>(null);
    const [footerVisible, setFooterVisible] = React.useState(false);

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // Hide the floating call/WhatsApp buttons once the footer scrolls into view
    // so they don't sit on top of footer text/links.
    React.useEffect(() => {
        const node = footerRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => setFooterVisible(entry.isIntersecting),
            { rootMargin: '0px 0px -40% 0px' }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [pageUrl]);

    React.useEffect(() => {
        AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
    }, []);

    React.useEffect(() => {
        AOS.refresh();
    }, [pageUrl]);

    return (
        <div className="bg-[#fff8f0] font-sans text-[#5c1a1b] min-h-screen flex flex-col antialiased overflow-x-hidden">
            {seo_meta && (
                <Head title={seo_meta.title}>
                    {seo_meta.description && <meta name="description" content={seo_meta.description} />}
                    {seo_meta.keywords && <meta name="keywords" content={seo_meta.keywords} />}
                </Head>
            )}

            {/* Top Premium Notification Bar */}
            <div className="bg-[#5c1a1b] text-[#d4af37] text-xs py-2 text-center tracking-widest uppercase font-semibold border-b border-[#d4af37]/20">
                <i className="fa-solid fa-gem mr-2" /> Connecting You to Pakistan's Most Trusted Verified Artisans <i className="fa-solid fa-gem ml-2" />
            </div>

            {/* Main Navigation Bar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow animate-page-in">
                {children}
            </main>

            {/* Premium Footer */}
            <footer ref={footerRef} className="bg-gradient-to-b from-[#3d1112] to-black text-gray-400 pt-16 pb-24 md:pb-12 border-t border-[#d4af37]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Newsletter Strip */}
                    <div data-aos="fade-up" className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 border border-[#d4af37]/20 rounded-lg px-6 py-8 mb-14">
                        <div className="text-center md:text-left">
                            <h3 className="font-luxury text-white font-bold text-xl md:text-2xl">Join Our Inner Circle</h3>
                            <p className="text-sm text-gray-400 mt-1">Subscribe &amp; get exclusive jewellery offers, gold rate updates &amp; festive deals in your inbox.</p>
                        </div>
                        <NewsletterSignup variant="compact" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                        <div data-aos="fade-up" data-aos-delay="0">
                            <Link href="/" className="flex items-center mb-4">
                                <img src="/images/gehna-logo.svg" alt="Gehna" className="h-14 w-auto" />
                            </Link>
                            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                Connecting customers with certified and verified top-tier jewellers in Pakistan. Request quotes, browse inspirations and find physical shops with confidence.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#3d1112] flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-facebook-f" /></a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#3d1112] flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-instagram" /></a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#3d1112] flex items-center justify-center transition-all duration-300"><i className="fa-brands fa-tiktok" /></a>
                            </div>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="100">
                            <h3 className="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Quick Links</h3>
                            <ul className="space-y-2.5 text-sm">
                                <li><Link href="/page/about-us" className="hover:text-[#d4af37] transition-colors duration-300">About Us</Link></li>
                                <li><Link href="/products" className="hover:text-[#d4af37] transition-colors duration-300">Shop Products</Link></li>
                                <li><Link href="/contact-us" className="hover:text-[#d4af37] transition-colors duration-300">Contact Us</Link></li>
                                <li><Link href="/faqs" className="hover:text-[#d4af37] transition-colors duration-300">FAQs</Link></li>
                                <li><Link href="/page/terms-and-conditions" className="hover:text-[#d4af37] transition-colors duration-300">Terms &amp; Conditions</Link></li>
                                <li><Link href="/page/privacy-policy" className="hover:text-[#d4af37] transition-colors duration-300">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Dynamic Categories in Footer */}
                        <div data-aos="fade-up" data-aos-delay="200">
                            <h3 className="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Categories</h3>
                            <ul className="space-y-2.5 text-sm">
                                {nav_categories.slice(0, 6).map((cat) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="hover:text-[#d4af37] transition-colors duration-300">
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                                {nav_categories.length > 6 && (
                                    <li>
                                        <Link href="/categories" className="text-[#d4af37] hover:underline transition-colors duration-300">
                                            All Categories →
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="300">
                            <h3 className="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Contact Us</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2.5">
                                    <i className="fa-solid fa-phone text-[#d4af37] mt-1" />
                                    <a href="tel:+923017730687" className="hover:text-[#d4af37] transition-colors duration-300">0301-7730687</a>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <i className="fa-brands fa-whatsapp text-[#d4af37] mt-1" />
                                    <a href="https://wa.me/923017730687" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors duration-300">Chat on WhatsApp</a>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <i className="fa-solid fa-location-dot text-[#d4af37] mt-1" />
                                    <span>Serving Lahore, Karachi, Islamabad &amp; all major cities of Pakistan</span>
                                </li>
                            </ul>
                            <div className="border-t border-white/10 pt-3 mt-4">
                                <span className="text-xs text-[#d4af37]"><i className="fa-solid fa-shield-halved mr-1" /> 100% Verified Sellers Only</span>
                            </div>
                        </div>

                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Online Jewelry Shop. All Rights Reserved.</p>
                        <p>Powered by Pakistan Artisan Network</p>
                    </div>
                </div>
            </footer>

            {/* Sticky Mobile Bottom Menu */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl py-3 px-6 z-50 flex justify-between items-center text-center">
                <Link href="/" className="flex flex-col items-center gap-1 text-[#5c1a1b]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-house text-lg" />
                    <span className="text-[10px] font-bold">Home</span>
                </Link>
                <Link href="/categories" className="flex flex-col items-center gap-1 text-[#5c1a1b]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-list text-lg" />
                    <span className="text-[10px] font-bold">Categories</span>
                </Link>
                <Link href="/products" className="flex flex-col items-center gap-1 text-[#5c1a1b]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-bag-shopping text-lg" />
                    <span className="text-[10px] font-bold">Shop</span>
                </Link>
                <a href="https://wa.me/923017730687" target="_blank" className="flex flex-col items-center gap-1 text-green-500">
                    <i className="fa-brands fa-whatsapp text-xl" />
                    <span className="text-[10px] font-bold">WhatsApp</span>
                </a>
                <Link href="/custom-jewellery" className="flex flex-col items-center gap-1 text-[#5c1a1b]/80 hover:text-[#d4af37]">
                    <i className="fa-solid fa-gem text-lg" />
                    <span className="text-[10px] font-bold">Get Quote</span>
                </Link>
            </div>

            <Toaster richColors theme="light" position="top-right" closeButton />
            <InstallAppBanner />


            {/* Floating Call Button */}
            <a
                href="tel:+923017730687"
                className={`fixed bottom-20 md:bottom-6 left-5 z-50 group flex items-center gap-2 bg-[#5c1a1b] hover:bg-[#7a2426] text-white rounded-full shadow-2xl transition-all duration-300 hover:shadow-[#d4af37]/30 hover:scale-105 ${footerVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                title="Call us">
                <span className="relative flex items-center gap-2 px-4 py-3">
                    <i className="fa-solid fa-phone text-lg" />
                    <span className="text-sm font-semibold tracking-wide hidden sm:inline">03017730687</span>
                </span>
            </a>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/923017730687"
                target="_blank"
                rel="noopener noreferrer"
                className={`fixed bottom-20 md:bottom-6 right-5 z-50 group flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-400/40 hover:scale-105 ${footerVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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
