"use client"

import { ArrowRight, X } from 'lucide-react'
import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'motion/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionSidebar from '../Components/SectionSidebar'

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
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeItem, setActiveItem] = useState<ScrollItem | null>(null)
    const { scrollYProgress } = useScroll({
        container: containerRef,
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const displayItems = items.slice(0, 6)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[200] bg-white-pure flex flex-col lg:flex-row overflow-hidden"
        >
            <nav className="h-16 lg:h-full w-full lg:w-20 border-b-4 lg:border-b-0 lg:border-r-4 border-black-pure flex lg:flex-col items-center justify-between lg:py-8 bg-white-pure shrink-0 px-4 lg:px-0">
                <button
                    onClick={onClose}
                    className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-black-pure text-primary-500 hover:bg-primary-500 hover:text-black-pure transition-colors border-2 lg:border-4 border-black-pure"
                >
                    <X size={24} strokeWidth={3} />
                </button>
                <div className="lg:rotate-180 lg:[writing-mode:vertical-lr] flex items-center gap-4 lg:gap-6 lg:mt-auto lg:py-8 lg:border-t-4 lg:border-black-pure lg:w-full">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure">
                        {title}
                    </span>
                    <span className="text-lg font-black text-primary-500 font-mono">
                        {String(Math.min(items.length, 6)).padStart(2, '0')}
                    </span>
                </div>
            </nav>

            <div className="flex-1 overflow-hidden relative flex flex-col bg-white-pure">
                <div ref={containerRef} className="flex-1 overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-b-4 border-black-pure">
                        {displayItems.map((item, idx) => (
                            <div
                                key={item.id}
                                className="relative aspect-square border-r-4 border-b-4 border-black-pure bg-white-pure group overflow-hidden"
                            >
                                <img
                                    src={item.image || `https://picsum.photos/seed/${item.id}/800/1000`}
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setActiveItem(item)
                                            setSidebarOpen(true)
                                        }}
                                        className="bg-white-pure border-4 border-black-pure p-5 shadow-[8px_8px_0px_0px_#000000] text-left active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                                    >
                                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary-500 mb-2 block">
                                            {labels.indexPrefix} {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-xl font-black uppercase text-black-pure leading-none tracking-tighter">
                                            {item.title}
                                        </h3>
                                    </button>
                                </div>

                                <div className="absolute top-0 left-0 bg-black-pure text-primary-500 px-4 py-2 text-sm font-mono font-black border-b-4 border-r-4 border-black-pure group-hover:bg-primary-500 group-hover:text-black-pure transition-colors">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                            </div>
                        ))}
                        {items.length > 6 && (
                            <Link href={ctaPath || '#'} className="relative aspect-square border-r-4 border-b-4 border-black-pure bg-secondary-500 group overflow-hidden flex items-center justify-center cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <div className="size-20 border-4 border-black-pure bg-white-pure flex items-center justify-center mb-6 group-hover:rotate-90 transition-transform duration-700 shadow-[8px_8px_0px_0px_#000000]">
                                        <ArrowRight className="w-10 h-10 text-black-pure" strokeWidth={3} />
                                    </div>
                                    <span className="text-2xl font-black text-black-pure uppercase tracking-widest">Archive</span>
                                    <span className="text-[10px] font-mono font-black text-black-pure/60 block mt-2 uppercase tracking-[0.3em]">+{items.length - 6} Entries</span>
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className="p-12 md:p-32 flex flex-col items-center justify-center bg-white-pure text-center gap-10">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-primary-500">{labels.statusComplete}</span>
                        <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black-pure max-w-3xl leading-[0.9] italic">
                            {subtitle}
                        </h4>
                        {ctaLabel && ctaPath && (
                            <div className="pt-8">
                                <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
                    <div className="bg-white-pure border-4 border-black-pure p-8 shadow-[12px_12px_0px_0px_#000000] min-w-[280px]">
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure/40">{labels.progressLabel}</span>
                            <span className="text-lg font-mono font-black">{String(Math.round(smoothProgress.get() * 100))}%</span>
                        </div>
                        <div className="w-full h-3 border-2 border-black-pure bg-white-pure relative">
                            <motion.div style={{ scaleX: smoothProgress }} className="absolute inset-0 bg-primary-500 origin-left" />
                        </div>
                    </div>
                </div>
            </div>

            <SectionSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                title={activeItem?.title || ''}
                description={activeItem?.description || ''}
                imageUrl={activeItem?.image || ''}
                idCode={activeItem?.id || ''}
                stats={[
                    { label: 'Ref', val: activeItem?.id || '00', color: 'bg-primary-500' },
                    { label: 'Status', val: `${activeItem?.percentage || 0}%`, color: 'bg-black-pure' }
                ]}
                buttonLabel="Launch Profile"
                onAction={() => {
                    if (activeItem?.id) setSidebarOpen(false)
                }}
            />
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
        if (typeof window !== 'undefined') {
            document.body.style.overflow = isOpen ? 'hidden' : 'unset'
        }
        return () => {
            if (typeof window !== 'undefined') document.body.style.overflow = 'unset'
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
        <section ref={sectionRef} id={id} className="relative w-full py-24 lg:py-32 bg-white-pure border-t-2 border-black-pure overflow-hidden">
            {background}
            <DotGridBackground />

            <div className="container flex flex-col items-center justify-center relative z-10">
                <div
                    className="relative group cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="relative w-[300px] h-[450px] md:w-[500px] md:h-[750px] border-4 border-black-pure bg-black-pure transition-all duration-700 group-hover:shadow-[32px_32px_0px_0px_#FACC15] group-hover:-translate-x-2 group-hover:-translate-y-2">
                        <img
                            src={featuredImage}
                            alt={title}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-pure/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-700" />
                    </div>

                    <div className="absolute -bottom-10 -right-6 md:-bottom-16 md:-right-12 bg-white-pure border-4 border-black-pure p-6 md:p-10 max-w-[240px] md:max-w-[380px] shadow-[12px_12px_0px_0px_#000000]">
                        <span className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-widest block mb-4">Featured Unit</span>
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black-pure leading-[0.8] italic">
                            {title}
                        </h2>
                        <div className="mt-6 h-2 w-16 bg-black-pure group-hover:w-full transition-all duration-700" />
                    </div>

                    {isInView && !isOpen && (
                        <motion.div
                            style={{ left: mousePos.x, top: mousePos.y }}
                            className="fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
                        >
                            <div className="bg-black-pure border-2 border-primary-500 px-8 py-4 shadow-[4px_4px_0px_0px_#FACC15]">
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-white-pure whitespace-nowrap">
                                    Click to Expand
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

            <div className="mt-32">
                <SectionFooter variant={footerVariant} />
            </div>
        </section>
    )
}

export default ExpandSection