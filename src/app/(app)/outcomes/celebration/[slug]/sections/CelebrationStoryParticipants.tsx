'use client'

import { RichText } from '@/components/RichText'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Celebration, Driver, Leader, Media } from '@/payload-types'
import { ArrowRight, BookOpen, ShieldCheck, UserCheck, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface CelebrationStoryParticipantsProps {
    celebration: Celebration
}

export default function CelebrationStoryParticipants({ celebration }: CelebrationStoryParticipantsProps) {
    const participants = [
        ...(celebration.details?.leaders || []),
        ...(celebration.details?.drivers || [])
    ] as (Leader | Driver)[]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <BookOpen size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">EVENT_LOG_DECOMPRESSION</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Story &<span className="text-zinc-900"> Personnel</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6 bg-zinc-950 border border-zinc-900 p-4">
                        <ShieldCheck size={14} className="text-zinc-800" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">CLEARANCE_LEVEL</span>
                            <span className="text-[10px] font-black text-white uppercase italic">{celebration.details?.exclusivity || 'STANDARD'}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-12 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">NARRATIVE_SEQUENCE</span>
                            </div>

                            <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:text-sm prose-p:font-bold prose-p:uppercase prose-p:italic prose-p:leading-relaxed">
                                {celebration.details?.story && (
                                    <RichText data={celebration.details.story as any} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-zinc-950 border border-zinc-900 p-6 space-y-3">
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">TIMESTAMP</span>
                                <p className="text-sm font-black text-white uppercase italic">
                                    {celebration.details?.date_time ? new Date(celebration.details.date_time).toLocaleString() : 'N/A'}
                                </p>
                            </div>
                            <div className="bg-zinc-950 border border-zinc-900 p-6 space-y-3">
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">GEOLOCATION</span>
                                <p className="text-sm font-black text-white uppercase italic">
                                    {celebration.details?.location ? 'VERIFIED_COORDINATES' : 'REMOTE_STATION'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Users size={12} className="text-zinc-700" />
                                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">FEATURED_PERSONNEL</span>
                            </div>
                            <span className="text-[8px] font-mono text-zinc-800 tracking-tighter">COUNT: {participants.length}</span>
                        </div>

                        <div className="space-y-2">
                            {participants.length > 0 ? (
                                participants.map((person, idx) => {
                                    const avatar = person.assets?.avatar as Media
                                    const title = 'basics' in person ? person.first_name + ' ' + person.last_name : 'OPERATIONAL_DRIVER'

                                    return (
                                        <motion.div
                                            key={person.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all cursor-crosshair"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-zinc-900 border border-zinc-800 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                                    {avatar?.url ? (
                                                        <img src={avatar.url} alt={person.last_name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <UserCheck size={16} className="text-zinc-800" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">
                                                        {title || 'PERSONNEL_NODE'}
                                                    </span>
                                                    <span className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                                                        {person.first_name} {person.last_name}
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowRight size={12} className="text-zinc-900 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </motion.div>
                                    )
                                })
                            ) : (
                                <div className="py-20 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-4 opacity-20 grayscale">
                                    <Zap size={24} />
                                    <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">NO_PERSONNEL_ATTACHED</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-4 w-[1px] bg-zinc-900" />
                        ))}
                    </div>
                    <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.8em]">STORY_INTEGRITY_STAMP_OK</span>
                </div>
            </div>
        </section>
    )
}