'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Target,
  Fingerprint,
  Layers,
  GitBranch,
  ChevronRight,
  Activity
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, useMemo } from 'react'

export function SkillsSection({ skills = DUMMY_SKILLS, trainings = DUMMY_TRAININGS }: any) {
  const [activeTab, setActiveTab] = useState<'SKILLS' | 'TRAINING'>('SKILLS')
  const [activeId, setActiveId] = useState(activeTab === 'SKILLS' ? skills[0]?.id : trainings[0]?.id)

  const activeItems = useMemo(() => activeTab === 'SKILLS' ? skills : trainings, [activeTab, skills, trainings])
  const data = useMemo(() => activeItems.find((s: any) => s.id === activeId), [activeItems, activeId])

  if (!data) return null

  return (
    <section className="relative w-full h-screen bg-black flex flex-col font-sans border-y border-zinc-900 overflow-hidden">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <header className="shrink-0 h-24 border-b border-zinc-900 flex items-center justify-between px-12 bg-black z-30">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <Activity size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em]">SYSTEM_CORE_MANIFEST</span>
          </div>
          <div className="flex bg-zinc-900 p-1 rounded-sm border border-zinc-800">
            {['SKILLS', 'TRAINING'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  const nextTab = tab as 'SKILLS' | 'TRAINING'
                  setActiveTab(nextTab)
                  setActiveId(nextTab === 'SKILLS' ? skills[0]?.id : trainings[0]?.id)
                }}
                className={cn(
                  "px-8 py-2 text-[8px] font-black uppercase tracking-[0.3em] transition-all cursor-pointer relative",
                  activeTab === tab ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-white" transition={{ duration: 0.2 }} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <aside className="w-72 md:w-80 border-r border-zinc-900 bg-zinc-950 overflow-y-auto no-scrollbar shrink-0">
          <div className="flex flex-col">
            {activeItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "p-8 text-left border-b border-zinc-900/50 transition-all cursor-pointer group flex items-center justify-between",
                  activeId === item.id ? "bg-zinc-900" : "hover:bg-zinc-900/40"
                )}
              >
                <div className="space-y-2 pr-4">
                  <span className="text-[7px] font-mono text-zinc-700 block uppercase tracking-widest italic">REF_DATA_{item.id}</span>
                  <h4 className={cn(
                    "text-[10px] font-black uppercase italic leading-tight transition-colors tracking-tight",
                    activeId === item.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                  )}>
                    {item.name}
                  </h4>
                </div>
                {activeId === item.id && <ChevronRight size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-black">
          <div className="flex-1 overflow-y-auto p-12 md:p-16 lg:p-24 no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl space-y-20 pb-12"
              >
                <div className="space-y-10">
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.8] text-white break-words">
                    {data.name}
                  </h3>
                  <div className="pt-8 border-t border-zinc-900/50 max-w-2xl">
                    <p className="text-[11px] md:text-xs font-bold text-zinc-600 uppercase italic leading-relaxed tracking-wide">
                      {data.basics?.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 pt-4">
                  <Stat label="PRIORITY" value={data.basics?.scope?.significance || data.traits?.intensity} icon={<Target size={12} />} />
                  <Stat label="FORMAT" value={data.basics?.scope?.rarity || data.traits?.format} icon={<Fingerprint size={12} />} />
                  <Stat label="PROFICIENCY" value={data.basics?.scope?.depth || "STANDARD"} icon={<Layers size={12} />} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="w-full lg:w-[420px] border-l border-zinc-900 bg-zinc-950 p-12 md:p-16 flex flex-col gap-20 overflow-y-auto no-scrollbar shrink-0">
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-zinc-900 pb-4">
                <div className="size-1 bg-white" />
                <h5 className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em]">
                  {activeTab === 'SKILLS' ? 'EXECUTION_PROTOCOL' : 'UNIT_ALLOCATION'}
                </h5>
              </div>

              <div className="space-y-10">
                {activeTab === 'SKILLS' ? (
                  data.traits.methods?.list?.map((m: any, i: number) => (
                    <div key={i} className="space-y-3">
                      <div className="text-[10px] font-black text-white uppercase italic flex items-center gap-3">
                        <div className="size-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        {m.method}
                      </div>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase leading-relaxed pl-4 border-l border-zinc-900/50 tracking-wide">
                        {m.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {['DRIVERS', 'LEADERS', 'MEMBERS'].map((role) => (
                      <div key={role} className="flex justify-between items-center p-6 bg-black border border-zinc-900/50">
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em]">{role}</span>
                        <span className="text-xl font-black text-white italic">{(data.contexts?.connections?.[role]?.length || 0)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {activeTab === 'SKILLS' && data.traits.dependencies?.list?.length > 0 && (
              <div className="space-y-12">
                <div className="flex items-center gap-4 border-b border-zinc-900 pb-4">
                  <div className="size-1 bg-white" />
                  <h5 className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em]">LOGIC_DEPENDENCY</h5>
                </div>
                <div className="space-y-4">
                  {data.traits.dependencies.list.map((dep: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 text-[9px] font-bold text-zinc-500 uppercase italic p-5 border border-zinc-900/30 bg-black/30">
                      <GitBranch size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                      {typeof dep.skill === 'object' ? dep.skill.name : `BLOCK_REF_${dep.skill}`}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </main>
      </div>
    </section>
  )
}

function Stat({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-zinc-800">
        <div style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{icon}</div>
        <span className="text-[7px] font-black uppercase tracking-[0.5em]">{label}</span>
      </div>
      <div className="text-lg md:text-xl font-black italic text-white uppercase tracking-tighter leading-none break-words">
        {value || '---'}
      </div>
    </div>
  )
}

const DUMMY_SKILLS = [
  {
    id: 1,
    name: "AERO_VECTORING_DYNAMIC_SYSTEM",
    basics: {
      scope: { depth: 'EXPERT_GRADE', rarity: 'UNIQUE', significance: 'CRITICAL' },
      description: "ADVANCED MANIPULATION OF LAMINAR FLOW VORTICES THROUGH HIGH-FREQUENCY ACTIVE SURFACE GEOMETRY AND CALIBRATED FORCE REDISTRIBUTION PROTOCOLS."
    },
    traits: {
      methods: {
        list: [
          { method: 'WIND_TUNNEL_CALIBRATION', description: 'ITERATIVE VORTEX MAPPING WITHIN HIGH-DENSITY CONTROLLED ENVIRONMENTS.' },
          { method: 'REAL_TIME_DECONSTRUCTION', description: 'LIVE ADAPTATION DURING HIGH-LATERAL LOAD SEQUENCES ON TECHNICAL CIRCUITS.' }
        ]
      },
      dependencies: { list: [{ skill: 4 }] }
    }
  },
  {
    id: 4,
    name: "VORTEX_SHEDDING",
    basics: {
      scope: { depth: 'FOUNDATION', rarity: 'STANDARD', significance: 'SUPPORT' },
      description: "BASIC FLUID DYNAMIC PRINCIPLES REGARDING WAKE RECOVERY AND TURBULENCE MANAGEMENT IN LOW-SPEED SECTORS."
    },
    traits: {
      methods: { list: [{ method: 'PRESSURE_STRESS', description: 'TESTING STRUCTURAL INTEGRITY IN LOW-DENSITY VACUUM CHAMBERS.' }] },
      dependencies: { list: [] }
    }
  }
]

const DUMMY_TRAININGS = [
  {
    id: 101,
    name: "G_FORCE_RETENTION_DRILL",
    basics: { description: "HIGH-INTENSITY CENTRIFUGE DRILLS FOCUSED ON COGNITIVE RETENTION AND MOTOR FUNCTION UNDER 6G+ SUSTAINED LOAD." },
    traits: { intensity: 'EXTREME', format: 'SIMULATOR' },
    contexts: { connections: { DRIVERS: [1, 2], LEADERS: [1], MEMBERS: [] } }
  }
]