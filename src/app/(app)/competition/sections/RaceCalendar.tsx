'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver, Media, Race, Season, Series } from '@/payload-types';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

interface RaceCalendarProps {
    races: Race[];
}

export default function RaceCalendar({ races }: RaceCalendarProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative w-full py-32 bg-white overflow-hidden border-b border-zinc-100">
            <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-zinc-200 -translate-x-1/2 z-0"
            />

            <div className="max-w-7xl mx-auto px-10">
                {races.map((race, index) => {
                    const isEven = index % 2 === 0;
                    const circuit = race.details.circuit as Circuit;
                    const winner = race.details.winner as Driver;
                    const season = race.details.season as Season;
                    const series = season?.details?.series as Series;
                    const mapUrl = (circuit?.assets?.circuit_map as Media)?.url;
                    const raceDetails = race.details as any;
                    const eventSlug = raceDetails.event_slug || 'tbc-event';

                    const raceLink = `/competition/series/${series?.slug || 'unknown'}/seasons/${season?.slug || 'unknown'}/events/${eventSlug}/races/${race.slug}`;

                    return (
                        <motion.div
                            key={race.id}
                            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative flex items-center mb-48 last:mb-0 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                            {mapUrl && (
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.8, rotate: isEven ? 5 : -5 }}
                                    whileInView={{ opacity: 0.06, scale: 1, rotate: 0 }}
                                    src={mapUrl}
                                    className={`absolute w-[500px] grayscale pointer-events-none select-none ${isEven ? '-right-20' : '-left-20'}`}
                                    alt=""
                                />
                            )}

                            <div className={`w-1/2 ${isEven ? 'pr-24 text-right' : 'pl-24 text-left'}`}>
                                <div className={`flex flex-col ${isEven ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[10px] font-black tabular-nums text-zinc-500 tracking-[0.2em] uppercase">
                                            {race.details.start_date ? new Date(race.details.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'DD/MM/YYYY'}
                                        </span>
                                        <div className="w-1.5 h-1.5 bg-zinc-200 rotate-45" />
                                        <span className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">
                                            {race.details.status || 'SCHEDULED'}
                                        </span>
                                    </div>

                                    <motion.h3
                                        whileHover={{ skewX: -6 }}
                                        className="text-6xl font-black uppercase italic tracking-tighter text-black leading-[0.85] mb-6 cursor-default"
                                    >
                                        {race.name}
                                    </motion.h3>

                                    <Link
                                        href={`/competition/circuits/${circuit?.slug || '#'}`}
                                        className={`flex items-center gap-3 mb-10 group/circuit ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <span className="text-sm font-black text-black uppercase tracking-tight group-hover/circuit:text-black transition-colors duration-200">
                                            {circuit?.name || 'Circuit'}
                                        </span>
                                        <div
                                            className="w-6 h-[2px] transition-all duration-200 group-hover/circuit:w-12"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                        />
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase italic">
                                            {(circuit?.details?.country as any)?.name || 'International'}
                                        </span>
                                    </Link>

                                    <div className={`flex items-center gap-8 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {race.details.status === 'completed' && winner ? (
                                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                                <Link
                                                    href={`/team/drivers/${winner.slug || '#'}`}
                                                    className={`flex items-center gap-4 bg-zinc-50 p-1 pr-8 border border-zinc-100 hover:border-black transition-colors duration-200 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
                                                >
                                                    <div className="w-14 h-14 bg-zinc-200 overflow-hidden border border-zinc-100">
                                                        {(winner.assets?.avatar as Media)?.url && (
                                                            <img
                                                                src={(winner.assets?.avatar as Media).url || undefined}
                                                                className="w-full h-full object-cover grayscale transition-all duration-700"
                                                                alt=""
                                                            />
                                                        )}
                                                    </div>
                                                    <div className={`flex flex-col ${isEven ? 'items-end' : 'items-start'}`}>
                                                        <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Winner</span>
                                                        <span className="text-md font-black uppercase italic text-black">{winner.last_name}</span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ) : (
                                            <div className={`flex flex-col gap-2 ${isEven ? 'items-end' : 'items-start'}`}>
                                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">{race.details.status || 'Upcoming'}</span>
                                                <div className="flex gap-1">
                                                    {[0, 1, 2].map((i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                            className="w-8 h-8 border border-zinc-200 flex items-center justify-center bg-zinc-50"
                                                        >
                                                            <span className="text-xs font-black tabular-nums text-zinc-400">--</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <Link
                                            href={raceLink}
                                            className="group/btn flex flex-col items-center gap-2"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover/btn:border-black group-hover/btn:bg-black transition-colors duration-200"
                                            >
                                                <div className="w-2 h-2 rotate-45 transition-colors duration-200 group-hover/btn:bg-white" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            </div>
                                            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Details</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ scale: 0, rotate: 0 }}
                                whileInView={{ scale: 1, rotate: 45 }}
                                className="absolute left-1/2 -translate-x-1/2 w-5 h-5 border-4 border-white z-10 shadow-lg"
                                style={{
                                    backgroundColor: race.details.status === 'completed' ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.PRIMARY,
                                    boxShadow: `0 0 20px ${race.details.status === 'completed' ? 'rgba(0,0,0,0.1)' : DESIGN_SYSTEM.COLORS.PRIMARY + '44'}`
                                }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}