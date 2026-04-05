'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { Database, ExternalLink, Network } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { useRef, useState } from 'react'

const DUMMY_MEMBERS = [
  {
    id: 1,
    first: "ALEX",
    last: "RIVERA",
    tier: 'Front',
    basics: {
      identifier: { callsign: "ARCH_01", number: "01", nickname: "GHOST", badge: "LEAD_ENGINEER" },
      tagline: "TRACKSIDE_OPERATIONS",
      description: "Direct tactical link between machine biometrics and pit-lane strategy. Zero-latency decision maker."
    },
    traits: { identity: { nationality: "ESP" } },
    assets: { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" },
    slug: 'alex-rivera'
  },
  {
    id: 2,
    first: "SARAH",
    last: "CHEN",
    tier: 'Front',
    basics: {
      identifier: { callsign: "VECT_00", number: "02", nickname: "ORACLE", badge: "STRATEGY_DIR" },
      tagline: "COMPUTATIONAL_STRATEGY",
      description: "Predictive modeling and live risk assessment for endurance and sprint circuit optimization."
    },
    traits: { identity: { nationality: "SGP" } },
    assets: { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800" },
    slug: 'sarah-chen'
  },
  {
    id: 3,
    first: "ELARA",
    last: "VOSS",
    tier: 'Back',
    basics: {
      identifier: { callsign: "NODE_04", number: "04", nickname: "SPARK", badge: "SYSTEMS_TECH" },
      tagline: "NEURAL_INTEGRATION",
      description: "Specializes in high-density telemetry streams and the integration of neural driver-link protocols."
    },
    traits: { identity: { nationality: "GER" } },
    assets: { avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" },
    slug: 'elara-voss'
  },
  {
    id: 4,
    first: "MARCUS",
    last: "THORNE",
    tier: 'Back',
    basics: {
      identifier: { callsign: "BASE_09", number: "09", nickname: "HAMMER", badge: "INFRA_LEAD" },
      tagline: "COMPUTE_STABILITY",
      description: "Ensures 99.9% uptime for trackside server clusters and local data processing units."
    },
    traits: { identity: { nationality: "GBR" } },
    assets: { avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800" },
    slug: 'marcus-thorne'
  },
  {
    id: 5,
    first: "LENA",
    last: "PARK",
    tier: 'Front',
    basics: {
      identifier: { callsign: "LOGIC_07", number: "07", nickname: "PULSE", badge: "INTEL_CHIEF" },
      tagline: "AI_ANALYTICS",
      description: "Managing real-time ML models that predict tire degradation and fuel consumption windows."
    },
    traits: { identity: { nationality: "KOR" } },
    assets: { avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800" },
    slug: 'lena-park'
  },
  {
    id: 6,
    first: "DAVID",
    last: "GROSS",
    tier: 'Back',
    basics: {
      identifier: { callsign: "NET_03", number: "03", nickname: "BRIDGE", badge: "NET_ARCH" },
      tagline: "SECURE_UPLINK",
      description: "Architect of the encrypted low-latency tunnel between trackside and remote HQ."
    },
    traits: { identity: { nationality: "USA" } },
    assets: { avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" },
    slug: 'david-gross'
  },
  {
    id: 7,
    first: "MAYA",
    last: "SINGH",
    tier: 'Front',
    basics: {
      identifier: { callsign: "FLOW_05", number: "05", nickname: "AERO", badge: "AERO_DYN" },
      tagline: "ACTIVE_AERO_OPS",
      description: "Real-time adjustment of wing angles and cooling ducts based on live atmospheric telemetry."
    },
    traits: { identity: { nationality: "IND" } },
    assets: { avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800" },
    slug: 'maya-singh'
  },
  {
    id: 8,
    first: "HUGO",
    last: "MERTENS",
    tier: 'Back',
    basics: {
      identifier: { callsign: "DB_88", number: "88", nickname: "VAULT", badge: "DATA_LEAD" },
      tagline: "HISTORICAL_RECOVERY",
      description: "Cross-referencing live performance against 10 years of historical lap data in milliseconds."
    },
    traits: { identity: { nationality: "BEL" } },
    assets: { avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800" },
    slug: 'hugo-mertens'
  }
]

const getClipPath = (index: number) => {
  const variations = [
    'polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)',
    'polygon(0% 0%, 100% 30px, 100% 100%, 30px 100%, 0% calc(100% - 30px), 0% 0%)',
    'polygon(30px 0%, calc(100% - 30px) 0%, 100% 20px, 100% 100%, 0% 100%, 0% 0%)',
    'polygon(0% 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%)',
  ]
  return variations[index % variations.length]
}

export function TeamBehindTheGlorySection({ members = DUMMY_MEMBERS }: { members?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const frontRow = members.filter(m => m.tier === 'Front' || !m.tier)
  const backRow = members.filter(m => m.tier === 'Back')

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-4 md:px-12 lg:px-24 overflow-hidden border-t"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none select-none overflow-hidden">
        <motion.h2
          style={{ x: useTransform(scrollYProgress, [0, 1], [300, -300]), WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
          className="text-[35vw] font-black italic text-transparent opacity-5 leading-none whitespace-nowrap"
        >
          ENGINEERING_V_CORP
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-32 border-l-4 pl-8"
          style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: `0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` }}
              />
              <span
                className={cn("text-[10px] font-black italic text-zinc-500 uppercase underline underline-offset-8", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}
                style={{ textDecorationColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
              >
                Personnel_Registry
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.8]">
              THE BRAIN<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>TRUST</span>
            </h2>
          </div>

          <div className="hidden md:flex flex-col items-end text-right font-mono text-[9px] text-zinc-700 gap-2">
            <div
              className="flex items-center gap-3 p-3 border"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
            >
              <Network className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span>ACTIVE_NODES: {members.length}</span>
              <Database className="size-3 text-zinc-500" />
              <span>STATUS: NOMINAL</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {backRow.map((member, i) => (
              <MemberTacticalModule key={member.id} member={member} variant="support" index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {frontRow.map((member, i) => (
              <MemberTacticalModule key={member.id} member={member} variant="primary" index={i + 10} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MemberTacticalModule({ member, variant, index }: { member: any, variant: 'primary' | 'support', index: number }) {
  const isPrimary = variant === 'primary'
  const [isHovered, setIsHovered] = useState(false)
  const clip = getClipPath(index)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group transition-all duration-500 h-full",
        !isPrimary && "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
      )}
    >
      <div
        className="relative bg-zinc-950 border border-white/5 p-[1px] transition-all duration-500 group-hover:border-primary/50 z-10 h-full"
        style={{
          clipPath: clip,
          borderColor: isHovered ? `${DESIGN_SYSTEM.COLORS.PRIMARY}80` : 'rgba(255,255,255,0.05)'
        }}
      >
        <div
          className="relative bg-black overflow-hidden p-6 h-full flex flex-col"
          style={{ clipPath: clip }}
        >
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"
            />
          )}

          <div className={cn("relative z-10 flex gap-6 flex-1", isPrimary ? "flex-col lg:flex-row" : "flex-col")}>
            <div className={cn("relative aspect-square overflow-hidden border border-white/10 transition-colors bg-zinc-900 flex-shrink-0", isPrimary ? "w-full lg:w-44" : "w-full")}>
              {isHovered && (
                <motion.div
                  initial={{ top: '-100%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-20 z-20"
                  style={{ backgroundImage: `linear-gradient(to b, transparent, ${DESIGN_SYSTEM.COLORS.PRIMARY}33, transparent)` }}
                />
              )}

              <img
                src={member.assets.avatar}
                alt={member.first}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div
                className="absolute inset-2 border-l border-t border-white/0 group-hover:inset-4 transition-all duration-500"
                style={{ borderLeftColor: isHovered ? `${DESIGN_SYSTEM.COLORS.PRIMARY}80` : 'transparent', borderTopColor: isHovered ? `${DESIGN_SYSTEM.COLORS.PRIMARY}80` : 'transparent' }}
              />
              <div
                className="absolute inset-2 border-r border-b border-white/0 group-hover:inset-4 transition-all duration-500"
                style={{ borderRightColor: isHovered ? `${DESIGN_SYSTEM.COLORS.PRIMARY}80` : 'transparent', borderBottomColor: isHovered ? `${DESIGN_SYSTEM.COLORS.PRIMARY}80` : 'transparent' }}
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <motion.span
                    animate={isHovered ? { x: [0, -2, 2, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                    className={cn("text-[8px] font-black italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}
                    style={{ color: isPrimary ? DESIGN_SYSTEM.COLORS.PRIMARY : '#52525b' }}
                  >
                    {member.basics?.identifier?.badge}
                  </motion.span>
                  <div className="h-[1px] flex-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900 }} />
                </div>

                <motion.div
                  animate={{
                    y: isHovered ? -5 : 0,
                    opacity: isHovered ? 0.3 : 0.05
                  }}
                  className="absolute top-10 right-4 text-6xl font-black italic pointer-events-none z-0"
                  style={{ color: isPrimary ? DESIGN_SYSTEM.COLORS.PRIMARY : 'white' }}
                >
                  {member.basics?.identifier?.number || '00'}
                </motion.div>

                <h3 className={cn("font-black italic leading-[0.85] tracking-tighter uppercase pt-4 transition-transform duration-500", isHovered && "translate-x-2", isPrimary ? "text-4xl lg:text-5xl" : "text-2xl")}>
                  <span className={isPrimary ? "text-white" : "text-zinc-400"}>{member.first}</span><br />
                  <span style={{ color: isPrimary ? DESIGN_SYSTEM.COLORS.PRIMARY : 'white' }}>{member.last}</span>
                </h3>

                <p
                  className="mt-6 text-[10px] font-bold text-zinc-500 uppercase leading-relaxed italic border-l-2 pl-4 py-1 transition-all duration-500 tracking-wider"
                  style={{ borderLeftColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_800 }}
                >
                  {member.basics?.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <span className={cn("text-[6px] font-black text-zinc-700 uppercase mb-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Origin</span>
                    <span className="text-[9px] font-mono text-white italic font-bold tracking-wider">{member.traits?.identity?.nationality}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={cn("text-[6px] font-black text-zinc-700 uppercase mb-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Callsign</span>
                    <span
                      className="text-[9px] font-mono text-zinc-500 italic transition-colors tracking-wider"
                      style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : '#71717a' }}
                    >
                      [{member.basics?.identifier?.nickname}]
                    </span>
                  </div>
                </div>

                <Link href={`/team/${member.slug}`} className="group/btn relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    className="p-2 border border-white/10 transition-colors"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_900}
                  >
                    <ExternalLink className="size-4 text-white" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("absolute top-0 left-10 -translate-y-1/2 pointer-events-none transition-all duration-300 z-20", isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50")}>
        <div
          className="flex items-center gap-2 bg-black border px-2 py-1"
          style={{ borderColor: `${DESIGN_SYSTEM.COLORS.PRIMARY}80`, boxShadow: `0 0 15px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` }}
        >
          <div className="size-1.5 rounded-full animate-ping" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className={cn("text-[7px] font-black text-white italic uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>READ_NODE_{member.basics?.identifier?.number}</span>
        </div>
      </div>
    </motion.div>
  )
}