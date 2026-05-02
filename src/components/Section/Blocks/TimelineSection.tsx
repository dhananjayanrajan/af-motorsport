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

  const timelineDays = useMemo(() => {
    if (events.length === 0) return []
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
  }, [events])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
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
      `}} />

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(events.length).padStart(2, '0')}
      />

      <div className="flex-1 relative bg-white-pure overflow-hidden">
        <div className="absolute left-0 right-0 bottom-24 md:bottom-32 h-px bg-black-pure z-0" />

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
                <div key={idx} className="relative w-20 md:w-32 xl:w-40 h-full flex flex-col border-r border-neutral-200">
                  {isFirstOfMonth && (
                    <div className="absolute -top-8 md:-top-12 left-2 md:left-4 z-0">
                      <span className="text-lg md:text-2xl font-black text-neutral-300 uppercase italic leading-none tracking-tighter">
                        {day.toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="w-px h-6 md:h-10 bg-black-pure mb-2 md:mb-4" />
                    <span className="font-mono text-xs md:text-sm font-black text-black-pure leading-none mb-1">
                      {day.getDate().toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-neutral-500 uppercase font-bold tracking-widest leading-none">
                      {day.toLocaleString('default', { weekday: 'short' })}
                    </span>
                  </div>

                  <div className="absolute inset-x-2 bottom-[140px] md:bottom-[190px] pointer-events-none flex flex-col justify-end items-center">
                    {activeEvents.map((event) => {
                      if (!event.slug) return null;
                      return (
                        <div key={event.id} className="relative flex flex-col items-center">
                          <Link
                            href={event.slug.startsWith('/') ? event.slug : `/${event.slug}`}
                            onMouseEnter={() => setHoveredEvent(event.id)}
                            onMouseLeave={() => setHoveredEvent(null)}
                            className="group/card relative pointer-events-auto"
                            style={{ zIndex: hoveredEvent === event.id ? 50 : 20 }}
                          >
                            <div className={`w-56 md:w-80 p-0 transition-all duration-500 border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${hoveredEvent === event.id ? 'bg-primary-500 -translate-y-4 md:-translate-y-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]' : 'bg-white-pure'}`}>

                              <div className="flex justify-between items-center p-3 md:p-4 border-b-2 border-black-pure bg-neutral-50 group-hover/card:bg-primary-600 transition-colors">
                                <span className="font-mono text-xs font-black text-black-pure px-2 py-0.5 bg-white-pure border border-black-pure shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-tighter">
                                  {event.code || 'EVT'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] font-bold text-black-pure uppercase opacity-50 group-hover/card:text-white-pure group-hover/card:opacity-100">
                                    {event.status}
                                  </span>
                                  <div className={`size-2.5 md:size-3 rounded-none rotate-45 border border-black-pure ${event.status === 'active' ? 'bg-primary-500 animate-pulse' : 'bg-neutral-300'}`} />
                                </div>
                              </div>

                              {event.image && (
                                <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-black-pure grayscale hover:grayscale-0 transition-all duration-700">
                                  <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover scale-105 group-hover/card:scale-100 transition-transform duration-1000"
                                    sizes="(max-width: 768px) 224px, 320px"
                                  />
                                </div>
                              )}

                              <div className="p-3 md:p-5">
                                <h3 className="text-sm md:text-base font-black text-black-pure uppercase tracking-tighter leading-[1.1] mb-3 group-hover/card:text-white-pure">
                                  {event.title}
                                </h3>

                                <div className="flex items-center justify-between pt-3 border-t border-black-pure/10 group-hover/card:border-white-pure/20">
                                  <div className="flex flex-col">
                                    <span className="font-mono text-[8px] md:text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none group-hover/card:text-white-pure/60 mb-1">
                                      Format
                                    </span>
                                    <span className="font-mono text-[10px] md:text-xs font-black text-black-pure uppercase leading-none group-hover/card:text-white-pure">
                                      {event.format || 'Standard'}
                                    </span>
                                  </div>
                                  <div className="size-8 md:size-10 bg-black-pure text-white-pure flex items-center justify-center group-hover/card:bg-white-pure group-hover/card:text-primary-600 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover/card:shadow-none group-hover/card:translate-x-0.5 group-hover/card:translate-y-0.5">
                                    <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                      <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>

                          <div className={`w-0.5 transition-all duration-500 origin-bottom bg-black-pure ${hoveredEvent === event.id ? 'h-12 md:h-20 bg-primary-500' : 'h-6 md:h-10 opacity-30'}`} />
                          <div className={`size-3 md:size-4 border-2 border-black-pure rotate-45 transition-all duration-500 ${hoveredEvent === event.id ? 'bg-primary-500 scale-125' : 'bg-white-pure'}`} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="min-h-24 md:min-h-32 bg-white-pure border-t-2 border-black-pure flex divide-x-2 divide-black-pure shrink-0">
        <div className="w-1/3 md:w-80 p-4 md:p-6 flex flex-col justify-center bg-neutral-100">
          <span className="font-mono text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-widest mb-1 md:mb-2 leading-none">System Status</span>
          <p className="text-xs md:text-sm font-black text-black-pure uppercase tracking-tighter leading-none truncate">
            {isDragging ? 'Translating' : 'Timeline Ready'}
          </p>
        </div>

        <div className="flex-1 p-4 md:p-6 flex items-center justify-between bg-black-pure overflow-hidden">
          <div className="flex flex-col min-w-0 flex-1 mr-4 md:mr-12">
            <span className="font-mono text-[10px] md:text-xs font-black text-primary-500 uppercase tracking-widest mb-1 md:mb-2 leading-none">
              {hoveredEvent ? 'Focus' : 'Overview'}
            </span>
            <span className="text-xs md:text-xl font-black text-white-pure uppercase truncate tracking-tighter leading-none">
              {hoveredEvent ? events.find((e) => e.id === hoveredEvent)?.title : subtitle}
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] md:text-xs font-black text-neutral-400 uppercase tracking-widest mb-1 md:mb-2 leading-none">Total</span>
              <span className="text-lg md:text-2xl font-black text-primary-500 leading-none">{events.length}</span>
            </div>
          </div>
        </div>
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default TimelineSection;