"use client"

import { AnimatePresence, motion } from 'framer-motion'
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
  content?: any
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

  const parsePayloadContent = (content: any): string => {
    if (!content) return ""
    if (typeof content === 'string') return content

    try {
      if (typeof content === 'object' && content.root?.children) {
        return content.root.children
          .map((node: any) => {
            if (node.children) {
              return node.children.map((child: any) => child.text || "").join("")
            }
            return ""
          })
          .filter(Boolean)
          .join("\n\n")
      }
    } catch (e) {
      return ""
    }
    return ""
  }

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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed z-50 pointer-events-none flex items-center justify-center"
            style={{ left: mousePos.x, top: mousePos.y, x: '-50%', y: '-50%' }}
          >
            <div className="bg-primary-500 text-black-pure px-4 py-2 border-2 border-black-pure text-[10px] font-mono font-black uppercase tracking-widest whitespace-nowrap">
              VIEW DETAILS
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container relative z-10 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 max-w-6xl mx-auto">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                setActiveItem(item)
                setSidebarOpen(true)
              }}
              className="group cursor-none relative flex flex-col"
            >
              <div className="relative aspect-[16/9] border-2 border-black-pure bg-white-pure p-2 transition-all duration-500 group-hover:border-primary-500">
                <div className="relative w-full h-full overflow-hidden border border-black-pure bg-white-pure">
                  <img
                    src={item.image || `https://picsum.photos/seed/${item.id}/1200/800`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-black-pure text-white-pure px-3 py-1 text-[10px] font-mono font-black border-r-2 border-b-2 border-white-pure group-hover:bg-primary-500 group-hover:text-black-pure transition-colors">
                  {labels.indexPrefix} {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start">
                <span className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-widest mb-2">
                  DATA RECOGNITION: {item.id}
                </span>
                <h3 className="text-xl xl:text-2xl font-black text-black-pure uppercase tracking-tighter leading-none mb-3">
                  {item.title}
                </h3>
                <p className="text-xs xl:text-sm font-bold text-black-pure leading-relaxed opacity-90 max-w-md line-clamp-2">
                  {item.description}
                </p>
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
        description={parsePayloadContent(activeItem?.content) || activeItem?.description || ''}
        imageUrl={activeItem?.image || `https://picsum.photos/seed/${activeItem?.id}/1200/800`}
        idCode={activeItem?.id || ''}
        stats={[
          { label: labels.progressLabel, val: `${activeItem?.percentage || 0}%`, color: 'bg-primary-500' },
          { label: 'STATUS', val: labels.statusComplete, color: 'bg-black-pure' }
        ]}
        buttonLabel="ACKNOWLEDGE"
        onAction={() => setSidebarOpen(false)}
      />
    </section>
  )
}

export default ScrollSection