'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Training } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Calendar, ChevronRight, Clock, Gauge, Layers, Timer, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface TrainingScheduleProps {
    training: Training
}

export default function TrainingSchedule({ training }: TrainingScheduleProps) {
    const start = training.details?.start_date ? new Date(training.details.start_date) : null
    const end = training.details?.end_date ? new Date(training.details.end_date) : null

    const durationSpec = training.details?.specifications?.list?.find(
        s => s.parameter?.toLowerCase().includes('duration')
    )

    const stats = [
        {
            label: 'COMMENCEMENT',
            value: start ? start.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD',
            icon: <Calendar size={12} />,
            sub: 'INITIAL_UPLINK'
        },
        {
            label: 'TERMINATION',
            value: end ? end.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'CONT.',
            icon: <Timer size={12} />,
            sub: 'FINAL_DEBRIEF'
        },
        {
            label: 'DURATION',
            value: durationSpec?.value || 'VAR_LENGTH',
            icon: <Clock size={12} />,
            sub: 'ACTIVE_MODULE_TIME'
        },
        {
            label: 'INTENSITY',
            value: training.basics?.intensity || 'STANDARD',
            icon: <Gauge size={12} />,
            sub: 'LOAD_CAPACITY',
            highlight: true
        }
    ]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Timer size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TEMPORAL_PROGRAM_MAPPING</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Program<span className="text-zinc-900"> Timing</span>
                        </h2>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-900 p-6 flex items-center gap-6">
                        <Layers size={16} className="text-zinc-800" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">DEPLOYMENT_FORMAT</span>
                            <span className="text-sm font-black text-white italic uppercase tracking-tight">
                                {training.basics?.format?.replace('_', ' ') || 'GENERAL_PROTOCOL'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-black p-10 space-y-8 group hover:bg-zinc-950 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-zinc-700 group-hover:text-primary transition-colors" style={{ color: stat.highlight ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                    {stat.icon}
                                </div>
                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.3em]">{stat.sub}</span>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">{stat.label}</span>
                                <div className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:translate-x-1 transition-transform">
                                    {stat.value}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                    <div className="bg-zinc-950 p-10 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <Zap size={12} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">OPERATIONAL_LOAD_PROFILE</span>
                        </div>
                        <p className="text-[11px] font-bold text-zinc-500 uppercase italic leading-relaxed">
                            This module requires {training.basics?.intensity} cognitive bandwidth. Ensure all prerequisite
                            skill nodes are synchronized prior to commencement to avoid logic desaturation.
                        </p>
                    </div>
                    <div className="bg-zinc-950 p-10 flex items-center justify-between group cursor-pointer">
                        <div className="space-y-1">
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">ENROLLMENT_UPLINK</span>
                            <div className="text-xl font-black text-white uppercase italic tracking-tighter">Request_Access_Node</div>
                        </div>
                        <div className="size-12 border border-zinc-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className={cn("h-4 w-1 bg-zinc-900", i === 0 && "bg-primary")} style={{ backgroundColor: i === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
                        ))}
                    </div>
                    <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.8em]">TIMING_PROTOCOL_VERIFIED</span>
                </div>
            </div>
        </section>
    )
}