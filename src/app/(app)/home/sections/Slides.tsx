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
        { loop: true, duration: 25, watchDrag: true },
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
        <section className="relative w-full h-screen bg-black-pure flex flex-col outline-none" tabIndex={0}>
            <div className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => {
                        const backgroundAsset = slide?.assets?.background as Media
                        const imageUrl = backgroundAsset?.url || `https://picsum.photos/seed/${slide.id || index}/1920/1080`

                        return (
                            <div key={slide.id || index} className="flex-[0_0_100%] min-w-0 h-full relative">
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={imageUrl}
                                        alt={slide.name || 'Hero Slide'}
                                        fill
                                        priority
                                        className="object-cover brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-tertiary-500 opacity-20 mix-blend-multiply pointer-events-none" />
                                </div>

                                <div className="relative z-10 h-full grid grid-cols-12 pointer-events-none">
                                    <div className="col-span-12 lg:col-span-6 flex flex-col justify-between p-6 md:p-10 pointer-events-auto">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-stretch h-12 w-fit border border-black-pure">
                                                <div className="w-12 flex items-center justify-center bg-black-pure text-primary-500 font-mono text-base font-black shrink-0">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>
                                                <div className="px-3 flex flex-col justify-center bg-secondary-500">
                                                    <span className="font-mono text-[9px] font-black uppercase tracking-normal text-black-pure">
                                                        {slide.basics?.identifiers?.code || 'ACTIVE_DATA'}
                                                    </span>
                                                    <span className="font-mono text-[9px] font-black uppercase tracking-normal text-black-pure opacity-70">
                                                        {slide.details?.type || 'CORE_UNIT'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 max-w-xl">
                                                <h1 className="text-3xl md:text-4xl font-race font-black text-white-pure uppercase tracking-tighter leading-none">
                                                    {slide.name || 'Unit Identification'}
                                                </h1>
                                                <div className="bg-primary-500 px-3 py-1.5 w-fit border border-black-pure">
                                                    <h2 className="text-base md:text-lg font-race font-black text-black-pure uppercase tracking-tighter leading-none">
                                                        {slide.alias || 'Classification'}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 max-w-xs bg-white-pure p-6 border border-black-pure">
                                            <p className="font-mono text-[10px] font-black uppercase leading-relaxed tracking-tight text-black-pure line-clamp-3">
                                                {slide.basics?.description || 'Information currently unavailable from central command.'}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {slide.traits?.tags?.list?.map((tag, i) => (
                                                    <span key={i} className="bg-black-pure text-white-pure text-[8px] font-mono font-black px-2 py-0.5 uppercase tracking-normal">
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="h-20 border-t border-black-pure flex items-stretch w-full bg-white-pure z-40">
                <div className="w-20 md:w-28 border-r border-black-pure bg-white-pure flex flex-col items-center justify-center p-3 shrink-0">
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-race font-black text-black-pure">
                            {String(selectedIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-base font-race font-black text-primary-500">/</span>
                        <span className="text-base font-race font-black text-black-pure">
                            {String(slides.length).padStart(2, '0')}
                        </span>
                    </div>
                    <div className="w-full h-1 bg-white-300 mt-2 border border-black-pure">
                        <div
                            className="h-full bg-black-pure transition-all duration-500"
                            style={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex border-r border-black-pure shrink-0">
                    <button
                        onClick={scrollPrev}
                        className="w-16 md:w-20 border-r border-black-pure bg-white-pure flex flex-col items-center justify-center hover:bg-black-pure hover:text-white-pure focus:bg-primary-500 focus:text-black-pure active:bg-secondary-500 transition-colors duration-100 outline-none group"
                        aria-label="Previous"
                    >
                        <span className="font-mono text-[9px] font-black mb-1 group-hover:-translate-x-1 transition-transform">BACK</span>
                        <div className="w-3 h-px bg-current" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-16 md:w-20 bg-white-pure flex flex-col items-center justify-center hover:bg-black-pure hover:text-white-pure focus:bg-primary-500 focus:text-black-pure active:bg-secondary-500 transition-colors duration-100 outline-none group"
                        aria-label="Next"
                    >
                        <span className="font-mono text-[9px] font-black mb-1 group-hover:translate-x-1 transition-transform">NEXT</span>
                        <div className="w-3 h-px bg-current" />
                    </button>
                </div>

                <button
                    onClick={() => {
                        const currentSlug = slides[selectedIndex]?.slug
                        if (currentSlug) router.push(`/discover/${currentSlug}`)
                    }}
                    className="flex-1 bg-primary-500 px-6 flex items-center justify-between text-black-pure hover:bg-black-pure hover:text-white-pure focus:bg-white-pure focus:text-black-pure active:bg-secondary-500 transition-all duration-300 group outline-none"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="font-mono text-[9px] font-black uppercase tracking-normal opacity-60 leading-none mb-1">STAMP_ACCESS</span>
                        <span className="font-race text-base md:text-lg tracking-tighter uppercase leading-none">ENTER GALLERY</span>
                    </div>
                    <div className="w-8 h-8 border border-black-pure group-hover:border-white-pure flex items-center justify-center transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform text-current">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    )
}

export default HeroSlides