'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Award as AwardIcon,
  ChevronLeft,
  ChevronRight,
  GlassWater,
  Star
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function TrophiesSection({ trophies = DUMMY_ARCHIVE }: { trophies?: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken((Math.random() * 0xffffff << 0).toString(16).toUpperCase())
  }, [activeIdx])

  const nextSlide = () => setActiveIdx((prev) => (prev + 1) % trophies.length)
  const prevSlide = () => setActiveIdx((prev) => (prev - 1 + trophies.length) % trophies.length)

  return (
    <section
      className="relative w-full py-32 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Star className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className={cn("text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]")}>
                PRESTIGE_ARCHIVE_v3.0
              </span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black italic text-white tracking-tighter uppercase leading-[0.8]">
              THE<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>TROPHIES</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="size-14 border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors"
            >
              <ChevronLeft className="text-white" />
            </button>
            <div className="flex flex-col items-center px-8">
              <span className="text-[10px] font-mono text-zinc-600 uppercase">Registry_Pointer</span>
              <span className="text-xl font-black italic text-white">
                {(activeIdx + 1).toString().padStart(2, '0')} / {trophies.length.toString().padStart(2, '0')}
              </span>
            </div>
            <button
              onClick={nextSlide}
              className="size-14 border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>

        <div className="relative h-[650px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900"
            >
              <div className="lg:col-span-7 relative overflow-hidden bg-black group">
                <img
                  src={trophies[activeIdx].assets?.primary}
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

                <div className="absolute top-10 left-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-8 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Asset_Source: {trophies[activeIdx].id}</span>
                  </div>
                  <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                    {trophies[activeIdx].type}
                  </h3>
                </div>
              </div>

              <div className="lg:col-span-5 bg-zinc-950 p-12 md:p-16 flex flex-col justify-between relative">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="p-4 border border-zinc-800 inline-flex">
                      {trophies[activeIdx].type.includes('CELEBRATION') ? <GlassWater size={24} className="text-white" /> : <AwardIcon size={24} className="text-white" />}
                    </div>
                    <h3 className="text-5xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
                      {trophies[activeIdx].name}
                    </h3>
                    <p className="text-zinc-500 text-sm font-bold leading-relaxed uppercase italic border-l-2 pl-6" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                      {trophies[activeIdx].basics?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-10 gap-x-6 pt-10 border-t border-zinc-900">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">PRESTIGE</span>
                      <span className="text-xs font-mono text-zinc-300 uppercase">{trophies[activeIdx].details?.prestige}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">EXCLUSIVITY</span>
                      <span className="text-xs font-mono text-zinc-300 uppercase">{trophies[activeIdx].details?.exclusivity}</span>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">RECIPIENT_ENTITY</span>
                      <span className="text-xs font-mono text-white uppercase tracking-tighter">
                        {trophies[activeIdx].beneficiary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const DUMMY_ARCHIVE = [
  { id: 1, name: "CONSTRUCTORS CHAMPIONSHIP", type: "PREMIER LEAGUE", beneficiary: "AF MOTORSPORT", basics: { description: "Highest technical honor for aerodynamic efficiency and powertrain reliability across the 2026 season." }, details: { prestige: 'Iconic', exclusivity: 'TeamOnly' }, assets: { primary: "https://picsum.photos/id/10/1200" } },
  { id: 2, name: "GALA OF EXCELLENCE", type: "CELEBRATION", beneficiary: "V-CORP TEAM", basics: { description: "Annual recognition of strategic intelligence and trackside operational perfection." }, details: { prestige: 'Prestigious', exclusivity: 'InviteOnly' }, assets: { primary: "https://picsum.photos/id/20/1200" } },
  { id: 3, name: "INNOVATION IN CARBON", type: "TECHNICAL AWARD", beneficiary: "CHIEF ARCHITECT", basics: { description: "Awarded for the development of the zero-flex chassis architecture used in the V-01 series." }, details: { prestige: 'Notable', exclusivity: 'Public' }, assets: { primary: "https://picsum.photos/id/30/1200" } },
  { id: 4, name: "AERODYNAMIC PINNACLE", type: "DESIGN AWARD", beneficiary: "AERO DEPT", basics: { description: "Validation of the active-floor modeling system implemented during the mid-season upgrade." }, details: { prestige: 'Notable', exclusivity: 'TeamOnly' }, assets: { primary: "https://picsum.photos/id/40/1200" } },
  { id: 5, name: "STRATEGIC MASTERY", type: "TACTICAL AWARD", beneficiary: "OPERATIONS", basics: { description: "Flawless execution of the 4-stop strategy during the Monsoon Grand Prix." }, details: { prestige: 'Prestigious', exclusivity: 'InviteOnly' }, assets: { primary: "https://picsum.photos/id/50/1200" } },
  { id: 6, name: "PIT STOP RECORD", type: "PERFORMANCE", beneficiary: "PIT CREW", basics: { description: "Consistency award for maintaining sub-2.0s stops across 22 races." }, details: { prestige: 'Notable', exclusivity: 'Public' }, assets: { primary: "https://picsum.photos/id/60/1200" } },
  { id: 7, name: "ZERO EMISSION LEAD", type: "SUSTAINABILITY", beneficiary: "R&D LABS", basics: { description: "Recognition for hydrogen-hybrid integration in transport logistics." }, details: { prestige: 'Notable', exclusivity: 'Public' }, assets: { primary: "https://picsum.photos/id/70/1200" } },
  { id: 8, name: "ENGINEERING LEGACY", type: "LIFETIME AWARD", beneficiary: "CEO", basics: { description: "Special recognition for 10 years of advancing high-performance engineering." }, details: { prestige: 'Iconic', exclusivity: 'InviteOnly' }, assets: { primary: "https://picsum.photos/id/80/1200" } },
  { id: 9, name: "DATA SOVEREIGNTY", type: "INTELLIGENCE", beneficiary: "IT DIVISION", basics: { description: "Award for building the first fully air-gapped race telemetry server." }, details: { prestige: 'Notable', exclusivity: 'Private' }, assets: { primary: "https://picsum.photos/id/90/1200" } },
  { id: 10, name: "VICTORY DINNER 26", type: "CELEBRATION", beneficiary: "ENTIRE ORG", basics: { description: "Final end-of-season banquet celebrating triple championship success." }, details: { prestige: 'Prestigious', exclusivity: 'InviteOnly' }, assets: { primary: "https://picsum.photos/id/100/1200" } },
]