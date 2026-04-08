'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Driver, Point, Result, Team } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
    ArrowUpRight,
    BarChart3,
    Shield,
    Target,
    Trophy,
    Users
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface StandingRow {
    id: number
    name: string
    points: number
    wins: number
    podiums: number
    slug: string
    identifier?: string | number
}

interface StandingsSectionProps {
    drivers: Driver[]
    teams: Team[]
    results: Result[]
    points: Point[]
}

export default function StandingsSection({ drivers, teams, results, points }: StandingsSectionProps) {
    const [activeTab, setActiveTab] = useState<'drivers' | 'teams'>('drivers')

    const driverStandings: StandingRow[] = useMemo(() => {
        return drivers.map((driver) => {
            const driverResults = results.filter((r) =>
                r.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === driver.id : cat === driver.id)
            )
            const driverPoints = points.filter((p) =>
                p.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === driver.id : cat === driver.id)
            )

            return {
                id: driver.id,
                name: `${driver.first_name} ${driver.last_name}`.toUpperCase(),
                points: driverPoints.reduce((acc, p) => acc + (p.details?.value || 0), 0),
                wins: driverResults.filter(r => r.details?.overall === 1).length,
                podiums: driverResults.filter(r => (r.details?.overall || 0) <= 3 && (r.details?.overall || 0) > 0).length,
                slug: driver.slug || '',
                identifier: driver.basics?.racing_number || '??'
            }
        }).sort((a, b) => b.points - a.points || b.wins - a.wins)
    }, [drivers, results, points])

    const teamStandings: StandingRow[] = useMemo(() => {
        return teams.map((team) => {
            const teamResults = results.filter((r) =>
                r.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === team.id : cat === team.id)
            )
            const teamPoints = points.filter((p) =>
                p.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === team.id : cat === team.id)
            )

            return {
                id: team.id,
                name: team.name.toUpperCase(),
                points: teamPoints.reduce((acc, p) => acc + (p.details?.value || 0), 0),
                wins: teamResults.filter(r => r.details?.overall === 1).length,
                podiums: teamResults.filter(r => (r.details?.overall || 0) <= 3 && (r.details?.overall || 0) > 0).length,
                slug: team.slug || '',
                identifier: team.alias || 'TEAM'
            }
        }).sort((a, b) => b.points - a.points || b.wins - a.wins)
    }, [teams, results, points])

    const currentData = activeTab === 'drivers' ? driverStandings : teamStandings

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Target size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">COMPETITION_METRICS_V3</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Season<span className="text-zinc-900"> Standings</span>
                        </h2>
                    </div>

                    <div className="flex bg-zinc-950 border border-zinc-900 p-1">
                        <button
                            onClick={() => setActiveTab('drivers')}
                            className={cn(
                                "px-8 py-3 flex items-center gap-3 transition-all duration-300",
                                activeTab === 'drivers' ? "bg-zinc-900 text-white" : "text-zinc-700 hover:text-zinc-400"
                            )}
                        >
                            <Users size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">DRIVERS</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('teams')}
                            className={cn(
                                "px-8 py-3 flex items-center gap-3 transition-all duration-300",
                                activeTab === 'teams' ? "bg-zinc-900 text-white" : "text-zinc-700 hover:text-zinc-400"
                            )}
                        >
                            <Shield size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">TEAMS</span>
                        </button>
                    </div>
                </div>

                <div className="border border-zinc-900 bg-zinc-950/20 overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-900">
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left w-20">POS</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left">ENTITY_IDENTIFIER</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-center hidden md:table-cell w-32">WINS</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-center hidden md:table-cell w-32">PODIUMS</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-right w-32">TOTAL_PTS</th>
                                <th className="p-6 w-16"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/50">
                            <AnimatePresence mode="wait">
                                {currentData.map((row, idx) => (
                                    <motion.tr
                                        key={`${activeTab}-${row.id}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="group hover:bg-zinc-950 transition-colors"
                                    >
                                        <td className="p-6">
                                            <span className={cn(
                                                "text-2xl font-black italic tracking-tighter",
                                                idx === 0 ? "text-primary" : "text-zinc-800"
                                            )} style={{ color: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-6">
                                                <div className="hidden md:flex size-10 items-center justify-center border border-zinc-900 bg-black text-[10px] font-black text-zinc-700 uppercase italic">
                                                    {row.identifier}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-white uppercase italic tracking-wide group-hover:translate-x-1 transition-transform">
                                                        {row.name}
                                                    </span>
                                                    <span className="text-[7px] font-mono text-zinc-800 uppercase mt-1">REF_ID_{row.id.toString().slice(-4)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center hidden md:table-cell">
                                            <span className={cn("text-xs font-black italic", row.wins > 0 ? "text-zinc-400" : "text-zinc-800")}>
                                                {row.wins}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center hidden md:table-cell">
                                            <span className={cn("text-xs font-black italic", row.podiums > 0 ? "text-zinc-400" : "text-zinc-800")}>
                                                {row.podiums}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <span className="text-xl font-black italic text-white tracking-tighter">
                                                    {row.points}
                                                </span>
                                                {idx === 0 && (
                                                    <Trophy size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} className="animate-pulse" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <ArrowUpRight size={14} className="text-zinc-900 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-zinc-900/50">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-3">
                            <div className="size-2 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">CHAMPIONSHIP_LEADER</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-2 rotate-45 bg-zinc-800" />
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">ACTIVE_COMPETITOR</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest italic">REAL_TIME_CALCULATION_SYNCED</span>
                        <div className="h-px w-12 bg-zinc-900" />
                        <button className="flex items-center gap-2 group">
                            <BarChart3 size={12} className="text-zinc-700" />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-white transition-colors">FULL_DATA_EXPORT</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}