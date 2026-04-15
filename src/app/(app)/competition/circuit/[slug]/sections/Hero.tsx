'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Country, Media } from '@/payload-types';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

interface CircuitHeroProps {
    circuit: Circuit;
}

const TRACK_LAYOUT = "M 100,400 L 350,400 L 400,350 L 400,100 L 550,100 L 800,300 L 800,500 L 650,600 L 250,600 L 100,450 Z";

export default function CircuitHero({ circuit }: CircuitHeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const isInView = useInView(containerRef, { margin: "100px 0px 100px 0px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const mapRotate = useTransform(scrollYProgress, [0, 1], [30, 50]);

    const coverImage = circuit.assets?.cover as Media;
    const countryName = typeof circuit.details?.country === 'object'
        ? (circuit.details.country as Country)?.name
        : '';

    const coords = circuit.details?.location || [0, 0];
    const turnsCount = circuit.details?.turns || 0;
    const circuitCode = circuit.basics?.identifiers?.code || '';
    const fiaGrade = circuit.details?.fia_grade || '';

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-end">
            {isInView && (
                <>
                    <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                        {coverImage?.url && (
                            <div className="relative w-full h-full">
                                <img
                                    src={coverImage.url}
                                    alt={circuit.name}
                                    className="w-full h-full object-cover grayscale opacity-10 contrast-[1.3]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        style={{
                            opacity: isHovering ? 0.8 : 0.4,
                            rotateX: 60,
                            rotateZ: mapRotate,
                            scale: 1.2,
                            translateY: '-10%',
                            perspective: '1500px',
                            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        className="absolute inset-0 z-5 flex items-center justify-center pointer-events-auto cursor-none"
                    >
                        <svg viewBox="0 0 1000 700" className="w-[90%] h-[90%] overflow-visible">
                            <defs>
                                <filter id="ultra-glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="5" result="blur5" />
                                    <feGaussianBlur stdDeviation="15" result="blur15" />
                                    <feMerge>
                                        <feMergeNode in="blur15" />
                                        <feMergeNode in="blur5" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <motion.path
                                d={TRACK_LAYOUT}
                                fill="none"
                                stroke={DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                                strokeWidth="3"
                                strokeLinecap="square"
                                filter="url(#ultra-glow)"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                            />

                            <motion.path
                                d={TRACK_LAYOUT}
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                                strokeDasharray="4 24"
                                className="opacity-20"
                                initial={{ strokeDashoffset: 0 }}
                                animate={{ strokeDashoffset: -1000 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.circle
                                r="4"
                                fill="white"
                                filter="url(#ultra-glow)"
                                animate={{ offsetDistance: ["0%", "100%"] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                style={{ offsetPath: `path('${TRACK_LAYOUT}')` }}
                            />

                            {turnsCount > 0 && Array.from({ length: turnsCount }).map((_, i) => (
                                <motion.g
                                    key={i}
                                    style={{
                                        offsetPath: `path('${TRACK_LAYOUT}')`,
                                        offsetDistance: `${(i / turnsCount) * 100}%`
                                    }}
                                >
                                    <circle r="2" fill={DESIGN_SYSTEM.COLORS.PRIMARY[500]} />
                                </motion.g>
                            ))}
                        </svg>
                    </motion.div>

                    <div className="relative z-20 w-full h-full flex flex-col justify-between p-12 md:p-20 pointer-events-none">
                        <div className="flex justify-between items-start w-full">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-1">
                                {circuitCode && (
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                        {circuitCode}
                                    </span>
                                )}
                                <div className="flex items-center gap-4 text-[9px] font-medium uppercase text-zinc-500 tracking-widest">
                                    {countryName && <span>{countryName}</span>}
                                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                                    <span>{coords[0]}° N / {coords[1]}° E</span>
                                </div>
                            </motion.div>

                            <motion.div animate={{ opacity: isHovering ? 1 : 0.3 }} className="flex flex-col items-end text-right gap-4">
                                {circuit.details?.elevation_change !== undefined && (
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">Elevation Change</span>
                                        <span className="text-sm font-bold text-white uppercase tracking-tighter">{circuit.details.elevation_change}m</span>
                                    </div>
                                )}
                                {circuit.details?.capacity && (
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">Capacity</span>
                                        <span className="text-sm font-bold text-white uppercase tracking-tighter">{circuit.details.capacity.toLocaleString()}</span>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-12 gap-10 items-end">
                            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="col-span-12 md:col-span-8">
                                <div className="flex flex-col gap-6">
                                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.8] italic">
                                        {circuit.name}
                                    </h1>
                                    <div className="flex items-center gap-8">
                                        <div className="flex flex-col">
                                            <div className="flex gap-1 mt-2">
                                                {[0, 1, 2].map((i) => (
                                                    <div key={i} className="h-1 bg-white/10 w-12 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ delay: 1 + (i * 0.2) }}
                                                            className="h-full"
                                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {circuit.basics?.tagline && (
                                            <p className="text-xs text-zinc-500 max-w-xs font-medium uppercase tracking-widest italic border-l border-white/10 pl-6">
                                                {circuit.basics.tagline}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-12 md:col-span-4 flex md:justify-end gap-12 pb-2">
                                {[
                                    { label: 'Length', val: circuit.details?.length_km ? `${circuit.details.length_km}km` : null },
                                    { label: 'Turns', val: turnsCount || null },
                                    { label: 'Grade', val: fiaGrade || null }
                                ].filter(s => s.val !== null).map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1 border-r border-white/5 last:border-0 pr-12 last:pr-0">
                                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">{stat.label}</span>
                                        <span className="text-2xl font-black uppercase italic text-white tracking-tighter">{stat.val}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-center border-t border-white/5 bg-gradient-to-r from-black via-transparent to-black">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-1">
                                {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} className="w-1 h-1 bg-primary rounded-full" />)}
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500">
                                {circuitCode} // {circuit.details?.type || ''}
                            </span>
                        </div>
                        <div className="flex items-center gap-10">
                            {circuit.details?.direction && (
                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500">
                                    Vector: {circuit.details.direction}
                                </span>
                            )}
                            <div className="w-px h-8 bg-white/10" />
                            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40">
                                {circuit.updatedAt}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}