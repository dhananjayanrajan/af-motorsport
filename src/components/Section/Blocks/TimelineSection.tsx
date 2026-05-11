"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionModal from '../Components/SectionModal'

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
  const [modalOpen, setModalOpen] = useState(false)
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null)

  const displayEvents = events.slice(0, 20)

  const hasEvents = displayEvents.length > 0

  const timelineDays = useMemo(() => {
    if (!hasEvents) return []
    const dates = displayEvents.map((e) => new Date(e.date))
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
  }, [displayEvents, hasEvents])

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

  const openModal = (event: TimelineEvent) => {
    setActiveEvent(event)
    setModalOpen(true)
  }

  return (
    <section id={id} className="relative min-h-[800px] md:h-screen bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
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
        <div className="absolute left-0 right-0 bottom-24 md:bottom-32 h-px bg-black-pure z-0" />

        {!hasEvents ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white-pure">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-[20%] bg-gradient-to-b from-transparent via-primary-500/10 to-transparent animate-scan" />
            </div>

            {/* Visual Indicator of Zero Data */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-black-pure opacity-[0.03] select-none pointer-events-none uppercase italic tracking-tighter">
              00
            </div>

            <div className="relative flex flex-col items-center z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="size-2 bg-black-pure" />
                <div className="h-px w-12 bg-black-pure" />
                <div className="size-10 border-2 border-black-pure flex items-center justify-center rotate-45 bg-white-pure">
                  <div className="size-2 bg-primary-500 animate-pulse" />
                </div>
                <div className="h-px w-12 bg-black-pure" />
                <div className="size-2 bg-black-pure" />
              </div>

              {/* Status Badge */}
              <div className="mb-8 px-4 py-1.5 bg-black-pure text-white-pure text-[10px] font-mono font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="size-1.5 bg-primary-500 rounded-full" />
                No Content Available
                <span className="size-1.5 bg-primary-500 rounded-full" />
              </div>

              <h3 className="font-mono text-3xl font-black text-black-pure uppercase tracking-tighter mb-4 text-center">
                {title}
              </h3>

              <div className="flex flex-col items-center gap-2">
                <p className="font-mono text-[10px] text-black-pure/40 uppercase tracking-widest font-black">
                  Directory: {id}
                </p>
                <p className="font-mono text-xs text-black-pure uppercase tracking-widest bg-white-pure border-2 border-black-pure px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {subtitle}
                </p>
              </div>
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
                const activeEvents = displayEvents.filter((e) => e.date === dateStr)
                const isFirstOfMonth = day.getDate() === 1

                return (
                  <div key={idx} className="relative w-24 md:w-32 xl:w-40 h-full flex flex-col border-r border-black-pure">
                    {isFirstOfMonth && (
                      <div className="absolute top-4 left-4 z-0">
                        <span className="text-xl font-black text-black-pure uppercase tracking-tighter">
                          {day.toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                      <div className="w-px h-8 bg-black-pure mb-3" />
                      <span className="font-mono text-sm font-black text-black-pure mb-1">
                        {day.getDate().toString().padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs text-black-pure uppercase font-bold tracking-widest">
                        {day.toLocaleString('default', { weekday: 'short' })}
                      </span>
                    </div>

                    <div className="absolute inset-x-2 bottom-[140px] md:bottom-[190px] pointer-events-none flex items-end justify-center">
                      {activeEvents.map((event, eIdx) => (
                        <div
                          key={event.id}
                          className="absolute flex flex-col items-center"
                          style={{
                            transform: `translateX(${eIdx * 20}px)`,
                            zIndex: hoveredEvent === event.id ? 100 : 20 + eIdx
                          }}
                        >
                          <div className="group/dot relative pointer-events-auto cursor-pointer"
                            onClick={() => openModal(event)}
                            onMouseEnter={() => setHoveredEvent(event.id)}
                            onMouseLeave={() => setHoveredEvent(null)}
                          >
                            <div className={`size-4 md:size-6 border-2 border-black-pure rotate-45 transition-all duration-300 ${hoveredEvent === event.id ? 'bg-primary-500 scale-125' : 'bg-white-pure'}`} />

                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 md:w-80 transition-all duration-300 border-2 border-black-pure overflow-hidden bg-white-pure shadow-xl ${hoveredEvent === event.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                              <div className="flex justify-between items-center p-3 border-b-2 border-black-pure bg-primary-500">
                                <span className="font-mono text-[10px] font-black text-black-pure px-2 py-0.5 bg-white-pure border border-black-pure uppercase">
                                  {event.code || labels.eventIndexLabel}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] font-bold text-black-pure uppercase">
                                    {event.status ? labels.deploymentStatus[event.status] : ''}
                                  </span>
                                  <div className={`size-2 rotate-45 border border-black-pure ${event.status === 'active' ? 'bg-white-pure' : 'bg-black-pure'}`} />
                                </div>
                              </div>
                              {event.image && (
                                <div className="relative aspect-video w-full overflow-hidden border-b-2 border-black-pure">
                                  <Image src={event.image} alt={event.title} fill className="object-cover" sizes="320px" />
                                </div>
                              )}
                              <div className="p-4">
                                <h3 className="text-sm font-black text-black-pure uppercase tracking-tighter leading-none">
                                  {event.title}
                                </h3>
                                {event.description && (
                                  <p className="mt-2 text-[10px] font-mono text-black-pure uppercase line-clamp-2">
                                    {event.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-black-pure text-white-pure px-2 py-1 text-[10px] font-mono uppercase tracking-tighter transition-opacity duration-300 ${hoveredEvent === event.id ? 'opacity-0' : 'opacity-100'}`}>
                              {event.title.substring(0, 15)}...
                            </div>
                          </div>
                          <div className={`w-0.5 transition-all duration-500 bg-black-pure ${hoveredEvent === event.id ? 'h-24 bg-primary-500' : 'h-12'}`} />
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
            <div className="w-48 md:w-80 p-4 md:p-6 flex flex-col justify-center bg-white-pure">
              <span className="font-mono text-xs font-black text-black-pure uppercase tracking-widest mb-1">{labels.statusPrefix}</span>
              <p className="text-xs md:text-sm font-black text-black-pure uppercase tracking-tighter truncate">
                {isDragging ? labels.statusPrefix : title}
              </p>
            </div>

            <div className="flex-1 p-4 md:p-6 flex items-center justify-between bg-black-pure text-white-pure">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-xs font-black text-primary-500 uppercase tracking-widest mb-1">
                  {labels.eventIndexLabel}
                </span>
                <span className="text-sm md:text-xl font-black uppercase truncate tracking-tighter">
                  {hoveredEvent ? displayEvents.find(e => e.id === hoveredEvent)?.title : subtitle}
                </span>
              </div>

              <div className="flex items-center gap-6 border-l border-white-pure pl-6 h-full">
                <div className="flex flex-col items-end">
                  <span className="font-mono text-xs font-black text-white-pure uppercase tracking-widest mb-1">Total</span>
                  <span className="text-xl md:text-2xl font-black text-primary-500 leading-none">
                    {String(events.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {events.length > 20 && (
            <div className="w-full bg-white-pure border-t-2 border-black-pure flex items-center justify-center py-4">
              <Link href="/calendar/timelines" className="text-xs font-mono font-black text-black-pure uppercase tracking-widest hover:text-primary-500 transition-colors">
                View Complete Timeline ({events.length - 20} more)
              </Link>
            </div>
          )}
          <SectionFooter variant={footerVariant} />
        </>
      )}

      <SectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={activeEvent?.title || ''}
        description={activeEvent?.description || ''}
        imageUrl={activeEvent?.image || ''}
        idCode={activeEvent?.code || ''}
        stats={[
          { label: 'Date', val: activeEvent?.date || '', color: 'bg-primary-500' },
          { label: 'Status', val: activeEvent?.status || '', color: 'bg-black-pure' }
        ]}
        buttonLabel={activeEvent?.slug ? "View Details" : "Close"}
        onAction={() => {
          if (activeEvent?.slug) window.location.href = activeEvent.slug.startsWith('/') ? activeEvent.slug : `/${activeEvent.slug}`;
          setModalOpen(false);
        }}
        infoLabel={activeEvent?.format || labels.eventIndexLabel}
      />
    </section>
  )
}

export default TimelineSection;