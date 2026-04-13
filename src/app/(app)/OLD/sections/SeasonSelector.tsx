'use client'

import { Season, Series } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface SeasonSelectorProps {
    series: Series
    seasons: Season[]
    initialSeasonId: number
}

export const SeasonSelector = ({ series, seasons, initialSeasonId }: SeasonSelectorProps) => {
    const [activeId, setActiveId] = useState<number>(initialSeasonId)
    const [isPaused, setIsPaused] = useState(false)

    const activeSeason = useMemo(() =>
        seasons.find(s => s.id === activeId) || seasons[0],
        [activeId, seasons])

    const handleNext = useCallback(() => {
        if (!seasons.length) return
        const currentIndex = seasons.findIndex(s => s.id === activeId)
        const nextIndex = (currentIndex + 1) % seasons.length
        setActiveId(seasons[nextIndex].id)
    }, [activeId, seasons])

    useEffect(() => {
        if (isPaused || seasons.length <= 1) return
        const timer = setInterval(handleNext, 5000)
        return () => clearInterval(timer)
    }, [handleNext, isPaused, seasons.length])

    if (!seasons.length) return null

    return (
        <section
            className="w-full bg-slate-50 text-slate-900 font-sans p-6 md:p-12 lg:p-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">

                <div className="flex-1 space-y-12">
                    <header className="space-y-2">
                        <motion.span
                            key={`code-${activeId}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400"
                        >
                            {series.basics?.identifiers?.code}
                        </motion.span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                            {series.name}
                        </h1>
                    </header>

                    <div className="space-y-20">
                        {seasons.map((season) => {
                            const isActive = activeId === season.id
                            return (
                                <button
                                    key={season.id}
                                    onClick={() => setActiveId(season.id)}
                                    className="block text-left group w-full outline-none"
                                >
                                    <div className="flex items-start gap-8">
                                        <div className="relative pt-2">
                                            <div className={cn(
                                                "w-1 transition-all duration-300",
                                                isActive ? "h-16 bg-blue-600" : "h-4 bg-slate-200"
                                            )} />
                                            {isActive && (
                                                <motion.div
                                                    layoutId="indicator"
                                                    className="absolute top-2 left-0 w-1 bg-blue-600 h-16"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <h2 className={cn(
                                                "text-2xl md:text-4xl font-black uppercase tracking-tight transition-colors duration-300",
                                                isActive ? "text-slate-900" : "text-slate-300 group-hover:text-slate-400"
                                            )}>
                                                {season.name}
                                            </h2>

                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden space-y-6"
                                                    >
                                                        <p className="text-sm font-bold text-slate-500 uppercase leading-snug max-w-md">
                                                            {season.basics?.description}
                                                        </p>

                                                        <div className="flex gap-12">
                                                            <div className="flex flex-col">
                                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{series.details?.status}</span>
                                                                <span className="text-2xl font-black">{season.details?.races}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{series.details?.access}</span>
                                                                <span className="text-2xl font-black">{season.details?.entries}</span>
                                                            </div>
                                                        </div>

                                                        <div className="h-1 w-full bg-slate-100 relative max-w-xs">
                                                            <motion.div
                                                                key={`bar-${season.id}`}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: isPaused ? "0%" : "100%" }}
                                                                transition={{ duration: 5, ease: "linear" }}
                                                                className="absolute inset-0 bg-blue-600"
                                                            />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="w-full lg:w-[450px] sticky top-20 h-[300px] lg:h-[600px] bg-slate-100 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeId}
                            src={`https://picsum.photos/seed/${activeId}/1000/1200`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    </AnimatePresence>
                </div>

            </div>
        </section>
    )
}