'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, Users, DollarSign } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#020202]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="World exploration"
          className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow active-gpu"
          style={{ filter: 'blur(4px)' }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(0,243,255,0.1),transparent_50%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="z-20 text-center px-4 max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="inline-block px-5 py-2.5 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] uppercase tracking-[0.25em] mb-8 backdrop-blur-xl font-black shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            ✨ Redefining Exploration
          </span>
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8]">
            Globe<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_30px_rgba(0,243,255,0.5)]">Trotter</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-300/80 max-w-4xl mx-auto leading-relaxed font-light tracking-tight">
            The next generation of travel is here. <span className="text-white font-medium">AI-driven</span> logic, <span className="text-white font-medium">real-time</span> collaboration, and <span className="text-white font-medium">stunning</span> visualizations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12"
        >
          <button
            onClick={() => router.push('/login')}
            className="group px-12 py-6 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-neon-blue hover:text-black hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] transition-all duration-500 transform hover:-translate-y-2 flex items-center gap-4"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
          <button
            onClick={() => router.push('/community')}
            className="px-12 py-6 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-2xl transition-all duration-500 transform hover:-translate-y-2 text-white font-bold text-xs uppercase tracking-widest"
          >
            Browse Community
          </button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20"
        >
          {[
            { icon: Compass, title: 'AI Discovery', desc: 'Smarter destinations based on your travel DNA.' },
            { icon: Users, title: 'Real-time Collab', desc: 'Sync plans with friends in futuristic real-time.' },
            { icon: DollarSign, title: 'Smart Budget', desc: 'Track expenses with immersive visual breakdowns.' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-6 group-hover:bg-neon-blue group-hover:text-black transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements (Decorative) */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </main>
  );
}
