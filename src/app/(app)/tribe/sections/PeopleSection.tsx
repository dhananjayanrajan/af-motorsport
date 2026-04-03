'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Fingerprint,
  ChevronRight,
  Shield,
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
      {/* HEADER NAVIGATION */}
      <div className="relative z-30 p-8 md:p-12 flex justify-between items-end border-b border-zinc-900 bg-black/50 backdrop-blur-xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Dna size={14} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">GENETIC_ASSET_VAULT</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">
            TRIBE<span className="text-zinc-800">.OS</span>
          </h2>
        </div>

        <div className="flex gap-2">
          {(['DRIVERS', 'LEADERS', 'MEMBERS'] as MemberType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setActiveType(t); setActiveIdx(0); }}
              className={cn(
                "px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
                activeType === t ? "bg-white text-black" : "text-zinc-600 border border-zinc-900 hover:border-zinc-700"
              )}
              style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN DOSSIER AREA */}
      <div className="flex-1 relative flex flex-col lg:flex-row">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col lg:flex-row"
          >
            {/* LARGE IMAGE FOCUS */}
            <div className="lg:w-1/2 relative h-[50vh] lg:h-auto overflow-hidden bg-zinc-950">
              <img
                src={current.image}
                className="w-full h-full object-cover grayscale opacity-50 contrast-125 transition-all duration-1000 group-hover:scale-110"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

              <div className="absolute bottom-12 left-12 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="size-2 bg-primary animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">SIGNAL_STRENGTH_98%</span>
                </div>
                <div className="text-[8px] font-mono text-zinc-600 uppercase">LOCATION_DATA: [40.7128° N, 74.0060° W]</div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-4 text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                  <Fingerprint size={24} />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">VERIFIED_IDENTITY</span>
                </div>

                <h3 className="text-6xl md:text-9xl font-black italic text-white uppercase tracking-tighter leading-[0.85]">
                  {current.name.split('_').map((n, i) => (
                    <span key={i} className="block">{n}</span>
                  ))}
                </h3>

                <div className="flex items-center gap-6 pt-4">
                  <div className="px-4 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    {current.role}
                  </div>
                  <div className="h-px flex-1 bg-zinc-900" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Database size={12} /> BIOGRAPHY_BLOB
                  </span>
                  <p className="text-sm font-bold text-zinc-400 uppercase leading-relaxed italic">
                    {current.background}
                  </p>
                </div>

                <div className="space-y-6">
                  {current.stats.map((s, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-zinc-900 pb-2">
                      <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">{s.label}</span>
                      <span className="text-2xl font-black text-white italic uppercase tracking-tighter">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER INDEX BAR (THE NAVIGATOR) */}
      <div className="relative z-30 h-32 border-t border-zinc-900 bg-black flex overflow-x-auto no-scrollbar">
        {filteredTribe.map((member, idx) => (
          <button
            key={member.id}
            onClick={() => setActiveIdx(idx)}
            className={cn(
              "min-w-[300px] h-full border-r border-zinc-900 p-8 flex items-center justify-between group transition-all",
              activeIdx === idx ? "bg-zinc-900" : "hover:bg-zinc-950"
            )}
          >
            <div className="flex flex-col text-left">
              <span className={cn(
                "text-[8px] font-mono mb-1 transition-colors",
                activeIdx === idx ? "text-primary" : "text-zinc-700"
              )} style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                INDEX_00{member.id}
              </span>
              <span className={cn(
                "text-lg font-black italic uppercase tracking-tight transition-all",
                activeIdx === idx ? "text-white translate-x-2" : "text-zinc-600 group-hover:text-zinc-400"
              )}>
                {member.name}
              </span>
            </div>
            <Activity
              size={18}
              className={cn(
                "transition-all",
                activeIdx === idx ? "text-primary opacity-100" : "text-zinc-800 opacity-0 group-hover:opacity-100"
              )}
              style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
            />
          </button>
        ))}
        <div className="flex-1 border-r border-zinc-900 bg-zinc-950 flex items-center px-12">
          <span className="text-[9px] font-mono text-zinc-800 uppercase tracking-[1em]">END_OF_MANIFEST</span>
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
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200"
  },
  {
    id: "2",
    type: 'DRIVERS',
    name: "KAITO_SATO",
    role: "TECHNICAL_PILOT",
    background: "EXPERT IN ELECTRIC DRIVETRAIN CALIBRATION AND ENERGY REGENERATION STRATEGY DURING ENDURANCE STINTS.",
    stats: [{ label: "PRECISION", value: "99.2%" }, { label: "LAPS", value: "4.2K" }],
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200"
  },
  {
    id: "3",
    type: 'LEADERS',
    name: "MARCUS_VANCE",
    role: "STRATEGY_DIRECTOR",
    background: "ARCHITECT OF THE 2025 HYPER-FLOW AERODYNAMICS REGULATION. DIRECTS ALL R&D OPERATIONS ACROSS THREE CONTINENTS.",
    stats: [{ label: "TENURE", value: "12_YRS" }, { label: "PATENTS", value: "08" }],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200"
  }
]