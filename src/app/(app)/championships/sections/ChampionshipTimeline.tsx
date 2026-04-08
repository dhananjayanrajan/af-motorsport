'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Championship, Driver } from '@/payload-types'
import { ArrowRight, History, Milestone, Timer } from 'lucide-react'
import { motion } from 'motion/react'

interface ChampionshipTimelineProps {
    championships: Championship[]
}

export default function ChampionshipTimeline({ championships }: ChampionshipTimelineProps) {
    const sortedChampionships = [...championships].sort((a, b) => {
        const dateA = new Date(a.details?.start_date || a.createdAt).getTime()
        const dateB = new Date(b.details?.start_date || b.createdAt).getTime()
        return dateA - dateB
    })

    return (
        <section className="w-full py-32 px-10 md:px-16 bg-black overflow-hidden border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <History size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">HISTORICAL_LEGACY_STREAMS</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Championship<span className="text-zinc-900"> Timeline</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-800">
                        <Timer size={14} />
                        <span className="text-[8px] font-mono uppercase tracking-widest italic">TEMPORAL_SEQUENCE_ACTIVE</span>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-900 -translate-y-1/2 hidden lg:block" />

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 overflow-x-auto pb-12 scrollbar-hide lg:pt-10">
                        {sortedChampionships.map((champ, idx) => {
                            const winner = champ.details?.winner as Driver
                            const runnerUp = champ.details?.runner_up as Driver
                            const year = champ.details?.start_date
                                ? new Date(champ.details.start_date).getFullYear()
                                : 'TBD'

                            return (
                                <motion.div
                                    key={champ.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative min-w-[320px] lg:min-w-[400px] flex flex-col group"
                                >
                                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4 z-20">
                                        <div className="size-3 bg-black border-2 border-zinc-800 rounded-full group-hover:border-primary transition-colors duration-500" style={{ borderColor: idx === sortedChampionships.length - 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
                                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-tighter group-hover:text-zinc-500 transition-colors italic">00{idx + 1}</span>
                                    </div>

                                    <div className="bg-zinc-950 border border-zinc-900 p-10 space-y-10 group-hover:border-zinc-700 transition-all duration-500 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Milestone size={40} className="text-white" />
                                        </div>

                                        <div className="space-y-2">
                                            <span className="text-3xl font-black italic text-zinc-800 group-hover:text-primary transition-colors" style={{ color: idx === sortedChampionships.length - 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                {year}
                                            </span>
                                            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter line-clamp-1">
                                                {champ.name}
                                            </h3>
                                        </div>

                                        <div className="space-y-6 pt-6 border-t border-zinc-900/50">
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">CHAMPION</span>
                                                    <p className="text-[11px] font-black text-white uppercase italic">
                                                        {winner ? `${winner.first_name} ${winner.last_name}` : 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">RUNNER_UP</span>
                                                    <p className="text-[11px] font-black text-zinc-500 uppercase italic">
                                                        {runnerUp ? `${runnerUp.first_name} ${runnerUp.last_name}` : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-black border border-zinc-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-1 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">GAP_DELTA</span>
                                                </div>
                                                <span className="text-sm font-black italic text-white">
                                                    -- PTS
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <ArrowRight size={14} className="text-zinc-900 group-hover:text-primary transition-colors group-hover:translate-x-2 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}