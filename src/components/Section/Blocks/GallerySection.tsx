"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface GalleryItem {
    id: string
    title: string
    image: string
    category?: string
    description?: string
}

interface GallerySectionProps {
    id: string
    title: string
    subtitle: string
    items: GalleryItem[]
    columns?: 2 | 3 | 4
    ctaLabel?: string
    ctaPath?: string
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
    background?: React.ReactNode
}

const GallerySection: React.FC<GallerySectionProps> = ({
    id,
    title,
    subtitle,
    items = [],
    columns = 3,
    ctaLabel,
    ctaPath,
    headerVariant = 1,
    footerVariant = 1,
    background
}) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [zoomLevel, setZoomLevel] = useState(1)

    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }

    const displayItems = items.slice(0, 9)

    const openLightbox = (index: number) => {
        setActiveIndex(index)
        setZoomLevel(1)
        setLightboxOpen(true)
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden'
        }
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'unset'
        }
    }

    const navigate = useCallback((direction: 'prev' | 'next') => {
        setActiveIndex((prev) => {
            if (direction === 'prev') {
                return prev === 0 ? displayItems.length - 1 : prev - 1
            }
            return prev === displayItems.length - 1 ? 0 : prev + 1
        })
        setZoomLevel(1)
    }, [displayItems.length])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!lightboxOpen) return
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') navigate('prev')
        if (e.key === 'ArrowRight') navigate('next')
    }, [lightboxOpen, navigate])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    const activeItem = displayItems[activeIndex]

    const handleDownload = () => {
        if (!activeItem) return
        const link = document.createElement('a')
        link.href = activeItem.image
        link.download = activeItem.title || 'image'
        link.click()
    }

    return (
        <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
            {background}
            <DotGridBackground />

            <SectionHeader
                title={title}
                subtitle={subtitle}
                variant={headerVariant}
                metadata={String(items.length).padStart(2, '0')}
            />

            <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10">
                <div className="border-2 border-black-pure bg-white-pure p-4 sm:p-6 lg:p-8">
                    <div className={`grid ${gridCols[columns]} gap-4 sm:gap-6`}>
                        {displayItems.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => openLightbox(idx)}
                                className="group relative aspect-square overflow-hidden border-2 border-black-pure bg-white-pure outline-none transition-all duration-500 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute top-0 left-0 border-r-2 border-b-2 border-black-pure bg-black-pure px-3 py-1 z-10">
                                    <span className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-widest">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                    <div className="bg-white-pure border-2 border-black-pure p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <p className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-[0.2em] mb-1">
                                            {item.category || 'Asset'}
                                        </p>
                                        <h3 className="text-sm font-black text-black-pure uppercase tracking-tighter truncate">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </button>
                        ))}

                        {items.length > 9 && (
                            <button className="group relative aspect-square overflow-hidden border-2 border-black-pure bg-secondary-500 flex flex-col items-center justify-center transition-all duration-500 hover:bg-primary-500 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1">
                                <div className="size-14 border-2 border-black-pure bg-white-pure flex items-center justify-center mb-4 transition-transform group-hover:rotate-90">
                                    <ArrowRight className="w-8 h-8 text-black-pure" />
                                </div>
                                <span className="text-sm font-black text-black-pure uppercase tracking-widest">Archive</span>
                                <span className="text-[10px] font-mono font-black text-black-pure/60 block mt-1 uppercase">+{items.length - 9} Entries</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {lightboxOpen && activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-white-pure flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 md:px-8 h-20 border-b-2 border-black-pure bg-white-pure shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-[0.3em]">
                                        Ref: {activeItem.id}
                                    </span>
                                    <h3 className="text-xl font-black text-black-pure uppercase tracking-tighter truncate max-w-[200px] sm:max-w-md">
                                        {activeItem.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="hidden sm:flex items-center gap-2 border-r-2 border-black-pure pr-4 mr-2">
                                    <button onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.5))} className="p-2 hover:text-primary-500 transition-colors"><ZoomOut size={20} /></button>
                                    <span className="text-xs font-mono font-black w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                                    <button onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.5))} className="p-2 hover:text-primary-500 transition-colors"><ZoomIn size={20} /></button>
                                </div>
                                <button onClick={handleDownload} className="size-10 border-2 border-black-pure flex items-center justify-center hover:bg-primary-500 transition-colors"><Download size={18} /></button>
                                <button onClick={closeLightbox} className="size-10 border-2 border-black-pure bg-black-pure text-white-pure flex items-center justify-center hover:bg-primary-500 hover:text-black-pure transition-colors"><X size={20} /></button>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center relative bg-secondary-500/10 overflow-hidden">
                            <button
                                onClick={() => navigate('prev')}
                                className="absolute left-4 sm:left-8 z-30 size-12 sm:size-16 border-2 border-black-pure bg-white-pure flex items-center justify-center hover:bg-primary-500 transition-all hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>

                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                                className="w-full h-full flex items-center justify-center p-8 sm:p-12 lg:p-20"
                                style={{ overflow: zoomLevel > 1 ? 'auto' : 'hidden' }}
                            >
                                <motion.img
                                    src={activeItem.image}
                                    alt={activeItem.title}
                                    className="max-w-full max-h-full object-contain border-2 border-black-pure shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white-pure"
                                    style={{
                                        transform: `scale(${zoomLevel})`,
                                        transition: 'transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
                                    }}
                                />
                            </motion.div>

                            <button
                                onClick={() => navigate('next')}
                                className="absolute right-4 sm:right-8 z-30 size-12 sm:size-16 border-2 border-black-pure bg-white-pure flex items-center justify-center hover:bg-primary-500 transition-all hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="h-16 border-t-2 border-black-pure bg-white-pure flex items-center justify-center gap-3 px-4 shrink-0">
                            {displayItems.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveIndex(idx); setZoomLevel(1) }}
                                    className={`h-2 transition-all duration-500 border-2 border-black-pure ${idx === activeIndex ? 'w-12 bg-primary-500' : 'w-4 bg-white-pure hover:bg-secondary-500'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <SectionFooter variant={footerVariant} />
        </section>
    )
}

export default GallerySection