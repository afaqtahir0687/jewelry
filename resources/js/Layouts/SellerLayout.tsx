import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, ClipboardList, Package, Calendar, LogOut, Menu, ChevronRight, Gem, Store
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import type { PageProps } from '@/types';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { label: 'Dashboard',    href: '/seller',              icon: <LayoutDashboard size={18} /> },
    { label: 'My Leads',     href: '/seller/leads',        icon: <ClipboardList size={18} /> },
    { label: 'My Designs',   href: '/seller/products',     icon: <Package size={18} /> },
    { label: 'Appointments', href: '/seller/appointments', icon: <Calendar size={18} /> },
];

interface SellerLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function SellerLayout({ children, title }: SellerLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const isActive = (href: string) => {
        if (href === '/seller') return currentPath === '/seller';
        return currentPath.startsWith(href);
    };

    const handleLogout = () => {
        router.post('/seller/logout');
    };

    const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
        <aside className={cn(
            'flex flex-col h-full bg-[#0f172a] border-r border-white/10',
            mobile ? 'w-72' : 'w-64'
        )}>
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                    <Store size={16} className="text-gold" />
                </div>
                <div>
                    <p className="font-bold text-white text-sm tracking-wider uppercase">Online Jewelry</p>
                    <p className="text-[10px] text-gold tracking-widest uppercase">Seller Portal</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="px-3 mb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">My Store</p>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                            isActive(item.href)
                                ? 'bg-gold/15 text-gold border border-gold/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        )}
                    >
                        <span className={cn(
                            'flex-shrink-0',
                            isActive(item.href) ? 'text-gold' : 'text-gray-500 group-hover:text-gray-300'
                        )}>
                            {item.icon}
                        </span>
                        {item.label}
                        {isActive(item.href) && (
                            <ChevronRight size={14} className="ml-auto text-gold" />
                        )}
                    </Link>
                ))}
            </nav>

            <Separator />

            {/* User */}
            <div className="px-4 py-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                        <span className="text-gold text-xs font-bold uppercase">
                            {auth.user?.name?.[0] ?? 'S'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{auth.user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{auth.user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                    <LogOut size={16} />
                    Sign out
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-[#060d1a] text-white">
            <div className="hidden lg:flex lg:flex-shrink-0">
                <Sidebar />
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed left-0 top-0 h-full z-50">
                        <Sidebar mobile />
                    </div>
                </div>
            )}

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-[#0a1628]/80 backdrop-blur-sm">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
                        <Menu size={22} />
                    </button>
                    <div className="flex-1">
                        {title && <h1 className="text-lg font-semibold text-white">{title}</h1>}
                    </div>
                    <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-gold border border-white/10 rounded-md px-3 py-1.5 transition-colors">
                        View Site ↗
                    </a>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
