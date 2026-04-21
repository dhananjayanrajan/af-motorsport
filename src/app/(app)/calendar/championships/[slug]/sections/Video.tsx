'use client'

import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface VideoSectionProps {
    videoUrls: string[]
    championship: any
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrls = [], championship }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (videoRef.current && videoUrls.length > 0) {
            videoRef.current.load()
            videoRef.current.play().catch(() => { })
        }
    }, [currentIndex, videoUrls])

    const handleVideoEnd = () => {
        if (videoUrls.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % videoUrls.length)
        }
    }

    if (!isMounted) {
        return <section className="w-full min-h-screen bg-black-pure" />
    }

    const hasVideos = videoUrls.length > 0
    const currentSource = hasVideos ? videoUrls[currentIndex] : null

    const formatText = (text: string | null | undefined, maxLength: number = 100) => {
        if (!text) return ''
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex-1 relative flex items-stretch overflow-hidden">

                <div className="hidden md:flex w-20 border-r border-black-pure flex-col items-center py-10 gap-10 bg-secondary shrink-0">
                    <span className="[writing-mode:vertical-lr] rotate-180 font-mono text-xs font-black tracking-widest uppercase text-black-pure whitespace-nowrap">
                        CHAMPIONSHIP
                    </span>
                    <div className="w-px h-full bg-black-pure" />
                </div>

                <div className="flex-1 relative group bg-black-pure">
                    {currentSource ? (
                        <video
                            ref={videoRef}
                            key={currentSource}
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                            className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-in-out"
                        >
                            <source src={currentSource} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                            <span className="font-mono text-xs font-black text-white-pure tracking-widest text-center px-4">
                                {championship?.name?.toUpperCase()?.substring(0, 30) || 'NO VIDEO ASSET'}
                            </span>
                        </div>
                    )}

                    <div className="absolute top-0 left-0 bg-primary px-8 py-5 border-r border-black-pure border-b border-black-pure flex items-center gap-4 z-20">
                        <div className="w-3 h-3 bg-black-pure shrink-0" />
                        <span className="font-mono text-xs font-black text-black-pure tracking-widest truncate max-w-[200px]">
                            {championship?.basics?.identifiers?.code || championship?.basics?.identifiers?.abbreviation || championship?.name?.substring(0, 6) || 'CHP'} {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                    </div>

                    <div className="absolute bottom-0 right-0 flex items-stretch z-20 bg-white-pure">
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev + 1) % videoUrls.length)}
                            className="px-12 py-8 bg-tertiary-500 text-white-pure border-l border-t border-black-pure hover:bg-secondary hover:text-black-pure focus:bg-primary focus:text-black-pure transition-colors duration-300 outline-none"
                        >
                            <div className="flex flex-col items-start gap-1">
                                <span className="font-mono text-xs font-black uppercase tracking-widest">NEXT</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="hidden lg:flex w-80 border-l border-black-pure bg-white-pure p-8 flex-col justify-end gap-6">
                    {championship?.assets?.trophy && typeof championship.assets.trophy === 'object' && (
                        <div className="w-full h-24 bg-primary border border-black-pure flex items-center justify-center overflow-hidden shrink-0">
                            {championship.assets.trophy.url && (
                                <img src={championship.assets.trophy.url} alt={championship.name} className="h-full w-full object-cover" />
                            )}
                        </div>
                    )}
                    <div className="space-y-4 overflow-y-auto">
                        <div className="w-16 h-2 bg-secondary border border-black-pure shrink-0" />
                        <p className="font-mono text-xs leading-relaxed font-black uppercase tracking-tight text-black-pure break-words whitespace-normal">
                            {formatText(championship?.basics?.tagline || championship?.basics?.description || `${championship?.name || 'Championship'} video asset integrated into rigid primary grid.`, 120)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-auto min-h-28 border-t border-black-pure flex flex-col sm:flex-row items-stretch w-full bg-white-pure overflow-hidden">
                <div className="w-full sm:w-20 border-r-0 sm:border-r border-black-pure bg-black-pure flex items-center justify-center py-4 sm:py-0 shrink-0">
                    <Play className="text-primary h-6 w-6 fill-current" />
                </div>

                <Link
                    href={`/calendar/championships/${championship?.slug || '#'}`}
                    className="flex-1 px-6 sm:px-10 py-6 sm:py-0 flex items-center justify-between bg-white-pure hover:bg-primary hover:text-black-pure focus:bg-secondary transition-all duration-300 group outline-none min-w-0"
                >
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-mono text-xs font-black uppercase tracking-widest">CHAMPIONSHIP</span>
                        <span className="font-race text-xl sm:text-2xl tracking-tighter uppercase truncate">
                            {championship?.name || 'OVERVIEW'}
                        </span>
                    </div>
                    <ArrowRight className="h-8 w-8 shrink-0 group-hover:translate-x-4 transition-transform duration-300" />
                </Link>

                <div className="hidden sm:flex px-6 lg:px-12 border-l border-black-pure items-center font-mono text-xs font-black tracking-widest bg-white-pure text-black-pure max-w-[300px] lg:max-w-none truncate">
                    {formatText(championship?.details?.format, 40)?.toUpperCase() || 'SEASON STRUCTURE'}
                </div>
            </div>
        </section>
    )
}

export default VideoSection