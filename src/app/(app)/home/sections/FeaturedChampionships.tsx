'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Media, Season, Series } from '@/payload-types';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import dummyData from '../dummy.json';

interface FeaturedChampionshipsProps {
    championships: Championship[];
    series: Series[];
    seasons: Season[];
}

export default function FeaturedChampionships({
    championships,
    series,
    seasons,
}: FeaturedChampionshipsProps) {
    const displayChampionships = championships && championships.length > 0
        ? championships
        : (dummyData.championships as unknown as Championship[]);

    const displaySeries = series && series.length > 0
        ? series
        : (dummyData.series as unknown as Series[]);

    const displaySeasons = seasons && seasons.length > 0
        ? seasons
        : (dummyData.seasons as unknown as Season[]);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headerY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setHoveredIndex((prev) => (prev === null ? 0 : (prev + 1) % displayChampionships.length));
        }, 3000);

        return () => clearInterval(interval);
    }, [displayChampionships.length, isAutoPlaying]);

    const handleMouseEnter = (idx: number) => {
        setIsAutoPlaying(false);
        setHoveredIndex(idx);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
        setHoveredIndex(null);
    };

    return (
        <section
            ref={sectionRef}
            className="py-32 px-6 md:px-12 border-t relative overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
        >
            <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    d="M-10,50 C20,20 80,80 110,50"
                    stroke={DESIGN_SYSTEM.COLORS.PRIMARY}
                    strokeWidth="0.1"
                    fill="none"
                    style={{ pathLength: scrollYProgress }}
                />
                <motion.path
                    d="M-10,60 C20,30 80,90 110,60"
                    stroke={DESIGN_SYSTEM.COLORS.BLACK}
                    strokeWidth="0.05"
                    fill="none"
                    style={{ pathLength: scrollYProgress }}
                />
            </svg>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                            <h2
                                className="text-[11px] font-mono tracking-[0.4em] uppercase"
                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}
                            >
                                COMPETITION_STREAM // GLOBAL_ACCESS
                            </h2>
                        </div>
                        <h3
                            className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                        >
                            FEATURED<br />
                            <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                                CHAMPIONSHIPS
                            </span>
                        </h3>
                    </div>

                    <motion.button
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] transition-all cursor-pointer relative overflow-hidden pb-1"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                        whileHover="hover"
                    >
                        VIEW ALL SERIES
                        <motion.svg
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            variants={{
                                hover: { x: 5 }
                            }}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </motion.svg>
                        <motion.div
                            className="absolute bottom-0 left-0 h-0.5"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
                            initial={{ width: 0 }}
                            variants={{
                                hover: { width: '100%' }
                            }}
                        />
                    </motion.button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-300 border border-zinc-300">
                    {displayChampionships.map((champ, idx) => {
                        const seriesId = typeof champ.details?.series === 'object'
                            ? champ.details.series?.id
                            : champ.details?.series;

                        const associatedSeries = displaySeries.find((s) => s.id === seriesId);

                        const latestSeason = displaySeasons.find((s) => {
                            const seasonSeriesId = typeof s.details?.series === 'object'
                                ? (s.details.series as any)?.id
                                : s.details?.series;
                            return seasonSeriesId === seriesId;
                        });

                        const isHovered = hoveredIndex === idx;

                        return (
                            <motion.div
                                key={champ.id}
                                className="group relative overflow-hidden cursor-pointer"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE }}
                                onMouseEnter={() => handleMouseEnter(idx)}
                                onMouseLeave={handleMouseLeave}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                            >
                                <div className="aspect-[16/10] overflow-hidden relative bg-zinc-200">
                                    <motion.img
                                        src={champ.assets?.thumbnail && typeof champ.assets.thumbnail !== 'number'
                                            ? (champ.assets.thumbnail as Media).url || `https://picsum.photos/id/${30 + idx}/800/600`
                                            : `https://picsum.photos/id/${30 + idx}/800/600`
                                        }
                                        alt={champ.name}
                                        className="w-full h-full object-cover transition-all duration-700"
                                        animate={{
                                            scale: isHovered ? 1.08 : 1,
                                            filter: isHovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(100%) brightness(0.9)'
                                        }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 transition-opacity duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, ${DESIGN_SYSTEM.COLORS.PRIMARY}25 100%)`,
                                            opacity: isHovered ? 1 : 0
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/5 to-transparent" />

                                    <div className="absolute top-0 left-0 p-4">
                                        <div
                                            className="text-white text-[9px] font-black uppercase px-4 py-2 tracking-widest skew-x-[-15deg] shadow-lg"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                        >
                                            <div className="skew-x-[15deg]">
                                                {associatedSeries?.basics?.identifiers?.code || 'CHAMPIONSHIP'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            <span className="text-[10px] font-mono tracking-wider uppercase font-bold" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_700 }}>
                                                {latestSeason?.name || 'SEASON_01'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 pb-4 relative">
                                    <div className="mb-8 relative h-20">
                                        <motion.h4
                                            className="text-2xl font-black uppercase italic mb-2 tracking-tight transition-transform absolute inset-0"
                                            animate={{ x: isHovered ? 8 : 0 }}
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                                        >
                                            {champ.name}
                                        </motion.h4>

                                        <AnimatePresence>
                                            {isHovered && champ.basics?.tagline && (
                                                <motion.p
                                                    className="text-[10px] font-bold uppercase tracking-widest absolute bottom-0 left-0"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}
                                                >
                                                    {champ.basics.tagline}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                        <div>
                                            <span
                                                className="block text-[9px] uppercase font-mono tracking-widest mb-1 font-bold"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                                            >
                                                ACTIVE SEASON
                                            </span>
                                            <span
                                                className="text-sm font-black uppercase italic"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC_900 }}
                                            >
                                                {latestSeason?.name?.split(' ')[0] || 'CURRENT'}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className="block text-[9px] uppercase font-mono tracking-widest mb-1 font-bold"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                                            >
                                                STATUS
                                            </span>
                                            <span
                                                className="text-sm font-black uppercase italic inline-flex items-center gap-2"
                                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                            >
                                                <div className="size-2 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                LIVE DATA
                                            </span>
                                        </div>
                                    </div>

                                    <motion.a
                                        href={`/championships/${champ.alias || champ.id}`}
                                        className="mt-8 flex items-center justify-between w-full p-5 transition-all duration-300 relative overflow-hidden"
                                        animate={{
                                            backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_100,
                                            color: isHovered ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.ZINC_700,
                                            y: isHovered ? -5 : 0
                                        }}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] relative z-10">
                                            ACCESS_STANDINGS_REPORT
                                        </span>
                                        <motion.svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            className="relative z-10"
                                            animate={{ x: isHovered ? 8 : 0 }}
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </motion.svg>
                                    </motion.a>
                                </div>

                                <motion.div
                                    className="absolute bottom-0 left-0 h-1.5"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: isHovered ? '100%' : '0%' }}
                                    transition={{ duration: 0.4 }}
                                />
                                <motion.div
                                    className="absolute top-0 right-0 w-1.5"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                    initial={{ height: '0%' }}
                                    animate={{ height: isHovered ? '100%' : '0%' }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}