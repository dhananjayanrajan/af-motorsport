'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

interface AtmosphereProps {
  data: any // Based on Event & Session interfaces
}

export function StageSetSection({ data }: AtmosphereProps) {
  const event = data || {}
  const assets = event?.assets || {}
  const parameters = event?.traits?.parameters?.list || []

  const getParam = (slug: string) => {
    return parameters.find((p: any) =>
      p.parameter?.name?.toLowerCase().includes(slug) ||
      p.parameter?.slug === slug
    )
  }

  const temp = getParam('temperature') || { value: '24', unit: '°C' }
  const humidity = getParam('humidity') || { value: '45', unit: '%' }
  const visibility = getParam('visibility') || { value: '10', unit: 'KM' }
  const wind = getParam('wind') || { value: '12', unit: 'KPH' }

  return (
    <section className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image
          src={assets?.cover?.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2500'}
          alt="Atmospheric Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <AmbientStat
          label="AMBIENT_TEMP"
          value={temp.value}
          unit={temp.unit}
          delay={0.1}
        />

        <AmbientStat
          label="HUMIDITY_INDEX"
          value={humidity.value}
          unit={humidity.unit}
          delay={0.2}
        />

        <AmbientStat
          label="VISIBILITY_RANGE"
          value={visibility.value}
          unit={visibility.unit}
          delay={0.3}
        />

        <AmbientStat
          label="WIND_VELOCITY"
          value={wind.value}
          unit={wind.unit}
          delay={0.4}
        />

      </div>

      <div className="absolute bottom-12 left-12 z-20">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-red-600" />
            <span className="text-zinc-500 font-mono text-[10px] tracking-[0.5em] uppercase">
              Atmospheric_Analysis_v1.0
            </span>
          </div>
          <h2 className="text-white font-black italic text-4xl tracking-tighter uppercase">
            {event?.name || 'FIELD_METRICS'}
          </h2>
        </div>
      </div>

      <div className="absolute top-0 right-0 p-12 mix-blend-difference opacity-20 hidden lg:block">
        <span className="text-[120px] font-black italic leading-none tracking-tighter text-white">
          {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
        </span>
      </div>

    </section>
  )
}

function AmbientStat({ label, value, unit, delay }: { label: string; value: string; unit: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="flex flex-col gap-1"
    >
      <span className="text-red-600 font-black italic text-[10px] tracking-[0.3em] uppercase">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-8xl md:text-9xl font-black text-white italic leading-none tracking-tighter">
          {value}
        </span>
        <span className="text-2xl font-black text-zinc-500 italic uppercase">
          {unit}
        </span>
      </div>
    </motion.div>
  )
}