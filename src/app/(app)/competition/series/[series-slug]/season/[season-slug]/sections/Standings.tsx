'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Entry, Media, Race } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Play, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface PointsStandingsProps {
    races: Race[];
    entries: Entry[];
}

interface ParticipantStanding {
    entryId: number;
    name: string;
    points: number;
    thumbnail?: string;
}

export default function PointsStandings({ races, entries }: PointsStandingsProps) {
    const [currentRound, setCurrentRound] = useState(0);
    const [isReplaying, setIsReplaying] = useState(false);

    const completedRaces = useMemo(() => {
        return races
            .filter(r => r.details?.status === 'completed')
            .sort((a, b) => {
                const dateA = a.details?.start_date ? new Date(a.details.start_date).getTime() : 0;
                const dateB = b.details?.start_date ? new Date(b.details.start_date).getTime() : 0;
                return dateA - dateB;
            });
    }, [races]);

    const standingsHistory = useMemo(() => {
        const history: ParticipantStanding[][] = [[]];
        const pointMap = new Map<string, ParticipantStanding>();

        completedRaces.forEach((race) => {
            const raceEntries = entries.filter(e => {
                const sessionId = typeof e.details.session === 'object' ? e.details.session?.id : e.details.session;
                return sessionId === race.id;
            });

            raceEntries.forEach(entry => {
                const entryName = entry.name;
                const pos = entry.details.finish_position;

                const pointsTable: Record<number, number> = { 1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1 };
                const pointsEarned = pos ? (pointsTable[pos] || 0) : 0;

                const existing = pointMap.get(entryName);
                if (existing) {
                    existing.points += pointsEarned;
                } else {
                    const thumb = (entry.assets?.thumbnail as Media)?.url;
                    pointMap.set(entryName, {
                        entryId: entry.id,
                        name: entryName,
                        points: pointsEarned,
                        thumbnail: thumb || `https://picsum.photos/seed/${entry.id}/100/100`
                    });
                }
            });

            const currentStandings = Array.from(pointMap.values())
                .sort((a, b) => b.points - a.points)
                .map(d => ({ ...d }));

            history.push(currentStandings);
        });

        return history;
    }, [completedRaces, entries]);

    useEffect(() => {
        if (isReplaying && currentRound < standingsHistory.length - 1) {
            const timer = setTimeout(() => setCurrentRound(prev => prev + 1), 600);
            return () => clearTimeout(timer);
        } else {
            setIsReplaying(false);
        }
    }, [isReplaying, currentRound, standingsHistory]);

    const activeStandings = standingsHistory[currentRound] || [];
    const maxPoints = Math.max(...(standingsHistory[standingsHistory.length - 1]?.map(d => d.points) || [1]), 1);

    return (
        <section className="bg-white py-24 font-sans text-zinc-950 border-t border-zinc-100">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12 mb-20">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                                Competition Metrics
                            </span>
                        </div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter italic text-zinc-900">Points Evolution</h2>
                    </div>

                    <div className="flex flex-col gap-6 lg:w-[400px] bg-zinc-50 p-6 border border-zinc-100">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Temporal Control</span>
                            <button
                                onClick={() => { setCurrentRound(0); setIsReplaying(true); }}
                                className="flex items-center gap-2 text-[10px] font-black text-zinc-900 uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                {isReplaying ? <RotateCcw size={12} className="animate-spin" /> : <Play size={12} />}
                                {isReplaying ? 'Resetting' : 'Play Evolution'}
                            </button>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={standingsHistory.length - 1}
                            value={currentRound}
                            onChange={(e) => setCurrentRound(parseInt(e.target.value))}
                            className="w-full h-1 bg-zinc-200 appearance-none cursor-pointer accent-zinc-900"
                        />
                        <div className="flex justify-between">
                            <span className="text-[10px] font-black text-zinc-400 tabular-nums">Round 00</span>
                            <span className="text-xs font-black text-zinc-900 uppercase italic">
                                Active Stage {currentRound.toString().padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-black text-zinc-400 tabular-nums">Round {standingsHistory.length - 1}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
                <div className="flex flex-col">
                    <AnimatePresence mode="popLayout">
                        {activeStandings.map((standing, index) => {
                            const percentage = (standing.points / maxPoints) * 100;

                            return (
                                <motion.div
                                    key={standing.name}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                    className="flex items-center gap-6 py-4 border-b border-zinc-100 group"
                                >
                                    <div className="w-12 shrink-0">
                                        <span className="text-2xl font-black italic text-zinc-200 group-hover:text-zinc-900 transition-colors tabular-nums">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    <div className="w-12 h-12 shrink-0 border border-zinc-200 p-0.5 bg-white overflow-hidden">
                                        <img src={standing.thumbnail} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    </div>

                                    <div className="w-64 shrink-0">
                                        <h4 className="text-sm font-black text-zinc-900 uppercase italic tracking-tight truncate">
                                            {standing.name}
                                        </h4>
                                    </div>

                                    <div className="flex-1 h-1.5 bg-zinc-100 relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 0.5, ease: "circOut" }}
                                            className="absolute inset-y-0 left-0 bg-zinc-900"
                                            style={{ backgroundColor: index === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                                        />
                                    </div>

                                    <div className="w-24 text-right flex flex-col">
                                        <span className="text-2xl font-black italic text-zinc-900 tabular-nums">
                                            {standing.points}
                                        </span>
                                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest text-right">Points</span>
                                    </div>

                                    <div className="w-8 flex justify-end">
                                        {index === 0 && <Award size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {activeStandings.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-zinc-100 text-zinc-300">
                            <span className="text-xs font-black uppercase tracking-widest">Data Stream Empty</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}