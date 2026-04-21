"use client"

import SectionFooter from '@/components/Section/Footer'
import { Leader, Media } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface LeadersDirectoryProps {
    leaders: Leader[]
}

const getPlainText = (richText: any): string => {
    if (typeof richText === 'string') return richText
    if (!richText?.root?.children) return ''
    return richText.root.children
        .map((node: any) => node.children?.map((child: any) => child.text).join('') || '')
        .join(' ')
}

const LeadersDirectory: React.FC<LeadersDirectoryProps> = ({ leaders = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const autoplayRef = useRef<any>(null)

    const autoplayOptions = useMemo(() => ({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true
    }), [])

    const autoplay = useMemo(() => Autoplay(autoplayOptions), [autoplayOptions])
    autoplayRef.current = autoplay

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            containScroll: 'trimSnaps',
            dragFree: false
        },
        [autoplay]
    )

    const scrollTo = useCallback((index: number) => {
        if (!emblaApi) return
        emblaApi.scrollTo(index)
        setActiveIndex(index)
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setActiveIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    const activeItem = leaders[activeIndex]

    if (!leaders.length) return null

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <div className="flex-1 flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black-pure relative w-full overflow-hidden">

                <div className="w-full lg:w-[45%] flex flex-col relative overflow-hidden bg-white-pure">
                    <div className="p-5 md:p-6 lg:p-8 border-b-2 border-black-pure flex justify-between items-center bg-white-pure z-20">
                        <div>
                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-tertiary-600 block mb-0.5">Command Board</span>
                            <h2 className="text-xl md:text-2xl font-race font-black uppercase tracking-tighter text-black-pure">Personnel</h2>
                        </div>
                        <div className="size-8 md:size-10 border-2 border-black-pure flex items-center justify-center font-race font-black italic text-base md:text-lg">
                            {(activeIndex + 1).toString().padStart(2, '0')}
                        </div>
                    </div>

                    <div className="flex-1 relative bg-black-pure overflow-hidden group min-h-[280px] md:min-h-[350px]">
                        <Image
                            src={(activeItem?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${activeItem?.id}/1000/1200`}
                            alt={activeItem?.last_name || 'Leader'}
                            fill
                            priority
                            className="object-cover transition-all duration-700 group-hover:grayscale-0 scale-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-pure/60 to-transparent" />
                    </div>

                    <div className="p-4 md:p-5 lg:p-6 bg-tertiary-500 border-t-2 border-black-pure">
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                            <div className="h-0.5 w-5 md:w-6 bg-black-pure" />
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-black-pure">Strategic Mandate</span>
                        </div>
                        <h3 className="text-base md:text-lg lg:text-xl font-race font-black uppercase text-black-pure leading-tight mb-3 md:mb-4">
                            {activeItem?.basics?.title || 'Operational Oversight'}
                        </h3>
                        <Link
                            href={`/leadership/${activeItem?.slug}`}
                            className="inline-flex items-center gap-2 md:gap-3 bg-black-pure text-white-pure px-3 md:px-4 py-1.5 md:py-2 hover:bg-white-pure hover:text-black-pure transition-all group"
                        >
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Access Full Credentials</span>
                            <span className="group-hover:translate-x-1 transition-transform text-xs md:text-sm">→</span>
                        </Link>
                    </div>
                </div>

                <div className="flex-1 flex flex-col relative min-w-0 bg-white-pure">
                    <div className="flex-1 p-5 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center max-w-3xl">
                        <div className="mb-6 md:mb-8 lg:mb-10">
                            <span className="text-[7px] md:text-[8px] lg:text-[9px] font-black uppercase text-tertiary-600 tracking-[0.3em] mb-1 md:mb-2 block">Executive Dossier</span>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-race font-black uppercase text-black-pure leading-[1.1] tracking-tighter mb-3 md:mb-4 lg:mb-5">
                                {activeItem?.first_name}<br />{activeItem?.last_name}
                            </h1>
                            <div className="h-0.5 w-12 md:w-16 lg:w-20 bg-black-pure mb-4 md:mb-5 lg:mb-6" />
                            <p className="text-[11px] md:text-xs lg:text-sm font-bold text-black-pure/70 leading-relaxed italic line-clamp-4 md:line-clamp-none">
                                {getPlainText(activeItem?.details?.biography) || "The specific professional history for this member is currently being indexed."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto border-t-2 border-black-pure bg-white-pure">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {leaders.map((leader, idx) => (
                                    <button
                                        key={leader.id}
                                        onClick={() => scrollTo(idx)}
                                        className={`flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-3 md:p-4 lg:p-5 xl:p-6 border-r-2 border-black-pure transition-all duration-300 flex flex-col gap-1.5 md:gap-2 lg:gap-2.5 text-left
                                            ${activeIndex === idx ? 'bg-black-pure text-white-pure' : 'bg-white-pure text-black-pure hover:bg-secondary-50'}
                                        `}
                                    >
                                        <span className="font-mono text-[8px] md:text-[9px] lg:text-[10px] font-black opacity-40 italic">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>
                                        <h4 className="text-sm md:text-base lg:text-lg font-race font-black uppercase leading-tight tracking-tighter truncate w-full">
                                            {leader.last_name}
                                        </h4>
                                        <div className={`h-0.5 w-5 md:w-6 ${activeIndex === idx ? 'bg-tertiary-500' : 'bg-black-pure/10'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <SectionFooter variant={3} />
        </section>
    )
}

export default LeadersDirectory