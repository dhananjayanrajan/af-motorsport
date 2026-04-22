'use client'

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
                    label: 'CHAMPION',
                    height: 'h-[400px] md:h-[500px] lg:h-[600px]',
                    order: 'order-1 lg:order-2',
                    bgGradient: 'from-yellow-500/20 to-primary-500/10',
                    medalColor: 'text-yellow-500',
                    shadow: 'shadow-yellow-500/20'
                }
            case 'P02':
                return {
                    label: 'RUNNER UP',
                    height: 'h-[350px] md:h-[450px] lg:h-[520px]',
                    order: 'order-2 lg:order-1',
                    bgGradient: 'from-gray-400/20 to-neutral-500/10',
                    medalColor: 'text-gray-400',
                    shadow: 'shadow-gray-400/20'
                }
            case 'P03':
                return {
                    label: 'THIRD PLACE',
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
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={1}
            />

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
                                className={`relative w-full ${style.height} overflow-hidden bg-neutral-100 border-x border-t border-black-pure transition-all duration-700 ${isHovered ? `z-20 -translate-y-2 ${style.shadow}` : 'z-10'}`}
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

                                <div className="absolute inset-0 bg-black-pure/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

                                <div className="absolute bottom-6 left-6 z-20">
                                    <div className={`text-6xl md:text-7xl lg:text-8xl font-black ${style.medalColor} italic leading-none tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity`}>
                                        {entry.rank}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-30 p-6 md:p-8 bg-white-pure border-2 border-black-pure transition-colors duration-500 group-hover:bg-black-pure">
                                <div className="absolute top-0 left-0 h-1.5 bg-primary-500 transition-all duration-500" style={{ width: isHovered ? '100%' : '0%' }} />

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-1">
                                            {style.label}
                                        </span>
                                        <h3 className={`font-bold text-2xl lg:text-3xl uppercase italic leading-none transition-colors duration-300 ${isHovered ? 'text-white-pure' : 'text-black-pure'}`}>
                                            {entry.firstName} <span className={isHovered ? 'text-primary-500' : 'text-black-pure'}>{entry.lastName}</span>
                                        </h3>
                                    </div>

                                    <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${isHovered ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-neutral-400 uppercase">TEAM</span>
                                            <span className={`text-[11px] font-black uppercase transition-colors duration-300 ${isHovered ? 'text-neutral-300' : 'text-black-pure'}`}>
                                                {entry.team || 'INDEPENDENT'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[8px] font-black text-neutral-400 uppercase">POINTS</span>
                                            <span className={`text-xl font-black italic transition-colors duration-300 ${isHovered ? 'text-primary-500' : 'text-black-pure'}`}>
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

            <SectionCTA
                label="View Full Standings"
                path={`/standings/${id}`}
                variant={2}
                buttonBgColor="bg-black-pure"
                buttonTextColor="text-white-pure"
            />

            <SectionFooter variant={1} />
        </section>
    )
}

export default Podium