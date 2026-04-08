'use client'

import { RichText } from '@/components/RichText'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit, Driver } from '@/payload-types'
import { ArrowUpRight, Calendar, History, Landmark, MapPin, Timer, Trophy } from 'lucide-react'

interface HistoryRecordsSectionProps {
    circuit: Circuit
}

export default function HistoryRecordsSection({ circuit }: HistoryRecordsSectionProps) {
    const lapRecordDriver = circuit.metrics?.record_lap_driver as Driver | undefined
    const historyData = circuit.details?.history

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <History size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">ARCHIVAL_CHRONOLOGY_LOG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Heritage &<span className="text-zinc-900"> Records</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-8 border-l border-zinc-900 pl-8">
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">ESTABLISHED</span>
                            <span className="text-xl font-black italic text-white">
                                {circuit.details?.opened ? new Date(circuit.details.opened).getFullYear() : 'N/A'}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">FIA_GRADE</span>
                            <span className="text-xl font-black italic text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                {circuit.details?.fia_grade || 'U/G'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7 space-y-12">
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-px bg-zinc-900" />
                            <div className="max-w-none">
                                {historyData ? (
                                    <RichText
                                        data={historyData as any}
                                        enableProse={true}
                                        className="prose prose-invert prose-p:text-zinc-500 prose-p:text-sm prose-p:leading-relaxed prose-p:font-bold prose-p:italic prose-p:uppercase prose-headings:text-white prose-headings:italic prose-headings:tracking-tighter"
                                    />
                                ) : (
                                    <p className="text-[10px] font-black text-zinc-800 uppercase italic">NO_ARCHIVAL_DATA_AVAILABLE_FOR_THIS_SECTOR_ID.</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {circuit.details?.renovated?.list?.map((rev, idx) => (
                                <div key={rev.id || idx} className="bg-zinc-950 border border-zinc-900 p-6 space-y-2 group hover:border-zinc-700 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-black italic text-white">{rev.year}</span>
                                        <Landmark size={12} className="text-zinc-800 group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-tight leading-snug">
                                        {rev.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-zinc-950 border border-zinc-900 p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4">
                                <Trophy size={40} className="text-zinc-900/50 group-hover:text-primary/20 transition-colors" />
                            </div>

                            <div className="relative z-10 space-y-10">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Timer size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">ALL_TIME_LAP_RECORD</span>
                                    </div>
                                    <h3 className="text-5xl font-black italic text-white tracking-tighter">
                                        {circuit.metrics?.record_lap_time || '0:00.000'}
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase">OPERATOR_ID</span>
                                        <span className="text-xs font-black text-white italic uppercase tracking-tighter">
                                            {lapRecordDriver ? `${lapRecordDriver.first_name} ${lapRecordDriver.last_name}` : 'UNKNOWN_ENTITY'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                                        <span className="text-[8px] font-black text-zinc-700 uppercase">TEMPORAL_MARK</span>
                                        <span className="text-xs font-black text-white italic tracking-tighter">
                                            {circuit.metrics?.record_lap_year || 'YEAR_TBD'}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="flex gap-2">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i} className="h-1 w-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black border border-zinc-900 p-6 space-y-4">
                                <MapPin size={14} className="text-zinc-800" />
                                <div className="space-y-1">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase">GEO_ADDRESS</span>
                                    <p className="text-[9px] font-black text-zinc-500 uppercase italic leading-tight truncate">
                                        {circuit.details?.address || 'COORDINATES_ONLY'}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-black border border-zinc-900 p-6 space-y-4">
                                <Calendar size={14} className="text-zinc-800" />
                                <div className="space-y-1">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase">LATEST_SYNC</span>
                                    <p className="text-[9px] font-black text-zinc-500 uppercase italic leading-tight">
                                        {new Date(circuit.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {circuit.details?.website && (
                            <a
                                href={circuit.details.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full bg-white px-8 py-5 text-black hover:bg-primary transition-colors group"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">ACCESS_OFFICIAL_PORTAL</span>
                                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}