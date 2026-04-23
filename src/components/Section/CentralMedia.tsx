"use client"
import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

interface CentralMediaProps {
    id: string
    title: string
    meta: string
    image: Media | string | null
    tags: string[]
}

const CentralMedia: React.FC<CentralMediaProps> = ({ id, title, meta, image, tags }) => {
    const src = typeof image === 'object' ? image?.url : image || ''
    const [isZoomed, setIsZoomed] = useState(false)

    if (!src) return null

    return (
        <section className="relative w-full min-h-screen bg-background flex flex-col border-b-2 border-border overflow-hidden">
            <SectionHeader title={title} subtitle={id} variant={2} />

            <div className="flex h-12 bg-foreground border-b-2 border-border px-6 items-center overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-6">
                    <span className="font-mono text-sm font-semibold text-primary uppercase tracking-wider whitespace-nowrap">
                        Core Visual Feed // 001 Active
                    </span>
                    <div className="flex items-center gap-4">
                        {tags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-background rotate-45 rounded-sm" />
                                <span className="font-mono text-sm font-semibold uppercase text-neutral-400 whitespace-nowrap">
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-6 md:p-12 lg:p-20 bg-muted/30">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-foreground" />
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-foreground" />
                </div>

                <div className="relative w-full h-full max-w-6xl group">
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-primary z-20 pointer-events-none rounded-tl-lg" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-primary z-20 pointer-events-none rounded-br-lg" />

                    <div className="relative w-full h-full border-2 md:border-4 border-foreground bg-card overflow-hidden shadow-2xl group-hover:shadow-primary/50 transition-all duration-500 rounded-lg">
                        <div
                            className={`relative w-full h-full cursor-zoom-in transition-transform duration-700 ${isZoomed ? 'scale-150' : 'scale-100'
                                }`}
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <Image
                                src={src}
                                alt={title}
                                fill
                                priority
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>

                        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors duration-500 pointer-events-none" />

                        <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="bg-foreground/90 backdrop-blur-sm border-2 border-primary p-4 max-w-xs shadow-lg rounded-md">
                                    <p className="font-mono text-sm font-semibold text-background uppercase leading-tight tracking-wider">
                                        Data Overlay: {meta}
                                    </p>
                                </div>
                                <div className="font-mono text-sm font-semibold text-background bg-foreground/90 backdrop-blur-sm px-3 py-1 mix-blend-difference rounded-md">
                                    {isZoomed ? 'Zoom Level 2.0' : 'Zoom Level 1.0'}
                                </div>
                            </div>

                            <div className="self-end bg-card border-4 border-foreground p-8 max-w-xl group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500 rounded-lg shadow-lg">
                                <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl text-foreground uppercase leading-none tracking-tighter italic">
                                    {title}
                                </h1>
                                <div className="mt-4 h-1 w-20 bg-primary rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SectionFooter variant={1} />
        </section>
    )
}

export default CentralMedia