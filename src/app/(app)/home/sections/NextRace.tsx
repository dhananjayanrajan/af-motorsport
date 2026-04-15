'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Media, Race } from '@/payload-types';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, MapPin, Timer, Zap } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NextRaceSectionProps {
    race: Race;
}

export default function NextRaceSection({ race }: NextRaceSectionProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    const startDate = race.details?.start_date;
    const thumbnail = race.assets?.thumbnail as Media;
    const circuit = race.details?.circuit as Circuit;

    useEffect(() => {
        if (!startDate) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(startDate).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
                seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <section className="relative w-full py-24 md:py-40 overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.06 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 50%, ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW} 0%, transparent 70%)` }}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full" style={{ background: `linear-gradient(to bottom, transparent, ${DESIGN_SYSTEM.COLORS.PRIMARY[300]}, transparent)` }} />
                <div className="absolute top-0 right-1/3 w-px h-full" style={{ background: `linear-gradient(to bottom, transparent, ${DESIGN_SYSTEM.COLORS.TERTIARY[300]}, transparent)` }} />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
                <div className="flex flex-col mb-16 relative">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <Zap size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </motion.div>
                        <motion.span
                            className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            whileHover={{ letterSpacing: "0.8em" }}
                        >
                            Upcoming Event
                        </motion.span>
                    </motion.div>
                    <motion.h2
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none"
                    >
                        <motion.span
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                            whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            transition={{ duration: 0.3 }}
                        >
                            Next
                        </motion.span>
                        <br />
                        <motion.span
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Race Event
                        </motion.span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-px border shadow-2xl"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200], backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                >
                    <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[450px] overflow-hidden group">
                        <motion.div
                            className="relative w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                        >
                            <Image
                                src={thumbnail?.url || `https://picsum.photos/seed/race-${race.id}/1200/800`}
                                alt={race.name}
                                fill
                                className="object-cover"
                                style={{ filter: "grayscale(20%)" }}
                            />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(135deg, ${DESIGN_SYSTEM.COLORS.PRIMARY.MUTED} 0%, transparent 50%, ${DESIGN_SYSTEM.COLORS.TERTIARY.MUTED} 100%)` }}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        <div className="absolute bottom-8 left-8">
                            <motion.span
                                className="text-[10px] font-black px-4 py-1.5 uppercase italic"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                    color: DESIGN_SYSTEM.COLORS.BLACK[800],
                                    clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP
                                }}
                                whileHover={{ scale: 1.1, rotate: 2 }}
                                transition={{ duration: 0.2 }}
                            >
                                {race.details?.type || 'FEATURE RACE'}
                            </motion.span>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                        <div className="p-8 md:p-12 flex-1 space-y-12">
                            <div className="space-y-6">
                                <motion.h3
                                    className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9]"
                                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {race.name}
                                </motion.h3>
                                <motion.div
                                    className="h-1 w-20"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                    animate={{ width: ["5rem", "8rem", "5rem"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.p
                                    className="text-sm font-bold uppercase tracking-widest leading-relaxed"
                                    style={{ color: DESIGN_SYSTEM.COLORS.NEUTRAL[600] }}
                                    whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[600] }}
                                >
                                    {race.basics?.tagline || 'The next chapter in the championship saga begins here.'}
                                </motion.p>
                            </div>

                            <div className="space-y-6 pt-6 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                <motion.div
                                    className="flex items-center gap-5 group"
                                    whileHover={{ x: 8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.div
                                        className="p-3 border"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                        whileHover={{ rotate: 5, backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED }}
                                    >
                                        <MapPin size={20} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Location</span>
                                        <motion.span
                                            className="text-base font-black uppercase italic"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                            whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                        >
                                            {circuit?.name || 'Grand Prix Circuit'}
                                        </motion.span>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="flex items-center gap-5 group"
                                    whileHover={{ x: 8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.div
                                        className="p-3 border"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                        whileHover={{ rotate: -5, backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED }}
                                    >
                                        <Calendar size={20} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Schedule</span>
                                        <motion.span
                                            className="text-base font-black uppercase italic"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                            whileHover={{ color: DESIGN_SYSTEM.COLORS.TERTIARY[500] }}
                                        >
                                            {startDate ? new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBA'}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            className="p-8 md:p-12 flex flex-col gap-8 transition-all duration-300"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[50] }}
                            whileHover={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[100] }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Timer size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </motion.div>
                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>Countdown to Green</span>
                                </div>
                                <motion.span
                                    className="text-[10px] font-bold uppercase"
                                    style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[700] }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Live Telecast
                                </motion.span>
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <CountdownUnit label="Days" value={timeLeft.days} />
                                <CountdownUnit label="Hrs" value={timeLeft.hours} />
                                <CountdownUnit label="Min" value={timeLeft.minutes} />
                                <CountdownUnit label="Sec" value={timeLeft.seconds} isLast />
                            </div>

                            <motion.button
                                whileHover={{ x: 10 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center justify-between w-full pt-8 border-t transition-all duration-300"
                                style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[200] }}
                            >
                                <motion.span
                                    className="text-xs font-black uppercase italic tracking-widest transition-colors duration-300"
                                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
                                    whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                >
                                    Event Details & Tickets
                                </motion.span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <ChevronRight size={20} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                </motion.div>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function CountdownUnit({ label, value, isLast }: { label: string, value: string, isLast?: boolean }) {
    return (
        <motion.div
            className="flex flex-col items-start"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex items-baseline gap-1">
                <motion.span
                    className="text-3xl md:text-5xl font-black italic tabular-nums leading-none"
                    style={{ color: isLast ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK[600] }}
                    animate={isLast ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    {value}
                </motion.span>
            </div>
            <motion.span
                className="text-[8px] font-black uppercase tracking-[0.2em] mt-3"
                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                whileHover={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[400] }}
            >
                {label}
            </motion.span>
        </motion.div>
    );
}