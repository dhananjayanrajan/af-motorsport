'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit, Driver, Race } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Activity, Calendar, ChevronRight, Clock, MapPin, Trophy } from 'lucide-react'
import { motion } from 'motion/react'

interface CalendarSectionProps {
    races: Race[]
}

export default function CalendarSection({ races }: CalendarSectionProps) {
    const sortedRaces = [...races].sort((a, b) => {
        const dateA = new Date(a.details.start_date || 0).getTime()
        const dateB = new Date(b.details.start_date || 0).getTime()
        return dateA - dateB
    })

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TEMPORAL_EVENT_SCHEDULING</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Race<span className="text-zinc-900"> Calendar</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-900 px-6 py-3">
                        <Activity size={12} className="text-zinc-700" />
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">STREAMING_LIVE_STATUS</span>
                    </div>
                </div>

                <div className="space-y-px bg-zinc-900 border border-zinc-900">
                    {sortedRaces.map((race, idx) => {
                        const circuit = race.details.circuit as Circuit
                        const winner = race.details.winner as Driver
                        const isCompleted = race.details.status === 'completed'
                        const raceDate = race.details.start_date
                            ? new Date(race.details.start_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase()
                            : 'TBD'

                        return (
                            <motion.div
                                key={race.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative grid grid-cols-1 lg:grid-cols-12 items-center bg-black hover:bg-zinc-950 transition-all duration-500"
                            >
                                <div className="lg:col-span-1 p-8 border-b lg:border-b-0 lg:border-r border-zinc-900 flex flex-col items-center justify-center">
                                    <span className="text-[8px] font-black text-zinc-800 uppercase mb-1">RND</span>
                                    <span className="text-2xl font-black italic text-white group-hover:text-primary transition-colors" style={{ color: !isCompleted && idx === sortedRaces.findIndex(r => r.details.status !== 'completed') ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="lg:col-span-4 p-8 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">
                                            {race.details.type || 'FEATURE_RACE'}
                                        </span>
                                        <div className={cn(
                                            "size-1 rounded-full",
                                            isCompleted ? "bg-zinc-800" : "bg-primary animate-pulse"
                                        )} style={{ backgroundColor: !isCompleted ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
                                    </div>
                                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter group-hover:translate-x-1 transition-transform">
                                        {race.name}
                                    </h3>
                                </div>

                                <div className="lg:col-span-3 p-8 flex items-center gap-4">
                                    <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                                        <MapPin size={14} className="text-zinc-800" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-800 uppercase">LOCATION_IDENTIFIER</span>
                                        <span className="text-[10px] font-black text-zinc-400 uppercase italic truncate max-w-[150px]">
                                            {circuit?.name || 'VIRTUAL_CIRCUIT'}
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 p-8 flex items-center gap-4">
                                    <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                                        <Clock size={14} className="text-zinc-800" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-800 uppercase">TEMPORAL_STAMP</span>
                                        <span className="text-[10px] font-black text-white italic">{raceDate}</span>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 p-8 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-800 uppercase">SESSION_WINNER</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            {isCompleted && winner ? (
                                                <>
                                                    <Trophy size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                    <span className="text-[10px] font-black text-white uppercase italic">
                                                        {winner.last_name}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-[10px] font-black text-zinc-800 uppercase italic">PENDING_RESULT</span>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-900 group-hover:text-white transition-all" />
                                </div>

                                <div className="absolute left-0 top-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}