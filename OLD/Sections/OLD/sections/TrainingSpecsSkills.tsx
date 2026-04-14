'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Skill, Training } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { BarChart, Binary, Cpu, Layers, Settings, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

interface TrainingSpecsSkillsProps {
    training: Training
}

export default function TrainingSpecsSkills({ training }: TrainingSpecsSkillsProps) {
    const specifications = training.details?.specifications?.list || []
    const skills = (training.categories || []) as Skill[]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Settings size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TECHNICAL_SPECIFICATIONS_ARRAY</span>
                            </div>
                            <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                                Module<span className="text-zinc-900"> Parameters</span>
                            </h3>
                        </div>

                        <div className="space-y-1">
                            {specifications.length > 0 ? specifications.map((spec, idx) => (
                                <div key={spec.id} className="group flex flex-col gap-2 p-6 bg-zinc-950/50 border-l border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">{spec.parameter || 'PARAM_NULL'}</span>
                                        <span className="text-[10px] font-black text-primary uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{spec.value}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-500 uppercase italic leading-relaxed">
                                        {spec.description}
                                    </p>
                                </div>
                            )) : (
                                <div className="p-6 border border-dashed border-zinc-900 text-[8px] font-black text-zinc-800 uppercase tracking-widest text-center">
                                    NO_SPECIFICATIONS_MAPPED
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Cpu size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">LEARNING_OUTCOME_VECTORS</span>
                            </div>
                            <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                                Skill<span className="text-zinc-900"> Requisition</span>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {skills.length > 0 ? skills.map((skill, idx) => (
                                <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-zinc-950 border border-zinc-900 p-6 group hover:border-zinc-700 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">SKILL_NODE</span>
                                            <h4 className="text-lg font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                                                {skill.name}
                                            </h4>
                                        </div>
                                        <ShieldCheck size={14} className="text-zinc-800" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <span className="text-[6px] font-black text-zinc-700 uppercase tracking-widest block">DEPTH_LEVEL</span>
                                            <div className="flex items-center gap-2">
                                                <BarChart size={10} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                <span className="text-[9px] font-black text-zinc-400 uppercase italic">{skill.details?.depth || 'TBD'}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[6px] font-black text-zinc-700 uppercase tracking-widest block">SCALE_BREADTH</span>
                                            <div className="flex items-center gap-2">
                                                <Layers size={10} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                <span className="text-[9px] font-black text-zinc-400 uppercase italic">{skill.details?.scale || 'TBD'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 h-0.5 w-full bg-zinc-900 overflow-hidden">
                                        <div className="h-full bg-primary" style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                                            width: skill.details?.depth === 'Expert' ? '100%' : skill.details?.depth === 'Advanced' ? '75%' : '50%'
                                        }} />
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="p-10 border border-dashed border-zinc-900 flex items-center justify-center">
                                    <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">NO_SKILL_NODES_IDENTIFIED</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <Binary size={10} className="text-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">SPEC_VALIDATION: VERIFIED // HASH_8842</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className={cn("h-1 w-2 bg-zinc-900", i % 4 === 0 && "bg-zinc-800")} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}