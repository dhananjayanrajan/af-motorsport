'use client';

import { ClippedButton } from '@/components/Custom/ui/ClippedButton';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Slide } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import dummyData from '../dummy.json';

interface HeroSlideshowProps {
    slides: Slide[];
}

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
    const displaySlides = slides && slides.length > 0 ? slides : (dummyData.slides as unknown as Slide[]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const [keyPressed, setKeyPressed] = useState<string | null>(null);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        setKeyPressed(e.key);
        if (e.key === 'ArrowLeft') {
            setDirection(-1);
            setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 8000);
        } else if (e.key === 'ArrowRight') {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 8000);
        } else if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            setIsAutoPlaying(prev => !prev);
        }
        setTimeout(() => setKeyPressed(null), 200);
    }, [displaySlides.length]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, displaySlides.length]);

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const currentSlide = displaySlides[currentIndex];
    const backgroundId = typeof currentSlide.assets?.background === 'number'
        ? currentSlide.assets.background
        : (currentIndex + 10);

    return (
        <section
            className="relative w-full h-screen overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
        >
            {/* Background Image with Smooth Transition */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                        enter: (direction: number) => ({
                            x: direction > 0 ? '100%' : '-100%',
                            opacity: 0
                        }),
                        center: {
                            x: 0,
                            opacity: 1
                        },
                        exit: (direction: number) => ({
                            x: direction < 0 ? '100%' : '-100%',
                            opacity: 0
                        })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={`https://picsum.photos/id/${backgroundId}/1920/1080`}
                        alt={currentSlide.name || 'Background'}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(135deg, ${DESIGN_SYSTEM.COLORS.BLACK} 0%, ${DESIGN_SYSTEM.COLORS.BLACK}40 30%, transparent 60%, ${DESIGN_SYSTEM.COLORS.BLACK} 100%)`,
                            opacity: 0.7
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Primary Color Accent Lines */}
            <div className="absolute top-0 left-0 w-full h-0.5 z-30" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />

            {/* Content at Bottom Center with Dark Background Panel */}
            <div className="absolute bottom-24 left-0 right-0 z-10">
                <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full"
                        >
                            <motion.h1
                                className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter"
                                style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {currentSlide.name}
                            </motion.h1>

                            {currentSlide.basics?.description && (
                                <motion.p
                                    className="mt-3 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed"
                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    {currentSlide.basics.description}
                                </motion.p>
                            )}

                            <motion.div
                                className="mt-6 flex flex-wrap justify-center gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <ClippedButton
                                    variant="primary"
                                    size="md"
                                    label="EXPLORE SERIES"
                                    onClick={() => console.log('Explore Series')}
                                />
                                <ClippedButton
                                    variant="outline"
                                    size="md"
                                    label="LATEST RESULTS"
                                    onClick={() => console.log('Latest Results')}
                                />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows with Dark Background */}
            <button
                onClick={prevSlide}
                className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-70 group bg-black/30 backdrop-blur-sm rounded-full"
                style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                aria-label="Previous slide"
            >
                <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-70 group bg-black/30 backdrop-blur-sm rounded-full"
                style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                aria-label="Next slide"
            >
                <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                {displaySlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            backgroundColor: idx === currentIndex ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_400,
                            width: idx === currentIndex ? 32 : 6,
                            height: 2,
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-6 left-6 md:left-10 z-20">
                <span className="text-xs font-mono tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                    {String(currentIndex + 1).padStart(2, '0')} / {String(displaySlides.length).padStart(2, '0')}
                </span>
            </div>

            {/* Auto-Play Toggle */}
            <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute bottom-6 right-6 md:right-10 z-20 w-8 h-8 flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-70 bg-black/30 backdrop-blur-sm rounded-full"
                style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                aria-label={isAutoPlaying ? 'Pause' : 'Play'}
            >
                {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            {/* Keyboard Key Press Indicator */}
            <AnimatePresence>
                {keyPressed && (
                    <motion.div
                        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                    >
                        <div className="px-3 py-1.5 text-xs font-mono font-bold bg-black/80 backdrop-blur-sm" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY, border: `1px solid ${DESIGN_SYSTEM.COLORS.PRIMARY}` }}>
                            {keyPressed === ' ' ? 'SPACE' : keyPressed.toUpperCase()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}