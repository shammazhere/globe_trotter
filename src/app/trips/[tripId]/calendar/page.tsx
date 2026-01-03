'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin } from 'lucide-react';

export default function CalendarViewPage() {
    const [currentDate] = useState(new Date(2026, 9, 1)); // October 2026

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const startOffset = 4; // Start on Thursday

    const events = [
        { day: 12, title: 'Arrival - Tokyo', type: 'Arrival', color: 'bg-neon-blue' },
        { day: 13, title: 'Shibuya Tour', type: 'Activity', color: 'bg-neon-purple' },
        { day: 14, title: 'Akihabara', type: 'Activity', color: 'bg-neon-purple' },
        { day: 15, title: 'Check-out', type: 'Departure', color: 'bg-red-400' },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            {/* Calendar Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <CalendarIcon className="text-neon-blue" />
                    Trip Timeline
                </h1>
                <div className="flex bg-white/5 border border-white/5 rounded-2xl p-2 gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-xl transition-all"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="px-4 py-2 font-bold select-none">October 2026</span>
                    <button className="p-2 hover:bg-white/10 rounded-xl transition-all"><ChevronRight className="w-5 h-5" /></button>
                </div>
            </div>

            {/* Calendar Grid (Screen 11 Style) */}
            <div className="glass-card rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="grid grid-cols-7 bg-white/5 border-b border-white/5">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="py-4 text-center text-[10px] font-bold tracking-widest text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 min-h-[600px]">
                    {/* Padding for month start */}
                    {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="border-r border-b border-white/5 bg-white/[0.02]" />
                    ))}

                    {/* Actual Days */}
                    {days.map(day => {
                        const event = events.find(e => e.day === day);
                        return (
                            <div key={day} className="border-r border-b border-white/5 p-4 min-h-[120px] relative group hover:bg-white/[0.03] transition-colors">
                                <span className={`text-sm font-bold ${day === 12 ? 'text-neon-blue' : 'text-gray-400'}`}>{day}</span>

                                {event && (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className={`mt-2 p-2 rounded-lg ${event.color} text-black text-[10px] font-bold shadow-lg cursor-pointer transform hover:scale-105 transition-transform`}
                                    >
                                        <div className="truncate">{event.title}</div>
                                        <div className="flex items-center gap-1 mt-1 opacity-70">
                                            <MapPin className="w-2 h-2" /> Tokyo
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend / Quick Actions */}
            <div className="flex gap-6 justify-center">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-3 h-3 rounded-full bg-neon-blue" /> Flight / Arrival
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-3 h-3 rounded-full bg-neon-purple" /> Activities
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-3 h-3 rounded-full bg-red-400" /> Hotel / Check-out
                </div>
            </div>
        </div>
    );
}
