"use client"
import { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface VideoSlide {
    id: string
    title: string
    meta: string
    video: Media | string
    poster?: Media | string
}

interface VideoCarouselProps {
    slides: VideoSlide[]
    sectionTitle: string
    liveLabel?: string
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
    slides,
    sectionTitle,
    liveLabel = 'Live'
}) => {
    const [progress, setProgress] = useState(0)
    const [playingIndex, setPlayingIndex] = useState<number | null>(null)
    const [isHovered, setIsHovered] = useState(false)

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({})

    const autoplay = Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
    })

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', dragFree: true },
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

    const handleVideoMouseEnter = (index: number) => {
        if (timeoutRefs.current[index]) clearTimeout(timeoutRefs.current[index])

        timeoutRefs.current[index] = setTimeout(() => {
            setPlayingIndex(index)
            const video = videoRefs.current[index]
            if (video) {
                video.play().catch(() => { })
            }
        }, 150)
    }

    const handleVideoMouseLeave = (index: number) => {
        if (timeoutRefs.current[index]) clearTimeout(timeoutRefs.current[index])
        setPlayingIndex(null)

        const video = videoRefs.current[index]
        if (video) {
            video.pause()
            video.currentTime = 0
        }
    }

    if (!slides || slides.length === 0) {
        return null
    }

    return (
        <section
            className="relative w-full bg-foreground flex flex-col overflow-hidden py-16 md:py-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-8 bg-primary animate-pulse rounded-sm" />
                        <h2 className="font-mono text-sm md:text-base font-semibold tracking-wider uppercase text-primary">
                            {sectionTitle}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-white group-hover:text-primary-foreground group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-white group-hover:text-primary-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex">
                        {slides.map((slide, index) => {
                            const videoSrc = typeof slide.video === 'string' ? slide.video : slide.video?.url
                            const posterSrc = typeof slide.poster === 'string'
                                ? slide.poster
                                : slide.poster?.url || `https://picsum.photos/seed/${slide.id}/1280/720`

                            const isPlaying = playingIndex === index

                            return (
                                <div
                                    key={slide.id}
                                    className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 relative border-r border-white/10 last:border-r-0 group px-2"
                                    onMouseEnter={() => handleVideoMouseEnter(index)}
                                    onMouseLeave={() => handleVideoMouseLeave(index)}
                                >
                                    <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden rounded-lg shadow-lg">
                                        {videoSrc ? (
                                            <video
                                                ref={el => { videoRefs.current[index] = el }}
                                                src={videoSrc}
                                                poster={posterSrc}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                            />
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={posterSrc}
                                                    alt={slide.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent pointer-events-none" />

                                        <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between pointer-events-none z-20">
                                            <div className="flex justify-between items-start">
                                                <div className="font-mono text-sm font-semibold bg-foreground/90 backdrop-blur-sm text-background px-3 py-1 border border-primary rounded-md">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>

                                                {isPlaying && (
                                                    <div className="flex items-center gap-2 bg-foreground/80 backdrop-blur-sm px-3 py-1 border border-primary rounded-full">
                                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                        <span className="text-xs font-semibold text-background uppercase">{liveLabel}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="max-w-xl bg-background p-6 border-2 border-foreground shadow-lg rounded-lg transition-transform duration-500 group-hover:-translate-y-1">
                                                <h3 className="font-bold text-xl md:text-2xl text-foreground uppercase leading-tight mb-2">
                                                    {slide.title}
                                                </h3>
                                                <p className="font-mono text-sm font-semibold text-muted-foreground uppercase tracking-tighter">
                                                    {slide.meta}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-8 h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
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
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VideoCarousel