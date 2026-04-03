'use client'

import React, { useState } from 'react'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Cpu,
  Layers,
  Dna,
  Binary,
  Wind,
  ChevronRight,
  Activity,
  ShieldCheck,
  Terminal
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface TechnicalSectionProps {
  cars?: any[]
  skills?: any[]
}

const DUMMY_CAR_DATA = [
  {
    id: 1,
    name: "AF_STRATOS_01",
    basics: {
      identifiers: { code: "STR-01", chassis: "CF-2025-001" },
      description: "CURRENT SEASON COMPETITOR. OPTIMIZED FOR HIGH-SPEED DOWNFORCE STABILITY."
    },
    details: { status: 'Active' }
  },
  {
    id: 2,
    name: "AF_LEGACY_GT",
    basics: {
      identifiers: { code: "LGT-H", chassis: "AL-2018-092" },
      description: "HISTORIC CHAMPIONSHIP WINNER. TWIN-TURBO V8 ARCHITECTURE."
    },
    details: { status: 'Retired' }
  }
]

const DUMMY_SKILL_DATA = [
  {
    id: 101,
    name: "COMPOSITE_ENGINEERING",
    basics: {
      scope: { depth: 'Expert', significance: 'Core' },
      description: "ADVANCED CARBON FIBER MONOCOQUE CONSTRUCTION AND REPAIR PROTOCOLS."
    },
    traits: {
      methods: { list: [{ method: 'VACUUM_INFUSION' }, { method: 'AUTOCLAVE' }] }
    }
  },
  {
    id: 102,
    name: "AERO_DYNAMICS",
    basics: {
      scope: { depth: 'Advanced', significance: 'Primary' },
      description: "CFD SIMULATION AND REAL-TIME AIRFLOW CALIBRATION FOR VARIABLE WING ELEMENTS."
    },
    traits: {
      methods: { list: [{ method: 'ANSYS_CFD' }, { method: 'WIND_TUNNEL_SIM' }] }
    }
  },
  {
    id: 103,
    name: "TELEMETRY_SYSTEMS",
    basics: {
      scope: { depth: 'Expert', significance: 'Intelligence' },
      description: "LOW-LATENCY SENSOR NETWORKS PROVIDING 500+ DATA POINTS PER SECOND."
    },
    traits: {
      methods: { list: [{ method: 'CAN_BUS' }, { method: 'REAL_TIME_ANALYSIS' }] }
    }
  }
]

export function TechnicalSection({
  cars = DUMMY_CAR_DATA,
  skills = DUMMY_SKILL_DATA
}: TechnicalSectionProps) {
  const [selectedCarIdx, setSelectedCarIdx] = useState(0)
  const currentCar = cars[selectedCarIdx] || DUMMY_CAR_DATA[0]

  const handleDossierAccess = () => {
    window.open(`/pursuit/machines/${currentCar.basics?.identifiers?.code.toLowerCase()}`, '_self')
  }

  return (
    <section
      className="w-full py-32 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="flex flex-col mb-24 space-y-4">
          <div className="flex items-center gap-3">
            <Activity size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">ENGINEERING_DATA_LINK</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter">
            TECHNICAL_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>SPECS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Terminal size={12} className="text-zinc-700" />
              <span className="text-[10px] font-mono text-zinc-700 uppercase">SELECT_PLATFORM</span>
            </div>
            {cars.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => setSelectedCarIdx(idx)}
                className={cn(
                  "w-full p-8 text-left border transition-all duration-300 relative group overflow-hidden cursor-pointer",
                  selectedCarIdx === idx
                    ? "border-white bg-white text-black"
                    : "border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-950"
                )}
              >
                <div className="relative z-10">
                  <span className={cn(
                    "text-[10px] font-mono block mb-1 opacity-50",
                    selectedCarIdx === idx ? "text-black" : "text-zinc-500"
                  )}>
                    {car.basics?.identifiers?.code || `ID_0${car.id}`}
                  </span>
                  <span className="text-2xl font-black italic uppercase tracking-tighter block">
                    {car.name}
                  </span>
                </div>
                {selectedCarIdx === idx && (
                  <motion.div
                    layoutId="activePointer"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                  >
                    <ChevronRight size={24} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
              <AnimatePresence mode="wait">
                {skills.map((skill) => (
                  <motion.div
                    key={`${currentCar.id}-${skill.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="bg-black p-10 space-y-6 group hover:bg-zinc-950 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-3 border border-zinc-900 group-hover:border-zinc-700 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                        {getSkillIcon(skill.name)}
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-black text-zinc-700 uppercase block tracking-[0.2em]">PROFICIENCY</span>
                        <span className="text-xs font-black italic text-white uppercase">{skill.basics?.scope?.depth}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-black italic text-white uppercase tracking-tight">
                        {skill.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed">
                        {skill.basics?.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-900/50 flex flex-wrap gap-2">
                      {skill.traits?.methods?.list?.map((m: any, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono text-zinc-600 bg-zinc-950 px-2 py-1 border border-zinc-900 hover:text-white hover:border-zinc-500 transition-colors cursor-default"
                        >
                          {m.method}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-6 md:items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">SYSTEM_STABLE</span>
                </div>
                <span className="text-zinc-800 text-[9px]">|</span>
                <span className="text-[9px] font-mono text-zinc-700 uppercase">{currentCar.details?.status || 'UNKNOWN'}</span>
                <span className="text-zinc-800 text-[9px]">|</span>
                <span className="text-[9px] font-mono text-zinc-800 uppercase italic">
                  {currentCar.basics?.identifiers?.chassis || 'CHASSIS_PENDING'}
                </span>
              </div>

              <button
                onClick={handleDossierAccess}
                className="flex items-center gap-3 px-6 py-3 border border-zinc-900 hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <ShieldCheck size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">FULL_TECH_DOSSIER</span>
                <ChevronRight size={14} className="text-zinc-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function getSkillIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('aero')) return <Wind size={18} />
  if (n.includes('composite')) return <Layers size={18} />
  if (n.includes('telemetry') || n.includes('data')) return <Binary size={18} />
  if (n.includes('electronics')) return <Cpu size={18} />
  return <Dna size={18} />
}