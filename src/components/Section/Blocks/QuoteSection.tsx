"use client"

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import WeaveBackground from '../Backgrounds/WeaveBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface QuoteItem {
  id: string
  text: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}

interface QuoteLabels {
  commStatus: string
  ratingLabel: string
}

interface QuoteSectionProps {
  id: string;
  title: string;
  subtitle: string;
  quotes: QuoteItem[];
  labels: QuoteLabels;
  variant?: 'carousel' | 'grid' | 'masonry';
  ctaLabel?: string;
  ctaPath?: string;
  headerVariant?: 1 | 2 | 3;
  footerVariant?: 1 | 2 | 3;
  background?: React.ReactNode;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({
  id,
  title,
  subtitle,
  quotes = [],
  labels,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background,
  variant = 'carousel'
}) => {
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const displayQuotes = quotes.slice(0, 5)

  useEffect(() => {
    if (isHovered || variant !== 'carousel') return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayQuotes.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [displayQuotes.length, isHovered, variant])

  const quote = displayQuotes[index]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-[800px] lg:min-h-screen w-full flex flex-col bg-white-pure border-t-2 border-black-pure overflow-hidden group/section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={quote?.id}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 0.05, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
            src={`https://picsum.photos/seed/${quote?.id}/1920/1080`}
            alt=""
            className="w-full h-full object-cover grayscale"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-white-pure/20 backdrop-blur-[2px]" />
      </motion.div>

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={labels.commStatus}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10 flex-1 flex flex-col">
        <div className="relative flex-1 border-2 border-black-pure bg-white-pure overflow-hidden flex flex-col">
          <WeaveBackground />

          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-16 lg:p-24 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="w-full max-w-5xl flex flex-col items-center text-center"
              >
                <div className="flex flex-col items-center gap-4 mb-12">
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-1.5 transition-all duration-700 border border-black-pure ${i < (quote?.rating || 0) ? 'w-12 bg-primary-500' : 'w-3 bg-white-pure'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-black-pure/40">
                    {labels.ratingLabel}
                  </span>
                </div>

                <div className="relative mb-16">
                  <span className="absolute -top-12 -left-8 text-8xl font-black text-primary-500/20 pointer-events-none select-none">“</span>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter text-black-pure leading-[0.95] italic">
                    {quote?.text}
                  </h2>
                </div>

                <div className="flex flex-col items-center gap-6">
                  {quote?.avatar && (
                    <div className="relative">
                      <div className="absolute -inset-2 border-2 border-black-pure rounded-full rotate-45 group-hover/section:rotate-90 transition-transform duration-1000" />
                      <img
                        src={quote.avatar}
                        alt={quote.author}
                        className="relative w-20 h-20 rounded-full border-2 border-black-pure grayscale object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    <span className="text-xl lg:text-2xl font-black uppercase tracking-widest text-black-pure">
                      {quote?.author}
                    </span>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-widest">{quote?.role}</span>
                      <div className="size-1 bg-black-pure" />
                      <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">{quote?.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-20 border-t-2 border-black-pure flex divide-x-2 divide-black-pure bg-white-pure relative z-20">
            {displayQuotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="flex-1 relative group/nav overflow-hidden"
              >
                <div className={`absolute inset-0 transition-colors duration-500 ${index === i ? 'bg-black-pure' : 'bg-white-pure hover:bg-secondary-500'}`} />
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1">
                  <span className={`text-[10px] font-mono font-black transition-colors ${index === i ? 'text-primary-500' : 'text-black-pure'}`}>
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className={`h-1 transition-all duration-500 ${index === i ? 'w-8 bg-primary-500' : 'w-2 bg-black-pure group-hover/nav:w-4'}`} />
                </div>
                {index === i && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute bottom-0 left-0 h-1 bg-primary-500 z-20"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="container mb-8 sm:mb-12 lg:mb-16 max-w-full lg:max-w-7xl mx-auto relative z-30">
          <Link
            href={ctaPath}
            className="group relative flex items-center justify-between p-8 border-2 border-black-pure bg-black-pure overflow-hidden transition-colors hover:bg-primary-500"
          >
            <div className="flex flex-col gap-1 relative z-10">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary-500 group-hover:text-black-pure transition-colors">
                Connect with us
              </span>
              <span className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white-pure group-hover:text-black-pure transition-colors">
                {ctaLabel}
              </span>
            </div>
            <div className="size-14 lg:size-20 border-2 border-white-pure group-hover:border-black-pure flex items-center justify-center transition-all relative z-10 group-hover:rotate-45">
              <svg className="w-8 h-8 text-white-pure group-hover:text-black-pure" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>
      )}

      <SectionFooter variant={footerVariant} />

      {background && (
        <div className="absolute inset-0 pointer-events-none z-[5] mix-blend-multiply opacity-50">
          {background}
        </div>
      )}
    </section>
  )
}

export default QuoteSection