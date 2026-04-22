'use client'

import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import SectionCTA from './CTA'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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
    const [progress, setProgress] = useState(0)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => {
            const progressValue = ((emblaApi.selectedScrollSnap() + 1) / emblaApi.scrollSnapList().length) * 100
            setProgress(progressValue)
        }
        emblaApi.on('select', onSelect)
        onSelect()
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi])

    const getStatusStyles = (status?: string) => {
        switch (status) {
            case 'active': return 'bg-primary-500 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            case 'completed': return 'bg-black-pure border-black-pure'
            default: return 'bg-white-pure border-black-pure'
        }
    }

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case 'active': return '●'
            case 'completed': return '✓'
            default: return ''
        }
    }

    if (!events || events.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={3}
            />

            <div className="flex bg-black-pure h-12 border-b-2 border-black-pure">
                <button
                    onClick={scrollPrev}
                    className="flex-1 border-r border-white-pure/20 text-white-pure font-mono text-[10px] font-black hover:bg-primary-500 hover:text-black-pure transition-colors"
                >
                    PREV_PHASE
                </button>
                <button
                    onClick={scrollNext}
                    className="flex-1 text-white-pure font-mono text-[10px] font-black hover:bg-primary-500 hover:text-black-pure transition-colors"
                >
                    NEXT_PHASE
                </button>
            </div>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing py-16 md:py-24" ref={emblaRef}>
                <div className="flex relative">
                    <div className="absolute top-12 left-0 w-full h-1 bg-neutral-100 z-0" />
                    <div
                        className="absolute top-12 left-0 h-1 bg-black-pure transition-all duration-700 z-0"
                        style={{ width: `${progress}%` }}
                    />

                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 px-6 md:px-10 relative z-10 group"
                        >
                            <div className="flex flex-col">
                                <div className="mb-12 flex items-center justify-between">
                                    <div className={`w-8 h-8 border-2 flex items-center justify-center transition-all duration-500 group-hover:rotate-90 ${getStatusStyles(event.status)}`}>
                                        <span className={`text-xs font-black ${event.status === 'completed' ? 'text-white-pure' : 'text-black-pure'}`}>
                                            {getStatusIcon(event.status)}
                                        </span>
                                    </div>
                                    <span className="font-mono text-xs font-black text-black-pure bg-primary-500 px-3 py-1 border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        {event.date}
                                    </span>
                                </div>

                                <div className="p-6 border-2 border-black-pure bg-white-pure group-hover:bg-neutral-50 transition-colors duration-300">
                                    {event.meta && (
                                        <span className="text-[9px] font-black text-primary-500 uppercase tracking-widest block mb-2">
                                            // {event.meta}
                                        </span>
                                    )}
                                    <h3 className="font-bold text-xl md:text-2xl text-black-pure uppercase leading-none mb-4">
                                        {event.title}
                                    </h3>
                                    {event.description && (
                                        <p className="font-mono text-[10px] text-neutral-500 uppercase leading-tight">
                                            {event.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-2 w-full bg-neutral-100 border-t-2 border-black-pure">
                <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <SectionCTA
                label="Full Roadmap"
                path={`/timeline/${id}`}
                variant={1}
                infoLabel="LOG_ACCESS"
                directoryLabel="HISTORY_PATH"
            />

            <SectionFooter variant={3} />
        </section>
    )
}

export default TimelineScroller