'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Point, Result, Season, Series } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
    Calendar,
    ChevronDown,
    Flag,
    Hash,
    Target,
    Trophy
} from 'lucide-react'
import { useMemo, useState } from 'react'

interface SeasonSummary {
    id: number
    year: string
    series: string
    races: number
    wins: number
    points: number
    bestFinish: number | string
}

interface PerformanceProgressionProps {
    seasons: Season[]
    results: Result[]
    points: Point[]
}

export default function PerformanceProgression({ seasons, results, points }: PerformanceProgressionProps) {
    const [sortKey, setSortKey] = useState<keyof SeasonSummary>('year')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    const seasonData: SeasonSummary[] = useMemo(() => {
        return seasons.map((season) => {
            const seasonResults = results.filter((r) =>
                r.categories?.some((cat: any) =>
                    typeof cat === 'object' ? cat.id === season.id : cat === season.id
                )
            )

            const seasonPoints = points.filter((p) =>
                p.categories?.some((cat: any) =>
                    typeof cat === 'object' ? cat.id === season.id : cat === season.id
                )
            )

            const best = seasonResults.reduce((min, r) => {
                const pos = r.details?.overall || 99
                return pos < min ? pos : min
            }, 99)

            return {
                id: season.id,
                year: season.name.match(/\d{4}/)?.[0] || season.name,
                series: typeof season.details.series === 'object'
                    ? (season.details.series as Series).name
                    : `SERIES_${season.details.series}`,
                races: seasonResults.length,
                wins: seasonResults.filter(r => r.details?.overall === 1).length,
                points: seasonPoints.reduce((acc, p) => acc + (p.details?.value || 0), 0),
                bestFinish: best === 99 ? 'N/A' : best
            }
        })
    }, [seasons, results, points])

    const sortedData = useMemo(() => {
        return [...seasonData].sort((a, b) => {
            const aVal = a[sortKey]
            const bVal = b[sortKey]
            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
            return 0
        })
    }, [seasonData, sortKey, sortOrder])

    const toggleSort = (key: keyof SeasonSummary) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortOrder('desc')
        }
    }

    return (
        <section
            className="w-full py-24 px-10 md:px-16 border-b border-zinc-900"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
        >
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Calendar size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">HISTORICAL_ARCHIVE_DATA</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                        Season<span className="text-zinc-900"> Records</span>
                    </h2>
                </div>

                <div className="overflow-x-auto no-scrollbar border border-zinc-900">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-900">
                                <HeaderCell label="YEAR" icon={<Calendar size={10} />} active={sortKey === 'year'} onClick={() => toggleSort('year')} />
                                <HeaderCell label="SERIES_ID" icon={<Hash size={10} />} active={sortKey === 'series'} onClick={() => toggleSort('series')} />
                                <HeaderCell label="STARTS" icon={<Flag size={10} />} active={sortKey === 'races'} onClick={() => toggleSort('races')} />
                                <HeaderCell label="WINS" icon={<Trophy size={10} />} active={sortKey === 'wins'} onClick={() => toggleSort('wins')} />
                                <HeaderCell label="PTS" icon={<Target size={10} />} active={sortKey === 'points'} onClick={() => toggleSort('points')} />
                                <HeaderCell label="BEST_P" icon={<Trophy size={10} />} active={sortKey === 'bestFinish'} onClick={() => toggleSort('bestFinish')} />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/50">
                            {sortedData.map((row) => (
                                <tr key={row.id} className="group hover:bg-zinc-950/50 transition-colors">
                                    <td className="p-8 text-xl font-black italic text-zinc-500 group-hover:text-white transition-colors tracking-tighter">
                                        {row.year}
                                    </td>
                                    <td className="p-8">
                                        <span className="text-[10px] font-black text-white uppercase tracking-tight block max-w-[200px] truncate">
                                            {row.series}
                                        </span>
                                    </td>
                                    <td className="p-8 text-lg font-black text-zinc-400 italic">
                                        {row.races}
                                    </td>
                                    <td className="p-8">
                                        <span className={cn(
                                            "text-lg font-black italic",
                                            row.wins > 0 ? "text-white" : "text-zinc-800"
                                        )}>
                                            {row.wins}
                                        </span>
                                    </td>
                                    <td className="p-8 text-lg font-black text-zinc-400 italic">
                                        {row.points}
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-xl font-black italic tracking-tighter",
                                                row.bestFinish === 1 ? "" : "text-white"
                                            )} style={{ color: row.bestFinish === 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                P{row.bestFinish}
                                            </span>
                                            {row.bestFinish === 1 && (
                                                <div className="size-1 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

function HeaderCell({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) {
    return (
        <th
            onClick={onClick}
            className="p-8 cursor-pointer group"
        >
            <div className="flex items-center gap-3">
                <span className={cn("transition-colors", active ? "" : "text-zinc-800 group-hover:text-zinc-500")} style={{ color: active ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                    {icon}
                </span>
                <span className={cn(
                    "text-[8px] font-black uppercase tracking-[0.4em] transition-colors",
                    active ? "text-white" : "text-zinc-700 group-hover:text-zinc-400"
                )}>
                    {label}
                </span>
                <ChevronDown
                    size={10}
                    className={cn(
                        "ml-auto transition-all",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100 translate-y-1"
                    )}
                    style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                />
            </div>
        </th>
    )
}