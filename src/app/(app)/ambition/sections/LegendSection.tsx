'use client'

import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { CMSLink } from '@/components/Link'
import Magnet from '@/components/Magnet'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Driver } from 'src/payload-types'

const DUMMY_DRIVERS: Partial<Driver>[] = [
  {
    first: 'ALEXANDER',
    last: 'VOSS',
    basics: {
      identifier: {
        number: '44',
        callsign: 'VOSS_UNIT_01',
        nickname: 'THE APEX',
      },
      tagline: 'LEAD PILOT',
      description: 'Engineered for the limit. Voss represents the synthesis of biometric data and raw mechanical intuition.',
    },
    traits: {
      identity: {
        nationality: 'GERMAN',
        age: 28,
      },
    },
    slug: 'alexander-voss',
  },
  {
    first: 'ELARA',
    last: 'KANE',
    basics: {
      identifier: {
        number: '07',
        callsign: 'KANE_TACTICAL',
        nickname: 'GHOST',
      },
      tagline: 'TACTICAL UNIT',
      description: 'Kane dominates through high-altitude precision and a cold, calculated approach to defensive maneuvers.',
    },
    traits: {
      identity: {
        nationality: 'JAPANESE',
        age: 24,
      },
    },
    slug: 'elara-kane',
  },
  {
    first: 'MARCUS',
    last: 'THORNE',
    basics: {
      identifier: {
        number: '19',
        callsign: 'THORNE_STRIKE',
        nickname: 'HAMMER',
      },
      tagline: 'STRIKE PILOT',
      description: 'A veteran of the iron circuits, Thorne relies on mechanical grit and aggressive line-breaking strategies.',
    },
    traits: {
      identity: {
        nationality: 'BRITISH',
        age: 35,
      },
    },
    slug: 'marcus-thorne',
  },
]

const PLACEHOLDERS = [
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1600&auto=format&fit=crop',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1594144408253-839659b48247?q=80&w=800&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600&auto=format&fit=crop',
  }
]

export function LegendSection({ drivers = DUMMY_DRIVERS as Driver[] }: { drivers?: Driver[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  const parsedEase = (DESIGN_SYSTEM.ANIMATION.EASING_CUBIC.match(/[\d.]+/g)?.map(Number) || [0.87, 0, 0.13, 1]) as [number, number, number, number]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return
      const scrollAmount = containerRef.current.clientWidth
      if (e.key === 'ArrowRight') {
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      } else if (e.key === 'ArrowLeft') {
        containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="sticky top-0 left-0 w-full h-12 z-50 px-4 md:px-12 flex items-center justify-between border-b border-zinc-900 bg-black/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
              boxShadow: `0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}`
            }}
          />
          <span className={cn("text-[8px] md:text-[9px] font-black italic text-zinc-400 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
            THE FINEST AT PLAY
          </span>
        </div>
        <div className="flex gap-2">
          {drivers.map((_, i) => (
            <div key={i} className="w-4 md:w-6 h-[1px] bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                  scaleX: useTransform(
                    scrollXProgress,
                    [i / drivers.length, (i + 1) / drivers.length],
                    [0, 1],
                  ),
                  transformOrigin: 'left',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {drivers.map((driver, index) => {
          const num = driver.basics?.identifier?.number || '00'
          const callsign = driver.basics?.identifier?.callsign || 'NO_CALLSIGN'
          const role = driver.basics?.tagline || 'PILOT'
          const nationality = driver.traits?.identity?.nationality || 'UNDISCLOSED'
          const age = driver.traits?.identity?.age || 'XX'
          const nickname = driver.basics?.identifier?.nickname || 'CLASS_A'

          const avatarUrl = (driver as any).avatar?.url || PLACEHOLDERS[index % 3].avatar
          const coverUrl = (driver as any).cover?.url || PLACEHOLDERS[index % 3].cover

          return (
            <div
              key={index}
              className="relative min-w-full md:h-[100dvh] snap-start flex flex-col justify-end py-8 md:pb-16 px-4 md:px-12 lg:px-24 overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <Image src={coverUrl} alt="" fill className="object-cover opacity-10 grayscale" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black" />
              </div>

              <div className="absolute inset-0 flex items-center justify-start pl-4 md:pl-12 z-0 pointer-events-none select-none">
                <div className="relative opacity-30 md:opacity-40">
                  <Magnet padding={100} disabled={false} magnetStrength={200}>
                    <h1
                      className="text-[65vw] md:text-[40vw] font-black italic leading-none tracking-tighter text-transparent"
                      style={{
                        WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                        filter: `drop-shadow(0 0 40px ${DESIGN_SYSTEM.COLORS.WHITE_GLOW})`
                      }}
                    >
                      {num}
                    </h1>
                  </Magnet>
                </div>
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-end">

                  <div className="w-full lg:col-span-7">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-2 md:mb-4 inline-block"
                    >
                      <span
                        className={cn("text-white/40 font-black italic border-l-2 text-[9px] md:text-[10px] uppercase pl-4 py-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                      >
                        {role} / <span className="text-white">{callsign}</span>
                      </span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic leading-[0.85] tracking-tighter uppercase pl-4 md:pl-0">
                      <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{driver.first}</span>
                      <br />
                      <span className="text-white">
                        {driver.last}
                      </span>
                    </h2>
                  </div>

                  <div className="w-full lg:col-span-5">
                    <motion.div
                      initial={{ opacity: 0, y: 40, rotateX: 10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: parsedEase
                      }}
                      className="relative w-full max-w-[360px] md:max-w-[420px] mx-auto lg:mr-0 lg:ml-auto group"
                    >
                      <div
                        className="absolute -inset-0.5 opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500"
                        style={{
                          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 20px)',
                          backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY
                        }}
                      />

                      <div className="relative bg-zinc-950 p-4 md:p-6 border border-white/10"
                        style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 20px)' }}>

                        <div className="relative w-full aspect-[4/3] mb-4 md:mb-6 overflow-hidden border border-white/5 bg-black"
                          style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), 100% 100%, 0 100%, 0 15px)' }}>
                          <Image
                            src={avatarUrl}
                            alt=""
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 -scale-x-100"
                          />
                          <div className="absolute top-0 left-0 w-1 h-8 md:h-12 z-20" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                          <div className="absolute bottom-0 right-0 w-8 md:w-12 h-1 z-20" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        <div className="space-y-4 md:space-y-6">
                          <div className="relative">
                            <div className="absolute -left-4 md:-left-6 top-0 w-0.5 md:w-1 h-full opacity-50" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <p className="text-[10px] md:text-xs font-bold text-zinc-300 uppercase tracking-widest leading-relaxed italic">
                              {driver.basics?.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-end border-t border-white/5 pt-4 md:pt-6">
                            <div className="flex flex-col">
                              <span className="text-[6px] md:text-[7px] font-mono text-zinc-600 uppercase tracking-widest">TACTICAL_ID</span>
                              <span className="text-[8px] md:text-[9px] font-mono text-zinc-400">{callsign}</span>
                            </div>
                            <CMSLink url={`/drivers/${driver.slug}`}>
                              <ClippedButton variant="primary" size="md" className="scale-90 md:scale-100 origin-right" label="ACCESS_DOSSIER" />
                            </CMSLink>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="w-full lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-white/10 mt-4 md:mt-8 p-4 md:pt-8">
                    {[
                      { label: 'ORIGIN', value: nationality },
                      { label: 'AGE', value: age },
                      { label: 'NICKNAME', value: nickname },
                      { label: 'SERIAL_NO', value: num, color: DESIGN_SYSTEM.COLORS.PRIMARY }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className="space-y-1 md:space-y-2"
                      >
                        <span className={cn("text-[7px] md:text-[8px] font-black text-zinc-500 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                          {stat.label}
                        </span>
                        <div
                          className="text-xl md:text-3xl font-black italic tracking-tighter uppercase"
                          style={{ color: stat.color || '#ffffff' }}
                        >
                          {stat.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}