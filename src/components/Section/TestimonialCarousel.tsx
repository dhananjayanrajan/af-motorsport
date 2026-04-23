"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Quote } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

export interface TestimonialSlide {
    id: string
    quote: string
    author: string
    role: string
    organization: string
    tags?: string[]
}

interface TestimonialCarouselProps {
    slides: TestimonialSlide[]
    sectionTitle: string
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ slides, sectionTitle }) => {
    const [progress, setProgress] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const autoplay = Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
    })

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [autoplay]
    )

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            const progressValue = ((emblaApi.selectedScrollSnap() + 1) / emblaApi.scrollSnapList().length) * 100
            setProgress(progressValue)
        }

        emblaApi.on('select', onSelect)
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi])

    if (!slides || slides.length === 0) return null

    return (
        <section
            className="relative w-full bg-background flex flex-col overflow-hidden py-16 md:py-24 border-b border-border"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4">
                <SectionHeader title={sectionTitle} subtitle="Community Feedback" variant={2} />

                <div className="mt-8 mb-12 flex bg-foreground border-b border-border divide-x divide-white/20 rounded-t-lg">
                    <div className="w-12 md:w-16 flex items-center justify-center bg-primary">
                        <Quote className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1" />
                    <button
                        onClick={scrollPrev}
                        className="w-16 md:w-24 text-background font-mono text-sm font-semibold hover:bg-background hover:text-foreground transition-colors"
                    >
                        Prev
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-16 md:w-24 text-background font-mono text-sm font-semibold hover:bg-background hover:text-foreground transition-colors"
                    >
                        Next
                    </button>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className="flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_33.33%] min-w-0 relative border-r border-border last:border-r-0 bg-card group px-2"
                            >
                                <div className="flex flex-col h-full min-h-[400px] border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="p-8 md:p-10 flex-1 flex flex-col">
                                        <div className="flex gap-1 mb-8">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-2 h-2 bg-foreground rounded-sm" />
                                            ))}
                                        </div>

                                        <p className="font-mono text-lg md:text-xl font-semibold uppercase leading-tight text-foreground italic mb-8">
                                            "{slide.quote}"
                                        </p>

                                        <div className="mt-auto flex flex-wrap gap-2">
                                            {slide.tags?.map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-3 py-1 bg-muted font-mono text-sm text-foreground font-semibold uppercase border border-border rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 bg-foreground group-hover:bg-primary transition-colors duration-300">
                                        <h4 className="font-bold text-xl md:text-2xl text-background group-hover:text-primary-foreground uppercase leading-none mb-2">
                                            {slide.author}
                                        </h4>
                                        <p className="font-mono text-sm font-semibold text-primary group-hover:text-primary-foreground uppercase tracking-tighter">
                                            {slide.role} // {slide.organization}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.abs(progress - ((index + 1) / slides.length) * 100) < 5
                                    ? 'bg-primary w-8'
                                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="mt-16">
                    <SectionFooter variant={1} />
                </div>
            </div>
        </section>
    )
}

export default TestimonialCarousel