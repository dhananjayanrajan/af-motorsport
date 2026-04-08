'use client'

import { cn } from '@/utilities/cn'
import {
    Activity,
    ArrowRight,
    Binary,
    FileText,
    Info,
    ShieldCheck,
    Terminal,
    Trophy,
    X
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'

const DUMMY_CHAMPIONSHIPS = [
    {
        id: 'wem-01',
        name: 'World Endurance Masters',
        alias: 'world-endurance-masters',
        code: 'SERIES_WEM_01',
        abbreviation: 'WEM',
        tagline: 'Precision Engineering at the Edge of Failure',
        description: 'The global benchmark for endurance racing. Testing hybrid-hydrogen powertrain efficiency and chassis structural integrity over 24-hour cycles.',
        regulations: 'FIA Grade 1 Technical Standards',
        format: 'Multi-Class / 24H Duration',
        points_system: 'Linear Scale A1',
        winner: 'Marcus Vance',
        team: 'AF Motorsport Core',
        thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800',
        cover: 'https://images.unsplash.com/photo-1547915707-14972f42f56d?q=80&w=2000',
    },
    {
        id: 'fi-02',
        name: 'Formula Intelligence',
        alias: 'formula-intelligence',
        code: 'SERIES_FINT_02',
        abbreviation: 'F-INTEL',
        tagline: 'Autonomous Logic at Supersonic Velocity',
        description: 'The world first sanctioned AI-only racing series. Focused on real-time neural telemetry and algorithmic aero-optimization.',
        regulations: 'Open Source Logic / Spec Chassis',
        format: 'Sprint / 45M Duration',
        points_system: 'Compute-Weighted Scale',
        winner: 'Unit_09_Neural',
        team: 'Intelligence Division',
        thumbnail: 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?q=80&w=800',
        cover: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?q=80&w=2000',
    },
    {
        id: 'gt-03',
        name: 'GT-Apex Continental',
        alias: 'gt-apex-continental',
        code: 'SERIES_GTAC_03',
        abbreviation: 'GT-APEX',
        tagline: 'Production Engineering Re-Imagined',
        description: 'Elite GT3 competition showcasing manufacturer evolution. High-intensity sprint formats across global continental circuits.',
        regulations: 'BOP Version 8.4',
        format: 'Sprint / 60M Duration',
        points_system: 'FIA Standard 25',
        winner: 'Elena Rossi',
        team: 'V-Corp Racing',
        thumbnail: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800',
        cover: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2000',
    }
]

export function ChampionshipOverviewSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const current = DUMMY_CHAMPIONSHIPS[activeIndex]

    return (
        <section className="relative w-full h-screen bg-white overflow-hidden flex flex-col">
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                    >
                        <img
                            src={current.cover}
                            className="w-full h-full object-cover grayscale transition-all duration-1000"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-col h-full px-8 md:px-20 py-16">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.6em]">
                            Competitive Framework
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black italic text-zinc-950 uppercase tracking-tighter leading-none">
                            Championship<br /><span className="text-zinc-300">Navigator</span>
                        </h1>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="group flex items-center gap-6 p-6 bg-white border border-zinc-200 hover:border-zinc-950 transition-all shadow-sm"
                    >
                        <div className="text-right">
                            <span className="text-[8px] font-black text-zinc-400 block uppercase tracking-widest">Access Intelligence</span>
                            <span className="text-xs font-black text-zinc-950 uppercase tracking-tight">Technical Specifications</span>
                        </div>
                        <div className="size-12 bg-zinc-950 flex items-center justify-center group-hover:bg-primary transition-colors" style={{ backgroundColor: undefined }}>
                            <Info size={20} className="text-white group-hover:text-black" />
                        </div>
                    </button>
                </div>

                <div className="mt-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8 space-y-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-zinc-950 text-8xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.8]">
                                        {current.abbreviation}
                                    </h2>
                                    <p className="text-zinc-500 text-2xl font-black italic uppercase tracking-tight">
                                        {current.tagline}
                                    </p>
                                </div>

                                <p className="text-zinc-600 text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-zinc-950 pl-8">
                                    {current.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-4 flex justify-end">
                        <div className="flex gap-4 p-4 bg-white/80 border border-zinc-200 backdrop-blur-md shadow-xl">
                            {DUMMY_CHAMPIONSHIPS.map((c, idx) => (
                                <button
                                    key={c.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={cn(
                                        "relative size-24 md:size-32 transition-all duration-700 overflow-hidden border",
                                        activeIndex === idx ? "border-zinc-950 w-40 md:w-64" : "border-zinc-100 grayscale opacity-40 hover:opacity-100"
                                    )}
                                >
                                    <img src={c.thumbnail} className="w-full h-full object-cover" alt="" />
                                    <div className="absolute inset-0 bg-white/20" />
                                    <span className="absolute bottom-4 left-4 text-[10px] font-black text-white uppercase tracking-tighter bg-zinc-950 px-2 py-1">
                                        {c.abbreviation}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="absolute inset-0 bg-white/80 backdrop-blur-md z-[100] cursor-crosshair"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 w-full md:w-[600px] h-full bg-white border-l border-zinc-200 z-[101] p-12 overflow-y-auto no-scrollbar shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-20">
                                <div className="flex items-center gap-4">
                                    <Terminal size={16} className="text-zinc-400" />
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">SPEC_DATA_v2</span>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="size-14 bg-zinc-950 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-16">
                                <div>
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] block mb-4">
                                        {current.code}
                                    </span>
                                    <h3 className="text-5xl font-black italic text-zinc-950 uppercase tracking-tighter leading-none mb-6">
                                        {current.name}
                                    </h3>
                                    <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                                        {current.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-px bg-zinc-100 border border-zinc-100">
                                    <SpecRow label="Points System" value={current.points_system} icon={<Binary size={18} />} />
                                    <SpecRow label="Race Format" value={current.format} icon={<Activity size={18} />} />
                                    <SpecRow label="Technical Regs" value={current.regulations} icon={<ShieldCheck size={18} />} />
                                </div>

                                <div className="p-10 bg-zinc-50 border border-zinc-100 relative overflow-hidden group">
                                    <div className="relative z-10 space-y-8">
                                        <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
                                            <Trophy size={16} className="text-zinc-400" />
                                            <span className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">Defending Champion</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-5xl font-black italic text-zinc-950 uppercase tracking-tighter block">{current.winner}</span>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{current.team}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button className="flex items-center justify-between px-8 py-6 bg-zinc-950 text-white hover:bg-primary hover:text-black transition-all text-xs font-black uppercase tracking-widest">
                                        Regulations <FileText size={16} />
                                    </button>
                                    <button className="flex items-center justify-between px-8 py-6 border border-zinc-200 text-zinc-950 hover:bg-zinc-50 transition-all text-xs font-black uppercase tracking-widest">
                                        Standings <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    )
}

function SpecRow({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between p-8 bg-white">
            <div className="flex items-center gap-4">
                <div className="text-zinc-200">{icon}</div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-sm font-black italic text-zinc-950 uppercase tracking-tight">{value}</span>
        </div>
    )
}