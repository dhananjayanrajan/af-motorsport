'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Leader } from '@/payload-types'
import { Compass, Hexagon } from 'lucide-react'
import { motion } from 'motion/react'

interface GuidingPrinciplesProps {
    leader: Leader
}

export default function GuidingPrinciples({ leader }: GuidingPrinciplesProps) {
    const principles = leader.details?.principles?.list || []

    if (principles.length === 0) return null

    return (
        <section className="w-full py-24 px-10 md:px-16 border-b border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Compass size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">ETHICAL_OPERATING_SYSTEM</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                        Guiding<span className="text-zinc-900"> Principles</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                    {principles.map((p, idx) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-black p-10 md:p-12 flex flex-col gap-10 group hover:bg-zinc-950 transition-all duration-500"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Hexagon size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                        <h3 className="text-lg font-black italic text-white uppercase tracking-tight">
                                            {p.name}
                                        </h3>
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
                                        {p.description}
                                    </p>
                                </div>
                                <span className="text-[6px] font-mono text-zinc-800 uppercase">RULE_{idx + 1}</span>
                            </div>

                            <div className="space-y-6">
                                <blockquote className="border-l-2 border-zinc-900 pl-6 py-1">
                                    <p className="text-sm font-black italic text-zinc-400 uppercase leading-snug group-hover:text-zinc-200 transition-colors">
                                        "{p.statement}"
                                    </p>
                                </blockquote>

                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-2">
                                        <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">APPLICATION</span>
                                        <p className="text-[9px] font-bold text-zinc-500 uppercase leading-relaxed italic">
                                            {p.application}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">RATIONALE</span>
                                        <p className="text-[9px] font-bold text-zinc-500 uppercase leading-relaxed italic">
                                            {p.rationale}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}