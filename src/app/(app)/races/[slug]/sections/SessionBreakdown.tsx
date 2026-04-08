'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Entry, Result, Session } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AlertCircle, Gauge, ListFilter, Timer } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface SessionBreakdownProps {
    sessions: Session[]
    entries: Entry[]
    results: Result[]
}

export default function SessionBreakdown({ sessions, entries, results }: SessionBreakdownProps) {
    const [activeSessionId, setActiveSessionId] = useState<number | null>(sessions[0]?.id || null)

    const activeSession = useMemo(() =>
        sessions.find(s => s.id === activeSessionId),
        [sessions, activeSessionId]
    )

    const sessionData = useMemo(() => {
        if (!activeSessionId) return []

        const currentEntries = entries.filter(e =>
            typeof e.details.session === 'object'
                ? e.details.session.id === activeSessionId
                : e.details.session === activeSessionId
        )

        return currentEntries.map(entry => {
            const result = results.find(r =>
                r.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === entry.id : cat === entry.id)
            )

            return {
                entry,
                result,
                pos: entry.details.finish_position || result?.details?.overall || '-',
                grid: entry.details.grid_position || '-',
                status: entry.details.status || result?.details?.status || 'PROVISIONAL'
            }
        }).sort((a, b) => {
            const posA = typeof a.pos === 'number' ? a.pos : 999
            const posB = typeof b.pos === 'number' ? b.pos : 999
            return posA - posB
        })
    }, [activeSessionId, entries, results])

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ListFilter size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">SESSION_CLASSIFICATION_MATRIX</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Performance<span className="text-zinc-900"> Breakdown</span>
                        </h2>
                    </div>
                </div>

                <div className="flex flex-wrap bg-zinc-950 border border-zinc-900 p-1">
                    {sessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => setActiveSessionId(session.id)}
                            className={cn(
                                "px-8 py-4 flex items-center gap-3 transition-all duration-300 relative overflow-hidden",
                                activeSessionId === session.id ? "text-white" : "text-zinc-700 hover:text-zinc-400"
                            )}
                        >
                            {activeSessionId === session.id && (
                                <motion.div layoutId="activeTab" className="absolute inset-0 bg-zinc-900 -z-10" />
                            )}
                            <span className="text-[10px] font-black uppercase tracking-widest italic">{session.name}</span>
                        </button>
                    ))}
                </div>

                <div className="border border-zinc-900 bg-zinc-950/20 overflow-x-auto">
                    <table className="w-full border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-900">
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left w-20">P_POS</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-left">COMPETITOR_ENTITY</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-center w-24">GRID</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-right">INTERVAL_GAP</th>
                                <th className="p-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest text-right w-40">CLASSIFICATION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/50">
                            <AnimatePresence mode="wait">
                                {sessionData.map((row, idx) => (
                                    <motion.tr
                                        key={`${activeSessionId}-${row.entry.id}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ delay: idx * 0.02 }}
                                        className="group hover:bg-zinc-950 transition-colors"
                                    >
                                        <td className="p-6">
                                            <span className={cn(
                                                "text-2xl font-black italic tracking-tighter",
                                                idx < 3 ? "text-white" : "text-zinc-800"
                                            )}>
                                                {row.pos.toString().padStart(2, '0')}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-6">
                                                <div className="size-10 bg-black border border-zinc-900 flex items-center justify-center text-[10px] font-black text-zinc-600 italic">
                                                    {row.entry.basics?.identifiers?.number || '??'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-white uppercase italic tracking-wide group-hover:text-primary transition-colors" style={{ color: idx === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                        {row.entry.name}
                                                    </span>
                                                    <span className="text-[7px] font-mono text-zinc-800 uppercase mt-1 tracking-tighter">
                                                        UID_ARCH_{row.entry.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-[10px] font-black text-zinc-600 italic">
                                                {row.grid}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right font-mono">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black text-zinc-400">
                                                    {row.result?.details?.interval ? `+${row.result.details.interval}s` : idx === 0 ? 'INTERVAL_LEADER' : '--:--'}
                                                </span>
                                                {row.result?.details?.time && (
                                                    <span className="text-[8px] text-zinc-800 uppercase font-black tracking-tighter mt-1">L_TIME: {row.result.details.time}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-3 py-1 border text-[8px] font-black uppercase tracking-widest italic",
                                                row.status === 'Classified' || row.status === 'Official'
                                                    ? "border-zinc-800 text-zinc-500"
                                                    : "border-primary/50 text-primary"
                                            )} style={{ color: row.status !== 'Classified' ? DESIGN_SYSTEM.COLORS.PRIMARY : '', borderColor: row.status !== 'Classified' ? `${DESIGN_SYSTEM.COLORS.PRIMARY}80` : '' }}>
                                                {row.status}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-zinc-900/50">
                    <div className="flex items-center gap-4 group">
                        <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                            <Gauge size={14} className="text-zinc-700" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase">AVG_SESSION_SPEED</span>
                            <span className="text-[11px] font-black text-white italic">---_KM/H</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                            <Timer size={14} className="text-zinc-700" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase">TIME_STAMP_SYNC</span>
                            <span className="text-[11px] font-black text-white italic">LIVE_FEED_LOCKED</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="size-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                            <AlertCircle size={14} className="text-zinc-700" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-800 uppercase">REGULATORY_STATUS</span>
                            <span className="text-[11px] font-black text-white italic">VERIFIED_OFFICIAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}