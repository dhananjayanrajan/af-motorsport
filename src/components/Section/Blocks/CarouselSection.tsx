"use client"

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
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
  ctaPath,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)
  const [mounted, setMounted] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      containScroll: false,
      dragFree: false,
      duration: 60,
      dragThreshold: 1,
      inViewThreshold: 0.1
    },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) {
    return (
      <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure" style={{ height: '100vh' }}>
        <div className="flex items-stretch h-[calc(100vh-8rem)]">
          {slides.slice(0, 3).map((_, i) => (
            <div key={i} className="flex-1 border-r border-black-pure last:border-r-0 flex flex-col bg-white-pure">
              <div className="h-2/3 border-b border-black-pure bg-neutral-100 animate-pulse" />
              <div className="flex-1 p-6 animate-pulse space-y-3">
                <div className="h-3 bg-neutral-200 w-20" />
                <div className="h-7 bg-neutral-200 w-36" />
                <div className="h-10 bg-neutral-200 w-full mt-6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden" style={{ height: '100vh' }}>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {slides.map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                className="group relative h-full border-r border-black-pure last:border-r-0 flex flex-col bg-white-pure transition-colors duration-500 hover:bg-black-pure select-none"
              >
                <Link href={slide.ctaHref || '#'} className="absolute inset-0 z-40" aria-label={slide.title} />

                <div className="relative h-2/3 border-b border-black-pure overflow-hidden pointer-events-none">
                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                    {slide.meta && (
                      <span className="text-[10px] font-mono font-black bg-primary-500 text-black-pure px-2 py-1 self-start whitespace-nowrap uppercase tracking-widest">
                        {slide.meta}
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-black bg-black-pure text-white-pure px-2 py-1 self-start group-hover:bg-white-pure group-hover:text-black-pure whitespace-nowrap uppercase tracking-widest transition-colors duration-500">
                      {String((idx % slides.length) + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <img
                    src={getImageUrl(slide.image, idx)}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable="false"
                  />

                  <div className="absolute bottom-0 right-0 bg-white-pure border-l border-t border-black-pure px-5 py-3 group-hover:bg-secondary-500 transition-colors duration-300">
                    <span className="text-4xl font-black italic tabular-nums">
                      {String((idx % slides.length) + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between pointer-events-none">
                  <div className="overflow-hidden">
                    {slide.tags && slide.tags.length > 0 && (
                      <p className="text-[10px] font-mono font-black text-black-pure/40 group-hover:text-primary-500 transition-colors duration-500 uppercase tracking-widest mb-1 truncate">
                        {slide.tags.join(' · ')}
                      </p>
                    )}
                    <h3 className="text-2xl font-black uppercase text-black-pure group-hover:text-white-pure transition-colors duration-500 leading-tight break-words">
                      {slide.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-6 border-t border-black-pure group-hover:border-white-pure/20 transition-colors duration-500 space-y-4">
                    {slide.description && (
                      <p className="text-xs font-black uppercase text-black-pure/40 group-hover:text-white-pure/40 transition-colors duration-500 line-clamp-2 tracking-wide">
                        {slide.description}
                      </p>
                    )}
                    {slide.ctaLabel && (
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-white-pure border-b border-primary-500 pb-0.5">
                          {slide.ctaLabel}
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary-500" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-1 bg-black-pure group-hover:bg-primary-500 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-50 w-full bg-white-pure border-t-2 border-black-pure h-24 md:h-32 flex items-stretch shrink-0">
          <div className="hidden sm:flex items-stretch border-r-2 border-black-pure bg-white-100 px-8 md:px-12">
            <div className="flex flex-col justify-center">
              <span className="text-[9px] font-mono font-black text-black-pure/40 uppercase tracking-widest">POSITION</span>
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
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>

            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className="h-1 w-6 md:w-8 transition-colors duration-300"
                  style={{ background: i === selectedIndex ? 'var(--black-pure)' : 'rgba(0,0,0,0.1)' }}
                />
              ))}
            </div>

            <div className="flex items-stretch h-full py-6 md:py-8">
              <button
                onClick={scrollPrev}
                className="w-12 md:w-16 h-full flex items-center justify-center border-2 border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 outline-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 md:w-16 h-full flex items-center justify-center border-y-2 border-r-2 border-black-pure text-black-pure hover:bg-black-pure hover:text-white-pure transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 outline-none"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {ctaLabel && ctaPath && (
            <Link
              href={ctaPath}
              className="hidden lg:flex items-center gap-4 px-10 md:px-16 bg-black-pure text-white-pure text-[10px] font-mono font-black uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-l-2 border-black-pure focus-visible:ring-2 focus-visible:ring-primary-500 outline-none group"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CarouselSection