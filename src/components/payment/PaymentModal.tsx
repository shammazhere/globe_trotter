'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { X, CreditCard, Lock, Check } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    // Card Details State
    const [cardNum, setCardNum] = useState('');
    const [holder, setHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-[#0a0a10] w-full max-w-lg rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden pointer-events-auto relative">
                            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">Secure Payment</h2>

                                {success ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center"
                                        >
                                            <Check className="w-10 h-10" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold">Payment Successful!</h3>
                                    </div>
                                ) : (
                                    <>
                                        {/* 3D Card Container */}
                                        <div className="perspective-1000 w-full h-[220px] mb-8 relative cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                                            <motion.div
                                                initial={false}
                                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                                                className="w-full h-full preserve-3d relative"
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {/* Front */}
                                                <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-black border border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
                                                    {/* Holographic Effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                                    <div className="flex justify-between items-start">
                                                        <div className="flex gap-2 items-center">
                                                            <div className="w-8 h-8 rounded-full bg-white/20 blur-sm" />
                                                            <div className="w-8 h-8 rounded-full bg-white/10 -ml-4" />
                                                        </div>
                                                        <CreditCard className="text-white/50 w-6 h-6" />
                                                    </div>

                                                    <div className="space-y-4 relative z-10">
                                                        <p className="font-mono text-2xl tracking-widest text-shadow">{cardNum || '•••• •••• •••• ••••'}</p>
                                                        <div className="flex justify-between items-end">
                                                            <div>
                                                                <p className="text-xs text-gray-400 uppercase">Card Holder</p>
                                                                <p className="font-medium tracking-wide">{holder || 'YOUR NAME'}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs text-gray-400 uppercase">Expires</p>
                                                                <p className="font-medium tracking-wide">{expiry || 'MM/YY'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Back */}
                                                <div
                                                    className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-bl from-indigo-950 to-black border border-white/10 shadow-2xl overflow-hidden"
                                                    style={{ transform: 'rotateY(180deg)' }}
                                                >
                                                    <div className="w-full h-12 bg-black mt-6" />
                                                    <div className="p-6">
                                                        <div className="bg-white text-black p-2 rounded text-right font-mono font-bold tracking-widest mb-4">
                                                            {cvv || '•••'}
                                                        </div>
                                                        <p className="text-gray-400 text-xs text-center">
                                                            This is a secure encrypted transaction. CVV is required for verification.
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Form */}
                                        <div className="space-y-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Card Number"
                                                    maxLength={19}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-neon-blue transition-colors font-mono"
                                                    value={cardNum}
                                                    onChange={(e) => setCardNum(e.target.value)}
                                                    onFocus={() => setIsFlipped(false)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Card Holder"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-neon-blue transition-colors"
                                                    value={holder}
                                                    onChange={(e) => setHolder(e.target.value.toUpperCase())}
                                                    onFocus={() => setIsFlipped(false)}
                                                />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-neon-blue transition-colors text-center"
                                                        value={expiry}
                                                        onChange={(e) => setExpiry(e.target.value)}
                                                        onFocus={() => setIsFlipped(false)}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="CVV"
                                                        maxLength={3}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-neon-blue transition-colors text-center"
                                                        value={cvv}
                                                        onChange={(e) => setCvv(e.target.value)}
                                                        onFocus={() => setIsFlipped(true)}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                onClick={handlePay}
                                                className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2 relative overflow-hidden"
                                            >
                                                {processing ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                ) : (
                                                    <>
                                                        <Lock className="w-4 h-4" />
                                                        Pay $1,050.00
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
