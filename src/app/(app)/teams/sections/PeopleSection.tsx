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
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}
    >
      <div
        className="relative z-30 px-10 py-16 md:px-16 flex justify-between items-end border-b backdrop-blur-2xl"
        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, backgroundColor: 'rgba(250, 250, 250, 0.8)' }}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Dna size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className="text-[8px] font-black uppercase tracking-[0.6em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>GENETIC_ASSET_VAULT</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
            Our<span style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}> Team</span>
          </h2>
        </div>

        <div className="flex p-1 border mb-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
          {(['DRIVERS', 'LEADERS', 'MEMBERS'] as MemberType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setActiveType(t); setActiveIdx(0); }}
              className={cn(
                "px-8 py-2.5 text-[8px] font-black uppercase tracking-[0.3em] transition-all cursor-pointer",
                activeType === t ? "bg-white" : "hover:text-zinc-500"
              )}
              style={{
                backgroundColor: activeType === t ? DESIGN_SYSTEM.COLORS.WHITE : 'transparent',
                color: activeType === t ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.ZINC_400
              }}
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
              <div className="lg:w-1/2 relative h-[40vh] lg:h-auto overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                {current.image && (
                  <img
                    src={current.image}
                    className="w-full h-full object-cover grayscale opacity-40 contrast-150 transition-all duration-1000"
                    alt={current.name}
                  />
                )}
                <div className="absolute inset-0 opacity-80" style={{ background: `linear-gradient(to right, ${DESIGN_SYSTEM.COLORS.ZINC_50}, transparent, transparent)` }} />
                <div className="absolute bottom-16 left-16 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-1.5 animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[7px] font-mono uppercase tracking-widest italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>ACTIVE_DATA_FEED</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 p-16 lg:p-32 flex flex-col justify-center space-y-16">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                    <Fingerprint size={20} />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em]">IDENTITY_CONFIRMED</span>
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] break-words" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                    {current.name.split('_').map((n, i) => (
                      <span key={i} className="block">{n}</span>
                    ))}
                  </h3>
                  <div className="flex items-center gap-8 pt-6">
                    <div
                      className="px-5 py-1.5 border text-[8px] font-black uppercase tracking-[0.4em]"
                      style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                    >
                      {current.role}
                    </div>
                    <div className="h-px flex-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_200 }} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <span className="text-[7px] font-black uppercase tracking-[0.4em] flex items-center gap-2" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                      <Database size={10} /> BIOGRAPHY_BLOB
                    </span>
                    <p className="text-[10px] font-bold uppercase leading-relaxed italic tracking-wide max-w-sm" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>
                      {current.background}
                    </p>
                  </div>
                  <div className="space-y-8">
                    {current.stats.map((s, i) => (
                      <div key={i} className="flex justify-between items-end border-b pb-4" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                        <span className="text-[7px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>{s.label}</span>
                        <span className="text-xl font-black italic uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[9px] font-mono uppercase tracking-[1em] animate-pulse" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>NO_DATA_AVAILABLE</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-30 h-28 border-t flex overflow-x-auto no-scrollbar" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_200, backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}>
        {filteredTribe.length > 0 ? (
          filteredTribe.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "min-w-[280px] h-full border-r px-10 flex items-center justify-between group transition-all cursor-pointer",
                activeIdx === idx ? "" : "hover:bg-white"
              )}
              style={{
                borderColor: DESIGN_SYSTEM.COLORS.ZINC_200,
                backgroundColor: activeIdx === idx ? DESIGN_SYSTEM.COLORS.WHITE : 'transparent'
              }}
            >
              <div className="flex flex-col text-left">
                <span className={cn(
                  "text-[6px] font-mono mb-1 tracking-widest",
                  activeIdx === idx ? "" : "text-zinc-300"
                )} style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                  INDEX_00{member.id}
                </span>
                <span className={cn(
                  "text-base font-black italic uppercase tracking-tight transition-all",
                  activeIdx === idx ? "translate-x-2" : "group-hover:text-zinc-500"
                )} style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                  {member.name}
                </span>
              </div>
              <Activity
                size={14}
                className={cn(
                  "transition-all duration-500",
                  activeIdx === idx ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100"
                )}
                style={{ color: activeIdx === idx ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200 }}
              />
            </button>
          ))
        ) : null}
        <div className="flex-1 border-r flex items-center px-16" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
          <span className="text-[7px] font-mono uppercase tracking-[1.5em] italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_200 }}>END_OF_MANIFEST</span>
        </div>
      </div>
    </section>
  )
}