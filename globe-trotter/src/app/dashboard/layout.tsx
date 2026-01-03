'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Compass, Calendar, User, LogOut, LayoutGrid, MapPin, Zap, ShieldCheck, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { logout } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutGrid, label: 'CONTROL CENTER', href: '/dashboard' },
        { icon: Globe, label: 'GLOBAL FEED', href: '/community' },
        { icon: MapPin, label: 'SEARCH NODES', href: '/search' },
        { icon: Calendar, label: 'ARCHIVE', href: '/trips' },
        { icon: User, label: 'IDENTITY', href: '/profile' },
    ];

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-[#02040a] text-white overflow-hidden font-inter">
                {/* Immersive Background Nodes - Global */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px]" />
                </div>

                {/* Vertical Sidebar (Desktop) */}
                <aside className="relative z-50 w-20 lg:w-80 hidden md:flex flex-col bg-[#05070a] border-r border-white/5 shadow-2xl">
                    {/* Logo Section */}
                    <div className="h-28 flex items-center gap-4 px-8 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            <Globe className="text-white w-7 h-7" />
                        </div>
                        <span className="text-xl font-black tracking-[0.15em] hidden lg:block text-white">GLOBE<span className="text-blue-500">TROTTER</span></span>
                    </div>

                    {/* Navigation Matrix */}
                    <nav className="flex-1 py-4 px-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div className={`group flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 relative ${isActive ? 'bg-blue-600/10 text-white' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
                                        <item.icon className={`w-5 h-5 transition-all duration-500 ${isActive ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-white/20 group-hover:text-blue-400'}`} />
                                        <span className={`hidden lg:block font-bold text-[10px] tracking-[0.2em] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-nav-glow"
                                                className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full lg:hidden shadow-[0_0_15px_#3b82f6]"
                                            />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Utility */}
                    <div className="p-6 space-y-4">

                        <button
                            onClick={() => logout()}
                            className="w-full flex items-center gap-5 px-5 py-4 text-white/20 hover:text-white transition-all duration-300 group border-t border-white/5 pt-6"
                        >
                            <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            <span className="hidden lg:block font-bold text-[10px] tracking-[0.2em] uppercase">Disconnect</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col relative overflow-hidden">
                    {/* Mobile Header */}
                    <header className="md:hidden h-20 flex items-center justify-between px-6 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Globe className="text-white w-5 h-5" />
                            </div>
                            <span className="font-bold text-sm tracking-widest uppercase">GT <span className="text-blue-500">OS</span></span>
                        </div>
                        <button onClick={() => logout()} className="p-2 text-white/40 hover:text-white">
                            <LogOut size={20} />
                        </button>
                    </header>

                    {/* Main Content Scrollable */}
                    <main className="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-0">
                        <div className="max-w-[1600px] mx-auto min-h-full">
                            {children}
                        </div>
                    </main>

                    {/* Mobile Navigation Bar */}
                    <nav className="md:hidden fixed bottom-0 inset-x-0 h-20 bg-black border-t border-white/5 z-50 flex items-center justify-around px-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href} className="relative flex flex-col items-center gap-1 group">
                                    <div className={`p-2 rounded-xl transition-all ${isActive ? 'text-blue-500 bg-blue-500/10' : 'text-white/20'}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[7px] font-bold uppercase tracking-[0.2em] transition-all ${isActive ? 'text-blue-500' : 'text-white/10'}`}>
                                        {item.label.split(' ')[0]}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </ProtectedRoute>
    );
}
