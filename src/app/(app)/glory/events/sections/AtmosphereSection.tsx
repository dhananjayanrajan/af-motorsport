'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

export function AtmosphereSection({ data }: { data?: any }) {
  const event = data || {}
  const { scrollYProgress } = useScroll()

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const getParam = (key: string) => {
    const list = event?.traits?.parameters?.list || []
    return list.find((p: any) =>
      p.parameter?.name?.toLowerCase().includes(key.toLowerCase()) ||
      p.parameter?.slug?.toLowerCase().includes(key.toLowerCase())
    )
  }

  const airTemp = getParam('air') || { value: '31', unit: '°C' }
  const humidity = getParam('humidity') || { value: '09', unit: '%' }
  const track = getParam('track') || { value: '54', unit: '°C' }
  const attendance = event?.metrics?.quantifiers?.attendance || '128,500'

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col justify-center overflow-hidden border-y border-white/10 select-none">

      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <Image
          src={event?.assets?.cover?.url || 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2000'}
          alt="Atmosphere"
          fill
          className="object-cover opacity-20 grayscale scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </motion.div>

      <motion.div
        style={{ x: textX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-10 opacity-[0.05] whitespace-nowrap"
      >
        <span className="text-[40vw] font-black italic tracking-tighter text-white uppercase leading-none">
          {event?.name || 'ATMOSPHERE'}
        </span>
      </motion.div>

      <div className="relative z-20 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 py-20">

        <div className="flex flex-col gap-12 lg:gap-0">

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="flex items-center gap-6 group cursor-crosshair"
          >
            <div className="h-0.5 w-16 bg-red-600 transition-all duration-500 group-hover:w-32" />
            <span className="text-[10px] md:text-xs font-black italic tracking-[0.6em] text-red-600 uppercase">
              Environment_Sync_Active
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 mt-8 items-stretch">

            <div className="lg:col-span-6 flex flex-col justify-center relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ skewX: -2 }}
                className="transition-transform duration-300"
              >
                <div className="flex items-start">
                  <span className="text-[clamp(8rem,20vw,24rem)] font-black italic leading-[0.75] text-white tracking-tighter drop-shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                    {airTemp.value}
                  </span>
                  <span className="text-[clamp(2rem,6vw,6rem)] font-black italic text-red-600 mt-4 ml-2">
                    {airTemp.unit}
                  </span>
                </div>
                <div className="mt-4 md:mt-8 space-y-2">
                  <span className="block text-lg md:text-2xl font-black italic text-zinc-500 uppercase tracking-widest">
                    Ambient_Engine_Load
                  </span>
                  <div className="h-0.5 w-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileInView={{ x: '0%' }}
                      transition={{ duration: 1.5, ease: 'circOut' }}
                      className="h-full w-full bg-gradient-to-r from-red-600 to-white"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-center gap-12 lg:gap-20 lg:border-l lg:border-white/10 lg:pl-16">
              <EnvMetric value={humidity.value} unit={humidity.unit} label="Rel_Humidity" />
              <EnvMetric value={track.value} unit={track.unit} label="Surface_Temp" color="text-red-600" />
            </div>

            <div className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end text-left lg:text-right gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative p-6 border border-white/10 bg-white/5 backdrop-blur-md group"
              >
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-red-600" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-red-600" />

                <span className="block text-4xl md:text-6xl font-black italic text-white tracking-tighter leading-none mb-2">
                  {attendance}
                </span>
                <span className="text-[10px] font-black italic text-red-600 tracking-widest uppercase block mb-4">
                  Active_Attendance
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      className="h-1 w-full bg-red-600"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 md:left-12 flex flex-wrap gap-8 opacity-40">
        <StatusPill value="45.821" label="LATENCY_MS" />
        <StatusPill value="V3.9" label="KERN_PROC" />
        <StatusPill value="8.4kw" label="RAD_EMISSION" />
      </div>

      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
    </section>
  )
}

function EnvMetric({ value, unit, label, color = "text-white" }: { value: string, unit: string, label: string, color?: string }) {
  return (
    <motion.div
      whileHover={{ x: 10 }}
      className="group cursor-default"
    >
      <div className="flex items-baseline gap-3">
        <span className={`text-6xl md:text-8xl font-black italic tracking-tighter transition-colors ${color}`}>
          {value}
        </span>
        <span className="text-xl md:text-2xl font-black italic text-zinc-600 uppercase">
          {unit}
        </span>
      </div>
      <span className="text-[10px] md:text-xs font-black italic text-zinc-400 group-hover:text-white uppercase tracking-[0.3em] mt-2 block transition-colors">
        {label}
      </span>
    </motion.div>
  )
}

function StatusPill({ value, label }: { value: string, label: string }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-red-600/50 pl-3">
      <span className="text-[10px] font-mono text-white leading-none">{value}</span>
      <span className="text-[8px] font-black text-zinc-600 tracking-widest leading-none">{label}</span>
    </div>
  )
}