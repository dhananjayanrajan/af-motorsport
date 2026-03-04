'use client'

import { ClippedButton } from "@/components/Custom/ui/ClippedButton"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Clock,
  Database,
  ExternalLink,
  Eye,
  ShieldCheck,
  Target,
  User,
  Workflow,
  Zap
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DUMMY_DECISIONS: any[] = [
  { id: 101, name: "UNDER_CUT_EXECUTION", slug: "under-cut-execution" },
  { id: 102, name: "FUEL_MAP_DELTA", slug: "fuel-map-delta" },
  { id: 103, name: "EASY_EXTEND_STINT", slug: "easy-extend-stint" },
  { id: 104, name: "WET_WEATHER_PIVOT", slug: "wet-weather-pivot" },
  { id: 105, name: "BRAKE_BIAS_RECOV", slug: "brake-bias-recov" }
]

const DUMMY_STRATEGIES: any[] = [
  {
    id: 1,
    name: "THERMAL_MANAGEMENT_V4",
    basics: {
      enable: true,
      description: "Advanced regulation of kinetic and thermal energy recovery systems for desert-climate high-speed circuits."
    },
    details: {
      methodology: "Recursive cooling loops utilizing predictive GPS data to peak cooling flow 500m before high-torque exit zones.",
      outcomes: {
        list: [
          { id: "o1", decisions: [DUMMY_DECISIONS[0], DUMMY_DECISIONS[1]], settings: { featured: true } },
          { id: "o2", decisions: [DUMMY_DECISIONS[4]], settings: { featured: false } }
        ]
      }
    },
    traits: {
      directives: {
        list: [
          { id: "d1", phase: "GRID_IDLE", action: "Engage max-flow fan array", owner: "ENGINE_CHIEF", deadline: "T-05:00" },
          { id: "d2", phase: "LAP_1-10", action: "Monitor MGU-K surface delta", owner: "INTEL_UNIT", deadline: "REAL_TIME" },
          { id: "d3", phase: "PIT_WINDOW", action: "Radiator debris inspection", owner: "PIT_CREW", deadline: "DURING_STOP" },
          { id: "d4", phase: "POST_RACE", action: "Core heat-soak extraction", owner: "DATA_ARCHITECT", deadline: "T+15:00" },
          { id: "d5", phase: "DEBRIEF", action: "Thermal degradation report", owner: "LEAD_STRATEGIST", deadline: "T+120:00" }
        ]
      },
      contingencies: {
        list: [
          { id: "c1", trigger: "Oil temp > 125°C", response: "Shift to map 6 (Recovery)", probability: "Medium", impact: "Major" },
          { id: "c2", trigger: "Sensor Drift > 2%", response: "Redundant bus activation", probability: "Low", impact: "Moderate" },
          { id: "c3", trigger: "Airflow Blockage", response: "Force bypass valve 2", probability: "Low", impact: "Critical" },
          { id: "c4", trigger: "Ambient Surge", response: "Derate ERS output 5%", probability: "High", impact: "Minor" }
        ]
      }
    },
    slug: "thermal-management-v4"
  },
  {
    id: 2,
    name: "AERO_BALANCE_DELTA_X",
    basics: {
      enable: true,
      description: "Dynamic adjustment of active aero surfaces and suspension damping to maximize corner entry stability."
    },
    details: {
      methodology: "Real-time CFD telemetry comparison against wind-tunnel baseline to identify vortex shedding anomalies.",
      outcomes: {
        list: [{ id: "o3", decisions: [DUMMY_DECISIONS[3]], settings: { featured: true } }]
      }
    },
    traits: {
      directives: {
        list: [
          { id: "d6", phase: "FORMATION", action: "Confirm front wing angle 3.2°", owner: "AERO_TECH", deadline: "T-02:00" },
          { id: "d7", phase: "DRS_ACTIVE", action: "Verify actuator response", owner: "SYS_ARCH", deadline: "REAL_TIME" }
        ]
      },
      contingencies: {
        list: [
          { id: "c5", trigger: "Wing stall detect", response: "Inc. angle 0.5° manually", probability: "Low", impact: "Major" },
          { id: "c6", trigger: "Understeer surge", response: "Brake bias shift +2%", probability: "Certain", impact: "Minor" }
        ]
      }
    },
    slug: "aero-balance-delta-x"
  },
  {
    id: 3,
    name: "FUEL_CONSERVATION_OMEGA",
    basics: {
      enable: true,
      description: "Strategic lift-and-coast protocols designed for safety car restarts and high-consumption track layouts."
    },
    details: {
      methodology: "Flow-rate monitoring matched against predictive lap-counter to ensure 0.1kg fuel margin at P0.",
      outcomes: {
        list: [{ id: "o4", decisions: [DUMMY_DECISIONS[2], DUMMY_DECISIONS[1]], settings: { featured: true } }]
      }
    },
    traits: {
      directives: {
        list: [
          { id: "d8", phase: "STINT_2", action: "Enable Fuel-Mix 2 (Lean)", owner: "DRIVER_01", deadline: "LAP_24" },
          { id: "d9", phase: "SC_PERIOD", action: "Critical energy recovery", owner: "ENGINE_CHIEF", deadline: "SC_LAP_1" }
        ]
      },
      contingencies: {
        list: [
          { id: "c7", trigger: "Consumption > Target", response: "Drastic lift/coast Sector 1", probability: "High", impact: "Moderate" },
          { id: "c8", trigger: "Pump Pressure Drop", response: "Engage secondary lift pump", probability: "Low", impact: "Critical" }
        ]
      }
    },
    slug: "fuel-conservation-omega"
  }
]

const getTacticalClip = (variant: 'main' | 'side') => {
  return variant === 'main'
    ? 'polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)'
    : 'polygon(0% 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%)';
}

export function DefiningStrategySection({ strategies = DUMMY_STRATEGIES }: { strategies?: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = strategies[activeIdx]
  const router = useRouter()

  return (
    <section className="relative w-full bg-black py-32 px-4 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-900">

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none overflow-hidden">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          className="text-[30vw] font-black italic text-transparent leading-none whitespace-nowrap"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,1)' }}
        >
          {current.name.toUpperCase()}
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-l-4 border-red-600 pl-8">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black italic text-zinc-500 tracking-[0.5em] uppercase underline decoration-red-600 underline-offset-8">Decision_Matrix_v2.0</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.8]">
              THE DEFINING<br />
              <span className="text-red-600">STRATEGY</span>
            </h2>
          </div>

          <div className="hidden md:flex flex-col items-end text-right font-mono text-[9px] text-zinc-700 gap-2">
            <div className="flex items-center gap-3 bg-zinc-950 p-3 border border-zinc-900">
              <Activity className="size-3 text-red-600" />
              <span>NODES_LOADED: {strategies.length}</span>
              <Database className="size-3 text-zinc-500" />
              <span>CORE_STABILITY: 100%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-10">
          {strategies.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveIdx(idx)}
              className={`relative overflow-hidden group border transition-all duration-500 ${activeIdx === idx ? 'bg-zinc-900 border-red-600' : 'bg-black border-zinc-900 hover:border-zinc-700'}`}
              style={{ clipPath: 'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)' }}
            >
              {activeIdx === idx && (
                <motion.div layoutId="nodeHighlight" className="absolute inset-0 bg-red-600/5 z-0" />
              )}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className={`text-[8px] font-black italic tracking-widest ${activeIdx === idx ? 'text-red-600' : 'text-zinc-700'}`}>0{idx + 1}</span>
                  <span className={`text-[10px] font-black italic uppercase tracking-tighter ${activeIdx === idx ? 'text-white' : 'text-zinc-600'}`}>{s.name}</span>
                </div>
                {activeIdx === idx && <Target className="size-3 text-red-600" />}
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div
                  className="relative bg-zinc-950 border border-white/5 p-[1px] group transition-all duration-500"
                  style={{ clipPath: getTacticalClip('main') }}
                >
                  <div className="bg-black p-10 h-full relative overflow-hidden" style={{ clipPath: getTacticalClip('main') }}>
                    <div className="relative z-10 flex flex-col gap-8">
                      <div className="flex items-center gap-4">
                        <span className="text-[8px] font-black italic tracking-[0.2em] text-red-600 uppercase">Operational_Summary</span>
                        <div className="h-[1px] flex-1 bg-zinc-900/50" />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
                          {current.name.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-zinc-500 text-[11px] font-bold italic leading-relaxed uppercase tracking-wider border-l-2 border-red-600 pl-6 max-w-2xl">
                          {current.basics?.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-zinc-700">
                            <Eye className="size-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest italic">Core_Methodology</span>
                          </div>
                          <p className="text-[10px] text-zinc-400 font-mono italic leading-relaxed bg-zinc-950 p-4 border border-zinc-900/50">
                            {current.details?.methodology}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-zinc-700">
                            <Zap className="size-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest italic">Associated_Decisions</span>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {current.details?.outcomes?.list?.map((outcome: any) =>
                              outcome.decisions?.map((decision: any) => (
                                <button
                                  key={decision.id}
                                  onClick={() => router.push(`/decisions/${decision.slug}`)}
                                  className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-900 hover:border-red-600/40 transition-all group/btn text-left"
                                >
                                  <span className="text-[9px] font-black text-white italic tracking-tighter group-hover/btn:text-red-500">{decision.name}</span>
                                  <ExternalLink className="size-3 text-zinc-800" />
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <ClippedButton
                          label="EXPLORE_TECHNICAL_ARCHITECTURE"
                          variant="primary"
                          size="lg"
                          onClick={() => router.push(`/strategies/${current.slug}`)}
                        />
                      </div>
                    </div>

                    <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12 pointer-events-none">
                      <Target className="size-64 text-white" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {current.traits?.contingencies?.list?.map((c: any, i: number) => (
                    <div
                      key={c.id}
                      className="relative bg-zinc-950 border border-zinc-900 p-6 group hover:border-zinc-700 transition-all overflow-hidden"
                    >
                      <div className="absolute top-2 right-4 text-[7px] font-mono text-zinc-800">REF_C_0{i + 1}</div>
                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className={`rounded-none text-[7px] font-black italic tracking-widest uppercase py-0.5 ${c.impact === 'Critical' ? 'bg-red-600 text-white border-red-600' : 'border-zinc-800 text-zinc-500'}`}>
                            {c.impact}_IMPACT
                          </Badge>
                          <span className="text-[7px] font-mono text-zinc-700">PROBABILITY: {c.probability.toUpperCase()}</span>
                        </div>
                        <h4 className="text-white font-black italic text-sm tracking-tight uppercase leading-none border-b border-zinc-900 pb-2">{c.trigger}</h4>
                        <p className="text-[9px] text-zinc-500 font-bold italic leading-tight uppercase tracking-wide group-hover:text-zinc-300 transition-colors">
                          {c.response}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div
              className="bg-zinc-950 border border-zinc-900 p-8 flex-1 relative"
              style={{ clipPath: getTacticalClip('side') }}
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-6 mb-10">
                <div className="space-y-1">
                  <span className="text-[7px] font-black italic text-red-600 tracking-[.4em] uppercase">Tactical_Directives</span>
                  <h4 className="text-white font-black italic text-lg uppercase tracking-tighter">EXECUTION_FLOW</h4>
                </div>
                <Workflow className="size-4 text-zinc-700" />
              </div>

              <div className="relative space-y-10">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-900" />

                {current.traits?.directives?.list?.map((d: any, idx: number) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative pl-8 group/item"
                  >
                    <div className="absolute left-0 top-1 size-[15px] bg-black border border-zinc-800 rotate-45 flex items-center justify-center group-hover/item:border-red-600 transition-colors">
                      <div className="size-1.5 bg-zinc-900 group-hover/item:bg-red-600 transition-colors" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black text-red-600 italic tracking-widest uppercase">
                          {d.phase}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="size-2 text-zinc-800" />
                          <span className="text-[7px] font-mono text-zinc-700">{d.deadline}</span>
                        </div>
                      </div>
                      <h5 className="text-white text-[11px] font-black uppercase tracking-tighter leading-tight italic group-hover/item:text-red-500 transition-colors">
                        {d.action}
                      </h5>
                      <div className="flex items-center gap-2 pt-1">
                        <User className="size-2.5 text-zinc-700" />
                        <span className="text-[8px] font-black text-zinc-600 uppercase italic tracking-widest">{d.owner}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-10">
                <ClippedButton
                  label="VIEW_STRATEGIC_MANIFEST"
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => router.push(`/strategies/${current.slug}`)}
                />
              </div>
            </div>

            <div className="relative bg-zinc-950 border border-zinc-900 p-5 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-3 text-red-600" />
                  <span className="text-[9px] font-black text-white italic uppercase tracking-wider">Strategic_Integrity_Index</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-mono text-zinc-700 uppercase underline decoration-red-600">VERIFIED_LOG</span>
                  <div className="flex gap-1 mt-1">
                    <div className="h-1 w-3 bg-red-600" />
                    <div className="h-1 w-3 bg-red-600" />
                    <div className="h-1 w-3 bg-red-600" />
                    <div className="h-1 w-3 bg-zinc-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}