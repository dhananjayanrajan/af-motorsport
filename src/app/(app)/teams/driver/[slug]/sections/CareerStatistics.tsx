'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Award, Point, Result } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
    BarChart3,
    Flag,
    Target,
    Timer,
    Trophy,
    Zap
} from 'lucide-react'
import { motion } from 'motion/react'

interface CareerStatisticsProps {
    results: Result[]
    points: Point[]
    awards: Award[]
}

export default function CareerStatistics({ results, points, awards }: CareerStatisticsProps) {
    const stats = {
        totalRaces: results.length,
        wins: results.filter(r => r.details?.overall === 1).length,
        podiums: results.filter(r => (r.details?.overall || 0) <= 3 && (r.details?.overall || 0) > 0).length,
        totalPoints: points.reduce((acc, p) => acc + (p.details?.value || 0), 0),
        avgPosition: results.length > 0
            ? (results.reduce((acc, r) => acc + (r.details?.overall || 0), 0) / results.length).toFixed(1)
            : '0.0',
        totalAwards: awards.length
    }

    const dashboardItems = [
        { label: 'TOTAL_STARTS', value: stats.totalRaces, icon: <Flag size={14} /> },
        { label: 'VICTORIES', value: stats.wins, icon: <Trophy size={14} />, highlight: true },
        { label: 'PODIUM_FINISHES', value: stats.podiums, icon: <Zap size={14} /> },
        { label: 'ACCUMULATED_POINTS', value: stats.totalPoints.toLocaleString(), icon: <Target size={14} /> },
        { label: 'AVG_POSITION', value: stats.avgPosition, icon: <Timer size={14} /> },
        { label: 'ACCOLADES', value: stats.totalAwards, icon: <BarChart3 size={14} /> }
    ]

    return (
        <section
            className="w-full py-24 px-10 md:px-16 border-y border-zinc-900"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
        >
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-zinc-800" />
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.6em]">PERFORMANCE_METRICS_V3</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
                            Career<span className="text-zinc-900"> Stats</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6 pb-2">
                        <div className="text-right">
                            <span className="block text-[7px] font-black text-zinc-700 uppercase tracking-widest">STABILITY_INDEX</span>
                            <span className="text-xl font-black text-white italic">94.2%</span>
                        </div>
                        <div className="h-10 w-px bg-zinc-900" />
                        <div className="text-right">
                            <span className="block text-[7px] font-black text-zinc-700 uppercase tracking-widest">DATA_INTEGRITY</span>
                            <span className="text-xl font-black text-white italic">VERIFIED</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    {dashboardItems.map((item, idx) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-black p-10 group relative overflow-hidden"
                        >
                            {item.highlight && (
                                <div
                                    className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none translate-x-12 -translate-y-12 rotate-45"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                />
                            )}

                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-zinc-700 group-hover:text-white transition-colors">
                                        <span style={{ color: item.highlight ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                            {item.icon}
                                        </span>
                                        <span className="text-[8px] font-black uppercase tracking-[0.4em]">{item.label}</span>
                                    </div>
                                    <span className="text-[6px] font-mono text-zinc-800">00{idx + 1}</span>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className={cn(
                                        "text-6xl font-black italic tracking-tighter transition-transform group-hover:scale-110 origin-left duration-500",
                                        item.highlight ? "text-white" : "text-zinc-400"
                                    )}>
                                        {item.value}
                                    </span>
                                    {item.highlight && (
                                        <div className="size-2 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-8">
                        <div className="flex items-center gap-4 border-b border-zinc-900 pb-4">
                            <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">RECENT_ACCOLADES</span>
                        </div>
                        <div className="space-y-4">
                            {awards.slice(0, 3).map((award) => (
                                <div key={award.id} className="flex justify-between items-center p-4 bg-black border border-zinc-900/50">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase italic tracking-tight">{award.name}</span>
                                    <span className="text-[8px] font-mono text-zinc-700">
                                        {award.details?.awarded_date ? new Date(award.details.awarded_date).getFullYear() : 'N/A'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-8">
                        <div className="flex items-center gap-4 border-b border-zinc-900 pb-4">
                            <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">POSITION_DISTRIBUTION</span>
                        </div>
                        <div className="flex items-end h-32 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((pos) => {
                                const count = results.filter(r => r.details?.overall === pos).length;
                                const height = stats.totalRaces > 0 ? (count / stats.totalRaces) * 100 : 0;
                                return (
                                    <div key={pos} className="flex-1 flex flex-col items-center gap-3">
                                        <div className="w-full bg-zinc-900 relative">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${Math.max(height, 5)}%` }}
                                                viewport={{ once: true }}
                                                className="w-full absolute bottom-0 transition-colors"
                                                style={{ backgroundColor: pos === 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : '#27272a' }}
                                            />
                                        </div>
                                        <span className="text-[8px] font-black text-zinc-800">P{pos}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}