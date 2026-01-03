'use client';

import DashboardLayout from '@/app/dashboard/layout';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Map, Calendar, DollarSign, LayoutDashboard, Share2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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
                {/* Trip Sub-Navigation */}
                <div className="px-4 md:px-12 pt-6 border-b border-white/5 bg-[#05070a]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div className="flex items-center gap-6">
                            <Link href="/trips" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Management Console</p>
                                <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter">Trip Command Center</h2>
                            </div>
                        </div>

                        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all">
                            <Share2 className="w-4 h-4" />
                            Broadcast Node
                        </button>
                    </div>

                    <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar">
                        {tabs.map(tab => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link key={tab.href} href={tab.href} className="relative pb-4 group whitespace-nowrap">
                                    <div className={`flex items-center gap-3 ${isActive ? 'text-blue-500' : 'text-white/30 group-hover:text-white'} transition-all`}>
                                        <tab.icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-white/20 group-hover:text-blue-400'}`} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabTrip"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
}
