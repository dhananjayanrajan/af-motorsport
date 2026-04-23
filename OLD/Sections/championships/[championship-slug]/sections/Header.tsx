'use client';

import MagicRings from '@/components/MagicRings';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Media } from '@/payload-types';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';

interface ChampionshipHeaderProps {
    championship: Championship;
}

export default function ChampionshipHeader({ championship }: ChampionshipHeaderProps) {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { margin: "100px 0px 100px 0px" });
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const coverImage = championship.assets?.cover as Media;
    const seasonYear = championship.details?.season
        ? typeof championship.details.season === 'object' && 'name' in championship.details.season
            ? championship.details.season.name
            : championship.details.season
        : null;

    const titleParts = championship.name.split(' ');
    const mainTitle = titleParts.slice(0, -1).join(' ');
    const accentWord = titleParts[titleParts.length - 1];

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
            {isInView && (
                <>
                    <div className="absolute inset-0 z-0">
                        <MagicRings
                            color={DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                            colorTwo={DESIGN_SYSTEM.COLORS.SECONDARY[500]}
                            ringCount={10}
                            speed={1.2}
                            attenuation={12}
                            lineThickness={2.5}
                            baseRadius={0.3}
                            radiusStep={0.12}
                            scaleRate={0.02}
                            opacity={0.5}
                            blur={0}
                            noiseAmount={0}
                            rotation={0}
                            ringGap={1.5}
                            fadeIn={1}
                            fadeOut={0.4}
                            followMouse={true}
                            mouseInfluence={0.2}
                            hoverScale={1}
                            parallax={0.1}
                            clickBurst={true}
                        />
                    </div>

                    <motion.div style={{ y }} className="absolute inset-0 z-5">
                        {coverImage?.url && (
                            <>
                                <img
                                    src={coverImage.url}
                                    alt={championship.name}
                                    className="w-full h-full object-cover opacity-20"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                            </>
                        )}
                    </motion.div>

                    <motion.div style={{ opacity }} className="relative z-20 h-full flex flex-col items-center justify-end pb-32 md:pb-40 px-6">
                        <div className="text-center max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                            >
                                <Sparkles size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                    {championship.basics?.identifiers?.code || 'CHAMPIONSHIP'} {seasonYear || ''}
                                </span>
                            </motion.div>

                            <div className="space-y-2">
                                {mainTitle && (
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-sm md:text-lg font-black uppercase tracking-[0.2em]"
                                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                    >
                                        {mainTitle}
                                    </motion.h1>
                                )}
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter italic leading-[1.1]"
                                    style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                >
                                    {accentWord || championship.name}
                                </motion.h1>
                            </div>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="w-16 h-px mx-auto my-6"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            />

                            {championship.basics?.tagline && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="text-xs md:text-sm text-white/30 font-light tracking-wide max-w-md mx-auto"
                                >
                                    {championship.basics.tagline}
                                </motion.p>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="group cursor-pointer"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative">
                                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500" />
                                    <motion.div
                                        animate={{
                                            y: [0, 40, 0],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white/40 transition-all duration-300">
                                        DISCOVER
                                    </span>
                                    <motion.div
                                        animate={{ rotate: [0, 180, 360] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 flex items-center justify-center"
                                    >
                                        <ChevronDown size={10} className="text-white/20 group-hover:text-white/40 transition-all duration-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-15"
                    />
                </>
            )}
        </section>
    );
}