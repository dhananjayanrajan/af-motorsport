"use client"

import MosaicBackground from '@/components/Section/Backgrounds/Mosaic'
import SectionCTA from '@/components/Section/CTA'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import { Championship } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

interface ChampionshipPulseTickerProps {
    championships?: Championship[]
}

const ChampionshipPulseTicker: React.FC<ChampionshipPulseTickerProps> = ({
    championships = []
}) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const getStatusColor = (championship: Championship) => {
        const now = new Date()
        const start = championship.details?.start_date ? new Date(championship.details.start_date) : null
        const end = championship.details?.end_date ? new Date(championship.details.end_date) : null

        if (end && end < now) return 'bg-black-700'
        if (start && start <= now && end && end >= now) return 'bg-primary'
        return 'bg-secondary'
    }

    const getStatusText = (championship: Championship) => {
        const now = new Date()
        const start = championship.details?.start_date ? new Date(championship.details.start_date) : null
        const end = championship.details?.end_date ? new Date(championship.details.end_date) : null

        if (end && end < now) return 'FINISHED'
        if (start && start <= now && end && end >= now) return 'ACTIVE'
        if (start && start > now) return 'UPCOMING'
        return 'SCHEDULED'
    }

    const activeChampionships = [...championships].sort((a, b) => {
        if (a.details?.start_date && b.details?.start_date) {
            return new Date(b.details.start_date).getTime() - new Date(a.details.start_date).getTime()
        }
        return 0
    })

    const selectedChampionship = activeChampionships.find(c => c.id === selectedId)

    return (
        <section className="relative w-full bg-background overflow-hidden">
            <MosaicBackground opacity="opacity-[0.04]" zIndex="z-0" />

            <div className="relative z-10">
                <SectionHeader title="CHAMPIONSHIP" subtitle="PULSE" />

                <div className="container mx-auto px-6 md:px-10 py-20 md:py-28">
                    <div className="mb-20">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 transition-all duration-300 hover:tracking-wider" style={{ fontFamily: "var(--font-race)" }}>
                            SEASON <span className="text-primary hover:text-secondary transition-colors duration-300">PROGRESSION</span>
                        </h2>
                        <p className="text-base font-mono uppercase text-muted-foreground tracking-wide group-hover:text-foreground transition-colors duration-300">
                            LIVE STANDINGS TRACKER / REAL-TIME CLASSIFICATION UPDATES
                        </p>
                        <div className="flex gap-4 mt-8">
                            <div className="w-16 h-px bg-primary transition-all duration-500 hover:w-32" />
                            <div className="w-16 h-px bg-secondary transition-all duration-500 hover:w-32" />
                            <div className="w-16 h-px bg-tertiary-500 transition-all duration-500 hover:w-32" />
                        </div>
                    </div>

                    <div className="space-y-0">
                        {activeChampionships.slice(0, 8).map((championship, idx) => (
                            <div
                                key={championship.id}
                                className={`group border-t border-border transition-all duration-500 ${hoveredId === championship.id ? 'bg-primary/5' : ''
                                    } ${selectedId === championship.id ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
                                onMouseEnter={() => setHoveredId(championship.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => setSelectedId(selectedId === championship.id ? null : championship.id)}
                            >
                                <div className="grid grid-cols-12 gap-6 items-center py-6 px-4 transition-all duration-300 group-hover:px-6 cursor-pointer">
                                    <div className="col-span-1">
                                        <span className={`text-3xl font-black transition-all duration-300 ${hoveredId === championship.id ? 'text-primary scale-110 inline-block' : 'text-border'
                                            }`} style={{ fontFamily: "var(--font-race)" }}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className={`text-2xl font-black uppercase tracking-tight transition-all duration-300 ${hoveredId === championship.id ? 'text-primary translate-x-1' : ''
                                                }`} style={{ fontFamily: "var(--font-race)" }}>
                                                {championship.name}
                                            </h3>
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(championship)} transition-all duration-300 ${hoveredId === championship.id ? 'scale-150' : ''
                                                }`} />
                                        </div>

                                        <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground uppercase">
                                            {championship.basics?.identifiers?.code && (
                                                <span className="font-bold tracking-wide">{championship.basics.identifiers.code}</span>
                                            )}
                                            <span className="text-border">|</span>
                                            {championship.details?.start_date && (
                                                <span>{new Date(championship.details.start_date).getFullYear()}</span>
                                            )}
                                            <span className="text-border">|</span>
                                            {championship.details?.format && (
                                                <span>{championship.details.format}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-span-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-mono font-bold uppercase tracking-wide text-muted-foreground">
                                                STATUS
                                            </span>
                                            <span className={`text-sm font-black uppercase tracking-wide transition-all duration-300 ${getStatusText(championship) === 'ACTIVE' ? 'text-primary animate-pulse' :
                                                    getStatusText(championship) === 'UPCOMING' ? 'text-secondary' : 'text-foreground'
                                                }`}>
                                                {getStatusText(championship)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-right">
                                        {championship.details?.winner && (
                                            <div className="transition-all duration-300 group-hover:translate-x-[-4px]">
                                                <span className="text-sm font-mono font-bold uppercase tracking-wide text-muted-foreground block mb-1">
                                                    CURRENT LEADER
                                                </span>
                                                <span className={`text-base font-black uppercase tracking-tight transition-all duration-300 ${hoveredId === championship.id ? 'text-primary' : ''
                                                    }`}>
                                                    {(championship.details.winner as any)?.name || 'TBD'}
                                                </span>
                                            </div>
                                        )}
                                        <ChevronRight className={`w-5 h-5 text-muted-foreground ml-auto transition-all duration-300 ${hoveredId === championship.id ? 'translate-x-2 text-primary' : 'opacity-0 group-hover:opacity-100'
                                            }`} />
                                    </div>
                                </div>

                                {selectedId === championship.id && (
                                    <div className="px-4 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="border-t border-primary/20 pt-6 mt-2">
                                            <div className="grid grid-cols-3 gap-6">
                                                <div>
                                                    <span className="text-xs font-mono font-bold uppercase tracking-wide text-muted-foreground block mb-2">
                                                        SEASON START
                                                    </span>
                                                    <span className="text-sm font-black uppercase">
                                                        {championship.details?.start_date
                                                            ? new Date(championship.details.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                                            : 'TBD'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-mono font-bold uppercase tracking-wide text-muted-foreground block mb-2">
                                                        SEASON END
                                                    </span>
                                                    <span className="text-sm font-black uppercase">
                                                        {championship.details?.end_date
                                                            ? new Date(championship.details.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                                            : 'TBD'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-mono font-bold uppercase tracking-wide text-muted-foreground block mb-2">
                                                        STANDINGS SCOPE
                                                    </span>
                                                    <span className="text-sm font-black uppercase">
                                                        {championship.details?.standings_scope?.replace('_', ' ') || 'SEASON ONLY'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <SectionCTA
                    label="VIEW FULL STANDINGS"
                    path="/championships"
                    description="ACCESS COMPLETE CLASSIFICATION DATA AND SEASON ARCHIVES"
                />

                <SectionFooter />
            </div>
        </section>
    )
}

export default ChampionshipPulseTicker