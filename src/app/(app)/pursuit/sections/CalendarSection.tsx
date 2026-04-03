'use client'

import React, { useState } from 'react'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Globe,
  ArrowUpRight,
  CheckCircle2,
  Timer,
  CalendarDays
} from 'lucide-react'
import { motion } from 'motion/react'
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
  },
  {
    id: 1005,
    name: "Nürburgring 24 Hours",
    slug: "nurburgring-24-hours-2026",
    basics: {
      identifiers: { round: "05", code: "N24" },
      tagline: "The Green Hell Gauntlet",
      description: "Over 170 corners, 25 kilometers, and the most unforgiving track on Earth."
    },
    details: { status: "Upcoming" },
    traits: {
      chronology: { start: "2026-08-22T15:00:00Z", end: "2026-08-23T15:00:00Z" }
    }
  },
  {
    id: 1006,
    name: "Monterey Motorsports Reunion",
    slug: "monterey-reunion-2026",
    basics: {
      identifiers: { round: "EX", code: "LAG" },
      tagline: "Heritage Meets Performance",
      description: "A celebration of motorsport history at Laguna Seca featuring the iconic Corkscrew."
    },
    details: { status: "Upcoming" },
    traits: {
      chronology: { start: "2026-10-09T16:00:00Z", end: "2026-10-11T22:00:00Z" }
    }
  },
  {
    id: 1007,
    name: "Fuji 6 Hours",
    slug: "fuji-6-hours-2026",
    basics: {
      identifiers: { round: "06", code: "FUJ" },
      tagline: "The Rising Sun Endurance",
      description: "Mount Fuji watches over this high-speed circuit known for its iconic 1.5km straight."
    },
    details: { status: "Upcoming" },
    traits: {
      chronology: { start: "2026-11-07T05:00:00Z", end: "2026-11-07T11:00:00Z" }
    }
  },
  {
    id: 1008,
    name: "Bahrain 8 Hours",
    slug: "bahrain-8-hours-2026",
    basics: {
      identifiers: { round: "07", code: "BHN" },
      tagline: "Desert Night Warfare",
      description: "A floodlit desert circuit where temperature management separates winners from survivors."
    },
    details: { status: "Provisional" },
    traits: {
      chronology: { start: "2026-12-12T10:00:00Z", end: "2026-12-12T18:00:00Z" }
    }
  },
  {
    id: 1009,
    name: "Goodwood Festival of Speed",
    slug: "goodwood-fos-2026",
    basics: {
      identifiers: { round: "SH", code: "GDW" },
      tagline: "The Hill Climb of Legends",
      description: "A celebration of motorsport's past, present, and future. The famous 1.16-mile hill climb."
    },
    details: { status: "Upcoming" },
    traits: {
      chronology: { start: "2026-07-09T08:00:00Z", end: "2026-07-12T18:00:00Z" }
    }
  },
  {
    id: 1010,
    name: "Indianapolis 8 Hour",
    slug: "indy-8-hour-2026",
    basics: {
      identifiers: { round: "08", code: "IMS" },
      tagline: "The Brickyard Challenge",
      description: "The legendary 2.5-mile oval repurposed for endurance racing's new generation."
    },
    details: { status: "Provisional" },
    traits: {
      chronology: { start: "2026-10-04T17:00:00Z", end: "2026-10-05T01:00:00Z" }
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
      className="relative w-full py-32 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">SEASON_CHRONOLOGY</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black italic text-white tracking-tighter uppercase leading-[0.75]">
              RACE<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>CALENDAR</span>
            </h2>
          </div>

          <div className="text-right border-r-4 pr-8" style={{ borderRightColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
            <span className="text-[10px] font-mono text-zinc-700 uppercase block mb-1">LOCAL_SYNC</span>
            <div className="flex items-center gap-2 justify-end text-white">
              <Globe size={14} className="text-zinc-500" />
              <span className="text-xl font-black italic uppercase">{currentTimezone}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-px h-full bg-zinc-900 md:left-12" />

          <div className="flex flex-col">
            {events.map((event) => {
              const isCompleted = event.details?.status === 'Completed'

              return (
                <div
                  key={event.id}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onEventSelect?.(event)}
                  className="group relative pl-12 md:pl-32 py-12 border-b border-zinc-900 last:border-b-0 cursor-pointer overflow-hidden transition-colors"
                >
                  <div
                    className={cn(
                      "absolute left-[-4px] md:left-[44px] top-1/2 -translate-y-1/2 size-2 rotate-45 transition-all duration-500 z-10",
                      isCompleted ? "bg-zinc-800" : "bg-white animate-pulse"
                    )}
                    style={{ backgroundColor: hoveredId === event.id ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="lg:col-span-2 space-y-1">
                      <span className="text-[10px] font-mono font-bold block" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                        R_{event.basics?.identifiers?.round || '00'}
                      </span>
                      <div className="text-2xl font-black italic text-white uppercase leading-none">
                        {event.traits?.chronology?.start
                          ? new Date(event.traits.chronology.start).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
                          : 'TBD'}
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-2">
                      <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                          {event.basics?.identifiers?.code || 'UNK_LOC'}
                        </span>
                        {isCompleted && <CheckCircle2 size={10} className="text-zinc-600" />}
                      </div>
                      <h3
                        className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter transition-colors"
                        style={{ color: hoveredId === event.id ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                      >
                        {event.name}
                      </h3>
                    </div>

                    <div className="hidden lg:block lg:col-span-3">
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: hoveredId === event.id ? 1 : 0.4, x: hoveredId === event.id ? 0 : -10 }}
                        className="text-[10px] font-bold text-zinc-500 uppercase italic leading-relaxed"
                      >
                        {event.basics?.tagline || event.basics?.description}
                      </motion.p>
                    </div>

                    <div className="lg:col-span-2 flex justify-end">
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <span className="text-[8px] font-black text-zinc-800 block uppercase tracking-widest">STATUS</span>
                          <span className="text-xs font-black italic text-zinc-500 uppercase">
                            {event.details?.status || 'PROVISIONAL'}
                          </span>
                        </div>
                        <Link
                          href={`/pursuit`}
                          className="p-4 border border-zinc-900 transition-all duration-300"
                          style={{ borderColor: hoveredId === event.id ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowUpRight size={20} className={cn(
                            "transition-all",
                            hoveredId === event.id ? "text-white translate-x-1 -translate-y-1" : "text-zinc-800"
                          )} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredId === event.id ? '0%' : '-100%' }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-zinc-950/50 -z-0 pointer-events-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)' }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-24 p-12 border border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-12 bg-zinc-950/30 relative overflow-hidden group/footer">
          <div className="flex items-center gap-8 relative z-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-1">SEASON</span>
              <span className="text-4xl font-black italic text-white uppercase">2026 CALENDAR</span>
            </div>
          </div>

          <Link
            href="/pursuit"
            className="flex items-center gap-4 relative z-10 group"
          >
            <Timer
              size={20}
              style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
              className="group-hover:rotate-45 transition-transform"
            />
            <span className="text-xl font-mono text-white uppercase tracking-tighter group-hover:opacity-70 transition-opacity">
              VIEW FULL SCHEDULE
            </span>
          </Link>

          <div
            className="absolute right-0 top-0 w-24 h-full skew-x-[-20deg] translate-x-12 opacity-0 group-hover/footer:opacity-5 transition-opacity"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
          />
        </div>
      </div>
    </section>
  )
}