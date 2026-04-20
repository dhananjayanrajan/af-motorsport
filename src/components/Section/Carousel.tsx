"use client"

import { Circuit, Media, Race } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type CarouselItem = {
    id: string
    type: 'image' | 'race' | 'circuit'
    media?: Media | { url: string; alt?: string }
    data?: Race | Circuit
}

interface SectionCarouselProps {
    items: CarouselItem[]
    variant?: 1 | 2 | 3
    cardVariant?: 'default' | 'race' | 'circuit' | 'compact'
    autoplayDelay?: number
    basePath?: string
    slidesPerView?: number
    distanceLabel?: string
    statusLabel?: string
    viewDetailsLabel?: string
    lengthLabel?: string
    turnsLabel?: string
    exploreLabel?: string
    noItemsLabel?: string
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({
    items,
    variant = 1,
    cardVariant = 'default',
    autoplayDelay = 4000,
    basePath = '',
    slidesPerView = 1,
    distanceLabel = "DIST",
    statusLabel = "STAT",
    viewDetailsLabel = "DETAILS",
    lengthLabel = "LEN",
    turnsLabel = "TURNS",
    exploreLabel = "EXPLORE",
    noItemsLabel = "NO DATA AVAILABLE"
}) => {
    const [progress, setProgress] = useState(0)

    const autoplayOptions = useMemo(() => ({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true
    }), [autoplayDelay])

    const autoplay = useMemo(() => Autoplay(autoplayOptions), [autoplayOptions])

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
            duration: 25,
            slidesToScroll: 1,
            breakpoints: {
                '(min-width: 768px)': { slidesToScroll: 1 },
            }
        },
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
        emblaApi.on('reInit', onSelect)
        onSelect()
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi])

    const RaceCard = ({ race }: { race: Race }) => (
        <Link
            href={`${basePath}/competition/races/${race.slug}`}
            className="group relative bg-white-pure flex flex-col h-full border-r border-black-pure overflow-hidden"
        >
            <div className="relative aspect-[4/3] w-full bg-zinc-100 overflow-hidden border-b border-black-pure">
                <Image
                    src={(race.assets?.cover as Media)?.url || `https://picsum.photos/seed/${race.id}/600/450`}
                    alt={race.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10">
                    <span className="font-mono text-[10px] font-black bg-black-pure text-white-pure px-2 py-1 uppercase tracking-tighter">
                        {race.basics?.identifiers?.code || 'RC'}
                    </span>
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between bg-white-pure group-hover:bg-primary-500 transition-colors">
                <div className="space-y-4">
                    <h3 className="text-xl font-race font-black text-black-pure uppercase tracking-tighter leading-[0.9] group-hover:text-black-pure">
                        {race.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-px bg-black-pure/10">
                        <div className="bg-transparent py-2">
                            <p className="font-mono text-[8px] font-black text-black-pure/40 uppercase">{distanceLabel}</p>
                            <p className="font-race font-black text-sm text-black-pure">{race.details.distance_km || '---'} KM</p>
                        </div>
                        <div className="bg-transparent py-2 pl-4 border-l border-black-pure/10">
                            <p className="font-mono text-[8px] font-black text-black-pure/40 uppercase">{statusLabel}</p>
                            <p className="font-race font-black text-sm text-black-pure uppercase">{race.details.status || '---'}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-black-pure/10 mt-4">
                    <span className="font-mono text-[10px] font-black uppercase text-black-pure tracking-widest">{viewDetailsLabel}</span>
                    <div className="size-8 border border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )

    const CircuitCard = ({ circuit }: { circuit: Circuit }) => (
        <Link
            href={`${basePath}/competition/circuits/${circuit.slug}`}
            className="group relative bg-white-pure flex flex-col h-full border-r border-black-pure overflow-hidden"
        >
            <div className="relative aspect-[4/3] w-full bg-zinc-100 overflow-hidden border-b border-black-pure">
                <Image
                    src={(circuit.assets?.cover as Media)?.url || `https://picsum.photos/seed/${circuit.id}/600/450`}
                    alt={circuit.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10">
                    <span className="font-mono text-[10px] font-black bg-secondary-500 text-black-pure px-2 py-1 uppercase tracking-tighter">
                        G{circuit.details?.fia_grade || '1'}
                    </span>
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between bg-white-pure group-hover:bg-secondary-500 transition-colors">
                <div className="space-y-4">
                    <h3 className="text-xl font-race font-black text-black-pure uppercase tracking-tighter leading-[0.9] group-hover:text-black-pure">
                        {circuit.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-px bg-black-pure/10">
                        <div className="bg-transparent py-2">
                            <p className="font-mono text-[8px] font-black text-black-pure/40 uppercase">{lengthLabel}</p>
                            <p className="font-race font-black text-sm text-black-pure">{circuit.details?.length_km || '0.0'} KM</p>
                        </div>
                        <div className="bg-transparent py-2 pl-4 border-l border-black-pure/10">
                            <p className="font-mono text-[8px] font-black text-black-pure/40 uppercase">{turnsLabel}</p>
                            <p className="font-race font-black text-sm text-black-pure">{circuit.details?.turns || '--'}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-black-pure/10 mt-4">
                    <span className="font-mono text-[10px] font-black uppercase text-black-pure tracking-widest">{exploreLabel}</span>
                    <div className="size-8 border border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )

    const renderSlideContent = (item: CarouselItem) => {
        if (item.type === 'race' && item.data) return <RaceCard race={item.data as Race} />
        if (item.type === 'circuit' && item.data) return <CircuitCard circuit={item.data as Circuit} />
        return (
            <div className="relative aspect-[4/3] md:h-full w-full border-r border-black-pure overflow-hidden">
                <Image
                    src={item.media?.url || `https://picsum.photos/seed/${item.id}/800/600`}
                    alt={item.media?.alt || ''}
                    fill
                    className="object-cover"
                />
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-zinc-50 border border-black-pure border-dashed">
                <span className="font-mono text-[10px] font-black text-black-pure/20 uppercase tracking-[0.4em]">{noItemsLabel}</span>
            </div>
        )
    }

    return (
        <div className="relative w-full h-full bg-white-pure group overflow-hidden">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`min-w-0 flex-shrink-0 flex-grow-0 
                basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/${slidesPerView}
              `}
                        >
                            {renderSlideContent(item)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black-pure/5 z-20">
                <div
                    className="h-full bg-primary-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={scrollPrev}
                    className="size-12 bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary-500 hover:text-black-pure transition-all pointer-events-auto shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5"
                >
                    <span className="text-xl">←</span>
                </button>
                <button
                    onClick={scrollNext}
                    className="size-12 bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary-500 hover:text-black-pure transition-all pointer-events-auto shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5"
                >
                    <span className="text-xl">→</span>
                </button>
            </div>
        </div>
    )
}

export default SectionCarousel