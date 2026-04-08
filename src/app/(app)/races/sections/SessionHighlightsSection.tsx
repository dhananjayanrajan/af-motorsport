'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Entry, Media, Result, Session } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Activity, ArrowRight, Layers, Play, Timer, Video, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface SessionHighlightsSectionProps {
    sessions: Session[]
    entries: Entry[]
    results: Result[]
}

export default function SessionHighlightsSection({ sessions, entries, results }: SessionHighlightsSectionProps) {
    const [activeCategory, setActiveCategory] = useState<string>('ALL_SESSIONS')

    const categories = useMemo(() => {
        const types = sessions.map(s => s.basics?.segment).filter(Boolean) as string[]
        return ['ALL_SESSIONS', ...Array.from(new Set(types))]
    }, [sessions])

    const filteredSessions = useMemo(() => {
        if (activeCategory === 'ALL_SESSIONS') return sessions
        return sessions.filter(s => s.basics?.segment === activeCategory)
    }, [sessions, activeCategory])

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Video size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">TELEMETRY_VISUAL_FEED</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Session<span className="text-zinc-900"> Highlights</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2 border text-[8px] font-black uppercase tracking-widest transition-all",
                                    activeCategory === cat
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-zinc-600 border-zinc-900 hover:border-zinc-700"
                                )}
                            >
                                {cat.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    <AnimatePresence mode="popLayout">
                        {filteredSessions.map((session, idx) => {
                            const thumbnail = session.assets?.thumbnail as Media
                            const sessionEntries = entries.filter(e =>
                                typeof e.details.session === 'object'
                                    ? e.details.session.id === session.id
                                    : e.details.session === session.id
                            )

                            return (
                                <motion.div
                                    key={session.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group bg-black flex flex-col h-full"
                                >
                                    <div className="relative aspect-video overflow-hidden bg-zinc-950">
                                        {thumbnail?.url ? (
                                            <img
                                                src={thumbnail.url}
                                                alt={session.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-60 group-hover:opacity-100"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Zap size={24} className="text-zinc-900" />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/80 border border-zinc-800 backdrop-blur-md">
                                            <div className="size-1.5 rounded-full bg-primary animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest">
                                                {session.basics?.segment || 'RACE_DATA'}
                                            </span>
                                        </div>

                                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="size-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY}E6` }}>
                                                <Play size={20} className="text-black fill-black ml-1" />
                                            </div>
                                        </button>
                                    </div>

                                    <div className="p-8 space-y-6 flex-1 flex flex-col">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors" style={{ color: '' }}>
                                                {session.name}
                                            </h3>
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase italic line-clamp-2 leading-relaxed">
                                                {session.basics?.description || 'CRITICAL_MOMENT_CAPTURE_DATA_LOG_SYNCHRONIZED_FOR_REVIEW.'}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
                                            <div className="flex items-center gap-3">
                                                <Timer size={12} className="text-zinc-800" />
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] font-black text-zinc-800 uppercase">DURATION</span>
                                                    <span className="text-[10px] font-black text-zinc-400">{session.metrics?.quantifiers?.duration || '00'}:00</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Layers size={12} className="text-zinc-800" />
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] font-black text-zinc-800 uppercase">ENTRIES</span>
                                                    <span className="text-[10px] font-black text-zinc-400">{sessionEntries.length.toString().padStart(2, '0')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Activity size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">ENCRYPTED_FEED_00{session.id}</span>
                                            </div>
                                            <ArrowRight size={14} className="text-zinc-800 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-zinc-900">
                    <div className="flex gap-4">
                        {[1, 2, 3].map(i => <div key={i} className="size-1 bg-zinc-900" />)}
                    </div>
                    <button className="flex items-center gap-3 group">
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em] group-hover:text-white transition-colors">LOAD_ARCHIVED_HIGHLIGHTS</span>
                        <div className="h-px w-8 bg-zinc-900 group-hover:w-12 group-hover:bg-primary transition-all" style={{ backgroundColor: '' }} />
                    </button>
                </div>
            </div>
        </section>
    )
}