'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import {
  Activity,
  Zap,
  ChevronLeft,
  ChevronRight,
  Settings,
  Shield,
  Target,
  Gauge,
  Terminal,
  Maximize2
} from 'lucide-react'
import React, { useState, useEffect } from 'react'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://picsum.photos/id/1070/1600/900')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10">
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-[1600px] mx-auto py-32">
          <WindowLoader title="INIT_DRIVER_DATA">
            <div className="p-10 md:p-20 space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-px w-16 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>CHAMPIONSHIP_ENTRY</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter">
                ANDRÉ FERNANDES<br />
                <span className="text-zinc-800">AF MOTORSPORT</span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-16 border-t border-zinc-900">
                <div className="lg:col-span-7">
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest leading-relaxed max-w-2xl">
                    AF MOTORSPORT IS THE COMPETITIVE MANIFESTATION OF ANDRÉ FERNANDES' VISION: A SYNERGY OF CORPORATE STRATEGY AND PURE MECHANICAL AGGRESSION. OPERATING IN THE PORSCHE SPRINT CHALLENGE IBÉRICA, WE TREAT EVERY RACE AS A MISSION-CRITICAL DEPLOYMENT.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end">
                  <div className="space-y-1">
                    <span className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest">CURRENT_LOCATION</span>
                    <span className="block text-lg font-black italic uppercase tracking-tighter">CIRCUITO DO ESTORIL</span>
                  </div>
                </div>
              </div>
            </div>
          </WindowLoader>
        </section>

        <section className="py-32 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-[1600px] mx-auto px-6 md:px-24">
            <span className="text-xs font-black text-primary uppercase tracking-[0.6em] mb-12 block" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>THE_PROTOCOL</span>
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-[1.1] text-zinc-200 max-w-5xl">
              WE HAVE ELIMINATED SPECULATION. EVERY COMPONENT ON THE PORSCHE 992 GT3 CUP IS AUDITED FOR PEAK THERMAL AND MECHANICAL PERFORMANCE. IF IT DOESN'T IMPROVE THE DELTA, IT IS PURGED.
            </blockquote>
          </div>
        </section>

        <section className="py-32 max-w-[1600px] mx-auto px-6 md:px-24">
          <WindowLoader title="HARDWARE_VISUALIZER">
            <HardwareCarousel />
          </WindowLoader>
        </section>

        <section className="py-32 border-y border-zinc-900 bg-black">
          <div className="max-w-[1600px] mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-16">
              <div className="space-y-6">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em] block">TECH_SPECIFICATIONS</span>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">THE_992_PLATFORM</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-loose max-w-md">
                  A SPECIFIC ARCHITECTURE DESIGNED FOR THE BRUTAL ASPHALT OF THE IBÉRIC PENINSULA CIRCUITS.
                </p>
              </div>
              <div className="space-y-8">
                <FeatureItem icon={<Settings size={20} />} title="SUSPENSION_GEOMETRY" desc="ADJUSTABLE MULTI-LINK SETUP WITH ASYMMETRIC CAMBER SETTINGS PER CIRCUIT MAP." />
                <FeatureItem icon={<Zap size={20} />} title="POWER_DELIVERY" desc="4.0L FLAT-SIX WITH LINEAR TORQUE MAPPING FOR MAXIMUM TRACTION ON EXIT." />
                <FeatureItem icon={<Shield size={20} />} title="SAFETY_CELL" desc="CARBON-REINFORCED MONOCOQUE INTEGRATED WITH FIA-SPEC EXOSKELETON." />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-12 lg:pl-20">
              <VerticalStat label="DISPLACEMENT" value="4.0L" sub="NATURALLY ASPIRATED" />
              <VerticalStat label="OUTPUT" value="510 HP" sub="CALIBRATED @ 8400 RPM" />
              <VerticalStat label="TRANSMISSION" value="6-SPEED" sub="SEQUENTIAL PADDLE-SHIFT" />
            </div>
          </div>
        </section>

        <section className="py-16 max-w-[1600px] mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
            <CoreValueItem icon={<Target size={28} />} title="PRECISION" desc="ZERO-TOLERANCE COMPONENT AUDITS." />
            <CoreValueItem icon={<Gauge size={28} />} title="VELOCITY" desc="HIGH-LATENCY DATA PROCESSING." />
            <CoreValueItem icon={<Activity size={28} />} title="SYNCHRONY" desc="TRACK-TO-HUB TELEMETRY LINK." />
          </div>
        </section>

        <section className="py-32 max-w-[1600px] mx-auto px-6 md:px-24">
          <WindowLoader title="MAP_RECONNAISSANCE">
            <div className="p-10 md:p-16 space-y-12">
              <div className="flex items-end justify-between border-b border-zinc-900 pb-10">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">BATTLEGROUNDS</h2>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">PSC_IBÉRICA</span>
              </div>
              <div className="grid grid-cols-1 gap-px bg-zinc-800">
                <MapRow id="01" city="PORTIMÃO" length="4.653 KM" turns="15" />
                <MapRow id="02" city="BARCELONA" length="4.675 KM" turns="16" />
                <MapRow id="03" city="ESTORIL" length="4.182 KM" turns="13" />
                <MapRow id="04" city="JERÉZ" length="4.428 KM" turns="13" />
              </div>
            </div>
          </WindowLoader>
        </section>

        <section className="py-32 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-[1600px] mx-auto px-6 md:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
              <PartnerCard label="TEAM_PRINCIPAL" name="ANDRÉ FERNANDES" desc="DRIVING THE STRATEGIC EVOLUTION OF AF MOTORSPORT THROUGH DATA-FIRST ARCHITECTURE." />
              <PartnerCard label="TECHNICAL_NODE" name="VELOSO MOTORSPORT" desc="PROVIDING WORLD-CLASS MECHANICAL LOGISTICS AND TRACKSIDE SUPPORT INFRASTRUCTURE." />
            </div>
          </div>
        </section>

        <section className="py-32 max-w-[1200px] mx-auto px-6 pb-48">
          <WindowLoader title="DATA_FS">
            <div className="divide-y divide-zinc-900">
              <DirLink label="PROJECT_CHRONICLES" id="ARC_01" />
              <DirLink label="LIVERY_SCHEMATICS" id="DSN_02" />
              <DirLink label="TELEMETRY_LOGS" id="TEL_03" />
            </div>
          </WindowLoader>
        </section>
      </div>
    </main>
  )
}

function WindowLoader({ children, title }: { children: React.ReactNode, title: string }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="border border-zinc-900 bg-black/40 backdrop-blur-xl w-full">
      <div className="bg-zinc-900/80 px-6 py-3 border-b border-zinc-800 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Terminal size={12} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{title}</span>
        </div>
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center py-40">
            <div className="size-4 bg-primary animate-ping" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          </div>
        )}
        <div className={`transition-all duration-1000 ${loading ? 'opacity-0 scale-[0.99] blur-md' : 'opacity-100 scale-100 blur-0'}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

function HardwareCarousel() {
  const [idx, setIdx] = useState(0)
  const items = [
    { url: "https://picsum.photos/id/1070/1920/1080", title: "CHASSIS_SYNC", id: "992_CUP" },
    { url: "https://picsum.photos/id/1071/1920/1080", title: "THERMAL_LOG", id: "PFC_BRAKE" },
    { url: "https://picsum.photos/id/1072/1920/1080", title: "AERO_MAP", id: "CF_SPLITTER" }
  ]

  return (
    <div className="relative aspect-[21/9] w-full bg-zinc-950 overflow-hidden group">
      <img src={items[idx].url} alt="Hw" className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute bottom-12 left-12 space-y-2">
        <span className="text-xs font-mono text-primary italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{items[idx].id}</span>
        <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{items[idx].title}</h3>
      </div>
      <div className="absolute bottom-12 right-12 flex gap-2">
        <div onClick={() => setIdx(i => (i - 1 + items.length) % items.length)} className="size-14 border border-white/10 hover:bg-white hover:text-black transition-all flex items-center justify-center cursor-pointer"><ChevronLeft size={20} /></div>
        <div onClick={() => setIdx(i => (i + 1) % items.length)} className="size-14 border border-white/10 hover:bg-white hover:text-black transition-all flex items-center justify-center cursor-pointer"><ChevronRight size={20} /></div>
      </div>
    </div>
  )
}

function VerticalStat({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="border-l border-zinc-800 pl-10 space-y-2 group hover:border-primary transition-colors">
      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block">{label}</span>
      <span className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter block">{value}</span>
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{sub}</span>
    </div>
  )
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-8 group">
      <div className="size-14 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all shrink-0">
        {icon}
      </div>
      <div className="space-y-2 pt-1">
        <h4 className="text-lg font-black uppercase tracking-widest italic">{title}</h4>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-loose group-hover:text-zinc-300 transition-colors">{desc}</p>
      </div>
    </div>
  )
}

function MapRow({ id, city, length, turns }: { id: string, city: string, length: string, turns: string }) {
  return (
    <div className="bg-black p-8 md:p-12 flex items-center justify-between hover:bg-zinc-950 transition-all border border-transparent hover:border-zinc-800">
      <div className="flex items-center gap-10">
        <span className="text-xs font-mono text-zinc-700">{id}</span>
        <h3 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">{city}</h3>
      </div>
      <div className="hidden lg:flex flex-col gap-1 items-end">
        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">CIRCUIT_DATA</span>
        <span className="text-xs font-black text-zinc-400">{length} / {turns} TURNS</span>
      </div>
    </div>
  )
}

function PartnerCard({ label, name, desc }: { label: string, name: string, desc: string }) {
  return (
    <div className="p-12 md:p-16 bg-black space-y-10 group hover:bg-zinc-950 transition-all">
      <div className="space-y-4">
        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] block">{label}</span>
        <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-loose max-w-sm">
          {desc}
        </p>
      </div>
      <div className="h-px w-20 bg-zinc-900 transition-all duration-700" />
    </div>
  )
}

function CoreValueItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-12 bg-black group hover:bg-zinc-950 transition-all space-y-8">
      <div className="text-zinc-700 group-hover:text-primary transition-colors">{icon}</div>
      <div className="space-y-3">
        <h4 className="text-lg font-black italic uppercase tracking-tighter">{title}</h4>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-loose">{desc}</p>
      </div>
    </div>
  )
}

function DirLink({ label, id }: { label: string, id: string }) {
  return (
    <div className="flex items-center justify-between p-10 hover:bg-zinc-950 transition-all">
      <div className="flex items-center gap-10">
        <span className="text-xs font-mono text-zinc-800 group-hover:text-primary transition-colors">{id}</span>
        <h3 className="text-xl md:text-2xl font-black italic uppercase text-zinc-600 group-hover:text-white transition-all duration-500">{label}</h3>
      </div>
      <Maximize2 size={20} className="text-zinc-800 group-hover:text-primary transition-all" />
    </div>
  )
}