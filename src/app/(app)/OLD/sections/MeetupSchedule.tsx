'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Meetup } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Activity, Calendar, ChevronRight, Clock, MapPin } from 'lucide-react'
import { motion } from 'motion/react'

interface MeetupScheduleProps {
    meetup: Meetup
}

export default function MeetupSchedule({ meetup }: MeetupScheduleProps) {
    const start = new Date(meetup.details.start_date)
    const end = meetup.details.end_date ? new Date(meetup.details.end_date) : null

    const scheduleItems = [
        {
            time: start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            label: 'INITIAL_COMMENCEMENT',
            description: 'System initialization and participant uplink.',
            status: 'active'
        },
        {
            time: 'TBD',
            label: 'CORE_OPERATIONS',
            description: meetup.basics?.description || 'Strategic brief and operational execution.',
            status: 'pending'
        },
        {
            time: end ? end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'CONT.',
            label: 'TERMINAL_DEBRIEF',
            description: 'Post-operation analysis and sync.',
            status: 'pending'
        }
    ]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Clock size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TEMPORAL_SEQUENCE_LOG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Event<span className="text-zinc-900"> Schedule</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6 bg-zinc-950 border border-zinc-900 p-6">
                        <Calendar size={16} className="text-zinc-800" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">DEPLOYMENT_DATE</span>
                            <span className="text-sm font-black text-white italic uppercase">
                                {start.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-[15px] md:left-[167px] top-0 bottom-0 w-px bg-zinc-900" />

                    <div className="space-y-12 relative z-10">
                        {scheduleItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col md:flex-row gap-8 md:gap-24"
                            >
                                <div className="flex items-center gap-6 md:w-32 md:justify-end">
                                    <span className="text-xl font-black italic text-zinc-700 font-mono tracking-tighter">
                                        {item.time}
                                    </span>
                                    <div className="md:hidden size-2 bg-zinc-800 rotate-45" />
                                </div>

                                <div className="hidden md:flex items-center justify-center">
                                    <div className={cn(
                                        "size-8 border flex items-center justify-center rotate-45 transition-colors duration-500",
                                        item.status === 'active' ? "bg-primary border-primary" : "bg-black border-zinc-800"
                                    )}
                                        style={{ backgroundColor: item.status === 'active' ? DESIGN_SYSTEM.COLORS.PRIMARY : '', borderColor: item.status === 'active' ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                        <Activity size={12} className={cn("rotate-[-45deg]", item.status === 'active' ? "text-black" : "text-zinc-800")} />
                                    </div>
                                </div>

                                <div className="flex-grow bg-zinc-950/30 border border-zinc-900/50 p-8 hover:border-zinc-800 transition-colors group">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] font-black text-primary uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                {item.label}
                                            </span>
                                            <ChevronRight size={10} className="text-zinc-800 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <p className="text-xs font-black text-zinc-400 uppercase italic leading-relaxed max-w-2xl">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {meetup.details.notes && (
                    <div className="mt-12 p-8 bg-zinc-950 border-l-2 border-primary" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                        <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest block mb-2">OPERATIONAL_REMARKS</span>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase italic">
                            {meetup.details.notes}
                        </p>
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-3">
                        <MapPin size={10} className="text-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.2em]">
                            LOCATION_SYNC: {meetup.details.locations ? meetup.details.locations.join(' / ') : 'ENCRYPTED'}
                        </span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-1 w-6 bg-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}