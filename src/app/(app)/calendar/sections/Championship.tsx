"use client"

import SectionFooter from '@/components/Section/Footer'
import { Championship, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useRef, useState } from 'react'

interface ChampionshipCalendarProps {
    championships: Championship[]
}

const ChampionshipCalendar: React.FC<ChampionshipCalendarProps> = ({ championships = [] }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

    const championshipsWithDates = championships.filter((c) => c.details?.start_date)

    const timelineDays = useMemo(() => {
        if (championshipsWithDates.length === 0) return []
        const dates = championshipsWithDates.map((c) => new Date(c.details?.start_date || ''))
        const minDate = new Date(Math.min(...dates.map((d) => d.getTime())))
        const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))
        minDate.setDate(minDate.getDate() - 5)
        maxDate.setDate(maxDate.getDate() + 10)
        const days = []
        const current = new Date(minDate)
        while (current <= maxDate) {
            days.push(new Date(current))
            current.setDate(current.getDate() + 1)
        }
        return days
    }, [championshipsWithDates])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        if (scrollRef.current) {
            setStartX(e.pageX - scrollRef.current.offsetLeft)
            setScrollLeft(scrollRef.current.scrollLeft)
        }
    }

    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        if (scrollRef.current) {
            const x = e.pageX - scrollRef.current.offsetLeft
            const walk = (x - startX) * 1.5
            scrollRef.current.scrollLeft = scrollLeft - walk
        }
    }

    return (
        <section className="relative w-full h-screen bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

            <div className="h-16 md:h-20 border-b border-black-pure flex bg-white-pure shrink-0">
                <div className="w-16 md:w-20 flex flex-col items-center justify-center bg-black-pure text-white-pure border-r border-black-pure">
                    <span className="font-mono text-[9px] font-black">{new Date().getFullYear()}</span>
                    <span className="text-xl font-race font-black italic">CAL</span>
                </div>
                <div className="flex-1 px-6 flex items-center justify-between bg-primary-500">
                    <h2 className="text-base md:text-xl font-race font-black text-black-pure uppercase tracking-tighter">
                        Championship Timeline
                    </h2>
                    <div className="flex gap-2">
                        <div className="size-4 bg-black-pure" />
                        <div className="size-4 bg-secondary-500" />
                    </div>
                </div>
            </div>

            <div className="flex-1 relative bg-white-pure overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('/grid.svg')] bg-[length:40px_40px]" />

                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab active:cursor-grabbing select-none"
                >
                    <div className="flex h-full min-w-max relative">
                        {timelineDays.map((day, idx) => {
                            const dateStr = day.toISOString().split('T')[0]
                            const activeEvents = championshipsWithDates.filter((c) => {
                                const startDate = c.details?.start_date
                                return startDate && startDate.startsWith(dateStr)
                            })
                            const isFirst = day.getDate() === 1

                            return (
                                <div key={idx} className="relative w-28 md:w-32 h-full flex flex-col border-r border-black-pure/5">
                                    {isFirst && (
                                        <div className="absolute top-4 left-2 z-0">
                                            <span className="text-4xl font-race font-black text-black-pure uppercase opacity-10">
                                                {day.toLocaleString('default', { month: 'short' })}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex-1" />

                                    <div className="h-24 flex flex-col items-center justify-center shrink-0">
                                        <div className="w-px h-8 bg-black-pure/20 mb-2" />
                                        <span className="font-mono text-xs font-black text-black-pure">
                                            {day.getDate().toString().padStart(2, '0')}
                                        </span>
                                        <span className="font-mono text-[8px] text-black-pure/40 uppercase font-bold">
                                            {day.toLocaleString('default', { weekday: 'short' })}
                                        </span>
                                    </div>

                                    <div className="absolute inset-x-1 top-20 bottom-24 pointer-events-none flex flex-col justify-center">
                                        {activeEvents.map((event, eIdx) => (
                                            <Link
                                                key={event.id}
                                                href={`/competition/championships/${event.slug}`}
                                                onMouseEnter={() => setHoveredEvent(event.id)}
                                                onMouseLeave={() => setHoveredEvent(null)}
                                                className="group relative pointer-events-auto"
                                                style={{ zIndex: hoveredEvent === event.id ? 50 : 10 + eIdx }}
                                            >
                                                <div className={`w-52 md:w-60 p-4 transition-all duration-300 border border-black-pure shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${hoveredEvent === event.id ? 'bg-secondary-500 -translate-y-2' : 'bg-white-pure hover:bg-primary-500'}`}>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="font-mono text-[9px] font-black bg-black-pure text-white-pure px-2 py-0.5 uppercase">
                                                            {event.basics?.identifiers?.code || 'CH'}
                                                        </span>
                                                        <div className="size-3 border border-black-pure group-hover:bg-black-pure transition-colors" />
                                                    </div>
                                                    <h3 className="text-xs md:text-sm font-race font-black text-black-pure uppercase tracking-tighter leading-tight mb-3 truncate">{event.name}</h3>
                                                    <div className="relative aspect-video w-full overflow-hidden border border-black-pure mb-3 group-hover:grayscale-0 transition-all duration-500">
                                                        <Image src={(event.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${event.id}/300/200`} alt={event.name} fill className="object-cover" sizes="240px" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-[8px] font-black text-black-pure uppercase opacity-60">{event.details?.format || 'Standard'}</span>
                                                        <div className="size-6 border border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-colors">
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="h-20 bg-white-pure border-t border-black-pure flex divide-x border-black-pure shrink-0">
                <div className="w-1/3 p-4 flex flex-col justify-center bg-white-pure">
                    <span className="font-mono text-[8px] font-black text-black-pure uppercase opacity-40">Timeline Lock</span>
                    <p className="text-[10px] font-race font-black text-black-pure uppercase leading-none">Scroll Disabled</p>
                </div>
                <div className="flex-1 p-4 flex items-center justify-between bg-black-pure">
                    <div className="flex flex-col min-w-0 mr-4">
                        <span className="font-mono text-[8px] font-black text-secondary-500 uppercase">Selected Event</span>
                        <span className="text-xs font-race font-black text-white-pure uppercase truncate">
                            {hoveredEvent ? championships.find((c) => c.id === hoveredEvent)?.name : '---'}
                        </span>
                    </div>
                    <div className="h-full aspect-square bg-primary-500 flex items-center justify-center border border-black-pure">
                        <span className="text-black-pure font-race font-black text-lg">{championshipsWithDates.length}</span>
                    </div>
                </div>
            </div>

            <SectionFooter />
        </section>
    )
}

export default ChampionshipCalendar