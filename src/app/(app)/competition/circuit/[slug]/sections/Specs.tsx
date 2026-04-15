'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit } from '@/payload-types';
import { Calendar, Hash, RotateCcw, RotateCw, Ruler, ShieldCheck, Target, Users, Zap } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface PhysicalSpecsProps {
    circuit: Circuit;
}

export default function PhysicalSpecs({ circuit }: PhysicalSpecsProps) {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { margin: "-100px 0px -100px 0px", once: true });
    const [autoHoverIndex, setAutoHoverIndex] = useState<number | null>(null);

    const specs = useMemo(() => [
        {
            label: 'Direction',
            value: circuit.details?.direction || 'N/A',
            icon: circuit.details?.direction === 'anticlockwise' ? RotateCcw : RotateCw,
            sub: circuit.details?.type || 'Circuit'
        },
        {
            label: 'Elevation',
            value: `${circuit.details?.elevation_change || 0}m`,
            component: <ElevationMiniGraph delta={circuit.details?.elevation_change || 0} />,
            sub: 'Height Difference'
        },
        {
            label: 'FIA Grade',
            value: circuit.details?.fia_grade ? `Grade ${circuit.details.fia_grade}` : 'None',
            icon: ShieldCheck,
            sub: 'License Level',
            highlight: true
        },
        {
            label: 'Length',
            value: circuit.details?.length_km ? `${circuit.details.length_km} KM` : '0 KM',
            icon: Ruler,
            sub: circuit.details?.length_miles ? `${circuit.details.length_miles} Miles` : 'Metric'
        },
        {
            label: 'Turns',
            value: `${circuit.details?.turns || 0}`,
            icon: Hash,
            sub: 'Total Corners'
        },
        {
            label: 'DRS',
            value: `${circuit.details?.drs_zones || 0}`,
            icon: Zap,
            sub: 'Pass Zones'
        },
        {
            label: 'Year Opened',
            value: circuit.details?.opened || 'N/A',
            icon: Calendar,
            sub: 'First Race'
        },
        {
            label: 'Capacity',
            value: circuit.details?.capacity?.toLocaleString() || 'N/A',
            icon: Users,
            sub: 'Seats'
        }
    ], [circuit]);

    useEffect(() => {
        const interval = setInterval(() => {
            setAutoHoverIndex(Math.floor(Math.random() * 144));
            setTimeout(() => setAutoHoverIndex(null), 1000);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full py-24 px-6 md:px-20 border-t relative overflow-hidden"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                borderColor: DESIGN_SYSTEM.COLORS.WHITE[400]
            }}
        >
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
                {Array.from({ length: 144 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="border-[0.5px]"
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.WHITE[300] }}
                        animate={{
                            backgroundColor: autoHoverIndex === i ? DESIGN_SYSTEM.COLORS.PRIMARY.MUTED : "transparent",
                        }}
                        whileHover={{
                            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED,
                            transition: { duration: 0 }
                        }}
                        transition={{ duration: 1 }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col justify-center items-center mb-16">
                    <span
                        className="text-[10px] font-black uppercase mb-2"
                        style={{
                            color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                            letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL
                        }}
                    >
                        Circuit Metrics
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                        Specifications
                    </h2>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[500] }}
                >
                    {specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: i * 0.05 }}
                            className="relative group overflow-hidden"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                                style={{
                                    background: `linear-gradient(135deg, ${DESIGN_SYSTEM.COLORS.PRIMARY.MUTED} 0%, transparent 100%)`
                                }}
                            />

                            <div className="relative p-10 flex flex-col gap-10 z-10 min-h-[240px]">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">
                                        {spec.label}
                                    </span>
                                    {spec.icon && (
                                        <spec.icon
                                            size={16}
                                            style={{ color: spec.highlight ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE[800] }}
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1 mt-auto">
                                    <span className="text-4xl font-mono font-black uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                        {spec.value}
                                    </span>
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-wider"
                                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE[950] }}
                                    >
                                        {spec.sub}
                                    </span>
                                </div>

                                {spec.component && <div className="h-10 w-full mt-2">{spec.component}</div>}
                            </div>

                            <div
                                className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            />

                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Target size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ElevationMiniGraph({ delta }: { delta: number }) {
    const isClimb = delta > 0;
    const isFlat = delta === 0;

    return (
        <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d={isFlat ? "M0 10 L100 10" : isClimb ? "M0 18 L30 18 L70 2 L100 2" : "M0 2 L30 2 L70 18 L100 18"}
                fill="none"
                stroke={isFlat ? DESIGN_SYSTEM.COLORS.SECONDARY[500] : DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                strokeWidth="3"
                strokeLinecap="square"
            />
            <line x1="0" y1="0" x2="100" y2="0" stroke="black" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="1 4" />
            <line x1="0" y1="20" x2="100" y2="20" stroke="black" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="1 4" />
        </svg>
    );
}