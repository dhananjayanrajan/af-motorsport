'use client'

import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
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
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps'
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section className="relative w-full h-screen bg-white-pure flex flex-col overflow-hidden border-b-[12px] border-black-pure">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-black-pure">
                    <div className="w-4 h-4 bg-primary-500 rounded-sm rotate-45" />
                </div>
                <div className="flex-1 flex items-center px-8">
                    <h2 className="font-mono text-[10px] font-black tracking-widest uppercase text-black-pure">
                        DATABASE_EXPLORER // {sectionTitle}
                    </h2>
                </div>
                <div className="flex">
                    <button onClick={scrollPrev} className="w-20 flex items-center justify-center hover:bg-neutral-100 border-l-4 border-black-pure transition-colors">
                        <span className="font-mono text-[10px] font-black italic">PRV</span>
                    </button>
                    <button onClick={scrollNext} className="w-20 flex items-center justify-center hover:bg-neutral-100 border-l-4 border-black-pure transition-colors">
                        <span className="font-mono text-[10px] font-black italic">NXT</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {cards.map((card, index) => {
                        const src = typeof card.image === 'string' ? card.image : card.image?.url || `https://picsum.photos/seed/${card.id}/600/800`

                        return (
                            <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 h-full border-r-4 border-black-pure bg-white-pure group relative">
                                <Link href={card.href} className="flex flex-col h-full">
                                    <div className="relative h-2/3 w-full border-b-4 border-black-pure overflow-hidden">
                                        <Image
                                            src={src}
                                            alt={card.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className="absolute top-4 left-4 bg-black-pure text-white-pure px-3 py-1 font-mono text-[9px] font-black uppercase">
                                            {card.category}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-8 flex flex-col justify-between">
                                        <div>
                                            <span className="font-mono text-[9px] font-black text-primary-500 uppercase block mb-2">
                                                {card.label}
                                            </span>
                                            <h3 className="font-race text-3xl text-black-pure uppercase leading-none group-hover:text-primary-500 transition-colors">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div className="space-y-4">
                                            {card.stats && (
                                                <div className="grid grid-cols-2 gap-4 border-t-2 border-black-pure pt-4">
                                                    {card.stats.map((stat, sIdx) => (
                                                        <div key={sIdx}>
                                                            <p className="font-mono text-[8px] text-neutral-400 uppercase">{stat.label}</p>
                                                            <p className="font-mono text-[10px] font-black text-black-pure">{stat.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between group-hover:pl-4 transition-all duration-300">
                                                <span className="font-mono text-[10px] font-black uppercase">Inspect Asset</span>
                                                <div className="w-8 h-8 bg-black-pure flex items-center justify-center text-white-pure">
                                                    +
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="absolute top-0 right-0 w-8 h-8 bg-black-pure text-white-pure flex items-center justify-center font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="z-30 bg-primary-500 text-black-pure">
                <SectionScroller
                    items={[sectionTitle, "CARD_MOD_INDEX", "ACTIVE_SELECTION", "LIVE_DATABASE"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default CardCarousel