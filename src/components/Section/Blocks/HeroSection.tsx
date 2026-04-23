"use client"
import React from 'react'
import SectionButton from '../Components/SectionButton'
import RacingLinesBackground from '../Backgrounds/RacingLinesBackground'

export interface HeroAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
}

interface HeroSectionProps {
  id: string
  title: string
  subtitle: string
  description?: string
  backgroundImage?: string
  actions?: HeroAction[]
  badge?: string
  meta?: string
  alignment?: 'left' | 'center' | 'right'
  background?: React.ReactNode
}

const HeroSection: React.FC<HeroSectionProps> = ({
  id,
  title,
  subtitle,
  description,
  backgroundImage,
  actions = [],
  badge,
  meta,
  alignment = 'center',
  background = <RacingLinesBackground opacity={0.4} />
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {backgroundImage ? (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        </div>
      ) : (
        background
      )}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className={`max-w-4xl mx-auto flex flex-col ${alignClass[alignment]}`}>
          {badge && (
            <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-primary font-mono text-sm font-bold uppercase">{badge}</span>
            </div>
          )}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-background drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase text-primary/90 mt-4">{subtitle}</p>
          {description && <p className="text-background/80 text-lg max-w-2xl mt-6">{description}</p>}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8">
              {actions.map((action, idx) => (
                <SectionButton key={idx} label={action.label} href={action.href} variant={action.variant || 'primary'} size="lg" />
              ))}
            </div>
          )}
          {meta && <p className="text-background/50 text-sm mt-8 font-mono">{meta}</p>}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
