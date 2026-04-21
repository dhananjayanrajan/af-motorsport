'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
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

    return (
        <section className="relative w-full h-screen bg-white-pure flex flex-col overflow-hidden border-b-[12px] border-black-pure">
            <div className="flex h-20 border-b-4 border-black-pure divide-x-4 divide-black-pure bg-white-pure z-30">
                <div className="w-20 flex items-center justify-center bg-black-pure">
                    <div className="w-2 h-8 bg-primary-500" />
                </div>
                <div className="flex-1 flex items-center px-8">
                    <h2 className="font-mono text-[10px] font-black tracking-widest uppercase text-black-pure">
                        CORE_SPECIMEN // {id}
                    </h2>
                </div>
                <div className="hidden md:flex items-center px-8 gap-6">
                    {tags.map((tag, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-black-pure rotate-45" />
                            <span className="font-mono text-[9px] font-black uppercase text-neutral-400">{tag}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-6 lg:p-20 bg-neutral-100">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black-pure" />
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black-pure" />
                </div>

                <div className="relative w-full h-full max-w-6xl group">
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-black-pure z-20" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-black-pure z-20" />

                    <div className="relative w-full h-full border-4 border-black-pure bg-white-pure overflow-hidden shadow-[30px_30px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                            src={src}
                            alt={title}
                            fill
                            priority
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black-pure/5 mix-blend-multiply" />

                        <div className="absolute top-0 left-0 w-full p-8 lg:p-12 flex flex-col justify-between h-full pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="bg-black-pure text-white-pure p-6 max-w-xs border-b-4 border-r-4 border-primary-500">
                                    <p className="font-mono text-[11px] font-black uppercase leading-tight">
                                        {meta}
                                    </p>
                                </div>
                                <div className="font-race text-2xl text-white-pure opacity-20 uppercase">
                                    {id}
                                </div >
                            </div>

                            <div className="bg-white-pure border-4 border-black-pure p-8 self-end translate-y-6 group-hover:translate-y-0 transition-transform">
                                <h1 className="font-race text-5xl lg:text-8xl text-black-pure uppercase leading-[0.8]">
                                    {title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="z-30 bg-black-pure text-white-pure">
                <SectionScroller
                    items={[id, "CENTRAL_VISUAL_TERMINAL", title, "SYSTEM_LOCKED"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default CentralMedia