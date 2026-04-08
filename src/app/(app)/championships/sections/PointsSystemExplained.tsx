'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Activity,
  ArrowUpRight,
  Binary,
  Calculator,
  ChevronRight,
  Info,
  Layers,
  Plus,
  ShieldCheck
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'

const DUMMY_POINTS = [
  {
    id: 'pt-wem',
    name: 'WEM Linear Scale A1',
    abbreviation: 'WEM_A1',
    description: 'A performance-weighted scale designed for long-form endurance cycles. Points are distributed based on distance intervals and reliability thresholds.',
    scale: '1st: 25 | 2nd: 18 | 3rd: 15 | 4th: 12 | 5th: 10',
    adjustment: 'Safety Car periods reduce active point accumulation by 15%.',
    condition: 'Minimum 75% race distance completion required.',
    impact: 'High reward for mechanical consistency.',
    championship: 'World Endurance Masters'
  },
  {
    id: 'pt-fi',
    name: 'Compute-Weighted Scale',
    abbreviation: 'C_WEIGHT',
    description: 'Proprietary scoring system for autonomous units. Points are calculated via a combination of lap time and processor efficiency.',
    scale: 'Dynamic calculation based on Delta-T.',
    adjustment: 'Manual intervention results in immediate DNF.',
    condition: 'Zero-human contact rule strictly enforced.',
    impact: 'Prioritizes algorithmic precision over raw speed.',
    championship: 'Formula Intelligence'
  },
  {
    id: 'pt-gt',
    name: 'FIA Standard 25',
    abbreviation: 'FIA_25',
    description: 'The global standard for GT3 sprint racing, rewarding aggressive positioning and qualifying performance.',
    scale: '1st: 25 | 2nd: 18 | 3rd: 15 | 4th: 12 | 5th: 10 | 6th: 8 | 7th: 6 | 8th: 4 | 9th: 2 | 10th: 1',
    adjustment: 'Success ballast applied to top 3 finishers.',
    condition: 'Crossing the finish line under own power.',
    impact: 'Balanced sprint-format rewarding.',
    championship: 'GT-Apex Continental'
  }
]

export function PointsSystemExplainedSection() {
  const [activeId, setActiveId] = useState(DUMMY_POINTS[0].id)
  const current = DUMMY_POINTS.find(p => p.id === activeId) || DUMMY_POINTS[0]

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex flex-col md:flex-row border-b border-zinc-200">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 w-full md:w-[450px] bg-zinc-50 border-r border-zinc-200 flex flex-col h-full">
        <div className="p-10 border-b border-zinc-200 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Regulation Module</span>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-950">
            Scoring<br />Mechanics
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {DUMMY_POINTS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "w-full text-left p-10 border-b border-zinc-200 transition-all group",
                activeId === item.id ? "bg-white" : "hover:bg-zinc-100/50"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    activeId === item.id ? "text-primary" : "text-zinc-400"
                  )} style={{ color: activeId === item.id ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined }}>
                    {item.abbreviation}
                  </span>
                  <h3 className={cn(
                    "text-xl font-black italic uppercase tracking-tight transition-colors",
                    activeId === item.id ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600"
                  )}>
                    {item.name}
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className={cn(
                    "transition-all",
                    activeId === item.id ? "text-zinc-950 rotate-45 scale-125" : "text-zinc-300 opacity-0 group-hover:opacity-100"
                  )}
                />
              </div>
            </button>
          ))}
        </div>

        <div className="p-10 bg-zinc-100/50 border-t border-zinc-200">
          <div className="flex items-center gap-4 text-zinc-400">
            <Info size={16} />
            <p className="text-[10px] font-bold uppercase leading-tight tracking-wider">
              System calculates real-time standings based on verified race control telemetry.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex-grow h-full bg-white flex flex-col overflow-y-auto px-8 md:px-20 py-16 lg:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl mx-auto space-y-16"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-100 rounded-full">
                <div className="size-2 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{current.championship}</span>
              </div>
              <h1 className="text-7xl lg:text-9xl font-black italic text-zinc-950 uppercase tracking-tighter leading-[0.8]">
                {current.abbreviation}
              </h1>
              <p className="text-2xl font-bold text-zinc-400 uppercase italic leading-tight max-w-2xl">
                {current.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
              <DetailBox label="Point Distribution" value={current.scale} icon={<Binary size={20} />} />
              <DetailBox label="Active Adjustments" value={current.adjustment} icon={<Activity size={20} />} />
              <DetailBox label="Eligibility Condition" value={current.condition} icon={<ShieldCheck size={20} />} />
              <DetailBox label="Competitive Impact" value={current.impact} icon={<Layers size={20} />} />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <button className="flex-1 group relative h-20 bg-zinc-950 overflow-hidden flex items-center justify-between px-8">
                <span className="text-white text-xs font-black uppercase tracking-[0.3em] relative z-10">Download Full Regulations</span>
                <div className="relative z-10 size-10 bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors" style={{ backgroundColor: undefined }}>
                  <Plus size={20} className="text-white group-hover:text-black transition-colors" />
                </div>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              </button>

              <button className="flex-1 group h-20 border border-zinc-200 hover:border-zinc-950 transition-colors flex items-center justify-between px-8 bg-white">
                <span className="text-zinc-950 text-xs font-black uppercase tracking-[0.3em]">View Example Scenarios</span>
                <ChevronRight size={20} className="text-zinc-300 group-hover:text-zinc-950 transition-colors" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function DetailBox({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-12 space-y-6">
      <div className="flex items-center gap-3 text-zinc-400">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-black italic text-zinc-950 uppercase tracking-tight leading-tight">
        {value}
      </div>
    </div>
  )
}