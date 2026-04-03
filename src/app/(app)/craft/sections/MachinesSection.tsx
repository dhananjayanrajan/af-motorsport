'use client'

import React, { useState } from 'react'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Zap,
  Wind,
  Scale,
  Activity,
  Crosshair,
  Terminal,
  Cpu
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
      livery: [{ url: "https://picsum.photos/seed/af1/1200/800" }]
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
      livery: [{ url: "https://picsum.photos/seed/af2/1200/800" }]
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
        <div className="lg:w-3/5 relative border-r border-zinc-900 flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="mb-12 relative">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em]">SYSTEM_ARCHIVE_01</span>
            </div>
            <h2 className="text-[8vw] lg:text-[5rem] font-black italic text-white uppercase tracking-tighter leading-[0.85] break-all md:break-normal">
              THE<br />
              <span className="text-zinc-900">MACHINES</span>
            </h2>
          </div>

          <div
            className="relative aspect-video w-full bg-zinc-950 border border-zinc-900 group overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {currentCar.assets?.livery?.[0]?.url ? (
                  <img
                    src={currentCar.assets.livery[0].url}
                    alt={currentCar.name}
                    className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-900 font-black italic text-[10px]">NO_IMAGE_DATA</div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-2 py-0.5" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                <Crosshair size={8} className="text-black" />
                <span className="text-[7px] font-black text-black uppercase tracking-widest">{currentCar.basics?.identifiers?.code}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {cars.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => {
                  setActiveIdx(idx)
                  onCarSelect?.(car)
                }}
                className={cn(
                  "px-6 py-3 border transition-all duration-300 relative font-black uppercase italic text-[9px] tracking-widest cursor-pointer",
                  activeIdx === idx
                    ? "bg-white border-white text-black"
                    : "border-zinc-900 text-zinc-700 hover:border-zinc-700 hover:text-white"
                )}
                style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
              >
                {car.basics?.identifiers?.code || car.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-2/5 bg-zinc-950 flex flex-col border-t lg:border-t-0 border-zinc-900 relative">
          <div className="p-8 md:p-10 lg:p-12 space-y-12">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3 text-zinc-700 font-mono text-[8px] tracking-widest">
                  <Activity size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span>REF_{currentCar.lifecycle?.span?.start}</span>
                </div>
                <span className="text-[8px] font-black text-white uppercase tracking-widest">{currentCar.lifecycle?.status}</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-[0.9] break-words">
                {currentCar.name}
              </h3>

              <div className="pt-4 border-t border-zinc-900/40">
                <p className="text-[9px] text-zinc-600 font-bold uppercase leading-relaxed italic tracking-wide max-w-xs">
                  {currentCar.basics?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px bg-zinc-900 border border-zinc-900">
              <SpecItem
                icon={<Zap size={12} />}
                label="POWERTRAIN"
                value={currentCar.characteristics?.powertrain?.engine?.specification}
                detail={`${currentCar.characteristics?.powertrain?.transmission?.gears}G_SYNCHRO`}
              />
              <SpecItem
                icon={<Wind size={12} />}
                label="AERO_DYNAMICS"
                value={currentCar.characteristics?.aerodynamics?.configuration}
                detail={currentCar.characteristics?.aerodynamics?.wing}
              />
              <SpecItem
                icon={<Scale size={12} />}
                label="MASS_METRICS"
                value={`${currentCar.characteristics?.weight?.total}${currentCar.characteristics?.weight?.unit}`}
                detail="DRY_WEIGHT"
              />
              <SpecItem
                icon={<Cpu size={12} />}
                label="LOGIC_UNIT"
                value="AF_KERNAL_V3"
                detail="REAL_TIME_OS"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecItem({ icon, label, value, detail }: { icon: any, label: string, value: string, detail: string }) {
  return (
    <div className="bg-black p-8 flex justify-between items-end min-h-[110px] group transition-colors">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-zinc-800 group-hover:text-zinc-700 transition-colors">
          {icon}
          <span className="text-[7px] font-black uppercase tracking-[0.4em]">{label}</span>
        </div>
        <span className="text-xl md:text-2xl font-black italic text-white uppercase block leading-none tracking-tighter break-all">
          {value || '---'}
        </span>
      </div>
      <span className="text-[8px] font-mono text-zinc-800 uppercase font-black mb-0.5">{detail}</span>
    </div>
  )
}