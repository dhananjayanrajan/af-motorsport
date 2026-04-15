'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Driver, Media } from '@/payload-types';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface ChampionshipTimelineProps {
    championship: Championship;
}

export default function ChampionshipTimeline({ championship }: ChampionshipTimelineProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    const startDate = championship.details?.start_date;
    const endDate = championship.details?.end_date;
    const winner = championship.details?.winner as Driver;
    const coverImage = (championship.assets?.cover as Media)?.url || `https://picsum.photos/seed/${championship.id}/1920/1080`;

    const events = [
        {
            year: startDate || '2026',
            label: 'Season Launch',
            description: 'The commencement of the competitive calendar and regulatory validation for all entrants.'
        },
        {
            year: startDate && endDate ? new Date(new Date(startDate).getTime() + (new Date(endDate).getTime() - new Date(startDate).getTime()) / 2).toISOString() : '2026',
            label: 'Mid-Season Pivot',
            description: 'The critical inflection point where championship momentum is solidified and upgrades are deployed.'
        },
        {
            year: endDate || '2026',
            label: 'Grand Finale',
            description: winner?.last_name
                ? `The final classification is locked. ${winner.first_name} ${winner.last_name} secures the absolute title.`
                : 'The ultimate stage where the seasonal victor is crowned following the final chequered flag.'
        }
    ].sort((a, b) => {
        const dateA = new Date(a.year).getTime();
        const dateB = new Date(b.year).getTime();
        return dateA - dateB;
    });

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
                <div className="w-full h-[40vh] overflow-hidden mb-12">
                    <img
                        src={coverImage}
                        className="w-full h-full object-cover"
                        alt="Championship Status"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
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
                                Temporal Progress
                            </span>
                            <div className="w-8 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                            Evolution
                        </h2>

                        <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    </motion.div>
                </div>

                <div className="relative w-full z-10">
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
                        {events.map((event, i) => {
                            const dateObj = new Date(event.year);
                            const formattedDate = !isNaN(dateObj.getTime())
                                ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                : event.year;

                            return (
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
                                                {formattedDate}
                                            </span>

                                            <div className="mt-12 pt-12 border-t-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                <span
                                                    className="text-[12px] font-black uppercase tracking-[0.5em] block mb-6"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                                >
                                                    {event.label} — {dateObj.getFullYear()}
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
                            );
                        })}
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