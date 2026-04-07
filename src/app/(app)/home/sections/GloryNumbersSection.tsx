'use client'

import Particles from '@/components/Particles'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { Activity, Cpu, Flag, Shield, Timer, Trophy, Wind, Zap } from 'lucide-react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface StatCard {
  id: string
  label: string
  value: string
  suffix: string
  description: string
  icon: any
  specs: { label: string; value: string }[]
}

const GLORY_STATS: StatCard[] = [
  {
    id: '01',
    label: 'CUMULATIVE_VICTORIES',
    value: '284',
    suffix: 'WINS',
    description: 'THE AGGREGATE TOTAL OF FIRST-PLACE FINISHES ACROSS ALL AF MOTORSPORT DIVISIONS SINCE INCEPTION.',
    icon: Trophy,
    specs: [
      { label: 'GLOBAL_RANK', value: '#01' },
      { label: 'PODIUM_RATIO', value: '74.2%' }
    ]
  },
  {
    id: '02',
    label: 'CHASSIS_VELOCITY',
    value: '356',
    suffix: 'KM/H',
    description: 'PEAK VELOCITY ACHIEVED BY THE V-01 PROTOTYPE DURING CLOSED-CIRCUIT AERODYNAMIC VALIDATION.',
    icon: Zap,
    specs: [
      { label: 'DRAG_COEFF', value: '0.24' },
      { label: 'AERO_LOAD', value: '1800KG' }
    ]
  },
  {
    id: '03',
    label: 'ENGINEERING_UPTIME',
    value: '99.8',
    suffix: '%',
    description: 'MECHANICAL RELIABILITY RATING MAINTAINED THROUGHOUT THE 2025-2026 WORLD ENDURANCE CALENDAR.',
    icon: Shield,
    specs: [
      { label: 'MECH_FAILURES', value: 'ZERO' },
      { label: 'PIT_EFFICIENCY', value: '98.5%' }
    ]
  },
  {
    id: '04',
    label: 'POLE_DOMINANCE',
    value: '112',
    suffix: 'STRT',
    description: 'FRONT-ROW LOCKOUTS SECURED BY AF-INTELLIGENCE DRIVEN QUALIFYING ALGORITHMS.',
    icon: Flag,
    specs: [
      { label: 'AVG_GAP', value: '-0.24s' },
      { label: 'GRID_LEAD', value: '88%' }
    ]
  },
  {
    id: '05',
    label: 'STRUCTURAL_INTEGRITY',
    value: '6.4',
    suffix: 'G',
    description: 'MAXIMUM LATERAL G-FORCE TOLERANCE MEASURED IN THE CARBON-TITANIUM MONOCOQUE AT V-MAX.',
    icon: Activity,
    specs: [
      { label: 'BENDING_STIFF', value: 'OPTIMAL' },
      { label: 'CHASSIS_CODE', value: 'V-01_GEN3' }
    ]
  }
]

export function GloryNumbersSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.01 })
  const [pixelRatio, setPixelRatio] = useState(1)

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio || 1)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const particleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  )

  const progressBarProgress = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scaleX = useSpring(progressBarProgress.scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="relative bg-black">
      <motion.div
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: particleOpacity
        }}
      >
        <Particles
          particleColors={[DESIGN_SYSTEM.COLORS.WHITE, DESIGN_SYSTEM.COLORS.PRIMARY, DESIGN_SYSTEM.COLORS.PRIMARY]}
          particleCount={1000}
          particleSpread={50}
          speed={2}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={true}
          pixelRatio={pixelRatio}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="fixed top-1/2 right-4 md:right-12 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none"
      >
        {GLORY_STATS.map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[7px] font-mono text-zinc-800">NAV_{i + 1}</span>
            <div className="w-[1.5px] h-6 md:h-10 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="w-full origin-top"
                style={{
                  backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                  height: useTransform(
                    progressBarProgress.scrollYProgress,
                    [i / GLORY_STATS.length, (i + 0.8) / GLORY_STATS.length],
                    ["0%", "100%"]
                  )
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="w-full relative z-10">
        {GLORY_STATS.map((stat, index) => (
          <StatSection key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        style={{
          scaleX,
          backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
          boxShadow: `0 -4px 10px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}`
        }}
        className="fixed bottom-0 left-0 right-0 h-1 origin-left z-50"
      />
    </div>
  )
}

function StatSection({ stat, index }: { stat: StatCard, index: number }) {
  const sectionRef = useRef(null)
  const parsedEase = (DESIGN_SYSTEM.ANIMATION.EASING_CUBIC.match(/[\d.]+/g)?.map(Number) || [0.87, 0, 0.13, 1]) as [number, number, number, number]

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent sticky top-0 md:relative snap-start border-b border-zinc-900"
    >
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.02, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -right-10 md:-right-20 top-1/2 -translate-y-1/2 text-[45vw] md:text-[35vw] font-black italic text-white leading-none tracking-tighter"
        >
          {stat.value}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 md:via-black/40 to-transparent z-10" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">

          <div className="md:col-span-8 flex flex-col items-start space-y-4 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <stat.icon className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <div className="h-[1px] w-12 bg-zinc-800" />
              <span className={cn("text-[8px] md:text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                {stat.label}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: parsedEase }}
              className="flex flex-wrap items-baseline gap-x-4 md:gap-x-10"
            >
              <h2 className="text-8xl md:text-[15rem] font-black italic leading-none text-white tracking-tighter">
                {stat.value}
              </h2>
              <span className="text-3xl md:text-8xl font-black italic tracking-tighter uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                {stat.suffix}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative p-6 md:p-10 bg-zinc-950/40 border border-zinc-900 max-w-2xl w-full backdrop-blur-xl"
              style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <p className="text-zinc-500 font-bold uppercase tracking-widest leading-relaxed text-[10px] md:text-[12px] italic">
                {stat.description}
              </p>
              <div className="mt-6 pt-6 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span className="text-[7px] md:text-[8px] font-black tracking-[0.3em] uppercase text-zinc-700">DATA_VERIFIED_V.01</span>
                </div>
                <Cpu className="size-4 text-zinc-800" />
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-4 flex flex-col space-y-4 md:space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
              {stat.specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="bg-zinc-950 border-l-2 p-5 md:p-8 flex flex-col gap-2 group hover:bg-zinc-900/50 transition-colors"
                  style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                >
                  <span className="text-[8px] md:text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] group-hover:text-zinc-500 transition-colors">{spec.label}</span>
                  <span className="text-2xl md:text-4xl font-black italic text-white group-hover:translate-x-1 transition-transform">{spec.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-8 border-t border-zinc-900 hidden md:block"
            >
              <div className="flex items-center gap-6 text-zinc-800">
                <Wind className="size-5" />
                <Shield className="size-5" />
                <span className="text-[9px] font-mono tracking-widest uppercase opacity-50">AFM_ENG_LABS_v2026</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:hidden">
        <div
          className="w-px h-10 bg-gradient-to-b"
          style={{ backgroundImage: `linear-gradient(to bottom, ${DESIGN_SYSTEM.COLORS.PRIMARY}, transparent)` }}
        />
        <span className="text-[8px] font-black text-zinc-800 tracking-[0.5em] uppercase italic">SCROLL_DOWN</span>
      </div>
    </section>
  )
}