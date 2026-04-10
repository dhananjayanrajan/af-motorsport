'use client';

import { ClippedButton } from '@/components/Custom/ui/ClippedButton';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Slide } from '@/payload-types';
import { AnimatePresence, motion, Variants } from 'framer-motion';
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

    const slideVariants: Variants = {
        enter: (direction: number) => ({
            clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
            filter: 'brightness(1.5)',
            scale: 1.1
        }),
        center: {
            clipPath: 'inset(0 0 0 0%)',
            filter: 'brightness(1)',
            scale: 1,
            transition: {
                clipPath: { duration: 0.8, ease: [0.87, 0, 0.13, 1] },
                filter: { duration: 1 },
                scale: { duration: 1.2 }
            }
        },
        exit: (direction: number) => ({
            clipPath: direction < 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
            filter: 'brightness(0.5)',
            scale: 0.95,
            transition: {
                clipPath: { duration: 0.8, ease: [0.87, 0, 0.13, 1] }
            }
        })
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            setDirection(-1);
            setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
            setIsAutoPlaying(false);
        } else if (e.key === 'ArrowRight') {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
            setIsAutoPlaying(false);
        } else if (e.key === ' ') {
            e.preventDefault();
            setIsAutoPlaying(prev => !prev);
        }
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
        }, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, displaySlides.length]);

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
        setIsAutoPlaying(false);
    };

    const currentSlide = displaySlides[currentIndex];
    const backgroundId = typeof currentSlide.assets?.background === 'number'
        ? currentSlide.assets.background
        : (currentIndex + 15);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={`https://picsum.photos/id/${backgroundId}/1920/1080`}
                        alt={currentSlide.name || 'AF Motorsport'}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: DESIGN_SYSTEM.EFFECTS.MEDIA_OVERLAY }}
                    />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full w-full flex flex-col justify-center px-8 md:px-24">
                <div className="max-w-[1440px] w-full mx-auto">
                    <motion.div
                        key={`content-${currentIndex}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span
                                className={`text-sm font-bold ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL} uppercase`}
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                            >
                                AF MOTORSPORT SERIES
                            </span>
                        </div>

                        <h1
                            className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] max-w-5xl ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT}`}
                            style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                        >
                            {currentSlide.name}
                        </h1>

                        <p
                            className="text-lg md:text-xl max-w-xl font-medium leading-relaxed"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}
                        >
                            {currentSlide.basics?.description}
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <ClippedButton
                                variant="primary"
                                size="lg"
                                label="EXPLORE DATA"
                                onClick={() => { }}
                            />
                            <ClippedButton
                                variant="outline"
                                size="lg"
                                label="VIEW SCHEDULE"
                                onClick={() => { }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute top-0 right-0 bottom-0 w-32 hidden lg:flex flex-col items-center justify-center gap-8 z-20 border-l border-white/10 backdrop-blur-md bg-white/5">
                <button
                    onClick={prevSlide}
                    className="p-4 transition-colors hover:scale-110 active:scale-95"
                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                >
                    <ChevronLeft size={32} strokeWidth={1.5} />
                </button>

                <div className="flex flex-col gap-4">
                    {displaySlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className="group relative flex items-center justify-center p-2"
                        >
                            <div
                                className="transition-all duration-300"
                                style={{
                                    height: idx === currentIndex ? '24px' : '8px',
                                    width: '2px',
                                    backgroundColor: idx === currentIndex ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_500
                                }}
                            />
                        </button>
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="p-4 transition-colors hover:scale-110 active:scale-95"
                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                >
                    <ChevronRight size={32} strokeWidth={1.5} />
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 px-8 md:px-24 flex items-center justify-between z-20 border-t border-white/10 backdrop-blur-xl bg-black/20">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                        {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold opacity-40" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
                        / {String(displaySlides.length).padStart(2, '0')}
                    </span>
                </div>

                <div className="flex items-center gap-12">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="flex items-center gap-3 group"
                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 group-hover:border-primary transition-colors">
                            {isAutoPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        </div>
                        <span className={`text-xs font-bold ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}>
                            {isAutoPlaying ? 'PAUSE ENGINE' : 'START AUTO'}
                        </span>
                    </button>
                </div>

                <div className="hidden md:block">
                    <div
                        className="h-1 bg-white/10 overflow-hidden"
                        style={{ width: '200px' }}
                    >
                        <motion.div
                            key={`progress-${currentIndex}-${isAutoPlaying}`}
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            transition={{
                                duration: isAutoPlaying ? 6 : 0,
                                ease: 'linear'
                            }}
                            className="h-full w-full"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                    </div>
                </div>
            </div>

            <div
                className="absolute top-0 left-0 h-full w-1 z-30"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
            />
        </section>
    );
}