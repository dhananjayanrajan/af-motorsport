'use client';

import Hyperspeed from '@/components/Hyperspeed';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Driver, Race } from '@/payload-types';
import { motion } from 'framer-motion';
import { Calendar, Flag, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
    nextRace?: Race;
    currentChampion?: Driver;
    totalRaces?: number;
    activeChampionships?: Championship[];
}

export default function HeroSection({
    nextRace,
    currentChampion,
    totalRaces = 0,
    activeChampionships = []
}: HeroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0, rootMargin: '100px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-black"
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            {isVisible && (
                <>
                    <div className="absolute inset-0 z-0">
                        <Hyperspeed
                            effectOptions={{
                                "distortion": "turbulentDistortion",
                                "length": 400,
                                "roadWidth": 12,
                                "islandWidth": 2,
                                "lanesPerRoad": 4,
                                "fov": 110,
                                "fovSpeedUp": 180,
                                "speedUp": 3,
                                "carLightsFade": 0.15,
                                "totalSideLightSticks": 60,
                                "lightPairsPerRoadWay": 80,
                                "shoulderLinesWidthPercentage": 0.06,
                                "brokenLinesWidthPercentage": 0.12,
                                "brokenLinesLengthPercentage": 0.6,
                                "lightStickWidth": [0.15, 0.6],
                                "lightStickHeight": [1.5, 2],
                                "movingAwaySpeed": [80, 120],
                                "movingCloserSpeed": [-180, -220],
                                "carLightsLength": [30, 80],
                                "carLightsRadius": [0.08, 0.18],
                                "carWidthPercentage": [0.35, 0.55],
                                "carShiftX": [-0.3, 0.3],
                                "carFloorSeparation": [0.1, 1.2],
                                "colors": {
                                    "roadColor": 0x000000,
                                    "islandColor": 0x000000,
                                    "background": 0x000000,
                                    "shoulderLines": 0x00FF41,
                                    "brokenLines": 0x00FF41,
                                    "leftCars": [0x00FF41, 0x00FF41, 0x00FF41, 0x00FF41],
                                    "rightCars": [0x00FF41, 0x00FF41, 0x00FF41, 0x00FF41],
                                    "sticks": 0x00FF41
                                }
                            }}
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                    <div className="relative z-20 h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12">
                        <div className="flex justify-end">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex gap-6"
                            >
                                {activeChampionships.slice(0, 2).map((champ) => (
                                    <div key={champ.id} className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                            {champ.basics?.identifiers?.code || 'CHMP'}
                                        </span>
                                        <p className="text-xs font-black uppercase italic mt-1" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                            {champ.name}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-end">
                            <div className="lg:col-span-2 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                                            Live Telemetry Grid
                                        </span>
                                    </div>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.1 }}
                                        className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.8] text-white"
                                    >
                                        PURE <br />
                                        <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>VELOCITY</span>
                                    </motion.h1>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="space-y-4"
                            >
                                {nextRace && (
                                    <Link href={`/races/${nextRace.id}`} className="block group">
                                        <div className="p-6 border-2 border-zinc-800 bg-black/80 transition-all duration-300 group-hover:border-primary-500">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Calendar size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500">Scheduled Event</span>
                                            </div>
                                            <h3 className="text-2xl font-black uppercase italic mb-2 text-white group-hover:text-primary-500 transition-colors">
                                                {nextRace.name}
                                            </h3>
                                        </div>
                                    </Link>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    {currentChampion && (
                                        <Link href={`/drivers/${currentChampion.id}`} className="block group">
                                            <div className="p-5 border border-zinc-900 bg-zinc-950/50 group-hover:border-zinc-700 transition-all">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Trophy size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                    <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600">Champion</span>
                                                </div>
                                                <p className="text-sm font-black uppercase italic text-white">
                                                    {currentChampion.last_name}
                                                </p>
                                            </div>
                                        </Link>
                                    )}

                                    {totalRaces > 0 && (
                                        <div className="p-5 border border-zinc-900 bg-zinc-950/50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Flag size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600">Database</span>
                                            </div>
                                            <p className="text-lg font-black italic text-white">
                                                {totalRaces} Races
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
                    >
                        <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-transparent" />
                        <span className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-500">Scroll</span>
                    </motion.div>
                </>
            )}
        </section>
    );
}