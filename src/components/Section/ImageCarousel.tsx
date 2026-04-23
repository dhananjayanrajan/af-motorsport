"use client"
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
    const [isHovered, setIsHovered] = useState(false)

    const autoplay = Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
    })

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
        <section
            className="relative w-full bg-background flex flex-col overflow-hidden py-16 md:py-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground uppercase tracking-tight">
                        {sectionTitle}
                    </h2>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                            aria-label="Previous image"
                        >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                            aria-label="Next image"
                        >
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
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
                                    <div className="relative aspect-video w-full border border-border bg-muted overflow-hidden shadow-lg rounded-lg group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                                        <Image
                                            src={src}
                                            alt={slide.title}
                                            fill
                                            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 50vw"
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            priority={index === 0}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="absolute top-4 left-4">
                                            <div className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-md">
                                                <span className="font-mono text-sm font-semibold text-primary-foreground">
                                                    {(index + 1).toString().padStart(3, '0')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                                            <h3 className="font-bold text-xl md:text-3xl text-white uppercase leading-tight mb-2 drop-shadow-md">
                                                {slide.title}
                                            </h3>
                                            <p className="font-mono text-sm font-semibold text-primary-300 uppercase">
                                                {slide.meta}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-8 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.abs(progress - ((index + 1) / slides.length) * 100) < 5
                                    ? 'bg-primary w-8'
                                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ImageCarousel