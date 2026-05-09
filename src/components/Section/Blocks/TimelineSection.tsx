"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description?: string
  status?: 'completed' | 'active' | 'upcoming'
  image?: string
  slug?: string
  code?: string
  format?: string
}

interface TimelineLabels {
  statusPrefix: string
  eventIndexLabel: string
  deploymentStatus: {
    completed: string
    active: string
    upcoming: string
  }
}

interface TimelineSectionProps {
  id: string
  title: string
  subtitle: string
  events: TimelineEvent[]
  labels: TimelineLabels
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  id,
  title,
  subtitle,
  events = [],
  labels,
  headerVariant = 1,
  footerVariant = 1,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  const hasEvents = events.length > 0

  const timelineDays = useMemo(() => {
    if (!hasEvents) return []
    const dates = events.map((e) => new Date(e.date))
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
  }, [events, hasEvents])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasEvents) return
    setIsDragging(true)
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !hasEvents) return
    e.preventDefault()
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const stopDragging = () => setIsDragging(false)

  return (
    <section id={id} className="relative h-screen bg-background flex flex-col border-b border-black-pure overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan { animation: scan 4s linear infinite; }
      `}} />

      {hasEvents && (
        <div className="bg-white-pure border-b-2 border-black-pure">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(events.length).padStart(2, '0')}
          />
        </div>
      )}

      <div className="flex-1 relative bg-white-pure overflow-hidden">
        <div className="absolute left-0 right-0 bottom-24 md:bottom-32 h-px bg-black-pure/20 z-0" />

        {!hasEvents ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-[20%] bg-gradient-to-b from-transparent via-primary-500/5 to-transparent animate-scan" />
            </div>

            <div className="relative flex flex-col items-center">
              <div className="mb-6 flex items-center gap-3">
                <div className="size-2 bg-neutral-300 rounded-full" />
                <div className="h-px w-12 bg-neutral-200" />
                <div className="size-10 border-2 border-black-pure flex items-center justify-center rotate-45 bg-white-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="size-2 bg-primary-500 animate-pulse" />
                </div>
                <div className="h-px w-12 bg-neutral-200" />
                <div className="size-2 bg-neutral-300 rounded-full" />
              </div>

              <h3 className="font-mono text-2xl font-black text-black-pure uppercase tracking-tighter mb-2">
                {title}
              </h3>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest bg-white-pure border border-neutral-200 px-3 py-1 shadow-sm">
                {subtitle}
              </p>
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            className={`h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            <div className="flex h-full min-w-max relative pt-12 md:pt-20">
              {timelineDays.map((day, idx) => {
                const dateStr = day.toISOString().split('T')[0]
                const activeEvents = events.filter((e) => e.date === dateStr)
                const isFirstOfMonth = day.getDate() === 1

                return (
                  <div key={idx} className="relative w-24 md:w-32 xl:w-40 h-full flex flex-col border-r border-neutral-100">
                    {isFirstOfMonth && (
                      <div className="absolute top-4 left-4 z-0">
                        <span className="text-xl font-black text-neutral-200 uppercase italic tracking-tighter">
                          {day.toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                      <div className="w-px h-8 bg-black-pure mb-3" />
                      <span className="font-mono text-sm font-black text-black-pure mb-1">
                        {day.getDate().toString().padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400 uppercase font-bold tracking-widest">
                        {day.toLocaleString('default', { weekday: 'short' })}
                      </span>
                    </div>

                    <div className="absolute inset-x-2 bottom-[140px] md:bottom-[190px] pointer-events-none flex flex-col justify-end items-center">
                      {activeEvents.map((event) => (
                        <div key={event.id} className="relative flex flex-col items-center">
                          {event.slug && (
                            <Link
                              href={event.slug.startsWith('/') ? event.slug : `/${event.slug}`}
                              onMouseEnter={() => setHoveredEvent(event.id)}
                              onMouseLeave={() => setHoveredEvent(null)}
                              className="group/card relative pointer-events-auto"
                              style={{ zIndex: hoveredEvent === event.id ? 50 : 20 }}
                            >
                              <div className={`w-64 md:w-80 transition-all duration-500 border-2 border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${hoveredEvent === event.id ? 'bg-primary-500 -translate-y-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]' : 'bg-white-pure'}`}>
                                <div className="flex justify-between items-center p-3 border-b-2 border-black-pure bg-neutral-50 group-hover/card:bg-primary-600 transition-colors">
                                  <span className="font-mono text-[10px] font-black text-black-pure px-2 py-0.5 bg-white-pure border border-black-pure shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                                    {event.code || labels.eventIndexLabel}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[8px] font-bold text-black-pure uppercase opacity-50 group-hover/card:text-white-pure group-hover/card:opacity-100">
                                      {event.status ? labels.deploymentStatus[event.status] : ''}
                                    </span>
                                    <div className={`size-3 rounded-none rotate-45 border border-black-pure ${event.status === 'active' ? 'bg-primary-500 animate-pulse' : 'bg-neutral-300'}`} />
                                  </div>
                                </div>
                                {event.image && (
                                  <div className="relative aspect-video w-full overflow-hidden border-b-2 border-black-pure grayscale group-hover/card:grayscale-0 transition-all">
                                    <Image src={event.image} alt={event.title} fill className="object-cover" sizes="320px" />
                                  </div>
                                )}
                                <div className="p-4">
                                  <h3 className="text-sm md:text-base font-black text-black-pure uppercase tracking-tighter leading-none group-hover/card:text-white-pure">
                                    {event.title}
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          )}
                          <div className={`w-0.5 transition-all duration-500 bg-black-pure ${hoveredEvent === event.id ? 'h-16 bg-primary-500' : 'h-8 opacity-20'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {hasEvents && (
        <>
          <div className="h-24 md:h-32 bg-white-pure border-t-2 border-black-pure flex divide-x-2 divide-black-pure shrink-0">
            <div className="w-48 md:w-80 p-4 md:p-6 flex flex-col justify-center bg-neutral-50">
              <span className="font-mono text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{labels.statusPrefix}</span>
              <p className="text-xs md:text-sm font-black text-black-pure uppercase tracking-tighter truncate">
                {isDragging ? labels.statusPrefix : title}
              </p>
            </div>

            <div className="flex-1 p-4 md:p-6 flex items-center justify-between bg-black-pure text-white-pure">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1">
                  {labels.eventIndexLabel}
                </span>
                <span className="text-sm md:text-xl font-black uppercase truncate tracking-tighter">
                  {hoveredEvent ? events.find(e => e.id === hoveredEvent)?.title : subtitle}
                </span>
              </div>

              <div className="flex items-center gap-6 border-l border-white-pure/20 pl-6 h-full">
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Σ</span>
                  <span className="text-xl md:text-2xl font-black text-primary-500 leading-none">
                    {String(events.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <SectionFooter variant={footerVariant} />
        </>
      )}
    </section>
  )
}

export default TimelineSection;