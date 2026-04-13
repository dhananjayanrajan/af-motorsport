'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Season, Series } from '@/payload-types';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

interface SeasonsSectionProps {
    seasons: Season[];
}

export default function SeasonsSection({ seasons }: SeasonsSectionProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

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
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE }}
            className="relative w-full border-b border-zinc-100 cursor-none"
        >
            <div className="px-20 py-20 flex items-end justify-between border-b border-zinc-200">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-2 h-2"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL} text-zinc-400`}>
                            Complete Overview
                        </span>
                    </div>
                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Seasons
                    </h2>
                </div>
            </div>

            <div className="flex flex-col">
                {seasons.map((season) => {
                    const imageUrl = (season.assets?.cover as any)?.url || `https://picsum.photos/seed/${season.id}/600/400`;
                    const seriesData = season.details?.series as Series | undefined;

                    return (
                        <Link
                            key={season.id}
                            href={`/competition/season/${season.slug}`}
                            onMouseEnter={() => setActiveImage(imageUrl)}
                            className="group relative grid grid-cols-12 items-center px-10 py-8 border-b transition-colors duration-300"
                            style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}
                        >
                            <div className="col-span-1 relative z-10">
                                <span className="text-[10px] font-black uppercase italic group-hover:text-white transition-colors duration-300" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                                    {season.basics?.identifiers?.abbreviation}
                                </span>
                            </div>

                            <div className="col-span-6 relative z-10">
                                <div className="flex flex-col">
                                    <h3 className="text-base font-black uppercase italic tracking-tight group-hover:translate-x-2 group-hover:text-white transition-all duration-300" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                        {season.name}
                                    </h3>
                                    {season.basics?.tagline && (
                                        <p className="text-[8px] font-bold uppercase tracking-widest mt-1 group-hover:text-white/60 transition-colors duration-300" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                                            {season.basics.tagline}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-4 grid grid-cols-3 gap-8 relative z-10">
                                {[
                                    { label: seriesData?.basics?.identifiers?.code, value: season.details?.entries },
                                    { label: season.basics?.identifiers?.code, value: season.details?.races },
                                    { label: season.basics?.identifiers?.abbreviation, value: season.id }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-widest group-hover:text-white/40 transition-colors duration-300" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                                            {stat.label}
                                        </span>
                                        <span className="text-[10px] font-bold group-hover:text-white transition-colors duration-300" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="col-span-1 flex justify-end relative z-10">
                                <div className="w-1 h-6 transition-all duration-300 group-hover:h-10 group-hover:bg-white" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            </div>

                            <motion.div
                                initial={false}
                                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                            />
                        </Link>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            left: smoothX,
                            top: smoothY,
                            translateX: '-50%',
                            translateY: '-50%',
                            pointerEvents: 'none',
                            position: 'absolute',
                            zIndex: 50,
                            width: '320px',
                            height: '200px',
                            overflow: 'hidden',
                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK,
                        }}
                    >
                        <motion.img
                            key={activeImage}
                            src={activeImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}