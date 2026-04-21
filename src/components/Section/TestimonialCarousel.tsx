'use client'

import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback } from 'react'
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
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start'
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section className="relative w-full h-screen bg-neutral-100 flex flex-col overflow-hidden border-b-[12px] border-black-pure">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-primary-500">
                    <span className="font-mono text-2xl font-black">"</span>
                </div>
                <div className="flex-1 flex items-center px-8">
                    <h2 className="font-mono text-[10px] font-black tracking-widest uppercase text-black-pure">
                        TESTIMONY_LOG // {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-white-pure">
                    <button onClick={scrollPrev} className="w-20 flex items-center justify-center hover:bg-neutral-200 border-l-4 border-black-pure transition-colors">
                        <span className="font-mono text-[10px] font-black text-black-pure">PREV</span>
                    </button>
                    <button onClick={scrollNext} className="w-20 flex items-center justify-center hover:bg-neutral-200 border-l-4 border-black-pure transition-colors">
                        <span className="font-mono text-[10px] font-black text-black-pure">NEXT</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 h-full relative border-r-4 border-black-pure bg-white-pure group">
                            <div className="h-full p-12 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 -mr-16 -mt-16 rotate-45 border-b-4 border-black-pure" />

                                <div className="z-10">
                                    <div className="flex gap-1 mb-8">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-3 h-3 bg-primary-500 border border-black-pure" />
                                        ))}
                                    </div>
                                    <p className="font-mono text-lg lg:text-xl font-black uppercase leading-tight text-black-pure italic">
                                        "{slide.quote}"
                                    </p>
                                </div>

                                <div className="z-10 mt-auto">
                                    <div className="h-1 w-12 bg-black-pure mb-6" />
                                    <h4 className="font-race text-3xl text-black-pure uppercase leading-none mb-1">
                                        {slide.author}
                                    </h4>
                                    <p className="font-mono text-[10px] font-black text-primary-500 uppercase tracking-tighter">
                                        {slide.role} // {slide.organization}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {slide.tags?.map((tag, tIdx) => (
                                            <span key={tIdx} className="px-2 py-0.5 border border-neutral-200 font-mono text-[8px] text-neutral-400 font-bold uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="z-30 bg-black-pure text-white-pure">
                <SectionScroller
                    items={["USER_FEEDBACK", sectionTitle, "VERIFIED_RECORD", "END_OF_TRANSCRIPT"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default TestimonialCarousel