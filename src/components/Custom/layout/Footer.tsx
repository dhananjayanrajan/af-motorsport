'use client'
import { FAQAccordionBlock } from '@/components/Custom/layout/questions'
import { CheckeredBackground } from '@/components/Custom/ui/CheckeredBackground'
import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { CMSLink } from '@/components/Link'
import ShinyText from '@/components/Reactbits/shiny-text'
import type { Announcement as AnnouncementType, Footer, Organization, Question, Social } from '@/payload-types'
import {
  Camera,
  Disc,
  Facebook,
  Github,
  Instagram,
  Link2,
  Linkedin,
  MessageCircle,
  Music,
  Phone,
  Send,
  Twitch,
  Twitter,
  Youtube,
} from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'
import { AnnouncementsSection } from './announcements'
import { CTA } from './cta'

const socialIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  x: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Music,
  threads: MessageCircle,
  snapchat: Camera,
  discord: Disc,
  twitch: Twitch,
  whatsapp: Phone,
  telegram: Send,
  github: Github,
  spotify: Music,
  other: Link2,
}

interface CustomFooterProps {
  footer: Footer
  socials?: Social
  organizations?: Organization[]
  questions?: Question
  announcements?: AnnouncementType
}

export const CustomFooter = ({ footer, socials, organizations = [], questions, announcements }: CustomFooterProps) => {
  if (!footer) return null
  const { brand, columns, cta, legal, copyright } = footer
  const socialAccounts = socials?.accounts?.filter(acc => acc.visible !== false) || []

  return (
    <>
      {announcements && (
        <AnnouncementsSection data={announcements} />
      )}

      {questions && (
        <div className="relative z-20 pb-12 bg-white dark:bg-zinc-950">
          <FAQAccordionBlock data={questions} />
        </div>
      )}

      {cta?.enable && (
        <div className="relative z-30 mb-[-12rem]">
          <CTA
            headline={cta.headline || 'Ready to be part of the story?'}
            subtext={cta.subtext || 'Whether you race, engineer, design, or simply believe in what we build — there is a place for you inside AF Motorsport.'}
            buttonLabel={cta.buttonLabel || 'Explore Ambition'}
            buttonUrl={cta.link?.url || '/ambition'}
            variant="glass"
            showPartners={true}
            organizations={organizations}
          />
        </div>
      )}

      <footer
        className="relative bg-white dark:bg-zinc-950 text-black dark:text-white pt-64 border-t border-gray-100 dark:border-zinc-900 transition-colors duration-500 font-sans overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-60 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.25) 0%, rgba(220, 38, 38, 0.05) 40%, transparent 75%)',
          }}
        />

        <div
          className="absolute inset-0 z-0"
          style={{
            maskImage: 'linear-gradient(to right, black 25%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 5%, transparent 100%)'
          }}
        >
          <CheckeredBackground
            mode="horizontal"
            speed={15}
            opacity={0.18}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          {(brand?.enable) && (
            <div className="flex flex-col items-center text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                {brand?.tagline && (
                  <h2 className="text-3xl md:text-6xl font-light tracking-tighter lowercase px-4">
                    <ShinyText
                      text={brand.tagline}
                      speed={4}
                      delay={0.5}
                      color="#3b3b3b"
                      shineColor="#ffffff"
                      spread={150}
                      direction="left"
                      pauseOnHover={false}
                      disabled={false}
                    />
                  </h2>
                )}
              </motion.div>
            </div>
          )}
        </div>

        <div className="relative z-20 bg-white dark:bg-zinc-950 pt-16 pb-20 border-t border-gray-100 dark:border-zinc-900 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16 mb-16">
              {columns?.filter(col => col.visible).map((column, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col gap-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black dark:text-white px-3 border-l-2 border-red-600">
                    {column.label}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {column.links?.filter(link => link.visible).map((linkData, linkIndex) => (
                      <li key={linkIndex}>
                        <CMSLink
                          {...linkData.link}
                          label={linkData.label || linkData.link.label}
                          className="text-sm font-medium text-gray-500 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-300 uppercase tracking-widest text-[9px]"
                        />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 border-t border-gray-100 dark:border-zinc-900/50">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.5em] font-black text-red-600">
                    Telemetry & Updates
                  </p>
                  <h3 className="text-2xl font-light tracking-tighter uppercase italic">Stay in the slipstream.</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <ClippedInput
                    type="email"
                    placeholder="ENGINEER@AFMOTORSPORT.COM"
                  />
                  <ClippedButton label="Join" size="sm" />
                </div>
              </div>

              <div className="flex flex-col justify-between items-start lg:items-end space-y-6">
                <div className="space-y-4 text-left lg:text-right">
                  <p className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-400">
                    Social Channels
                  </p>
                  <div className="flex flex-wrap gap-6 lg:justify-end">
                    {socialAccounts.map((account) => {
                      const Icon = socialIcons[account.platform] || Link2
                      return (
                        <motion.a
                          key={account.id}
                          href={account.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 hover:text-red-600 transition-colors"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
                {brand?.description && (
                  <p className="max-w-xs text-gray-500 dark:text-zinc-500 font-light text-[11px] leading-relaxed uppercase tracking-wider text-left lg:text-right">
                    {brand.description}
                  </p>
                )}
              </div>
            </div>

            <motion.div
              className="pt-12 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-end gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 dark:text-zinc-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="flex flex-col gap-6 items-start text-left">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {legal?.filter(link => link.visible).map((linkData, index) => (
                    <CMSLink
                      key={index}
                      {...linkData.link}
                      label={linkData.label || linkData.link.label}
                      className="hover:text-black dark:hover:text-white transition-colors duration-300"
                    />
                  ))}
                </div>
                <p className="opacity-50">{copyright || `© ${new Date().getFullYear()} AF MOTORSPORT. ALL RIGHTS RESERVED.`}</p>
              </div>

              <div className="flex flex-col items-end gap-1 group text-right">
                <span className="text-gray-300 dark:text-zinc-800 uppercase text-[8px] tracking-[0.6em] leading-none">Built for</span>
                <span className="text-black dark:text-white group-hover:text-red-600 transition-colors duration-500 font-black italic text-2xl tracking-tighter leading-none uppercase">Glory.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  )
}