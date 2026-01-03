'use client';

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, DollarSign, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();

    // Mock data for initial UI
    const recentTrips = [
        { id: '1', title: 'Cyberpunk Tokyo', date: 'Oct 2026', city: 'Tokyo, Japan', image: 'bg-gradient-to-br from-purple-900 to-indigo-900' },
        { id: '2', title: 'Iceland Expedition', date: 'Dec 2026', city: 'Reykjavik', image: 'bg-gradient-to-br from-blue-900 to-cyan-900' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto pb-24 relative">
            {/* Header / Welcome (Implicit in Banner/Logo) */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                        GlobeTrotter
                    </h1>
                    <p className="text-gray-400 mt-2">Personalized, Intelligent, Collaborative.</p>
                </div>
            </div>

            {/* Banner Image (Screen 3 Top) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-80 rounded-[2.5rem] overflow-hidden relative mb-12 group cursor-pointer shadow-3xl"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                    alt="Hero"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-6xl font-black mb-4 tracking-tighter leading-none">Discover the <br /><span className="text-neon-blue">Next Adventure</span></h2>
                        <p className="text-xl text-gray-300 max-w-lg font-light">Artificial intelligence powered itineraries tailored just for your style.</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Search Bar with Filters (Screen 3 Middle) */}
            <div className="glass-card p-4 rounded-2xl border border-white/5 mb-12 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for cities, activities..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none hover:bg-white/10 transition-all cursor-pointer">
                        <option>Group by</option>
                    </select>
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none hover:bg-white/10 transition-all cursor-pointer">
                        <option>Filter</option>
                    </select>
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none hover:bg-white/10 transition-all cursor-pointer">
                        <option>Sort by</option>
                    </select>
                </div>
            </div>

            {/* Top Regional Selections (Screen 3 Middle) */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Globe className="w-6 h-6 text-neon-blue" />
                        Top Regional Selections
                    </h2>
                    <button className="text-sm text-gray-500 hover:text-white transition-colors">See all destinations</button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
                    {[
                        { city: 'Tokyo', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400' },
                        { city: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400' },
                        { city: 'New York', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400' },
                        { city: 'Iceland', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=400' },
                        { city: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400' }
                    ].map((item, i) => (
                        <motion.div
                            key={item.city}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="flex-shrink-0 w-56 h-72 rounded-3xl glass-card overflow-hidden group cursor-pointer relative shadow-xl border border-white/5 snap-start"
                        >
                            <img
                                src={item.img}
                                alt={item.city}
                                loading="lazy"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <p className="font-bold text-xl">{item.city}</p>
                                <p className="text-[10px] text-neon-blue tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE NOW</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Previous Trips (Screen 3 Bottom) */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Previous Trips</h2>
                    <button className="text-sm text-neon-blue hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentTrips.map((trip) => (
                        <motion.div
                            key={trip.id}
                            whileHover={{ y: -5 }}
                            className="group glass-card rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/5"
                        >
                            <div className={`h-40 ${trip.image} relative p-4 flex flex-col justify-end`}>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                                <h3 className="text-lg font-bold relative z-10">{trip.title}</h3>
                                <p className="text-xs text-gray-200 relative z-10 flex items-center gap-1 opacity-80">
                                    <MapPin className="w-3 h-3" /> {trip.city}
                                </p>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-white/5">
                                <span className="text-xs text-gray-400">{trip.date}</span>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-neon-blue/20 text-neon-blue border border-neon-blue/20">Completed</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Plus a trip (Screen 3 Bottom Right Mockup) */}
            <Link href="/trips/new">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-neon-blue text-black rounded-full shadow-[0_0_30px_rgba(0,243,255,0.4)] flex items-center justify-center z-50 group"
                >
                    <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="absolute right-20 bg-neon-blue text-black px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Plan a trip
                    </span>
                </motion.button>
            </Link>
        </div>
    );
}
