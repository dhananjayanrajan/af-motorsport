"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Globe, MapPin, X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface LogoItem {
    id: string
    name: string
    logo: string
    description?: string
    website?: string
    location?: string
    category?: string
    slug?: string
}

interface LogoSectionProps {
    id: string
    title: string
    subtitle: string
    items: LogoItem[]
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
}

const LogoSection: React.FC<LogoSectionProps> = ({
    id,
    title,
    subtitle,
    items = [],
    headerVariant = 1,
    footerVariant = 1,
}) => {
    const [selectedItem, setSelectedItem] = useState<LogoItem | null>(null)

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
            dragFree: true,
            containScroll: 'trimSnaps'
        }
    )

    const openModal = useCallback((item: LogoItem) => {
        setSelectedItem(item)
        document.body.style.overflow = 'hidden'
    }, [])

    const closeModal = useCallback(() => {
        setSelectedItem(null)
        document.body.style.overflow = 'unset'
    }, [])

    return (
        <section id={id} className="w-full bg-white-pure py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto border-2 border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white-pure overflow-hidden">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    variant={headerVariant}
                    metadata={String(items.length).padStart(2, '0')}
                />

                <div className="relative w-full py-12 border-y-2 border-black-pure overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex touch-pan-y items-center">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => openModal(item)}
                                className="relative flex-[0_0_140px] sm:flex-[0_0_160px] md:flex-[0_0_180px] lg:flex-[0_0_200px] min-w-0 px-4 group"
                            >
                                <div className="relative w-full aspect-square flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-110">
                                    <img
                                        src={item.logo}
                                        alt={item.name}
                                        className="max-w-full max-h-full object-contain"
                                    />

                                    <div className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-6 h-6 border-2 border-black-pure flex items-center justify-center bg-primary-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <ArrowRight className="w-3 h-3 text-black-pure" />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <SectionFooter variant={footerVariant} />
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-[210] bg-white-pure border-2 border-black-pure shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 md:p-6 border-b-2 border-black-pure bg-black-pure shrink-0">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono font-black text-primary-500 uppercase tracking-widest">
                                    {selectedItem.category || 'PARTNER'}
                                </span>
                                <div className="w-px h-4 bg-white-pure/20" />
                                <span className="text-xs font-mono font-black text-white-pure/40 uppercase tracking-widest">
                                    {selectedItem.id}
                                </span>
                            </div>
                            <button
                                onClick={closeModal}
                                className="w-10 h-10 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-primary-500 hover:text-black-pure hover:border-primary-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                            <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white-pure">
                                <div className="relative w-full max-w-sm aspect-square">
                                    <img
                                        src={selectedItem.logo}
                                        alt={selectedItem.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center p-6 md:p-10 lg:p-14 border-t-2 lg:border-t-0 lg:border-l-2 border-black-pure overflow-y-auto">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-black-pure uppercase tracking-tighter leading-none">
                                            {selectedItem.name}
                                        </h3>
                                    </div>

                                    {selectedItem.description && (
                                        <p className="text-sm font-bold text-black-pure/60 uppercase leading-relaxed">
                                            {selectedItem.description}
                                        </p>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedItem.website && (
                                            <div className="flex items-center gap-3 p-4 border-2 border-black-pure bg-white-pure">
                                                <Globe className="w-5 h-5 text-black-pure shrink-0" />
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[10px] font-mono font-black text-black-pure/40 uppercase tracking-widest">Website</span>
                                                    <span className="text-sm font-black text-black-pure uppercase truncate">{selectedItem.website}</span>
                                                </div>
                                            </div>
                                        )}

                                        {selectedItem.location && (
                                            <div className="flex items-center gap-3 p-4 border-2 border-black-pure bg-white-pure">
                                                <MapPin className="w-5 h-5 text-black-pure shrink-0" />
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[10px] font-mono font-black text-black-pure/40 uppercase tracking-widest">Location</span>
                                                    <span className="text-sm font-black text-black-pure uppercase truncate">{selectedItem.location}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {selectedItem.slug && (
                                        <Link
                                            href={`/${selectedItem.slug}`}
                                            className="inline-flex items-center gap-4 bg-black-pure text-white-pure px-6 py-4 text-sm font-mono font-black uppercase tracking-widest border-2 border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all shadow-[6px_6px_0px_0px_var(--primary-500)] hover:shadow-none group/link"
                                        >
                                            <span>View Profile</span>
                                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default LogoSection