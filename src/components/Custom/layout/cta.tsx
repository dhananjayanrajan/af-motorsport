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
          node: <span className="text-xl font-black italic uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>{org.name}</span>,
        }
      })
    : Array.from({ length: 6 }).map((_, i) => ({
      src: undefined,
      alt: `Partner ${i + 1}`,
      node: (
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
          STAKEHOLDER 0{i + 1}
        </span>
      ),
    }))

  return (
    <section className="relative w-full border-t-2 border-black-pure overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
      <div className="flex flex-col lg:flex-row min-h-[600px]">

        <div className="w-full lg:w-24 bg-black-pure flex lg:flex-col items-center justify-between p-6 lg:py-12 border-r-2 border-black-pure shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white-pure lg:-rotate-90 lg:whitespace-nowrap">
            ESTABLISHED {currentYear}
          </span>
          <div className="size-10 bg-primary border-2 border-white-pure" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white-pure lg:rotate-90 lg:whitespace-nowrap">
            GRID PROTOCOL
          </span>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black-pure">

            <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-between bg-white-pure">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-primary" />
                  <span className="text-xs font-black uppercase tracking-widest text-black-pure">RECRUITMENT PHASE</span>
                </div>
                <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.85]" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                  {headline}
                </h2>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <p className="text-sm font-black uppercase leading-tight text-black-pure max-w-sm">
                  {subtext}
                </p>
                <div className="flex flex-col gap-4 justify-end">
                  <Link href={safeButtonUrl}>
                    <ClippedButton label={buttonLabel || ''} size="lg" />
                  </Link>
                  <Link href="/contact">
                    <ClippedButton label="CONTACT OFFICE" variant="outline" size="lg" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col divide-y-2 divide-black-pure bg-white-100">
              <div className="flex-1 p-10 flex flex-col justify-center items-center text-center bg-secondary">
                <span className="text-[10px] font-black uppercase tracking-widest text-black-pure mb-4">CURRENT TARGET</span>
                <div className="h-16 relative overflow-hidden w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={wordIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      className="text-4xl font-black uppercase tracking-tighter text-black-pure italic"
                    >
                      {CHAMPIONSHIP_WORDS[wordIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-10 flex flex-col gap-6">
                <div className="flex justify-between items-end border-b-2 border-black-pure pb-4">
                  <span className="text-[10px] font-black uppercase text-zinc-500">SYSTEM STATUS</span>
                  <span className="text-xl font-black uppercase text-black-pure">ACTIVE</span>
                </div>
                <div className="flex justify-between items-end border-b-2 border-black-pure pb-4">
                  <span className="text-[10px] font-black uppercase text-zinc-500">OPERATIONAL YEAR</span>
                  <span className="text-xl font-black uppercase text-black-pure">{currentYear}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase text-zinc-500">AVAILABLE SEATS</span>
                  <span className="text-xl font-black uppercase text-primary">LIMITED</span>
                </div>
              </div>

              <div className="h-24 flex items-stretch bg-black-pure gap-0.5">
                <div className="flex-1 bg-tertiary-500 hover:bg-white-pure transition-colors cursor-crosshair" />
                <div className="flex-1 bg-white-pure hover:bg-primary transition-colors cursor-crosshair" />
                <div className="flex-1 bg-secondary hover:bg-black-pure transition-colors cursor-crosshair" />
              </div>
            </div>
          </div>

          {showPartners && (
            <div className="h-24 flex items-center border-t-2 border-black-pure bg-white-pure">
              <div className="h-full px-8 flex items-center border-r-2 border-black-pure bg-white-200 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-black-pure">PARTNERS</span>
              </div>
              <div className="flex-1">
                <LogoLoop
                  logos={partnerLogos}
                  speed={25}
                  direction="left"
                  logoHeight={16}
                  gap={120}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="h-12 bg-black-pure flex items-center px-10 border-t-2 border-black-pure justify-between">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white-pure">
          TRANSMISSION COMPLETED // {currentYear}
        </span>
        <div className="flex gap-1 h-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1 bg-primary" style={{ opacity: (i + 1) / 12 }} />
          ))}
        </div>
      </footer>
    </section>
  )
}