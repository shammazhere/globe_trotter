'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, User } from 'lucide-react';
import Link from 'next/link';


export default function LoginPage() {
    const { signInWithGoogle, user, error: authError } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState('');

    if (user) {
        router.push('/dashboard');
        return null;
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setLocalError('');

        try {
            await signInWithGoogle();
            // Success - router.push will be called by the auth state change
            router.push('/dashboard');
        } catch (err) {
            // Capture the actual error message from the thrown error
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign in. Please try again.';
            setLocalError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const displayError = localError || authError;

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(112,0,255,0.1),transparent_70%)]" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/20 blur-[100px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/20 blur-[100px] rounded-full animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 w-full max-w-md p-8 rounded-2xl glass-card border border-white/10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue your journey</p>
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Username or Email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-neon-blue outline-none transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue font-bold py-4 rounded-xl hover:bg-neon-blue hover:text-black transition-all duration-300"
                    >
                        Login Button
                    </button>
                    <div className="text-right">
                        <button className="text-xs text-gray-500 hover:text-neon-blue transition-colors">Forgot Password?</button>
                    </div>
                </div>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0a0a0a] px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </>
                    )}
                </button>

                {displayError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-red-400 text-sm font-medium">Authentication Error</p>
                            <p className="text-red-300 text-xs mt-1">{displayError}</p>
                        </div>
                    </motion.div>
                )}

                <div className="mt-8 text-center space-y-4">
                    <p className="text-gray-400">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-neon-blue hover:underline">
                            Register User
                        </Link>
                    </p>
                    <p className="text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
