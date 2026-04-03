'use client'

import { CheckeredBackground } from '@/components/Custom/ui/CheckeredBackground'
import { DESIGN_SYSTEM } from '@/lib/constants'
import {
  Trophy,
  Flag,
  Gauge,
  Timer,
  ArrowRight,
  Database,
  Cpu,
  Activity,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Settings,
  Shield,
  Box
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import React, { useRef, useState } from 'react'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white pt-24 pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <CheckeredBackground mode="vertical" speed={0.05} opacity={0.05} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* SECTION 11: VERTICAL TEXT STACK */}
        <section className="h-screen flex items-center justify-between mb-40 border-b border-zinc-900">
          <div className="w-1/2">
            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.6em] mb-8 block">SYSTEM_ARCHITECTURE</span>
            <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-12">
              MODULAR<br />INFRASTRUCTURE
            </h2>
            <div className="space-y-6 max-w-sm">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-loose">
                THE AF MOTORSPORT ECOSYSTEM IS BUILT ON INDEPENDENT NODES. EACH CIRCUIT OPERATION RUNS ITS OWN COMPUTE LAYER.
              </p>
              <div className="h-1 w-24 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            </div>
          </div>
          <div className="w-px h-full bg-zinc-900" />
          <div className="w-1/3 flex flex-col gap-12 text-right">
            <VerticalStat label="NODES" value="03" />
            <VerticalStat label="UPTIME" value="99.9%" />
            <VerticalStat label="LATENCY" value="<2MS" />
          </div>
        </section>

        {/* SECTION 12: HORIZONTAL CAROUSEL (ASSET SLIDER) */}
        <section className="mb-40">
          <AssetCarousel />
        </section>

        {/* SECTION 13: PARALLAX FEATURE SPLIT */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square bg-zinc-950 border border-zinc-900">
            <div className="absolute inset-10 border border-zinc-800 flex items-center justify-center">
              <Box size={80} className="text-zinc-900" />
            </div>
            <div className="absolute -bottom-4 -right-4 p-8 bg-primary text-black font-black italic uppercase text-xs" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              CHASSIS_SYNC
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-4xl font-black italic uppercase tracking-tighter">PORSCHE_992_ENGINEERING</h3>
            <div className="space-y-12">
              <FeatureItem icon={<Settings size={16} />} title="SUSPENSION_GEOMETRY" desc="ADJUSTABLE MULTI-LINK SETUP TUNED PER CIRCUIT TOPOLOGY." />
              <FeatureItem icon={<Zap size={16} />} title="ELECTRONIC_SHIFT" desc="PADDLE-SHIFT SEQUENTIAL 6-SPEED TRANSMISSION PROTOCOL." />
              <FeatureItem icon={<Shield size={16} />} title="CELL_INTEGRITY" desc="FIA-SPEC ROLL CAGE INTEGRATED INTO THE MONOCOQUE FRAME." />
            </div>
          </div>
        </section>

        {/* SECTION 14: FULL-WIDTH TELEMETRY MONITOR */}
        <section className="mb-40 p-12 bg-zinc-950 border border-zinc-900 relative">
          <div className="flex justify-between items-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>LIVE_TELEMETRY_DASH</span>
            <div className="flex gap-2">
              <div className="size-1 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase">FEED_ACTIVE</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <LiveMetric label="BRAKE_TEMP" value="420°C" />
            <LiveMetric label="TIRE_PSI" value="2.1" />
            <LiveMetric label="G_FORCE" value="2.4" />
            <LiveMetric label="RPM" value="8200" />
            <LiveMetric label="FUEL_LVL" value="45L" />
            <LiveMetric label="LAP_DELTA" value="-0.12" />
          </div>
        </section>

        {/* SECTION 15: THE "DARKROOM" SCROLL GATING */}
        <section className="mb-40 py-40 border-y border-zinc-900 flex flex-col items-center">
          <div className="max-w-3xl text-center space-y-12">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-zinc-900 hover:text-white transition-colors duration-700">
              DECENTRALIZED EXECUTION.
            </h2>
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.5em] leading-loose">
              NO CENTRAL SERVER. NO SHARED DATA. TOTAL AUTONOMY.
            </p>
          </div>
        </section>

        {/* SECTION 16: CIRCUIT TOPOGRAPHY LIST */}
        <section className="mb-40">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-12 flex items-center gap-4">
            <Activity size={18} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            MAP_RECONNAISSANCE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
            <MapRow id="01" city="PORTIMÃO" length="4.653 KM" turns="15" />
            <MapRow id="02" city="BARCELONA" length="4.675 KM" turns="16" />
            <MapRow id="03" city="ESTORIL" length="4.182 KM" turns="13" />
            <MapRow id="04" city="JERÉZ" length="4.428 KM" turns="13" />
          </div>
        </section>

        {/* SECTION 17: PARTNER GRID (VELOSO MS TECH) */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
          <div className="lg:col-span-4 bg-black p-12">
            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-4 block">CORE_PARTNER</span>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8">VELOSO<br />MOTORSPORT</h3>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-loose">
              LOGISTICAL AND MECHANICAL ORCHESTRATION FOR THE 2026 PSC IBÉRICA CHAMPIONSHIP.
            </p>
          </div>
          <div className="lg:col-span-8 bg-zinc-950 p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <PartnerStat label="TEAM_SINCE" value="2024" />
            <PartnerStat label="CHAMPIONSHIPS" value="12" />
            <PartnerStat label="TECH_LEVEL" value="L4" />
            <PartnerStat label="OPS_NODE" value="PT" />
          </div>
        </section>

        {/* SECTION 18: SYSTEM DIRECTORY (CMS LINKS) */}
        <section className="mb-40">
          <div className="border-t border-zinc-900">
            <DirLink label="PROJECT_ARCHIVE" id="ARC_001" />
            <DirLink label="TELEMETRY_LOGS" id="TEL_882" />
            <DirLink label="HARDWARE_SPECS" id="HW_Z440" />
            <DirLink label="CIRCUIT_STATUS" id="MAP_ACTIVE" />
          </div>
        </section>

        {/* SECTION 19: OVERSIZED BRAND ELEMENT */}
        <section className="mb-40 overflow-hidden py-20 relative">
          <div className="text-[25vw] font-black italic uppercase tracking-tighter text-zinc-950 select-none whitespace-nowrap -ml-20">
            MOTORSPORT
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">AF_2026</h2>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Sovereign Node</span>
          </div>
        </section>

        {/* SECTION 20: TERMINAL TERMINATION */}
        <section>
          <div
            className="w-full bg-primary p-16 text-black flex flex-col md:flex-row items-center justify-between group cursor-pointer overflow-hidden relative"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}
          >
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">READY FOR DEPLOYMENT</span>
              <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none text-black">START_ENGINE</h2>
            </div>
            <div className="size-24 bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
              <ArrowRight size={40} className="-rotate-45" />
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-black italic text-black/10 uppercase whitespace-nowrap pointer-events-none select-none">
              PUSH PUSH PUSH
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

function AssetCarousel() {
  const [index, setIndex] = useState(0)
  const assets = [
    { label: "FRONT_FACIA", ref: "AERO_01" },
    { label: "COCKPIT_SHELL", ref: "INT_02" },
    { label: "REAR_DIFFUSER", ref: "EXT_03" }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter">COMPONENT_LIBRARY</h3>
        <div className="flex gap-4">
          <button onClick={() => setIndex(i => (i > 0 ? i - 1 : assets.length - 1))} className="size-10 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => setIndex(i => (i < assets.length - 1 ? i + 1 : 0))} className="size-10 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="aspect-[21/9] bg-zinc-950 border border-zinc-900 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-all" />
        <span className="text-[10vw] font-black italic text-zinc-900/50 uppercase select-none">{assets[index].label}</span>
        <div className="absolute bottom-8 left-8 flex items-center gap-4">
          <span className="text-[10px] font-mono text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>REF_{assets[index].ref}</span>
          <div className="h-px w-12 bg-zinc-800" />
        </div>
      </div>
    </div>
  )
}

function VerticalStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>
      <span className="block text-5xl font-black italic text-white uppercase">{value}</span>
    </div>
  )
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="size-10 bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-primary transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-black uppercase text-white tracking-widest">{title}</h4>
        <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function LiveMetric({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1 border-l border-zinc-900 pl-4 hover:border-primary transition-colors" style={{ borderLeftColor: 'inherit' }}>
      <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>
      <span className="block text-xl font-black italic text-white">{value}</span>
    </div>
  )
}

function MapRow({ id, city, length, turns }: { id: string, city: string, length: string, turns: string }) {
  return (
    <div className="bg-black p-8 flex items-center justify-between hover:bg-zinc-950 transition-colors group">
      <div className="flex items-center gap-6">
        <span className="text-[10px] font-mono text-zinc-800 group-hover:text-primary transition-colors" style={{ color: 'inherit' }}>{id}</span>
        <span className="text-xl font-black italic uppercase text-white">{city}</span>
      </div>
      <div className="flex gap-8 text-right">
        <div className="flex flex-col">
          <span className="text-[7px] font-black text-zinc-700 uppercase">LENGTH</span>
          <span className="text-[9px] font-black text-zinc-400">{length}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7px] font-black text-zinc-700 uppercase">TURNS</span>
          <span className="text-[9px] font-black text-zinc-400">{turns}</span>
        </div>
      </div>
    </div>
  )
}

function PartnerStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">{label}</span>
      <span className="block text-2xl font-black italic text-white">{value}</span>
    </div>
  )
}

function DirLink({ label, id }: { label: string, id: string }) {
  return (
    <div className="flex items-center justify-between py-8 border-b border-zinc-900 hover:bg-zinc-950 transition-all px-4 group cursor-pointer">
      <div className="flex items-center gap-8">
        <span className="text-[10px] font-mono text-zinc-800">{id}</span>
        <h3 className="text-2xl font-black italic uppercase text-zinc-500 group-hover:text-white transition-colors">{label}</h3>
      </div>
      <ArrowRight size={20} className="text-zinc-900 group-hover:text-primary transition-all" style={{ color: 'inherit' }} />
    </div>
  )
}