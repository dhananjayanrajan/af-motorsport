'use client'

import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback } from 'react'
import SectionScroller from './Scroller'

export interface ImageSlide {
    id: string
    title: string
    meta: string
    image: Media | string
    tags?: string[]
}

interface ImageCarouselProps {
    slides: ImageSlide[]
    sectionTitle: string
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ slides, sectionTitle }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section className="relative w-full h-screen bg-white-pure flex flex-col overflow-hidden border-b-[12px] border-black-pure">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-black-pure">
                    <div className="w-6 h-6 border-2 border-primary-500 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-primary-500" />
                    </div>
                </div>
                <div className="flex-1 flex items-center px-8">
                    <h2 className="font-mono text-[10px] font-black tracking-widest uppercase text-black-pure">
                        STATIC_ARRAY // {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-white-pure">
                    <button
                        onClick={scrollPrev}
                        className="w-20 flex items-center justify-center hover:bg-neutral-100 border-l-4 border-black-pure transition-colors"
                    >
                        <span className="font-mono text-[10px] font-black">BACK</span>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-20 flex items-center justify-center hover:bg-neutral-100 border-l-4 border-black-pure transition-colors"
                    >
                        <span className="font-mono text-[10px] font-black">NEXT</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => {
                        const src = typeof slide.image === 'string'
                            ? slide.image
                            : slide.image?.url || `https://picsum.photos/seed/${slide.id}/1920/1080`

                        return (
                            <div key={index} className="flex-[0_0_90%] md:flex-[0_0_75%] lg:flex-[0_0_65%] min-w-0 h-full relative px-2 py-10 group">
                                <div className="relative w-full h-full border-4 border-black-pure bg-neutral-100 overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
                                    <Image
                                        src={src}
                                        alt={slide.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black-pure/10 mix-blend-overlay" />

                                    <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start pointer-events-none">
                                        <div className="bg-primary-500 border-2 border-black-pure px-4 py-1">
                                            <span className="font-mono text-[10px] font-black text-black-pure">
                                                INDEX_{String(index + 1).padStart(3, '0')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            {slide.tags?.map((tag, tIdx) => (
                                                <span key={tIdx} className="bg-white-pure border-2 border-black-pure px-3 py-1 font-mono text-[8px] font-black uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 bg-gradient-to-t from-black-pure/80 via-black-pure/20 to-transparent">
                                        <h3 className="font-race text-5xl lg:text-7xl text-white-pure uppercase leading-[0.8] mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                            {slide.title}
                                        </h3>
                                        <p className="font-mono text-[11px] font-black text-primary-500 uppercase tracking-tighter">
                                            {slide.meta}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="z-30 bg-black-pure text-white-pure">
                <SectionScroller
                    items={["GALLERY_VIEW", sectionTitle, "SYSTEM_ID_VERIFIED", "ASSET_LOADED"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default ImageCarousel