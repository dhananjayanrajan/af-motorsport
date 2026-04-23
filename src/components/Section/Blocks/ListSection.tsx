"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

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

interface ListLabels {
  statusPrefix: string
  timePrefix: string
  indexPrefix: string
}

interface ListSectionProps {
  id: string
  title: string
  subtitle: string
  entries: ListEntry[]
  labels: ListLabels
  showStatus?: boolean
  showTimestamp?: boolean
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
}

const ListSection: React.FC<ListSectionProps> = ({
  id,
  title,
  subtitle,
  entries = [],
  labels = {
    statusPrefix: '',
    timePrefix: '',
    indexPrefix: ''
  },
  showStatus = true,
  showTimestamp = true,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1
}) => {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

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
  }, [entries])

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(entries.length).padStart(2, '0')}
      />

      <div className="w-full flex flex-col gap-4 p-4 md:p-8 border-b border-black-pure bg-neutral-100">
        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            ref={el => { itemRefs.current[idx] = el }}
            className={`group relative flex flex-col md:flex-row items-stretch border border-black-pure bg-white-pure transition-all duration-150 shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-[0.99] ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
          >
            <div className="absolute inset-0 z-0 hidden group-hover:block pointer-events-none">
              <DotGridBackground primaryColor="#000000" secondaryColor="#00FF41" />
            </div>

            {entry.href && (
              <Link
                href={entry.href}
                className="absolute inset-0 z-40 outline-none"
                aria-label={entry.title}
                onFocus={() => setFocusedIndex(idx)}
                onBlur={() => setFocusedIndex(null)}
              />
            )}

            <div className="w-16 md:w-20 border-r border-black-pure flex flex-col items-center justify-center bg-white-pure shrink-0 group-hover:bg-black-pure transition-colors duration-200">
              <span className="text-[7px] font-mono font-black text-black-pure uppercase mb-1 group-hover:text-neutral-500">
                {labels.indexPrefix}
              </span>
              <span className="text-base font-mono font-black text-black-pure group-hover:text-primary tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-grow p-4 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col items-start gap-2">
                {entry.tag && (
                  <span className="text-[8px] font-mono font-black text-black-pure bg-primary px-2 py-0.5 uppercase tracking-widest group-hover:bg-black-pure group-hover:text-primary transition-colors">
                    {entry.tag}
                  </span>
                )}
                <div className="flex flex-col">
                  <h3 className="text-base md:text-lg font-mono font-black text-black-pure uppercase tracking-tight leading-none group-hover:translate-x-1 transition-transform">
                    {entry.title}
                  </h3>
                  {entry.subtitle && (
                    <p className="mt-2 text-[9px] font-mono font-bold text-black-pure uppercase tracking-wide max-w-sm">
                      {entry.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                {showTimestamp && entry.timestamp && (
                  <div className="flex flex-col lg:items-end min-w-[80px]">
                    <span className="text-[7px] font-mono font-black text-black-pure uppercase mb-1">
                      {labels.timePrefix}
                    </span>
                    <span className="text-[10px] font-mono font-black text-black-pure tabular-nums">
                      {entry.timestamp}
                    </span>
                  </div>
                )}

                {showStatus && entry.status && (
                  <div className="flex flex-col lg:items-end min-w-[80px]">
                    <span className="text-[7px] font-mono font-black text-black-pure uppercase mb-1">
                      {labels.statusPrefix}
                    </span>
                    <div className="flex items-center gap-2 border border-black-pure px-2 py-1 bg-white-pure group-hover:bg-neutral-100 transition-colors">
                      <div className="w-1.5 h-1.5 bg-primary" />
                      <span className="text-[9px] font-mono font-black text-black-pure uppercase italic">
                        {entry.status}
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-8 h-8 flex items-center justify-center border border-black-pure bg-white-pure group-hover:bg-primary transition-all duration-200">
                  <svg className="w-3.5 h-3.5 text-black-pure" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-1 h-1 bg-black-pure opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-black-pure opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-8 md:p-12 flex justify-center bg-white-pure border-b border-black-pure">
          <Link
            href={ctaPath}
            className="px-8 py-3 bg-white-pure text-black-pure font-mono font-black text-[10px] uppercase tracking-[0.3em] border border-black-pure shadow-[4px_4px_0px_0px_#000000] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-primary active:bg-black-pure active:text-primary"
          >
            {ctaLabel}
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default ListSection