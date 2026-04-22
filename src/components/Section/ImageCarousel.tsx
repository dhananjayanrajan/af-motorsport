'use client'

import { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

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
    galleryLabel?: string
    visualsLabel?: string
    mediaLabel?: string
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    slides,
    sectionTitle,
}) => {
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

    if (!slides || slides.length === 0) {
        return null
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 md:h-20 border-b border-black-pure divide-x divide-black-pure bg-white-pure z-30">
                <div className="w-16 md:w-20 flex items-center justify-center bg-black-pure group hover:bg-primary-500 transition-colors duration-300">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                        <div className="w-1 h-1 bg-primary-500 rounded-full" />
                    </div>
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-neutral-400">
                        {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-white-pure">
                    <button
                        onClick={scrollPrev}
                        className="w-12 md:w-16 lg:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-black-pure transition-all duration-300 group"
                        aria-label="Previous image"
                    >
                        <span className="font-mono text-xs md:text-sm font-black group-hover:scale-110 transition-transform">◀</span>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-12 md:w-16 lg:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-black-pure transition-all duration-300 group"
                        aria-label="Next image"
                    >
                        <span className="font-mono text-xs md:text-sm font-black group-hover:scale-110 transition-transform">▶</span>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, index) => {
                        const placeholderId = `${slide.id}-${index}`
                        const src = typeof slide.image === 'string'
                            ? slide.image
                            : slide.image?.url || `https://picsum.photos/seed/${placeholderId}/1280/720`

                        return (
                            <div
                                key={slide.id}
                                className="flex-[0_0_90%] md:flex-[0_0_75%] lg:flex-[0_0_65%] min-w-0 relative px-4 py-8 md:py-12 group"
                            >
                                <div className="relative aspect-video w-full border-2 md:border-4 border-black-pure bg-neutral-200 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-500">
                                    <Image
                                        src={src}
                                        alt={slide.title}
                                        fill
                                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 50vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        priority={index === 0}
                                    />
                                    <div className="absolute inset-0 bg-black-pure/10 group-hover:bg-black-pure/0 transition-colors duration-500" />

                                    <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none">
                                        <div className="bg-primary-500 border border-black-pure px-2 py-0.5">
                                            <span className="font-mono text-[10px] font-black text-black-pure">
                                                {(index + 1).toString().padStart(3, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 bg-gradient-to-t from-black-pure/90 via-black-pure/40 to-transparent">
                                        <h3 className="font-bold text-xl md:text-4xl text-white-pure uppercase leading-tight mb-1">
                                            {slide.title}
                                        </h3>
                                        <p className="font-mono text-[10px] md:text-xs font-black text-primary-500 uppercase">
                                            {slide.meta}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="h-2 w-full bg-neutral-200 border-t border-black-pure">
                <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </section>
    )
}

export default ImageCarousel