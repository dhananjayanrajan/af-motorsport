'use client'

import React, { useState } from 'react'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Zap,
  Wind,
  Scale,
  ChevronRight,
  Activity,
  Crosshair,
  Terminal
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface MachineProfileProps {
  cars?: any[]
  onCarSelect?: (car: any) => void
}

const DUMMY_CARS = [
  {
    id: 1,
    name: "AF_STRATOS_01",
    basics: {
      identifiers: { code: "STR-01" },
      description: "CURRENT SEASON COMPETITOR. OPTIMIZED FOR HIGH-SPEED DOWNFORCE STABILITY AND HYBRID THERMAL EFFICIENCY."
    },
    lifecycle: { span: { start: "2025" }, status: "ACTIVE" },
    assets: {
      livery: [{ url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop" }]
    },
    characteristics: {
      powertrain: { engine: { specification: "1.6L V6 TURBO" }, transmission: { gears: 8 } },
      aerodynamics: { configuration: "GROUND_EFFECT", wing: "DRS_ENABLED" },
      dimensions: { length: 5000, width: 2000 },
      weight: { total: 798, unit: "KG" }
    }
  },
  {
    id: 2,
    name: "AF_LEGACY_GT",
    basics: {
      identifiers: { code: "LGT-H" },
      description: "HISTORIC CHAMPIONSHIP WINNER. TWIN-TURBO V8 ARCHITECTURE WITH COMPOSITE CHASSIS INTEGRATION."
    },
    lifecycle: { span: { start: "2018" }, status: "HISTORIC" },
    assets: {
      livery: [{ url: "https://images.unsplash.com/photo-1594739131645-316279f06f52?q=80&w=2070&auto=format&fit=crop" }]
    },
    characteristics: {
      powertrain: { engine: { specification: "4.0L V8 TWIN-TURBO" }, transmission: { gears: 6 } },
      aerodynamics: { configuration: "HIGH_DOWNFORCE", wing: "FIXED_ELEMENT" },
      dimensions: { length: 4800, width: 2050 },
      weight: { total: 1240, unit: "KG" }
    }
  }
]

export function MachinesSection({ cars = DUMMY_CARS, onCarSelect }: MachineProfileProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const currentCar = cars[activeIdx] || DUMMY_CARS[0]

  return (
    <section
      className="relative w-full min-h-screen border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        <div className="lg:w-3/5 relative border-r border-zinc-900 flex flex-col justify-center p-6 md:p-12 lg:p-20">
          <div className="mb-12 relative">
            <div className="flex items-center gap-3 mb-6">
              <Terminal size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">SYSTEM_ARCHIVE_01</span>
            </div>
            <h2 className="text-[12vw] lg:text-[9rem] font-black italic text-white uppercase tracking-tighter leading-[0.8] break-all md:break-normal">
              THE<br />
              <span className="text-zinc-800">MACHINES</span>
            </h2>
          </div>

          <div
            className="relative aspect-video w-full bg-zinc-950 border border-zinc-900 group overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCar.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {currentCar.assets?.livery?.[0]?.url ? (
                  <img
                    src={currentCar.assets.livery[0].url}
                    alt={currentCar.name}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-900 font-black italic">NO_IMAGE_DATA</div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-2 py-0.5" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                <Crosshair size={10} className="text-black" />
                <span className="text-[8px] font-black text-black uppercase">{currentCar.basics?.identifiers?.code}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {cars.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => {
                  setActiveIdx(idx)
                  onCarSelect?.(car)
                }}
                className={cn(
                  "px-8 py-4 border transition-all duration-300 relative font-black uppercase italic text-[10px] tracking-widest cursor-pointer",
                  activeIdx === idx
                    ? "bg-white border-white text-black translate-x-2"
                    : "border-zinc-800 text-zinc-600 hover:border-zinc-500 hover:text-white"
                )}
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
              >
                {car.basics?.identifiers?.code || car.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-2/5 bg-zinc-950 flex flex-col border-t lg:border-t-0 border-zinc-900 relative">
          <div className="p-8 md:p-12 lg:p-16 space-y-16">
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-4 text-zinc-600 font-mono text-[9px]">
                  <Activity size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span>REF_{currentCar.lifecycle?.span?.start}</span>
                </div>
                <span className="text-[9px] font-black text-white uppercase tracking-widest">{currentCar.lifecycle?.status}</span>
              </div>

              <h3 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-[0.8] break-words">
                {currentCar.name}
              </h3>

              <p className="text-[10px] text-zinc-500 font-bold uppercase leading-relaxed max-w-sm">
                {currentCar.basics?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px bg-zinc-900 border border-zinc-900">
              <SpecItem
                icon={<Zap size={14} />}
                label="POWERTRAIN"
                value={currentCar.characteristics?.powertrain?.engine?.specification}
                detail={`${currentCar.characteristics?.powertrain?.transmission?.gears}G_TRANS`}
              />
              <SpecItem
                icon={<Wind size={14} />}
                label="AERO"
                value={currentCar.characteristics?.aerodynamics?.configuration}
                detail={currentCar.characteristics?.aerodynamics?.wing}
              />
              <SpecItem
                icon={<Scale size={14} />}
                label="UNIT_WEIGHT"
                value={`${currentCar.characteristics?.weight?.total}${currentCar.characteristics?.weight?.unit}`}
                detail="WET_WEIGHT"
              />
            </div>

            <button
              onClick={() => {
                if (onCarSelect) {
                  onCarSelect(currentCar)
                } else {
                  window.open('/pursuit', '_self')
                }
              }}
              className="w-full p-8 border border-zinc-900 bg-black hover:border-white transition-all group flex items-center justify-between cursor-pointer"
            >
              <span className="text-xs font-black italic text-white uppercase tracking-[0.2em]">INIT_TECH_DOSSIER</span>
              <ChevronRight
                size={20}
                className="text-zinc-800 group-hover:translate-x-2 transition-all"
                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecItem({ icon, label, value, detail }: { icon: any, label: string, value: string, detail: string }) {
  return (
    <div className="bg-black p-10 flex justify-between items-end min-h-[140px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-zinc-800">
          {icon}
          <span className="text-[8px] font-black uppercase tracking-[0.4em]">{label}</span>
        </div>
        <span className="text-2xl md:text-4xl font-black italic text-white uppercase block leading-none tracking-tighter break-all">
          {value || '---'}
        </span>
      </div>
      <span className="text-[9px] font-mono text-zinc-700 uppercase font-black mb-1">{detail}</span>
    </div>
  )
}