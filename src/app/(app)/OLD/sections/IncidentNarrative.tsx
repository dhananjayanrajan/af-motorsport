'use client'

import { RichText } from '@/components/RichText'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Incident } from '@/payload-types'
import { Activity, AlertTriangle, FileText, Info, ShieldAlert, Zap } from 'lucide-react'

interface IncidentNarrativeProps {
    incident: Incident
}

export default function IncidentNarrative({ incident }: IncidentNarrativeProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">DEBRIEF_FILE_ACCESSED</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Incident<span className="text-zinc-900"> Narrative</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-900 p-4">
                        <Activity size={14} className="text-red-600 animate-pulse" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">LOG_STATUS</span>
                            <span className="text-[10px] font-black text-white uppercase italic">POST_MORTEM_FINALIZED</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <FileText size={14} className="text-zinc-800" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CHRONOLOGICAL_REPORT</span>
                            </div>

                            <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:text-sm prose-p:font-bold prose-p:uppercase prose-p:italic prose-p:leading-relaxed prose-strong:text-white prose-strong:font-black">
                                {incident.details?.story && (
                                    <RichText data={incident.details.story as any} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-4 relative overflow-hidden group">
                                <Zap className="absolute -right-4 -top-4 size-16 text-zinc-900 group-hover:text-primary/10 transition-colors" />
                                <div className="flex items-center gap-3">
                                    <div className="size-1.5 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">CAUSE_ANALYSIS</span>
                                </div>
                                <p className="text-[11px] font-bold text-zinc-400 uppercase italic leading-relaxed">
                                    {incident.basics?.description || 'ROOT_CAUSE_INVESTIGATION_PENDING'}
                                </p>
                            </div>

                            <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-4 relative overflow-hidden group">
                                <ShieldAlert className="absolute -right-4 -top-4 size-16 text-zinc-900 group-hover:text-red-600/10 transition-colors" />
                                <div className="flex items-center gap-3">
                                    <div className="size-1.5 bg-red-600" />
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">RESOLUTION_OUTCOME</span>
                                </div>
                                <p className="text-[11px] font-bold text-zinc-400 uppercase italic leading-relaxed">
                                    SYSTEM_RECOVERY_COMPLETE. OPERATIONAL_SAFETY_RE_ESTABLISHED_POST_EVENT.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-8">
                            <div className="flex items-center gap-3 pb-4 border-b border-zinc-900">
                                <Info size={12} className="text-zinc-700" />
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">TELEMETRY_DATA</span>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest block">INCIDENT_MARKER</span>
                                    <span className="text-lg font-black text-white uppercase italic tracking-tighter">
                                        {incident.name}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase">TIME_STAMP</span>
                                        <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                            {incident.details?.date_time ? new Date(incident.details.date_time).toLocaleTimeString() : '00:00:00'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase">SECTOR_NODE</span>
                                        <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                            {incident.details?.location ? 'COORD_VERIFIED' : 'GLOBAL_LOC'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase">IMPACT_RATING</span>
                                        <span className="text-[9px] font-black text-primary uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                            MODERATE_CORE
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border border-zinc-900 bg-black flex items-center justify-between">
                            <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.2em]">HEX_VER_0x{incident.id.toString(16).toUpperCase()}</span>
                            <div className="flex gap-1">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="size-1 bg-zinc-900" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="h-0.5 w-12 bg-red-900/30" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.6em]">END_POST_MORTEM_REPORT</span>
                    </div>
                    <div className="text-[7px] font-mono text-zinc-800 uppercase">
                        {new Date(incident.updatedAt).toISOString()}
                    </div>
                </div>
            </div>
        </section>
    )
}