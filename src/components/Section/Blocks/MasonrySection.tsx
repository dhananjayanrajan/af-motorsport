"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface MasonryItem {
  id: string
  title: string
  image: string
  category?: string
  description?: string
  height?: 'short' | 'medium' | 'tall'
}

interface MasonryLabels {
  categoryPrefix: string
  idPrefix: string
}

interface MasonrySectionProps {
  id: string
  title: string
  subtitle: string
  items: MasonryItem[]
  labels: MasonryLabels
  columns?: 2 | 3 | 4
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const MasonrySection: React.FC<MasonrySectionProps> = ({
  id,
  title,
  subtitle,
  items = [],
  labels = {
    categoryPrefix: '',
    idPrefix: ''
  },
  columns = 3,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
}) => {
  const [columnItems, setColumnItems] = useState<MasonryItem[][]>([])

  useEffect(() => {
    const distributeItems = () => {
      const cols = columns === 2 ? 2 : columns === 4 ? 4 : 3
      const result: MasonryItem[][] = Array.from({ length: cols }, () => [])
      items.forEach((item, idx) => {
        const col = idx % cols
        result[col].push(item)
      })
      setColumnItems(result)
    }
    distributeItems()
  }, [items, columns])

  const heightClass = (height?: string) => {
    switch (height) {
      case 'short': return 'aspect-[4/3]'
      case 'tall': return 'aspect-[3/5]'
      default: return 'aspect-[3/4]'
    }
  }

  const colWidth = {
    2: 'w-full md:w-1/2',
    3: 'w-full md:w-1/2 lg:w-1/3',
    4: 'w-full md:w-1/2 lg:w-1/4'
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="flex flex-wrap w-full border-b border-black-pure">
        {columnItems.map((col, colIdx) => (
          <div key={colIdx} className={`${colWidth[columns]} flex flex-col border-r border-black-pure last:border-r-0`}>
            {col.map((item, itemIdx) => (
              <div
                key={item.id}
                className={`group relative w-full ${heightClass(item.height)} border-b border-black-pure last:border-b-0 overflow-hidden bg-black-pure`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                <div className="absolute top-0 left-0 p-6 flex flex-col pointer-events-none">
                  <span className="text-[9px] font-mono font-black text-white-pure/40 uppercase tracking-[0.3em] mb-1">
                    {labels.idPrefix}{item.id}
                  </span>
                  <div className="w-8 h-[1px] bg-primary-500" />
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start pointer-events-none">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.category && (
                      <span className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-widest mb-2 block">
                        {labels.categoryPrefix}{item.category}
                      </span>
                    )}
                    <h3 className="text-2xl md:text-3xl font-mono font-black text-white-pure uppercase leading-none tracking-tighter mb-4">
                      {item.title}
                    </h3>

                    <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
                      {item.description && (
                        <p className="text-[11px] font-mono font-black text-white-pure/60 uppercase leading-tight mb-4">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 border border-primary-500 flex items-center justify-center bg-black-pure">
                    <div className="w-1.5 h-1.5 bg-primary-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {ctaLabel && ctaPath && (
        <div className="h-32 flex items-center justify-center bg-white-pure">
          <Link
            href={ctaPath}
            className="flex items-center gap-12 px-16 py-6 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-150 relative group"
          >
            <span className="text-xs font-mono font-black uppercase tracking-[0.4em] relative z-10">
              {ctaLabel}
            </span>
            <div className="flex gap-1 relative z-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-primary-500 group-hover:bg-black-pure" />
              ))}
            </div>
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default MasonrySection