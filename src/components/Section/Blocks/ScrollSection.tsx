"use client"

import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import React, { useRef, useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionSidebar from '../Components/SectionSidebar'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<ScrollItem | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const x = useTransform(smoothProgress, [0, 1], ['0%', '-70%'])
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.round(latest * 100))
  })

  const itemsWithImages = items.slice(0, 6).map((item, idx) => ({
    ...item,
    index: idx + 1,
    image: item.image || `https://picsum.photos/seed/${item.id}/800/1000`
  }))

  return (
    <section ref={sectionRef} id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure">
      {background}

      <DotGridBackground />

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div ref={containerRef} className="relative z-1" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden border-b-2 border-black-pure">
          <motion.div style={{ x }} className="flex items-center gap-24 md:gap-48 px-12 md:px-32">

            <div className="flex-shrink-0 w-[80vw] md:w-[30vw] flex flex-col group">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-primary-500 mb-4 transition-transform duration-500 group-hover:translate-x-2">
                {labels.indexPrefix}
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black-pure leading-none mb-8">
                {title}
              </h2>
              <div className="w-12 h-1 bg-black-pure" />
            </div>

            {itemsWithImages.map((item) => (
              <React.Fragment key={item.id}>
                <div className="flex-shrink-0 w-[70vw] md:w-[28vw]">
                  <div className="relative aspect-[3/4] overflow-hidden border-2 border-black-pure bg-white-pure group transition-transform duration-700 hover:-rotate-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-0 right-0 p-4">
                      <span className="font-mono text-xs font-black text-white-pure mix-blend-difference uppercase tracking-widest bg-black-pure px-2 py-1">
                        {String(item.index).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[85vw] md:w-[40vw] flex flex-col group">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-mono text-xs font-bold text-black-pure uppercase tracking-widest">Item</span>
                    <span className="font-mono text-xl md:text-3xl font-black text-black-pure leading-none">
                      {String(item.index).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black-pure leading-tight mb-8 group-hover:text-primary-500 transition-colors duration-500">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base font-sans font-medium text-black-pure leading-relaxed max-w-md uppercase">
                    {item.description}
                  </p>

                  <button
                    onClick={() => {
                      setActiveItem(item)
                      setSidebarOpen(true)
                    }}
                    className="mt-8 text-xs font-mono font-black uppercase tracking-widest text-black-pure hover:text-primary-500 transition-colors self-start border-2 border-black-pure px-4 py-2 hover:bg-black-pure hover:text-white-pure"
                  >
                    View Details
                  </button>

                  <div className="mt-12 h-1 w-full bg-white-pure relative overflow-hidden border-2 border-black-pure">
                    <div className="absolute inset-0 bg-primary-500 w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
                  </div>
                </div>
              </React.Fragment>
            ))}

            <div className="flex-shrink-0 w-[80vw] md:w-[35vw] flex flex-col justify-center">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-black-pure mb-6">
                {labels.statusComplete}
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black-pure">
                  {subtitle}
                </span>
                <span className="font-mono text-xl md:text-3xl font-black text-primary-500">
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="py-24 flex justify-center bg-white-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      {isInView && (
        <div className="fixed bottom-10 left-10 z-50 pointer-events-none">
          <div className="flex flex-col gap-4 p-6 bg-white-pure border-2 border-black-pure">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-black uppercase tracking-widest text-black-pure mb-1">
                {labels.progressLabel}
              </span>
              <span className="font-mono text-xl md:text-2xl font-black text-black-pure tabular-nums leading-none">
                {progress}%
              </span>
            </div>
            <div className="w-32 md:w-48 h-2 bg-white-pure relative overflow-hidden border-2 border-black-pure">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="absolute inset-0 origin-left bg-primary-500"
              />
            </div>
          </div>
        </div>
      )}

      <SectionFooter variant={footerVariant} />

      <SectionSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title={activeItem?.title || ''}
        description={activeItem?.description || ''}
        imageUrl={activeItem?.image || ''}
        idCode={activeItem?.id || ''}
        stats={[
          { label: 'Progress', val: `${activeItem?.percentage || 0}%`, color: 'bg-primary-500' },
          { label: 'ID', val: activeItem?.id || '00', color: 'bg-black-pure' }
        ]}
        buttonLabel="View Details"
        onAction={() => setSidebarOpen(false)}
      />
    </section>
  )
}

export default ScrollSection