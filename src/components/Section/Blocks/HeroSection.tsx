"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import WeaveBackground from '../Backgrounds/WeaveBackground'
import SectionButton from '../Components/SectionButton'
import SectionScroller from '../Components/SectionScroller'

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const alignMap = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }

  const textAndDecorationColor = backgroundImage || background ? 'text-white-pure' : 'text-black-pure'
  const decorationBgColor = backgroundImage || background ? 'bg-white-pure' : 'bg-black-pure'

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id={id}
      className="relative w-full min-h-screen bg-white-pure overflow-hidden flex flex-col border-b-2 border-black-pure"
    >
      <WeaveBackground />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-20 flex-1 flex flex-col">
        <div className="relative flex-1 border-2 border-black-pure bg-white-pure overflow-hidden flex flex-col">

          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <AnimatePresence>
              {backgroundImage ? (
                <motion.div
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="w-full h-full bg-black-pure"
                >
                  <motion.img
                    src={backgroundImage}
                    alt=""
                    className="w-full h-full object-cover brightness-[0.5] contrast-125"
                    animate={{
                      x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.01,
                      y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.01,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </motion.div>
              ) : (
                background
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-12 h-full border-x border-black-pure opacity-20">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="col-span-1 border-r border-black-pure h-full last:border-r-0" />
            ))}
          </div>

          <div className="relative z-20 flex-1 flex items-center justify-center px-6 py-12">
            <div className={`w-full max-w-5xl flex flex-col ${alignMap[alignment]}`}>
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 px-4 py-1 border-2 border-black-pure bg-black-pure text-white-pure font-bold uppercase tracking-widest text-xs md:text-sm"
                >
                  {badge}
                </motion.div>
              )}

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`text-3xl md:text-5xl lg:text-7xl font-bold ${textAndDecorationColor} mb-6 uppercase tracking-tighter`}
              >
                {title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className={`w-12 h-1 ${decorationBgColor}`} />
                <span className={`text-lg md:text-xl font-bold uppercase tracking-tight ${textAndDecorationColor}`}>
                  {subtitle}
                </span>
              </motion.div>

              {description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-sm md:text-base ${textAndDecorationColor} leading-relaxed max-w-2xl mb-12`}
                >
                  {description}
                </motion.p>
              )}

              {actions.length > 0 && (
                <div className={`flex flex-wrap gap-4 w-full ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                  {actions.map((action, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <SectionButton
                        label={action.label}
                        href={action.href}
                        variant={action.variant || 'primary'}
                        className="!py-3 !px-8 font-bold uppercase tracking-widest"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-30 border-t-2 border-black-pure bg-white-pure w-full"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x-2 divide-black-pure h-20">
          <div className="flex flex-col justify-center px-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black-pure/50">Location</span>
            <span className="text-sm font-bold uppercase text-black-pure">{id}</span>
          </div>

          <div className="hidden md:flex flex-col justify-center lg:col-span-2 overflow-hidden">
            <SectionScroller
              items={[meta || '', 'SYS_2026', id]}
              variant={4}
              velocity={30}
            />
          </div>

          <div className="hidden lg:flex items-center justify-center px-8">
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                  className="w-1 h-4 bg-black-pure"
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="col-span-1 lg:col-span-2 flex items-center justify-between px-8 bg-black-pure text-white-pure hover:bg-primary-500 transition-colors group"
          >
            <span className="text-sm font-bold uppercase tracking-widest">Scroll</span>
            <div className="w-10 h-10 border-2 border-white-pure flex items-center justify-center group-hover:rotate-90 transition-transform">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="3" />
              </svg>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection