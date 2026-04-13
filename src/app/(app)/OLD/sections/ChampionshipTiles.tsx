'use client'

import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Championship {
    id: number
    name: string
    slug?: string | null
    basics?: {
        identifiers?: { code?: string | null }
        tagline?: string | null
    }
    details?: {
        format?: string | null
    }
    assets?: {
        thumbnail?: { url: string } | null
    }
}

export function ChampionshipTiles({ championships }: { championships: Championship[] }) {
    const [active, setActive] = useState(0)
    const [direction, setDirection] = useState(1) // 1 for next, -1 for prev

    if (!championships?.length) return null

    const current = championships[active]
    const nextSlide = (idx: number) => {
        setDirection(idx > active ? 1 : -1)
        setActive(idx)
    }

    const media = current.assets?.thumbnail?.url || `https://picsum.photos/seed/${current.id}/1600/900`

    return (
        <section className="relative w-full h-screen min-h-[700px] bg-white overflow-hidden flex flex-col lg:flex-row">

            {/* KINETIC NAV RAIL */}
            <nav className="relative z-50 w-full lg:w-[100px] h-20 lg:h-full bg-black border-r border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-y-auto no-scrollbar">
                {championships.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => nextSlide(i)}
                        className="flex-1 lg:flex-none h-full lg:h-24 relative flex items-center justify-center transition-all group"
                    >
                        <div className={cn(
                            "absolute inset-0 transition-transform duration-300",
                            active === i ? "bg-[#00FF41] scale-100" : "bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left"
                        )} />
                        <span className={cn(
                            "relative z-10 text-[10px] font-black transition-colors duration-200",
                            active === i ? "text-black" : "text-white/40 group-hover:text-white"
                        )}>
                            {(i + 1).toString().padStart(2, '0')}
                        </span>
                    </button>
                ))}
            </nav>

            {/* STAGE AREA */}
            <div className="flex-1 relative">
                <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                        key={current.id}
                        custom={direction}
                        initial={{ clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0 0 0)' }}
                        exit={{ clipPath: direction > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-0 grid lg:grid-cols-12"
                    >
                        {/* MEDIA COMPONENT */}
                        <div className="lg:col-span-7 relative overflow-hidden bg-zinc-900">
                            <motion.img
                                initial={{ x: direction * 100 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                src={media}
                                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] brightness-90"
                                alt={current.name}
                            />

                            {/* ACCENT SHEAR */}
                            <div className="absolute top-0 right-0 w-32 h-full bg-[#00FF41] -skew-x-[15deg] translate-x-1/2 opacity-90 hidden lg:block" />

                            <div className="absolute bottom-12 left-12">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-[2px] w-12 bg-[#00FF41]" />
                                    <span className="text-[10px] font-black text-[#00FF41] uppercase tracking-[0.4em]">Active Circuit</span>
                                </div>
                                <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
                                    {current.name}
                                </h2>
                            </div>
                        </div>

                        {/* TELEMETRY BOX */}
                        <div className="lg:col-span-5 bg-white p-8 lg:p-20 flex flex-col justify-between">

                            <div className="space-y-12">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">Designation</span>
                                        <p className="text-3xl font-black italic uppercase tracking-tighter">{current.basics?.identifiers?.code}</p>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">Classification</span>
                                        <p className="text-3xl font-black italic uppercase tracking-tighter text-[#00FF41]">{current.details?.format}</p>
                                    </div>
                                </div>

                                <div className="p-10 border-[6px] border-black bg-white relative">
                                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#00FF41]" />
                                    <p className="text-xl font-black italic uppercase leading-[0.9] tracking-tight text-black">
                                        {current.basics?.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* VELOCITY BUTTON */}
                            <div className="mt-auto">
                                <Link
                                    href={`/championships/${current.slug}`}
                                    className="group relative flex items-center justify-between w-full h-24 bg-black px-10 transition-all active:scale-[0.98]"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Initialize</span>
                                        <span className="text-white text-lg font-black italic uppercase tracking-widest">Navigate to Circuit</span>
                                    </div>
                                    <div className="relative">
                                        <ArrowUpRight size={32} className="text-[#00FF41] transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
                                        <div className="absolute inset-0 bg-[#00FF41] blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                                    </div>

                                    {/* PROGRESS BAR STRIP */}
                                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#00FF41]"
                                            initial={{ x: '-100%' }}
                                            whileInView={{ x: '0%' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* HUD DECORATIONS */}
            <div className="absolute bottom-6 right-6 z-50 pointer-events-none hidden lg:flex flex-col items-end gap-1">
                <div className="flex gap-1">
                    {championships.map((_, i) => (
                        <div key={i} className={cn("w-1 h-4", i === active ? "bg-[#00FF41]" : "bg-black/20")} />
                    ))}
                </div>
                <span className="text-[9px] font-black italic tracking-widest uppercase text-black/40">Manual Override Active</span>
            </div>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </section>
    )
}