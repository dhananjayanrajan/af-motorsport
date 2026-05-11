"use client"

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import TactileBackground from '../Backgrounds/TactileBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionModal from '../Components/SectionModal'
import SectionScroller from '../Components/SectionScroller'

export interface ListEntry {
  id: string
  title: string
  subtitle?: string
  status?: string
  tag?: string
  href?: string
  timestamp?: string
  metadata?: Record<string, string>
  image?: string
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
  headerVariant?: 1 | 2 | 3 | 4 | 5
  footerVariant?: 1 | 2 | 3 | 4 | 5
  scrollerVariant?: 1 | 2 | 3 | 4 | 5
}

const ListSection: React.FC<ListSectionProps> = ({
  id,
  title,
  subtitle,
  entries = [],
  labels,
  headerVariant = 1,
  footerVariant = 1,
  scrollerVariant = 1,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeEntry, setActiveEntry] = useState<ListEntry | null>(null)
  const containerRef = useRef(null)

  const displayEntries = entries.slice(0, 8)
  const activeEntryData = displayEntries[activeIndex] || displayEntries[0]
  const displayImage = activeEntryData?.image || `https://picsum.photos/seed/${activeEntryData?.id || 'default'}/1200/800`
  const scrollerItems = displayEntries.map(e => e.title)

  return (
    <section id={id} ref={containerRef} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      <TactileBackground />

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(entries.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10">
        <div className="border-2 border-black-pure relative transition-all duration-300 bg-white-pure overflow-hidden">

          <SectionScroller
            items={scrollerItems}
            variant={scrollerVariant}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 border-t-2 border-black-pure overflow-hidden bg-white-pure">
            <div className="lg:col-span-5 xl:col-span-4 bg-black-pure p-6 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[500px] lg:min-h-[650px] border-b-2 lg:border-b-0 lg:border-r-2 border-black-pure">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <img
                    src={displayImage}
                    alt=""
                    className="w-full h-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </motion.div>
              </AnimatePresence>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary-500 border-2 border-black-pure flex-none flex items-center justify-center text-black-pure">
                    <span className="font-black text-lg tracking-widest leading-none">
                      {(activeIndex + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest leading-none">
                      {labels.indexPrefix}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEntryData?.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl md:text-2xl font-black text-white-pure uppercase tracking-widest leading-tight">
                      {activeEntryData?.title}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-primary-500 border-2 border-black-pure">
                      <p className="text-black-pure text-[10px] font-black uppercase tracking-widest leading-none">
                        {activeEntryData?.tag || id}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                <div className="bg-white-pure p-3 flex flex-col border-2 border-black-pure">
                  <span className="font-mono text-[9px] text-black-pure uppercase font-black tracking-widest leading-none mb-2">
                    {labels.statusPrefix}
                  </span>
                  <span className="text-xs font-black text-black-pure uppercase tracking-widest leading-none truncate">
                    {activeEntryData?.status}
                  </span>
                </div>
                <div className="bg-primary-500 p-3 flex flex-col border-2 border-black-pure">
                  <span className="font-mono text-[9px] text-black-pure uppercase font-black tracking-widest leading-none mb-2">
                    {labels.timePrefix}
                  </span>
                  <span className="text-xs font-black text-black-pure uppercase tracking-widest leading-none tabular-nums truncate">
                    {activeEntryData?.timestamp}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-8 bg-white-pure flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto max-h-[650px] no-scrollbar">
                {displayEntries.map((entry, idx) => (
                  <button
                    key={entry.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      setActiveEntry(entry)
                      setModalOpen(true)
                    }}
                    className={`
                      relative w-full flex items-center p-5 md:px-8 transition-colors duration-200 group border-b-2 border-black-pure
                      ${activeIndex === idx ? 'bg-black-pure' : 'bg-white-pure'}
                    `}
                  >
                    <div className="relative z-10 flex items-center justify-between w-full gap-4">
                      <div className="flex items-center gap-6 min-w-0">
                        <span className={`font-mono text-lg font-black flex-none transition-colors tracking-widest leading-none ${activeIndex === idx ? 'text-primary-500' : 'text-black-pure'}`}>
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>

                        <div className="flex flex-col items-start text-left min-w-0">
                          <span className={`text-[10px] font-mono font-black uppercase tracking-widest leading-none mb-1.5 ${activeIndex === idx ? 'text-white-pure' : 'text-black-pure/50'}`}>
                            {entry.tag || id}
                          </span>
                          <h4 className={`text-sm md:text-md font-black uppercase tracking-widest leading-none transition-colors line-clamp-1 ${activeIndex === idx ? 'text-primary-500' : 'text-black-pure'}`}>
                            {entry.title}
                          </h4>
                        </div>
                      </div>

                      {entry.href && (
                        <Link
                          href={entry.href}
                          className={`h-10 w-10 flex-none flex items-center justify-center border-2 border-black-pure transition-all ${activeIndex === idx ? 'bg-primary-500' : 'bg-white-pure'}`}
                        >
                          <svg className="w-4 h-4 text-black-pure" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="4" strokeLinecap="square" />
                          </svg>
                        </Link>
                      )}
                    </div>
                    <div className={`absolute left-0 top-0 w-1.5 h-full bg-primary-500 transition-transform duration-300 origin-bottom ${activeIndex === idx ? 'scale-y-100' : 'scale-y-0'}`} />
                  </button>
                ))}
                {entries.length > 8 && (
                  <button className="relative w-full flex items-center p-6 md:px-8 transition-colors duration-200 group border-b-2 border-black-pure bg-primary-500 hover:bg-black-pure">
                    <div className="relative z-10 flex items-center justify-between w-full gap-4">
                      <div className="flex items-center gap-6 min-w-0">
                        <span className="font-mono text-xl font-black flex-none text-black-pure group-hover:text-white-pure">+</span>
                        <div className="flex flex-col items-start text-left min-w-0">
                          <span className="text-sm font-black uppercase tracking-widest leading-none text-black-pure group-hover:text-white-pure">
                            View All Entries
                          </span>
                        </div>
                      </div>
                      <div className="h-10 w-10 flex-none flex items-center justify-center border-2 border-black-pure bg-white-pure group-hover:bg-black-pure transition-all">
                        <svg className="w-4 h-4 text-black-pure group-hover:text-white-pure" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="4" strokeLinecap="square" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              <div className="flex-none p-5 bg-white-pure border-t-2 border-black-pure flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col w-full sm:w-auto">
                  <span className="font-mono text-[9px] font-black text-black-pure/50 uppercase tracking-widest leading-none text-center sm:text-left mb-1.5">Total</span>
                  <span className="text-sm font-black text-black-pure uppercase tracking-widest leading-none text-center sm:text-left">{entries.length} Entries</span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`h-1.5 w-6 border-2 border-black-pure ${i <= (activeIndex / (displayEntries.length - 1)) * 4 ? 'bg-primary-500' : 'bg-white-pure'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <SectionFooter variant={footerVariant} />
        </div>
      </div>

      <SectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={activeEntry?.title || ''}
        description={activeEntry?.subtitle || activeEntry?.status || ''}
        imageUrl={activeEntry?.image || displayImage}
        idCode={activeEntry?.id || ''}
        stats={[
          { label: 'Status', val: activeEntry?.status || 'N/A', color: 'bg-primary-500' },
          { label: 'Time', val: activeEntry?.timestamp || 'N/A', color: 'bg-black-pure' }
        ]}
        buttonLabel="View Details"
        onAction={() => {
          if (activeEntry?.href) window.location.href = activeEntry.href
          setModalOpen(false)
        }}
        infoLabel={activeEntry?.tag || id}
      />
    </section>
  )
}

export default ListSection