'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit, Event, Race, Session } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Activity, Calendar, ChevronRight, Clock, Filter, Info, MapPin } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface CalendarSectionProps {
    races: Race[]
    sessions: Session[]
}

export default function CalendarSection({ races, sessions }: CalendarSectionProps) {
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')

    const filteredRaces = useMemo(() => {
        return races
            .filter((race) => {
                if (filter === 'upcoming') return race.details.status === 'scheduled' || race.details.status === 'ongoing'
                if (filter === 'completed') return race.details.status === 'completed'
                return true
            })
            .sort((a, b) => new Date(a.details.start_date || 0).getTime() - new Date(b.details.start_date || 0).getTime())
    }, [races, filter])

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">GLOBAL_RACE_CHRONOLOGY</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Event<span className="text-zinc-900"> Schedule</span>
                        </h2>
                    </div>

                    <div className="flex bg-zinc-950 border border-zinc-900 p-1">
                        {(['all', 'upcoming', 'completed'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={cn(
                                    "px-6 py-2 flex items-center gap-2 transition-all duration-300",
                                    filter === t ? "bg-zinc-900 text-white" : "text-zinc-700 hover:text-zinc-400"
                                )}
                            >
                                <span className="text-[9px] font-black uppercase tracking-widest">{t}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredRaces.map((race, idx) => {
                            const circuit = race.details.circuit as Circuit
                            const event = race.details.event as Event
                            const raceSessions = sessions.filter(s =>
                                s.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === race.id : cat === race.id)
                            )

                            return (
                                <motion.div
                                    key={race.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group bg-zinc-950/30 border border-zinc-900 hover:border-zinc-700 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        <div className="lg:w-24 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-zinc-900 bg-black">
                                            <span className="text-[8px] font-black text-zinc-700 uppercase mb-1">STP</span>
                                            <span className="text-2xl font-black italic text-white group-hover:text-primary transition-colors" style={{ color: race.details.status === 'ongoing' ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                        </div>

                                        <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Activity size={10} className={cn(race.details.status === 'ongoing' ? "text-primary animate-pulse" : "text-zinc-800")} style={{ color: race.details.status === 'ongoing' ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
                                                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">{race.details.status || 'SCHEDULED'}</span>
                                                </div>
                                                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">
                                                    {race.name}
                                                </h3>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-black border border-zinc-900 flex items-center justify-center shrink-0">
                                                    <MapPin size={14} className="text-zinc-800" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[7px] font-black text-zinc-800 uppercase">CIRCUIT_LOCATION</span>
                                                    <span className="text-[10px] font-black text-zinc-400 uppercase italic truncate">
                                                        {circuit?.name || 'GENERIC_PROTOTYPE_TRACK'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-black border border-zinc-900 flex items-center justify-center shrink-0">
                                                    <Clock size={14} className="text-zinc-800" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] font-black text-zinc-800 uppercase">TIME_WINDOW</span>
                                                    <span className="text-[10px] font-black text-white italic">
                                                        {race.details.start_date ? new Date(race.details.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase() : 'TBD_STAMP'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-6">
                                                <div className="hidden xl:flex flex-col items-end">
                                                    <span className="text-[7px] font-black text-zinc-800 uppercase">SESSIONS_LOGGED</span>
                                                    <span className="text-[10px] font-black text-zinc-600">{raceSessions.length.toString().padStart(2, '0')}</span>
                                                </div>
                                                <button className="size-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-8 py-4 bg-black/40 border-t border-zinc-900/50 flex flex-wrap gap-8">
                                        {raceSessions.length > 0 ? raceSessions.map((session) => (
                                            <div key={session.id} className="flex items-center gap-3">
                                                <div className="size-1 bg-zinc-800" />
                                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">{session.name}</span>
                                                <span className="text-[9px] font-mono text-zinc-800">
                                                    {session.metrics?.quantifiers?.duration ? `${session.metrics.quantifiers.duration}M` : 'LIVE'}
                                                </span>
                                            </div>
                                        )) : (
                                            <div className="flex items-center gap-3">
                                                <Info size={10} className="text-zinc-800" />
                                                <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest italic">DETAILED_SESSION_BREAKDOWN_PENDING</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <Filter size={12} className="text-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">QUERY_EXECUTION_COMPLETE</span>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-1 w-4 bg-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}