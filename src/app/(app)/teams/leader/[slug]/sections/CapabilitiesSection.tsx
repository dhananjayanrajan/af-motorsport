'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Award, Skill } from '@/payload-types'
import { ArrowUpRight, Layers, Trophy } from 'lucide-react'
import { motion } from 'motion/react'

interface CapabilitiesSectionProps {
    skills: Skill[]
    awards: Award[]
}

export default function CapabilitiesSection({ skills, awards }: CapabilitiesSectionProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 border-b border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-px lg:bg-zinc-900 border-y lg:border-x border-zinc-900">

                <div className="bg-black lg:p-16 space-y-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Layers size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">CORE_COMPETENCIES</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
                            Technical<span className="text-zinc-900"> Depth</span>
                        </h3>
                    </div>

                    <div className="space-y-6">
                        {skills.map((skill, idx) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group border-b border-zinc-900 pb-6 last:border-0"
                            >
                                <div className="flex justify-between items-end mb-4">
                                    <div className="space-y-1">
                                        <span className="text-[7px] font-mono text-zinc-800 uppercase italic">ID_00{skill.id}</span>
                                        <h4 className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-primary transition-colors">
                                            {skill.name}
                                        </h4>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[7px] font-black text-zinc-700 uppercase tracking-widest">DEPTH_LEVEL</span>
                                        <span className="text-[10px] font-black text-zinc-400 italic uppercase">
                                            {skill.details?.depth || 'STANDARD'}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full h-1 bg-zinc-950 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: skill.details?.depth === 'Expert' ? '100%' : skill.details?.depth === 'Advanced' ? '75%' : '40%' }}
                                        viewport={{ once: true }}
                                        className="h-full transition-all duration-1000"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-black lg:p-16 space-y-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Trophy size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">RECOGNITION_LOG</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
                            Official<span className="text-zinc-900"> Awards</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {awards.map((award, idx) => (
                            <motion.div
                                key={award.id}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-8 bg-zinc-950 border border-zinc-900 flex items-center justify-between group hover:border-zinc-700 transition-all"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="size-1 bg-zinc-800 group-hover:bg-white transition-colors" />
                                        <h4 className="text-[11px] font-black text-zinc-300 uppercase italic tracking-wide group-hover:text-white transition-colors">
                                            {award.name}
                                        </h4>
                                    </div>
                                    <p className="text-[8px] font-bold text-zinc-700 uppercase leading-relaxed max-w-xs truncate">
                                        {award.basics?.description || 'NO_DESCRIPTION_PROVIDED'}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-[10px] font-black text-white italic">
                                        {award.details?.awarded_date ? new Date(award.details.awarded_date).getFullYear() : '----'}
                                    </span>
                                    <ArrowUpRight size={12} className="text-zinc-900 group-hover:text-white transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}