'use client'

import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import SectionScroller from './Scroller'

export interface CarouselGridItem {
    id: string
    title: string
    subtitle?: string
    label?: string
    image?: Media | string | null
    href?: string
    details?: { label: string; value: string }[]
}

interface DirectoryCarouselGridProps {
    id: string
    title: string
    items: CarouselGridItem[]
}

const DirectoryCarouselGrid: React.FC<DirectoryCarouselGridProps> = ({ id, title, items }) => {
    const [progress, setProgress] = useState(0)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        loop: true
    })

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
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-tertiary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="flex h-full">
                    <button onClick={scrollPrev} className="h-full px-4 md:px-6 border-l border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-300">
                        <span className="text-[9px] md:text-[10px] font-black uppercase">◀</span>
                    </button>
                    <button onClick={scrollNext} className="h-full px-4 md:px-6 border-l border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-300">
                        <span className="text-[9px] md:text-[10px] font-black uppercase">▶</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full">
                    {items.map((item, index) => {
                        const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/800/800`
                        const Wrapper = item.href ? Link : 'div'

                        return (
                            <Wrapper
                                key={index}
                                href={item.href as string}
                                className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_45%] lg:flex-[0_0_35%] xl:flex-[0_0_28%] min-w-0 h-full flex flex-col group bg-white-pure hover:bg-secondary-500/5 transition-all duration-500"
                            >
                                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-black-pure">
                                    <Image
                                        src={src as string}
                                        alt={item.title}
                                        fill
                                        className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                    />
                                    {item.label && (
                                        <div className="absolute top-4 md:top-6 left-4 md:left-6">
                                            <span className="bg-primary-500 text-black-pure px-2 py-1 md:px-3 md:py-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-wider border border-black-pure shadow-lg">
                                                {item.label}
                                            </span>
                                        </div>
                                    )}
                                    {item.href && (
                                        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                            <div className="bg-black-pure text-white-pure w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-white-pure/20">
                                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 md:p-6 lg:p-8 flex flex-col flex-1">
                                    <div className="mb-4 md:mb-6">
                                        <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase mt-1 md:mt-2 tracking-tight">
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {item.details && (
                                        <div className="mt-auto space-y-2 md:space-y-3">
                                            {item.details.map((detail, dIdx) => (
                                                <div key={dIdx} className="flex justify-between items-center border-b border-neutral-100 pb-1 md:pb-2 group-hover:border-primary-500/30 transition-colors duration-300">
                                                    <span className="text-[8px] md:text-[9px] text-neutral-400 font-black uppercase tracking-wider">{detail.label}</span>
                                                    <span className="text-[9px] md:text-[10px] text-black-pure font-black uppercase tracking-tighter group-hover:text-primary-500 transition-colors duration-300">{detail.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Wrapper>
                        )
                    })}
                </div>
            </div>

            <div className="h-1 w-full bg-neutral-100">
                <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <SectionScroller items={[title, "CAROUSEL", "BROWSE", "DISCOVER"]} variant={1} velocity={30} />
        </section>
    )
}

export default DirectoryCarouselGrid