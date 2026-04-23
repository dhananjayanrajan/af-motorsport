"use client"
import React, { useEffect, useRef, useState } from 'react'
import RacingLinesBackground from '../Backgrounds/RacingLinesBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface ScrollItem {
  id: string
  title: string
  description: string
  image?: string
  percentage?: number
}

interface ScrollLabels {
  indexPrefix: string
  progressLabel: string
  statusComplete: string
}

interface ScrollSectionProps {
  id: string
  title: string
  subtitle: string
  items: ScrollItem[]
  labels: ScrollLabels
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
  items = [],
  labels = {
    indexPrefix: '',
    progressLabel: '',
    statusComplete: ''
  },
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

  const ProgressBar = ({ percentage }: { percentage: number }) => (
    <div className="w-full mt-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[9px] font-mono font-black text-black-pure/30 uppercase tracking-widest">
          {labels.progressLabel}
        </span>
        <span className="text-sm font-mono font-black text-primary-500 tabular-nums">
          {percentage}%
        </span>
      </div>
      <div className="h-1 bg-black-pure/5 overflow-hidden flex gap-1">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`h-full flex-grow transition-all duration-1000 delay-300 ${(i / 20) * 100 < percentage ? 'bg-primary-500' : 'bg-black-pure/5'
              }`}
          />
        ))}
      </div>
    </div>
  )

  const ItemContent = ({ item, idx }: { item: ScrollItem; idx: number }) => (
    <div className="relative flex flex-col md:flex-row gap-12 items-stretch p-8 md:p-16 bg-white-pure border border-black-pure group overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-black-pure/5 group-hover:bg-primary-500 transition-colors duration-500" />

      <div className="flex flex-col shrink-0">
        <span className="text-[10px] font-mono font-black text-black-pure/20 uppercase tracking-[0.4em] mb-2">
          {labels.indexPrefix}
        </span>
        <span className="text-6xl font-mono font-black text-black-pure leading-none tracking-tighter italic">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <h3 className="text-3xl md:text-5xl font-mono font-black uppercase tracking-tighter text-black-pure leading-none mb-6 group-hover:text-primary-500 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-sm font-mono font-black text-black-pure/50 uppercase leading-relaxed max-w-2xl">
          {item.description}
        </p>
        {item.percentage && <ProgressBar percentage={item.percentage} />}
      </div>

      {item.image && (
        <div className="w-full md:w-80 aspect-video md:aspect-square overflow-hidden border border-black-pure relative shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[0.16,1,0.3,1]"
          />
          <div className="absolute inset-0 border-[12px] border-black-pure/5 pointer-events-none" />
        </div>
      )}
    </div>
  )

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className={`mt-0 w-full ${variant === 'sticky' ? 'space-y-0' : 'space-y-px bg-black-pure border-b border-black-pure'}`}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            ref={el => { itemRefs.current[idx] = el }}
            className={`
              ${variant === 'sticky' ? 'sticky top-0 min-h-screen flex items-center justify-center px-8 md:px-24 bg-white-pure border-b border-black-pure' : 'relative w-full'}
              transition-all duration-700 ease-[0.16,1,0.3,1]
              ${variant === 'reveal' && (visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0')}
            `}
          >
            <ItemContent item={item} idx={idx} />
          </div>
        ))}
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-16 flex justify-center bg-white-pure border-b border-black-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default ScrollSection