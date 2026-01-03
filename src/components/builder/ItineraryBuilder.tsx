'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Calendar, DollarSign, Trash2, ChevronDown, ChevronUp, Info, Activity } from 'lucide-react';

interface StopItem {
    id: string;
    title: string;
    description: string;
    cost: number;
    type: string;
}

interface StopSection {
    id: string;
    city: string;
    dateRange: string;
    budget: number;
    items: StopItem[];
    isExpanded: boolean;
}

export default function ItineraryBuilder() {
    const [sections, setSections] = useState<StopSection[]>([
        {
            id: '1',
            city: 'Tokyo, Japan',
            dateRange: 'Oct 12 - Oct 15',
            budget: 1200,
            isExpanded: true,
            items: [
                { id: 'i1', title: 'Shinjuku Hotel', description: 'Grace Hotel stay for 3 nights', cost: 450, type: 'Stay' },
                { id: 'i2', title: 'Shibuya Tour', description: 'Evening photography walk', cost: 100, type: 'Activity' }
            ]
        }
    ]);

    const addSection = () => {
        const newSection: StopSection = {
            id: Date.now().toString(),
            city: 'New Destination',
            dateRange: 'Select Dates',
            budget: 0,
            isExpanded: true,
            items: []
        };
        setSections([...sections, newSection]);
    };

    const addItem = (sectionId: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    items: [...s.items, { id: Date.now().toString(), title: '', description: '', cost: 0, type: 'Activity' }]
                };
            }
            return s;
        }));
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold">Build Itinerary</h1>
                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm">Preview</button>
                    <button className="px-6 py-2 bg-neon-blue text-black font-bold rounded-xl shadow-lg hover:shadow-neon-blue/20 transition-all text-sm">Save Plan</button>
                </div>
            </div>

            <div className="space-y-6">
                <AnimatePresence>
                    {sections.map((section, sIdx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card rounded-3xl border border-white/5 overflow-hidden transition-all shadow-2xl"
                        >
                            {/* Section Header (Screen 5 Card Style) */}
                            <div className="p-6 bg-white/5 flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-neon-blue/20 text-neon-blue flex items-center justify-center text-xs">Section {sIdx + 1}</div>
                                        <input
                                            value={section.city}
                                            onChange={(e) => {
                                                const newSections = [...sections];
                                                newSections[sIdx].city = e.target.value;
                                                setSections(newSections);
                                            }}
                                            className="bg-transparent border-b border-white/10 focus:border-neon-blue outline-none px-2 py-1 w-full"
                                        />
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Date Range</label>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Calendar className="w-4 h-4 text-neon-blue" />
                                                <input value={section.dateRange} className="bg-transparent text-sm active:outline-none focus:outline-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Budget Allocation</label>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <DollarSign className="w-4 h-4 text-neon-purple" />
                                                <input type="number" value={section.budget} className="bg-transparent text-sm active:outline-none focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => {
                                            const newSections = [...sections];
                                            newSections[sIdx].isExpanded = !newSections[sIdx].isExpanded;
                                            setSections(newSections);
                                        }}
                                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                                    >
                                        {section.isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                                    </button>
                                    <button
                                        onClick={() => setSections(sections.filter(s => s.id !== section.id))}
                                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Section Items (Screen 5 Detailed Info) */}
                            <AnimatePresence>
                                {section.isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-white/5 p-6 space-y-4"
                                    >
                                        <p className="text-xs text-gray-500 italic flex items-center gap-2">
                                            <Info className="w-3 h-3" /> All necessary information about this section (travel, hotel, activity).
                                        </p>

                                        {section.items.map((item, iIdx) => (
                                            <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group">
                                                <div className="flex-1 space-y-2">
                                                    <input
                                                        placeholder="Activity Title..."
                                                        className="bg-transparent font-bold text-lg w-full outline-none focus:text-neon-blue"
                                                        value={item.title}
                                                    />
                                                    <input
                                                        placeholder="Short description..."
                                                        className="bg-transparent text-sm w-full outline-none text-gray-400"
                                                        value={item.description}
                                                    />
                                                </div>
                                                <div className="w-32">
                                                    <label className="text-[10px] text-gray-500 uppercase font-bold">Cost</label>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-gray-500">$</span>
                                                        <input type="number" className="bg-transparent font-mono outline-none w-full" value={item.cost} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => addItem(section.id)}
                                            className="w-full py-4 rounded-2xl border-2 border-dashed border-white/5 hover:border-neon-blue/30 text-gray-500 hover:text-neon-blue transition-all flex items-center justify-center gap-2 font-medium"
                                        >
                                            <Plus className="w-4 h-4" /> Add Activity/Stay to This Section
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <button
                onClick={addSection}
                className="w-full glass-card p-12 rounded-3xl border-2 border-dashed border-white/10 hover:border-neon-blue/50 group transition-all flex flex-col items-center justify-center gap-4 cursor-pointer"
            >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-blue group-hover:text-black transition-all">
                    <Plus className="w-10 h-10" />
                </div>
                <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">Add another Section</span>
            </button>
        </div>
    );
}
