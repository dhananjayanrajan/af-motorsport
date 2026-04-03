'use client'

import { CheckeredBackground } from '@/components/Custom/ui/CheckeredBackground'
import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Layers,
  Terminal,
  Zap,
  Activity,
  ShieldCheck,
  Layout,
  Code
} from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'

const GOOGLE_FORM_URL = "https://forms.gle/your-form-id-here"

const OPEN_ROLES = [
  {
    id: 'lead-arch',
    title: 'Lead Software Architect',
    department: 'Engineering',
    location: 'Remote / New York',
    type: 'Full-Time',
    tags: ['Go', 'Rust', 'System Design'],
  },
  {
    id: 'aero-eng',
    title: 'Aerodynamics Engineer',
    department: 'Research & Development',
    location: 'Portugal',
    type: 'Full-Time',
    tags: ['CFD', 'Fluid Dynamics', 'Simulation'],
  },
  {
    id: 'infra-ops',
    title: 'DevOps & Infrastructure Lead',
    department: 'Infrastructure',
    location: 'Chennai, India',
    type: 'Full-Time',
    tags: ['Self-Hosting', 'Linux', 'Proxmox'],
  },
  {
    id: 'backend-go',
    title: 'Senior Backend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    tags: ['Golang', 'PostgreSQL', 'API Design'],
  },
  {
    id: 'frontend-nx',
    title: 'Senior Frontend Engineer',
    department: 'Product',
    location: 'New York',
    type: 'Full-Time',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'security-ops',
    title: 'Cybersecurity Engineer',
    department: 'Infrastructure',
    location: 'Chennai, India',
    type: 'Full-Time',
    tags: ['Network Security', 'Encryption', 'Audit'],
  },
  {
    id: 'data-eng',
    title: 'Data & Telemetry Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Contract',
    tags: ['Python', 'Real-time Data', 'MQTT'],
  },
  {
    id: 'bim-auto',
    title: 'BIM Automation Specialist',
    department: 'Engineering',
    location: 'Hybrid',
    type: 'Full-Time',
    tags: ['TypeScript', 'Revit API', 'Automation'],
  },
  {
    id: 'embedded-sys',
    title: 'Embedded Systems Engineer',
    department: 'R&D',
    location: 'Portugal',
    type: 'Full-Time',
    tags: ['C++', 'Firmware', 'Hardware'],
  },
  {
    id: 'ops-manager',
    title: 'Operations Manager',
    department: 'Management',
    location: 'Chennai, India',
    type: 'Full-Time',
    tags: ['Project Management', 'ERP', 'Logistics'],
  }
]

export default function CareersPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <CheckeredBackground mode="horizontal" speed={1} opacity={0.2} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
        {/* Header Section */}
        <section className="mb-24 space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">Work with us</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] mb-12">
            JOIN THE<br />
            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>TEAM.</span>
          </h1>

          <p className="max-w-2xl text-sm md:text-lg text-zinc-400 font-medium uppercase tracking-tight leading-relaxed">
            AF Motorsport is a specialized engineering firm focused on high-performance technology. We are looking for experts in software architecture, infrastructure, and aerodynamics to help us push the boundaries of what is possible.
          </p>
        </section>

        {/* Company Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 mb-32">
          <ValueCard
            icon={<Code size={20} />}
            title="Open Source Focus"
            desc="We prioritize community-driven, open-source technology. We believe in transparency and contributing back to the tools we use."
          />
          <ValueCard
            icon={<Layout size={20} />}
            title="Design Excellence"
            desc="Our design philosophy balances high-performance engineering with a clean, functional aesthetic. Every pixel has a purpose."
          />
          <ValueCard
            icon={<ShieldCheck size={20} />}
            title="Sovereign Infrastructure"
            desc="We manage our own infrastructure and value data privacy. We build self-hosted solutions to maintain total control."
          />
        </section>

        {/* Job Listings Section */}
        <section className="space-y-12">
          <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Current Openings</h2>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase italic">Updated Weekly</span>
            </div>
          </div>

          <div className="space-y-4">
            {OPEN_ROLES.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </section>

        {/* Spontaneous Application Section */}
        <section className="mt-32 p-12 bg-zinc-950 border border-zinc-900 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">Don&apos;t see a matching role?</h3>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">We are always looking for talented individuals. Submit your resume for future consideration.</p>
            </div>
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              <ClippedButton label="Submit Application" size="lg" />
            </a>
          </div>
          <div
            className="absolute -right-12 -bottom-12 size-48 opacity-10 rotate-12 pointer-events-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
          />
        </section>
      </div>
    </main>
  )
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-black p-10 space-y-6 group hover:bg-zinc-950 transition-colors">
      <div className="text-zinc-700 group-hover:text-primary transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-lg font-black italic uppercase tracking-tighter text-white">{title}</h4>
        <p className="text-[10px] leading-relaxed text-zinc-500 font-bold uppercase tracking-widest">{desc}</p>
      </div>
    </div>
  )
}

function RoleCard({ role }: { role: typeof OPEN_ROLES[0] }) {
  return (
    <motion.a
      href={GOOGLE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 10 }}
      className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 bg-black border border-zinc-900 hover:border-white/20 transition-all cursor-pointer overflow-hidden block"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-8 z-10">
        <div className="space-y-1">
          <span className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{role.department}</span>
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">{role.title}</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {role.tags.map(tag => (
            <span key={tag} className="text-[7px] font-mono px-2 py-1 bg-zinc-900 text-zinc-500 uppercase border border-zinc-800">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-12 mt-6 md:mt-0 z-10">
        <div className="text-right hidden sm:block">
          <span className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest">{role.location}</span>
          <span className="block text-[10px] font-bold text-white uppercase italic">{role.type}</span>
        </div>
        <div className="size-12 bg-zinc-900 flex items-center justify-center group-hover:bg-primary transition-colors group-hover:text-black">
          <ArrowRight size={16} />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.a>
  )
}