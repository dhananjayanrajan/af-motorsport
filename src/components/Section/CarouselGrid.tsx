"use client"
import { Media } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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
    const [isHovered, setIsHovered] = useState(false)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        loop: false
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onScroll = () => {
            const progressValue = Math.max(0, Math.min(1, emblaApi.scrollProgress())) * 100
            setProgress(progressValue)
        }

        emblaApi.on('scroll', onScroll)
        onScroll()

        return () => {
            emblaApi.off('scroll', onScroll)
        }
    }, [emblaApi])

    if (!items || items.length === 0) return null

    return (
        <section
            className="relative w-full bg-background flex flex-col py-16 md:py-24 border-b border-border overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={3} />

                <div className="mt-8 mb-12 flex h-12 bg-foreground border-b border-border items-center justify-between rounded-t-lg">
                    <div className="flex items-center px-6 gap-4">
                        <span className="font-mono text-sm font-semibold text-primary uppercase tracking-wider">
                            Slide Array Active // {items.length.toString().padStart(3, '0')} Records
                        </span>
                        <div className="h-4 w-px bg-white/20" />
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-white rotate-45 rounded-sm" />
                            ))}
                        </div>
                    </div>

                    <div className="flex h-full border-l-2 border-white/10">
                        <button
                            onClick={scrollPrev}
                            className="h-full px-6 hover:bg-primary text-white hover:text-primary-foreground transition-colors border-r-2 border-white/10"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="h-full px-6 hover:bg-primary text-white hover:text-primary-foreground transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing border-b border-border rounded-lg" ref={emblaRef}>
                    <div className="flex">
                        {items.map((item, index) => {
                            const src = typeof item.image === 'object' ? item.image?.url : item.image || ''
                            const Wrapper = item.href ? Link : 'div'

                            return (
                                <Wrapper
                                    key={item.id}
                                    href={item.href as string}
                                    className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 border-r border-border last:border-r-0 group bg-card hover:bg-accent/50 transition-colors duration-300 px-2"
                                >
                                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-border rounded-lg">
                                        <Image
                                            src={src as string}
                                            alt={item.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />

                                        {item.label && (
                                            <div className="absolute top-4 left-4">
                                                <div className="bg-primary border-2 border-foreground px-3 py-1 shadow-sm rounded-md">
                                                    <span className="font-mono text-sm font-semibold text-primary-foreground uppercase tracking-tighter">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="absolute top-4 right-4">
                                            <span className="font-mono text-sm font-semibold text-background mix-blend-difference opacity-60">
                                                Index {(index + 1).toString().padStart(3, '0')}
                                            </span>
                                        </div>

                                        {item.href && (
                                            <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                                                <div className="bg-foreground text-primary w-12 h-12 flex items-center justify-center border-2 border-primary shadow-sm rounded-full">
                                                    <ChevronRight className="w-6 h-6" strokeWidth={3} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="mb-8">
                                            <h3 className="font-bold text-2xl md:text-3xl text-foreground uppercase leading-none tracking-tighter italic group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            {item.subtitle && (
                                                <p className="font-mono text-sm font-semibold text-muted-foreground uppercase mt-2 tracking-wider pl-1">
                                                    {item.subtitle}
                                                </p>
                                            )}
                                        </div>

                                        {item.details && (
                                            <div className="mt-auto pt-8 border-t-2 border-border/10 space-y-2">
                                                {item.details.map((detail, dIdx) => (
                                                    <div key={dIdx} className="flex justify-between items-end border-b border-border/5 pb-1">
                                                        <span className="font-mono text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                                                            {detail.label}
                                                        </span>
                                                        <span className="text-sm text-foreground font-semibold uppercase italic tracking-tighter">
                                                            {detail.value}
                                                        </span>
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

                <div className="mt-8 h-2 w-full bg-black/5 relative rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-150 ease-out rounded-full"
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

                <div className="mt-16">
                    <SectionFooter variant={2} />
                </div>
            </div>
        </section>
    )
}

export default DirectoryCarouselGrid