'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import {
    ArrowRight,
    BarChart3,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Flag,
    Maximize2,
    Play,
    Users,
    X
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useCallback, useEffect, useState } from 'react'

const DUMMY_SEASONS = [
    {
        id: 's-2026',
        name: 'Season 2026',
        alias: 'kinetic-era',
        series: 'World Endurance Masters',
        races: 14,
        entries: 42,
        cover: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2000',
        tagline: 'The Kinetic Era',
        description: 'Introduction of hybrid-hydrogen powerplants across the WEM series, focusing on high-stress reliability testing and energy recovery optimization.',
        year: '2026'
    },
    {
        id: 's-2025',
        name: 'Season 2025',
        alias: 'neural-apex',
        series: 'Formula Intelligence',
        races: 12,
        entries: 38,
        cover: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=2000',
        tagline: 'Neural Apex',
        description: 'Deployment of Level 5 autonomous racing logic and real-time telemetry optimization competing at supersonic aero-velocities.',
        year: '2025'
    },
    {
        id: 's-2024',
        name: 'Season 2024',
        alias: 'legacy-revival',
        series: 'GT-Apex Continental',
        races: 10,
        entries: 32,
        cover: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2000',
        tagline: 'Legacy Revival',
        description: 'A historic season focused on mechanical purity, aerodynamic re-evaluations, and traditional combustion excellence.',
        year: '2024'
    }
]

export function SeasonArchiveSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isDataOpen, setIsDataOpen] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const current = DUMMY_SEASONS[activeIndex]

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % DUMMY_SEASONS.length)
    }, [])

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + DUMMY_SEASONS.length) % DUMMY_SEASONS.length)
    }, [])

    useEffect(() => {
        if (isPaused || isDataOpen) return
        const interval = setInterval(nextSlide, 6000)
        return () => clearInterval(interval)
    }, [nextSlide, isPaused, isDataOpen])

    return (
        <section
            className="relative w-full h-screen bg-white overflow-hidden flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                    >
                        <img src={current.cover} className="w-full h-full object-cover" alt={current.name} />
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-col h-full px-8 md:px-20 py-16">
                <div className="flex justify-between items-center mb-24">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                            Season Archive Index
                        </span>
                        <h2 className="text-zinc-950 text-5xl font-black uppercase tracking-tighter italic">
                            Competitive History
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end mr-4">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Navigation</span>
                            <div className="text-zinc-950 font-black italic text-xl">
                                0{activeIndex + 1} <span className="text-zinc-300">/ 0{DUMMY_SEASONS.length}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="size-14 border border-zinc-200 bg-white/80 flex items-center justify-center text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="size-14 border border-zinc-200 bg-white/80 flex items-center justify-center text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8 space-y-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <span className="inline-block px-3 py-1 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest mb-2">
                                        {current.series}
                                    </span>
                                    <h3 className="text-zinc-950 text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8]">
                                        {current.year}
                                    </h3>
                                    <p className="text-zinc-500 text-3xl font-black italic uppercase tracking-tight">
                                        {current.tagline}
                                    </p>
                                </div>

                                <p className="text-zinc-600 text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-zinc-950 pl-8">
                                    {current.description}
                                </p>

                                <div className="flex flex-wrap gap-4 pt-6">
                                    <button
                                        onClick={() => setIsDataOpen(true)}
                                        className="px-10 py-5 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all flex items-center gap-3"
                                        style={{ backgroundColor: undefined }}
                                    >
                                        <BarChart3 size={16} /> Data Analytics
                                    </button>
                                    <button className="px-10 py-5 bg-white border border-zinc-200 text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-50 transition-all flex items-center gap-3">
                                        <Play size={16} /> Race Highlights
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-4 flex flex-col items-end gap-12">
                        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                            <QuickStat label="Races" value={current.races} />
                            <QuickStat label="Drivers" value={current.entries} />
                        </div>

                        <div className="w-full h-[2px] bg-zinc-200 relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: (activeIndex + 1) / DUMMY_SEASONS.length }}
                                transition={{ duration: 0.5 }}
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isDataOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="absolute inset-0 z-50 bg-white flex flex-col"
                    >
                        <div className="flex justify-between items-center px-8 md:px-20 py-12 border-b border-zinc-100">
                            <div className="flex items-center gap-8">
                                <div className="size-16 bg-zinc-950 flex items-center justify-center text-white">
                                    <BarChart3 size={24} />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Technical Briefing</span>
                                    <h4 className="text-zinc-950 text-3xl font-black uppercase italic tracking-tighter">{current.year} Performance Metrics</h4>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDataOpen(false)}
                                className="size-16 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-8 md:px-20 py-20">
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <DataTile icon={<Flag />} label="Circuits Visited" value={current.races} />
                                <DataTile icon={<Users />} label="Registered Units" value={current.entries} />
                                <DataTile icon={<Calendar />} label="Season Duration" value="9 Months" />

                                <div className="lg:col-span-3 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-zinc-100 pt-12">
                                    <div className="space-y-6">
                                        <h5 className="text-zinc-950 text-2xl font-black uppercase italic tracking-tight">Strategic Overview</h5>
                                        <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                                            The {current.year} competitive cycle served as the primary benchmark for {current.series}.
                                            Technical audits across {current.races} unique geographic locations provided
                                            unprecedented datasets regarding chassis stress under variable atmospheric conditions.
                                        </p>
                                    </div>

                                    <div className="bg-zinc-50 p-10 border border-zinc-100 flex flex-col justify-between group cursor-pointer hover:border-zinc-950 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-4">
                                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Documentation</span>
                                                <p className="text-zinc-950 text-xl font-bold uppercase italic">Detailed Technical Report_v2.pdf</p>
                                            </div>
                                            <Maximize2 size={20} className="text-zinc-300 group-hover:text-zinc-950 transition-colors" />
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-950 transition-colors mt-8">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Access Vault</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

function QuickStat({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="bg-white/80 p-6 border border-zinc-200">
            <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1 tracking-widest">{label}</span>
            <span className="text-3xl font-black italic text-zinc-950 leading-none">{value}</span>
        </div>
    )
}

function DataTile({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <div className="bg-zinc-50 p-12 border border-zinc-100 flex flex-col gap-8">
            <div className="text-zinc-300">{icon}</div>
            <div>
                <span className="text-zinc-400 text-[10px] font-black uppercase block mb-2 tracking-widest">{label}</span>
                <span className="text-5xl font-black italic text-zinc-950 uppercase tracking-tighter">{value}</span>
            </div>
        </div>
    )
}