'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

export interface SharedVictoriesSectionProps {
  events?: any[]
  results?: any[]
  organizations?: any[]
}

export function SharedVictoriesSection({
  events = DUMMY_EVENTS,
  results = DUMMY_RESULTS,
  organizations = DUMMY_ORGS
}: SharedVictoriesSectionProps) {
  const [hoveredVictory, setHoveredVictory] = useState<number | null>(null)

  return (
    <section
      className="relative w-full py-32 border-t bg-black"
      style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="px-12 md:px-24 mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-10" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700">
            COLLABORATIVE_LOGS
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-[0.8]">
          SHARED_VICTORIES
        </h2>
      </div>

      <div className="grid grid-cols-1 border-y border-zinc-900">
        {results.map((result, index) => {
          const event = events.find((e) => e.id === result.id)
          const org = organizations[index % organizations.length]
          const isHovered = hoveredVictory === result.id

          return (
            <div
              key={result.id}
              onMouseEnter={() => setHoveredVictory(result.id)}
              onMouseLeave={() => setHoveredVictory(null)}
              className="relative group border-b last:border-b-0 border-zinc-900/50 transition-colors duration-300 hover:bg-zinc-950"
            >
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center px-12 md:px-24 py-16 gap-12 lg:gap-24">
                <div className="w-16 shrink-0">
                  <span
                    className="text-2xl font-black italic transition-colors"
                    style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : '#27272a' }}
                  >
                    P{result.metrics?.position?.overall?.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[7px] font-mono text-zinc-700 uppercase block mb-3 tracking-widest">
                    {event?.basics?.identifiers?.code} // {org?.name}
                  </span>
                  <h3 className={cn(
                    "text-2xl md:text-4xl font-black italic uppercase tracking-tighter transition-all duration-500",
                    isHovered ? "text-white translate-x-4" : "text-zinc-600"
                  )}>
                    {result.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-12 lg:gap-20 shrink-0">
                  <VictoryMetric
                    label="LAP_TIME"
                    value={result.metrics?.performance?.time}
                    active={isHovered}
                  />
                  <VictoryMetric
                    label="AVG_SPEED"
                    value={result.metrics?.performance?.speed}
                    active={isHovered}
                  />
                  <VictoryMetric
                    label="STATUS"
                    value={result.details?.status}
                    active={isHovered}
                  />
                </div>
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-zinc-900/20"
                  >
                    <div className="px-12 md:px-24 py-12 grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-zinc-900/50">
                      <div className="max-w-xl">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase leading-relaxed italic tracking-wide border-l border-zinc-800 pl-8">
                          {result.basics?.description}
                        </p>
                      </div>
                      <div className="flex gap-12 items-center justify-end">
                        <div className="text-right">
                          <span className="text-[7px] font-black text-zinc-800 uppercase block mb-2 tracking-widest">CHRONO_REF</span>
                          <span className="text-[10px] font-mono text-zinc-500">{event?.traits?.chronology?.start}</span>
                        </div>
                        <div className="w-14 h-14 border border-zinc-900 grayscale opacity-30">
                          <img src={org?.assets?.logo} className="w-full h-full object-cover" alt="" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function VictoryMetric({ label, value, active }: { label: string, value: string, active: boolean }) {
  return (
    <div className="min-w-[80px]">
      <span className="text-[7px] font-black text-zinc-800 uppercase block mb-3 tracking-[0.3em]">{label}</span>
      <span className={cn(
        "text-base font-black italic transition-colors tracking-tight",
        active ? "text-white" : "text-zinc-700"
      )}>
        {value || '---'}
      </span>
    </div>
  )
}

const DUMMY_ORGS = [
  { id: 1, name: "APEX_ENGINEERING", assets: { logo: "https://picsum.photos/seed/apex/400/400" } },
  { id: 2, name: "NEURALIS_LABS", assets: { logo: "https://picsum.photos/seed/neural/400/400" } }
]

const DUMMY_EVENTS = [
  {
    id: 201,
    basics: { identifiers: { code: "GP_SH_01" } },
    traits: { chronology: { start: "2026.03.12" } }
  },
  {
    id: 202,
    basics: { identifiers: { code: "GP_LN_04" } },
    traits: { chronology: { start: "2026.03.28" } }
  }
]

const DUMMY_RESULTS = [
  {
    id: 201,
    name: "CYBER_ENDURANCE_PROTOTYPE_WIN",
    details: { status: "OFFICIAL" },
    basics: { description: "SUCCESSFUL DEPLOYMENT OF REAL-TIME THERMAL RECOVERY LOGIC IN EXTREME HIGH-G CONDITIONS." },
    metrics: {
      position: { overall: 1 },
      performance: { time: "1:42:04.221", speed: "312 KM/H" }
    }
  },
  {
    id: 202,
    name: "URBAN_INFRASTRUCTURE_SYNC",
    details: { status: "OFFICIAL" },
    basics: { description: "OPTIMIZED SENSOR FUSION DATA FOR AUTONOMOUS NAVIGATION IN DENSE METROPOLITAN ENVIRONMENTS." },
    metrics: {
      position: { overall: 3 },
      performance: { time: "0:58:12.809", speed: "184 KM/H" }
    }
  }
]