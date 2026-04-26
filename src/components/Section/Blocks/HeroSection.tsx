"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
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

  const uiLabels = {
    scroll: "VIEW MORE",
    metadata: "CONTEXT",
    id: "LOCATION"
  }

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
      className="relative w-full bg-background overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          {backgroundImage ? (
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <motion.img
                src={backgroundImage}
                alt=""
                className="w-full h-full object-cover"
                animate={{
                  x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.015,
                  y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.015,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white-pure/80 via-white-pure/40 to-white-pure/90" />
            </motion.div>
          ) : (
            background
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none container grid grid-cols-6 md:grid-cols-12 h-full border-x border-black-pure/5">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="col-span-1 border-r border-black-pure/[0.03] h-full last:border-r-0" />
        ))}
      </div>

      <div className="relative z-20 flex items-center justify-center h-full container">
        <div className={`w-full flex flex-col ${alignMap[alignment]}`} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 6rem' }}>

          {badge && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-10 flex items-center bg-black-pure text-white-pure px-6 py-2 relative overflow-hidden group/badge"
            >
              <motion.div
                className="absolute inset-0 bg-primary-500 translate-x-[-101%]"
                whileHover={{ translateX: "0%" }}
                transition={{ duration: 0.4, ease: "circOut" }}
              />
              <span className="relative z-10 text-base font-bold uppercase tracking-widest group-hover/badge:text-black-pure transition-colors duration-300">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-2xl font-bold text-black-pure mb-6 uppercase tracking-tight"
            style={{ maxWidth: '900px' }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "auto", opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-6 mb-10 overflow-hidden"
          >
            <div className="w-12 h-px bg-primary-500 shrink-0" />
            <span className="text-2xl font-medium text-black-pure/80 whitespace-nowrap uppercase italic">
              {subtitle}
            </span>
          </motion.div>

          {description && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 group"
            >
              <p className="text-base text-black-pure/70 leading-relaxed transition-colors duration-300 group-hover:text-black-pure max-w-[700px]">
                {description}
              </p>
            </motion.div>
          )}

          {actions.length > 0 && (
            <div className="flex flex-wrap gap-4 md:gap-8">
              {actions.map((action, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="group relative"
                >
                  <SectionButton
                    label={action.label}
                    href={action.href}
                    variant={action.variant || 'primary'}
                    className="!text-base !py-5 !px-10 font-bold transition-all duration-300 group-hover:-translate-y-1"
                  />
                  <div className="absolute inset-0 border-2 border-primary-500 opacity-0 transition-all duration-300 group-hover:opacity-100 -z-10 translate-x-2 translate-y-2" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: "backOut" }}
        className="absolute bottom-0 left-0 right-0 z-30 border-t-2 border-black-pure bg-white-pure"
        style={{ height: '96px' }}
      >
        <div className="container h-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x-2 divide-black-pure">

          <div className="flex flex-col justify-center px-4 md:px-8 group cursor-default relative overflow-hidden">
            <span className="text-[10px] font-black text-black-pure/40 mb-1 uppercase tracking-[0.2em]">
              {uiLabels.id}
            </span>
            <span className="text-base font-bold text-black-pure uppercase">
              {id}
            </span>
          </div>

          <div className="hidden md:flex flex-col justify-center lg:col-span-2 group overflow-hidden">
            <SectionScroller
              items={[meta || '', 'NODE_STABLE', 'SYS_2026', id]}
              variant={4}
              velocity={40}
            />
          </div>

          <div className="hidden lg:flex flex-col justify-center items-center px-8">
            <div className="flex gap-1.5">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [1, 2.5, 1],
                    backgroundColor: i % 3 === 0 ? '#00FF41' : '#000000'
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.1 }}
                  className="w-1 h-3"
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="col-span-1 md:col-span-1 lg:col-span-2 flex items-center justify-between px-10 bg-black-pure text-white-pure transition-colors duration-500 hover:bg-primary-500 group/scroll relative overflow-hidden"
          >
            <span className="relative z-10 text-base font-bold tracking-widest uppercase">
              {uiLabels.scroll}
            </span>
            <div className="relative z-10 w-12 h-12 border-2 border-white-pure/20 flex items-center justify-center transition-all duration-500 group-hover/scroll:rotate-90">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="3" strokeLinecap="square" />
              </svg>
            </div>
          </button>

        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection