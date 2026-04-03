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

  return (
    <section
      className="w-full py-24 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="flex flex-col mb-20 space-y-3">
          <div className="flex items-center gap-3">
            <Activity size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">ENGINEERING_DATA_LINK</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
            TECHNICAL_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>SPECS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={10} className="text-zinc-800" />
              <span className="text-[9px] font-mono text-zinc-800 uppercase tracking-widest">PLATFORM_SELECT</span>
            </div>
            {cars.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => setSelectedCarIdx(idx)}
                className={cn(
                  "w-full p-6 text-left border transition-all duration-300 relative group cursor-pointer",
                  selectedCarIdx === idx
                    ? "border-white bg-white text-black translate-x-2"
                    : "border-zinc-900 text-zinc-600 hover:border-zinc-700 hover:bg-zinc-950"
                )}
                style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
              >
                <div className="relative z-10 flex flex-col">
                  <span className={cn(
                    "text-[8px] font-mono block mb-1 opacity-50 uppercase tracking-widest",
                    selectedCarIdx === idx ? "text-black" : "text-zinc-600"
                  )}>
                    {car.basics?.identifiers?.code || `ID_0${car.id}`}
                  </span>
                  <span className="text-xl font-black italic uppercase tracking-tighter">
                    {car.name}
                  </span>
                </div>
                {selectedCarIdx === idx && (
                  <motion.div
                    layoutId="activePointer"
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                  >
                    <ChevronRight size={20} />
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
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-black p-8 space-y-6 group hover:bg-zinc-950 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 border border-zinc-900 group-hover:border-zinc-700 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                        {getSkillIcon(skill.name)}
                      </div>
                      <div className="text-right">
                        <span className="text-[7px] font-black text-zinc-800 uppercase block tracking-[0.2em]">DEPTH</span>
                        <span className="text-[10px] font-black italic text-white uppercase tracking-widest">{skill.basics?.scope?.depth}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-black italic text-white uppercase tracking-tight">
                        {skill.name}
                      </h4>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase leading-relaxed max-w-[90%]">
                        {skill.basics?.description}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-zinc-900/40 flex flex-wrap gap-2">
                      {skill.traits?.methods?.list?.map((m: any, i: number) => (
                        <span
                          key={i}
                          className="text-[8px] font-mono text-zinc-700 bg-zinc-950 px-2 py-0.5 border border-zinc-900"
                        >
                          {m.method}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function getSkillIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('aero')) return <Wind size={16} />
  if (n.includes('composite')) return <Layers size={16} />
  if (n.includes('telemetry') || n.includes('data')) return <Binary size={16} />
  if (n.includes('electronics')) return <Cpu size={16} />
  return <Dna size={16} />
}