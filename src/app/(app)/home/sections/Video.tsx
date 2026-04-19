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
        return <section className="w-full h-screen bg-black-pure border-b-2 border-black-pure" />
    }

    const hasVideos = videoUrls.length > 0
    const currentSource = hasVideos ? videoUrls[currentIndex] : null

    return (
        <section className="relative w-full min-h-screen bg-white-pure overflow-hidden flex flex-col border-b-2 border-black-pure z-10">
            <div className="flex-1 relative overflow-hidden bg-black-pure">
                {currentSource ? (
                    <video
                        ref={videoRef}
                        key={currentSource}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={currentSource} type="video/mp4" />
                    </video>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black-pure" />
                )}

                <div className="absolute inset-0 border-[24px] md:border-[48px] border-white-pure pointer-events-none z-10" />

                <div className="absolute top-12 left-12 md:top-24 md:left-24 z-20 flex flex-col gap-2">
                    <div className="flex items-center gap-3 bg-black-pure/40 backdrop-blur-md p-2 px-4 border-l-2 border-primary">
                        <div className="w-2 h-2 bg-primary animate-pulse" />
                        <span className="font-mono text-[10px] md:text-xs font-black text-white-pure uppercase tracking-[0.4em]">
                            CH_{String(currentIndex + 1).padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </div>

            <div className="h-28 md:h-40 bg-white-pure border-t-2 border-black-pure w-full z-20 shrink-0">
                <SectionCTA
                    variant={1}
                    label="ACCESS MEDIA HUB"
                    path="/media"
                    buttonBgColor="bg-primary"
                    buttonTextColor="text-black-pure"
                />
            </div>
        </section>
    )
}

export default VideoSection