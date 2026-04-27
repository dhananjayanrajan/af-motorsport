"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface TimelineEvent {
  id: string
  date: string // Expected format: YYYY-MM-DD
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

  // Generate date range based on events
  const timelineDays = useMemo(() => {
    if (events.length === 0) return []
    const dates = events.map((e) => new Date(e.date))
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))

    // Add padding days
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
    <section id={id} className="relative w-full h-screen bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
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

      <div className="flex-1 relative bg-white-pure overflow-hidden group/container">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/grid.svg')] bg-[length:40px_40px]" />

        {/* Horizontal Timeline Line */}
        <div className="absolute left-0 right-0 bottom-32 h-px bg-black-pure z-0" />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className={`h-full w-full overflow-x-auto overflow-y-hidden no-scrollbar select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <div className="flex h-full min-w-max relative pt-20">
            {timelineDays.map((day, idx) => {
              const dateStr = day.toISOString().split('T')[0]
              const activeEvents = events.filter((e) => e.date === dateStr)
              const isFirstOfMonth = day.getDate() === 1

              return (
                <div key={idx} className="relative w-24 md:w-32 h-full flex flex-col border-r border-black-pure/5">
                  {/* Month Label */}
                  {isFirstOfMonth && (
                    <div className="absolute -top-10 left-2 z-0">
                      <span className="text-5xl font-black text-black-pure uppercase opacity-10 italic">
                        {day.toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                  )}

                  {/* Day Label & Marker */}
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="w-px h-8 bg-black-pure mb-2" />
                    <span className="font-mono text-xs font-black text-black-pure">
                      {day.getDate().toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[8px] text-black-pure/40 uppercase font-bold">
                      {day.toLocaleString('default', { weekday: 'short' })}
                    </span>
                  </div>

                  {/* Event Cards Projection */}
                  <div className="absolute inset-x-1 bottom-44 pointer-events-none flex flex-col justify-end gap-6">
                    {activeEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={event.slug ? `/competition/championships/${event.slug}` : '#'}
                        onMouseEnter={() => setHoveredEvent(event.id)}
                        onMouseLeave={() => setHoveredEvent(null)}
                        className="group/card relative pointer-events-auto"
                        style={{ zIndex: hoveredEvent === event.id ? 50 : 20 }}
                      >
                        <div className={`w-52 md:w-64 p-4 transition-all duration-300 border-2 border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${hoveredEvent === event.id ? 'bg-primary-500 -translate-y-4' : 'bg-white-pure hover:border-primary-500'}`}>
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-mono text-[10px] font-black bg-black-pure text-white-pure px-2 py-0.5 uppercase tracking-tighter">
                              {event.code || 'EVT'}
                            </span>
                            <div className={`size-2 rounded-full ${event.status === 'active' ? 'bg-primary-500' : 'bg-black-pure/20'}`} />
                          </div>

                          <h3 className="text-sm font-black text-black-pure uppercase tracking-tighter leading-tight mb-3 line-clamp-1">
                            {event.title}
                          </h3>

                          {event.image && (
                            <div className="relative aspect-video w-full overflow-hidden border border-black-pure mb-3 transition-all duration-500 group-hover/card:grayscale-0">
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                sizes="250px"
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] font-black text-black-pure uppercase opacity-60">
                              {event.format || 'Standard'}
                            </span>
                            <div className="size-6 border border-black-pure flex items-center justify-center group-hover/card:bg-black-pure group-hover/card:text-white-pure transition-colors">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                              </svg>
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

      {/* Control Bar Footer */}
      <div className="h-24 bg-white-pure border-t border-black-pure flex divide-x divide-black-pure shrink-0">
        <div className="w-48 md:w-64 p-4 flex flex-col justify-center bg-white-pure">
          <span className="font-mono text-[9px] font-black text-black-pure uppercase opacity-40">System Status</span>
          <p className="text-xs font-black text-black-pure uppercase tracking-tighter leading-none">
            {isDragging ? 'Translating Timeline...' : 'Timeline Ready'}
          </p>
        </div>

        <div className="flex-1 p-4 flex items-center justify-between bg-black-pure overflow-hidden">
          <div className="flex flex-col min-w-0 mr-8">
            <span className="font-mono text-[9px] font-black text-primary-500 uppercase tracking-widest">
              {hoveredEvent ? 'Focus Entry' : 'Timeline Overview'}
            </span>
            <span className="text-sm md:text-base font-black text-white-pure uppercase truncate tracking-tighter">
              {hoveredEvent ? events.find((e) => e.id === hoveredEvent)?.title : subtitle}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-end">
              <span className="font-mono text-[9px] font-black text-white-pure/40 uppercase">Total Events</span>
              <span className="text-2xl font-black text-primary-500 leading-none">{events.length}</span>
            </div>
          </div>
        </div>
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default TimelineSection;