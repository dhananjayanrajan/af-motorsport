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
    <div className="w-full mt-10">
      <div className="flex justify-between items-end mb-3">
        <span className="text-[8px] font-mono font-black text-black-pure/30 uppercase tracking-widest">
          {labels.progressLabel}
        </span>
        <span className="text-[10px] font-mono font-black text-black-pure tabular-nums">
          {percentage}%
        </span>
      </div>
      <div className="h-3 border border-black-pure p-0.5 flex gap-0.5 bg-white-pure">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`h-full flex-grow transition-colors duration-200 ${(i / 20) * 100 < percentage ? 'bg-primary-500' : 'bg-black-pure/5 border-r border-black-pure last:border-r-0'
              }`}
          />
        ))}
      </div>
    </div>
  )

  const ItemContent = ({ item, idx }: { item: ScrollItem; idx: number }) => (
    <div className="relative flex flex-col md:flex-row gap-0 items-stretch bg-white-pure border border-black-pure group overflow-hidden shadow-[8px_8px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
      <div className="flex flex-col shrink-0 p-8 border-r border-black-pure bg-white-pure group-hover:bg-primary-500 transition-colors">
        <span className="text-[8px] font-mono font-black text-black-pure/20 group-hover:text-black-pure uppercase tracking-widest mb-4">
          {labels.indexPrefix}
        </span>
        <span className="text-5xl font-mono font-black text-black-pure leading-none tracking-tighter tabular-nums italic">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex-grow flex flex-col justify-center p-8 md:p-12">
        <h3 className="text-2xl md:text-4xl font-mono font-black uppercase tracking-tight text-black-pure leading-none mb-6">
          {item.title}
        </h3>
        <p className="text-[10px] font-mono font-bold text-black-pure/50 uppercase leading-relaxed max-w-xl">
          {item.description}
        </p>
        {item.percentage && <ProgressBar percentage={item.percentage} />}
      </div>

      {item.image && (
        <div className="w-full md:w-72 aspect-video md:aspect-square overflow-hidden border-l border-black-pure relative shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 border-[16px] border-black-pure opacity-5 pointer-events-none" />
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

      <div className={`relative z-10 w-full ${variant === 'sticky' ? 'space-y-0' : 'space-y-12 py-12 px-8 md:px-24'}`}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            ref={el => { itemRefs.current[idx] = el }}
            className={`
              ${variant === 'sticky' ? 'sticky top-0 min-h-screen flex items-center justify-center px-8 md:px-24 bg-white-pure border-b border-black-pure' : 'relative w-full'}
              transition-all duration-500
              ${variant === 'reveal' && (visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0')}
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