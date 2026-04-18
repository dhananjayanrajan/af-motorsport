"use client"

import { Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React from 'react'

interface SectionCarouselProps {
    images: (Media | { id: string; url: string; alt?: string })[]
    variant?: 1 | 2 | 3
    autoplayDelay?: number
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({
    images,
    variant = 1,
    autoplayDelay = 3000
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: autoplayDelay, stopOnInteraction: false })
    ])

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    if (variant === 2) {
        return (
            <div className="relative w-full h-full bg-black-pure group overflow-hidden border-2 border-black-pure">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                        {images.map((img) => (
                            <div key={img.id} className="flex-[0_0_100%] min-w-0 h-full relative">
                                <Image src={img.url || ''} alt={img.alt || ''} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black-pure/20" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-primary transition-all duration-500 ease-linear" style={{ width: '100%' }} />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={scrollPrev} className="w-12 h-12 bg-white-pure text-black-pure font-black hover:bg-primary transition-colors">PREV</button>
                    <button onClick={scrollNext} className="w-12 h-12 bg-white-pure text-black-pure font-black hover:bg-primary transition-colors">NEXT</button>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="relative w-full h-full border-4 border-black-pure p-2 bg-white-pure group">
                <div className="overflow-hidden h-full border-2 border-black-pure" ref={emblaRef}>
                    <div className="flex h-full">
                        {images.map((img) => (
                            <div key={img.id} className="flex-[0_0_100%] min-w-0 h-full relative">
                                <Image src={img.url || ''} alt={img.alt || ''} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <button onClick={scrollPrev} className="w-8 h-8 bg-black-pure text-white-pure flex items-center justify-center text-xs">↑</button>
                    <button onClick={scrollNext} className="w-8 h-8 bg-black-pure text-white-pure flex items-center justify-center text-xs">↓</button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative aspect-video w-full border-2 border-black-pure bg-white-200 overflow-hidden group">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {images.map((img) => (
                        <div key={img.id} className="flex-[0_0_100%] min-w-0 h-full relative">
                            <Image src={img.url || ''} alt={img.alt || ''} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-4 h-4 bg-secondary border border-black-pure" />
                <div className="w-4 h-4 bg-primary border border-black-pure" />
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={scrollPrev} className="w-10 h-10 bg-black-pure text-white-pure flex items-center justify-center hover:bg-secondary transition-colors">←</button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={scrollNext} className="w-10 h-10 bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary transition-colors">→</button>
            </div>
        </div>
    )
}

export default SectionCarousel