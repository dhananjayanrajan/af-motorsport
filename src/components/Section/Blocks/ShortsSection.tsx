"use client"

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface ShortItem {
    id: string
    title: string
    videoUrl: string
    poster?: string
    category?: string
}

interface ShortsSectionProps {
    id: string
    title: string
    subtitle: string
    items: ShortItem[]
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
}

const ShortsSection: React.FC<ShortsSectionProps> = ({
    id,
    title,
    subtitle,
    items = [],
    headerVariant = 1,
    footerVariant = 1,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const modalVideoRef = useRef<HTMLVideoElement>(null)
    const autoplayRef = useRef<ReturnType<typeof Autoplay> | null>(null)

    const displayItems = items.slice(0, 8)

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            align: 'start',
            skipSnaps: false,
            dragFree: true,
            duration: 40000,
        }
    )

    useEffect(() => {
        if (!emblaApi) return
        const autoplay = Autoplay({ delay: 0, stopOnInteraction: false, stopOnMouseEnter: false })
        autoplayRef.current = autoplay
        emblaApi.plugins().autoplay = autoplay
            ; (autoplay.init as any)(emblaApi)
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onPointerDown = () => {
            setIsDragging(true)
            autoplayRef.current?.stop()
        }

        const onPointerUp = () => {
            setIsDragging(false)
            if (!isHovered) {
                autoplayRef.current?.play()
            }
        }

        emblaApi.on('pointerDown', onPointerDown)
        emblaApi.on('pointerUp', onPointerUp)

        return () => {
            emblaApi.off('pointerDown', onPointerDown)
            emblaApi.off('pointerUp', onPointerUp)
        }
    }, [emblaApi, isHovered])

    useEffect(() => {
        if (isHovered || isDragging) {
            autoplayRef.current?.stop()
        } else {
            autoplayRef.current?.play()
        }
    }, [isHovered, isDragging])

    const openModal = useCallback((index: number) => {
        setSelectedIndex(index)
        setModalOpen(true)
        setIsPlaying(true)
        setIsMuted(false)
        document.body.style.overflow = 'hidden'
        autoplayRef.current?.stop()
    }, [])

    const closeModal = useCallback(() => {
        setModalOpen(false)
        setIsPlaying(false)
        document.body.style.overflow = 'unset'
        modalVideoRef.current?.pause()
        if (!isHovered) {
            autoplayRef.current?.play()
        }
    }, [isHovered])

    const togglePlay = useCallback(() => {
        if (!modalVideoRef.current) return
        if (isPlaying) {
            modalVideoRef.current.pause()
        } else {
            modalVideoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }, [isPlaying])

    const toggleMute = useCallback(() => {
        if (!modalVideoRef.current) return
        modalVideoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
    }, [isMuted])

    const activeItem = displayItems[selectedIndex]

    return (
        <section
            id={id}
            className="relative w-full bg-black-pure border-t-2 border-black-pure overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative z-10">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    variant={headerVariant}
                    metadata={String(items.length).padStart(2, '0')}
                />
            </div>

            <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing border-b-2 border-black-pure" ref={emblaRef}>
                <div className="flex touch-pan-y" style={{ marginLeft: '-1px' }}>
                    {displayItems.map((item, idx) => (
                        <div
                            key={item.id}
                            className="relative flex-[0_0_85vw] sm:flex-[0_0_55vw] md:flex-[0_0_40vw] lg:flex-[0_0_30vw] xl:flex-[0_0_24vw] min-w-0 border-r-2 border-black-pure"
                        >
                            <button
                                onClick={() => openModal(idx)}
                                className="relative w-full aspect-[9/16] group"
                            >
                                <video
                                    src={item.videoUrl}
                                    poster={item.poster}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    autoPlay
                                />
                                <div className="absolute inset-0 bg-black-pure/40 group-hover:bg-black-pure/10 transition-colors duration-300" />
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="text-xs font-mono font-black bg-black-pure text-white-pure px-2 py-1 uppercase tracking-widest border-2 border-black-pure">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                {item.category && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="text-xs font-mono font-black bg-primary-500 text-black-pure px-2 py-1 uppercase tracking-widest border-2 border-black-pure">
                                            {item.category}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black-pure to-transparent">
                                    <h3 className="text-sm font-black text-white-pure uppercase tracking-tighter line-clamp-1">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 border-2 border-black-pure bg-white-pure flex items-center justify-center">
                                        <Play className="w-8 h-8 text-black-pure fill-current" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                    {items.length > 8 && (
                        <div className="relative flex-[0_0_85vw] sm:flex-[0_0_55vw] md:flex-[0_0_40vw] lg:flex-[0_0_30vw] xl:flex-[0_0_24vw] min-w-0 border-r-2 border-black-pure bg-primary-500 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-black-pure bg-white-pure mx-auto mb-4 flex items-center justify-center">
                                    <Play className="w-8 h-8 text-black-pure" />
                                </div>
                                <span className="text-lg font-black text-black-pure uppercase">View All</span>
                                <span className="text-sm font-mono font-black text-black-pure block mt-2">{items.length - 8} more</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <SectionFooter variant={footerVariant} />

            <AnimatePresence>
                {modalOpen && activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[200] bg-black-pure flex items-center justify-center"
                    >
                        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                            <button onClick={toggleMute} className="w-12 h-12 border-2 border-black-pure bg-white-pure flex items-center justify-center text-black-pure hover:bg-primary-500 transition-colors">
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                            <button onClick={closeModal} className="w-12 h-12 border-2 border-black-pure bg-white-pure flex items-center justify-center text-black-pure hover:bg-primary-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="absolute top-4 left-4 z-50 flex items-center gap-4">
                            <span className="text-xs font-mono font-black text-primary-500 uppercase tracking-widest bg-black-pure px-2 py-1 border-2 border-primary-500">
                                {String(selectedIndex + 1).padStart(2, '0')} / {String(displayItems.length).padStart(2, '0')}
                            </span>
                            <h3 className="text-sm font-black text-white-pure uppercase tracking-tighter">
                                {activeItem.title}
                            </h3>
                        </div>
                        <div className="relative w-full h-full flex items-center justify-center">
                            <video
                                ref={modalVideoRef}
                                src={activeItem.videoUrl}
                                poster={activeItem.poster}
                                className="max-w-full max-h-full object-contain border-2 border-black-pure"
                                autoPlay
                                playsInline
                                muted={isMuted}
                                loop
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                            {!isPlaying && (
                                <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center z-30 bg-black-pure/40 group">
                                    <div className="w-24 h-24 border-2 border-black-pure bg-primary-500 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                                        <Play className="w-10 h-10 text-black-pure fill-current" />
                                    </div>
                                </button>
                            )}
                            {isPlaying && (
                                <button onClick={togglePlay} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-16 h-16 border-2 border-black-pure bg-white-pure flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <Pause className="w-8 h-8 text-black-pure" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default ShortsSection