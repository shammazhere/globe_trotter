'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserTrips, TripData } from '@/lib/firestore/trips';
import DashboardLayout from '@/app/dashboard/layout';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, ArrowRight, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function TripsPage() {
    const { user } = useAuth();
    const [trips, setTrips] = useState<(TripData & { id: string })[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getUserTrips(user.uid).then(data => {
                setTrips(data as (TripData & { id: string })[]);
                setLoading(false);
            });
        }
    }, [user]);

    const categories = [
        { title: 'Ongoing', status: 'In Progress', items: trips.slice(0, 1) },
        { title: 'Upcoming', status: 'Planned', items: trips.slice(1, 2) },
        { title: 'Completed', status: 'Finished', items: trips.slice(2) },
    ];

    return (
        <DashboardLayout>
            <div className="p-8 max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">Your Journeys</h1>
                    <div className="flex gap-2">
                        <select className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none">
                            <option>Group by</option>
                        </select>
                        <select className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none">
                            <option>Filter</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-12">
                        {[1, 2].map(i => (
                            <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12">
                        {categories.map((cat) => (
                            <div key={cat.title} className="space-y-6">
                                <h2 className="text-xl font-bold px-2 flex items-center gap-3">
                                    {cat.title}
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/5">
                                        {cat.items.length} trips
                                    </span>
                                </h2>

                                <div className="space-y-4">
                                    {cat.items.length === 0 ? (
                                        <div className="p-12 text-center rounded-3xl border-2 border-dashed border-white/5 text-gray-500">
                                            No {cat.title.toLowerCase()} trips found.
                                        </div>
                                    ) : (
                                        cat.items.map((trip) => (
                                            <motion.div
                                                key={trip.id}
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                className="glass-card rounded-[2rem] border border-white/5 overflow-hidden flex flex-col md:flex-row group cursor-pointer shadow-2xl transition-all duration-500"
                                            >
                                                <div className="w-full md:w-72 h-48 md:h-auto bg-[#1a1a1a] relative overflow-hidden">
                                                    <img
                                                        src={trip.coverImage || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600`}
                                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1000ms] ease-out"
                                                        alt={trip.title}
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                                                </div>

                                                <div className="flex-1 p-8 space-y-4 flex flex-col justify-center">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-2xl font-bold group-hover:text-neon-blue transition-colors">{trip.title}</h3>
                                                            <p className="text-gray-400 flex items-center gap-2 mt-1">
                                                                <MapPin className="w-4 h-4 text-neon-blue" />
                                                                {trip.destination}
                                                            </p>
                                                        </div>
                                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${cat.title === 'Ongoing' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                                                            {cat.status}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 pt-2 border-t border-white/5">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="w-4 h-4" />
                                                            Budget: ${trip.budget.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-6 md:p-8 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/5">
                                                    <Link href={`/trips/${trip.id}`} className="w-full md:w-auto px-8 py-3 rounded-xl bg-neon-blue text-black font-bold shadow-lg hover:shadow-neon-blue/20 transition-all text-center">
                                                        Short Over View
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Link href="/trips/new">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-neon-purple text-white rounded-full shadow-[0_0_30px_rgba(255,0,255,0.2)] flex items-center justify-center z-50"
                >
                    <Plus className="w-8 h-8" />
                </motion.button>
            </Link>
        </DashboardLayout>
    );
}
