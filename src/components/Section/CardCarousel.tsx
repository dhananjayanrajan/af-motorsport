"use client"
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

const CardCarousel: React.FC<CardCarouselProps> = ({
    cards,
    sectionTitle,
    exploreLabel = 'Explore'
}) => {
    const [progress, setProgress] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

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
        <section
            className="relative w-full bg-background flex flex-col overflow-hidden py-16 md:py-24 border-b border-border"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground uppercase tracking-tight">
                        {sectionTitle}
                    </h2>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
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
                                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 border-r border-border last:border-r-0 bg-card group relative px-2"
                                >
                                    <Link
                                        href={card.href}
                                        className="flex flex-col h-full border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                                            <Image
                                                src={src}
                                                alt={card.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                                            <div className="absolute top-4 left-4 bg-foreground/90 backdrop-blur-sm text-background px-3 py-1 font-mono text-sm font-semibold uppercase rounded-md">
                                                {card.category}
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                                            <div>
                                                <span className="font-mono text-sm font-semibold text-primary uppercase block mb-2 tracking-wider">
                                                    {card.label}
                                                </span>
                                                <h3 className="font-bold text-xl md:text-2xl text-foreground uppercase leading-tight group-hover:text-primary transition-colors duration-300">
                                                    {card.title}
                                                </h3>
                                            </div>

                                            <div className="mt-8">
                                                {card.stats && card.stats.length > 0 && (
                                                    <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 mb-6">
                                                        {card.stats.map((stat, sIdx) => (
                                                            <div key={sIdx}>
                                                                <p className="font-mono text-xs text-muted-foreground uppercase">{stat.label}</p>
                                                                <p className="font-mono text-sm font-semibold text-foreground">{stat.value}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <span className="font-mono text-sm font-semibold uppercase tracking-wider">{exploreLabel}</span>
                                                    <div className="w-10 h-10 bg-foreground flex items-center justify-center text-background group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 rounded-full">
                                                        <ChevronRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="absolute top-4 right-4 w-8 h-8 bg-foreground text-background flex items-center justify-center font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-8 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.abs(progress - ((index + 1) / cards.length) * 100) < 5
                                    ? 'bg-primary w-8'
                                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CardCarousel