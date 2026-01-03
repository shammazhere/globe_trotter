'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Globe, Info, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        city: '',
        country: '',
        bio: '',
        password: '', // Added for email/pass auth which is mentioned in mission
    });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration for now, or connect to Firebase Auth
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative py-12 px-4 bg-background overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,243,255,0.05),transparent_50%)]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-2xl p-8 rounded-3xl glass-card border border-white/10 shadow-2xl"
            >
                <Link href="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-gray-400">Join GlobeTrotter to start your journey</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <User className="w-4 h-4" /> First Name
                            </label>
                            <input
                                required
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <User className="w-4 h-4" /> Last Name
                            </label>
                            <input
                                required
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email Address
                            </label>
                            <input
                                required
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Phone className="w-4 h-4" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all"
                                placeholder="+1 234 567 890"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            />
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> City
                            </label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all"
                                placeholder="San Francisco"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>

                        {/* Country */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Country
                            </label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all"
                                placeholder="USA"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Bio / Additional Info */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <Info className="w-4 h-4" /> Additional Information
                        </label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-32 focus:border-neon-blue outline-none transition-all resize-none"
                            placeholder="Tell us about your travel style..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-neon-blue text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Registering...
                            </>
                        ) : (
                            'Register User'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login" className="text-neon-blue hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
