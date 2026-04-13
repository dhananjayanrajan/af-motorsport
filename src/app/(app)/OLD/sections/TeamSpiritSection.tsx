'use client'

import { Celebration, Incident, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Maximize2,
  ShieldAlert,
  Trophy
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

type TabType = 'CELEBRATIONS' | 'INCIDENTS'

interface TeamSpiritSectionProps {
  celebrations: Celebration[]
  incidents: Incident[]
}

const SHARP_TRANSITION = { type: 'spring', stiffness: 400, damping: 40, mass: 1 } as const

export default function TeamSpiritSection({ celebrations, incidents }: TeamSpiritSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('CELEBRATIONS')
  const [activeIdx, setActiveIdx] = useState(0)

  const items = activeTab === 'CELEBRATIONS' ? celebrations : incidents
  const current = items[activeIdx]

  const handleNext = useCallback(() => {
    if (items.length === 0) return
    setActiveIdx((prev) => (prev + 1) % items.length)
  }, [items.length])

  const handlePrev = useCallback(() => {
    if (items.length === 0) return
    setActiveIdx((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleNext, handlePrev])

  if (!current) return null

  const getActiveImage = () => {
    const asset = current.assets?.thumbnail || current.assets?.gallery?.[0]
    return typeof asset === 'object' ? (asset as Media)?.url : ''
  }

  return (
    <section className="relative w-full h-[100dvh] bg-black overflow-hidden font-mono select-none antialiased">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${current.id}-media`}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            animate={{ opacity: 0.6, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(40px)' }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {getActiveImage() && (
              <img src={getActiveImage()!} className="w-full h-full object-cover grayscale" alt="" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 z-50 flex items-center justify-between px-10 pointer-events-none">
        <div className="flex items-center gap-8 pointer-events-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">Archive_Sector</span>
            <span className="text-xs font-black text-white italic">TEAM_SPIRIT_0.4</span>
          </div>
          <div className="flex bg-zinc-900 p-1 border border-zinc-800">
            {(['CELEBRATIONS', 'INCIDENTS'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setActiveIdx(0); }}
                className={cn(
                  "px-8 py-2 text-[9px] font-black uppercase tracking-widest transition-all relative",
                  activeTab === tab ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {activeTab === tab && (
                  <motion.div layoutId="spirit-tab" className="absolute inset-0 bg-[#00FF41]" transition={SHARP_TRANSITION} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-[#00FF41]">LAT_SYNC: OK</span>
            <span className="text-[8px] font-bold text-zinc-600 uppercase">SYS_2026_RECOVERY</span>
          </div>
          <div className="size-10 border border-zinc-800 flex items-center justify-center">
            <Activity size={14} className="text-[#00FF41] animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full lg:w-[600px] z-40 p-10 lg:p-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${current.id}-content`}
            initial={{ opacity: 0, x: -30, skewX: -5 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            exit={{ opacity: 0, x: 30, skewX: 5 }}
            transition={SHARP_TRANSITION}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {activeTab === 'CELEBRATIONS' ? <Trophy size={16} className="text-[#00FF41]" /> : <ShieldAlert size={16} className="text-red-500" />}
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase">
                  {activeTab === 'CELEBRATIONS' ? 'Victory_Log' : 'Incident_Report'}
                </span>
              </div>
              <h2 className="text-6xl lg:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter text-white">
                {current.name}
              </h2>
            </div>

            <p className="text-xs font-bold text-zinc-400 uppercase leading-relaxed tracking-wider border-l-2 border-[#00FF41] pl-6 max-w-md">
              {current.basics?.description || "CLASSIFIED_DATA_MISSING"}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/80 border border-zinc-800 p-6 space-y-2">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Clock size={12} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Timestamp</span>
                </div>
                <div className="text-sm font-black text-white italic uppercase">
                  {current.details?.date_time ? new Date(current.details.date_time).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 p-6 space-y-2">
                <div className="flex items-center gap-2 text-zinc-500">
                  <MapPin size={12} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Location</span>
                </div>
                <div className="text-sm font-black text-white italic uppercase truncate">
                  {activeTab === 'CELEBRATIONS' ? 'SECTOR_A' : 'TURN_14_EXITS'}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-0 bottom-0 top-0 w-24 border-l border-white/10 flex flex-col items-center justify-center gap-12 bg-black/40 backdrop-blur-md">
        <div className="flex flex-col gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "w-1 transition-all duration-300",
                i === activeIdx ? "h-12 bg-[#00FF41]" : "h-4 bg-zinc-800 hover:bg-zinc-600"
              )}
            />
          ))}
        </div>
        <div className="rotate-90 whitespace-nowrap text-[10px] font-black tracking-[0.6em] text-zinc-600 uppercase">
          SCRIP_IDX_{activeIdx + 1}
        </div>
      </div>

      <div className="absolute bottom-10 right-32 flex gap-4 z-50">
        <button
          onClick={handlePrev}
          className="size-16 bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center hover:bg-[#00FF41] hover:text-black transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="h-16 px-10 bg-white text-black font-black uppercase text-xs italic tracking-widest flex items-center gap-4 hover:bg-[#00FF41] transition-all"
        >
          {activeTab === 'CELEBRATIONS' ? 'NEXT_VICTORY' : 'NEXT_INCIDENT'}
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <Maximize2 size={600} className="text-white" strokeWidth={0.5} />
      </div>
    </section>
  )
}