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
      className="relative w-full h-screen border-t overflow-hidden flex flex-col"
      style={{
        backgroundColor: DESIGN_SYSTEM.COLORS.BLACK,
        borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900
      }}
    >
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-2/5 border-r border-zinc-900 bg-zinc-950/20 backdrop-blur-sm flex flex-col shrink-0">
          <div className="p-10 border-b border-zinc-900">
            <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">
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
                    "w-full p-10 text-left border-b border-zinc-900 transition-all duration-500 group flex items-center justify-between cursor-pointer",
                    isActive ? "bg-zinc-900" : "hover:bg-zinc-950"
                  )}
                >
                  <div className="relative overflow-hidden">
                    <span className={cn(
                      "text-[9px] font-mono block mb-2",
                      isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                    )}>
                      {isOrg ? partner.basics?.identifier?.code : partner.basics?.identifier?.callsign}
                    </span>
                    <span className={cn(
                      "text-2xl font-black italic uppercase tracking-tighter block transition-all duration-500 truncate",
                      isActive ? "text-white translate-x-4" : "text-zinc-700 group-hover:text-zinc-400"
                    )}
                      style={{ color: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                    >
                      {isOrg ? partner.name : `${partner.first} ${partner.last}`}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="hidden md:block w-3/5 bg-black p-12 lg:p-20 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {activePartner && (
              <motion.div
                key={activePartner.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="space-y-16"
              >
                <div className="flex flex-col xl:flex-row gap-10 items-start">
                  <div className="w-48 h-48 lg:w-64 lg:h-64 border border-zinc-900 bg-zinc-950 shrink-0 overflow-hidden">
                    <img
                      src={'name' in activePartner ? activePartner.assets?.logo : activePartner.assets?.avatar}
                      className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                      alt="PARTNER_ASSET"
                    />
                  </div>
                  <div className="flex-1 pt-2 min-w-0">
                    <h3 className="text-5xl lg:text-7xl xl:text-8xl font-black italic text-white uppercase tracking-tighter leading-[0.85] break-words">
                      {'name' in activePartner ? activePartner.name : `${activePartner.first} ${activePartner.last}`}
                    </h3>
                    <p className="mt-8 text-xl font-bold text-zinc-500 uppercase italic leading-tight max-w-xl border-l-2 pl-6 border-zinc-800">
                      {activePartner.basics?.tagline || activePartner.basics?.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
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
                      <DataPoint label="STATUS" value="ACTIVE_ASSET" />
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
    <div className="bg-zinc-950 p-8 space-y-2">
      <span className="text-[9px] font-black text-zinc-800 uppercase block tracking-widest">{label}</span>
      <span className="text-xl font-black italic text-white uppercase truncate block">{value || 'NOT_SET'}</span>
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
      reputation: { prestige: "Established", innovation: "Revolutionary", reliability: "Exceptional" }
    },
    assets: { logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800" }
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
      reputation: { prestige: "Iconic", innovation: "Innovative", reliability: "Reliable" }
    },
    assets: { logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800" }
  }
]

const DUMMY_PARTNER_MEMBERS = [
  {
    id: 501,
    first: "JULIAN",
    last: "THORNE",
    basics: {
      identifier: { callsign: "VANGUARD", badge: "LEGAL_COUNCIL" },
      description: "Navigating international maritime and airspace regulatory frameworks."
    },
    traits: {
      identity: { nationality: "GBR" }
    },
    assets: { avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" }
  },
  {
    id: 502,
    first: "SOPHIA",
    last: "MULLER",
    basics: {
      identifier: { callsign: "VECTOR", badge: "TECH_LIAISON" },
      description: "Direct engineering bridge between manufacturing and operational hubs."
    },
    traits: {
      identity: { nationality: "GER" }
    },
    assets: { avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800" }
  }
]