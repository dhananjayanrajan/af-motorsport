'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Fingerprint,
  Layers,
  Microscope,
  Radar,
  Target,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export interface Initiative {
  id: number;
  name: string;
  basics?: {
    mission?: string | null;
    description?: string | null;
  };
  details?: {
    status?: ('Proposed' | 'Active' | 'Paused' | 'Completed' | 'Archived') | null;
  };
  traits?: {
    outcomes?: {
      expectations?: { value: string }[] | null;
    };
  };
  assets: {
    primary: string;
  };
}

export function InnovationsSection({ initiatives = DUMMY_INITIATIVES }: { initiatives?: Initiative[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = initiatives[activeIdx]

  return (
    <section
      className="relative w-full min-h-screen border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        <div className="lg:w-1/4 border-r border-zinc-900 flex flex-col bg-black">
          <div className="p-8 border-b border-zinc-900">
            <div className="flex items-center gap-3 mb-2">
              <Microscope size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">R&D_ARCHIVE</span>
            </div>
            <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">INNOVATIONS</h2>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {initiatives.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "w-full p-8 border-b border-zinc-900 flex items-center justify-between transition-all duration-300 group cursor-pointer",
                  activeIdx === idx ? "bg-zinc-900/50" : "hover:bg-zinc-950"
                )}
              >
                <div className="text-left">
                  <span className={cn(
                    "block text-[9px] font-mono mb-1 transition-colors",
                    activeIdx === idx ? "text-primary" : "text-zinc-700"
                  )} style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                    PRJ_LOG_{item.id.toString().padStart(3, '0')}
                  </span>
                  <span className={cn(
                    "text-lg font-black italic uppercase tracking-tight transition-all",
                    activeIdx === idx ? "text-white translate-x-2" : "text-zinc-500 group-hover:text-zinc-300"
                  )}>
                    {item.name}
                  </span>
                </div>
                <div className={cn(
                  "size-2 rotate-45 transition-all",
                  activeIdx === idx ? "bg-primary scale-125" : "bg-zinc-800"
                )} style={{ backgroundColor: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }} />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-3/4 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="flex-1 flex flex-col lg:flex-row"
            >
              <div className="lg:w-1/2 relative border-r border-zinc-900 bg-zinc-950 flex flex-col p-12 lg:p-20 justify-center">
                <div className="relative w-full aspect-square border border-zinc-800 p-4 group overflow-hidden">
                  <div className="absolute -top-1 -left-1 size-3 border-t border-l border-primary z-20" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <div className="absolute -bottom-1 -right-1 size-3 border-b border-r border-primary z-20" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />

                  <div className="w-full h-full relative overflow-hidden bg-black grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img
                      src={current.assets.primary}
                      alt={current.name}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />
                  </div>

                  <button
                    onClick={() => window.open(current.assets.primary, '_blank')}
                    className="absolute bottom-6 right-6 z-30 size-10 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                  >
                    <ExternalLink size={16} className="text-black" />
                  </button>
                </div>

                <div className="mt-12 flex items-center gap-6">
                  <div className="flex-1 h-px bg-zinc-900" />
                  <Fingerprint size={24} className="text-zinc-800" />
                  <div className="flex-1 h-px bg-zinc-900" />
                </div>
              </div>

              <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-between bg-black">
                <div className="space-y-16">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-3 py-1 bg-zinc-900 border border-zinc-800">
                      <span className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">{current.details?.status}</span>
                    </div>

                    <h3 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none break-words">
                      {current.name}
                    </h3>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center gap-2 text-zinc-700">
                        <Target size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">STRATEGIC_MISSION</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-400 uppercase italic leading-relaxed border-l-2 border-zinc-800 pl-6">
                        {current.basics?.mission}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 bg-zinc-950 border border-zinc-900 flex flex-col gap-4 group hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2 text-zinc-700">
                        <Radar size={14} />
                        <span className="text-[8px] font-black uppercase tracking-widest">TECHNICAL_DESCRIPTION</span>
                      </div>
                      <p className="text-[11px] font-bold text-zinc-500 uppercase leading-relaxed">
                        {current.basics?.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {current.traits?.outcomes?.expectations?.map((exp, i) => (
                        <div
                          key={i}
                          className="p-6 bg-black border border-zinc-900 flex flex-col gap-2 hover:border-primary transition-colors cursor-help"
                          style={{ borderColor: '' }}
                        >
                          <span className="text-[8px] font-mono text-zinc-700 uppercase">METRIC_0{i + 1}</span>
                          <span className="text-xs font-black text-white uppercase italic">{exp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-zinc-900 flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Layers size={16} className="text-zinc-800" />
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-zinc-700 uppercase">CLASSIFICATION</span>
                        <span className="text-[10px] font-mono text-white uppercase tracking-tighter italic">CONFIDENTIAL_RD_CLASS_A</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(8)].map((_, i) => <div key={i} className="w-0.5 h-4 bg-zinc-900" />)}
                    </div>
                  </div>

                  <button
                    onClick={() => window.open('/pursuit', '_self')}
                    className="w-full group flex items-center justify-between p-6 border border-zinc-900 hover:border-white transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <ShieldCheck size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">ACCESS_FULL_DOSSIER</span>
                    </div>
                    <ChevronRight size={18} className="text-zinc-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const DUMMY_INITIATIVES: Initiative[] = [
  {
    id: 101,
    name: "THERMAL_SHIELD_V2",
    basics: {
      mission: "HEAT ATTENUATION PROTOCOL",
      description: "NANOMATERIAL SPRAY COATING DESIGNED TO REDUCE KINETIC HEAT TRANSFER TO SENSITIVE AVIONICS DURING HIGH-SPEED FRICTION EVENTS."
    },
    details: { status: 'Active' },
    traits: { outcomes: { expectations: [{ value: '40%_RED_TARGET' }, { value: '0_MASS_GAIN' }] } },
    assets: { primary: "https://images.unsplash.com/photo-1558444479-c8f010b91939?q=80&w=1200" }
  },
  {
    id: 102,
    name: "NEURAL_TELEMETRY",
    basics: {
      mission: "PREDICTIVE DEGRADATION MODELING",
      description: "REPLACING REACTIVE SENSOR DATA WITH ASYNCHRONOUS MACHINE LEARNING FORECASTS FOR TIRE WEAR AND FUEL CONSUMPTION."
    },
    details: { status: 'Active' },
    traits: { outcomes: { expectations: [{ value: '±2_LAP_DELTA' }, { value: 'AI_ORCHESTRATED' }] } },
    assets: { primary: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200" }
  },
  {
    id: 103,
    name: "BIO_COMPOSITE_X",
    basics: {
      mission: "SUSTAINABLE TENSILE TESTING",
      description: "EXPLORATION OF FLAX-BASED REINFORCEMENTS AS A REPLACEMENT FOR CARBON WOVEN SHEETS IN AERODYNAMIC PANELS."
    },
    details: { status: 'Proposed' },
    traits: { outcomes: { expectations: [{ value: 'RECYCLABLE_CORE' }, { value: 'WEIGHT_PARITY' }] } },
    assets: { primary: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200" }
  },
  {
    id: 104,
    name: "DRS_GRID_SYNC",
    basics: {
      mission: "AUTOMATED WAKE OPTIMIZATION",
      description: "LIDAR-BASED ACTIVE FLOOR AND WING POSITIONING SYSTEM THAT ADJUSTS REAL-TIME TO TURBULENT AIR PROXIMITY."
    },
    details: { status: 'Paused' },
    traits: { outcomes: { expectations: [{ value: 'LIDAR_MAPPING' }, { value: 'ZERO_LATENCY' }] } },
    assets: { primary: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200" }
  }
]