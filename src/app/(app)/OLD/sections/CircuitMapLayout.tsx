'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit, Media } from '@/payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe, Info, Map as MapIcon, Maximize2, Navigation2, Repeat, TrendingUp, Zap } from 'lucide-react'
import { useState } from 'react'

interface CircuitSectionProps {
    circuits: Circuit[]
}

export default function CircuitSection({ circuits }: CircuitSectionProps) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-white border-b border-zinc-100 relative overflow-hidden">
            {/* SCHEMATIC BACKGROUND GRID */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black pb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Globe size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.6em]">GEOSPATIAL_REGISTRY_V2</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-black uppercase tracking-tighter">
                            Circuit<span className="text-zinc-200"> Board</span>
                        </h2>
                    </div>
                    <div className="hidden md:flex gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-8 w-px bg-zinc-100" />
                        ))}
                    </div>
                </div>

                <div className="relative aspect-[21/9] w-full border border-zinc-100 bg-zinc-50/50 overflow-hidden">
                    {/* SIMULATED WORLD MAP BASE */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] grayscale pointer-events-none">
                        <Globe size={600} strokeWidth={0.5} />
                    </div>

                    {/* INTERACTIVE NODES */}
                    {circuits.map((circuit, i) => {
                        const [lat, lng] = circuit.details?.location || [0, 0]
                        // Simple projection: Map lat/lng to percentage (adjusted for visual balance)
                        const left = ((lng + 180) / 360) * 100
                        const top = ((90 - lat) / 180) * 100

                        return (
                            <div
                                key={circuit.id}
                                className="absolute z-20"
                                style={{ left: `${left}%`, top: `${top}%` }}
                                onMouseEnter={() => setHoveredId(circuit.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className="relative flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: hoveredId === circuit.id ? 1.5 : 1 }}
                                        className="size-4 border border-black rotate-45 flex items-center justify-center bg-white cursor-crosshair transition-colors"
                                        style={{ borderColor: hoveredId === circuit.id ? DESIGN_SYSTEM.COLORS.PRIMARY : 'black' }}
                                    >
                                        <div className="size-1 bg-black" style={{ backgroundColor: hoveredId === circuit.id ? DESIGN_SYSTEM.COLORS.PRIMARY : 'black' }} />
                                    </motion.div>

                                    {/* POPUP CARD POSITIONED RELATIVE TO PIN */}
                                    <AnimatePresence>
                                        {hoveredId === circuit.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[380px] z-50 pointer-events-none"
                                            >
                                                <CircuitCard circuit={circuit} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-between items-center text-[8px] font-black text-zinc-300 uppercase tracking-widest pt-4">
                    <span>Active_Nodes: {circuits.length.toString().padStart(2, '0')}</span>
                    <span className="flex items-center gap-2">
                        <Navigation2 size={10} className="fill-current" />
                        Vector_Coordinate_System_Locked
                    </span>
                </div>
            </div>
        </section>
    )
}

function CircuitCard({ circuit }: { circuit: Circuit }) {
    const circuitMap = circuit.assets?.circuit_map as Media | undefined

    const specs = [
        { label: 'LENGTH', value: circuit.details?.length_km ? `${circuit.details.length_km}K` : '--', icon: <Repeat size={12} /> },
        { label: 'TURNS', value: circuit.details?.turns?.toString().padStart(2, '0') || '00', icon: <Info size={12} /> },
        { label: 'GRADE', value: `G${circuit.details?.fia_grade || 'U'}`, icon: <TrendingUp size={12} /> },
        { label: 'BIAS', value: circuit.details?.direction === 'clockwise' ? 'CW' : 'ACW', icon: <Zap size={12} /> }
    ]

    return (
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
                <span className="text-[9px] font-black text-black uppercase tracking-tighter italic">
                    {circuit.name}
                </span>
                <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                    {circuit.basics?.identifiers?.code || 'CRT_REF'}
                </span>
            </div>

            <div className="grid grid-cols-2 h-40">
                <div className="bg-white p-4 flex items-center justify-center border-r border-zinc-100 overflow-hidden relative">
                    <div className="absolute top-2 left-2 text-[6px] font-black text-zinc-200">VECTOR_MAP</div>
                    {circuitMap?.url ? (
                        <img
                            src={circuitMap.url}
                            className="max-h-full max-w-full object-contain filter grayscale contrast-125"
                            alt="Map"
                        />
                    ) : (
                        <MapIcon size={32} className="text-zinc-100" />
                    )}
                </div>

                <div className="grid grid-cols-1 divide-y divide-zinc-100 bg-white">
                    {specs.map((spec) => (
                        <div key={spec.label} className="px-4 flex items-center justify-between group">
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-300">{spec.icon}</span>
                                <span className="text-[7px] font-black text-zinc-400 uppercase">{spec.label}</span>
                            </div>
                            <span className="text-xs font-black italic text-black">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-3 bg-black flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[6px] font-black text-zinc-500 uppercase">Status</span>
                    <span className="text-[8px] font-black text-white uppercase italic">Ready_for_Execution</span>
                </div>
                <div className="size-6 border border-zinc-800 flex items-center justify-center">
                    <Maximize2 size={10} className="text-white" />
                </div>
            </div>
        </div>
    )
}