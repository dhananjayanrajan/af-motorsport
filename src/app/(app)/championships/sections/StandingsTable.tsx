'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Driver, Point, Result, Season, Team } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
    BarChart3,
    ChevronRight,
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
}

interface StandingsTableProps {
    season: Season
    drivers: Driver[]
    teams: Team[]
    results: Result[]
    points: Point[]
}

export default function StandingsTable({ season, drivers, teams, results, points }: StandingsTableProps) {
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
                slug: driver.slug || ''
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
                slug: team.slug || ''
            }
        }).sort((a, b) => b.points - a.points || b.wins - a.wins)
    }, [teams, results, points])

    const currentData = activeTab === 'drivers' ? driverStandings : teamStandings

    return (
        <section
            className="w-full py-24 px-10 md:px-16 border-b"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
        >
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Target size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black uppercase tracking-[0.6em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>LIVE_COMPETITION_DATA</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                            Championship<span style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}> Standings</span>
                        </h2>
                    </div>

                    <div className="flex border p-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                        <button
                            onClick={() => setActiveTab('drivers')}
                            className={cn(
                                "px-8 py-3 flex items-center gap-3 transition-all duration-300 cursor-pointer",
                                activeTab === 'drivers' ? "" : "hover:text-zinc-600"
                            )}
                            style={{
                                backgroundColor: activeTab === 'drivers' ? DESIGN_SYSTEM.COLORS.WHITE : 'transparent',
                                color: activeTab === 'drivers' ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.ZINC_400
                            }}
                        >
                            <Users size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">DRIVERS</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('teams')}
                            className={cn(
                                "px-8 py-3 flex items-center gap-3 transition-all duration-300 cursor-pointer",
                                activeTab === 'teams' ? "" : "hover:text-zinc-600"
                            )}
                            style={{
                                backgroundColor: activeTab === 'teams' ? DESIGN_SYSTEM.COLORS.WHITE : 'transparent',
                                color: activeTab === 'teams' ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.ZINC_400
                            }}
                        >
                            <Shield size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">TEAMS</span>
                        </button>
                    </div>
                </div>

                <div className="border overflow-hidden" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                <th className="p-6 text-[8px] font-black uppercase tracking-widest text-left w-20" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>POS</th>
                                <th className="p-6 text-[8px] font-black uppercase tracking-widest text-left" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>ENTITY_IDENTIFIER</th>
                                <th className="p-6 text-[8px] font-black uppercase tracking-widest text-center hidden md:table-cell w-32" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>WINS</th>
                                <th className="p-6 text-[8px] font-black uppercase tracking-widest text-center hidden md:table-cell w-32" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>PODIUMS</th>
                                <th className="p-6 text-[8px] font-black uppercase tracking-widest text-right w-32" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>POINTS</th>
                                <th className="p-6 w-16"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            <AnimatePresence mode="wait">
                                {currentData.map((row, idx) => (
                                    <motion.tr
                                        key={`${activeTab}-${row.id}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="group transition-colors hover:bg-white"
                                    >
                                        <td className="p-6">
                                            <span className="text-2xl font-black italic tracking-tighter" style={{ color: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                {idx + 1}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase italic tracking-wide group-hover:translate-x-1 transition-transform" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                    {row.name}
                                                </span>
                                                <span className="text-[7px] font-mono uppercase mt-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>ID_REF_{row.id}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center hidden md:table-cell">
                                            <span className="text-xs font-black italic" style={{ color: row.wins > 0 ? DESIGN_SYSTEM.COLORS.ZINC_500 : DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                {row.wins}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center hidden md:table-cell">
                                            <span className="text-xs font-black italic" style={{ color: row.podiums > 0 ? DESIGN_SYSTEM.COLORS.ZINC_500 : DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                {row.podiums}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <span className="text-xl font-black italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                    {row.points}
                                                </span>
                                                {idx === 0 && (
                                                    <Trophy size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} className="animate-pulse" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-all" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }} />
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>CHAMPIONSHIP_LEAD</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_200 }} />
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>STABLE_POSITION</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-3 group cursor-pointer">
                        <BarChart3 size={12} style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }} />
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] transition-colors group-hover:text-black" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>EXPORT_FULL_TELEMETRY_REPORT</span>
                    </button>
                </div>
            </div>
        </section>
    )
}