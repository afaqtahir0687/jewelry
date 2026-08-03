import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';
import { MegaMenuItem } from '@/types';

interface NavItemProps {
    item: MegaMenuItem;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onClick: () => void;
    closeMenu: () => void;
}

export default function NavItem({
    item,
    isActive,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onClick,
    closeMenu
}: NavItemProps) {
    const hasDropdown = item.groups && item.groups.length > 0;

    const labelContent = (
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
            {item.label}
            {hasDropdown && (
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${isActive ? 'rotate-180 text-[#d4af37]' : ''}`} />
            )}
            {/* Hover underline effect */}
            <span className={`absolute left-0 bottom-0 h-[2px] bg-[#d4af37] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
        </span>
    );

    const classes = `relative h-full flex items-center px-1 text-sm font-semibold transition-colors duration-200 group cursor-pointer ${isActive ? 'text-[#d4af37]' : 'text-[#0f172a] hover:text-[#d4af37]'}`;

    return (
        <div 
            className="flex items-center h-full relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {hasDropdown ? (
                <>
                    <button
                        className={classes}
                        onClick={onClick}
                        onFocus={onFocus}
                        aria-expanded={isActive}
                        aria-haspopup="true"
                    >
                        {labelContent}
                    </button>
                    
                    {/* Cascading Dropdown List (Level 2) */}
                    <div className={`absolute top-full left-0 w-48 bg-white border border-[#d4af37]/20 shadow-xl py-1.5 transition-all duration-300 z-50 rounded-b-md ${isActive ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                        <ul className="flex flex-col">
                            {item.groups!.map((group, gIdx) => (
                                <li key={gIdx} className="relative group/sub">
                                    <button
                                        className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] transition-all duration-300"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {group.heading}
                                        <i className="fa-solid fa-chevron-right text-[9px]" />
                                    </button>
                                    
                                    {/* Nested Flyout List (Level 3) */}
                                    <div className="absolute top-0 left-full -mt-1.5 w-48 bg-white border border-[#d4af37]/20 shadow-xl py-1.5 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 -translate-x-2 transition-all duration-300 z-50 rounded-md">
                                        <ul className="flex flex-col">
                                            {group.links.map((link, lIdx) => (
                                                <li key={lIdx}>
                                                    <Link
                                                        href={link.href}
                                                        className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f172a] hover:bg-[#faf9f6] hover:text-[#d4af37] hover:pl-5 transition-all duration-300"
                                                        onClick={closeMenu}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <Link
                    href={item.href || '#'}
                    className={classes}
                    onClick={closeMenu}
                    onFocus={onFocus}
                >
                    {labelContent}
                </Link>
            )}
        </div>
    );
}
