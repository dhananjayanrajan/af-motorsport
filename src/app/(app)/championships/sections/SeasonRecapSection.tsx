'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Award, Driver, Media, Point, Result, Season } from '@/payload-types'
import {
    Activity,
    ArrowRight,
    Award as AwardIcon,
    Play,
    Trophy,
    Zap
} from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo } from 'react'

interface SeasonRecapSectionProps {
    season: Season
    results: Result[]
    points: Point[]
    awards: Award[]
    drivers: Driver[]
}

export default function SeasonRecapSection({ season, results, points, awards, drivers }: SeasonRecapSectionProps) {
    const recapData = useMemo(() => {
        const standings = drivers.map((driver) => {
            const driverPoints = points.filter((p) =>
                p.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === driver.id : cat === driver.id)
            )
            return {
                id: driver.id,
                name: `${driver.first_name} ${driver.last_name}`.toUpperCase(),
                points: driverPoints.reduce((acc, p) => acc + (p.details?.value || 0), 0)
            }
        }).sort((a, b) => b.points - a.points)

        const champion = standings[0]
        const runnerUp = standings[1]
        const margin = champion && runnerUp ? champion.points - runnerUp.points : 0

        return {
            champion: champion?.name || 'UNDETERMINED',
            runnerUp: runnerUp?.name || 'UNDETERMINED',
            margin,
            totalEvents: season.details.races || 0,
            totalAwards: awards.length,
            avgSpeed: results.length > 0
                ? (results.reduce((acc, r) => acc + (r.details?.speed || 0), 0) / results.length).toFixed(1)
                : '0.0'
        }
    }, [season, results, points, drivers, awards])

    return (
        <section
            className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900"
        >
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-900 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Activity size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">SEASON_DEBRIEF_RETROSPECTIVE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            {season.name}<span className="text-zinc-900"> Recap</span>
                        </h2>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-900 px-6 py-3">
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest italic">STATUS: ARCHIVED_COMPLETE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
                    <div className="lg:col-span-4 bg-black p-12 space-y-12">
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Trophy size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">CHAMPION_UNIT</span>
                                </div>
                                <p className="text-3xl font-black italic text-white uppercase tracking-tighter">{recapData.champion}</p>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">RUNNER_UP</span>
                                <p className="text-xl font-black italic text-zinc-500 uppercase tracking-tighter">{recapData.runnerUp}</p>
                            </div>

                            <div className="pt-6 border-t border-zinc-900">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">POINTS_MARGIN</span>
                                        <p className="text-2xl font-black italic text-white tracking-tighter">+{recapData.margin}</p>
                                    </div>
                                    <Zap size={24} className="text-zinc-900" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-900">
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">AVG_VELOCITY</span>
                                <p className="text-lg font-black italic text-zinc-400">{recapData.avgSpeed} KM/H</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">EVENT_COUNT</span>
                                <p className="text-lg font-black italic text-zinc-400">{recapData.totalEvents}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 bg-zinc-950 relative overflow-hidden group">
                        {season.assets?.highlights && (season.assets.highlights.length > 0) ? (
                            <div className="absolute inset-0 grayscale opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105">
                                <img
                                    src={(season.assets.highlights[0] as Media).url || ''}
                                    className="w-full h-full object-cover"
                                    alt="Season Highlight"
                                />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-zinc-900/50" />
                        )}

                        <div className="relative h-full z-10 p-12 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="size-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                                    <Play size={16} fill="currentColor" />
                                </div>
                                <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">HL_REEL_001</span>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                                    Watch<br />Highlight Reel
                                </h3>
                                <button className="flex items-center gap-3 text-white group/btn">
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em]">INITIATE_PLAYBACK</span>
                                    <ArrowRight size={12} className="group-hover/btn:translate-x-2 transition-transform" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {awards.slice(0, 3).map((award, idx) => (
                        <motion.div
                            key={award.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-zinc-950 border border-zinc-900 p-8 space-y-6 group hover:border-zinc-700 transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <AwardIcon size={16} className="text-zinc-800 group-hover:text-primary transition-colors" style={{ color: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
                                <span className="text-[6px] font-mono text-zinc-800">ACCOLADE_REF_{idx + 1}</span>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{award.name}</h4>
                                <p className="text-[8px] font-bold text-zinc-600 uppercase italic leading-relaxed line-clamp-2">
                                    {award.basics?.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}