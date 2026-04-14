'use client'

import { Championship, Media } from '@/payload-types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, ChevronRight, Cpu, Trophy } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface ChampionshipHeaderProps {
    championship: Championship
}

export default function ChampionshipHeader({ championship }: ChampionshipHeaderProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const coverImage = championship.assets?.cover as Media | null
    const series = championship.details?.series as any
    const winner = championship.details?.winner as any

    const startDate = championship.details?.start_date
    const endDate = championship.details?.end_date
    const dateRange = startDate && endDate
        ? `${new Date(startDate).getFullYear()} // ${new Date(endDate).getFullYear()}`
        : 'SEASON_ACTIVE'

    return (
        <div ref={containerRef} className="relative w-full min-h-screen flex flex-col bg-white overflow-hidden font-sans">
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y, scale: imageScale, opacity }} className="absolute inset-0">
                    {coverImage?.url ? (
                        <Image
                            src={coverImage.url}
                            alt={championship.name}
                            fill
                            className="object-cover grayscale contrast-[1.1] opacity-60"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-50" />
                    )}
                </motion.div>

                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white/20" />
            </div>

            <div className="relative z-20 w-full border-b border-zinc-100 px-8 py-4 flex justify-between items-center backdrop-blur-md bg-white/80">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-1 h-3 ${i === 0 ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
                        ))}
                    </div>
                    <span className="text-[9px] font-black tracking-[0.4em] text-zinc-900 uppercase">
                        System.Championship_Inquiry
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Activity className="size-3 text-zinc-400" />
                        <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Signal_Stable</span>
                    </div>
                    <div className="h-4 w-[1px] bg-zinc-100" />
                    <span className="text-[10px] font-black text-zinc-900 uppercase tracking-tighter">
                        {new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-16 py-20">
                <div className="max-w-[100rem] mx-auto w-full grid grid-cols-12 gap-12">

                    <div className="col-span-12 lg:col-span-9 space-y-16">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-3 px-3 py-1 bg-zinc-900 text-white"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
                            >
                                <Cpu className="size-3" />
                                <span className="text-[9px] font-black tracking-[0.3em] uppercase">
                                    {series?.name || 'Protocol_Unknown'}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[12vw] lg:text-[10vw] font-black italic uppercase tracking-tighter leading-[0.75] text-zinc-900"
                            >
                                {championship.name}
                            </motion.h1>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 border-t border-zinc-100 pt-10">
                            <div className="space-y-3">
                                <span className="block text-[8px] font-black text-zinc-300 uppercase tracking-[0.4em]">Season_Cycle</span>
                                <p className="text-xl font-black italic text-zinc-900 leading-none">{dateRange}</p>
                            </div>
                            <div className="space-y-3">
                                <span className="block text-[8px] font-black text-zinc-300 uppercase tracking-[0.4em]">Engine_Class</span>
                                <p className="text-xl font-black italic text-zinc-900 leading-none">{championship.details?.format || 'OPEN_SPEC'}</p>
                            </div>
                            <div className="space-y-3">
                                <span className="block text-[8px] font-black text-zinc-300 uppercase tracking-[0.4em]">Grid_Status</span>
                                <p className="text-xl font-black italic text-zinc-900 leading-none uppercase">
                                    {championship.details?.standings_scope?.replace('_', ' ') || 'ACTIVE'}
                                </p>
                            </div>
                            <div className="space-y-3">
                                <span className="block text-[8px] font-black text-zinc-300 uppercase tracking-[0.4em]">Identifier_Code</span>
                                <p className="text-xl font-black italic text-zinc-900 leading-none uppercase">
                                    {championship.basics?.identifiers?.code || '---'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-3 flex flex-col justify-end gap-12">
                        {winner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative p-8 bg-zinc-50 border border-zinc-100 group"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
                            >
                                <div className="absolute top-4 right-4 text-zinc-100 font-black italic text-6xl select-none group-hover:text-zinc-200 transition-colors">01</div>
                                <div className="relative z-10 space-y-6">
                                    <div className="p-2 border border-zinc-200 w-fit">
                                        <Trophy className="size-5 text-zinc-900" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Current_Leader</span>
                                        <h3 className="text-2xl font-black italic text-zinc-900 uppercase tracking-tighter leading-none">
                                            {winner.first_name}<br />{winner.last_name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-1.5 bg-zinc-900" />
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                                            {winner.basics?.nationality?.name || 'Unregistered'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex flex-col gap-3">
                            <button className="h-16 bg-zinc-900 text-white font-black italic text-[10px] uppercase tracking-[0.3em] flex items-center justify-between px-8 hover:bg-black transition-all group">
                                Enter_Data_Portal
                                <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="h-16 border border-zinc-200 text-zinc-900 font-black italic text-[10px] uppercase tracking-[0.3em] flex items-center justify-between px-8 hover:bg-zinc-50 transition-all group">
                                Download_Regs
                                <div className="size-2 border-2 border-zinc-900 group-hover:rotate-45 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full border-t border-zinc-100 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-zinc-900" />
                        <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Championship_Abstract</span>
                    </div>
                    <p className="max-w-md text-[11px] font-medium text-zinc-500 uppercase leading-relaxed tracking-tight">
                        {championship.basics?.description || 'No additional technical briefing available for this sector.'}
                    </p>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <span className="block text-[8px] font-black text-zinc-300 uppercase tracking-widest">Terminal_ID</span>
                        <span className="text-[10px] font-bold text-zinc-900 font-mono">
                            #{String(championship.id).slice(-12).toUpperCase()}
                        </span>
                    </div>
                    <div className="h-10 w-[1px] bg-zinc-100" />
                    <div className="flex gap-1">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="w-1 h-4 bg-zinc-100" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}