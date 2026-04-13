'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Championship, Driver, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface ChampionshipsSectionProps {
    championships: Championship[]
}

export default function ChampionshipsSection({ championships }: ChampionshipsSectionProps) {
    const [activeId, setActiveId] = useState<number | null>(championships[0]?.id || null)

    return (
        <section className="relative w-full h-screen min-h-[600px] bg-zinc-950 overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 h-1/3 lg:h-full border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col relative z-20 bg-zinc-950">
                <div className="p-6 lg:p-10 border-b border-white/10">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">
                        {championships[0]?.basics?.identifiers?.abbreviation}
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {championships.map((champ, index) => (
                        <div
                            key={champ.id}
                            onMouseEnter={() => setActiveId(champ.id)}
                            onClick={() => setActiveId(champ.id)}
                            className={cn(
                                "group relative px-6 lg:px-10 py-8 lg:py-12 cursor-pointer transition-all duration-500 border-b border-white/5",
                                activeId === champ.id ? "bg-white" : "hover:bg-zinc-900"
                            )}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest transition-colors truncate",
                                        activeId === champ.id ? "text-zinc-400" : "text-zinc-600"
                                    )}>
                                        {champ.basics?.identifiers?.code}
                                    </span>
                                    <h3 className={cn(
                                        "text-base lg:text-lg font-black uppercase italic tracking-tighter transition-colors truncate",
                                        activeId === champ.id ? "text-black" : "text-white"
                                    )}>
                                        {champ.name}
                                    </h3>
                                </div>
                                <span className={cn(
                                    "text-xs font-black italic shrink-0",
                                    activeId === champ.id ? "text-zinc-200" : "text-zinc-800"
                                )}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 h-2/3 lg:h-full relative bg-zinc-900">
                <AnimatePresence mode="wait">
                    {championships.map((champ) => {
                        if (activeId !== champ.id) return null

                        const winner = champ.details?.winner as Driver | undefined
                        const portrait = winner?.assets?.avatar as Media | undefined
                        const placeholder = `https://picsum.photos/seed/${champ.id}/1200/800`

                        return (
                            <motion.div
                                key={champ.id}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="absolute inset-0 z-10">
                                    <img
                                        src={portrait?.url || placeholder}
                                        alt=""
                                        className="w-full h-full object-cover brightness-75 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent hidden lg:block" />
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-20 z-20 flex flex-col items-start">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="flex flex-col gap-4 lg:gap-6 w-full"
                                    >
                                        <div className="flex items-end gap-6 lg:gap-10">
                                            <div className="h-16 lg:h-24 w-1 flex-shrink-0" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.6em] mb-2 truncate">
                                                    {winner?.basics?.callsign}
                                                </span>
                                                <h4 className="text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                                                    <span className="block truncate">{winner?.first_name}</span>
                                                    <span className="block truncate" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                                        {winner?.last_name}
                                                    </span>
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-6 lg:gap-12 mt-4 lg:mt-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                                    {winner?.basics?.competition_name}
                                                </span>
                                                <span className="text-lg lg:text-xl font-black text-white italic">
                                                    {winner?.basics?.racing_number}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                                    {champ.basics?.identifiers?.code}
                                                </span>
                                                <span className="text-lg lg:text-xl font-black text-white italic">
                                                    {champ.details?.start_date ? new Date(champ.details.start_date).getFullYear() : ''}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                                    {champ.details?.format}
                                                </span>
                                                <span className="text-lg lg:text-xl font-black text-white italic uppercase truncate">
                                                    {champ.details?.standings_scope}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="max-w-xl text-xs lg:text-sm font-bold text-zinc-400 uppercase italic leading-relaxed mt-4 line-clamp-2">
                                            {champ.basics?.tagline}
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="absolute top-6 lg:top-10 right-6 lg:right-10 z-20 pointer-events-none">
                                    <span className="text-6xl lg:text-[120px] font-black text-white/10 italic leading-none select-none">
                                        {winner?.basics?.racing_number}
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </section>
    )
}