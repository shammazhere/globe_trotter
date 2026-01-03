'use client';

import { useAuth } from '@/context/AuthContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus, Calendar, MapPin, DollarSign, Globe, Sparkles, Search, Compass, Navigation } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function DashboardPage() {
    const { user } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    // Premium Mock Data
    const recentTrips = [
        {
            id: '1',
            title: 'Neo-Tokyo Nights',
            date: 'Oct 2026',
            city: 'Tokyo, JP',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800'
        },
        {
            id: '2',
            title: 'Nordic Expedition',
            date: 'Dec 2026',
            city: 'Reykjavik, IS',
            image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800'
        },
        {
            id: '3',
            title: 'Parisian Dreams',
            date: 'Jan 2027',
            city: 'Paris, FR',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800'
        }
    ];

    const regions = [
        { city: 'Tokyo', country: 'Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600' },
        { city: 'Paris', country: 'France', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600' },
        { city: 'New York', country: 'USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600' },
        { city: 'Dubai', country: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600' },
        { city: 'London', country: 'UK', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600' }
    ];

    return (
        <div ref={containerRef} className="pb-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto space-y-12 md:space-y-20 pt-6 md:pt-10">
            {/* Cinematic Hero */}
            <motion.div
                style={{ scale: heroScale, opacity: heroOpacity }}
                className="relative h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-3xl"
            >
                <Image
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
                    alt="Hero Discovery"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 md:p-20 max-w-4xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-blue/10 text-neon-blue text-[10px] font-black uppercase tracking-[0.2em] border border-neon-blue/20 backdrop-blur-xl mb-6">
                            <Sparkles className="w-3 h-3" /> AI Horizon v4.0
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
                            The World,<br /><span className="text-gradient drop-shadow-[0_0_20px_rgba(0,243,255,0.3)]">Your Canvas</span>
                        </h1>
                        <p className="text-xl text-gray-300 font-light max-w-xl leading-relaxed">
                            Initialize your next sequence. Our neural itinerary engine connects your travel DNA with global possibilities.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Futuristic Search Command Center */}
            <section className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 px-4">
                    <span>Navigation Terminal</span>
                    <span>System Status: Optimal</span>
                </div>
                <div className="bg-[#0a0f18] p-2 md:p-4 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-2 md:gap-4 items-center group focus-within:border-blue-500/30 transition-all">
                    <div className="flex-1 relative w-full px-2 md:px-4">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search destination..."
                            className="w-full bg-transparent border-none py-4 md:py-6 pl-14 pr-4 outline-none text-lg md:text-xl font-medium placeholder:text-gray-600 text-white"
                        />
                    </div>
                    <div className="flex overflow-x-auto no-scrollbar gap-2 px-2 md:px-4 w-full md:w-auto pb-2 md:pb-0">
                        {['Adventure', 'Culture', 'Luxury'].map(vibe => (
                            <button key={vibe} className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10 active:scale-95 transition-all text-gray-400 hover:text-white">
                                {vibe}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Smart Regional Selections */}
            <section id="explore" className="space-y-8">
                <div className="flex justify-between items-end px-4">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black tracking-tight flex items-center gap-4">
                            Global Sync <Globe className="text-neon-blue" />
                        </h2>
                        <p className="text-gray-500 text-sm">Real-time trending portals powered by your journey collective.</p>
                    </div>
                    <Link href="/search" className="text-xs font-black tracking-widest text-neon-blue uppercase border-b border-neon-blue/30 pb-1 hover:border-neon-blue transition-all active:opacity-70">
                        Access Discovery Hub
                    </Link>
                </div>

                <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory px-4">
                    {regions.map((item, i) => (
                        <Link
                            key={item.city}
                            href={`/search?q=${item.city}`}
                            className="flex-shrink-0 w-72 h-[450px] rounded-[2.5rem] glass-card overflow-hidden group relative snap-start"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="w-full h-full"
                            >
                                <Image
                                    src={item.img}
                                    alt={item.city}
                                    fill
                                    sizes="300px"
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:rotate-2 group-hover:scale-110 transition-all duration-[1000ms] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-8 space-y-2">
                                    <p className="text-[10px] font-black text-neon-blue tracking-widest uppercase">{item.country}</p>
                                    <h3 className="text-3xl font-black tracking-tighter">{item.city}</h3>
                                    <div className="w-0 group-hover:w-full h-0.5 bg-neon-blue transition-all duration-700" />
                                </div>
                                <div className="absolute top-6 right-6 p-3 rounded-2xl bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-neon-blue hover:text-black hover:rotate-12">
                                    <Navigation className="w-5 h-5" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Personal Sequence - Previous Trips */}
            <section className="space-y-8">
                <div className="flex justify-between items-end px-4">
                    <h2 className="text-4xl font-black tracking-tight">Active Archives</h2>
                    <Link href="/trips" className="text-xs font-black tracking-widest text-neon-blue uppercase border-b border-neon-blue/30 pb-1 hover:border-neon-blue transition-all">
                        Launch Archive
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {recentTrips.map((trip, i) => (
                        <Link key={trip.id} href={`/trips/${trip.id}`} className="group relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-[#0a0f18] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl hover:border-blue-500/50 border border-white/5 transition-all active:scale-[0.98]"
                            >
                                <div className="h-64 relative p-8 flex flex-col justify-end overflow-hidden">
                                    <Image
                                        src={trip.image}
                                        alt={trip.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2000ms]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                    <div className="relative z-20 space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-neon-purple uppercase tracking-widest">
                                            <Calendar className="w-3 h-3" /> {trip.date}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-blue-400 transition-colors">{trip.title}</h3>
                                        <p className="text-sm text-gray-400 flex items-center gap-2 font-medium">
                                            <MapPin className="w-4 h-4 text-neon-blue" /> {trip.city}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-8 flex justify-between items-center bg-white/2 backdrop-blur-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Node Sync Complete</span>
                                    </div>
                                    <button className="p-3 rounded-2xl bg-white/5 hover:bg-neon-purple/20 transition-all hover:rotate-12">
                                        <Navigation className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Global Uplink - New Trip Button */}
            <Link href="/trips/new">
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-24 md:bottom-12 right-6 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-blue-600 text-white rounded-2xl md:rounded-3xl shadow-[0_15px_40px_rgba(37,99,235,0.4)] flex items-center justify-center z-50 group border border-white/10"
                >
                    <Plus className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500" />
                    <span className="absolute right-20 md:right-24 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-x-4 group-hover:translate-x-0 hidden md:block">
                        Initiate Trip
                    </span>
                </motion.button>
            </Link>
        </div>
    );
}

