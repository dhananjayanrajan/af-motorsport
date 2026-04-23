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
    distanceLabel = "Distance",
    statusLabel = "Status",
    viewDetailsLabel = "View Details",
    lengthLabel = "Length",
    turnsLabel = "Turns",
    exploreLabel = "Explore",
    noItemsLabel = "No Data Available"
}) => {
    const [progress, setProgress] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const autoplay = useMemo(() => Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true
    }), [autoplayDelay])

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
            className="group relative bg-card flex flex-col h-full border border-border rounded-lg overflow-hidden outline-none shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div className="relative aspect-video w-full bg-primary/10 overflow-hidden border-b border-border">
                <Image
                    src={(race.assets?.cover as Media)?.url || `https://picsum.photos/seed/${race.id}/800/450`}
                    alt={race.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-foreground/90 backdrop-blur-sm text-background px-4 py-2 font-mono text-sm font-semibold uppercase rounded-md">
                    {race.basics?.identifiers?.code || 'RC'}
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between bg-card group-hover:bg-primary/5 transition-colors duration-300">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-normal leading-none">
                        {race.name}
                    </h3>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between border-b border-border pb-2">
                            <span className="font-mono text-sm font-semibold text-muted-foreground uppercase">{distanceLabel}</span>
                            <span className="font-mono text-base font-semibold text-foreground">{race.details.distance_km || '---'} KM</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-2">
                            <span className="font-mono text-sm font-semibold text-muted-foreground uppercase">{statusLabel}</span>
                            <span className="font-mono text-base font-semibold text-foreground uppercase">{race.details.status || '---'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6">
                    <span className="font-mono text-sm font-semibold uppercase text-foreground">{viewDetailsLabel}</span>
                    <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors rounded-full">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )

    const CircuitCard = ({ circuit }: { circuit: Circuit }) => (
        <Link
            href={`${basePath}/competition/circuits/${circuit.slug}`}
            className="group relative bg-card flex flex-col h-full border border-border rounded-lg overflow-hidden outline-none shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div className="relative aspect-video w-full bg-secondary/10 overflow-hidden border-b border-border">
                <Image
                    src={(circuit.assets?.cover as Media)?.url || `https://picsum.photos/seed/${circuit.id}/800/450`}
                    alt={circuit.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-4 py-2 font-mono text-sm font-semibold border border-secondary rounded-md">
                    G{circuit.details?.fia_grade || '1'}
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between bg-card group-hover:bg-secondary/5 transition-colors duration-300">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-normal leading-none">
                        {circuit.name}
                    </h3>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between border-b border-border pb-2">
                            <span className="font-mono text-sm font-semibold text-muted-foreground uppercase">{lengthLabel}</span>
                            <span className="font-mono text-base font-semibold text-foreground">{circuit.details?.length_km || '0.0'} KM</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-2">
                            <span className="font-mono text-sm font-semibold text-muted-foreground uppercase">{turnsLabel}</span>
                            <span className="font-mono text-base font-semibold text-foreground">{circuit.details?.turns || '--'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6">
                    <span className="font-mono text-sm font-semibold uppercase text-foreground">{exploreLabel}</span>
                    <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors rounded-full">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )

    if (items.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-card border-2 border-border rounded-lg">
                <span className="font-mono text-base font-semibold text-foreground uppercase">{noItemsLabel}</span>
            </div>
        )
    }

    return (
        <div
            className="relative w-full h-full bg-background overflow-hidden border-y-4 border-border py-16 md:py-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <div className={`transition-transform duration-300 ${isDragging ? 'scale-[0.98]' : 'scale-100'}`} ref={emblaRef}>
                    <div className="flex">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/${slidesPerView} px-2`}
                            >
                                {item.type === 'race' && item.data ? <RaceCard race={item.data as Race} /> :
                                    item.type === 'circuit' && item.data ? <CircuitCard circuit={item.data as Circuit} /> : (
                                        <div className="relative aspect-video w-full border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
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

                <div className="mt-8 h-4 w-full bg-muted/50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.abs(progress - ((index + 1) / items.length) * 100) < 5
                                    ? 'bg-primary w-8'
                                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SectionCarousel