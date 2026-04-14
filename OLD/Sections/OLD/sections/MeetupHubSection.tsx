'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Media, Meetup } from '@/payload-types'
import { ArrowUpRight, Calendar, Globe, Lock, MapPin, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'motion/react'

interface MeetupHubSectionProps {
    meetups: Meetup[]
}

export default function MeetupHubSection({ meetups }: MeetupHubSectionProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Users size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">COMMUNITY_OPERATIONS_NODE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Meetup<span className="text-zinc-900"> Hub</span>
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">ACTIVE_ENGAGEMENTS</span>
                            <span className="text-xl font-black text-white italic">{meetups.length.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {meetups.length > 0 ? (
                        meetups.map((meetup, idx) => {
                            const thumbnail = meetup.assets?.thumbnail as Media | undefined
                            const startDate = new Date(meetup.details.start_date)

                            const formatMap = {
                                in_person: { label: 'FIELD_DEPLOIMENT', icon: <MapPin size={10} /> },
                                virtual: { label: 'DIGITAL_UPLINK', icon: <Globe size={10} /> },
                                hybrid: { label: 'DUAL_SYNC', icon: <Globe size={10} /> }
                            }

                            const accessMap = {
                                public: 'UNRESTRICTED',
                                invite_only: 'ENCRYPTED_INVITE',
                                private: 'RESTRICTED_ACCESS',
                                exclusive: 'TIER_1_ONLY'
                            }

                            return (
                                <motion.div
                                    key={meetup.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative flex flex-col bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-500"
                                >
                                    <div className="aspect-video relative overflow-hidden bg-black">
                                        {thumbnail?.url ? (
                                            <img
                                                src={thumbnail.url}
                                                alt={meetup.name}
                                                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center grayscale opacity-10">
                                                <Users size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1.5 flex items-center gap-2">
                                            <div className="size-1.5 bg-primary rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest">
                                                {meetup.details.format ? formatMap[meetup.details.format].label : 'LOC_PENDING'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-grow space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-zinc-700">
                                                <Calendar size={10} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">
                                                    {startDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                                                {meetup.name}
                                            </h3>
                                        </div>

                                        <p className="text-[10px] font-bold text-zinc-500 uppercase italic leading-relaxed line-clamp-2">
                                            {meetup.basics?.description || 'ENGAGEMENT_PARAMETERS_UNDER_CLASSIFICATION.'}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900/50">
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">ACCESS_LEVEL</span>
                                                <div className="flex items-center gap-1.5">
                                                    <Lock size={8} className="text-zinc-700" />
                                                    <span className="text-[9px] font-black text-zinc-400 uppercase">
                                                        {meetup.details.access ? accessMap[meetup.details.access] : 'UNDETERMINED'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">VALIDATION</span>
                                                <div className="flex items-center gap-1.5">
                                                    <ShieldCheck size={8} className="text-zinc-700" />
                                                    <span className="text-[9px] font-black text-zinc-400 uppercase">VERIFIED_OP</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href={`/operations/meetups/${meetup.slug}`}
                                        className="w-full bg-zinc-900 py-4 flex items-center justify-center gap-3 text-white hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">REQUEST_REGISTRATION</span>
                                        <ArrowUpRight size={12} />
                                    </a>
                                </motion.div>
                            )
                        })
                    ) : (
                        <div className="col-span-full py-20 border border-dashed border-zinc-900 flex flex-col items-center justify-center space-y-4">
                            <span className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em]">NO_UPCOMING_OPERATIONS_FOUND</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}