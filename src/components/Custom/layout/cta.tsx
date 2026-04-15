'use client'

import { ClippedButton } from '@/components/Clipped/ClippedButton'
import LogoLoop from '@/components/Reactbits/logo-loop'
import { DESIGN_SYSTEM } from '@/lib/constants'
import type { Media, Organization } from '@/payload-types'
import { AnimatePresence, motion } from 'motion/react'
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
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
          node: <span className="text-2xl font-black italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{org.name.charAt(0)}</span>,
        }
      })
    : Array.from({ length: 6 }).map((_, i) => ({
      src: undefined,
      alt: `Partner ${i + 1}`,
      node: (
        <div
          className="px-6 py-2 text-[10px] font-black italic tracking-[0.3em]"
          style={{
            borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
            backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
            color: DESIGN_SYSTEM.COLORS.ZINC[400]
          }}
        >
          PARTNER_0{i + 1}
        </div>
      ),
    }))

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
      {/* Podium-style background grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-0 w-full h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
        <div className="absolute top-0 left-1/4 w-px h-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
        <div className="absolute top-0 right-1/4 w-px h-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        {/* Podium-style header */}
        <div className="flex flex-col mb-12 md:mb-20 relative">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-4 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
              JOIN THE MOVEMENT
            </span>
          </motion.div>

          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none"
          >
            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>{headline}</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 mt-6"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />
        </div>

        {/* Main CTA Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Left card - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
            onMouseEnter={() => setHoveredCard('left')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative h-full overflow-hidden shadow-lg transition-all duration-500"
              style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[200]}`,
                clipPath: 'polygon(0 0, 100% 0, 100% 95%, 98% 100%, 0 100%)'
              }}
            >
              {/* Hover gradient sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                animate={{ opacity: hoveredCard === 'left' ? 1 : 0 }}
                style={{ background: `linear-gradient(135deg, ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}, transparent 50%)` }}
              />

              <div className="p-8 md:p-10 space-y-8">
                <p className="leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                  {subtext}
                </p>

                <div className="space-y-4">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider block" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>SEASON</span>
                      <span className="text-xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{currentYear}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider block" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>STATUS</span>
                      <span className="text-xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>ACTIVE</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link href={safeButtonUrl}>
                      <ClippedButton label={buttonLabel || ''} size="lg" />
                    </Link>
                    <Link href="/contact">
                      <ClippedButton
                        label="GET IN TOUCH"
                        variant="outline"
                        size="lg"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom accent bar */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-0 left-0 h-1"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
              />
            </div>
          </motion.div>

          {/* Right card - Animated word rotator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
            onMouseEnter={() => setHoveredCard('right')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="relative h-full overflow-hidden shadow-lg transition-all duration-500"
              style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[800]}`,
                clipPath: 'polygon(2% 0, 100% 0, 100% 100%, 0 100%, 0 5%)'
              }}
            >
              <motion.div
                className="absolute inset-0 transition-opacity duration-700"
                animate={{ opacity: hoveredCard === 'right' ? 1 : 0 }}
                style={{ background: `radial-gradient(circle at 30% 50%, ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}, transparent 70%)` }}
              />

              <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center h-full space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                  CHAMPIONSHIP SPIRIT
                </span>

                <div className="text-7xl md:text-8xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                  #{currentYear}
                </div>

                <div className="h-20 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={wordIndex}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl md:text-3xl font-black uppercase tracking-wider"
                      style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    >
                      {CHAMPIONSHIP_WORDS[wordIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex gap-4 text-[10px] font-mono" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                  <span>● ENGINEERING</span>
                  <span>● EXCELLENCE</span>
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
              />
            </div>
          </motion.div>
        </div>

        {/* Partners section */}
        {showPartners && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t"
            style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                  STRATEGIC NETWORK
                </span>
              </div>

              <div className="flex-1 w-full transition-opacity duration-500 hover:opacity-100" style={{ opacity: 0.6 }}>
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
          </motion.div>
        )}
      </div>
    </section>
  )
}