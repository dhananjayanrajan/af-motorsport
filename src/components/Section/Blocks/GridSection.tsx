"use client"
import { ArrowRight, Hash, Plus, Square } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface GridItem {
  id: string
  title: string
  subtitle?: string
  image?: string
  href?: string
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
}

const GridSection: React.FC<GridSectionProps> = ({
  id,
  title,
  subtitle,
  items = [],
  labels,
  columns = 4
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section id={id} className="w-full bg-white-pure border-t border-black-pure">
      <div className="flex flex-col md:flex-row border-b border-black-pure">
        <div className="p-8 md:p-16 flex-grow border-b md:border-b-0 md:border-r border-black-pure">
          <div className="flex items-center gap-8 mb-8">
            <Hash className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-mono font-black text-black-pure uppercase tracking-[0.3em]">
              {subtitle}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-black text-black-pure uppercase italic tracking-tighter leading-none">
            {title}
          </h2>
        </div>

        <div className="p-8 md:p-16 flex items-center justify-between md:justify-end gap-16 bg-slate-50 min-w-[240px]">
          <div className="flex flex-col items-end">
            <span className="text-sm font-mono font-black text-black-pure/20 uppercase tracking-widest">
              {labels.unitsCount}
            </span>
            <span className="text-2xl font-mono font-black text-black-pure tabular-nums">
              {String(items.length).padStart(2, '0')}
            </span>
          </div>
          <div className="w-12 h-12 border border-black-pure flex items-center justify-center">
            <Square className="w-4 h-4 text-primary-500" />
          </div>
        </div>
      </div>

      <div className={`grid ${gridCols[columns]} w-full`}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="group relative flex flex-col bg-white-pure border-r border-b border-black-pure last:border-r-0 overflow-hidden"
          >
            <Link
              href={item.href || '#'}
              className="absolute inset-0 z-50 outline-none"
              aria-label={item.title}
            />

            <div className="relative aspect-square overflow-hidden bg-slate-100 border-b border-black-pure">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title || labels.fallbackAlt}
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
              )}
              <div className="absolute top-0 left-0 p-8">
                <div className="px-4 py-2 bg-black-pure text-white-pure border border-white-pure/20 group-hover:bg-primary-500 group-hover:text-black-pure transition-colors">
                  <span className="text-sm font-mono font-black italic">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col flex-grow transition-colors duration-500 group-hover:bg-slate-50">
              <div className="flex items-center gap-8 mb-8">
                <div className="h-[1px] w-8 bg-black-pure/10 group-hover:bg-primary-500 group-hover:w-16 transition-all duration-500" />
                <span className="text-sm font-mono font-black text-black-pure/20 uppercase tracking-widest">
                  {labels.sectionIndex}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-mono font-black text-black-pure uppercase italic tracking-tighter leading-tight mb-8 group-hover:text-primary-500 transition-colors">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="text-sm font-mono font-black text-black-pure/40 uppercase leading-relaxed mb-16 max-w-xs">
                  {item.subtitle}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-8 text-black-pure group-hover:text-primary-500 transition-colors">
                  <span className="text-sm font-mono font-black uppercase tracking-widest">
                    {labels.viewProject}
                  </span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-4" />
                </div>
                <Plus className="w-5 h-5 text-black-pure/10 group-hover:text-primary-500 group-hover:rotate-90 transition-all duration-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GridSection