"use client"

import React, { useState } from 'react'
import MosaicBackground from '../Backgrounds/MosaicBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionScroller from '../Components/SectionScroller'

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
    <section id={id} className="relative w-full bg-background border-t border-border overflow-hidden transition-all duration-700 ease-in-out hover:bg-white-50">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-pulse">
        {background}
      </div>
      <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          variant={headerVariant}
          metadata={String(studies.length).padStart(2, '0')}
        />
        {children}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )

  if (variant === 'featured' && studies[0]) {
    const featured = studies[0]
    return (
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border bg-border gap-px">
          <div className="p-8 md:p-16 bg-card flex flex-col justify-center transition-all duration-500 hover:shadow-[inset_0_0_100px_rgba(0,255,65,0.05)]">
            <div className="flex flex-col gap-6 animate-in slide-in-from-left-12 duration-700">
              <div className="flex flex-wrap gap-2">
                {featured.tags?.map(tag => (
                  <span key={tag} className="text-base font-sans font-bold border border-primary-500 px-3 py-1 uppercase tracking-widest bg-primary-50 text-primary-950 hover:bg-primary-500 hover:text-black-pure transition-all duration-300 transform hover:-rotate-2 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-sans font-black uppercase tracking-tighter text-foreground leading-tight hover:translate-x-2 transition-transform duration-300">
                {featured.title}
              </h3>
              <p className="text-base font-sans font-medium text-muted-foreground uppercase leading-relaxed max-w-xl">
                {featured.description}
              </p>

              {featured.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border mt-4 overflow-hidden rounded-lg">
                  {featured.metrics.map((metric, idx) => (
                    <div key={idx} className="p-6 bg-surface-default hover:bg-primary-100 transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary-glow translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <div className="relative z-10">
                        <p className="text-2xl font-sans font-black text-foreground leading-none mb-2 tabular-nums group-hover:scale-110 transition-transform origin-left">{metric.value}</p>
                        <p className="text-base font-sans font-bold text-muted-foreground group-hover:text-primary-900 uppercase tracking-widest">{metric.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(featured.ctaLabel || ctaLabel) && (
                <div className="mt-8 transform transition-transform hover:scale-105 active:scale-95 origin-left">
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
            <img
              src={`https://picsum.photos/seed/${featured.id}/1200/1200`}
              alt={featured.title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border-[12px] border-primary opacity-0 group-hover:opacity-10 group-hover:border-[32px] transition-all duration-700 pointer-events-none" />
          </div>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-b border-border bg-border gap-px">
        {studies.map((study, index) => (
          <div
            key={study.id}
            className="group relative flex flex-col bg-card transition-all duration-500 hover:z-20 hover:shadow-2xl hover:-translate-y-1"
            onMouseEnter={() => setHoveredId(study.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-64 border-b border-border overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${study.id}/800/600`}
                alt={study.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute top-4 left-4 bg-primary px-3 py-1 border border-black-pure shadow-[4px_4px_0px_0px_#000000] group-hover:shadow-[6px_6px_0px_0px_#000000] group-hover:-translate-y-1 transition-all">
                <span className="text-base font-sans font-black text-black-pure uppercase tracking-widest">
                  {study.id.slice(0, 4)}
                </span>
              </div>
            </div>

            <div className="p-8 flex-grow flex flex-col bg-surface-default group-hover:bg-primary-50 transition-colors duration-500">
              <h3 className="text-xl font-sans font-black uppercase text-foreground leading-none mb-4 group-hover:text-primary-700 transition-colors duration-300">
                {study.title}
              </h3>
              <p className="text-base font-sans font-medium text-muted-foreground uppercase leading-tight line-clamp-3 mb-8 group-hover:text-foreground transition-colors">
                {study.description}
              </p>

              {study.metrics && (
                <div className="mt-auto pt-6 border-t border-border flex gap-8">
                  {study.metrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx} className="group/metric">
                      <p className="text-xl font-sans font-black text-foreground leading-none mb-1 tabular-nums group-hover/metric:text-primary-600 transition-colors">{metric.value}</p>
                      <p className="text-base font-sans font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {(study.ctaLabel || ctaLabel) && (
                <div className="mt-8 transform group-hover:translate-x-2 transition-transform duration-300">
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

            <div className={`absolute top-0 right-0 w-12 h-12 bg-primary border-l border-b border-border transition-all duration-500 ease-elastic ${hoveredId === study.id ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="flex items-center justify-center h-full animate-bounce">
                <div className="w-2 h-2 bg-black-pure rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MECHANICAL SEPARATOR */}
      <SectionScroller
        items={studies.map(s => s.title)}
        variant={2}
        velocity={25}
      />

      {ctaLabel && ctaPath && !studies.some(s => s.ctaLabel) && (
        <div className="p-16 flex justify-center bg-background border-b border-border group">
          <div className="transform group-hover:scale-110 transition-transform duration-500">
            <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

export default StudySection