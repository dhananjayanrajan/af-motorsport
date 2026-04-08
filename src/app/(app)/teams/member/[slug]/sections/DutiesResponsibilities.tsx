'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Member } from '@/payload-types'
import { Briefcase, Info, ListChecks } from 'lucide-react'
import { motion } from 'motion/react'

interface DutiesResponsibilitiesProps {
    member: Member
}

export default function DutiesResponsibilities({ member }: DutiesResponsibilitiesProps) {
    const dutiesText = member.details?.duties

    return (
        <section className="w-full py-24 px-10 md:px-16 border-y border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Briefcase size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">OPERATIONAL_PROTOCOL_v4</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Role<span className="text-zinc-900"> Parameters</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-900">
                        <Info size={10} className="text-zinc-700" />
                        <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">CLEARANCE_LEVEL: INTERNAL</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
                    <div className="lg:col-span-4 bg-black p-10 md:p-12 space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">VERTICAL_OWNERSHIP</span>
                                <p className="text-[10px] font-bold text-white uppercase italic tracking-wide">
                                    FULL_STACK_SYSTEM_INTEGRATION
                                </p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">REPORTING_STRUCTURE</span>
                                <p className="text-[10px] font-bold text-white uppercase italic tracking-wide">
                                    DIRECT_TO_LEAD_ARCHITECT
                                </p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-zinc-900">
                            <div className="flex items-center gap-3 mb-4">
                                <ListChecks size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">EXECUTION_FLOW</span>
                            </div>
                            <ul className="space-y-3">
                                {['REQUIREMENTS_ANALYSIS', 'ATOMIC_DEVELOPMENT', 'LOAD_STABILIZATION', 'STAGING_VALIDATION'].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <div className="size-1 bg-zinc-800" />
                                        <span className="text-[8px] font-bold text-zinc-600 uppercase">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-8 bg-zinc-950 p-10 md:p-16">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="prose prose-invert max-w-none"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-px flex-1 bg-zinc-900" />
                                <span className="text-[8px] font-mono text-zinc-800">SECTION_ALPHA_DUTIES</span>
                                <div className="h-px w-12 bg-zinc-900" />
                            </div>

                            <div className="whitespace-pre-wrap text-[11px] md:text-xs font-bold text-zinc-400 uppercase leading-relaxed tracking-wide italic selection:bg-white selection:text-black">
                                {dutiesText || 'NO_SPECIFIC_DUTIES_LOGGED_IN_SYSTEM_DATABASE'}
                            </div>

                            <div className="mt-16 flex justify-end">
                                <div className="text-right">
                                    <span className="block text-[6px] font-mono text-zinc-800 uppercase">AUTHENTICATED_BY</span>
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">SYSTEM_ADMIN_01</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}