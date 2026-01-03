'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTrip, TripData } from '@/lib/firestore/trips';
import DashboardLayout from '@/app/dashboard/layout';
import { Search, Filter, ArrowRight, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TripOverviewPage() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<TripData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripId) {
            getTrip(tripId as string).then(data => {
                setTrip(data);
                setLoading(false);
            });
        }
    }, [tripId]);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading trip details...</div>;
    if (!trip) return <div className="p-8 text-center text-red-400">Trip not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-12">
            {/* Header (Screen 9 Style) */}
            <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-12 shadow-3xl group active-gpu">
                <img
                    src={`https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop`}
                    alt={trip.destination}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2000ms] opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-neon-blue rounded-lg text-black">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-neon-blue font-black tracking-[0.2em] uppercase text-xs">Trip Itinerary</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-2">
                            Exploring <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white">{trip.destination}</span>
                        </h1>
                        <p className="text-gray-300 font-light tracking-wide">{trip.title} • {trip.startDate} - {trip.endDate}</p>
                    </motion.div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="flex-1 md:w-64 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-blue transition-all" placeholder="Search activities..." />
                    </div>
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-medium text-xs flex items-center gap-1">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all font-medium text-xs flex items-center gap-1">
                        <ArrowRight className="w-4 h-4 rotate-90" /> Sort
                    </button>
                </div>
            </div>

            {/* Itinerary Timeline (Screen 9 Content) */}
            <div className="space-y-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-neon-blue/50 via-neon-purple/50 to-transparent hidden md:block" />

                {[1, 2].map(day => (
                    <div key={day} className="relative flex flex-col md:flex-row gap-8">
                        {/* Day Label */}
                        <div className="md:w-32 flex-shrink-0 flex md:flex-col items-center gap-4 relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-black border border-white/20 flex flex-col items-center justify-center shadow-2xl">
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Day</span>
                                <span className="text-3xl font-bold">{day}</span>
                            </div>
                        </div>

                        {/* Activities for the Day */}
                        <div className="flex-1 space-y-4">
                            {[
                                { title: 'Arrival & Check-in', desc: 'Settle into the futuristic hotel', cost: 120, time: '10:00 AM' },
                                { title: 'Neon District Explorer', desc: 'Visit the main tech hub', cost: 45, time: '02:00 PM' },
                                { title: 'Cyber Dinner Experience', desc: 'Immersive dining at Local Lab', cost: 180, time: '07:30 PM' },
                            ].map((activity, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row shadow-lg overflow-hidden group"
                                >
                                    <div className="flex-1 p-6 space-y-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] text-neon-blue font-mono">{activity.time}</span>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold group-hover:text-neon-blue transition-colors">Physical Activity: {activity.title}</h3>
                                        <p className="text-sm text-gray-400">{activity.desc}</p>
                                    </div>
                                    <div className="w-full sm:w-48 bg-white/5 p-6 flex flex-col justify-center border-t sm:border-l sm:border-t-0 border-white/5">
                                        <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Expense</label>
                                        <div className="text-2xl font-bold text-white flex items-center">
                                            <DollarSign className="w-5 h-5 text-neon-blue opacity-50" />
                                            {activity.cost}
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1">Confirmed</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Budget Section (Screen 9 Bottom) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
                <div className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 blur-3xl" />
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-neon-blue" />
                        Trip Budget Breakdown
                    </h3>
                    <div className="space-y-4">
                        {[
                            { category: 'Stays', amount: 850, percentage: 45, color: 'bg-neon-blue' },
                            { category: 'Activities', amount: 420, percentage: 22, color: 'bg-neon-purple' },
                            { category: 'Transport', amount: 620, percentage: 33, color: 'bg-neon-pink' },
                        ].map(item => (
                            <div key={item.category} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{item.category}</span>
                                    <span className="font-bold">${item.amount}</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        className={`h-full ${item.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <label className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-4">Final Estimated Cost</label>
                    <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                        ${trip.budget}
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <button className="px-6 py-2 rounded-xl bg-neon-blue text-black font-bold text-sm shadow-lg hover:shadow-neon-blue/40 transition-all">Download Report</button>
                        <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">Share Trip</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
