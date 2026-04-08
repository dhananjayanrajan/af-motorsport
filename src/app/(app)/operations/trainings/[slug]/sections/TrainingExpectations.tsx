'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Training } from '@/payload-types'
import { ArrowRight, CheckCircle, ClipboardCheck, ShieldAlert, Target, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface TrainingExpectationsProps {
    training: Training
}

export default function TrainingExpectations({ training }: TrainingExpectationsProps) {
    const expectations = training.details?.expectations?.list || []

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ClipboardCheck size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">VALIDATION_EXPECTANCY_PROTOCOLS</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Success<span className="text-zinc-900"> Criteria</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {expectations.length > 0 ? (
                        expectations.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex flex-col bg-zinc-950 border border-zinc-900 p-8 group hover:bg-zinc-900/40 transition-all duration-300 relative"
                            >
                                <div className="absolute top-4 right-4">
                                    <Zap size={10} className="text-zinc-800 group-hover:text-primary transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">EXPECTATION_NODE</span>
                                        <h3 className="text-xl font-black italic text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                            {item.type || 'UNDEFINED_TYPE'}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">QUANTIFIABLE_CRITERIA</span>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase italic leading-relaxed">
                                                {item.criteria}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-zinc-900 flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <ArrowRight size={8} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">MISSION_STATEMENT</span>
                                            </div>
                                            <p className="text-[11px] font-black text-zinc-500 uppercase italic leading-tight">
                                                {item.statement}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <CheckCircle size={16} className="text-zinc-900 group-hover:text-zinc-700 transition-colors" />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-4 grayscale opacity-20">
                            <ShieldAlert size={32} />
                            <span className="text-[9px] font-black text-white uppercase tracking-[0.5em]">NO_REQUISITION_EXPECTATIONS_LOGGED</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <Target size={10} className="text-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest italic">VERIFICATION_STAMP: {new Date().getTime().toString(16).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-0.5 w-3 bg-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}