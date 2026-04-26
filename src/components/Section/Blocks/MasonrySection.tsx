"use client"
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
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

  const activeCols = useMemo(() => Math.min(items.length, columns), [items.length, columns]);

  useEffect(() => {
    const result: MasonryItem[][] = Array.from({ length: activeCols }, () => [])
    items.forEach((item, idx) => {
      result[idx % activeCols].push(item)
    })
    setColumnItems(result)
  }, [items, activeCols])

  const getItemStyles = (height?: string) => {
    switch (height) {
      case 'short': return 'h-[280px] md:h-[320px]'
      case 'tall': return 'h-[480px] md:h-[580px]'
      default: return 'h-[380px] md:h-[420px]'
    }
  }

  const colWidthClass = {
    1: 'w-full max-w-2xl',
    2: 'w-full md:w-1/2',
    3: 'w-full md:w-1/2 lg:w-1/3',
    4: 'w-full md:w-1/2 lg:w-1/4'
  }[activeCols] || 'w-full';

  return (
    <section id={id} className="relative w-full bg-white border-t border-black flex flex-col">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="w-full flex justify-center border-b border-black bg-white">
        <div className="flex flex-wrap w-full max-w-[1440px] border-x border-black">
          {columnItems.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`${colWidthClass} flex flex-col border-r border-black last:border-r-0`}
            >
              {col.map((item) => (
                <div
                  key={item.id}
                  className={`group relative w-full border-b border-black last:border-b-0 overflow-hidden bg-neutral-50 ${getItemStyles(item.height)}`}
                >
                  <img
                    src={item.image || `https://picsum.photos/seed/${item.id}/800/1000`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  />

                  <div className="absolute top-0 left-0 bg-black px-3 py-1.5 border-b border-r border-black z-10">
                    <span className="text-[10px] font-black tracking-widest text-white uppercase">
                      {labels.idPrefix}{item.id}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 bg-white border-t border-black transition-transform duration-500 ease-[0.2,1,0.3,1] translate-y-[calc(100%-80px)] group-hover:translate-y-0 z-20">
                    <div className="flex flex-col gap-1 mb-6">
                      {item.category && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                          {labels.categoryPrefix}{item.category}
                        </span>
                      )}
                      <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tighter leading-none italic">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-4 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium text-black/60 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-white border border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="w-1.5 h-1.5 bg-black" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="w-full h-40 flex items-center justify-center bg-white border-b border-black">
          <Link
            href={ctaPath}
            className="group flex items-center gap-8 px-10 py-4 border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <span className="text-base font-black uppercase tracking-widest">{ctaLabel}</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1 h-3 bg-current" />
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