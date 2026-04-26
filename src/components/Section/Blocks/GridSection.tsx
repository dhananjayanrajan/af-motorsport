"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Layers, LayoutGrid, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
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
    <section id={id} className="w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="relative border-b-2 border-black-pure bg-white-pure">
        <div className="container py-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-base font-mono font-black bg-black-pure text-white-pure px-4 py-1 uppercase tracking-widest">
                {labels.sectionIndex}
              </span>
              <div className="h-[2px] w-24 bg-primary-500 animate-[width_2s_ease-in-out_infinite]" />
            </div>
            <h2 className="text-2xl font-black uppercase text-black-pure leading-none tracking-tighter max-w-xl">
              {subtitle}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-stretch border-2 border-black-pure bg-white-pure shadow-[8px_8px_0px_var(--primary-500)] transition-all"
          >
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
            <div className="w-24 bg-black-pure flex items-center justify-center group cursor-pointer">
              <Layers className="w-8 h-8 text-primary-500 group-hover:rotate-180 transition-transform duration-700" />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black-pure/5" />
      </div>

      <div className={`grid ${gridCols[columns]} w-full`}>
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative flex flex-col bg-white-pure border-r-2 border-b-2 border-black-pure last:2xl:border-r-0 overflow-hidden"
          >
            <Link
              href={item.href || '#'}
              className="absolute inset-0 z-40 outline-none"
              aria-label={item.title}
            />

            <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black-pure">
              <img
                src={`https://picsum.photos/seed/${item.id}/1000/750`}
                alt={item.title || labels.fallbackAlt}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />

              <div className="absolute top-0 left-0 bg-black-pure border-r-2 border-b-2 border-black-pure px-4 py-2 z-10 transition-colors group-hover:bg-primary-500">
                <span className="text-base font-mono font-black text-white-pure group-hover:text-black-pure tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {item.category && (
                <div className="absolute bottom-0 right-0 bg-white-pure border-l-2 border-t-2 border-black-pure px-4 py-2 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-base font-mono font-black text-black-pure uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_30px_var(--primary-500)]">
                  <Maximize2 className="w-6 h-6 text-black-pure" />
                </div>
              </div>
            </div>

            <div className="p-10 flex flex-col flex-grow relative bg-white-pure transition-colors duration-500 group-hover:bg-white-50">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-4 w-1 bg-primary-500 group-hover:h-8 transition-all duration-500" />
                <span className="text-base font-mono font-black text-black-pure/30 uppercase tracking-widest">
                  {item.id}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase text-black-pure leading-[1.1] tracking-tighter mb-4 group-hover:text-primary-600 transition-colors">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="text-base font-black uppercase text-black-pure/50 leading-tight tracking-tight mb-12">
                  {item.subtitle}
                </p>
              )}

              <div className="mt-auto pt-8 border-t-2 border-black-pure/5 flex items-center justify-between group-hover:border-primary-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-base font-mono font-black uppercase text-black-pure tracking-widest group-hover:text-primary-600 transition-colors">
                    {labels.viewProject}
                  </span>
                  <div className="relative overflow-hidden w-6 h-6">
                    <ArrowRight className="w-6 h-6 text-primary-500 absolute -left-full group-hover:left-0 transition-all duration-300" />
                    <ArrowRight className="w-6 h-6 text-black-pure absolute left-0 group-hover:left-full transition-all duration-300" />
                  </div>
                </div>

                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-black-pure group-hover:rotate-90 transition-transform duration-500" />
                  <div className="absolute inset-2 bg-primary-500 group-hover:inset-0 transition-all duration-300" />
                  <LayoutGrid className="w-5 h-5 text-black-pure relative z-10" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary-500 group-hover:w-full transition-all duration-700" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full h-32 bg-white-pure border-b-2 border-black-pure flex items-center justify-center relative overflow-hidden group/footer">
        <div className="absolute inset-0 flex items-center justify-around opacity-[0.03] pointer-events-none group-hover/footer:opacity-[0.08] transition-opacity">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl font-black font-mono uppercase italic tracking-[1em]">SYSTEM_GRID</span>
          ))}
        </div>
        <div className="w-16 h-1 border-2 border-black-pure animate-bounce bg-primary-500" />
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default GridSection;