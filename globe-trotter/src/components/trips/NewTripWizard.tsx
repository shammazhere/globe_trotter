'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { createTrip } from '@/lib/firestore/trips';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Loader2, Compass, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

const SUGGESTED_CITIES = [
    { name: 'Tokyo', country: 'Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400' },
    { name: 'Paris', country: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400' },
    { name: 'New York', country: 'USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400' },
    { name: 'Reykjavik', country: 'Iceland', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=400' },
];

export default function NewTripWizard() {
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200');
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        budget: 0,
    });

    const updateDestination = (value: string) => {
        setFormData(prev => ({ ...prev, destination: value }));
        const city = SUGGESTED_CITIES.find(c => c.name.toLowerCase().includes(value.toLowerCase()));
        if (city) setBgImage(city.img);
    };

    const handleCreate = async () => {
        if (!user) {
            alert("Authentication required. Please sign in.");
            return;
        }

        if (!formData.destination || !formData.startDate || !formData.endDate || formData.budget <= 0) {
            alert("Please complete all fields correctly.");
            return;
        }

        setLoading(true);
        try {
            const tripId = await createTrip({
                ownerId: user.uid,
                ...formData,
                isPublic: false,
                spent: 0,
                stops: [],
                collaborators: [user.uid],
                coverImage: bgImage
            });
            router.push(`/trips/${tripId}`);
        } catch (error: any) {
            console.error("Initialization error:", error);
            const errorMessage = error?.code === 'unavailable'
                ? "Connectivity lost. Client is currently offline."
                : "Protocol failure. Please verify your credentials.";
            alert(errorMessage);
            setLoading(false);
        }
    };

    const steps = [
        {
            id: 1,
            title: "Where's Next?",
            subtitle: "Every journey begins with a single destination.",
            icon: Compass,
            content: (
                <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-4">
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                            <input
                                type="text"
                                className="w-full bg-[#161b22] border border-white/10 rounded-2xl p-4 md:p-5 pl-12 md:pl-14 text-lg md:text-xl focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 text-white"
                                placeholder="Destination City/Country"
                                value={formData.destination}
                                onChange={(e) => updateDestination(e.target.value)}
                            />
                        </div>
                        <div className="relative group">
                            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5 group-focus-within:rotate-12 transition-transform" />
                            <input
                                type="text"
                                className="w-full bg-[#161b22] border border-white/10 rounded-2xl p-4 md:p-5 pl-12 md:pl-14 text-lg md:text-xl focus:border-purple-500 outline-none transition-all placeholder:text-gray-600 text-white"
                                placeholder="Trip Name (e.g. My Epic Summer)"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Popular Destinations</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {SUGGESTED_CITIES.map(city => (
                                <button
                                    key={city.name}
                                    onClick={() => {
                                        updateDestination(`${city.name}, ${city.country}`);
                                        setFormData(prev => ({ ...prev, title: `${city.name} Adventure` }));
                                    }}
                                    className={`relative h-20 md:h-24 rounded-xl overflow-hidden group border-2 transition-all ${formData.destination.includes(city.name) ? 'border-blue-500 scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={city.img} alt={city.name} fill className="object-cover transition-transform group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                                        <p className="font-bold text-sm tracking-tight leading-none text-white">{city.name}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: "Timeline",
            subtitle: "Lock in your travel dates for the perfect sync.",
            icon: Calendar,
            content: (
                <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">Arrival</label>
                            <input
                                type="date"
                                className="w-full bg-[#161b22] border border-white/10 rounded-2xl p-4 md:p-5 text-lg focus:border-blue-500 outline-none transition-all [color-scheme:dark] text-white"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">Departure</label>
                            <input
                                type="date"
                                className="w-full bg-[#161b22] border border-white/10 rounded-2xl p-4 md:p-5 text-lg focus:border-blue-500 outline-none transition-all [color-scheme:dark] text-white"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4">
                        <Sparkles className="text-blue-500 w-6 h-6 flex-shrink-0" />
                        <p className="text-xs md:text-sm text-white/60 italic leading-relaxed">
                            Pro-tip: Mid-week flights are usually 20% cheaper for {formData.destination || 'global destinations'}.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: "Investment",
            subtitle: "Set your budget for real-time cost intelligence.",
            icon: DollarSign,
            content: (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-[#161b22]/40 rounded-[2.5rem] p-12 md:p-16 border border-white/5 flex flex-col items-center justify-center relative shadow-inner">
                        <div className="flex items-baseline justify-center gap-3">
                            <span className="text-4xl md:text-6xl font-black text-blue-500 opacity-80">$</span>
                            <input
                                type="number"
                                className="bg-transparent text-6xl md:text-8xl font-black tracking-tighter text-white focus:outline-none w-full text-center placeholder:text-white/5"
                                placeholder="0000"
                                value={formData.budget === 0 ? '' : formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {[1000, 3000, 5000, 10000].map(amt => (
                            <button
                                key={amt}
                                onClick={() => setFormData({ ...formData, budget: amt })}
                                className={`px-8 py-3.5 rounded-xl border-2 transition-all font-bold text-xs tracking-widest ${formData.budget === amt ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-transparent border-white/5 text-white/20 hover:border-white/20 hover:text-white'}`}
                            >
                                ${amt.toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="relative min-h-[70vh] flex items-center justify-center py-6 md:py-12 px-2 md:px-4 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
            {/* Background Container */}
            <div className="absolute inset-0 z-0 scale-110 pointer-events-none">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={bgImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image src={bgImage} alt="Travel ambience" fill className="object-cover blur-[1px]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 w-full max-w-2xl px-2">
                {/* Progress Indicators */}
                <div className="flex justify-between items-center mb-10 md:mb-16 relative px-8 md:px-12">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0" />
                    <motion.div
                        className="absolute top-1/2 left-0 h-px bg-blue-600 -translate-y-1/2 z-10"
                        animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    />
                    {steps.map((s) => (
                        <div key={s.id} className="relative z-20">
                            <motion.div
                                animate={{
                                    scale: step >= s.id ? 1.1 : 0.9,
                                    borderColor: step >= s.id ? '#2563eb' : 'rgba(255,255,255,0.1)',
                                    backgroundColor: step >= s.id ? '#2563eb' : '#05070a'
                                }}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center border transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                            >
                                <s.icon className={`w-4 h-4 transition-colors ${step >= s.id ? 'text-white' : 'text-white/20'}`} />
                            </motion.div>
                        </div>
                    ))}
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="bg-[#05070a]/90 backdrop-blur-3xl p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] min-h-[480px] flex flex-col shadow-2xl border border-white/5"
                    >
                        <header className="text-center mb-8 md:mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-500 text-[8px] font-black uppercase tracking-[0.2em] mb-4 border border-blue-500/20">
                                PHASE 0{step} / 03
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter text-white uppercase italic">{steps[step - 1].title}</h2>
                            <p className="text-white/30 text-xs md:text-base font-bold uppercase tracking-wider">{steps[step - 1].subtitle}</p>
                        </header>

                        <div className="flex-1">
                            {steps[step - 1].content}
                        </div>

                        <footer className="mt-8 pt-8 border-t border-white/5 flex justify-between gap-4">
                            <button
                                onClick={() => setStep(s => Math.max(1, s - 1))}
                                className={`px-6 md:px-10 py-4 font-black transition-all text-[10px] uppercase tracking-widest ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-white/20 hover:text-white'}`}
                            >
                                BACK
                            </button>

                            {step < steps.length ? (
                                <button
                                    onClick={() => setStep(s => Math.min(steps.length, s + 1))}
                                    className="px-8 md:px-12 py-4 md:py-5 bg-blue-600 text-white rounded-2xl font-black tracking-widest uppercase text-[10px] transition-all flex items-center gap-3 hover:bg-blue-700 active:scale-95 group shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
                                >
                                    PROCEED
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleCreate}
                                    disabled={loading}
                                    className="px-8 md:px-12 py-4 md:py-5 bg-blue-600 text-white rounded-2xl font-black tracking-widest uppercase text-[10px] transition-all flex items-center justify-center min-w-[180px] active:scale-95 disabled:opacity-50 shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin w-5 h-5" />
                                    ) : (
                                        <>
                                            INITIALIZE
                                            <Sparkles className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </button>
                            )}
                        </footer>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
