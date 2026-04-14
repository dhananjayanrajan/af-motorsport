'use client';

import { Circuit, Driver, Media, Race, Season, Series } from '@/payload-types';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, MapPin, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
                    <div className="w-10 h-10 border border-[#e4e4e7] flex items-center justify-center bg-[#fafafa]">
                        <span className="text-xs font-bold tabular-nums text-[#111111]">{value}</span>
                    </div>
                    <span className="text-[7px] font-bold text-[#a1a1aa] uppercase tracking-tighter mt-1">
                        {label === 'd' ? 'Days' : label === 'h' ? 'Hrs' : 'Min'}
                    </span>
                </div>
            ))}
        </div>
    );
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
        <section ref={containerRef} className="relative w-full py-24 bg-white overflow-hidden border-b border-[#f4f4f5]">
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="flex flex-col items-center text-center gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#a1a1aa]">Season Schedule</span>
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-[#111111] italic">Race Calendar</h2>
                </div>
            </div>

            <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute left-1/2 top-[350px] bottom-0 w-[1px] bg-[#e4e4e7] -translate-x-1/2 z-0 hidden lg:block"
            />

            <div className="max-w-7xl mx-auto px-6">
                {races.map((race, index) => {
                    const isEven = index % 2 === 0;
                    const circuit = race.details.circuit as Circuit;
                    const winner = race.details.winner as Driver;
                    const season = race.details.season as Season;
                    const series = (season as any)?.details?.series as Series;
                    const mapUrl = (circuit?.assets?.circuit_map as Media)?.url;
                    const raceImage = (race.assets?.cover as Media)?.url || `https://picsum.photos/seed/${race.id}/1280/720`;
                    const status = race.details?.status;
                    const startDate = race.details?.start_date;

                    const raceDetails = race.details as any;
                    const eventSlug = raceDetails.event_slug || 'event';
                    const raceLink = `/competition/series/${series?.slug || 'unknown'}/seasons/${season?.slug || 'unknown'}/events/${eventSlug}/races/${race.slug}`;

                    return (
                        <motion.div
                            key={race.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative flex flex-col lg:flex-row items-center mb-32 last:mb-0 gap-12 lg:gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        >
                            {mapUrl && (
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.04 }}
                                    src={mapUrl}
                                    className={`absolute w-[400px] grayscale pointer-events-none select-none hidden lg:block ${isEven ? '-right-10' : '-left-10'}`}
                                    alt=""
                                />
                            )}

                            <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                                <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[10px] font-bold text-[#d4d4d8] tabular-nums uppercase tracking-widest">Round {(index + 1).toString().padStart(2, '0')}</span>
                                        <div className="w-1 h-1 bg-[#e4e4e7] rotate-45" />
                                        <span className="text-[10px] font-bold text-[#a1a1aa] tracking-[0.2em] uppercase">
                                            {race.details?.type || 'RACE'}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <Link
                                            href={`/competition/circuit/${circuit?.slug || '#'}`}
                                            className={`flex items-center gap-2 text-[#71717a] font-bold uppercase tracking-widest text-[10px] hover:text-[#111111] transition-colors ${isEven ? 'lg:justify-end flex-row-reverse' : 'lg:justify-start'}`}
                                        >
                                            <MapPin size={12} className="text-[#00FF41]" />
                                            <span>{circuit?.name}</span>
                                            <span className="text-[9px] text-[#d4d4d8] font-normal italic">{(circuit?.details?.country as any)?.name}</span>
                                        </Link>
                                        <h3 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-[#111111] leading-none">
                                            {race.name}
                                        </h3>
                                    </div>

                                    <div className={`flex flex-col gap-6 mb-8 ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] font-bold text-[#a1a1aa] uppercase tracking-widest">Race Date</span>
                                            <span className="text-sm font-bold uppercase text-[#111111]">
                                                {startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'To Be Announced'}
                                            </span>
                                        </div>

                                        {status === 'completed' && winner ? (
                                            <Link
                                                href={`/team/driver/${winner.slug || '#'}`}
                                                className={`flex items-center gap-4 p-4 border border-[#f4f4f5] bg-[#fafafa] hover:border-[#d4d4d8] transition-all duration-200 ${isEven ? 'flex-row-reverse text-right' : 'text-left'}`}
                                            >
                                                <div className="w-12 h-12 shrink-0 grayscale hover:grayscale-0 transition-all duration-300 overflow-hidden bg-[#e4e4e7]">
                                                    {(winner.assets?.avatar as Media)?.url && (
                                                        <img src={(winner.assets?.avatar as Media).url || undefined} alt="" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className={`flex items-center gap-2 mb-0.5 ${isEven ? 'flex-row-reverse' : ''}`}>
                                                        <Trophy size={10} className="text-[#00FF41]" />
                                                        <span className="text-[9px] font-bold text-[#a1a1aa] uppercase tracking-[0.2em]">Winner</span>
                                                    </div>
                                                    <span className="text-sm font-black uppercase italic text-[#111111]">
                                                        {(winner as any).basics?.first_name} {(winner as any).basics?.last_name}
                                                    </span>
                                                </div>
                                            </Link>
                                        ) : (
                                            startDate && <Countdown targetDate={startDate} />
                                        )}
                                    </div>

                                    <Link href={raceLink} className="flex flex-col items-center gap-2 group">
                                        <div className="w-10 h-10 rounded-full border border-[#e4e4e7] flex items-center justify-center group-hover:border-[#111111] group-hover:bg-[#111111] transition-all duration-200">
                                            <div className="w-1.5 h-1.5 rotate-45 bg-[#00FF41] group-hover:bg-white transition-colors" />
                                        </div>
                                        <span className="text-[8px] font-bold text-[#a1a1aa] uppercase tracking-[0.3em] group-hover:text-[#111111]">View Details</span>
                                    </Link>
                                </div>
                            </div>

                            <motion.div
                                initial={{ scale: 0, rotate: 0 }}
                                whileInView={{ scale: 1, rotate: 45 }}
                                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-white z-20 hidden lg:block"
                                style={{
                                    backgroundColor: status === 'completed' ? '#111111' : '#00FF41',
                                }}
                            />

                            <div className="w-full lg:w-1/2 lg:px-16">
                                <Link href={raceLink} className="group block relative aspect-video overflow-hidden border border-[#e4e4e7] bg-[#f4f4f5]">
                                    <img src={raceImage} alt={race.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-[#111111]/5 transition-opacity group-hover:opacity-0" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[2px]">
                                        <div className="px-5 py-2.5 bg-white text-[#111111] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl border border-[#e4e4e7]">
                                            Open Race Report <ArrowRight size={12} />
                                        </div>
                                    </div>
                                    {status === 'completed' && (
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF41]" />
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