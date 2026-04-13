'use client'

import { ClippedButton } from '@/components/Clipped/ClippedButton'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  Binary,
  Calendar,
  Globe,
  Maximize2,
  X, ZoomIn, ZoomOut
} from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface Celebration {
  id: number
  name: string
  slug: string
  basics: { description: string }
  details: {
    prestige: 'Intimate' | 'Notable' | 'Prestigious' | 'Iconic'
    exclusivity: 'Public' | 'InviteOnly' | 'Private' | 'TeamOnly'
  }
  assets: { primary: { url: string } }
  contexts: {
    beneficiaries: {
      leaders?: string[]
      members?: string[]
      drivers?: string[]
    }
  }
  createdAt: string
  tags?: string[]
}

const CELEBRATIONS_DATA: Celebration[] = [
  { id: 1, name: "PODIUM_ASPIRATION_COMPLETED", slug: "podium-1", basics: { description: "Strategic victory in high-temperature desert conditions." }, details: { prestige: 'Iconic', exclusivity: 'Public' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1200' } }, contexts: { beneficiaries: { leaders: ["Lead_Architect"], members: ["OM", "CH"] } }, createdAt: "2024-01-12T10:00:00Z", tags: ["Victory", "Thermal"] },
  { id: 2, name: "INFRASTRUCTURE_SYNC_SUCCESS", slug: "infra-1", basics: { description: "Global synchronization of the Intelligence unit nodes." }, details: { prestige: 'Notable', exclusivity: 'TeamOnly' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200' } }, contexts: { beneficiaries: { members: ["NV", "MS", "HM"] } }, createdAt: "2024-05-15T14:30:00Z", tags: ["Compute", "Sync"] },
  { id: 3, name: "CHASSIS_STRESS_TEST_V3", slug: "chassis-3", basics: { description: "Validating structural integrity of the V3 frame." }, details: { prestige: 'Prestigious', exclusivity: 'Private' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1547744037-b80bdba1b6f0?q=80&w=1200' } }, contexts: { beneficiaries: { drivers: ["Alpha_1"] } }, createdAt: "2025-03-01T09:15:00Z", tags: ["Hardware", "Safety"] },
  { id: 4, name: "AERODYNAMIC_FLUID_TEST", slug: "aero-test", basics: { description: "Wind tunnel verification of the rear wing assembly." }, details: { prestige: 'Notable', exclusivity: 'Public' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200' } }, contexts: { beneficiaries: { members: ["DG", "DY"] } }, createdAt: "2025-06-12T10:00:00Z", tags: ["Aero", "Fluid"] },
  { id: 5, name: "NIGHT_ENDURANCE_PROTO", slug: "night-end", basics: { description: "24-hour endurance cycle simulation completed." }, details: { prestige: 'Iconic', exclusivity: 'Public' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&w=1200' } }, contexts: { beneficiaries: { leaders: ["Lead_Architect"], drivers: ["Beta_2"] } }, createdAt: "2025-11-20T10:00:00Z", tags: ["Endurance", "Cycle"] },
  { id: 6, name: "INTEL_NODE_CALIBRATION", slug: "intel-cal", basics: { description: "Distributed compute nodes calibrated for telemetry." }, details: { prestige: 'Notable', exclusivity: 'TeamOnly' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200' } }, contexts: { beneficiaries: { members: ["NV", "HM"] } }, createdAt: "2026-01-05T10:00:00Z", tags: ["AI", "Edge"] },
  { id: 7, name: "BRAKE_THERMAL_MAPPING", slug: "brake-map", basics: { description: "Heat dissipation analysis under extreme load." }, details: { prestige: 'Prestigious', exclusivity: 'Private' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1486497395442-885f2144ad47?q=80&w=1200' } }, contexts: { beneficiaries: { drivers: ["Alpha_1"] } }, createdAt: "2026-02-14T10:00:00Z", tags: ["Thermal", "Braking"] },
  { id: 8, name: "LIVERY_REVEAL_SEASON_26", slug: "livery-26", basics: { description: "Visual identity launch for the 2026 season." }, details: { prestige: 'Iconic', exclusivity: 'Public' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1603584173870-7f3ca99a9301?q=80&w=1200' } }, contexts: { beneficiaries: { leaders: ["Lead_Architect"] } }, createdAt: "2026-03-01T10:00:00Z", tags: ["Brand", "Visual"] },
  { id: 9, name: "PIT_STOP_OPTIMIZATION", slug: "pit-opt", basics: { description: "Reducing response time by 0.4s." }, details: { prestige: 'Notable', exclusivity: 'TeamOnly' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200' } }, contexts: { beneficiaries: { members: ["SJ", "MM"] } }, createdAt: "2026-03-02T10:00:00Z", tags: ["Pit", "Opt"] },
  { id: 10, name: "UNIT_CONVENTION_26", slug: "eng-conv", basics: { description: "Quarterly alignment session for the 10-person unit." }, details: { prestige: 'Iconic', exclusivity: 'Public' }, assets: { primary: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200' } }, contexts: { beneficiaries: { members: ["ALL_UNITS"] } }, createdAt: "2026-03-03T10:00:00Z", tags: ["Unit", "Alignment"] }
]

export default function VaultSection({ data = CELEBRATIONS_DATA }: { data?: Celebration[] }) {
  const [zoom, setZoom] = useState(0.8)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) setZoom(0.6)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const canvasX = useMotionValue(0)
  const canvasY = useMotionValue(0)
  const springX = useSpring(canvasX, { stiffness: 60, damping: 20 })
  const springY = useSpring(canvasY, { stiffness: 60, damping: 20 })

  return (
    <section
      className="relative w-full h-screen overflow-hidden select-none font-sans text-white border-t touch-none"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}
    >
      <motion.div
        drag
        dragMomentum={true}
        style={{ x: springX, y: springY, scale: zoom }}
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-crosshair"
      >
        <div
          className="absolute inset-0 w-[5000px] h-[5000px] -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${DESIGN_SYSTEM.COLORS.WHITE} 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
        />

        <AnimatePresence>
          {data.map((item, idx) => (
            <DataSlab
              key={item.id}
              item={item}
              index={idx}
              isMobile={isMobile}
              onExpand={() => setSelectedId(item.slug)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-[100] pointer-events-none max-w-[calc(100vw-120px)]">
        <div
          className="p-4 md:p-6 border-l-2 pointer-events-auto shadow-2xl"
          style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.ZINC_950}E6`, borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
        >
          <div className="flex items-center gap-2 md:gap-4 mb-1">
            <Binary size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className={cn("text-[7px] md:text-[9px] font-black italic text-zinc-500 uppercase truncate", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Archive_System_V7</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white truncate">
            VAULT_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>RECORDS</span>
          </h2>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-auto md:top-10 md:right-10 md:left-auto md:translate-x-0 z-[100] flex gap-2 pointer-events-auto p-2 md:p-0 backdrop-blur-md md:backdrop-blur-none rounded-full md:rounded-none border md:border-none" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.ZINC_950}80`, borderColor: 'rgba(255, 255, 255, 0.05)' }}>
        <button
          onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
          className="size-10 md:size-12 border flex items-center justify-center transition-all rounded-full md:rounded-none text-zinc-400 hover:text-white"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: 'rgba(255, 255, 255, 0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_950}
        ><ZoomIn size={16} /></button>
        <button
          onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))}
          className="size-10 md:size-12 border flex items-center justify-center transition-all rounded-full md:rounded-none text-zinc-400 hover:text-white"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: 'rgba(255, 255, 255, 0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_950}
        ><ZoomOut size={16} /></button>
        <button
          onClick={() => { canvasX.set(0); canvasY.set(0); setZoom(isMobile ? 0.6 : 0.8); }}
          className="size-10 md:size-12 border flex items-center justify-center transition-all rounded-full md:rounded-none text-zinc-400 hover:text-white"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: 'rgba(255, 255, 255, 0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_950}
        ><Globe size={16} /></button>
      </div>

      <AnimatePresence>
        {selectedId && (
          <FullArchiveView
            item={data.find(d => d.slug === selectedId) as Celebration}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function DataSlab({ item, index, isMobile, onExpand }: { item: Celebration, index: number, isMobile: boolean, onExpand: () => void }) {
  const initialX = useMemo(() => (Math.random() - 0.5) * (isMobile ? 600 : 1400), [isMobile])
  const initialY = useMemo(() => (Math.random() - 0.5) * (isMobile ? 1000 : 800), [isMobile])
  const rotation = useMemo(() => (Math.random() - 0.5) * 6, [])

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: initialX, y: initialY, opacity: 0, rotate: rotation }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02, zIndex: 1000 }}
      whileDrag={{ scale: 1.05, zIndex: 1001 }}
      onClick={(e) => {
        if (isMobile) onExpand()
      }}
      className="absolute w-[280px] md:w-[340px] p-1 border flex flex-col group cursor-grab shadow-[20px_20px_40px_rgba(0,0,0,0.8)] touch-none"
      style={{
        backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 15px)'
      }}
    >
      <div className="relative aspect-[16/10] bg-black overflow-hidden">
        <Image src={item.assets.primary.url} alt="" fill className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" />
        <div
          className="absolute top-3 left-3 text-[8px] font-black px-2 py-0.5 skew-x-[-15deg]"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, color: DESIGN_SYSTEM.COLORS.BLACK }}
        >
          {item.details.prestige.toUpperCase()}
        </div>
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm cursor-pointer" onClick={onExpand}>
            <Maximize2 className="text-white" size={24} />
          </div>
        )}
      </div>

      <div className="p-4 md:p-5 space-y-3 md:space-y-4">
        <h4 className="text-[11px] md:text-[13px] font-black italic text-white uppercase tracking-tighter leading-none">
          {item.name.replace(/_/g, ' ')}
        </h4>
        <div className="flex justify-between items-center border-t pt-3 md:pt-4" style={{ borderTopColor: 'rgba(255, 255, 255, 0.05)' }}>
          <div className={cn("flex items-center gap-2 text-[7px] md:text-[8px] text-zinc-500 font-bold uppercase italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
            <Calendar size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} /> {new Date(item.createdAt).getFullYear()}
          </div>
          <span className="text-[7px] md:text-[8px] font-mono text-zinc-700 tracking-tighter">NODE_{item.id}</span>
        </div>
      </div>
    </motion.div>
  )
}

function FullArchiveView({ item, onClose }: { item: Celebration, onClose: () => void }) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-0 md:p-6 bg-black/98 backdrop-blur-3xl"
    >
      <div
        className="w-full h-full md:h-[85vh] max-w-7xl flex flex-col lg:flex-row md:border overflow-hidden relative"
        style={{
          backgroundColor: '#050505',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: `0 0 100px ${DESIGN_SYSTEM.COLORS.PRIMARY_MUTED}`
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-10 md:right-10 p-3 md:p-5 text-white bg-black/80 md:bg-black/50 rounded-full z-[2100] transition-colors border"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.PRIMARY}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          <X size={24} className="md:w-8 md:h-8" />
        </button>

        <div className="relative h-[40vh] md:h-auto md:flex-1 bg-black overflow-hidden border-b lg:border-b-0 lg:border-r shrink-0" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <Image src={item.assets.primary.url} alt="" fill className="object-cover opacity-60" priority />
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:w-[550px] lg:flex-none flex flex-col justify-between relative bg-[#080808]">
          <div className="space-y-8 md:space-y-12">
            <div className="flex flex-col gap-2">
              <span
                className={cn("text-[8px] md:text-[9px] font-black uppercase italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}
                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
              >
                Record_Initialized
              </span>
              <h3 className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-[0.85] break-words max-w-3/5">
                {item.name.replace(/_/g, ' ')}
              </h3>
            </div>

            <div className="space-y-6">
              <p
                className="text-zinc-400 text-sm md:text-lg font-bold italic leading-relaxed uppercase border-l-4 pl-4 md:pl-8"
                style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
              >
                {item.basics.description}
              </p>
              <div className="grid grid-cols-2 gap-px bg-white/5 border" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <MetaField label="PRESTIGE" value={item.details.prestige} />
                <MetaField label="ACCESS" value={item.details.exclusivity} />
                <MetaField label="STAMP" value={new Date(item.createdAt).toLocaleDateString()} />
                <MetaField label="TAGS" value={item.tags?.slice(0, 2).join(', ') || 'N/A'} />
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-0 pt-8">
            <ClippedButton
              label="INITIALIZE_DOSSIER"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => router.push(`/celebrations/${item.slug}`)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MetaField({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-3 md:p-5 flex flex-col gap-1 bg-black/40">
      <span className={cn("text-[6px] md:text-[7px] font-black text-zinc-600 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>{label}</span>
      <span className="text-[9px] md:text-[10px] font-mono text-zinc-200 uppercase truncate">{value}</span>
    </div>
  )
}