'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { cn } from '@/utilities/cn';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

interface InfoSectionProps {
    driver: any;
}

export default function InfoSection({ driver }: InfoSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.01 });

    const parseLexical = (content: any): string[] => {
        if (!content?.root?.children) return [];
        return content.root.children
            .filter((child: any) => child.type === 'paragraph')
            .map((p: any) => p.children?.map((node: any) => node.text || '').join('').trim())
            .filter((text: string) => text.length > 5);
    };

    const storySegments = parseLexical(driver.details?.story);
    const bioSegments = parseLexical(driver.details?.biography);
    const segments = [...storySegments, ...bioSegments];
    const gallery = driver.assets?.gallery?.list || [];

    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
    const progressOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-[400vh]"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex items-center gap-12 md:gap-24 px-8 md:px-20"
                >
                    <div className="flex-shrink-0 w-[85vw] md:w-[30vw] flex flex-col gap-6 group pointer-events-auto">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-1 transition-all duration-300 group-hover:w-20"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            />
                            <span
                                className={cn("text-xs font-black uppercase italic transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                            >
                                BIOGRAPHY
                            </span>
                        </div>
                        <h2
                            className={`text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-primary-500`}
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            Driver <br /> Background
                        </h2>
                        <div className="h-1 w-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                    </div>

                    {segments.map((text, i) => {
                        const mediaItem = gallery[i]?.image;
                        const imageUrl = typeof mediaItem === 'object' ? mediaItem?.url : null;
                        const finalImage = imageUrl || `https://picsum.photos/seed/${driver.id}_${i}/800/1000`;

                        return (
                            <React.Fragment key={i}>
                                <div className="flex-shrink-0 w-[75vw] md:w-[25vw]">
                                    <div
                                        className={`relative aspect-[3/4] overflow-hidden border-2 bg-zinc-100 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} hover:border-primary-500 group pointer-events-auto`}
                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                    >
                                        <img
                                            src={finalImage}
                                            alt={driver.last_name}
                                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                        />
                                        <div
                                            className="absolute bottom-4 left-4 px-3 py-1 border transition-colors group-hover:bg-primary-500"
                                            style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE, backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                        >
                                            <span
                                                className="text-[10px] font-black uppercase transition-colors group-hover:text-white"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                IMAGE_{i + 1}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 w-[85vw] md:w-[45vw] flex flex-col gap-8 group pointer-events-auto">
                                    <div className="flex items-center gap-4">
                                        <span
                                            className="text-sm font-black italic transition-colors group-hover:text-secondary-500"
                                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                        >
                                            0{i + 1}
                                        </span>
                                        <div className="flex-1 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }} />
                                    </div>
                                    <p
                                        className={`text-base md:text-xl font-medium italic leading-relaxed transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-black`}
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[800] }}
                                    >
                                        {text}
                                    </p>
                                </div>
                            </React.Fragment>
                        );
                    })}

                    <div
                        className="flex-shrink-0 w-[85vw] md:w-[30vw] border-l-4 pl-12 flex flex-col gap-6 group pointer-events-auto transition-all"
                        style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        <span
                            className="text-xs font-black uppercase tracking-widest transition-colors group-hover:text-primary-500"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                        >
                            PROFILE END
                        </span>
                        <div className="flex flex-col">
                            <span
                                className={`text-7xl md:text-9xl font-black italic leading-none transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-primary-500`}
                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                            >
                                {driver.basics?.racing_number || '00'}
                            </span>
                            <span
                                className="text-2xl font-black italic uppercase transition-colors group-hover:text-secondary-500"
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                {driver.last_name}
                            </span>
                        </div>
                        <div className="h-2 w-full mt-4" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                    </div>
                </motion.div>
            </div>

            {isInView && (
                <motion.div
                    style={{ opacity: progressOpacity }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-8 z-50 pointer-events-auto"
                >
                    <div
                        className="flex flex-col gap-2 backdrop-blur-sm p-4 border shadow-sm transition-all hover:border-black"
                        style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}CC`, borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                    >
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                PROGRESS
                            </span>
                            <span className="text-[10px] font-mono font-bold" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                {Math.round(scrollYProgress.get() * 100)}%
                            </span>
                        </div>
                        <div className="h-1.5 w-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                            <motion.div
                                style={{
                                    scaleX: scrollYProgress,
                                    backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500]
                                }}
                                className="h-full w-full origin-left"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}