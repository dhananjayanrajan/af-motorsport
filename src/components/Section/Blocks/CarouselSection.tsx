"use client"

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import MosaicBackground from '../Backgrounds/MosaicBackground'
import SectionCTA from '../Components/SectionCTA'
import SectionHeader from '../Components/SectionHeader'
import SectionScroller from '../Components/SectionScroller'

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
  itemsToScroll?: number
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  id,
  slides,
  autoplayDelay = 5000,
  ctaLabel,
  ctaPath,
  itemsToScroll,
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
      inViewThreshold: 0.1,
      slidesToScroll: itemsToScroll || 'auto'
    },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateItemsPerPage = useCallback(() => {
    if (itemsToScroll) {
      setItemsPerPage(itemsToScroll)
      return
    }
    const width = window.innerWidth
    if (width >= 1376) setItemsPerPage(4)
    else if (width >= 1024) setItemsPerPage(3)
    else if (width >= 768) setItemsPerPage(2)
    else setItemsPerPage(1)
  }, [itemsToScroll])

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
      <section id={id} className="w-full py-12 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] border-2 border-black-pure bg-white-pure animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="relative w-full py-12 md:py-20 lg:py-24 bg-background overflow-hidden">
      <MosaicBackground />
      <div className="container flex flex-col">
        <SectionHeader
          title={slides[selectedIndex]?.title || "Collection"}
          subtitle={slides[selectedIndex]?.meta || "Featured"}
          variant={1}
          metadata={`${selectedIndex + 1} / ${slides.length}`}
        />

        <SectionScroller
          items={slides.map(s => s.title)}
          variant={1}
        />

        <div className="flex flex-col gap-8 border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {slides.map((slide, idx) => (
                <div
                  key={`${slide.id}-${idx}`}
                  style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                  className="group relative flex flex-col border-r border-black-pure last:border-r-0 bg-white-pure transition-colors duration-500 hover:bg-black-pure select-none"
                >
                  {slide.ctaHref && (
                    <Link href={slide.ctaHref} className="absolute inset-0 z-40" aria-label={slide.title} />
                  )}

                  <div className="relative h-[450px] border-b border-black-pure overflow-hidden pointer-events-none">
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                      {slide.meta && (
                        <span className="text-xs font-mono font-black bg-primary-500 text-black-pure px-2 py-1 self-start uppercase tracking-widest">
                          {slide.meta}
                        </span>
                      )}
                      <span className="text-xs font-mono font-black bg-black-pure text-white-pure px-2 py-1 self-start group-hover:bg-white-pure group-hover:text-black-pure uppercase tracking-widest transition-colors duration-500">
                        {String((idx % slides.length) + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <img
                      src={getImageUrl(slide.image, idx)}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable="false"
                    />

                    <div className="absolute bottom-0 right-0 bg-white-pure border-l border-t border-black-pure px-4 py-2 group-hover:bg-secondary-800 transition-colors duration-300">
                      <span className="text-2xl font-black italic tabular-nums text-black-pure">
                        {String((idx % slides.length) + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-rows-[auto_1fr_auto] p-6 flex-grow pointer-events-none gap-6">
                    <div>
                      {slide.tags && slide.tags.length > 0 && (
                        <p className="text-xs font-mono font-black text-neutral-400 group-hover:text-primary-500 transition-colors duration-500 uppercase tracking-widest mb-1 truncate">
                          {slide.tags.join(' · ')}
                        </p>
                      )}
                      <h3 className="text-xl font-black uppercase text-black-pure group-hover:text-white-pure transition-colors duration-500 leading-tight line-clamp-2">
                        {slide.title}
                      </h3>
                    </div>

                    <div className="border-t border-black-pure group-hover:border-neutral-800 transition-colors duration-500 pt-4">
                      {slide.description && (
                        <p className="text-xs font-black uppercase text-neutral-400 group-hover:text-neutral-500 transition-colors duration-500 line-clamp-3 tracking-wide">
                          {slide.description}
                        </p>
                      )}
                    </div>

                    <div className="h-6 flex items-center">
                      {slide.ctaLabel && (
                        <div className="flex items-center gap-2 opacity-100 translate-y-0 group-hover:translate-x-1 transition-all duration-300">
                          <span className="text-xs font-mono font-black uppercase tracking-widest text-transparent group-hover:text-white-pure border-b border-transparent group-hover:border-primary-500 pb-0.5">
                            {slide.ctaLabel}
                          </span>
                          <ArrowRight className="h-3 w-3 text-transparent group-hover:text-primary-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="h-1.5 w-full bg-black-pure group-hover:bg-primary-500 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-50 w-full bg-white-pure border-t-2 border-black-pure h-20 flex items-stretch shrink-0">
            <div className="hidden sm:flex items-stretch border-r-2 border-black-pure bg-neutral-50 px-6">
              <div className="flex flex-col justify-center">
                <span className="text-xs font-mono font-black text-neutral-400 uppercase tracking-widest">POS</span>
                <span className="text-lg font-mono font-black text-black-pure tabular-nums">
                  {String(selectedIndex + 1).padStart(2, '0')}
                  <span className="text-neutral-400 mx-1">/</span>
                  <span className="text-neutral-400">{String(slides.length).padStart(2, '0')}</span>
                </span>
              </div>
            </div>

            <div className="flex-grow flex items-center px-4 md:px-8 gap-4 md:gap-8">
              <div className="flex-grow h-[2px] bg-neutral-200 relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-black-pure"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            <div className="flex items-stretch border-l-2 border-black-pure">
              <button
                onClick={scrollPrev}
                className="w-16 md:w-20 flex items-center justify-center bg-white-pure hover:bg-black-pure hover:text-white-pure transition-colors border-r-2 border-black-pure active:bg-primary-500 active:text-black-pure"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 stroke-[3]" />
              </button>
              <button
                onClick={scrollNext}
                className="w-16 md:w-20 flex items-center justify-center bg-white-pure hover:bg-black-pure hover:text-white-pure transition-colors active:bg-primary-500 active:text-black-pure"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        <SectionCTA
          label={slides[selectedIndex]?.ctaLabel || ctaLabel || "Discover More"}
          path={slides[selectedIndex]?.ctaHref || ctaPath || "#"}
          description={slides[selectedIndex]?.description}
          variant={1}
        />
      </div>
    </section>
  )
}

export default CarouselSection