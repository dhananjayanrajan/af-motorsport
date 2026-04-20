'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit, Country } from '@/payload-types'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Globe, Map, Navigation } from 'lucide-react'
import { useRef, useState } from 'react'

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

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const mapRotate = useTransform(scrollYProgress, [0, 1], [20, 40]);

    const countryName = typeof circuit.details?.country === 'object'
        ? (circuit.details.country as Country)?.name
        : 'Global';

    const coords = circuit.details?.location || [0, 0];
    const turnsCount = circuit.details?.turns || 0;
    const circuitCode = circuit.basics?.identifiers?.code || 'CIRCUIT';

    const scrollToDetails = () => {
        const element = document.getElementById('circuit-specifications');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-black-pure overflow-hidden flex flex-col">
            {isInView && (
                <>
                    <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                        <div className="relative w-full h-full">
                            <img
                                src={`https://picsum.photos/seed/${circuit.id}/1920/1080?grayscale`}
                                alt={circuit.name}
                                className="w-full h-full object-cover opacity-20 contrast-150"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black-pure/20 via-black-pure/60 to-black-pure" />
                        </div>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: isHovering ? 1 : 0.5,
                            rotateX: 50,
                            rotateZ: mapRotate,
                            scale: 1.15,
                            perspective: '1500px',
                        }}
                        className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none transition-opacity duration-700"
                    >
                        <svg viewBox="0 0 1000 700" className="w-[80%] h-[80%] overflow-visible">
                            <motion.path
                                d={TRACK_LAYOUT}
                                fill="none"
                                stroke={DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                                strokeWidth="6"
                                strokeLinecap="square"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <motion.circle
                                r="8"
                                fill={DESIGN_SYSTEM.COLORS.WHITE.PURE}
                                animate={{ offsetDistance: ["0%", "100%"] }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                style={{ offsetPath: `path('${TRACK_LAYOUT}')` }}
                            />
                        </svg>
                    </motion.div>

                    <div className="relative z-20 w-full h-full flex flex-col px-10 md:px-20 py-16">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => window.open(`https://www.google.com/maps?q=${coords[0]},${coords[1]}`, '_blank')}
                                    className="flex items-center gap-3 text-primary-500 hover:text-white-pure transition-colors group focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <Globe size={18} />
                                    <span className="text-xs font-black uppercase tracking-[0.4em]">{countryName} Territory</span>
                                </button>
                                <div className="flex flex-col gap-2">
                                    <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white-pure leading-none">
                                        {circuit.name}
                                    </span>
                                    <span className="text-xs font-black uppercase tracking-[0.5em] text-white-pure/40">
                                        Location {coords[0]} North {coords[1]} East
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-16">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary-500">Track Code</span>
                                    <span className="text-2xl font-black text-white-pure uppercase italic tracking-tighter">{circuitCode}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-tertiary-500">Turn Total</span>
                                    <span className="text-2xl font-black text-white-pure uppercase italic tracking-tighter">{turnsCount}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col md:flex-row items-end justify-between gap-12">
                            <div className="max-w-xl flex flex-col gap-8">
                                <div className="h-1.5 w-40 bg-primary-500" />
                                <p className="text-sm md:text-base font-black uppercase tracking-widest text-white-pure/60 leading-relaxed italic">
                                    {circuit.basics?.tagline || 'A high performance racing environment verified for championship competition.'}
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                        className="px-8 py-4 bg-white-pure text-black-pure font-black uppercase text-xs tracking-widest hover:bg-primary-500 hover:text-white-pure transition-all active:scale-95 flex items-center gap-3"
                                    >
                                        <Map size={16} />
                                        Interactive Map
                                    </button>
                                    <button
                                        className="px-8 py-4 border-2 border-white-pure/20 text-white-pure font-black uppercase text-xs tracking-widest hover:border-primary-500 hover:text-primary-500 transition-all flex items-center gap-3"
                                    >
                                        <Navigation size={16} />
                                        Entry Points
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={scrollToDetails}
                                className="flex flex-col items-center gap-4 group focus:outline-none"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white-pure/30 group-hover:text-primary-500 transition-colors">
                                    Technical Specs
                                </span>
                                <div className="p-4 rounded-full border border-white-pure/10 group-hover:border-primary-500 transition-colors">
                                    <ChevronDown className="text-white-pure/30 group-hover:text-primary-500 group-hover:translate-y-1 transition-all" />
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div id="circuit-specifications" className="absolute bottom-0 h-px w-full" />
        </section>
    );
}