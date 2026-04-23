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
    <section id={id} className="w-full bg-white-pure border-t border-black-pure overflow-hidden">
      <div className="flex flex-col md:flex-row border-b border-black-pure">
        <div className="p-6 md:p-10 flex-grow border-b md:border-b-0 md:border-r border-black-pure bg-white-pure">
          <div className="flex items-center gap-4 mb-4">
            <Hash className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-[0.2em]">
              {subtitle}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-mono font-black text-black-pure uppercase tracking-tighter leading-none">
            {title}
          </h2>
        </div>

        <div className="p-6 md:p-10 flex items-center justify-between md:justify-end gap-12 bg-neutral-100 min-w-[200px]">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono font-black text-neutral-500 uppercase mb-1">
              {labels.unitsCount}
            </span>
            <span className="text-xl font-mono font-black text-black-pure tabular-nums">
              {String(items.length).padStart(2, '0')}
            </span>
          </div>
          <div className="w-10 h-10 border border-black-pure bg-white-pure flex items-center justify-center">
            <Square className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      <div className={`grid ${gridCols[columns]} w-full bg-black-pure gap-[1px]`}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="group relative flex flex-col bg-white-pure transition-all duration-200 hover:bg-neutral-50"
          >
            <Link
              href={item.href || '#'}
              className="absolute inset-0 z-50 outline-none"
              aria-label={item.title}
            />

            <div className="relative aspect-square overflow-hidden bg-neutral-200 border-b border-black-pure">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title || labels.fallbackAlt}
                  className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                />
              )}
              <div className="absolute top-0 left-0">
                <div className="px-3 py-1 bg-black-pure text-white-pure border-r border-b border-black-pure group-hover:bg-primary group-hover:text-black-pure transition-colors">
                  <span className="text-[10px] font-mono font-black tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-4 bg-primary group-hover:w-8 transition-all duration-300" />
                <span className="text-[8px] font-mono font-black text-neutral-400 uppercase tracking-widest">
                  {labels.sectionIndex}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-mono font-black text-black-pure uppercase tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="text-[10px] font-mono font-bold text-black-pure uppercase leading-relaxed mb-8 opacity-60">
                  {item.subtitle}
                </p>
              )}

              <div className="mt-auto pt-6 border-t border-black-pure flex items-center justify-between">
                <div className="flex items-center gap-4 text-black-pure">
                  <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                    {labels.viewProject}
                  </span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform text-primary" />
                </div>
                <div className="w-6 h-6 flex items-center justify-center border border-black-pure bg-white-pure group-hover:bg-primary group-hover:rotate-90 transition-all duration-300 shadow-[2px_2px_0px_0px_#000000] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                  <Plus className="w-3 h-3 text-black-pure" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GridSection