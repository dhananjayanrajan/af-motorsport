'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Skill, Training } from '@/payload-types'
import { Binary, ChevronRight, Gauge, GraduationCap, Layers, Monitor, Timer } from 'lucide-react'
import { motion } from 'motion/react'

interface TrainingCatalogProps {
    trainings: Training[]
}

export default function TrainingCatalog({ trainings }: TrainingCatalogProps) {
    const getIntensityColor = (intensity?: string) => {
        switch (intensity) {
            case 'extreme': return '#ef4444'
            case 'high': return DESIGN_SYSTEM.COLORS.PRIMARY
            case 'medium': return '#f59e0b'
            case 'low': return '#10b981'
            default: return '#27272a'
        }
    }

    const getFormatIcon = (format?: string) => {
        switch (format) {
            case 'remote': return <Monitor size={12} />
            case 'simulated': return <Binary size={12} />
            case 'hands_on': return <Gauge size={12} />
            default: return <Layers size={12} />
        }
    }

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <GraduationCap size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TECHNICAL_REQUISITION_CATALOG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Training<span className="text-zinc-900"> Catalog</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                    {trainings.map((training, idx) => {
                        const skills = (training.categories || []) as Skill[]
                        const duration = training.details?.specifications?.list?.find(s => s.parameter?.toLowerCase().includes('duration'))?.value || 'VAR_LENGTH'

                        return (
                            <motion.div
                                key={training.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-black p-12 flex flex-col gap-10 group hover:bg-zinc-950 transition-all duration-500"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="px-2 py-0.5 border text-[7px] font-black uppercase tracking-widest"
                                                style={{
                                                    borderColor: getIntensityColor(training.basics?.intensity || ''),
                                                    color: getIntensityColor(training.basics?.intensity || '')
                                                }}
                                            >
                                                {training.basics?.intensity || 'STANDARD'}_INTENSITY
                                            </div>
                                            <div className="flex items-center gap-1.5 text-zinc-500">
                                                {getFormatIcon(training.basics?.format || '')}
                                                <span className="text-[7px] font-black uppercase tracking-widest">{training.basics?.format || 'GENERAL'}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
                                            {training.name}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Timer size={14} className="text-zinc-800" />
                                        <span className="text-[9px] font-mono font-black text-zinc-600 uppercase">{duration}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">ASSOCIATED_SKILL_VECTOR</span>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.length > 0 ? skills.map((skill) => (
                                            <div
                                                key={skill.id}
                                                className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 text-[9px] font-black text-zinc-400 uppercase italic hover:border-zinc-600 hover:text-white transition-colors cursor-default"
                                            >
                                                {skill.name}
                                            </div>
                                        )) : (
                                            <span className="text-[8px] font-black text-zinc-800 uppercase">NO_SKILL_NODES_MAPPED</span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto pt-10 border-t border-zinc-900/50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase">ENROLLMENT_STATUS</span>
                                            <span className="text-[10px] font-black text-zinc-500 italic uppercase">OPEN_FOR_REQUISITION</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`/operations/training/${training.slug}`}
                                        className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                                    >
                                        MODULE_DETAILS <ChevronRight size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    </a>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-2">
                        <div className="size-1 bg-zinc-800" />
                        <div className="size-1 bg-zinc-800" />
                        <div className="size-1 bg-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase ml-4 tracking-[0.4em]">END_OF_CATALOG_BLOCK</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] font-black text-zinc-800 uppercase">LAST_REVISION</span>
                            <span className="text-[9px] font-black text-zinc-600 uppercase italic">APRIL_2026_CORE_SYNC</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}