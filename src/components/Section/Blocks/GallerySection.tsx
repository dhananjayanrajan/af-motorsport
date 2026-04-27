// GallerySection.tsx
"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from 'lucide-react'
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
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }

    const openLightbox = (index: number) => {
        setActiveIndex(index)
        setZoomLevel(1)
        setLightboxOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        document.body.style.overflow = 'unset'
    }

    const navigate = useCallback((direction: 'prev' | 'next') => {
        setActiveIndex((prev) => {
            if (direction === 'prev') {
                return prev === 0 ? items.length - 1 : prev - 1
            }
            return prev === items.length - 1 ? 0 : prev + 1
        })
        setZoomLevel(1)
    }, [items.length])

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

    const activeItem = items[activeIndex]

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

            <div className="container py-8 sm:py-12 lg:py-16 z-1">
                <div className={`grid ${gridCols[columns]} gap-4 sm:gap-6 lg:gap-8`}>
                    {items.map((item, idx) => (
                        <motion.button
                            key={item.id}
                            onClick={() => openLightbox(idx)}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="group relative aspect-[4/3] overflow-hidden border-2 border-black-pure bg-neutral-100 focus-visible:ring-2 focus-visible:ring-primary-500 outline-none"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/40 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ZoomIn className="w-10 h-10 text-white-pure" />
                                </div>
                            </div>

                            <div className="absolute top-3 left-3 z-10">
                                <span className="text-xs font-mono font-black bg-black-pure text-white-pure px-2 py-1 uppercase tracking-widest">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                            </div>

                            {item.category && (
                                <div className="absolute bottom-3 right-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className="text-[10px] font-mono font-black bg-white-pure text-black-pure border-2 border-black-pure px-3 py-1 uppercase tracking-widest">
                                        {item.category}
                                    </span>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {lightboxOpen && activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[200] bg-black-pure flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white-pure/10 shrink-0">
                            <div className="flex items-center gap-4 min-w-0">
                                <span className="text-xs font-mono font-black text-primary-500 uppercase tracking-widest">
                                    {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                                </span>
                                <div className="hidden sm:flex flex-col min-w-0">
                                    <h3 className="text-sm font-black text-white-pure uppercase tracking-tighter truncate">
                                        {activeItem.title}
                                    </h3>
                                    {activeItem.description && (
                                        <p className="text-xs font-bold text-white-pure/40 uppercase tracking-widest truncate">
                                            {activeItem.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.5))}
                                    className="w-10 h-10 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-white-pure/10 transition-colors"
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.5))}
                                    className="w-10 h-10 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-white-pure/10 transition-colors"
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="w-10 h-10 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-white-pure/10 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={closeLightbox}
                                    className="w-10 h-10 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-white-pure/10 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                            <button
                                onClick={() => navigate('prev')}
                                className="absolute left-4 z-30 w-12 h-12 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-white-pure/10 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full flex items-center justify-center p-4 md:p-12"
                                style={{ overflow: zoomLevel > 1 ? 'auto' : 'hidden' }}
                            >
                                <motion.img
                                    src={activeItem.image}
                                    alt={activeItem.title}
                                    className="max-w-full object-contain cursor-grab active:cursor-grabbing"
                                    style={{
                                        transform: `scale(${zoomLevel})`,
                                        maxHeight: zoomLevel > 1 ? 'none' : '90vh',
                                        transition: 'transform 0.3s ease-out'
                                    }}
                                    drag={zoomLevel > 1}
                                    dragConstraints={{
                                        top: -200 * zoomLevel,
                                        left: -200 * zoomLevel,
                                        right: 200 * zoomLevel,
                                        bottom: 200 * zoomLevel,
                                    }}
                                    dragElastic={0.1}
                                />
                            </motion.div>

                            <button
                                onClick={() => navigate('next')}
                                className="absolute right-4 z-30 w-12 h-12 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-white-pure/10 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 p-4 border-t border-white-pure/10 shrink-0">
                            {items.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveIndex(idx); setZoomLevel(1) }}
                                    className={`h-1.5 transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-primary-500' : 'w-4 bg-white-pure/20 hover:bg-white-pure/40'
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