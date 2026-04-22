'use client'

import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

export interface DataCard {
    id: string
    title: string
    category: string
    label: string
    href: string
    image: Media | string | null
    stats?: { label: string; value: string }[]
}

interface CardCarouselProps {
    cards: DataCard[]
    sectionTitle: string
    exploreLabel?: string
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards, sectionTitle, exploreLabel = 'EXPLORE' }) => {
    const [progress, setProgress] = useState(0)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        containScroll: 'trimSnaps'
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

    if (!cards || cards.length === 0) {
        return null
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b border-black-pure">
            <div className="flex h-16 md:h-20 border-b border-black-pure divide-x divide-black-pure bg-white-pure z-30">
                <div className="w-16 md:w-20 flex items-center justify-center bg-black-pure group hover:bg-primary-500 transition-colors duration-300">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-primary-500 group-hover:bg-black-pure rounded-sm rotate-45 group-hover:rotate-90 transition-all duration-500" />
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-neutral-400">
                        {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-white-pure">
                    <button
                        onClick={scrollPrev}
                        className="w-12 md:w-16 lg:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-black-pure transition-all duration-300 group"
                        aria-label="Previous slide"
                    >
                        <span className="font-mono text-xs md:text-sm font-black group-hover:scale-110 transition-transform">◀</span>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-12 md:w-16 lg:w-20 flex items-center justify-center hover:bg-primary-500 border-l border-black-pure transition-all duration-300 group"
                        aria-label="Next slide"
                    >
                        <span className="font-mono text-xs md:text-sm font-black group-hover:scale-110 transition-transform">▶</span>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {cards.map((card, index) => {
                        const placeholderId = `${card.id}-${index}`
                        const src = typeof card.image === 'string'
                            ? card.image
                            : card.image?.url || `https://picsum.photos/seed/${placeholderId}/600/800`

                        return (
                            <div
                                key={card.id}
                                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 border-r border-black-pure bg-white-pure group relative"
                            >
                                <Link
                                    href={card.href}
                                    className="flex flex-col h-full"
                                >
                                    <div className="relative aspect-[4/5] w-full border-b border-black-pure overflow-hidden">
                                        <Image
                                            src={src}
                                            alt={card.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black-pure/10 group-hover:bg-transparent transition-colors duration-500" />
                                        <div className="absolute top-0 left-0 bg-black-pure text-white-pure px-3 py-1 font-mono text-[9px] font-black uppercase">
                                            {card.category}
                                        </div>
                                    </div>

                                    <div className="p-5 md:p-8 flex flex-col justify-between flex-grow">
                                        <div>
                                            <span className="font-mono text-[9px] font-black text-primary-500 uppercase block mb-2 tracking-widest">
                                                {card.label}
                                            </span>
                                            <h3 className="font-bold text-xl md:text-2xl text-black-pure uppercase leading-tight group-hover:text-primary-500 transition-colors duration-300">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div className="mt-8">
                                            {card.stats && card.stats.length > 0 && (
                                                <div className="grid grid-cols-2 gap-4 border-t border-black-pure pt-4 mb-6">
                                                    {card.stats.map((stat, sIdx) => (
                                                        <div key={sIdx}>
                                                            <p className="font-mono text-[8px] text-neutral-400 uppercase">{stat.label}</p>
                                                            <p className="font-mono text-[10px] font-black text-black-pure">{stat.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-[10px] font-black uppercase tracking-widest">{exploreLabel}</span>
                                                <div className="w-8 h-8 bg-black-pure flex items-center justify-center text-white-pure group-hover:bg-primary-500 group-hover:text-black-pure transition-all duration-300">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="absolute top-0 right-0 w-8 h-8 bg-black-pure text-white-pure flex items-center justify-center font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="h-1.5 w-full bg-neutral-100 border-t border-black-pure">
                <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </section>
    )
}

export default CardCarousel