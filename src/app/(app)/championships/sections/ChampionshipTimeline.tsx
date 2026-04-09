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
        <section
            className="w-full py-32 px-10 md:px-16 overflow-hidden border-b"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
        >
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <History size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black uppercase tracking-[0.6em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>HISTORICAL_LEGACY_STREAMS</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                            Championship<span style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}> Timeline</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                        <Timer size={14} />
                        <span className="text-[8px] font-mono uppercase tracking-widest italic">TEMPORAL_SEQUENCE_ACTIVE</span>
                    </div>
                </div>

                <div className="relative">
                    <div
                        className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 hidden lg:block"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}
                    />

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
                                        <div
                                            className="size-3 border-2 rounded-full transition-colors duration-500"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE,
                                                borderColor: idx === sortedChampionships.length - 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200
                                            }}
                                        />
                                        <span
                                            className="text-[7px] font-black uppercase tracking-tighter transition-colors italic"
                                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}
                                        >
                                            00{idx + 1}
                                        </span>
                                    </div>

                                    <div
                                        className="border p-10 space-y-10 transition-all duration-500 relative overflow-hidden"
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50,
                                            borderColor: DESIGN_SYSTEM.COLORS.ZINC_100
                                        }}
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-5">
                                            <Milestone size={40} style={{ color: DESIGN_SYSTEM.COLORS.BLACK }} />
                                        </div>

                                        <div className="space-y-2">
                                            <span
                                                className="text-3xl font-black italic transition-colors"
                                                style={{ color: idx === sortedChampionships.length - 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200 }}
                                            >
                                                {year}
                                            </span>
                                            <h3 className="text-lg font-black uppercase italic tracking-tighter line-clamp-1" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                {champ.name}
                                            </h3>
                                        </div>

                                        <div className="space-y-6 pt-6 border-t" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>CHAMPION</span>
                                                    <p className="text-[11px] font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                        {winner ? `${winner.first_name} ${winner.last_name}` : 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>RUNNER_UP</span>
                                                    <p className="text-[11px] font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                                                        {runnerUp ? `${runnerUp.first_name} ${runnerUp.last_name}` : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="flex items-center justify-between p-4 border"
                                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="size-1 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>GAP_DELTA</span>
                                                </div>
                                                <span className="text-sm font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                    -- PTS
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <ArrowRight
                                                size={14}
                                                className="transition-all duration-500 group-hover:translate-x-2"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}
                                            />
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