'use client';

import DashboardLayout from '@/app/dashboard/layout';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Map, Calendar, DollarSign, LayoutDashboard, Share2 } from 'lucide-react';

export default function TripLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const params = useParams();
    const tripId = params.tripId as string;

    const base = `/trips/${tripId}`;

    const tabs = [
        { label: 'Overview', href: base, icon: LayoutDashboard },
        { label: 'Builder', href: `${base}/builder`, icon: Map },
        { label: 'Calendar', href: `${base}/calendar`, icon: Calendar },
        { label: 'Budget', href: `${base}/budget`, icon: DollarSign },
    ];

    return (
        <DashboardLayout>
            <div className="h-full flex flex-col">
                {/* Trip Header / Tabs */}
                <div className="px-8 pt-6 border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <Link href="/trips" className="text-gray-400 hover:text-white transition-colors">
                                ← Back
                            </Link>
                            <h1 className="text-2xl font-bold">Trip Details</h1>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share Trip
                        </button>
                    </div>

                    <div className="flex gap-8">
                        {tabs.map(tab => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link key={tab.href} href={tab.href} className="relative pb-4 group">
                                    <div className={`flex items-center gap-2 ${isActive ? 'text-neon-blue' : 'text-gray-400 group-hover:text-white'} transition-colors`}>
                                        <tab.icon className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </div>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-blue shadow-[0_0_10px_#00f3ff]" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto">
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
}
