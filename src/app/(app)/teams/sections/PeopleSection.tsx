'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Driver, Leader, Media, Member } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
  Activity,
  Database,
  Dna,
  Fingerprint
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

type MemberType = 'DRIVERS' | 'LEADERS' | 'MEMBERS'

export interface UnifiedPersonnel {
  id: string
  name: string
  type: MemberType
  role: string
  background: string
  stats: {
    label: string
    value: string
  }[]
  image: string
}

interface PeopleSectionProps {
  drivers: Driver[]
  leaders: Leader[]
  members: Member[]
}

export default function PeopleSection({ drivers, leaders, members }: PeopleSectionProps) {
  const [activeType, setActiveType] = useState<MemberType>('DRIVERS')
  const [activeIdx, setActiveIdx] = useState(0)

  const personnel: UnifiedPersonnel[] = [
    ...drivers.map((d) => ({
      id: String(d.id),
      name: `${d.first_name}_${d.last_name}`.toUpperCase(),
      type: 'DRIVERS' as MemberType,
      role: d.basics?.callsign || d.basics?.competition_name || 'PILOT',
      background: d.seo?.description || 'STORY_REDACTED',
      stats: [
        { label: 'NUMBER', value: d.basics?.racing_number ? `#${d.basics.racing_number}` : 'N/A' },
        { label: 'BORN', value: d.basics?.birth_date || 'N/A' }
      ],
      image: typeof d.assets?.avatar === 'object' ? (d.assets.avatar as Media)?.url || '' : ''
    })),
    ...leaders.map((l) => ({
      id: String(l.id),
      name: `${l.first_name}_${l.last_name}`.toUpperCase(),
      type: 'LEADERS' as MemberType,
      role: l.basics?.title || 'EXECUTIVE',
      background: l.seo?.description || 'VISION_REDACTED',
      stats: [
        { label: 'DEBUT', value: l.basics?.debut_date || 'N/A' },
        { label: 'BORN', value: l.basics?.birth_date || 'N/A' }
      ],
      image: typeof l.assets?.avatar === 'object' ? (l.assets.avatar as Media)?.url || '' : ''
    })),
    ...members.map((m) => ({
      id: String(m.id),
      name: `${m.first_name}_${m.last_name}`.toUpperCase(),
      type: 'MEMBERS' as MemberType,
      role: m.alias || 'OPERATIVE',
      background: m.basics?.description || m.seo?.description || 'DATA_REDACTED',
      stats: [
        { label: 'JOINED', value: m.basics?.joining_date || 'N/A' },
        { label: 'BORN', value: m.basics?.birth_date || 'N/A' }
      ],
      image: typeof m.assets?.avatar === 'object' ? (m.assets.avatar as Media)?.url || '' : ''
    }))
  ]

  const filteredTribe = personnel.filter((m) => m.type === activeType)
  const current = filteredTribe[activeIdx] || null

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}
    >
      <div className="relative z-30 px-10 py-16 md:px-16 flex justify-between items-end border-b border-zinc-900 bg-black/80 backdrop-blur-2xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Dna size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">GENETIC_ASSET_VAULT</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">
            Our<span className="text-zinc-900"> Team</span>
          </h2>
        </div>

        <div className="flex bg-zinc-950 p-1 border border-zinc-900 mb-2">
          {(['DRIVERS', 'LEADERS', 'MEMBERS'] as MemberType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setActiveType(t); setActiveIdx(0); }}
              className={cn(
                "px-8 py-2.5 text-[8px] font-black uppercase tracking-[0.3em] transition-all cursor-pointer",
                activeType === t ? "bg-white text-black" : "text-zinc-700 hover:text-zinc-400"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative flex flex-col lg:flex-row">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col lg:flex-row"
            >
              <div className="lg:w-1/2 relative h-[40vh] lg:h-auto overflow-hidden bg-zinc-950">
                {current.image && (
                  <img
                    src={current.image}
                    className="w-full h-full object-cover grayscale opacity-40 contrast-150 transition-all duration-1000"
                    alt={current.name}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-16 left-16 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-1.5 animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest italic">ACTIVE_DATA_FEED</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 p-16 lg:p-32 flex flex-col justify-center space-y-16">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                    <Fingerprint size={20} />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em]">IDENTITY_CONFIRMED</span>
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-[0.8] break-words">
                    {current.name.split('_').map((n, i) => (
                      <span key={i} className="block">{n}</span>
                    ))}
                  </h3>
                  <div className="flex items-center gap-8 pt-6">
                    <div className="px-5 py-1.5 border border-zinc-800 text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                      {current.role}
                    </div>
                    <div className="h-px flex-1 bg-zinc-900/50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.4em] flex items-center gap-2">
                      <Database size={10} /> BIOGRAPHY_BLOB
                    </span>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase leading-relaxed italic tracking-wide max-w-sm">
                      {current.background}
                    </p>
                  </div>
                  <div className="space-y-8">
                    {current.stats.map((s, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-zinc-900 pb-4">
                        <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.3em]">{s.label}</span>
                        <span className="text-xl font-black text-white italic uppercase tracking-tighter">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[9px] font-mono text-zinc-800 uppercase tracking-[1em] animate-pulse">NO_DATA_AVAILABLE</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-30 h-28 border-t border-zinc-900 bg-black flex overflow-x-auto no-scrollbar">
        {filteredTribe.length > 0 ? (
          filteredTribe.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "min-w-[280px] h-full border-r border-zinc-900 px-10 flex items-center justify-between group transition-all cursor-pointer",
                activeIdx === idx ? "bg-zinc-950" : "hover:bg-zinc-950"
              )}
            >
              <div className="flex flex-col text-left">
                <span className={cn(
                  "text-[6px] font-mono mb-1 tracking-widest",
                  activeIdx === idx ? "" : "text-zinc-800"
                )} style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                  INDEX_00{member.id}
                </span>
                <span className={cn(
                  "text-base font-black italic uppercase tracking-tight transition-all",
                  activeIdx === idx ? "text-white translate-x-2" : "text-zinc-700 group-hover:text-zinc-500"
                )}>
                  {member.name}
                </span>
              </div>
              <Activity
                size={14}
                className={cn(
                  "transition-all duration-500",
                  activeIdx === idx ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100"
                )}
                style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '#27272a' }}
              />
            </button>
          ))
        ) : null}
        <div className="flex-1 border-r border-zinc-900 bg-zinc-950 flex items-center px-16">
          <span className="text-[7px] font-mono text-zinc-900 uppercase tracking-[1.5em] italic">END_OF_MANIFEST</span>
        </div>
      </div>
    </section>
  )
}