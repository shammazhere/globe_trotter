'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/app/dashboard/layout';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Globe, Edit2, Shield, Bell, LogOut, Calendar, Heart } from 'lucide-react';

export default function ProfilePage() {
    const { user, logout } = useAuth();

    const sections = [
        { title: 'Preplanned Trips', items: [1, 2, 3], color: 'neon-blue' },
        { title: 'Previous Trips', items: [1, 2, 3, 4], color: 'neon-purple' }
    ];

    return (
        <DashboardLayout>
            <div className="p-8 max-w-5xl mx-auto space-y-12 pb-20">
                {/* User Info Header (Screen 7 Top) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 blur-3xl rounded-full" />

                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-neon-blue/20 p-1">
                            <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-neon-blue text-black rounded-lg shadow-lg hover:scale-110 transition-transform">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">{user?.displayName || 'Traveler Name'}</h1>
                        <p className="text-gray-400 mb-4 flex items-center justify-center md:justify-start gap-2">
                            <Mail className="w-4 h-4" /> {user?.email}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-neon-blue" /> San Francisco, CA
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-sm">
                                <Globe className="w-4 h-4 text-neon-purple" /> United States
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm transition-all">
                            Edit Profile
                        </button>
                        <button
                            onClick={() => logout()}
                            className="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-sm transition-all flex items-center gap-2 justify-center"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </motion.div>

                {/* Preplanned & Previous Trips Sections (Screen 7 Middle/Bottom) */}
                {sections.map((section, idx) => (
                    <div key={section.title} className="space-y-6">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                {idx === 0 ? <Heart className="w-5 h-5 text-red-400" /> : <Calendar className="w-5 h-5 text-neon-purple" />}
                                {section.title}
                            </h2>
                            <button className="text-sm text-gray-500 hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.items.map((i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-all shadow-xl"
                                >
                                    <div className={`h-32 bg-gradient-to-br ${idx === 0 ? 'from-indigo-900 to-blue-900' : 'from-purple-900 to-pink-900'} relative p-4 flex flex-col justify-end`}>
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                                        <h3 className="text-lg font-bold relative z-10">Trip Placeholder #{i}</h3>
                                    </div>
                                    <div className="p-4 flex justify-between items-center text-xs text-gray-400">
                                        <span>3 Cities • 12 Activities</span>
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black transition-all">View</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Settings Grid (Additional Feature 12) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                    {[
                        { icon: Shield, title: 'Privacy & Security', desc: 'Secure your account data' },
                        { icon: Bell, title: 'Notifications', desc: 'Manage alerts and updates' },
                    ].map((item) => (
                        <div key={item.title} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 cursor-pointer transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                <item.icon className="w-6 h-6 text-neon-blue" />
                            </div>
                            <div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
