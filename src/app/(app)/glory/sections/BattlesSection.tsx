'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Flag,
  Hash,
  Timer,
  Trophy
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const DUMMY_BATTLES = [
  {
    event: {
      id: 1,
      name: "NIGHT STALKER ENDURANCE",
      basics: {
        identifiers: { code: "NSE-26", round: "04" },
        tagline: "24H THERMAL EXHAUSTION",
        description: "High-speed endurance test under extreme lunar conditions and fluctuating track temperatures."
      },
      traits: { chronology: { start: "2026-03-12" } },
      assets: { poster: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200" }
    },
    result: {
      metrics: {
        position: { overall: 1, class: 1 },
        performance: { laps: 342, time: "24:00:12.4", speed: "284 KM/H" }
      },
      traits: { achievements: { gap: "-1.2s", status: "P1 GOLD" } }
    }
  },
  {
    event: {
      id: 2,
      name: "MONSOON SPRINT CUP",
      basics: {
        identifiers: { code: "MSC-26", round: "05" },
        tagline: "AQUAPLANING THRESHOLD",
        description: "Short-format sprint in heavy rain conditions focusing on mechanical wet-grip and aero-stability."
      },
      traits: { chronology: { start: "2026-03-28" } },
      assets: { poster: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1200" }
    },
    result: {
      metrics: {
        position: { overall: 3, class: 1 },
        performance: { laps: 18, time: "42:15.9", speed: "210 KM/H" }
      },
      traits: { achievements: { gap: "+4.5s", status: "P3 PODIUM" } }
    }
  }
]

export function BattlesSection({ battles = DUMMY_BATTLES }: { battles?: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section
      className="relative w-full py-32 overflow-hidden border-t"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="relative">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] block mb-4"
            >
              Engagement_History
            </motion.span>
            <h2 className="text-7xl md:text-9xl font-black italic text-white tracking-tighter uppercase leading-[0.75]">
              THE<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>BATTLES</span>
            </h2>
          </div>

          <div className="flex gap-4">
            {battles.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="group flex flex-col items-start gap-2"
              >
                <div
                  className="h-1 transition-all duration-500"
                  style={{
                    width: activeIdx === i ? '80px' : '30px',
                    backgroundColor: activeIdx === i ? DESIGN_SYSTEM.COLORS.PRIMARY : '#27272a'
                  }}
                />
                <span className={cn(
                  "text-[10px] font-mono transition-colors",
                  activeIdx === i ? "text-white" : "text-zinc-700"
                )}>0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[700px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 w-full gap-12 lg:gap-0"
            >
              <div className="lg:col-span-7 relative group">
                <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY}15` }} />

                <div
                  className="relative aspect-[16/9] w-full overflow-hidden border border-white/5 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 85%)' }}
                >
                  <img
                    src={battles[activeIdx].event.assets?.poster}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-10 -right-6 lg:right-10 bg-black border border-white/10 p-10 max-w-md backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-mono text-primary font-bold" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                      {battles[activeIdx].event.basics.identifiers.code}
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>
                  <h3 className="text-3xl font-black italic text-white uppercase mb-4 tracking-tighter">
                    {battles[activeIdx].event.name}
                  </h3>
                  <p className="text-zinc-500 text-xs font-bold leading-relaxed uppercase italic">
                    {battles[activeIdx].event.basics.description}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center lg:pl-20">
                <div className="space-y-16">
                  <div className="relative">
                    <span className="absolute -left-12 top-0 text-[10px] font-mono text-zinc-800 [writing-mode:vertical-lr] rotate-180">RESULT_METRICS</span>
                    <div className="flex items-end gap-6">
                      <span className="text-[14vw] lg:text-[10vw] font-black italic text-white leading-[0.7] tracking-[ -0.08em]">
                        P{battles[activeIdx].result.metrics.position.overall.toString().padStart(2, '0')}
                      </span>
                      <div className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                          <span className="text-xs font-black italic text-white">{battles[activeIdx].result.traits.achievements.status}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{battles[activeIdx].event.traits.chronology.start}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                    <StatItem icon={<Timer size={16} />} label="TIME" value={battles[activeIdx].result.metrics.performance.time} />
                    <StatItem icon={<Activity size={16} />} label="SPEED" value={battles[activeIdx].result.metrics.performance.speed} />
                    <StatItem icon={<Hash size={16} />} label="LAPS" value={battles[activeIdx].result.metrics.performance.laps} />
                    <StatItem icon={<ArrowRight size={16} />} label="GAP" value={battles[activeIdx].result.traits.achievements.gap} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-900 z-0" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-zinc-900 z-0" />
    </section>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="group/stat">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-zinc-700 group-hover/stat:text-primary transition-colors">{icon}</span>
        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-black italic text-zinc-300 group-hover/stat:text-white transition-colors uppercase">
        {value}
      </div>
    </div>
  )
}