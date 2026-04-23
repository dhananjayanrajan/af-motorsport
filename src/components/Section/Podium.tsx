"use client"
import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionCTA from './CTA'
import SectionFooter from './Footer'
import SectionHeader from './Header'

export interface PodiumEntry {
    id: string
    firstName: string
    lastName: string
    image?: Media | string | null
    rank: 'P01' | 'P02' | 'P03'
    points?: string | number
    team?: string
    meta?: string
}

interface PodiumProps {
    id: string
    title: string
    entries: PodiumEntry[]
}

const Podium: React.FC<PodiumProps> = ({ id, title, entries }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const getRankData = (rank: string) => {
        switch (rank) {
            case 'P01':
                return {
                    label: 'Champion',
                    height: 'h-[400px] md:h-[500px] lg:h-[600px]',
                    order: 'order-1 lg:order-2',
                    bgGradient: 'from-yellow-500/20 to-primary/10',
                    medalColor: 'text-yellow-500',
                    shadow: 'shadow-yellow-500/20'
                }
            case 'P02':
                return {
                    label: 'Runner Up',
                    height: 'h-[350px] md:h-[450px] lg:h-[520px]',
                    order: 'order-2 lg:order-1',
                    bgGradient: 'from-gray-400/20 to-neutral-500/10',
                    medalColor: 'text-gray-400',
                    shadow: 'shadow-gray-400/20'
                }
            case 'P03':
                return {
                    label: 'Third Place',
                    height: 'h-[300px] md:h-[400px] lg:h-[460px]',
                    order: 'order-3',
                    bgGradient: 'from-amber-600/20 to-orange-500/10',
                    medalColor: 'text-amber-600',
                    shadow: 'shadow-amber-600/20'
                }
            default:
                return { label: '', height: 'h-[300px]', order: '', bgGradient: '', medalColor: '', shadow: '' }
        }
    }

    const sortedEntries = [...entries].sort((a, b) => {
        const orderMap: Record<string, number> = { P02: 0, P01: 1, P03: 2 }
        return orderMap[a.rank] - orderMap[b.rank]
    })

    const getImageSrc = (entry: PodiumEntry) => {
        if (typeof entry.image === 'object' && entry.image?.url) return entry.image.url
        if (typeof entry.image === 'string' && entry.image) return entry.image
        return `https://picsum.photos/seed/${entry.id}/800/1200`
    }

    if (!entries || entries.length === 0) return null

    return (
        <section className="relative w-full bg-background flex flex-col overflow-hidden py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={1} />

                <div className="flex flex-col lg:flex-row items-end justify-center w-full max-w-[1600px] mx-auto px-4 md:px-12 py-12 lg:pt-24 lg:pb-12 gap-0">
                    {sortedEntries.map((entry) => {
                        const style = getRankData(entry.rank)
                        const isHovered = hoveredId === entry.id
                        const imageSrc = getImageSrc(entry)

                        return (
                            <div
                                key={entry.id}
                                className={`relative flex flex-col w-full lg:w-1/3 ${style.order} group`}
                                onMouseEnter={() => setHoveredId(entry.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div
                                    className={`relative w-full ${style.height} overflow-hidden bg-muted border-x border-t border-foreground transition-all duration-700 rounded-t-lg ${isHovered ? `z-20 -translate-y-2 ${style.shadow}` : 'z-10'
                                        }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-t ${style.bgGradient} z-10`} />

                                    <Image
                                        src={imageSrc}
                                        alt={entry.lastName}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

                                    <div className="absolute bottom-6 left-6 z-20">
                                        <div className={`text-6xl md:text-7xl lg:text-8xl font-bold ${style.medalColor} italic leading-none tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity`}>
                                            {entry.rank}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-30 p-6 md:p-8 bg-card border-2 border-foreground transition-colors duration-500 group-hover:bg-foreground rounded-b-lg">
                                    <div
                                        className="absolute top-0 left-0 h-1.5 bg-primary transition-all duration-500 rounded-tl-lg"
                                        style={{ width: isHovered ? '100%' : '0%' }}
                                    />

                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                                                {style.label}
                                            </span>
                                            <h3 className={`font-bold text-2xl lg:text-3xl uppercase italic leading-none transition-colors duration-300 ${isHovered ? 'text-background' : 'text-foreground'
                                                }`}>
                                                {entry.firstName} <span className={isHovered ? 'text-primary' : 'text-foreground'}>{entry.lastName}</span>
                                            </h3>
                                        </div>

                                        <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${isHovered ? 'border-neutral-800' : 'border-neutral-100'
                                            }`}>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Team</span>
                                                <span className={`text-sm font-semibold uppercase transition-colors duration-300 ${isHovered ? 'text-neutral-300' : 'text-foreground'
                                                    }`}>
                                                    {entry.team || 'Independent'}
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Points</span>
                                                <span className={`text-xl font-bold italic transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-foreground'
                                                    }`}>
                                                    {entry.points || '00'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 flex justify-center">
                    <SectionCTA
                        label="View Full Standings"
                        path={`/standings/${id}`}
                        variant={2}
                        buttonBgColor="bg-foreground"
                        buttonTextColor="text-background"
                    />
                </div>

                <div className="mt-16">
                    <SectionFooter variant={1} />
                </div>
            </div>
        </section>
    )
}

export default Podium