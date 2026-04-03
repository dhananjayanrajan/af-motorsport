'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Activity,
  Box,
  ShieldCheck,
  Target,
  Download,
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

  const handleGenerateManifest = () => {
    const manifestContent = `ID: ${current.id}\nNAME: ${current.name}\nTYPE: ${current.type}\nSPECS: ${current.specs.map(s => s.value).join(', ')}`
    const blob = new Blob([manifestContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${current.id}_MANIFEST.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
    >
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-start p-8 md:p-12 gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black tracking-[0.3em] text-zinc-600 uppercase">Registry_View</span>
          <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter">
            {activeType}
          </h2>
        </div>

        <div className="flex bg-zinc-900 p-1 border border-zinc-800">
          {['HELMET', 'SUIT'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setActiveType(t as any)
                setActiveIdx(0)
                setActiveHotspot(null)
              }}
              className={cn(
                "px-8 py-2 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer",
                activeType === t ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute size-[300px] md:size-[600px] border border-zinc-900 rounded-full animate-spin-slow opacity-30" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-[320px] md:max-w-[550px] aspect-square"
          >
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/5"
            />

            <Callout
              pos={{ top: "15%", left: "-8%" }}
              label="SHELL"
              value={current.specs[0].value}
              icon={<ShieldCheck size={14} />}
              isActive={activeHotspot === 0}
              onTrigger={() => setActiveHotspot(activeHotspot === 0 ? null : 0)}
            />
            <Callout
              pos={{ bottom: "30%", right: "-8%" }}
              label="THERMAL"
              value={current.specs[2].value}
              icon={<Activity size={14} />}
              align="right"
              isActive={activeHotspot === 2}
              onTrigger={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 bg-zinc-950/50 backdrop-blur-md border-t border-zinc-900 p-6 md:p-10">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">

          <div className="w-full lg:w-1/4">
            <h3 className="text-2xl font-black italic text-white uppercase leading-none">{current.name}</h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Entry_{activeIdx + 1}/{currentItems.length}</span>
            </div>
          </div>

          <div className="relative flex-1 flex items-center gap-2 max-w-full lg:max-w-2xl px-4">
            <button
              onClick={() => setActiveIdx((prev) => (prev - 1 + currentItems.length) % currentItems.length)}
              className="p-1 text-zinc-700 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-hidden scroll-smooth snap-x no-scrollbar py-2"
            >
              {currentItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveIdx(idx); setActiveHotspot(null); }}
                  className={cn(
                    "size-12 md:size-14 border transition-all cursor-pointer snap-start flex-shrink-0 bg-zinc-900 rounded-sm overflow-hidden",
                    activeIdx === idx ? "border-white ring-1 ring-white/50" : "border-zinc-800 opacity-40 hover:opacity-100"
                  )}
                  style={{ borderColor: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                >
                  <img src={item.image} alt="" className="w-full h-full object-cover grayscale" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveIdx((prev) => (prev + 1) % currentItems.length)}
              className="p-1 text-zinc-700 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <button
            className="w-full lg:w-auto px-10 py-4 bg-primary text-black font-black italic text-[10px] tracking-[0.2em] uppercase transition-all cursor-pointer hover:bg-white"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
            onClick={handleGenerateManifest}
          >
            <div className="flex items-center justify-center gap-3">
              <Download size={14} />
              <span>EXPORT_MANIFEST</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

function Callout({ pos, label, value, icon, align = 'left', isActive, onTrigger }: any) {
  return (
    <div className="absolute z-30" style={pos}>
      <button onClick={onTrigger} className={cn("flex items-center gap-3 cursor-pointer group", align === 'right' && "flex-row-reverse")}>
        <div
          className={cn("size-10 rounded-full border flex items-center justify-center transition-all", isActive ? "bg-white text-black border-white" : "bg-zinc-950 text-zinc-500 border-zinc-800")}
          style={{ backgroundColor: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : '', borderColor: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
        >
          {isActive ? <Target size={18} /> : icon}
        </div>
        <div className={cn("flex flex-col", align === 'right' && "items-end")}>
          <span className={cn("text-[9px] font-black uppercase tracking-widest transition-colors", isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400")}>{label}</span>
          <AnimatePresence>
            {isActive && (
              <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-black text-white italic uppercase tracking-tighter whitespace-nowrap">
                {value}
              </motion.span>
            )}
          </AnimatePresence>
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
    image: `https://picsum.photos/seed/${101 + i}/800/800`,
    specs: [{ value: "CARBON_IX" }, { value: "1.25KG" }, { value: "CRYO_CELL" }]
  })),
  ...Array.from({ length: 11 }).map((_, i) => ({
    id: `S-${501 + i}`,
    type: 'SUIT' as const,
    name: `TITAN_PLY_V${i + 1}`,
    description: "COMPRESSION LAYER WITH THERMAL REGULATION CORE.",
    image: `https://picsum.photos/seed/${501 + i}/800/800`,
    specs: [{ value: "NOMEX_ULTRA" }, { value: "0.90KG" }, { value: "CORE_TEMP" }]
  }))
]