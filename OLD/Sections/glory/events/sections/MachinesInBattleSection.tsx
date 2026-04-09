'use client'

import type { Car, Entry, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const SCANLINE_ANIM = "absolute inset-0 bg-gradient-to-b from-transparent via-red-600/10 to-transparent h-20 w-full opacity-0 group-hover:animate-[scan_2s_linear_infinite]"
const CLIP_PATH = "polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%)"

const DUMMY_ENTRIES: Entry[] = [
  {
    id: 101,
    name: "MAX VERSTAPPEN",
    session: 1,
    updatedAt: "2026-03-06",
    createdAt: "2026-03-06",
    basics: {
      identifiers: { number: "01", plate: "MV-01" },
      description: "CHAMPIONSHIP_CORE_STABLE"
    },
    details: { status: 'Classified' },
    metrics: {
      positions: { grid: 1, start: 1, finish: 1, laps: 56 }
    },
    contexts: {
      associations: {
        car: {
          id: 501,
          name: "RB-20",
          basics: { identifiers: { model: "RB-20", code: "2026-X" } },
          assets: {
            thumbnail: { id: 901, url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800" } as Media
          }
        } as Car
      }
    }
  },
  {
    id: 102,
    name: "LEWIS HAMILTON",
    session: 1,
    updatedAt: "2026-03-06",
    createdAt: "2026-03-06",
    basics: {
      identifiers: { number: "44", plate: "LH-44" },
      description: "PURSUIT_VECTOR_ACTIVE"
    },
    details: { status: 'Classified' },
    metrics: {
      positions: { grid: 2, start: 2, finish: 3, laps: 56 }
    },
    contexts: {
      associations: {
        car: {
          id: 502,
          name: "W-15",
          basics: { identifiers: { model: "W-15", code: "2026-M" } },
          assets: {
            thumbnail: { id: 902, url: "https://images.unsplash.com/photo-1594739394171-8935c754670b?q=80&w=800" } as Media
          }
        } as Car
      }
    }
  }
]

export function MachinesInBattleSection({ entries = DUMMY_ENTRIES }: { entries?: Entry[] }) {
  const [activeID, setActiveID] = useState<number | null>(null)

  return (
    <section className="relative w-full bg-black py-32 px-6 lg:px-24 overflow-hidden border-t border-zinc-900 font-sans">
      <style jsx global>{`
        @keyframes scan {
          from { top: -100px; }
          to { top: 100%; }
        }
        .glitch-text {
          text-shadow: 2px 0 #ff0000, -2px 0 #00ff00;
        }
      `}</style>

      {/* BACKGROUND GRID DECOR */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-red-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.6em] text-red-600 uppercase">Battle_Formation</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none">
              THE <span className="text-red-600">MACHINES</span>
            </h2>
          </div>
          <div className="text-right border-r-2 border-zinc-800 pr-6">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Telemetry_Link</span>
            <span className="text-xs font-black italic text-white uppercase tracking-tighter">Established_v4.0</span>
          </div>
        </div>

        {/* STAGGERED GRID ENGINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-40 relative">
          {/* TRACK LINE */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-zinc-900 via-red-600/20 to-zinc-900 hidden md:block" />

          {entries.map((entry, idx) => {
            const isSelected = activeID === entry.id
            const car = entry.contexts?.associations?.car as Car | undefined
            const thumb = car?.assets?.thumbnail as Media | undefined

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={cn(
                  "relative group",
                  idx % 2 !== 0 ? "md:mt-56" : ""
                )}
                onClick={() => setActiveID(isSelected ? null : entry.id)}
              >
                {/* POSITION INDICATOR */}
                <div className="absolute -top-16 left-0 md:left-auto md:-right-4 flex items-baseline gap-4">
                  <span className="text-8xl font-black italic text-zinc-900/50 group-hover:text-red-600/10 transition-colors select-none">
                    P{entry.metrics?.positions?.grid}
                  </span>
                </div>

                {/* THE MACHINE CARD */}
                <div
                  className={cn(
                    "relative bg-zinc-950 border transition-all duration-300 cursor-none",
                    isSelected ? "border-red-600" : "border-zinc-900 group-hover:border-zinc-700"
                  )}
                  style={{ clipPath: CLIP_PATH }}
                >
                  <div className={SCANLINE_ANIM} />

                  {/* VISUAL CORE */}
                  <div className="aspect-video relative overflow-hidden bg-black flex items-center justify-center p-12">
                    <AnimatePresence mode="wait">
                      {!isSelected ? (
                        <motion.div
                          key="visual"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full relative"
                        >
                          <img
                            src={thumb?.url || ''}
                            alt={entry.name}
                            className="w-full h-full object-contain brightness-0 invert opacity-5 group-hover:opacity-20 transition-all duration-700 scale-110 group-hover:scale-100"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-[1px] bg-red-600/20 animate-[pulse_1s_infinite]" />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="metrics"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="w-full h-full grid grid-cols-2 gap-4"
                        >
                          <Metric value={entry.metrics?.positions?.finish} label="Finish_Pos" />
                          <Metric value={entry.metrics?.positions?.laps} label="Total_Laps" />
                          <Metric value={entry.metrics?.positions?.start} label="Qualy_Pos" />
                          <Metric value={entry.details?.status} label="Status" isSmall />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* IDENTIFIER STRIP */}
                  <div className="bg-zinc-900/20 border-t border-zinc-900 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-600/20 blur-sm animate-pulse" />
                        <div className="relative size-12 bg-black border border-red-600 flex items-center justify-center font-black italic text-xl text-white">
                          {entry.basics?.identifiers?.number}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-black italic text-white uppercase tracking-tighter leading-none">
                          {entry.name}
                        </h3>
                        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-1">
                          {car?.name} // {car?.basics?.identifiers?.model}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <Zap className="size-4 text-zinc-800" />
                    </div>
                  </div>
                </div>

                {/* DYNAMIC SHADOW / HEAT EFFECT */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-red-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Metric({ value, label, isSmall }: { value: any, label: string, isSmall?: boolean }) {
  return (
    <div className="border border-zinc-900 bg-black/50 p-4 flex flex-col justify-center gap-1 group/metric hover:border-red-600/50 transition-colors">
      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">{label}</span>
      <span className={cn(
        "font-black italic text-white uppercase tracking-tighter",
        isSmall ? "text-xs" : "text-3xl"
      )}>
        {value || '--'}
      </span>
    </div>
  )
}