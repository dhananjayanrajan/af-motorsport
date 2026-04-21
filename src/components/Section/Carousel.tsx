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
    autoplayDelay = 4000,
    basePath = '',
    slidesPerView = 3,
    distanceLabel = "DISTANCE",
    statusLabel = "STATUS",
    viewDetailsLabel = "VIEW DETAILS",
    lengthLabel = "LENGTH",
    turnsLabel = "TURNS",
    exploreLabel = "EXPLORE",
    noItemsLabel = "NO DATA AVAILABLE"
}) => {
    const [progress, setProgress] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const autoplay = useMemo(() => Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true }), [autoplayDelay])

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
            duration: 30,
        },
        [autoplay]
    )

    const onPointerDown = useCallback(() => setIsDragging(true), [])
    const onPointerUp = useCallback(() => setIsDragging(false), [])

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => {
            const progressValue = ((emblaApi.selectedScrollSnap() + 1) / emblaApi.scrollSnapList().length) * 100
            setProgress(progressValue)
        }
        emblaApi.on('select', onSelect)
        emblaApi.on('pointerDown', onPointerDown)
        emblaApi.on('pointerUp', onPointerUp)
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('pointerDown', onPointerDown)
            emblaApi.off('pointerUp', onPointerUp)
        }
    }, [emblaApi, onPointerDown, onPointerUp])

    const RaceCard = ({ race }: { race: Race }) => (
        <Link
            href={`${basePath}/competition/races/${race.slug}`}
            className="group relative bg-white-pure flex flex-col h-full border-r-4 border-black-pure overflow-hidden outline-none"
        >
            <div className="relative aspect-video w-full bg-primary-500 overflow-hidden border-b-4 border-black-pure">
                <Image
                    src={(race.assets?.cover as Media)?.url || `https://picsum.photos/seed/${race.id}/800/450`}
                    alt={race.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 bg-black-pure text-white-pure px-4 py-2 font-mono text-xs font-black uppercase">
                    {race.basics?.identifiers?.code || 'RC'}
                </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between bg-white-pure group-hover:bg-primary-500 transition-colors duration-100">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-black-pure uppercase tracking-normal leading-none">
                        {race.name}
                    </h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between border-b-2 border-black-pure pb-1">
                            <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase">{distanceLabel}</span>
                            <span className="font-mono text-sm font-black text-black-pure">{race.details.distance_km || '---'} KM</span>
                        </div>
                        <div className="flex justify-between border-b-2 border-black-pure pb-1">
                            <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase">{statusLabel}</span>
                            <span className="font-mono text-sm font-black text-black-pure uppercase">{race.details.status || '---'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-6 mt-6">
                    <span className="font-mono text-xs font-black uppercase text-black-pure">{viewDetailsLabel}</span>
                    <div className="w-10 h-10 border-4 border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-colors">
                        <span className="text-xl font-black">→</span>
                    </div>
                </div>
            </div>
        </Link>
    )

    const CircuitCard = ({ circuit }: { circuit: Circuit }) => (
        <Link
            href={`${basePath}/competition/circuits/${circuit.slug}`}
            className="group relative bg-white-pure flex flex-col h-full border-r-4 border-black-pure overflow-hidden outline-none"
        >
            <div className="relative aspect-video w-full bg-secondary-500 overflow-hidden border-b-4 border-black-pure">
                <Image
                    src={(circuit.assets?.cover as Media)?.url || `https://picsum.photos/seed/${circuit.id}/800/450`}
                    alt={circuit.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 bg-secondary-500 text-black-pure px-4 py-2 font-mono text-xs font-black border-r-4 border-b-4 border-black-pure">
                    G{circuit.details?.fia_grade || '1'}
                </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between bg-white-pure group-hover:bg-secondary-500 transition-colors duration-100">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-black-pure uppercase tracking-normal leading-none">
                        {circuit.name}
                    </h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between border-b-2 border-black-pure pb-1">
                            <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase">{lengthLabel}</span>
                            <span className="font-mono text-sm font-black text-black-pure">{circuit.details?.length_km || '0.0'} KM</span>
                        </div>
                        <div className="flex justify-between border-b-2 border-black-pure pb-1">
                            <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase">{turnsLabel}</span>
                            <span className="font-mono text-sm font-black text-black-pure">{circuit.details?.turns || '--'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-6 mt-6">
                    <span className="font-mono text-xs font-black uppercase text-black-pure">{exploreLabel}</span>
                    <div className="w-10 h-10 border-4 border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-colors">
                        <span className="text-xl font-black">→</span>
                    </div>
                </div>
            </div>
        </Link>
    )

    if (items.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-white-pure border-4 border-black-pure">
                <span className="font-mono text-base font-black text-black-pure uppercase">{noItemsLabel}</span>
            </div>
        )
    }

    return (
        <div className="relative w-full h-full bg-white-pure overflow-hidden border-y-4 border-black-pure">
            <div className={`transition-transform duration-300 ${isDragging ? 'scale-[0.98]' : 'scale-100'}`} ref={emblaRef}>
                <div className="flex">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/${slidesPerView}`}
                        >
                            {item.type === 'race' && item.data ? <RaceCard race={item.data as Race} /> :
                                item.type === 'circuit' && item.data ? <CircuitCard circuit={item.data as Circuit} /> : (
                                    <div className="relative aspect-video w-full border-r-4 border-black-pure overflow-hidden">
                                        <Image
                                            src={item.media?.url || `https://picsum.photos/seed/${item.id}/800/600`}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-4 w-full bg-black-pure/10">
                <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}

export default SectionCarousel