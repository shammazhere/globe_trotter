'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { createTrip } from '@/lib/firestore/trips';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Check, Loader2 } from 'lucide-react';

export default function NewTripWizard() {
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        budget: 0,
    });

    const handleCreate = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const tripId = await createTrip({
                ownerId: user.uid,
                ...formData,
                isPublic: false
            });
            router.push(`/trips/${tripId}`);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const steps = [
        {
            id: 1,
            title: "Where are we going?",
            icon: MapPin,
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Trip Title</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xl focus:border-neon-blue outline-none transition-all placeholder:text-gray-600"
                            placeholder="e.g. Cyberpunk 2077 Tour"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Destination City/Country</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xl focus:border-neon-blue outline-none transition-all placeholder:text-gray-600"
                            placeholder="e.g. Tokyo, Japan"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        />
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: "When is the adventure?",
            icon: Calendar,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                            <input
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg focus:border-neon-blue outline-none transition-all [color-scheme:dark]"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">End Date</label>
                            <input
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg focus:border-neon-blue outline-none transition-all [color-scheme:dark]"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: "What's the budget?",
            icon: DollarSign,
            content: (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Total Budget (USD)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                            <input
                                type="number"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-3xl font-bold focus:border-neon-blue outline-none transition-all"
                                placeholder="0"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {[1000, 3000, 5000, 10000].map(amt => (
                            <button
                                key={amt}
                                onClick={() => setFormData({ ...formData, budget: amt })}
                                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-neon-blue/20 border border-white/5 text-sm transition-colors"
                            >
                                ${amt}
                            </button>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-12">
                {steps.map((s, i) => (
                    <div key={s.id} className="flex flex-col items-center relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s.id ? 'border-neon-blue bg-neon-blue/20 text-neon-blue' : 'border-white/10 text-gray-500'}`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`absolute left-full top-1/2 -translate-y-1/2 w-[calc(100vw/6)] max-w-[100px] h-0.5 transition-all duration-500 ${step > s.id ? 'bg-neon-blue' : 'bg-white/10'}`} />
                        )}
                    </div>
                ))}
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 rounded-2xl min-h-[400px] flex flex-col"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">{steps[step - 1].title}</h2>

                    <div className="flex-1">
                        {steps[step - 1].content}
                    </div>

                    <div className="flex justify-between mt-8 pt-8 border-t border-white/5">
                        <button
                            onClick={() => setStep(s => Math.max(1, s - 1))}
                            disabled={step === 1}
                            className={`px-6 py-3 rounded-xl font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white'}`}
                        >
                            Back
                        </button>

                        {step < steps.length ? (
                            <button
                                onClick={() => setStep(s => Math.min(steps.length, s + 1))}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleCreate}
                                disabled={loading}
                                className="px-8 py-3 bg-neon-blue text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] rounded-xl font-bold transition-all flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Check className="w-5 h-5" /> Launch Trip</>}
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
