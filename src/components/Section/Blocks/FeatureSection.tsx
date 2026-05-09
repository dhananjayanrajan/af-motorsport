"use client"

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
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(Math.floor(latest * features.length), features.length - 1)
      setActiveIndex(index >= 0 ? index : 0)
    })
    return () => unsubscribe()
  }, [scrollYProgress, features.length])

  const displayFeatures = features.slice(0, 4)

  return (
    <section id={id} ref={containerRef} className="relative w-full py-12 md:py-20 lg:py-24 bg-white-pure">
      <div className="container px-0 md:px-4">
        <div className="relative border-2 border-black-pure bg-white-pure mx-4 md:mx-0 z-1">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(features.length).padStart(2, '0')}
          />

          <div className="relative flex flex-col md:flex-row items-start">
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

            <div className="flex-grow w-full">
              {displayFeatures.map((feature, idx) => (
                <div
                  key={feature.id}
                  className="relative md:sticky md:top-0 h-auto md:h-screen flex flex-col lg:flex-row bg-white-pure border-b-2 border-black-pure last:border-b-0 group/item overflow-hidden z-10"
                >
                  <div className="flex-1 flex flex-col border-r-0 lg:border-r-2 border-black-pure overflow-hidden">
                    <div className="flex-1 p-6 md:p-12 flex flex-col min-w-0">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-4 mb-8 shrink-0"
                      >
                        <span className="text-xs font-mono font-black bg-black-pure text-white-pure px-3 py-1 uppercase tracking-widest group-hover/item:bg-primary-500 group-hover/item:text-black-pure transition-colors duration-300">
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

                      <div className="mb-6 shrink-0">
                        <motion.h3
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          className="text-xl md:text-2xl font-black uppercase text-black-pure group-hover/item:translate-x-4 transition-transform duration-500 break-words"
                        >
                          {feature.title}
                        </motion.h3>
                      </div>

                      <div className="mb-10 shrink-0">
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-sm font-black uppercase text-black-pure leading-relaxed tracking-tight break-words"
                        >
                          {feature.description}
                        </motion.p>
                      </div>

                      <div className="grid grid-cols-2 border-t-2 border-l-2 border-black-pure mb-8 shrink-0">
                        {feature.stats?.slice(0, 4).map((stat, sIdx) => (
                          <motion.div
                            key={sIdx}
                            whileHover={{ x: 5, y: -5 }}
                            className="p-4 border-r-2 border-b-2 border-black-pure hover:bg-primary-500 group/stat transition-colors duration-200 min-w-0"
                          >
                            <span className="block text-xs font-mono font-black text-black-pure uppercase group-hover/stat:text-black-pure">
                              {stat.label}
                            </span>
                            <span className="text-lg font-black text-black-pure tabular-nums break-words">
                              {stat.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-auto shrink-0 py-6 lg:py-0 flex gap-4">
                        <button
                          onClick={() => {
                            setActiveFeature(feature)
                            setSidebarOpen(true)
                          }}
                          className="inline-flex items-center gap-4 bg-white-pure text-black-pure px-8 py-4 text-xs font-mono font-black uppercase tracking-widest border-2 border-black-pure hover:bg-black-pure hover:text-white-pure transition-all"
                        >
                          Details
                          <ArrowRight className="w-5 h-5" />
                        </button>
                        {(feature.slug || ctaPath) && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                              href={feature.slug ? `/${feature.slug}` : `${ctaPath}/${feature.id}`}
                              className="inline-flex items-center gap-4 bg-primary-500 text-black-pure px-8 py-4 text-xs font-mono font-black uppercase tracking-widest border-2 border-black-pure hover:bg-black-pure hover:text-white-pure transition-all"
                            >
                              {labels.ctaLabel}
                              <ArrowRight className="w-5 h-5" />
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="h-20 border-t-2 border-black-pure flex bg-white-pure shrink-0">
                      <div className="w-20 border-r-2 border-black-pure flex items-center justify-center bg-white-pure group-hover/item:bg-primary-500 transition-colors duration-500">
                        <LayoutGrid className="w-6 h-6 text-black-pure" />
                      </div>
                      <div className="flex-grow flex items-center px-8 overflow-hidden">
                        <span className="text-xs font-mono font-black text-black-pure uppercase tracking-widest truncate">
                          {labels.statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 relative bg-white-pure h-[400px] md:h-full lg:min-h-0 overflow-hidden">
                    <motion.img
                      initial={{ scale: 1.2, filter: 'grayscale(100%)' }}
                      whileInView={{ scale: 1, filter: 'grayscale(0%)' }}
                      transition={{ duration: 1.5 }}
                      src={feature.image || `https://picsum.photos/seed/${feature.id}/1200/1600`}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-white-pure border-r-2 border-b-2 border-black-pure px-6 py-3 font-mono font-black text-lg z-20">
                      {String(idx + 1).padStart(3, '0')}
                    </div>
                  </div>
                </div>
              ))}
              {features.length > 4 && (
                <div className="relative md:sticky md:top-0 h-auto md:h-screen flex flex-col lg:flex-row bg-primary-500 border-b-2 border-black-pure overflow-hidden z-10">
                  <div className="flex-1 flex items-center justify-center p-12">
                    <Link href={ctaPath || '#'} className="text-center">
                      <div className="w-24 h-24 border-4 border-black-pure bg-white-pure mx-auto mb-6 flex items-center justify-center hover:bg-black-pure transition-colors duration-500">
                        <ArrowRight className="w-12 h-12 text-black-pure hover:text-white-pure transition-colors duration-500" />
                      </div>
                      <span className="text-2xl font-black text-black-pure uppercase block">View All Features</span>
                      <span className="text-lg font-mono font-black text-black-pure mt-2 block">{features.length - 4} more</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white-pure border-t-2 border-black-pure h-20 flex items-center justify-between px-8 z-30 relative">
            <div className="flex items-center gap-6 flex-grow max-w-md">
              <span className="text-xs font-mono font-black text-black-pure uppercase tracking-widest">
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
              className="text-lg font-mono font-black text-black-pure tabular-nums"
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