"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Layers, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface GridItem {
  id: string
  title: string
  subtitle?: string
  image?: string
  href?: string
  category?: string
}

interface GridLabels {
  unitsCount: string
  viewProject: string
  sectionIndex: string
  fallbackAlt: string
}

interface GridSectionProps {
  id: string
  title: string
  subtitle: string
  items: GridItem[]
  labels: GridLabels
  columns?: 1 | 2 | 3 | 4
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
}

const GridSection: React.FC<GridSectionProps> = ({
  id,
  title,
  subtitle,
  items = [],
  labels,
  columns = 4,
  headerVariant = 1,
  footerVariant = 1,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4',
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <DotGridBackground />

      <div className="container py-8 sm:py-12 lg:py-16">
        <div className="relative border-2 border-black-pure bg-white-pure z-1 shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-12 sm:mb-16 lg:mb-20">
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-base font-mono font-black bg-black-pure text-white-pure px-4 py-1 uppercase tracking-widest">
                  {labels.sectionIndex}
                </span>
                <div className="h-[2px] w-24 bg-primary-500" />
              </div>
              <h2 className="text-2xl font-black uppercase text-black-pure leading-none tracking-tighter max-w-xl">
                {subtitle}
              </h2>
            </motion.div>

            <div className="flex items-stretch border-2 border-black-pure bg-white-pure shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_var(--primary-500)] transition-all duration-300">
              <div className="p-6 border-r-2 border-black-pure flex flex-col justify-center bg-white-100">
                <span className="text-base font-mono font-black text-black-pure/40 uppercase mb-1 tracking-widest">
                  {labels.unitsCount}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-black-pure tabular-nums">
                    {String(items.length).padStart(2, '0')}
                  </span>
                  <span className="text-base font-black text-primary-500">/</span>
                  <span className="text-base font-black text-black-pure/20">99</span>
                </div>
              </div>
              <div className="w-24 bg-black-pure flex items-center justify-center group cursor-pointer transition-colors hover:bg-primary-500">
                <Layers className="w-8 h-8 text-primary-500 group-hover:text-black-pure transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className={`grid ${gridCols[columns]} gap-6 sm:gap-8 lg:gap-10`}>
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col bg-white-pure z-1 border-2 border-black-pure shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_var(--tertiary-500)] transition-all duration-300 overflow-hidden"
            >
              {item.href && (
                <Link
                  href={item.href}
                  className="absolute inset-0 z-40 outline-none"
                  aria-label={item.title}
                />
              )}

              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black-pure bg-neutral-100">
                <img
                  src={`https://picsum.photos/seed/${item.id}/1000/750`}
                  alt={item.title || labels.fallbackAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-0 left-0 bg-black-pure border-r-2 border-b-2 border-black-pure px-4 py-2 z-10 transition-colors group-hover:bg-secondary-500">
                  <span className="text-base font-mono font-black text-white-pure group-hover:text-black-pure tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {item.category && (
                  <div className="absolute bottom-4 left-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] font-mono font-black bg-white-pure text-black-pure border-2 border-black-pure px-3 py-1 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {item.category}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-tertiary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8 flex flex-col flex-grow relative bg-white-pure">
                <div className="flex items-center gap-3 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="h-[2px] w-6 bg-tertiary-500" />
                  <span className="text-sm font-mono font-black text-black-pure uppercase tracking-widest">
                    {item.id}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase text-black-pure leading-tight tracking-tighter mb-4 group-hover:text-tertiary-600 transition-colors">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="text-sm font-black uppercase text-black-pure/50 leading-relaxed tracking-tight mb-8 line-clamp-2">
                    {item.subtitle}
                  </p>
                )}

                <div className="mt-auto pt-6 border-t-2 border-black-pure/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-black uppercase text-black-pure tracking-widest">
                      {labels.viewProject}
                    </span>
                    <ArrowRight className="w-5 h-5 text-tertiary-500 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>

                  <div className="relative w-10 h-10 border-2 border-black-pure flex items-center justify-center transition-colors group-hover:bg-black-pure group-hover:text-white-pure">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-tertiary-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 w-full h-32 bg-white-pure border-2 border-black-pure shadow-[8px_8px_0px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden group/footer">
          <div className="absolute inset-0 flex items-center justify-around opacity-[0.05] pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-xl font-black font-mono uppercase italic tracking-widest text-secondary-500">
                {id}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
            <div className="w-12 h-1 bg-black-pure/10 overflow-hidden">
              <motion.div
                animate={{ x: [-48, 48] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-full bg-secondary-500"
              />
            </div>
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default GridSection