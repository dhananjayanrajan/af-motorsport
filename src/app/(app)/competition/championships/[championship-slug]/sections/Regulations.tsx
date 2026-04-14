'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Regulation } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ChevronDown, FileText, Gauge, Landmark, Scale, ShieldCheck, Tv } from 'lucide-react';
import { useState } from 'react';

interface RegulationsProps {
    regulations: Regulation[];
}

const getIcon = (type: string | null | undefined) => {
    switch (type) {
        case 'Sporting & Competition': return <Activity size={18} />;
        case 'Technical & Engineering': return <Gauge size={18} />;
        case 'Financial & Budgetary': return <Landmark size={18} />;
        case 'Safety & Medical': return <ShieldCheck size={18} />;
        case 'Judicial & Disciplinary': return <Scale size={18} />;
        case 'Commercial & Media': return <Tv size={18} />;
        default: return <FileText size={18} />;
    }
};

export default function Regulations({ regulations }: RegulationsProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section className="w-full py-32 bg-white">
            <div className="max-w-7xl mx-auto px-10">
                <div className="flex flex-col mb-16">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-400 mb-2">Governance</span>
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic text-black">Championship Regulations</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {regulations.map((reg) => (
                        <div
                            key={reg.id}
                            className="border border-zinc-200 bg-white overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => setExpandedId(expandedId === reg.id ? null : reg.id)}
                                className="w-full flex flex-col md:flex-row md:items-center justify-between p-8 text-left hover:bg-zinc-50 transition-colors"
                            >
                                <div className="flex items-center gap-6">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center text-black"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                    >
                                        {getIcon(reg.basics?.type)}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                                {reg.basics?.code || 'REG-CORE'}
                                            </span>
                                            <span className="w-1 h-1 bg-zinc-300 rotate-45" />
                                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                {reg.basics?.type}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black uppercase italic text-black leading-none">
                                            {reg.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 mt-6 md:mt-0">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Enforcement</span>
                                        <span className="text-xs font-bold text-black uppercase">{reg.basics?.enforcement || 'Standard'}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Version</span>
                                        <span className="text-xs font-bold text-black tabular-nums">v{reg.basics?.version || '1.0'}</span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedId === reg.id ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-zinc-300"
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {expandedId === reg.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="px-8 pb-8 pt-0 border-t border-zinc-100 mt-2">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
                                                <div className="md:col-span-8">
                                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 block">Provision Details</span>
                                                    <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                                                        {reg.basics?.description || 'Official regulation documentation for the current championship season.'}
                                                    </p>
                                                </div>
                                                <div className="md:col-span-4 flex flex-col gap-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Effective Date</span>
                                                        <span className="text-sm font-bold text-black uppercase tabular-nums">
                                                            {reg.basics?.effective_date ? new Date(reg.basics.effective_date).toLocaleDateString() : 'Immediate'}
                                                        </span>
                                                    </div>
                                                    <button
                                                        className="flex items-center justify-center gap-3 py-4 px-6 border-2 border-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-200"
                                                    >
                                                        <FileText size={14} />
                                                        Download PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}