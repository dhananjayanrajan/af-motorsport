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

      <div className="w-full px-4 md:px-8 py-10 md:py-16 bg-neutral-100">
        <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              ref={el => { itemRefs.current[idx] = el }}
              className={`group relative flex flex-col bg-white-pure border border-black-pure transition-all duration-200 shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-[0.98] ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
            >
              <div className="relative aspect-video overflow-hidden border-b border-black-pure bg-black-pure">
                <img
                  src={getImageUrl(feature.image, idx)}
                  alt={feature.title}
                  className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                />

                <div className="absolute top-0 left-0 bg-primary px-2 py-0.5 border-b border-r border-black-pure">
                  <span className="text-[10px] font-mono font-black text-black-pure tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute bottom-0 right-0 bg-white-pure px-2 py-0.5 border-t border-l border-black-pure">
                  <span className="text-[7px] font-mono font-black text-black-pure uppercase tracking-widest">
                    {labels.specIndex}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  {feature.icon && (
                    <div className="w-8 h-8 bg-black-pure flex items-center justify-center border border-black-pure group-hover:bg-primary transition-colors">
                      <div className="text-primary group-hover:text-black-pure scale-75">
                        {feature.icon}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-black-pure" />
                    <div className="w-1 h-1 bg-black-pure group-hover:bg-primary transition-colors" />
                    <div className="w-1 h-1 bg-black-pure" />
                  </div>
                </div>

                <h3 className="text-base font-mono font-black uppercase tracking-tight leading-none mb-3 group-hover:translate-x-1 transition-transform">
                  {feature.title}
                </h3>

                <p className="text-[10px] font-mono font-bold text-black-pure uppercase tracking-wide leading-relaxed mb-6 line-clamp-3">
                  {feature.description}
                </p>

                {feature.stats && feature.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-[1px] bg-black-pure border border-black-pure mb-6">
                    {feature.stats.map((stat, statIdx) => (
                      <div key={statIdx} className="bg-white-pure p-2 group-hover:bg-neutral-50 transition-colors">
                        <p className="text-[7px] font-mono font-black text-neutral-500 uppercase mb-1">
                          {stat.label}
                        </p>
                        <p className="text-[10px] font-mono font-black text-black-pure uppercase truncate tabular-nums">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto">
                  <Link
                    href={ctaPath ? `${ctaPath}/${feature.id}` : `/${feature.id}`}
                    className="flex items-center justify-between w-full py-2 px-3 border border-black-pure bg-white-pure text-black-pure font-mono font-black text-[9px] uppercase tracking-widest transition-all hover:bg-black-pure hover:text-primary"
                  >
                    <span>{labels.ctaLabel}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {ctaPath && labels.ctaLabel && (
        <div className="p-12 flex justify-center bg-white-pure border-t border-black-pure">
          <Link
            href={ctaPath}
            className="flex items-center gap-3 px-10 py-4 bg-white-pure text-black-pure font-mono font-black text-xs uppercase tracking-[0.3em] border border-black-pure shadow-[6px_6px_0px_0px_#000000] transition-all hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] hover:bg-primary active:bg-black-pure active:text-primary"
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