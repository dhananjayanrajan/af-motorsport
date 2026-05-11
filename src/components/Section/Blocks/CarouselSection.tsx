"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import MosaicBackground from '../Backgrounds/MosaicBackground'
import SectionCTA from '../Components/SectionCTA'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionScroller from '../Components/SectionScroller'
import SectionSidebar from '../Components/SectionSidebar'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState<CarouselSlide | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: slides.length > 1,
      align: 'start',
      skipSnaps: false,
      containScroll: false,
      dragFree: false,
      duration: 60,
      slidesToScroll: itemsToScroll || 'auto',
      watchDrag: slides.length > 1
    },
    slides.length > 1 ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })] : []
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
    if (width >= 1376) setItemsPerPage(Math.min(slides.length, 4))
    else if (width >= 1024) setItemsPerPage(Math.min(slides.length, 3))
    else if (width >= 768) setItemsPerPage(Math.min(slides.length, 2))
    else setItemsPerPage(1)
  }, [itemsToScroll, slides.length])

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
    return `https://picsum.photos/seed/${index + 50}/800/800`
  }

  const displayedSlides = slides.slice(0, 8)
  const currentSlide = slides[selectedIndex]

  if (!mounted) return null

  return (
    <section id={id} className="relative w-full min-h-screen bg-white-pure border-t-2 border-black-pure flex flex-col overflow-hidden">
      <MosaicBackground />

      <SectionHeader
        title={currentSlide?.title || "COLLECTION"}
        subtitle={currentSlide?.meta || "FEATURED"}
        variant={1}
        metadata={String(slides.length).padStart(2, '0')}
      />

      <SectionScroller items={displayedSlides.map(s => s.title)} variant={1} />

      <div className="flex-1 container py-6 flex flex-col justify-center max-w-full lg:max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col border-2 border-black-pure bg-white-pure overflow-hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {displayedSlides.map((slide, idx) => (
                <div
                  key={`${slide.id}-${idx}`}
                  style={{
                    flex: `0 0 ${100 / itemsPerPage}%`,
                    maxWidth: itemsPerPage === 1 ? '600px' : 'none',
                    margin: itemsPerPage === 1 ? '0 auto' : '0'
                  }}
                  className="group relative flex flex-col border-r-2 border-black-pure last:border-r-0 bg-white-pure"
                >
                  <div className="relative aspect-square max-h-[45vh] border-b-2 border-black-pure overflow-hidden flex items-center justify-center bg-secondary-500/5">
                    <div className="absolute top-0 left-0 z-20 flex flex-col">
                      <span className="text-[10px] font-mono font-black bg-black-pure text-white-pure px-3 py-1.5 uppercase tracking-widest border-b-2 border-r-2 border-black-pure">
                        {String((idx % slides.length) + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <img
                      src={getImageUrl(slide.image, idx)}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>

                  <div className="flex flex-col p-6 flex-grow gap-4 bg-white-pure">
                    <div className="space-y-2">
                      {slide.tags && slide.tags.length > 0 && (
                        <p className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest opacity-40">
                          {slide.tags[0]}
                        </p>
                      )}
                      <h3 className="text-lg font-black uppercase text-black-pure leading-tight tracking-tighter line-clamp-1">
                        {slide.title}
                      </h3>
                    </div>

                    <div className="pt-4 border-t-2 border-black-pure/10">
                      <button
                        onClick={() => {
                          setActiveSlide(slide)
                          setSidebarOpen(true)
                        }}
                        className="flex items-center gap-3"
                      >
                        <div className="size-8 border-2 border-black-pure bg-white-pure flex items-center justify-center group-hover:bg-black-pure transition-colors">
                          <ArrowRight className="size-4 text-black-pure group-hover:text-white-pure stroke-[3px]" />
                        </div>
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure">
                          DETAILS
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {slides.length > 8 && (
                <div
                  style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                  className="group relative flex flex-col border-r-2 border-black-pure bg-secondary-500/5"
                >
                  <Link href={ctaPath || '#'} className="absolute inset-0 z-40" />
                  <div className="relative aspect-square max-h-[45vh] border-b-2 border-black-pure flex items-center justify-center bg-black-pure">
                    <div className="size-16 border-2 border-white-pure flex items-center justify-center">
                      <ArrowRight className="size-8 text-white-pure stroke-[3px]" />
                    </div>
                  </div>
                  <div className="p-6 flex-grow bg-white-pure flex flex-col justify-center">
                    <span className="text-lg font-black text-black-pure uppercase tracking-tighter">VIEW ALL</span>
                    <span className="text-[10px] font-mono font-black text-black-pure/40 uppercase">+{slides.length - 8} ENTRIES</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {slides.length > 1 && (
            <div className="relative z-50 w-full bg-white-pure border-t-2 border-black-pure h-16 flex items-stretch">
              <div className="hidden md:flex items-stretch border-r-2 border-black-pure bg-white-pure px-8">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-mono font-black text-black-pure tabular-nums">
                    {String(selectedIndex + 1).padStart(2, '0')}
                  </span>
                  <div className="h-4 w-[2px] bg-black-pure/20" />
                  <span className="text-xl font-mono font-black text-black-pure/20 tabular-nums">
                    {String(displayedSlides.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex-grow flex items-center px-6">
                <div className="flex-grow h-1.5 bg-black-pure/10 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-black-pure"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((selectedIndex + 1) / displayedSlides.length) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  />
                </div>
              </div>

              <div className="flex items-stretch border-l-2 border-black-pure">
                <button onClick={scrollPrev} className="w-16 flex items-center justify-center border-r-2 border-black-pure bg-white-pure hover:bg-black-pure hover:text-white-pure transition-colors">
                  <ChevronLeft size={24} strokeWidth={3} />
                </button>
                <button onClick={scrollNext} className="w-16 flex items-center justify-center bg-white-pure hover:bg-black-pure hover:text-white-pure transition-colors">
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          )}
        </div>

        <SectionCTA
          label={currentSlide?.ctaLabel || ctaLabel || "DISCOVER"}
          path={currentSlide?.ctaHref || ctaPath || "#"}
          description={currentSlide?.description}
          variant={1}
        />
      </div>

      <SectionFooter variant={1} />

      <SectionSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title={activeSlide?.title || ''}
        description={activeSlide?.description || ''}
        imageUrl={getImageUrl(activeSlide?.image, selectedIndex)}
        idCode={activeSlide?.id || ''}
        stats={[
          { label: 'INDEX', val: String(selectedIndex + 1).padStart(2, '0'), color: 'bg-black-pure' },
          { label: 'CATEGORY', val: activeSlide?.tags?.[0] || 'N/A', color: 'bg-black-pure' }
        ]}
        buttonLabel="EXPLORE"
        onAction={() => {
          if (activeSlide?.ctaHref) window.location.href = activeSlide.ctaHref
          setSidebarOpen(false)
        }}
      />
    </section>
  )
}

export default CarouselSection