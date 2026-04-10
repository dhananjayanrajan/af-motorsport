'use client'

import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { Media, Slide } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Hash, Layers, Pause, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface HeroSlideshowProps {
    slides: Slide[]
}

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [direction, setDirection] = useState(0)

    const nextSlide = useCallback(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    const prevSlide = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }, [slides.length])

    useEffect(() => {
        if (!isAutoPlaying || !slides[currentIndex]?.details?.duration) return
        const interval = setInterval(nextSlide, (slides[currentIndex].details?.duration || 5) * 1000)
        return () => clearInterval(interval)
    }, [isAutoPlaying, nextSlide, currentIndex, slides])

    if (!slides || slides.length === 0) return null

    const currentSlide = slides[currentIndex]

    const getMediaUrl = (media: number | Media | undefined | null) => {
        if (typeof media === 'object' && media?.url) return media.url
        return ''
    }

    return (
        <section className="relative w-full h-[100dvh] flex flex-col bg-black overflow-hidden font-sans select-none">
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full relative"
                    >
                        <img
                            src={getMediaUrl(currentSlide.assets?.background)}
                            alt={currentSlide.name}
                            className="w-full h-full object-cover opacity-50 grayscale-[0.4] contrast-[1.1]"
                        />
                        {currentSlide.assets?.foreground && (
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <img
                                    src={getMediaUrl(currentSlide.assets.foreground)}
                                    className="max-w-[70%] max-h-[60%] object-contain"
                                />
                            </motion.div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-20 flex-1 grid grid-cols-1 md:grid-cols-12 gap-0">
                <div className="md:col-span-8 flex flex-col justify-end p-8 md:p-16 lg:p-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="max-w-3xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-[#00FF41] text-black text-[10px] font-black px-2 py-1 uppercase italic flex items-center gap-2">
                                    <Hash size={12} /> {currentSlide.basics?.identifiers?.code}
                                </div>
                                <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                                    {currentSlide.details?.type} / {currentSlide.details?.template}
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter mb-6 leading-[0.9]">
                                {currentSlide.name}
                            </h1>

                            <p className="text-zinc-400 text-xs md:text-sm font-bold uppercase leading-relaxed tracking-wider mb-10 max-w-xl italic border-l-2 border-[#00FF41] pl-6">
                                {currentSlide.basics?.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <ClippedButton
                                    variant="primary"
                                    size="md"
                                    label="INITIATE ACCESS"
                                    onClick={() => router.push('/championships')}
                                />
                                <div className="flex gap-2">
                                    {currentSlide.traits?.tags?.list?.map((tag, i) => (
                                        <div key={i} className="px-3 py-2 bg-zinc-900 border border-zinc-800 text-zinc-500 text-[9px] font-black uppercase tracking-widest italic hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all">
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="hidden md:flex md:col-span-4 border-l border-white/5 bg-black/10 backdrop-blur-sm flex-col p-12 justify-end">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-10"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#00FF41]">
                                    <Layers size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">CONTENT_FLOW</span>
                                </div>
                                <div className="max-h-32 overflow-y-auto pr-4 custom-scrollbar text-[10px] text-zinc-500 font-bold uppercase leading-relaxed italic">
                                    {JSON.stringify(currentSlide.basics?.story)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                <div>
                                    <span className="block text-[8px] text-zinc-600 font-black uppercase mb-1">ORIENTATION</span>
                                    <span className="text-white text-[10px] font-bold uppercase">{currentSlide.details?.orientation}</span>
                                </div>
                                <div>
                                    <span className="block text-[8px] text-zinc-600 font-black uppercase mb-1">CYCLE_TIME</span>
                                    <span className="text-white text-[10px] font-bold uppercase">{currentSlide.details?.duration}s</span>
                                </div>
                                <div>
                                    <span className="block text-[8px] text-zinc-600 font-black uppercase mb-1">TRANSITION</span>
                                    <span className="text-white text-[10px] font-bold uppercase">{currentSlide.details?.transition}</span>
                                </div>
                                <div>
                                    <span className="block text-[8px] text-zinc-600 font-black uppercase mb-1">ORDER_ID</span>
                                    <span className="text-[#00FF41] text-[10px] font-bold uppercase">0x{currentSlide.details?.order}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="relative z-30 w-full bg-white flex flex-col md:flex-row border-t-[10px] border-black h-20 md:h-28">
                <div className="flex-1 flex items-center px-6 md:px-12 gap-10 md:border-r border-zinc-200">
                    <div className="flex flex-col min-w-[80px]">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1 italic">POSITION</span>
                        <span className="text-3xl font-black italic text-black leading-none tracking-tighter">
                            {String(currentIndex + 1).padStart(2, '0')}
                            <span className="text-zinc-200 mx-1">/</span>
                            <span className="text-zinc-400 text-xl">{String(slides.length).padStart(2, '0')}</span>
                        </span>
                    </div>

                    <div className="flex gap-1.5 h-1.5 flex-1 items-center">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setIsAutoPlaying(false); setCurrentIndex(idx); }}
                                className={cn(
                                    'h-full transition-all duration-500 -skew-x-[25deg]',
                                    idx === currentIndex ? 'bg-black w-20 md:w-32' : 'bg-zinc-200 flex-1 hover:bg-zinc-400'
                                )}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex h-full">
                    <button
                        onClick={() => setIsAutoPlaying((prev) => !prev)}
                        className="w-20 md:w-24 flex items-center justify-center border-r border-zinc-200 hover:bg-zinc-50 transition-colors"
                    >
                        {isAutoPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
                    </button>

                    <button
                        onClick={() => { setIsAutoPlaying(false); prevSlide(); }}
                        className="w-20 md:w-24 flex items-center justify-center border-r border-zinc-200 hover:bg-black hover:text-[#00FF41] transition-all group"
                    >
                        <ChevronLeft size={28} strokeWidth={3} className="group-active:-translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => { setIsAutoPlaying(false); nextSlide(); }}
                        className="w-20 md:w-24 flex items-center justify-center border-r border-zinc-200 hover:bg-black hover:text-[#00FF41] transition-all group"
                    >
                        <ChevronRight size={28} strokeWidth={3} className="group-active:translate-x-1 transition-transform" />
                    </button>

                    <div className="w-24 md:w-36 bg-black flex flex-col items-center justify-center border-l-4 border-[#00FF41]">
                        <span className="text-zinc-500 text-[8px] font-black uppercase mb-1 italic tracking-widest">SEQ_ID</span>
                        <span className="text-[#00FF41] font-black italic text-4xl leading-none tracking-tighter">
                            {String(currentSlide.details?.order || currentIndex + 1).padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}