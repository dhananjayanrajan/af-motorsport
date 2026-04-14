'use client'

import { Driver, Media, Point, Result, Season, Team } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useMemo, useRef, useState } from 'react'

interface StandingsTableProps {
    season: Season
    drivers: Driver[]
    teams: Team[]
    results: Result[]
    points: Point[]
}

const KINETIC_SPRING = { type: "spring", stiffness: 400, damping: 30, mass: 0.5 } as const

export default function StandingsTable({
    season,
    drivers,
    teams,
    results,
    points
}: StandingsTableProps) {
    const [activeIdx, setActiveIdx] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

    const leaderboard = useMemo(() => {
        return drivers
            .map((driver) => {
                const driverPoints = points
                    .filter((p) => (p.details as any)?.driver === driver.id)
                    .reduce((acc, p) => acc + (p.details?.value || 0), 0)
                const team = teams.find((t) => (driver.details as any)?.team === t.id)
                return {
                    id: driver.id,
                    name: `${driver.first_name} ${driver.last_name}`,
                    number: driver.basics?.racing_number || '00',
                    callsign: driver.basics?.callsign || 'ALPHA',
                    teamName: team?.name || 'PRIVATEER',
                    score: driverPoints,
                    image: (driver.assets?.cover as Media)?.url || (driver.assets?.avatar as Media)?.url
                }
            })
            .sort((a, b) => b.score - a.score)
    }, [drivers, points, teams])

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
            mouseX.set((e.clientX - rect.left - rect.width / 2) / 25)
            mouseY.set((e.clientY - rect.top - rect.height / 2) / 25)
        }
    }

    const current = leaderboard[activeIdx]

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden font-mono antialiased text-white"
        >
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                        animate={{ opacity: 0.3, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(40px)' }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        {current.image && (
                            <img src={current.image} className="w-full h-full object-cover grayscale brightness-50" alt="" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-20 pointer-events-none" />
            </div>

            <header className="relative z-50 p-12 flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-[#00FF41] animate-ping" />
                        <span className="text-[10px] font-black tracking-[0.8em] text-[#00FF41] uppercase">Live_Telemetry</span>
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">{season.name}</h1>
                </div>
                <div className="text-right">
                    <span className="text-6xl font-black italic opacity-10 uppercase tracking-tighter block leading-none">Ranking</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global_Protocol_v2.6</span>
                </div>
            </header>

            <motion.div
                style={{ rotateX: springY, rotateY: springX, transformStyle: "preserve-3d" }}
                className="relative z-10 flex h-[60vh] mt-10"
            >
                <div className="w-1/3 flex flex-col justify-center pl-12 space-y-1">
                    {leaderboard.slice(0, 8).map((entry, idx) => (
                        <button
                            key={entry.id}
                            onMouseEnter={() => setActiveIdx(idx)}
                            className={cn(
                                "group relative flex items-center gap-6 py-3 transition-all duration-300 origin-left",
                                activeIdx === idx ? "scale-110 translate-x-4" : "opacity-30 hover:opacity-100"
                            )}
                        >
                            <span className="text-2xl font-black italic text-[#00FF41]">
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className={cn(
                                "text-2xl font-black uppercase tracking-tighter transition-all",
                                activeIdx === idx ? "text-white" : "text-zinc-500"
                            )}>
                                {entry.name.split(' ')[1] || entry.name}
                            </span>
                            {activeIdx === idx && (
                                <motion.div layoutId="shard" className="absolute -left-4 w-1 h-full bg-[#00FF41]" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex-1 relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, x: 50, skewX: -10 }}
                            animate={{ opacity: 1, x: 0, skewX: 0 }}
                            exit={{ opacity: 0, x: -50, skewX: 10 }}
                            transition={KINETIC_SPRING}
                            className="relative w-full max-w-2xl"
                        >
                            <div className="absolute -top-32 -left-20 text-[20rem] font-black italic text-white/5 uppercase leading-none pointer-events-none">
                                {current.number}
                            </div>

                            <div className="relative space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="bg-[#00FF41] text-black px-3 py-0.5 text-[10px] font-black italic uppercase">Active_Pilot</span>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                <div className="space-y-0">
                                    <h2 className="text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.75]">
                                        {current.name}
                                    </h2>
                                    <div className="flex justify-between items-end pt-4">
                                        <span className="text-xl font-black italic text-[#00FF41] tracking-widest uppercase">
                                            {current.teamName}
                                        </span>
                                        <div className="flex flex-col items-end">
                                            <span className="text-8xl font-black italic leading-none">{current.score}</span>
                                            <span className="text-xs font-black tracking-[0.5em] text-zinc-500 uppercase">Points_Total</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-1 pt-10">
                                    <div className="h-1 bg-[#00FF41]" />
                                    <div className="h-1 bg-zinc-800" />
                                    <div className="h-1 bg-zinc-800" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            <footer className="absolute bottom-0 left-0 right-0 p-12 flex justify-between items-end">
                <div className="flex gap-12 text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-400">G_Force_Internal</span>
                        <span>3.2G_PEAK</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-400">Tire_Wear</span>
                        <span>OPTIMAL_22%</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="size-12 border border-white/10 flex items-center justify-center rotate-45 group hover:border-[#00FF41] transition-colors cursor-pointer">
                        <div className="size-2 bg-[#00FF41] -rotate-45" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">Init_Launch_Sequence</span>
                </div>
            </footer>
        </section>
    )
}