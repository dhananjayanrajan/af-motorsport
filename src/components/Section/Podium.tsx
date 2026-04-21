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
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

    const getRankData = (rank: string) => {
        switch (rank) {
            case 'P01':
                return {
                    label: 'Champion',
                    height: 'h-[500px] lg:h-[700px]',
                    order: 'order-1 lg:order-2',
                    accent: 'bg-primary-500',
                    text: 'text-primary-500',
                    clip: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)'
                }
            case 'P02':
                return {
                    label: 'Runner Up',
                    height: 'h-[450px] lg:h-[600px]',
                    order: 'order-2 lg:order-1',
                    accent: 'bg-neutral-400',
                    text: 'text-neutral-500',
                    clip: 'polygon(0 0, 100% 10%, 100% 100%, 0 100%)'
                }
            case 'P03':
                return {
                    label: 'Third Place',
                    height: 'h-[400px] lg:h-[500px]',
                    order: 'order-3',
                    accent: 'bg-neutral-200',
                    text: 'text-neutral-400',
                    clip: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)'
                }
            default:
                return { label: '', height: 'h-[400px]', order: '', accent: '', text: '', clip: '' }
        }
    }

    const sortedEntries = [...entries].sort((a, b) => {
        const order = { P02: 0, P01: 1, P03: 2 }
        return order[a.rank] - order[b.rank]
    })

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-end justify-center w-full max-w-[1400px] mx-auto px-6 py-20 gap-4 lg:gap-0">
                {sortedEntries.map((entry, index) => {
                    const style = getRankData(entry.rank)
                    const isHovered = hoveredIdx === index
                    const src = typeof entry.image === 'object' ? entry.image?.url : entry.image || `https://picsum.photos/seed/${entry.id}/800/1200`

                    return (
                        <div
                            key={entry.id}
                            className={`relative flex flex-col w-full lg:w-1/3 ${style.order} group`}
                            onMouseEnter={() => setHoveredIdx(index)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            <div
                                className={`relative w-full ${style.height} overflow-hidden bg-neutral-100 border-x border-t border-black-pure transition-colors duration-500 ${isHovered ? 'bg-neutral-200' : ''}`}
                                style={{ clipPath: style.clip }}
                            >
                                <Image
                                    src={src as string}
                                    alt={entry.lastName}
                                    fill
                                    className="object-cover contrast-110 grayscale group-hover:grayscale-0 transition-all duration-700 origin-bottom"
                                />
                                <div className="absolute inset-0 bg-black-pure/5 mix-blend-multiply" />

                                <div className="absolute bottom-10 left-10">
                                    <span className={`font-race text-7xl lg:text-9xl leading-none italic ${style.text} drop-shadow-md`}>
                                        {entry.rank}
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 p-8 bg-white-pure border-2 border-black-pure group-hover:bg-black-pure transition-colors duration-300">
                                <div
                                    className={`absolute top-0 left-0 h-1 transition-all duration-500 ${style.accent}`}
                                    style={{ width: isHovered ? '100%' : '15%' }}
                                />

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                                            {style.label}
                                        </span>
                                        <h3 className={`font-race text-2xl lg:text-3xl uppercase italic leading-none transition-colors ${isHovered ? 'text-white-pure' : 'text-black-pure'}`}>
                                            {entry.firstName} <span className={isHovered ? style.text : ''}>{entry.lastName}</span>
                                        </h3>
                                    </div>

                                    <div className={`flex items-center gap-8 pt-4 border-t ${isHovered ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-bold text-neutral-400 uppercase">Team</span>
                                            <span className={`text-[11px] font-bold uppercase italic ${isHovered ? 'text-neutral-200' : 'text-black-pure'}`}>
                                                {entry.team || 'Independent'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-bold text-neutral-400 uppercase">Score</span>
                                            <span className={`text-[11px] font-bold italic ${isHovered ? style.text : 'text-black-pure'}`}>
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

            <div className="z-40 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, "CLASSIFICATION_FINALIZED"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default Podium