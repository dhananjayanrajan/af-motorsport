"use client"

import SectionFooter from '@/components/Section/Footer'
import { Media, Series } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

interface SeriesDirectoryProps {
    series: Series[]
}

const SeriesDirectory: React.FC<SeriesDirectoryProps> = ({ series = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState<number[]>([])
    const [isPaused, setIsPaused] = useState(false)

    const activeItem = series[activeIndex]

    const autoplayOptions = useMemo(() => ({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true
    }), [])

    const autoplay = useMemo(() => Autoplay(autoplayOptions), [autoplayOptions])

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            dragFree: true,
            align: 'start',
            skipSnaps: false,
            duration: 40,
            slidesToScroll: 1,
            containScroll: 'trimSnaps'
        },
        [autoplay]
    )

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            if (!emblaApi) return
            const snapIndex = emblaApi.selectedScrollSnap()
            const realIndex = snapIndex % series.length
            setActiveIndex(realIndex)

            const newProgress = Array.from({ length: series.length }, (_, i) => {
                if (i === realIndex) return 100
                return 0
            })
            setProgress(newProgress)
        }

        const onPointerDown = () => autoplay.stop()
        const onPointerUp = () => autoplay.play()

        emblaApi.on('select', onSelect)
        emblaApi.on('pointerDown', onPointerDown)
        emblaApi.on('pointerUp', onPointerUp)
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('pointerDown', onPointerDown)
            emblaApi.off('pointerUp', onPointerUp)
        }
    }, [emblaApi, series.length, autoplay])

    useEffect(() => {
        if (!emblaApi) return

        let animationFrame: number
        let startTime: number | null = null

        const animateProgress = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const progressValue = Math.min((elapsed / 4000) * 100, 100)

            setProgress(prev => {
                const newProgress = [...prev]
                newProgress[activeIndex] = progressValue
                return newProgress
            })

            if (progressValue < 100 && !isPaused) {
                animationFrame = requestAnimationFrame(animateProgress)
            }

            if (progressValue >= 100) {
                startTime = null
            }
        }

        if (!isPaused) {
            startTime = null
            animationFrame = requestAnimationFrame(animateProgress)
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [activeIndex, isPaused, emblaApi])

    const extendedSeries = [...series, ...series, ...series, ...series, ...series]

    const handleMouseEnter = () => {
        setIsPaused(true)
        autoplay.stop()
    }

    const handleMouseLeave = () => {
        setIsPaused(false)
        autoplay.play()
    }

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure relative w-full overflow-hidden">

                <div className="w-full md:w-[18%] lg:w-[15%] bg-black-pure p-6 md:p-8 flex flex-row md:flex-col justify-between items-center md:items-stretch border-b-2 md:border-b-0 shrink-0">
                    <div className="flex items-center gap-6 md:flex-col md:items-start md:gap-0 md:space-y-12">
                        <div className="size-16 md:size-24 bg-primary-500 flex items-center justify-center transition-transform hover:rotate-12 duration-700 shrink-0">
                            <span className="text-black-pure font-black text-2xl md:text-4xl tracking-tighter">S</span>
                        </div>
                        <div className="md:[writing-mode:vertical-lr] md:rotate-180">
                            <h2 className="text-white-pure font-black text-3xl md:text-6xl lg:text-8xl uppercase tracking-tighter leading-none">
                                SERIES
                            </h2>
                        </div>
                    </div>
                    <div className="space-y-2 md:space-y-6 text-right md:text-left">
                        <div className="h-1 md:h-2 w-16 md:w-full bg-secondary-500 ml-auto md:ml-0" />
                        <div className="font-mono text-[8px] md:text-[10px] font-black text-white-pure uppercase leading-tight tracking-[0.2em]">
                            <span className="hidden md:block">GLOBAL REGISTRY<br />ESTABLISHED 2026<br /></span>
                            INDEX: {activeItem?.basics?.identifiers?.code || '001'}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-white-pure relative overflow-hidden min-w-0">
                    <div className="h-[55%] md:h-[60%] flex border-b-2 border-black-pure relative overflow-hidden">
                        <div className="flex-1 p-6 md:p-8 lg:p-12 flex flex-col justify-between relative z-10 min-w-0">
                            <div className="flex flex-col gap-2">
                                <div className="w-24 md:w-32 h-5 md:h-6 bg-primary-500" />
                                <div className="w-16 md:w-20 h-5 md:h-6 bg-secondary-500" />
                            </div>

                            <div className="space-y-4 min-w-0">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black-pure uppercase tracking-tighter leading-[0.75] transition-all duration-700 ease-in-out break-words">
                                    {activeItem?.basics?.identifiers?.abbreviation || activeItem?.name.slice(0, 3)}
                                </h1>
                                <div className="flex flex-col lg:flex-row lg:items-end justify-between border-t-4 border-black-pure pt-4 md:pt-6 gap-4 md:gap-6">
                                    <div className="max-w-xl min-w-0">
                                        <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-black uppercase text-black-pure leading-none mb-2 md:mb-4 break-words">
                                            {activeItem?.name}
                                        </h2>
                                        <p className="font-mono text-xs md:text-sm font-bold text-black-pure uppercase leading-snug line-clamp-3 md:line-clamp-none break-words">
                                            {activeItem?.basics?.tagline || activeItem?.basics?.description || "Browse the full specifications and requirements for this racing category."}
                                        </p>
                                    </div>
                                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 shrink-0">
                                        <span className="font-mono text-xs font-black text-primary-500 uppercase tracking-widest">Status</span>
                                        <span className="text-lg sm:text-xl md:text-2xl font-black text-black-pure uppercase">{activeItem?.details?.status || 'Active'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[35%] hidden lg:flex bg-white-pure flex-col">
                            <div className="flex-1 relative group overflow-hidden bg-black-pure">
                                <Image
                                    src={(activeItem?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${activeItem?.id}/1200/800`}
                                    alt={activeItem?.name || "Racing Series"}
                                    fill
                                    sizes="33vw"
                                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                            </div>
                            <Link
                                href={`/competition/series/${activeItem?.slug}`}
                                className="h-32 lg:h-48 bg-black-pure flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-0 group hover:bg-secondary-500 transition-colors duration-500"
                            >
                                <span className="text-white-pure font-black text-4xl lg:text-5xl group-hover:text-black-pure transition-transform group-hover:-translate-y-1">→</span>
                                <span className="text-white-pure font-mono text-xs lg:text-[10px] font-black group-hover:text-black-pure uppercase tracking-widest">View Series</span>
                            </Link>
                        </div>
                    </div>

                    <Link
                        href={`/competition/series/${activeItem?.slug}`}
                        className="lg:hidden w-full h-20 bg-primary-500 flex items-center justify-center gap-4 hover:bg-secondary-500 transition-colors duration-500 shrink-0"
                    >
                        <span className="text-black-pure font-black text-2xl">→</span>
                        <span className="text-black-pure font-mono text-sm font-black uppercase tracking-widest truncate px-4">View Series Details</span>
                    </Link>

                    <div
                        className="flex-1 overflow-hidden bg-black-pure min-h-0"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="overflow-hidden h-full" ref={emblaRef}>
                            <div className="flex h-full">
                                {extendedSeries.map((item, idx) => {
                                    const originalIndex = idx % series.length
                                    return (
                                        <div
                                            key={`${item.id}-${idx}`}
                                            className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] min-w-0 h-full"
                                        >
                                            <button
                                                onClick={() => {
                                                    setActiveIndex(originalIndex)
                                                    emblaApi?.scrollTo(idx)
                                                }}
                                                className={`
                                                    w-full h-full flex flex-col justify-between p-4 md:p-6 lg:p-8 transition-all duration-500 ease-in-out
                                                    ${activeIndex === originalIndex ? 'bg-secondary-500' : 'bg-white-pure hover:bg-primary-500'}
                                                `}
                                            >
                                                <div className="flex justify-between w-full items-start">
                                                    <span className="font-mono text-base md:text-xl font-black text-black-pure">
                                                        {(originalIndex + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <div className={`size-6 md:size-8 border-4 border-black-pure transition-all duration-500 shrink-0 ${activeIndex === originalIndex ? 'bg-black-pure scale-110' : 'bg-transparent'}`} />
                                                </div>
                                                <div className="space-y-4 md:space-y-6 w-full min-w-0">
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-mono text-[8px] md:text-[10px] font-black text-black-pure/40 uppercase mb-1">Category</span>
                                                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter text-black-pure leading-none text-left break-words">
                                                            {item.basics?.identifiers?.abbreviation || item.name.split(' ')[0]}
                                                        </h3>
                                                    </div>
                                                    <div className="relative h-1.5 md:h-2 w-full bg-black-pure/20 overflow-hidden">
                                                        <div
                                                            className="absolute inset-0 bg-black-pure transition-all duration-300 ease-linear"
                                                            style={{ width: `${progress[originalIndex] || 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden xl:flex w-[80px] bg-white-pure flex-col divide-y-2 divide-black-pure overflow-hidden shrink-0">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className={`flex-1 flex items-center justify-center font-mono text-xs font-black transition-colors duration-500 ${i % 3 === 0 ? 'bg-primary-500 text-black-pure' : i % 3 === 1 ? 'bg-black-pure text-white-pure' : 'bg-white-pure text-black-pure'}`}>
                            {String.fromCharCode(65 + (i % 26))}
                        </div>
                    ))}
                </div>
            </div>
            <SectionFooter variant={3} />
        </section>
    )
}

export default SeriesDirectory