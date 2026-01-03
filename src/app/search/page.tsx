'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/dashboard/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Clock, DollarSign, Filter, ChevronRight, Hash } from 'lucide-react';

const mockResults = [
    { id: 1, title: 'Shibuya Crossing', location: 'Tokyo, Japan', rating: 4.8, type: 'Sightseeing', price: 'Free', duration: '1-2 hrs', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=400' },
    { id: 2, title: 'Robot Restaurant', location: 'Tokyo, Japan', rating: 4.5, type: 'Nightlife', price: '$$$', duration: '2-3 hrs', image: 'https://images.unsplash.com/photo-1570116813470-3443a575a022?q=80&w=400' },
    { id: 3, title: 'Akihabara Tech Tour', location: 'Tokyo, Japan', rating: 4.9, type: 'Activities', price: '$$', duration: '4 hrs', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=400' },
    { id: 4, title: 'Tsukiji Fish Market', location: 'Tokyo, Japan', rating: 4.7, type: 'Food', price: '$', duration: '2 hrs', image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=400' },
];

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    return (
        <DashboardLayout>
            <div className="p-8 max-w-6xl mx-auto space-y-8">
                {/* Search Header (Screen 8 Top) */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <h1 className="text-3xl font-bold">Discover</h1>
                    <div className="flex-1 max-w-2xl w-full relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Find everything for your trip..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-neon-blue transition-all"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs / Filters (Screen 8 Middle) */}
                <div className="flex gap-4 border-b border-white/5 pb-4">
                    {['All', 'Cities', 'Activities', 'Stays', 'Transport'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-neon-blue text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Results (Screen 8 Vertical List) */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {mockResults.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-4 rounded-3xl border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row gap-6 group cursor-pointer"
                            >
                                <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>

                                <div className="flex-1 py-2 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold">{item.title}</h3>
                                            <p className="text-sm text-gray-400 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {item.location}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-bold">{item.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <span className="flex items-center gap-1 text-xs text-gray-400">
                                            <Hash className="w-3 h-3" /> {item.type}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock className="w-3 h-3" /> {item.duration}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-gray-400">
                                            <DollarSign className="w-3 h-3" /> {item.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center pr-4">
                                    <button className="p-3 rounded-xl bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue group-hover:text-black transition-all">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination Placeholder */}
                <div className="flex justify-center pt-8">
                    <button className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Load More Results</button>
                </div>
            </div>
        </DashboardLayout>
    );
}
