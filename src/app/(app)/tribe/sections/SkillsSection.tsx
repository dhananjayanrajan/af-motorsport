'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Target,
  Fingerprint,
  Layers,
  GitBranch,
  ChevronRight
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

      <header className="shrink-0 h-20 border-b border-zinc-900 flex items-center justify-between px-8 bg-black z-30">
        <div className="flex items-center gap-8">
          <div className="flex bg-zinc-900 p-1 rounded-sm">
            {['SKILLS', 'TRAINING'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  const nextTab = tab as 'SKILLS' | 'TRAINING'
                  setActiveTab(nextTab)
                  setActiveId(nextTab === 'SKILLS' ? skills[0]?.id : trainings[0]?.id)
                }}
                className={cn(
                  "px-6 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer relative",
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
                  "p-6 text-left border-b border-zinc-900 transition-all cursor-pointer group flex items-center justify-between",
                  activeId === item.id ? "bg-zinc-900" : "hover:bg-zinc-900/50"
                )}
              >
                <div className="space-y-1 pr-4">
                  <span className="text-[9px] font-mono text-zinc-600 block uppercase">Ref_{item.id}</span>
                  <h4 className={cn(
                    "text-xs font-black uppercase italic leading-tight transition-colors",
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
          <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16 no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl space-y-12 pb-12"
              >
                <div className="space-y-8">
                  <h3 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-white break-words overflow-wrap-anywhere">
                    {data.name}
                  </h3>
                  <p className="text-base md:text-lg font-bold text-zinc-500 uppercase italic leading-relaxed max-w-2xl border-l-2 pl-6" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                    {data.basics?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-4">
                  <Stat label="Priority" value={data.basics?.scope?.significance || data.traits?.intensity} icon={<Target size={14} />} />
                  <Stat label="Format" value={data.basics?.scope?.rarity || data.traits?.format} icon={<Fingerprint size={14} />} />
                  <Stat label="Proficiency" value={data.basics?.scope?.depth || "Standard"} icon={<Layers size={14} />} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="w-full lg:w-96 border-l border-zinc-900 bg-zinc-950 p-8 md:p-12 flex flex-col gap-12 overflow-y-auto no-scrollbar shrink-0">
            <div className="space-y-8">
              <h5 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-zinc-900 pb-2">
                {activeTab === 'SKILLS' ? 'Method_Breakdown' : 'Deployment_Metrics'}
              </h5>

              <div className="space-y-6">
                {activeTab === 'SKILLS' ? (
                  data.traits.methods?.list?.map((m: any, i: number) => (
                    <div key={i} className="space-y-2">
                      <div className="text-[11px] font-black text-white uppercase italic flex items-center gap-2">
                        <div className="size-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        {m.method}
                      </div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase leading-relaxed pl-3">
                        {m.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {['drivers', 'leaders', 'members'].map((role) => (
                      <div key={role} className="flex justify-between items-center p-5 bg-black border border-zinc-900">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{role}</span>
                        <span className="text-2xl font-black text-white italic">{(data.contexts?.connections?.[role]?.length || 0)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {activeTab === 'SKILLS' && data.traits.dependencies?.list?.length > 0 && (
              <div className="space-y-6">
                <h5 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-zinc-900 pb-2">Technical_Chain</h5>
                <div className="space-y-3">
                  {data.traits.dependencies.list.map((dep: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase italic p-3 border border-zinc-900/50 rounded-sm">
                      <GitBranch size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                      {typeof dep.skill === 'object' ? dep.skill.name : `REF_BLOCK_${dep.skill}`}
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
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-zinc-600">
        <div style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{icon}</div>
        <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-xl md:text-2xl font-black italic text-white uppercase break-words">
        {value || 'N/A'}
      </div>
    </div>
  )
}

const DUMMY_SKILLS = [
  {
    id: 1,
    name: "AERO_VECTORING_DYNAMIC_SYSTEM",
    basics: {
      scope: { depth: 'Expert_Grade', rarity: 'Unique', significance: 'Critical' },
      description: "Advanced manipulation of laminar flow vortices through high-frequency active surface geometry and calibrated force redistribution protocols."
    },
    traits: {
      methods: {
        list: [
          { method: 'WIND_TUNNEL_CALIBRATION', description: 'Iterative vortex mapping within high-density controlled environments.' },
          { method: 'REAL_TIME_DECONSTRUCTION', description: 'Live adaptation during high-lateral load sequences on technical circuits.' }
        ]
      },
      dependencies: { list: [{ skill: 4 }] }
    }
  },
  {
    id: 4,
    name: "VORTEX_SHEDDING",
    basics: {
      scope: { depth: 'Foundation', rarity: 'Standard', significance: 'Support' },
      description: "Basic fluid dynamic principles regarding wake recovery and turbulence management in low-speed sectors."
    },
    traits: {
      methods: { list: [{ method: 'PRESSURE_STRESS', description: 'Testing structural integrity in low-density vacuum chambers.' }] },
      dependencies: { list: [] }
    }
  }
]

const DUMMY_TRAININGS = [
  {
    id: 101,
    name: "G_FORCE_RETENTION_DRILL",
    basics: { description: "High-intensity centrifuge drills focused on cognitive retention and motor function under 6G+ sustained load." },
    traits: { intensity: 'Extreme', format: 'Simulator' },
    contexts: { connections: { drivers: [1, 2], leaders: [1], members: [] } }
  }
]