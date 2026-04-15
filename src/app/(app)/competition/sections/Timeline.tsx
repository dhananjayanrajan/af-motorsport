'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit } from '@/payload-types';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface RenovationsTimelineProps {
    circuit: Circuit;
}

export default function RenovationsTimeline({ circuit }: RenovationsTimelineProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    const events = [
        {
            year: circuit.details?.opened || '2026',
            label: 'Initial Commission',
            description: 'The foundation of the circuit is laid and officially opened for international competition.'
        },
        ...(circuit.details?.renovated?.list || []).map(item => ({
            year: item.year || '',
            label: 'Structural Upgrade',
            description: item.description || 'Major facility enhancements and track surface optimization.'
        })),
        ...(circuit.details?.closed ? [{
            year: circuit.details.closed,
            label: 'Decommissioned',
            description: 'The circuit reaches its final operational phase and is officially retired.'
        }] : [])
    ].sort((a, b) => parseInt(a.year) - parseInt(b.year));

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(events.length - 1) * 25}%`]);
    const smoothX = useSpring(x, { stiffness: 40, damping: 20 });
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            ref={targetRef}
            className="relative h-[400vh] border-t overflow-clip"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE, borderColor: DESIGN_SYSTEM.COLORS.WHITE[300] }}
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center">
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
                                Changes Over Time
                            </span>
                            <div className="w-8 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                            Evolution
                        </h2>

                        <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </motion.div>
                </div>

                <div className="relative w-full">
                    <div className="absolute top-[8px] left-0 w-full h-[12px] z-0" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[400] }}>
                        <motion.div
                            className="h-full"
                            style={{
                                width: progressWidth,
                                backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                boxShadow: `0 0 40px ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}`
                            }}
                        />
                    </div>

                    <motion.div style={{ x: smoothX }} className="flex relative z-10">
                        {events.map((event, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 w-[100vw] md:w-[60vw] lg:w-[45vw] px-20"
                            >
                                <div className="relative">
                                    <div
                                        className="w-8 h-8 rotate-45 border-[6px] mb-20"
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                            borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE
                                        }}
                                    />

                                    <div className="flex flex-col">
                                        <span
                                            className="text-9xl font-mono font-black italic leading-none tracking-tighter"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            {event.year && !isNaN(Date.parse(event.year))
                                                ? new Date(event.year).getFullYear()
                                                : event.year}
                                        </span>

                                        <div className="mt-12 pt-12 border-t-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                            <span
                                                className="text-[12px] font-black uppercase tracking-[0.5em] block mb-6"
                                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                            >
                                                {event.label}
                                            </span>
                                            <p
                                                className="text-xl font-bold leading-relaxed max-w-md italic"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-6 md:left-20">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                        <span
                            className="text-[10px] font-black uppercase tracking-widest"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            Vertical Scroll Control
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}