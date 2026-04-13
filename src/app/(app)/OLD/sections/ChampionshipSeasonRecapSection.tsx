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
            totalEvents: season?.details?.races || 0,
            totalAwards: awards.length,
            avgSpeed: results.length > 0
                ? (results.reduce((acc, r) => acc + (r.details?.speed || 0), 0) / results.length).toFixed(1)
                : '0.0'
        }
    }, [season, results, points, drivers, awards])

    return (
        <section
            className="w-full py-24 px-10 md:px-16 border-b"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
        >
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b pb-12" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Activity size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black uppercase tracking-[0.6em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>SEASON_DEBRIEF_RETROSPECTIVE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                            {season?.name}<span style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}> Recap</span>
                        </h2>
                    </div>
                    <div className="border px-6 py-3" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                        <span className="text-[8px] font-black uppercase tracking-widest italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>STATUS: ARCHIVED_COMPLETE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                    <div className="lg:col-span-4 p-12 space-y-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE }}>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Trophy size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>CHAMPION_UNIT</span>
                                </div>
                                <p className="text-3xl font-black italic uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{recapData.champion}</p>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>RUNNER_UP</span>
                                <p className="text-xl font-black italic uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>{recapData.runnerUp}</p>
                            </div>

                            <div className="pt-6 border-t" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>POINTS_MARGIN</span>
                                        <p className="text-2xl font-black italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>+{recapData.margin}</p>
                                    </div>
                                    <Zap size={24} style={{ color: DESIGN_SYSTEM.COLORS.ZINC_100 }} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                            <div className="space-y-1">
                                <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>AVG_VELOCITY</span>
                                <p className="text-lg font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>{recapData.avgSpeed} KM/H</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>EVENT_COUNT</span>
                                <p className="text-lg font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>{recapData.totalEvents}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 relative overflow-hidden group" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}>
                        {season?.assets?.highlights && (season.assets.highlights.length > 0) ? (
                            <div className="absolute inset-0 grayscale opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105">
                                <img
                                    src={(season.assets.highlights[0] as Media).url || ''}
                                    className="w-full h-full object-cover"
                                    alt="Season Highlight"
                                />
                            </div>
                        ) : (
                            <div className="absolute inset-0" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100 }} />
                        )}

                        <div className="relative h-full z-10 p-12 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div
                                    className="size-12 border flex items-center justify-center transition-all cursor-pointer hover:bg-black hover:text-white"
                                    style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                                >
                                    <Play size={16} fill="currentColor" />
                                </div>
                                <span className="text-[8px] font-mono uppercase tracking-[0.5em]" style={{ color: 'rgba(0,0,0,0.1)' }}>HL_REEL_001</span>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                    Watch<br />Highlight Reel
                                </h3>
                                <button className="flex items-center gap-3 group/btn cursor-pointer">
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>INITIATE_PLAYBACK</span>
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
                            className="border p-8 space-y-6 group transition-all hover:bg-white"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
                        >
                            <div className="flex justify-between items-start">
                                <AwardIcon
                                    size={16}
                                    className="transition-colors"
                                    style={{ color: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200 }}
                                />
                                <span className="text-[6px] font-mono" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>ACCOLADE_REF_{idx + 1}</span>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{award.name}</h4>
                                <p className="text-[8px] font-bold uppercase italic leading-relaxed line-clamp-2" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>
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