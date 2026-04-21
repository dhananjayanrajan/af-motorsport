'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionScroller from './Scroller'

export interface GalleryItem {
    id: string
    image: Media | string
    title: string
    category?: string
}

interface GalleryGridProps {
    id: string
    title: string
    items: GalleryItem[]
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ id, title, items }) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

    const openLightbox = (index: number) => setSelectedIdx(index)
    const closeLightbox = () => setSelectedIdx(null)

    return (
        <section className="relative w-full min-h-screen bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-b border-black-pure">
                {items.map((item, index) => {
                    const src = typeof item.image === 'string' ? item.image : item.image?.url || ''
                    return (
                        <div
                            key={index}
                            className="aspect-square relative border-r border-b border-black-pure group cursor-pointer overflow-hidden"
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={src}
                                alt={item.title}
                                fill
                                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/20 transition-colors" />
                            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-[10px] font-bold text-white-pure uppercase bg-black-pure px-2 py-1">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {selectedIdx !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-white-pure/95 backdrop-blur-md flex flex-col items-center justify-center p-8 lg:p-20"
                    onClick={closeLightbox}
                >
                    <button className="absolute top-8 right-8 text-black-pure text-xs font-bold uppercase tracking-widest">
                        Close [ESC]
                    </button>
                    <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={typeof items[selectedIdx].image === 'string' ? items[selectedIdx].image : items[selectedIdx].image?.url || ''}
                            alt={items[selectedIdx].title}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="mt-8 text-center">
                        <h3 className="font-race text-3xl text-black-pure uppercase">{items[selectedIdx].title}</h3>
                        <p className="text-[10px] font-bold text-neutral-400 mt-2 uppercase tracking-tighter">
                            {selectedIdx + 1} / {items.length}
                        </p>
                    </div>
                </div>
            )}

            <div className="z-30 bg-white-pure">
                <SectionScroller
                    items={[title, `${items.length} ASSETS`, id]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default GalleryGrid