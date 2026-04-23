"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
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
            className={`group relative flex flex-col md:flex-row items-stretch border-b border-black-pure last:border-b-0 bg-white-pure transition-all duration-700 ease-[0.16,1,0.3,1] ${visibleIndices.has(idx) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
          >
            {entry.href && (
              <Link href={entry.href} className="absolute inset-0 z-40 outline-none" aria-label={entry.title} />
            )}

            <div className="w-16 md:w-24 border-r border-black-pure flex flex-col items-center justify-center bg-white-pure group-hover:bg-black-pure transition-colors duration-300 shrink-0">
              <span className="text-[10px] font-mono font-black text-black-pure/20 group-hover:text-white-pure/20 uppercase mb-1">
                {labels.indexPrefix}
              </span>
              <span className="text-xl font-mono font-black text-black-pure group-hover:text-primary-500 tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-grow p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-col items-start gap-4">
                {entry.tag && (
                  <span className="px-4 py-1 bg-black-pure text-white-pure text-[9px] font-mono font-black uppercase tracking-[0.2em] group-hover:bg-primary-500 group-hover:text-black-pure transition-colors">
                    {entry.tag}
                  </span>
                )}
                <div className="flex flex-col">
                  <h3 className="text-2xl md:text-4xl font-mono font-black text-black-pure uppercase leading-none tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                    {entry.title}
                  </h3>
                  {entry.subtitle && (
                    <p className="mt-2 text-[11px] font-mono font-black text-black-pure/40 uppercase tracking-widest">
                      {entry.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-12 md:gap-16">
                {showTimestamp && entry.timestamp && (
                  <div className="flex flex-col items-start md:items-end min-w-[100px]">
                    <span className="text-[9px] font-mono font-black text-black-pure/20 uppercase mb-2 tracking-widest">
                      {labels.timePrefix}
                    </span>
                    <span className="text-xs font-mono font-black text-black-pure uppercase tabular-nums">
                      {entry.timestamp}
                    </span>
                  </div>
                )}

                {showStatus && entry.status && (
                  <div className="flex flex-col items-start md:items-end min-w-[100px]">
                    <span className="text-[9px] font-mono font-black text-black-pure/20 uppercase mb-2 tracking-widest">
                      {labels.statusPrefix}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" />
                      <span className="text-xs font-mono font-black text-black-pure uppercase italic">
                        {entry.status}
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-12 h-12 flex items-center justify-center border border-black-pure group-hover:bg-primary-500 transition-all duration-300">
                  <svg className="w-5 h-5 text-black-pure group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[1px] bg-primary-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        ))}
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-12 md:p-16 flex justify-center bg-slate-50/50">
          <Link
            href={ctaPath}
            className="px-16 py-6 bg-black-pure text-white-pure font-mono font-black text-xs uppercase tracking-[0.3em] hover:bg-primary-500 hover:text-black-pure transition-colors duration-150 border border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
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