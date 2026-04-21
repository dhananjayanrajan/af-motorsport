'use client'

import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
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

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'active': return 'bg-green-500 shadow-lg shadow-green-500/50'
            case 'completed': return 'bg-primary-500'
            default: return 'bg-neutral-300'
        }
    }

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case 'active': return '●'
            case 'completed': return '✓'
            default: return '○'
        }
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-secondary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="flex h-full">
                    <button onClick={scrollPrev} className="h-full px-4 md:px-6 border-l border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-300">
                        <span className="text-[9px] md:text-[10px] font-black uppercase">◀ PREV</span>
                    </button>
                    <button onClick={scrollNext} className="h-full px-4 md:px-6 border-l border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-300">
                        <span className="text-[9px] md:text-[10px] font-black uppercase">NEXT ▶</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-12 md:py-16 lg:py-20 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full relative">
                    <div className="absolute top-8 md:top-10 left-0 w-full h-0.5 bg-neutral-200 z-0" />
                    <div className="absolute top-8 md:top-10 left-0 w-full h-0.5 bg-primary-500 transition-all duration-500 z-0" style={{ width: `${progress}%` }} />

                    {events.map((event, index) => (
                        <div key={index} className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_25%] min-w-0 px-4 md:px-6 lg:px-8 relative z-10 group">
                            <div className="flex flex-col">
                                <div className="mb-8 md:mb-10 flex items-center gap-3">
                                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 ${getStatusColor(event.status)}`}>
                                        <span className="text-[10px] md:text-xs font-black text-white-pure">{getStatusIcon(event.status)}</span>
                                    </div>
                                    <div className="h-px flex-1 bg-neutral-200 group-hover:bg-primary-500 transition-colors duration-500" />
                                    <span className="text-[10px] md:text-xs font-black text-black-pure font-mono">
                                        {event.date}
                                    </span>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                        {event.title}
                                    </h3>
                                    {event.meta && (
                                        <span className="inline-block px-2 py-0.5 border border-secondary-500 text-[8px] md:text-[9px] font-black uppercase text-secondary-500">
                                            {event.meta}
                                        </span>
                                    )}
                                    {event.description && (
                                        <p className="text-[10px] md:text-xs text-neutral-500 uppercase leading-relaxed max-w-xs">
                                            {event.description}
                                        </p>
                                    )}
                                    <div className="w-8 h-0.5 bg-black-pure group-hover:w-16 transition-all duration-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-1 w-full bg-neutral-100">
                <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <SectionScroller items={[title, "HISTORY", "MILESTONES", "JOURNEY"]} variant={5} velocity={26} />
        </section>
    )
}

export default TimelineScroller