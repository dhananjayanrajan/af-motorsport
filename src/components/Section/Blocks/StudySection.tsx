"use client"
import React, { useState } from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import MosaicBackground from '../Backgrounds/MosaicBackground'

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
  background = <MosaicBackground opacity={0.3} />
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  if (variant === 'featured' && studies[0]) {
    const featured = studies[0]
    return (
      <section className="relative w-full bg-background py-16 md:py-24">
        {background}
        <div className="relative z-10 container mx-auto px-4">
          <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(studies.length)} />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">{featured.title}</h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">{featured.description}</p>
              {featured.metrics && (
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {featured.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 bg-card border border-border rounded-lg">
                      <p className="text-2xl font-bold text-primary">{metric.value}</p>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {featured.tags && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {featured.tags.map(tag => <span key={tag} className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full">{tag}</span>)}
                </div>
              )}
              {(featured.ctaLabel || ctaLabel) && (
                <div className="mt-8">
                  <SectionButton label={featured.ctaLabel || ctaLabel!} href={featured.ctaHref || ctaPath!} variant="primary" size="lg" />
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <img src={featured.image} alt={featured.title} className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(studies.length)} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {studies.map((study) => (
            <div
              key={study.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredId(study.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {hoveredId === study.id && <div className="absolute inset-0 bg-primary/20" />}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{study.title}</h3>
                <p className="text-muted-foreground mt-2 line-clamp-3">{study.description}</p>
                {study.metrics && (
                  <div className="flex gap-4 mt-4 pt-4 border-t border-border">
                    {study.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx}>
                        <p className="text-lg font-bold text-primary">{metric.value}</p>
                        <p className="text-xs text-muted-foreground uppercase">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                {(study.ctaLabel || ctaLabel) && (
                  <div className="mt-6">
                    <SectionButton label={study.ctaLabel || ctaLabel!} href={study.ctaHref || ctaPath!} variant="outline" size="sm" fullWidth />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {ctaLabel && ctaPath && !studies.some(s => s.ctaLabel) && (
          <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>
        )}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default StudySection
