'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Championship } from '@/payload-types'
import { Award, BookOpen, Landmark, Shield } from 'lucide-react'
import { motion } from 'motion/react'

interface ChampionshipHistoryProps {
    championship: Championship
}

export default function ChampionshipHistory({ championship }: ChampionshipHistoryProps) {
    return (
        <section className="w-full py-32 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    <div className="lg:col-span-4 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Landmark size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">HISTORICAL_ARCHIVE_DATA</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                                Legacy<span className="text-zinc-900"> Report</span>
                            </h2>
                        </div>

                        <div className="space-y-6 pt-10 border-t border-zinc-900">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                                    <BookOpen size={14} className="text-zinc-700" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">FOUNDING_YEAR</span>
                                    <span className="text-sm font-black text-white italic">
                                        {championship.details?.start_date ? new Date(championship.details.start_date).getFullYear() : 'EST_RECORD_NULL'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                                    <Shield size={14} className="text-zinc-700" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">ABBREVIATION</span>
                                    <span className="text-sm font-black text-white italic">
                                        {championship.basics?.identifiers?.abbreviation || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                                    <Award size={14} className="text-zinc-700" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">CHAMPIONSHIP_ID</span>
                                    <span className="text-sm font-black text-white italic">
                                        00{championship.id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-zinc-950/50 border border-zinc-900 border-r-primary border-r-2">
                            <p className="text-[9px] font-bold text-zinc-600 uppercase italic leading-relaxed tracking-widest">
                                {championship.basics?.description || 'THE_CHAMPIONSHIP_REPRESENTS_THE_APEX_OF_ENGINEERED_COMPETITION_AND_TECHNICAL_STABILITY.'}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-16"
                        >
                            <div className="flex items-center gap-6">
                                <div className="h-px w-12 bg-zinc-800" />
                                <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.8em]">RECORD_TRANSMISSION_START</span>
                                <div className="h-px flex-1 bg-zinc-800" />
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <div className="text-[11px] md:text-xs font-bold text-zinc-400 uppercase leading-loose tracking-widest italic selection:bg-white selection:text-black">
                                    {championship.details?.history ? (
                                        <div className="space-y-12">
                                            <p>
                                                THE_FOUNDATION_OF_THIS_SERIES_WAS_ESTABLISHED_ON_CORE_PRINCIPLES_OF_AERODYNAMIC_EFFICIENCY_AND_ATOMIC_PRECISION.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-zinc-900">
                                                <div className="space-y-4">
                                                    <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">DOMINANT_ERAS</span>
                                                    <p className="text-zinc-600 m-0">RECORDS_INDICATE_PROLONGED_PERIODS_OF_SYSTEM_SUPERIORITY_BY_ELITE_ENGINEERING_TEAMS.</p>
                                                </div>
                                                <div className="space-y-4">
                                                    <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">TECHNICAL_EVOLUTION</span>
                                                    <p className="text-zinc-600 m-0">CONTINUOUS_INTEGRATION_OF_NEXT_GEN_MATERIALS_AND_POWER_UNITS_DEFINES_MODERN_STANDARDS.</p>
                                                </div>
                                            </div>
                                            <p>
                                                THE_CHAMPIONSHIP_REMAINS_THE_DEFINITIVE_BENCHMARK_FOR_SCALABLE_PERFORMANCE_IN_PROFESSIONAL_MOTORSPORTS.
                                            </p>
                                        </div>
                                    ) : (
                                        'HISTORICAL_LOG_ENTRIES_FOR_THIS_ENTITY_ARE_CURRENTLY_ENCRYPTED_OR_NULL.'
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-12 border-t border-zinc-900">
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="size-1 bg-zinc-900" />
                                    ))}
                                </div>
                                <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">EOF_HISTORY_RECORD</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}