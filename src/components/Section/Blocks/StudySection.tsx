"use client"

import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionScroller from '../Components/SectionScroller'

export interface Study {
  id: string
  title: string
  description: string
  image: string
  metrics?: { label: string; value: string }[]
  tags?: string[]
  ctaLabel?: string
  ctaHref?: string
}

interface StudySectionProps {
  id: string
  title: string
  subtitle: string
  studies: Study[]
  variant?: 'grid' | 'featured'
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const StudySection: React.FC<StudySectionProps> = ({
  id,
  title,
  subtitle,
  studies = [],
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2, once: true })

  const study = studies[0]
  if (!study) return null

  const targetHref = study.ctaHref || ctaPath

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-white-pure border-t-2 border-black-pure flex flex-col items-center overflow-hidden select-none"
    >
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(studies.length).padStart(2, '0')}
      />

      <div className="relative z-10 w-full px-4 py-16 xs:py-24 sm:py-32 md:py-40 lg:py-48 xl:py-56 2xl:py-64 flex flex-col items-center">

        <div className="relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[280px] xs:w-[300px] sm:w-[340px] md:w-[400px] lg:w-[440px] xl:w-[520px] 2xl:w-[640px] aspect-[2/3] bg-black-pure overflow-hidden"
            style={{
              boxShadow: `
                0 30px 60px -12px #000000,
                0 18px 36px -18px #000000,
                0 0 0 1px #171717
              `
            }}
          >
            <motion.div
              className="absolute inset-0 z-0"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover brightness-[0.65]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-transparent to-transparent" />
            </motion.div>

            <div className="absolute top-6 left-6 xs:top-8 xs:left-8 z-30">
              <motion.span
                initial={{ x: -15, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="text-4xl xs:text-5xl md:text-6xl font-black italic text-white-pure leading-none tracking-tighter"
              >
                {study.id.slice(0, 2)}
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 32 } : {}}
                transition={{ delay: 0.8 }}
                className="h-[2px] mt-2 bg-primary-500"
              />
            </div>

            <div className="absolute inset-x-6 bottom-10 xs:inset-x-8 xs:bottom-12 z-30 flex flex-col items-center text-center">
              <div className="flex flex-wrap justify-center gap-1.5 mb-5 xs:mb-7">
                {study.tags?.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ y: 8, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.9 + (idx * 0.08) }}
                    className="text-[7px] xs:text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 bg-primary-500 text-black-pure"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <motion.h3
                initial={{ y: 15, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1.1 }}
                className="text-lg xs:text-xl md:text-2xl lg:text-3xl font-black italic uppercase tracking-tighter text-white-pure leading-[0.95] max-w-[85%]"
              >
                {study.title}
              </motion.h3>
            </div>
          </motion.div>

          <div className="absolute -inset-6 xs:-inset-8 md:-inset-12 border border-neutral-100 -z-10 pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3 }}
          className="mt-16 xs:mt-20 md:mt-24 w-full max-w-5xl flex flex-col items-center gap-10 md:gap-16 px-4"
        >
          <div className="w-full max-w-2xl flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full">
              <div className="h-px grow bg-neutral-100" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-300">Description</span>
              <div className="h-px grow bg-neutral-100" />
            </div>
            <p className="text-center text-[11px] xs:text-xs md:text-sm font-bold uppercase italic leading-relaxed text-neutral-400 tracking-wide">
              {study.description}
            </p>
          </div>

          {study.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full border-2 border-black-pure">
              {study.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center justify-center py-8 px-4 border-b sm:border-b-0 sm:border-r border-black-pure last:border-b-0 last:border-r-0 group/metric bg-white-pure"
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-base xs:text-lg md:text-xl font-black italic tracking-tighter text-black-pure group-hover/metric:text-primary-500 leading-none transition-colors duration-300">
                    {metric.value}
                  </span>
                  <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-[0.5em] text-neutral-400 group-hover/metric:text-white-pure mt-3 transition-colors duration-300">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="w-full border-t-2 border-black-pure bg-white-pure">
        <SectionScroller items={studies.map(s => s.title)} variant={1} velocity={10} />
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default StudySection;