'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Meetup } from '@/payload-types';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';

export default function MeetupsSection({ data }: { data: Meetup[] }) {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const sortedMeetups = useMemo(() => {
        return [...data].sort((a, b) =>
            new Date(a.details.start_date).getTime() - new Date(b.details.start_date).getTime()
        );
    }, [data]);

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
            className="relative w-full border-b border-zinc-100 cursor-none bg-white font-sans"
        >
            <div className="px-20 py-24 flex items-end justify-between border-b border-zinc-200">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-[2px]"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            Operational_Schedule
                        </span>
                    </div>
                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Meetups
                    </h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Active_Events</span>
                    <span className="text-3xl font-black italic tabular-nums">{data.length.toString().padStart(2, '0')}</span>
                </div>
            </div>

            <div className="flex flex-col">
                {sortedMeetups.map((meetup, index) => {
                    const imageUrl = (meetup.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${meetup.id}/600/400`;
                    const date = new Date(meetup.details.start_date);
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();

                    return (
                        <div
                            key={meetup.id}
                            onMouseEnter={() => setActiveImage(imageUrl)}
                            className="group relative flex flex-col md:grid md:grid-cols-12 items-center px-10 py-12 border-b border-zinc-100 transition-all duration-500 hover:bg-black"
                        >
                            <div className="col-span-1 relative z-10 mb-4 md:mb-0">
                                <span className="text-sm font-black italic text-zinc-300 group-hover:text-white opacity-50 transition-colors tabular-nums">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>

                            <div className="col-span-2 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-1 group-hover:text-zinc-600 transition-colors">{month}</span>
                                    <h3 className="text-5xl font-black italic tracking-tighter text-black group-hover:text-white transition-colors tabular-nums leading-none">
                                        {day}
                                    </h3>
                                </div>
                            </div>

                            <div className="col-span-4 relative z-10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] font-black uppercase tracking-widest transition-colors group-hover:text-white" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                        {meetup.details.format?.replace('_', ' ') || 'GENERAL'}
                                    </span>
                                    <h4 className="text-xl font-black uppercase italic tracking-tight text-black group-hover:text-white transition-colors leading-none">
                                        {meetup.name}
                                    </h4>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] group-hover:text-zinc-500 transition-colors line-clamp-1">
                                        {meetup.basics?.description || 'Identity verification required for entry'}
                                    </p>
                                </div>
                            </div>

                            <div className="col-span-2 relative z-10 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Location</span>
                                    <span className="text-sm font-black text-black group-hover:text-white transition-colors uppercase leading-none mt-1">
                                        {meetup.details.format === 'virtual' ? 'Remote' : 'Ground'}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Access</span>
                                    <span className="text-sm font-black text-black group-hover:text-white transition-colors uppercase leading-none mt-1">
                                        {meetup.details.access?.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-2 relative z-10 flex items-center gap-4 border-l border-zinc-100 pl-8 group-hover:border-zinc-800 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Time_Reference</span>
                                    <span className="text-[10px] font-black text-black uppercase italic group-hover:text-white transition-colors">
                                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} HRS
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-1 flex justify-end relative z-10">
                                <div
                                    className="w-10 h-10 border border-zinc-200 rotate-45 flex items-center justify-center transition-all duration-300 group-hover:border-transparent group-hover:bg-primary"
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <div className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                                        <ArrowUpRight
                                            size={14}
                                            strokeWidth={3}
                                            className="text-zinc-400 group-hover:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
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