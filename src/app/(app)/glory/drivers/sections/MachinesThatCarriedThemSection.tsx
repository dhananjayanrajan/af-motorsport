'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { ArrowRight, Cpu, ExternalLink, Hash, Info, Layers, Zap } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import { useRef, useState } from 'react'

export interface Car {
  id: number;
  name: string;
  slug?: string;
  basics?: {
    identifiers?: {
      chassis?: string | null;
      model?: string | null;
      code?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
  };
  details?: {
    status?: ('Active' | 'Retired' | 'Development' | 'Museum' | 'Prototype' | 'Concept') | null;
  };
  assets: {
    thumbnail: string;
  };
  updatedAt: string;
}

const DUMMY_CARS: Car[] = [
  {
    id: 1,
    name: "F3-AX JUNIOR",
    slug: "f3-ax-junior",
    basics: {
      identifiers: { model: "F3-AX", code: "2006-09", chassis: "CH-001" },
      tagline: "The Foundation of Speed",
      description: "Initial competitive platform engineered for high-downforce mechanical grip and driver feedback."
    },
    details: { status: "Retired" },
    assets: { thumbnail: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800" },
    updatedAt: "2026-03-05"
  },
  {
    id: 2,
    name: "RB-06 ORIGIN",
    slug: "rb-06-origin",
    basics: {
      identifiers: { model: "RB-06", code: "2010-12", chassis: "CH-042" },
      tagline: "Aerodynamic Perfection",
      description: "A masterclass in carbon monocoque construction, delivering 820 HP via a V8 2.4L power unit."
    },
    details: { status: "Retired" },
    assets: { thumbnail: "https://images.unsplash.com/photo-1594739394171-8935c754670b?q=80&w=800" },
    updatedAt: "2026-03-05"
  },
  {
    id: 3,
    name: "STR-08 VELOCITY",
    slug: "str-08-velocity",
    basics: {
      identifiers: { model: "STR-08", code: "2013-15", chassis: "CH-088" },
      tagline: "Hybrid Era Dawn",
      description: "First generation V6 Turbo Hybrid integration with E-Boost energy recovery systems."
    },
    details: { status: "Museum" },
    assets: { thumbnail: "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?q=80&w=800" },
    updatedAt: "2026-03-05"
  },
  {
    id: 4,
    name: "W-11 ULTIMA",
    slug: "w-11-ultima",
    basics: {
      identifiers: { model: "W-11", code: "2016-20", chassis: "CH-110" },
      tagline: "Unrivaled Dominance",
      description: "The peak of thermal unit efficiency, producing over 1000 HP with active aero components."
    },
    details: { status: "Retired" },
    assets: { thumbnail: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800" },
    updatedAt: "2026-03-05"
  },
  {
    id: 5,
    name: "XE-24 PROTOTYPE",
    slug: "xe-24-prototype",
    basics: {
      identifiers: { model: "XE-24", code: "2024-01", chassis: "PX-991" },
      tagline: "Next-Gen Propulsion",
      description: "Full electric drivetrain testing bed for future endurance championship regulations."
    },
    details: { status: "Development" },
    assets: { thumbnail: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800" },
    updatedAt: "2026-03-05"
  }
]

export function MachinesThatCarriedThemSection({ data = DUMMY_CARS }: { data?: Car[] }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const [activeToggle, setActiveToggle] = useState<Record<number, 'simple' | 'advanced'>>(
    data.reduce((acc, car) => ({ ...acc, [car.id]: 'simple' }), {})
  )

  const x = useTransform(scrollYProgress, [0.1, 0.95], ['0%', '-75%'])
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <section ref={targetRef} className="relative h-[800vh]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.05], [0, -20])
          }}
          className="relative text-center"
        >
          <div className="flex justify-center items-center pb-10">
            <Layers className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className={cn("text-[9px] font-black text-zinc-600 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Grid_Sequence</span>
          </div>
          <h2 className="text-7xl md:text-[9rem] font-black italic text-white tracking-tighter uppercase leading-[0.8] z-0">
            MACHINES<br />
            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>EVOLVED</span>
          </h2>
        </motion.div>

        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.05, 0.1], [0, 1]),
            scale: useTransform(scrollYProgress, [0.05, 0.1], [0.98, 1])
          }}
          className="absolute inset-0 flex flex-col justify-end pb-32 z-1"
        >
          <div className="relative w-full">
            <motion.div style={{ x: springX }} className="flex pl-[20vw] items-end">
              {data.map((car) => (
                <div key={car.id} className="relative flex-shrink-0 group">

                  <div
                    className="relative w-[420px] border transition-colors duration-500 group-hover:border-zinc-700"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}
                  >

                    <div className="flex border-b" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                      <div className="p-4 border-r flex flex-col justify-center items-center" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.ZINC_950}80`, borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                        <Hash className="size-3 mb-2" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[10px] font-black text-white italic origin-center -rotate-90">0{car.id}</span>
                      </div>

                      <div className="flex-1 p-6 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none italic">
                            {car.basics?.identifiers?.model}
                          </h3>
                          <div className="flex border p-0.5" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                            {(['simple', 'advanced'] as const).map((mode) => (
                              <button
                                key={mode}
                                onClick={() => setActiveToggle(prev => ({ ...prev, [car.id]: mode }))}
                                className={cn(
                                  "text-[7px] px-2 py-0.5 font-black uppercase transition-all",
                                  activeToggle[car.id] === mode ? "bg-white text-black" : "text-zinc-600 hover:text-zinc-300"
                                )}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className={cn("text-zinc-500 font-mono text-[9px] uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>{car.basics?.tagline}</p>
                      </div>
                    </div>

                    <div className="relative h-56 w-full overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }}>
                      <img
                        src={car.assets.thumbnail}
                        alt={car.name}
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-1 z-20">
                        <Link
                          href={`/cars/${car.slug}`}
                          className="backdrop-blur-md text-white p-2 border border-white/10 transition-colors"
                          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                        <button
                          className="backdrop-blur-md text-white p-2 border border-white/10 hover:bg-zinc-700 transition-colors"
                          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                        >
                          <Info className="size-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                    </div>

                    <div className="p-6 h-[160px] border-t bg-zinc-950/20" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                      {activeToggle[car.id] === 'simple' ? (
                        <div className="space-y-4 animate-in fade-in duration-500">
                          <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                              <span className={cn("text-[7px] font-black text-zinc-700 uppercase mb-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Status_Core</span>
                              <div className="flex items-center gap-2">
                                <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-white font-mono text-[10px] font-bold uppercase italic">{car.details?.status}</span>
                              </div>
                            </div>
                            <div className="h-8 w-[1px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_800 }} />
                            <div className="flex flex-col">
                              <span className={cn("text-[7px] font-black text-zinc-700 uppercase mb-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Registry_Code</span>
                              <span className="text-white font-mono text-[10px] font-bold">{car.basics?.identifiers?.code}</span>
                            </div>
                          </div>
                          <p className="text-zinc-500 text-[12px] leading-relaxed italic line-clamp-3">
                            {car.basics?.description}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-px bg-zinc-900/50 animate-in slide-in-from-bottom-2 duration-300">
                          {[
                            { l: "Chassis", v: car.basics?.identifiers?.chassis },
                            { l: "Protocol", v: "X-GRID.v2" },
                            { l: "Engine", v: "V8_HYBRID" },
                            { l: "Sync_ID", v: `REF-${car.id}00` }
                          ].map((item, i) => (
                            <div key={i} className="p-3 flex flex-col gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}>
                              <span className={cn("text-[7px] text-zinc-700 font-black uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>{item.l}</span>
                              <span className="text-[10px] text-zinc-300 font-mono italic font-bold truncate">{item.v}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/cars/${car.slug}`}
                      className="group/btn w-full py-4 flex items-center justify-between px-6 border-t transition-all duration-300"
                      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY;
                        e.currentTarget.querySelector('span')!.style.color = 'white';
                        e.currentTarget.querySelector('svg')!.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_950;
                        e.currentTarget.querySelector('span')!.style.color = '';
                        e.currentTarget.querySelector('svg')!.style.color = '';
                      }}
                    >
                      <span className={cn("text-[10px] font-black uppercase text-zinc-600 transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
                        Access_System_Core
                      </span>
                      <ArrowRight className="size-4 text-zinc-800 transition-all group-hover/btn:translate-x-1" />
                    </Link>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between z-30 pointer-events-none">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className={cn("text-zinc-800 font-mono text-[8px] uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL)}>Grid_Stabilizer_v20.4</span>
                <div className="w-96 h-[1px] mt-2 relative" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                  <motion.div
                    style={{ scaleX: scrollYProgress, backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                    className="absolute inset-0 origin-left"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-zinc-900">
              <Zap className="size-4 fill-current" />
              <Cpu className="size-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}