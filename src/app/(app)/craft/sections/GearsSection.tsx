'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Activity,
  ShieldCheck,
  Target,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, useRef, useEffect } from 'react'

export function GearSection() {
  const [activeType, setActiveType] = useState<'HELMET' | 'SUIT'>('HELMET')
  const [activeIdx, setActiveIdx] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentItems = DUMMY_GEAR.filter(item => item.type === activeType)
  const current = currentItems[activeIdx]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % currentItems.length)
        setActiveHotspot(null)
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + currentItems.length) % currentItems.length)
        setActiveHotspot(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentItems.length])

  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.children[activeIdx] as HTMLElement
      if (activeElement) {
        scrollRef.current.scrollTo({
          left: activeElement.offsetLeft - scrollRef.current.offsetWidth / 2 + activeElement.offsetWidth / 2,
          behavior: 'smooth'
        })
      }
    }
  }, [activeIdx])

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-20"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
    >
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center w-full px-6">
        <div className="flex bg-zinc-950 p-1 border border-zinc-900 mb-12">
          {['HELMET', 'SUIT'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setActiveType(t as any)
                setActiveIdx(0)
                setActiveHotspot(null)
              }}
              className={cn(
                "px-8 py-2 text-[8px] font-black uppercase tracking-[0.3em] transition-all cursor-pointer",
                activeType === t ? "bg-white text-black" : "text-zinc-700 hover:text-zinc-300"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <span className="text-[8px] font-black tracking-[0.6em] text-zinc-800 uppercase block">ARCHIVE_REGISTRY</span>
          <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
            {activeType}
          </h2>
        </div>
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center py-32">
        <div className="absolute size-[300px] md:size-[600px] border border-zinc-900/40 rounded-full animate-spin-slow opacity-20" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[280px] md:max-w-[440px] aspect-square"
          >
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5"
              style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}
            />

            <Callout
              pos={{ top: "0%", left: "-20%" }}
              value={current.specs[0].value}
              icon={<ShieldCheck size={12} />}
              isActive={activeHotspot === 0}
              onTrigger={() => setActiveHotspot(activeHotspot === 0 ? null : 0)}
            />
            <Callout
              pos={{ bottom: "15%", right: "-20%" }}
              value={current.specs[2].value}
              icon={<Activity size={12} />}
              align="right"
              isActive={activeHotspot === 2}
              onTrigger={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-zinc-900/30 p-12 md:p-16">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">

          <div className="text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tighter">{current.name}</h3>
            <div className="flex items-center justify-center gap-4">
              <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest italic">REF: {current.id}</span>
              <div className="size-1 bg-zinc-900 rounded-full" />
              <span className="text-[7px] font-black text-zinc-700 uppercase tracking-[0.3em]">{activeIdx + 1} / {currentItems.length}</span>
            </div>
          </div>

          <div className="relative w-full flex items-center justify-center gap-8">
            <button
              onClick={() => setActiveIdx((prev) => (prev - 1 + currentItems.length) % currentItems.length)}
              className="size-12 border border-zinc-900 flex items-center justify-center text-zinc-800 hover:text-white hover:border-zinc-600 transition-all cursor-pointer shrink-0"
            >
              <ChevronLeft size={14} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth snap-x no-scrollbar py-4 px-6"
            >
              {currentItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveIdx(idx); setActiveHotspot(null); }}
                  className={cn(
                    "size-14 md:size-16 border transition-all duration-500 cursor-pointer snap-start flex-shrink-0 bg-zinc-950 overflow-hidden",
                    activeIdx === idx ? "border-white scale-125 z-10" : "border-zinc-900 opacity-10 hover:opacity-40"
                  )}
                  style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                >
                  <img src={item.image} alt="" className="w-full h-full object-cover grayscale" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveIdx((prev) => (prev + 1) % currentItems.length)}
              className="size-12 border border-zinc-900 flex items-center justify-center text-zinc-800 hover:text-white hover:border-zinc-600 transition-all cursor-pointer shrink-0"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Callout({ pos, value, icon, align = 'left', isActive, onTrigger }: any) {
  return (
    <div className="absolute z-30" style={pos}>
      <button onClick={onTrigger} className={cn("flex items-center gap-6 cursor-pointer group", align === 'right' && "flex-row-reverse")}>
        <div
          className={cn("size-10 border flex items-center justify-center transition-all duration-700", isActive ? "bg-white text-black border-white" : "bg-black text-zinc-800 border-zinc-900 hover:border-zinc-700")}
          style={{
            backgroundColor: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : '',
            borderColor: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : '',
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)'
          }}
        >
          {isActive ? <Target size={16} /> : icon}
        </div>
        <div className={cn("flex flex-col gap-1", align === 'right' && "items-end")}>
          <AnimatePresence>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, x: align === 'left' ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter whitespace-nowrap leading-none"
              >
                {value}
              </motion.span>
            )}
          </AnimatePresence>
          <span className={cn("text-[6px] font-black uppercase tracking-[0.5em] transition-colors", isActive ? "text-primary" : "text-zinc-900 group-hover:text-zinc-700")} style={{ color: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>SYSTEM_SPEC</span>
        </div>
      </button>
    </div>
  )
}

const DUMMY_GEAR = [
  ...Array.from({ length: 22 }).map((_, i) => ({
    id: `H-${101 + i}`,
    type: 'HELMET' as const,
    name: `AERO_SPEC_V${i + 1}`,
    description: "REINFORCED SHELL ARCHITECTURE WITH INTEGRATED DATA FEEDS.",
    image: `https://picsum.photos/seed/h${101 + i}/800/800`,
    specs: [{ value: "CARBON_IX" }, { value: "1.25KG" }, { value: "CRYO_CELL" }]
  })),
  ...Array.from({ length: 11 }).map((_, i) => ({
    id: `S-${501 + i}`,
    type: 'SUIT' as const,
    name: `TITAN_PLY_V${i + 1}`,
    description: "COMPRESSION LAYER WITH THERMAL REGULATION CORE.",
    image: `https://picsum.photos/seed/s${501 + i}/800/800`,
    specs: [{ value: "NOMEX_ULTRA" }, { value: "0.90KG" }, { value: "CORE_TEMP" }]
  }))
]