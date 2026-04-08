'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Championship, Point, Regulation } from '@/payload-types'
import { AlertTriangle, FileText, ListOrdered, ShieldCheck, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface RegulationsFormatProps {
    championship: Championship
}

export default function RegulationsFormat({ championship }: RegulationsFormatProps) {
    const regulations = championship.details?.regulations as Regulation
    const pointsSystem = championship.details?.points_system as Point

    return (
        <section className="w-full py-24 px-10 md:px-16 border-y border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">GOVERNANCE_STRUCTURE_V2</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Rules &<span className="text-zinc-900"> Format</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-3 bg-zinc-950 border border-zinc-900">
                        <FileText size={12} className="text-zinc-700" />
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest italic">REG_REF: {regulations?.id || 'GLOBAL_STD'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-black p-10 space-y-10 group"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <ListOrdered size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">SCORING_LOGIC</h3>
                            </div>
                            <div className="h-0.5 w-8 bg-zinc-800 group-hover:w-16 transition-all" />
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-zinc-950 border border-zinc-900 border-l-primary border-l-2">
                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest block mb-2">POINTS_SYSTEM</span>
                                <p className="text-xl font-black italic text-white uppercase tracking-tight">
                                    {pointsSystem?.name || 'STANDARD_ALLOCATION'}
                                </p>
                                <p className="text-[8px] font-bold text-zinc-600 uppercase mt-4 italic">
                                    SCALE: {pointsSystem?.details?.scale || 'FIXED'}
                                </p>
                            </div>
                            <p className="text-[9px] font-bold text-zinc-500 uppercase leading-relaxed tracking-wide">
                                {pointsSystem?.basics?.description || 'SYSTEM_CALCULATES_RANKING_BASED_ON_FINISHING_ORDER_AND_LAP_TELEMETRY.'}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-950 p-10 space-y-10 group"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Zap size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">EVENT_PROTOCOL</h3>
                            </div>
                            <div className="h-0.5 w-8 bg-zinc-800 group-hover:w-16 transition-all" />
                        </div>
                        <div className="space-y-6">
                            <div className="whitespace-pre-wrap text-[10px] md:text-[11px] font-bold text-zinc-400 uppercase leading-loose tracking-widest italic">
                                {championship.details?.format || 'EVENT_CONSISTS_OF_QUALIFYING_SESSION_FOLLOWED_BY_MAIN_RACE_STAGES.'}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-black p-10 space-y-10 group"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <AlertTriangle size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">TECHNICAL_NOTES</h3>
                            </div>
                            <div className="h-0.5 w-8 bg-zinc-800 group-hover:w-16 transition-all" />
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">STANDINGS_SCOPE</span>
                                    <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                        {championship.details?.standings_scope?.replace('_', ' ') || 'SEASON_ONLY'}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-zinc-900" />
                                <p className="text-[9px] font-bold text-zinc-600 uppercase leading-relaxed italic">
                                    {championship.details?.notes || 'ALL_COMPETITORS_MUST_ADHERE_TO_WEIGHT_AND_AERODYNAMIC_SPECIFICATIONS_DEFINED_IN_ANNEX_A.'}
                                </p>
                            </div>
                            <div className="pt-4 flex items-center gap-2">
                                <div className="size-1 rounded-full bg-zinc-800" />
                                <div className="size-1 rounded-full bg-zinc-800" />
                                <div className="size-1 rounded-full bg-zinc-800" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}