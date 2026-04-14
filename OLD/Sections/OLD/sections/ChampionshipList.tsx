'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { clsx, type ClassValue } from 'clsx'
import {
    Activity,
    ArrowUpRight,
    ChevronRight,
    ShieldCheck,
    Target
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface Media {
    url: string
}

interface Championship {
    id: number
    name: string
    slug?: string
    details?: {
        series?: { name: string }
        winner?: { name: string }
        start_date?: string
        format?: string
    }
    assets?: {
        thumbnail?: Media
        logo?: Media
    }
}

export function ChampionshipList({ championships }: { championships: Championship[] }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    const activeChampionship = useMemo(() =>
        championships.find((c) => c.id === hoveredId),
        [championships, hoveredId])

    return (
        <div className="relative min-h-screen w-full bg-[#080808] text-white font-sans overflow-hidden select-none">

            {/* SCANLINE & GRID OVERLAY */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* DYNAMIC BACKGROUND */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={hoveredId || 'default'}
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    animate={{ opacity: hoveredId ? 0.4 : 0.1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-0"
                >
                    <img
                        src={activeChampionship?.assets?.thumbnail?.url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80'}
                        alt=""
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 flex flex-col h-screen p-4 md:p-10">

                {/* HEADER HUD */}
                <header className="flex justify-between items-start mb-12">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="size-2 bg-primary animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">DATA_STREAM_ACTIVE</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none">
                            CIRCUITS<span className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>.</span>
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">REGISTRY_UNIT</span>
                            <span className="text-2xl font-[1000] italic">0{championships.length}</span>
                        </div>
                        <div className="size-12 border border-white/10 flex items-center justify-center rotate-45">
                            <Activity size={20} className="-rotate-45 text-white/40" />
                        </div>
                    </div>
                </header>

                {/* INTERACTIVE CONTENT AREA */}
                <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0 overflow-hidden">

                    {/* SELECTION COLUMN */}
                    <div className="w-full lg:w-[450px] flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                        {championships.map((championship, index) => (
                            <motion.div
                                key={championship.id}
                                onMouseEnter={() => setHoveredId(championship.id)}
                                className={cn(
                                    "group relative min-h-[100px] flex items-center transition-all duration-300 cursor-pointer overflow-hidden",
                                    hoveredId === championship.id ? "bg-white text-black translate-x-4" : "bg-white/5 text-white hover:bg-white/10"
                                )}
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 92% 100%, 0 100%)' }}
                            >
                                <div
                                    className={cn("absolute left-0 w-1.5 h-full transition-all duration-500", hoveredId === championship.id ? "bg-black" : "bg-white/10")}
                                />
                                <div className="px-8 flex flex-col w-full">
                                    <span className={cn("text-[9px] font-black uppercase tracking-[0.3em] mb-1 opacity-40", hoveredId === championship.id && "text-black")}>
                                        {championship.details?.series?.name || 'AFM_PRO_SERIES'}
                                    </span>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-2xl font-[1000] italic uppercase tracking-tighter leading-none truncate">
                                            {championship.name}
                                        </h3>
                                        <ChevronRight className={cn("transition-transform", hoveredId === championship.id ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0")} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* PREVIEW VIEWPORT */}
                    <div className="hidden lg:flex flex-1 flex-col gap-4 relative">
                        <AnimatePresence mode="wait">
                            {activeChampionship && (
                                <motion.div
                                    key={activeChampionship.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex-1 flex flex-col"
                                >
                                    <div className="relative flex-1 bg-white/[0.02] border border-white/10 overflow-hidden">
                                        <img
                                            src={activeChampionship.assets?.thumbnail?.url || 'https://images.unsplash.com/photo-1547915707-1497100ff5c2?auto=format&fit=crop&q=80'}
                                            className="w-full h-full object-cover grayscale opacity-60 mix-blend-overlay"
                                            alt=""
                                        />

                                        <div className="absolute top-10 left-10 space-y-8">
                                            <div className="flex items-center gap-4">
                                                <div className="size-16 border-2 border-white/20 flex items-center justify-center">
                                                    <Target size={32} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-white/40 tracking-[0.5em] uppercase">LOCK_STATUS</span>
                                                    <span className="text-2xl font-[1000] italic uppercase">READY_TO_DEPLOY</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-12 border-l border-white/10 pl-8">
                                                <HudStat label="RECORD_HOLDER" value={activeChampionship.details?.winner?.name || 'UNCLAIMED'} />
                                                <HudStat label="FORMAT" value={activeChampionship.details?.format || 'OFFICIAL'} />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 right-0 p-10">
                                            <Link href={`/championships/${activeChampionship.slug}`} className="group/btn relative">
                                                <div
                                                    className="size-32 bg-white flex flex-col items-center justify-center text-black transition-all group-hover/btn:bg-primary group-hover/btn:text-white"
                                                    style={{
                                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%, 0 75%)',
                                                        backgroundColor: hoveredId === activeChampionship.id ? DESIGN_SYSTEM.COLORS.PRIMARY : '#FFF'
                                                    }}
                                                >
                                                    <ArrowUpRight size={40} className="group-hover/btn:translate-x-1 transition-transform" />
                                                    <span className="text-[10px] font-black uppercase mt-2">DEPLOY</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="h-24 grid grid-cols-3 gap-px bg-white/10 border-x border-b border-white/10">
                                        <MetaBlock label="SERIES_IDENT" value={activeChampionship.details?.series?.name || 'AFM_UNIT'} />
                                        <MetaBlock label="START_DATE" value={activeChampionship.details?.start_date ? new Date(activeChampionship.details.start_date).getFullYear() : '2026'} />
                                        <div className="flex items-center justify-center px-8 bg-white text-black font-[1000] italic uppercase tracking-tighter hover:bg-primary transition-colors cursor-pointer"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                        >
                                            VIEW_GLOBAL_RANKINGS
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* FOOTER STATUS */}
                <footer className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                    <div className="flex gap-12 items-center">
                        <div className="flex gap-1.5 items-end h-4">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-[2px] bg-white/20"
                                    animate={{ height: [4, 16, 4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest hidden md:block">OS_KERNEL_v4.0.12 // MESH_NET_STABLE</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={14} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-black text-white/40 uppercase">AUTHENTICATED_ACCESS</span>
                        </div>
                        <div className="bg-white text-black px-6 py-1.5 text-[10px] font-[1000] italic skew-x-[-20deg]">
                            AFM_SYSTEMS
                        </div>
                    </div>
                </footer>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${DESIGN_SYSTEM.COLORS.PRIMARY}; }
      `}</style>
        </div>
    )
}

function HudStat({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">{label}</span>
            <span className="text-xl font-[1000] italic uppercase tracking-tight text-white">{value}</span>
        </div>
    )
}

function MetaBlock({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="flex flex-col justify-center px-8 bg-black/40">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">{label}</span>
            <span className="text-sm font-black italic uppercase text-white tracking-widest">{value}</span>
        </div>
    )
}