'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface VideoSectionProps {
    videoUrls: string[]
    item: any
    collection: string
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrls = [], item, collection }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMounted, setIsMounted] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [direction, setDirection] = useState<'next' | 'prev'>('next')
    const [isPlaying, setIsPlaying] = useState(true)

    const hasMultipleVideos = videoUrls.length > 1
    const hasVideos = videoUrls.length > 0
    const currentSource = hasVideos ? videoUrls[currentIndex] : null

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!hasVideos) return

        if (videoRef.current && currentSource) {
            videoRef.current.load()
            if (isPlaying) {
                videoRef.current.play().catch(() => { })
            }
        }
    }, [currentIndex, currentSource, hasVideos, isPlaying])

    const handleVideoEnd = () => {
        if (hasMultipleVideos && isPlaying) {
            goToNext()
        }
    }

    const goToNext = () => {
        if (!hasMultipleVideos) return
        setDirection('next')
        setIsTransitioning(true)
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % videoUrls.length)
            setTimeout(() => setIsTransitioning(false), 50)
        }, 300)
    }

    const goToPrev = () => {
        if (!hasMultipleVideos) return
        setDirection('prev')
        setIsTransitioning(true)
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length)
            setTimeout(() => setIsTransitioning(false), 50)
        }, 300)
    }

    const formatText = (text: string | null | undefined, maxLength: number = 100) => {
        if (!text) return ''
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

    const getCollectionLabel = () => {
        const labels: Record<string, string> = {
            races: 'RACE',
            championships: 'CHAMPIONSHIP',
            seasons: 'SEASON',
            events: 'EVENT',
            sessions: 'SESSION',
            circuits: 'CIRCUIT',
            drivers: 'DRIVER',
            leaders: 'LEADER',
            teams: 'TEAM',
            cars: 'CAR',
            helmets: 'HELMET',
            suits: 'SUIT',
            garages: 'GARAGE',
            meetups: 'MEETUP',
            programs: 'PROGRAM',
            onboardings: 'ONBOARDING',
            vacancies: 'VACANCY',
            initiatives: 'INITIATIVE',
            hospitalities: 'HOSPITALITY',
            plans: 'PLAN',
            timelines: 'TIMELINE',
            interviews: 'INTERVIEW',
            celebrations: 'CELEBRATION',
            incidents: 'INCIDENT'
        }
        return labels[collection] || collection.toUpperCase()
    }

    const getIdentifier = () => {
        if (item?.basics?.identifiers?.code) return item.basics.identifiers.code
        if (item?.basics?.identifiers?.abbreviation) return item.basics.identifiers.abbreviation
        if (item?.basics?.identifiers?.chassis) return item.basics.identifiers.chassis
        if (item?.basics?.identifiers?.model) return item.basics.identifiers.model
        if (item?.first_name && item?.last_name) return `${item.first_name[0]}${item.last_name[0]}`.toUpperCase()
        if (item?.name) return item.name.substring(0, 6).toUpperCase()
        return getCollectionLabel().substring(0, 3)
    }

    const getSidebarContent = () => {
        if (item?.assets?.trophy && typeof item.assets.trophy === 'object') {
            return item.assets.trophy
        }
        if (item?.assets?.poster && typeof item.assets.poster === 'object') {
            return item.assets.poster
        }
        if (item?.assets?.thumbnail && typeof item.assets.thumbnail === 'object') {
            return item.assets.thumbnail
        }
        if (item?.assets?.cover && typeof item.assets.cover === 'object') {
            return item.assets.cover
        }
        if (item?.assets?.logo && typeof item.assets.logo === 'object') {
            return item.assets.logo
        }
        return null
    }

    const sidebarAsset = getSidebarContent()

    if (!isMounted) {
        return <section className="w-full min-h-screen bg-black-pure" />
    }

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex-1 relative flex items-stretch overflow-hidden">
                <div className="hidden md:flex w-20 border-r border-black-pure flex-col items-center py-10 gap-10 bg-secondary shrink-0">
                    <span className="[writing-mode:vertical-lr] rotate-180 font-mono text-xs font-black tracking-widest uppercase text-black-pure whitespace-nowrap">
                        {getCollectionLabel()} CONTROL
                    </span>
                    <div className="w-px h-full bg-black-pure" />
                </div>

                <div className="flex-1 relative group bg-black-pure">
                    {currentSource ? (
                        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${isTransitioning
                            ? direction === 'next' ? '-translate-x-full' : 'translate-x-full'
                            : 'translate-x-0'
                            }`}>
                            <video
                                ref={videoRef}
                                key={currentSource}
                                autoPlay={hasMultipleVideos ? true : false}
                                muted
                                playsInline
                                onEnded={handleVideoEnd}
                                className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-in-out"
                            >
                                <source src={currentSource} type="video/mp4" />
                            </video>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                            <span className="font-mono text-xs font-black text-white-pure tracking-widest text-center px-4">
                                {item?.name?.toUpperCase()?.substring(0, 30) || `NO ${getCollectionLabel()} VIDEO ASSET`}
                            </span>
                        </div>
                    )}

                    <div className="absolute top-0 left-0 bg-primary px-8 py-5 border-r border-black-pure border-b border-black-pure flex items-center gap-4 z-20">
                        <div className="w-3 h-3 bg-black-pure shrink-0" />
                        <span className="font-mono text-xs font-black text-black-pure tracking-widest truncate max-w-[200px]">
                            {getIdentifier()} {hasMultipleVideos ? String(currentIndex + 1).padStart(2, '0') : ''}
                        </span>
                    </div>

                    {hasMultipleVideos && (
                        <>
                            <button
                                onClick={goToPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black-pure/80 hover:bg-primary text-white-pure p-3 border border-black-pure transition-all duration-300 backdrop-blur-sm"
                                aria-label="Previous video"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black-pure/80 hover:bg-primary text-white-pure p-3 border border-black-pure transition-all duration-300 backdrop-blur-sm"
                                aria-label="Next video"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black-pure/80 backdrop-blur-sm px-4 py-2 border border-black-pure">
                                {videoUrls.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setDirection(idx > currentIndex ? 'next' : 'prev')
                                            setIsTransitioning(true)
                                            setTimeout(() => {
                                                setCurrentIndex(idx)
                                                setTimeout(() => setIsTransitioning(false), 50)
                                            }, 300)
                                        }}
                                        className={`h-1 transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary' : 'w-4 bg-white-pure/50 hover:bg-white-pure'
                                            }`}
                                        aria-label={`Go to video ${idx + 1}`}
                                    />
                                ))}
                            </div>
                            <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] font-black bg-black-pure/80 backdrop-blur-sm text-white-pure px-3 py-1 border border-black-pure">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(videoUrls.length).padStart(2, '0')}
                            </div>
                        </>
                    )}

                    <div className="absolute bottom-0 right-0 flex items-stretch z-20 bg-white-pure">
                        {hasMultipleVideos ? (
                            <button
                                onClick={goToNext}
                                className="px-12 py-8 bg-tertiary-500 text-white-pure border-l border-t border-black-pure hover:bg-secondary hover:text-black-pure focus:bg-primary focus:text-black-pure transition-colors duration-300 outline-none"
                            >
                                <div className="flex flex-col items-start gap-1">
                                    <span className="font-mono text-xs font-black uppercase tracking-widest">NEXT</span>
                                </div>
                            </button>
                        ) : (
                            <div className="px-12 py-8 bg-black-pure text-white-pure border-l border-t border-black-pure">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="font-mono text-xs font-black uppercase tracking-widest">SINGLE</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden lg:flex w-80 border-l border-black-pure bg-white-pure p-8 flex-col justify-end gap-6">
                    {sidebarAsset && (
                        <div className="w-full h-24 bg-primary border border-black-pure flex items-center justify-center overflow-hidden shrink-0">
                            {sidebarAsset.url && (
                                <img src={sidebarAsset.url} alt={item?.name} className="h-full w-full object-cover" />
                            )}
                        </div>
                    )}
                    <div className="space-y-4 overflow-y-auto">
                        <div className="w-16 h-2 bg-secondary border border-black-pure shrink-0" />
                        <p className="font-mono text-xs leading-relaxed font-black uppercase tracking-tight text-black-pure break-words whitespace-normal">
                            {formatText(item?.basics?.tagline || item?.basics?.description || `${item?.name || getCollectionLabel()} video asset integrated into rigid primary grid.`, 120)}
                        </p>
                        {item?.details?.laps && (
                            <div className="font-mono text-[10px] font-black text-black-pure border-t border-black-pure pt-2">
                                {item.details.laps} LAPS • {item.details.distance_km ? `${item.details.distance_km}KM` : ''}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-auto min-h-28 border-t border-black-pure flex flex-col sm:flex-row items-stretch w-full bg-white-pure overflow-hidden">
                <div className="w-full sm:w-20 border-r-0 sm:border-r border-black-pure bg-black-pure flex items-center justify-center py-4 sm:py-0 shrink-0">
                    <Play className="text-primary h-6 w-6 fill-current" />
                </div>

                <Link
                    href={`/${collection === 'races' ? 'calendar/races' : collection === 'championships' ? 'calendar/championships' : `competition/${collection}`}/${item?.slug || '#'}`}
                    className="flex-1 px-6 sm:px-10 py-6 sm:py-0 flex items-center justify-between bg-white-pure hover:bg-primary hover:text-black-pure focus:bg-secondary transition-all duration-300 group outline-none min-w-0"
                >
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-mono text-xs font-black uppercase tracking-widest">{getCollectionLabel()}</span>
                        <span className="font-race text-xl sm:text-2xl tracking-tighter uppercase truncate">
                            {item?.name || item?.title || 'OVERVIEW'}
                        </span>
                    </div>
                    <ArrowRight className="h-8 w-8 shrink-0 group-hover:translate-x-4 transition-transform duration-300" />
                </Link>

                <div className="hidden sm:flex px-6 lg:px-12 border-l border-black-pure items-center font-mono text-xs font-black tracking-widest bg-white-pure text-black-pure max-w-[300px] lg:max-w-none truncate">
                    {item?.details?.format?.toUpperCase() || item?.details?.type?.toUpperCase() || getCollectionLabel()}
                </div>
            </div>
        </section>
    )
}

export default VideoSection