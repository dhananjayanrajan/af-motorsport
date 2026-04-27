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
    <section id={id} className="relative w-full h-screen bg-background flex flex-col border-b border-black-pure overflow-hidden">
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

                  <div className="absolute inset-x-2 bottom-36 md:bottom-48 pointer-events-none flex flex-col justify-end gap-6 md:gap-10">
                    {activeEvents.map((event) => {
                      if (!event.slug) return null;
                      return (
                        <Link
                          key={event.id}
                          href={`/calendar/championships/${event.slug}`}
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                          className="group/card relative pointer-events-auto"
                          style={{ zIndex: hoveredEvent === event.id ? 50 : 20 }}
                        >
                          <div className={`w-48 md:w-72 p-3 md:p-5 transition-all duration-300 border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${hoveredEvent === event.id ? 'bg-primary-500 -translate-y-2 md:-translate-y-4' : 'bg-white-pure hover:border-primary-500'}`}>
                            <div className="flex justify-between items-center mb-2 md:mb-4">
                              <span className="font-mono text-[10px] md:text-xs font-black bg-black-pure text-white-pure px-1.5 md:px-2 py-0.5 md:py-1 uppercase tracking-tighter leading-none">
                                {event.code || 'EVT'}
                              </span>
                              <div className={`size-2 md:size-3 rounded-full ${event.status === 'active' ? 'bg-primary-500' : 'bg-neutral-200'}`} />
                            </div>

                            <h3 className="text-xs md:text-sm font-black text-black-pure uppercase tracking-tighter leading-tight mb-2 md:mb-4 line-clamp-2">
                              {event.title}
                            </h3>

                            {event.image && (
                              <div className="relative aspect-video w-full overflow-hidden border-2 border-black-pure mb-2 md:mb-4 bg-neutral-100">
                                <Image
                                  src={event.image}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 192px, 288px"
                                />
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[8px] md:text-xs font-black text-neutral-600 uppercase tracking-widest leading-none">
                                {event.format || 'Standard'}
                              </span>
                              <div className="size-6 md:size-8 border-2 border-black-pure flex items-center justify-center group-hover/card:bg-black-pure group-hover/card:text-white-pure transition-colors">
                                <svg className="w-2 md:w-3 h-2 md:h-3" viewBox="0 0 24 24" fill="none">
                                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
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