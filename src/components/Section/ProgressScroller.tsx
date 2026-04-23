"use client"
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import SectionCTA from './CTA'
import SectionFooter from './Footer'
import SectionHeader from './Header'

export interface ProgressStep {
    id: string
    index: string | number
    heading: string
    subheading?: string
    body?: string
    percentage?: number
}

interface ProgressScrollerProps {
    id: string
    title: string
    steps: ProgressStep[]
}

const ProgressScroller: React.FC<ProgressScrollerProps> = ({ id, title, steps }) => {
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

    if (!steps || steps.length === 0) return null

    return (
        <section
            className="relative w-full bg-background flex flex-col overflow-hidden py-16 md:py-24 border-b border-border"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={1} />

                <div className="mt-8 mb-12 flex items-center justify-between">
                    <button
                        onClick={scrollPrev}
                        className="px-6 py-3 border border-border rounded-md text-foreground font-mono text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    >
                        Previous Step
                    </button>
                    <button
                        onClick={scrollNext}
                        className="px-6 py-3 border border-border rounded-md text-foreground font-mono text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    >
                        Next Step
                    </button>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 border-r border-border last:border-r-0 bg-card group px-2"
                            >
                                <div className="flex flex-col h-full min-h-[450px] border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="p-8 md:p-10 flex-1">
                                        <div className="flex justify-between items-start mb-12">
                                            <span className="font-mono text-sm font-semibold text-foreground bg-primary px-3 py-1 border border-primary rounded-md shadow-sm">
                                                {(step.index).toString().padStart(2, '0')}
                                            </span>

                                            {step.percentage !== undefined && (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-semibold text-foreground font-mono mb-2">
                                                        {step.percentage}% Complete
                                                    </span>
                                                    <div className="w-24 h-2 bg-muted border border-border rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-foreground transition-all duration-1000 rounded-full"
                                                            style={{ width: `${step.percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl text-foreground uppercase leading-[0.95] tracking-tighter group-hover:text-primary transition-colors duration-300">
                                                {step.heading}
                                            </h3>

                                            {step.subheading && (
                                                <p className="font-mono text-sm font-semibold text-foreground uppercase bg-secondary inline-block px-3 py-1 rounded-md">
                                                    {step.subheading}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-8 border-t border-border bg-muted/50 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                                        {step.body && (
                                            <p className="text-sm text-muted-foreground group-hover:text-background uppercase leading-relaxed font-semibold font-mono line-clamp-3">
                                                {step.body}
                                            </p>
                                        )}
                                        <div className="mt-6 h-1.5 w-12 bg-primary rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-foreground transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {steps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.abs(progress - ((index + 1) / steps.length) * 100) < 5
                                    ? 'bg-foreground w-8'
                                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                            aria-label={`Go to step ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <SectionCTA
                        label="View Full Implementation"
                        path={`/track/${id}`}
                        variant={1}
                        infoLabel="Lifecycle Status"
                        directoryLabel="Process Path"
                    />
                </div>

                <div className="mt-16">
                    <SectionFooter variant={1} />
                </div>
            </div>
        </section>
    )
}

export default ProgressScroller