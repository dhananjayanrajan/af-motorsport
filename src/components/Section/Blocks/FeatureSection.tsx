"use client"
import React from 'react'
import IsometricBackground from '../Backgrounds/IsometricBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

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

  const getImageUrl = (image?: string) => {
    if (image && image.trim() !== '') return image
    return `https://picsum.photos/id/${Math.abs(features[0]?.id.charCodeAt(0) || 1) % 100}/400/300`
  }

  return (
    <section className="relative w-full bg-white-pure border-y-2 border-black-pure py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-8">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(features.length)} />
        <div className={`grid ${gridCols[columns]} gap-8 mt-12`}>
          {features.map((feature, idx) => (
            <div key={feature.id} className="group border-2 border-black-pure bg-white-pure hover:bg-black-pure transition-all duration-300">
              <div className="p-6">
                {feature.icon && (
                  <div className="w-12 h-12 mb-4 flex items-center justify-center border-2 border-black-pure bg-primary-500 group-hover:bg-white-pure transition-all duration-300">
                    <div className="text-black-pure group-hover:text-black-pure">
                      {feature.icon}
                    </div>
                  </div>
                )}
                {feature.image && (
                  <div className="w-full h-40 overflow-hidden border border-black-pure mb-4">
                    <img
                      src={getImageUrl(feature.image)}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-6 h-6 bg-black-pure flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white-pure font-mono font-black text-xs">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-black-pure group-hover:text-white-pure transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs font-sans font-bold uppercase text-black-pure/60 leading-relaxed group-hover:text-white-pure/60 transition-colors mt-2">
                  {feature.description}
                </p>
                {feature.stats && feature.stats.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2 pt-4 border-t-2 border-black-pure group-hover:border-white-pure">
                    {feature.stats.map((stat, statIdx) => (
                      <div key={statIdx}>
                        <p className="text-[10px] font-mono font-black text-black-pure/40 uppercase tracking-widest group-hover:text-white-pure/40">
                          {stat.label}
                        </p>
                        <p className="text-sm font-black text-black-pure uppercase tracking-tighter group-hover:text-white-pure">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
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

export default FeatureSection