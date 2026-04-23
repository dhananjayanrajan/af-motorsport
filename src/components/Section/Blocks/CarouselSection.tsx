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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      containScroll: 'trimSnaps',
      dragFree: true,
      duration: 50
    },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth
    if (width >= 1280) setItemsPerPage(4)
    else if (width >= 1024) setItemsPerPage(3)
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
    return `https://picsum.photos/id/${(index + 120) * 2}/1200/1600`
  }

  return (
    <section id={id} className="relative w-full h-screen flex flex-col bg-white-pure overflow-hidden">
      <div className="flex-grow flex w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full touch-pan-y">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              className="relative h-full cursor-grab active:cursor-grabbing group border-r border-black-pure last:border-r-0 overflow-hidden bg-black-pure"
            >
              <Link
                href={slide.ctaHref || '#'}
                className="absolute inset-0 z-40 outline-none"
                aria-label={slide.title}
              />

              <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.img
                  src={getImageUrl(slide.image, idx)}
                  alt={slide.title}
                  initial={false}
                  animate={{
                    scale: hoveredIndex === idx ? 1.05 : 1.2,
                    opacity: hoveredIndex === idx ? 0.9 : 0.6
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black-pure via-black-pure/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/20 to-transparent opacity-80" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col pointer-events-none p-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-mono font-black text-primary-500 tracking-[0.3em]">
                    {slide.meta}
                  </span>
                </div>

                <h3 className="font-mono font-black tracking-normal text-white-pure leading-[0.9] mb-8 text-xl md:text-2xl lg:text-3xl max-w-[12ch]">
                  {slide.title}
                </h3>

                <div className={`
                  transition-all duration-600 ease-[0.16,1,0.3,1]
                  ${hoveredIndex === idx ? 'opacity-100 translate-y-0 max-h-60' : 'opacity-0 translate-y-12 max-h-0'}
                `}>
                  <p className="text-[11px] font-mono font-black text-white-pure/50 leading-relaxed mb-10 max-w-[280px]">
                    {slide.description}
                  </p>

                  {slide.ctaLabel && (
                    <div className="inline-flex items-center bg-white-pure text-black-pure px-10 py-5 group-hover:bg-primary-500 transition-colors duration-100">
                      <span className="text-[10px] font-mono font-black tracking-widest">
                        {slide.ctaLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute top-12 right-12 z-30">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono font-black text-white-pure tracking-widest mb-2">
                    Entry
                  </span>
                  <span className="text-2xl font-mono font-black text-primary">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-50 w-full bg-white-pure border-t border-black-pure h-20 md:h-28 flex items-stretch">
        <div className="flex items-stretch border-r border-black-pure bg-black-pure px-10 group transition-colors duration-100 hover:bg-primary-500">
          <div className="flex flex-col justify-center">
            <span className="text-xs font-mono font-black text-white-pure">Current Slide</span>
            <span className="text-2xl font-mono font-black text-white-pure group-hover:text-black-pure tabular-nums">
              {String(selectedIndex + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex-grow flex items-center px-12 gap-16">
          <div className="flex-grow h-1 bg-black-pure/5 relative">
            <motion.div
              className="absolute h-full bg-black-pure left-0"
              initial={false}
              animate={{
                width: `${((selectedIndex + 1) / slides.length) * 100}%`
              }}
              transition={{ type: "spring", stiffness: 150, damping: 30 }}
            />
            <div className="absolute top-4 left-0 w-full flex justify-between">
              {slides.map((_, i) => (
                <div key={i} className={`w-px h-2 bg-black-pure ${i === selectedIndex ? 'h-4 bg-primary-500' : ''}`} />
              ))}
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono font-black text-black-pure">Total Slides</span>
              <span className="text-2xl font-mono font-black text-black-pure">{String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-stretch border-l border-black-pure">
          <button
            onClick={scrollPrev}
            className="w-20 md:w-28 bg-white-pure hover:bg-black-pure hover:text-white-pure transition-colors duration-100 flex items-center justify-center group"
          >
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-2" />
          </button>
          <button
            onClick={scrollNext}
            className="w-20 md:w-28 border-l border-black-pure bg-white-pure hover:bg-black-pure hover:text-white-pure transition-colors duration-100 flex items-center justify-center group"
          >
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
          </button>
        </div>

        {ctaLabel && ctaPath && (
          <Link
            href={ctaPath}
            className="flex items-center px-16 bg-black-pure text-white-pure font-mono font-black text-[11px] tracking-[0.2em] hover:bg-primary-500 hover:text-black-pure transition-colors duration-100 border-l border-black-pure"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}

export default CarouselSection