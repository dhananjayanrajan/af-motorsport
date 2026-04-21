'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionScroller from './Scroller'

interface CentralMediaProps {
    id: string
    title: string
    meta: string
    image: Media | string | null
    tags: string[]
}

const CentralMedia: React.FC<CentralMediaProps> = ({ id, title, meta, image, tags }) => {
    const placeholder = `https://picsum.photos/seed/${id}/1920/1080`
    const src = typeof image === 'string' ? image : image?.url || placeholder
    const [isZoomed, setIsZoomed] = useState(false)

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30 sticky top-0">
                <div className="w-20 flex items-center justify-center bg-black-pure group">
                    <div className="w-1.5 h-6 md:w-2 md:h-8 bg-primary-500 group-hover:scale-y-150 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex items-center px-4 md:px-8">
                    <h2 className="font-mono text-[10px] md:text-xs font-black tracking-wider uppercase text-neutral-400">
                        {id}
                    </h2>
                </div>
                <div className="hidden lg:flex items-center px-4 md:px-8 gap-4 md:gap-6 bg-neutral-50">
                    {tags.map((tag, i) => (
                        <div key={i} className="flex items-center gap-1.5 md:gap-2 group-hover:animate-pulse">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary-500 rotate-45" />
                            <span className="font-mono text-[8px] md:text-[9px] font-black uppercase text-neutral-500">
                                {tag}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-4 md:p-6 lg:p-12 xl:p-20 bg-gradient-to-br from-neutral-50 to-white-pure">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-black-pure/10" />
                    <div className="absolute top-0 left-1/2 w-px h-full bg-black-pure/10" />
                </div>

                <div className="relative w-full h-full max-w-5xl xl:max-w-6xl group">
                    <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-primary-500 z-20" />
                    <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-primary-500 z-20" />

                    <div className="relative w-full h-full border-2 md:border-4 border-black-pure bg-white-pure overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 group-hover:shadow-[12px_12px_0px_0px_rgba(236,72,153,0.5)]">
                        <div
                            className={`relative w-full h-full cursor-zoom-in transition-transform duration-700 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <Image
                                src={src}
                                alt={title}
                                fill
                                priority
                                className="object-cover transition-all duration-1000"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/10 transition-colors duration-500 pointer-events-none" />

                        <div className="absolute top-0 left-0 w-full p-4 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-between h-full pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="bg-black-pure text-white-pure p-3 md:p-4 lg:p-5 max-w-xs border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-primary-500 backdrop-blur-sm">
                                    <p className="font-mono text-[9px] md:text-[10px] lg:text-[11px] font-black uppercase leading-tight">
                                        {meta}
                                    </p>
                                </div>
                                <div className="font-race text-lg md:text-xl lg:text-2xl text-white-pure opacity-20 uppercase">
                                    {id}
                                </div>
                            </div>

                            <div className="bg-white-pure border-2 md:border-4 border-black-pure p-4 md:p-5 lg:p-6 xl:p-8 self-end translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500 max-w-md">
                                <h1 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black-pure uppercase leading-[0.9]">
                                    {title}
                                </h1>
                            </div>
                        </div>

                        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black-pure/50 backdrop-blur-sm text-white-pure px-2 py-0.5 md:px-3 md:py-1 rounded text-[8px] md:text-[9px] font-mono">
                            {isZoomed ? 'ZOOM OUT' : 'ZOOM IN'}
                        </div>
                    </div>
                </div>
            </div>

            <SectionScroller items={[id, title, "FOCUS", "CENTER", "PRIMARY"]} variant={5} velocity={26} />
        </section>
    )
}

export default CentralMedia