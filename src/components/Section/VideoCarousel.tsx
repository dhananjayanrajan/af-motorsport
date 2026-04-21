'use client'

import { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SectionScroller from './Scroller'

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
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ slides, sectionTitle }) => {
    const [progress, setProgress] = useState(0)
    const [playingIndex, setPlayingIndex] = useState<number | null>(null)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

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
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi])

    const handleVideoMouseEnter = (index: number) => {
        setPlayingIndex(index)
        const video = videoRefs.current[index]
        if (video) {
            video.play()
        }
    }

    const handleVideoMouseLeave = (index: number) => {
        setPlayingIndex(null)
        const video = videoRefs.current[index]
        if (video) {
            video.pause()
            video.currentTime = 0
        }
    }

    return (
        <section className="relative w-full min-h-screen bg-black-pure flex flex-col overflow-hidden">
            <div className="flex h-20 border-b border-neutral-800 divide-x divide-neutral-800 bg-black-pure z-30">
                <div className="w-20 flex items-center justify-center bg-primary-500 group">
                    <div className="w-1 h-8 md:w-2 md:h-10 bg-black-pure animate-pulse group-hover:scale-150 transition-transform duration-300" />
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-primary-500">
                        {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-black-pure">
                    <button onClick={scrollPrev} className="w-16 md:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-neutral-800 transition-all duration-300 group">
                        <span className="font-mono text-[10px] md:text-xs font-black text-white-pure group-hover:text-black-pure transition-colors">◀</span>
                    </button>
                    <button onClick={scrollNext} className="w-16 md:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-neutral-800 transition-all duration-300 group">
                        <span className="font-mono text-[10px] md:text-xs font-black text-white-pure group-hover:text-black-pure transition-colors">▶</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => {
                        const videoSrc = typeof slide.video === 'string' ? slide.video : slide.video?.url || ''
                        const posterSrc = typeof slide.poster === 'string' ? slide.poster : slide.poster?.url || `https://picsum.photos/seed/${slide.id}/1280/720`
                        const isPlaying = playingIndex === index

                        return (
                            <div
                                key={index}
                                className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_65%] xl:flex-[0_0_55%] min-w-0 h-full relative border-r border-neutral-800 group overflow-hidden"
                                onMouseEnter={() => handleVideoMouseEnter(index)}
                                onMouseLeave={() => handleVideoMouseLeave(index)}
                            >
                                <video
                                    ref={el => { videoRefs.current[index] = el }}
                                    src={videoSrc}
                                    poster={posterSrc}
                                    className="w-full h-full object-cover transition-all duration-1000"
                                    muted
                                    loop
                                    playsInline
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/40 to-transparent pointer-events-none" />

                                <div className="absolute inset-0 p-4 md:p-8 lg:p-12 flex flex-col justify-between pointer-events-none z-20">
                                    <div className="flex justify-between items-start">
                                        <div className="font-mono text-[8px] md:text-[10px] font-black bg-black-pure text-white-pure px-3 py-1 md:px-4 md:py-2 border border-primary-500">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        {isPlaying && (
                                            <div className="flex items-center gap-2 bg-black-pure/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary-500">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[8px] font-black text-white-pure uppercase">LIVE</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="max-w-2xl bg-white-pure p-6 md:p-8 lg:p-10 border-2 md:border-4 border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform translate-y-0 md:translate-y-4 group-hover:-translate-y-2 transition-transform duration-500">
                                        <span className="font-mono text-[8px] md:text-[10px] font-black text-primary-500 block mb-2 md:mb-4 tracking-wider">
                                            {slide.id}
                                        </span>
                                        <h3 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black-pure uppercase leading-[0.85] mb-4 md:mb-6">
                                            {slide.title}
                                        </h3>
                                        <div className="h-0.5 w-12 md:w-16 bg-black-pure mb-4 md:mb-6" />
                                        <p className="font-mono text-[9px] md:text-[11px] font-black text-black-pure uppercase leading-tight">
                                            {slide.meta}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
                                    <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <SectionScroller items={["WATCH", sectionTitle, "FEATURED", "HIGHLIGHTS"]} variant={2} velocity={22} />
        </section>
    )
}

export default VideoCarousel