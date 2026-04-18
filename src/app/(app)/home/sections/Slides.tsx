"use client"

import { Media, Slide } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

import SectionCTA from '@/components/Section/CTA'
import SectionScroller from '@/components/Section/Scroller'

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
        <section className="relative w-full min-h-screen md:h-screen bg-white-pure overflow-hidden flex flex-col border-b-2 border-black-pure">
            <div className="flex-1 relative overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="flex-[0_0_100%] min-w-0 h-full grid grid-cols-12">
                            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black-pure bg-white-pure z-20 h-auto lg:h-full">
                                <div className="flex flex-col gap-8 md:gap-12">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-black-pure flex items-center justify-center text-white-pure font-black text-xl md:text-2xl shrink-0">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                                    {slide.basics?.identifiers?.code || 'AUTH-ID'}
                                                </span>
                                                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-black-pure/40">
                                                    {slide.details?.type || 'CORE.MODULE'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-5xl md:text-7xl font-black text-black-pure uppercase tracking-tighter leading-[0.85] break-words">
                                            {slide.name}
                                        </h1>
                                        <h2 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tighter leading-none italic">
                                            {slide.alias}
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 md:gap-8 mt-12 lg:mt-0">
                                    <div className="w-full h-px bg-black-pure/10" />
                                    <p className="text-base md:text-lg font-mono text-black-pure font-bold uppercase leading-tight tracking-tight max-w-md">
                                        {slide.basics?.description || 'SYSTEM DESCRIPTION UNAVAILABLE.'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {slide.traits?.tags?.list?.map((tag, i) => (
                                            <span key={i} className="bg-black-pure text-white-pure text-[9px] md:text-[10px] font-black px-2 md:px-3 py-1 uppercase tracking-widest">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-7 relative bg-white-200 h-[50vh] lg:h-full">
                                <Image
                                    src={(slide.assets?.background as Media)?.url || `https://picsum.photos/seed/${slide.id}/1200/800`}
                                    alt={slide.name}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border-l-0 lg:border-l-2 border-black-pure pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-auto md:h-32 bg-white-pure border-t-2 border-black-pure flex flex-col md:flex-row w-full z-40 shrink-0">
                <div className="w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-black-pure h-24 md:h-full flex flex-row md:flex-col items-center justify-center p-4 md:p-6 gap-4 md:gap-2 shrink-0">
                    <div className="flex items-end gap-1 shrink-0">
                        <span className="text-3xl md:text-5xl font-black text-black-pure leading-none">
                            {String(selectedIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm md:text-xl font-black text-primary mb-1">
                            / {String(slides.length).padStart(2, '0')}
                        </span>
                    </div>
                    <div className="flex-1 md:w-full h-1 md:h-2 bg-white-200 relative">
                        <div
                            className="absolute left-0 top-0 h-full bg-black-pure transition-all duration-700 ease-in-out"
                            style={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex h-20 md:h-full border-b-2 md:border-b-0 md:border-r-2 border-black-pure shrink-0">
                    <button
                        onClick={scrollPrev}
                        className="flex-1 md:w-24 h-full bg-white-pure flex items-center justify-center hover:bg-primary transition-colors duration-300 border-r-2 border-black-pure group"
                    >
                        <div className="flex flex-col items-center gap-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180 group-active:translate-x-[-4px] transition-transform">
                                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="4" />
                            </svg>
                            <kbd className="hidden md:block px-1.5 py-0.5 bg-white-200 border-b-2 border-black-pure font-mono text-[8px] font-black">PREV</kbd>
                        </div>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="flex-1 md:w-24 h-full bg-white-pure flex items-center justify-center hover:bg-primary transition-colors duration-300 group"
                    >
                        <div className="flex flex-col items-center gap-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-active:translate-x-[4px] transition-transform">
                                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="4" />
                            </svg>
                            <kbd className="hidden md:block px-1.5 py-0.5 bg-white-200 border-b-2 border-black-pure font-mono text-[8px] font-black">NEXT</kbd>
                        </div>
                    </button>
                </div>

                <div className="flex-1 h-16 md:h-full flex items-center overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black-pure bg-white-pure">
                    <div className="w-full">
                        <SectionScroller
                            items={slides.map(s => s.name)}
                            velocity={15}
                            backgroundColor="bg-white-pure"
                            textColor="text-black-pure font-black uppercase"
                        />
                    </div>
                </div>

                <div className="w-full md:w-fit h-auto md:h-full flex shrink-0">
                    <SectionCTA
                        variant={1}
                        label="INITIALIZE SEQUENCE"
                        path={slides[selectedIndex]?.slug || "/"}
                        buttonBgColor="bg-primary"
                        buttonTextColor="text-black-pure"
                        onClick={() => slides[selectedIndex]?.slug && router.push(`/discover/${slides[selectedIndex].slug}`)}
                    />
                </div>
            </div>
        </section>
    )
}

export default HeroSlides