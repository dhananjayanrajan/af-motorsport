'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Event, Media } from '@/payload-types';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import React, { useMemo, useRef, useState } from 'react';

interface EventsListProps {
    events: Event[];
    seriesSlug: string;
    seasonSlug: string;
}

export default function EventsList({ events, seriesSlug, seasonSlug }: EventsListProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => {
            const dateA = new Date(a.details?.start_date || 0).getTime();
            const dateB = new Date(b.details?.start_date || 0).getTime();
            return dateA - dateB;
        });
    }, [events]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveImage(null)}
            className="relative w-full border-b border-zinc-100 lg:cursor-none bg-white font-sans"
        >
            <div className="px-6 py-12 md:px-20 md:py-24 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-200 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-[2px]"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            Event_Schedule
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Calendar
                    </h2>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Registry_Count</span>
                    <span className="text-3xl font-black italic tabular-nums">{events.length.toString().padStart(2, '0')}</span>
                </div>
            </div>

            <div className="flex flex-col">
                {sortedEvents.map((event, index) => {
                    const imageUrl = (event.assets?.cover as Media)?.url || `https://picsum.photos/seed/event-${event.id}/600/400`;
                    const startDate = event.details?.start_date ? new Date(event.details.start_date) : null;

                    const day = startDate?.toLocaleDateString('en-US', { day: '2-digit' }) || '00';
                    const month = startDate?.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() || 'TBD';

                    return (
                        <Link
                            key={event.id}
                            href={`/competition/series/${seriesSlug}/season/${seasonSlug}/event/${event.slug}`}
                            onMouseEnter={() => setActiveImage(imageUrl)}
                            className="group relative flex flex-col md:grid md:grid-cols-12 items-start md:items-center px-6 py-10 md:px-10 md:py-12 border-b border-zinc-100 transition-all duration-500 hover:bg-black"
                        >
                            <div className="col-span-1 relative z-10 mb-4 md:mb-0">
                                <span className="text-sm font-black italic text-zinc-300 group-hover:text-primary transition-colors tabular-nums">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>

                            <div className="col-span-2 relative z-10 mb-6 md:mb-0">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-1 group-hover:text-zinc-600 transition-colors">{month}</span>
                                    <h3 className="text-5xl font-black italic tracking-tighter text-black group-hover:text-white transition-colors tabular-nums leading-none">
                                        {day}
                                    </h3>
                                </div>
                            </div>

                            <div className="col-span-4 relative z-10 mb-8 md:mb-0">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] font-black uppercase tracking-widest transition-colors group-hover:text-white" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                        {event.basics?.identifiers?.code || 'EVT_REF'}
                                    </span>
                                    <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black group-hover:text-white transition-colors leading-none">
                                        {event.name}
                                    </h4>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] group-hover:text-zinc-500 transition-colors">
                                        {event.basics?.tagline || 'Technical parameters verified'}
                                    </p>
                                </div>
                            </div>

                            <div className="col-span-2 relative z-10 flex flex-col mb-6 md:mb-0">
                                <span className="text-[7px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Identification</span>
                                <span className="text-[10px] font-black text-black group-hover:text-white transition-colors uppercase italic truncate">
                                    {event.alias || 'Standard_Cycle'}
                                </span>
                            </div>

                            <div className="col-span-2 relative z-10 flex items-center gap-4 md:border-l border-zinc-100 md:pl-8 group-hover:border-zinc-800 transition-colors mb-8 md:mb-0">
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Status</span>
                                    <span className="text-[10px] font-black text-black group-hover:text-white transition-colors uppercase italic">
                                        {event.details?.status || 'Scheduled'}
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-1 flex justify-end absolute right-6 bottom-10 md:relative md:right-0 md:bottom-0 z-10">
                                <div
                                    className="w-10 h-10 border border-zinc-200 rotate-45 flex items-center justify-center transition-all duration-300 group-hover:border-transparent group-hover:bg-primary"
                                    style={{ backgroundColor: 'transparent' }}
                                >
                                    <div className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
                                        >
                                            <path d="M7 17l10-10M7 7h10v10" strokeLinecap="square" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        className="hidden lg:block"
                        style={{
                            left: smoothX,
                            top: smoothY,
                            translateX: '-50%',
                            translateY: '-50%',
                            pointerEvents: 'none',
                            position: 'absolute',
                            zIndex: 50,
                            width: '400px',
                            height: '240px',
                            overflow: 'hidden',
                            backgroundColor: '#000',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <motion.img
                            key={activeImage}
                            src={activeImage}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 0.8, filter: 'blur(0px)' }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}