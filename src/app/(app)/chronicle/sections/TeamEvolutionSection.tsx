'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  ChevronRight,
  Cpu,
  Database,
  FastForward,
  Gauge,
  History,
  Layers,
  Settings2,
  Workflow
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
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
      className="relative w-full bg-black py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-r border-zinc-900/50 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-900 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-32">
        <div className="flex items-center gap-6 mb-4">
          <Workflow size={20} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
            ENGINEERING_LINEAGE_V4.0
          </span>
        </div>
        <h2 className="text-6xl md:text-9xl font-black italic text-white uppercase tracking-tighter leading-[0.8]">
          TEAM_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>EVOLUTION</span>
        </h2>
      </div>

      <div className="relative space-y-64">
        {data.map((branch, idx) => (
          <SeriesBlock key={branch.series.id} branch={branch} isLast={idx === data.length - 1} />
        ))}
      </div>
    </section>
  )
}

function SeriesBlock({ branch, isLast }: { branch: EvolutionData, isLast: boolean }) {
  const { series, seasons } = branch

  return (
    <div className="relative">
      {/* Series Header Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
        <div className="lg:col-span-5 sticky top-32">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-primary text-black text-[10px] font-black skew-x-[-15deg]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                {series.details?.status?.toUpperCase()}
              </div>
              <span className="font-mono text-xs text-zinc-700">ID://{series.basics?.code}</span>
            </div>

            <h3 className="text-5xl font-black italic text-white uppercase tracking-tighter">
              {series.name}
            </h3>

            <p className="text-zinc-500 text-sm font-bold uppercase leading-relaxed max-w-md border-l-2 pl-6 border-zinc-800">
              {series.basics?.description}
            </p>

            <div className="grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
              <Stat label="TOTAL_SEASONS" value={series.metrics?.counts?.seasons?.toString()} />
              <Stat label="CLASSIFICATION" value="PRO_ELITE" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative aspect-[21/9] bg-zinc-950 border border-zinc-900 overflow-hidden group">
          <Image
            src={series.assets.cover || ''}
            alt={series.name}
            fill
            className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>

      {/* Seasons Timeline */}
      <div className="relative pl-8 md:pl-24 space-y-48">
        {/* The Vertical Line Connector */}
        <div className="absolute left-0 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-zinc-800 to-transparent" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY + '20' }} />

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
      {/* Node Dot */}
      <div className="absolute -left-8 md:-left-[52px] top-0 size-1 bg-black border-4 border-primary box-content rounded-full z-10" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="text-[10px] font-black text-zinc-600 block mb-2 tracking-widest">SEASON_LOG</span>
          <h4 className="text-3xl font-black italic text-zinc-200 uppercase tracking-tighter mb-4">
            {season.name}
          </h4>
          <p className="text-xs font-mono text-zinc-500 uppercase leading-relaxed mb-8">
            {season.basics?.description}
          </p>

          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-zinc-800 uppercase">Entries</span>
              <span className="text-lg font-black text-white italic">{season.metrics?.counts?.entries}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-zinc-800 uppercase">Events</span>
              <span className="text-lg font-black text-white italic">{season.metrics?.counts?.events}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
      whileHover={{ y: -5 }}
      className="bg-zinc-950 border border-zinc-900 p-1 flex flex-col group"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <Image
          src={car.assets.thumbnail}
          alt={car.name}
          fill
          className="object-cover opacity-50 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <span className="text-[8px] font-black text-white bg-black/80 px-2 py-0.5 mb-1">{car.basics?.chassis}</span>
          <span className="text-[8px] font-black text-black px-2 py-0.5" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>V_{car.basics?.version}</span>
        </div>
      </div>

      <div className="p-6">
        <h5 className="text-lg font-black italic text-white uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">
          {car.name}
        </h5>
        <p className="text-[10px] font-bold text-zinc-600 uppercase italic line-clamp-2">
          {car.basics?.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-zinc-900 pt-4">
          <div className="flex items-center gap-2">
            <Settings2 size={12} className="text-zinc-800" />
            <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">{car.details?.status}</span>
          </div>
          <ChevronRight size={14} className="text-zinc-800 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string, value?: string }) {
  return (
    <div className="bg-zinc-950 p-6">
      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest block mb-1">{label}</span>
      <span className="text-sm font-black italic text-zinc-200 uppercase">{value || '---'}</span>
    </div>
  )
}

const DUMMY_EVOLUTION: EvolutionData[] = [
  {
    series: {
      id: 1,
      name: "DESERT_OFFROAD_SERIES",
      basics: { code: "DOS_X", description: "The premier endurance series testing structural integrity and thermal management in extreme sand environments.", tagline: "Endure the Void." },
      details: { status: "Active" },
      metrics: { counts: { seasons: 4 } },
      assets: { logo: "", cover: "https://images.unsplash.com/photo-1547744037-b80bdba1b6f0?q=80&w=1200" }
    },
    seasons: [
      {
        id: 101,
        name: "SEASON_2025_PROTO",
        seriesId: 1,
        basics: { description: "Inaugural validation season for the Alpha chassis architecture." },
        metrics: { counts: { entries: 12, events: 8 } },
        cars: [
          {
            id: 201,
            name: "VORTEX_A1",
            basics: { chassis: "AF-01", version: "1.0", description: "First generation wide-track prototype with dual-stage cooling." },
            details: { status: "Retired" },
            assets: { thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800" }
          },
          {
            id: 202,
            name: "VORTEX_A1_EVO",
            basics: { chassis: "AF-01B", version: "1.2", description: "Revised aero package with high-downforce rear assembly." },
            details: { status: "Museum" },
            assets: { thumbnail: "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&w=800" }
          }
        ]
      }
    ]
  },
  {
    series: {
      id: 2,
      name: "NEURAL_CIRCUIT_INTEL",
      basics: { code: "NCI_2", description: "Experimental series focusing on autonomous telemetry and predictive handling algorithms.", tagline: "Silicon over Sand." },
      details: { status: "Active" },
      metrics: { counts: { seasons: 2 } },
      assets: { logo: "", cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200" }
    },
    seasons: [
      {
        id: 102,
        name: "STAGGER_POINT_26",
        seriesId: 2,
        basics: { description: "Integration of Edge AI nodes into active suspension hardware." },
        metrics: { counts: { entries: 8, events: 5 } },
        cars: [
          {
            id: 203,
            name: "NODE_PILOT_X",
            basics: { chassis: "NX-26", version: "0.8", description: "Solid-state actuator testbed with integrated compute core." },
            details: { status: "Active" },
            assets: { thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" }
          }
        ]
      }
    ]
  }
]