'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Driver, Media, Race } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface ChampionshipStandingsProps {
    championship: Championship;
    races?: Race[];
}

interface StandingEntry {
    position: number;
    driver: Driver;
    points: number;
    trend?: number[];
}

export default function ChampionshipStandings({ championship, races = [] }: ChampionshipStandingsProps) {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const championshipName = championship.name || 'Championship Standings';
    const championshipCode = championship.basics?.identifiers?.code || championship.basics?.identifiers?.abbreviation || `CH${championship.id}`;

    const standings = useMemo(() => {
        if (!races.length) return [];

        const driverPoints = new Map<string, { driver: Driver; points: number; racePoints: number[] }>();

        races.forEach(race => {
            const results = (race.details as any)?.results;
            if (!results) return;

            results.forEach((result: any) => {
                const driver = result.driver as Driver;
                const points = result.points || 0;

                if (!driver) return;

                const driverId = driver.id.toString();
                const existing = driverPoints.get(driverId);

                if (existing) {
                    existing.points += points;
                    existing.racePoints.push(points);
                } else {
                    driverPoints.set(driverId, {
                        driver,
                        points,
                        racePoints: [points]
                    });
                }
            });
        });

        const sortedStandings = Array.from(driverPoints.values())
            .sort((a, b) => b.points - a.points)
            .map((entry, index) => ({
                position: index + 1,
                driver: entry.driver,
                points: entry.points,
                trend: entry.racePoints.slice(-8)
            }));

        return sortedStandings;
    }, [races]);

    const maxPoints = standings.length > 0
        ? Math.max(...standings.map(s => s.points))
        : 280;

    if (standings.length === 0) {
        return (
            <section className="bg-white py-32 border-y border-zinc-200 font-sans">
                <div className="px-10 mb-20">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-1.5 h-6"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                            />
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">
                                Live Standings
                            </span>
                        </div>
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
                            {championshipName}
                        </h2>
                    </div>
                    <div className="mt-12 text-center py-20">
                        <p className="text-zinc-500 font-medium">No race results available</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-32 border-y border-zinc-200 font-sans">
            <div className="px-10 mb-20 flex items-end justify-between">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-1.5 h-6"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600">
                            Live Standings
                        </span>
                    </div>
                    <h2 className="text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
                        {championshipName}
                    </h2>
                    {championship.basics?.tagline && (
                        <p className="text-sm text-zinc-600 uppercase tracking-wide mt-2">
                            {championship.basics.tagline}
                        </p>
                    )}
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest tabular-nums">
                        {championshipCode}
                    </span>
                </div>
            </div>

            <div className="flex flex-col border-t border-zinc-200">
                {standings.map((standing, index) => {
                    const isExpanded = expandedRow === index;
                    const progressWidth = maxPoints > 0 ? (standing.points / maxPoints) * 100 : 0;
                    const driver = standing.driver;
                    const driverName = driver ? `${driver.first_name || ''} ${driver.last_name || ''}`.trim() : 'Unknown Driver';
                    const driverAvatar = (driver?.assets?.avatar as Media)?.url;
                    const teamName = (driver?.details as any)?.current_team?.name || 'Independent';
                    const gapToLeader = index === 0 ? 'Leader' : `-${standings[0].points - standing.points} pts`;

                    return (
                        <div key={`standing-${driver.id}`} className="border-b border-zinc-200">
                            <button
                                onClick={() => setExpandedRow(isExpanded ? null : index)}
                                className="w-full h-24 relative flex items-center px-10 group overflow-hidden text-left outline-none transition-colors duration-200 hover:bg-zinc-50"
                            >
                                <div
                                    className="absolute left-0 top-0 h-full opacity-10 pointer-events-none"
                                    style={{
                                        width: `${progressWidth}%`,
                                        backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY
                                    }}
                                />

                                <div className="relative z-10 w-full grid grid-cols-12 items-center gap-8">
                                    <div className="col-span-1">
                                        <span className={`text-3xl font-black italic tabular-nums transition-colors duration-200 ${isExpanded ? 'text-black' : 'text-zinc-300 group-hover:text-zinc-500'}`}>
                                            {standing.position.toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    <div className="col-span-1">
                                        <div className="w-16 h-16 bg-zinc-100 border border-zinc-200 relative overflow-hidden">
                                            {driverAvatar ? (
                                                <img
                                                    src={driverAvatar}
                                                    className="w-full h-full object-cover grayscale"
                                                    alt={driverName}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-zinc-200">
                                                    <span className="text-zinc-500 text-xs font-black">
                                                        {driver?.last_name?.charAt(0) || driver?.first_name?.charAt(0) || '?'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-span-6 flex flex-col justify-center">
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-xl font-black uppercase italic tracking-tight text-black">
                                                {driverName}
                                            </span>
                                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                                #{standing.position}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <div
                                                className="w-2.5 h-1.5 rotate-45"
                                                style={{ backgroundColor: isExpanded ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_300 }}
                                            />
                                            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
                                                {teamName}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-right">
                                        <div className="flex items-baseline justify-end gap-2">
                                            <span className="text-3xl font-black text-black tabular-nums tracking-tighter">
                                                {standing.points}
                                            </span>
                                            <span className="text-[10px] font-black text-zinc-600 uppercase">pts</span>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <span className="text-[11px] font-black text-zinc-600 tabular-nums uppercase tracking-tighter">
                                                {gapToLeader}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                className="w-4 h-4 flex items-center justify-center"
                                            >
                                                <div className="w-1.5 h-1.5 border-r border-b border-zinc-500 rotate-45" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && driver && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 220, opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="bg-zinc-50 overflow-hidden"
                                    >
                                        <div className="px-10 py-12 h-full flex gap-20">
                                            <div className="flex flex-col justify-between py-2">
                                                <div>
                                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-1">Driver Profile</p>
                                                    <h4 className="text-lg font-black text-black uppercase italic">
                                                        {driver.last_name?.toUpperCase() || driver.first_name?.toUpperCase() || 'DRIVER'}
                                                    </h4>
                                                </div>
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div>
                                                        <p className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Position</p>
                                                        <p className="text-sm font-black text-black">
                                                            P{standing.position}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Points</p>
                                                        <p className="text-sm font-black text-black">
                                                            {standing.points}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col justify-end">
                                                {standing.trend && standing.trend.length > 0 ? (
                                                    <>
                                                        <div className="flex items-end gap-2 h-24">
                                                            {standing.trend.map((val, idx) => {
                                                                const maxTrendValue = Math.max(...standing.trend, 1);
                                                                return (
                                                                    <div key={idx} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                                                                        <motion.div
                                                                            initial={{ scaleY: 0 }}
                                                                            animate={{ scaleY: 1 }}
                                                                            className="w-full transition-colors duration-200 group-hover/bar:bg-black"
                                                                            style={{
                                                                                height: `${(val / maxTrendValue) * 100}%`,
                                                                                backgroundColor: idx === standing.trend.length - 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_300
                                                                            }}
                                                                        />
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="flex justify-between mt-4 border-t border-zinc-200 pt-4">
                                                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Recent Races</span>
                                                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Latest</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center justify-center h-24">
                                                        <p className="text-zinc-500 text-sm">No trend data available</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}