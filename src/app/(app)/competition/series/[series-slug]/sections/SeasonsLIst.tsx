'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Driver, Media, Season } from '@/payload-types';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import React, { useMemo, useRef, useState } from 'react';

interface SeasonsListProps {
    seasons: Season[];
    seriesSlug: string;
}

export default function SeasonsList({ seasons, seriesSlug }: SeasonsListProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const sortedSeasons = useMemo(() => {
        return [...seasons].sort((a, b) => {
            const yearA = parseInt(a.name.match(/\d{4}/)?.[0] || '0');
            const yearB = parseInt(b.name.match(/\d{4}/)?.[0] || '0');
            return yearB - yearA;
        });
    }, [seasons]);

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
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            Chronological_Archive
                        </span>
                    </div>
                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Seasons
                    </h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Total_Cycles</span>
                    <span className="text-3xl font-black italic tabular-nums">{seasons.length.toString().padStart(2, '0')}</span>
                </div>
            </div>

            <div className="flex flex-col">
                {sortedSeasons.map((season, index) => {
                    const imageUrl = (season.assets?.cover as any)?.url || `https://picsum.photos/seed/${season.id}/600/400`;
                    const year = season.name.match(/\d{4}/)?.[0] || '0000';
                    const champion = (season as any).details?.winner as Driver | null;

                    const championAvatar = (champion?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/champ-${season.id}/100/100`;
                    const championName = `${(champion as any)?.basics?.first_name || ''} ${(champion as any)?.basics?.last_name || ''}`.trim() || 'TBD';

                    return (
                        <Link
                            key={season.id}
                            href={`/competition/series/${seriesSlug}/${season.slug}`}
                            onMouseEnter={() => setActiveImage(imageUrl)}
                            className="group relative flex flex-col md:grid md:grid-cols-12 items-center px-10 py-12 border-b border-zinc-100 transition-all duration-500 hover:bg-black"
                        >
                            <div className="col-span-1 relative z-10 mb-4 md:mb-0">
                                <span className="text-sm font-black italic text-zinc-300 group-hover:text-primary transition-colors tabular-nums" style={{ color: '' }}>
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>

                            <div className="col-span-2 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-1 group-hover:text-zinc-600 transition-colors">Cycle</span>
                                    <h3 className="text-5xl font-black italic tracking-tighter text-black group-hover:text-white transition-colors tabular-nums leading-none">
                                        {year}
                                    </h3>
                                </div>
                            </div>

                            <div className="col-span-4 relative z-10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] font-black uppercase tracking-widest transition-colors group-hover:text-white" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                        {season.basics?.identifiers?.abbreviation || 'REG_REF'}
                                    </span>
                                    <h4 className="text-xl font-black uppercase italic tracking-tight text-black group-hover:text-white transition-colors leading-none">
                                        {season.name}
                                    </h4>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] group-hover:text-zinc-500 transition-colors">
                                        {season.basics?.tagline || 'Technical parameters verified'}
                                    </p>
                                </div>
                            </div>

                            <div className="col-span-2 relative z-10 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Grid</span>
                                    <span className="text-lg font-black text-black group-hover:text-white transition-colors tabular-nums leading-none">
                                        {season.details.entries?.toString().padStart(2, '0') || '00'}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-300 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Races</span>
                                    <span className="text-lg font-black text-black group-hover:text-white transition-colors tabular-nums leading-none">
                                        {season.details.races?.toString().padStart(2, '0') || '00'}
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-2 relative z-10 flex items-center gap-4 border-l border-zinc-100 pl-8 group-hover:border-zinc-800 transition-colors">
                                <div className="w-10 h-10 bg-zinc-100 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={championAvatar} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Champion</span>
                                    <span className="text-[10px] font-black text-black uppercase italic truncate group-hover:text-white transition-colors">
                                        {championName}
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