import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { getTrip, TripData, TripStop, addStopToTrip } from '@/lib/firestore/trips';
import DashboardLayout from '@/app/dashboard/layout';
import { Search, Filter, ArrowRight, MapPin, DollarSign, Calendar, Clock, Activity, Share2, Download, Plus, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function TripOverviewPage() {
    const { tripId } = useParams();
    const router = useRouter();
    const [trip, setTrip] = useState<TripData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAddingNode, setIsAddingNode] = useState(false);
    const [newNode, setNewNode] = useState<Partial<TripStop>>({
        city: '',
        startDate: '',
        endDate: '',
        budget: 0,
        description: ''
    });
    const [nodeImage, setNodeImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (tripId) {
            getTrip(tripId as string).then(data => {
                setTrip(data);
                setLoading(false);
            });
        }
    }, [tripId]);

    const handleAddNode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nodeImage) {
            alert("Mandatory photo of the place is missing. Protocol requires visual verification of geographical nodes.");
            return;
        }
        setIsSubmitting(true);
        const stop: TripStop = {
            id: Math.random().toString(36).substr(2, 9),
            city: newNode.city || '',
            startDate: newNode.startDate || '',
            endDate: newNode.endDate || '',
            budget: newNode.budget || 0,
            description: newNode.description || '',
            activities: [],
            // @ts-ignore - using a custom field for the image in this demo
            image: nodeImage
        };

        try {
            await addStopToTrip(tripId as string, stop);
            setTrip(prev => prev ? { ...prev, stops: [...(prev.stops || []), stop] } : null);
            setIsAddingNode(false);
            setNewNode({ city: '', startDate: '', endDate: '', budget: 0, description: '' });
            setNodeImage('');
        } catch (error) {
            alert("Node synchronization failed. Cluster error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayStops = useMemo(() => {
        if (!trip?.stops || trip.stops.length === 0) {
            // Return placeholder stops if none exist for demo purposes
            return [
                { id: '1', city: 'Morning Synapse', description: 'Focus on high-energy local nodes and breakfast rituals.', startDate: '08:00 AM', endDate: '09:00 AM', activities: [], budget: 120, image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=400' },
                { id: '2', city: 'District Exploration', description: 'Deep dive into the cultural and architectural sector.', startDate: '01:30 PM', endDate: '03:30 PM', activities: [], budget: 250, image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400' }
            ];
        }
        return trip.stops;
    }, [trip]);

    if (loading) return (
        <DashboardLayout>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-24 h-24 relative">
                    <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <div className="absolute inset-4 border-4 border-purple-600/20 rounded-full" />
                    <div className="absolute inset-4 border-4 border-purple-600 border-b-transparent rounded-full animate-spin [animation-direction:reverse]" />
                </div>
            </div>
        </DashboardLayout>
    );

    if (!trip) return (
        <DashboardLayout>
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <div className="p-8 rounded-[3rem] bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-lg shadow-2xl">
                    Sequence Not Found // 404
                </div>
                <button onClick={() => router.push('/dashboard')} className="px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Return to Command Center</button>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12 pb-40">
                {/* Immersive Header Card */}
                <header className="relative h-[400px] md:h-[500px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl group border border-white/5">
                    <Image
                        src={trip.coverImage || `https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200`}
                        alt={trip.destination}
                        fill
                        className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[3000ms] opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent p-6 md:p-16 flex flex-col justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 md:space-y-6 max-w-4xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                                    Active Itinerary
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none text-white">
                                {trip.destination.split(',')[0]} <span className="text-white/20">Protocol</span>
                            </h1>
                            <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8 pt-4 border-t border-white/10">
                                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-blue-500" />
                                        <span className="text-white/60 font-bold text-sm md:text-base">{trip.destination}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-purple-500" />
                                        <span className="text-white/60 font-bold text-sm md:text-base">
                                            {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsAddingNode(true)}
                                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-3 shadow-[0_10px_20px_rgba(37,99,235,0.3)] active:scale-95"
                                >
                                    <Plus className="w-4 h-4" /> Add Node
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Timeline */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-white/5">
                            <h2 className="text-3xl font-black tracking-tighter uppercase text-white">Daily Clusters</h2>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <div className="flex-1 sm:w-64 relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                                    <input className="w-full bg-[#161b22] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" placeholder="Search activities..." />
                                </div>
                                <button className="p-3 rounded-xl bg-[#161b22] border border-white/10 hover:border-white/20 transition-all">
                                    <Filter className="w-4 h-4 text-white/40" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-16 relative pl-4 md:pl-20">
                            {/* Visual Timeline Bar */}
                            <div className="absolute left-[20px] md:left-[59px] top-4 bottom-4 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-transparent rounded-full opacity-20" />

                            {[1].map(day => (
                                <div key={day} className="relative space-y-8">
                                    {/* Day Marker */}
                                    <div className="absolute -left-[4px] md:-left-[43px] top-0 z-10 w-8 h-8 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#0a0f18] border-2 border-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                        <span className="text-base md:text-2xl font-black text-white">{day}</span>
                                    </div>

                                    <div className="pt-2 md:pt-4">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-4">
                                            Sequence Initialization // Day 0{day}
                                            <div className="h-px flex-1 bg-white/5" />
                                        </h3>

                                        <div className="grid gap-6">
                                            {displayStops.map((activity, i) => (
                                                <motion.div
                                                    key={activity.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    viewport={{ once: true }}
                                                    whileHover={{ x: 10 }}
                                                    className="bg-[#0a0f18] p-6 rounded-[2rem] border border-white/5 hover:border-blue-500/20 transition-all flex flex-col md:flex-row gap-8 group"
                                                >
                                                    <div className="w-full md:w-48 h-32 md:h-auto rounded-2xl overflow-hidden relative flex-shrink-0">
                                                        <Image
                                                            src={activity.image || `https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=400`}
                                                            fill
                                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                                            alt={activity.city}
                                                        />
                                                    </div>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-3">
                                                                <Clock className="w-4 h-4 text-blue-500" />
                                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{activity.startDate}</span>
                                                            </div>
                                                            <span className="px-3 py-1 rounded-full bg-white/5 text-[8px] font-bold text-white/30 tracking-widest uppercase border border-white/5">
                                                                Node Identified
                                                            </span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter">{activity.city}</h4>
                                                            <p className="text-sm text-white/40 leading-relaxed font-medium line-clamp-2">{activity.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:pl-8 md:border-l border-white/5">
                                                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Resource Cost</span>
                                                        <span className="text-xl font-black text-white">${activity.budget}.00</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Terminal Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Budget Status */}
                        <div className="bg-[#0a0f18] p-8 rounded-[2.5rem] border border-white/5 space-y-8 sticky top-32 shadow-2xl">
                            <h3 className="text-xl font-black tracking-tighter uppercase text-white flex items-center gap-3">
                                <DollarSign className="w-6 h-6 text-blue-500" /> Budget Intelligence
                            </h3>

                            <div className="space-y-6">
                                <div className="text-center py-8 rounded-[2rem] bg-white/5 border border-white/5">
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-2">Total Credit Limit</p>
                                    <p className="text-6xl font-black text-white tracking-tighter">${trip.budget.toLocaleString()}</p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: 'Stays', spent: 850, limit: 1200, color: 'bg-blue-600' },
                                        { label: 'Activities', spent: 420, limit: 800, color: 'bg-purple-600' },
                                        { label: 'Logistics', spent: 300, limit: 500, color: 'bg-indigo-600' }
                                    ].map(cat => (
                                        <div key={cat.label} className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-white/40 uppercase tracking-widest">{cat.label}</span>
                                                <span className="text-white">${cat.spent} / ${cat.limit}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(cat.spent / cat.limit) * 100}%` }}
                                                    className={`h-full ${cat.color} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                                    <Download className="w-4 h-4" /> Export
                                </button>
                                <button className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#161b22] border border-white/10 text-white/40 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                                    <Share2 className="w-4 h-4" /> Sync
                                </button>
                            </div>
                        </div>

                        {/* Network Contributors */}
                        <div className="bg-[#0a0f18] p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-xl">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-white/60">Node Collaborators</h3>
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-[#0a0f18] bg-gray-800 overflow-hidden relative">
                                        <Image src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="User" fill />
                                    </div>
                                ))}
                                <button className="w-12 h-12 rounded-2xl border-4 border-[#0a0f18] bg-[#161b22] flex items-center justify-center text-white/40 hover:text-white transition-colors">
                                    <Activity className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Node Modal */}
            <AnimatePresence>
                {isAddingNode && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddingNode(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-2xl bg-[#0a0f18] border border-white/10 rounded-[3rem] p-10 shadow-3xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />

                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic">Initialize New Node</h2>
                                <button onClick={() => setIsAddingNode(false)} className="p-3 bg-white/5 rounded-2xl text-white/40 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddNode} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Node Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={newNode.city}
                                            onChange={(e) => setNewNode({ ...newNode, city: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                                            placeholder="e.g. Akihabara Sector"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Budget Allocation ($)</label>
                                        <input
                                            type="number"
                                            required
                                            value={newNode.budget}
                                            onChange={(e) => setNewNode({ ...newNode, budget: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                                            placeholder="000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Visual Confirmation (Place Image URL)*</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                        <input
                                            type="url"
                                            required
                                            value={nodeImage}
                                            onChange={(e) => setNodeImage(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                                            placeholder="https://images.unsplash.com/node-visual..."
                                        />
                                    </div>
                                    {nodeImage && (
                                        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 mt-4 group">
                                            <Image src={nodeImage} fill className="object-cover" alt="Preview" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-[10px] font-black text-white uppercase tracking-widest">Visual Verified</p>
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-[8px] text-blue-500 font-bold uppercase tracking-[0.2em] mt-2 ml-2">
                                        MANDATORY: Protocol restricts images to geographical or architectural data. No sustenance/extraneous objects.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Mission Parameters</label>
                                    <textarea
                                        value={newNode.description}
                                        onChange={(e) => setNewNode({ ...newNode, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold min-h-[100px] resize-none"
                                        placeholder="Describe the objective of this node..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-16 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center shadow-3xl active:scale-95"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : 'Synchronize Node'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
