"use client"
import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
    id: string
    title: string
    meta: string
    video: Media | string | null
    poster: Media | string | null
    tags: string[]
    playLabel?: string
    liveLabel?: string
    pausedLabel?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    id,
    title,
    meta,
    video,
    poster,
    tags,
    playLabel = 'Play',
    liveLabel = 'Live',
    pausedLabel = 'Paused',
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    const videoSrc = typeof video === 'string' ? video : video?.url || ''
    const posterSrc = typeof poster === 'string' ? poster : poster?.url || `https://picsum.photos/seed/${id}/1920/1080`
    const placeholderImage = `https://picsum.photos/seed/${id}-video/1920/1080`

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Space' || e.key === 'Enter') {
                e.preventDefault()
                togglePlay()
            }
        }

        window.addEventListener('keydown', handleKeyDown as any)
        return () => window.removeEventListener('keydown', handleKeyDown as any)
    }, [isPlaying])

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.duration) {
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(percent)
        }
    }

    const handleEnded = () => {
        setIsPlaying(false)
        setProgress(0)
        if (videoRef.current) {
            videoRef.current.currentTime = 0
        }
    }

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        console.warn('Video failed to load')
    }

    return (
        <section className="relative w-full min-h-screen bg-foreground flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-neutral-800 items-center px-4 md:px-6 justify-between bg-foreground z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-sm md:text-base font-bold tracking-wider text-primary font-mono">
                        {id}
                    </span>
                    <div className="h-3 w-px bg-neutral-800" />
                    <div className="flex gap-2 md:gap-3">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-sm md:text-base text-neutral-500 uppercase tracking-wide font-mono">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-sm md:text-base text-neutral-500 font-mono uppercase">
                        {isPlaying ? liveLabel : pausedLabel}
                    </span>
                </div>
            </div>

            <div
                className="flex-1 relative bg-neutral-900 overflow-hidden cursor-pointer min-h-[500px]"
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        togglePlay()
                    }
                }}
            >
                {videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={posterSrc}
                        className="w-full h-full object-cover"
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleEnded}
                        onError={handleVideoError}
                        playsInline
                    />
                ) : (
                    <div className="relative w-full h-full">
                        <Image
                            src={placeholderImage}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                            <span className="text-background text-base md:text-lg font-mono">Video unavailable</span>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-16 z-30 pointer-events-none">
                    <div className="max-w-3xl">
                        <p className="text-primary text-sm md:text-lg font-bold mb-3 md:mb-4 tracking-wider">
                            {meta}
                        </p>
                        <h1 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl text-background uppercase leading-[0.9] drop-shadow-2xl">
                            {title}
                        </h1>
                    </div>
                </div>

                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-40 bg-foreground/60 backdrop-blur-sm transition-all duration-500 group">
                        <button
                            onClick={togglePlay}
                            className="bg-primary text-primary-foreground px-6 md:px-10 py-3 md:py-5 border-2 border-foreground text-sm md:text-lg font-bold uppercase tracking-wider hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-foreground transition-transform duration-300 cursor-pointer flex items-center gap-3 rounded-md"
                            aria-label={playLabel}
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            {playLabel}
                        </button>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>

                <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2 z-30">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoPlayer