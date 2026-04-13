'use client'

import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, User, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

// Optimized Props Interfaces based on your collections
interface LeaderboardData {
    drivers: {
        driver: any
        points: number
        teamName: string
    }[]
    teams: {
        team: any // Team type
        points: number
    }[]
    seasonName: string
}

export function SeasonLeaderboard({ data }: { data: LeaderboardData }) {
    const [view, setView] = useState<'drivers' | 'teams'>('drivers')

    return (
        <section className="relative w-full py-24 bg-white overflow-hidden border-b border-black/10">
            {/* BACKGROUND GRID SCANNERS */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* HEADER BLOCK */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-[2px] bg-[#00FF41]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Active Standings</span>
                        </div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-black">
                            {data.seasonName}
                        </h2>
                    </div>

                    {/* TOGGLE SWITCH */}
                    <div className="flex bg-zinc-100 p-1 border border-black/5">
                        <ToggleButton active={view === 'drivers'} onClick={() => setView('drivers')} label="Drivers" icon={<User size={14} />} />
                        <ToggleButton active={view === 'teams'} onClick={() => setView('teams')} label="Teams" icon={<Users size={14} />} />
                    </div>
                </div>

                {/* LEADERS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    <AnimatePresence mode="wait">
                        {view === 'drivers' ? (
                            data.drivers.slice(0, 3).map((item, i) => (
                                <LeaderCard
                                    key={`driver-${item.driver.id}`}
                                    rank={i + 1}
                                    name={`${item.driver.first_name} ${item.driver.last_name}`}
                                    subtext={item.teamName}
                                    points={item.points}
                                    image={item.driver.assets?.avatar?.url || `https://picsum.photos/seed/driver${item.driver.id}/400/500`}
                                    href={`/drivers/${item.driver.slug}`}
                                />
                            ))
                        ) : (
                            data.teams.slice(0, 3).map((item, i) => (
                                <LeaderCard
                                    key={`team-${item.team.id}`}
                                    rank={i + 1}
                                    name={item.team.name}
                                    subtext={item.team.basics?.tagline || 'Constructor'}
                                    points={item.points}
                                    image={item.team.assets?.logo?.url || `https://picsum.photos/seed/team${item.team.id}/400/500`}
                                    href={`/teams/${item.team.slug}`}
                                />
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* FULL STANDINGS LINK */}
                <div className="mt-1 flex justify-end">
                    <Link
                        href="/standings"
                        className="group flex items-center gap-10 bg-black px-8 py-6 text-white hover:bg-[#00FF41] hover:text-black transition-all duration-200"
                    >
                        <span className="text-xs font-black italic uppercase tracking-[0.3em]">View Full Standings</span>
                        <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

function LeaderCard({ rank, name, subtext, points, image, href }: { rank: number, name: string, subtext: string, points: number, image: string, href: string }) {
    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: rank * 0.1 }}
            className="group relative bg-zinc-50 border border-black/5 overflow-hidden flex flex-col h-[450px]"
        >
            {/* RANK INDICATOR */}
            <div className="absolute top-0 left-0 z-20 bg-black text-white w-12 h-12 flex items-center justify-center font-black italic text-xl group-hover:bg-[#00FF41] group-hover:text-black transition-colors">
                {rank}
            </div>

            {/* IMAGE MODULE */}
            <div className="relative flex-1 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
            </div>

            {/* CONTENT MODULE */}
            <div className="p-8 relative z-10 bg-white">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">{name}</h3>
                        <p className="text-[10px] font-black text-black/40 uppercase tracking-widest">{subtext}</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] font-black text-[#00FF41] uppercase">Points</span>
                        <span className="text-3xl font-black italic tracking-tighter tabular-nums">{points}</span>
                    </div>
                </div>

                <Link href={href} className="absolute inset-0" />
            </div>

            {/* MECHANICAL BOTTOM BAR */}
            <div className="h-1 w-full bg-black/5 relative">
                <motion.div
                    className="absolute h-full bg-[#00FF41]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1 }}
                />
            </div>
        </motion.div>
    )
}

function ToggleButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-8 py-3 transition-all duration-200 relative",
                active ? "bg-black text-white" : "text-black/40 hover:text-black"
            )}
        >
            {icon}
            <span className="text-[10px] font-black italic uppercase tracking-widest">{label}</span>
            {active && <motion.div layoutId="active-pill" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00FF41]" />}
        </button>
    )
}