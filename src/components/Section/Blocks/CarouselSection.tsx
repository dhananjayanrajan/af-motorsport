"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import RacingLinesBackground from '../Backgrounds/RacingLinesBackground'

export interface CarouselSlide {
  id: string
  title: string
  description?: string
  image?: string
  ctaLabel?: string
  ctaHref?: string
  meta?: string
  tags?: string[]
}

interface CarouselSectionProps {
  id: string
  title: string
  subtitle: string
  slides: CarouselSlide[]
  variant?: 'full' | 'card' | 'minimal'
  autoplayDelay?: number
  showArrows?: boolean
  showDots?: boolean
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
  ctaLabel?: string
  ctaPath?: string
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  id,
  title,
  subtitle,
  slides,
  variant = 'full',
  autoplayDelay = 5000,
  showArrows = true,
  showDots = true,
  headerVariant = 1,
  footerVariant = 1,
  background = <RacingLinesBackground opacity={0.3} />,
  ctaLabel,
  ctaPath
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const renderSlide = (slide: CarouselSlide, idx: number) => {
    if (variant === 'card') {
      return (
        <div className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-2 group">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            {slide.image && (
              <div className="relative h-64 overflow-hidden">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            )}
            <div className="p-6">
              {slide.meta && <p className="text-xs font-mono font-semibold text-primary uppercase mb-2">{slide.meta}</p>}
              <h3 className="text-xl font-bold uppercase tracking-tight text-foreground mb-2">{slide.title}</h3>
              {slide.description && <p className="text-sm text-muted-foreground line-clamp-3">{slide.description}</p>}
              {slide.tags && (
                <div className="flex gap-2 mt-4">
                  {slide.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono font-semibold text-secondary uppercase px-2 py-1 bg-secondary/10 rounded">{tag}</span>
                  ))}
                </div>
              )}
              {slide.ctaLabel && slide.ctaHref && (
                <div className="mt-6">
                  <SectionButton label={slide.ctaLabel} href={slide.ctaHref} variant="outline" size="sm" />
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    if (variant === 'minimal') {
      return (
        <div className="flex-[0_0_100%] min-w-0 px-2 group">
          <div className="relative h-96 rounded-lg overflow-hidden">
            {slide.image && <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-background mb-2">{slide.title}</h3>
                {slide.description && <p className="text-background/80 max-w-lg">{slide.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="flex-[0_0_100%] min-w-0 relative group">
        <div className="relative h-[60vh] min-h-[400px] rounded-xl overflow-hidden">
          {slide.image && <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            {slide.meta && <p className="text-primary font-mono font-semibold text-sm uppercase mb-2">{slide.meta}</p>}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-background max-w-3xl mb-4">{slide.title}</h2>
            {slide.description && <p className="text-background/80 text-lg max-w-2xl mb-6">{slide.description}</p>}
            {slide.ctaLabel && slide.ctaHref && (
              <SectionButton label={slide.ctaLabel} href={slide.ctaHref} variant="outline" className="border-background text-background hover:bg-background hover:text-foreground w-fit" />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24 overflow-hidden">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(slides.length)} />
        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, idx) => (
                <React.Fragment key={slide.id}>{renderSlide(slide, idx)}</React.Fragment>
              ))}
            </div>
          </div>
          {showArrows && (
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center focus:ring-2 focus:ring-primary active:scale-95">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center focus:ring-2 focus:ring-primary active:scale-95">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          {showDots && (
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-primary ${selectedIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
                />
              ))}
            </div>
          )}
        </div>
        {ctaLabel && ctaPath && (
          <div className="flex justify-center mt-12">
            <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
          </div>
        )}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default CarouselSection
