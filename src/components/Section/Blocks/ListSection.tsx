"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import TactileBackground from '../Backgrounds/TactileBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
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
  const containerRef = useRef(null)

  const activeEntry = entries[activeIndex] || entries[0]
  const displayImage = activeEntry?.image || `https://picsum.photos/seed/${activeEntry?.id || 'default'}/1200/800`
  const scrollerItems = entries.map(e => e.title)

  return (
    <section id={id} ref={containerRef} className="relative w-full py-12 md:py-20 lg:py-24 bg-background">
      <TactileBackground />
      <div className="container">
        <div className="border-4 border-black-pure shadow-[16px_16px_0px_0px_#000000] relative z-10 transition-all duration-300">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(entries.length).padStart(2, '0')}
          />

          <SectionScroller
            items={scrollerItems}
            variant={scrollerVariant}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 border-t-4 border-black-pure overflow-hidden bg-white-pure">
            <div className="lg:col-span-5 xl:col-span-4 bg-black-pure p-6 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[400px] lg:min-h-[600px] border-b-4 lg:border-b-0 lg:border-r-4 border-black-pure">
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
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black-pure/60" />
                </motion.div>
              </AnimatePresence>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary-500 border-2 border-black-pure flex-none flex items-center justify-center text-black-pure shadow-[4px_4px_0px_0px_#ffffff]">
                    <span className="font-black text-xl tracking-widest leading-none">
                      {(activeIndex + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-black text-white-pure uppercase tracking-widest leading-none">
                      {labels.indexPrefix}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEntry?.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl md:text-2xl font-black text-white-pure uppercase tracking-widest leading-none">
                      {activeEntry?.title}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-primary-500 border-2 border-black-pure shadow-[4px_4px_0px_0px_#ffffff]">
                      <p className="text-black-pure text-xs font-black uppercase tracking-widest leading-none">
                        {activeEntry?.tag || id}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <div className="bg-white-pure p-4 flex flex-col border-2 border-black-pure shadow-[4px_4px_0px_0px_#00FF41]">
                  <span className="font-mono text-xs text-black-pure uppercase font-black tracking-widest leading-none mb-2">
                    {labels.statusPrefix}
                  </span>
                  <span className="text-base font-black text-black-pure uppercase tracking-widest leading-none truncate">
                    {activeEntry?.status}
                  </span>
                </div>
                <div className="bg-primary-500 p-4 flex flex-col border-2 border-black-pure shadow-[4px_4px_0px_0px_#ffffff]">
                  <span className="font-mono text-xs text-black-pure uppercase font-black tracking-widest leading-none mb-2">
                    {labels.timePrefix}
                  </span>
                  <span className="text-base font-black text-black-pure uppercase tracking-widest leading-none tabular-nums truncate">
                    {activeEntry?.timestamp}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-8 bg-white-pure flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto max-h-[600px] no-scrollbar">
                {entries.map((entry, idx) => (
                  <button
                    key={entry.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`
                      relative w-full flex items-center p-6 md:px-10 transition-colors duration-200 group border-b-2 border-black-pure
                      ${activeIndex === idx ? 'bg-neutral-100' : 'bg-white-pure'}
                    `}
                  >
                    <div className="relative z-10 flex items-center justify-between w-full gap-4">
                      <div className="flex items-center gap-6 min-w-0">
                        <span className={`font-mono text-2xl font-black flex-none transition-colors tracking-widest leading-none ${activeIndex === idx ? 'text-primary-500' : 'text-black-pure'}`}>
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>

                        <div className="flex flex-col items-start text-left min-w-0">
                          <span className="text-xs font-mono font-black uppercase tracking-widest leading-none text-black-pure mb-2">
                            {entry.tag || id}
                          </span>
                          <h4 className={`text-base md:text-xl font-black uppercase tracking-widest leading-none transition-colors line-clamp-1 ${activeIndex === idx ? 'text-primary-500' : 'text-black-pure'}`}>
                            {entry.title}
                          </h4>
                        </div>
                      </div>

                      {entry.href && (
                        <div
                          className={`h-12 w-12 flex-none flex items-center justify-center border-2 border-black-pure transition-all shadow-[4px_4px_0px_0px_#000000] ${activeIndex === idx ? 'bg-primary-500 shadow-none translate-x-1 translate-y-1' : 'bg-white-pure'}`}
                        >
                          <svg className="w-5 h-5 text-black-pure" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="4" strokeLinecap="square" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className={`absolute left-0 top-0 w-2 h-full bg-primary-500 transition-transform duration-300 origin-bottom ${activeIndex === idx ? 'scale-y-100' : 'scale-y-0'}`} />
                  </button>
                ))}
              </div>

              <div className="flex-none p-6 bg-white-pure border-t-2 border-black-pure flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col w-full sm:w-auto">
                  <span className="font-mono text-xs font-black text-black-pure uppercase tracking-widest leading-none text-center sm:text-left mb-2">Total Capacity</span>
                  <span className="text-base font-black text-black-pure uppercase tracking-widest leading-none text-center sm:text-left">{entries.length} Units</span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`h-2 w-8 border-2 border-black-pure ${i <= activeIndex ? 'bg-primary-500' : 'bg-white-pure'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <SectionFooter variant={footerVariant} />
        </div>
      </div>
    </section>
  )
}

export default ListSection;