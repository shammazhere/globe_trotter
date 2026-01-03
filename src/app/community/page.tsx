'use client';

import DashboardLayout from '@/app/dashboard/layout';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Heart, Share2, MessageSquare, Globe, Navigation } from 'lucide-react';

export default function CommunityPage() {
    return (
        <DashboardLayout>
            <div className="p-8 max-w-5xl mx-auto space-y-12">
                {/* Community Header (Screen 10 Top) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Globe className="text-neon-purple" />
                            Community Hub
                        </h1>
                        <p className="text-gray-400 mt-1">Get inspired by fellow world explorers.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="flex-1 md:w-64 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-purple transition-all" placeholder="Search community..." />
                        </div>
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-medium text-xs flex items-center gap-1">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                {/* Community Feed (Screen 10 List) */}
                <div className="space-y-6">
                    {[
                        { title: 'Neo Tokyo Adventure', user: 'CyberTraveler', likes: 1240, location: 'Japan', cost: '$$$', days: 12, img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600' },
                        { title: 'Martian Landscapes of Utah', user: 'MarsRover', likes: 850, location: 'USA', cost: '$$', days: 5, img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600' },
                        { title: 'Nordic Auroras', user: 'IceQueen', likes: 2100, location: 'Iceland', cost: '$$$$', days: 8, img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=600' },
                        { title: 'Shenzhen Tech Tour', user: 'HardwareGeek', likes: 540, location: 'China', cost: '$', days: 3, img: 'https://images.unsplash.com/photo-1547471080-7cc203254923?q=80&w=600' },
                    ].map((trip, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl group hover:border-neon-purple/30 transition-all"
                        >
                            {/* Visual Side */}
                            <div className="w-full md:w-72 h-64 md:h-auto bg-gradient-to-br from-purple-900/50 to-black relative overflow-hidden">
                                <img
                                    src={trip.img}
                                    alt={trip.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold border border-white/10 uppercase tracking-widest">{trip.location}</span>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 p-10 flex flex-col justify-between space-y-6">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                <Navigation className="w-5 h-5 text-neon-purple" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold group-hover:text-neon-purple transition-colors">{trip.title}</h3>
                                                <p className="text-xs text-gray-500">Curated by @{trip.user}</p>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-purple/10 text-neon-purple text-xs font-bold hover:bg-neon-purple hover:text-white transition-all">
                                            <Heart className="w-4 h-4" /> {trip.likes}
                                        </button>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                                        Explored the futuristic landscapes and cultural hubs of {trip.location}. This itinerary includes high-tech sightseeing, neon-lit nights, and immersive experiences.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <div className="flex gap-6">
                                        <div className="text-center">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Duration</p>
                                            <p className="text-sm font-bold">{trip.days} Days</p>
                                        </div>
                                        <div className="text-center border-l border-white/5 pl-6">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Index Cost</p>
                                            <p className="text-sm font-bold text-neon-blue">{trip.cost}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                            <Share2 className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:translate-x-1 transition-all">
                                            Copy Trip <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Info Text (Screen 10 Right Sidebar Placeholder) */}
                <div className="text-center py-12">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Community explore: others can share their experiences about a certain trip.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
