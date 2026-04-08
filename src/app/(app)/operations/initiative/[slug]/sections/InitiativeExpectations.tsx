'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Initiative } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { CheckCircle2, Fingerprint, ListChecks, ShieldAlert, Target } from 'lucide-react'
import { motion } from 'motion/react'

interface InitiativeExpectationsProps {
    initiative: Initiative
}

export default function InitiativeExpectations({ initiative }: InitiativeExpectationsProps) {
    const expectations = initiative.details?.expectations?.list || []

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ListChecks size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">SUCCESS_CRITERIA_MANIFEST</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Strategic<span className="text-zinc-900"> Expectations</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {expectations.length > 0 ? (
                        expectations.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-zinc-950 border border-zinc-900 p-8 hover:bg-zinc-900/40 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Fingerprint size={80} />
                                </div>

                                <div className="flex flex-col h-full gap-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <span className="text-[7px] font-black text-primary uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                {item.type || 'OBJECTIVE_NODE'}
                                            </span>
                                            <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <div className="size-8 border border-zinc-800 flex items-center justify-center rotate-45">
                                            <CheckCircle2 size={12} className="text-zinc-700 group-hover:text-primary transition-colors rotate-[-45deg]" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <div className="space-y-1">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">VALIDATION_CRITERIA</span>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase italic leading-relaxed">
                                                {item.criteria || 'SPECIFICATIONS_PENDING_SYNC'}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-zinc-900">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block mb-1">STRATEGIC_STATEMENT</span>
                                            <p className="text-xs font-black text-zinc-500 uppercase italic leading-tight">
                                                "{item.statement || 'CORE_DIRECTIVE_UNSET'}"
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-900 overflow-hidden">
                                    <div className="h-full w-1/4 bg-primary group-hover:w-full transition-all duration-1000" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-4">
                            <ShieldAlert size={24} className="text-zinc-900" />
                            <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">NO_EXPECTATIONS_LOGGED</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <Target size={10} className="text-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">INITIATIVE_ID: {initiative.id.toString().padStart(4, '0')}</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={cn("h-4 w-1", i % 2 === 0 ? "bg-zinc-800" : "bg-zinc-950")} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}