// GridSection.tsx
"use client"
import { ArrowRight, Layers, Maximize2, Monitor, Plus, ShieldCheck, Zap } from 'lucide-react'
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
  footerVariant = 1
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <section id={id} className="w-full bg-white-pure border-t border-black-pure overflow-hidden">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="bg-white-pure border-b border-black-pure relative">
        <div className="max-w-[1600px] mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
          <div className="flex flex-col gap-6 max-w-2xl group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-primary-500 transition-all duration-700 group-hover:w-20" />
              <span className="text-base font-bold text-primary-600 transition-colors duration-300 group-hover:text-black-pure">{labels.sectionIndex}</span>
            </div>
            <p className="text-2xl font-medium text-black-pure">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-8 p-10 bg-white-pure border border-black-pure transition-all duration-500 hover:translate-x-1 hover:translate-y-1">
            <div className="flex flex-col">
              <span className="text-base font-bold text-black-pure mb-1">{labels.unitsCount}</span>
              <span className="text-2xl font-bold text-black-pure flex items-baseline gap-1">
                {String(items.length).padStart(2, '0')}
                <span className="text-base text-primary-500">/</span>
                <span className="text-base text-black-pure/60">99</span>
              </span>
            </div>
            <div className="w-14 h-14 bg-black-pure flex items-center justify-center text-primary-500 transition-transform duration-300 hover:scale-110">
              <Monitor size={28} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      <div className={`grid ${gridCols[columns]} w-full border-b border-black-pure`}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative flex flex-col bg-white-pure border-r border-b border-black-pure last:border-r-0 transition-all duration-500 hover:z-20"
          >
            <Link
              href={item.href || '#'}
              className="absolute inset-0 z-40 focus:ring-inset focus:ring-primary-500 outline-none"
              aria-label={item.title}
            />

            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 border-b border-black-pure">
              <img
                src={item.image || `https://picsum.photos/seed/${item.id}/1200/800`}
                alt={item.title || labels.fallbackAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/10 transition-colors duration-500" />

              <div className="absolute top-0 right-0 p-6 transition-all duration-500 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                <Maximize2 className="text-white-pure w-6 h-6" />
              </div>

              <div className="absolute bottom-0 left-0 bg-black-pure p-6 flex flex-col gap-1 transition-all duration-500 translate-y-full group-hover:translate-y-0">
                <span className="text-base font-bold text-primary-500">
                  #{String(idx + 1).padStart(3, '0')}
                </span>
                <span className="text-base text-white-pure">Registry</span>
              </div>
            </div>

            <div className="p-10 md:p-12 flex flex-col flex-grow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 transition-all duration-700 -translate-y-16 translate-x-16 rotate-45 group-hover:bg-primary-500/10" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-primary-600 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-base font-bold text-black-pure/60">
                    {item.id.split('-')[0]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <ShieldCheck className={`w-5 h-5 transition-all duration-500 ${hoveredId === item.id ? 'text-primary-500 scale-110' : 'text-black-pure/30'}`} />
                  <Zap className={`w-5 h-5 transition-all duration-500 delay-75 ${hoveredId === item.id ? 'text-primary-500 scale-110' : 'text-black-pure/30'}`} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-black-pure mb-6 transition-colors duration-300 group-hover:text-primary-500">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="text-base font-medium text-black-pure/60 mb-12">
                  {item.subtitle}
                </p>
              )}

              <div className="mt-auto pt-10 border-t border-black-pure flex items-center justify-between">
                <div className="flex items-center gap-6 overflow-hidden">
                  <span className="text-base font-bold text-black-pure relative">
                    {labels.viewProject}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-500 transition-all duration-500 group-hover:w-full" />
                  </span>
                  <div className="flex transition-all duration-500 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowRight className="w-6 h-6 text-primary-600" />
                  </div>
                </div>

                <div className="relative w-12 h-12 flex items-center justify-center border border-black-pure transition-colors duration-500 group-hover:border-primary-500">
                  <div className="absolute inset-0 bg-primary-500 transition-transform duration-500 scale-0 group-hover:scale-100 origin-center" />
                  <Plus className="relative z-10 w-6 h-6 text-black-pure transition-transform duration-500 group-hover:rotate-180" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default GridSection