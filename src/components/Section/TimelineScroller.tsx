'use client'

import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback } from 'react'
import SectionScroller from './Scroller'

export interface TimelineEvent {
    id: string
    date: string
    title: string
    description?: string
    status?: 'completed' | 'active' | 'upcoming'
    meta?: string
}

interface TimelineScrollerProps {
    id: string
    title: string
    events: TimelineEvent[]
}

const TimelineScroller: React.FC<TimelineScrollerProps> = ({ id, title, events }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'active': return 'bg-primary-500'
            case 'completed': return 'bg-black-pure'
            default: return 'bg-neutral-200'
        }
    }

    return (
        <section className="relative w-full min-h-[50vh] bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
                <div className="flex h-full">
                    <button onClick={scrollPrev} className="h-full px-6 border-l border-black-pure hover:bg-neutral-50 transition-colors">
                        <span className="text-[10px] font-bold uppercase">Back</span>
                    </button>
                    <button onClick={scrollNext} className="h-full px-6 border-l border-black-pure hover:bg-neutral-50 transition-colors">
                        <span className="text-[10px] font-bold uppercase">Next</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-20 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full relative">
                    <div className="absolute top-[4.5rem] left-0 w-full h-[1px] bg-neutral-200 z-0" />

                    {events.map((event, index) => (
                        <div key={index} className="flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0 px-8 lg:px-12 relative z-10 group">
                            <div className="flex flex-col">
                                <div className="mb-10 flex items-center gap-4">
                                    <div className={`w-3 h-3 rotate-45 transition-transform group-hover:scale-125 ${getStatusColor(event.status)}`} />
                                    <span className="text-[11px] font-bold text-black-pure font-mono">
                                        {event.date}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-race text-2xl lg:text-3xl text-black-pure uppercase leading-none group-hover:text-primary-500 transition-colors">
                                        {event.title}
                                    </h3>
                                    {event.meta && (
                                        <span className="inline-block px-2 py-0.5 border border-black-pure text-[9px] font-bold uppercase">
                                            {event.meta}
                                        </span>
                                    )}
                                    {event.description && (
                                        <p className="text-[11px] text-neutral-500 uppercase leading-relaxed max-w-[280px]">
                                            {event.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, "CHRONOLOGICAL_SEQUENCE", `NODES_${events.length}`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default TimelineScroller