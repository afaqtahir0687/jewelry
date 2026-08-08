import React, { useEffect, useRef } from 'react';
import MegaMenuColumn from './MegaMenuColumn';
import { MegaMenuGroup } from '@/types';

interface MegaMenuProps {
    groups: MegaMenuGroup[];
    isOpen: boolean;
    closeMenu: () => void;
}

export default function MegaMenu({ groups, isOpen, closeMenu }: MegaMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, closeMenu]);

    if (!groups || groups.length === 0) return null;

    return (
        <div 
            ref={menuRef}
            className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-[#d4af37]/20 transition-all duration-300 ease-in-out transform origin-top z-50 ${isOpen ? 'opacity-100 scale-y-100 translate-y-0 visible' : 'opacity-0 scale-y-95 -translate-y-2 invisible'}`}
            role="menu"
            aria-hidden={!isOpen}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {groups.map((group, idx) => (
                        <div key={idx} className={idx !== groups.length - 1 ? "lg:border-r lg:border-gray-100 lg:pr-8" : ""}>
                            <MegaMenuColumn group={group} closeMenu={closeMenu} />
                        </div>
                    ))}
                    
                    {/* Optional Featured Section / Image block could go here if we had less than 4 groups */}
                    {groups.length < 4 && (
                        <div className="hidden lg:block lg:col-span-1 rounded-lg overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[#5c1a1b] mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity"></div>
                            <img src="https://images.unsplash.com/photo-1599643478524-fb66f70a00ac?q=80&w=600&auto=format&fit=crop" alt="Featured Jewellery" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <h4 className="text-white font-luxury text-xl mb-2 drop-shadow-md">New Arrivals</h4>
                                <span className="text-xs text-white uppercase tracking-widest border-b border-[#d4af37] pb-1 cursor-pointer">Shop Now</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
