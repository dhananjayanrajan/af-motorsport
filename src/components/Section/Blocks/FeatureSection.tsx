// FeatureSection.tsx
"use client"
import { ArrowRight, Layers } from 'lucide-react'
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
  labels = {
    specIndex: '',
    statsLabel: '',
    ctaLabel: ''
  },
  ctaPath,
  headerVariant = 1,
  footerVariant = 1
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInSection, setIsInSection] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const visible = rect.top < windowHeight && rect.bottom > 0
      setIsInSection(visible)

      if (visible) {
        const totalHeight = rect.height - windowHeight
        const currentScroll = Math.max(0, -rect.top)
        const progress = currentScroll / totalHeight
        setScrollProgress(Math.min(Math.max(progress, 0), 1))

        const calculatedIndex = Math.floor(progress * features.length)
        setActiveIndex(Math.min(calculatedIndex, features.length - 1))
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [id, features.length])

  const scrollToNext = () => {
    const section = document.getElementById(id)
    if (section) {
      const nextSibling = section.nextElementSibling
      if (nextSibling) {
        nextSibling.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({
          top: section.offsetTop + section.offsetHeight,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section id={id} ref={containerRef} className="relative w-full bg-white-pure border-t border-black-pure">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(features.length).padStart(2, '0')}
      />

      <div className="relative">
        <div className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-6 pointer-events-none">
          {features.map((_, i) => (
            <div
              key={i}
              className={`h-10 w-[2px] transition-all duration-700 ${i === activeIndex ? 'bg-primary-500' : 'bg-black-pure/10'}`}
            />
          ))}
        </div>

        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className="sticky top-0 h-screen w-full flex items-center justify-center border-b border-black-pure overflow-hidden group/item bg-white-pure"
          >
            <div className="relative z-10 w-full max-w-[1400px] px-6 sm:px-10 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

              <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-primary-500">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px w-10 bg-black-pure/20 transition-all duration-500 group-hover/item:w-20" />
                  <span className="text-base font-bold text-black-pure/60 transition-colors duration-300 group-hover/item:text-primary-500">
                    {labels.specIndex}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black-pure transition-colors duration-300 group-hover/item:text-primary-500">
                    {feature.title}
                  </h3>
                  <p className="text-base font-medium text-black-pure/60">
                    {feature.description}
                  </p>
                </div>

                {feature.stats && feature.stats.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {feature.stats.map((stat, statIdx) => (
                      <div key={statIdx} className="flex flex-col p-5 bg-neutral-50 border-l-2 border-black-pure hover:border-primary-500 transition-all duration-500 hover:translate-x-1">
                        <span className="text-base font-bold text-black-pure/60 mb-1">
                          {stat.label}
                        </span>
                        <span className="text-2xl font-bold text-black-pure">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4">
                  <Link
                    href={ctaPath ? `${ctaPath}/${feature.id}` : `/${feature.id}`}
                    className="inline-flex items-center group/link"
                  >
                    <div className="relative overflow-hidden bg-black-pure px-8 py-4 flex items-center gap-4 transition-all duration-500 hover:bg-primary-500 hover:translate-x-1">
                      <span className="relative z-10 text-base font-bold text-white-pure group-hover/link:text-black-pure transition-colors duration-300">
                        {labels.ctaLabel}
                      </span>
                      <ArrowRight className="relative z-10 w-5 h-5 text-white-pure group-hover/link:text-black-pure group-hover/link:translate-x-2 transition-all duration-300" />
                    </div>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex lg:col-span-6 relative aspect-[4/3] items-center justify-center overflow-hidden border border-black-pure bg-neutral-100">
                <img
                  src={feature.image || `https://picsum.photos/seed/${feature.id}/800/600`}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 bg-black-pure/0 group-hover/item:bg-black-pure/10 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 bg-white-pure p-6 border-t border-r border-black-pure transition-all duration-500 translate-y-full group-hover/item:translate-y-0">
                  {feature.icon ? (
                    <div className="text-black-pure w-8 h-8">
                      {feature.icon}
                    </div>
                  ) : (
                    <Layers className="w-8 h-8 text-black-pure transition-transform duration-300 group-hover/item:rotate-12" />
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div
        className={`fixed bottom-8 right-8 z-[100] transition-all duration-700 ${isInSection ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <button
          onClick={scrollToNext}
          className="w-20 h-20 bg-white-pure border border-black-pure flex flex-col items-center justify-center group hover:bg-black-pure transition-all duration-500 hover:scale-105"
        >
          <div className="w-6 h-6 border-t-2 border-r-2 border-black-pure rotate-45 group-hover:border-white-pure transition-all duration-300" />
          <span className="text-base font-bold text-black-pure group-hover:text-white-pure mt-2 transition-colors duration-300">
            {Math.round(scrollProgress * 100)}%
          </span>
          <div
            className="absolute bottom-0 left-0 h-[3px] bg-primary-500 transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </button>
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default FeatureSection