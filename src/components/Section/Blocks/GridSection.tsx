"use client"

import { motion } from 'framer-motion'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionSidebar from '../Components/SectionSidebar'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<GridItem | null>(null)

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4',
  }

  const displayItems = items.slice(0, 8)

  return (
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      <DotGridBackground />

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16">
        <div className={`grid ${gridCols[columns]} gap-6 sm:gap-8 lg:gap-10`}>
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col bg-white-pure z-1 border-2 border-black-pure overflow-hidden"
            >
              {item.href && (
                <Link
                  href={item.href}
                  className="absolute inset-0 z-40 outline-none"
                  aria-label={item.title}
                />
              )}

              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black-pure bg-white-pure">
                <img
                  src={item.image || `https://picsum.photos/seed/${item.id}/1000/750`}
                  alt={item.title || labels.fallbackAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-0 left-0 bg-black-pure border-r-2 border-b-2 border-black-pure px-4 py-2 z-10 transition-colors group-hover:bg-primary-500">
                  <span className="text-base font-mono font-black text-white-pure group-hover:text-black-pure tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {item.category && (
                  <div className="absolute bottom-4 left-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-mono font-black bg-white-pure text-black-pure border-2 border-black-pure px-3 py-1 uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow relative bg-white-pure">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-6 bg-primary-500" />
                  <span className="text-sm font-mono font-black text-black-pure uppercase tracking-widest">
                    {item.id}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase text-black-pure leading-tight tracking-tighter mb-4 group-hover:text-primary-500 transition-colors">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="text-sm font-black uppercase text-black-pure leading-relaxed tracking-tight mb-8 line-clamp-2">
                    {item.subtitle}
                  </p>
                )}

                <div className="mt-auto pt-6 border-t-2 border-black-pure flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setActiveItem(item)
                      setSidebarOpen(true)
                    }}
                    className="flex items-center gap-4 group/btn"
                  >
                    <span className="text-sm font-mono font-black uppercase text-black-pure tracking-widest group-hover/btn:text-primary-500 transition-colors">
                      Details
                    </span>
                    <ArrowRight className="w-5 h-5 text-primary-500 transition-transform duration-300 group-hover/btn:translate-x-2" />
                  </button>

                  <div className="relative w-10 h-10 border-2 border-black-pure flex items-center justify-center transition-colors group-hover:bg-black-pure group-hover:text-white-pure">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-primary-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
          {items.length > 8 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group relative flex flex-col bg-primary-500 z-1 border-2 border-black-pure overflow-hidden cursor-pointer"
            >
              <Link href={items[0]?.href ? items[0].href.split('/').slice(0, -1).join('/') : '#'} className="absolute inset-0 z-40" aria-label="View all" />
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 border-4 border-black-pure bg-white-pure mx-auto mb-6 flex items-center justify-center group-hover:bg-black-pure transition-colors duration-500">
                  <ArrowRight className="w-10 h-10 text-black-pure group-hover:text-white-pure transition-colors duration-500" />
                </div>
                <span className="text-xl font-black text-black-pure uppercase">View All</span>
                <span className="text-sm font-mono font-black text-black-pure mt-2">{items.length - 8} more items</span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-black-pure group-hover:w-full transition-all duration-500" />
            </motion.div>
          )}
        </div>
      </div>

      <SectionFooter variant={footerVariant} />

      <SectionSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title={activeItem?.title || ''}
        description={activeItem?.subtitle || ''}
        imageUrl={activeItem?.image || ''}
        idCode={activeItem?.id || ''}
        stats={[
          { label: 'Category', val: activeItem?.category || 'None', color: 'bg-primary-500' },
          { label: 'ID', val: activeItem?.id || '00', color: 'bg-black-pure' }
        ]}
        buttonLabel="View Details"
        onAction={() => {
          if (activeItem?.href) window.location.href = activeItem.href
          setSidebarOpen(false)
        }}
      />
    </section>
  )
}

export default GridSection