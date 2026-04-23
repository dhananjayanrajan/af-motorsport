"use client"
import React, { useState, useEffect } from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import MosaicBackground from '../Backgrounds/MosaicBackground'

export interface MasonryItem {
  id: string
  title: string
  image: string
  category?: string
  description?: string
  height?: 'short' | 'medium' | 'tall'
}

interface MasonrySectionProps {
  id: string
  title: string
  subtitle: string
  items: MasonryItem[]
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
  items,
  columns = 3,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <MosaicBackground opacity={0.3} />
}) => {
  const [columnItems, setColumnItems] = useState<MasonryItem[][]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
      case 'short': return 'h-64'
      case 'tall': return 'h-96'
      default: return 'h-80'
    }
  }

  const colWidth = {
    2: 'w-1/2',
    3: 'w-1/3',
    4: 'w-1/4'
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(items.length)} />
        <div className="flex flex-wrap gap-4 mt-12">
          {columnItems.map((col, colIdx) => (
            <div key={colIdx} className={`${colWidth[columns]} flex flex-col gap-4`}>
              {col.map((item) => (
                <div
                  key={item.id}
                  className={`relative ${heightClass(item.height)} rounded-lg overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div>
                      {item.category && <p className="text-primary font-mono text-xs uppercase mb-1">{item.category}</p>}
                      <h3 className="text-white font-bold text-xl uppercase tracking-tight">{item.title}</h3>
                      {item.description && <p className="text-white/80 text-sm mt-1">{item.description}</p>}
                    </div>
                  </div>
                  {hoveredId === item.id && (
                    <div className="absolute inset-0 border-4 border-primary pointer-events-none transition-all duration-300" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {ctaLabel && ctaPath && (
          <div className="flex justify-center mt-12">
            <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
          </div>
        )}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default MasonrySection
