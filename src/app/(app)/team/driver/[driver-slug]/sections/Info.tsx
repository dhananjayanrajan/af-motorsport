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
            className="relative h-[400vh] bg-white"
        >
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex items-center gap-12 md:gap-24 px-8 md:px-20"
                >
                    <div className="flex-shrink-0 w-[85vw] md:w-[30vw] flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-1 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />
                            <span className={cn("text-xs font-black uppercase italic text-zinc-500", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
                                BIOGRAPHY
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter text-zinc-900">
                            Driver <br /> Background
                        </h2>
                        <div className="h-1 w-full bg-zinc-900" />
                    </div>

                    {segments.map((text, i) => {
                        const mediaItem = gallery[i]?.image;
                        const imageUrl = typeof mediaItem === 'object' ? mediaItem?.url : null;
                        const finalImage = imageUrl || `https://picsum.photos/seed/${driver.id}_${i}/800/1000`;

                        return (
                            <React.Fragment key={i}>
                                <div className="flex-shrink-0 w-[75vw] md:w-[25vw]">
                                    <div className="relative aspect-[3/4] overflow-hidden border-2 border-zinc-900 bg-zinc-100">
                                        <img
                                            src={finalImage}
                                            alt={driver.last_name}
                                            className="w-full h-full object-cover grayscale"
                                        />
                                        <div className={`absolute bottom-4 left-4 px-3 py-1 border border-zinc-900 bg-white`}>
                                            <span className="text-[10px] font-black uppercase text-zinc-900">
                                                IMAGE_{i + 1}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 w-[85vw] md:w-[45vw] flex flex-col gap-8">
                                    <div className="flex items-center gap-4">
                                        <span className={`text-sm font-black italic text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}>
                                            0{i + 1}
                                        </span>
                                        <div className="flex-1 h-px bg-zinc-200" />
                                    </div>
                                    <p className="text-base md:text-xl font-medium italic leading-relaxed text-zinc-800">
                                        {text}
                                    </p>
                                </div>
                            </React.Fragment>
                        );
                    })}

                    <div className="flex-shrink-0 w-[85vw] md:w-[30vw] border-l-4 pl-12 flex flex-col gap-6 border-zinc-900">
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">
                            PROFILE END
                        </span>
                        <div className="flex flex-col">
                            <span className="text-7xl md:text-9xl font-black italic leading-none text-zinc-900">
                                {driver.basics?.racing_number || '00'}
                            </span>
                            <span className={`text-2xl font-black italic uppercase text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}>
                                {driver.last_name}
                            </span>
                        </div>
                        <div className="h-2 w-full mt-4 bg-zinc-900" />
                    </div>
                </motion.div>
            </div>

            {isInView && (
                <motion.div
                    style={{ opacity: progressOpacity }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-8 z-50"
                >
                    <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm p-4 border border-zinc-200 shadow-sm">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">
                                PROGRESS
                            </span>
                            <span className="text-[10px] font-mono font-bold text-zinc-900">
                                {Math.round(scrollYProgress.get() * 100)}%
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-100">
                            <motion.div
                                style={{ scaleX: scrollYProgress }}
                                className={`h-full w-full origin-left bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}