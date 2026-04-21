'use client'

import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import SectionScroller from './Scroller'

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
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards, sectionTitle }) => {
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

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-black-pure group">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-primary-500 rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-neutral-400">
                        {sectionTitle}
                    </h2>
                </div>
                <div className="flex bg-white-pure">
                    <button onClick={scrollPrev} className="w-16 md:w-20 flex items-center justify-center hover:bg-primary-500 border-l-4 border-black-pure transition-all duration-300 group">
                        <span className="font-mono text-[10px] md:text-xs font-black group-hover:scale-110 transition-transform">◀</span>
                    </button>
                    <button onClick={scrollNext} className="w-16 md:w-20 flex items-center justify-center hover:bg-primary-500 border-l-4 border-black-pure transition-all duration-300 group">
                        <span className="font-mono text-[10px] md:text-xs font-black group-hover:scale-110 transition-transform">▶</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {cards.map((card, index) => {
                        const src = typeof card.image === 'string' ? card.image : card.image?.url || `https://picsum.photos/seed/${card.id}/600/800`

                        return (
                            <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 h-full border-r-4 border-black-pure bg-white-pure group relative">
                                <Link href={card.href} className="flex flex-col h-full">
                                    <div className="relative h-2/3 w-full border-b-4 border-black-pure overflow-hidden">
                                        <Image
                                            src={src}
                                            alt={card.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/20 transition-colors duration-500" />
                                        <div className="absolute top-4 left-4 bg-black-pure text-white-pure px-2 py-1 md:px-3 md:py-1.5 font-mono text-[8px] md:text-[9px] font-black uppercase border border-white-pure/20">
                                            {card.category}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                                        <div>
                                            <span className="font-mono text-[8px] md:text-[9px] font-black text-primary-500 uppercase block mb-1 md:mb-2 tracking-wider">
                                                {card.label}
                                            </span>
                                            <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] group-hover:text-primary-500 transition-colors duration-300">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div className="space-y-3 md:space-y-4 mt-4 md:mt-6">
                                            {card.stats && (
                                                <div className="grid grid-cols-2 gap-3 md:gap-4 border-t-2 border-black-pure pt-3 md:pt-4">
                                                    {card.stats.map((stat, sIdx) => (
                                                        <div key={sIdx}>
                                                            <p className="font-mono text-[7px] md:text-[8px] text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                                                            <p className="font-mono text-[8px] md:text-[9px] font-black text-black-pure">{stat.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between group-hover:pl-4 transition-all duration-300">
                                                <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-wider">EXPLORE</span>
                                                <div className="w-6 h-6 md:w-8 md:h-8 bg-black-pure flex items-center justify-center text-white-pure group-hover:bg-primary-500 group-hover:text-black-pure transition-all duration-300">
                                                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-black-pure text-white-pure flex items-center justify-center font-mono text-[8px] md:text-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="h-1 w-full bg-neutral-200">
                <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <SectionScroller items={[sectionTitle, "EXPLORE", "DISCOVER", "CONNECT"]} variant={3} velocity={25} />
        </section>
    )
}

export default CardCarousel