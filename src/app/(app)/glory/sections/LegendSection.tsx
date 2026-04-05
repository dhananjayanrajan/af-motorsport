'use client'

import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import Magnet from '@/components/Magnet'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { X, Zap, Target, Gauge, Shield, Activity, Terminal, Cpu } from 'lucide-react'

interface DummyDriver {
  id: number
  first: string
  last: string
  basics?: {
    enable?: boolean
    identifier?: {
      number?: string
      callsign?: string
      nickname?: string
    }
    tagline?: string
    description?: string
    visibility?: { show?: boolean }
  }
  traits?: {
    enable?: boolean
    identity?: {
      nationality?: string
      age?: number
    }
    visibility?: { show?: boolean }
  }
  slug?: string
  telemetry?: {
    reactionTime: string
    avgGForce: string
    peakBPM: string
    consistency: string
  }
}

const DUMMY_DRIVERS: DummyDriver[] = [
  {
    id: 1,
    first: 'ALEXANDER',
    last: 'VOSS',
    basics: {
      identifier: { number: '44', callsign: 'VOSS_UNIT_01', nickname: 'THE APEX' },
      tagline: 'LEAD PILOT',
      description: 'Engineered for the limit. Voss represents the synthesis of biometric data and raw mechanical intuition.',
    },
    traits: { identity: { nationality: 'GERMAN', age: 28 } },
    slug: 'alexander-voss',
    telemetry: { reactionTime: '0.12s', avgGForce: '4.2G', peakBPM: '168', consistency: '99.4%' }
  },
  {
    id: 2,
    first: 'ELARA',
    last: 'KANE',
    basics: {
      identifier: { number: '07', callsign: 'KANE_TACTICAL', nickname: 'GHOST' },
      tagline: 'TACTICAL UNIT',
      description: 'Kane dominates through high-altitude precision and a cold, calculated approach to defensive maneuvers.',
    },
    traits: { identity: { nationality: 'JAPANESE', age: 24 } },
    slug: 'elara-kane',
    telemetry: { reactionTime: '0.14s', avgGForce: '3.8G', peakBPM: '152', consistency: '98.1%' }
  },
  {
    id: 3,
    first: 'MARCUS',
    last: 'THORNE',
    basics: {
      identifier: { number: '19', callsign: 'THORNE_STRIKE', nickname: 'HAMMER' },
      tagline: 'STRIKE PILOT',
      description: 'A veteran of the iron circuits, Thorne relies on mechanical grit and aggressive line-breaking strategies.',
    },
    traits: { identity: { nationality: 'BRITISH', age: 35 } },
    slug: 'marcus-thorne',
    telemetry: { reactionTime: '0.18s', avgGForce: '4.5G', peakBPM: '175', consistency: '96.8%' }
  },
  {
    id: 4,
    first: 'SOFIA',
    last: 'VALDEZ',
    basics: {
      identifier: { number: '22', callsign: 'VALDEZ_RACING', nickname: 'PHANTOM' },
      tagline: 'ENDURANCE SPECIALIST',
      description: 'Valdez dominates night races with supernatural consistency and tire management.',
    },
    traits: { identity: { nationality: 'SPANISH', age: 31 } },
    slug: 'sofia-valdez',
    telemetry: { reactionTime: '0.15s', avgGForce: '3.5G', peakBPM: '145', consistency: '99.8%' }
  },
  {
    id: 5,
    first: 'JAMES',
    last: 'CHENG',
    basics: {
      identifier: { number: '88', callsign: 'CHENG_PROTO', nickname: 'DRIFT_KING' },
      tagline: 'PROTOTYPE PILOT',
      description: 'Cheng tests experimental aerodynamics and pushes chassis limits beyond simulation.',
    },
    traits: { identity: { nationality: 'CHINESE', age: 27 } },
    slug: 'james-cheng',
    telemetry: { reactionTime: '0.13s', avgGForce: '4.0G', peakBPM: '160', consistency: '97.5%' }
  },
  {
    id: 6,
    first: 'ISABELLE',
    last: 'DUBOIS',
    basics: {
      identifier: { number: '05', callsign: 'DUBOIS_GT', nickname: 'ICE_QUEEN' },
      tagline: 'WET WEATHER ACE',
      description: 'Dubois thrives in monsoon conditions with unmatched car control and rain line intuition.',
    },
    traits: { identity: { nationality: 'FRENCH', age: 29 } },
    slug: 'isabelle-dubois',
    telemetry: { reactionTime: '0.16s', avgGForce: '3.2G', peakBPM: '148', consistency: '99.1%' }
  },
  {
    id: 7,
    first: 'VIKTOR',
    last: 'PETROV',
    basics: {
      identifier: { number: '33', callsign: 'PETROV_ATTACK', nickname: 'BULLET' },
      tagline: 'OVAL MASTER',
      description: 'Petrov dominates high-banked ovals with fearless drafting and millimeter precision.',
    },
    traits: { identity: { nationality: 'RUSSIAN', age: 34 } },
    slug: 'viktor-petrov',
    telemetry: { reactionTime: '0.11s', avgGForce: '4.8G', peakBPM: '182', consistency: '95.9%' }
  },
  {
    id: 8,
    first: 'NAOMI',
    last: 'WILLIAMS',
    basics: {
      identifier: { number: '12', callsign: 'WILLIAMS_ELITE', nickname: 'PRODIGY' },
      tagline: 'RISING STAR',
      description: 'Youngest driver in the lineup with natural pace and fearless overtaking.',
    },
    traits: { identity: { nationality: 'AUSTRALIAN', age: 22 } },
    slug: 'naomi-williams',
    telemetry: { reactionTime: '0.12s', avgGForce: '3.9G', peakBPM: '165', consistency: '98.4%' }
  },
  {
    id: 9,
    first: 'CARLOS',
    last: 'SILVA',
    basics: {
      identifier: { number: '77', callsign: 'SILVA_TECH', nickname: 'MACHINE' },
      tagline: 'SIMULATION EXPERT',
      description: 'Silva bridges virtual and reality with telemetry-driven perfection.',
    },
    traits: { identity: { nationality: 'BRAZILIAN', age: 32 } },
    slug: 'carlos-silva',
    telemetry: { reactionTime: '0.14s', avgGForce: '4.1G', peakBPM: '158', consistency: '99.5%' }
  },
  {
    id: 10,
    first: 'YUKI',
    last: 'TANAKA',
    basics: {
      identifier: { number: '23', callsign: 'TANAKA_DRIFT', nickname: 'DRIFT_KING' },
      tagline: 'TACTICAL RETIREMENT',
      description: 'Tanaka specializes in strategic fuel saving and tire preservation without losing pace.',
    },
    traits: { identity: { nationality: 'JAPANESE', age: 30 } },
    slug: 'yuki-tanaka',
    telemetry: { reactionTime: '0.17s', avgGForce: '3.4G', peakBPM: '150', consistency: '99.9%' }
  },
]

const PLACEHOLDERS = Array.from({ length: 10 }).map((_, i) => ({
  avatar: `https://picsum.photos/id/${10 + i}/800/1000`,
  cover: `https://picsum.photos/id/${20 + i}/1600/900`,
}))

export function LegendSection({ drivers = DUMMY_DRIVERS }: { drivers?: DummyDriver[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const [activeDossier, setActiveDossier] = useState<DummyDriver | null>(null)

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
      <AnimatePresence>
        {activeDossier && (
          <DossierSidebar
            driver={activeDossier}
            onClose={() => setActiveDossier(null)}
            image={PLACEHOLDERS[drivers.indexOf(activeDossier) % PLACEHOLDERS.length].avatar}
          />
        )}
      </AnimatePresence>

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
                  scaleX: useTransform(scrollXProgress, [i / drivers.length, (i + 1) / drivers.length], [0, 1]),
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

          const avatarUrl = PLACEHOLDERS[index % PLACEHOLDERS.length].avatar
          const coverUrl = PLACEHOLDERS[index % PLACEHOLDERS.length].cover

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
                      <span className="text-white">{driver.last}</span>
                    </h2>
                  </div>

                  <div className="w-full lg:col-span-5">
                    <motion.div
                      initial={{ opacity: 0, y: 40, rotateX: 10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, ease: parsedEase }}
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
                          <Image src={avatarUrl} alt="" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 -scale-x-100" />
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
                            <ClippedButton
                              variant="primary"
                              size="md"
                              className="scale-90 md:scale-100 origin-right"
                              label="ACCESS_DOSSIER"
                              onClick={() => setActiveDossier(driver)}
                            />
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

function DossierSidebar({ driver, onClose, image }: { driver: DummyDriver, onClose: () => void, image: string }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 35, stiffness: 250 }}
      className="fixed top-0 right-0 h-full w-[95vw] md:w-[85vw] lg:w-[70vw] z-[100] bg-zinc-950 border-l border-zinc-800 shadow-2xl overflow-y-auto"
    >
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-900">
        <div className="flex items-center gap-4">
          <Terminal size={14} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-600">
            SECURE_DOSSIER // {driver.basics?.identifier?.callsign}
          </span>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-zinc-900 transition-colors">
          <X size={20} className="text-white" />
        </button>
      </div>

      <div className="p-6 md:p-12 lg:p-16 space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4 aspect-[3/4] relative grayscale border border-zinc-800 p-1.5 bg-zinc-900/50">
            <Image src={image} alt="" fill className="object-cover p-1.5" />
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-primary font-black italic text-[10px] tracking-[0.4em] uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                  {driver.basics?.tagline}
                </span>
                <div className="h-px flex-1 bg-zinc-900" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
                {driver.first}<br />
                <span className="text-zinc-800">{driver.last}</span>
              </h1>
            </div>
            <p className="text-base font-bold text-zinc-400 uppercase tracking-widest leading-relaxed max-w-2xl">
              {driver.basics?.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
          <TelemetryBox icon={<Zap size={18} />} label="REACTION_TIME" value={driver.telemetry?.reactionTime || '0.14s'} />
          <TelemetryBox icon={<Gauge size={18} />} label="AVG_G_FORCE" value={driver.telemetry?.avgGForce || '4.2G'} />
          <TelemetryBox icon={<Activity size={18} />} label="PEAK_BPM" value={driver.telemetry?.peakBPM || '168'} />
          <TelemetryBox icon={<Shield size={18} />} label="CONSISTENCY" value={driver.telemetry?.consistency || '99.4%'} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Cpu size={14} className="text-zinc-600" />
              <h3 className="text-xl font-black italic uppercase tracking-tighter">BIOMETRIC_PROFILE</h3>
            </div>
            <div className="space-y-4">
              <DataRow label="NATIONALITY" value={driver.traits?.identity?.nationality || 'UNDISCLOSED'} />
              <DataRow label="AGE" value={String(driver.traits?.identity?.age) || 'XX'} />
              <DataRow label="BLOOD_TYPE" value="O_POSITIVE" />
              <DataRow label="NEURAL_STABILITY" value="OPTIMIZED" />
              <DataRow label="GENETIC_MARKER" value="ALPHA_7" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Target size={14} className="text-zinc-600" />
              <h3 className="text-xl font-black italic uppercase tracking-tighter">MECHANICAL_SYNERGY</h3>
            </div>
            <div className="space-y-4">
              <DataRow label="CHASSIS_PREF" value="STIFF / OVERSTEER" />
              <DataRow label="BRAKE_BIAS" value="54% FRONT" />
              <DataRow label="TYRE_MGMT" value="CLASS_A" />
              <DataRow label="SIM_HOURS" value="4,820+" />
              <DataRow label="OVERTAKE_INDEX" value="9.4/10" />
            </div>
          </div>
        </div>

        <div className="space-y-8 pb-16">
          <h3 className="text-xl font-black italic uppercase tracking-tighter border-b border-zinc-900 pb-3">DEPLOYMENT_LOGS</h3>
          <div className="space-y-1.5">
            <LogEntry date="2026.03.12" circuit="PORTIMÃO" result="P1" status="SUCCESS" />
            <LogEntry date="2026.02.28" circuit="BARCELONA" result="P3" status="SUCCESS" />
            <LogEntry date="2026.02.15" circuit="ESTORIL" result="DNF" status="MECH_FAIL" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TelemetryBox({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-black p-6 md:p-8 flex flex-col gap-6 group hover:bg-zinc-950 transition-colors">
      <div className="text-zinc-800 group-hover:text-primary transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{icon}</div>
      <div className="space-y-1.5">
        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{label}</span>
        <span className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter block leading-none">{value}</span>
      </div>
    </div>
  )
}

function DataRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-zinc-900 pb-3 group">
      <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">{label}</span>
      <span className="text-base font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors">{value}</span>
    </div>
  )
}

function LogEntry({ date, circuit, result, status }: { date: string, circuit: string, result: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-5 md:p-6 bg-zinc-900/20 hover:bg-zinc-900/40 border border-zinc-900 transition-all group">
      <div className="flex items-center gap-6 md:gap-10">
        <span className="text-[9px] font-mono text-zinc-700">{date}</span>
        <span className="text-lg md:text-xl font-black italic uppercase tracking-tighter group-hover:translate-x-1 transition-transform">{circuit}</span>
      </div>
      <div className="flex items-center gap-6 md:gap-8">
        <span className="text-2xl font-black italic text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{result}</span>
        <div className="text-[8px] font-mono px-3 py-1 bg-zinc-950 text-zinc-500 uppercase tracking-tighter border border-zinc-800">{status}</div>
      </div>
    </div>
  )
}