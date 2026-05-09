"use client"

import { ShieldCheck, Trophy, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React, { useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionSidebar from '../Components/SectionSidebar'

export interface LeaderboardEntry {
    id: number | string
    position: number
    name: string
    team?: string | null
    points?: number | string | null
    image?: string | null
    slug?: string | null
}

interface LeaderboardSectionProps {
    id: string
    title: string
    subtitle: string
    entries: LeaderboardEntry[]
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
    background?: React.ReactNode
}

function getPodiumOrder(total: number): ('first' | 'second' | 'third')[] {
    if (total === 1) return ['first']
    if (total === 2) return ['second', 'first']
    return ['second', 'first', 'third']
}

const podiumConfig = {
    first: {
        rank: 'P01',
        label: 'First',
        height: 'h-[550px] md:h-[720px]',
        clip: 'polygon(0 12%, 100% 0, 100% 100%, 0 100%)',
        accent: 'bg-primary-500',
        textColor: 'text-primary-500',
        order: 'order-1 md:order-2',
    },
    second: {
        rank: 'P02',
        label: 'Second',
        height: 'h-[500px] md:h-[600px]',
        clip: 'polygon(0 0, 100% 12%, 100% 100%, 0 100%)',
        accent: 'bg-black-pure',
        textColor: 'text-black-pure',
        order: 'order-2 md:order-1',
    },
    third: {
        rank: 'P03',
        label: 'Third',
        height: 'h-[450px] md:h-[500px]',
        clip: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
        accent: 'bg-black-pure',
        textColor: 'text-black-pure',
        order: 'order-3',
    },
} as const

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
    id,
    title,
    subtitle,
    entries = [],
    headerVariant = 1,
    footerVariant = 1,
    background,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeEntry, setActiveEntry] = useState<LeaderboardEntry | null>(null)

    if (entries.length === 0) return null

    const podiumEntries = entries.slice(0, 3)
    const remainingEntries = entries.slice(3, 10)
    const podiumOrder = getPodiumOrder(podiumEntries.length)

    const fallbackImage = (entry: LeaderboardEntry) =>
        entry.image || `https://picsum.photos/seed/${entry.id}/800/1200`

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-t-2 border-black-pure">
            {background}

            <SectionHeader
                title={title}
                subtitle={subtitle}
                variant={headerVariant}
                metadata={String(entries.length).padStart(2, '0')}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 border-b-2 border-black-pure">
                <div className="p-10 lg:p-20 border-r border-black-pure flex flex-col justify-center">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-mono font-black bg-black-pure text-white-pure px-3 py-1 uppercase tracking-widest self-start">
                            Results
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-black-pure uppercase leading-none tracking-tighter">
                            Final
                            <br />
                            Standings
                        </h2>
                        <span className="text-lg font-black text-primary-500 uppercase tracking-tighter">
                            Top {String(Math.min(3, podiumEntries.length)).padStart(2, '0')}
                        </span>
                    </div>
                </div>
                <div className="p-10 lg:p-20 flex flex-col justify-center">
                    <p className="text-sm font-bold text-black-pure uppercase leading-relaxed">
                        The official classification representing the top ranked competitors. All points and team associations are verified via the technical registry.
                    </p>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-20 py-20 w-full">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 md:gap-0">
                    {podiumOrder.map((pos) => {
                        const config = podiumConfig[pos]
                        const entryIndex = pos === 'first' ? (podiumEntries.length === 2 ? 1 : 1) : pos === 'second' ? 0 : 2
                        const entry = podiumEntries[entryIndex]
                        if (!entry) return null

                        return (
                            <div
                                key={entry.id}
                                className={`relative flex flex-col w-full md:w-1/3 ${config.order} group cursor-pointer`}
                                onMouseEnter={() => setHoveredIndex(entryIndex)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => {
                                    setActiveEntry(entry)
                                    setSidebarOpen(true)
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: entryIndex * 0.1 }}
                                    className={`relative w-full ${config.height} overflow-hidden bg-white-pure border-x border-t border-black-pure transition-colors duration-300`}
                                    style={{ clipPath: config.clip }}
                                >
                                    <img
                                        src={fallbackImage(entry)}
                                        alt={entry.name}
                                        className="w-full h-full object-cover contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 origin-bottom"
                                    />
                                    <div className="absolute inset-0 bg-black-pure/10 mix-blend-multiply" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col">
                                        <div className="flex items-end justify-between">
                                            <span className={`text-6xl md:text-8xl font-black leading-none ${config.textColor}`}>
                                                {config.rank}
                                            </span>
                                            {pos === 'first' && (
                                                <div className="bg-primary-500 p-3 mb-2">
                                                    <Trophy size={24} className="text-black-pure" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`absolute top-12 right-0 p-6 ${config.accent} opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
                                        <Zap size={24} className="text-black-pure" />
                                    </div>
                                </motion.div>

                                <div className="relative z-10 border-2 border-black-pure p-8 bg-white-pure group-hover:bg-black-pure transition-colors duration-300">
                                    <div
                                        className={`absolute top-0 left-0 h-1.5 transition-all duration-500 ${config.accent}`}
                                        style={{ width: hoveredIndex === entryIndex ? '100%' : '15%' }}
                                    />

                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black uppercase tracking-widest text-black-pure group-hover:text-white-pure mb-1">
                                                {config.label}
                                            </span>
                                            <h3 className={`text-2xl font-black uppercase leading-none tracking-tighter ${hoveredIndex === entryIndex ? config.textColor : 'text-black-pure group-hover:text-white-pure'}`}>
                                                {entry.name}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-6 pt-4 border-t border-black-pure group-hover:border-white-pure">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase text-black-pure group-hover:text-white-pure tracking-widest">
                                                    Team
                                                </span>
                                                <span className="text-xs font-black text-black-pure group-hover:text-white-pure uppercase">
                                                    {entry.team || 'TBA'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase text-black-pure group-hover:text-white-pure tracking-widest">
                                                    Points
                                                </span>
                                                <span className={`text-xs font-black uppercase ${hoveredIndex === entryIndex ? config.textColor : 'text-black-pure group-hover:text-white-pure'}`}>
                                                    {entry.points ?? '000'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {remainingEntries.length > 0 && (
                <div className="w-full border-t-2 border-black-pure overflow-x-auto bg-white-pure">
                    <div className="min-w-[600px] w-full">
                        <div className="flex items-stretch bg-white-pure border-b-2 border-black-pure" style={{ height: '56px' }}>
                            <div className="w-14 border-r-2 border-black-pure flex items-center justify-center shrink-0 bg-black-pure">
                                <span className="text-xs font-mono font-black text-white-pure uppercase">Pos</span>
                            </div>
                            <div className="flex-1 flex items-center px-6 border-r-2 border-black-pure">
                                <span className="text-xs font-bold text-black-pure uppercase">Name</span>
                            </div>
                            <div className="flex-1 flex items-center px-6 border-r-2 border-black-pure">
                                <span className="text-xs font-bold text-black-pure uppercase">Team</span>
                            </div>
                            <div className="w-24 flex items-center justify-center px-4">
                                <span className="text-xs font-bold text-black-pure uppercase">Pts</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            {remainingEntries.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="flex items-stretch border-b border-black-pure hover:bg-black-pure transition-colors duration-300 group/row cursor-pointer"
                                    style={{ minHeight: '64px' }}
                                    onClick={() => {
                                        setActiveEntry(entry)
                                        setSidebarOpen(true)
                                    }}
                                >
                                    <div className="w-14 border-r border-black-pure flex items-center justify-center shrink-0">
                                        <span className="text-sm font-mono font-black text-black-pure group-hover/row:text-white-pure tabular-nums">
                                            {String(entry.position).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="flex-1 flex items-center px-6 min-w-0">
                                        {entry.slug ? (
                                            <Link
                                                href={entry.slug.startsWith('/') ? entry.slug : `/${entry.slug}`}
                                                className="text-sm font-black text-black-pure group-hover/row:text-primary-500 uppercase hover:underline truncate"
                                            >
                                                {entry.name}
                                            </Link>
                                        ) : (
                                            <span className="text-sm font-black text-black-pure group-hover/row:text-white-pure uppercase truncate">
                                                {entry.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 flex items-center px-6 min-w-0">
                                        <span className="text-xs font-bold text-black-pure group-hover/row:text-white-pure uppercase truncate">
                                            {entry.team || '—'}
                                        </span>
                                    </div>
                                    <div className="w-24 flex items-center justify-center">
                                        <span className="text-sm font-mono font-black text-black-pure group-hover/row:text-primary-500 tabular-nums">
                                            {entry.points ?? '—'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {entries.length > 10 && (
                <div className="w-full bg-white-pure border-t-2 border-black-pure flex items-center justify-center py-20">
                    <div className="flex items-center gap-4">
                        <ShieldCheck size={20} className="text-black-pure" />
                        <span className="text-xs font-mono font-black text-black-pure uppercase tracking-widest">
                            {entries.length - 10} more entries available
                        </span>
                        <ShieldCheck size={20} className="text-black-pure" />
                    </div>
                </div>
            )}

            <SectionFooter variant={footerVariant} />

            <SectionSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                title={activeEntry?.name || ''}
                description={`Team: ${activeEntry?.team || 'N/A'}\nPoints: ${activeEntry?.points || 'N/A'}\nPosition: ${activeEntry?.position || 'N/A'}`}
                imageUrl={activeEntry ? fallbackImage(activeEntry) : ''}
                idCode={`P${String(activeEntry?.position || 0).padStart(2, '0')}`}
                stats={[
                    { label: 'Position', val: String(activeEntry?.position || 0), color: 'bg-primary-500' },
                    { label: 'Points', val: String(activeEntry?.points || 0), color: 'bg-black-pure' },
                    { label: 'Team', val: activeEntry?.team || 'N/A', color: 'bg-black-pure' }
                ]}
                buttonLabel="View Profile"
                onAction={() => {
                    if (activeEntry?.slug) window.location.href = activeEntry.slug.startsWith('/') ? activeEntry.slug : `/${activeEntry.slug}`
                    setSidebarOpen(false)
                }}
            />
        </section>
    )
}

export default LeaderboardSection