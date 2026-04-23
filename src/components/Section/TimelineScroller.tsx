"use client"
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
    const [isHovered, setIsHovered] = useState(false)

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
            case 'active': return 'bg-primary border-foreground shadow-sm'
            case 'completed': return 'bg-foreground border-foreground'
            default: return 'bg-background border-foreground'
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
        <section
            className="relative w-full bg-background flex flex-col overflow-hidden py-16 md:py-24 border-b border-border"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={3} />

                <div className="mt-8 mb-12 flex bg-foreground h-12 border-b border-border rounded-t-lg">
                    <button
                        onClick={scrollPrev}
                        className="flex-1 border-r border-white/20 text-background font-mono text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        Previous Phase
                    </button>
                    <button
                        onClick={scrollNext}
                        className="flex-1 text-background font-mono text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        Next Phase
                    </button>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing py-16 md:py-24" ref={emblaRef}>
                    <div className="flex relative">
                        <div className="absolute top-12 left-0 w-full h-1 bg-muted z-0" />
                        <div
                            className="absolute top-12 left-0 h-1 bg-foreground transition-all duration-700 z-0"
                            style={{ width: `${progress}%` }}
                        />

                        {events.map((event, index) => (
                            <div
                                key={event.id}
                                className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 px-6 md:px-10 relative z-10 group"
                            >
                                <div className="flex flex-col">
                                    <div className="mb-12 flex items-center justify-between">
                                        <div className={`w-10 h-10 border-2 flex items-center justify-center transition-all duration-500 group-hover:rotate-90 rounded-full ${getStatusStyles(event.status)}`}>
                                            <span className={`text-sm font-bold ${event.status === 'completed' ? 'text-background' : 'text-foreground'}`}>
                                                {getStatusIcon(event.status)}
                                            </span>
                                        </div>
                                        <span className="font-mono text-sm font-semibold text-foreground bg-primary px-3 py-1 border-2 border-foreground shadow-sm rounded-md">
                                            {event.date}
                                        </span>
                                    </div>

                                    <div className="p-6 border-2 border-foreground bg-card group-hover:bg-accent/50 transition-colors duration-300 rounded-lg">
                                        {event.meta && (
                                            <span className="text-sm font-semibold text-primary uppercase tracking-wider block mb-2">
                                                {event.meta}
                                            </span>
                                        )}
                                        <h3 className="font-bold text-xl md:text-2xl text-foreground uppercase leading-none mb-4">
                                            {event.title}
                                        </h3>
                                        {event.description && (
                                            <p className="font-mono text-sm text-muted-foreground uppercase leading-relaxed">
                                                {event.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.abs(progress - ((index + 1) / events.length) * 100) < 5
                                    ? 'bg-primary w-8'
                                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                            aria-label={`Go to event ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <SectionCTA
                        label="Full Roadmap"
                        path={`/timeline/${id}`}
                        variant={1}
                        infoLabel="Log Access"
                        directoryLabel="History Path"
                    />
                </div>

                <div className="mt-16">
                    <SectionFooter variant={3} />
                </div>
            </div>
        </section>
    )
}

export default TimelineScroller