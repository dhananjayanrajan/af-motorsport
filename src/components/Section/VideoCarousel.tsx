'use client'

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
    liveLabel = 'LIVE'
}) => {
    const [progress, setProgress] = useState(0)
    const [playingIndex, setPlayingIndex] = useState<number | null>(null)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({})

    const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })

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
        <section className="relative w-full bg-black-pure flex flex-col overflow-hidden">
            <div className="flex h-16 md:h-20 border-b border-neutral-800 divide-x divide-neutral-800 bg-black-pure z-30">
                <div className="w-16 md:w-20 flex items-center justify-center bg-primary-500 group">
                    <div className="w-1 h-6 md:w-2 md:h-8 bg-black-pure animate-pulse" />
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-primary-500">
                        {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-black-pure">
                    <button
                        onClick={scrollPrev}
                        className="w-12 md:w-16 lg:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-neutral-800 transition-all duration-300 group"
                    >
                        <span className="font-mono text-xs md:text-sm font-black text-white-pure group-hover:text-black-pure">◀</span>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-12 md:w-16 lg:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-neutral-800 transition-all duration-300 group"
                    >
                        <span className="font-mono text-xs md:text-sm font-black text-white-pure group-hover:text-black-pure">▶</span>
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
                                className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 relative border-r border-neutral-800 group"
                                onMouseEnter={() => handleVideoMouseEnter(index)}
                                onMouseLeave={() => handleVideoMouseLeave(index)}
                            >
                                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
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

                                    <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-transparent to-transparent pointer-events-none" />

                                    <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between pointer-events-none z-20">
                                        <div className="flex justify-between items-start">
                                            <div className="font-mono text-[10px] font-black bg-black-pure text-white-pure px-3 py-1 border border-primary-500">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            {isPlaying && (
                                                <div className="flex items-center gap-2 bg-black-pure/80 backdrop-blur-sm px-3 py-1 border border-primary-500">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                                    <span className="text-[8px] font-black text-white-pure uppercase">{liveLabel}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="max-w-xl bg-white-pure p-4 border-2 border-black-pure shadow-[6px_6px_0px_0px_rgba(0,255,65,1)] transition-transform duration-500 group-hover:-translate-y-1">
                                            <h3 className="font-bold text-xl md:text-2xl text-black-pure uppercase leading-tight mb-2">
                                                {slide.title}
                                            </h3>
                                            <p className="font-mono text-[10px] font-black text-neutral-500 uppercase tracking-tighter">
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

            <div className="h-1.5 w-full bg-neutral-900">
                <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </section>
    )
}

export default VideoCarousel