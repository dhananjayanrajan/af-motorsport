'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import {
  ArrowRight,
  Activity,
  Zap,
  ChevronLeft,
  ChevronRight,
  Settings,
  Shield,
  Box,
  FastForward,
  Cpu,
  Globe,
  Users,
  Trophy,
  Layers,
  Terminal,
  Database,
  Network
} from 'lucide-react'
import React, { useState } from 'react'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-primary selection:text-black font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10">
        <section className="h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Est. 2024</span>
            </div>
            <h1 className="text-[15vw] md:text-[10vw] font-black italic uppercase leading-[0.8] tracking-tighter">
              BEYOND<br />LIMITS.
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <p className="text-sm md:text-base font-bold text-zinc-400 uppercase tracking-widest leading-relaxed max-w-md">
                AF MOTORSPORT IS NOT JUST A RACING TEAM. WE ARE A HIGH-PERFORMANCE COMPUTING NODE ARCHITECTED FOR THE PSC IBÉRICA CHAMPIONSHIP.
              </p>
              <div className="flex flex-col justify-end items-start md:items-end gap-2">
                <span className="text-[8px] font-mono text-zinc-600 uppercase">SYSTEM_STATUS</span>
                <div className="flex items-center gap-2 text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-tighter italic">Operational_v2.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center py-40 border-y border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.6em] mb-8 block">SYSTEM_ARCHITECTURE</span>
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-12">
                MODULAR<br />INFRA
              </h2>
              <div className="space-y-6 max-w-sm">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-loose">
                  THE AF MOTORSPORT ECOSYSTEM IS BUILT ON INDEPENDENT NODES. EACH CIRCUIT OPERATION RUNS ITS OWN COMPUTE LAYER.
                </p>
                <div className="h-1 w-24 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-16 lg:pl-24 border-l border-zinc-900">
              <VerticalStat label="NODES" value="03" />
              <VerticalStat label="UPTIME" value="99.9%" />
              <VerticalStat label="LATENCY" value="<2MS" />
            </div>
          </div>
        </section>

        <section className="py-40 max-w-7xl mx-auto px-6 md:px-12">
          <AssetCarousel />
        </section>

        <section className="py-40 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <CoreValueItem
              icon={<Cpu size={24} />}
              title="DATA_CENTRIC"
              desc="WE TREAT EVERY MILLISECOND AS A DATA POINT. PERFORMANCE IS ANALYZED, NOT GUESSED."
            />
            <CoreValueItem
              icon={<Globe size={24} />}
              title="GLOBAL_SYNC"
              desc="REAL-TIME TELEMETRY STREAMED TO OUR REMOTE ENGINEERING HUB FOR INSTANT CALIBRATION."
            />
            <CoreValueItem
              icon={<Users size={24} />}
              title="HUMAN_INTERFACE"
              desc="OUR DRIVERS ARE THE FINAL ACTUATORS IN A COMPLEX SYSTEM OF MECHANICAL PRECISION."
            />
          </div>
        </section>

        <section className="py-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative aspect-square bg-zinc-950 border border-zinc-900 group overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-10 border border-zinc-800 flex items-center justify-center">
              <Box size={120} className="text-zinc-900 group-hover:text-primary transition-colors duration-500" />
            </div>
            <div className="absolute -bottom-4 -right-4 p-10 bg-primary text-black font-black italic uppercase text-sm transform transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              CHASSIS_SYNC
            </div>
          </div>
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-5xl font-black italic uppercase tracking-tighter">PORSCHE_992</h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Precision engineered for the 2026 Season.</p>
            </div>
            <div className="space-y-12">
              <FeatureItem icon={<Settings size={18} />} title="SUSPENSION_GEOMETRY" desc="ADJUSTABLE MULTI-LINK SETUP TUNED PER CIRCUIT TOPOLOGY." />
              <FeatureItem icon={<Zap size={18} />} title="ELECTRONIC_SHIFT" desc="PADDLE-SHIFT SEQUENTIAL 6-SPEED TRANSMISSION PROTOCOL." />
              <FeatureItem icon={<Shield size={18} />} title="CELL_INTEGRITY" desc="FIA-SPEC ROLL CAGE INTEGRATED INTO THE MONOCOQUE FRAME." />
            </div>
          </div>
        </section>

        <section className="py-20 bg-zinc-950 border-y border-zinc-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>LIVE_TELEMETRY_DASH</span>
                <span className="text-[8px] font-mono text-zinc-600 uppercase">PROTOCOL_v4.2.0</span>
              </div>
              <div className="flex items-center gap-3 bg-black border border-zinc-800 px-4 py-2">
                <div className="size-1.5 bg-red-600 rounded-full animate-pulse" />
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-tighter">ENCRYPTED_FEED_ACTIVE</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-900 border border-zinc-900">
              <LiveMetric label="BRAKE_TEMP" value="420°C" />
              <LiveMetric label="TIRE_PSI" value="2.1" />
              <LiveMetric label="G_FORCE" value="2.4" />
              <LiveMetric label="RPM" value="8200" />
              <LiveMetric label="FUEL_LVL" value="45L" />
              <LiveMetric label="LAP_DELTA" value="-0.12" />
            </div>
          </div>
        </section>

        <section className="py-40 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-4">
              <Activity size={24} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              MAP_RECON
            </h2>
            <span className="text-[8px] font-mono text-zinc-600 uppercase mb-2">SCENARIO_LOADED_04</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MapRow id="01" city="PORTIMÃO" length="4.653 KM" turns="15" />
            <MapRow id="02" city="BARCELONA" length="4.675 KM" turns="16" />
            <MapRow id="03" city="ESTORIL" length="4.182 KM" turns="13" />
            <MapRow id="04" city="JERÉZ" length="4.428 KM" turns="13" />
          </div>
        </section>

        <section className="py-40 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <StatCard icon={<Trophy size={20} />} label="TITLES" value="12" />
            <StatCard icon={<Network size={20} />} label="DATA_NODES" value="08" />
            <StatCard icon={<Database size={20} />} label="LOG_FILES" value="4.2TB" />
            <StatCard icon={<Terminal size={20} />} label="SCRIPTS" value="124" />
          </div>
        </section>

        <section className="py-40 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900">
            <div className="lg:col-span-5 bg-black p-16 flex flex-col justify-between">
              <div>
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-6 block">CORE_PARTNER</span>
                <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">VELOSO<br />MOTORSPORT</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-loose max-w-xs">
                  LOGISTICAL AND MECHANICAL ORCHESTRATION FOR THE 2026 PSC IBÉRICA CHAMPIONSHIP.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="size-12 bg-primary flex items-center justify-center text-black" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                  <FastForward size={24} />
                </div>
                <span className="text-[10px] font-black uppercase italic">Advanced Ops</span>
              </div>
            </div>
            <div className="lg:col-span-7 bg-black p-16 grid grid-cols-1 sm:grid-cols-2 gap-16">
              <PartnerStat label="TEAM_SINCE" value="2024" />
              <PartnerStat label="CHAMPIONSHIPS" value="12" />
              <PartnerStat label="TECH_LEVEL" value="L4" />
              <PartnerStat label="OPS_NODE" value="PT" />
            </div>
          </div>
        </section>

        <section className="py-40 max-w-5xl mx-auto px-6">
          <div className="space-y-px bg-zinc-900 border border-zinc-900">
            <DirLink label="PROJECT_ARCHIVE" id="ARC_001" />
            <DirLink label="TELEMETRY_LOGS" id="TEL_882" />
            <DirLink label="HARDWARE_SPECS" id="HW_Z440" />
            <DirLink label="CIRCUIT_STATUS" id="MAP_ACTIVE" />
          </div>
        </section>

        <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
          <div
            className="w-full bg-primary p-20 text-black flex flex-col md:flex-row items-center justify-between group cursor-pointer overflow-hidden relative"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0 100%)' }}
          >
            <div className="relative z-10">
              <span className="text-[12px] font-black uppercase tracking-[0.8em] mb-6 block">READY FOR DEPLOYMENT</span>
              <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-black">START_ENGINE</h2>
            </div>
            <div className="size-32 bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-700 relative z-10 mt-12 md:mt-0">
              <ArrowRight size={48} />
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black italic text-black/5 uppercase whitespace-nowrap pointer-events-none select-none">
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
    { label: "FRONT_FACIA", ref: "AERO_01", desc: "Carbon fiber aerodynamics with high-downforce splitter." },
    { label: "COCKPIT_SHELL", ref: "INT_02", desc: "Reinforced composite safety cell with ergonomic integration." },
    { label: "REAR_DIFFUSER", ref: "EXT_03", desc: "Optimized airflow management for high-speed stability." }
  ]

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">MODULE_EXPLORER</span>
          <h3 className="text-4xl font-black italic uppercase tracking-tighter">COMPONENT_LIBRARY</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIndex(i => (i > 0 ? i - 1 : assets.length - 1))} className="size-14 border border-zinc-900 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setIndex(i => (i < assets.length - 1 ? i + 1 : 0))} className="size-14 border border-zinc-900 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="aspect-[21/9] bg-zinc-950 border border-zinc-900 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="text-center px-6 transition-all duration-500">
          <span className="text-[10vw] font-black italic text-zinc-900 uppercase select-none leading-none block mb-4">{assets[index].label}</span>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] max-w-md mx-auto">{assets[index].desc}</p>
        </div>
        <div className="absolute bottom-10 left-10 flex items-center gap-4">
          <span className="text-[10px] font-mono text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>REF_{assets[index].ref}</span>
          <div className="h-px w-24 bg-zinc-800" />
        </div>
      </div>
    </div>
  )
}

function VerticalStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="group cursor-default">
      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-2 block group-hover:text-primary transition-colors">{label}</span>
      <span className="block text-7xl font-black italic text-white uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{value}</span>
    </div>
  )
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-8 group">
      <div className="size-14 bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-primary group-hover:text-black transition-all duration-500 shrink-0">
        {icon}
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-black uppercase text-white tracking-widest group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-loose group-hover:text-zinc-400 transition-colors">{desc}</p>
      </div>
    </div>
  )
}

function LiveMetric({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-black p-10 flex flex-col gap-4 group hover:bg-zinc-950 transition-colors">
      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">{label}</span>
      <span className="block text-3xl font-black italic text-white group-hover:text-primary transition-colors">{value}</span>
    </div>
  )
}

function MapRow({ id, city, length, turns }: { id: string, city: string, length: string, turns: string }) {
  return (
    <div className="bg-zinc-950 p-10 flex items-center justify-between border border-zinc-900 hover:border-zinc-700 transition-all group cursor-pointer">
      <div className="flex items-center gap-10">
        <span className="text-xs font-mono text-zinc-700 group-hover:text-primary transition-colors">{id}</span>
        <span className="text-2xl font-black italic uppercase text-white tracking-tighter group-hover:translate-x-4 transition-transform duration-500">{city}</span>
      </div>
      <div className="hidden md:flex gap-16 text-right">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">LENGTH</span>
          <span className="text-xs font-black text-zinc-400">{length}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">TURNS</span>
          <span className="text-xs font-black text-zinc-400">{turns}</span>
        </div>
      </div>
    </div>
  )
}

function PartnerStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="border-l border-zinc-900 pl-8 space-y-2 py-4">
      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.4em]">{label}</span>
      <span className="block text-5xl font-black italic text-white tracking-tighter">{value}</span>
    </div>
  )
}

function DirLink({ label, id }: { label: string, id: string }) {
  return (
    <div className="flex items-center justify-between p-12 bg-black hover:bg-zinc-950 transition-all group cursor-pointer overflow-hidden relative">
      <div className="flex items-center gap-12 relative z-10">
        <span className="text-xs font-mono text-zinc-800 group-hover:text-primary transition-colors">{id}</span>
        <h3 className="text-3xl md:text-5xl font-black italic uppercase text-zinc-700 group-hover:text-white transition-all duration-500">{label}</h3>
      </div>
      <div className="relative z-10 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
        <ArrowRight size={32} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

function CoreValueItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-8 p-8 border border-zinc-900 group hover:bg-zinc-900/50 transition-all">
      <div className="text-zinc-500 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="space-y-4">
        <h4 className="text-2xl font-black italic uppercase tracking-tighter">{title}</h4>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-loose">
          {desc}
        </p>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col gap-6 items-center text-center p-10 bg-zinc-950 border border-zinc-900 group hover:border-zinc-700 transition-all">
      <div className="text-zinc-700 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>
        <span className="block text-4xl font-black italic text-white uppercase tracking-tighter">{value}</span>
      </div>
    </div>
  )
}