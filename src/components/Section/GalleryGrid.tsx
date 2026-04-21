'use client'

import { Media } from '@/payload-types'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
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
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

    const openLightbox = (index: number) => {
        setSelectedIdx(index)
        document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
        setSelectedIdx(null)
        document.body.style.overflow = 'unset'
    }

    const goPrev = useCallback(() => {
        if (selectedIdx !== null) {
            setSelectedIdx((selectedIdx - 1 + items.length) % items.length)
        }
    }, [selectedIdx, items.length])

    const goNext = useCallback(() => {
        if (selectedIdx !== null) {
            setSelectedIdx((selectedIdx + 1) % items.length)
        }
    }, [selectedIdx, items.length])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIdx !== null) {
                if (e.key === 'Escape') closeLightbox()
                if (e.key === 'ArrowLeft') goPrev()
                if (e.key === 'ArrowRight') goNext()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedIdx, goPrev, goNext])

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-tertiary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {items.length} ASSETS
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 border-b border-black-pure">
                {items.map((item, index) => {
                    const src = typeof item.image === 'string' ? item.image : item.image?.url || `https://picsum.photos/seed/${item.id}/800/800`
                    const isLoaded = loadedImages.has(index)

                    return (
                        <div
                            key={index}
                            className="aspect-square relative border-r border-b border-black-pure group cursor-pointer overflow-hidden bg-neutral-100"
                            onClick={() => openLightbox(index)}
                        >
                            <div className={`absolute inset-0 bg-primary-500 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
                            <Image
                                src={src}
                                alt={item.title}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                onLoadingComplete={() => {
                                    setLoadedImages(prev => new Set(prev).add(index))
                                }}
                            />
                            <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/30 transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="bg-white-pure text-black-pure p-2 md:p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <p className="text-[8px] md:text-[9px] font-black text-white-pure uppercase bg-black-pure/80 px-2 py-1 backdrop-blur-sm rounded">
                                    {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {selectedIdx !== null && (
                <div className="fixed inset-0 z-[200] bg-black-pure/98 flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white-pure/10 hover:bg-primary-500 text-white-pure p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <button
                        onClick={goPrev}
                        className="absolute left-4 md:left-6 z-50 bg-white-pure/10 hover:bg-primary-500 text-white-pure p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <button
                        onClick={goNext}
                        className="absolute right-4 md:right-6 z-50 bg-white-pure/10 hover:bg-primary-500 text-white-pure p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <div className="relative w-full h-full max-w-7xl max-h-[85vh] mx-auto p-4 md:p-8">
                        <Image
                            src={typeof items[selectedIdx].image === 'string' ? items[selectedIdx].image : items[selectedIdx].image?.url || ''}
                            alt={items[selectedIdx].title}
                            fill
                            className="object-contain animate-in zoom-in duration-500"
                            priority
                        />
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 text-center z-50">
                        <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-white-pure uppercase">{items[selectedIdx].title}</h3>
                        <p className="text-[10px] md:text-xs font-bold text-primary-500 mt-2 tracking-wider">
                            {selectedIdx + 1} / {items.length}
                        </p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
                        <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${((selectedIdx + 1) / items.length) * 100}%` }} />
                    </div>
                </div>
            )}

            <SectionScroller items={[title, `${items.length} IMAGES`, id, "VISUAL ARCHIVE"]} variant={3} velocity={32} />
        </section>
    )
}

export default GalleryGrid