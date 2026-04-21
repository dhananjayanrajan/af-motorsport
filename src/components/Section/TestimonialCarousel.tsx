'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Quote } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import SectionScroller from './Scroller'

export interface TestimonialSlide {
    id: string
    quote: string
    author: string
    role: string
    organization: string
    tags?: string[]
}

interface TestimonialCarouselProps {
    slides: TestimonialSlide[]
    sectionTitle: string
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ slides, sectionTitle }) => {
    const [progress, setProgress] = useState(0)

    const autoplay = Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [autoplay]
    )

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
        <section className="relative w-full min-h-screen bg-gradient-to-br from-neutral-100 via-white-pure to-neutral-100 flex flex-col overflow-hidden">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-primary-500 group">
                    <Quote className="w-5 h-5 md:w-6 md:h-6 text-black-pure group-hover:scale-125 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-neutral-400">
                        {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-white-pure">
                    <button onClick={scrollPrev} className="w-16 md:w-20 flex items-center justify-center hover:bg-primary-500 border-l-4 border-black-pure transition-all duration-300 group">
                        <span className="font-mono text-[10px] md:text-xs font-black group-hover:scale-110 transition-transform">◀</span>
                    </button>
                    <button onClick={scrollNext} className="w-16 md:w-20 flex items-center justify-center hover:bg-primary-500 border-l-4 border-black-pure transition-all duration-300 group">
                        <span className="font-mono text-[10px] md:text-xs font-black group-hover:scale-110 transition-transform">▶</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 h-full relative border-r-4 border-black-pure bg-white-pure group">
                            <div className="h-full p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                                <div className="z-10">
                                    <div className="flex gap-1 mb-6 md:mb-8">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 bg-primary-500 border border-black-pure rotate-45" />
                                        ))}
                                    </div>
                                    <p className="font-mono text-base md:text-lg lg:text-xl font-black uppercase leading-tight text-black-pure italic">
                                        "{slide.quote}"
                                    </p>
                                </div>

                                <div className="z-10 mt-8 md:mt-10 lg:mt-12">
                                    <div className="h-0.5 w-10 md:w-12 bg-primary-500 mb-4 md:mb-5" />
                                    <h4 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] mb-1">
                                        {slide.author}
                                    </h4>
                                    <p className="font-mono text-[9px] md:text-[10px] font-black text-primary-500 uppercase tracking-tighter">
                                        {slide.role} // {slide.organization}
                                    </p>

                                    {slide.tags && slide.tags.length > 0 && (
                                        <div className="mt-4 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
                                            {slide.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="px-1.5 py-0.5 md:px-2 md:py-1 border border-neutral-200 font-mono text-[7px] md:text-[8px] text-neutral-500 font-black uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-1 w-full bg-neutral-200">
                <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <SectionScroller items={["VOICES", sectionTitle, "STORIES", "FEEDBACK"]} variant={2} velocity={24} />
        </section>
    )
}

export default TestimonialCarousel