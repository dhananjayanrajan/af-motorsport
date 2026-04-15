'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver, Media, Race, Season, Series } from '@/payload-types';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Flag, Gauge, MapPin, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RaceCalendarProps {
    races: Race[];
}

function Countdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00' });

    useEffect(() => {
        const calculate = () => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const diff = target - now;

            if (diff > 0) {
                setTimeLeft({
                    d: Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
                    h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
                    m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
                });
            }
        };
        calculate();
        const interval = setInterval(calculate, 60000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex gap-1">
            {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                    <div className="w-10 h-10 border flex items-center justify-center" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200], backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50] }}>
                        <span className="text-xs font-bold tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{value}</span>
                    </div>
                    <span className="text-[7px] font-bold uppercase tracking-tighter mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                        {label === 'd' ? 'Days' : label === 'h' ? 'Hrs' : 'Min'}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function RaceCalendar({ races }: RaceCalendarProps) {
    const [hoveredRace, setHoveredRace] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

    if (!races || races.length === 0) {
        return (
            <section className="relative w-full py-24" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}10` }}>
                        <Trophy className="w-8 h-8" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                        NO RACES SCHEDULED
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative w-full py-24 overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: backgroundOpacity }}
            >
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}05` }} />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 mb-20">
                <motion.div
                    className="flex flex-col items-center text-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            Season Schedule
                        </span>
                        <div className="w-8 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                        Race Calendar
                    </h2>

                    <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                </motion.div>
            </div>

            <motion.div
                style={{ scaleY, originY: 0, backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                className="absolute left-1/2 top-[300px] bottom-0 w-[1px] -translate-x-1/2 z-0 hidden lg:block"
            />

            <div className="max-w-7xl mx-auto px-6">
                {races.map((race, index) => {
                    const isEven = index % 2 === 0;
                    const circuit = race.details?.circuit as Circuit;
                    const winner = race.details?.winner as Driver;
                    const season = race.details?.season as Season;
                    const series = (season as any)?.details?.series as Series;
                    const mapUrl = (circuit?.assets?.circuit_map as Media)?.url;
                    const raceImage = (race.assets?.cover as Media)?.url || `https://picsum.photos/seed/${race.id}/1280/720`;
                    const status = race.details?.status;
                    const startDate = race.details?.start_date;
                    const isHovered = hoveredRace === race.id;

                    const raceDetails = race.details as any;
                    const eventSlug = raceDetails?.event_slug || 'event';
                    const raceLink = `/competition/series/${series?.slug || 'unknown'}/seasons/${season?.slug || 'unknown'}/events/${eventSlug}/races/${race.slug}`;

                    return (
                        <motion.div
                            key={race.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            onMouseEnter={() => setHoveredRace(race.id)}
                            onMouseLeave={() => setHoveredRace(null)}
                            className={`relative flex flex-col lg:flex-row items-center mb-32 last:mb-0 gap-12 lg:gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        >
                            {mapUrl && (
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.03 }}
                                    transition={{ duration: 0.8 }}
                                    src={mapUrl}
                                    className={`absolute w-[400px] grayscale pointer-events-none select-none hidden lg:block ${isEven ? '-right-20' : '-left-20'}`}
                                    alt=""
                                    animate={isHovered ? { opacity: 0.05, scale: 1.02 } : { opacity: 0.03, scale: 1 }}
                                />
                            )}

                            <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                                <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[10px] font-bold tabular-nums uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}>
                                            Round {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="w-1 h-1 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }} />
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                            <Flag size={10} />
                                            {race.details?.type || 'RACE'}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <Link
                                            href={`/competition/circuit/${circuit?.slug || '#'}`}
                                            className={`flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] transition-colors ${isEven ? 'lg:justify-end flex-row-reverse' : 'lg:justify-start'}`}
                                            style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                        >
                                            <MapPin size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            <span>{circuit?.name || 'TBA'}</span>
                                            <span className="text-[9px] font-normal italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}>{(circuit?.details?.country as any)?.name || ''}</span>
                                        </Link>

                                        <h3 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            {race.name}
                                        </h3>

                                        <div
                                            className="h-[2px] transition-all duration-300"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                                width: isHovered ? 80 : 60
                                            }}
                                        />
                                    </div>

                                    <div className={`flex flex-col gap-6 mb-8 ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
                                        <div className="flex gap-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                    <Calendar size={10} /> Date
                                                </span>
                                                <span className="text-sm font-bold uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    {startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'To Be Announced'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                    <Gauge size={10} /> Status
                                                </span>
                                                <span className="text-sm font-bold uppercase" style={{ color: status === 'completed' ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    {status === 'completed' ? 'Completed' : status === 'ongoing' ? 'Live' : 'Upcoming'}
                                                </span>
                                            </div>
                                        </div>

                                        {status === 'completed' && winner ? (
                                            <Link
                                                href={`/team/driver/${winner.slug || '#'}`}
                                                className={`flex items-center gap-4 p-4 border transition-all duration-200 ${isEven ? 'flex-row-reverse text-right' : 'text-left'}`}
                                                style={{
                                                    borderColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[100],
                                                    backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50]
                                                }}
                                            >
                                                <div className="w-12 h-12 shrink-0 overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                                    {(winner.assets?.avatar as Media)?.url && (
                                                        <img src={(winner.assets?.avatar as Media).url || undefined} alt="" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className={`flex items-center gap-2 mb-0.5 ${isEven ? 'flex-row-reverse' : ''}`}>
                                                        <Trophy size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Winner</span>
                                                    </div>
                                                    <span className="text-sm font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                        {(winner as any).basics?.first_name} {(winner as any).basics?.last_name}
                                                    </span>
                                                </div>
                                            </Link>
                                        ) : (
                                            startDate && <Countdown targetDate={startDate} />
                                        )}
                                    </div>

                                    <Link href={raceLink} className="flex flex-col items-center gap-2 group">
                                        <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200" style={{ borderColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                            <div className="w-1.5 h-1.5 rotate-45 transition-colors" style={{ backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                        </div>
                                        <span className="text-[8px] font-bold uppercase tracking-[0.3em] transition-colors" style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                            View Details
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: index * 0.08, duration: 0.3 }}
                                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 z-20 hidden lg:block"
                                style={{
                                    backgroundColor: status === 'completed' ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                }}
                            />

                            <div className="w-full lg:w-1/2 lg:px-8">
                                <Link href={raceLink} className="group block relative aspect-video overflow-hidden border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200], backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                    <img
                                        src={raceImage}
                                        alt={race.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0" style={{ background: `linear-gradient(135deg, ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}15, transparent)` }} />

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                        <div className="px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50], color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            Open Race Report <ArrowRight size={12} />
                                        </div>
                                    </div>

                                    {status === 'completed' && (
                                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    )}
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}