'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Fingerprint,
  Activity,
  Dna,
  Database
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

type MemberType = 'DRIVERS' | 'LEADERS' | 'MEMBERS'

export interface TeamMember {
  id: string
  name: string
  type: MemberType
  role: string
  background: string
  stats: {
    label: string
    value: string
  }[]
  image: string
}

export function PeopleSection({ members = DUMMY_TRIBE }: { members?: TeamMember[] }) {
  const [activeType, setActiveType] = useState<MemberType>('DRIVERS')
  const [activeIdx, setActiveIdx] = useState(0)

  const filteredTribe = members.filter((m) => m.type === activeType)
  const current = filteredTribe[activeIdx] || filteredTribe[0]

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
    >
      <div className="relative z-30 px-10 py-16 md:px-16 flex justify-between items-end border-b border-zinc-900 bg-black/80 backdrop-blur-2xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Dna size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">GENETIC_ASSET_VAULT</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
            Our<span className="text-zinc-900"> Team</span>
          </h2>
        </div>

        <div className="flex bg-zinc-950 p-1 border border-zinc-900 mb-2">
          {(['DRIVERS', 'LEADERS', 'MEMBERS'] as MemberType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setActiveType(t); setActiveIdx(0); }}
              className={cn(
                "px-8 py-2.5 text-[8px] font-black uppercase tracking-[0.3em] transition-all cursor-pointer",
                activeType === t ? "bg-white text-black" : "text-zinc-700 hover:text-zinc-400"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative flex flex-col lg:flex-row">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col lg:flex-row"
            >
              <div className="lg:w-1/2 relative h-[40vh] lg:h-auto overflow-hidden bg-zinc-950">
                <img
                  src={current.image}
                  className="w-full h-full object-cover grayscale opacity-40 contrast-150 transition-all duration-1000"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-16 left-16 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-1.5 bg-primary animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest italic">ACTIVE_DATA_FEED</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 p-16 lg:p-32 flex flex-col justify-center space-y-16">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                    <Fingerprint size={20} />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em]">IDENTITY_CONFIRMED</span>
                  </div>

                  <h3 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-[0.8] break-words">
                    {current.name.split('_').map((n, i) => (
                      <span key={i} className="block">{n}</span>
                    ))}
                  </h3>

                  <div className="flex items-center gap-8 pt-6">
                    <div className="px-5 py-1.5 border border-zinc-800 text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                      {current.role}
                    </div>
                    <div className="h-px flex-1 bg-zinc-900/50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.4em] flex items-center gap-2">
                      <Database size={10} /> BIOGRAPHY_BLOB
                    </span>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase leading-relaxed italic tracking-wide max-w-sm">
                      {current.background}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {current.stats.map((s, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-zinc-900 pb-4">
                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.3em]">{s.label}</span>
                        <span className="text-xl font-black text-white italic uppercase tracking-tighter">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[9px] font-mono text-zinc-800 uppercase tracking-[1em] animate-pulse">NO_DATA_AVAILABLE</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-30 h-28 border-t border-zinc-900 bg-black flex overflow-x-auto no-scrollbar">
        {filteredTribe.length > 0 ? (
          filteredTribe.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "min-w-[280px] h-full border-r border-zinc-900 px-10 flex items-center justify-between group transition-all cursor-pointer",
                activeIdx === idx ? "bg-zinc-950" : "hover:bg-zinc-950"
              )}
            >
              <div className="flex flex-col text-left">
                <span className={cn(
                  "text-[6px] font-mono mb-1 tracking-widest",
                  activeIdx === idx ? "text-primary" : "text-zinc-800"
                )} style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                  INDEX_00{member.id}
                </span>
                <span className={cn(
                  "text-base font-black italic uppercase tracking-tight transition-all",
                  activeIdx === idx ? "text-white translate-x-2" : "text-zinc-700 group-hover:text-zinc-500"
                )}>
                  {member.name}
                </span>
              </div>
              <Activity
                size={14}
                className={cn(
                  "transition-all duration-500",
                  activeIdx === idx ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100"
                )}
                style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_800 }}
              />
            </button>
          ))
        ) : null}
        <div className="flex-1 border-r border-zinc-900 bg-zinc-950 flex items-center px-16">
          <span className="text-[7px] font-mono text-zinc-900 uppercase tracking-[1.5em] italic">END_OF_MANIFEST</span>
        </div>
      </div>
    </section>
  )
}

const DUMMY_TRIBE: TeamMember[] = [
  {
    id: "1",
    type: 'DRIVERS',
    name: "ALEX_FERRARI",
    role: "LEAD_PILOT",
    background: "SPECIALIST IN HIGH-VELOCITY KINETICS AND AERONAUTICAL TELEMETRY. HOLDER OF 12 TRACK RECORDS IN PROTOTYPE CLASS.",
    stats: [{ label: "EXPERIENCE", value: "14_YRS" }, { label: "MAX_G", value: "6.2G" }],
    image: "https://picsum.photos/seed/driver1/1200/1200"
  },
  {
    id: "2",
    type: 'DRIVERS',
    name: "KAITO_SATO",
    role: "TECHNICAL_PILOT",
    background: "EXPERT IN ELECTRIC DRIVETRAIN CALIBRATION AND ENERGY REGENERATION STRATEGY DURING ENDURANCE STINTS.",
    stats: [{ label: "PRECISION", value: "99.2%" }, { label: "LAPS", value: "4.2K" }],
    image: "https://picsum.photos/seed/driver2/1200/1200"
  },
  {
    id: "3",
    type: 'LEADERS',
    name: "MARCUS_VANCE",
    role: "STRATEGY_DIRECTOR",
    background: "ARCHITECT OF THE 2025 HYPER-FLOW AERODYNAMICS REGULATION. DIRECTS ALL R&D OPERATIONS ACROSS THREE CONTINENTS.",
    stats: [{ label: "TENURE", value: "12_YRS" }, { label: "PATENTS", value: "08" }],
    image: "https://picsum.photos/seed/leader1/1200/1200"
  },
  {
    id: "4",
    type: 'MEMBERS',
    name: "ELARA_VOSS",
    role: "AERO_ENGINEER",
    background: "SPECIALIZED IN COMPUTATIONAL FLUID DYNAMICS AND BOUNDARY LAYER CONTROL SYSTEMS FOR HIGH-DOWNFORCE APPLICATIONS.",
    stats: [{ label: "DEGREES", value: "PHD_MIT" }, { label: "FOCUS", value: "CFD_V2" }],
    image: "https://picsum.photos/seed/member1/1200/1200"
  }
]