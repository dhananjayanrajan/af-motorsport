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
            <img src={backgroundImage} alt="" className="w-full h-full object-cover grayscale opacity-50" />
            <div className="absolute inset-0 bg-black-pure/40" />
          </div>
        ) : (
          background
        )}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-white-pure/20" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white-pure/20" />
        <div className="absolute left-12 md:left-24 top-0 h-full w-px bg-white-pure/10" />
        <div className="absolute right-12 md:right-24 top-0 h-full w-px bg-white-pure/10" />
      </div>

      <div className="relative z-20 flex-grow flex flex-col px-8 md:px-24 py-32 md:py-48 justify-center">
        <div className={`w-full flex flex-col ${alignClass[alignment]}`}>
          {badge && (
            <div className="mb-10 flex items-center gap-4 border border-primary-500 px-4 py-2 bg-black-pure shadow-[4px_4px_0px_0px_#00FF41]">
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-3 bg-primary-500" />
                ))}
              </div>
              <span className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-[0.4em]">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-6xl md:text-[11rem] font-mono font-black text-white-pure uppercase tracking-tighter leading-[0.8] mb-8 italic">
            {title}
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-12 w-full max-w-7xl">
            <span className="text-xl md:text-5xl font-mono font-black text-primary-500 uppercase tracking-tight bg-white-pure text-black-pure px-4 py-1">
              {subtitle}
            </span>
            <div className="h-0.5 flex-grow bg-white-pure/20 hidden md:block" />
          </div>

          {description && (
            <div className="relative p-8 border border-white-pure/20 bg-black-pure max-w-2xl mb-16 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary-500" />
              <p className="text-[11px] font-mono font-black text-white-pure uppercase leading-relaxed tracking-wide">
                {description}
              </p>
            </div>
          )}

          {actions.length > 0 && (
            <div className={`flex flex-wrap gap-6 ${getFlexJustify(alignment)}`}>
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

      <div className="relative z-30 w-full grid grid-cols-1 md:grid-cols-4 border-t border-white-pure bg-black-pure">
        <div className="flex items-center px-12 h-24 md:h-32 border-r border-white-pure group hover:bg-primary-500 transition-colors">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono font-black text-white-pure/40 group-hover:text-black-pure uppercase tracking-widest mb-1">
              SYS_ID
            </span>
            <span className="text-sm font-mono font-black text-white-pure group-hover:text-black-pure uppercase tabular-nums">
              {id.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-center px-12 border-r border-white-pure bg-neutral-900">
          <span className="text-[8px] font-mono font-black text-white-pure/40 uppercase tracking-widest mb-3">
            BUFFER_STATUS
          </span>
          <div className="flex gap-1 h-3">
            {[...Array(16)].map((_, i) => (
              <div key={i} className={`flex-grow ${i < 10 ? 'bg-primary-500' : 'bg-white-pure/5 border border-white-pure/10'}`} />
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center px-12 border-r border-white-pure">
          <div className="flex flex-col w-full">
            <span className="text-[8px] font-mono font-black text-white-pure/40 uppercase tracking-widest mb-1">
              ENCODED_META
            </span>
            <span className="text-[10px] font-mono font-black text-white-pure uppercase truncate">
              {meta}
            </span>
          </div>
        </div>

        <button className="flex items-center justify-between px-12 h-24 md:h-32 bg-primary-500 group hover:bg-white-pure transition-colors">
          <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-[0.3em]">
            INITIALIZE_SCROLL
          </span>
          <div className="w-10 h-10 border border-black-pure flex items-center justify-center group-hover:bg-black-pure transition-colors">
            <div className="w-0.5 h-4 bg-black-pure group-hover:bg-primary-500 transition-colors" />
            <div className="w-4 h-0.5 bg-black-pure absolute group-hover:bg-primary-500 transition-colors" />
          </div>
        </button>
      </div>
    </section>
  )
}

export default HeroSection