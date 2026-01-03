'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, Users, DollarSign, Globe, Zap, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#02040a] selection:bg-blue-600 selection:text-white font-inter overflow-x-hidden">
      {/* Immersive Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/80 via-transparent to-[#02040a]" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/60 text-xs font-medium uppercase tracking-[0.4em]"
            >
              Next Generation Travel
            </motion.span>
            <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter text-white uppercase drop-shadow-2xl">
              Explore<br />Horizons
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed tracking-tight">
              The future of global exploration is here. Sync your travel DNA with <span className="text-white font-medium">high-frequency</span> travel data.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => router.push('/login')}
              className="group px-12 py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase text-xs tracking-widest transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-4"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
            <button
              onClick={() => router.push('/community')}
              className="px-12 py-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-3xl transition-all active:scale-95 text-white font-bold uppercase text-xs tracking-widest"
            >
              Browse Feed
            </button>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]"
        >
          <div className="flex items-center gap-3"><Globe size={14} /> 120+ Nodes</div>
          <div className="flex items-center gap-3"><Users size={14} /> 50K+ Explorers</div>
          <div className="flex items-center gap-3"><Zap size={14} /> Realtime Sync</div>
        </motion.div>
      </section>

      {/* Feature Matrix */}
      <section className="relative z-10 px-6 py-40 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Compass, title: 'NEURAL DISCOVERY', desc: 'Smarter destinations based on your travel DNA and preference telemetry.' },
            { icon: Users, title: 'CLUSTER SYNC', desc: 'Instantaneous group coordination for multi-node travel sequences.' },
            { icon: DollarSign, title: 'QUANTUM BUDGET', desc: 'Track every micro-transaction with immersive high-speed analytics.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-[#0a0f18] p-12 rounded-[3.5rem] border border-white/5 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-600/20 group-hover:bg-blue-600 transition-all">
                <feature.icon className="w-8 h-8 text-blue-500 group-hover:text-white transition-all" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tighter text-white">{feature.title}</h3>
              <p className="text-white/50 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Footer */}
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <div className="flex flex-wrap justify-center items-center gap-12 mb-12 opacity-30 grayscale invert">
          <div className="font-bold text-xl tracking-tighter uppercase italic">G<span className="text-blue-600">T</span> OS v4.0</div>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">
          &copy; 2026 GlobeTrotter System // Authorized Access Only
        </p>
      </footer>
    </main>
  );
}
