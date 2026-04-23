'use client'

import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import SectionDescription from '@/components/Section/Description'
import SectionScroller from '@/components/Section/Scroller'
import { Circuit, Media, Race } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface RaceCalendarProps {
    races: Race[]
}

const RaceCalendar: React.FC<RaceCalendarProps> = ({ races = [] }) => {
    const [hoveredRace, setHoveredRace] = useState<string | null>(null)
    const upcoming = races.filter((r) => r.details.status === 'scheduled')
    const marqueeItems = upcoming.map((r) => r.name || 'Race')

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col md:flex-row border-b border-black-pure overflow-hidden">
            <div className="w-full md:w-[35%] lg:w-[30%] border-r border-black-pure flex flex-col bg-white-pure z-20 shrink-0">
                <div className="p-6 md:p-10 border-b border-black-pure bg-black-pure relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                        <div className="w-12 h-12 border-t border-r border-white-pure" />
                    </div>

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-1.5 h-8 bg-primary-500 animate-pulse" />
                        <h1 className="text-white-pure font-race font-black text-2xl lg:text-3xl uppercase tracking-tighter leading-none">
                            Upcoming<br />Races
                        </h1>
                    </div>

                    <div className="flex justify-between items-end relative z-10">
                        <div className="flex flex-col">
                            <span className="font-mono text-[9px] text-white-pure/40 uppercase tracking-widest">Live Schedule</span>
                            <span className="font-mono text-lg text-primary-500 font-black uppercase tracking-tighter italic">
                                {new Date().getFullYear()}
                            </span>
                        </div>
                        <span className="font-mono text-3xl text-white-pure font-black opacity-10">[{upcoming.length}]</span>
                    </div>
                </div>

                <div className="flex-1 p-6 md:p-10 flex flex-col justify-between gap-8 bg-white-pure relative">
                    <div className="space-y-8 relative z-10">
                        <SectionDescription text="List of confirmed events. View dates, locations and technical specifications for the current season." />

                        <div className="grid grid-cols-2 gap-0 border border-black-pure">
                            <div className="flex flex-col p-3 border-r border-black-pure bg-zinc-50">
                                <span className="font-mono text-[8px] text-black-pure/40 uppercase font-black">Region</span>
                                <span className="font-mono text-[10px] font-black text-black-pure uppercase">Global</span>
                            </div>
                            <div className="flex flex-col p-3 bg-white-pure">
                                <span className="font-mono text-[8px] text-black-pure/40 uppercase font-black">Sync</span>
                                <span className="font-mono text-[10px] font-black text-black-pure uppercase animate-pulse">Online</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block relative aspect-video w-full overflow-hidden border border-black-pure bg-black-pure group/preview">
                        {hoveredRace ? (
                            <>
                                <Image
                                    src={upcoming.find((r) => r.id.toString() === hoveredRace)?.assets?.cover ? (upcoming.find((r) => r.id.toString() === hoveredRace)?.assets?.cover as Media).url! : `https://picsum.photos/seed/${hoveredRace}/600/400`}
                                    alt="Preview"
                                    fill
                                    className="object-cover brightness-50 group-hover/preview:grayscale-0 group-hover/preview:brightness-100 transition-all duration-500 scale-105 group-hover/preview:scale-100"
                                />
                                <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay" />
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-6 bg-[url('/grid-dark.svg')] bg-center opacity-20">
                                <span className="font-mono text-[8px] font-black text-white-pure uppercase tracking-[0.3em]">Awaiting Input</span>
                            </div>
                        )}
                        <div className="absolute top-2 left-2 size-2 bg-primary-500" />
                    </div>
                </div>
                <SectionFooter />
            </div>

            <div className="flex-1 flex flex-col bg-white-pure overflow-hidden">
                <SectionHeader title="schedule" subtitle="calendar" />
                <SectionScroller items={marqueeItems} variant={1} backgroundColor="bg-secondary-500" textColor="text-black-pure" />

                <div className="flex-1 overflow-y-auto no-scrollbar border-t border-black-pure bg-zinc-50">
                    {upcoming.map((race, index) => {
                        const startDate = new Date(race.details.start_date || '')
                        return (
                            <Link
                                key={race.id}
                                href={`/competition/races/${race.slug}`}
                                onMouseEnter={() => setHoveredRace(race.id.toString())}
                                onMouseLeave={() => setHoveredRace(null)}
                                className="group flex flex-col md:flex-row w-full border-b border-black-pure bg-white-pure hover:bg-black-pure transition-all duration-300 min-w-0 relative overflow-hidden"
                            >
                                <div className="absolute inset-y-0 left-0 w-1 bg-primary-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />

                                <div className="w-full md:w-24 lg:w-32 border-r border-black-pure p-4 flex md:flex-col items-center justify-center bg-white-pure group-hover:bg-primary-500 shrink-0 transition-colors z-10">
                                    <span className="font-mono text-[9px] font-black text-black-pure opacity-40 group-hover:opacity-100 md:mb-1 mr-2 md:mr-0 transition-opacity">
                                        {startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                                    </span>
                                    <span className="text-xl md:text-3xl font-race font-black text-black-pure tracking-tighter transition-transform group-hover:scale-110">
                                        {startDate.getDate().toString().padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="flex-1 p-4 md:p-6 flex flex-row items-center justify-between gap-4 min-w-0 z-10">
                                    <div className="min-w-0 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className="flex font-mono text-[8px] font-black bg-black-pure text-white-pure group-hover:bg-white-pure group-hover:text-black-pure transition-colors">
                                                <span className="px-1.5 py-0.5 border-r border-white-pure/20 group-hover:border-black-pure/20">
                                                    {race.basics?.identifiers?.code || `R${index + 1}`}
                                                </span>
                                                <span className="px-1.5 py-0.5">
                                                    {race.details.type || 'EVENT'}
                                                </span>
                                            </div>
                                        </div>
                                        <h2 className="text-base md:text-xl font-race font-black text-black-pure uppercase truncate group-hover:text-white-pure transition-colors">
                                            {race.name}
                                        </h2>
                                        <p className="font-mono text-[9px] font-bold text-black-pure/40 group-hover:text-primary-500 truncate transition-colors uppercase italic">
                                            {(race.details.circuit as Circuit)?.name || 'TBD'}
                                        </p>
                                    </div>

                                    <div className="hidden lg:flex flex-row gap-8 shrink-0 text-right">
                                        <div className="flex flex-col border-r border-black-pure/10 pr-6 group-hover:border-white-pure/20 transition-colors">
                                            <span className="font-mono text-[8px] text-black-pure/40 uppercase group-hover:text-white-pure/40">Distance</span>
                                            <span className="text-base md:text-lg font-race font-black text-black-pure group-hover:text-white-pure transition-colors">{race.details.distance_km || '0'}KM</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-mono text-[8px] text-black-pure/40 uppercase group-hover:text-white-pure/40">Laps</span>
                                            <span className="text-base md:text-lg font-race font-black text-black-pure group-hover:text-white-pure transition-colors">{race.details.laps || '--'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-16 hidden md:flex items-center justify-center border-l border-black-pure group-hover:border-white-pure/20 group-hover:bg-primary-500 transition-all">
                                    <div className="relative">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black-pure group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default RaceCalendar