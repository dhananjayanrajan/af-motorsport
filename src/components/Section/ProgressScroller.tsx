'use client'

import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback } from 'react'
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
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section className="relative w-full min-h-[60vh] bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
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

            <div className="flex-1 flex flex-col justify-center overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full divide-x divide-black-pure border-l border-black-pure">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 p-10 lg:p-16 flex flex-col justify-between group transition-colors hover:bg-neutral-50">
                            <div>
                                <div className="flex justify-between items-start mb-12">
                                    <span className="text-[10px] font-bold text-neutral-300 font-mono italic">
                                        LVL_{String(step.index).padStart(2, '0')}
                                    </span>
                                    {step.percentage !== undefined && (
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold text-black-pure font-mono">
                                                {step.percentage}%
                                            </span>
                                            <div className="w-16 h-[2px] bg-neutral-100 mt-1">
                                                <div
                                                    className="h-full bg-primary-500 transition-all duration-1000"
                                                    style={{ width: `${step.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-race text-3xl lg:text-4xl text-black-pure uppercase leading-[0.85] group-hover:text-primary-500 transition-colors">
                                        {step.heading}
                                    </h3>
                                    {step.subheading && (
                                        <p className="text-[11px] font-bold text-black-pure uppercase tracking-tighter">
                                            {step.subheading}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-12">
                                {step.body && (
                                    <p className="text-[12px] text-neutral-500 uppercase leading-relaxed font-medium">
                                        {step.body}
                                    </p>
                                )}
                                <div className="mt-6 h-[1px] w-8 bg-black-pure group-hover:w-full transition-all duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, "PROGRESSION_HISTORY_INDEX"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default ProgressScroller