'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import { Cpu, Globe, Zap, ChevronRight, Activity, Shield, Wind } from 'lucide-react'

interface DriverHeroProps {
  driverData: {
    firstName: string
    lastName: string
    number: string
    team: string
    nationality: string
    role: string
    biography: string
    image: string
    stats: {
      label: string
      value: string
      suffix: string
    }[]
  }
}

export default function DriverHeroSection({ driverData }: DriverHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pixelRatio, setPixelRatio] = useState(1)

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio || 1)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300])
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const springOpacity = useSpring(opacityFade, { stiffness: 100, damping: 30 })
  const parsedEase = [0.87, 0, 0.13, 1] as [number, number, number, number]

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] w-full bg-black overflow-hidden flex flex-col items-center"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ y: yText, opacity: springOpacity }}
          className="absolute left-0 top-1/4 w-full select-none overflow-hidden whitespace-nowrap"
        >
          <h2 className="text-[30vw] font-black italic text-white/[0.02] leading-none tracking-tighter uppercase">
            {driverData.lastName}
          </h2>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-12 pt-32 md:pt-48 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <div className="lg:col-span-7 flex flex-col items-start space-y-8 md:space-y-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: parsedEase }}
              className="flex items-center gap-4"
            >
              <div className="h-[2px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[10px] md:text-xs font-black text-zinc-500 uppercase tracking-[0.4em]">
                {driverData.role} // {driverData.team}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: parsedEase }}
            >
              <h1 className="flex flex-col text-7xl md:text-[10rem] lg:text-[13rem] font-black italic leading-[0.8] text-white tracking-tighter uppercase">
                <span className="text-zinc-700/40 translate-x-[-2%]">{driverData.firstName}</span>
                <span className="relative inline-block">
                  {driverData.lastName}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.8, ease: parsedEase }}
                    className="absolute -bottom-2 md:-bottom-4 left-0 h-2 md:h-4 z-[-1]"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: `0 0 30px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` }}
                  />
                </span>
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative p-8 md:p-10 bg-zinc-950/40 border border-white/10 max-w-2xl w-full backdrop-blur-xl"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Activity className="size-8 text-zinc-500" />
            </div>

            <p className="text-zinc-400 font-mono uppercase tracking-widest leading-relaxed text-xs md:text-sm italic">
              {driverData.biography}
            </p>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Globe className="size-4 text-zinc-600" />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">{driverData.nationality}</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                <span className="text-[10px] font-black uppercase tracking-widest">DRV_SYNC.v4</span>
                <Cpu className="size-4" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {driverData.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + (i * 0.1) }}
                className="bg-zinc-900/20 border-l-2 p-4 md:p-6 backdrop-blur-md"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
              >
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block mb-1">{stat.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black italic text-white leading-none">{stat.value}</span>
                  <span className="text-[10px] font-black italic uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{stat.suffix}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            style={{ y: yImage, scale: scaleImage }}
            className="relative z-20"
          >
            <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 pointer-events-none select-none overflow-hidden h-fit">
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 0.15, x: 0 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="text-[20rem] md:text-[28rem] font-black italic text-white leading-none"
              >
                {driverData.number}
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative aspect-[3/4] w-full"
            >
              <img
                src={driverData.image}
                alt={driverData.lastName}
                className="w-full h-full object-contain object-bottom grayscale brightness-110 drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute bottom-10 right-0 bg-zinc-950/80 backdrop-blur-2xl border-r-4 p-6 md:p-8 min-w-[240px]"
              style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY, clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                <span className="text-[10px] font-black text-zinc-500 uppercase italic tracking-widest">Performance_Index</span>
              </div>
              <div className="text-4xl font-black italic text-white tracking-tighter uppercase mb-4 leading-none">
                Elite_A1
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-1 flex-1 bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.5 + (i * 0.1) }}
                      className="h-full"
                      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 flex justify-between items-end z-30">
        <div className="hidden md:flex flex-col gap-2">
          <div className="flex items-center gap-4 text-zinc-800">
            <Wind className="size-4" />
            <Shield className="size-4" />
            <span className="text-[9px] font-mono tracking-tighter uppercase">Chassis_Integrity: 100%</span>
          </div>
          <div className="w-48 h-px bg-zinc-900 overflow-hidden relative">
            <motion.div
              style={{ scaleX: scrollYProgress, backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
              className="absolute inset-0 origin-left"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-6 bg-white px-10 py-5 text-black font-black uppercase italic tracking-tighter transition-all"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
        >
          Initialize Telemetry
          <ChevronRight className="size-5 group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 z-50">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: scrollYProgress,
            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
            boxShadow: `0 -5px 20px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}`
          }}
        />
      </div>
    </section>
  )
}