'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Category, Leader, Program } from '@/payload-types'
import { ArrowRight, Binary, BookOpen, Box, Clock, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'motion/react'

interface ProgramCurriculumMentorsProps {
    program: Program
}

export default function ProgramCurriculumMentors({ program }: ProgramCurriculumMentorsProps) {
    const curriculum = program.traits?.curriculum?.list || []
    const mentors = (program.details?.mentors || []) as Leader[]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <BookOpen size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">KNOWLEDGE_TRANSFER_PROTOCOL</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Curriculum &<span className="text-zinc-900"> Mentors</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7 space-y-12">
                        <div className="flex items-center gap-4">
                            <Binary size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">MODULE_SEQUENCING</span>
                        </div>

                        <div className="space-y-4">
                            {curriculum.length > 0 ? curriculum.map((module, idx) => (
                                <motion.div
                                    key={module.id || idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-zinc-950 border border-zinc-900 p-8 group hover:border-zinc-700 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[7px] font-mono text-zinc-800">MOD_0{idx + 1}</span>
                                                <div className="h-px w-6 bg-zinc-900" />
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={10} className="text-zinc-700" />
                                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{module.duration}</span>
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any}>
                                                {module.module_name}
                                            </h4>
                                        </div>

                                        <div className="md:w-64 space-y-2 border-t md:border-t-0 md:border-l border-zinc-900 pt-6 md:pt-0 md:pl-8">
                                            <div className="flex items-center gap-2">
                                                <Box size={10} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">CORE_DELIVERABLE</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase italic">
                                                {module.deliverable}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="bg-black py-20 border border-dashed border-zinc-900 flex flex-col items-center justify-center opacity-20">
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">CURRICULUM_NOT_YET_DEEPLY_INDEXED</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-12">
                        <div className="flex items-center gap-4">
                            <Users size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">FACULTY_ASSIGNMENT</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mentors.length > 0 ? mentors.map((mentor, idx) => (
                                <motion.div
                                    key={mentor.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-zinc-950 border border-zinc-900 overflow-hidden group"
                                >
                                    <div className="aspect-[3/4] relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                        {typeof mentor.assets?.avatar === 'object' && mentor.assets?.avatar?.url ? (
                                            <img
                                                src={mentor.assets.avatar.url}
                                                alt={mentor.first_name}
                                                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                                <Users size={32} className="text-zinc-950" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                        <div className="absolute bottom-6 left-6 right-6 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="size-1 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[8px] font-black text-white uppercase tracking-tighter italic">
                                                    {(mentor.categories?.[0] as Category)?.name || 'LEAD_MENTOR'}
                                                </span>
                                            </div>
                                            <h5 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">
                                                {mentor.first_name} {mentor.last_name}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-black flex justify-between items-center border-t border-zinc-900">
                                        <span className="text-[7px] font-mono text-zinc-800">NODE_REF_{mentor.id}</span>
                                        <ArrowRight size={10} className="text-zinc-900 group-hover:text-primary transition-colors" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any} />
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="col-span-full py-20 bg-zinc-950 border border-zinc-900 flex flex-col items-center justify-center gap-4 opacity-30">
                                    <ShieldCheck size={20} className="text-zinc-800" />
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">MENTOR_ACCESS_RESTRICTED</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-6">
                        <div className="flex gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-1 w-8 bg-zinc-900" />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">SYSTEM_READY_FOR_ENROLLMENT_BYPASS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[7px] font-black text-zinc-800 uppercase italic">MODULE_COUNT: {curriculum.length}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}