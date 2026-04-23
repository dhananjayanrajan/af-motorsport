"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import RacingLinesBackground from '../Backgrounds/RacingLinesBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        scrollPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        scrollNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollPrev, scrollNext])

  const getImageUrl = (image?: string) => {
    if (image && image.trim() !== '') return image
    return `https://picsum.photos/id/${Math.abs(slides[0]?.id.charCodeAt(0) || 1) % 100}/1200/600`
  }

  const renderSlide = (slide: CarouselSlide, idx: number) => {
    if (variant === 'card') {
      return (
        <div className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-2 group">
          <div className="border-2 border-black-pure bg-white-pure hover:bg-black-pure transition-all duration-300">
            <div className="relative h-64 overflow-hidden border-b-2 border-black-pure">
              <img src={getImageUrl(slide.image)} alt={slide.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6">
              {slide.meta && (
                <p className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-widest mb-2 group-hover:text-white-pure">
                  {slide.meta}
                </p>
              )}
              <h3 className="text-xl font-black uppercase tracking-tighter text-black-pure mb-2 group-hover:text-white-pure">
                {slide.title}
              </h3>
              {slide.description && (
                <p className="text-xs font-sans font-bold uppercase text-black-pure/60 line-clamp-3 group-hover:text-white-pure/60">
                  {slide.description}
                </p>
              )}
              {slide.tags && slide.tags.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {slide.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-mono font-black uppercase px-2 py-1 border border-black-pure group-hover:border-white-pure group-hover:text-white-pure">
                      {tag}
                    </span>
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
          <div className="relative h-96 border-2 border-black-pure overflow-hidden bg-black-pure">
            <img src={getImageUrl(slide.image)} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/60 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white-pure mb-2">{slide.title}</h3>
                {slide.description && (
                  <p className="text-xs font-mono font-black uppercase text-white-pure/80 max-w-lg">{slide.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="flex-[0_0_100%] min-w-0 relative group">
        <div className="relative h-[60vh] min-h-[400px] border-2 border-black-pure overflow-hidden bg-black-pure">
          <img src={getImageUrl(slide.image)} alt={slide.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/50 to-transparent flex flex-col justify-end p-8 md:p-12">
            {slide.meta && (
              <p className="text-primary-500 font-mono font-black text-xs uppercase tracking-widest mb-2">{slide.meta}</p>
            )}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white-pure max-w-3xl mb-4">
              {slide.title}
            </h2>
            {slide.description && (
              <p className="text-white-pure/80 text-sm font-mono font-black uppercase max-w-2xl mb-6">{slide.description}</p>
            )}
            {slide.ctaLabel && slide.ctaHref && (
              <SectionButton label={slide.ctaLabel} href={slide.ctaHref} variant="outline" className="border-white-pure text-white-pure hover:bg-white-pure hover:text-black-pure w-fit" />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-full bg-white-pure border-y-2 border-black-pure py-16 md:py-24 overflow-hidden">
      {background}
      <div className="relative z-10 container mx-auto px-8">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(slides.length)} />
        <div className="mt-12">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, idx) => (
                <React.Fragment key={slide.id}>{renderSlide(slide, idx)}</React.Fragment>
              ))}
            </div>
          </div>
          {showArrows && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 border-2 border-black-pure bg-white-pure hover:bg-primary-500 hover:border-black-pure transition-all duration-100 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <ChevronLeft className="w-5 h-5 text-black-pure" />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 border-2 border-black-pure bg-white-pure hover:bg-primary-500 hover:border-black-pure transition-all duration-100 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <ChevronRight className="w-5 h-5 text-black-pure" />
              </button>
            </div>
          )}
          {showDots && (
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`h-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 ${selectedIndex === idx
                      ? 'w-12 bg-primary-500'
                      : 'w-6 bg-black-pure/20 hover:bg-black-pure/40'
                    }`}
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