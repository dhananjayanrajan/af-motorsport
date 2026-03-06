'use client'

import Particles from '@/components/Particles'
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
    label: 'TOTAL_PODIUMS',
    value: '142',
    suffix: 'COUNT',
    description: 'DOMINATING THE GLOBAL CIRCUIT WITH UNMATCHED CONSISTENCY ACROSS ALL TERRAINS.',
    icon: Trophy,
    specs: [
      { label: 'WIN_RATE', value: '68%' },
      { label: 'RELIABILITY', value: '99.2%' }
    ]
  },
  {
    id: '02',
    label: 'TOP_SPEED',
    value: '348',
    suffix: 'KM/H',
    description: 'RECORDED DURING THE FINAL LAP AT SILVERSTONE UNDER PEAK AERODYNAMIC LOAD.',
    icon: Zap,
    specs: [
      { label: 'DRS_STATUS', value: 'ACTIVE' },
      { label: 'RPM_PEAK', value: '12,400' }
    ]
  },
  {
    id: '03',
    label: 'LAP_RECORD',
    value: '1:12.4',
    suffix: 'SEC',
    description: 'SHATTERING THE STANDING RECORD BY A MARGIN OF 0.42 SECONDS IN MONACO.',
    icon: Timer,
    specs: [
      { label: 'SECTOR_1', value: '18.2s' },
      { label: 'TYRE_COMP', value: 'SOFT' }
    ]
  },
  {
    id: '04',
    label: 'POLE_POSITIONS',
    value: '84',
    suffix: 'QUAL',
    description: 'SECURED THROUGH TACTICAL PRECISION AND RAW MECHANICAL SUPERIORITY.',
    icon: Flag,
    specs: [
      { label: 'GAP_TO_P2', value: '-0.15s' },
      { label: 'FUEL_LOAD', value: 'MINIMAL' }
    ]
  },
  {
    id: '05',
    label: 'G_FORCE_MAX',
    value: '5.2',
    suffix: 'G',
    description: 'SUSTAINED LATERAL LOAD THROUGH THE EAU ROUGE COMPLEX AT SPA-FRANCORCHAMPS.',
    icon: Activity,
    specs: [
      { label: 'LATERAL', value: '5.2G' },
      { label: 'LONGITUDINAL', value: '4.8G' }
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
          particleColors={["#ffffff", "#ff0000", "#dc2626"]}
          particleCount={1500}
          particleSpread={50}
          speed={3}
          particleBaseSize={300}
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
            <span className="text-[8px] font-mono text-zinc-700">0{i + 1}</span>
            <div className="w-[2px] h-8 md:h-12 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-red-600 origin-top"
                style={{
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
        style={{ scaleX }}
        className="fixed bottom-0 left-0 right-0 h-1 bg-red-600 origin-left z-50 shadow-[0_-4px_10px_rgba(220,38,38,0.3)]"
      />
    </div>
  )
}

function StatSection({ stat, index }: { stat: StatCard, index: number }) {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent sticky top-0 md:relative snap-start border-b border-white/5"
    >
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.03, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -right-10 md:-right-20 top-1/2 -translate-y-1/2 text-[50vw] md:text-[40vw] font-black italic text-white leading-none tracking-tighter"
        >
          {stat.value}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 md:via-black/60 to-transparent z-10" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">

          <div className="md:col-span-8 flex flex-col items-start space-y-3 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <stat.icon className="size-4 md:size-5 text-red-600" />
              <div className="h-[1px] w-8 md:w-12 bg-red-600/30" />
              <span className="text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">{stat.label}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-baseline gap-x-3 md:gap-x-6"
            >
              <h2 className="text-7xl md:text-[14rem] font-black italic leading-none text-white">
                {stat.value}
              </h2>
              <span className="text-xl md:text-6xl font-black italic text-red-600 tracking-tighter uppercase">
                {stat.suffix}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative p-4 md:p-8 bg-zinc-950/50 border border-white/10 max-w-xl w-full backdrop-blur-sm"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600" />
              <p className="text-zinc-400 font-mono uppercase tracking-[0.05em] md:tracking-[0.1em] leading-relaxed text-[10px] md:text-sm italic">
                {stat.description}
              </p>
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[7px] md:text-[8px] font-black text-red-600 tracking-widest uppercase">Validated_Telemetry</span>
                <Cpu className="size-3 text-zinc-800" />
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-4 flex flex-col space-y-3 md:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
              {stat.specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="bg-zinc-900/30 backdrop-blur-md border-l-2 border-red-600 p-3 md:p-4 flex flex-col gap-1"
                >
                  <span className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-widest">{spec.label}</span>
                  <span className="text-lg md:text-2xl font-black italic text-white">{spec.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-4 md:pt-6 border-t border-zinc-900 hidden md:block"
            >
              <div className="flex items-center gap-4 text-zinc-800">
                <Wind className="size-4" />
                <Shield className="size-4" />
                <span className="text-[8px] font-mono tracking-tighter">PRC_UNIT_v4.2</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden">
        <div className="w-px h-8 bg-gradient-to-b from-red-600 to-transparent animate-bounce" />
        <span className="text-[7px] font-black text-zinc-700 tracking-widest uppercase italic">Slide</span>
      </div>
    </section>
  )
}