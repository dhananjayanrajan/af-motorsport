'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Celebration, Driver, Leader, Media } from '@/payload-types'
import { Calendar, MapPin, PartyPopper, Users, ZoomIn } from 'lucide-react'
import { motion } from 'motion/react'

interface CelebrationGalleryProps {
    celebrations: Celebration[]
}

export default function CelebrationGallery({ celebrations }: CelebrationGalleryProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <PartyPopper size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TEAM_MOMENT_CAPTURE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Celebration<span className="text-zinc-900"> Gallery</span>
                        </h2>
                    </div>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {celebrations.map((item, idx) => {
                        const thumb = item.assets?.thumbnail as Media
                        const date = item.details?.date_time ? new Date(item.details.date_time) : null
                        const participants = [
                            ...(item.details?.leaders || []),
                            ...(item.details?.drivers || [])
                        ] as (Leader | Driver)[]

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx % 3) * 0.1 }}
                                className="break-inside-avoid bg-zinc-950 border border-zinc-900 group hover:border-zinc-700 transition-all duration-500 overflow-hidden flex flex-col"
                            >
                                <div className="relative overflow-hidden aspect-auto">
                                    {thumb?.url ? (
                                        <img
                                            src={thumb.url}
                                            alt={item.name}
                                            className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="aspect-video bg-zinc-900 flex items-center justify-center">
                                            <PartyPopper size={24} className="text-zinc-800" />
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[7px] font-black text-primary uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                {item.details?.exclusivity || 'OPERATIONAL'}
                                            </span>
                                            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <div className="size-8 bg-black/80 border border-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ZoomIn size={14} className="text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={10} className="text-zinc-800" />
                                                <span className="text-[7px] font-black text-zinc-800 uppercase">TIMESTAMP</span>
                                            </div>
                                            <span className="text-[9px] font-black text-zinc-400 italic">
                                                {date ? date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : 'NO_DATA'}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={10} className="text-zinc-800" />
                                                <span className="text-[7px] font-black text-zinc-800 uppercase">LOCATION</span>
                                            </div>
                                            <span className="text-[9px] font-black text-zinc-400 italic">
                                                {item.details?.location ? 'COORD_VERIFIED' : 'REMOTE_NODE'}
                                            </span>
                                        </div>
                                    </div>

                                    {participants.length > 0 && (
                                        <div className="pt-4 border-t border-zinc-900 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Users size={10} className="text-zinc-800" />
                                                <span className="text-[7px] font-black text-zinc-800 uppercase">PARTICIPANTS</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {participants.slice(0, 4).map((p, pIdx) => (
                                                    <span key={pIdx} className="px-2 py-0.5 bg-zinc-900 text-[8px] font-black text-zinc-500 uppercase italic">
                                                        {p.last_name}
                                                    </span>
                                                ))}
                                                {participants.length > 4 && (
                                                    <span className="px-2 py-0.5 bg-zinc-900 text-[8px] font-black text-zinc-700 uppercase italic">
                                                        +{participants.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="h-1 w-full bg-zinc-900">
                                    <div className="h-full w-0 group-hover:w-full bg-primary transition-all duration-1000" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-8 bg-zinc-900" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">LOG_END: {celebrations.length} RECORDS_FOUND</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="size-1 bg-zinc-900 rotate-45" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}