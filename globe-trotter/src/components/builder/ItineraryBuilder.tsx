'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Calendar, DollarSign, Trash2, ChevronDown, ChevronUp, Info, Activity, Save, Globe } from 'lucide-react';

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

    const updateItem = (sectionId: string, itemId: string, field: keyof StopItem, value: string | number) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    items: s.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
                };
            }
            return s;
        }));
    };

    const removeItem = (sectionId: string, itemId: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    items: s.items.filter(item => item.id !== itemId)
                };
            }
            return s;
        }));
    };

    return (
        <div className="p-4 md:p-8 space-y-8 md:space-y-12 pb-32 max-w-5xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">Project Architecture</span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mt-2">Builder <span className="text-white/20">Protocol</span></h1>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-[#161b22] border border-white/10 rounded-xl hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest text-white/40">Preview</button>
                    <button className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Save Sequence
                    </button>
                </div>
            </header>

            <div className="space-y-6">
                <AnimatePresence>
                    {sections.map((section, sIdx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0a0f18] rounded-[2rem] md:rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl"
                        >
                            {/* Section Header */}
                            <div className="p-6 md:p-8 bg-white/2 flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center text-xs font-black border border-blue-500/20">0{sIdx + 1}</div>
                                        <input
                                            value={section.city}
                                            onChange={(e) => {
                                                const newSections = [...sections];
                                                newSections[sIdx].city = e.target.value;
                                                setSections(newSections);
                                            }}
                                            className="bg-transparent text-xl md:text-2xl font-black tracking-tight text-white focus:outline-none w-full placeholder:text-white/10"
                                            placeholder="Assign Destination..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-white/20 font-bold ml-1">Timeline Sequence</label>
                                            <div className="flex items-center gap-3 bg-[#161b22] p-4 rounded-xl border border-white/5 group-focus-within:border-blue-500/50 transition-all">
                                                <Calendar className="w-4 h-4 text-blue-500" />
                                                <input value={section.dateRange} onChange={(e) => {
                                                    const newSections = [...sections];
                                                    newSections[sIdx].dateRange = e.target.value;
                                                    setSections(newSections);
                                                }} className="bg-transparent text-sm text-white focus:outline-none w-full" placeholder="Oct 12 — Oct 15" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-white/20 font-bold ml-1">Resource allocation</label>
                                            <div className="flex items-center gap-3 bg-[#161b22] p-4 rounded-xl border border-white/5 group-focus-within:border-purple-500/50 transition-all">
                                                <DollarSign className="w-4 h-4 text-purple-500" />
                                                <input type="number" value={section.budget} onChange={(e) => {
                                                    const newSections = [...sections];
                                                    newSections[sIdx].budget = parseInt(e.target.value) || 0;
                                                    setSections(newSections);
                                                }} className="bg-transparent text-sm text-white focus:outline-none w-full font-mono" placeholder="0.00" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:flex-col items-center justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            const newSections = [...sections];
                                            newSections[sIdx].isExpanded = !newSections[sIdx].isExpanded;
                                            setSections(newSections);
                                        }}
                                        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/40"
                                    >
                                        {section.isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                                    </button>
                                    <button
                                        onClick={() => setSections(sections.filter(s => s.id !== section.id))}
                                        className="p-4 rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Section Items */}
                            <AnimatePresence>
                                {section.isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-white/5 p-6 md:p-8 space-y-4"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Info className="w-3 h-3 text-blue-500" />
                                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Itinerary Components</p>
                                        </div>

                                        <div className="space-y-3">
                                            {section.items.map((item) => (
                                                <div key={item.id} className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-[#0d121b] border border-white/5 group hover:border-blue-500/20 transition-all">
                                                    <div className="flex-1 space-y-3">
                                                        <div className="relative">
                                                            <input
                                                                placeholder="Node Title (e.g. Hotel Check-in)"
                                                                className="bg-transparent font-black text-lg w-full outline-none focus:text-blue-400 text-white placeholder:text-white/10"
                                                                value={item.title}
                                                                onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                placeholder="Telemetry details..."
                                                                className="bg-transparent text-sm w-full outline-none text-white/40 font-medium placeholder:text-white/5"
                                                                value={item.description}
                                                                onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between md:justify-end gap-6 md:w-64">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                                                                <span className="text-[10px] font-bold text-white/20">$</span>
                                                                <input
                                                                    type="number"
                                                                    className="bg-transparent font-bold text-white outline-none w-full text-right font-mono"
                                                                    value={item.cost}
                                                                    onChange={(e) => updateItem(section.id, item.id, 'cost', parseInt(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(section.id, item.id)}
                                                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => addItem(section.id)}
                                            className="w-full py-5 rounded-2xl border-2 border-dashed border-white/5 hover:border-blue-500/30 text-white/20 hover:text-blue-500 transition-all flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest"
                                        >
                                            <Plus className="w-5 h-5" /> Integrate New Node
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
                className="w-full h-40 md:h-64 rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-blue-500/40 group transition-all flex flex-col items-center justify-center gap-4 bg-white/1"
            >
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xl">
                    <Plus className="w-8 h-8 md:w-12 md:h-12" />
                </div>
                <div className="text-center">
                    <p className="text-xl font-black text-white/20 group-hover:text-white transition-colors">Append Destination Sequence</p>
                    <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em] mt-1 group-hover:text-blue-500 transition-colors">Expand Itinerary Matrix</p>
                </div>
            </button>
        </div>
    );
}
