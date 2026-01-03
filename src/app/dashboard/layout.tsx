'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Compass, Calendar, User, LogOut, LayoutGrid, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { logout } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
        { icon: Compass, label: 'Explore', href: '/community' },
        { icon: MapPin, label: 'Search', href: '/search' },
        { icon: Calendar, label: 'My Trips', href: '/trips' },
        { icon: User, label: 'Profile', href: '/profile' },
    ];

    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-background text-foreground overflow-hidden">
                {/* Sidebar */}
                <aside className="w-20 lg:w-64 glass-border border-r border-white/5 hidden md:flex flex-col p-4">
                    <div className="mb-12 flex items-center gap-3 px-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg" />
                        <span className="text-xl font-bold tracking-wider hidden lg:block">GlobeTrotter</span>
                    </div>

                    <nav className="space-y-2 flex-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-neon-blue/10 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                        <item.icon className="w-5 h-5" />
                                        <span className="hidden lg:block font-medium">{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto space-y-2">
                        <button onClick={() => logout()} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                            <LogOut className="w-5 h-5" />
                            <span className="hidden lg:block">Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-neon-blue/5 blur-[120px] pointer-events-none" />

                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
