// ListSection.tsx
"use client"
import { motion, useInView } from 'framer-motion'
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
  showStatus = true,
  showTimestamp = true,
  ctaLabel,
  ctaPath
}) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative w-full bg-white-pure flex flex-col"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 border-b border-black-pure" style={{ height: '200px' }}>
        <div className="lg:col-span-8 p-10 md:p-20 flex flex-col justify-end">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-black-pure mb-6">
              {title}
            </h2>
            <div className="h-px w-24 bg-primary-500 mb-8 transition-all duration-500 hover:w-32" />
            <p className="text-base text-black-pure/80">
              {subtitle}
            </p>
          </motion.div>
        </div>
        <div className="lg:col-span-4 bg-neutral-50 p-10 md:p-20 flex items-center justify-center border-l border-black-pure">
          <div className="relative">
            <span className="text-2xl font-bold text-black-pure">
              {String(entries.length).padStart(2, '0')}
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -inset-8 border border-dashed border-primary-500/30"
            />
          </div>
        </div>
      </div>

      <div className="flex-grow">
        {entries.map((entry, idx) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
            className="group relative w-full border-b border-black-pure transition-all duration-500 hover:bg-neutral-50"
            style={{ height: '120px' }}
          >
            <a
              href={entry.href || '#'}
              className="flex flex-col lg:flex-row lg:items-center p-8 md:px-20 md:py-0 gap-8 relative z-10 h-full"
            >
              <div className="flex items-center gap-8 lg:w-1/2">
                <span className="text-base font-bold text-black-pure/30 transition-all duration-300 group-hover:text-primary-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-2">
                  {entry.tag && (
                    <span className="inline-block text-base font-bold text-primary-500 bg-primary-500/10 transition-all duration-300 group-hover:bg-black-pure group-hover:text-white-pure px-2 py-0.5 self-start">
                      {entry.tag}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-black-pure transition-all duration-300 group-hover:translate-x-4">
                    {entry.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between lg:justify-end gap-12 lg:w-1/2">
                {showTimestamp && entry.timestamp && (
                  <div className="flex flex-col lg:items-end">
                    <span className="text-base text-black-pure/60 mb-1">
                      {labels.timePrefix}
                    </span>
                    <span className="text-base font-bold text-black-pure">
                      {entry.timestamp}
                    </span>
                  </div>
                )}

                {showStatus && entry.status && (
                  <div className="flex flex-col lg:items-end">
                    <span className="text-base text-black-pure/60 mb-1">
                      {labels.statusPrefix}
                    </span>
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-2 h-2 bg-primary-500"
                      />
                      <span className="text-base font-bold text-black-pure">
                        {entry.status}
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-12 h-12 border border-black-pure flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-black-pure">
                  <svg className="w-6 h-6 text-black-pure transition-colors duration-300 group-hover:text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="3" strokeLinecap="square" />
                  </svg>
                </div>
              </div>
            </a>

            {activeIndex === idx && (
              <motion.div
                layoutId="list-hover"
                className="absolute inset-0 z-0 bg-neutral-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {ctaLabel && ctaPath && (
        <div className="py-20 flex justify-center bg-white-pure">
          <motion.a
            href={ctaPath}
            whileHover={{ scale: 1.05 }}
            className="relative px-12 py-6 border border-black-pure group overflow-hidden"
          >
            <div className="absolute inset-0 bg-black-pure transition-transform duration-300 translate-y-full group-hover:translate-y-0" />
            <span className="relative z-10 text-base font-bold text-black-pure transition-colors duration-300 group-hover:text-white-pure">
              {ctaLabel}
            </span>
          </motion.a>
        </div>
      )}

      <div className="w-full bg-white-pure border-t border-black-pure p-10 grid grid-cols-1 md:grid-cols-3 gap-8" style={{ height: '120px' }}>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-primary-500 transition-all duration-300 hover:scale-150" />
          <span className="text-base text-black-pure/80">{id}</span>
        </div>
        <div className="flex justify-center">
          <div className="flex gap-2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1.5 h-1.5 bg-black-pure/30"
              />
            ))}
          </div>
        </div>
        <div className="flex md:justify-end">
          <span className="text-base text-primary-500 font-bold transition-all duration-300 hover:tracking-wider">
            SECURE_ENCRYPTION_ACTIVE
          </span>
        </div>
      </div>
    </section>
  )
}

export default ListSection