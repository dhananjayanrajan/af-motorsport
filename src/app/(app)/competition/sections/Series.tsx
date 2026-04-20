"use client"

import SectionFooter from '@/components/Section/Footer'
import { Media, Series } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface SeriesDirectoryProps {
    series: Series[]
}

const SeriesDirectory: React.FC<SeriesDirectoryProps> = ({ series = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState<number[]>([])
    const [isPaused, setIsPaused] = useState(false)
    const autoplayRef = useRef<any>(null)

    const activeItem = series[activeIndex]

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

        const onPointerDown = () => {
            if (autoplayRef.current && autoplayRef.current.stop) {
                autoplayRef.current.stop()
            }
        }
        const onPointerUp = () => {
            if (autoplayRef.current && autoplayRef.current.play) {
                autoplayRef.current.play()
            }
        }

        emblaApi.on('select', onSelect)
        emblaApi.on('pointerDown', onPointerDown)
        emblaApi.on('pointerUp', onPointerUp)
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('pointerDown', onPointerDown)
            emblaApi.off('pointerUp', onPointerUp)
            if (autoplayRef.current && autoplayRef.current.destroy) {
                autoplayRef.current.destroy()
            }
        }
    }, [emblaApi, series.length])

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

    const handleMouseEnter = useCallback(() => {
        setIsPaused(true)
        if (autoplayRef.current && autoplayRef.current.stop) {
            autoplayRef.current.stop()
        }
    }, [])

    const handleMouseLeave = useCallback(() => {
        setIsPaused(false)
        if (autoplayRef.current && autoplayRef.current.play) {
            autoplayRef.current.play()
        }
    }, [])

    const totalSeries = series.length
    const activeSeries = series.filter(s => s.details?.status === 'Active').length
    const upcomingSeries = series.filter(s => s.details?.status === 'Upcoming').length
    const defunctSeries = series.filter(s => s.details?.status === 'Defunct').length

    const quickStats = [
        { label: 'TOTAL', value: totalSeries, color: 'bg-primary-500' },
        { label: 'ACTIVE', value: activeSeries, color: 'bg-secondary-500' },
        { label: 'UPCOMING', value: upcomingSeries, color: 'bg-tertiary-500' },
        { label: 'DEFUNCT', value: defunctSeries, color: 'bg-black-pure' },
    ]

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b-2 border-black-pure overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure relative w-full overflow-hidden">

                <div className="w-full md:w-[18%] lg:w-[15%] bg-black-pure p-4 md:p-5 flex flex-row md:flex-col justify-between items-center md:items-stretch border-b-2 md:border-b-0 shrink-0">
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0 md:space-y-8">
                        <div className="size-10 md:size-16 bg-primary-500 flex items-center justify-center transition-transform hover:rotate-12 duration-700 shrink-0">
                            <span className="text-black-pure font-black text-lg md:text-2xl tracking-tighter">S</span>
                        </div>
                        <div className="md:[writing-mode:vertical-lr] md:rotate-180">
                            <h2 className="text-white-pure font-black text-xl md:text-4xl lg:text-6xl uppercase tracking-tighter leading-none">
                                SERIES
                            </h2>
                        </div>
                    </div>
                    <div className="space-y-1 md:space-y-3 text-right md:text-left">
                        <div className="h-0.5 md:h-0.5 w-10 md:w-full bg-secondary-500 ml-auto md:ml-0" />
                        <div className="font-mono text-[6px] md:text-[8px] font-black text-white-pure uppercase leading-tight tracking-[0.2em]">
                            <span className="hidden md:block">GLOBAL REGISTRY<br />ESTABLISHED 2026<br /></span>
                            INDEX: {activeItem?.basics?.identifiers?.code || '001'}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-white-pure relative overflow-hidden min-w-0">
                    <div className="h-[55%] md:h-[60%] flex border-b-2 border-black-pure relative overflow-hidden">
                        <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-between relative z-10 min-w-0">
                            <div className="flex flex-col gap-1">
                                <div className="w-16 md:w-20 h-3 md:h-4 bg-primary-500" />
                                <div className="w-10 md:w-12 h-3 md:h-4 bg-secondary-500" />
                            </div>

                            <div className="space-y-2.5 min-w-0">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black-pure uppercase tracking-tighter leading-[0.75] transition-all duration-700 ease-in-out break-words">
                                    {activeItem?.basics?.identifiers?.abbreviation || activeItem?.name?.slice(0, 3) || 'SRC'}
                                </h1>
                                <div className="flex flex-col lg:flex-row lg:items-end justify-between border-t-4 border-black-pure pt-2.5 md:pt-4 gap-2.5 md:gap-4">
                                    <div className="max-w-xl min-w-0">
                                        <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-black uppercase text-black-pure leading-none mb-1 md:mb-2 break-words">
                                            {activeItem?.name || 'Racing Series'}
                                        </h2>
                                        <p className="font-mono text-[9px] md:text-[10px] font-bold text-black-pure uppercase leading-snug line-clamp-3 md:line-clamp-none break-words">
                                            {activeItem?.basics?.tagline || activeItem?.basics?.description || "Browse the full specifications and requirements for this racing category."}
                                        </p>
                                    </div>
                                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2.5 shrink-0">
                                        <span className="font-mono text-[9px] font-black text-primary-500 uppercase tracking-widest">Status</span>
                                        <span className="text-sm sm:text-base md:text-lg font-black text-black-pure uppercase">{activeItem?.details?.status || 'Active'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[35%] hidden lg:flex bg-white-pure flex-col">
                            <div className="flex-1 relative group overflow-hidden bg-black-pure">
                                <Image
                                    src={(activeItem?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${activeItem?.id || 'default'}/1200/800`}
                                    alt={activeItem?.name || "Racing Series"}
                                    fill
                                    sizes="33vw"
                                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                            </div>
                            <Link
                                href={`/competition/series/${activeItem?.slug}`}
                                className="h-24 lg:h-32 bg-black-pure flex flex-row lg:flex-col items-center justify-center gap-2.5 lg:gap-0 group hover:bg-secondary-500 transition-colors duration-500"
                            >
                                <span className="text-white-pure font-black text-2xl lg:text-3xl group-hover:text-black-pure transition-transform group-hover:-translate-y-1">→</span>
                                <span className="text-white-pure font-mono text-[8px] lg:text-[7px] font-black group-hover:text-black-pure uppercase tracking-widest">View Series</span>
                            </Link>
                        </div>
                    </div>

                    <Link
                        href={`/competition/series/${activeItem?.slug}`}
                        className="lg:hidden w-full h-14 bg-primary-500 flex items-center justify-center gap-2.5 hover:bg-secondary-500 transition-colors duration-500 shrink-0"
                    >
                        <span className="text-black-pure font-black text-lg">→</span>
                        <span className="text-black-pure font-mono text-[10px] font-black uppercase tracking-widest truncate px-3">View Series Details</span>
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
                                                    w-full h-full flex flex-col justify-between p-3 md:p-4 lg:p-5 transition-all duration-500 ease-in-out
                                                    ${activeIndex === originalIndex ? 'bg-secondary-500' : 'bg-white-pure hover:bg-primary-500'}
                                                `}
                                            >
                                                <div className="flex justify-between w-full items-start">
                                                    <span className="font-mono text-xs md:text-base font-black text-black-pure">
                                                        {(originalIndex + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <div className={`size-4 md:size-5 border-2 border-black-pure transition-all duration-500 shrink-0 ${activeIndex === originalIndex ? 'bg-black-pure scale-110' : 'bg-transparent'}`} />
                                                </div>
                                                <div className="space-y-2.5 md:space-y-4 w-full min-w-0">
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-mono text-[6px] md:text-[8px] font-black text-black-pure/40 uppercase mb-0.5">Category</span>
                                                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black uppercase tracking-tighter text-black-pure leading-none text-left break-words">
                                                            {item.basics?.identifiers?.abbreviation || (item.name?.split(' ')[0]) || 'SRC'}
                                                        </h3>
                                                    </div>
                                                    <div className="relative h-0.5 md:h-1 w-full bg-black-pure/20 overflow-hidden">
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

                <div className="hidden xl:flex w-[50px] bg-white-pure flex-col divide-y-2 divide-black-pure overflow-hidden shrink-0">
                    {quickStats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`flex-1 flex flex-col items-center justify-center p-2 transition-all duration-500 group hover:scale-105 ${i % 2 === 0 ? 'bg-white-pure' : 'bg-black-pure/5'}`}
                        >
                            <div className={`w-3 h-3 ${stat.color} mb-1.5`} />
                            <span className="font-mono text-[7px] font-black text-black-pure/60 uppercase text-center leading-tight">
                                {stat.label}
                            </span>
                            <span className="font-black text-sm text-black-pure">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <SectionFooter variant={3} />
        </section>
    )
}

export default SeriesDirectory