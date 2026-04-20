"use client"

import SectionCTA from '@/components/Section/CTA'
import React, { useEffect, useRef, useState } from 'react'

interface VideoSectionProps {
    videoUrls: string[]
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrls = [] }) => {
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
        return <section className="relative w-full min-h-screen bg-black-pure border-b-2 border-black-pure flex flex-col overflow-hidden rounded-none" />
    }

    const hasVideos = videoUrls.length > 0
    const currentSource = hasVideos ? videoUrls[currentIndex] : null

    return (
        <section className="relative w-full min-h-screen bg-white-pure overflow-hidden flex flex-col border-b-2 border-black-pure z-10 rounded-none">
            <div className="flex-1 relative overflow-hidden bg-black-pure rounded-none">
                {currentSource ? (
                    <video
                        ref={videoRef}
                        key={currentSource}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                        className="absolute inset-0 w-full h-full object-cover rounded-none grayscale transition-all duration-500 ease-out hover:grayscale-0 hover:brightness-110"
                    >
                        <source src={currentSource} type="video/mp4" />
                    </video>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black-pure rounded-none">
                        <span className="font-sans text-xs font-black text-white-pure uppercase tracking-widest">No videos available</span>
                    </div>
                )}

                <div className="absolute inset-0 border-[24px] md:border-[48px] border-white-pure pointer-events-none z-10 rounded-none" />

                <div className="absolute top-12 left-12 md:top-24 md:left-24 z-20 flex flex-col gap-2 rounded-none">
                    <div className="flex items-center gap-3 bg-black-pure p-2 px-4 border-l-2 border-primary-500 rounded-none transition-all duration-200 ease-in-out hover:border-l-8 focus-within:border-l-8">
                        <div className="w-2 h-2 bg-primary-500 rounded-none" />
                        <span className="font-sans text-[10px] md:text-xs font-black text-white-pure uppercase tracking-widest rounded-none">
                            FEATURED_{String(currentIndex + 1).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % videoUrls.length)}
                    className="absolute bottom-12 right-12 md:bottom-24 md:right-24 z-20 bg-white-pure border-2 border-black-pure px-8 py-4 transition-all duration-200 ease-in-out hover:bg-primary-500 hover:border-black-pure hover:scale-105 focus:bg-primary-500 focus:border-black-pure focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer rounded-none"
                    aria-label="Next video"
                >
                    <span className="font-sans text-sm font-black text-black-pure uppercase tracking-widest transition-all duration-200 ease-in-out hover:text-black-pure focus:text-black-pure">NEXT</span>
                </button>
            </div>

            <div className="h-28 md:h-40 bg-white-pure border-t-2 border-black-pure w-full z-20 shrink-0 rounded-none">
                <SectionCTA
                    variant={1}
                    label="ACCESS MEDIA HUB"
                    path="/media"
                    buttonBgColor="bg-primary-500"
                    buttonTextColor="text-black-pure"
                />
            </div>
        </section>
    )
}

export default VideoSection