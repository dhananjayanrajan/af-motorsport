'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Season, Series } from '@/payload-types';
import { motion } from 'framer-motion';

interface SeasonHeaderProps {
    season: Season;
}

export default function SeasonHeader({ season }: SeasonHeaderProps) {
    const cover = season.assets?.cover as Media;
    const series = season.details.series as Series;
    const coverUrl = cover?.url || `https://picsum.photos/seed/season-${season.id}/1920/1080`;

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
            >
                <img src={coverUrl} alt="" className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </motion.div>

            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-16 lg:p-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4"
                >
                    <span className="bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                        {series?.basics?.identifiers?.abbreviation || 'SERIES'}
                    </span>
                    <div className="h-[1px] w-12 bg-white/30" />
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                        {season.basics?.identifiers?.code || season.id}
                    </span>
                </motion.div>

                <div className="flex flex-col gap-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter text-white leading-[0.8]"
                    >
                        {season.name}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-12 border-t border-white/10 pt-12"
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Grid_Capacity</span>
                            <span className="text-4xl font-black italic text-white tabular-nums">
                                {season.details.entries?.toString().padStart(2, '0') || '00'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Race_Events</span>
                            <span className="text-4xl font-black italic text-white tabular-nums">
                                {season.details.races?.toString().padStart(2, '0') || '00'}
                            </span>
                        </div>
                        <div className="ml-auto flex flex-col items-end gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">System_Status</span>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-sm font-black uppercase text-white">Live_Archive</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}