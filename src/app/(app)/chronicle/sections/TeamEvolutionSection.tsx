'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import React, { useRef } from 'react'

export interface Series {
  id: number
  name: string
  basics?: { code?: string; tagline?: string; description?: string }
  details?: { status?: string }
  metrics?: { counts?: { seasons?: number } }
  assets: { logo: string; cover?: string }
}

export interface Season {
  id: number
  name: string
  seriesId: number
  basics?: { code?: string; description?: string }
  metrics?: { counts?: { entries?: number; events?: number } }
  assets?: { cover?: string }
}

export interface Car {
  id: number
  name: string
  basics?: { chassis?: string; model?: string; version?: string; code?: string; description?: string }
  details?: { status?: string }
  assets: { thumbnail: string; cover?: string }
}

interface EvolutionData {
  series: Series
  seasons: (Season & { cars: Car[] })[]
}

export default function TeamEvolutionSection({ data = DUMMY_EVOLUTION }: { data?: EvolutionData[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black py-32 px-12 md:px-24 overflow-hidden border-t border-zinc-900"
    >
      <div className="relative z-10 mb-48">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-10" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700">
            ENGINEERING_LINEAGE
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-[0.8]">
          TEAM_EVOLUTION
        </h2>
      </div>

      <div className="relative space-y-64">
        {data.map((branch, idx) => (
          <SeriesBlock key={branch.series.id} branch={branch} />
        ))}
      </div>
    </section>
  )
}

function SeriesBlock({ branch }: { branch: EvolutionData }) {
  const { series, seasons } = branch

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start mb-40">
        <div className="lg:col-span-5 space-y-12">
          <div className="flex items-center gap-6">
            <span className="text-[7px] font-mono text-zinc-800 tracking-widest uppercase">ID://{series.basics?.code}</span>
            <div className="h-px flex-1 bg-zinc-900" />
            <span className="text-[8px] font-black text-white px-3 py-1 bg-zinc-900 uppercase italic">
              {series.details?.status}
            </span>
          </div>

          <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">
            {series.name}
          </h3>

          <p className="text-[11px] font-bold text-zinc-600 uppercase italic leading-relaxed max-w-md border-l border-zinc-900 pl-8 tracking-wide">
            {series.basics?.description}
          </p>

          <div className="grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
            <Stat label="TOTAL_SEASONS" value={series.metrics?.counts?.seasons?.toString()} />
            <Stat label="CLASSIFICATION" value="PRO_ELITE" />
          </div>
        </div>

        <div className="lg:col-span-7 relative aspect-[21/9] bg-zinc-950 border border-zinc-900 overflow-hidden">
          <Image
            src={series.assets.cover || ''}
            alt=""
            fill
            className="object-cover opacity-30 grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative pl-12 md:pl-24 space-y-48">
        <div className="absolute left-0 md:left-12 top-0 bottom-0 w-px bg-zinc-900" />

        {seasons.map((season) => (
          <SeasonNode key={season.id} season={season} />
        ))}
      </div>
    </div>
  )
}

function SeasonNode({ season }: { season: Season & { cars: Car[] } }) {
  return (
    <div className="relative">
      <div className="absolute -left-12 md:-left-[52px] top-2 size-1.5 bg-black border-2 border-white rounded-full z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-8">
          <div>
            <span className="text-[7px] font-black text-zinc-800 block mb-3 tracking-[0.4em] uppercase">SEASON_REF</span>
            <h4 className="text-2xl font-black italic text-zinc-300 uppercase tracking-tighter">
              {season.name}
            </h4>
          </div>

          <p className="text-[10px] font-bold text-zinc-600 uppercase leading-relaxed italic tracking-wide">
            {season.basics?.description}
          </p>

          <div className="flex gap-12 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">ENTRIES</span>
              <span className="text-xl font-black text-white italic tracking-tighter">{season.metrics?.counts?.entries}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">EVENTS</span>
              <span className="text-xl font-black text-white italic tracking-tighter">{season.metrics?.counts?.events}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {season.cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CarCard({ car }: { car: Car }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-zinc-950 border border-zinc-900 p-1 flex flex-col group transition-colors hover:border-zinc-700"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <Image
          src={car.assets.thumbnail}
          alt=""
          fill
          className="object-cover opacity-40 grayscale group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
          <span className="text-[7px] font-black text-white bg-black px-2 py-0.5 tracking-widest">{car.basics?.chassis}</span>
          <span className="text-[7px] font-black text-black px-2 py-0.5 tracking-widest" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>VER_{car.basics?.version}</span>
        </div>
      </div>

      <div className="p-8">
        <h5 className="text-lg font-black italic text-white uppercase tracking-tighter mb-3 group-hover:text-white transition-colors">
          {car.name}
        </h5>
        <p className="text-[9px] font-bold text-zinc-600 uppercase italic line-clamp-2 tracking-wide leading-relaxed">
          {car.basics?.description}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-zinc-900 pt-6">
          <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.3em]">{car.details?.status}</span>
          <ChevronRight size={12} className="text-zinc-800 group-hover:text-white transition-all transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string, value?: string }) {
  return (
    <div className="bg-zinc-950 p-8">
      <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.3em] block mb-2">{label}</span>
      <span className="text-base font-black italic text-zinc-300 uppercase tracking-tight">{value || '---'}</span>
    </div>
  )
}

const DUMMY_EVOLUTION: EvolutionData[] = [
  {
    series: {
      id: 1,
      name: "DESERT_OFFROAD_SERIES",
      basics: { code: "DOS_X", description: "THE PREMIER ENDURANCE SERIES TESTING STRUCTURAL INTEGRITY AND THERMAL MANAGEMENT IN EXTREME SAND ENVIRONMENTS.", tagline: "ENDURE THE VOID." },
      details: { status: "ACTIVE" },
      metrics: { counts: { seasons: 4 } },
      assets: { logo: "", cover: "https://picsum.photos/seed/desert/1200/600" }
    },
    seasons: [
      {
        id: 101,
        name: "SEASON_2025_PROTO",
        seriesId: 1,
        basics: { description: "INAUGURAL VALIDATION SEASON FOR THE ALPHA CHASSIS ARCHITECTURE." },
        metrics: { counts: { entries: 12, events: 8 } },
        cars: [
          {
            id: 201,
            name: "VORTEX_A1",
            basics: { chassis: "AF-01", version: "1.0", description: "FIRST GENERATION WIDE-TRACK PROTOTYPE WITH DUAL-STAGE COOLING." },
            details: { status: "RETIRED" },
            assets: { thumbnail: "https://picsum.photos/seed/car1/800/450" }
          },
          {
            id: 202,
            name: "VORTEX_A1_EVO",
            basics: { chassis: "AF-01B", version: "1.2", description: "REVISED AERO PACKAGE WITH HIGH-DOWNFORCE REAR ASSEMBLY." },
            details: { status: "MUSEUM" },
            assets: { thumbnail: "https://picsum.photos/seed/car2/800/450" }
          }
        ]
      }
    ]
  }
]