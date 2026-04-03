'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export interface StrategicPartnersSectionProps {
  organizations?: any[]
  members?: any[]
}

export function StrategicPartnersSection({
  organizations = DUMMY_ORGS,
  members = DUMMY_PARTNER_MEMBERS
}: StrategicPartnersSectionProps) {
  const allPartners = [...organizations, ...members]
  const [activePartner, setActivePartner] = useState<any | null>(allPartners[0] || null)

  return (
    <section
      className="relative w-full h-screen border-t overflow-hidden flex flex-col bg-black"
      style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-zinc-900 bg-zinc-950 flex flex-col shrink-0">
          <div className="p-8 border-b border-zinc-900">
            <h2 className="text-[10px] font-black italic text-zinc-500 uppercase tracking-[0.3em]">
              PARTNER_INDEX
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {allPartners.map((partner) => {
              const isOrg = 'name' in partner
              const isActive = activePartner?.id === partner.id
              return (
                <button
                  key={`${isOrg ? 'org' : 'usr'}-${partner.id}`}
                  onClick={() => setActivePartner(partner)}
                  className={cn(
                    "w-full p-8 text-left border-b border-zinc-900/50 transition-all duration-300 group flex flex-col gap-1 cursor-pointer",
                    isActive ? "bg-zinc-900" : "hover:bg-zinc-900/30"
                  )}
                >
                  <span className={cn(
                    "text-[7px] font-mono block tracking-widest uppercase",
                    isActive ? "text-white" : "text-zinc-700"
                  )}>
                    {isOrg ? partner.basics?.identifier?.code : partner.basics?.identifier?.callsign}
                  </span>
                  <span className={cn(
                    "text-sm font-black italic uppercase tracking-tight block truncate",
                    isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                  )}
                    style={{ color: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                  >
                    {isOrg ? partner.name : `${partner.first} ${partner.last}`}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="hidden md:block flex-1 bg-black p-16 lg:p-24 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {activePartner && (
              <motion.div
                key={activePartner.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl space-y-20"
              >
                <div className="flex flex-col xl:flex-row gap-16 items-start">
                  <div className="w-48 h-48 border border-zinc-900 bg-zinc-950 shrink-0 overflow-hidden">
                    <img
                      src={'name' in activePartner ? activePartner.assets?.logo : activePartner.assets?.avatar}
                      className="w-full h-full object-cover grayscale opacity-40 contrast-125"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-5xl lg:text-7xl font-black italic text-white uppercase tracking-tighter leading-[0.85] break-words">
                      {'name' in activePartner ? activePartner.name : `${activePartner.first} ${activePartner.last}`}
                    </h3>
                    <div className="mt-10 max-w-xl">
                      <p className="text-[11px] font-bold text-zinc-600 uppercase italic leading-relaxed tracking-wide border-l border-zinc-900 pl-6">
                        {activePartner.basics?.tagline || activePartner.basics?.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
                  {'name' in activePartner ? (
                    <>
                      <DataPoint label="ESTABLISHED" value={activePartner.details?.evolution?.founded} />
                      <DataPoint label="PRESTIGE" value={activePartner.traits?.reputation?.prestige} />
                      <DataPoint label="INNOVATION" value={activePartner.traits?.reputation?.innovation} />
                      <DataPoint label="RELIABILITY" value={activePartner.traits?.reputation?.reliability} />
                    </>
                  ) : (
                    <>
                      <DataPoint label="NATIONALITY" value={activePartner.traits?.identity?.nationality} />
                      <DataPoint label="BADGE_ID" value={activePartner.basics?.identifier?.badge} />
                      <DataPoint label="CALLSIGN" value={activePartner.basics?.identifier?.callsign} />
                      <DataPoint label="STATUS" value="ACTIVE" />
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function DataPoint({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-zinc-950 p-8 space-y-3">
      <span className="text-[7px] font-black text-zinc-800 uppercase block tracking-[0.3em]">{label}</span>
      <span className="text-lg font-black italic text-white uppercase truncate block tracking-tight">{value || '---'}</span>
    </div>
  )
}

const DUMMY_ORGS = [
  {
    id: 101,
    name: "APEX_FREIGHT",
    basics: {
      identifier: { code: "APX_77" },
      tagline: "TIER-1 AEROSPACE LOGISTICS AND FREIGHT SOLUTIONS."
    },
    details: { evolution: { founded: "2014" } },
    traits: {
      reputation: { prestige: "ESTABLISHED", innovation: "REVOLUTIONARY", reliability: "EXCEPTIONAL" }
    },
    assets: { logo: "https://picsum.photos/seed/apex/800/800" }
  },
  {
    id: 102,
    name: "NEURALIS",
    basics: {
      identifier: { code: "NRL_04" },
      tagline: "NEXT-GEN BIOMETRIC INTEGRATION FOR HIGH-G ENVIRONMENTS."
    },
    details: { evolution: { founded: "2021" } },
    traits: {
      reputation: { prestige: "ICONIC", innovation: "INNOVATIVE", reliability: "RELIABLE" }
    },
    assets: { logo: "https://picsum.photos/seed/neural/800/800" }
  }
]

const DUMMY_PARTNER_MEMBERS = [
  {
    id: 501,
    first: "JULIAN",
    last: "THORNE",
    basics: {
      identifier: { callsign: "VANGUARD", badge: "LEGAL_COUNCIL" },
      description: "NAVIGATING INTERNATIONAL MARITIME AND AIRSPACE REGULATORY FRAMEWORKS."
    },
    traits: {
      identity: { nationality: "GBR" }
    },
    assets: { avatar: "https://picsum.photos/seed/julian/800/800" }
  },
  {
    id: 502,
    first: "SOPHIA",
    last: "MULLER",
    basics: {
      identifier: { callsign: "VECTOR", badge: "TECH_LIAISON" },
      description: "DIRECT ENGINEERING BRIDGE BETWEEN MANUFACTURING AND OPERATIONAL HUBS."
    },
    traits: {
      identity: { nationality: "GER" }
    },
    assets: { avatar: "https://picsum.photos/seed/sophia/800/800" }
  }
]