"use client"

import { X } from 'lucide-react'
import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'

export interface ScrollItem {
    id: string
    title: string
    description: string
    image?: string
    percentage?: number
}

interface ScrollLabels {
    indexPrefix: string
    progressLabel: string
    statusComplete: string
}

interface ScrollSectionProps {
    id: string
    title: string
    subtitle: string
    items: ScrollItem[]
    labels: ScrollLabels
    variant?: 'parallax' | 'sticky' | 'reveal'
    ctaLabel?: string
    ctaPath?: string
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
    background?: React.ReactNode
}

const ExpandOverlay = ({
    title,
    subtitle,
    items,
    labels,
    ctaLabel,
    ctaPath,
    onClose,
}: {
    title: string
    subtitle: string
    items: ScrollItem[]
    labels: ScrollLabels
    ctaLabel?: string
    ctaPath?: string
    onClose: () => void
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        container: containerRef,
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const itemsWithImages = items.map((item, idx) => ({
        ...item,
        index: idx + 1,
        image: item.image || `https://picsum.photos/seed/${item.id}/800/1000`,
    }))

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-[200] bg-white-pure flex overflow-hidden"
        >
            <nav className="w-16 md:w-20 border-r-[4px] border-black-pure flex flex-col items-center py-8 bg-white-pure shrink-0">
                <button
                    onClick={onClose}
                    className="w-12 h-12 flex items-center justify-center bg-black-pure text-primary-500 hover:bg-primary-500 hover:text-black-pure transition-colors border-[4px] border-black-pure shadow-[4px_4px_0px_0px_#B39900] mb-auto"
                >
                    <X className="w-8 h-8" strokeWidth={4} />
                </button>
                <div className="rotate-180 [writing-mode:vertical-lr] flex items-center gap-6 mt-auto py-8 border-t-[4px] border-black-pure w-full">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-black-pure">
                        {title}
                    </span>
                    <span className="text-lg font-black italic text-primary-500">
                        {String(items.length).padStart(2, '0')}
                    </span>
                </div>
            </nav>

            <div className="flex-1 overflow-hidden relative flex flex-col bg-neutral-100">
                <div ref={containerRef} className="flex-1 overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-b-[4px] border-black-pure">
                        {itemsWithImages.map((item) => (
                            <div
                                key={item.id}
                                className="relative aspect-square border-r-[4px] border-b-[4px] border-black-pure bg-white-pure group overflow-hidden"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black-pure/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                    <div className="bg-white-pure border-[4px] border-black-pure p-4 shadow-[4px_4px_0px_0px_#00FF41] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-xs font-black uppercase tracking-widest text-primary-600 mb-2 block">
                                            {labels.indexPrefix} {String(item.index).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-sm md:text-lg font-black uppercase text-black-pure leading-none">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4 bg-black-pure text-white-pure w-10 h-10 flex items-center justify-center text-sm font-black border-[2px] border-white-pure">
                                    {String(item.index).padStart(2, '0')}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-12 md:p-24 flex flex-col items-center justify-center bg-white-pure text-center gap-8">
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-neutral-400">{labels.statusComplete}</span>
                        <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black-pure max-w-2xl leading-tight">
                            {subtitle}
                        </h4>
                        {ctaLabel && ctaPath && (
                            <div className="pt-4">
                                <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 z-10 hidden lg:block">
                    <div className="bg-white-pure border-[4px] border-black-pure p-6 shadow-[8px_8px_0px_0px_#000000] min-w-[200px]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">{labels.progressLabel}</span>
                            <span className="text-sm font-black italic">{String(Math.round(smoothProgress.get() * 100))}%</span>
                        </div>
                        <div className="w-full h-3 bg-neutral-200 border-[2px] border-black-pure overflow-hidden relative">
                            <motion.div style={{ scaleX: smoothProgress }} className="absolute inset-0 bg-primary-500 origin-left" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const ExpandSection: React.FC<ScrollSectionProps> = ({
    id,
    title,
    subtitle,
    items = [],
    labels,
    ctaLabel,
    ctaPath,
    footerVariant = 1,
    background,
}) => {
    const sectionRef = useRef<HTMLElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const isInView = useInView(sectionRef, { amount: 0.3 })

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const featuredImage = items[0]?.image || `https://picsum.photos/seed/${id}/800/1000`

    return (
        <section ref={sectionRef} id={id} className="relative w-full py-24 bg-white-pure border-t-[4px] border-black-pure overflow-hidden">
            {background}
            <DotGridBackground />

            <div className="container flex flex-col items-center justify-center relative z-10">
                <div
                    className="relative group cursor-none"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="relative w-[300px] h-[450px] md:w-[480px] md:h-[720px] border-[4px] border-black-pure shadow-[20px_20px_0px_0px_#B39900] overflow-hidden transition-all duration-500 group-hover:shadow-[24px_24px_0px_0px_#00FF41]">
                        <img
                            src={featuredImage}
                            alt={title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 border-[12px] border-transparent group-hover:border-white-pure/20 transition-all duration-700" />
                    </div>

                    <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 bg-white-pure border-[4px] border-black-pure p-4 md:p-8 shadow-[8px_8px_0px_0px_#000000] max-w-[200px] md:max-w-[320px]">
                        <h2 className="text-sm md:text-lg font-black uppercase tracking-tighter text-black-pure leading-tight">
                            {title}
                        </h2>
                        <div className="mt-4 h-1 w-12 bg-primary-500" />
                    </div>

                    {isInView && !isOpen && (
                        <motion.div
                            style={{ left: mousePos.x, top: mousePos.y }}
                            className="fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="bg-black-pure border-[2px] border-primary-500 px-6 py-3 shadow-[4px_4px_0px_0px_#00FF41]">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-white-pure whitespace-nowrap">
                                    EXPAND_VIEW
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <ExpandOverlay
                        title={title}
                        subtitle={subtitle}
                        items={items}
                        labels={labels}
                        ctaLabel={ctaLabel}
                        ctaPath={ctaPath}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div className="mt-24">
                <SectionFooter variant={footerVariant} />
            </div>
        </section>
    )
}

export default ExpandSection