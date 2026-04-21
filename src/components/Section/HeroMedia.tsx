'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import SectionScroller from './Scroller'

interface HeroMediaProps {
    id: string
    title: string
    meta: string
    image: Media | string | null
    tags: string[]
}

const HeroMedia: React.FC<HeroMediaProps> = ({ id, title, meta, image, tags }) => {
    const placeholder = `https://picsum.photos/seed/${id}/1920/1080`
    const src = typeof image === 'string' ? image : image?.url || placeholder

    return (
        <section className="relative w-full h-screen bg-white-pure flex flex-col overflow-hidden border-b-[12px] border-black-pure">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-primary-500">
                    <div className="w-6 h-6 bg-black-pure animate-pulse" />
                </div>
                <div className="flex-1 flex items-center px-8">
                    <h2 className="font-mono text-[10px] font-black tracking-widest uppercase text-black-pure">
                        REG_ID // {id}
                    </h2>
                </div>
                <div className="hidden md:flex items-center px-8 gap-4 bg-neutral-50">
                    {tags.map((tag, i) => (
                        <span key={i} className="font-mono text-[9px] font-bold uppercase border-2 border-black-pure px-2 py-0.5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative">
                <div className="w-full lg:w-[500px] border-r-4 border-black-pure bg-white-pure p-12 flex flex-col justify-between z-20">
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <div className="h-[2px] w-12 bg-black-pure" />
                            <span className="font-mono text-[10px] font-black text-primary-500">SYSTEM.ACTIVE</span>
                        </div>
                        <h1 className="font-race text-7xl md:text-8xl xl:text-9xl text-black-pure uppercase leading-[0.85] tracking-tighter">
                            {title}
                        </h1>
                    </div>

                    <div className="space-y-10">
                        <div className="relative p-8 border-4 border-black-pure bg-white-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-mono text-sm font-black uppercase leading-tight text-black-pure">
                                {meta}
                            </p>
                        </div>
                        <div className="flex items-center justify-between font-mono text-[10px] font-bold text-neutral-400">
                            <div className="space-y-1">
                                <p>AUTH // LAB_OVERRIDE</p>
                                <p>STAMP // {new Date().getFullYear()}.REV</p>
                            </div>
                            <div className="w-12 h-12 border-2 border-black-pure flex items-center justify-center text-black-pure">
                                01
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative bg-neutral-100 overflow-hidden group">
                    <Image
                        src={src}
                        alt={title}
                        fill
                        priority
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-white-pure/10 mix-blend-overlay" />

                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black-pure" />
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black-pure" />
                    </div>

                    <div className="absolute top-10 left-10 w-6 h-6 border-t-4 border-l-4 border-black-pure" />
                    <div className="absolute top-10 right-10 w-6 h-6 border-t-4 border-r-4 border-black-pure" />
                    <div className="absolute bottom-10 left-10 w-6 h-6 border-b-4 border-l-4 border-black-pure" />
                    <div className="absolute bottom-10 right-10 w-6 h-6 border-b-4 border-r-4 border-black-pure" />
                </div>
            </div>

            <div className="z-30">
                <SectionScroller
                    items={[id, title, "PRIMARY_DATA_FEED", "VALID_ASSET"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default HeroMedia