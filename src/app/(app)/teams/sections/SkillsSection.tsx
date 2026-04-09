'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Skill, Training } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
  Activity,
  ChevronRight,
  Fingerprint,
  Layers,
  Target
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface SkillsSectionProps {
  skills: Skill[]
  trainings: Training[]
}

export default function SkillsSection({ skills, trainings }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState<'SKILLS' | 'TRAINING'>('SKILLS')
  const [activeId, setActiveId] = useState<number>(
    activeTab === 'SKILLS' ? (skills[0]?.id as number) : (trainings[0]?.id as number)
  )

  const activeItems = useMemo(() => (activeTab === 'SKILLS' ? skills : trainings), [activeTab, skills, trainings])
  const currentData = useMemo(() => activeItems.find((s) => s.id === activeId), [activeItems, activeId])

  if (!currentData) return null

  return (
    <section
      className="relative w-full h-screen flex flex-col font-sans border-y overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
    >
      <header
        className="shrink-0 h-24 border-b flex items-center justify-between px-12 z-30"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
      >
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <Activity size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[8px] font-black uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>SYSTEM_CORE_MANIFEST</span>
          </div>
          <div className="flex p-1 rounded-sm border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
            {(['SKILLS', 'TRAINING'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setActiveId(tab === 'SKILLS' ? (skills[0]?.id as number) : (trainings[0]?.id as number))
                }}
                className={cn(
                  "px-8 py-2 text-[8px] font-black uppercase tracking-[0.3em] transition-all cursor-pointer relative",
                  activeTab === tab ? "" : "text-zinc-400 hover:text-zinc-600"
                )}
                style={{ color: activeTab === tab ? DESIGN_SYSTEM.COLORS.BLACK : '' }}
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
        <aside
          className="w-72 md:w-80 border-r overflow-y-auto no-scrollbar shrink-0"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
        >
          <div className="flex flex-col">
            {activeItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id as number)}
                className={cn(
                  "p-8 text-left border-b transition-all cursor-pointer group flex items-center justify-between",
                  activeId === item.id ? "" : "hover:bg-zinc-100/50"
                )}
                style={{
                  backgroundColor: activeId === item.id ? DESIGN_SYSTEM.COLORS.WHITE : 'transparent',
                  borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC_100
                }}
              >
                <div className="space-y-2 pr-4">
                  <span className="text-[7px] font-mono block uppercase tracking-widest italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>REF_DATA_00{item.id}</span>
                  <h4 className={cn(
                    "text-[10px] font-black uppercase italic leading-tight transition-colors tracking-tight",
                    activeId === item.id ? "" : "text-zinc-400 group-hover:text-zinc-600"
                  )} style={{ color: activeId === item.id ? DESIGN_SYSTEM.COLORS.BLACK : '' }}>
                    {item.name}
                  </h4>
                </div>
                {activeId === item.id && <ChevronRight size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE }}>
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
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.8] break-words" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                    {currentData.name}
                  </h3>
                  <div className="pt-8 border-t max-w-2xl" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                    <div className="text-[11px] md:text-xs font-bold uppercase italic leading-relaxed tracking-wide" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>
                      {activeTab === 'SKILLS'
                        ? (currentData as Skill).basics?.description
                        : "SERIAL_TRAINING_PROTOCOL_INITIALIZED_FOR_PERSONNEL_ADVANCEMENT"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 pt-4">
                  {activeTab === 'SKILLS' ? (
                    <>
                      <Stat label="COMPLEXITY" value={(currentData as Skill).details?.complexity} icon={<Target size={12} />} />
                      <Stat label="RARITY" value={(currentData as Skill).details?.rarity} icon={<Fingerprint size={12} />} />
                      <Stat label="DEPTH" value={(currentData as Skill).details?.depth} icon={<Layers size={12} />} />
                    </>
                  ) : (
                    <>
                      <Stat label="INTENSITY" value={(currentData as Training).basics?.intensity} icon={<Target size={12} />} />
                      <Stat label="FORMAT" value={(currentData as Training).basics?.format} icon={<Fingerprint size={12} />} />
                      <Stat label="STATUS" value="ACTIVE" icon={<Activity size={12} />} />
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside
            className="w-full lg:w-[420px] border-l p-12 md:p-16 flex flex-col gap-20 overflow-y-auto no-scrollbar shrink-0"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
          >
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b pb-4" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                <div className="size-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }} />
                <h5 className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                  {activeTab === 'SKILLS' ? 'CORE_SPECIFICATIONS' : 'TECHNICAL_PARAMETERS'}
                </h5>
              </div>

              <div className="space-y-10">
                {activeTab === 'SKILLS' ? (
                  (currentData as Skill).details?.specifications?.list?.map((spec) => (
                    <div key={spec.id} className="space-y-3">
                      <div className="text-[10px] font-black uppercase italic flex items-center gap-3" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                        <div className="size-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        {spec.parameter}: {spec.value}
                      </div>
                      <p className="text-[9px] font-bold uppercase leading-relaxed pl-4 border-l tracking-wide" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500, borderLeftColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                        {spec.description}
                      </p>
                    </div>
                  ))
                ) : (
                  (currentData as Training).details?.specifications?.list?.map((spec) => (
                    <div key={spec.id} className="space-y-3">
                      <div className="text-[10px] font-black uppercase italic flex items-center gap-3" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                        <div className="size-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        {spec.parameter}: {spec.value}
                      </div>
                      <p className="text-[9px] font-bold uppercase leading-relaxed pl-4 border-l tracking-wide" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500, borderLeftColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                        {spec.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {activeTab === 'SKILLS' && (currentData as Skill).details?.features?.list && (
              <div className="space-y-12">
                <div className="flex items-center gap-4 border-b pb-4" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                  <div className="size-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }} />
                  <h5 className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>SYSTEM_FEATURES</h5>
                </div>
                <div className="space-y-4">
                  {(currentData as Skill).details?.features?.list?.map((feature) => (
                    <div key={feature.id} className="p-5 border space-y-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, backgroundColor: DESIGN_SYSTEM.COLORS.WHITE }}>
                      <div className="text-[9px] font-black uppercase italic tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{feature.name}</div>
                      <div className="text-[8px] font-bold uppercase italic leading-tight" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>{feature.description}</div>
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

function Stat({ label, value, icon }: { label: string; value?: string | null; icon: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
        <div style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{icon}</div>
        <span className="text-[7px] font-black uppercase tracking-[0.5em]">{label}</span>
      </div>
      <div className="text-lg md:text-xl font-black italic uppercase tracking-tighter leading-none break-words" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
        {value || 'STANDARD'}
      </div>
    </div>
  )
}