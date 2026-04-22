'use client'

import { Media } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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

    if (!items || items.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={2}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure px-6 items-center">
                <span className="font-mono text-[10px] font-black text-primary-500 uppercase tracking-widest">
                    MEDIA_ASSETS // {items.length.toString().padStart(3, '0')}_FILES_LOADED
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 divide-x-2 divide-y-2 divide-black-pure border-b-2 border-black-pure bg-black-pure">
                {items.map((item, index) => {
                    const src = typeof item.image === 'string' ? item.image : item.image?.url || ''
                    const isLoaded = loadedImages.has(index)

                    return (
                        <div
                            key={item.id}
                            className="aspect-square relative group cursor-pointer overflow-hidden bg-neutral-100"
                            onClick={() => openLightbox(index)}
                        >
                            {!isLoaded && (
                                <div className="absolute inset-0 bg-neutral-200 animate-pulse z-10" />
                            )}
                            <Image
                                src={src}
                                alt={item.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                onLoadingComplete={() => {
                                    setLoadedImages(prev => new Set(prev).add(index))
                                }}
                            />

                            <div className="absolute inset-0 border-0 group-hover:border-[12px] border-primary-500 transition-all duration-300 pointer-events-none z-20" />

                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                                <div className="bg-black-pure p-2 shadow-[4px_4px_0px_0px_rgba(234,255,0,1)]">
                                    <p className="font-mono text-[9px] font-black text-white-pure uppercase truncate">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {selectedIdx !== null && (
                <div className="fixed inset-0 z-[200] bg-white-pure flex flex-col items-center justify-center p-4 md:p-12 lg:p-20">
                    <div className="absolute top-0 left-0 w-full h-16 border-b-2 border-black-pure flex items-center justify-between px-6 bg-white-pure">
                        <div className="flex flex-col">
                            <span className="font-mono text-[10px] font-black text-primary-500 uppercase tracking-widest">VIEWING_ASSET</span>
                            <h4 className="text-sm font-black text-black-pure uppercase">{items[selectedIdx].title}</h4>
                        </div>
                        <button
                            onClick={closeLightbox}
                            className="h-full px-8 border-l-2 border-black-pure bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors font-mono text-[10px] font-black"
                        >
                            CLOSE_ESC
                        </button>
                    </div>

                    <div className="relative w-full h-full flex items-center justify-center">
                        <button
                            onClick={goPrev}
                            className="absolute left-0 z-50 w-16 h-16 border-2 border-black-pure bg-white-pure flex items-center justify-center hover:bg-primary-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <ChevronLeft className="w-6 h-6 text-black-pure" />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center p-12">
                            <Image
                                src={typeof items[selectedIdx].image === 'string' ? items[selectedIdx].image : items[selectedIdx].image?.url || ''}
                                alt={items[selectedIdx].title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        <button
                            onClick={goNext}
                            className="absolute right-0 z-50 w-16 h-16 border-2 border-black-pure bg-white-pure flex items-center justify-center hover:bg-primary-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <ChevronRight className="w-6 h-6 text-black-pure" />
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-12 border-t-2 border-black-pure bg-black-pure flex items-center justify-center">
                        <div className="absolute top-0 left-0 h-1 bg-primary-500 transition-all duration-300" style={{ width: `${((selectedIdx + 1) / items.length) * 100}%` }} />
                        <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest">
                            INDEX: {(selectedIdx + 1).toString().padStart(3, '0')} // {items.length.toString().padStart(3, '0')}
                        </span>
                    </div>
                </div>
            )}

            <SectionFooter variant={1} />
        </section>
    )
}

export default GalleryGrid