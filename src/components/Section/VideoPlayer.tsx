'use client'

import { Media } from '@/payload-types'
import React, { useRef, useState } from 'react'
import SectionScroller from './Scroller'

interface VideoPlayerProps {
    id: string
    title: string
    meta: string
    video: Media | string | null
    poster: Media | string | null
    tags: string[]
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ id, title, meta, video, poster, tags }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    const videoSrc = typeof video === 'string' ? video : video?.url || ''
    const posterSrc = typeof poster === 'string' ? poster : poster?.url || `https://picsum.photos/seed/${id}/1920/1080`

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
        if (videoRef.current) {
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

    return (
        <section className="relative w-full min-h-screen bg-black-pure flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-neutral-800 items-center px-4 md:px-6 justify-between bg-black-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-wider text-primary-500 font-mono">
                        {id}
                    </span>
                    <div className="h-3 w-px bg-neutral-800" />
                    <div className="flex gap-2 md:gap-3">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-[8px] md:text-[10px] text-neutral-500 uppercase tracking-wide font-mono">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-[8px] md:text-[10px] text-neutral-500 font-mono uppercase">
                        {isPlaying ? 'LIVE' : 'PAUSED'}
                    </span>
                </div>
            </div>

            <div className="flex-1 relative bg-neutral-900 overflow-hidden cursor-pointer min-h-[500px]" onClick={togglePlay}>
                {videoSrc && (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={posterSrc}
                        className="w-full h-full object-cover"
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleEnded}
                        playsInline
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-16 z-30 pointer-events-none">
                    <div className="max-w-3xl">
                        <p className="text-primary-500 text-xs md:text-sm font-bold mb-3 md:mb-4 tracking-wider">
                            {meta}
                        </p>
                        <h1 className="font-race text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white-pure uppercase leading-[0.9] drop-shadow-2xl">
                            {title}
                        </h1>
                    </div>
                </div>

                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-40 bg-black-pure/60 backdrop-blur-sm transition-all duration-500 group">
                        <div className="bg-primary-500 text-black-pure px-6 md:px-10 py-3 md:py-5 border-2 border-black-pure text-xs md:text-sm font-black uppercase tracking-wider hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center gap-3">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            PLAY NOW
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
                    <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>

                <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2 z-30">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black-pure/50 backdrop-blur-sm flex items-center justify-center border border-white-pure/20">
                        <svg className="w-4 h-4 text-white-pure" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <SectionScroller items={[title, id, meta, "WATCH", "EXPERIENCE"]} variant={2} velocity={20} />
        </section>
    )
}

export default VideoPlayer