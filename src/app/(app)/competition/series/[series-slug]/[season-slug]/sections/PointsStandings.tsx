'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Driver, Entry, Media, Race } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

interface PointsStandingsProps {
    races: Race[];
    entries: Entry[];
}

interface DriverStanding {
    driverId: number;
    driver: Driver;
    points: number;
    history: number[];
}

export default function PointsStandings({ races, entries }: PointsStandingsProps) {
    const [currentRound, setCurrentRound] = useState(0);
    const [isReplaying, setIsReplaying] = useState(false);

    // Filter completed races and sort chronologically
    const completedRaces = useMemo(() => {
        return races
            .filter(r => r.details.status === 'completed')
            .sort((a, b) => new Date(a.details.start_date!).getTime() - new Date(b.details.start_date!).getTime());
    }, [races]);

    // Calculate standings evolution per round
    const standingsHistory = useMemo(() => {
        const history: DriverStanding[][] = [[]]; // Initial state (Round 0)
        const driverMap = new Map<number, DriverStanding>();

        completedRaces.forEach((race, roundIndex) => {
            // In a real scenario, you'd fetch results for this specific race
            // Here we simulate by checking entries associated with this race's session
            const raceEntries = entries.filter(e =>
                (typeof e.details.session === 'number' ? e.details.session : e.details.session?.id) === race.id
            );

            raceEntries.forEach(entry => {
                const driver = (entry as any).driver as Driver; // Adjusted for your schema
                if (!driver) return;

                const driverId = driver.id;
                // Calculate points based on finish position (Simulated F1 points)
                const pos = entry.details.finish_position;
                const pointsTable: Record<number, number> = { 1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1 };
                const pointsEarned = pos ? (pointsTable[pos] || 0) : 0;

                const existing = driverMap.get(driverId);
                if (existing) {
                    existing.points += pointsEarned;
                    existing.history.push(existing.points);
                } else {
                    const newStanding: DriverStanding = {
                        driverId,
                        driver,
                        points: pointsEarned,
                        history: new Array(roundIndex).fill(0).concat([pointsEarned])
                    };
                    driverMap.set(driverId, newStanding);
                }
            });

            // Normalize history for drivers who might have missed earlier rounds
            driverMap.forEach(d => {
                if (d.history.length <= roundIndex) {
                    d.history.push(d.points);
                }
            });

            const currentStandings = Array.from(driverMap.values())
                .sort((a, b) => b.points - a.points)
                .map(d => ({ ...d }));

            history.push(currentStandings);
        });

        return history;
    }, [completedRaces, entries]);

    useEffect(() => {
        if (isReplaying && currentRound < standingsHistory.length - 1) {
            const timer = setTimeout(() => setCurrentRound(prev => prev + 1), 800);
            return () => clearTimeout(timer);
        } else {
            setIsReplaying(false);
        }
    }, [isReplaying, currentRound, standingsHistory]);

    const activeStandings = standingsHistory[currentRound] || [];
    const maxPoints = Math.max(...standingsHistory[standingsHistory.length - 1]?.map(d => d.points) || [100], 1);

    return (
        <section className="bg-zinc-950 py-32 font-sans overflow-hidden">
            <div className="px-10 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                            Championship_Metrics
                        </span>
                    </div>
                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-white leading-none">
                        Standings
                    </h2>
                </div>

                <div className="flex flex-col gap-6 min-w-[300px]">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Temporal_Scrub</span>
                        <button
                            onClick={() => { setCurrentRound(0); setIsReplaying(true); }}
                            className="text-[9px] font-black text-white uppercase tracking-widest border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-colors"
                        >
                            {isReplaying ? 'Replaying...' : 'Replay_Evolution'}
                        </button>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={standingsHistory.length - 1}
                        value={currentRound}
                        onChange={(e) => setCurrentRound(parseInt(e.target.value))}
                        className="w-full accent-primary appearance-none bg-zinc-800 h-1 cursor-pointer"
                        style={{ accentColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                    />
                    <div className="flex justify-between">
                        <span className="text-xs font-black text-white tabular-nums">R_00</span>
                        <span className="text-xs font-black text-primary uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                            Round_{currentRound.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-black text-white tabular-nums">R_{standingsHistory.length - 1}</span>
                    </div>
                </div>
            </div>

            <div className="px-10 flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                    {activeStandings.map((standing, index) => {
                        const driverAvatar = (standing.driver?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/driver-${standing.driverId}/100/100`;
                        const firstName = (standing.driver as any)?.basics?.first_name || '';
                        const lastName = (standing.driver as any)?.basics?.last_name || 'Driver';

                        return (
                            <motion.div
                                key={standing.driverId}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative flex items-center gap-6 h-16 group"
                            >
                                <div className="w-8 flex-none">
                                    <span className="text-xl font-black italic text-zinc-700 tabular-nums">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="w-10 h-10 flex-none bg-zinc-900 overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/5">
                                    <img src={driverAvatar} alt="" className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-none w-48 hidden md:block">
                                    <h4 className="text-sm font-black text-white uppercase italic tracking-tight truncate">
                                        <span className="text-zinc-500 mr-2">{firstName[0]}.</span>
                                        {lastName}
                                    </h4>
                                </div>

                                <div className="flex-1 relative h-6 bg-zinc-900/50">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(standing.points / maxPoints) * 100}%` }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-y-0 left-0 bg-white group-hover:bg-primary transition-colors"
                                        style={{ backgroundColor: index === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                                    >
                                        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/20" />
                                    </motion.div>
                                </div>

                                <div className="w-20 text-right">
                                    <span className="text-xl font-black italic text-white tabular-nums">
                                        {standing.points}
                                    </span>
                                    <span className="text-[8px] font-black text-zinc-600 ml-1 uppercase">pts</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {activeStandings.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-zinc-800 mx-10">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">Evolution_Data_Null</span>
                </div>
            )}
        </section>
    );
}