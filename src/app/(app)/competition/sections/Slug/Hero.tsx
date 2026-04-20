// /var/www/clients/afmotor/af-motorsport/src/app/(app)/competition/sections/Slug/SlugHero.tsx

'use client'

import Image from 'next/image'
import React from 'react'

interface SlugHeroProps {
    title: string
    alias?: string | null
    identifier?: string | null
    establishedYear?: string
    status?: string | null
    access?: string | null
    coverImage?: string
    logoImage?: string
    onExplore?: () => void
}

const SlugHero: React.FC<SlugHeroProps> = ({
    title,
    alias,
    identifier,
    establishedYear,
    status,
    access,
    coverImage,
    logoImage,
    onExplore
}) => {
    const handleScroll = () => {
        if (onExplore) {
            onExplore()
        } else {
            const next = document.getElementById('slug-manifest-overview')
            next?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="relative w-full h-screen bg-black-pure flex flex-col overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={coverImage || `https://picsum.photos/seed/hero/1920/1080`}
                    alt=""
                    fill
                    className="object-cover opacity-40 transition-transform duration-[5000ms] hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/50 to-transparent" />
                <div className="absolute inset-0 bg-primary-500/5" />
            </div>

            <div className="relative z-20 flex-1 flex flex-col p-5 md:p-8 lg:p-16 xl:p-24 justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
                        <div className="bg-black-pure/80 backdrop-blur-sm p-2 md:p-3 lg:p-4 inline-block border-l-4 border-primary-500">
                            {logoImage ? (
                                <div className="relative size-8 md:size-12 lg:size-16">
                                    <Image src={logoImage} alt="" fill className="object-contain" />
                                </div>
                            ) : (
                                <span className="font-race font-black text-white-pure text-base md:text-xl lg:text-3xl italic">
                                    {identifier || 'SR'}
                                </span>
                            )}
                        </div>
                        <span className="font-mono text-[6px] md:text-[7px] lg:text-[8px] font-black text-primary-400 uppercase tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.4em]">
                            ESTABLISHED {establishedYear || '2026'}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-1 md:gap-2">
                        <div className="size-4 md:size-6 lg:size-8 bg-primary-500 mb-0.5 md:mb-1 animate-pulse" />
                        <span className="font-mono text-[5px] md:text-[6px] lg:text-[7px] font-black text-white-pure/60 uppercase tracking-wider bg-black-pure/50 px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                            LIVE RECORD
                        </span>
                    </div>
                </div>

                <div className="relative max-w-5xl">
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
                        <div className="w-8 md:w-12 lg:w-16 h-0.5 bg-primary-500" />
                        <span className="font-mono text-[7px] md:text-[8px] lg:text-[9px] font-black text-primary-400 uppercase tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em]">
                            {alias || 'OFFICIAL CHAMPIONSHIP'}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-race font-black text-white-pure uppercase italic leading-[0.85] tracking-tighter transition-all duration-500 hover:text-primary-400 cursor-default break-words">
                        {title}
                    </h1>
                </div>
            </div>

            <div className="relative z-30 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-white/10">
                <div className="bg-primary-600/90 backdrop-blur-sm p-4 md:p-5 lg:p-6 flex flex-col justify-center border-r border-white/10 group hover:bg-primary-500 transition-all duration-300">
                    <span className="font-mono text-[6px] md:text-[7px] lg:text-[8px] font-black text-white-pure/60 group-hover:text-black-pure uppercase tracking-wider mb-0.5 md:mb-1">STATUS</span>
                    <span className="font-race font-black text-sm md:text-base lg:text-lg text-white-pure group-hover:text-black-pure uppercase italic">
                        {status || 'ACTIVE'}
                    </span>
                </div>
                <div className="bg-black-pure/60 backdrop-blur-sm p-4 md:p-5 lg:p-6 flex flex-col justify-center border-r border-white/10 group hover:bg-secondary-500 transition-all duration-300">
                    <span className="font-mono text-[6px] md:text-[7px] lg:text-[8px] font-black text-white-pure/60 group-hover:text-black-pure uppercase tracking-wider mb-0.5 md:mb-1">ACCESS</span>
                    <span className="font-race font-black text-sm md:text-base lg:text-lg text-white-pure group-hover:text-black-pure uppercase italic">
                        {access || 'PUBLIC'}
                    </span>
                </div>
                <div className="bg-black-pure/40 backdrop-blur-sm p-4 md:p-5 lg:p-6 flex flex-col justify-center border-r border-white/10 group hover:bg-tertiary-500 transition-all duration-300">
                    <span className="font-mono text-[6px] md:text-[7px] lg:text-[8px] font-black text-white-pure/60 group-hover:text-black-pure uppercase tracking-wider mb-0.5 md:mb-1">IDENTITY</span>
                    <span className="font-race font-black text-sm md:text-base lg:text-lg text-white-pure group-hover:text-black-pure uppercase italic">
                        {identifier || 'C1'}
                    </span>
                </div>
                <button
                    onClick={handleScroll}
                    className="bg-primary-500 p-4 md:p-5 lg:p-6 flex items-center justify-between group hover:bg-white-pure focus:bg-secondary-500 outline-none transition-all duration-300"
                >
                    <span className="font-race font-black text-sm md:text-base lg:text-lg text-black-pure group-hover:text-black-pure uppercase italic">EXPLORE</span>
                    <div className="size-6 md:size-8 lg:size-10 border-2 border-black-pure flex items-center justify-center group-hover:border-primary-500 transition-all duration-300 group-hover:translate-x-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="md:w-5 md:h-5 lg:w-6 lg:h-6 text-black-pure">
                            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    )
}

export default SlugHero