'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
    const { signInWithGoogle, signInWithEmail, user, error: authError } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    if (user) return null;

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLocalError('');
        try {
            await signInWithEmail(email, password);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Authentication failed.';
            setLocalError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setLocalError('');
        try {
            await signInWithGoogle();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Google sign-in failed.';
            setLocalError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const displayError = localError || authError;

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0c10] font-inter">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    fill
                    className="object-cover opacity-70"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
            </div>

            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                {/* Left Side: Hero Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden lg:block space-y-10"
                >
                    <div className="space-y-4">
                        <span className="text-white/60 tracking-[0.8em] text-xs font-bold uppercase">Travel</span>
                        <h1 className="text-[8.5rem] font-bold leading-[0.8] tracking-tighter text-white uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            Explore<br />Horizons
                        </h1>
                    </div>
                    <div className="max-w-xl space-y-6">
                        <p className="text-2xl font-bold text-white tracking-tight leading-snug">
                            Where Your Dream Destinations Become Reality.
                        </p>
                        <p className="text-white/50 text-xl font-medium leading-relaxed">
                            Embark on a journey where every corner of the world is within your reach.
                            Discover, wander, and create stories that last forever.
                        </p>
                    </div>
                </motion.div>

                {/* Right Side: Form Card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center lg:justify-end"
                >
                    <div className="w-full max-w-[520px] bg-[#0c121d]/90 backdrop-blur-3xl p-10 md:p-14 rounded-[2.5rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
                        </div>

                        <form onSubmit={handleEmailLogin} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-white/80 ml-1 uppercase tracking-widest text-[10px]">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#1c2331] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-500 font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-white/80 ml-1 uppercase tracking-widest text-[10px]">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#1c2331] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-500 font-medium"
                                    required
                                />
                                <div className="text-right">
                                    <Link href="#" className="text-[10px] uppercase tracking-widest font-black text-white/40 hover:text-white transition-colors">Forgot password?</Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-18 bg-[#4285f4] hover:bg-[#3b77db] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-[0_15px_40px_rgba(66,133,244,0.4)] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                            </button>
                        </form>

                        <div className="my-10 flex items-center gap-6">
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">or</span>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full h-18 bg-[#1c2331] hover:bg-[#252e3f] text-white rounded-2xl font-bold text-sm transition-all border border-white/10 flex items-center justify-center gap-4 group"
                        >
                            <svg className="w-5 h-5 ml-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="flex-1 mr-10 font-medium">Sign in with Google</span>
                        </button>

                        <div className="mt-12 text-center">
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
                                Are you new? <Link href="/signup" className="text-white hover:underline ml-2">Create an Account</Link>
                            </p>
                        </div>

                        <AnimatePresence>
                            {displayError && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{displayError}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
