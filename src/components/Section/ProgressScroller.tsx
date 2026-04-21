'use client'

import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import SectionScroller from './Scroller'

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
                        <span className="text-[9px] md:text-[10px] font-black uppercase">◀</span>
                    </button>
                    <button onClick={scrollNext} className="h-full px-4 md:px-6 border-l border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-300">
                        <span className="text-[9px] md:text-[10px] font-black uppercase">▶</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-12 md:py-16 lg:py-20 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between group transition-all duration-500 hover:bg-gradient-to-br hover:from-white-pure hover:to-secondary-500/5">
                            <div>
                                <div className="flex justify-between items-start mb-8 md:mb-10 lg:mb-12">
                                    <span className="text-[9px] md:text-[10px] font-black text-neutral-400 font-mono tracking-wider">
                                        {(step.index).toString().padStart(2, '0')}
                                    </span>
                                    {step.percentage !== undefined && (
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] md:text-[10px] font-black text-primary-500 font-mono">
                                                {step.percentage}%
                                            </span>
                                            <div className="w-12 md:w-16 h-0.5 bg-neutral-100 mt-1 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-500 transition-all duration-1000 rounded-full"
                                                    style={{ width: `${step.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <h3 className="font-race text-2xl md:text-3xl lg:text-4xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                        {step.heading}
                                    </h3>
                                    {step.subheading && (
                                        <p className="text-[10px] md:text-xs font-black text-black-pure uppercase tracking-tighter">
                                            {step.subheading}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 md:mt-10 lg:mt-12">
                                {step.body && (
                                    <p className="text-[10px] md:text-xs text-neutral-500 uppercase leading-relaxed font-medium">
                                        {step.body}
                                    </p>
                                )}
                                <div className="mt-4 md:mt-5 h-0.5 w-8 bg-black-pure group-hover:w-16 transition-all duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-1 w-full bg-neutral-100">
                <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <SectionScroller items={[title, "PROGRESS", "TRACKING", "MILESTONES"]} variant={1} velocity={28} />
        </section>
    )
}

export default ProgressScroller