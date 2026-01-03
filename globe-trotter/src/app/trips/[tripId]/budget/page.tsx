'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useState } from 'react';
import PaymentModal from '@/components/payment/PaymentModal';

const data = [
    { name: 'Flights', value: 400, color: '#00f3ff' },
    { name: 'Hotels', value: 300, color: '#bc13fe' },
    { name: 'Food', value: 200, color: '#ff00aa' },
    { name: 'Activities', value: 150, color: '#ffffff' },
];

export default function BudgetPage() {
    const [showPayment, setShowPayment] = useState(false);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Trip Budget</h1>
                    <p className="text-gray-400">Total Estimated: <span className="text-neon-blue font-bold text-xl">$1,050.00</span></p>
                </div>
                <button
                    onClick={() => setShowPayment(true)}
                    className="px-6 py-3 bg-neon-purple text-white rounded-xl font-bold shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:scale-105 transition-transform"
                >
                    Settle Expenses
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-8 rounded-3xl"
                >
                    <h2 className="text-xl font-bold mb-6">Expense Breakdown</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 flex-wrap">
                        {data.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm text-gray-300">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8 rounded-3xl"
                >
                    <h2 className="text-xl font-bold mb-6">Daily Spend Projection</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { day: 'Mon', amount: 120 }, { day: 'Tue', amount: 300 },
                                { day: 'Wed', amount: 150 }, { day: 'Thu', amount: 80 },
                                { day: 'Fri', amount: 200 }, { day: 'Sat', amount: 450 },
                                { day: 'Sun', amount: 100 },
                            ]}>
                                <XAxis dataKey="day" stroke="#666" axisLine={false} tickLine={false} />
                                <YAxis stroke="#666" axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Bar dataKey="amount" fill="#00f3ff" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
        </div>
    );
}
