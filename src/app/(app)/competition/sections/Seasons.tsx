"use client"

import SectionFooter from '@/components/Section/Footer'
import { Media, Season } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

interface SeasonDirectoryProps {
    seasons: Season[]
}

const SeasonDirectory: React.FC<SeasonDirectoryProps> = ({ seasons = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState<number[]>([])
    const [isPaused, setIsPaused] = useState(false)
    const activeSeason = seasons[activeIndex]

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
            const realIndex = snapIndex % seasons.length
            setActiveIndex(realIndex)

            const newProgress = Array.from({ length: seasons.length }, (_, i) => {
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
    }, [emblaApi, seasons.length, autoplay])

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

    const extendedSeasons = [...seasons, ...seasons, ...seasons, ...seasons, ...seasons]

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
            <div className="flex-1 flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black-pure relative">

                <div className="w-full lg:w-[40%] bg-white-pure p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full grayscale opacity-10 pointer-events-none">
                        <Image
                            src={(activeSeason?.assets?.cover as Media)?.url || `https://picsum.photos/seed/${activeSeason?.id}/1200/800`}
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-8 lg:space-y-12 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="size-12 md:size-16 bg-black-pure flex items-center justify-center text-white-pure">
                                <span className="font-black text-xl md:text-2xl">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                            </div>
                            <span className="font-mono text-[10px] md:text-xs font-black text-black-pure uppercase tracking-[0.4em]">
                                Season {activeSeason?.name || ''}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-black-pure uppercase tracking-tighter leading-[0.8] transition-all duration-700">
                                {activeSeason?.basics?.identifiers?.abbreviation || activeSeason?.name || ''}
                            </h1>
                            <p className="text-black-pure text-base md:text-lg font-bold uppercase leading-none border-l-8 border-black-pure pl-4">
                                {activeSeason?.basics?.tagline || ''}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-0 space-y-8 relative z-10">
                        <div className="max-w-md">
                            <p className="text-black-pure text-xs md:text-sm font-bold uppercase leading-snug">
                                {activeSeason?.basics?.description || ''}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-black-pure">
                            <div className="bg-white-pure p-4 flex flex-col">
                                <span className="font-mono text-[10px] text-black-pure/40 uppercase font-black">Entries</span>
                                <span className="text-2xl font-black text-black-pure">{activeSeason?.details?.entries || 0}</span>
                            </div>
                            <div className="bg-white-pure p-4 flex flex-col">
                                <span className="font-mono text-[10px] text-black-pure/40 uppercase font-black">Races</span>
                                <span className="text-2xl font-black text-black-pure">{activeSeason?.details?.races || 0}</span>
                            </div>
                        </div>

                        <Link
                            href={`/competition/seasons/${activeSeason?.slug}`}
                            className="inline-block w-full md:w-auto bg-black-pure text-white-pure px-12 py-6 font-black uppercase text-xs tracking-[0.3em] text-center hover:bg-secondary-500 hover:text-black-pure transition-colors duration-500"
                        >
                            View Season
                        </Link>
                    </div>
                </div>

                <div className="flex-1 bg-black-pure relative flex flex-col divide-y-2 divide-black-pure overflow-hidden">
                    <div className="hidden sm:grid flex-1 grid-cols-2 xl:grid-cols-3 bg-black-pure gap-0.5 overflow-y-auto no-scrollbar">
                        {seasons.map((season, idx) => (
                            <button
                                key={season.id}
                                onClick={() => setActiveIndex(idx)}
                                className={`
                                    relative aspect-square md:aspect-auto xl:aspect-square flex flex-col items-center justify-center p-8 transition-all duration-500 group overflow-hidden
                                    ${activeIndex === idx ? 'bg-secondary-500' : 'bg-white-pure hover:bg-primary-500'}
                                `}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 grayscale">
                                    <Image
                                        src={(season.assets?.cover as Media)?.url || `https://picsum.photos/seed/${season.id}/600/600`}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <span className="font-mono text-sm font-black text-black-pure mb-2">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-black text-black-pure uppercase tracking-tighter leading-none text-center px-4 transition-transform group-hover:scale-110">
                                        {season.basics?.identifiers?.abbreviation || season.name}
                                    </h3>
                                    <div className={`h-2 bg-black-pure transition-all duration-700 ${activeIndex === idx ? 'w-16 md:w-24' : 'w-0'}`} />
                                </div>

                                <div className={`absolute bottom-4 right-4 size-4 border-2 border-black-pure ${activeIndex === idx ? 'bg-black-pure animate-pulse' : 'bg-transparent'}`} />
                            </button>
                        ))}
                    </div>

                    <div
                        className="sm:hidden flex-1 overflow-hidden bg-black-pure"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="overflow-hidden h-full" ref={emblaRef}>
                            <div className="flex h-full">
                                {extendedSeasons.map((season, idx) => {
                                    const originalIndex = idx % seasons.length
                                    return (
                                        <div
                                            key={`${season.id}-${idx}`}
                                            className="flex-[0_0_85%] min-w-0 h-full"
                                        >
                                            <button
                                                onClick={() => {
                                                    setActiveIndex(originalIndex)
                                                    emblaApi?.scrollTo(idx)
                                                }}
                                                className={`
                                                    w-full h-full flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out
                                                    ${activeIndex === originalIndex ? 'bg-secondary-500' : 'bg-white-pure hover:bg-primary-500'}
                                                `}
                                            >
                                                <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-700 grayscale">
                                                    <Image
                                                        src={(season.assets?.cover as Media)?.url || `https://picsum.photos/seed/${season.id}/600/600`}
                                                        alt=""
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                                                    <span className="font-mono text-xl font-black text-black-pure">
                                                        {(originalIndex + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <h3 className="text-5xl font-black text-black-pure uppercase tracking-tighter leading-none text-center">
                                                        {season.basics?.identifiers?.abbreviation || season.name}
                                                    </h3>
                                                    <div className="relative h-2 w-full max-w-[200px] bg-black-pure/20 overflow-hidden mt-4">
                                                        <div
                                                            className="absolute inset-0 bg-black-pure transition-all duration-300 ease-linear"
                                                            style={{ width: `${progress[originalIndex] || 0}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={`absolute bottom-4 right-4 size-4 border-2 border-black-pure ${activeIndex === originalIndex ? 'bg-black-pure animate-pulse' : 'bg-transparent'}`} />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="h-32 bg-white-pure flex divide-x-2 divide-black-pure">
                        <div className="flex-1 p-6 md:p-8 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] font-black text-black-pure/40 uppercase">Total Seasons</span>
                                <span className="text-lg md:text-xl font-black text-black-pure uppercase tracking-tighter">
                                    {seasons.length} Available
                                </span>
                            </div>
                            <div className="hidden md:flex gap-2">
                                <div className="size-3 bg-primary-500" />
                                <div className="size-3 bg-secondary-500" />
                                <div className="size-3 bg-black-pure" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SectionFooter />
        </section>
    )
}

export default SeasonDirectory