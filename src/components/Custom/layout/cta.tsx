'use client'

import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import LogoLoop from '@/components/Reactbits/logo-loop'
import type { Organization } from '@/payload-types'
import { Award, Building2, Code, Palette, Rocket, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'

const fallbackIcons = [Code, Palette, Rocket, Zap, Award, Users, Building2]

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
  variant?: 'glass' | 'scroll' | 'default'
  organizations?: Organization[]
}

export function CTA({
  headline = 'Ready to be part of the story?',
  subtext = 'Whether you race, engineer, design, or simply believe in what we build — there is a place for you inside AF Motorsport.',
  buttonLabel = 'Explore Ambition',
  buttonUrl = '/ambition',
  showPartners = false,
  variant = 'glass',
  organizations = []
}: CTAProps) {

  const safeButtonUrl = buttonUrl || '/ambition'

  const partnerLogos: PartnerLogo[] = organizations.length > 0
    ? organizations
      .filter(org => org.assets?.logo)
      .map(org => ({
        src: typeof org.assets?.logo === 'object' ? org.assets.logo.url : undefined,
        alt: org.name,
        node: <span className="text-xl font-black italic tracking-tighter">{org.name.charAt(0)}</span>,
      }))
    : fallbackIcons.slice(0, 6).map((Icon, i) => ({
      src: undefined,
      alt: `Partner ${i + 1}`,
      node: <Icon className="h-6 w-6 text-neutral-400" />,
    }))

  if (variant === 'glass') {
    return (
      <section className="relative w-full overflow-hidden group/cta py-6 px-0">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)'
              }}
              className="relative z-10 bg-zinc-950 border-t border-zinc-900 py-24 md:py-36 px-12 md:px-48 flex flex-col items-center justify-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.08),transparent_70%)] pointer-events-none" />

              <div className="relative z-10 space-y-12 flex flex-col items-center w-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-[1px] w-24 bg-red-600 mb-2" />
                  <span className="text-[10px] uppercase tracking-[0.8em] font-black text-red-600">
                    {'Establish Connection'}
                  </span>
                </div>

                <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] italic uppercase italic max-w-5xl">
                  {headline}
                </h2>

                <p className="text-[11px] md:text-xs font-bold text-zinc-500 max-w-2xl leading-relaxed uppercase tracking-[0.4em]">
                  {subtext}
                </p>

                {showPartners && (
                  <div className="w-full py-16 opacity-30 group-hover/cta:opacity-60 transition-opacity duration-1000">
                    <LogoLoop
                      logos={partnerLogos}
                      speed={15}
                      direction="left"
                      logoHeight={32}
                      gap={120}
                      fadeOut
                      fadeOutColor="transparent"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-6 sm:flex-row w-full justify-center pt-8">
                  <Link href={safeButtonUrl}>
                    <ClippedButton label={buttonLabel || ''} />
                  </Link>
                  <Link href="/contact">
                    <ClippedButton label="Contact Protocol" variant="outline" />
                  </Link>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            </motion.div>

            <div
              style={{
                clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)'
              }}
              className="absolute -inset-10 bg-red-600/5 blur-[120px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-8 py-24 bg-zinc-950">
      <div className="mx-auto max-w-5xl text-center space-y-10 flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white italic uppercase">
          {headline}
        </h2>
        <p className="text-xs font-bold text-zinc-500 max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.3em]">
          {subtext}
        </p>
        <div className="flex justify-center pt-8">
          <Link href={safeButtonUrl}>
            <ClippedButton label={buttonLabel || ''} />
          </Link>
        </div>
      </div>
    </section>
  )
}