'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Vacancy } from '@/payload-types'
import { Activity, Info, ListChecks, Settings2, ShieldCheck, Target, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface VacancySpecsExpectationsProps {
    vacancy: Vacancy
}

export default function VacancySpecsExpectations({ vacancy }: VacancySpecsExpectationsProps) {
    const specs = vacancy.details?.specifications?.list || []
    const expectations = vacancy.details?.expectations?.list || []

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Settings2 size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TECHNICAL_REQUISITION_LOG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Specs &<span className="text-zinc-900"> Criteria</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Specifications List */}
                    <div className="lg:col-span-6 space-y-12">
                        <div className="flex items-center gap-4">
                            <ListChecks size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">MINIMUM_SPECIFICATIONS</span>
                        </div>

                        <div className="space-y-[1px] bg-zinc-900 border border-zinc-900">
                            {specs.length > 0 ? specs.map((spec, idx) => (
                                <motion.div
                                    key={spec.id || idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-black p-6 group hover:bg-zinc-950 transition-colors"
                                >
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[7px] font-black text-primary uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                {spec.parameter || 'PARAMETER'}
                                            </span>
                                            <div className="h-px flex-1 bg-zinc-900 mx-4 mt-1.5" />
                                            <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">
                                                {spec.value || 'REQUIRED'}
                                            </span>
                                        </div>
                                        {spec.description && (
                                            <p className="text-[9px] font-bold text-zinc-600 uppercase italic leading-relaxed max-w-[90%]">
                                                {spec.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="bg-black p-12 flex flex-col items-center justify-center opacity-20 grayscale">
                                    <Activity size={24} className="mb-4" />
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">NO_SPEC_PARAMETERS_DEFINED</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Expectations / Success Criteria */}
                    <div className="lg:col-span-6 space-y-12">
                        <div className="flex items-center gap-4">
                            <Target size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">SUCCESS_BENCHMARKS</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {expectations.length > 0 ? expectations.map((exp, idx) => (
                                <motion.div
                                    key={exp.id || idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="relative p-8 bg-zinc-950 border border-zinc-900 group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-primary transition-all" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                        <ShieldCheck size={40} strokeWidth={1} />
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="size-1 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                                {exp.type || 'KPI_METRIC'}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">
                                                {exp.name}
                                            </h4>
                                            <div className="flex gap-4">
                                                <div className="w-1 bg-zinc-900 shrink-0" />
                                                <div className="space-y-1">
                                                    <span className="text-[7px] font-black text-zinc-700 uppercase">SUCCESS_CRITERIA</span>
                                                    <p className="text-[10px] font-bold text-zinc-400 uppercase italic leading-snug">
                                                        {exp.criteria}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[9px] font-bold text-zinc-600 uppercase italic border-t border-zinc-900 pt-4">
                                            {exp.statement}
                                        </p>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="p-12 border border-dashed border-zinc-900 flex flex-col items-center justify-center opacity-20 grayscale">
                                    <Zap size={24} className="mb-4" />
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">NO_EXPECTATION_DATA_SYNCED</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Info size={10} className="text-zinc-800" />
                            <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.2em]">VERIFIED_BY: RECRUITMENT_ARCHITECT</span>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="size-2 border border-zinc-900 rotate-45" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}