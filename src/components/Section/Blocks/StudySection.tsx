"use client"

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import React, { useRef } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

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
  const isInView = useInView(sectionRef, { amount: 0.3, once: true })

  const study = studies[0]
  if (!study) return null
  const targetHref = study.ctaHref || ctaPath

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-white-pure border-t-2 border-black-pure flex flex-col overflow-hidden select-none"
    >
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(studies.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10 flex-1 flex flex-col">
        <div className="relative min-h-[600px] lg:min-h-[750px] xl:min-h-[850px] border-2 border-black-pure bg-white-pure overflow-hidden flex flex-col lg:flex-row">

          <div className="hidden lg:flex w-16 xl:w-20 border-r-2 border-black-pure flex-col items-center justify-between py-10 bg-white-pure">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-[10px] xl:text-xs font-mono font-black uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]"
            >
              REFERENCE
            </motion.span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="text-sm xl:text-md font-mono font-black tabular-nums text-primary-500"
            >
              {String(study.id).padStart(2, '0')}
            </motion.span>
          </div>

          <div className="relative flex-1 bg-white-pure overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-black-pure group">
            <motion.div
              initial={{ scale: 1.15 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0"
            >
              <img
                src={study.image && study.image !== "" ? study.image : `https://picsum.photos/seed/${study.id}/1600/900`}
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ x: '0%' }}
              animate={isInView ? { x: '100%' } : {}}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="absolute inset-0 bg-black-pure z-10"
            />
          </div>

          <div className="relative w-full lg:w-[400px] xl:w-[500px] bg-white-pure flex flex-col">
            <div className="p-6 sm:p-10 xl:p-14 flex-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[10px] xl:text-xs font-mono font-black uppercase tracking-widest text-primary-500">
                    {study.tags?.[0] || 'FEATURED'}
                  </span>
                  <div className="h-[2px] flex-1 bg-black-pure" />
                </div>

                <h3 className="text-xl xl:text-2xl font-black uppercase tracking-tighter text-black-pure leading-tight mb-6">
                  {study.title}
                </h3>

                <p className="text-xs xl:text-sm font-bold text-black-pure leading-relaxed mb-12 opacity-90">
                  {study.description}
                </p>

                {targetHref && (study.ctaLabel || ctaLabel) && (
                  <Link
                    href={targetHref}
                    className="group relative h-14 xl:h-16 w-full bg-black-pure text-white-pure flex items-center justify-between px-6 xl:px-8 text-[10px] xl:text-xs font-mono font-black uppercase tracking-widest transition-colors duration-300 hover:bg-primary-500 hover:text-black-pure"
                  >
                    <span>{study.ctaLabel || ctaLabel}</span>
                    <div className="size-2 bg-primary-500 group-hover:bg-black-pure transition-colors duration-300" />
                  </Link>
                )}
              </motion.div>
            </div>

            {study.metrics && study.metrics.length > 0 && (
              <div className="h-20 xl:h-28 border-t-2 border-black-pure flex divide-x-2 divide-black-pure bg-white-pure">
                {study.metrics.slice(0, 2).map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="flex-1 flex flex-col items-center justify-center px-4"
                  >
                    <span className="text-[9px] xl:text-[10px] font-mono font-black uppercase text-black-pure/50 leading-none mb-2">
                      {metric.label}
                    </span>
                    <span className="text-xs xl:text-sm font-mono font-black text-black-pure uppercase tabular-nums">
                      {metric.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default StudySection