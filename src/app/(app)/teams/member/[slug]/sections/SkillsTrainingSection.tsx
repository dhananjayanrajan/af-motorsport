'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Skill, Training } from '@/payload-types'
import { Activity, ChevronRight, Cpu, GraduationCap } from 'lucide-react'
import { motion } from 'motion/react'

interface SkillsTrainingSectionProps {
    skills: Skill[]
    trainings: Training[]
}

export default function SkillsTrainingSection({ skills, trainings }: SkillsTrainingSectionProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 border-b border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-px lg:bg-zinc-900 border-y lg:border-x border-zinc-900">

                <div className="bg-black lg:p-16 space-y-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Cpu size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TECHNICAL_STACK_INVENTORY</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
                            Domain<span className="text-zinc-900"> Expertise</span>
                        </h3>
                    </div>

                    <div className="space-y-8">
                        {skills.map((skill, idx) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-white uppercase italic tracking-wider group-hover:text-primary transition-colors">
                                            {skill.name}
                                        </h4>
                                        <p className="text-[8px] font-bold text-zinc-600 uppercase italic">
                                            {skill.details?.scale || 'MODERATE'}_SCALE_IMPACT
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">PROFICIENCY</span>
                                        <span className="text-[10px] font-black text-white italic">
                                            {skill.details?.depth?.toUpperCase() || 'STANDARD'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-1">
                                    {[1, 2, 3, 4].map((step) => {
                                        const depthMap = { Basic: 1, Intermediate: 2, Advanced: 3, Expert: 4 }
                                        const currentDepth = depthMap[skill.details?.depth as keyof typeof depthMap] || 1
                                        return (
                                            <div
                                                key={step}
                                                className="h-1 transition-all duration-700"
                                                style={{
                                                    backgroundColor: step <= currentDepth ? DESIGN_SYSTEM.COLORS.PRIMARY : '#09090b',
                                                    opacity: step <= currentDepth ? 1 : 0.3
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-black lg:p-16 space-y-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <GraduationCap size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">DEVELOPMENT_LIFECYCLE</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
                            Training<span className="text-zinc-900"> Log</span>
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {trainings.map((training, idx) => (
                            <motion.div
                                key={training.id}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-6 bg-zinc-950 border border-zinc-900 group hover:border-zinc-700 transition-all relative overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 right-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Activity size={10} className="text-zinc-800" />
                                            <span className="text-[7px] font-mono text-zinc-600 uppercase">PROGRAM_#{training.id}</span>
                                        </div>
                                        <h4 className="text-[11px] font-black text-zinc-300 uppercase italic tracking-widest group-hover:text-white transition-colors">
                                            {training.name}
                                        </h4>
                                    </div>
                                    <div className="bg-black px-2 py-1 border border-zinc-900">
                                        <span className="text-[7px] font-black text-zinc-500 uppercase">
                                            {training.basics?.intensity || 'LOW'}_INTENSITY
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[6px] font-black text-zinc-800 uppercase">FORMAT</span>
                                            <span className="text-[8px] font-bold text-zinc-500 uppercase">{training.basics?.format || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[6px] font-black text-zinc-800 uppercase">COMPLETION</span>
                                            <span className="text-[8px] font-bold text-zinc-500 uppercase">
                                                {training.details?.end_date ? new Date(training.details.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : 'ACTIVE'}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-900 group-hover:text-white transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}