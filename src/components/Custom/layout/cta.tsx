'use client'

import { ClippedButton } from '@/components/Clipped/ClippedButton'
import LogoLoop from '@/components/Reactbits/logo-loop'
import { DESIGN_SYSTEM } from '@/lib/constants'
import type { Media, Organization } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion, Variants } from 'motion/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface PartnerLogo {
  src?: string | null
  alt?: string
  node: React.ReactNode
}

interface CTAProps {
  headline?: string | null
  subtext?: string | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  showPartners?: boolean
  organizations?: Organization[]
}

const CHAMPIONSHIP_WORDS = ['CHAMPIONSHIP', 'ENGINEERING', 'EXCELLENCE', 'AMBITION']

export function CTA({
  headline = 'READY TO RACE?',
  subtext = 'Join the next generation of motorsport engineering. Whether you are behind the wheel or behind the code, your seat is ready.',
  buttonLabel = 'JOIN THE GRID',
  buttonUrl = '/ambition',
  showPartners = true,
  organizations = []
}: CTAProps) {
  const currentYear = new Date().getFullYear()
  const [wordIndex, setWordIndex] = useState(0)
  const safeButtonUrl = buttonUrl || '/ambition'

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CHAMPIONSHIP_WORDS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const partnerLogos: PartnerLogo[] = organizations.length > 0
    ? organizations
      .filter(org => org.assets?.logo)
      .map(org => {
        const logo = org.assets?.logo as Media | null | undefined
        return {
          src: logo?.url,
          alt: org.name,
          node: <span className="text-2xl font-black italic tracking-tighter text-zinc-900">{org.name.charAt(0)}</span>,
        }
      })
    : Array.from({ length: 6 }).map((_, i) => ({
      src: undefined,
      alt: `Partner ${i + 1}`,
      node: <div className="px-6 py-2 border border-zinc-200 bg-zinc-50 text-[10px] font-black text-zinc-400 italic tracking-[0.3em]">PARTNER_0{i + 1}</div>,
    }))

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <section className="relative w-full bg-white py-20 px-4 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative"
      >
        <div
          className="relative bg-zinc-50 border border-zinc-100 overflow-hidden group/cta"
          style={{ clipPath: 'polygon(0 0, 97% 0, 100% 10%, 100% 100%, 3% 100%, 0 90%)' }}
        >
          <div className="absolute inset-y-0 left-0 w-full pointer-events-none z-0">
            <div
              className={cn("absolute inset-y-0 left-0 w-[40%] opacity-0 group-hover/cta:opacity-100 transition-all duration-300 group-hover/cta:animate-[rev_1s_infinite_cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-r", `from-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/10 via-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/5 to-transparent`)}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <style jsx>{`
            @keyframes rev {
              0%, 100% { transform: scaleX(1); opacity: 0.2; }
              20% { transform: scaleX(2.5); opacity: 0.4; }
              40% { transform: scaleX(1.8); opacity: 0.3; }
            }
          `}</style>

          <div className="absolute left-0 top-0 w-[2px] h-full z-20 pointer-events-none">
            <div className={cn("w-full h-full bg-gradient-to-b", `from-[${DESIGN_SYSTEM.COLORS.PRIMARY}] via-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/20 to-transparent`)} />
          </div>

          <div className="relative z-10 p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center lg:items-center justify-between">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex gap-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative w-4 h-4">
                      <div className="absolute inset-0 bg-zinc-100 border border-zinc-200 rotate-45" />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.05 }}
                        className={cn("absolute inset-0 rotate-45", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                      />
                    </div>
                  ))}
                </div>

                <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                  {headline?.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]` : "text-zinc-900"}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>

                <div className="max-w-xl relative mt-10">
                  <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-zinc-200">
                    <div className={cn("absolute top-0 left-0 w-full h-1/3", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={cn("text-[10px] font-bold tracking-tighter", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>SPEC_01</span>
                      <div className="h-[1px] flex-1 bg-zinc-100" />
                    </div>
                    <p className={cn("text-[11px] md:text-xs font-black text-zinc-500 uppercase leading-relaxed italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
                      {subtext}
                    </p>
                    <div className="flex justify-end gap-1 mt-2">
                      <div className="w-1 h-1 bg-zinc-200" />
                      <div className="w-1 h-1 bg-zinc-200" />
                      <div className={cn("w-4 h-1", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 relative z-30">
                <Link href={safeButtonUrl}>
                  <ClippedButton label={buttonLabel || ''} size="lg" />
                </Link>
                <Link href="/contact">
                  <ClippedButton label="GET_IN_TOUCH" variant="outline" size="lg" className="border-zinc-200 text-zinc-900 hover:bg-zinc-100" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end text-right border-r border-zinc-100 pr-8 min-w-[240px]">
              <span className="text-[90px] font-black italic leading-none text-zinc-100 group-hover/cta:text-zinc-900 transition-all duration-700 select-none">
                {currentYear}
              </span>
              <div className="h-5 relative w-full overflow-hidden flex justify-end">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn("absolute text-[9px] font-black uppercase whitespace-nowrap mr-[-1em]", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL, `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                  >
                    {CHAMPIONSHIP_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {showPartners && (
            <div className="relative border-t border-zinc-100 bg-zinc-50/50 py-12 px-8 flex flex-col md:flex-row items-center gap-12">
              <span className={cn("text-[10px] font-black uppercase text-zinc-300 whitespace-nowrap italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Strategic_Network</span>
              <div className="flex-1 w-full grayscale opacity-40 group-hover/cta:opacity-100 group-hover/cta:grayscale-0 transition-all duration-1000">
                <LogoLoop
                  logos={partnerLogos}
                  speed={20}
                  direction="left"
                  logoHeight={20}
                  gap={160}
                  fadeOut
                  fadeOutColor="transparent"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}