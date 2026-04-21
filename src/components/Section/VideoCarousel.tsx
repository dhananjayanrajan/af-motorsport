'use client'

import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback } from 'react'
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
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        dragFree: true
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section className="relative w-full h-screen bg-black-pure flex flex-col overflow-hidden border-b-[12px] border-black-pure">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-primary-500">
                    <div className="w-2 h-10 bg-black-pure animate-pulse" />
                </div>
                <div className="flex-1 flex items-center px-8">
                    <h2 className="font-mono text-[10px] font-black tracking-widest uppercase text-black-pure">
                        ARRAY_VIEW // {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-white-pure">
                    <button
                        onClick={scrollPrev}
                        className="w-20 flex items-center justify-center hover:bg-primary-500 border-l-4 border-black-pure transition-colors group"
                    >
                        <span className="font-mono text-[10px] font-black group-hover:scale-110 transition-transform">PRV</span>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-20 flex items-center justify-center hover:bg-primary-500 border-l-4 border-black-pure transition-colors group"
                    >
                        <span className="font-mono text-[10px] font-black group-hover:scale-110 transition-transform">NXT</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => {
                        const videoSrc = typeof slide.video === 'string' ? slide.video : slide.video?.url || ''
                        const posterSrc = typeof slide.poster === 'string' ? slide.poster : slide.poster?.url || `https://picsum.photos/seed/${slide.id}/1280/720`

                        return (
                            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 h-full relative border-r-4 border-black-pure group overflow-hidden">
                                <video
                                    src={videoSrc}
                                    poster={posterSrc}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-1000"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.pause()
                                        e.currentTarget.currentTime = 0
                                    }}
                                />

                                <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none z-20">
                                    <div className="flex justify-between items-start">
                                        <div className="font-mono text-[10px] font-black bg-black-pure text-white-pure px-4 py-2">
                                            CH_{String(index + 1).padStart(2, '0')}
                                        </div>
                                        <div className="w-12 h-12 border-2 border-black-pure bg-white-pure/10 backdrop-blur-sm flex items-center justify-center">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                                        </div>
                                    </div>

                                    <div className="max-w-2xl bg-white-pure p-10 border-4 border-black-pure shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="font-mono text-[10px] font-black text-primary-500 block mb-4 tracking-tighter">
                                            DATA_REF // {slide.id}
                                        </span>
                                        <h3 className="font-race text-5xl xl:text-7xl text-black-pure uppercase leading-[0.8] mb-6">
                                            {slide.title}
                                        </h3>
                                        <div className="h-1 w-20 bg-black-pure mb-6" />
                                        <p className="font-mono text-[11px] font-black text-black-pure uppercase leading-tight">
                                            {slide.meta}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black-pure/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="z-30 bg-black-pure text-white-pure">
                <SectionScroller
                    items={["BUFFERING_FEED", sectionTitle, "INTERACTION_REQUIRED", "EMBLA_V8_ENGINE"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default VideoCarousel