'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Quote } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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

    if (!slides || slides.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b-2 border-black-pure">
            <SectionHeader
                title={sectionTitle}
                subtitle="COMMUNITY_FEEDBACK"
                variant={2}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure divide-x-2 divide-white-pure/20">
                <div className="w-12 md:w-16 flex items-center justify-center bg-primary-500">
                    <Quote className="w-4 h-4 text-black-pure" />
                </div>
                <div className="flex-1" />
                <button onClick={scrollPrev} className="w-16 md:w-24 text-white-pure font-mono text-[10px] font-black hover:bg-white-pure hover:text-black-pure transition-colors">
                    PREV
                </button>
                <button onClick={scrollNext} className="w-16 md:w-24 text-white-pure font-mono text-[10px] font-black hover:bg-white-pure hover:text-black-pure transition-colors">
                    NEXT
                </button>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_33.33%] min-w-0 relative border-r-2 border-black-pure bg-white-pure group">
                            <div className="flex flex-col h-full min-h-[400px]">
                                <div className="p-8 md:p-10 flex-1 flex flex-col">
                                    <div className="flex gap-1 mb-8">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-black-pure" />
                                        ))}
                                    </div>
                                    <p className="font-mono text-lg md:text-xl font-black uppercase leading-tight text-black-pure italic mb-8">
                                        "{slide.quote}"
                                    </p>

                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {slide.tags?.map((tag, tIdx) => (
                                            <span key={tIdx} className="px-2 py-1 bg-neutral-100 font-mono text-[8px] text-black-pure font-black uppercase border border-black-pure">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 bg-black-pure group-hover:bg-primary-500 transition-colors duration-300">
                                    <h4 className="font-bold text-xl md:text-2xl text-white-pure group-hover:text-black-pure uppercase leading-none mb-1">
                                        {slide.author}
                                    </h4>
                                    <p className="font-mono text-[10px] font-black text-primary-500 group-hover:text-black-pure uppercase tracking-tighter">
                                        {slide.role} // {slide.organization}
                                    </p>
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

            <SectionFooter variant={1} />
        </section>
    )
}

export default TestimonialCarousel