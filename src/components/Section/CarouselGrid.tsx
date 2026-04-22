'use client'

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
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={3}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure items-center justify-between">
                <div className="flex items-center px-6 gap-4">
                    <span className="font-mono text-[10px] font-black text-primary-500 uppercase tracking-widest">
                        SLIDE_ARRAY_ACTIVE // {items.length.toString().padStart(3, '0')}_RECORDS
                    </span>
                    <div className="h-4 w-px bg-white-pure/20" />
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-white-pure rotate-45" />
                        ))}
                    </div>
                </div>

                <div className="flex h-full border-l-2 border-white-pure/10">
                    <button
                        onClick={scrollPrev}
                        className="h-full px-6 hover:bg-primary-500 text-white-pure hover:text-black-pure transition-colors border-r-2 border-white-pure/10"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="h-full px-6 hover:bg-primary-500 text-white-pure hover:text-black-pure transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing border-b-2 border-black-pure" ref={emblaRef}>
                <div className="flex">
                    {items.map((item, index) => {
                        const mediaUrl = typeof item.image === 'object' ? item.image?.url : item.image
                        const src = mediaUrl || `https://picsum.photos/seed/${item.id}/800/1000`
                        const Wrapper = item.href ? Link : 'div'

                        return (
                            <Wrapper
                                key={item.id}
                                href={item.href as string}
                                className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] min-w-0 border-r-2 border-black-pure group bg-white-pure hover:bg-neutral-50 transition-colors duration-300"
                            >
                                <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-black-pure">
                                    <Image
                                        src={src}
                                        alt={item.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />

                                    {item.label && (
                                        <div className="absolute top-0 left-0 p-4">
                                            <div className="bg-primary-500 border-2 border-black-pure px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                <span className="font-mono text-[10px] font-black text-black-pure uppercase tracking-tighter">
                                                    {item.label}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute top-0 right-0 p-4">
                                        <span className="font-mono text-[10px] font-black text-white-pure mix-blend-difference opacity-40">
                                            INDEX_{(index + 1).toString().padStart(3, '0')}
                                        </span>
                                    </div>

                                    {item.href && (
                                        <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="bg-black-pure text-primary-500 w-12 h-12 flex items-center justify-center border-2 border-primary-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                <ChevronRight className="w-6 h-6" strokeWidth={3} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="mb-8">
                                        <h3 className="font-bold text-2xl md:text-3xl text-black-pure uppercase leading-none tracking-tighter italic group-hover:text-primary-500 transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className="font-mono text-[10px] font-black text-neutral-400 uppercase mt-2 tracking-widest pl-1">
                                                // {item.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {item.details && (
                                        <div className="mt-auto pt-8 border-t-2 border-black-pure/10 space-y-2">
                                            {item.details.map((detail, dIdx) => (
                                                <div key={dIdx} className="flex justify-between items-end border-b border-black-pure/5 pb-1">
                                                    <span className="font-mono text-[8px] text-neutral-300 font-black uppercase tracking-widest">
                                                        {detail.label}
                                                    </span>
                                                    <span className="text-[10px] text-black-pure font-black uppercase italic tracking-tighter">
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

            <div className="h-2 w-full bg-black-pure/5 relative">
                <div
                    className="h-full bg-primary-500 transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <SectionFooter variant={2} />
        </section>
    )
}

export default DirectoryCarouselGrid