'use client'

import { motion } from 'framer-motion'
import { Calendar, ShieldCheck, Trophy } from 'lucide-react'
import Image from 'next/image'
import type { Media } from 'src/payload-types'

/**
 * Championships Collection Interface (Simplified for this Hero)
 */
interface Championship {
    id: number
    name: string
    basics?: {
        start_date?: string | null
        end_date?: string | null
        tagline?: string | null
    }
    assets?: {
        trophy?: (number | null) | Media
        cover?: (number | null) | Media
    }
}

export function ChampionshipHero({ championship }: { championship: Championship }) {
    const trophy = championship.assets?.trophy as Media
    const startYear = championship.basics?.start_date ? new Date(championship.basics.start_date).getFullYear() : '----'
    const endYear = championship.basics?.end_date ? new Date(championship.basics.end_date).getFullYear() : 'ACTIVE'

    return (
        <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-black overflow-hidden py-24 px-6">
            {/* BACKGROUND SCANLINES */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 40px' }} />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
                {/* TOP METADATA */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-6 mb-8"
                >
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#00FF41]" />
                        <span className="text-xs font-[950] text-white uppercase italic tracking-[0.3em]">
                            {startYear} // {endYear}
                        </span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/20" />
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-[#00FF41]" />
                        <span className="text-xs font-[950] text-white uppercase italic tracking-[0.3em]">
                            Sanctioned_Event
                        </span>
                    </div>
                </motion.div>

                {/* MAIN TITLE BLOCK */}
                <div className="relative mb-12">
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-[160px] font-[950] text-white uppercase italic tracking-tighter leading-[0.8] mix-blend-difference"
                    >
                        {championship.name.split(' ').map((word, i) => (
                            <span key={i} className="block last:text-[#00FF41]">
                                {word}
                            </span>
                        ))}
                    </motion.h1>

                    {/* TROPHY CENTERPIECE */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[450px] md:w-[500px] md:h-[650px] pointer-events-none z-20"
                    >
                        {trophy?.url ? (
                            <Image
                                src={trophy.url}
                                alt="Championship Trophy"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_0_50px_rgba(0,255,65,0.3)]"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Trophy size={200} className="text-white/5" />
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* FOOTER CALLOUT */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 flex flex-col items-center gap-4"
                >
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-12 h-1 bg-[#00FF41]" />
                        ))}
                    </div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[1em] translate-x-[0.5em]">
                        Elite_Tier_Competition
                    </p>
                </motion.div>
            </div>

            {/* BACKGROUND WATERMARK */}
            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 whitespace-nowrap select-none pointer-events-none">
                <span className="text-[250px] font-[950] italic text-white/[0.02] uppercase tracking-tighter">
                    Championship
                </span>
            </div>
        </section>
    )
}