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

      <div className="flex flex-wrap w-full border-b border-black-pure bg-black-pure gap-0">
        {columnItems.map((col, colIdx) => (
          <div key={colIdx} className={`${colWidth[columns]} flex flex-col border-r border-black-pure last:border-r-0`}>
            {col.map((item) => (
              <div
                key={item.id}
                className={`group relative w-full ${heightClass(item.height)} border-b border-black-pure last:border-b-0 overflow-hidden bg-neutral-100 transition-colors hover:bg-primary`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />

                <div className="absolute top-4 left-4 bg-black-pure px-2 py-1 border border-black-pure shadow-[2px_2px_0px_0px_#00FF41]">
                  <span className="text-[8px] font-mono font-black text-white-pure uppercase tracking-widest">
                    {labels.idPrefix}{item.id}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 bg-white-pure border-t border-black-pure translate-y-[calc(100%-60px)] group-hover:translate-y-0 transition-transform duration-200">
                  <div className="mb-4">
                    {item.category && (
                      <span className="text-[9px] font-mono font-black text-neutral-500 uppercase tracking-widest mb-1 block">
                        {labels.categoryPrefix}{item.category}
                      </span>
                    )}
                    <h3 className="text-lg font-mono font-black text-black-pure uppercase leading-none tracking-tighter">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-black-pure">
                    {item.description && (
                      <p className="text-[9px] font-mono font-bold text-black-pure uppercase leading-tight">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white-pure border border-black-pure flex items-center justify-center shadow-[4px_4px_0px_0px_#000000] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                    <div className="w-1.5 h-1.5 bg-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {ctaLabel && ctaPath && (
        <div className="h-32 flex items-center justify-center bg-neutral-100">
          <Link
            href={ctaPath}
            className="flex items-center gap-8 px-12 py-4 bg-white-pure border border-black-pure text-black-pure shadow-[8px_8px_0px_0px_#000000] transition-all hover:shadow-none hover:translate-x-2 hover:translate-y-2 hover:bg-primary active:bg-black-pure active:text-primary"
          >
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
              {ctaLabel}
            </span>
            <div className="flex gap-[2px]">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-3 bg-black-pure" />
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