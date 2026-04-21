'use client'

import { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
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
    const [progress, setProgress] = useState(0)

    const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'center', skipSnaps: false },
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
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-black-pure group">
                    <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-primary-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                        <div className="w-1 h-1 bg-primary-500 rounded-full" />
                    </div>
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
                    {slides.map((slide, index) => {
                        const src = typeof slide.image === 'string'
                            ? slide.image
                            : slide.image?.url || `https://picsum.photos/seed/${slide.id}/1920/1080`

                        return (
                            <div key={index} className="flex-[0_0_90%] md:flex-[0_0_75%] lg:flex-[0_0_65%] xl:flex-[0_0_55%] min-w-0 h-full relative px-2 py-6 md:py-10 group">
                                <div className="relative w-full h-full border-4 border-black-pure bg-neutral-100 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
                                    <Image
                                        src={src}
                                        alt={slide.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/20 transition-colors duration-500" />

                                    <div className="absolute top-0 left-0 w-full p-4 md:p-6 lg:p-8 flex justify-between items-start pointer-events-none">
                                        <div className="bg-primary-500 border-2 border-black-pure px-2 py-0.5 md:px-3 md:py-1">
                                            <span className="font-mono text-[8px] md:text-[10px] font-black text-black-pure">
                                                {(index + 1).toString().padStart(3, '0')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1 md:gap-2 items-end">
                                            {slide.tags?.map((tag, tIdx) => (
                                                <span key={tIdx} className="bg-white-pure border-2 border-black-pure px-2 py-0.5 md:px-3 md:py-1 font-mono text-[7px] md:text-[8px] font-black uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black-pure via-black-pure/60 to-transparent">
                                        <h3 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white-pure uppercase leading-[0.85] mb-2 md:mb-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                            {slide.title}
                                        </h3>
                                        <p className="font-mono text-[9px] md:text-[11px] font-black text-primary-500 uppercase tracking-tighter">
                                            {slide.meta}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="h-1 w-full bg-neutral-200">
                <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <SectionScroller items={["GALLERY", sectionTitle, "VISUALS", "MEDIA"]} variant={2} velocity={22} />
        </section>
    )
}

export default ImageCarousel