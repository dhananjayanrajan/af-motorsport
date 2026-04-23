"use client"
import React from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import IsometricBackground from '../Backgrounds/IsometricBackground'

export interface Feature {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  stats?: { label: string; value: string }[]
}

interface FeatureSectionProps {
  id: string
  title: string
  subtitle: string
  features: Feature[]
  columns?: 2 | 3 | 4
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  title,
  subtitle,
  features,
  columns = 3,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <IsometricBackground opacity={0.3} />
}) => {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(features.length)} />
        <div className={`grid ${gridCols[columns]} gap-8 mt-12`}>
          {features.map((feature) => (
            <div key={feature.id} className="group p-6 bg-card border border-border rounded-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              {feature.icon && <div className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform">{feature.icon}</div>}
              {feature.image && <img src={feature.image} alt={feature.title} className="w-full h-40 object-cover rounded-lg mb-4" />}
              <h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground mt-2">{feature.description}</p>
              {feature.stats && (
                <div className="mt-4 grid grid-cols-2 gap-2 pt-4 border-t border-border">
                  {feature.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-muted-foreground uppercase">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default FeatureSection
