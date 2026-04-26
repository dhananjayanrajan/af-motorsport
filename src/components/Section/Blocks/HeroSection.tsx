// HeroSection.tsx
"use client"
import React from 'react'
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
  alignment = 'left',
  background
}) => {
  const alignMap = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }

  const uiLabels = {
    scroll: "EXPLORE_CONTENT",
    metadata: "SECTION_METRICS",
    id: "OBJECT_REF"
  }

  return (
    <section
      id={id}
      className="relative w-full bg-white-pure overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover opacity-40 transition-transform duration-10000 hover:scale-110"
            />
            <div className="absolute inset-0 bg-white-pure/80" />
          </div>
        ) : (
          background
        )}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none container grid grid-cols-6 md:grid-cols-12 h-full border-x border-black-pure/5">
        <div className="col-span-1 border-r border-black-pure/5 h-full hidden md:block" />
        <div className="col-span-1 border-r border-black-pure/5 h-full hidden xl:block" />
      </div>

      <div className="relative z-20 flex items-center justify-center h-full container">
        <div className={`w-full flex flex-col transition-all duration-1000 ${alignMap[alignment]}`} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6rem' }}>

          {badge && (
            <div className="mb-10 flex items-center bg-primary-500 text-black-pure px-6 py-2 transition-all duration-500 hover:translate-x-1">
              <span className="text-base font-bold">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-2xl font-bold text-black-pure mb-6 transition-all duration-700 hover:translate-x-2" style={{ maxWidth: '900px' }}>
            {title}
          </h1>

          <div className="flex items-center gap-6 mb-10" style={{ maxWidth: '800px' }}>
            <div className="w-12 h-px bg-primary-500 hidden sm:block transition-all duration-500 hover:w-24" />
            <span className="text-2xl font-medium text-black-pure/80">
              {subtitle}
            </span>
          </div>

          {description && (
            <div className="mb-12 transition-all duration-500 hover:border-primary-500" style={{ maxWidth: '700px', borderLeft: '2px solid rgba(0,0,0,0.3)', paddingLeft: '2rem' }}>
              <p className="text-base text-black-pure/70">
                {description}
              </p>
            </div>
          )}

          {actions.length > 0 && (
            <div className="flex flex-wrap gap-4 md:gap-8">
              {actions.map((action, idx) => (
                <div key={idx} className="group relative">
                  <SectionButton
                    label={action.label}
                    href={action.href}
                    variant={action.variant || 'primary'}
                    className="!text-base !py-5 !px-10 font-bold transition-all duration-300 group-hover:-translate-y-1"
                  />
                  <div className="absolute inset-0 border-2 border-primary-500/0 transition-all duration-300 group-hover:border-primary-500 -z-10 translate-x-2 translate-y-2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-black-pure bg-white-pure" style={{ height: '96px' }}>
        <div className="container h-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">

          <div className="flex flex-col justify-center border-r border-black-pure px-4 md:px-8 group cursor-default transition-all duration-300 hover:bg-neutral-50">
            <span className="text-base text-black-pure/60 mb-1 transition-colors duration-300 group-hover:text-primary-500">
              {uiLabels.id}
            </span>
            <span className="text-base font-bold text-black-pure">
              {id}
            </span>
          </div>

          <div className="hidden md:flex flex-col justify-center border-r border-black-pure px-8 lg:col-span-2 transition-all duration-300 hover:bg-neutral-50">
            <span className="text-base text-black-pure/60 mb-1">
              {uiLabels.metadata}
            </span>
            <span className="text-base text-black-pure/80 truncate">
              {meta}
            </span>
          </div>

          <div className="hidden lg:flex flex-col justify-center border-r border-black-pure px-8">
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`w-1 h-4 transition-all duration-300 ${i % 2 === 0 ? 'bg-primary-500' : 'bg-black-pure/30'}`} />
              ))}
            </div>
          </div>

          <button className="col-span-1 md:col-span-1 lg:col-span-2 flex items-center justify-between px-8 bg-neutral-50 transition-all duration-300 hover:bg-primary-500 group">
            <span className="text-base font-bold text-black-pure transition-all duration-300 group-hover:translate-x-2">
              {uiLabels.scroll}
            </span>
            <div className="w-8 h-8 border-2 border-black-pure flex items-center justify-center transition-all duration-300 group-hover:bg-black-pure">
              <div className="w-1 h-3 bg-black-pure transition-colors duration-300 group-hover:bg-primary-500" />
            </div>
          </button>

        </div>
      </div>
    </section>
  )
}

export default HeroSection