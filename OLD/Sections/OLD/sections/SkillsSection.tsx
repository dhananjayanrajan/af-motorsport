'use client'

import { Skill, Training } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
  Activity,
  ArrowUpRight,
  Crosshair,
  Dna,
  Fingerprint,
  Shield,
  Zap
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface SkillTreeProps {
  skills: Skill[]
  trainings: Training[]
}

const ZipTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5
} as const

export default function SkillTreeSection({ skills, trainings }: SkillTreeProps) {
  const [activeTab, setActiveTab] = useState<'SKILLS' | 'TRAINING'>('SKILLS')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const activeItems = useMemo(() => (activeTab === 'SKILLS' ? skills : trainings), [activeTab, skills, trainings])
  const current = useMemo(() => activeItems.find(i => i.id === selectedId), [selectedId, activeItems])

  return (
    <section className="relative w-full h-[100dvh] bg-zinc-100 flex flex-col font-mono select-none overflow-hidden antialiased text-black">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />

      <header className="relative z-50 h-20 border-b-2 border-zinc-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-10">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="size-3 bg-black animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase">NEURAL_NETWORK_V4</span>
          </div>

          <div className="flex bg-zinc-200/50 p-1 rounded-sm border border-zinc-200">
            {(['SKILLS', 'TRAINING'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedId(null); }}
                className={cn(
                  "px-8 py-2 text-[10px] font-black uppercase tracking-widest transition-all relative",
                  activeTab === tab ? "text-white" : "text-zinc-400 hover:text-black"
                )}
              >
                {activeTab === tab && (
                  <motion.div layoutId="tab_shuttle" className="absolute inset-0 bg-black" transition={ZipTransition} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="text-[9px] font-bold text-zinc-400 tracking-widest uppercase">
          Sector: Performance_Mapping // 2026_CORE
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF41" stopOpacity="0" />
              <stop offset="50%" stopColor="#00FF41" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
            </linearGradient>
          </defs>
          <AnimatePresence>
            {selectedId && (
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                d="M 100,100 L 900,900"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                fill="none"
              />
            )}
          </AnimatePresence>
        </svg>

        <div className="relative z-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 p-20 max-w-7xl">
          {activeItems.map((item, idx) => (
            <SkillNode
              key={item.id}
              item={item}
              index={idx}
              isSelected={selectedId === item.id}
              onClick={() => setSelectedId(item.id as number)}
            />
          ))}
        </div>

        <AnimatePresence>
          {current && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={ZipTransition}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white border-l-4 border-black shadow-2xl z-40 flex flex-col"
            >
              <div className="p-10 space-y-12">
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-red-600 transition-colors"
                >
                  <Crosshair size={14} /> Close_Module
                </button>

                <div className="space-y-4">
                  <span className="text-[10px] font-black text-[#00FF41] bg-black px-3 py-1 italic">
                    {activeTab === 'SKILLS' ? 'AUGMENT_ACTIVE' : 'PROTOCOL_READY'}
                  </span>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                    {current.name}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
                  <QuickStat label="RANK" value="L1" />
                  <QuickStat label="TYPE" value={activeTab} />
                </div>

                <div className="space-y-6">
                  <div className="text-[9px] font-black text-zinc-300 tracking-[0.4em] uppercase">Specifications</div>
                  <div className="space-y-4">
                    {((current as any).details?.specifications?.list || []).map((spec: any) => (
                      <div key={spec.id} className="border-l-2 border-zinc-100 pl-4 py-1">
                        <div className="text-[11px] font-black uppercase italic">{spec.parameter}: {spec.value}</div>
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{spec.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full h-16 bg-black text-[#00FF41] font-black uppercase italic text-xs tracking-[0.4em] flex items-center justify-between px-8 hover:bg-[#00FF41] hover:text-black transition-all">
                  Execute_Deployment
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function SkillNode({ item, index, isSelected, onClick }: { item: any, index: number, isSelected: boolean, onClick: () => void }) {
  const icons = [<Zap />, <Dna />, <Fingerprint />, <Activity />, <Shield />]
  const icon = icons[index % icons.length]

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative aspect-square flex flex-col items-center justify-center gap-4 transition-all duration-300 border-2",
        isSelected
          ? "bg-black border-[#00FF41] text-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.3)]"
          : "bg-white border-zinc-200 text-zinc-300 hover:border-black hover:text-black"
      )}
      style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)" }}
    >
      <div className={cn("transition-transform duration-500", isSelected && "scale-125")}>
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-tighter px-4 text-center leading-tight">
        {item.name}
      </span>
      <div className={cn(
        "absolute -top-2 -right-2 text-[8px] font-bold px-1 bg-zinc-100 text-zinc-400 border border-zinc-200",
        isSelected && "bg-[#00FF41] text-black border-transparent"
      )}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.button>
  )
}

function QuickStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white p-6 flex flex-col gap-1">
      <span className="text-[8px] font-black text-zinc-400 tracking-widest uppercase">{label}</span>
      <span className="text-sm font-black italic uppercase">{value}</span>
    </div>
  )
}