"use client"
import React from 'react'
import RacingLinesBackground from '../Backgrounds/RacingLinesBackground'
import SectionButton from '../Components/SectionButton'

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

  const getFlexJustify = (align: string) => {
    if (align === 'left') return 'justify-start'
    if (align === 'right') return 'justify-end'
    return 'justify-center'
  }

  return (
    <section id={id} className="relative w-full min-h-screen flex flex-col bg-black-pure overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {backgroundImage ? (
          <div className="relative w-full h-full">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-black-pure via-black-pure/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-transparent to-black-pure/20" />
          </div>
        ) : (
          background
        )}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white-pure/10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white-pure/10" />
        <div className="absolute left-24 top-0 h-full w-px bg-white-pure/5" />
        <div className="absolute right-24 top-0 h-full w-px bg-white-pure/5" />
      </div>

      <div className="relative z-20 flex-grow flex flex-col px-8 md:px-24 py-40">
        <div className={`w-full flex flex-col ${alignClass[alignment]}`}>
          {badge && (
            <div className="mb-12 flex items-center gap-6">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-primary-500 skew-x-[-20deg]" />
                ))}
              </div>
              <span className="text-xs font-mono font-black text-primary-500 uppercase tracking-[0.5em]">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-7xl md:text-[12rem] font-mono font-black text-white-pure uppercase tracking-tighter leading-[0.75] mb-6 italic">
            {title}
          </h1>

          <div className="flex flex-col md:flex-row items-baseline gap-8 mb-12">
            <span className="text-2xl md:text-5xl font-mono font-black text-primary-500 uppercase tracking-tight">
              {subtitle}
            </span>
            <div className="h-px flex-grow bg-white-pure/10 hidden md:block min-w-[100px]" />
          </div>

          {description && (
            <div className="relative p-8 border-l-2 border-primary-500 bg-white-pure/[0.02] backdrop-blur-sm max-w-xl mb-16">
              <p className="text-sm font-mono font-black text-white-pure/60 uppercase leading-relaxed">
                {description}
              </p>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white-pure/20" />
            </div>
          )}

          {actions.length > 0 && (
            <div className={`flex flex-wrap gap-8 ${getFlexJustify(alignment)}`}>
              {actions.map((action, idx) => (
                <SectionButton
                  key={idx}
                  label={action.label}
                  href={action.href}
                  variant={action.variant || 'primary'}
                  size="lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-30 w-full grid grid-cols-1 md:grid-cols-4 border-t border-white-pure/10 h-32 bg-black-pure">
        <div className="flex items-center px-12 border-r border-white-pure/10 group hover:bg-primary-500 transition-colors duration-300">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono font-black text-white-pure/30 group-hover:text-black-pure/40 uppercase tracking-widest mb-1">
              LOC_COORD
            </span>
            <span className="text-sm font-mono font-black text-white-pure group-hover:text-black-pure uppercase">
              {id.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-center px-12 border-r border-white-pure/10">
          <span className="text-[9px] font-mono font-black text-white-pure/30 uppercase tracking-widest mb-2">
            STATUS_OK
          </span>
          <div className="flex gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`h-4 w-1 ${i < 8 ? 'bg-primary-500' : 'bg-white-pure/10'}`} />
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center px-12 border-r border-white-pure/10">
          <div className="flex flex-col w-full">
            <span className="text-[9px] font-mono font-black text-white-pure/30 uppercase tracking-widest mb-1">
              LOG_META
            </span>
            <span className="text-xs font-mono font-black text-white-pure uppercase truncate italic">
              {meta}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-12 bg-primary-500 group cursor-pointer overflow-hidden relative">
          <span className="text-xs font-mono font-black text-black-pure uppercase tracking-[0.3em] relative z-10">
            SCROLL_TO_EXPAND
          </span>
          <div className="w-8 h-8 border-2 border-black-pure flex items-center justify-center relative z-10 group-hover:rotate-90 transition-transform duration-500">
            <div className="w-1 h-4 bg-black-pure" />
            <div className="w-4 h-1 bg-black-pure absolute" />
          </div>
          <div className="absolute inset-0 bg-white-pure translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection