'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Celebration, Individual, Interview, Media, Meetup } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Binary, Camera, ChevronRight, MessageSquare, Quote, Sparkles, Users } from 'lucide-react'
import { motion } from 'motion/react'

interface LifeAtMotorsportProps {
    celebrations: Celebration[]
    interviews: Interview[]
    meetups: Meetup[]
}

export default function LifeAtMotorsport({ celebrations, interviews, meetups }: LifeAtMotorsportProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Sparkles size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">CULTURE_RECONSTRUCTION_ENGINE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Life at<span className="text-zinc-900"> Motorsport</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center gap-4">
                            <Camera size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">BEHIND_THE_SCENES</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {celebrations.slice(0, 1).map((celebration) => {
                                const gallery = (celebration.assets?.gallery || []) as Media[]
                                return gallery.slice(0, 4).map((img, idx) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={cn(
                                            "relative aspect-[4/3] bg-zinc-950 border border-zinc-900 group overflow-hidden",
                                            idx === 0 && "col-span-2 aspect-[21/9]"
                                        )}
                                    >
                                        <img
                                            src={img.url || ''}
                                            alt={img.alt || 'Motorsport Culture'}
                                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 border border-zinc-900">
                                            <span className="text-[7px] font-black text-white uppercase tracking-tighter italic">RAW_DATA_CAPTURE_{idx}</span>
                                        </div>
                                    </motion.div>
                                ))
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-4">
                            <MessageSquare size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">TESTIMONIALS</span>
                        </div>
                        <div className="space-y-4">
                            {interviews.slice(0, 3).map((interview, idx) => {
                                const person = interview.details.interviewee as Individual
                                return (
                                    <motion.div
                                        key={interview.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 bg-zinc-950 border border-zinc-900 group hover:border-primary transition-colors relative overflow-hidden"
                                    >
                                        <Quote className="absolute -right-4 -top-4 size-16 text-zinc-900 group-hover:text-primary/10 transition-colors" />
                                        <div className="space-y-4 relative z-10">
                                            <p className="text-[11px] font-bold text-zinc-400 uppercase italic leading-relaxed">
                                                "{interview.basics?.summary || 'THE_ENGINEERING_PRECISION_HERE_IS_UNMATCHED_IN_THE_INDUSTRY.'}"
                                            </p>
                                            <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
                                                <div className="size-8 bg-zinc-900 border border-zinc-800 grayscale overflow-hidden">
                                                    {typeof person.assets?.avatar === 'object' && person.assets?.avatar?.url && (
                                                        <img src={person.assets.avatar.url} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-white uppercase tracking-tighter">{person.first_name} {person.last_name}</span>
                                                    <span className="text-[7px] font-black text-zinc-700 uppercase">{interview.basics?.tagline || 'SYSTEM_OPERATIVE'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Users size={14} className="text-zinc-800" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">COMMUNITY_HIGHLIGHTS</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {meetups.slice(0, 4).map((meetup, idx) => (
                            <motion.div
                                key={meetup.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between hover:bg-zinc-900 transition-all cursor-pointer"
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[7px] font-black text-primary uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>{meetup.details.format}</span>
                                        <Binary size={10} className="text-zinc-800" />
                                    </div>
                                    <h4 className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:translate-x-1 transition-transform">
                                        {meetup.name}
                                    </h4>
                                </div>
                                <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-900/50">
                                    <span className="text-[7px] font-mono text-zinc-700">DATE: {new Date(meetup.details.start_date).toLocaleDateString()}</span>
                                    <ChevronRight size={12} className="text-zinc-800 group-hover:text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-6">
                        <div className="h-[2px] w-12 bg-zinc-900" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">CULTURE_FEED_END_TRANSMISSION</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="size-1 bg-zinc-800 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}