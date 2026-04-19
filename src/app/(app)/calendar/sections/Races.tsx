"use client"

import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
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
    const upcoming = races.filter(r => r.details.status === 'scheduled')

    const marqueeItems = upcoming.map(r => r.name || 'Race')

    const listContainerClass = upcoming.length > 5
        ? "flex-1 overflow-y-auto no-scrollbar max-h-[60vh] md:max-h-none h-screen md:h-auto border-t-2 md:border-t-0 border-black-pure"
        : "flex-1 border-t-2 md:border-t-0 border-black-pure"

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col md:flex-row border-b-2 border-black-pure overflow-hidden">
            <div className="w-full md:w-[35%] lg:w-[30%] border-r-2 border-black-pure flex flex-col bg-white-100 z-20 shrink-0">
                <div className="p-8 md:p-12 border-b-2 border-black-pure bg-black-pure">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-2 h-10 bg-primary-500" />
                        <h1 className="text-white-pure font-black text-3xl lg:text-5xl uppercase tracking-tighter leading-none">
                            Upcoming<br />Races
                        </h1>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-white-pure/40 uppercase tracking-widest">Racing Schedule</span>
                            <span className="font-mono text-xl text-primary-500 font-black uppercase tracking-tighter italic">
                                Season {new Date().getFullYear()}
                            </span>
                        </div>
                        <span className="font-mono text-4xl text-white-pure font-black opacity-20">[{upcoming.length}]</span>
                    </div>
                </div>

                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                    <div className="space-y-12">
                        <SectionDescription text="List of confirmed events. View dates, locations and race distances for the current championship." />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-l-2 border-black-pure pl-4">
                                <span className="block font-mono text-[9px] text-black-pure/40 uppercase font-black">Time</span>
                                <span className="font-mono text-xs font-black text-black-pure uppercase">UTC Standard</span>
                            </div>
                            <div className="border-l-2 border-black-pure pl-4">
                                <span className="block font-mono text-[9px] text-black-pure/40 uppercase font-black">Status</span>
                                <span className="font-mono text-xs font-black text-black-pure uppercase">Confirmed</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block relative aspect-square w-full mt-12 overflow-hidden border-2 border-black-pure grayscale">
                        {hoveredRace ? (
                            <Image
                                src={upcoming.find(r => r.id.toString() === hoveredRace)?.assets?.cover ? (upcoming.find(r => r.id.toString() === hoveredRace)?.assets?.cover as Media).url! : `https://picsum.photos/seed/${hoveredRace}/800/800`}
                                alt="Preview"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover animate-in fade-in zoom-in duration-500"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-white-200 flex items-center justify-center p-12">
                                <span className="font-mono text-[10px] font-black text-black-pure/20 text-center uppercase tracking-widest leading-relaxed">
                                    Hover over an entry to see image
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <SectionFooter />
            </div>

            <div className="flex-1 flex flex-col bg-white-pure overflow-hidden">
                <SectionHeader title="schedule" subtitle="calendar" />

                <SectionScroller
                    items={marqueeItems}
                    variant={1}
                    backgroundColor="bg-secondary-500"
                    textColor="text-black-pure"
                />

                <div className={listContainerClass}>
                    {upcoming.map((race, index) => {
                        const startDate = new Date(race.details.start_date || '')
                        const day = startDate.getDate().toString().padStart(2, '0')
                        const month = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
                        const raceImage = (race.assets?.cover as Media)?.url || `https://picsum.photos/seed/${race.id}/200/200`

                        return (
                            <Link
                                key={race.id}
                                href={`/competition/races/${race.slug}`}
                                onMouseEnter={() => setHoveredRace(race.id.toString())}
                                onMouseLeave={() => setHoveredRace(null)}
                                className="group flex flex-col md:flex-row w-full border-b-2 border-black-pure hover:bg-black-pure transition-colors duration-500"
                            >
                                <div className="hidden md:flex w-full md:w-auto">
                                    <div className="w-24 md:w-32 border-r-2 border-black-pure p-6 md:p-8 flex flex-col items-center justify-center bg-white-50 group-hover:bg-primary-500 transition-colors shrink-0">
                                        <span className="font-mono text-sm font-black text-black-pure mb-1 opacity-40 group-hover:opacity-100">{month}</span>
                                        <span className="text-3xl md:text-4xl font-black text-black-pure leading-none tracking-tighter">{day}</span>
                                    </div>
                                </div>

                                <div className="flex md:hidden w-full">
                                    <div className="w-20 border-r-2 border-black-pure p-3 flex flex-col items-center justify-center bg-white-50 group-hover:bg-primary-500 transition-colors shrink-0">
                                        <span className="font-mono text-[10px] font-black text-black-pure opacity-40 group-hover:opacity-100">{month}</span>
                                        <span className="text-xl font-black text-black-pure leading-none tracking-tighter">{day}</span>
                                    </div>
                                    <div className="flex-1 p-3 bg-white-pure group-hover:bg-black-pure transition-colors flex items-center gap-3">
                                        <div className="relative size-14 shrink-0 border border-black-pure group-hover:border-white-pure/20 overflow-hidden">
                                            <Image src={raceImage} alt={race.name} fill sizes="56px" className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1 mb-1">
                                                <span className="font-mono text-[8px] font-black text-primary-500 uppercase bg-black-pure px-1.5 py-0.5 group-hover:bg-white-pure group-hover:text-black-pure">
                                                    {race.basics?.identifiers?.code || `R-${index + 1}`}
                                                </span>
                                            </div>
                                            <h2 className="text-sm font-black text-black-pure uppercase tracking-tighter leading-tight truncate group-hover:text-white-pure">
                                                {race.name}
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-1 p-6 md:p-8 md:px-12 flex-row items-center justify-between gap-6 md:gap-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-[10px] font-black text-primary-500 uppercase bg-black-pure px-2 py-0.5 group-hover:bg-white-pure group-hover:text-black-pure">
                                                {race.basics?.identifiers?.code || `R-${index + 1}`}
                                            </span>
                                            <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase group-hover:text-white-pure/40">
                                                {race.details.type?.replace('_', ' ') || 'RACE'}
                                            </span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-black-pure uppercase tracking-tighter leading-none group-hover:text-white-pure">
                                            {race.name}
                                        </h2>
                                        <p className="font-mono text-xs font-bold text-black-pure/60 group-hover:text-white-pure/60 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-secondary-500" />
                                            {(race.details.circuit as Circuit)?.name || 'LOCATION PENDING'}
                                        </p>
                                    </div>

                                    <div className="flex flex-col w-full md:w-auto justify-between md:justify-end md:items-end gap-2 text-right">
                                        <div className="flex flex-col items-end border-r-4 border-secondary-500 pr-4 group-hover:border-primary-500">
                                            <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase group-hover:text-white-pure/40">Distance</span>
                                            <span className="text-xl font-black text-black-pure group-hover:text-white-pure leading-none">
                                                {race.details.distance_km || '000'}<span className="text-xs ml-1 font-mono">KM</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end border-r-4 border-black-pure pr-4 group-hover:border-white-pure">
                                            <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase group-hover:text-white-pure/40">Laps</span>
                                            <span className="text-xl font-black text-black-pure group-hover:text-white-pure leading-none">
                                                {race.details.laps || '--'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:hidden p-3 border-t-2 border-black-pure group-hover:border-white-pure/20">
                                    <div className="flex-1 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-[8px] font-black text-black-pure/40 uppercase group-hover:text-white-pure/40">
                                                {race.details.type?.replace('_', ' ') || 'RACE'}
                                            </span>
                                            <p className="font-mono text-[10px] font-bold text-black-pure/60 group-hover:text-white-pure/60 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-secondary-500 shrink-0" />
                                                <span className="truncate">{(race.details.circuit as Circuit)?.name || 'LOCATION PENDING'}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <span className="font-mono text-[8px] font-black text-black-pure/40 uppercase group-hover:text-white-pure/40">Dist</span>
                                                <span className="text-sm font-black text-black-pure group-hover:text-white-pure">
                                                    {race.details.distance_km || '000'}<span className="text-[8px] ml-0.5">KM</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-mono text-[8px] font-black text-black-pure/40 uppercase group-hover:text-white-pure/40">Laps</span>
                                                <span className="text-sm font-black text-black-pure group-hover:text-white-pure">
                                                    {race.details.laps || '--'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex w-20 items-center justify-center p-6 md:p-0 border-t-2 md:border-t-0 md:border-l-2 border-black-pure group-hover:border-white-pure/20">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:text-primary-500 transition-colors">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                </div>

                                <div className="flex md:hidden w-full items-center justify-end p-3 border-t-2 border-black-pure group-hover:border-white-pure/20">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:text-primary-500 transition-colors">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                                    </svg>
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