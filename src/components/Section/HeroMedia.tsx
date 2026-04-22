'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HeroMediaProps {
    id: string
    title: string
    meta: string
    image: Media | string | null
    tags: string[]
    ctaLabel?: string
    ctaHref?: string
    badgeText?: string
    identityLabel?: string
    stampLabel?: string
    cornerNumber?: string
}

const HeroMedia: React.FC<HeroMediaProps> = ({
    id,
    title,
    meta,
    image,
    tags,
    ctaLabel,
    ctaHref,
    badgeText,
    identityLabel,
    stampLabel,
    cornerNumber,
}) => {
    const placeholder = `https://picsum.photos/seed/${id}/1920/1080`
    const src = typeof image === 'string' ? image : image?.url || placeholder
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new window.Image()
        img.src = src
        img.onload = () => setImageLoaded(true)
    }, [src])

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 md:h-20 border-b border-black-pure divide-x divide-black-pure bg-white-pure z-30 sticky top-0">
                <div className="w-16 md:w-20 flex items-center justify-center bg-primary-500 hover:bg-secondary-500 transition-colors duration-300 group">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-black-pure group-hover:scale-150 transition-transform duration-300" />
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-neutral-400">
                        {id}
                    </h2>
                </div>
                {tags.length > 0 && (
                    <div className="hidden lg:flex items-center px-4 md:px-8 gap-2 md:gap-4 bg-neutral-50">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="font-mono text-[8px] md:text-[10px] font-bold uppercase border border-black-pure px-2 py-1 hover:bg-black-pure hover:text-white-pure transition-all duration-300 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative min-h-[calc(100vh-4rem)]">
                <div className="w-full lg:w-[480px] xl:w-[560px] border-r border-black-pure bg-white-pure p-6 md:p-8 lg:p-12 flex flex-col justify-between z-20">
                    <div>
                        {badgeText && (
                            <div className="flex items-center gap-2 mb-6 md:mb-8">
                                <div className="h-0.5 w-8 md:w-12 bg-primary-500" />
                                <span className="font-mono text-[8px] md:text-[10px] font-black text-secondary-500 tracking-wider animate-pulse">
                                    {badgeText}
                                </span>
                            </div>
                        )}
                        <h1 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl text-black-pure uppercase leading-[0.85] tracking-tighter break-words">
                            {title}
                        </h1>
                    </div>

                    <div className="space-y-6 md:space-y-10 mt-8 md:mt-0">
                        <div className="relative p-6 md:p-8 border-2 md:border-4 border-black-pure bg-white-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,255,65,0.5)] transition-shadow duration-300">
                            <p className="font-mono text-sm md:text-base lg:text-lg font-black uppercase leading-tight text-black-pure">
                                {meta}
                            </p>
                        </div>

                        {ctaLabel && ctaHref && (
                            <Link href={ctaHref} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                                <div className="flex items-center justify-between border-2 border-black-pure bg-black-pure text-white-pure px-6 md:px-8 py-4 md:py-5 hover:bg-primary-500 hover:text-black-pure hover:border-black-pure transition-all duration-300">
                                    <span className="font-mono text-xs md:text-sm font-black uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                                        {ctaLabel}
                                    </span>
                                    <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        )}

                        {(identityLabel || stampLabel || cornerNumber) && (
                            <div className="flex items-center justify-between font-mono text-[8px] md:text-[10px] font-bold text-neutral-400">
                                <div className="space-y-1">
                                    {identityLabel && <p>{identityLabel}</p>}
                                    {stampLabel && <p>{stampLabel}</p>}
                                </div>
                                {cornerNumber && (
                                    <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black-pure flex items-center justify-center text-black-pure font-black text-sm md:text-base">
                                        {cornerNumber}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 relative bg-neutral-100 overflow-hidden group min-h-[400px] lg:min-h-0">
                    <div className={`absolute inset-0 bg-black-pure/20 transition-opacity duration-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
                    <Image
                        src={src}
                        alt={title}
                        fill
                        priority
                        className={`object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoadingComplete={() => setImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-pure/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 w-px h-full bg-white-pure/20" />
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white-pure/20" />
                    </div>
                    <div className="absolute top-4 md:top-10 left-4 md:left-10 w-4 h-4 md:w-6 md:h-6 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-white-pure/50" />
                    <div className="absolute top-4 md:top-10 right-4 md:right-10 w-4 h-4 md:w-6 md:h-6 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-white-pure/50" />
                    <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 w-4 h-4 md:w-6 md:h-6 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-white-pure/50" />
                    <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 w-4 h-4 md:w-6 md:h-6 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-white-pure/50" />
                </div>
            </div>
        </section>
    )
}

export default HeroMedia