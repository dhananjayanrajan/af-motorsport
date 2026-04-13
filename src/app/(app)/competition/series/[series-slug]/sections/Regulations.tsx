'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Regulation } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface RegulationsProps {
    regulations: Regulation[];
}

export default function Regulations({ regulations }: RegulationsProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    if (!regulations || regulations.length === 0) {
        return (
            <section className="bg-white py-32 font-sans border-t border-zinc-100">
                <div className="px-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 border border-zinc-100 flex items-center justify-center rotate-45 mb-8">
                        <div className="w-2 h-2 bg-zinc-200" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 mb-4">
                        Archive_Status: Null
                    </span>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-100">
                        No_Regulations_Found
                    </h2>
                    <p className="mt-4 text-[11px] font-bold uppercase text-zinc-400 max-w-xs leading-relaxed">
                        The regulatory database for this series is currently empty or undergoing a synchronization cycle.
                    </p>
                </div>
            </section>
        );
    }

    const groupedRegulations = regulations.reduce((acc, reg) => {
        const type = reg.basics?.type || 'General_Protocol';
        if (!acc[type]) acc[type] = [];
        acc[type].push(reg);
        return acc;
    }, {} as Record<string, Regulation[]>);

    return (
        <section className="bg-white py-32 font-sans">
            <div className="px-10 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            Governance_Framework
                        </span>
                    </div>
                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Regulations
                    </h2>
                </div>
                <div className="flex items-center gap-6 border border-zinc-100 p-4 bg-zinc-50/30">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest leading-none mb-1">Total_Articles</span>
                        <span className="text-2xl font-black tabular-nums leading-none">{regulations.length.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-zinc-100" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest leading-none mb-1">Active_Revision</span>
                        <span className="text-2xl font-black tabular-nums leading-none">v{regulations[0]?.basics?.version || '1.0'}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                {Object.entries(groupedRegulations).map(([type, items]) => (
                    <div key={type} className="mb-2">
                        <div className="px-10 py-3 bg-zinc-50 border-y border-zinc-100 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                                {type.replace(/\s+/g, '_')}
                            </span>
                        </div>

                        {items.map((reg, regIndex) => {
                            const isOpen = expandedId === reg.id;
                            const doc = reg.basics?.document as Media;
                            const placeholderDoc = `https://picsum.photos/seed/doc-${reg.id}/400/600`;

                            return (
                                <div key={reg.id} className="border-b border-zinc-100 last:border-b-0">
                                    <button
                                        onClick={() => setExpandedId(isOpen ? null : reg.id)}
                                        className="w-full px-10 py-10 flex flex-col md:flex-row md:items-center justify-between group hover:bg-zinc-50/50 transition-all text-left outline-none"
                                    >
                                        <div className="flex items-start gap-8">
                                            <span className="text-sm font-black tabular-nums text-zinc-200 mt-1">
                                                {(regIndex + 1).toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                        {reg.basics?.code || 'REG_REF'}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-zinc-300 uppercase tabular-nums">
                                                        MOD_{reg.basics?.effective_date ? new Date(reg.basics.effective_date).getFullYear() : '2026'}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black group-hover:translate-x-2 transition-transform">
                                                    {reg.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-16 mt-8 md:mt-0">
                                            <div className="hidden lg:flex flex-col items-end">
                                                <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest mb-1">Enforcement_Protocol</span>
                                                <span className="text-[10px] font-black text-black uppercase italic border-b border-zinc-200">
                                                    {reg.basics?.enforcement || 'Manual_Check'}
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 flex items-center justify-center border border-zinc-200 rotate-45 group-hover:bg-black group-hover:border-black transition-all">
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className={isOpen ? 'text-white' : 'text-zinc-400'}>
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-zinc-50/50"
                                            >
                                                <div className="px-10 pb-16 pt-4 grid grid-cols-1 md:grid-cols-12 gap-12">
                                                    <div className="md:col-span-8 flex flex-col gap-8">
                                                        <div className="space-y-4">
                                                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">Briefing_Notes</span>
                                                            <p className="text-base font-bold uppercase italic text-zinc-600 leading-relaxed max-w-3xl">
                                                                {reg.basics?.description || 'Regulatory parameters for this article are currently undergoing synchronization. Compliance is mandatory for all registered participants.'}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-4">
                                                            <div className="px-4 py-2 bg-white border border-zinc-200">
                                                                <span className="text-[8px] font-black text-zinc-300 uppercase block mb-1">Effective_Since</span>
                                                                <span className="text-[11px] font-black tabular-nums">{reg.basics?.effective_date ? new Date(reg.basics.effective_date).toLocaleDateString('en-GB') : '01.01.2026'}</span>
                                                            </div>
                                                            <div className="px-4 py-2 bg-white border border-zinc-200">
                                                                <span className="text-[8px] font-black text-zinc-300 uppercase block mb-1">Auth_Level</span>
                                                                <span className="text-[11px] font-black">SUPERVISOR_CLEARANCE</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="md:col-span-4 flex flex-col justify-end">
                                                        <a
                                                            href={doc?.url || placeholderDoc}
                                                            target="_blank"
                                                            className="flex items-center justify-between p-6 bg-black text-white group/dl hover:bg-zinc-800 transition-all"
                                                        >
                                                            <div className="flex flex-col">
                                                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Technical_Vault</span>
                                                                <span className="text-xs font-black uppercase italic">Full_Article_PDF</span>
                                                            </div>
                                                            <div className="w-8 h-8 flex items-center justify-center border border-zinc-700 group-hover/dl:border-white transition-colors">
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                                    <path d="M7 17l10-10M7 7h10v10" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
}