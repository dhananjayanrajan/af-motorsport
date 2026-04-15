'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Vacancy } from '@/payload-types'
import { Binary, Briefcase, ChevronRight, Clock, FileText, Info, MapPin, ShieldCheck } from 'lucide-react'

interface VacancyRoleDescriptionProps {
    vacancy: Vacancy
}

export default function VacancyRoleDescription({ vacancy }: VacancyRoleDescriptionProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Briefcase size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">POSITION_SPEC_DECRYPTED</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Role<span className="text-zinc-900"> Description</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6 bg-zinc-950 border border-zinc-900 p-4">
                        <Binary size={14} className="text-zinc-800" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">REGISTRY_ID</span>
                            <span className="text-[10px] font-black text-white uppercase italic">VAC_{vacancy.id.toString().padStart(4, '0')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <FileText size={14} className="text-zinc-800" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">MISSION_OVERVIEW</span>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                    {vacancy.basics.title}
                                </h3>
                                <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:text-sm prose-p:font-bold prose-p:uppercase prose-p:italic prose-p:leading-relaxed">
                                    <p>{vacancy.basics.description || 'NO_DESCRIPTION_DATA_AVAILABLE_FOR_THIS_NODE'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <ShieldCheck size={14} className="text-zinc-800" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">OPERATIONAL_EXPECTATIONS</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                                {vacancy.details?.expectations?.list?.map((exp, idx) => (
                                    <div key={exp.id || idx} className="bg-black p-8 space-y-4 group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[7px] font-black text-primary uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                {exp.type || 'PROTOCOL'}
                                            </span>
                                            <ChevronRight size={10} className="text-zinc-800 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-black text-white uppercase italic">{exp.name}</h4>
                                            <p className="text-[9px] font-bold text-zinc-600 uppercase italic leading-tight">
                                                {exp.statement}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-8 sticky top-24">
                            <div className="flex items-center gap-3 pb-4 border-b border-zinc-900">
                                <Info size={12} className="text-zinc-700" />
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">DEPLOYMENT_DATA</span>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase">SECTOR</span>
                                        <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                            {vacancy.details?.department || 'GENERAL'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase">CONTRACT_TYPE</span>
                                        <div className="flex items-center gap-2">
                                            <Clock size={10} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                                {vacancy.details?.contract?.replace('_', ' ') || 'UNDEFINED'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase">ZONE_ASSIGNMENT</span>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={10} className="text-zinc-700" />
                                            <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                                {vacancy.details?.locations ? 'MULTIPLE_NODES' : 'REMOTE_STATION'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="p-4 border border-zinc-800 bg-zinc-900/30 space-y-2">
                                        <span className="text-[6px] font-black text-zinc-500 uppercase tracking-widest">REPORTING_STRUCTURE</span>
                                        <p className="text-[9px] font-bold text-zinc-400 uppercase italic leading-tight">
                                            REPORTS_DIRECTLY_TO_DEPARTMENT_LEAD_OR_ASSIGNED_CHIEF_ENGINEER.
                                        </p>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any}>
                                    INITIATE_APPLICATION
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="h-1 w-4 bg-zinc-900" />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">SPEC_INTEGRITY_VERIFIED</span>
                    </div>
                    <div className="text-[7px] font-mono text-zinc-800 uppercase">
                        {new Date(vacancy.updatedAt).toISOString()}
                    </div>
                </div>
            </div>
        </section>
    )
}