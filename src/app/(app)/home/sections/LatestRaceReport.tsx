'use client';

import { ClippedButton } from '@/components/Custom/ui/ClippedButton';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver, Media, Race, Result } from '@/payload-types';
import { motion } from 'framer-motion';
import { Crown, Flag, MapPin, Timer, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';
import dummyData from '../dummy.json';

interface LatestRaceReportProps {
    race: Race;
    results: Result[];
    drivers: Driver[];
    circuits: Circuit[];
}

export default function LatestRaceReport({
    race,
    results,
    drivers,
    circuits,
}: LatestRaceReportProps) {
    const displayRace = race && Object.keys(race).length > 0
        ? race
        : (dummyData.race as unknown as Race);

    const displayResults = results && results.length > 0
        ? results
        : (dummyData.results as unknown as Result[]);

    const displayDrivers = drivers && drivers.length > 0
        ? drivers
        : (dummyData.drivers as unknown as Driver[]);

    const displayCircuits = circuits && circuits.length > 0
        ? circuits
        : (dummyData.circuits as unknown as Circuit[]);

    const [hoveredStat, setHoveredStat] = useState<string | null>(null);

    // Get winner name - winner is a relationship to Drivers
    const getWinnerName = (): string => {
        const winnerId = typeof displayRace.details?.winner === 'number'
            ? displayRace.details.winner
            : (displayRace.details?.winner as any)?.id;

        const winner = displayDrivers.find(d => d.id === winnerId);
        if (winner && winner.first_name && winner.last_name) {
            return `${winner.first_name} ${winner.last_name}`.toUpperCase();
        }
        return displayRace.name?.toUpperCase() || 'VICTORY';
    };

    // Get circuit
    const getCircuit = () => {
        const circuitId = typeof displayRace.details?.circuit === 'number'
            ? displayRace.details.circuit
            : (displayRace.details?.circuit as any)?.id;
        return displayCircuits.find(c => c.id === circuitId);
    };

    const circuit = getCircuit();
    const winnerName = getWinnerName();

    // Get podium names from results (results have name field)
    const podiumResults = displayResults
        .filter((r) => r.details?.overall && r.details.overall <= 3)
        .sort((a, b) => (a.details?.overall || 0) - (b.details?.overall || 0));

    const stats = [
        {
            id: 'pole',
            label: 'POLE POSITION',
            value: displayRace.details?.pole_position || 'UNCONFIRMED',
            icon: Flag,
        },
        {
            id: 'fastest',
            label: 'FASTEST LAP',
            value: displayRace.details?.fastest_lap_time || '--:--.---',
            icon: Zap,
        },
        {
            id: 'laps',
            label: 'TOTAL LAPS',
            value: displayRace.details?.laps?.toString() || '0',
            icon: Timer,
        }
    ];

    return (
        <section
            className="py-24 px-6 md:px-12"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex items-center gap-4 mb-12"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span
                        className="text-[10px] font-black uppercase tracking-[0.4em]"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                    >
                        IMMEDIATE_POST_RACE_REPORT
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Race Report Card */}
                    <div className="lg:col-span-8">
                        <motion.div
                            className="relative overflow-hidden border p-8 md:p-10"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950,
                                borderColor: DESIGN_SYSTEM.COLORS.ZINC_900
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative z-10">
                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <div
                                        className="text-white text-[9px] font-black uppercase px-3 py-1.5 flex items-center gap-2"
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 12px))'
                                        }}
                                    >
                                        <Crown size={12} />
                                        <span>WINNER</span>
                                    </div>
                                    <motion.h2
                                        className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter"
                                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        {winnerName}
                                    </motion.h2>
                                </div>

                                {/* Podium Section */}
                                {podiumResults.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                        {podiumResults.map((result, idx) => (
                                            <motion.div
                                                key={result.id}
                                                className="border-l-2 pl-5 py-2"
                                                style={{ borderLeftColor: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_800 }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + (idx * 0.1), duration: 0.4 }}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Trophy size={14} style={{ color: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_600 }} />
                                                    <span
                                                        className="text-[8px] font-mono uppercase tracking-widest"
                                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                                                    >
                                                        P{idx + 1} FINISH
                                                    </span>
                                                </div>
                                                <span
                                                    className="font-black uppercase italic text-lg block"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                                                >
                                                    {result.name?.toUpperCase() || 'TBA'}
                                                </span>
                                                {result.details?.class && (
                                                    <span
                                                        className="text-[9px] font-mono mt-1 block"
                                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}
                                                    >
                                                        CLASS {result.details.class}
                                                    </span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* Race Description */}
                                {displayRace.basics?.description && (
                                    <motion.div
                                        className="pt-6 border-t"
                                        style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6, duration: 0.4 }}
                                    >
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}
                                        >
                                            {displayRace.basics.description}
                                        </p>
                                    </motion.div>
                                )}

                                <motion.div
                                    className="mt-8"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.4 }}
                                >
                                    <ClippedButton
                                        variant="outline"
                                        size="md"
                                        label="VIEW FULL REPORT"
                                        onClick={() => console.log('View Report')}
                                    />
                                </motion.div>
                            </div>

                            {/* Background Image */}
                            {displayRace.assets?.cover && typeof displayRace.assets.cover !== 'number' && (
                                <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
                                    <img
                                        src={(displayRace.assets.cover as Media).url || ''}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={stat.id}
                                className="group relative overflow-hidden p-8 transition-all duration-300 cursor-pointer"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950,
                                    border: `1px solid ${hoveredStat === stat.id ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_900}`
                                }}
                                onMouseEnter={() => setHoveredStat(stat.id)}
                                onMouseLeave={() => setHoveredStat(null)}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <stat.icon size={18} style={{ color: hoveredStat === stat.id ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_600 }} />
                                        <span
                                            className="text-[8px] font-mono tracking-widest"
                                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}
                                        >
                                            METRIC_{String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <span
                                        className="block text-[9px] font-mono uppercase tracking-widest mb-3"
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                                    >
                                        {stat.label}
                                    </span>
                                </div>
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: hoveredStat === stat.id ? '100%' : '0%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}

                        {/* Circuit Info Card */}
                        <motion.div
                            className="p-8 border"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900,
                                borderColor: DESIGN_SYSTEM.COLORS.ZINC_800
                            }}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span
                                    className="text-[8px] font-mono uppercase tracking-widest"
                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                                >
                                    VENUE
                                </span>
                            </div>
                            <span
                                className="block font-black uppercase italic text-xl mb-2"
                                style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                            >
                                {circuit?.name?.toUpperCase() || 'NEUTRAL VENUE'}
                            </span>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                                <span
                                    className="text-[9px] font-bold uppercase tracking-widest"
                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}
                                >
                                    {displayRace.details?.weather || 'CLEAR SKIES'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Timer size={10} style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }} />
                                    <span
                                        className="text-[10px] font-mono"
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                                    >
                                        {displayRace.details?.laps || '0'} LAPS
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}