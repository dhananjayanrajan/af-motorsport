"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Layers, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
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
      const windowHeight = window.innerHeight

      const totalHeight = rect.height - windowHeight
      const currentScroll = Math.max(0, -rect.top)
      const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1)

      setScrollProgress(progress)
      setActiveIndex(Math.min(Math.floor(progress * features.length), features.length - 1))
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [features.length])

  return (
    <section id={id} ref={containerRef} className="relative w-full bg-white-pure border-t-2 border-black-pure">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(features.length).padStart(2, '0')}
      />

      <div className="relative">
        <div className="hidden lg:flex absolute left-0 top-0 h-full w-16 border-r-2 border-black-pure z-40 bg-white-pure flex-col items-center py-24 gap-8">
          <div className="sticky top-24 flex flex-col items-center gap-8">
            {features.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className={`text-[10px] font-mono font-black transition-colors duration-300 ${i === activeIndex ? 'text-black-pure' : 'text-neutral-300'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="w-1 transition-all duration-500 ease-in-out"
                  style={{
                    height: i === activeIndex ? '48px' : '8px',
                    background: i === activeIndex ? 'var(--primary-500)' : 'var(--neutral-200)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className="sticky top-0 h-screen w-full flex items-stretch border-b-2 border-black-pure bg-white-pure overflow-hidden group/item"
          >
            <div className="flex flex-col lg:flex-row w-full pl-0 lg:pl-16">
              <div className="flex-1 flex flex-col border-r-2 border-black-pure">
                <div className="flex-1 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-base font-mono font-black bg-black-pure text-white-pure px-3 py-1 uppercase tracking-widest group-hover/item:bg-primary-500 group-hover/item:text-black-pure transition-colors duration-300">
                      {labels.specIndex}
                    </span>
                    <div className="h-[2px] flex-grow bg-black-pure/10">
                      <motion.div
                        className="h-full bg-primary-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black uppercase text-black-pure leading-tight mb-6 transition-transform duration-500 group-hover/item:translate-x-2">
                    {feature.title}
                  </h3>

                  <p className="text-base font-black uppercase text-black-pure/50 max-w-md leading-relaxed mb-10 tracking-tight">
                    {feature.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-l-2 border-black-pure mb-10">
                    {feature.stats?.map((stat, sIdx) => (
                      <div key={sIdx} className="p-6 border-r-2 border-b-2 border-black-pure bg-white-pure hover:bg-primary-500 group/stat transition-all duration-200">
                        <span className="block text-[10px] font-mono font-black text-black-pure/40 group-hover/stat:text-black-pure uppercase mb-2">
                          {stat.label}
                        </span>
                        <span className="text-lg font-black text-black-pure tabular-nums">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={ctaPath ? `${ctaPath}/${feature.id}` : `/${feature.id}`}
                    className="self-start inline-flex items-center gap-6 bg-white-pure text-black-pure px-10 py-5 text-base font-mono font-black uppercase tracking-widest hover:bg-black-pure hover:text-white-pure transition-all group/btn border-2 border-black-pure shadow-[4px_4px_0px_var(--primary-500)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                  >
                    {labels.ctaLabel}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                  </Link>
                </div>

                <div className="h-24 md:h-32 border-t-2 border-black-pure flex bg-white-100">
                  <div className="w-24 md:w-32 border-r-2 border-black-pure flex items-center justify-center bg-white-pure group-hover/item:bg-primary-500 transition-colors duration-500">
                    <LayoutGrid className="w-8 h-8 text-black-pure" />
                  </div>
                  <div className="flex-grow flex items-center px-8 relative overflow-hidden">
                    <span className="text-base font-mono font-black text-black-pure uppercase tracking-widest z-10">
                      {labels.statusLabel}
                    </span>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-black-pure/10 group-hover/item:bg-primary-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex flex-1 relative bg-neutral-200 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${feature.id}/1200/1600`}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover/item:scale-100"
                />

                <div className="absolute inset-0 bg-primary-500/0 group-hover/item:bg-primary-500/10 transition-colors duration-500" />

                <div className="absolute top-0 left-0 bg-white-pure border-r-2 border-b-2 border-black-pure px-6 py-4 font-mono font-black text-base italic">
                  {String(idx + 1).padStart(3, '0')}
                </div>

                <div className="absolute bottom-12 right-12 bg-black-pure text-white-pure p-8 border-2 border-primary-500 shadow-[12px_12px_0px_var(--white-pure)] group-hover/item:shadow-[-12px_-12px_0px_var(--primary-500)] transition-all duration-700">
                  <div className="scale-150 text-primary-500">
                    {feature.icon || <Layers className="w-8 h-8" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 h-24 md:h-32 w-24 md:w-32 z-50">
        <div className="sticky bottom-0 h-full w-full bg-white-pure border-l-2 border-t-2 border-black-pure flex flex-col items-center justify-center group hover:bg-black-pure transition-colors duration-300">
          <span className="text-[10px] font-mono font-black text-black-pure/40 group-hover:text-primary-500 uppercase mb-1">{labels.indexLabel}</span>
          <span className="text-2xl font-mono font-black text-black-pure group-hover:text-white-pure tabular-nums">
            {Math.round(scrollProgress * 100)}%
          </span>
          <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 transform origin-left transition-transform duration-300" style={{ transform: `scaleX(${scrollProgress})` }} />
        </div>
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default FeatureSection;