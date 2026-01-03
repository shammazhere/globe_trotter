'use client';

import DashboardLayout from '@/app/dashboard/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, Heart, Share2, MessageSquare, Globe, Navigation, Sparkles, User2, Zap, Calendar, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { createTrip } from '@/lib/firestore/trips';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CommunityPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [replicating, setReplicating] = useState<string | null>(null);

    const handleReplicate = async (trip: any) => {
        if (!user) {
            alert("Please sign in to replicate sequences.");
            return;
        }

        setReplicating(trip.title);
        try {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + trip.days);

            const tripId = await createTrip({
                ownerId: user.uid,
                title: `${trip.title} (Clone)`,
                destination: trip.location,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                budget: 5000, // Default budget for cloned trips
                spent: 0,
                isPublic: false,
                stops: [],
                collaborators: [user.uid],
                coverImage: trip.img
            });

            alert("Sequence successfully synchronized to your cluster!");
            router.push(`/trips/${tripId}`);
        } catch (error) {
            console.error("Replication failure:", error);
            alert("Protocol failure: Synchronization interrupted.");
        } finally {
            setReplicating(null);
        }
    };

    const feed = [
        {
            title: 'Neo Tokyo Synapse',
            user: 'CyberSutra',
            likes: '4.2k',
            location: 'Tokyo, JP',
            cost: 'High Index',
            days: 14,
            img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800',
            avatar: 'https://i.pravatar.cc/150?u=1'
        },
        {
            title: 'Martian Sands Expedition',
            user: 'DustWalker',
            likes: '1.8k',
            location: 'Wadi Rum, JO',
            cost: 'Mid Index',
            days: 7,
            img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800',
            avatar: 'https://i.pravatar.cc/150?u=2'
        },
        {
            title: 'Nordic Light Protocol',
            user: 'AuroraSync',
            likes: '12.5k',
            location: 'Tromsø, NO',
            cost: 'Ultra Index',
            days: 10,
            img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800',
            avatar: 'https://i.pravatar.cc/150?u=3'
        },
        {
            title: 'Tech-Zen Shenzhen',
            user: 'KernelNomad',
            likes: '940',
            location: 'Shenzhen, CN',
            cost: 'Low Index',
            days: 5,
            img: 'https://images.unsplash.com/photo-1547471080-7cc203254923?q=80&w=800',
            avatar: 'https://i.pravatar.cc/150?u=4'
        }
    ];

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12 md:space-y-20 pt-10">
                {/* Community Terminal Header */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 lg:gap-12 pb-12 lg:pb-16 border-b border-white/5">
                    <div className="space-y-4 max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em] border border-blue-500/20"
                        >
                            <Zap className="w-3 h-3" /> Collective Intelligence Hub
                        </motion.span>
                        <h1 className="text-4xl lg:text-8xl font-black tracking-tighter leading-none">
                            World <span className="text-blue-500">Synapses</span>
                        </h1>
                        <p className="text-white/40 font-medium text-base lg:text-lg leading-relaxed">
                            Access real-time trip sequences shared by the global collective of elite travelers.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative group flex-1 lg:min-w-[300px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-4 lg:py-6 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600 text-white"
                                placeholder="Universal Search..."
                            />
                        </div>
                        <button className="h-14 lg:h-20 px-8 rounded-2xl bg-[#161b22] border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-white">
                            <Filter className="w-5 h-5" /> Filter Matrix
                        </button>
                    </div>
                </header>

                {/* Community Feed */}
                <div className="space-y-12">
                    <AnimatePresence>
                        {feed.map((trip, i) => (
                            <motion.article
                                key={trip.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-[#0a0f18] rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-3xl hover:border-blue-500/20 transition-all active:scale-[0.99] cursor-pointer"
                            >
                                {/* Immersive Side */}
                                <div className="w-full md:w-[450px] h-80 md:h-auto relative overflow-hidden flex-shrink-0">
                                    <Image
                                        src={trip.img}
                                        alt={trip.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                                        sizes="600px"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <div className="absolute top-8 left-8">
                                        <span className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-xl text-[10px] font-black border border-white/10 uppercase tracking-[0.2em] shadow-2xl">
                                            {trip.location}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-8 left-8 flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/80">
                                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> {trip.days} Days</div>
                                        <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-blue-500" /> {trip.cost}</div>
                                    </div>
                                </div>

                                {/* Content Node */}
                                <div className="flex-1 p-6 lg:p-14 flex flex-col justify-between space-y-8 bg-white/1">
                                    <div className="space-y-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-0.5 overflow-hidden">
                                                    <Image src={trip.avatar} alt={trip.user} width={64} height={64} className="rounded-2xl" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl lg:text-4xl font-black tracking-tighter group-hover:text-blue-400 transition-colors leading-none text-white">{trip.title}</h3>
                                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2">SEQUENCE BY @{trip.user}</p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">
                                                <Heart className="w-4 h-4" /> {trip.likes}
                                            </button>
                                        </div>
                                        <p className="text-white/40 text-sm lg:text-lg leading-relaxed font-medium line-clamp-2">
                                            Initializing neural-link itinerary for {trip.location}. Experience-first synchronization focused on local culture, futuristic landmarks, and high-tech culinary nodes.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                                        <div className="flex gap-4 w-full sm:w-auto">
                                            <button className="flex-1 sm:flex-none p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-white/40 hover:text-white flex justify-center">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                            <button className="flex-1 sm:flex-none p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-white/40 hover:text-white flex justify-center">
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleReplicate(trip)}
                                            disabled={!!replicating}
                                            className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 group/link shadow-md disabled:opacity-50"
                                        >
                                            {replicating === trip.title ? (
                                                <Loader2 className="w-4 h-4 animate-spin text-black group-hover/link:text-white" />
                                            ) : (
                                                <>
                                                    Replicate Sequence <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Network Status Footer */}
                <footer className="text-center py-20 border-t border-white/5">
                    <div className="inline-flex items-center gap-6 px-10 py-4 rounded-[2rem] bg-white/2 border border-white/5">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                                    <Image src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" width={40} height={40} />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            12,840 nodes currently active in cluster
                        </p>
                    </div>
                </footer>
            </div>
        </DashboardLayout>
    );
}

