'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020202] transition-opacity duration-300">
            <div className="relative">
                {/* Animated Rings - Using CSS for core rotation for performance */}
                <div className="w-32 h-32 rounded-full border-t-2 border-b-2 border-neon-blue/50 animate-spin transition-transform"
                    style={{ animationDuration: '3s', willChange: 'transform' }} />

                <div className="absolute inset-0 w-32 h-32 rounded-full border-l-2 border-r-2 border-neon-purple/50 scale-75 animate-spin"
                    style={{ animationDirection: 'reverse', animationDuration: '2s', willChange: 'transform' }} />

                {/* Central Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [0.95, 1.05, 0.95]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <Globe className="w-10 h-10 text-neon-blue drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]" />
                    </motion.div>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple uppercase animate-pulse">
                    Initializing...
                </h2>
                <div className="flex gap-1.5 mt-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-neon-blue/80 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s`, willChange: 'transform' }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
