"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Globe, MapPin, X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface MarqueeItem {
    id: string
    name: string
    logo: string
    description?: string
    website?: string
    location?: string
    category?: string
    slug?: string
}

interface MarqueeSectionProps {
    id: string
    title: string
    subtitle: string
    items: MarqueeItem[]
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
}

const MarqueeSection: React.FC<MarqueeSectionProps> = ({
    id,
    title,
    subtitle,
    items = [],
    headerVariant = 1,
    footerVariant = 1,
}) => {
    const [selectedItem, setSelectedItem] = useState<MarqueeItem | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | null>(null)
    const positionRef = useRef(0)
    const velocityRef = useRef(0.6)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        const totalWidth = scrollContainer.scrollWidth / 2

        const animate = () => {
            if (!isPaused) {
                positionRef.current -= velocityRef.current
                if (Math.abs(positionRef.current) >= totalWidth) {
                    positionRef.current = 0
                }
                if (scrollContainer) {
                    scrollContainer.style.transform = `translateX(${positionRef.current}px)`
                }
            }
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isPaused])

    const openModal = useCallback((item: MarqueeItem) => {
        setSelectedItem(item)
        document.body.style.overflow = 'hidden'
    }, [])

    const closeModal = useCallback(() => {
        setSelectedItem(null)
        document.body.style.overflow = 'unset'
    }, [])

    const tripledItems = [...items, ...items, ...items]

    return (
        <section id={id} className="w-full bg-white-pure py-12 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white-pure overflow-hidden">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    variant={headerVariant}
                    metadata={String(items.length).padStart(2, '0')}
                />

                <div
                    className="relative w-full py-12 border-y-2 border-black-pure overflow-hidden cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        ref={scrollRef}
                        className="flex will-change-transform"
                        style={{ width: 'fit-content' }}
                    >
                        {tripledItems.map((item, idx) => (
                            <button
                                key={`${item.id}-${idx}`}
                                onClick={() => openModal(item)}
                                className="relative flex-[0_0_140px] xs:flex-[0_0_150px] sm:flex-[0_0_160px] md:flex-[0_0_180px] lg:flex-[0_0_200px] min-w-0 px-6 group shrink-0"
                            >
                                <div className="relative w-full aspect-[3/2] flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-110">
                                    <img
                                        src={item.logo}
                                        alt={item.name}
                                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute bottom-0 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        <div className="w-6 h-6 border-2 border-black-pure flex items-center justify-center bg-primary-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <ArrowRight className="w-3 h-3 text-black-pure" />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white-pure to-transparent pointer-events-none z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-white-pure pointer-events-none z-10" />
                </div>

                <SectionFooter variant={footerVariant} />
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black-pure/40 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-white-pure border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden max-h-[90vh]"
                        >
                            <div className="flex items-center justify-between p-4 border-b-2 border-black-pure bg-black-pure shrink-0">
                                <div className="flex items-center gap-3 min-w-0">
                                    {selectedItem.category && (
                                        <span className="text-xs font-mono font-black text-primary-500 uppercase tracking-widest truncate">
                                            {selectedItem.category}
                                        </span>
                                    )}
                                    <div className="w-px h-4 bg-white-pure/20 shrink-0" />
                                    <span className="text-xs font-mono font-black text-white-pure/40 uppercase tracking-widest truncate">
                                        {selectedItem.id}
                                    </span>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-10 h-10 border border-white-pure/20 flex items-center justify-center text-white-pure hover:bg-primary-500 hover:text-black-pure hover:border-primary-500 transition-colors shrink-0 ml-4"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                                <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-12 bg-white-pure min-h-[200px]">
                                    <div className="relative w-full max-w-[200px] aspect-square">
                                        <img
                                            src={selectedItem.logo}
                                            alt={selectedItem.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-center p-6 md:p-8 lg:p-10 border-t-2 lg:border-t-0 lg:border-l-2 border-black-pure overflow-y-auto">
                                    <div className="space-y-5">
                                        <h3 className="text-xl md:text-2xl font-black text-black-pure uppercase tracking-tighter leading-tight break-words">
                                            {selectedItem.name}
                                        </h3>

                                        {selectedItem.description && (
                                            <p className="text-sm font-medium text-black-pure/70 leading-relaxed break-words">
                                                {selectedItem.description}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-1 gap-3">
                                            {selectedItem.website && (
                                                <div className="flex items-center gap-3 p-3 border-2 border-black-pure bg-neutral-50 min-w-0">
                                                    <Globe className="w-4 h-4 text-black-pure shrink-0" />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-xs font-mono font-black text-black-pure/30 uppercase tracking-widest">
                                                            Website
                                                        </span>
                                                        <span className="text-sm font-bold text-black-pure truncate">
                                                            {selectedItem.website}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedItem.location && (
                                                <div className="flex items-center gap-3 p-3 border-2 border-black-pure bg-neutral-50 min-w-0">
                                                    <MapPin className="w-4 h-4 text-black-pure shrink-0" />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-xs font-mono font-black text-black-pure/30 uppercase tracking-widest">
                                                            Location
                                                        </span>
                                                        <span className="text-sm font-bold text-black-pure truncate">
                                                            {selectedItem.location}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {selectedItem.slug && (
                                            <Link
                                                href={`/${selectedItem.slug}`}
                                                className="inline-flex items-center gap-3 bg-black-pure text-white-pure px-6 py-3 text-xs font-mono font-black uppercase tracking-widest border-2 border-black-pure hover:bg-primary-500 hover:text-black-pure transition-all shadow-[4px_4px_0px_0px_var(--primary-500)] hover:shadow-none group/link w-fit"
                                            >
                                                <span>View Profile</span>
                                                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default MarqueeSection