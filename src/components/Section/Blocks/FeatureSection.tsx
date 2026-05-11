"use client"

import { cn } from '@/utilities/cn'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionSidebar from '../Components/SectionSidebar'

export interface Feature {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  slug?: string
  stats?: { label: string; value: string }[]
}

interface FeatureLabels {
  specIndex: string
  statsLabel: string
  ctaLabel: string
  statusLabel?: string
  indexLabel?: string
}

interface FeatureSectionProps {
  id: string
  title: string
  subtitle: string
  features: Feature[]
  labels: FeatureLabels
  columns?: 2 | 3 | 4
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  scrollDirection?: 'vertical' | 'horizontal'
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  title,
  subtitle,
  features = [],
  labels = { specIndex: '', statsLabel: '', ctaLabel: '', statusLabel: '', indexLabel: '' },
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  scrollDirection = 'vertical',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null)

  const isHorizontal = scrollDirection === 'horizontal'
  const displayFeatures = features.slice(0, 3)
  const hasMore = features.length > 3

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(displayFeatures.length - (hasMore ? 0 : 1)) * (100 / (displayFeatures.length + (hasMore ? 1 : 0)))}%`]
  )

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(Math.floor(latest * displayFeatures.length), displayFeatures.length - 1)
      setActiveIndex(index >= 0 ? index : 0)
    })
    return () => unsubscribe()
  }, [scrollYProgress, displayFeatures.length])

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn(
        "relative w-full bg-white-pure",
        isHorizontal ? "h-[400vh]" : "py-12 md:py-20 lg:py-24"
      )}
    >
      <div className={cn(
        "container px-0 md:px-4 max-w-full lg:max-w-7xl mx-auto",
        isHorizontal ? "sticky top-0 h-screen flex flex-col justify-center overflow-hidden" : ""
      )}>
        <div className="relative border-2 border-black-pure bg-white-pure mx-4 md:mx-0 z-1 flex flex-col h-full">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(features.length).padStart(2, '0')}
          />

          <div className={cn(
            "relative flex flex-col md:flex-row items-start flex-grow",
            isHorizontal ? "overflow-hidden" : ""
          )}>
            <div className="hidden md:flex sticky top-0 h-screen w-16 border-r-2 border-black-pure bg-white-pure flex-col items-center py-12 gap-8 z-20 shrink-0">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary-500 z-[-1]"
                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
              {displayFeatures.map((_, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2"
                  animate={{ scale: i === activeIndex ? 1.2 : 1 }}
                >
                  <span className={`text-xs font-mono font-black transition-colors duration-300 ${i <= activeIndex ? 'text-white-pure' : 'text-black-pure'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-2 transition-all duration-500 ease-in-out border-2 border-black-pure"
                    style={{
                      height: i === activeIndex ? '40px' : '8px',
                      background: i <= activeIndex ? 'var(--white-pure)' : 'var(--black-pure)'
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <div className={cn("flex-grow w-full", isHorizontal ? "h-full" : "overflow-hidden")}>
              <motion.div
                className={cn("flex", isHorizontal ? "h-full" : "flex-col")}
                style={isHorizontal ? { x: xTranslate, width: `${(displayFeatures.length + (hasMore ? 1 : 0)) * 100}%` } : {}}
              >
                {displayFeatures.map((feature, idx) => (
                  <div
                    key={feature.id}
                    className={cn(
                      "relative flex flex-col lg:flex-row bg-white-pure border-black-pure group/item overflow-hidden z-10 shrink-0",
                      isHorizontal ? "w-full h-full border-r-2" : "md:sticky md:top-0 h-auto md:h-screen border-b-2 last:border-b-0"
                    )}
                  >
                    <div className="w-full lg:w-1/2 flex flex-col border-r-0 lg:border-r-2 border-black-pure overflow-hidden">
                      <div className="flex-1 p-6 md:p-8 xl:p-12 flex flex-col min-w-0">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          className="flex items-center gap-4 mb-6 xl:mb-8 shrink-0"
                        >
                          <span className="text-[10px] xl:text-xs font-mono font-black bg-black-pure text-white-pure px-3 py-1 uppercase tracking-widest group-hover/item:bg-primary-500 group-hover/item:text-black-pure transition-colors duration-300">
                            {labels.specIndex}
                          </span>
                          <div className="h-1 flex-grow bg-black-pure">
                            <motion.div
                              className="h-full bg-primary-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.8, ease: "circOut" }}
                            />
                          </div>
                        </motion.div>

                        <div className="mb-4 xl:mb-6 shrink-0">
                          <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="text-lg md:text-xl xl:text-2xl font-black uppercase text-black-pure group-hover/item:translate-x-4 transition-transform duration-500 break-words"
                          >
                            {feature.title}
                          </motion.h3>
                        </div>

                        <div className="mb-6 xl:mb-10 shrink-0">
                          <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs xl:text-sm font-black uppercase text-black-pure leading-relaxed tracking-tight break-words"
                          >
                            {feature.description}
                          </motion.p>
                        </div>

                        <div className="grid grid-cols-2 border-t-2 border-l-2 border-black-pure mb-6 xl:mb-8 shrink-0">
                          {feature.stats?.slice(0, 4).map((stat, sIdx) => (
                            <motion.div
                              key={sIdx}
                              whileHover={{ x: 5, y: -5 }}
                              className="p-3 xl:p-4 border-r-2 border-b-2 border-black-pure hover:bg-primary-500 group/stat transition-colors duration-200 min-w-0"
                            >
                              <span className="block text-[10px] font-mono font-black text-black-pure uppercase group-hover/stat:text-black-pure">
                                {stat.label}
                              </span>
                              <span className="text-sm xl:text-lg font-black text-black-pure tabular-nums break-words">
                                {stat.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-auto shrink-0 py-6 lg:py-0 flex flex-wrap gap-4">
                          <button
                            onClick={() => {
                              setActiveFeature(feature)
                              setSidebarOpen(true)
                            }}
                            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-4 bg-white-pure text-black-pure px-6 xl:px-8 py-3 xl:py-4 text-[10px] xl:text-xs font-mono font-black uppercase tracking-widest border-2 border-black-pure hover:bg-black-pure hover:text-white-pure transition-all"
                          >
                            Details
                            <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5" />
                          </button>
                          {(feature.slug || ctaPath) && (
                            <motion.div className="flex-1 lg:flex-none" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Link
                                href={feature.slug ? `/${feature.slug}` : `${ctaPath}/${feature.id}`}
                                className="w-full inline-flex items-center justify-center gap-4 bg-primary-500 text-black-pure px-6 xl:px-8 py-3 xl:py-4 text-[10px] xl:text-xs font-mono font-black uppercase tracking-widest border-2 border-black-pure hover:bg-black-pure hover:text-white-pure transition-all"
                              >
                                {labels.ctaLabel}
                                <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5" />
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="h-16 xl:h-20 border-t-2 border-black-pure flex bg-white-pure shrink-0">
                        <div className="w-16 xl:w-20 border-r-2 border-black-pure flex items-center justify-center bg-white-pure group-hover/item:bg-primary-500 transition-colors duration-500">
                          <LayoutGrid className="w-5 h-5 xl:w-6 xl:h-6 text-black-pure" />
                        </div>
                        <div className="flex-grow flex items-center px-4 xl:px-8 overflow-hidden">
                          <span className="text-[10px] xl:text-xs font-mono font-black text-black-pure uppercase tracking-widest truncate">
                            {labels.statusLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative bg-white-pure h-[300px] md:h-[400px] lg:h-full lg:min-h-0 overflow-hidden">
                      <motion.img
                        initial={{ scale: 1.2, filter: 'grayscale(100%)' }}
                        whileInView={{ scale: 1, filter: 'grayscale(0%)' }}
                        transition={{ duration: 1.5 }}
                        src={feature.image || `https://picsum.photos/seed/${feature.id}/1200/1600`}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-white-pure border-r-2 border-b-2 border-black-pure px-4 xl:px-6 py-2 xl:py-3 font-mono font-black text-sm xl:text-lg z-20">
                        {String(idx + 1).padStart(3, '0')}
                      </div>
                    </div>
                  </div>
                ))}
                {hasMore && (
                  <div className={cn(
                    "relative flex flex-col bg-white-pure shrink-0 overflow-hidden z-10 group/viewall",
                    isHorizontal ? "w-full h-full" : "md:sticky md:top-0 h-auto md:h-screen border-b-2"
                  )}>
                    <Link href={ctaPath || '#'} className="absolute inset-0 flex flex-col items-center justify-center p-12">
                      <div className="relative">
                        <div className="w-24 h-24 xl:w-32 xl:h-32 border-4 border-black-pure bg-primary-500 flex items-center justify-center transition-all duration-500 group-hover/viewall:rotate-45 group-hover/viewall:bg-black-pure">
                          <ArrowRight className="w-12 h-12 xl:w-16 xl:h-16 text-black-pure group-hover/viewall:text-white-pure group-hover/viewall:-rotate-45 transition-all duration-500" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white-pure border-2 border-black-pure flex items-center justify-center font-mono font-black">
                          +{features.length - 3}
                        </div>
                      </div>
                      <div className="mt-12 text-center">
                        <h2 className="text-3xl xl:text-5xl font-black uppercase text-black-pure tracking-tighter leading-none mb-2">Explore All</h2>
                        <p className="text-sm xl:text-base font-mono font-black uppercase tracking-widest text-black-pure/60 group-hover/viewall:text-black-pure transition-colors">
                          View full technical catalog
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          <div className="bg-white-pure border-t-2 border-black-pure h-16 xl:h-20 flex items-center justify-between px-4 xl:px-8 z-30 relative shrink-0">
            <div className="flex items-center gap-4 xl:gap-6 flex-grow max-w-xs md:max-w-md">
              <span className="text-[10px] xl:text-xs font-mono font-black text-black-pure uppercase tracking-widest">
                {labels.indexLabel}
              </span>
              <div className="h-2 flex-grow bg-white-pure border-2 border-black-pure relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary-500"
                  style={{ scaleX, originX: 0 }}
                />
              </div>
            </div>
            <motion.span
              className="text-base xl:text-lg font-mono font-black text-black-pure tabular-nums"
              key={activeIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {String(Math.round(activeIndex / (displayFeatures.length - 1) * 100) || 0).padStart(3, '0')}%
            </motion.span>
          </div>

          <SectionFooter variant={footerVariant} />
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
        buttonLabel="View Details"
        onAction={() => {
          if (activeFeature?.slug) window.location.href = `/${activeFeature.slug}`
          setSidebarOpen(false)
        }}
      />
    </section>
  )
}

export default FeatureSection