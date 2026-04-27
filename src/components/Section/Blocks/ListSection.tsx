"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'

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
}

const ListSection: React.FC<ListSectionProps> = ({
  id,
  title,
  subtitle,
  entries = [],
  labels,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef(null)

  const activeEntry = entries[activeIndex] || entries[0]
  const displayImage = activeEntry?.image || `https://picsum.photos/seed/${activeEntry?.id || 'default'}/1200/800`

  return (
    <section id={id} ref={containerRef} className="relative w-full h-screen bg-background flex flex-col border-t-2 border-foreground overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-foreground relative min-h-0">

        <div className="w-full lg:w-[45%] xl:w-[40%] bg-black p-6 xs:p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ x: -30 }}
              animate={{ x: 0 }}
              exit={{ x: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-none"
            >
              <img
                src={displayImage}
                alt=""
                className="w-full h-full object-cover brightness-50"
              />
            </motion.div>
          </AnimatePresence>

          <div className="space-y-6 lg:space-y-10 relative z-10">
            <motion.div
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="size-12 bg-white flex-none flex items-center justify-center text-black">
                <span className="font-black text-lg">{(activeIndex + 1).toString().padStart(2, '0')}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] font-black text-white uppercase tracking-[0.2em] truncate">
                  {id}
                </span>
                <span className="font-mono text-[10px] font-black text-primary uppercase tracking-[0.2em] truncate">
                  {labels.indexPrefix} {entries.length}
                </span>
              </div>
            </motion.div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeEntry?.id}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight break-words"
                >
                  {activeEntry?.title}
                </motion.h2>
              </AnimatePresence>

              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-primary flex-none" />
                <p className="text-white text-base font-black uppercase tracking-widest truncate">
                  {activeEntry?.tag || subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground border-2 border-foreground shadow-[4px_4px_0px_0px_#000000]">
              <div className="bg-card p-5 flex flex-col group/stat hover:bg-primary transition-colors duration-200 min-w-0">
                <span className="font-mono text-[10px] text-muted-foreground uppercase font-black group-hover/stat:text-white transition-colors truncate">{labels.statusPrefix}</span>
                <span className="text-lg font-black text-foreground group-hover/stat:text-white transition-colors uppercase truncate">{activeEntry?.status}</span>
              </div>
              <div className="bg-card p-5 flex flex-col group/stat hover:bg-foreground transition-colors duration-200 min-w-0">
                <span className="font-mono text-[10px] text-muted-foreground uppercase font-black group-hover/stat:text-background transition-colors truncate">{labels.timePrefix}</span>
                <span className="text-lg font-black text-foreground group-hover/stat:text-background transition-colors uppercase tabular-nums truncate">{activeEntry?.timestamp}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-foreground relative flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 overflow-y-auto no-scrollbar bg-foreground">
            {entries.map((entry, idx) => (
              <button
                key={entry.id}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`
                  relative w-full min-h-[100px] xs:min-h-[120px] flex items-center px-6 xs:px-8 md:px-12 transition-all duration-300 group overflow-hidden border-b-2 border-foreground
                  ${activeIndex === idx ? 'bg-primary' : 'bg-card hover:bg-white'}
                `}
              >
                <div className="relative z-10 flex items-center justify-between w-full min-w-0 gap-8">
                  <div className="flex items-center gap-4 xs:gap-8 min-w-0">
                    <span className={`font-mono text-xl font-black flex-none transition-colors duration-300 ${activeIndex === idx ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>

                    <div className="flex flex-col items-start text-left min-w-0">
                      <span className={`text-[10px] font-mono font-black uppercase tracking-widest mb-1 transition-colors truncate w-full ${activeIndex === idx ? 'text-white' : 'text-primary'}`}>
                        {entry.tag || id}
                      </span>
                      <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight transition-all duration-300 break-words line-clamp-2 ${activeIndex === idx ? 'text-white translate-x-2' : 'text-foreground'}`}>
                        {entry.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-none">
                    <div className={`hidden xl:flex flex-col items-end ${activeIndex === idx ? 'block' : 'hidden'}`}>
                      <span className="text-[10px] font-mono font-black text-white uppercase">Selection</span>
                      <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest">Active</span>
                    </div>
                    <div className={`size-10 border-2 transition-all duration-300 flex items-center justify-center ${activeIndex === idx ? 'border-white bg-white' : 'border-foreground bg-transparent group-hover:border-foreground'}`}>
                      <svg
                        className={`w-4 h-4 transition-colors duration-300 ${activeIndex === idx ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="4" strokeLinecap="square" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={`absolute right-0 top-0 w-2 h-full bg-foreground transition-transform duration-300 origin-top ${activeIndex === idx ? 'scale-y-100' : 'scale-y-0'}`} />
              </button>
            ))}
          </div>

          <div className="flex-none h-24 bg-card flex flex-col xs:flex-row divide-y-2 xs:divide-y-0 xs:divide-x-2 divide-foreground border-t-2 border-foreground">
            <div className="flex-1 p-4 xs:p-6 flex items-center justify-between group/footer min-w-0">
              <div className="flex flex-col text-left min-w-0">
                <span className="font-mono text-[10px] font-black text-muted-foreground uppercase truncate">Selection Overview</span>
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-primary rounded-full flex-none" />
                  <span className="text-base font-black text-foreground uppercase truncate">
                    {entries.length} Items Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-muted relative flex-none">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${((activeIndex + 1) / entries.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        />
      </div>
    </section>
  )
}

export default ListSection;