'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Vacancy } from '@/payload-types'
import { Activity, ArrowRight, Calendar, History, Timer, UserPlus } from 'lucide-react'
import { motion } from 'motion/react'

interface VacancyPositionHistoryProps {
    vacancy: Vacancy
}

export default function VacancyPositionHistory({ vacancy }: VacancyPositionHistoryProps) {
    const positions = vacancy.details?.positions?.list || []

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <History size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">ROLE_EVOLUTION_TIMELINE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Position<span className="text-zinc-900"> History</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-900 p-4">
                        <Timer size={14} className="text-zinc-800" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">LIFECYCLE_STATUS</span>
                            <span className="text-[10px] font-black text-white uppercase italic">ARCHIVAL_SYNC_ACTIVE</span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-900 ml-[5px] md:ml-[164px] hidden md:block" />

                    <div className="space-y-12 relative">
                        {positions.length > 0 ? positions.map((pos, idx) => (
                            <motion.div
                                key={pos.id || idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col md:flex-row gap-8 md:gap-24 group"
                            >
                                <div className="md:w-40 shrink-0 space-y-2 pt-2">
                                    <div className="flex items-center gap-3 md:justify-end">
                                        <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">
                                            {pos.start ? new Date(pos.start).getFullYear() : 'INIT'}
                                        </span>
                                        <ArrowRight size={10} className="text-zinc-800" />
                                        <span className="text-[10px] font-black text-zinc-600 uppercase italic tracking-tighter">
                                            {pos.end ? new Date(pos.end).getFullYear() : 'PRES'}
                                        </span>
                                    </div>
                                    <div className="md:text-right">
                                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">TEMPORAL_NODE_{idx + 1}</span>
                                    </div>
                                </div>

                                <div className="relative flex-1 bg-zinc-950 border border-zinc-900 p-8 group-hover:border-primary transition-all duration-500" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any}>
                                    <div className="absolute -left-[35px] top-10 size-3 bg-black border-2 border-zinc-800 rounded-full group-hover:border-primary transition-colors hidden md:block" />

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <UserPlus size={12} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">ASSIGNED_RANK</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                                {pos.title}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-900 md:pl-12">
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-zinc-700 uppercase">COMMENCEMENT</span>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={10} className="text-zinc-800" />
                                                    <span className="text-[9px] font-bold text-zinc-400 uppercase italic">
                                                        {pos.start ? new Date(pos.start).toLocaleDateString() : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-zinc-700 uppercase">TERMINATION</span>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={10} className="text-zinc-800" />
                                                    <span className="text-[9px] font-bold text-zinc-400 uppercase italic">
                                                        {pos.end ? new Date(pos.end).toLocaleDateString() : 'ACTIVE_DUTY'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="py-32 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-6 opacity-20">
                                <Activity size={32} />
                                <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">NO_POSITION_HISTORY_RECOVERED</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-6">
                        <div className="flex gap-1">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-4 w-[2px] bg-zinc-900" />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">END_OF_TIMELINE_BUFFER</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[7px] font-black text-zinc-800 uppercase italic">RECORDS_COUNT: {positions.length}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}