'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/app/dashboard/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Edit2, Shield, Bell, Globe, Box, Zap, Award, Activity, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserTrips, TripData } from '@/lib/firestore/trips';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, logout, updateUserProfile } = useAuth();
    const router = useRouter();
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            setEditForm({
                displayName: user.displayName || '',
                photoURL: user.photoURL || ''
            });
            getUserTrips(user.uid).then(data => {
                setTrips(data);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await updateUserProfile(editForm);
            setIsEditing(false);
        } catch (error) {
            alert("Identity update failed. Protocol error.");
        } finally {
            setUpdating(false);
        }
    };

    const stats = [
        { label: 'Protocols Active', value: trips.length.toString(), icon: Activity },
        { label: 'Nodes Visited', value: Array.from(new Set(trips.map(t => t.destination))).length.toString(), icon: Globe },
        { label: 'Rank Index', value: trips.length > 5 ? 'S-Rank' : 'Vanguard', icon: Award }
    ];

    if (loading && user) {
        return (
            <DashboardLayout>
                <div className="flex h-[80vh] items-center justify-center">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 lg:p-12 max-w-[1200px] mx-auto space-y-12 md:space-y-20 pb-40 pt-10">
                {/* Identity Terminal */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div className="bg-[#05070a] p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 flex flex-col items-center lg:items-end gap-8 lg:gap-12 relative overflow-hidden shadow-2xl">
                        {/* Background Aura */}
                        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-600/5 blur-[120px] rounded-full -mr-32 -mt-32" />

                        <div className="relative group flex items-center lg:items-end">
                            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] border-2 border-blue-500/20 p-2 bg-black/40 backdrop-blur-3xl">
                                <div className="w-full h-full rounded-[2.5rem] bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                                    {user?.photoURL ? (
                                        <Image src={user.photoURL} alt="Profile" width={224} height={224} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <User className="w-16 h-16 md:w-20 md:h-20 text-white/10" />
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-xl md:rounded-2xl shadow-3xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center border-4 border-[#05070a]"
                            >
                                <Edit2 className="w-5 h-5 md:w-7 md:h-7" />
                            </button>
                        </div>

                        <div className="flex-1 text-center lg:text-left space-y-4 md:space-y-6 relative z-10 w-full">
                            <div className="space-y-2">
                                <motion.span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Authorized Explorer</motion.span>
                                <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-white uppercase italic">{user?.displayName || 'Traveler 01'}</h1>
                                <p className="text-white/40 font-bold flex items-center justify-center lg:justify-start gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-purple-500" /> {user?.email}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 border-t border-white/5 pt-8">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 flex items-center gap-2">
                                            <stat.icon size={12} className="text-blue-500" /> {stat.label}
                                        </p>
                                        <p className="text-xl md:text-3xl font-black text-white">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto relative z-10">
                            <button className="h-14 px-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-all text-white">Identity Hub</button>
                            <button onClick={() => logout()} className="h-14 px-8 rounded-xl md:rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Disconnect</button>
                        </div>
                    </div>
                </motion.section>

                {/* Data Clusters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <section className="space-y-8">
                        <div className="flex items-center gap-4 px-2">
                            <h2 className="text-2xl font-black tracking-tighter uppercase text-white">Priority Sequences</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                        </div>

                        <div className="space-y-4">
                            {trips.length > 0 ? trips.map((trip: any) => (
                                <motion.div
                                    key={trip.id}
                                    whileHover={{ x: 8 }}
                                    onClick={() => router.push(`/trips/${trip.id}`)}
                                    className="bg-[#0a0c10] p-6 rounded-[2rem] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/20 transition-all shadow-xl"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all relative overflow-hidden">
                                            {trip.coverImage ? (
                                                <Image src={trip.coverImage} fill className="object-cover opacity-30" alt="" />
                                            ) : (
                                                <Box className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-white leading-none uppercase italic">{trip.title}</h3>
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-2">{trip.destination} // {trip.startDate}</p>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Zap className="w-5 h-5 text-blue-500" />
                                    </div>
                                </motion.div>
                            )) : (
                                <p className="text-white/20 font-bold text-center py-20 border-2 border-dashed border-white/5 rounded-[2rem]">No sequences initialized.</p>
                            )}
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="flex items-center gap-4 px-2">
                            <h2 className="text-2xl font-black tracking-tighter uppercase text-white">System Protocols</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: Shield, title: 'QUANTUM ENCRYPTION', desc: 'Secure biometric identity synchronization across all nodes.' },
                                { icon: Bell, title: 'NEURAL ALERTS', desc: 'Real-time telemetry and destination cluster updates.' },
                            ].map((protocol) => (
                                <motion.div
                                    key={protocol.title}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-[#0a0c10] p-8 rounded-[2rem] border border-white/5 flex items-center gap-8 cursor-pointer hover:bg-white/5 transition-all shadow-xl"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                                        <protocol.icon className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-1 text-white">{protocol.title}</h3>
                                        <p className="text-white/30 font-medium text-sm leading-relaxed">{protocol.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditing(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-[#0a0c10] border border-white/10 rounded-[3rem] p-8 shadow-3xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full -mr-32 -mt-32" />

                            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8 italic">Modify Identity</h2>

                            <form onSubmit={handleUpdateProfile} className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Explorer Name</label>
                                    <input
                                        type="text"
                                        value={editForm.displayName}
                                        onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                                        placeholder="e.g. Neo Voyager"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Avatar URL (Place Image Only)</label>
                                    <input
                                        type="url"
                                        value={editForm.photoURL}
                                        onChange={(e) => setEditForm({ ...editForm, photoURL: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                    <p className="text-[8px] text-blue-500/60 font-medium uppercase tracking-widest mt-2 ml-2">Note: Only geographical landforms or architectural nodes allowed. No food/distractions.</p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="flex-1 h-14 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {updating ? <Loader2 className="animate-spin w-5 h-5" /> : 'Synchronize'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 h-14 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/20 hover:text-red-500 transition-all"
                                    >
                                        Abort
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
