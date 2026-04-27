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
  slug?: string
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
  labels,
  columns = 3,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
}) => {
  const [columnItems, setColumnItems] = useState<MasonryItem[][]>([])

  useEffect(() => {
    const result: MasonryItem[][] = Array.from({ length: columns }, () => [])
    items.forEach((item, idx) => {
      result[idx % columns].push(item)
    })
    setColumnItems(result)
  }, [items, columns])

  return (
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure flex flex-col">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-b-2 border-black-pure">
        {columnItems.map((col, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col border-r-2 border-black-pure last:border-r-0 min-h-[200px]"
          >
            {col.length > 0 ? (
              col.map((item) => (
                <Link
                  key={item.id}
                  href={item.slug || '#'}
                  className="group relative w-full border-b-2 border-black-pure last:border-b-0 bg-white-pure block"
                >
                  <div className="p-6 sm:p-8 flex flex-col gap-6">
                    {/* Header: ID & Category */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono font-black uppercase tracking-tighter text-neutral-400">
                          {labels.idPrefix}{item.id}
                        </span>
                        <span className="text-[11px] font-mono font-black uppercase text-black-pure">
                          {item.category}
                        </span>
                      </div>
                      <div className="size-2 bg-black-pure group-hover:bg-primary-500 group-hover:rotate-45 transition-all duration-300" />
                    </div>

                    {/* Image: Fixed Aspect Ratio */}
                    <div className="relative aspect-[4/3] overflow-hidden border border-black-pure/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/5 transition-colors" />
                    </div>

                    {/* Content: Title & Brief */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-black uppercase tracking-tighter leading-none text-black-pure">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-bold text-black-pure/50 leading-tight uppercase line-clamp-2 group-hover:text-black-pure transition-colors">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Arrow */}
                    <div className="pt-4 border-t border-black-pure/5 flex justify-end">
                      <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                        <span className="text-[9px] font-mono font-black uppercase tracking-widest opacity-0 group-hover:opacity-100">Details</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-black-pure">
                          <path d="M3 10H17M17 10L12 5M17 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              /* Intentional Structural Empty State */
              <div className="flex-1 bg-neutral-50/30 flex items-center justify-center p-12 opacity-10 grayscale">
                <div className="w-full border-t border-black-pure/20 border-dashed" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      {ctaLabel && ctaPath && (
        <div className="w-full py-20 flex items-center justify-center bg-white-pure border-b-2 border-black-pure px-6">
          <Link
            href={ctaPath}
            className="group flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-8">
              <div className="h-px w-12 bg-black-pure/20 group-hover:w-20 transition-all" />
              <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black-pure group-hover:text-primary-500 transition-colors">
                {ctaLabel}
              </span>
              <div className="h-px w-12 bg-black-pure/20 group-hover:w-20 transition-all" />
            </div>
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-neutral-400">
              Explore Complete Archive
            </span>
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default MasonrySection;