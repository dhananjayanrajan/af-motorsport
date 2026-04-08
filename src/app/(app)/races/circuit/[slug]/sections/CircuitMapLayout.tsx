'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit, Media } from '@/payload-types'
import { Info, Map, Maximize2, Repeat, TrendingUp, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface CircuitMapLayoutProps {
    circuit: Circuit
}

export default function CircuitMapLayout({ circuit }: CircuitMapLayoutProps) {
    const circuitMap = circuit.assets?.circuit_map as Media | undefined

    const specs = [
        {
            label: 'TOTAL_LENGTH',
            value: circuit.details?.length_km ? `${circuit.details.length_km} KM` : 'TBD',
            subValue: circuit.details?.length_miles ? `${circuit.details.length_miles} MI` : '',
            icon: <Repeat size={14} />
        },
        {
            label: 'CORNER_COUNT',
            value: circuit.details?.turns?.toString().padStart(2, '0') || '00',
            subValue: 'TOTAL_TURNS',
            icon: <Info size={14} />
        },
        {
            label: 'DRS_SECTORS',
            value: circuit.details?.drs_zones?.toString().padStart(2, '0') || '00',
            subValue: 'ACTIVATION_ZONES',
            icon: <Zap size={14} />
        },
        {
            label: 'VERTICAL_BIAS',
            value: circuit.details?.elevation_change ? `${circuit.details.elevation_change}M` : '0M',
            subValue: 'ELEVATION_DELTA',
            icon: <TrendingUp size={14} />
        }
    ]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Map size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">SPATIAL_GEOMETRY_VECTOR</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Track<span className="text-zinc-900"> Layout</span>
                        </h2>
                    </div>

                    <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-10 w-px bg-zinc-900" />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
                    <div className="lg:col-span-8 bg-black relative min-h-[500px] flex items-center justify-center p-12 overflow-hidden group">
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, #27272a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <div className="size-2 bg-primary rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest text-white">LIVE_VECTOR_PREVIEW</span>
                        </div>

                        <button className="absolute top-6 right-6 size-10 border border-zinc-900 flex items-center justify-center hover:bg-zinc-950 transition-colors z-10">
                            <Maximize2 size={14} className="text-zinc-700" />
                        </button>

                        {circuitMap?.url ? (
                            <motion.img
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                src={circuitMap.url}
                                alt={`${circuit.name} Map`}
                                className="relative z-0 max-w-full max-h-[600px] object-contain filter invert brightness-200 contrast-125"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-zinc-800">
                                <Map size={48} strokeWidth={1} />
                                <span className="text-[9px] font-black uppercase tracking-widest">MAP_DATA_UNAVAILABLE</span>
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6 border-l-2 border-primary pl-4" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                            <span className="text-[8px] font-black text-zinc-600 uppercase block">DIRECTION_BIAS</span>
                            <span className="text-sm font-black text-white uppercase italic">{circuit.details?.direction || 'DATA_PENDING'}</span>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-zinc-950 grid grid-cols-1 divide-y divide-zinc-900">
                        {specs.map((spec, i) => (
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 flex flex-col justify-center space-y-4 hover:bg-black transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-zinc-800 group-hover:text-primary transition-colors">
                                        {spec.icon}
                                    </div>
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">{spec.label}</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-4xl font-black italic text-white tracking-tighter">
                                        {spec.value}
                                    </div>
                                    <div className="text-[9px] font-bold text-zinc-600 uppercase italic tracking-tight">
                                        {spec.subValue}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <div className="p-10 bg-black flex flex-col justify-end">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase">FIA_CERTIFICATION</span>
                                    <span className="text-xs font-black text-zinc-400 italic uppercase">GRADE_{circuit.details?.fia_grade || 'PENDING'}</span>
                                </div>
                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i}
                                            className="w-1.5 h-6 bg-zinc-900"
                                            style={{
                                                backgroundColor: i < (parseInt(circuit.details?.fia_grade || '0')) ? DESIGN_SYSTEM.COLORS.PRIMARY : ''
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="size-2 bg-zinc-800 rotate-45" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest italic">GEOSPATIAL_COORDINATES: {circuit.details?.location?.join(', ') || 'N/A'}</span>
                    </div>
                    <div className="flex gap-2 text-[7px] font-black text-zinc-800 uppercase tracking-tighter">
                        <span>SECURE_DATA_NODE</span>
                        <span>//</span>
                        <span>V_2.0.48</span>
                    </div>
                </div>
            </div>
        </section>
    )
}