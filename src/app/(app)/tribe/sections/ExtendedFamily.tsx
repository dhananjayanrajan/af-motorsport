'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { Database, ExternalLink, Network } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { useRef, useState } from 'react'

const getClipPath = (index: number) => {
  const variations = [
    'polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)',
    'polygon(0% 0%, 100% 30px, 100% 100%, 30px 100%, 0% calc(100% - 30px), 0% 0%)',
    'polygon(30px 0%, calc(100% - 30px) 0%, 100% 20px, 100% 100%, 0% 100%, 0% 0%)',
    'polygon(0% 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%)',
  ]
  return variations[index % variations.length]
}

export function ExtendedFamilySection({ individuals = DUMMY_INDIVIDUALS }: { individuals?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const frontRow = individuals.filter(m => m.traits?.influence?.authority === 'High' || m.traits?.influence?.reach === 'Global')
  const backRow = individuals.filter(m => m.traits?.influence?.authority !== 'High' && m.traits?.influence?.reach !== 'Global')

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
          NETWORK_SYNDICATE
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
                Personnel_Registry_Ext
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.8]">
              EXTENDED<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>FAMILY</span>
            </h2>
          </div>

          <div className="hidden md:flex flex-col items-end text-right font-mono text-[9px] text-zinc-700 gap-2">
            <div
              className="flex items-center gap-3 p-3 border"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
            >
              <Network className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span>ACTIVE_NODES: {individuals.length}</span>
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
                src={member.assets?.avatar}
                alt={member.last}
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
                    {member.metrics?.benefits?.benefit || 'NETWORK_NODE'}
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
                  {member.basics?.identifier?.code || member.id.toString().padStart(2, '0')}
                </motion.div>

                <h3 className={cn("font-black italic leading-[0.85] tracking-tighter uppercase pt-4 transition-transform duration-500", isHovered && "translate-x-2", isPrimary ? "text-4xl lg:text-5xl" : "text-2xl")}>
                  <span className={isPrimary ? "text-white" : "text-zinc-400"}>{member.first}</span><br />
                  <span style={{ color: isPrimary ? DESIGN_SYSTEM.COLORS.PRIMARY : 'white' }}>{member.last}</span>
                </h3>

                <p
                  className="mt-6 text-[10px] font-bold text-zinc-500 uppercase leading-relaxed italic border-l-2 pl-4 py-1 transition-all duration-500 tracking-wider"
                  style={{ borderLeftColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_800 }}
                >
                  {member.basics?.tagline}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <span className={cn("text-[6px] font-black text-zinc-700 uppercase mb-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Origin</span>
                    <span className="text-[9px] font-mono text-white italic font-bold tracking-wider">{member.traits?.identity?.nationality || '---'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={cn("text-[6px] font-black text-zinc-700 uppercase mb-1", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Reach</span>
                    <span
                      className="text-[9px] font-mono text-zinc-500 italic transition-colors tracking-wider"
                      style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY : '#71717a' }}
                    >
                      [{member.traits?.influence?.reach || 'LOCAL'}]
                    </span>
                  </div>
                </div>

                <Link href={`/tribe/individuals/${member.id}`} className="group/btn relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    className="p-2 border border-white/10 transition-colors"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
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
          <span className={cn("text-[7px] font-black text-white italic uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>READ_NODE_{member.id}</span>
        </div>
      </div>
    </motion.div>
  )
}

const DUMMY_INDIVIDUALS = [
  {
    id: 1,
    first: "JONATHAN",
    last: "DRAKE",
    basics: { identifier: { code: "ID_DRK" }, tagline: "ADVANCING KINETIC ENERGY RECOVERY THROUGH NON-LINEAR THERMODYNAMICS." },
    traits: { identity: { nationality: "GER" }, influence: { authority: "High", reach: "Global" } },
    metrics: { benefits: { benefit: "THERMAL_IP_EXCHANGE" } },
    assets: { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" }
  },
  {
    id: 2,
    first: "SARAH",
    last: "CHEN",
    basics: { identifier: { code: "ID_CHN" }, tagline: "SUPPLY CHAIN RESILIENCE IN THE ERA OF COMPOSITE SCARCITY." },
    traits: { identity: { nationality: "SGP" }, influence: { authority: "High", reach: "Global" } },
    metrics: { benefits: { benefit: "RAW_MATERIAL_ACCESS" } },
    assets: { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800" }
  },
  {
    id: 3,
    first: "MARCUS",
    last: "VOSS",
    basics: { identifier: { code: "ID_VOS" }, tagline: "QUANTUM TELEMETRY SYSTEMS." },
    traits: { identity: { nationality: "IND" }, influence: { authority: "Medium", reach: "Regional" } },
    metrics: { benefits: { benefit: "DATA_SOVEREIGNTY" } },
    assets: { avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800" }
  },
  {
    id: 4,
    first: "ELARA",
    last: "KENT",
    basics: { identifier: { code: "ID_KNT" }, tagline: "NEURAL NETWORK OPTIMIZATION FOR LIVE TRACKSIDE ANALYTICS." },
    traits: { identity: { nationality: "GBR" }, influence: { authority: "Low", reach: "Local" } },
    metrics: { benefits: { benefit: "AI_LOGIC_AUDIT" } },
    assets: { avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" }
  },
  {
    id: 5,
    first: "VIKTOR",
    last: "NILSEN",
    basics: { identifier: { code: "ID_NLS" }, tagline: "HIGH-DENSITY COMPOSITE FABRICATION AND STRESS TESTING." },
    traits: { identity: { nationality: "NOR" }, influence: { authority: "Medium", reach: "Regional" } },
    metrics: { benefits: { benefit: "STRESS_ANALYSIS" } },
    assets: { avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" }
  },
  {
    id: 6,
    first: "MAYA",
    last: "SOTO",
    basics: { identifier: { code: "ID_STO" }, tagline: "AERODYNAMIC FLUID DYNAMICS AND VIRTUAL WIND TUNNEL OPS." },
    traits: { identity: { nationality: "MEX" }, influence: { authority: "Medium", reach: "Regional" } },
    metrics: { benefits: { benefit: "AERO_VALIDATION" } },
    assets: { avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800" }
  },
  {
    id: 7,
    first: "LIAM",
    last: "FOLEY",
    basics: { identifier: { code: "ID_FLY" }, tagline: "BLOCKCHAIN-BASED LOGISTICS FOR PROTOTYPE PART TRACKING." },
    traits: { identity: { nationality: "IRL" }, influence: { authority: "Low", reach: "Local" } },
    metrics: { benefits: { benefit: "LOG_TRANSPARENCY" } },
    assets: { avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800" }
  },
  {
    id: 8,
    first: "ARJUN",
    last: "REDDY",
    basics: { identifier: { code: "ID_RDY" }, tagline: "AUTONOMOUS NAVIGATION SENSORS AND LIDAR CALIBRATION." },
    traits: { identity: { nationality: "IND" }, influence: { authority: "High", reach: "National" } },
    metrics: { benefits: { benefit: "SENSOR_FUSION_IP" } },
    assets: { avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800" }
  },
  {
    id: 9,
    first: "ELENA",
    last: "ROSSI",
    basics: { identifier: { code: "ID_RSS" }, tagline: "CHASSIS RIGIDITY AND SUSPENSION KINEMATICS SPECIALIST." },
    traits: { identity: { nationality: "ITA" }, influence: { authority: "High", reach: "Global" } },
    metrics: { benefits: { benefit: "DYNAMIC_STABILITY" } },
    assets: { avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800" }
  },
  {
    id: 10,
    first: "KENJI",
    last: "SATO",
    basics: { identifier: { code: "ID_SAT" }, tagline: "HYDROGEN FUEL CELL INTEGRATION FOR ENDURANCE RACING." },
    traits: { identity: { nationality: "JPN" }, influence: { authority: "High", reach: "Global" } },
    metrics: { benefits: { benefit: "GREEN_H2_LOGIC" } },
    assets: { avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=800" }
  },
  {
    id: 11,
    first: "SOPHIE",
    last: "DUBOIS",
    basics: { identifier: { code: "ID_DBS" }, tagline: "STRATEGIC PUBLIC RELATIONS AND BRAND PROTECTION." },
    traits: { identity: { nationality: "FRA" }, influence: { authority: "Medium", reach: "National" } },
    metrics: { benefits: { benefit: "GLOBAL_EXPOSURE" } },
    assets: { avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=800" }
  },
  {
    id: 12,
    first: "AHMED",
    last: "MANSOUR",
    basics: { identifier: { code: "ID_MNS" }, tagline: "RENEWABLE ENERGY INFRASTRUCTURE FOR MOBILE PIT-LANE LABS." },
    traits: { identity: { nationality: "UAE" }, influence: { authority: "Low", reach: "Regional" } },
    metrics: { benefits: { benefit: "OFFGRID_POWER" } },
    assets: { avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=800" }
  },
  {
    id: 13,
    first: "CHLOE",
    last: "ZHANG",
    basics: { identifier: { code: "ID_ZNG" }, tagline: "QUANTUM ENCRYPTION FOR TRACK-TO-HQ DATA PIPELINES." },
    traits: { identity: { nationality: "CHN" }, influence: { authority: "High", reach: "Global" } },
    metrics: { benefits: { benefit: "CYBER_SOVEREIGNTY" } },
    assets: { avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800" }
  }
]