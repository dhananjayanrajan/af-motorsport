"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Layers, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import IsometricBackground from '../Backgrounds/IsometricBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface Feature {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      const headerHeight = 48
      const sectionTop = rect.top - headerHeight
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight - headerHeight

      const progress = Math.min(Math.max(-sectionTop / (sectionHeight - viewportHeight), 0), 1)

      setScrollProgress(progress)
      setActiveIndex(Math.min(Math.floor(progress * features.length), features.length - 1))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [features.length])

  return (
    <section id={id} ref={containerRef} className="relative w-full py-12 md:py-20 lg:py-24 bg-background">
      <IsometricBackground />
      <div className="container px-0 md:px-4">
        <div className="relative border-2 border-black-pure bg-white-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-4 md:mx-0 bg-white-pure z-1">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(features.length).padStart(2, '0')}
          />

          <div className="relative flex flex-col md:flex-row items-start">
            <div className="hidden md:flex sticky top-12 h-[600px] w-16 border-r-2 border-black-pure bg-neutral-50 flex-col items-center py-12 gap-6 z-20 shrink-0">
              {features.map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className={`text-[8px] font-mono font-black transition-colors duration-300 ${i === activeIndex ? 'text-black-pure' : 'text-neutral-300'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-1 transition-all duration-500 ease-in-out"
                    style={{
                      height: i === activeIndex ? '32px' : '4px',
                      background: i === activeIndex ? 'var(--primary-500)' : 'var(--neutral-200)'
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex-grow w-full">
              {features.map((feature, idx) => (
                <div
                  key={feature.id}
                  className="relative md:sticky md:top-12 h-auto md:h-[600px] flex flex-col lg:flex-row bg-white-pure border-b-2 border-black-pure last:border-b-0 group/item overflow-hidden z-10"
                >
                  <div className="flex-1 flex flex-col border-r-0 lg:border-r-2 border-black-pure overflow-hidden">
                    <div className="flex-1 p-6 md:p-10 flex flex-col min-w-0">
                      <div className="flex items-center gap-3 mb-6 shrink-0">
                        <span className="text-[9px] font-mono font-black bg-black-pure text-white-pure px-2 py-1 uppercase tracking-widest group-hover/item:bg-primary-500 group-hover/item:text-black-pure transition-colors duration-300">
                          {labels.specIndex}
                        </span>
                        <div className="h-[2px] flex-grow bg-black-pure/10">
                          <motion.div
                            className="h-full bg-primary-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>

                      <div className="mb-4 shrink-0">
                        <h3 className="text-xl md:text-2xl font-black uppercase text-black-pure group-hover/item:translate-x-2 transition-transform duration-500 break-words line-clamp-2">
                          {feature.title}
                        </h3>
                      </div>

                      <div className="mb-8 shrink-0">
                        <p className="text-[11px] font-black uppercase text-black-pure/50 max-w-full leading-relaxed tracking-tight break-words line-clamp-4">
                          {feature.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 border-t-2 border-l-2 border-black-pure mb-6 shrink-0">
                        {feature.stats?.slice(0, 4).map((stat, sIdx) => (
                          <div key={sIdx} className="p-3 border-r-2 border-b-2 border-black-pure hover:bg-primary-500 transition-colors duration-200 min-w-0">
                            <span className="block text-[8px] font-mono font-black text-black-pure/40 uppercase break-all">
                              {stat.label}
                            </span>
                            <span className="text-sm font-black text-black-pure tabular-nums break-words">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto shrink-0 py-4 lg:py-0">
                        <Link
                          href={ctaPath ? `${ctaPath}/${feature.id}` : `/${feature.id}`}
                          className="inline-flex items-center gap-4 bg-white-pure text-black-pure px-6 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-2 border-black-pure hover:bg-black-pure hover:text-white-pure transition-all shadow-[4px_4px_0px_var(--primary-500)] hover:shadow-none"
                        >
                          {labels.ctaLabel}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="h-16 border-t-2 border-black-pure flex bg-neutral-50 shrink-0">
                      <div className="w-16 border-r-2 border-black-pure flex items-center justify-center bg-white-pure group-hover/item:bg-primary-500 transition-colors duration-500">
                        <LayoutGrid className="w-5 h-5 text-black-pure" />
                      </div>
                      <div className="flex-grow flex items-center px-6 overflow-hidden">
                        <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest truncate">
                          {labels.statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 relative bg-neutral-200 h-[300px] md:h-full lg:min-h-0">
                    <img
                      src={feature.image || `https://picsum.photos/seed/${feature.id}/1200/1600`}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-105"
                    />
                    <div className="absolute top-0 left-0 bg-white-pure border-r-2 border-b-2 border-black-pure px-4 py-2 font-mono font-black text-sm italic">
                      {String(idx + 1).padStart(3, '0')}
                    </div>
                    <div className="absolute bottom-6 right-6 bg-black-pure text-white-pure p-4 border-2 border-primary-500 shadow-[8px_8px_0px_var(--white-pure)]">
                      <div className="text-primary-500">
                        {feature.icon || <Layers className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white-pure border-t-2 border-black-pure h-16 flex items-center justify-between px-6 z-30 relative">
            <div className="flex items-center gap-4 flex-grow max-w-xs">
              <span className="text-[9px] font-mono font-black text-black-pure/40 uppercase tracking-widest">
                {labels.indexLabel}
              </span>
              <div className="h-1 flex-grow bg-neutral-100 relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary-500"
                  animate={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-mono font-black text-black-pure tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          <SectionFooter variant={footerVariant} />
        </div>
      </div>
    </section>
  )
}

export default FeatureSection;