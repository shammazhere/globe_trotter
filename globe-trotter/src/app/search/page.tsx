'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/dashboard/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Clock, DollarSign, Filter, ChevronRight, Hash, Zap, Activity, Compass, Globe } from 'lucide-react';
import Image from 'next/image';

const mockResults = [
    { id: 1, title: 'Shibuya Virtual Sync', location: 'Tokyo, Japan', rating: 4.8, type: 'Visual', price: 'High', duration: '2 hrs', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800' },
    { id: 2, title: 'Neural Dining Protocol', location: 'Tokyo, Japan', rating: 4.5, type: 'Culinary', price: 'Mid', duration: '3 hrs', image: 'https://images.unsplash.com/photo-1570116813470-3443a575a022?q=80&w=800' },
    { id: 3, title: 'Akihabara Tech Uplink', location: 'Tokyo, Japan', rating: 4.9, type: 'Circuitry', price: 'Low', duration: '4 hrs', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800' },
    { id: 4, title: 'Tsukiji Bio-Market', location: 'Tokyo, Japan', rating: 4.7, type: 'Organic', price: 'Mid', duration: '2 hrs', image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=800' },
];

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Collective');

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto space-y-8 md:space-y-12 pb-40 pt-10">
                {/* Search Terminal Hub */}
                <header className="space-y-8 md:space-y-12 pb-12 md:pb-16 border-b border-white/5">
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase"
                        >
                            Discovery Terminal v4.0
                        </motion.span>
                        <h1 className="text-4xl lg:text-8xl font-black tracking-tighter leading-none inline-flex items-center gap-6">
                            Global <span className="text-blue-500">Nodes</span> <Globe className="w-16 h-16 text-white/5 hidden md:block" />
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Initialize node search..."
                                className="w-full bg-[#161b22] border border-white/10 rounded-2xl md:rounded-[2.5rem] py-5 md:py-8 pl-16 md:pl-18 pr-6 md:pr-8 outline-none focus:border-blue-500 transition-all font-bold text-base md:text-lg placeholder:text-white/20 text-white"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <button className="h-16 md:h-24 px-8 md:px-10 rounded-2xl md:rounded-[2.5rem] bg-[#161b22] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-4 font-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-white group">
                            <Filter className="w-5 h-5 group-hover:text-blue-500" /> Filter
                        </button>
                    </div>
                </header>

                {/* Filter Matrix */}
                <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 md:pb-0">
                    {['Collective', 'Urban Nodes', 'Activity Sequences', 'Shelter Hubs'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${activeTab === tab ? 'bg-white text-black border-white shadow-lg' : 'text-white/40 border-white/5 hover:border-white/20 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Matrix Results */}
                <div className="grid grid-cols-1 gap-6 pt-8">
                    <AnimatePresence>
                        {mockResults.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-[#0a0f18] p-4 md:p-6 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all flex flex-col md:flex-row gap-6 md:gap-10 md:items-center shadow-2xl active:scale-[0.99] cursor-pointer"
                            >
                                <div className="w-full md:w-80 h-56 rounded-[2.5rem] overflow-hidden flex-shrink-0 relative">
                                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100" />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                                            <Compass className="w-5 h-5 text-neon-blue" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 py-2 space-y-6">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl md:text-3xl font-black tracking-tighter group-hover:text-blue-400 transition-colors leading-none text-white">{item.title}</h3>
                                            <p className="text-white/40 font-bold flex items-center gap-2 text-xs md:text-sm">
                                                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-purple-500" /> {item.location}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                                            <Star className="w-3 h-3 text-white fill-white" />
                                            <span className="text-xs font-bold text-white">{item.rating}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Protocol</p>
                                            <p className="font-bold flex items-center gap-1.5 text-xs md:text-sm text-white/60"><Hash className="w-3 h-3 text-blue-400" /> {item.type}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Duration</p>
                                            <p className="font-bold flex items-center gap-1.5 text-xs md:text-sm text-white/60"><Clock className="w-3 h-3 text-purple-400" /> {item.duration}</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Cost Index</p>
                                            <p className="font-black text-white text-base md:text-lg tracking-tighter">{item.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center pr-4">
                                    <button className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-90">
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Uplink Feed Status */}
                <div className="flex justify-center pt-20 border-t border-white/5">
                    <button className="group flex items-center gap-4 px-8 md:px-12 py-4 md:py-5 rounded-2xl bg-[#161b22] border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-white hover:bg-white/10 transition-all">
                        <Activity className="w-4 h-4 animate-pulse" /> Synchronize More Nodes <Zap className="w-4 h-4 group-hover:fill-blue-500 transition-all" />
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
