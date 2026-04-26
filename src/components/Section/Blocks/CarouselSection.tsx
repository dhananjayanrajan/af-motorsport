// CarouselSection.tsx
"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

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
  slides: CarouselSlide[]
  autoplayDelay?: number
  ctaLabel?: string
  ctaPath?: string
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  id,
  slides,
  autoplayDelay = 5000,
  ctaLabel,
  ctaPath
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false, containScroll: 'trimSnaps', dragFree: false, duration: 40 },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth
    if (width >= 1536) setItemsPerPage(4)
    else if (width >= 1280) setItemsPerPage(3)
    else if (width >= 768) setItemsPerPage(2)
    else setItemsPerPage(1)
  }, [])

  useEffect(() => {
    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [updateItemsPerPage])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const getImageUrl = (image?: string, index: number = 0) => {
    if (image && image.trim() !== '') return image
    return `https://picsum.photos/seed/${index + 50}/1200/1600`
  }

  return (
    <section id={id} className="relative w-full h-[90vh] md:h-screen flex flex-col bg-white-pure overflow-hidden border-t-2 border-black-pure">
      <div className="flex-grow flex w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full touch-pan-y">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              className="relative h-full group border-r-2 border-black-pure last:border-r-0 overflow-hidden cursor-pointer"
            >
              <Link href={slide.ctaHref || '#'} className="absolute inset-0 z-40" aria-label={slide.title} />

              <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.img
                  src={getImageUrl(slide.image, idx)}
                  alt={slide.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure/90 via-black-pure/30 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col p-6 sm:p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-base font-mono font-black text-primary-500 uppercase tracking-widest">
                    {slide.meta}
                  </span>
                  <div className="h-[2px] w-8 bg-primary-500/50" />
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white-pure uppercase tracking-tighter leading-tight mb-6 transition-colors group-hover:text-primary-500">
                  {slide.title}
                </h3>

                <div className="transition-all duration-500 overflow-hidden opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  <p className="text-base font-sans font-bold text-white-pure/70 uppercase mb-8">
                    {slide.description}
                  </p>
                  {slide.ctaLabel && (
                    <div className="inline-flex items-center gap-4 text-white-pure">
                      <span className="text-base font-mono font-black uppercase tracking-widest border-b-2 border-primary-500 pb-1">
                        {slide.ctaLabel}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary-500" />
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute top-8 right-8 z-30">
                <span className="text-base font-mono font-black text-white-pure/20 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-50 w-full bg-white-pure border-t-2 border-black-pure h-24 md:h-32 flex items-stretch">
        <div className="hidden sm:flex items-stretch border-r-2 border-black-pure bg-white-100 px-8 md:px-12">
          <div className="flex flex-col justify-center">
            <span className="text-base font-mono font-black text-black-pure/40 uppercase tracking-widest">CURRENT</span>
            <span className="text-xl md:text-2xl font-mono font-black text-black-pure tabular-nums">
              {String(selectedIndex + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex-grow flex items-center px-6 md:px-12 gap-8 md:gap-12">
          <div className="flex-grow h-[2px] bg-white-100 relative">
            <motion.div
              className="absolute h-full bg-black-pure left-0"
              animate={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex items-stretch h-full py-6 md:py-8">
            <button
              onClick={scrollPrev}
              className="w-12 md:w-16 h-full flex items-center justify-center border-2 border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 md:w-16 h-full flex items-center justify-center border-y-2 border-r-2 border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {ctaLabel && ctaPath && (
          <Link
            href={ctaPath}
            className="hidden lg:flex items-center px-10 md:px-16 bg-black-pure text-white-pure text-base font-mono font-black uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-l-2 border-black-pure focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default CarouselSection