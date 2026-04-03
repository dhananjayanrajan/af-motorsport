'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  FileText,
  ChevronRight,
  Plus,
  Info,
  Zap
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState, useEffect, useCallback } from 'react'

type TabType = 'CELEBRATIONS' | 'INCIDENTS'

export function TeamSpiritSection({
  celebrations = DUMMY_CELEBRATIONS,
  incidents = DUMMY_INCIDENTS,
}: {
  celebrations?: any[]
  incidents?: any[]
}) {
  const [activeTab, setActiveTab] = useState<TabType>('CELEBRATIONS')
  const [activeIdx, setActiveIdx] = useState(0)

  const items = activeTab === 'CELEBRATIONS' ? celebrations : incidents
  const current = items[activeIdx]

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % items.length)
  }, [items.length])

  const handlePrev = useCallback(() => {
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

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col lg:flex-row font-sans border-y border-zinc-900 select-none">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${current.id}-bg`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={activeTab === 'CELEBRATIONS' ? current.assets.primary : current.assets.thumbnail}
              className="w-full h-full object-cover grayscale opacity-50"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 w-full lg:w-[450px] bg-black border-r border-zinc-900 flex flex-col shrink-0 overflow-hidden">
        <div className="p-8 md:p-10 flex-1 flex flex-col overflow-hidden">
          <header className="mb-10 shrink-0">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">Archive_v4.2</span>
            </div>

            <div className="flex bg-zinc-950 border border-zinc-900 p-1">
              {(['CELEBRATIONS', 'INCIDENTS'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setActiveIdx(0); }}
                  className={cn(
                    "flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer relative",
                    activeTab === tab ? "text-black" : "text-zinc-600 hover:text-zinc-400"
                  )}
                >
                  {activeTab === tab && (
                    <motion.div layoutId="tab-active" className="absolute inset-0 bg-white" transition={{ duration: 0.3 }} />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 space-y-10 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${current.id}-info`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-[0.85] break-words">
                    {current.name}
                  </h3>
                  <div className="h-1 w-16 mt-6" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                </div>

                <p className="text-[13px] font-bold text-zinc-500 uppercase leading-relaxed tracking-tight border-l-2 border-zinc-900 pl-4">
                  {current.basics?.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-zinc-700">
                    <Info size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Key_Outcomes</span>
                  </div>
                  <div className="space-y-2">
                    {(activeTab === 'CELEBRATIONS' ? current.traits?.outcomes?.stories : current.traits?.outcomes?.impacts)?.map((node: any, i: number) => (
                      <div
                        key={i}
                        className="p-4 border border-zinc-900 bg-zinc-950 flex justify-between items-center"
                      >
                        <span className="text-[10px] font-black uppercase italic text-zinc-400">{node.value}</span>
                        <Plus size={12} className="text-zinc-800" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="mt-10 space-y-3 shrink-0">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="size-14 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 transition-colors cursor-pointer group"
              >
                <ChevronRight size={20} className="rotate-180 text-zinc-700 group-hover:text-white" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 h-14 bg-white text-black font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                NEXT_RECORD
                <ChevronRight size={16} />
              </button>
            </div>
            <button
              onClick={() => window.open(`/tribe/${activeTab.toLowerCase()}/${current.id}`, '_self')}
              className="w-full h-14 border border-zinc-900 text-zinc-500 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:text-white hover:border-white transition-all cursor-pointer"
            >
              <FileText size={16} />
              VIEW_FULL_LOG
            </button>
          </footer>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col justify-end p-8 md:p-12 pointer-events-none">
        <div className="flex flex-col gap-3">
          <div className="flex gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "h-1.5 transition-all duration-500 pointer-events-auto cursor-pointer",
                  i === activeIdx ? "w-16" : "w-6 bg-zinc-800 hover:bg-zinc-600"
                )}
                style={{ backgroundColor: i === activeIdx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
              />
            ))}
          </div>
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em]">Tribe_Archive_Index</span>
        </div>
      </div>
    </section>
  )
}

const DUMMY_CELEBRATIONS = [
  {
    id: 1,
    name: "MONSOON_VICTORY",
    basics: { description: "TOTAL DOMINATION UNDER ADVERSE ATMOSPHERIC CONDITIONS. THE SINGAPORE PODIUM LOCKOUT." },
    traits: { outcomes: { stories: [{ value: "STRATEGY_MASTERY" }, { value: "PIT_STOP_PRECISION" }] } },
    assets: { primary: "https://picsum.photos/seed/monsoon/1920/1080" }
  },
  {
    id: 2,
    name: "FOUNDERS_NIGHT",
    basics: { description: "COMMEMORATING A DECADE OF ENGINEERING SOVEREIGNTY AND AERODYNAMIC REVOLUTION." },
    traits: { outcomes: { stories: [{ value: "LEGACY_ADDRESS" }, { value: "FUTURE_REVEAL" }] } },
    assets: { primary: "https://picsum.photos/seed/founders/1920/1080" }
  }
]

const DUMMY_INCIDENTS = [
  {
    id: 801,
    name: "CHASSIS_BREACH",
    basics: { description: "CRITICAL COMPOSITE FAILURE DETECTED DURING NÜRBURGRING ENDURANCE EVALUATION." },
    traits: { outcomes: { impacts: [{ value: "RE_DESIGN_PHASE" }, { value: "SAFETY_AUDIT_V3" }] } },
    assets: { thumbnail: "https://picsum.photos/seed/chassis/1920/1080" }
  }
]