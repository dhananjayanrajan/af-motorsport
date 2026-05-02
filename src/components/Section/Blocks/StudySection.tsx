"use client"

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
  const isInView = useInView(sectionRef, { amount: 0.2, once: true })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const yEffect = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])

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

      <div className="container z-10 flex flex-col items-center py-16 md:py-24 lg:py-32 px-4">
        <motion.div
          style={{ y: yEffect }}
          className="relative group w-full flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[580px] aspect-[4/5] bg-white-pure p-3 md:p-5 border-2 border-black-pure shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-500"
          >
            <div className="relative w-full h-full overflow-hidden border-2 border-black-pure bg-neutral-100">
              <motion.img
                initial={{ filter: 'grayscale(100%)' }}
                whileInView={{ filter: 'grayscale(0%)' }}
                transition={{ duration: 1.5 }}
                src={study.image && study.image !== "" ? study.image : `https://picsum.photos/seed/${study.id}/1200/1600`}
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-500/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 bg-black-pure text-white-pure px-3 py-1 font-mono font-black text-xs">
                {String(study.id).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mt-16 md:mt-24 w-full max-w-4xl flex flex-col items-center text-center px-4"
        >
          {study.tags && study.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {study.tags.map((tag, idx) => (
                <span key={idx} className="text-xs font-mono font-black uppercase tracking-widest px-3 py-1 border-2 border-black-pure bg-white-pure shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] break-words max-w-[200px]">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-black-pure leading-tight mb-6 break-words">
            {study.title}
          </h3>

          <p className="w-full max-w-2xl text-sm md:text-base font-medium text-black-pure/70 leading-relaxed mb-12 break-words whitespace-pre-wrap">
            {study.description}
          </p>

          {study.metrics && study.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 w-full border-t-2 border-l-2 border-black-pure mb-12">
              {study.metrics.slice(0, 4).map((metric, i) => (
                <div key={i} className="p-4 md:p-5 border-r-2 border-b-2 border-black-pure bg-white-pure hover:bg-neutral-50 transition-colors min-w-0">
                  <div className="text-lg md:text-xl font-black text-black-pure leading-none mb-1 tabular-nums break-words">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono font-black text-black-pure/40 uppercase tracking-widest break-words">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {targetHref && (study.ctaLabel || ctaLabel) && (
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link
                href={targetHref}
                className="group relative inline-flex items-center gap-4 bg-black-pure text-white-pure px-8 py-4 text-xs font-mono font-black uppercase tracking-[0.2em] border-2 border-black-pure transition-all shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] hover:shadow-none"
              >
                <span className="break-words">{study.ctaLabel || ctaLabel}</span>
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default StudySection