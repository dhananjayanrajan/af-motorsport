'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Hash,
  Info,
  X
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

export function VisualMonumentSection({ data }: { data?: any[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const monuments = data || DUMMY_ARCHIVE

  return (
    <section
      className="relative w-full py-32 border-t font-sans"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Database className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className={cn("text-[10px] font-black text-zinc-500 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Multimedia_Asset_Matrix</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.85]">
            THE<br />
            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>MONUMENT</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {monuments.map((item, idx) => {
            const thumbUrl = getSafeThumbnail(item)
            return (
              <motion.div
                key={item.id || `node-${idx}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                onClick={() => setSelectedIdx(idx)}
                className="relative aspect-square bg-zinc-900 group cursor-crosshair overflow-hidden border border-white/5"
              >
                <Image
                  src={thumbUrl}
                  alt={item.name || "Archive Node"}
                  fill
                  unoptimized={thumbUrl.includes('unsplash')}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Hash size={8} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span className="text-[8px] font-mono text-white">{(idx + 1).toString().padStart(2, '0')}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <MonumentLightbox
            item={monuments[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
            onPrev={() => setSelectedIdx(prev => prev! > 0 ? prev! - 1 : monuments.length - 1)}
            onNext={() => setSelectedIdx(next => next! < monuments.length - 1 ? next! + 1 : 0)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function MonumentLightbox({ item, onClose, onPrev, onNext }: { item: any, onClose: () => void, onPrev: () => void, onNext: () => void }) {
  const isPlaylist = item.collectionType === 'playlist'

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4"
    >
      <div
        className="max-w-[1400px] w-full h-full md:h-[90vh] flex flex-col relative border shadow-2xl"
        style={{
          backgroundColor: '#050505',
          borderColor: 'rgba(255,255,255,0.1)',
          boxShadow: `0 0 100px ${DESIGN_SYSTEM.COLORS.PRIMARY}1a`
        }}
      >

        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Database size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className={cn("text-[10px] font-black text-white uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>{item.name || "UNNAMED_NODE"}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div
                className="size-1 rounded-full animate-pulse"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
              />
              <span className="text-[9px] font-mono text-zinc-500 uppercase">{item.collectionType || "RECORD"}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          {isPlaylist ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                src={item.details?.videos?.[0]?.url || item.details?.clips?.[0]?.url}
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted
              />
            </div>
          ) : (
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full max-h-[75vh] max-w-[95%]">
              <Image
                src={getRawAssetUrl(item)}
                alt={item.name}
                fill
                unoptimized={getRawAssetUrl(item).includes('unsplash')}
                className="object-contain"
                priority
              />
            </motion.div>
          )}

          <button
            onClick={onPrev}
            className="absolute left-6 p-4 text-white/20 transition-colors z-50 hover:text-primary"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.PRIMARY}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-6 p-4 text-white/20 transition-colors z-50 hover:text-primary"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = DESIGN_SYSTEM.COLORS.PRIMARY}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
          >
            <ChevronRight size={48} />
          </button>
        </div>

        <div className="p-8 border-t border-white/5 flex flex-col md:flex-row gap-12 items-start justify-between bg-[#080808]">
          <div className="flex-1 space-y-4">
            {item.basics?.description && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span className={cn("text-[8px] font-black text-zinc-600 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>TRANSMISSION_SUMMARY</span>
                </div>
                <p className="text-xs font-bold text-zinc-400 uppercase italic tracking-tight leading-relaxed max-w-2xl">
                  {item.basics.description}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 shrink-0">
            <Metric label="TIMESTAMP" value={new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleDateString()} />
            <Metric label="ACCESS" value={item.toggle || 'STANDARD'} />
            {item.traits?.quality && <Metric label="DEFINITION" value={item.traits.quality} />}
            {item.traits?.format && <Metric label="ASPECT" value={item.traits.format} />}
            {!item.traits && <Metric label="SOURCE" value="STATIC_NODE" />}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function getSafeThumbnail(item: any): string {
  const possibleImage =
    item.details?.images?.[0]?.url ||
    item.details?.designs?.[0]?.url ||
    item.seo?.image?.url ||
    item.details?.image?.url;
  return typeof possibleImage === 'string' ? possibleImage : 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600'
}

function getRawAssetUrl(item: any): string {
  return (
    item.details?.designs?.[0]?.url ||
    item.details?.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200'
  )
}

function Metric({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={cn("text-[7px] font-black text-zinc-600 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>{label}</span>
      <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-tighter">{value}</span>
    </div>
  )
}

const DUMMY_ARCHIVE = [
  {
    id: 1,
    collectionType: 'visualization',
    name: 'CHASSIS_STRESS_MAP',
    toggle: 'advanced',
    basics: { description: 'Interactive design node showing structural stress points.' },
    details: { designs: [{ url: 'https://images.unsplash.com/photo-1547744037-b80bdba1b6f0?q=80&w=1200' }] },
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 2,
    collectionType: 'playlist',
    name: 'PIT_EXIT_SEQUENCE',
    toggle: 'simple',
    basics: { description: 'Video capture of brake temperature dissipation.' },
    seo: { image: { url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600' } },
    details: { videos: [{ url: 'https://www.w3schools.com/html/mov_bbb.mp4' }] },
    traits: { quality: '4K', format: 'Wide' },
    createdAt: '2026-02-15T14:20:00Z'
  }
]