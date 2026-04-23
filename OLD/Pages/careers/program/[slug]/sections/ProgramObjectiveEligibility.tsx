'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Program } from '@/payload-types'
import { ChevronRight, Clock, Info, Layers, ShieldCheck, Target, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface ProgramObjectiveEligibilityProps {
    program: Program
}

export default function ProgramObjectiveEligibility({ program }: ProgramObjectiveEligibilityProps) {
    const eligibility = program.traits?.eligibility?.list || []

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Target size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">PROGRAM_MISSION_SPEC</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Objective &<span className="text-zinc-900"> Eligibility</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6 bg-zinc-950 border border-zinc-900 p-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">REGISTRY_CODE</span>
                            <span className="text-[10px] font-black text-white uppercase italic">{program.basics?.identifiers?.code || 'UA_NULL'}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7 space-y-16">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-12 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">MISSION_STATEMENT</span>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-900 p-10 relative overflow-hidden group">
                                <Target className="absolute -right-8 -bottom-8 size-40 text-zinc-900/50 group-hover:text-primary/10 transition-colors" />
                                <p className="text-xl md:text-2xl font-black text-white uppercase italic leading-tight tracking-tighter relative z-10">
                                    {program.details?.objective || 'CORE_OBJECTIVE_PENDING_DEFINITION'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Layers size={14} className="text-zinc-700" />
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">CLASSIFICATION</span>
                                </div>
                                <p className="text-sm font-black text-white uppercase italic">
                                    {program.details?.type || 'STANDARD_DEVELOPMENT'}
                                </p>
                            </div>
                            <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock size={14} className="text-zinc-700" />
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">TEMPORAL_DURATION</span>
                                </div>
                                <p className="text-sm font-black text-white uppercase italic">
                                    {program.details?.duration || 'TBD_TIMELINE'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-12">
                        <div className="flex items-center gap-4">
                            <ShieldCheck size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ENTRY_CRITERIA</span>
                        </div>

                        <div className="space-y-[1px] bg-zinc-900 border border-zinc-900">
                            {eligibility.length > 0 ? eligibility.map((item, idx) => (
                                <motion.div
                                    key={item.id || idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-black p-6 group hover:bg-zinc-950 transition-colors"
                                >
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-primary uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                    {item.criteria || 'PARAMETER'}
                                                </span>
                                                <h4 className="text-xs font-black text-white uppercase italic tracking-widest">
                                                    {item.value || 'REQUIRED'}
                                                </h4>
                                            </div>
                                            <ChevronRight size={12} className="text-zinc-900 group-hover:text-primary transition-colors" />
                                        </div>
                                        {item.description && (
                                            <p className="text-[9px] font-bold text-zinc-600 uppercase italic leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="bg-black p-12 flex flex-col items-center justify-center opacity-20 grayscale">
                                    <Zap size={24} className="mb-4" />
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">OPEN_ENROLLMENT</span>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-zinc-900/30 border border-zinc-900 flex items-start gap-4">
                            <Info size={14} className="text-zinc-700 mt-0.5" />
                            <p className="text-[8px] font-bold text-zinc-500 uppercase italic leading-normal">
                                ALL_APPLICANTS_MUST_UNDERGO_SECONDARY_VERIFICATION_UPON_ACCEPTANCE_INTO_THE_{program.name?.toUpperCase()}.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-8">
                        <div className="flex gap-1">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="h-4 w-[1px] bg-zinc-900" />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">DATA_INTEGRITY_LEVEL_04</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[7px] font-black text-zinc-800 uppercase italic">STATUS: {program.details?.status?.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}