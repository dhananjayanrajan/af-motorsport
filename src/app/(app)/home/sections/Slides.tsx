'use client'

import { Media, Slide } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

export interface HeroSectionProps {
    slides: Slide[]
}

const HeroSlides: React.FC<HeroSectionProps> = ({ slides = [] }) => {
    const router = useRouter()
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, duration: 25, watchDrag: false },
        [Autoplay({ delay: 6000, stopOnInteraction: false })]
    )

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') scrollPrev()
            if (e.key === 'ArrowRight') scrollNext()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [scrollPrev, scrollNext])

    if (!slides || slides.length === 0) return null

    return (
        <section className="relative w-full h-screen bg-black-pure flex flex-col">
            <div className="flex-1 relative overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="flex-[0_0_100%] min-w-0 h-full relative">
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={(slide.assets?.background as Media)?.url || `https://picsum.photos/seed/${slide.id}/1920/1080`}
                                    alt={slide.name}
                                    fill
                                    priority
                                    className="object-cover brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-700 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-tertiary-500 opacity-20 mix-blend-multiply pointer-events-none" />
                            </div>

                            <div className="relative z-10 h-full grid grid-cols-12 pointer-events-none">
                                <div className="col-span-12 lg:col-span-6 flex flex-col justify-between p-6 md:p-10 pointer-events-auto">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-stretch h-14 w-fit border border-black-pure">
                                            <div className="w-14 flex items-center justify-center bg-black-pure text-primary-500 font-mono text-lg font-black shrink-0">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <div className="px-4 flex flex-col justify-center bg-secondary-500">
                                                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black-pure">
                                                    {slide.basics?.identifiers?.code || 'PRIMARY'}
                                                </span>
                                                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black-pure opacity-70">
                                                    {slide.details?.type || 'ELEMENT'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 max-w-2xl">
                                            <h1 className="text-4xl md:text-5xl font-race font-black text-white-pure uppercase tracking-tighter leading-none drop-shadow-md">
                                                {slide.name}
                                            </h1>
                                            <div className="bg-primary-500 px-3 py-1.5 w-fit border border-black-pure">
                                                <h2 className="text-lg md:text-xl font-race font-black text-black-pure uppercase tracking-tighter leading-none">
                                                    {slide.alias}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 max-w-sm bg-white-pure p-6 border border-black-pure">
                                        <p className="font-mono text-[11px] font-black uppercase leading-relaxed tracking-tight text-black-pure">
                                            {slide.basics?.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {slide.traits?.tags?.list?.map((tag, i) => (
                                                <span key={i} className="bg-black-pure text-white-pure text-[9px] font-mono font-black px-2 py-0.5 uppercase tracking-widest">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-24 border-t border-black-pure flex items-stretch w-full bg-white-pure z-40">
                <div className="w-20 md:w-28 border-r border-black-pure bg-white-pure flex flex-col items-center justify-center p-3 shrink-0">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-race font-black text-black-pure">
                            {String(selectedIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg font-race font-black text-primary-500">/</span>
                        <span className="text-lg font-race font-black text-black-pure">
                            {String(slides.length).padStart(2, '0')}
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-white-300 mt-1.5 border border-black-pure">
                        <div
                            className="h-full bg-black-pure transition-all duration-500"
                            style={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex border-r border-black-pure shrink-0">
                    <button
                        onClick={scrollPrev}
                        className="w-16 md:w-20 border-r border-black-pure bg-white-pure flex flex-col items-center justify-center hover:bg-secondary-500 focus:bg-primary-500 transition-colors outline-none group"
                        aria-label="Previous"
                    >
                        <span className="font-mono text-[10px] font-black mb-1.5 group-hover:translate-x-[-2px] transition-transform">PREV</span>
                        <div className="w-4 h-px bg-black-pure" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-16 md:w-20 bg-white-pure flex flex-col items-center justify-center hover:bg-secondary-500 focus:bg-primary-500 transition-colors outline-none group"
                        aria-label="Next"
                    >
                        <span className="font-mono text-[10px] font-black mb-1.5 group-hover:translate-x-[2px] transition-transform">NEXT</span>
                        <div className="w-4 h-px bg-black-pure" />
                    </button>
                </div>

                <button
                    onClick={() => {
                        const slug = slides[selectedIndex]?.slug
                        if (slug) router.push(`/discover/${slug}`)
                    }}
                    className="flex-1 bg-primary-500 px-8 flex items-center justify-between hover:bg-tertiary-500 hover:text-white-pure focus:bg-black-pure focus:text-white-pure transition-all duration-300 group outline-none"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest opacity-60">SELECT</span>
                        <span className="font-race text-lg md:text-xl tracking-tighter uppercase">ENTER GALLERY</span>
                    </div>
                    <div className="w-10 h-10 border border-black-pure group-hover:border-white-pure flex items-center justify-center transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1.5 transition-transform text-current">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    )
}

export default HeroSlides