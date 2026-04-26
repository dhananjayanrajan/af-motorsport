// ScrollSection.tsx
"use client"

import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import React, { useRef, useState } from 'react'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface ScrollItem {
  id: string
  title: string
  description: string
  image?: string
  percentage?: number
}

interface ScrollLabels {
  indexPrefix: string
  progressLabel: string
  statusComplete: string
}

interface ScrollSectionProps {
  id: string
  title: string
  subtitle: string
  items: ScrollItem[]
  labels: ScrollLabels
  variant?: 'parallax' | 'sticky' | 'reveal'
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  title,
  subtitle,
  items = [],
  labels,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.01 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.round(latest * 100))
  })

  const itemsWithImages = items.map((item, idx) => ({
    ...item,
    index: idx + 1,
    image: item.image || `https://picsum.photos/seed/${item.id}/800/1000`
  }))

  return (
    <section ref={sectionRef} id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden border-b-2 border-black-pure">
          <motion.div style={{ x }} className="flex items-center gap-12 md:gap-24 px-8 md:px-20">
            <div className="flex-shrink-0 w-[85vw] md:w-[30vw] flex flex-col gap-6 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-primary-500 transition-all duration-300 group-hover:w-20" />
                <span className="font-mono text-base font-black uppercase tracking-widest text-zinc-500">
                  {labels.indexPrefix}
                </span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-black-pure transition-colors duration-300 group-hover:text-primary-500">
                {title}
              </h2>
              <div className="h-1 w-full bg-black-pure" />
            </div>

            {itemsWithImages.map((item) => (
              <React.Fragment key={item.id}>
                <div className="flex-shrink-0 w-[75vw] md:w-[25vw]">
                  <div className="relative aspect-[3/4] overflow-hidden border-2 border-black-pure bg-zinc-100 transition-all duration-300 hover:border-primary-500 group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 px-3 py-1 border-2 border-black-pure bg-white-pure transition-colors duration-300 group-hover:bg-primary-500">
                      <span className="font-mono text-base font-black uppercase tracking-widest text-black-pure transition-colors duration-300 group-hover:text-white-pure">
                        IMAGE_{String(item.index).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[85vw] md:w-[45vw] flex flex-col gap-8 group">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base font-black uppercase tracking-widest text-primary-500 transition-colors duration-300 group-hover:text-secondary-500">
                      {String(item.index).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-px bg-zinc-200" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-black-pure transition-colors duration-300 group-hover:text-primary-500">
                    {item.title}
                  </h3>
                  <p className="text-base font-sans font-bold uppercase text-black-pure/60 transition-colors duration-300 group-hover:text-black-pure">
                    {item.description}
                  </p>
                  {item.percentage && (
                    <div className="mt-4">
                      <div className="flex justify-between items-end mb-3">
                        <span className="font-mono text-base font-black uppercase tracking-widest text-black-pure/60">
                          {labels.progressLabel}
                        </span>
                        <span className="font-mono text-base font-black uppercase tracking-widest text-black-pure">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="h-3 border-2 border-black-pure p-0.5 flex gap-0.5 bg-white-pure">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-full flex-grow transition-all duration-300 ${(i / 20) * 100 < item.percentage! ? 'bg-primary-500' : 'bg-white-100'}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}

            <div className="flex-shrink-0 w-[85vw] md:w-[30vw] border-l-4 border-black-pure pl-12 flex flex-col gap-6 group">
              <span className="font-mono text-base font-black uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-primary-500">
                {labels.statusComplete}
              </span>
              <div className="flex flex-col">
                <span className="text-2xl font-black uppercase tracking-tighter text-black-pure transition-colors duration-300 group-hover:text-primary-500">
                  {String(items.length).padStart(2, '0')}
                </span>
                <span className="text-2xl font-black uppercase tracking-tighter text-primary-500 transition-colors duration-300 group-hover:text-secondary-500">
                  {subtitle}
                </span>
              </div>
              <div className="h-2 w-full bg-black-pure mt-4" />
            </div>
          </motion.div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="py-16 flex justify-center bg-white-pure border-b-2 border-black-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      {isInView && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-8 z-50 pointer-events-auto">
          <div className="flex flex-col gap-2 p-4 border-2 border-black-pure bg-white-pure transition-all duration-300 hover:border-primary-500">
            <div className="flex justify-between items-end">
              <span className="font-mono text-base font-black uppercase tracking-widest text-black-pure">
                {labels.progressLabel}
              </span>
              <span className="font-mono text-base font-black uppercase tracking-widest text-black-pure tabular-nums">
                {progress}%
              </span>
            </div>
            <div className="h-2 w-full bg-white-100">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full w-full origin-left bg-primary-500"
              />
            </div>
          </div>
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default ScrollSection