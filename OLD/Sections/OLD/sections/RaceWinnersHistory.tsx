'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Driver, Entry, Race, Result, Team } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ArrowUpDown, Calendar, ExternalLink, Shield, Trophy, User } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface RaceWinnersHistoryProps {
    races: Race[]
    results: Result[]
}

type SortConfig = {
    key: 'year' | 'name' | 'winner' | 'margin'
    direction: 'asc' | 'desc'
}

export default function RaceWinnersHistory({ races, results }: RaceWinnersHistoryProps) {
    const [sort, setSort] = useState<SortConfig>({ key: 'year', direction: 'desc' })

    const winnerData = useMemo(() => {
        return races
            .filter((race) => race.details.status === 'completed')
            .map((race) => {
                const winnerDriver = race.details.winner as Driver | undefined

                const winningResult = results.find((res) => {
                    const isWinnerResult = res.details?.overall === 1
                    const belongsToRace = res.categories?.some((cat: any) =>
                        typeof cat === 'object' ? cat.id === race.id : cat === race.id
                    )
                    return isWinnerResult && belongsToRace
                })

                const resultCategories = (winningResult?.categories || []) as any[]

                const winnerEntry = resultCategories.find((cat): cat is Entry =>
                    typeof cat === 'object' && cat !== null && 'details' in cat && 'session' in cat.details
                )

                const winnerTeam = winnerEntry?.categories?.find((cat: any): cat is Team =>
                    typeof cat === 'object' &&
                    cat !== null &&
                    'name' in cat &&
                    !('first_name' in cat) &&
                    !('basics' in cat && (cat as any).basics?.identifiers?.model !== undefined)
                )

                return {
                    id: race.id,
                    year: race.details.start_date ? new Date(race.details.start_date).getFullYear() : 0,
                    name: race.name,
                    winner: winnerDriver ? `${winnerDriver.first_name} ${winnerDriver.last_name}` : 'N/A',
                    team: winnerTeam || 'N/A',
                    margin: winningResult?.details?.gap ? `${winningResult.details.gap}s` : winningResult?.details?.interval ? `+${winningResult.details.interval}s` : 'LAP_LEADER',
                    slug: race.slug
                }
            })
            .sort((a, b) => {
                const multiplier = sort.direction === 'asc' ? 1 : -1
                if (a[sort.key] < b[sort.key]) return -1 * multiplier
                if (a[sort.key] > b[sort.key]) return 1 * multiplier
                return 0
            })
    }, [races, results, sort])

    const toggleSort = (key: SortConfig['key']) => {
        setSort((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }))
    }

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Trophy size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">HISTORICAL_VICTORY_REGISTRY</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Race<span className="text-zinc-900"> Winners</span>
                        </h2>
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950/20 overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-900">
                                <th className="p-6 text-left w-32">
                                    <button onClick={() => toggleSort('year')} className="flex items-center gap-2 group">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-zinc-400">YEAR_ID</span>
                                        <ArrowUpDown size={10} className="text-zinc-800" />
                                    </button>
                                </th>
                                <th className="p-6 text-left">
                                    <button onClick={() => toggleSort('name')} className="flex items-center gap-2 group">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-zinc-400">EVENT_DESIGNATION</span>
                                        <ArrowUpDown size={10} className="text-zinc-800" />
                                    </button>
                                </th>
                                <th className="p-6 text-left">
                                    <button onClick={() => toggleSort('winner')} className="flex items-center gap-2 group">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-zinc-400">WINNING_OPERATOR</span>
                                        <ArrowUpDown size={10} className="text-zinc-800" />
                                    </button>
                                </th>
                                <th className="p-6 text-left">
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">TEAM_CONSTRUCTOR</span>
                                </th>
                                <th className="p-6 text-right">
                                    <button onClick={() => toggleSort('margin')} className="flex items-center gap-2 ml-auto group">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-zinc-400">VICTORY_MARGIN</span>
                                        <ArrowUpDown size={10} className="text-zinc-800" />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/50">
                            <AnimatePresence mode="popLayout">
                                {winnerData.map((row) => (
                                    <motion.tr
                                        key={row.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-zinc-950 transition-colors"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <Calendar size={10} className="text-zinc-800" />
                                                <span className="text-sm font-black text-white italic">{row.year}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-zinc-300 uppercase italic tracking-tight group-hover:text-white transition-colors">
                                                    {row.name}
                                                </span>
                                                <span className="text-[7px] font-mono text-zinc-800 uppercase mt-1">
                                                    RACE_UID_{row.id.toString().padStart(4, '0')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <User size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                <span className="text-xs font-black text-white uppercase italic tracking-tight">
                                                    {row.winner}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <Shield size={10} className="text-zinc-800" />
                                                <span className="text-[10px] font-black text-zinc-500 uppercase italic">
                                                    {/* {row.team} */}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[11px] font-mono font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                    {row.margin}
                                                </span>
                                                <a
                                                    href={`/races/${row.slug}`}
                                                    className="flex items-center gap-1 text-[7px] font-black text-zinc-800 uppercase tracking-tighter mt-1 hover:text-white transition-colors"
                                                >
                                                    VIEW_DATA <ExternalLink size={8} />
                                                </a>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase">DATABASE_COUNT</span>
                            <span className="text-xs font-black text-white italic">{winnerData.length.toString().padStart(2, '0')} RECORDS</span>
                        </div>
                        <div className="h-8 w-px bg-zinc-900" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase">INTEGRITY_CHECK</span>
                            <span className="text-[10px] font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>SYSTEM_SYNCHRONIZED</span>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={cn("h-4 w-1", i % 4 === 0 ? "bg-zinc-800" : "bg-zinc-950")} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}