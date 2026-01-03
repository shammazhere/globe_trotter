'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserTrips, TripData } from '@/lib/firestore/trips';
import DashboardLayout from '@/app/dashboard/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, MapPin, ArrowRight, Activity, Globe, Box, Zap, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TripsPage() {
    const { user } = useAuth();
    const [trips, setTrips] = useState<(TripData & { id: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            getUserTrips(user.uid).then(data => {
                setTrips(data as (TripData & { id: string })[]);
                setLoading(false);
            }).catch(err => {
                console.error("Trips fetch failure:", err);
                setError(err?.code === 'unavailable' ? "System Offline: Connectivity to Discovery Nodes lost." : "Protocol Error: Failed to synchronize archives.");
                setLoading(false);
            });
        }
    }, [user]);

    const categories = [
        { title: 'Ongoing Matrix', status: 'Active', items: trips.filter(t => new Date(t.startDate) <= new Date() && new Date(t.endDate) >= new Date()) },
        { title: 'Upcoming Sequences', status: 'Locked', items: trips.filter(t => new Date(t.startDate) > new Date()) },
        { title: 'Historical Archives', status: 'Completed', items: trips.filter(t => new Date(t.endDate) < new Date()) },
    ];

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12 md:space-y-20 pt-10">
                {/* Cinema Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 border-b border-white/5 pb-8 md:pb-12">
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase"
                        >
                            Logistics Hub v4.0
                        </motion.span>
                        <h1 className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none uppercase italic">
                            Journey <span className="text-blue-500">Archives</span>
                        </h1>
                    </div>
                </header>

                {error && (
                    <div className="p-10 rounded-[2.5rem] bg-red-500/5 border border-red-500/20 flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                            <Zap className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-xl font-black uppercase text-red-500 tracking-tighter">{error}</h2>
                        <p className="text-white/30 text-sm max-w-md">Verify your connection to the Horizon Network. Local caching will resume once uplink is restored.</p>
                        <button onClick={() => window.location.reload()} className="mt-4 px-8 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Retry Uplink</button>
                    </div>
                )}

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                ) : !error && (
                    <div className="space-y-24 pb-32">
                        {categories.map((cat, catIdx) => (
                            <section key={cat.title} className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 px-4"
                                >
                                    <h2 className="text-3xl font-black tracking-tight uppercase italic">{cat.title}</h2>
                                    <div className="h-0.5 flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                                        Sector {catIdx + 1} // {cat.items.length} LOGS
                                    </span>
                                </motion.div>

                                <div className="grid grid-cols-1 gap-6">
                                    <AnimatePresence>
                                        {cat.items.length === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="h-48 flex items-center justify-center rounded-[2.5rem] border border-dashed border-white/10 text-white/10 font-black uppercase tracking-widest text-[10px]"
                                            >
                                                No telemetry recorded in this sector
                                            </motion.div>
                                        ) : (
                                            cat.items.map((trip, i) => (
                                                <motion.div
                                                    key={trip.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    viewport={{ once: true }}
                                                    className="group relative md:h-64 bg-[#05070a] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl hover:border-blue-500/20 transition-all active:scale-[0.99]"
                                                >
                                                    {/* Immersive Preview */}
                                                    <div className="w-full md:w-96 h-56 md:h-auto relative overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={trip.coverImage || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800`}
                                                            fill
                                                            className="object-cover opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                                                            alt={trip.title}
                                                        />
                                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#05070a] to-transparent" />
                                                        <div className="absolute top-8 left-8">
                                                            <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                                                {catIdx === 0 ? <Activity className="w-6 h-6 text-blue-500 animate-pulse" /> : <Box className="w-6 h-6 text-white/20" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Telemetry Data */}
                                                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-white group-hover:text-blue-500 transition-colors leading-none">{trip.title}</h3>
                                                                <p className="text-white/20 font-black flex items-center gap-2 text-[10px] uppercase tracking-widest mt-4">
                                                                    <MapPin className="w-3 h-3 text-blue-500" />
                                                                    {trip.destination}
                                                                </p>
                                                            </div>
                                                            <div className="hidden sm:block">
                                                                <div className="px-4 py-2 rounded-full border border-white/5 bg-white/2 text-[10px] font-black uppercase tracking-widest text-white/30">
                                                                    CAPACITY: {Math.round((trip.spent / trip.budget) * 100) || 0}%
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/5 items-end">
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/10">Launch Sync</p>
                                                                <p className="text-sm font-black text-white/40 uppercase">{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/10">Resource Allocation</p>
                                                                <p className="text-xl font-black text-blue-500 tracking-tight">${trip.budget.toLocaleString()}</p>
                                                            </div>
                                                            <div className="hidden lg:block space-y-2">
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/10">Node Status</p>
                                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">ENCRYPTED END-TO-END</p>
                                                            </div>
                                                            <div className="flex justify-end col-span-2 lg:col-span-1">
                                                                <Link
                                                                    href={`/trips/${trip.id}`}
                                                                    className="w-full lg:w-auto px-8 py-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 group/btn flex items-center justify-center gap-3 shadow-xl"
                                                                >
                                                                    ACCESS CONSOLE
                                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>

            {/* Global Uplink Floating Action */}
            <Link href="/trips/new">
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-24 md:bottom-12 right-6 md:right-12 w-20 h-20 bg-blue-600 text-white rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center justify-center z-50 group border border-blue-400/20"
                >
                    <Plus size={40} className="transition-transform duration-700 group-hover:rotate-90" />
                </motion.button>
            </Link>
        </DashboardLayout>
    );
}
