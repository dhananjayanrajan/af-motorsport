// MasonrySection.tsx
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

  const getItemHeight = (height?: string) => {
    switch (height) {
      case 'short': return '320px'
      case 'tall': return '480px'
      default: return '400px'
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

      <div className="flex flex-wrap w-full border-b border-black-pure bg-white-pure gap-0">
        {columnItems.map((col, colIdx) => (
          <div key={colIdx} className={`${colWidth[columns]} flex flex-col border-r border-black-pure last:border-r-0`}>
            {col.map((item) => (
              <div
                key={item.id}
                className="group relative w-full border-b border-black-pure last:border-b-0 overflow-hidden bg-neutral-100"
                style={{ height: getItemHeight(item.height) }}
              >
                <img
                  src={item.image || `https://picsum.photos/seed/${item.id}/800/1000`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 bg-black-pure px-2 py-1 border border-black-pure transition-all duration-300 group-hover:bg-primary-500">
                  <span className="text-base font-bold text-white-pure transition-colors duration-300 group-hover:text-black-pure">
                    {labels.idPrefix}{item.id}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 bg-white-pure border-t border-black-pure transition-all duration-400 translate-y-[calc(100%-72px)] group-hover:translate-y-0">
                  <div className="mb-4">
                    {item.category && (
                      <span className="text-base font-bold text-black-pure/60 mb-1 block transition-all duration-300 group-hover:text-primary-500">
                        {labels.categoryPrefix}{item.category}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-black-pure">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-black-pure transition-all duration-300 delay-75 opacity-0 group-hover:opacity-100">
                    {item.description && (
                      <p className="text-base font-bold text-black-pure">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white-pure border border-black-pure flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:bg-primary-500">
                    <div className="w-1.5 h-1.5 bg-primary-500 transition-colors duration-300 group-hover:bg-black-pure" />
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
            className="flex items-center gap-8 px-12 py-4 bg-white-pure border border-black-pure text-black-pure transition-all duration-300 hover:translate-x-2 hover:translate-y-2 hover:bg-primary-500 active:bg-black-pure active:text-primary-500"
          >
            <span className="text-base font-bold">
              {ctaLabel}
            </span>
            <div className="flex gap-[2px]">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-3 bg-black-pure transition-all duration-300 group-hover:bg-white-pure" />
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