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
            <section className="py-24 md:py-32 font-sans border-t" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                <div className="px-4 sm:px-6 lg:px-10 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border flex items-center justify-center rotate-45 mb-6 sm:mb-8" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                        <div className="w-2 h-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_200 }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                        Archive Status: Empty
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                        No Regulations Found
                    </h2>
                    <p className="mt-4 text-[11px] font-bold uppercase max-w-xs leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                        The regulatory database for this series is currently empty or undergoing synchronization.
                    </p>
                </div>
            </section>
        );
    }

    const groupedRegulations = regulations.reduce((acc, reg) => {
        const type = reg.basics?.type || 'General Protocol';
        if (!acc[type]) acc[type] = [];
        acc[type].push(reg);
        return acc;
    }, {} as Record<string, Regulation[]>);

    return (
        <section className="py-24 md:py-32 font-sans" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}>
            <div className="px-4 sm:px-6 lg:px-10 mb-12 md:mb-16 lg:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 sm:w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                            Governance Framework
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                        Regulations
                    </h2>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 border p-3 sm:p-4" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100, backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-widest leading-none mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Total Articles</span>
                        <span className="text-xl sm:text-2xl font-black tabular-nums leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{regulations.length.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="w-[1px] h-6 sm:h-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100 }} />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-widest leading-none mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Active Revision</span>
                        <span className="text-xl sm:text-2xl font-black tabular-nums leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>v{regulations[0]?.basics?.version || '1.0'}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                {Object.entries(groupedRegulations).map(([type, items]) => (
                    <div key={type} className="mb-2">
                        <div className="px-4 sm:px-6 lg:px-10 py-3 border-y flex items-center justify-between" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50, borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>
                                {type}
                            </span>
                        </div>

                        {items.map((reg, regIndex) => {
                            const isOpen = expandedId === reg.id;
                            const doc = reg.basics?.document as Media;
                            const placeholderDoc = `https://picsum.photos/seed/doc-${reg.id}/400/600`;

                            return (
                                <div key={reg.id} className="border-b last:border-b-0" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                                    <button
                                        onClick={() => setExpandedId(isOpen ? null : reg.id)}
                                        className="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between group transition-all duration-200 text-left outline-none"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_50;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <div className="flex items-start gap-4 sm:gap-8">
                                            <span className="text-sm font-black tabular-nums mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                {(regIndex + 1).toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                        {reg.basics?.code || 'REG_REF'}
                                                    </span>
                                                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                                                        MOD_{reg.basics?.effective_date ? new Date(reg.basics.effective_date).getFullYear() : '2026'}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter transition-transform duration-200 group-hover:translate-x-2" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                    {reg.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between lg:justify-end gap-8 lg:gap-16 mt-6 lg:mt-0 w-full lg:w-auto">
                                            <div className="hidden lg:flex flex-col items-end">
                                                <span className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Enforcement Protocol</span>
                                                <span className="text-[10px] font-black uppercase italic border-b" style={{ color: DESIGN_SYSTEM.COLORS.BLACK, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                    {reg.basics?.enforcement || 'Manual Check'}
                                                </span>
                                            </div>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border rotate-45 transition-all duration-200"
                                                style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.BLACK;
                                                    e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.BLACK;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.ZINC_200;
                                                }}
                                            >
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" style={{ color: isOpen ? DESIGN_SYSTEM.COLORS.WHITE : DESIGN_SYSTEM.COLORS.ZINC_400 }}>
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
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}
                                            >
                                                <div className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                                    <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
                                                        <div className="space-y-3 sm:space-y-4">
                                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Briefing Notes</span>
                                                            <p className="text-sm sm:text-base font-medium leading-relaxed max-w-3xl" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}>
                                                                {reg.basics?.description || 'Regulatory parameters for this article are currently undergoing synchronization. Compliance is mandatory for all registered participants.'}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3 sm:gap-4">
                                                            <div className="px-3 sm:px-4 py-2 border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                                <span className="text-[8px] font-black uppercase block mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Effective Since</span>
                                                                <span className="text-[10px] sm:text-[11px] font-black tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{reg.basics?.effective_date ? new Date(reg.basics.effective_date).toLocaleDateString('en-GB') : '01.01.2026'}</span>
                                                            </div>
                                                            <div className="px-3 sm:px-4 py-2 border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                                <span className="text-[8px] font-black uppercase block mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Auth Level</span>
                                                                <span className="text-[10px] sm:text-[11px] font-black" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Supervisor Clearance</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-4 flex flex-col justify-end">
                                                        <a
                                                            href={doc?.url || placeholderDoc}
                                                            target="_blank"
                                                            className="flex items-center justify-between p-4 sm:p-6 transition-all duration-200"
                                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_700;
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.BLACK;
                                                            }}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>Technical Vault</span>
                                                                <span className="text-xs font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>Full Article PDF</span>
                                                            </div>
                                                            <div className="w-8 h-8 flex items-center justify-center border transition-colors duration-200" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_700 }}>
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
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