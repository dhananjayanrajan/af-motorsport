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

      <div className="w-full flex flex-col border-b border-black-pure">
        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            ref={el => { itemRefs.current[idx] = el }}
            className={`group relative flex flex-col md:flex-row items-stretch border-t border-black-pure first:border-t-0 bg-white-pure transition-all duration-700 ease-out ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${focusedIndex === idx ? 'ring-2 ring-primary-500 ring-inset z-10' : ''}`}
          >
            <DotGridBackground opacity={0.5} />

            {entry.href && (
              <Link
                href={entry.href}
                className="absolute inset-0 z-40 outline-none"
                aria-label={entry.title}
                onFocus={() => setFocusedIndex(idx)}
                onBlur={() => setFocusedIndex(null)}
              />
            )}

            <div className="w-20 md:w-28 border-r border-black-pure flex flex-col items-center justify-center bg-white-pure transition-all duration-300 shrink-0 group-hover:bg-black-pure group-focus-within:bg-black-pure">
              <span className="text-[10px] font-mono font-black text-black-pure uppercase mb-1 transition-colors duration-300 group-hover:text-white-pure group-focus-within:text-white-pure">
                {labels.indexPrefix}
              </span>
              <span className="text-xl md:text-2xl font-mono font-black text-black-pure tabular-nums transition-all duration-300 group-hover:text-primary-500 group-hover:scale-110 group-focus-within:text-primary-500 group-focus-within:scale-110">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-grow p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col items-start gap-3">
                {entry.tag && (
                  <span className="px-3 py-1 bg-black-pure text-white-pure text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all duration-300 group-hover:bg-primary-500 group-hover:text-black-pure group-focus-within:bg-primary-500 group-focus-within:text-black-pure">
                    {entry.tag}
                  </span>
                )}
                <div className="flex flex-col">
                  <h3 className="text-2xl font-mono font-black text-black-pure uppercase leading-none tracking-tighter transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary-500 group-focus-within:translate-x-2 group-focus-within:text-primary-500">
                    {entry.title}
                  </h3>
                  {entry.subtitle && (
                    <p className="mt-2 text-sm font-mono font-black text-black-pure uppercase tracking-widest transition-colors duration-300 group-hover:text-black-pure group-focus-within:text-black-pure">
                      {entry.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 md:gap-12">
                {showTimestamp && entry.timestamp && (
                  <div className="flex flex-col items-start md:items-end min-w-[90px]">
                    <span className="text-xs font-mono font-black text-black-pure uppercase mb-1 tracking-widest">
                      {labels.timePrefix}
                    </span>
                    <span className="text-sm font-mono font-black text-black-pure uppercase tabular-nums transition-colors duration-300 group-hover:text-primary-500 group-focus-within:text-primary-500">
                      {entry.timestamp}
                    </span>
                  </div>
                )}

                {showStatus && entry.status && (
                  <div className="flex flex-col items-start md:items-end min-w-[90px]">
                    <span className="text-xs font-mono font-black text-black-pure uppercase mb-1 tracking-widest">
                      {labels.statusPrefix}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                      <span className="text-sm font-mono font-black text-black-pure uppercase italic transition-colors duration-300 group-hover:text-primary-500 group-focus-within:text-primary-500">
                        {entry.status}
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-10 h-10 flex items-center justify-center border-2 border-black-pure bg-white-pure transition-all duration-300 group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:scale-110 group-focus-within:bg-primary-500 group-focus-within:border-primary-500 group-focus-within:scale-110 active:scale-95">
                  <svg className="w-4 h-4 text-black-pure transition-all duration-300 group-hover:text-black-pure group-hover:rotate-45 group-focus-within:text-black-pure group-focus-within:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-0 transition-all duration-500 ease-out group-hover:w-full group-focus-within:w-full" />
          </div>
        ))}
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-12 md:p-16 flex justify-center bg-white-pure border-t border-black-pure">
          <Link
            href={ctaPath}
            className="px-12 py-5 bg-black-pure text-white-pure font-mono font-black text-sm uppercase tracking-[0.3em] transition-all duration-300 border-2 border-black-pure shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-primary-500 hover:text-black-pure hover:shadow-none hover:translate-x-1 hover:translate-y-1 focus:bg-primary-500 focus:text-black-pure focus:outline-none focus:ring-2 focus:ring-primary-500 focus:shadow-none focus:translate-x-1 focus:translate-y-1 active:scale-95"
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