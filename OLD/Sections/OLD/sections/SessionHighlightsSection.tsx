'use client'

import React, { useState } from 'react'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Zap,
  AlertTriangle,
  ChevronRight,
  Target,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export function SessionHighlightsSection({ sessions = DUMMY_SESSIONS }: { sessions?: any[] }) {
  const [activeSessionIdx, setActiveSessionIdx] = useState(0)
  const [selectedOutcomeIdx, setSelectedOutcomeIdx] = useState<number | null>(null)

  const currentSession = sessions[activeSessionIdx]

  const handleOutcomeClick = (idx: number) => {
    setSelectedOutcomeIdx(selectedOutcomeIdx === idx ? null : idx)
  }

  return (
    <section
      className="relative w-full py-32 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              SESSION_INTEL
            </span>
            <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter">
              HIGHLIGHTS
            </h2>
          </div>

          <div className="flex bg-zinc-950 border border-zinc-900 p-1 flex-wrap">
            {sessions.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSessionIdx(idx)
                  setSelectedOutcomeIdx(null)
                }}
                className={cn(
                  "px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-500 relative cursor-pointer",
                  activeSessionIdx === idx ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {activeSessionIdx === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 z-0"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                  />
                )}
                <span className="relative z-10">{s.type}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12">
            <div
              className="p-8 bg-zinc-950 border border-zinc-900 relative overflow-hidden group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-[10px] font-mono text-zinc-600 block mb-1">SESSION_CODE</span>
                  <span className="text-2xl font-black italic text-white uppercase">{currentSession.code}</span>
                </div>
                <div className={cn(
                  "px-3 py-1 text-[8px] font-black uppercase tracking-tighter border",
                  currentSession.details.status === 'Completed' ? "border-green-500 text-green-500" : "border-primary text-primary"
                )}>
                  {currentSession.details.status}
                </div>
              </div>

              <div className="space-y-8">
                <MetricLine label="LAPS_COMPLETED" value={currentSession.metrics.quantifiers.laps} unit="LPS" />
                <MetricLine label="TOTAL_DISTANCE" value={currentSession.metrics.quantifiers.distance} unit="KM" />
                <MetricLine label="SESSION_TIME" value={currentSession.metrics.quantifiers.duration} unit="MIN" />
              </div>

              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={120} />
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">NARRATIVE_INSIGHT</span>
              <p className="text-sm text-zinc-400 font-bold leading-relaxed uppercase italic border-l-2 pl-6" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                {currentSession.basics.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 relative">
            <div className="absolute left-0 top-0 w-px h-full bg-zinc-900 ml-4 md:ml-8" />

            <div className="space-y-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSession.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {currentSession.outcomes.map((moment: any, mIdx: number) => (
                    <div key={mIdx} className="relative pl-16 md:pl-24 group">
                      <div
                        className="absolute left-[13px] md:left-[29px] top-8 size-2 bg-black border border-zinc-700 rotate-45 z-10 transition-all duration-300"
                        style={{
                          backgroundColor: moment.type === 'incident' ? '#ef4444' : (selectedOutcomeIdx === mIdx ? DESIGN_SYSTEM.COLORS.PRIMARY : ''),
                          borderColor: moment.type === 'incident' ? '#ef4444' : (selectedOutcomeIdx === mIdx ? DESIGN_SYSTEM.COLORS.PRIMARY : '')
                        }}
                      />

                      <div
                        onClick={() => handleOutcomeClick(mIdx)}
                        className={cn(
                          "w-full text-left flex flex-col justify-between items-start gap-6 p-8 bg-zinc-950/50 border transition-all duration-300 cursor-pointer",
                          selectedOutcomeIdx === mIdx ? "border-zinc-700 bg-zinc-900" : "border-transparent hover:border-zinc-800"
                        )}
                      >
                        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono text-zinc-600 tracking-tighter">LAP_{moment.lap}</span>
                              {moment.type === 'incident' ? (
                                <AlertTriangle size={12} className="text-red-500" />
                              ) : (
                                <Zap size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                              )}
                            </div>
                            <h4 className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter">
                              {moment.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-8">
                            <div className="text-right">
                              <span className="text-[8px] font-black text-zinc-700 block uppercase">DATA_POINT</span>
                              <span className="text-lg font-black italic text-zinc-400 uppercase">{moment.data}</span>
                            </div>
                            <ChevronRight
                              size={16}
                              className={cn(
                                "text-zinc-800 transition-all",
                                selectedOutcomeIdx === mIdx ? "rotate-90 text-white" : "group-hover:text-white group-hover:translate-x-1"
                              )}
                            />
                          </div>
                        </div>

                        <AnimatePresence>
                          {selectedOutcomeIdx === mIdx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="w-full pt-6 border-t border-zinc-800 overflow-hidden"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-1">
                                  <span className="text-[8px] font-black text-zinc-600 uppercase">TELEMETRY_STATUS</span>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase">SENSOR_VERIFIED_DATA</p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[8px] font-black text-zinc-600 uppercase">IMPACT_ASSESSMENT</span>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase">STOCHASTIC_MODEL_ACCEPTED</p>
                                </div>
                                <div className="flex justify-end items-end">
                                  <div
                                    className="flex items-center gap-2 text-[8px] font-black text-primary hover:underline underline-offset-4 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      window.open(`/chronicle`, '_self')
                                    }}
                                  >
                                    <Info size={10} />
                                    EXPAND_RAW_LOGS
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricLine({ label, value, unit }: { label: string, value: any, unit: string }) {
  return (
    <div className="flex justify-between items-end border-b border-zinc-900 pb-2 group/metric">
      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest group-hover/metric:text-zinc-500 transition-colors">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black italic text-white leading-none">{value}</span>
        <span className="text-[10px] font-black text-zinc-800 uppercase">{unit}</span>
      </div>
    </div>
  )
}

const DUMMY_SESSIONS = [
  {
    id: 1,
    type: 'Practice',
    code: 'FP1-MONZA',
    basics: { description: "SYSTEMS VALIDATION AND AERO MAPPING COMPLETED UNDER DRY CONDITIONS. FOCUS ON HARD COMPOUND DEGRADATION." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 24, distance: "139.2", duration: "60" } },
    outcomes: [
      { lap: 4, title: "AERO_MAP_COMPLETE", data: "NOMINAL", type: 'highlight' },
      { lap: 12, title: "BRAKE_PRESSURE_FLUC", data: "SENSOR_ERR", type: 'incident' },
      { lap: 18, title: "FASTEST_SECTOR_2", data: "28.422s", type: 'highlight' },
      { lap: 22, title: "TIRE_DEG_TEST", data: "HARD_C1", type: 'highlight' },
    ]
  },
  {
    id: 2,
    type: 'Qualifying',
    code: 'Q-MONZA',
    basics: { description: "MAXIMUM POWER DEPLOYMENT. ALL TRACK LIMITS OBSERVED. P1 SECURED BY 0.042s MARGIN." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 12, distance: "69.6", duration: "45" } },
    outcomes: [
      { lap: 3, title: "Q1_ADVANCE", data: "P02", type: 'highlight' },
      { lap: 6, title: "Q2_ADVANCE", data: "P01", type: 'highlight' },
      { lap: 8, title: "TRACK_LIMIT_WARNING", data: "TURN_5", type: 'incident' },
      { lap: 11, title: "POLE_POSITION", data: "1:19.422", type: 'highlight' },
    ]
  },
  {
    id: 3,
    type: 'Race',
    code: 'R-MONZA',
    basics: { description: "FULL DISTANCE EVENT. OBSERVED TIRE DEGRADATION ON LEFT-FRONT. RECOVERY DRIVE AFTER LAP 12 LOCK-UP." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 53, distance: "306.7", duration: "92" } },
    outcomes: [
      { lap: 1, title: "HOLESHOT_START", data: "P1_HOLD", type: 'highlight' },
      { lap: 5, title: "DRS_TRAIN", data: "PACKAGE_FORM", type: 'highlight' },
      { lap: 12, title: "T1_LOCK_UP", data: "FLAT_SPOT", type: 'incident' },
      { lap: 18, title: "UNDERCUT", data: "+2.3s", type: 'highlight' },
      { lap: 34, title: "SAFETY_CAR", data: "DEPLOYED", type: 'incident' },
      { lap: 52, title: "FINAL_LAP", data: "P01", type: 'highlight' },
      { lap: 53, title: "RACE_WIN", data: "P01", type: 'highlight' },
    ]
  },
  {
    id: 4,
    type: 'Practice',
    code: 'FP2-SPA',
    basics: { description: "WET TRACK CONDITION SIMULATION. INTERMEDIATE TIRE PERFORMANCE VALIDATION." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 31, distance: "186.4", duration: "90" } },
    outcomes: [
      { lap: 8, title: "RAIN_SIM_START", data: "WET_MODE", type: 'highlight' },
      { lap: 15, title: "AQUAPLANING_TEST", data: "E335", type: 'incident' },
      { lap: 28, title: "INTER_FASTEST", data: "2:12.877", type: 'highlight' },
    ]
  },
  {
    id: 5,
    type: 'Qualifying',
    code: 'Q-SPA',
    basics: { description: "MIXED CONDITIONS. DRIVERS SWITCH TO SLICKS IN FINAL MINUTES." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 15, distance: "90.2", duration: "50" } },
    outcomes: [
      { lap: 2, title: "Q1_GREEN_FLAG", data: "INTERS", type: 'highlight' },
      { lap: 9, title: "TRACK_DRYING", data: "LINE_EMERGING", type: 'highlight' },
      { lap: 13, title: "SLICK_GAMBLE", data: "SOFT_C4", type: 'highlight' },
      { lap: 14, title: "POLE_POSITION", data: "1:54.218", type: 'highlight' },
    ]
  },
  {
    id: 6,
    type: 'Race',
    code: 'R-SPA',
    basics: { description: "CHANGEABLE WEATHER. STRATEGIC CALL FOR EXTREME WETS PAYS DIVIDENDS." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 44, distance: "308.1", duration: "118" } },
    outcomes: [
      { lap: 1, title: "HEAVY_RAIN", data: "RED_FLAG", type: 'incident' },
      { lap: 7, title: "RESTART", data: "WET_TIRES", type: 'highlight' },
      { lap: 23, title: "LEAD_CHANGE", data: "P01", type: 'highlight' },
      { lap: 38, title: "SAFETY_CAR", data: "CRASH_T11", type: 'incident' },
      { lap: 44, title: "VICTORY", data: "P01", type: 'highlight' },
    ]
  },
  {
    id: 7,
    type: 'Practice',
    code: 'FP3-SUZUKA',
    basics: { description: "HIGH DOWNFORCE SETUP VERIFICATION. SECTOR 1 PERFORMANCE OPTIMIZATION." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 27, distance: "155.2", duration: "75" } },
    outcomes: [
      { lap: 5, title: "SECTOR_1_TEST", data: "32.445s", type: 'highlight' },
      { lap: 14, title: "130R_FLAT", data: "CONFIRMED", type: 'highlight' },
      { lap: 22, title: "REAR_GRIP_FALL", data: "DEGRADE", type: 'incident' },
    ]
  },
  {
    id: 8,
    type: 'Qualifying',
    code: 'Q-SUZUKA',
    basics: { description: "DRY CONDITIONS. MICRO-SECTOR MANAGEMENT FOR POLE." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 14, distance: "80.6", duration: "48" } },
    outcomes: [
      { lap: 4, title: "Q1_TOPPING", data: "P01", type: 'highlight' },
      { lap: 9, title: "Q2_THROUGH", data: "P02", type: 'highlight' },
      { lap: 13, title: "POLE_LAP", data: "1:28.332", type: 'highlight' },
    ]
  },
  {
    id: 9,
    type: 'Race',
    code: 'R-SUZUKA',
    basics: { description: "CLASSIC SUZUKA BATTLE. OVERTAKES AT T1 AND THE CHICANE." },
    details: { status: 'Completed' },
    metrics: { quantifiers: { laps: 53, distance: "307.4", duration: "95" } },
    outcomes: [
      { lap: 1, title: "T1_BATTLE", data: "P2_HOLD", type: 'highlight' },
      { lap: 16, title: "UNDERCUT", data: "+1.8s", type: 'highlight' },
      { lap: 29, title: "DEGNER_OFF", data: "GRAVEL", type: 'incident' },
      { lap: 45, title: "FINAL_PUSH", data: "P01", type: 'highlight' },
      { lap: 53, title: "CHAMPIONSHIP", data: "VICTORY", type: 'highlight' },
    ]
  },
  {
    id: 10,
    type: 'Race',
    code: 'R-INTERLAGOS',
    basics: { description: "BRAZILIAN CLASSIC. REVERSE GRID SPRINT AND MAIN EVENT." },
    details: { status: 'Upcoming' },
    metrics: { quantifiers: { laps: 71, distance: "305.9", duration: "110" } },
    outcomes: [
      { lap: 1, title: "SPRINT_START", data: "P10", type: 'highlight' },
      { lap: 24, title: "MAIN_EVENT", data: "P06", type: 'highlight' },
      { lap: 52, title: "SAFETY_CAR", data: "DEBRIS", type: 'incident' },
      { lap: 70, title: "FINISH", data: "P03", type: 'highlight' },
    ]
  }
]