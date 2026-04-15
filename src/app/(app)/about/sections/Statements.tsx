'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Organization, Statement } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronRight, Fingerprint, Landmark, ShieldAlert, X, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface StatementsSectionProps {
    statements: Statement[];
}

export default function StatementsSection({ statements }: StatementsSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedStatement, setSelectedStatement] = useState<Statement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const fannedCount = 5;

    useEffect(() => {
        if (isHovered || selectedStatement || statements.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % statements.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [isHovered, selectedStatement, statements.length]);

    const palette = useMemo(() => [
        { bg: DESIGN_SYSTEM.COLORS.PRIMARY[500], text: DESIGN_SYSTEM.COLORS.BLACK[600], accent: DESIGN_SYSTEM.COLORS.BLACK[600], border: DESIGN_SYSTEM.COLORS.BLACK[600] },
        { bg: DESIGN_SYSTEM.COLORS.SECONDARY[500], text: DESIGN_SYSTEM.COLORS.BLACK[600], accent: DESIGN_SYSTEM.COLORS.BLACK[600], border: DESIGN_SYSTEM.COLORS.BLACK[600] },
        { bg: DESIGN_SYSTEM.COLORS.TERTIARY[500], text: DESIGN_SYSTEM.COLORS.WHITE[50], accent: DESIGN_SYSTEM.COLORS.WHITE[50], border: DESIGN_SYSTEM.COLORS.WHITE[50] },
        { bg: DESIGN_SYSTEM.COLORS.BLACK[600], text: DESIGN_SYSTEM.COLORS.PRIMARY[400], accent: DESIGN_SYSTEM.COLORS.PRIMARY[400], border: DESIGN_SYSTEM.COLORS.PRIMARY[500] },
        { bg: DESIGN_SYSTEM.COLORS.ZINC[100], text: DESIGN_SYSTEM.COLORS.BLACK[600], accent: DESIGN_SYSTEM.COLORS.TERTIARY[500], border: DESIGN_SYSTEM.COLORS.BLACK[600] },
    ], []);

    const getFannedCards = () => {
        const cards = [];
        for (let i = 0; i < fannedCount; i++) {
            const index = (currentIndex + i) % statements.length;
            const colorTheme = palette[index % palette.length];
            cards.push({ ...statements[index], fanPosition: i, colorTheme });
        }
        return cards;
    };

    if (!statements.length) return null;

    return (
        <section
            className="w-full py-40 border-t overflow-hidden min-h-screen flex flex-col justify-center relative"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50], borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
        >
            <div className="max-w-7xl mx-auto px-6 mb-40 w-full text-center">
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-[2px] w-16" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            Official Directives
                        </span>
                        <div className="h-[2px] w-16" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </motion.div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                        Statements
                    </h2>
                </div>
            </div>

            <div
                className="relative w-full flex items-center justify-center h-[700px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative w-[320px] h-[450px]">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {getFannedCards().map((statement) => {
                            const offset = statement.fanPosition - Math.floor(fannedCount / 2);
                            const isActive = offset === 0;

                            return (
                                <motion.div
                                    key={statement.id}
                                    layoutId={`statement-card-${statement.id}`}
                                    onClick={() => setSelectedStatement(statement)}
                                    className="absolute inset-0 cursor-pointer p-8 border-[3px] flex flex-col justify-between origin-bottom"
                                    style={{
                                        backgroundColor: statement.colorTheme.bg,
                                        borderColor: statement.colorTheme.border,
                                        zIndex: 100 - Math.abs(offset),
                                        boxShadow: `25px 25px 0px ${DESIGN_SYSTEM.COLORS.BLACK[600]}15`
                                    }}
                                    initial={{ opacity: 0, scale: 0.5, y: 100 }}
                                    animate={{
                                        opacity: 1,
                                        x: offset * 160,
                                        y: Math.abs(offset) * 45,
                                        rotate: offset * 18,
                                        scale: isActive ? 1.05 : 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -500,
                                        rotate: -90,
                                        transition: { duration: 0.4, ease: "anticipate" }
                                    }}
                                    whileHover={{
                                        y: (Math.abs(offset) * 45) - 100,
                                        scale: 1.1,
                                        rotate: offset * 8,
                                        zIndex: 200,
                                        transition: { type: 'spring', stiffness: 350, damping: 20 }
                                    }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex justify-between items-center">
                                            <div className="w-8 h-8 border-2 flex items-center justify-center" style={{ borderColor: statement.colorTheme.accent }}>
                                                <Fingerprint size={16} style={{ color: statement.colorTheme.accent }} />
                                            </div>
                                            <span className="text-[10px] font-black italic tabular-nums" style={{ color: statement.colorTheme.text, opacity: 0.5 }}>
                                                ID_{String(statement.id).padStart(3, '0')}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: statement.colorTheme.text, opacity: 0.7 }}>
                                                {(statement.basics?.authority as Organization)?.name || 'Central Authority'}
                                            </span>
                                            <h3 className="text-2xl font-black uppercase italic leading-[0.9] tracking-tighter" style={{ color: statement.colorTheme.text }}>
                                                {statement.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="h-[1px] w-full" style={{ backgroundColor: statement.colorTheme.text, opacity: 0.2 }} />
                                        <div className="flex items-center justify-between">
                                            <span className="text-[12px] font-black tabular-nums" style={{ color: statement.colorTheme.text }}>
                                                {statement.basics?.issued_date ? new Date(statement.basics.issued_date).getFullYear() : '2026'}
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[8px] font-black uppercase tracking-tighter" style={{ color: statement.colorTheme.text }}>View</span>
                                                <ChevronRight size={14} strokeWidth={4} style={{ color: statement.colorTheme.text }} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {selectedStatement && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStatement(null)}
                            className="fixed inset-0 z-[300] cursor-zoom-out"
                            style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}E6`, backdropFilter: 'blur(8px)' }}
                        />
                        <motion.div
                            layoutId={`statement-card-${selectedStatement.id}`}
                            className="fixed inset-0 m-auto z-[301] w-[92%] max-w-5xl h-fit max-h-[85vh] overflow-hidden flex flex-col border-[3px]"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                                borderColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                boxShadow: `40px 40px 0px ${DESIGN_SYSTEM.COLORS.BLACK[600]}20`
                            }}
                        >
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="w-full md:w-[35%] p-10 md:p-14 flex flex-col justify-between border-b-[3px] md:border-b-0 md:border-r-[3px]" style={{
                                    borderColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                    backgroundColor: (selectedStatement as any).colorTheme?.bg || DESIGN_SYSTEM.COLORS.PRIMARY[500]
                                }}>
                                    <div className="space-y-8">
                                        <div className="inline-flex items-center gap-2 px-3 py-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            <Zap size={12} fill={DESIGN_SYSTEM.COLORS.SECONDARY[500]} style={{ color: DESIGN_SYSTEM.COLORS.SECONDARY[500] }} />
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>Priority Alpha</span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-[0.85]" style={{ color: (selectedStatement as any).colorTheme?.text || DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            {selectedStatement.name}
                                        </h2>
                                    </div>

                                    <div className="mt-16 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[2px]" style={{ backgroundColor: (selectedStatement as any).colorTheme?.text || DESIGN_SYSTEM.COLORS.BLACK[600] }} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: (selectedStatement as any).colorTheme?.text || DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                Verified Directive
                                            </span>
                                        </div>
                                        <p className="text-[11px] font-bold uppercase leading-tight opacity-80 max-w-[200px]" style={{ color: (selectedStatement as any).colorTheme?.text || DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            Authenticity secured via digital fingerprinting. Unauthorized replication is prohibited.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-1 p-10 md:p-14 flex flex-col overflow-y-auto relative" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                                    <button
                                        onClick={() => setSelectedStatement(null)}
                                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border-2 transition-all z-10"
                                        style={{
                                            borderColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                            backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50]
                                        }}
                                    >
                                        <X size={20} strokeWidth={3} style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
                                    </button>

                                    <div className="flex flex-wrap gap-10 mb-12">
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Issuer Authority</span>
                                            <div className="flex items-center gap-2">
                                                <Landmark size={14} strokeWidth={3} style={{ color: DESIGN_SYSTEM.COLORS.TERTIARY[500] }} />
                                                <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    {(selectedStatement.basics?.authority as Organization)?.name || 'HQ'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Release Cycle</span>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} strokeWidth={3} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <p className="text-sm font-black tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    {selectedStatement.basics?.issued_date ? new Date(selectedStatement.basics.issued_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '2026'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mb-12">
                                        <div className="absolute -left-6 top-0 bottom-0 w-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }} />
                                        <p className="text-sm md:text-xl font-black italic leading-snug tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            {selectedStatement.basics?.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-8 border-t-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 border-2 flex items-center justify-center" style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK[600], backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50] }}>
                                                <ShieldAlert size={18} strokeWidth={3} style={{ color: DESIGN_SYSTEM.COLORS.TERTIARY[500] }} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Classification</span>
                                                <span className="text-xs font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Unrestricted Access</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedStatement(null)}
                                            className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                                color: DESIGN_SYSTEM.COLORS.WHITE[50]
                                            }}
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}