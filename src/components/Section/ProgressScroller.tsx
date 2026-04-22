'use client'

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
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={1}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure">
                <button
                    onClick={scrollPrev}
                    className="flex-1 border-r border-white-pure/20 text-white-pure font-mono text-[10px] font-black hover:bg-primary-500 hover:text-black-pure transition-colors"
                >
                    PREV_STEP
                </button>
                <button
                    onClick={scrollNext}
                    className="flex-1 text-white-pure font-mono text-[10px] font-black hover:bg-primary-500 hover:text-black-pure transition-colors"
                >
                    NEXT_STEP
                </button>
            </div>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 border-r-2 border-black-pure bg-white-pure group"
                        >
                            <div className="flex flex-col h-full min-h-[450px]">
                                <div className="p-8 md:p-10 flex-1">
                                    <div className="flex justify-between items-start mb-12">
                                        <span className="font-mono text-xs font-black text-black-pure bg-primary-500 px-3 py-1 border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                            {(step.index).toString().padStart(2, '0')}
                                        </span>
                                        {step.percentage !== undefined && (
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black text-black-pure font-mono mb-1">
                                                    {step.percentage}%_COMPLETE
                                                </span>
                                                <div className="w-20 h-2 bg-neutral-100 border border-black-pure overflow-hidden">
                                                    <div
                                                        className="h-full bg-black-pure transition-all duration-1000"
                                                        style={{ width: `${step.percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl text-black-pure uppercase leading-[0.95] tracking-tighter group-hover:text-primary-500 transition-colors duration-300">
                                            {step.heading}
                                        </h3>
                                        {step.subheading && (
                                            <p className="font-mono text-[10px] font-black text-black-pure uppercase bg-secondary-500 inline-block px-2">
                                                {step.subheading}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-8 border-t-2 border-black-pure bg-neutral-50 group-hover:bg-black-pure transition-colors duration-300">
                                    {step.body && (
                                        <p className="text-[11px] text-neutral-500 group-hover:text-white-pure uppercase leading-tight font-black font-mono line-clamp-3">
                                            {step.body}
                                        </p>
                                    )}
                                    <div className="mt-6 h-1.5 w-12 bg-primary-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-2 w-full bg-neutral-100 border-t-2 border-black-pure">
                <div
                    className="h-full bg-black-pure transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <SectionCTA
                label="View Full Implementation"
                path={`/track/${id}`}
                variant={1}
                infoLabel="LIFECYCLE_STATUS"
                directoryLabel="PROCESS_PATH"
            />

            <SectionFooter variant={1} />
        </section>
    )
}

export default ProgressScroller