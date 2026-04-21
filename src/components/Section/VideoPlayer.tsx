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

    const videoSrc = typeof video === 'string' ? video : video?.url || ''
    const posterSrc = typeof poster === 'string' ? poster : poster?.url || ''

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

    return (
        <section className="relative w-full h-screen bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">
                        {id}
                    </span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <div className="flex gap-2">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-[11px] text-neutral-500 uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 relative bg-neutral-50 overflow-hidden cursor-pointer" onClick={togglePlay}>
                {videoSrc && (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={posterSrc}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                    />
                )}

                <div className="absolute inset-0 bg-black-pure/10" />

                <div className="absolute bottom-0 left-0 w-full p-10 lg:p-16 z-30 pointer-events-none">
                    <div className="max-w-4xl">
                        <p className="text-white-pure text-sm font-medium mb-4 opacity-90">
                            {meta}
                        </p>
                        <h1 className="font-race text-6xl md:text-8xl text-white-pure uppercase leading-none">
                            {title}
                        </h1>
                    </div>
                </div>

                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-40 bg-black-pure/20 backdrop-blur-[2px] transition-all">
                        <div className="bg-white-pure text-black-pure px-8 py-4 border border-black-pure text-xs font-bold uppercase tracking-widest">
                            Play Video
                        </div>
                    </div>
                )}
            </div>

            <div className="z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, meta]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default VideoPlayer