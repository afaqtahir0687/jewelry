import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps, MegaMenuItem } from '@/types';
import NavItem from './NavItem';

export default function Navbar() {
    const { navigation = [] } = usePage<PageProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMegaMenu(label);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMegaMenu(null);
        }, 150);
    };

    // Close mega menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setActiveMegaMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const closeAllMenus = () => {
        setActiveMegaMenu(null);
        setMobileMenuOpen(false);
    };

    return (
        <header
            ref={headerRef}
            className={`bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? 'border-[#d4af37]/30 shadow-lg' : 'border-[#d4af37]/15 shadow-sm'
                }`}
        >
            {/* Gold hairline accent */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#4a0e0e] via-[#d4af37] to-[#4a0e0e]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'}`}>

                    {/* Brand Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center" onClick={closeAllMenus}>
                            <img
                                src="/images/gehna-diamond.svg"
                                alt="Gehna"
                                className={`w-auto transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Menu */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 h-full">
                        <Link href="/" className="relative h-full flex items-center px-1 text-sm font-semibold text-[#4a0e0e] hover:text-[#d4af37] uppercase tracking-wider group transition-colors duration-200">
                            Home
                            <span className="absolute left-0 bottom-0 h-[2px] bg-[#d4af37] w-0 group-hover:w-full transition-all duration-300"></span>
                        </Link>

                        {navigation.map((item, idx) => (
                            <NavItem
                                key={idx}
                                item={item}
                                isActive={activeMegaMenu === item.label}
                                onMouseEnter={() => handleMouseEnter(item.label)}
                                onMouseLeave={handleMouseLeave}
                                onFocus={() => handleMouseEnter(item.label)}
                                onClick={() => setActiveMegaMenu(activeMegaMenu === item.label ? null : item.label)}
                                closeMenu={closeAllMenus}
                            />
                        ))}
                    </nav>

                    {/* Desktop CTA & Actions */}
                    <div className="hidden md:flex items-center gap-5">
                        <div className="flex items-center gap-4 pr-5 border-r border-gray-200">
                            <a href="tel:+923017730687" className="text-[#4a0e0e] hover:text-[#d4af37] transition-all duration-200" title="Call us">
                                <i className="fa-solid fa-phone text-lg" />
                            </a>
                            <a
                                href="https://wa.me/923017730687"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#25D366] hover:text-[#1ebe5d] transition-all duration-200"
                                title="Chat on WhatsApp"
                            >
                                <i className="fa-brands fa-whatsapp text-xl" />
                            </a>
                        </div>
                        <Link href="/become-a-partner" className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 whitespace-nowrap">
                            Become a Partner
                        </Link>
                        <Link href="/custom-jewellery" className="bg-[#4a0e0e] hover:bg-[#b76e79] text-white px-5 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md whitespace-nowrap">
                            Custom Order
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <a
                            href="https://wa.me/923017730687"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:text-[#1ebe5d] transition-colors"
                            title="Chat on WhatsApp"
                        >
                            <i className="fa-brands fa-whatsapp text-2xl" />
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-[#4a0e0e] hover:text-[#d4af37] focus:outline-none transition-colors"
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle menu"
                        >
                            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`} />
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Slide-in Drawer */}
            <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={closeAllMenus}
                ></div>
                
                {/* Drawer */}
                <div className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center p-5 border-b border-gray-100">
                        <span className="font-luxury font-bold text-xl tracking-wide text-[#4a0e0e]">MENU</span>
                        <button onClick={closeAllMenus} className="text-gray-400 hover:text-red-500 transition-colors">
                            <i className="fa-solid fa-xmark text-2xl" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-2">
                        <div className="px-5 py-3 border-b border-gray-50">
                            <Link href="/" className="block text-sm font-bold uppercase tracking-wider text-[#4a0e0e] hover:text-[#d4af37]" onClick={closeAllMenus}>Home</Link>
                        </div>
                        
                        {/* Mobile Accordion Menu */}
                        {navigation.map((item, idx) => (
                            <div key={idx} className="border-b border-gray-50">
                                {item.groups ? (
                                    <>
                                        <button 
                                            className="w-full flex justify-between items-center px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#4a0e0e] hover:text-[#d4af37]"
                                            onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                                        >
                                            {item.label}
                                            <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${expandedMobileItem === item.label ? 'rotate-180 text-[#d4af37]' : ''}`} />
                                        </button>
                                        <div 
                                            className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#fff8f0] ${expandedMobileItem === item.label ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="px-5 py-3 space-y-4">
                                                {item.groups.map((group, gIdx) => (
                                                    <div key={gIdx}>
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">{group.heading}</h4>
                                                        <ul className="space-y-2 pl-2">
                                                            {group.links.map((link, lIdx) => (
                                                                <li key={lIdx}>
                                                                    <Link href={link.href} className="block text-sm text-[#4a0e0e] hover:text-[#d4af37]" onClick={closeAllMenus}>
                                                                        {link.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link href={item.href || '#'} className="block px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#4a0e0e] hover:text-[#d4af37]" onClick={closeAllMenus}>
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                    </div>

                    <div className="p-5 border-t border-gray-100 space-y-3 bg-[#fff8f0]">
                        <Link href="/products" className="block w-full text-center border border-[#4a0e0e]/30 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:border-[#d4af37] hover:text-[#d4af37] transition-colors" onClick={closeAllMenus}>
                            Shop Products
                        </Link>
                        <Link href="/become-a-partner" className="block w-full text-center border border-[#d4af37] text-[#d4af37] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#d4af37] hover:text-white transition-colors" onClick={closeAllMenus}>
                            Become a Partner
                        </Link>
                        <Link href="/custom-jewellery" className="block w-full text-center bg-[#d4af37] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md" onClick={closeAllMenus}>
                            Custom Order
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
