'use client'

import React, { useState } from 'react'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Trophy,
  Activity,
  ChevronRight,
  TrendingUp,
  Hash,
  ArrowUpRight,
  X,
  Zap,
  Shield,
  Gauge,
  Timer
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const DUMMY_SEASONS = [
  {
    id: 's2025',
    year: '2025',
    name: 'INTERCONTINENTAL CHALLENGE',
    champion: 'M. VERSTAPPEN',
    team: 'RED BULL RACING',
    stats: {
      races: 22,
      podiums: 18,
      avgSpeed: "234.2 KM/H",
      points: 454
    },
    overview: "A DOMINANT DISPLAY OF TECHNICAL SUPERIORITY ACROSS VARIED CLIMATIC CONDITIONS. MARKED BY HIGH DOWNFORCE PRECISION.",
    extendedLogs: [
      { label: "WINS", value: "15", icon: <Trophy size={14} /> },
      { label: "POLES", value: "12", icon: <Zap size={14} /> },
      { label: "FASTEST_LAPS", value: "9", icon: <Timer size={14} /> },
      { label: "RELIABILITY", value: "98.2%", icon: <Shield size={14} /> }
    ],
    technicalFocus: "THE 2025 CAMPAIGN CENTERED ON PUSHING THE BOUNDARIES OF GROUND-EFFECT AERODYNAMICS, SPECIFICALLY OPTIMIZING VORTEX GENERATION AT HIGH SPEEDS."
  },
  {
    id: 's2024',
    year: '2024',
    name: 'EUROPEAN ELITE SERIES',
    champion: 'L. HAMILTON',
    team: 'MERCEDES-AMG',
    stats: {
      races: 20,
      podiums: 15,
      avgSpeed: "231.8 KM/H",
      points: 382
    },
    overview: "DEFINED BY CLOSE-QUARTER TACTICAL BATTLES AND ADVANCED ENERGY RECOVERY OPTIMIZATION DURING MID-SEASON UPDATES.",
    extendedLogs: [
      { label: "WINS", value: "9", icon: <Trophy size={14} /> },
      { label: "POLES", value: "14", icon: <Zap size={14} /> },
      { label: "FASTEST_LAPS", value: "6", icon: <Timer size={14} /> },
      { label: "RELIABILITY", value: "95.5%", icon: <Shield size={14} /> }
    ],
    technicalFocus: "FOCUS WAS SHIFTED TOWARD ENERGY HARVESTING EFFICIENCY (MGU-K) TO ALLOW LONGER DEPLOYMENT PHASES DURING OVERTAKING MANEUVERS."
  }
]

export function SeasonRecapSection({ seasons = DUMMY_SEASONS }: { seasons?: any[] }) {
  const [selectedSeason, setSelectedSeason] = useState<any | null>(null)

  return (
    <section
      className="relative w-full py-32 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1400px] mx-auto px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              HISTORICAL_ARCHIVE
            </span>
            <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
              SEASON_RECAP
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {seasons.map((season, idx) => (
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, ease: "easeOut" }}
              className="group relative bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
              onClick={() => setSelectedSeason(season)}
            >
              <div className="grid grid-cols-1 xl:grid-cols-12 items-stretch">
                <div className="xl:col-span-1 py-10 flex justify-center border-r border-zinc-900 bg-zinc-900/10">
                  <span className="text-3xl font-black italic text-zinc-700 group-hover:text-white transition-colors">
                    {season.year}
                  </span>
                </div>

                <div className="xl:col-span-11 grid grid-cols-1 lg:grid-cols-10 p-10 md:p-12 items-center gap-12">
                  <div className="lg:col-span-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <Trophy size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">CHAMPION</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">
                        {season.champion}
                      </h3>
                      <p className="text-[9px] font-bold text-zinc-500 uppercase mt-1.5 tracking-wider">{season.team}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-3 border-l-2 border-zinc-900 pl-10">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase leading-relaxed italic line-clamp-3">
                      {season.overview}
                    </p>
                  </div>

                  <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-y-8 gap-x-12">
                    <StatItem icon={<Activity size={10} />} label="AVG_SPD" value={season.stats.avgSpeed} />
                    <StatItem icon={<Hash size={10} />} label="RACES" value={season.stats.races} />
                    <StatItem icon={<TrendingUp size={10} />} label="POINTS" value={season.stats.points} />
                    <StatItem icon={<ArrowUpRight size={10} />} label="PODIUMS" value={season.stats.podiums} />
                  </div>

                  <div className="lg:col-span-1 flex justify-end">
                    <div className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:bg-primary transition-all duration-300 group-hover:border-primary">
                      <ChevronRight size={20} className="text-white group-hover:text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedSeason && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 md:p-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
              onClick={() => setSelectedSeason(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: 10 }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 flex flex-col max-h-[85vh] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}
            >
              <div className="flex justify-between items-center px-12 py-8 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md">
                <div className="flex items-center gap-8">
                  <span className="text-3xl font-black italic text-zinc-800 leading-none">{selectedSeason.year}</span>
                  <div className="h-6 w-px bg-zinc-800" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{selectedSeason.name}</span>
                </div>
                <button
                  onClick={() => setSelectedSeason(null)}
                  className="w-10 h-10 flex items-center justify-center bg-zinc-900 hover:bg-white transition-colors group"
                >
                  <X size={18} className="text-white group-hover:text-black" />
                </button>
              </div>

              <div className="p-12 md:p-16 overflow-y-auto no-scrollbar flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>CHAMPION_PROFILE</span>
                      <h3 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
                        {selectedSeason.champion}
                      </h3>
                      <p className="text-base font-bold text-zinc-500 uppercase italic tracking-wide">{selectedSeason.team}</p>
                    </div>

                    <div className="p-8 border-l-2 bg-zinc-900/20 space-y-3" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">TECHNICAL_FOCUS</span>
                      <p className="text-[13px] font-bold text-zinc-300 uppercase leading-relaxed italic">
                        {selectedSeason.technicalFocus}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                      {selectedSeason.extendedLogs.map((log: any, i: number) => (
                        <div key={i} className="space-y-2 group/log">
                          <div className="flex items-center gap-2 text-zinc-700">
                            {log.icon}
                            <span className="text-[9px] font-black uppercase tracking-[0.1em]">{log.label}</span>
                          </div>
                          <span className="text-3xl font-black italic text-white leading-none tracking-tight">{log.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-12">
                    <div className="p-10 border border-zinc-900 bg-zinc-900/10 relative overflow-hidden">
                      <div className="relative z-10 space-y-10">
                        <div className="flex items-center gap-3">
                          <Gauge size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">PERFORMANCE_ANALYTICS</span>
                        </div>
                        <div className="space-y-8">
                          <MetricRow label="PODIUM_CONVERSION" value={`${((selectedSeason.stats.podiums / selectedSeason.stats.races) * 100).toFixed(1)}%`} />
                          <MetricRow label="POINTS_EFFICIENCY" value={(selectedSeason.stats.points / selectedSeason.stats.races).toFixed(2)} />
                        </div>
                      </div>
                      <Trophy size={180} className="absolute -bottom-10 -right-10 opacity-[0.02]" />
                    </div>

                    <div className="space-y-4 pt-10 border-t border-zinc-900">
                      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest block">OPERATIONAL_DATA</span>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase leading-loose italic tracking-wide">
                        {selectedSeason.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-1.5 w-full bg-zinc-900 mt-auto">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: any }) {
  return (
    <div className="space-y-2 border-l border-zinc-900 pl-5">
      <div className="flex items-center gap-2 text-zinc-700">
        {icon}
        <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-base font-black italic text-zinc-300 block leading-none">{value}</span>
    </div>
  )
}

function MetricRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">{label}</span>
      <span className="text-2xl font-black italic text-white tracking-tighter leading-none">{value}</span>
    </div>
  )
}