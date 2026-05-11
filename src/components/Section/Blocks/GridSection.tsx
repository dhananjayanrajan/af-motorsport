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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<GridItem | null>(null)

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4',
  }

  const displayItems = items.slice(0, 3)

  return (
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      <DotGridBackground />

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto">
        <div className={`grid ${gridCols[columns]} gap-4 sm:gap-6 lg:gap-8`}>
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col bg-white-pure z-1 border-2 border-black-pure overflow-hidden"
            >
              {item.href && (
                <Link
                  href={item.href}
                  className="absolute inset-0 z-40"
                  aria-label={item.title}
                />
              )}

              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-black-pure bg-white-pure">
                <img
                  src={item.image || `https://picsum.photos/seed/${item.id}/1000/750`}
                  alt={item.title || labels.fallbackAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-0 left-0 bg-black-pure border-r-2 border-b-2 border-black-pure px-3 xl:px-4 py-1 xl:py-2 z-20 transition-colors duration-300 group-hover:bg-primary-500">
                  <span className="text-sm xl:text-base font-mono font-black text-white-pure group-hover:text-black-pure tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {item.category && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] xl:text-xs font-mono font-black bg-white-pure text-black-pure border-2 border-black-pure px-2 xl:px-3 py-1 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none transition-all">
                      {item.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 xl:p-8 flex flex-col flex-grow relative bg-white-pure overflow-hidden">
                <div className="absolute inset-0 bg-primary-500 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out z-0" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4 xl:mb-6">
                    <div className="h-1 w-6 bg-primary-500 transition-all group-hover:bg-black-pure group-hover:w-10" />
                    <span className="text-[10px] xl:text-sm font-mono font-black text-black-pure uppercase tracking-widest">
                      {item.id}
                    </span>
                  </div>

                  <h3 className="text-lg xl:text-xl font-black uppercase text-black-pure leading-tight tracking-tighter mb-3 xl:mb-4">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="text-xs xl:text-sm font-black uppercase text-black-pure/60 leading-relaxed tracking-tight mb-6 xl:mb-8 line-clamp-2 break-words group-hover:text-black-pure transition-colors">
                      {item.subtitle}
                    </p>
                  )}

                  <div className="mt-auto pt-4 xl:pt-6 border-t-2 border-black-pure flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setActiveItem(item)
                        setSidebarOpen(true)
                      }}
                      className="flex items-center gap-4 group/btn cursor-pointer"
                    >
                      <span className="text-[10px] xl:text-sm font-mono font-black uppercase text-black-pure tracking-widest group-hover/btn:bg-white-pure group-hover/btn:px-1 transition-all">
                        Details
                      </span>
                      <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 text-black-pure transition-transform duration-300 group-hover/btn:translate-x-2" />
                    </button>

                    <div className="relative w-8 h-8 xl:w-10 xl:h-10 border-2 border-black-pure flex items-center justify-center bg-white-pure transition-all group-hover:bg-black-pure group-hover:text-white-pure">
                      <LayoutGrid className="w-3 h-3 xl:w-4 xl:h-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-black-pure group-hover:w-full transition-all duration-700 z-20" />
            </motion.div>
          ))}

          {items.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col bg-primary-500 z-1 border-2 border-black-pure overflow-hidden cursor-pointer"
            >
              <Link href={items[0]?.href ? items[0].href.split('/').slice(0, -1).join('/') : '#'} className="absolute inset-0 z-40" aria-label="View all" />
              <div className="flex-1 flex flex-col items-center justify-center p-8 xl:p-12 text-center">
                <div className="w-16 h-16 xl:w-20 xl:h-20 border-4 border-black-pure bg-white-pure mx-auto mb-4 xl:mb-6 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none transition-all">
                  <ArrowRight className="w-8 h-8 xl:w-10 xl:h-10 text-black-pure" />
                </div>
                <span className="text-lg xl:text-xl font-black text-black-pure uppercase tracking-tighter">View All</span>
                <span className="text-[10px] xl:text-sm font-mono font-black text-black-pure mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  {items.length - 3} more items
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-black-pure group-hover:w-full transition-all duration-500 z-20" />
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