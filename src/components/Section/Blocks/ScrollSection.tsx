"use client"
import React, { useRef, useEffect, useState } from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import RacingLinesBackground from '../Backgrounds/RacingLinesBackground'

export interface ScrollItem {
  id: string
  title: string
  description: string
  image?: string
  percentage?: number
}

interface ScrollSectionProps {
  id: string
  title: string
  subtitle: string
  items: ScrollItem[]
  variant?: 'parallax' | 'sticky' | 'reveal'
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  title,
  subtitle,
  items,
  variant = 'reveal',
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <RacingLinesBackground opacity={0.3} />
}) => {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleIndices(prev => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )
    itemRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.setAttribute('data-index', String(idx))
        observer.observe(ref)
      }
    })
    return () => observer.disconnect()
  }, [items])

  if (variant === 'sticky') {
    return (
      <section className="relative w-full bg-background py-16 md:py-24">
        {background}
        <div className="relative z-10 container mx-auto px-4">
          <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(items.length)} />
          <div className="mt-12 space-y-24">
            {items.map((item, idx) => (
              <div key={item.id} className="relative min-h-[400px] flex items-center justify-center">
                <div className="sticky top-24 bg-card border border-border rounded-2xl p-8 md:p-12 w-full max-w-4xl mx-auto shadow-xl transition-all duration-500 transform hover:scale-105">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {item.image && <img src={item.image} alt={item.title} className="w-48 h-48 object-cover rounded-full border-4 border-primary" />}
                    <div>
                      <span className="text-primary font-mono text-sm font-bold">0{idx + 1}</span>
                      <h3 className="text-3xl font-bold uppercase tracking-tight text-foreground mt-2">{item.title}</h3>
                      <p className="text-muted-foreground mt-4">{item.description}</p>
                      {item.percentage && (
                        <div className="mt-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${item.percentage}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {ctaLabel && ctaPath && <div className="flex justify-center mt-16"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
          <SectionFooter variant={footerVariant} />
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(items.length)} />
        <div className="mt-12 space-y-16">
          {items.map((item, idx) => (
            <div
              key={item.id}
              ref={el => { itemRefs.current[idx] = el }}
              className={`transition-all duration-700 transform ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-card border border-border rounded-2xl hover:shadow-2xl transition-all duration-500 group">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent" />
                  </div>
                  <h3 className="text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground mt-4 leading-relaxed">{item.description}</p>
                  {item.percentage && (
                    <div className="mt-6 w-48">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <p className="text-right text-xs text-muted-foreground mt-1">{item.percentage}% complete</p>
                    </div>
                  )}
                </div>
                {item.image && (
                  <div className="w-full md:w-64 h-48 overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-16"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default ScrollSection
