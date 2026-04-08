'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Driver, Race, Result } from '@/payload-types'
import {
    ArrowUpRight,
    Flag,
    LayoutList,
    Timer,
    Trophy,
    Zap
} from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface RaceResultsSectionProps {
    races: Race[]
    results: Result[]
}

export default function RaceResultsSection({ races, results }: RaceResultsSectionProps) {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)

    const raceOutcomes = useMemo(() => {
        return races.map((race, idx) => {
            const winner = race.details.winner as Driver
            const poleEntry = race.details.pole_position as any
            const fastestLapEntry = race.details.fastest_lap as any

            return {
                id: race.id,
                round: idx + 1,
                name: race.name.toUpperCase(),
                winner: winner ? `${winner.first_name} ${winner.last_name}`.toUpperCase() : 'PENDING',
                team: 'TBD_LOGIC',
                pole: poleEntry?.name?.toUpperCase() || 'TBD',
                fastestLap: fastestLapEntry?.name?.toUpperCase() || 'TBD',
                status: race.details.status,
                slug: race.slug
            }
        })
    }, [races])

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <LayoutList size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">OUTCOME_SEQUENCE_LOG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Race<span className="text-zinc-900"> Results</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">VERIFICATION_STATUS</span>
                            <span className="text-[10px] font-black text-zinc-500 uppercase italic">CERTIFIED_OFFICIAL</span>
                        </div>
                        <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                            <Flag size={14} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        </div>
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950/20 overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-900">
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left w-24">RND</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left">GRAND_PRIX_EVENT</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left">WINNER</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left hidden lg:table-cell">POLE_POSITION</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left hidden lg:table-cell">FASTEST_LAP</th>
                                <th className="p-6 w-16"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/50">
                            {raceOutcomes.map((outcome, idx) => (
                                <motion.tr
                                    key={outcome.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="group hover:bg-zinc-950 transition-colors"
                                >
                                    <td className="p-6">
                                        <span className="text-xl font-black italic text-zinc-800 group-hover:text-zinc-600 transition-colors">
                                            {outcome.round.toString().padStart(2, '0')}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-white uppercase italic tracking-wide group-hover:text-primary transition-colors" style={{ color: outcome.status === 'ongoing' ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                {outcome.name}
                                            </p>
                                            <span className="text-[7px] font-mono text-zinc-800 uppercase">{outcome.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            {outcome.winner !== 'PENDING' && <Trophy size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />}
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-zinc-300 uppercase italic">{outcome.winner}</span>
                                                <span className="text-[7px] font-bold text-zinc-700 uppercase">{outcome.team}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 hidden lg:table-cell">
                                        <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Zap size={10} className="text-zinc-700" />
                                            <span className="text-[9px] font-black text-zinc-500 uppercase italic">{outcome.pole}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 hidden lg:table-cell">
                                        <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Timer size={10} className="text-zinc-700" />
                                            <span className="text-[9px] font-black text-zinc-500 uppercase italic">{outcome.fastestLap}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-end">
                                            <ArrowUpRight size={14} className="text-zinc-900 group-hover:text-white transition-all" />
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900/50">
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-1 w-8 bg-zinc-900" />
                        ))}
                    </div>
                    <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">SYSTEM_END_OF_LIST</span>
                </div>
            </div>
        </section>
    )
}