'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion } from 'motion/react'
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
      className="relative w-full py-24 border-t"
      style={{
        backgroundColor: DESIGN_SYSTEM.COLORS.BLACK,
        borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900
      }}
    >
      <div className="px-6 md:px-12 lg:px-24 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
            COLLABORATIVE_MILESTONES
          </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
          SHARED_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>VICTORIES</span>
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
              className="relative group border-b last:border-b-0 border-zinc-900 transition-colors duration-500 hover:bg-zinc-950/50"
            >
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center px-6 md:px-12 lg:px-24 py-12 gap-8 lg:gap-16">
                <div className="w-20 shrink-0">
                  <span className="text-4xl font-black italic text-zinc-800 group-hover:text-primary transition-colors"
                    style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                    P{result.metrics?.position?.overall?.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase">
                      {event?.basics?.identifiers?.code} // {org?.name}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                    {result.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4 lg:gap-12 shrink-0">
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

              <motion.div
                initial={false}
                animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                className="overflow-hidden bg-zinc-900/30"
              >
                <div className="px-6 md:px-12 lg:px-24 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-800">
                  <div className="space-y-4">
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">NARRATIVE_LOG</span>
                    <p className="text-sm text-zinc-400 leading-relaxed uppercase font-bold italic">
                      {result.basics?.description}
                    </p>
                  </div>
                  <div className="flex gap-8 items-center justify-end">
                    <div className="text-right">
                      <span className="text-[9px] font-black text-zinc-700 uppercase block mb-1">EVENT_CHRONO</span>
                      <span className="text-xs font-mono text-white">{event?.traits?.chronology?.start}</span>
                    </div>
                    <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 shrink-0">
                      <img src={org?.assets?.logo} className="w-full h-full object-cover grayscale opacity-50" alt="ORG_LOGO" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function VictoryMetric({ label, value, active }: { label: string, value: string, active: boolean }) {
  return (
    <div className="min-w-[100px]">
      <span className="text-[8px] font-black text-zinc-700 uppercase block mb-1 tracking-widest">{label}</span>
      <span className={cn(
        "text-lg font-black italic transition-colors",
        active ? "text-white" : "text-zinc-500"
      )}>
        {value || '---'}
      </span>
    </div>
  )
}

const DUMMY_ORGS = [
  { id: 1, name: "APEX_ENGINEERING", assets: { logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400" } },
  { id: 2, name: "NEURALIS_LABS", assets: { logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400" } }
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