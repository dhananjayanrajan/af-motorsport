"use client"
import React from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionCard from '../Components/SectionCard'
import SectionButton from '../Components/SectionButton'
import DotGridBackground from '../Backgrounds/DotGridBackground'

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

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(items.length)} />
        <div className={`grid ${gridCols[columns]} gap-6 md:gap-8 mt-12`}>
          {items.map((item) => (
            <div key={item.id} className="h-full">
              <SectionCard
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                label={item.label}
                variant={cardVariant}
                onClick={item.href ? () => window.location.href = item.href! : undefined}
              />
              {showMetadata && item.metadata && (
                <div className="mt-4 p-4 bg-card border border-border rounded-lg">
                  {Object.entries(item.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                      <span className="font-mono text-muted-foreground uppercase">{key}</span>
                      <span className="font-semibold text-foreground">{value}</span>
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
