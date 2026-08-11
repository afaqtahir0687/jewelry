import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, Users, Store, Package, ClipboardList,
    Calendar, Tag, MapPin, Star, LogOut, Menu, X, ChevronRight,
    FileText, MessageSquare, Globe, Handshake, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import type { PageProps } from '@/types';
import { Toaster, toast } from 'sonner';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    routeKey: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard',    href: '/admin',              icon: <LayoutDashboard size={18} />, routeKey: 'admin.dashboard' },
    { label: 'Leads',        href: '/admin/leads',        icon: <ClipboardList size={18} />,  routeKey: 'admin.leads' },
    { label: 'Partner Requests', href: '/admin/partner-requests', icon: <Handshake size={18} />, routeKey: 'admin.partner-requests' },
    { label: 'Jewellers',    href: '/admin/jewellers',    icon: <Store size={18} />,          routeKey: 'admin.jewellers' },
    { label: 'Products',     href: '/admin/products',     icon: <Package size={18} />,        routeKey: 'admin.products' },
    { label: 'Appointments', href: '/admin/appointments', icon: <Calendar size={18} />,       routeKey: 'admin.appointments' },
    { label: 'Categories',   href: '/admin/categories',   icon: <Tag size={18} />,            routeKey: 'admin.categories' },
    { label: 'Cities',       href: '/admin/cities',       icon: <MapPin size={18} />,         routeKey: 'admin.cities' },
    { label: 'SEO Meta Tags',href: '/admin/seo-metas',    icon: <Globe size={18} />,          routeKey: 'admin.seo-metas' },
    { label: 'Reviews',      href: '/admin/reviews',      icon: <Star size={18} />,           routeKey: 'admin.reviews' },
    { label: 'Users',        href: '/admin/users',        icon: <Users size={18} />,          routeKey: 'admin.users' },
    { label: 'Pages',        href: '/admin/pages',        icon: <FileText size={18} />,       routeKey: 'admin.pages' },
    { label: 'FAQs',         href: '/admin/faqs',         icon: <HelpCircle size={18} />,     routeKey: 'admin.faqs' },
    { label: 'Inquiries',    href: '/admin/contact-messages', icon: <MessageSquare size={18} />, routeKey: 'admin.contact-messages' },
];

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const { auth, url, flash } = usePage<PageProps & { url: string }>().props;

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const isActive = (href: string) => {
        if (href === '/admin') return currentPath === '/admin';
        return currentPath.startsWith(href);
    };

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
        <aside className={cn(
            'flex flex-col h-full bg-[#0f172a] border-r border-white/10',
            mobile ? 'w-72' : 'w-64'
        )}>
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <img src="/images/gehna-diamond.svg" alt="Gehna" className="h-9 w-auto" />
                <div>
                    <p className="text-[10px] text-gold tracking-widest uppercase">Admin CRM</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="px-3 mb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Main Menu</p>
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

            {/* User Profile */}
            <div className="px-4 py-4">
                <Link href="/admin/profile" className="flex items-center gap-3 mb-3 p-2 rounded-lg hover:bg-white/5 transition-all">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                        <span className="text-gold text-xs font-bold uppercase">
                            {auth.user?.name?.[0] ?? 'A'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{auth.user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{auth.user?.email}</p>
                    </div>
                </Link>
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
        <div className="flex h-screen overflow-hidden bg-[#0f172a] text-slate-100">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed left-0 top-0 h-full z-50">
                        <Sidebar mobile />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-[#1e293b]/90 backdrop-blur-sm shadow-md">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-slate-300 hover:text-white"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="flex-1">
                        {title && (
                            <h1 className="text-lg font-semibold text-white tracking-wide">{title}</h1>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            className="text-xs text-slate-300 hover:text-gold hover:border-gold/50 transition-colors border border-white/10 rounded-md px-3 py-1.5 bg-white/5 font-medium"
                        >
                            View Site ↗
                        </a>
                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center cursor-pointer hover:bg-gold/30 transition-all focus:outline-none border border-gold/35"
                            >
                                <span className="text-gold text-xs font-bold uppercase">
                                    {auth.user?.name?.[0] ?? 'A'}
                                </span>
                            </button>
                            {userDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-lg shadow-2xl py-2 z-50 animate-fade-in-up">
                                        <div className="px-4 py-2 border-b border-white/5">
                                            <p className="text-sm font-semibold text-white truncate">{auth.user?.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{auth.user?.email}</p>
                                        </div>
                                        <Link
                                            href="/admin/profile"
                                            onClick={() => setUserDropdownOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                                        >
                                            <Users size={14} className="text-gold" />
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all text-left"
                                        >
                                            <LogOut size={14} />
                                            Sign out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-[#0f172a]">
                    {children}
                </main>
            </div>
            <Toaster richColors theme="dark" position="top-right" closeButton />
        </div>
    );
}
