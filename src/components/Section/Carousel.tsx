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
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({
    items,
    variant = 1,
    cardVariant = 'default',
    autoplayDelay = 4000,
    basePath = '',
    slidesPerView = 1
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
            dragFree: false,
            align: 'start',
            skipSnaps: false,
            duration: 30,
            slidesToScroll: 1
        },
        [autoplay]
    )

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev()
        }
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext()
        }
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            if (!emblaApi) return
            const snapIndex = emblaApi.selectedScrollSnap()
            const totalSlides = Math.ceil(items.length / slidesPerView)
            const progressValue = ((snapIndex + 1) / totalSlides) * 100
            setProgress(progressValue)
        }

        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, items.length, slidesPerView])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!emblaApi) return
            if (e.key === 'ArrowLeft') {
                e.preventDefault()
                scrollPrev()
            } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                scrollNext()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [emblaApi, scrollPrev, scrollNext])

    useEffect(() => {
        if (emblaApi) {
            setTimeout(() => {
                emblaApi.reInit()
            }, 0)
        }
    }, [items, emblaApi, slidesPerView])

    const RaceCard = ({ race }: { race: Race }) => (
        <Link
            href={`${basePath}/competition/races/${race.slug}`}
            className="group/race relative bg-white-pure flex flex-col h-full transition-colors duration-500"
        >
            <div className="p-4 md:p-6 border-b-2 border-black-pure flex justify-between items-start bg-white-100 group-hover/race:bg-primary-500 transition-colors">
                <h3 className="text-base md:text-lg font-black text-black-pure uppercase tracking-tighter leading-none group-hover/race:text-black-pure line-clamp-1">
                    {race.name}
                </h3>
                <div className="px-2 py-0.5 border-2 border-black-pure font-mono text-[10px] font-black uppercase bg-white-pure group-hover/race:bg-black-pure group-hover/race:text-white-pure shrink-0 ml-2 transition-colors">
                    {race.basics?.identifiers?.code || 'RCE'}
                </div>
            </div>
            <div className="relative h-40 md:h-48 w-full bg-white-200 overflow-hidden border-b-2 border-black-pure">
                <Image
                    src={(race.assets?.cover as Media)?.url || `https://picsum.photos/seed/${race.id}/400/300`}
                    alt={race.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover/race:grayscale-0 transition-all duration-700 group-hover/race:scale-110"
                />
            </div>
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between gap-4 bg-white-pure group-hover/race:bg-black-pure transition-colors">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-black-pure/40 uppercase font-black group-hover/race:text-white-pure/40">Distance</span>
                        <span className="text-lg md:text-xl font-black text-black-pure group-hover/race:text-white-pure">
                            {race.details.distance_km || '---'}<span className="text-xs ml-1">KM</span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-black-pure/40 uppercase font-black group-hover/race:text-white-pure/40">Status</span>
                        <span className="text-lg md:text-xl font-black text-black-pure group-hover/race:text-white-pure uppercase text-sm">
                            {race.details.status || '---'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t-2 border-black-pure/10 group-hover/race:border-white-pure/20">
                    <span className="font-mono text-[10px] font-black text-primary-500 group-hover/race:text-primary-400 uppercase">View Details</span>
                    <div className="size-8 md:size-10 border-2 border-black-pure flex items-center justify-center group-hover/race:bg-white-pure group-hover/race:text-black-pure transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
            className="group/circuit relative bg-white-pure flex flex-col h-full transition-colors duration-500"
        >
            <div className="p-4 md:p-6 border-b-2 border-black-pure flex justify-between items-start bg-white-100 group-hover/circuit:bg-secondary-500 transition-colors">
                <h3 className="text-base md:text-lg font-black text-black-pure uppercase tracking-tighter leading-none group-hover/circuit:text-black-pure line-clamp-1">
                    {circuit.name}
                </h3>
                <div className="px-2 py-0.5 border-2 border-black-pure font-mono text-[10px] font-black uppercase bg-white-pure group-hover/circuit:bg-black-pure group-hover/circuit:text-white-pure shrink-0 ml-2 transition-colors">
                    G{circuit.details?.fia_grade || '1'}
                </div>
            </div>
            <div className="relative h-40 md:h-48 w-full bg-white-200 overflow-hidden border-b-2 border-black-pure">
                <Image
                    src={(circuit.assets?.cover as Media)?.url || `https://picsum.photos/seed/${circuit.id}/400/300`}
                    alt={circuit.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover/circuit:grayscale-0 transition-all duration-700 group-hover/circuit:scale-110"
                />
            </div>
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between gap-4 bg-white-pure group-hover/circuit:bg-black-pure transition-colors">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-black-pure/40 uppercase font-black group-hover/circuit:text-white-pure/40">Length</span>
                        <span className="text-lg md:text-xl font-black text-black-pure group-hover/circuit:text-white-pure">
                            {circuit.details?.length_km || '0.0'}<span className="text-xs ml-1">KM</span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-black-pure/40 uppercase font-black group-hover/circuit:text-white-pure/40">Turns</span>
                        <span className="text-lg md:text-xl font-black text-black-pure group-hover/circuit:text-white-pure">
                            {circuit.details?.turns || '--'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t-2 border-black-pure/10 group-hover/circuit:border-white-pure/20">
                    <span className="font-mono text-[10px] font-black text-secondary-500 group-hover/circuit:text-secondary-400 uppercase">Explore</span>
                    <div className="size-8 md:size-10 border-2 border-black-pure flex items-center justify-center group-hover/circuit:bg-white-pure group-hover/circuit:text-black-pure transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )

    const CompactCard = ({ item }: { item: CarouselItem }) => (
        <div className="group/compact relative bg-black-pure flex flex-col h-full">
            <div className="relative flex-1 overflow-hidden">
                <Image
                    src={item.media?.url || `https://picsum.photos/seed/${item.id}/400/400`}
                    alt={item.media?.alt || ''}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover/compact:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black-pure to-transparent">
                <span className="font-mono text-xs font-black text-white-pure uppercase">
                    {item.data && 'name' in item.data ? item.data.name : 'Item'}
                </span>
            </div>
        </div>
    )

    const DefaultCard = ({ item }: { item: CarouselItem }) => (
        <div className="relative w-full h-full bg-white-200 overflow-hidden">
            <Image
                src={item.media?.url || `https://picsum.photos/seed/${item.id}/800/600`}
                alt={item.media?.alt || ''}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority={item.id === items[0]?.id}
            />
        </div>
    )

    const renderSlideContent = (item: CarouselItem) => {
        if (item.type === 'race' && item.data) {
            return <RaceCard race={item.data as Race} />
        }
        if (item.type === 'circuit' && item.data) {
            return <CircuitCard circuit={item.data as Circuit} />
        }
        if (cardVariant === 'compact') {
            return <CompactCard item={item} />
        }
        return <DefaultCard item={item} />
    }

    if (items.length === 0) {
        return (
            <div className="relative w-full h-full min-h-[400px] bg-white-200 flex items-center justify-center">
                <span className="font-mono text-sm text-black-pure/40 uppercase">No items</span>
            </div>
        )
    }

    const slideGroups: CarouselItem[][] = []
    for (let i = 0; i < items.length; i += slidesPerView) {
        slideGroups.push(items.slice(i, i + slidesPerView))
    }

    if (variant === 2) {
        return (
            <div className="relative w-full h-full min-h-[500px] bg-black-pure group overflow-hidden">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                        {slideGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="flex-[0_0_100%] min-w-0 h-full">
                                <div className={`grid ${slidesPerView === 1 ? 'grid-cols-1' : slidesPerView === 2 ? 'grid-cols-2' : 'grid-cols-3'} h-full divide-x-2 divide-black-pure`}>
                                    {group.map((item) => (
                                        <div key={item.id} className="h-full">
                                            {renderSlideContent(item)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white-pure/20">
                    <div
                        className="h-full bg-primary-500 transition-all duration-300 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white-pure text-black-pure font-black hover:bg-primary-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous slide"
                >
                    ←
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white-pure text-black-pure font-black hover:bg-primary-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Next slide"
                >
                    →
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="relative w-full h-full min-h-[400px] p-2 bg-white-pure group">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                        {slideGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="flex-[0_0_100%] min-w-0 h-full">
                                <div className={`grid ${slidesPerView === 1 ? 'grid-cols-1' : slidesPerView === 2 ? 'grid-cols-2' : 'grid-cols-3'} h-full gap-2`}>
                                    {group.map((item) => (
                                        <div key={item.id} className="h-full">
                                            {renderSlideContent(item)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={scrollPrev}
                    className="absolute top-4 right-16 w-8 h-8 bg-black-pure text-white-pure flex items-center justify-center text-xs hover:bg-primary-500 transition-colors z-10"
                    aria-label="Previous slide"
                >
                    ↑
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute top-4 right-4 w-8 h-8 bg-black-pure text-white-pure flex items-center justify-center text-xs hover:bg-primary-500 transition-colors z-10"
                    aria-label="Next slide"
                >
                    ↓
                </button>
            </div>
        )
    }

    return (
        <div className="relative w-full h-full min-h-[400px] bg-white-200 overflow-hidden group">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slideGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex-[0_0_100%] min-w-0 h-full">
                            <div className={`grid ${slidesPerView === 1 ? 'grid-cols-1' : slidesPerView === 2 ? 'grid-cols-2' : 'grid-cols-3'} h-full divide-x-2 divide-black-pure`}>
                                {group.map((item) => (
                                    <div key={item.id} className="h-full">
                                        {renderSlideContent(item)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-1 z-10">
                <div className="w-4 h-4 bg-secondary-500" />
                <div className="w-4 h-4 bg-primary-500" />
            </div>
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black-pure text-white-pure flex items-center justify-center hover:bg-secondary-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous slide"
            >
                ←
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next slide"
            >
                →
            </button>
        </div>
    )
}

export default SectionCarousel