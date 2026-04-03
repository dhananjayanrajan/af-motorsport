'use client'

import React, { useState } from 'react'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Globe,
  ArrowUpRight,
  CheckCircle2,
  Timer,
  CalendarDays,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

const DUMMY_EVENTS = [
  {
    id: 1001,
    name: "Daytona 24 Hours",
    slug: "daytona-24-hours-2026",
    basics: {
      identifiers: { round: "01", code: "DAY" },
      tagline: "The Great American Endurance Classic",
      description: "The season opener where endurance, strategy, and machine reliability are tested across 24 relentless hours."
    },
    details: { status: "Completed" },
    traits: {
      chronology: { start: "2026-01-24T14:30:00Z", end: "2026-01-25T14:30:00Z" }
    }
  },
  {
    id: 1002,
    name: "Sebring 12 Hours",
    slug: "sebring-12-hours-2026",
    basics: {
      identifiers: { round: "02", code: "SEB" },
      tagline: "The Bumpiest Battle on Earth",
      description: "Florida's legendary airfield circuit known for its brutal concrete surface and unforgiving bumps."
    },
    details: { status: "Completed" },
    traits: {
      chronology: { start: "2026-03-15T15:00:00Z", end: "2026-03-16T03:00:00Z" }
    }
  },
  {
    id: 1003,
    name: "Spa-Francorchamps 6 Hours",
    slug: "spa-6-hours-2026",
    basics: {
      identifiers: { round: "03", code: "SPA" },
      tagline: "The Ardennes Arrow",
      description: "Eau Rouge, Radillion, and the most demanding corners in motorsport. A driver's ultimate test."
    },
    details: { status: "Upcoming" },
    traits: {
      chronology: { start: "2026-05-02T11:00:00Z", end: "2026-05-02T17:00:00Z" }
    }
  },
  {
    id: 1004,
    name: "Le Mans 24 Hours",
    slug: "le-mans-24-hours-2026",
    basics: {
      identifiers: { round: "04", code: "LMS" },
      tagline: "The Greatest Race in the World",
      description: "The pinnacle of endurance racing. 24 hours, 13 kilometers per lap, and a century of legend."
    },
    details: { status: "Upcoming" },
    traits: {
      chronology: { start: "2026-06-13T14:00:00Z", end: "2026-06-14T14:00:00Z" }
    }
  }
]

interface CalendarSectionProps {
  events?: any[]
  onEventSelect?: (event: any) => void
  currentTimezone?: string
}

export function CalendarSection({
  events = DUMMY_EVENTS,
  onEventSelect,
  currentTimezone = "GMT +05:30"
}: CalendarSectionProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section
      className="relative w-full py-40 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1400px] mx-auto px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-16">
          <div className="space-y-6">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.6em] block" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              SEASON_CHRONOLOGY
            </span>
            <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.85]">
              RACE<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>CALENDAR</span>
            </h2>
          </div>

          <div className="md:text-right border-l-2 md:border-l-0 md:border-r-2 border-zinc-800 px-6 py-2">
            <span className="text-[9px] font-black text-zinc-700 uppercase block tracking-widest mb-2">LOCAL_TIMEZONE</span>
            <div className="flex items-center gap-3 justify-start md:justify-end text-white">
              <Globe size={14} className="text-zinc-600" />
              <span className="text-xl font-black italic uppercase tracking-tight">{currentTimezone}</span>
            </div>
          </div>
        </div>

        <div className="p-12 border border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-12 bg-zinc-950/20 relative overflow-hidden group/footer" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}>
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] block">CHASSIS_PROGRAM_2026</span>
            <span className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter">THE_FULL_PURSUIT</span>
          </div>
        </div>

        <div className="flex flex-col">
          {events.map((event, idx) => {
            const isCompleted = event.details?.status === 'Completed'
            const isHovered = hoveredId === event.id

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onEventSelect?.(event)}
                className="group relative border-b border-zinc-900 last:border-b-0 cursor-pointer overflow-hidden transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[160px]">
                  <div className="lg:col-span-1 py-10 flex flex-col justify-center border-r border-zinc-900 bg-zinc-900/5 group-hover:bg-zinc-900/20 transition-colors">
                    <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest text-center mb-2">ROUND</span>
                    <span className="text-3xl font-black italic text-zinc-500 group-hover:text-white transition-colors text-center">
                      {event.basics?.identifiers?.round || '00'}
                    </span>
                  </div>

                  <div className="lg:col-span-11 grid grid-cols-1 md:grid-cols-10 p-10 md:p-12 items-center gap-12 relative">
                    <div className="md:col-span-2 space-y-2">
                      <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">EVENT_DATE</div>
                      <div className="text-2xl font-black italic text-white uppercase leading-none tracking-tighter">
                        {event.traits?.chronology?.start
                          ? new Date(event.traits.chronology.start).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
                          : 'TBD'}
                      </div>
                    </div>

                    <div className="md:col-span-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                          {event.basics?.identifiers?.code || 'UNK'}
                        </span>
                        {isCompleted && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 border border-zinc-800">
                            <CheckCircle2 size={8} className="text-zinc-500" />
                            <span className="text-[8px] font-black text-zinc-500 uppercase">FINALIZED</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
                        {event.name}
                      </h3>
                    </div>

                    <div className="md:col-span-3 border-l border-zinc-900 pl-10 h-full flex flex-col justify-center">
                      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-3 block">TAGLINE_LOG</span>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase leading-relaxed italic tracking-wide max-w-[200px]">
                        {event.basics?.tagline}
                      </p>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary z-20"
                      initial={{ width: 0 }}
                      animate={{ width: isHovered ? "100%" : "0%" }}
                      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      exit={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-zinc-900/10 pointer-events-none -z-10"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}