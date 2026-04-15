'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver, Media, Race } from '@/payload-types';
import { motion } from 'framer-motion';
import { ChevronRight, Flag, Layers, Trophy } from 'lucide-react';
import Image from 'next/image';

interface LatestResultsProps {
    races: Race[];
}

export default function LatestResults({ races }: LatestResultsProps) {
    const displayRaces = races.slice(0, 3);

    return (
        <section className="relative w-full py-24 md:py-40 overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.06 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 70% 30%, ${DESIGN_SYSTEM.COLORS.TERTIARY.GLOW} 0%, transparent 70%)` }}
            />

            <div className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED }} />

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
                <div className="flex flex-col mb-16 md:mb-24 relative">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <motion.div
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Flag size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </motion.div>
                        <motion.span
                            className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            whileHover={{ letterSpacing: "0.8em" }}
                        >
                            Archived Events
                        </motion.span>
                    </motion.div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <motion.h2
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none"
                        >
                            <motion.span
                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                whileHover={{ color: DESIGN_SYSTEM.COLORS.TERTIARY[500] }}
                            >
                                Latest
                            </motion.span>
                            <br />
                            <motion.span
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Results
                            </motion.span>
                        </motion.h2>
                        <motion.button
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-4 group pb-2 transition-all duration-300"
                            style={{ borderBottom: `2px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}
                        >
                            <motion.span
                                className="text-xs font-black uppercase italic tracking-widest transition-colors duration-300"
                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                Full Race Archive
                            </motion.span>
                            <ChevronRight size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200], borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                    {displayRaces.map((race, idx) => (
                        <ResultCard key={race.id} race={race} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ResultCard({ race, index }: { race: Race; index: number }) {
    const winner = race.details?.winner as Driver;
    const thumbnail = race.assets?.thumbnail as Media;
    const circuit = race.details?.circuit as Circuit;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="flex flex-col transition-all duration-500 cursor-pointer"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="relative aspect-[16/10] overflow-hidden group">
                <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                >
                    <Image
                        src={thumbnail?.url || `https://picsum.photos/seed/result-${race.id}/800/500`}
                        alt={race.name}
                        fill
                        className="object-cover"
                        style={{ filter: "grayscale(20%)" }}
                    />
                </motion.div>
                <motion.div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(45deg, ${DESIGN_SYSTEM.COLORS.PRIMARY.MUTED} 0%, transparent 60%)` }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    className="absolute top-0 left-0 h-full transition-all duration-300"
                    style={{ width: "4px", backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    whileHover={{ width: "8px" }}
                />
            </div>

            <div className="p-8 flex flex-col flex-1 space-y-8">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <motion.span
                            className="text-[10px] font-black uppercase tracking-widest"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        >
                            {race.details?.type?.replace('_', ' ') || 'RACE RESULT'}
                        </motion.span>
                        <motion.span
                            className="text-[10px] font-bold font-mono"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {race.details?.start_date ? new Date(race.details.start_date).getFullYear() : '----'}
                        </motion.span>
                    </div>
                    <motion.h3
                        className="text-2xl font-black uppercase italic tracking-tighter leading-tight transition-colors duration-300"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                        whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    >
                        {race.name}
                    </motion.h3>
                    <div className="flex items-center gap-2">
                        <Layers size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <motion.span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                            whileHover={{ color: DESIGN_SYSTEM.COLORS.TERTIARY[500] }}
                        >
                            {circuit?.name || 'TBA'}
                        </motion.span>
                    </div>
                </div>

                <motion.div
                    className="mt-auto p-5 flex flex-col gap-4 transition-all duration-300"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}
                    whileHover={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[50], borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[200] }}
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Trophy size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            </motion.div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Winner</span>
                        </div>
                        <motion.span
                            className="text-lg font-black uppercase italic"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                            whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        >
                            {winner ? `${winner.first_name} ${winner.last_name}` : 'Awaiting Confirmation'}
                        </motion.span>
                    </div>

                    {winner?.basics?.nickname && (
                        <div className="flex items-center gap-2">
                            <div className="h-px flex-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }} />
                            <motion.span
                                className="text-[9px] font-bold uppercase italic"
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                "{winner.basics.nickname}"
                            </motion.span>
                        </div>
                    )}
                </motion.div>

                <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Laps Completed</span>
                        <motion.span
                            className="text-sm font-black tabular-nums italic"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                            whileHover={{ scale: 1.1, color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        >
                            {race.details?.laps || '--'}
                        </motion.span>
                    </div>
                    <motion.div
                        whileHover={{ x: 8, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="size-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{ border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[200]}`, backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                    >
                        <ChevronRight size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}