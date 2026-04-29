"use client"

import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
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

  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
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

      <div className="z-10 flex flex-col items-center">

        <motion.div
          style={{ y: yEffect }}
          className="relative group"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[280px] xs:w-[320px] md:w-[480px] lg:w-[580px] aspect-[4/5] bg-white-pure p-3 md:p-5 border-2 border-black-pure shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-500"
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

              <div className="absolute top-0 left-0 bg-black-pure text-white-pure px-3 py-1 font-mono font-black text-xs italic">
                {String(study.id).padStart(2, '0')}
              </div>
            </div>

            <div className="absolute -right-2 -bottom-2 md:-right-4 md:-bottom-4 bg-primary-500 border-2 border-black-pure px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hidden md:block">
              <span className="text-black-pure font-mono font-black text-[10px] uppercase tracking-tighter">
                HALL_OF_FAME // 2026
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mt-20 w-full max-w-4xl flex flex-col items-center text-center"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {study.tags?.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black-pure bg-white-pure shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-black-pure leading-none mb-4">
            {study.title}
          </h3>

          <p className="max-w-lg text-xs font-bold uppercase text-black-pure/60 leading-relaxed mb-10 tracking-tight">
            {study.description}
          </p>

          {study.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 w-full border-t-2 border-l-2 border-black-pure mb-12">
              {study.metrics.slice(0, 4).map((metric, i) => (
                <div key={i} className="p-5 border-r-2 border-b-2 border-black-pure bg-white-pure hover:bg-neutral-50 transition-colors">
                  <div className="text-lg md:text-xl font-black italic text-black-pure leading-none mb-1 tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-mono font-black text-black-pure/40 uppercase tracking-widest">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {targetHref && (
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link
                href={targetHref}
                className="group relative inline-flex items-center gap-4 bg-black-pure text-white-pure px-8 py-4 text-xs font-mono font-black uppercase tracking-[0.2em] border-2 border-black-pure transition-all shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] hover:shadow-none"
              >
                {study.ctaLabel || ctaLabel || 'OPEN_RECORD'}
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="w-full border-t-2 border-black-pure bg-white-pure relative">
        <motion.div
          className="absolute top-0 left-0 h-1 bg-primary-500 z-20"
          style={{ scaleX: scaleProgress, originX: 0 }}
        />
        <SectionScroller items={studies.map(s => s.title)} variant={1} velocity={10} />
      </div>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default StudySection