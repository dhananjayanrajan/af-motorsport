"use client"
import { ArrowRight } from 'lucide-react'
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
  columns = 3,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  const getImageUrl = (image?: string, index: number = 0) => {
    if (image && image.trim() !== '') return image
    return `https://picsum.photos/id/${(index + 40) * 3}/800/600`
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (obsEntries) => {
        obsEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleIndices(prev => new Set(prev).add(index))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    itemRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.setAttribute('data-index', String(idx))
        observer.observe(ref)
      }
    })
    return () => observer.disconnect()
  }, [features])

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(features.length).padStart(2, '0')}
      />

      <div className="w-full px-6 md:px-12 py-12 md:py-20">
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              ref={el => { itemRefs.current[idx] = el }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group transition-all duration-700 ease-out ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            >
              <div className="relative h-full flex flex-col bg-white-pure border border-black-pure">
                <div className="relative aspect-[4/3] overflow-hidden bg-black-pure border-b border-black-pure">
                  <img
                    src={getImageUrl(feature.image, idx)}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/20 transition-all duration-300" />
                  <div className="absolute top-3 left-3 bg-black-pure px-2 py-1 border border-primary-500">
                    <span className="text-xs font-mono font-black text-primary-500">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white-pure px-2 py-1 border border-black-pure group-hover:bg-primary-500 transition-colors duration-300">
                    <span className="text-[8px] font-mono font-black text-black-pure uppercase tracking-wider group-hover:text-black-pure">
                      {labels.specIndex}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  {feature.icon && (
                    <div className="mb-4">
                      <div className="inline-flex w-10 h-10 bg-black-pure border border-black-pure items-center justify-center">
                        <div className="text-primary-500 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-mono font-black uppercase tracking-tighter leading-tight mb-2">
                    {feature.title}
                  </h3>

                  <div className="w-12 h-0.5 bg-primary-500 mb-4 group-hover:w-20 transition-all duration-300" />

                  <p className="text-xs font-mono font-bold text-black-pure/70 leading-relaxed mb-6 line-clamp-3">
                    {feature.description}
                  </p>

                  {feature.stats && feature.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {feature.stats.map((stat, statIdx) => (
                        <div key={statIdx} className="bg-black-pure p-2">
                          <p className="text-[8px] font-mono font-black text-primary-500 uppercase tracking-wider mb-0.5">
                            {stat.label}
                          </p>
                          <p className="text-xs font-mono font-black text-white-pure uppercase truncate">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-black-pure">
                    <Link
                      href={ctaPath ? `${ctaPath}/${feature.id}` : `/${feature.id}`}
                      className="group/link inline-flex items-center justify-between w-full py-2.5 px-3 bg-black-pure text-white-pure font-mono font-black text-[10px] uppercase tracking-wider transition-all duration-300 hover:bg-primary-500 hover:text-black-pure active:scale-95"
                    >
                      <span>{labels.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {ctaPath && labels.ctaLabel && (
        <div className="px-6 md:px-12 pb-12 md:pb-20 flex justify-center">
          <Link
            href={ctaPath}
            className="inline-flex items-center gap-3 px-12 py-4 bg-black-pure text-white-pure font-mono font-black text-sm uppercase tracking-wider transition-all duration-300 border border-black-pure hover:bg-primary-500 hover:text-black-pure focus:bg-primary-500 focus:text-black-pure focus:outline-none focus:ring-1 focus:ring-primary-500 active:scale-95"
          >
            <span>{labels.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default FeatureSection