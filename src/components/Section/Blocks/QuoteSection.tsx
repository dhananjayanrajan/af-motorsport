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
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen w-full flex flex-col bg-white-pure overflow-hidden group/section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={quote?.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.08, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            src={`https://picsum.photos/seed/${quote?.id}/1920/1080`}
            alt=""
            className="w-full h-full object-cover grayscale"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white-pure via-transparent to-white-pure" />
      </motion.div>

      <div className="relative z-30">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          variant={headerVariant}
          metadata={labels.commStatus}
        />
      </div>

      <main className="relative z-20 flex-grow flex items-center justify-center px-6">
        <WeaveBackground />
        <div className="max-w-[85rem] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center space-y-10"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`h-1 origin-left transition-all duration-700 ${i < (quote?.rating || 0) ? 'w-10 bg-black-pure' : 'w-2 bg-black-pure'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-black-pure">
                  {labels.ratingLabel}
                </p>
              </div>

              <div className="relative max-w-5xl">
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-black-pure leading-tight tracking-tight"
                >
                  {quote?.text}
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-4"
              >
                {quote?.avatar && (
                  <div className="relative group/avatar">
                    <div className="absolute inset-0 bg-black-pure rounded-full scale-0 group-hover/avatar:scale-110 transition-transform duration-500" />
                    <img
                      src={quote.avatar}
                      alt={quote.author}
                      className="relative w-20 h-20 rounded-full grayscale border-2 border-black-pure p-1 mb-2 transition-all duration-500 group-hover/avatar:grayscale-0"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-bold text-black-pure uppercase tracking-tighter">
                    {quote?.author}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-bold text-black-pure uppercase tracking-widest">{quote?.role}</span>
                    <span className="h-1 w-1 bg-black-pure" />
                    <span className="text-xs font-bold text-black-pure uppercase tracking-widest">{quote?.company}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
          {displayQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative h-4 flex items-center justify-center group/nav"
              aria-label={`Go to quote ${i + 1}`}
            >
              <div className={`h-1 transition-all duration-500 ease-out border-2 border-black-pure ${index === i ? 'w-16 bg-black-pure' : 'w-4 bg-white-pure group-hover/nav:bg-black-pure'
                }`} />
              {index === i && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 h-[2px] bg-black-pure w-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </main>

      {ctaLabel && ctaPath && (
        <div className="relative z-30 w-full bg-white-pure border-y-2 border-black-pure group/cta overflow-hidden">
          <Link
            href={ctaPath}
            className="flex items-center justify-between px-10 py-12 relative"
          >
            <motion.div
              className="absolute inset-0 bg-black-pure translate-x-[-101%]"
              whileHover={{ translateX: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="relative flex items-baseline gap-4 z-10 transition-colors duration-500 group-hover/cta:text-white-pure">
              <span className="text-3xl font-black uppercase tracking-tighter">
                {ctaLabel}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-black-pure group-hover/cta:text-white-pure">
                {variant}
              </span>
            </div>

            <div className="relative flex items-center gap-6 z-10 transition-colors duration-500 group-hover/cta:text-white-pure">
              <div className="h-px w-12 bg-current" />
              <motion.div
                whileHover={{ x: 10 }}
                className="w-12 h-12 border-2 border-current flex items-center justify-center"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>
          </Link>
        </div>
      )}

      <div className="relative z-30">
        <SectionFooter variant={footerVariant} />
      </div>

      {background && (
        <div className="absolute inset-0 pointer-events-none z-10 mix-blend-multiply">
          {background}
        </div>
      )}
    </section>
  )
}

export default QuoteSection