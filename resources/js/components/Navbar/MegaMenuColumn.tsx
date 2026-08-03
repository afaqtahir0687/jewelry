import React from 'react';
import { Link } from '@inertiajs/react';
import { MegaMenuGroup } from '@/types';

interface MegaMenuColumnProps {
    group: MegaMenuGroup;
    closeMenu: () => void;
}

export default function MegaMenuColumn({ group, closeMenu }: MegaMenuColumnProps) {
    return (
        <div className="flex flex-col">
            <h3 className="text-[#0f172a] font-luxury font-bold text-sm tracking-wider uppercase mb-4 border-b border-[#d4af37]/20 pb-2">
                {group.heading}
            </h3>
            <ul className="space-y-3">
                {group.links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.href}
                            onClick={closeMenu}
                            className="text-gray-500 hover:text-[#d4af37] text-sm transition-colors duration-200 block group"
                            role="menuitem"
                        >
                            <span className="relative inline-block">
                                {link.label}
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
