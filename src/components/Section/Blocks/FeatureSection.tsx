"use client"
import Link from 'next/link'
import React from 'react'
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
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  const getImageUrl = (image?: string, index: number = 0) => {
    if (image && image.trim() !== '') return image
    return `https://picsum.photos/id/${(index + 40) * 3}/800/600`
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(features.length).padStart(2, '0')}
      />

      <div className={`grid ${gridCols[columns]} w-full border-b border-black-pure`}>
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className="group relative flex flex-col bg-white-pure border-r border-b border-black-pure last:border-r-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-1 lg:[&:nth-child(3n)]:border-r-0 overflow-hidden"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-black text-black-pure/20 uppercase mb-1 tracking-widest">
                    {labels.specIndex}
                  </span>
                  <span className="text-2xl font-mono font-black text-black-pure italic">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {feature.icon && (
                  <div className="w-12 h-12 flex items-center justify-center border border-black-pure bg-white-pure group-hover:bg-primary-500 transition-colors duration-300">
                    <div className="scale-110 group-hover:rotate-12 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                )}
              </div>

              {feature.image && (
                <div className="relative w-full aspect-video overflow-hidden border border-black-pure mb-8 bg-black-pure">
                  <img
                    src={getImageUrl(feature.image, idx)}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 border-[8px] border-black-pure/10 pointer-events-none" />
                </div>
              )}

              <h3 className="text-2xl font-mono font-black uppercase tracking-tighter text-black-pure leading-none mb-4 group-hover:text-primary-500 transition-colors">
                {feature.title}
              </h3>

              <p className="text-[11px] font-mono font-black uppercase text-black-pure/50 leading-relaxed mb-8 flex-grow">
                {feature.description}
              </p>

              {feature.stats && feature.stats.length > 0 && (
                <div className="mt-auto grid grid-cols-2 gap-px bg-black-pure border border-black-pure">
                  {feature.stats.map((stat, statIdx) => (
                    <div key={statIdx} className="bg-white-pure p-4 group-hover:bg-slate-50 transition-colors">
                      <p className="text-[9px] font-mono font-black text-black-pure/30 uppercase tracking-[0.2em] mb-1">
                        {stat.label}
                      </p>
                      <p className="text-sm font-mono font-black text-black-pure uppercase tabular-nums">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary-500 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        ))}
      </div>

      {ctaPath && labels.ctaLabel && (
        <div className="flex items-center justify-center p-16 bg-white-pure">
          <Link
            href={ctaPath}
            className="group flex items-center gap-8 px-12 py-6 border border-black-pure bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-all duration-300"
          >
            <span className="text-xs font-mono font-black uppercase tracking-[0.4em]">
              {labels.ctaLabel}
            </span>
            <div className="w-12 h-px bg-white-pure/20 group-hover:bg-black-pure group-hover:w-16 transition-all duration-300" />
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default FeatureSection