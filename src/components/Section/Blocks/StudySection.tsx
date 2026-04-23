"use client"
import React, { useState } from 'react'
import MosaicBackground from '../Backgrounds/MosaicBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface Study {
  id: string
  title: string
  description: string
  image: string
  metrics?: { label: string; value: string }[]
  tags?: string[]
  ctaLabel?: string
  ctaHref?: string
}

interface StudySectionProps {
  id: string
  title: string
  subtitle: string
  studies: Study[]
  variant?: 'grid' | 'featured'
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const StudySection: React.FC<StudySectionProps> = ({
  id,
  title,
  subtitle,
  studies,
  variant = 'grid',
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <MosaicBackground opacity={1} />
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {background}
      </div>
      <div className="relative z-10 w-full">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(studies.length).padStart(2, '0')} />
        {children}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )

  if (variant === 'featured' && studies[0]) {
    const featured = studies[0]
    return (
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black-pure bg-black-pure gap-[1px]">
          <div className="p-8 md:p-16 bg-white-pure flex flex-col justify-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {featured.tags?.map(tag => (
                  <span key={tag} className="text-[8px] font-mono font-black border border-black-pure px-2 py-1 uppercase tracking-widest bg-neutral-100">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-4xl md:text-6xl font-mono font-black uppercase tracking-tighter text-black-pure leading-[0.9]">
                {featured.title}
              </h3>
              <p className="text-[11px] font-mono font-bold text-neutral-500 uppercase leading-relaxed max-w-xl">
                {featured.description}
              </p>

              {featured.metrics && (
                <div className="grid grid-cols-2 gap-px bg-black-pure border border-black-pure mt-4">
                  {featured.metrics.map((metric, idx) => (
                    <div key={idx} className="p-6 bg-white-pure hover:bg-primary transition-colors group">
                      <p className="text-3xl font-mono font-black text-black-pure leading-none mb-2 tabular-nums">{metric.value}</p>
                      <p className="text-[8px] font-mono font-black text-neutral-400 group-hover:text-black-pure uppercase tracking-widest">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {(featured.ctaLabel || ctaLabel) && (
                <div className="mt-8">
                  <SectionButton
                    label={featured.ctaLabel || ctaLabel!}
                    href={featured.ctaHref || ctaPath!}
                    variant="primary"
                    size="lg"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto bg-neutral-200 overflow-hidden group">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105" />
            <div className="absolute inset-0 border-[24px] border-black-pure opacity-5 pointer-events-none" />
          </div>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black-pure bg-black-pure gap-[1px]">
        {studies.map((study) => (
          <div
            key={study.id}
            className="group relative flex flex-col bg-white-pure transition-colors hover:bg-neutral-50"
            onMouseEnter={() => setHoveredId(study.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative h-64 border-b border-black-pure overflow-hidden">
              <img src={study.image} alt={study.title} className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110" />
              <div className="absolute top-4 left-4 bg-black-pure px-2 py-1 border border-black-pure shadow-[3px_3px_0px_0px_#00FF41]">
                <span className="text-[8px] font-mono font-black text-white-pure uppercase tracking-widest">
                  {study.id.slice(0, 8)}
                </span>
              </div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
              <h3 className="text-xl font-mono font-black uppercase text-black-pure leading-none mb-4 group-hover:text-primary transition-colors">
                {study.title}
              </h3>
              <p className="text-[10px] font-mono font-bold text-neutral-500 uppercase leading-tight line-clamp-3 mb-8">
                {study.description}
              </p>

              {study.metrics && (
                <div className="mt-auto pt-6 border-t border-black-pure flex gap-8">
                  {study.metrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx}>
                      <p className="text-lg font-mono font-black text-black-pure leading-none mb-1 tabular-nums">{metric.value}</p>
                      <p className="text-[7px] font-mono font-black text-neutral-400 uppercase tracking-widest">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {(study.ctaLabel || ctaLabel) && (
                <div className="mt-8">
                  <SectionButton
                    label={study.ctaLabel || ctaLabel!}
                    href={study.ctaHref || ctaPath!}
                    variant="outline"
                    size="sm"
                    fullWidth
                  />
                </div>
              )}
            </div>

            <div className={`absolute top-0 right-0 w-8 h-8 bg-primary border-l border-b border-black-pure transition-transform duration-200 ${hoveredId === study.id ? 'translate-x-0' : 'translate-x-full'}`} />
          </div>
        ))}
      </div>

      {ctaLabel && ctaPath && !studies.some(s => s.ctaLabel) && (
        <div className="p-16 flex justify-center bg-white-pure border-b border-black-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}
    </SectionWrapper>
  )
}

export default StudySection