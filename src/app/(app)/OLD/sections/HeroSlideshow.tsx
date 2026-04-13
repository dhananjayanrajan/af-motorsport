'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { cn } from '@/utilities/cn';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface SlideMedia {
    url?: string | null;
    alt?: string | null;
}

interface SlideCTA {
    label?: string | null;
    link?: string | null;
    type?: 'reference' | 'custom' | null;
    reference?: {
        relationTo?: string;
        value?: number | string;
    } | null;
    url?: string | null;
}

interface Slide {
    id: string;
    name?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    tagline?: string | null;
    description?: string | null;
    media?: SlideMedia | null;
    cta?: SlideCTA | null;
    order?: number | null;
}

interface HeroSlideshowProps {
    slides: Slide[];
}

const getPlaceholderImage = (seed: string) => {
    return `https://picsum.photos/seed/${seed}/1920/1080`;
};

const extractLink = (cta: SlideCTA | null | undefined): string | null => {
    if (!cta) return null;
    if (cta.type === 'reference' && cta.reference?.value) {
        const relationTo = cta.reference.relationTo || 'pages';
        return `/${relationTo}/${cta.reference.value}`;
    }
    if (cta.type === 'custom' && cta.url) return cta.url;
    if (cta.link) return cta.link;
    return null;
};

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [matrixLines] = useState(() => {
        return [...Array(12)].map(() =>
            Array(50).fill(0).map(() => Math.round(Math.random())).join('')
        );
    });

    const processedSlides = useMemo(() => {
        if (!slides || slides.length === 0) {
            return [{
                id: 'default',
                headline: 'AF MOTORSPORT',
                subheadline: 'PERFORMANCE WITHOUT COMPROMISE',
                description: 'Elite engineering. Precision execution. Victory is the only metric.',
                media: { url: getPlaceholderImage('default'), alt: 'Default' },
                cta: { label: 'ENTER THE GRID', link: '/championships' },
                order: 0
            }];
        }
        return [...slides].sort((a, b) => (a.order || 0) - (b.order || 0));
    }, [slides]);

    const currentSlide = processedSlides[currentIndex];
    const nextSlide = processedSlides[(currentIndex + 1) % processedSlides.length];

    useEffect(() => {
        if (!isPlaying || processedSlides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % processedSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isPlaying, processedSlides.length]);

    const headline = currentSlide.headline || currentSlide.name || 'AF MOTORSPORT';
    const subheadline = currentSlide.subheadline || currentSlide.tagline || '';
    const description = currentSlide.description || '';
    const imageUrl = currentSlide.media?.url || getPlaceholderImage(currentSlide.id);
    const imageAlt = currentSlide.media?.alt || headline;
    const ctaLabel = currentSlide.cta?.label;
    const ctaLink = extractLink(currentSlide.cta);

    const headlineParts = headline.split(' ');
    const firstPart = headlineParts[0] || '';
    const restPart = headlineParts.slice(1).join(' ') || '';

    return (
        <section className="relative w-full h-screen overflow-hidden bg-BLACK">

            {/* Matrix Rain Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                {matrixLines.map((line, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute text-[10px] font-mono text-PRIMARY whitespace-nowrap"
                        style={{
                            left: `${(i * 7) % 100}%`,
                            writingMode: 'vertical-rl',
                            textOrientation: 'upright'
                        }}
                    >
                        {line}
                    </motion.div>
                ))}
            </div>

            {/* Main Image */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        priority
                        className="object-cover grayscale contrast-125 brightness-50"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-BLACK via-BLACK/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-BLACK via-transparent to-BLACK/30" />
                </motion.div>
            </AnimatePresence>

            {/* Giant Background Number - creates depth like Legend section */}
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none z-0">
                <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.08, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[40vw] font-black italic text-WHITE leading-none tracking-tighter mr-[-5%]"
                    style={{
                        WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                        color: 'transparent'
                    }}
                >
                    {(currentIndex + 1).toString().padStart(2, '0')}
                </motion.div>
            </div>

            {/* Top Bar - Industrial Status */}
            <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex items-center justify-between border-b border-ZINC-900">
                <div className="flex items-center gap-3">
                    <div
                        className="w-2 h-2 animate-pulse"
                        style={{
                            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                            boxShadow: `0 0 15px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}`
                        }}
                    />
                    <span className="text-[9px] font-black text-ZINC-500 uppercase tracking-[0.4em]">
                        SYSTEM ONLINE
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-[9px] font-mono text-ZINC-700 uppercase">
                        SLIDE {(currentIndex + 1).toString().padStart(2, '0')}/{processedSlides.length.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Subheadline with aggressive styling */}
                            {subheadline && (
                                <div className="mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-8 bg-PRIMARY" />
                                        <span className="text-[10px] font-black text-PRIMARY uppercase tracking-[0.5em]">
                                            {subheadline}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Massive Split Headline */}
                            <h1 className="text-7xl md:text-8xl lg:text-[12rem] xl:text-[14rem] font-black italic uppercase leading-[0.8] tracking-tighter max-w-6xl">
                                <span className="text-WHITE block">{firstPart}</span>
                                {restPart && (
                                    <span
                                        className="block relative"
                                        style={{
                                            color: DESIGN_SYSTEM.COLORS.PRIMARY,
                                            textShadow: `0 0 40px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}`
                                        }}
                                    >
                                        {restPart}
                                    </span>
                                )}
                            </h1>

                            {/* Description */}
                            {description && (
                                <p className="mt-8 text-sm md:text-base font-bold text-ZINC-400 uppercase tracking-wider leading-relaxed max-w-xl border-l-2 border-PRIMARY pl-6">
                                    {description}
                                </p>
                            )}

                            {/* CTA Button - Aggressive Clip Path */}
                            {ctaLabel && ctaLink && (
                                <Link href={ctaLink} className="inline-block mt-10 group">
                                    <div
                                        className="relative px-12 py-5 bg-PRIMARY text-BLACK font-black uppercase tracking-[0.3em] text-sm transition-all duration-300 hover:scale-105 overflow-hidden"
                                        style={{
                                            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)',
                                            boxShadow: `0 0 40px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}`
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {ctaLabel}
                                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-WHITE translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </div>
                                </Link>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Next Slide Preview Card - Overlapping element like in Battles section */}
            {processedSlides.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-32 right-12 z-20 hidden lg:block"
                >
                    <div
                        className="w-64 bg-ZINC-950/90 backdrop-blur-xl border border-ZINC-800 p-4 cursor-pointer group"
                        style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % processedSlides.length)}
                    >
                        <div className="relative h-32 mb-3 overflow-hidden">
                            <Image
                                src={nextSlide.media?.url || getPlaceholderImage(nextSlide.id)}
                                alt=""
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute top-0 left-0 w-1 h-8 bg-PRIMARY" />
                        </div>
                        <span className="text-[8px] font-black text-ZINC-500 uppercase tracking-[0.3em] block mb-1">
                            UP NEXT
                        </span>
                        <h4 className="text-sm font-black italic text-WHITE uppercase tracking-tight group-hover:text-PRIMARY transition-colors">
                            {nextSlide.headline || nextSlide.name}
                        </h4>
                    </div>
                </motion.div>
            )}

            {/* Bottom Controls - Clean industrial */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pb-8">
                    <div className="flex items-center justify-between">

                        {/* Navigation */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentIndex((prev) => (prev - 1 + processedSlides.length) % processedSlides.length)}
                                className="p-3 border border-ZINC-800 hover:border-ZINC-600 transition-colors"
                                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
                            >
                                <ChevronLeft size={18} className="text-ZINC-400 hover:text-WHITE" />
                            </button>
                            <button
                                onClick={() => setCurrentIndex((prev) => (prev + 1) % processedSlides.length)}
                                className="p-3 border border-ZINC-800 hover:border-ZINC-600 transition-colors"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
                            >
                                <ChevronRight size={18} className="text-ZINC-400 hover:text-WHITE" />
                            </button>
                        </div>

                        {/* Progress Dots */}
                        <div className="flex gap-4">
                            {processedSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className="group relative w-12 h-12 flex items-center justify-center"
                                >
                                    <span
                                        className={cn(
                                            'block h-0.5 transition-all duration-300',
                                            index === currentIndex
                                                ? 'w-12 bg-PRIMARY'
                                                : 'w-6 bg-ZINC-800 group-hover:w-8 group-hover:bg-ZINC-600'
                                        )}
                                        style={{
                                            boxShadow: index === currentIndex ? `0 0 8px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` : 'none'
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Play/Pause */}
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-[10px] font-black text-ZINC-600 hover:text-WHITE uppercase tracking-[0.4em] transition-colors"
                        >
                            {isPlaying ? 'PAUSE' : 'PLAY'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Diagonal Accent Lines */}
            <div className="absolute top-20 right-0 w-px h-40 bg-gradient-to-b from-PRIMARY/50 to-transparent rotate-12 z-30 pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-px h-40 bg-gradient-to-t from-PRIMARY/50 to-transparent -rotate-12 z-30 pointer-events-none" />
        </section>
    );
}