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

    const championshipsWithDates = championships.filter(c => c.details?.start_date)

    const timelineDays = useMemo(() => {
        if (championshipsWithDates.length === 0) return []

        const dates = championshipsWithDates.map(c => new Date(c.details?.start_date || ''))
        const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
        const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))

        minDate.setDate(minDate.getDate() - 7)
        maxDate.setDate(maxDate.getDate() + 7)

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
            const walk = (x - startX) * 2
            scrollRef.current.scrollLeft = scrollLeft - walk
        }
    }

    if (championshipsWithDates.length === 0) {
        return (
            <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
                <div className="h-32 border-b-2 border-black-pure flex divide-x-2 divide-black-pure bg-white-pure">
                    <div className="w-32 flex flex-col items-center justify-center bg-black-pure text-white-pure">
                        <span className="font-mono text-xs font-black">{new Date().getFullYear()}</span>
                        <span className="text-4xl font-black italic">CAL</span>
                    </div>
                    <div className="flex-1 px-8 flex items-center justify-between bg-primary-500">
                        <h2 className="text-xl md:text-3xl font-black text-black-pure uppercase tracking-tighter">
                            Championship Calendar
                        </h2>
                        <div className="hidden md:flex gap-4">
                            <div className="size-8 bg-black-pure" />
                            <div className="size-8 bg-secondary-500" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="size-32 bg-black-pure mx-auto mb-8" />
                        <p className="font-mono text-xl font-black text-black-pure uppercase">
                            No championships scheduled
                        </p>
                        <p className="font-mono text-sm text-black-pure/40 uppercase mt-2">
                            Check back later for upcoming events
                        </p>
                    </div>
                </div>
                <SectionFooter />
            </section>
        )
    }

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <div className="h-32 border-b-2 border-black-pure flex divide-x-2 divide-black-pure bg-white-pure shrink-0">
                <div className="w-32 flex flex-col items-center justify-center bg-black-pure text-white-pure">
                    <span className="font-mono text-xs font-black">{new Date().getFullYear()}</span>
                    <span className="text-3xl font-black italic">CAL</span>
                </div>
                <div className="flex-1 px-8 flex items-center justify-between bg-primary-500">
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-black text-black-pure uppercase tracking-tighter">
                        Championship Calendar
                    </h2>
                    <div className="hidden md:flex gap-4">
                        <div className="size-8 bg-black-pure" />
                        <div className="size-8 bg-secondary-500" />
                    </div>
                </div>
            </div>

            <div className="flex-1 relative flex flex-col min-h-0">
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0Z' fill='none' stroke='black' stroke-width='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                />

                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex-1 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none' }}
                >
                    <div className="flex h-full min-w-max relative pt-16 pb-8">
                        {timelineDays.map((day, idx) => {
                            const dateStr = day.toISOString().split('T')[0]
                            const activeEvents = championshipsWithDates.filter(c => {
                                const startDate = c.details?.start_date
                                return startDate && startDate.startsWith(dateStr)
                            })
                            const isFirstOfMonth = day.getDate() === 1

                            return (
                                <div key={idx} className="relative w-36 md:w-44 h-full flex flex-col items-center">
                                    {isFirstOfMonth && (
                                        <div className="absolute -top-8 left-2">
                                            <span className="text-5xl font-black text-black-pure uppercase tracking-tighter opacity-15">
                                                {day.toLocaleString('default', { month: 'short' })}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex-1 flex flex-col items-center justify-end pb-8">
                                        <span className="font-mono text-sm font-black text-black-pure">
                                            {day.getDate().toString().padStart(2, '0')}
                                        </span>
                                        <span className="font-mono text-[10px] text-black-pure/40 uppercase mt-1">
                                            {day.toLocaleString('default', { weekday: 'short' })}
                                        </span>
                                        <div className="w-0.5 h-8 bg-black-pure/20 mt-2" />
                                    </div>

                                    <div className="absolute top-8 left-0 right-0 flex flex-col px-2">
                                        {activeEvents.map((event, eventIdx) => (
                                            <Link
                                                key={event.id}
                                                href={`/competition/championships/${event.slug}`}
                                                onMouseEnter={() => setHoveredEvent(event.id)}
                                                onMouseLeave={() => setHoveredEvent(null)}
                                                className="group/card relative"
                                                style={{
                                                    zIndex: hoveredEvent === event.id ? 50 : 10 + eventIdx,
                                                    marginTop: eventIdx > 0 ? '-100%' : '0'
                                                }}
                                            >
                                                <div
                                                    className={`
                                                        w-64 md:w-72 p-5 transition-all duration-300 relative cursor-pointer
                                                        border-4 border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                                                        ${hoveredEvent === event.id
                                                            ? 'bg-secondary-500 -translate-y-2 -translate-x-1 scale-105'
                                                            : 'bg-white-pure hover:bg-primary-500'
                                                        }
                                                    `}
                                                >
                                                    <div className="absolute -top-3 -right-3 size-8 bg-black-pure flex items-center justify-center">
                                                        <span className="text-white-pure font-mono text-xs font-black">
                                                            {String(eventIdx + 1).padStart(2, '0')}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="font-mono text-[11px] font-black bg-black-pure text-white-pure px-3 py-1 uppercase">
                                                                {event.basics?.identifiers?.code || event.basics?.identifiers?.abbreviation || 'CH'}
                                                            </span>
                                                        </div>
                                                        <div className={`size-4 border-2 border-black-pure transition-all duration-300 ${hoveredEvent === event.id ? 'bg-primary-500 rotate-45' : 'bg-transparent'}`} />
                                                    </div>

                                                    <h3 className="text-lg font-black text-black-pure uppercase tracking-tighter leading-tight mb-3 line-clamp-2 group-hover/card:text-black-pure">
                                                        {event.name}
                                                    </h3>

                                                    <div className="relative aspect-video w-full overflow-hidden border-2 border-black-pure mb-4">
                                                        <Image
                                                            src={(event.assets?.thumbnail as Media)?.url || (event.assets?.cover as Media)?.url || `https://picsum.photos/seed/${event.id}/400/300`}
                                                            alt={event.name}
                                                            fill
                                                            className="object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                                                            sizes="288px"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black-pure/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-col">
                                                            <span className="font-mono text-[9px] font-black text-black-pure/40 uppercase">Format</span>
                                                            <span className="font-mono text-[11px] font-black text-black-pure uppercase">
                                                                {event.details?.format || 'Championship'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-0.5 bg-black-pure" />
                                                            <div className="size-6 border-2 border-black-pure flex items-center justify-center group-hover/card:bg-black-pure group-hover/card:text-white-pure transition-colors">
                                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />
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

            <div className="h-32 bg-white-pure border-t-2 border-black-pure flex divide-x-2 divide-black-pure overflow-hidden shrink-0">
                <div className="w-1/2 md:w-1/3 p-6 flex flex-col justify-between bg-white-pure hover:bg-primary-500 transition-colors duration-500 group/footer">
                    <span className="font-mono text-[10px] font-black text-black-pure uppercase group-hover/footer:text-black-pure">Navigation</span>
                    <p className="text-base font-black text-black-pure uppercase tracking-tighter leading-tight group-hover/footer:text-black-pure">
                        Drag to explore timeline
                    </p>
                </div>
                <div className="flex-1 p-6 flex items-center justify-between bg-black-pure">
                    <div className="flex flex-col min-w-0 flex-1 mr-4">
                        <span className="font-mono text-[10px] font-black text-secondary-500 uppercase">Selected</span>
                        <span className="text-lg font-black text-white-pure uppercase tracking-tighter truncate">
                            {hoveredEvent ? championships.find(c => c.id === hoveredEvent)?.name : 'Hover over an event'}
                        </span>
                    </div>
                    <div className="size-16 bg-primary-500 flex items-center justify-center shrink-0 relative overflow-hidden group/count">
                        <span className="text-black-pure font-black text-2xl relative z-10">
                            {championshipsWithDates.length}
                        </span>
                        <div className="absolute inset-0 bg-secondary-500 translate-y-full group-hover/count:translate-y-0 transition-transform duration-300" />
                    </div>
                </div>
            </div>

            <SectionFooter />
        </section>
    )
}

export default ChampionshipCalendar