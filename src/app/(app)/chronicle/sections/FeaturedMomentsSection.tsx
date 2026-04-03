'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import {
  Maximize2,
  X,
  ShieldAlert,
  Trophy,
  Calendar
} from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export interface ChronicleItem {
  id: number
  type: 'INCIDENT' | 'AWARD'
  name: string
  basics: { description: string }
  details?: {
    content?: {
      narrative?: string
    }
  }
  assets: {
    thumbnail: string
  }
  timestamp: string
}

export default function FeaturedMomentsSection({ items = CHRONICLE_DATA }: { items?: ChronicleItem[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const canvasX = useMotionValue(0)
  const canvasY = useMotionValue(0)
  const springX = useSpring(canvasX, { stiffness: 60, damping: 20 })
  const springY = useSpring(canvasY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    setHasMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const selectedItem = useMemo(() => items.find(i => i.id === selectedId), [selectedId, items])

  if (!hasMounted) return <div className="w-full h-screen bg-black" />

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black border-t border-zinc-900 touch-none">
      <motion.div
        drag
        dragMomentum={true}
        style={{ x: springX, y: springY, scale: isMobile ? 0.7 : 0.85 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-crosshair"
      >
        <div
          className="absolute inset-0 w-[4000px] h-[4000px] -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${DESIGN_SYSTEM.COLORS.WHITE} 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
        />

        <AnimatePresence>
          {items.map((item) => (
            <ChronicleSlab
              key={item.id}
              item={item}
              isMobile={isMobile}
              onExpand={() => setSelectedId(item.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-[100] pointer-events-none">
        <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white">
          FEATURED_<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>MOMENTS</span>
        </h2>
      </div>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <ChronicleModal
            item={selectedItem}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ChronicleSlab({ item, isMobile, onExpand }: { item: ChronicleItem, isMobile: boolean, onExpand: () => void }) {
  const [coords, setCoords] = useState({ x: 0, y: 0, rotate: 0 })

  useEffect(() => {
    setCoords({
      x: (Math.random() - 0.5) * (isMobile ? 800 : 2200),
      y: (Math.random() - 0.5) * (isMobile ? 1200 : 1400),
      rotate: (Math.random() - 0.5) * 10
    })
  }, [isMobile])

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0 }}
      animate={{ x: coords.x, y: coords.y, rotate: coords.rotate, opacity: 1 }}
      whileHover={{ scale: 1.02, zIndex: 1000 }}
      whileDrag={{ scale: 1.05, zIndex: 1001 }}
      onClick={() => isMobile && onExpand()}
      className="absolute w-[280px] md:w-[320px] p-1 bg-zinc-950 border border-white/5 flex flex-col group cursor-grab shadow-2xl"
      style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
    >
      <div className="relative aspect-video bg-black overflow-hidden">
        <Image src={item.assets.thumbnail} alt="" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
        <div
          className="absolute top-3 left-3 flex items-center gap-2 px-2 py-0.5 skew-x-[-15deg] z-10"
          style={{ backgroundColor: item.type === 'AWARD' ? DESIGN_SYSTEM.COLORS.PRIMARY : '#ef4444' }}
        >
          {item.type === 'AWARD' ? <Trophy size={8} color="black" /> : <ShieldAlert size={8} color="white" />}
          <span className="text-[8px] font-black italic uppercase text-inherit">{item.type}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm cursor-pointer" onClick={onExpand}>
          <Maximize2 className="text-white" size={24} />
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-xs font-black italic text-white uppercase tracking-tighter truncate group-hover:text-primary transition-colors">
          {item.name.replace(/_/g, ' ')}
        </h4>
        <div className="flex justify-between items-center border-t border-white/5 mt-3 pt-3">
          <div className="flex items-center gap-1.5 text-[8px] text-zinc-500 font-bold uppercase italic">
            <Calendar size={8} /> {new Date(item.timestamp).getFullYear()}
          </div>
          <span className="text-[7px] font-mono text-zinc-700">REF_{item.id}</span>
        </div>
      </div>
    </motion.div>
  )
}

function ChronicleModal({ item, onClose }: { item: ChronicleItem, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/98 backdrop-blur-md"
    >
      <div className="w-full h-full max-w-5xl flex flex-col md:flex-row border border-white/10 overflow-hidden relative bg-[#050505]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white hover:text-primary z-[2100] transition-colors"><X size={24} /></button>
        <div className="relative h-[30vh] md:h-auto md:flex-[1.2] border-b md:border-b-0 md:border-r border-white/10 bg-black">
          <Image src={item.assets.thumbnail} alt="" fill className="object-cover opacity-60" priority />
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none break-words">
              {item.name.replace(/_/g, ' ')}
            </h3>
            <div className="space-y-6">
              <p className="text-zinc-400 text-sm md:text-base font-bold italic leading-tight uppercase border-l-2 pl-4 md:pl-6" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                {item.basics.description}
              </p>
              <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/10">
                <MetaField label="TIMESTAMP" value={new Date(item.timestamp).toLocaleDateString()} />
                <MetaField label="TYPE" value={item.type} />
                <MetaField label="STAMP" value={item.id.toString(16).toUpperCase()} />
                <MetaField label="STATUS" value="ARCHIVED" />
              </div>
              {item.details?.content?.narrative && (
                <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed">
                    {item.details.content.narrative}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MetaField({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-3 md:p-4 flex flex-col gap-0.5 bg-black/60 overflow-hidden">
      <span className="text-[6px] font-black text-zinc-600 uppercase tracking-wider">{label}</span>
      <span className="text-[9px] font-mono text-zinc-300 uppercase truncate">{value}</span>
    </div>
  )
}

const CHRONICLE_DATA: ChronicleItem[] = [
  { id: 101, type: 'AWARD', name: 'PODIUM_FINISH_DESERT_CUP', basics: { description: 'Secured P1 in extreme high-temp environment.' }, assets: { thumbnail: 'https://picsum.photos/seed/101/800/600' }, timestamp: '2024-01-15' },
  { id: 102, type: 'INCIDENT', name: 'SUSPENSION_GEOMETRY_FAILURE', basics: { description: 'Structural collapse of the front-left wishbone.' }, assets: { thumbnail: 'https://picsum.photos/seed/102/800/600' }, timestamp: '2024-02-20' },
  { id: 103, type: 'AWARD', name: 'AERODYNAMIC_EFFICIENCY_STAMP', basics: { description: 'Exceeded drag-reduction targets by 14%.' }, assets: { thumbnail: 'https://picsum.photos/seed/103/800/600' }, timestamp: '2024-03-10' },
  { id: 104, type: 'INCIDENT', name: 'TELEMETRY_LATENCY_SPIKE', basics: { description: 'Lost data packets during high-speed sensor sweep.' }, assets: { thumbnail: 'https://picsum.photos/seed/104/800/600' }, timestamp: '2024-04-05' },
  { id: 105, type: 'AWARD', name: 'INNOVATION_IN_COOLING', basics: { description: 'New radiator alloy patent confirmed.' }, assets: { thumbnail: 'https://picsum.photos/seed/105/800/600' }, timestamp: '2024-05-12' },
  { id: 106, type: 'INCIDENT', name: 'CHASSIS_STRESS_FRACTURE', basics: { description: 'Micro-fractures detected post-endurance run.' }, assets: { thumbnail: 'https://picsum.photos/seed/106/800/600' }, timestamp: '2024-06-25' },
  { id: 107, type: 'AWARD', name: 'TEAM_SYNERGY_AWARD', basics: { description: 'Record pit-stop time achieved: 1.92s.' }, assets: { thumbnail: 'https://picsum.photos/seed/107/800/600' }, timestamp: '2024-07-30' },
  { id: 108, type: 'INCIDENT', name: 'ECU_MAPPING_ERRATA', basics: { description: 'Incorrect air-fuel ratio caused engine stall.' }, assets: { thumbnail: 'https://picsum.photos/seed/108/800/600' }, timestamp: '2024-08-14' },
  { id: 109, type: 'AWARD', name: 'DESIGN_SYSTEM_INTEGRATION', basics: { description: 'Full migration to CLI-based engineering docs.' }, assets: { thumbnail: 'https://picsum.photos/seed/109/800/600' }, timestamp: '2024-09-02' },
  { id: 110, type: 'INCIDENT', name: 'THERMAL_THROTTLING_EVENT', basics: { description: 'Inverter temp exceeded 110C during qualifying.' }, assets: { thumbnail: 'https://picsum.photos/seed/110/800/600' }, timestamp: '2024-10-18' },
  { id: 111, type: 'AWARD', name: 'SUSTAINABILITY_CREDENTIAL', basics: { description: 'Zero-waste workshop certification received.' }, assets: { thumbnail: 'https://picsum.photos/seed/111/800/600' }, timestamp: '2024-11-11' },
  { id: 112, type: 'INCIDENT', name: 'TRANSMISSION_SLIPPAGE', basics: { description: 'Gearbox wear exceeded projected lifecycle.' }, assets: { thumbnail: 'https://picsum.photos/seed/112/800/600' }, timestamp: '2024-12-05' },
  { id: 113, type: 'AWARD', name: 'LIVERY_OF_THE_YEAR', basics: { description: 'Mechanical Brutalist aesthetic voted #1.' }, assets: { thumbnail: 'https://picsum.photos/seed/113/800/600' }, timestamp: '2025-01-08' },
  { id: 114, type: 'INCIDENT', name: 'SOFTWARE_KERNEL_PANIC', basics: { description: 'Autonomous pilot sub-system crashed during boot.' }, assets: { thumbnail: 'https://picsum.photos/seed/114/800/600' }, timestamp: '2025-02-14' },
  { id: 115, type: 'AWARD', name: 'BEST_INFRASTRUCTURE_BUILD', basics: { description: 'Custom server rack deployment completed.' }, assets: { thumbnail: 'https://picsum.photos/seed/115/800/600' }, timestamp: '2025-03-22' },
  { id: 116, type: 'INCIDENT', name: 'HYDRAULIC_FLUID_LEAK', basics: { description: 'Pressure drop in active damping system.' }, assets: { thumbnail: 'https://picsum.photos/seed/116/800/600' }, timestamp: '2025-04-10' },
  { id: 117, type: 'AWARD', name: 'GRID_POSITION_POLE', basics: { description: 'Fastest lap time in season opener.' }, assets: { thumbnail: 'https://picsum.photos/seed/117/800/600' }, timestamp: '2025-05-01' },
  { id: 118, type: 'INCIDENT', name: 'SENSOR_ARRAY_BLINDNESS', basics: { description: 'Sand ingress disabled LIDAR calibration.' }, assets: { thumbnail: 'https://picsum.photos/seed/118/800/600' }, timestamp: '2025-06-19' },
  { id: 119, type: 'AWARD', name: 'V3_CHASSIS_VALIDATION', basics: { description: 'Final sign-off for competition use.' }, assets: { thumbnail: 'https://picsum.photos/seed/119/800/600' }, timestamp: '2025-07-04' },
  { id: 120, type: 'INCIDENT', name: 'BATTERY_CELL_DEGRADATION', basics: { description: 'Unplanned capacity loss in Unit B.' }, assets: { thumbnail: 'https://picsum.photos/seed/120/800/600' }, timestamp: '2025-08-12' },
  { id: 121, type: 'AWARD', name: 'STRATEGIC_ALIGNMENT_SUCCESS', basics: { description: '10-person unit operating at 98% efficiency.' }, assets: { thumbnail: 'https://picsum.photos/seed/121/800/600' }, timestamp: '2025-09-30' },
  { id: 122, type: 'INCIDENT', name: 'BRAKE_PAD_CRYSTALLIZATION', basics: { description: 'Heat soak caused surface hardening.' }, assets: { thumbnail: 'https://picsum.photos/seed/122/800/600' }, timestamp: '2025-10-21' }
]