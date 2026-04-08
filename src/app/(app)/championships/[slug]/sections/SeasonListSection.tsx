'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Media, Season } from '@/payload-types'
import { ArrowUpRight, CalendarDays, Hash, Trophy, Users } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

interface SeasonListSectionProps {
    seasons: Season[]
}

export default function SeasonListSection({ seasons }: SeasonListSectionProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <CalendarDays size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">HISTORICAL_INDEX_LATEST_SYNC</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Season<span className="text-zinc-900"> Archive</span>
                        </h2>
                    </div>
                    <div className="text-right">
                        <span className="block text-[7px] font-mono text-zinc-800 uppercase tracking-widest">TOTAL_RECORDS</span>
                        <span className="text-2xl font-black italic text-zinc-500">{seasons.length.toString().padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    {seasons.map((season, idx) => {
                        const coverImage = season.assets?.cover as Media

                        return (
                            <motion.div
                                key={season.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-black overflow-hidden"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-900">
                                    {coverImage?.url ? (
                                        <img
                                            src={coverImage.url}
                                            alt={season.name}
                                            className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                                            <Hash size={40} className="text-zinc-900" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1">
                                        <span className="text-[10px] font-black text-white italic tracking-tighter">
                                            {season.basics?.identifiers?.code || 'S' + season.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors" style={{ color: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                            {season.name}
                                        </h3>
                                        <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest line-clamp-1">
                                            {season.basics?.tagline || 'COMPETITIVE_SEASON_DATA_STREAMS'}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Trophy size={10} className="text-zinc-800" />
                                                <span className="text-[6px] font-black text-zinc-700 uppercase">CHAMPION_DRIVER</span>
                                            </div>
                                            <p className="text-[10px] font-black text-zinc-400 uppercase italic truncate">
                                                DATA_PENDING
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Users size={10} className="text-zinc-800" />
                                                <span className="text-[6px] font-black text-zinc-700 uppercase">CHAMPION_TEAM</span>
                                            </div>
                                            <p className="text-[10px] font-black text-zinc-400 uppercase italic truncate">
                                                DATA_PENDING
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-1 rounded-full bg-zinc-800 group-hover:bg-primary transition-colors" style={{ backgroundColor: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
                                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                                {season.details?.races || 0} ROUNDS_LOGGED
                                            </span>
                                        </div>
                                        <Link
                                            href={`/championships/seasons/${season.slug}`}
                                            className="size-10 border border-zinc-900 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                        >
                                            <ArrowUpRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-900 overflow-hidden">
                                    <div
                                        className="h-full w-0 group-hover:w-full transition-all duration-700"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}