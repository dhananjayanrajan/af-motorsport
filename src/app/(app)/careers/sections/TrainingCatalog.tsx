'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Program, Tag, Training } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ArrowUpRight, BarChart3, Gauge, GraduationCap, Layers, Target } from 'lucide-react'
import { motion } from 'motion/react'

interface TrainingCatalogProps {
    trainings: Training[]
    programs: Program[]
}

export default function TrainingCatalog({ trainings, programs }: TrainingCatalogProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Target size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">SKILL_ACQUISITION_MATRIX</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Development<span className="text-zinc-900"> Catalog</span>
                        </h2>
                    </div>
                </div>

                <div className="space-y-32">
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <GraduationCap size={16} className="text-zinc-800" />
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em]">SPECIALIZED_TRAININGS</h3>
                            <div className="h-px flex-1 bg-zinc-900" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                            {trainings.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group relative bg-zinc-950 border border-zinc-900 p-8 flex flex-col justify-between hover:border-zinc-700 transition-all min-h-[320px]"
                                >
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className={cn(
                                                "px-2 py-1 border text-[7px] font-black uppercase tracking-widest",
                                                item.basics?.intensity === 'extreme' ? "border-red-900 text-red-600" : "border-zinc-800 text-zinc-500"
                                            )}>
                                                {item.basics?.intensity || 'STANDARD'}_INTENSITY
                                            </div>
                                            <span className="text-[8px] font-mono text-zinc-800">TRN_{item.id}</span>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any}>
                                                {item.name}
                                            </h4>
                                            <p className="text-[9px] font-bold text-zinc-600 uppercase italic line-clamp-2">
                                                {item.basics?.format?.replace('_', ' ') || 'GENERAL_FORMAT'}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-1">
                                            {(item.tags as Tag[])?.slice(0, 3).map(tag => (
                                                <span key={tag.id} className="text-[6px] font-black bg-zinc-900 text-zinc-500 px-2 py-1 uppercase italic">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8 flex items-center justify-between border-t border-zinc-900 mt-8">
                                        <div className="flex items-center gap-2">
                                            <Gauge size={10} className="text-zinc-800" />
                                            <span className="text-[7px] font-black text-zinc-700 uppercase">LOAD_LEVEL: {item.basics?.intensity?.toUpperCase()}</span>
                                        </div>
                                        <ArrowUpRight size={14} className="text-zinc-900 group-hover:text-white transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <Layers size={16} className="text-zinc-800" />
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em]">ACADEMY_PROGRAMS</h3>
                            <div className="h-px flex-1 bg-zinc-900" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {programs.map((prog, idx) => (
                                <motion.div
                                    key={prog.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 transition-colors p-10 flex flex-col md:flex-row gap-10"
                                >
                                    <div className="flex-1 space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[8px] font-black text-primary uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                    {prog.details?.type || 'CORE_TRACK'}
                                                </span>
                                                <div className="h-px w-8 bg-zinc-800" />
                                                <span className="text-[8px] font-black text-zinc-700 uppercase">
                                                    {prog.details?.duration || 'TBD'}
                                                </span>
                                            </div>
                                            <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                                {prog.name}
                                            </h4>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase italic leading-relaxed">
                                                {prog.basics?.tagline || 'NO_TAGLINE_RECORDED'}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 pt-4">
                                            <div className="space-y-2">
                                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">OBJECTIVE</span>
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase italic line-clamp-2">{prog.details?.objective}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">OUTCOMES</span>
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase italic line-clamp-2">{prog.details?.outcomes}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-900 pt-8 md:pt-0 md:pl-10">
                                        <div className="space-y-6">
                                            <div className="space-y-1">
                                                <span className="text-[6px] font-black text-zinc-700 uppercase">PROGRAM_CODE</span>
                                                <div className="text-[10px] font-mono text-zinc-500">{prog.basics?.identifiers?.code || 'N/A'}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[6px] font-black text-zinc-700 uppercase">CURRENT_STATUS</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="size-1 bg-primary animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                    <span className="text-[9px] font-black text-white uppercase italic">{prog.details?.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-3 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all mt-8">
                                            ENROLL_SPEC
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-6">
                        <BarChart3 size={12} className="text-zinc-800" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">CATALOG_SYNCHRONIZED_LOCAL_NODE</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-6 w-[2px] bg-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}