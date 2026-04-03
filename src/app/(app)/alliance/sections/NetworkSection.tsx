'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'motion/react'
import { Building2, Calendar, Globe, X, Zap } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface Organization {
  id: number
  name: string
  basics?: {
    identifier?: { code?: string }
    tagline?: string
    description?: string
  }
  details?: {
    evolution?: { founded?: string }
  }
  traits?: {
    reputation?: {
      prestige?: string
      reliability?: string
      innovation?: string
    }
  }
  assets: {
    logo: string
  }
}

export function NetworkSection({ organizations = DUMMY_ORGS }: { organizations?: Organization[] }) {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  return (
    <section
      className="relative w-full py-24 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">ECOSYSTEM_INTEGRATION</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter">
          THE_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>NETWORK</span>
        </h2>
      </div>

      <div className="relative py-12 border-y border-zinc-900 bg-zinc-950/20">
        <LogoLoop
          logos={organizations}
          onSelect={setSelectedOrg}
          isPausedManually={!!selectedOrg}
        />
      </div>

      <AnimatePresence>
        {selectedOrg && (
          <PartnerModal org={selectedOrg} onClose={() => setSelectedOrg(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

const LogoLoop = ({ logos, onSelect, isPausedManually }: {
  logos: Organization[],
  onSelect: (org: Organization) => void,
  isPausedManually: boolean
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLUListElement>(null)

  const [isHovered, setIsHovered] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [seqWidth, setSeqWidth] = useState(0)

  const offsetRef = useRef(0)
  const lastTimestampRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (seqRef.current) {
      setSeqWidth(seqRef.current.getBoundingClientRect().width)
    }
  }, [logos])

  const animate = useCallback((timestamp: number) => {
    if (!lastTimestampRef.current) lastTimestampRef.current = timestamp
    const delta = (timestamp - lastTimestampRef.current) / 1000
    lastTimestampRef.current = timestamp

    if (!isHovered && !isPausedManually && trackRef.current && seqWidth > 0) {
      const speed = 60 // Pixels per second
      offsetRef.current += speed * delta

      // Infinite loop reset logic
      if (offsetRef.current >= seqWidth) {
        offsetRef.current = offsetRef.current % seqWidth
      }

      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [isHovered, isPausedManually, seqWidth])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTimestampRef.current = null
    }
  }, [animate])

  return (
    <div
      className="flex overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoveredId(null)
      }}
    >
      <div ref={trackRef} className="flex will-change-transform">
        {/* Render 4 copies to ensure no gaps on any screen size */}
        {[0, 1, 2, 3].map((i) => (
          <ul key={i} ref={i === 0 ? seqRef : null} className="flex items-center shrink-0">
            {logos.map((org) => (
              <li
                key={`${i}-${org.id}`}
                className="relative px-16 group/item cursor-crosshair"
                onMouseEnter={() => setHoveredId(org.id)}
                onClick={() => onSelect(org)}
              >
                <div className="h-12 w-40 flex items-center justify-center grayscale opacity-30 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500">
                  <img src={org.assets.logo} alt={org.name} className="max-h-full max-w-full object-contain" />
                </div>

                <AnimatePresence shadow-sm>
                  {hoveredId === org.id && !isPausedManually && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-20 pointer-events-none"
                    >
                      <div className="bg-white px-4 py-2 shadow-2xl">
                        <span className="text-[10px] font-black text-black uppercase italic tracking-tighter">
                          {org.name} // {org.basics?.identifier?.code}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

const PartnerModal = ({ org, onClose }: { org: Organization, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-900 overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-zinc-900/50 p-16 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-900">
            <img src={org.assets.logo} alt={org.name} className="max-w-[70%] grayscale brightness-150" />
          </div>

          <div className="w-full md:w-1/2 p-12 relative">
            <button onClick={onClose} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="space-y-8">
              <div>
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-2 block" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                  DATA_ACCESS_{org.basics?.identifier?.code || '00'}
                </span>
                <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                  {org.name}
                </h3>
              </div>

              <p className="text-sm font-bold text-zinc-500 uppercase italic leading-tight border-l-2 pl-6 border-zinc-800">
                {org.basics?.tagline}
              </p>

              <div className="grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                <ModalStat icon={<Calendar size={12} />} label="FOUNDED" value={org.details?.evolution?.founded} />
                <ModalStat icon={<Zap size={12} />} label="TECH_RANK" value={org.traits?.reputation?.innovation} />
                <ModalStat icon={<Building2 size={12} />} label="PRESTIGE" value={org.traits?.reputation?.prestige} />
                <ModalStat icon={<Globe size={12} />} label="CORE_TRUST" value={org.traits?.reputation?.reliability} />
              </div>

              <p className="text-[10px] font-mono text-zinc-600 leading-relaxed uppercase">
                {org.basics?.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ModalStat({ label, value, icon }: { label: string, value?: string, icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 p-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-zinc-800">{icon}</span>
        <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-xs font-black italic text-white uppercase">{value || '---'}</span>
    </div>
  )
}

const DUMMY_ORGS: Organization[] = [
  {
    id: 1,
    name: "APEX_DYNAMICS",
    basics: {
      identifier: { code: "AD_99" },
      tagline: "HIGH-PRECISION KINEMATICS FOR OFF-ROAD ENVIRONMENTS.",
      description: "CORE ENGINEERING PARTNER SPECIALIZING IN ACTIVE SUSPENSION GEOMETRY AND HYDRAULIC RECOVERY SYSTEMS."
    },
    details: { evolution: { founded: "2012" } },
    traits: { reputation: { prestige: "Iconic", innovation: "Revolutionary", reliability: "Exceptional" } },
    assets: { logo: "https://picsum.photos/id/11/400" }
  },
  {
    id: 2,
    name: "NEURAL_SYNC",
    basics: {
      identifier: { code: "NS_04" },
      tagline: "BIOMETRIC FEEDBACK LOOPS FOR PROFESSIONAL PILOTS.",
      description: "DEVELOPING THE NEXT GENERATION OF COGNITIVE LOAD MONITORING FOR HIGH-STRESS OPERATIONAL ENVIRONMENTS."
    },
    details: { evolution: { founded: "2019" } },
    traits: { reputation: { prestige: "Emerging", innovation: "Innovative", reliability: "Reliable" } },
    assets: { logo: "https://picsum.photos/id/12/400" }
  },
  {
    id: 3,
    name: "KINETIC_LABS",
    basics: {
      identifier: { code: "KL_X" },
      tagline: "REPLACING MECHANICAL LINKAGES WITH SOLID-STATE ACTUATORS.",
      description: "PIONEERING WORK IN ELECTROMAGNETIC DAMPING SYSTEMS FOR ARMORED AND OFF-ROAD VEHICLES."
    },
    details: { evolution: { founded: "2015" } },
    traits: { reputation: { prestige: "Established", innovation: "Revolutionary", reliability: "Exceptional" } },
    assets: { logo: "https://picsum.photos/id/13/400" }
  }
]