'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Initiative } from '@/payload-types'
import { Calendar, ChevronRight, Clock, Flag, Milestone } from 'lucide-react'
import { motion } from 'motion/react'

interface InitiativeTimelineProps {
    initiative: Initiative
}

export default function InitiativeTimeline({ initiative }: InitiativeTimelineProps) {
    const startDate = initiative.details?.start_date ? new Date(initiative.details.start_date) : null
    const endDate = initiative.details?.end_date ? new Date(initiative.details.end_date) : null

    const formatDate = (date: Date | null) => {
        if (!date) return 'TBD'
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
    }

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Clock size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TEMPORAL_EXECUTION_GRID</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Project<span className="text-zinc-900"> Timeline</span>
                        </h2>
                    </div>
                </div>

                <div className="relative py-20">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-900 -translate-y-1/2" />

                    <div className="relative flex justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-start"
                        >
                            <div className="size-4 bg-primary rotate-45 mb-6" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">COMMENCEMENT</span>
                                <span className="text-xl font-black text-white italic tracking-tighter">{formatDate(startDate)}</span>
                            </div>
                        </motion.div>

                        <div className="flex-grow flex justify-around px-12 md:px-32">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div className="h-12 w-px bg-zinc-800 mb-4" />
                                <div className="size-2 border border-zinc-700 rotate-45 mb-4 group-hover:bg-zinc-800 transition-colors" />
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">MID_POINT_REVIEW</span>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-end text-right"
                        >
                            <div className="size-4 bg-zinc-800 rotate-45 mb-6 group-hover:bg-zinc-700 transition-colors" />
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">TERMINAL_PHASE</span>
                                <span className="text-xl font-black text-white italic tracking-tighter">{formatDate(endDate)}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    <div className="p-10 bg-zinc-950 flex flex-col gap-4 group">
                        <div className="flex items-center gap-3">
                            <Flag size={12} className="text-zinc-800 group-hover:text-primary transition-colors" />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">PHASE_01</span>
                        </div>
                        <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Foundation_Sync</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase italic">Infrastructure deployment and core logic mapping.</p>
                    </div>
                    <div className="p-10 bg-zinc-950 flex flex-col gap-4 group">
                        <div className="flex items-center gap-3">
                            <Milestone size={12} className="text-zinc-800 group-hover:text-primary transition-colors" />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">PHASE_02</span>
                        </div>
                        <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Operational_Scale</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase italic">Expansion of services and feature integration nodes.</p>
                    </div>
                    <div className="p-10 bg-zinc-950 flex flex-col gap-4 group">
                        <div className="flex items-center gap-3">
                            <ChevronRight size={12} className="text-zinc-800 group-hover:text-primary transition-colors" />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">PHASE_03</span>
                        </div>
                        <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Validation_Final</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase italic">Success criteria verification and handover protocol.</p>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <Calendar size={10} className="text-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">SYSTEM_TIME: {new Date().getFullYear()} // REF_INIT_{initiative.id}</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-1 w-4 bg-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}