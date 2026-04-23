"use client"
import React, { useState, useEffect, useRef } from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import WeaveBackground from '../Backgrounds/WeaveBackground'

export interface ListEntry {
  id: string
  title: string
  subtitle?: string
  status?: string
  tag?: string
  href?: string
  timestamp?: string
  metadata?: Record<string, string>
}

interface ListSectionProps {
  id: string
  title: string
  subtitle: string
  entries: ListEntry[]
  variant?: 'simple' | 'detailed' | 'compact'
  showStatus?: boolean
  showTimestamp?: boolean
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const ListSection: React.FC<ListSectionProps> = ({
  id,
  title,
  subtitle,
  entries,
  variant = 'detailed',
  showStatus = true,
  showTimestamp = true,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <WeaveBackground opacity={0.3} />
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
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )
    itemRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.setAttribute('data-index', String(idx))
        observer.observe(ref)
      }
    })
    return () => observer.disconnect()
  }, [entries])

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-muted-foreground'
    const s = status.toLowerCase()
    if (s.includes('active') || s.includes('open')) return 'bg-green-500'
    if (s.includes('completed') || s.includes('closed')) return 'bg-blue-500'
    if (s.includes('pending')) return 'bg-yellow-500'
    if (s.includes('cancelled')) return 'bg-red-500'
    return 'bg-primary'
  }

  if (variant === 'compact') {
    return (
      <section className="relative w-full bg-background py-16 md:py-24">
        {background}
        <div className="relative z-10 container mx-auto px-4">
          <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(entries.length)} />
          <div className="mt-8 divide-y divide-border border border-border rounded-lg overflow-hidden">
            {entries.map((entry, idx) => (
              <div
                key={entry.id}
                ref={el => { itemRefs.current[idx] = el }}
                className={`flex items-center justify-between p-4 bg-card hover:bg-accent/50 transition-all duration-300 transform ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                <div className="flex items-center gap-4">
                  {showStatus && entry.status && <div className={`w-2 h-2 rounded-full ${getStatusColor(entry.status)}`} />}
                  <span className="font-mono text-sm text-muted-foreground w-12">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="font-semibold text-foreground">{entry.title}</h3>
                </div>
                {entry.href && (
                  <a href={entry.href} className="text-primary hover:underline text-sm">View →</a>
                )}
              </div>
            ))}
          </div>
          {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" /></div>}
          <SectionFooter variant={footerVariant} />
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(entries.length)} />
        <div className="mt-12 space-y-4">
          {entries.map((entry, idx) => (
            <div
              key={entry.id}
              ref={el => { itemRefs.current[idx] = el }}
              className={`group flex flex-col md:flex-row items-stretch border border-border rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 transform ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            >
              <div className="w-16 md:w-24 border-r border-border flex items-center justify-center bg-card group-hover:bg-foreground transition-colors duration-300 rounded-l-lg">
                <span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary">{String(idx + 1).padStart(3, '0')}</span>
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  {entry.tag && <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-mono font-semibold uppercase rounded">{entry.tag}</span>}
                  <h3 className="font-bold text-2xl md:text-3xl text-foreground uppercase leading-none tracking-tight italic group-hover:text-primary transition-colors">{entry.title}</h3>
                  {entry.subtitle && <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider">{entry.subtitle}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  {showTimestamp && entry.timestamp && (
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono text-muted-foreground uppercase">Timestamp</span>
                      <span className="text-sm font-mono font-semibold text-foreground uppercase">{entry.timestamp}</span>
                    </div>
                  )}
                  {showStatus && entry.status && (
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono text-muted-foreground uppercase">Status</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(entry.status)}`} />
                        <span className="text-sm font-mono font-semibold text-foreground uppercase">{entry.status}</span>
                      </div>
                    </div>
                  )}
                  {entry.href && (
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-foreground rounded-full group-hover:bg-primary group-hover:border-primary transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default ListSection
