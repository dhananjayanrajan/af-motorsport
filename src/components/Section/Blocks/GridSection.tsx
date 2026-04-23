"use client"
import React from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface GridItem {
  id: string
  title: string
  subtitle?: string
  image?: string
  label?: string
  href?: string
  metadata?: Record<string, string>
}

interface GridSectionProps {
  id: string
  title: string
  subtitle: string
  items: GridItem[]
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  cardVariant?: 1 | 2 | 3 | 4 | 5
  showMetadata?: boolean
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const GridSection: React.FC<GridSectionProps> = ({
  id,
  title,
  subtitle,
  items,
  columns = 3,
  cardVariant = 1,
  showMetadata = false,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <DotGridBackground opacity={0.3} />
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }

  const getImageUrl = (image?: string) => {
    if (image && image.trim() !== '') return image
    return `https://picsum.photos/id/${Math.abs(items[0]?.id.charCodeAt(0) || 1) % 100}/400/300`
  }

  return (
    <section className="relative w-full bg-white-pure border-y-2 border-black-pure py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-8">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(items.length)} />
        <div className={`grid ${gridCols[columns]} gap-8 mt-12`}>
          {items.map((item, idx) => (
            <div key={item.id} className="group">
              <div className="border-2 border-black-pure bg-white-pure hover:bg-black-pure transition-all duration-300">
                {item.image && (
                  <div className="relative h-48 overflow-hidden border-b-2 border-black-pure">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.label && (
                      <div className="absolute top-4 left-4 bg-primary-500 border border-black-pure px-3 py-1">
                        <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">
                          {item.label}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-black-pure flex items-center justify-center shrink-0 mt-1 group-hover:bg-white-pure transition-colors">
                      <span className="text-white-pure font-mono font-black text-xs group-hover:text-black-pure">
                        {idx + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-black-pure group-hover:text-white-pure transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  {item.subtitle && (
                    <p className="text-xs font-sans font-bold uppercase text-black-pure/60 leading-relaxed group-hover:text-white-pure/60 transition-colors">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              {showMetadata && item.metadata && Object.keys(item.metadata).length > 0 && (
                <div className="mt-4 border-2 border-black-pure bg-white-pure p-4">
                  {Object.entries(item.metadata).map(([key, value], metaIdx) => (
                    <div key={key} className={`flex justify-between py-2 ${metaIdx !== Object.keys(item.metadata!).length - 1 ? 'border-b-2 border-black-pure' : ''}`}>
                      <span className="text-[10px] font-mono font-black text-black-pure/60 uppercase tracking-widest">
                        {key}
                      </span>
                      <span className="text-xs font-black text-black-pure uppercase tracking-tighter">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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

export default GridSection