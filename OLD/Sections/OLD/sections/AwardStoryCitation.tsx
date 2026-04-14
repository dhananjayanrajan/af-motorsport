'use client'

import { RichText } from '@/components/RichText'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Award } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Award as AwardIcon, BookOpen, Fingerprint, Quote, ShieldCheck } from 'lucide-react'

interface AwardStoryCitationProps {
    award: Award
}

export default function AwardStoryCitation({ award }: AwardStoryCitationProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <BookOpen size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">NARRATIVE_LOG_DECRYPTED</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Story &<span className="text-zinc-900"> Citation</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest">OFFICIAL_NARRATIVE</span>
                            </div>

                            <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:text-sm prose-p:font-bold prose-p:uppercase prose-p:italic prose-p:leading-relaxed">
                                {award.details?.story && (
                                    <RichText data={award.details.story as any} />
                                )}
                            </div>
                        </div>

                        <div className="p-10 bg-zinc-950 border border-zinc-900 relative overflow-hidden group">
                            <Quote className="absolute -top-4 -right-4 size-24 opacity-5 text-primary group-hover:rotate-12 transition-transform" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <Fingerprint size={12} className="text-zinc-700" />
                                    <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">RECIPIENT_STATEMENT</span>
                                </div>
                                <p className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter leading-tight">
                                    "{award.basics?.description || 'NO_VERBAL_RECORD_ATTACHED_TO_THIS_NODE'}"
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-px w-8 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">VERIFIED_ORIGIN</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="sticky top-24 space-y-1">
                            <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">VALIDATION_ID</span>
                                        <div className="text-xs font-mono text-zinc-500">REF_{award.id.toString().padStart(6, '0')}</div>
                                    </div>
                                    <AwardIcon size={20} className="text-zinc-800" />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">AWARD_NOMENCLATURE</span>
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-2 border-primary pl-4" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                            {award.name}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="space-y-1">
                                            <span className="text-[6px] font-black text-zinc-800 uppercase tracking-widest block">TEMPORAL_MARK</span>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase italic">
                                                {award.details?.awarded_date ? new Date(award.details.awarded_date).getFullYear() : 'UNDATED'}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[6px] font-black text-zinc-800 uppercase tracking-widest block">GEO_POSITION</span>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase italic">
                                                {award.details?.awarded_location ? 'COORD_LOCKED' : 'GLOBAL_SECTOR'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-zinc-900 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={12} className="text-zinc-800" />
                                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">AUTHENTICITY_GUARANTEED</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="size-1 bg-zinc-800 rotate-45" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-1 mt-1">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-8 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                                        <div className="h-2 w-[1px] bg-zinc-900" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">END_STORY_BLOCK</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={cn("h-1 w-4", i % 4 === 0 ? "bg-zinc-800" : "bg-zinc-950")} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}