'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Car, Media, Result } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
    Calendar,
    ChevronRight,
    Cpu,
    Settings2,
    Trophy
} from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo } from 'react'

interface CarsDrivenProps {
    cars: Car[]
    results: Result[]
}

interface CarStats {
    id: number
    model: string
    spec: string
    yearsDriven: string
    wins: number
    image: string
    slug: string
}

export default function CarsDriven({ cars, results }: CarsDrivenProps) {
    const machineData: CarStats[] = useMemo(() => {
        return cars.map((car) => {
            const carResults = results.filter((r) =>
                r.categories?.some((cat: any) =>
                    typeof cat === 'object' ? cat.id === car.id : cat === car.id
                )
            )

            const years = Array.from(
                new Set(
                    carResults
                        .map((r) => new Date(r.createdAt).getFullYear())
                        .filter((y) => !isNaN(y))
                )
            ).sort()

            return {
                id: car.id,
                model: car.name.toUpperCase(),
                spec: car.basics?.description || 'CLASSIFIED_SPEC',
                yearsDriven: years.length > 0 ? `${years[0]} — ${years[years.length - 1]}` : 'N/A',
                wins: carResults.filter((r) => r.details?.overall === 1).length,
                image: typeof car.assets?.thumbnail === 'object' ? (car.assets.thumbnail as Media)?.url || '' : '',
                slug: car.slug || ''
            }
        })
    }, [cars, results])

    return (
        <section
            className="w-full py-24 px-10 md:px-16"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
        >
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Cpu size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">MECHANICAL_ASSET_LOG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            The<span className="text-zinc-900"> Machines</span>
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest italic">TOTAL_UNITS_OPERATED: 00{cars.length}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {machineData.map((car, idx) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col md:flex-row bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-500 overflow-hidden"
                        >
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                <img
                                    src={car.image}
                                    alt={car.model}
                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:bg-gradient-to-r" />
                                <div className="absolute top-6 left-6 flex items-center gap-2">
                                    <div className="size-1.5 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[6px] font-mono text-zinc-500 tracking-tighter">REF_MCH_{car.id}</span>
                                </div>
                            </div>

                            <div className="md:w-1/2 p-10 flex flex-col justify-between space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                                        {car.model}
                                    </h3>
                                    <p className="text-[9px] font-bold text-zinc-600 uppercase leading-relaxed italic tracking-wide">
                                        {car.spec}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-zinc-900/50 pb-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={10} className="text-zinc-800" />
                                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">TENURE</span>
                                        </div>
                                        <span className="text-[10px] font-black text-zinc-400 italic">{car.yearsDriven}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-zinc-900/50 pb-3">
                                        <div className="flex items-center gap-2">
                                            <Trophy size={10} className="text-zinc-800" />
                                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">WINS</span>
                                        </div>
                                        <span className={cn(
                                            "text-xl font-black italic",
                                            car.wins > 0 ? "text-white" : "text-zinc-800"
                                        )} style={{ color: car.wins > 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                            {car.wins}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                                        <Settings2 size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                        <span className="text-[8px] font-black uppercase tracking-[0.3em]">VIEW_TELEMETRY</span>
                                        <ChevronRight size={10} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}