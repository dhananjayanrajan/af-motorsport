"use client"

import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
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
  headerVariant = 1,
  footerVariant = 1,
  background
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<ScrollItem | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section ref={sectionRef} id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      {background}
      <DotGridBackground />

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <AnimatePresence>
        {isHovering && !sidebarOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed z-50 pointer-events-none flex items-center justify-center"
            style={{ left: mousePos.x, top: mousePos.y, x: '-50%', y: '-50%' }}
          >
            <div className="bg-primary-500 text-black-pure px-4 py-2 border-2 border-black-pure text-[10px] font-mono font-black uppercase tracking-widest whitespace-nowrap">
              Show Details
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container relative z-10 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, 6).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                setActiveItem(item)
                setSidebarOpen(true)
              }}
              className="group cursor-none relative aspect-square md:aspect-[4/5] bg-white-pure border-2 border-black-pure overflow-hidden"
            >
              <img
                src={item.image || `https://picsum.photos/seed/${item.id}/800/1000`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white-pure mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="font-mono text-[10px] font-black text-white-pure uppercase tracking-widest bg-black-pure px-2 py-1 mb-2 inline-block">
                  {labels.indexPrefix} {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-black text-white-pure uppercase tracking-tighter leading-none mix-blend-difference">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionFooter variant={footerVariant} />

      <SectionSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title={activeItem?.title || ''}
        description={activeItem?.description || ''}
        imageUrl={activeItem?.image || `https://picsum.photos/seed/${activeItem?.id}/1200/800`}
        idCode={activeItem?.id || ''}
        stats={[
          { label: labels.progressLabel, val: `${activeItem?.percentage || 0}%`, color: 'bg-primary-500' },
          { label: 'STATUS', val: labels.statusComplete, color: 'bg-black-pure' }
        ]}
        buttonLabel="Project Link"
        onAction={() => setSidebarOpen(false)}
      />

      <style jsx global>{`
        .sidebar-content-scroll {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .sidebar-content-scroll {
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 2rem;
          }
          .sidebar-content-scroll > * {
            flex-shrink: 0;
            width: 60vw;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  )
}

export default ScrollSection