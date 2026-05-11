"use client"

import { ArrowRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionSidebar from '../Components/SectionSidebar'

export interface Feature {
  id: string
  title: string
  description: string
  image?: string
  slug?: string
  stats?: { label: string; value: string }[]
}

interface FeatureLabels {
  specIndex: string
  ctaLabel: string
}

interface FeatureSectionProps {
  id: string
  title: string
  subtitle: string
  features: Feature[]
  labels: FeatureLabels
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  title,
  subtitle,
  features = [],
  labels,
  ctaPath,
  headerVariant = 1,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const nextSlide = useCallback(() => setActiveIndex((prev) => (prev + 1) % features.length), [features.length])
  const prevSlide = useCallback(() => setActiveIndex((prev) => (prev - 1 + features.length) % features.length), [features.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()
  }

  const current = features[activeIndex]

  return (
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(features.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10">
        <div
          className="relative flex flex-col md:grid md:grid-cols-12 border-2 border-black-pure bg-white-pure overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          <div className="md:col-span-6 lg:col-span-7 aspect-square md:aspect-auto md:h-[550px] lg:h-[600px] border-b-2 md:border-b-0 md:border-r-2 border-black-pure relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute top-0 left-0 bg-black-pure text-white-pure px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-widest">
              {(activeIndex + 1).toString().padStart(2, '0')}
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-5 flex flex-col bg-white-pure">
            <div className="flex-grow flex flex-col p-6 xl:p-10">

              <div className="flex items-center justify-between mb-8 xl:mb-12 border-b-2 border-black-pure pb-4">
                <span className="text-[10px] xl:text-xs font-black uppercase tracking-widest text-primary-500">
                  {labels.specIndex}
                </span>
                <span className="text-sm xl:text-md font-mono font-black text-black-pure">
                  {current.id}
                </span>
              </div>

              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <h3 className="text-2xl xl:text-4xl font-black uppercase text-black-pure leading-none tracking-tight">
                      {current.title}
                    </h3>

                    <p className="text-xs xl:text-sm font-bold text-black-pure uppercase leading-relaxed max-w-md">
                      {current.description}
                    </p>

                    <div className="mt-4 border-2 border-black-pure divide-y-2 divide-black-pure">
                      {current.stats?.slice(0, 3).map((stat, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-center p-3 xl:p-4 bg-white-pure hover:bg-secondary-500 transition-colors">
                          <span className="text-[10px] font-black uppercase text-black-pure">{stat.label}</span>
                          <span className="text-xs xl:text-sm font-black text-black-pure tabular-nums">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 grid grid-cols-2 h-14 xl:h-16 border-2 border-black-pure">
                <button
                  onClick={() => {
                    setActiveFeature(current)
                    setSidebarOpen(true)
                  }}
                  className="bg-white-pure hover:bg-secondary-500 flex items-center justify-center gap-3 border-r-2 border-black-pure transition-colors group"
                >
                  <Plus className="size-4 stroke-[3px]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">DETAILS</span>
                </button>
                <Link
                  href={current.slug ? `/${current.slug}` : `${ctaPath}/${current.id}`}
                  className="bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure flex items-center justify-center gap-3 transition-colors"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{labels.ctaLabel}</span>
                  <ArrowRight className="size-4 stroke-[3px]" />
                </Link>
              </div>
            </div>

            <div className="h-14 xl:h-16 border-t-2 border-black-pure flex items-stretch">
              <button
                onClick={prevSlide}
                className="w-14 xl:w-16 flex items-center justify-center hover:bg-primary-500 transition-colors border-r-2 border-black-pure"
              >
                <ChevronLeft className="size-6 stroke-[3px]" />
              </button>
              <div className="flex-grow flex items-center px-6">
                <div className="w-full h-1.5 bg-secondary-500 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-black-pure"
                    animate={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  />
                </div>
              </div>
              <button
                onClick={nextSlide}
                className="w-14 xl:w-16 flex items-center justify-center hover:bg-primary-500 transition-colors border-l-2 border-black-pure"
              >
                <ChevronRight className="size-6 stroke-[3px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SectionSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title={activeFeature?.title || ''}
        description={activeFeature?.description || ''}
        imageUrl={activeFeature?.image || ''}
        idCode={activeFeature?.id || ''}
        stats={activeFeature?.stats?.map(s => ({ label: s.label, val: s.value, color: 'bg-primary-500' })) || []}
        buttonLabel="VIEW FULL"
        onAction={() => {
          if (activeFeature?.slug) window.location.href = `/${activeFeature.slug}`
          setSidebarOpen(false)
        }}
      />
    </section>
  )
}

export default FeatureSection