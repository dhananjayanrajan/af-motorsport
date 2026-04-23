"use client"
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
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={2} />

                <div className="mt-8 mb-12 flex items-center">
                    <span className="font-mono text-sm font-semibold text-primary uppercase tracking-wider">
                        {items.length} Media Assets Loaded
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {items.map((item, index) => {
                        const src = typeof item.image === 'string' ? item.image : item.image?.url || ''
                        const isLoaded = loadedImages.has(index)

                        return (
                            <div
                                key={item.id}
                                className="aspect-square relative group cursor-pointer overflow-hidden bg-muted rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300"
                                onClick={() => openLightbox(index)}
                            >
                                {!isLoaded && (
                                    <div className="absolute inset-0 bg-muted animate-pulse z-10 rounded-lg" />
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

                                <div className="absolute inset-0 border-0 group-hover:border-4 border-primary transition-all duration-300 pointer-events-none z-20 rounded-lg" />

                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                                    <div className="bg-foreground/90 backdrop-blur-sm p-3 rounded-md shadow-lg">
                                        <p className="font-mono text-sm font-semibold text-background uppercase truncate">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {selectedIdx !== null && (
                    <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-12 lg:p-20">
                        <div className="absolute top-0 left-0 w-full h-16 border-b border-border flex items-center justify-between px-6 bg-background">
                            <div className="flex flex-col">
                                <span className="font-mono text-sm font-semibold text-primary uppercase tracking-wider">Viewing Asset</span>
                                <h4 className="text-base font-semibold text-foreground uppercase">{items[selectedIdx].title}</h4>
                            </div>
                            <button
                                onClick={closeLightbox}
                                className="h-full px-8 border-l border-border bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors font-mono text-sm font-semibold rounded-md"
                            >
                                Close
                            </button>
                        </div>

                        <div className="relative w-full h-full flex items-center justify-center">
                            <button
                                onClick={goPrev}
                                className="absolute left-4 z-50 w-16 h-16 border-2 border-foreground bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg rounded-full"
                            >
                                <ChevronLeft className="w-6 h-6 text-foreground" />
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
                                className="absolute right-4 z-50 w-16 h-16 border-2 border-foreground bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg rounded-full"
                            >
                                <ChevronRight className="w-6 h-6 text-foreground" />
                            </button>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-12 border-t border-border bg-foreground flex items-center justify-center">
                            <div
                                className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
                                style={{ width: `${((selectedIdx + 1) / items.length) * 100}%` }}
                            />
                            <span className="font-mono text-sm font-semibold text-background uppercase tracking-wider">
                                Index: {(selectedIdx + 1).toString().padStart(3, '0')} // {items.length.toString().padStart(3, '0')}
                            </span>
                        </div>
                    </div>
                )}

                <div className="mt-16">
                    <SectionFooter variant={1} />
                </div>
            </div>
        </section>
    )
}

export default GalleryGrid