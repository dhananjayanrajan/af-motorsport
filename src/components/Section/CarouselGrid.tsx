'use client'

import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
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
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section className="relative w-full min-h-[60vh] bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
                <div className="flex h-full">
                    <button
                        onClick={scrollPrev}
                        className="h-full px-6 border-l border-black-pure hover:bg-neutral-50 transition-colors"
                    >
                        <span className="text-[10px] font-bold uppercase">Prev</span>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="h-full px-6 border-l border-black-pure hover:bg-neutral-50 transition-colors"
                    >
                        <span className="text-[10px] font-bold uppercase">Next</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex h-full divide-x divide-black-pure">
                    {items.map((item, index) => {
                        const src = typeof item.image === 'object' ? item.image?.url : item.image || `https://picsum.photos/seed/${item.id}/800/800`
                        const Wrapper = item.href ? Link : 'div'

                        return (
                            <Wrapper
                                key={index}
                                href={item.href as string}
                                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_22%] min-w-0 h-full flex flex-col group bg-white-pure hover:bg-neutral-50 transition-colors duration-500"
                            >
                                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-black-pure">
                                    <Image
                                        src={src as string}
                                        alt={item.title}
                                        fill
                                        className="object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                    {item.label && (
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-primary-500 text-black-pure px-3 py-1 text-[9px] font-bold uppercase tracking-widest border border-black-pure">
                                                {item.label}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 lg:p-10 flex flex-col flex-1">
                                    <div className="mb-8">
                                        <h3 className="font-race text-2xl lg:text-3xl text-black-pure uppercase leading-[0.9] group-hover:text-primary-500 transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className="text-[10px] font-bold text-neutral-400 uppercase mt-3 tracking-tight">
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {item.details && (
                                        <div className="mt-auto space-y-3">
                                            {item.details.map((detail, dIdx) => (
                                                <div key={dIdx} className="flex justify-between items-center border-b border-neutral-100 pb-2">
                                                    <span className="text-[9px] text-neutral-400 font-bold uppercase">{detail.label}</span>
                                                    <span className="text-[10px] text-black-pure font-bold uppercase tracking-tighter">{detail.value}</span>
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

            <div className="z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, "HORIZONTAL_SCAN", `TOTAL_COUNT_${items.length}`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default DirectoryCarouselGrid