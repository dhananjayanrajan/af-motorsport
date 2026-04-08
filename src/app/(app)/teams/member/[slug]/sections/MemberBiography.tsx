'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Member } from '@/payload-types'
import { Award, Calendar, Fingerprint, History } from 'lucide-react'
import { motion } from 'motion/react'

interface MemberBiographyProps {
    member: Member
}

export default function MemberBiography({ member }: MemberBiographyProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 border-b border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    <div className="lg:col-span-4 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Fingerprint size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">PERSONNEL_FILE_v2.0</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                                The<span className="text-zinc-900"> Bio</span>
                            </h2>
                        </div>

                        <div className="space-y-6 pt-8 border-t border-zinc-900">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Calendar size={14} className="text-zinc-800" />
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">INDUCTION_DATE</span>
                                </div>
                                <span className="text-[10px] font-black text-white italic">
                                    {member.basics?.joining_date ? new Date(member.basics.joining_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : 'CLASSIFIED'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <History size={14} className="text-zinc-800" />
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">TENURE_STATUS</span>
                                </div>
                                <span className="text-[10px] font-black text-white italic">ACTIVE_DUTY</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Award size={14} className="text-zinc-800" />
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">DESIGNATION</span>
                                </div>
                                <span className="text-[10px] font-black text-white italic uppercase">
                                    {member.alias || 'MEMBER'}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 bg-zinc-950 border border-zinc-900">
                            <p className="text-[9px] font-bold text-zinc-600 uppercase italic leading-relaxed tracking-tight">
                                {member.basics?.description || 'THE_MEMBER_OWNS_THE_ENTIRE_VERTICAL_LOGIC_FROM_SYSTEM_ARCHITECTURE_TO_DEPLOYMENT_INTEGRITY.'}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -left-8 top-0 bottom-0 w-px bg-zinc-900 hidden lg:block" />

                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">01_CAREER_TRAJECTORY</span>
                                    <div className="h-px flex-1 bg-zinc-900/50" />
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-sm md:text-base font-bold text-zinc-400 uppercase leading-loose italic tracking-wide selection:bg-white selection:text-black">
                                        SYSTEM_ENTRY: INITIALIZING_PERSONNEL_HISTORY...
                                    </p>

                                    <div className="space-y-8 mt-8">
                                        <p className="text-[11px] md:text-xs font-bold text-zinc-500 uppercase leading-relaxed tracking-widest italic">
                                            CONSISTENT_DELIVERY_OF_HIGH_PERFORMANCE_ENTERPRISE_SOLUTIONS.
                                            SPECIALIZING_IN_SCALABLE_ARCHITECTURE_FOR_REAL_WORLD_ENGINEERING.
                                        </p>

                                        <div className="flex flex-col gap-4 p-8 border-l-2 border-zinc-900 bg-zinc-950/30">
                                            <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">KEY_CONTRIBUTIONS</span>
                                            <ul className="space-y-3 m-0 p-0 list-none">
                                                {['CORE_SYSTEM_OPTIMIZATION', 'DATABASE_SCALING_V3', 'AUTOMATED_CI_PIPELINES'].map((item) => (
                                                    <li key={item} className="flex items-center gap-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest m-0">
                                                        <div className="size-1 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-12">
                                    <div className="h-px flex-1 bg-zinc-900/50" />
                                    <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">EOF_RECORD</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}