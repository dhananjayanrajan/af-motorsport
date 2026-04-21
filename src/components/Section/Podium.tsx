'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionScroller from './Scroller'

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
                    height: 'h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px]',
                    order: 'order-1 lg:order-2',
                    bgGradient: 'from-yellow-500/20 to-primary-500/20',
                    medalColor: 'text-yellow-500',
                    borderColor: 'border-yellow-500',
                    shadow: 'shadow-yellow-500/30'
                }
            case 'P02':
                return {
                    label: 'RUNNER UP',
                    height: 'h-[400px] md:h-[500px] lg:h-[580px] xl:h-[620px]',
                    order: 'order-2 lg:order-1',
                    bgGradient: 'from-gray-400/20 to-neutral-500/20',
                    medalColor: 'text-gray-400',
                    borderColor: 'border-gray-400',
                    shadow: 'shadow-gray-400/30'
                }
            case 'P03':
                return {
                    label: 'THIRD PLACE',
                    height: 'h-[350px] md:h-[450px] lg:h-[520px] xl:h-[550px]',
                    order: 'order-3',
                    bgGradient: 'from-amber-600/20 to-orange-500/20',
                    medalColor: 'text-amber-600',
                    borderColor: 'border-amber-600',
                    shadow: 'shadow-amber-600/30'
                }
            default:
                return { label: '', height: 'h-[400px]', order: '', bgGradient: '', medalColor: '', borderColor: '', shadow: '' }
        }
    }

    const sortedEntries = [...entries].sort((a, b) => {
        const order = { P02: 0, P01: 1, P03: 2 }
        return order[a.rank] - order[b.rank]
    })

    const getImageSrc = (entry: PodiumEntry) => {
        if (typeof entry.image === 'object' && entry.image?.url) {
            return entry.image.url
        }
        if (typeof entry.image === 'string' && entry.image) {
            return entry.image
        }
        return `https://picsum.photos/seed/${entry.id}/800/1200`
    }

    return (
        <section className="relative w-full bg-gradient-to-br from-white-pure via-neutral-50 to-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-primary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-end justify-center w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 gap-3 md:gap-4 lg:gap-0">
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
                                className={`relative w-full ${style.height} overflow-hidden bg-gradient-to-t ${style.bgGradient} border-x border-t border-black-pure transition-all duration-500 ${isHovered ? `shadow-2xl ${style.shadow}` : ''}`}
                            >
                                {imageSrc && (
                                    <Image
                                        src={imageSrc}
                                        alt={entry.lastName}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black-pure/30 group-hover:bg-black-pure/10 transition-colors duration-500" />

                                <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-8 flex flex-col gap-1">
                                    <div className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black ${style.medalColor} drop-shadow-lg`}>
                                        {entry.rank}
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className={`w-1 h-4 ${i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : 'bg-amber-600'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="bg-black-pure/80 backdrop-blur-sm text-white-pure px-2 py-1 rounded text-[8px] font-black">
                                        #{entry.points || '00'}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 p-4 md:p-6 lg:p-8 bg-white-pure border-2 border-black-pure group-hover:bg-black-pure transition-all duration-500">
                                <div className={`absolute top-0 left-0 h-1 transition-all duration-500 bg-primary-500`} style={{ width: isHovered ? '100%' : '20%' }} />

                                <div className="space-y-3 md:space-y-4">
                                    <div>
                                        <span className="text-[8px] md:text-[9px] font-black text-neutral-400 uppercase tracking-wider block mb-1">
                                            {style.label}
                                        </span>
                                        <h3 className={`font-race text-xl md:text-2xl lg:text-3xl uppercase italic leading-none transition-all duration-300 ${isHovered ? 'text-white-pure' : 'text-black-pure'}`}>
                                            {entry.firstName} <span className={isHovered ? 'text-primary-500' : ''}>{entry.lastName}</span>
                                        </h3>
                                    </div>

                                    <div className={`flex items-center gap-4 md:gap-6 pt-3 md:pt-4 border-t transition-colors duration-300 ${isHovered ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                        <div className="flex flex-col">
                                            <span className="text-[7px] md:text-[8px] font-black text-neutral-400 uppercase tracking-wider">TEAM</span>
                                            <span className={`text-[9px] md:text-[10px] font-black uppercase italic transition-colors duration-300 ${isHovered ? 'text-neutral-300' : 'text-black-pure'}`}>
                                                {entry.team || 'INDEPENDENT'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[7px] md:text-[8px] font-black text-neutral-400 uppercase tracking-wider">POINTS</span>
                                            <span className={`text-base md:text-lg lg:text-xl font-black italic transition-colors duration-300 ${isHovered ? 'text-primary-500' : 'text-black-pure'}`}>
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

            <SectionScroller items={[title, "STANDINGS", "LEADERBOARD", "RANKINGS"]} variant={1} velocity={28} />
        </section>
    )
}

export default Podium