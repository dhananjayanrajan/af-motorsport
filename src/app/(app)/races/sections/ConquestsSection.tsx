'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit, Event, Result } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { BarChart2, Crosshair, Globe, Map as MapIcon, Trophy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface ConquestData {
    circuit: Circuit
    bestResult: number
    wins: number
    starts: number
    coordinates: [number, number]
}

interface ConquestsSectionProps {
    circuits: Circuit[]
    results: Result[]
    events: Event[]
}

export default function ConquestsSection({ circuits, results, events }: ConquestsSectionProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const conquests: ConquestData[] = useMemo(() => {
        return circuits.map((circuit) => {
            const circuitResults = results.filter((r) =>
                r.categories?.some((cat: any) => typeof cat === 'object' ? cat.id === circuit.id : cat === circuit.id)
            )

            const positions = circuitResults
                .map((r) => r.details?.overall)
                .filter((pos): pos is number => pos !== null && pos !== undefined && pos > 0)

            return {
                circuit,
                bestResult: positions.length > 0 ? Math.min(...positions) : 0,
                wins: positions.filter((pos) => pos === 1).length,
                starts: positions.length,
                coordinates: circuit.details?.location || [0, 0]
            }
        }).filter(c => c.starts > 0)
    }, [circuits, results])

    const activeConquest = conquests.find(c => c.circuit.id === selectedId) || conquests[0]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Globe size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">GEOSPATIAL_DOMINANCE_MAP</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Territorial<span className="text-zinc-900"> Conquests</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
                    <div className="lg:col-span-8 bg-zinc-950 relative min-h-[500px] overflow-hidden group">
                        <div className="absolute inset-0 opacity-20 grayscale transition-all duration-700 group-hover:opacity-30 group-hover:scale-105">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10" />
                            <div className="w-full h-full bg-[url('https://api.placeholder.com/1200/800')] bg-cover bg-center" />
                        </div>

                        <div className="absolute inset-0 z-20 p-8 pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block">MAP_OVERLAY_ACTIVE</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className="h-0.5 w-4 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />)}
                                    </div>
                                </div>
                                <MapIcon size={16} className="text-zinc-800" />
                            </div>
                        </div>

                        {conquests.map((conquest) => (
                            <button
                                key={conquest.circuit.id}
                                onClick={() => setSelectedId(conquest.circuit.id)}
                                className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-150"
                                style={{
                                    left: `${((conquest.coordinates[1] + 180) / 360) * 100}%`,
                                    top: `${((90 - conquest.coordinates[0]) / 180) * 100}%`
                                }}
                            >
                                <div className={cn(
                                    "size-3 rotate-45 border-2 transition-all duration-500",
                                    selectedId === conquest.circuit.id || (!selectedId && conquest === conquests[0])
                                        ? "bg-primary border-white scale-125"
                                        : "bg-black border-zinc-700 hover:border-primary"
                                )}
                                    style={{
                                        backgroundColor: (selectedId === conquest.circuit.id || (!selectedId && conquest === conquests[0])) ? DESIGN_SYSTEM.COLORS.PRIMARY : ''
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="lg:col-span-4 bg-black p-10 space-y-12">
                        <AnimatePresence mode="wait">
                            {activeConquest && (
                                <motion.div
                                    key={activeConquest.circuit.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <Crosshair size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest">TARGET_SECTOR</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                            {activeConquest.circuit.name}
                                        </h3>
                                        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest italic">
                                            {activeConquest.circuit.basics?.tagline || 'SECTOR_DATA_SYNCHRONIZED'}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                                        <div className="bg-zinc-950 p-6 space-y-1">
                                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest block">BEST_FINISH</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black italic text-white">P{activeConquest.bestResult}</span>
                                                {activeConquest.bestResult === 1 && <Trophy size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />}
                                            </div>
                                        </div>
                                        <div className="bg-zinc-950 p-6 space-y-1">
                                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest block">WIN_RATE</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black italic text-white">
                                                    {Math.round((activeConquest.wins / activeConquest.starts) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                                            <div className="flex items-center gap-3">
                                                <BarChart2 size={12} className="text-zinc-800" />
                                                <span className="text-[8px] font-black text-zinc-500 uppercase">TOTAL_ENGAGEMENTS</span>
                                            </div>
                                            <span className="text-xs font-black text-white italic">{activeConquest.starts.toString().padStart(2, '0')}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                                            <span className="text-[8px] font-black text-zinc-500 uppercase">SECTOR_ID</span>
                                            <span className="text-[10px] font-mono text-zinc-500 uppercase">{activeConquest.circuit.basics?.identifiers?.code || 'SEC_00' + activeConquest.circuit.id}</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-4 border border-zinc-800 bg-zinc-950 text-[9px] font-black text-white uppercase tracking-[0.3em] italic hover:bg-white hover:text-black transition-all">
                                        VIEW_SECTOR_INTELLIGENCE
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="size-2 bg-primary rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">MAP_STABILITY_100%</span>
                    </div>
                    <div className="h-px flex-1 mx-12 bg-zinc-900 hidden md:block" />
                    <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">SYSTEM_COORDINATE_SYNC_COMPLETE</span>
                </div>
            </div>
        </section>
    )
}