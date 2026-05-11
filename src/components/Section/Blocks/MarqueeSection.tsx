"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Globe, MapPin, X } from 'lucide-react'
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
    const velocityRef = useRef(0.8)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        const totalWidth = scrollContainer.scrollWidth / 3

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
    const displayCount = Math.min(items.length, 12)

    return (
        <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
            <SectionHeader
                title={title}
                subtitle={subtitle}
                variant={headerVariant}
                metadata={String(items.length).padStart(2, '0')}
            />

            <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10">
                <div className="border-2 border-black-pure bg-white-pure overflow-hidden">
                    <div
                        className="relative w-full py-10 xl:py-14 border-b-2 border-black-pure overflow-hidden cursor-crosshair"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div
                            ref={scrollRef}
                            className="flex will-change-transform"
                            style={{ width: 'fit-content' }}
                        >
                            {tripledItems.slice(0, displayCount * 3).map((item, idx) => (
                                <button
                                    key={`${item.id}-${idx}`}
                                    onClick={() => openModal(item)}
                                    className="relative flex-[0_0_150px] xl:flex-[0_0_220px] min-w-0 px-6 xl:px-10 group shrink-0"
                                >
                                    <div className="relative w-full aspect-[3/2] flex items-center justify-center p-4 transition-all duration-500 group-hover:scale-105">
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="size-8 border-2 border-black-pure flex items-center justify-center bg-primary-500">
                                                <ArrowRight className="size-4 text-black-pure stroke-[3px]" />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-white-pure z-10 [mask-image:linear-gradient(to_right,black,transparent)] pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-white-pure z-10 [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none" />
                    </div>

                    <SectionFooter variant={footerVariant} />
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                            animate={{ backgroundColor: "#000000" }}
                            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
                            className="absolute inset-0"
                            onClick={closeModal}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-white-pure border-2 border-black-pure flex flex-col overflow-hidden max-h-[90vh]"
                        >
                            <div className="flex items-center justify-between h-14 xl:h-16 px-6 border-b-2 border-black-pure bg-black-pure shrink-0">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs xl:text-sm font-mono font-black text-primary-500 uppercase tracking-widest">
                                        {selectedItem.category}
                                    </span>
                                    <div className="w-0.5 h-4 bg-white-pure" />
                                    <span className="text-xs xl:text-sm font-mono font-black text-white-pure uppercase tracking-widest">
                                        ID_{selectedItem.id}
                                    </span>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="size-10 border-2 border-white-pure flex items-center justify-center text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors"
                                >
                                    <X className="size-5 stroke-[3px]" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                                <div className="md:w-5/12 flex items-center justify-center p-8 xl:p-12 bg-white-pure border-b-2 md:border-b-0 md:border-r-2 border-black-pure">
                                    <div className="relative w-full max-w-[240px] aspect-square">
                                        <img
                                            src={selectedItem.logo}
                                            alt={selectedItem.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col p-8 xl:p-12 overflow-y-auto bg-white-pure">
                                    <div className="space-y-8">
                                        <h3 className="text-2xl xl:text-4xl font-black text-black-pure uppercase tracking-tighter leading-none">
                                            {selectedItem.name}
                                        </h3>

                                        {selectedItem.description && (
                                            <p className="text-sm xl:text-base font-bold text-black-pure leading-relaxed border-l-4 border-primary-500 pl-6 uppercase">
                                                {selectedItem.description}
                                            </p>
                                        )}

                                        <div className="grid grid-cols-1 gap-3">
                                            {selectedItem.website && (
                                                <div className="flex items-center gap-4 p-4 border-2 border-black-pure bg-white-pure">
                                                    <Globe className="size-5 text-black-pure shrink-0" />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-[10px] font-black text-black-pure uppercase tracking-widest">URL</span>
                                                        <span className="text-sm font-black text-black-pure truncate uppercase">{selectedItem.website}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedItem.location && (
                                                <div className="flex items-center gap-4 p-4 border-2 border-black-pure bg-white-pure">
                                                    <MapPin className="size-5 text-black-pure shrink-0" />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-[10px] font-black text-black-pure uppercase tracking-widest">REGION</span>
                                                        <span className="text-sm font-black text-black-pure truncate uppercase">{selectedItem.location}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {selectedItem.slug && (
                                            <Link
                                                href={`/${selectedItem.slug}`}
                                                className="h-14 inline-flex items-center justify-between bg-black-pure text-white-pure px-8 text-xs font-black uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors group/btn w-full"
                                            >
                                                <span>VIEW DETAILS</span>
                                                <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform stroke-[3px]" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default MarqueeSection