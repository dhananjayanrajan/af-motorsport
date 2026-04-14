'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { ChevronLeft, ChevronRight, History, Swords, X, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Rivalry {
  id: string
  name: string
  avatar: string
  totalRaces: number
  wins: number
  losses: number
  lastEncounter: string
  status: 'DOMINATED' | 'CONTESTED' | 'THREAT'
  metrics: {
    avgGap: string
    reliability: string
    aggression: number
  }
  history: {
    event: string
    date: string
    result: string
    gap: string
  }[]
}

const RIVALS: Rivalry[] = [
  {
    id: 'r1',
    name: 'VELOCITY_CORP',
    avatar: 'VC',
    totalRaces: 56,
    wins: 41,
    losses: 15,
    lastEncounter: 'SUZUKA_INTER',
    status: 'DOMINATED',
    metrics: { avgGap: '-0.380s', reliability: '99%', aggression: 45 },
    history: [
      { event: 'SUZUKA GP', date: '2026-03-12', result: 'WIN / LOSS', gap: '-2.4s' },
      { event: 'MONZA SPEEDWAY', date: '2025-11-02', result: 'WIN / WIN', gap: '-0.8s' }
    ]
  },
  {
    id: 'r2',
    name: 'ZENITH_RACING',
    avatar: 'ZR',
    totalRaces: 38,
    wins: 19,
    losses: 19,
    lastEncounter: 'SPA_FRANCORCHAMPS',
    status: 'CONTESTED',
    metrics: { avgGap: '+0.004s', reliability: '96%', aggression: 82 },
    history: [
      { event: 'SPA FRANCORCHAMPS', date: '2026-02-28', result: 'LOSS / WIN', gap: '+0.1s' },
      { event: 'SILVERSTONE', date: '2025-12-15', result: 'WIN / LOSS', gap: '-0.3s' }
    ]
  },
  {
    id: 'r3',
    name: 'TITAN_DYNAMICS',
    avatar: 'TD',
    totalRaces: 14,
    wins: 5,
    losses: 9,
    lastEncounter: 'MONACO_STREETS',
    status: 'THREAT',
    metrics: { avgGap: '+0.890s', reliability: '94%', aggression: 98 },
    history: [
      { event: 'MONACO STREETS', date: '2026-03-22', result: 'LOSS / LOSS', gap: '+4.2s' },
      { event: 'INTERLAGOS', date: '2025-10-04', result: 'LOSS / WIN', gap: '+1.5s' }
    ]
  }
]

const INFINITE_RIVALS = [...RIVALS, ...RIVALS, ...RIVALS]

export function RivalsOvercomeSection() {
  const [selectedRival, setSelectedRival] = useState<Rivalry | null>(null)
  const [matrixLines, setMatrixLines] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  useEffect(() => {
    const lines = [...Array(5)].map(() =>
      Array(30).fill(0).map(() => Math.round(Math.random())).join('')
    )
    setMatrixLines(lines)

    if (scrollRef.current) {
      const singleSetWidth = scrollRef.current.scrollWidth / 3
      scrollRef.current.scrollLeft = singleSetWidth
    }
  }, [])

  const handleInfiniteScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth } = scrollRef.current
    const singleSetWidth = scrollWidth / 3

    if (scrollLeft <= 10) {
      scrollRef.current.scrollLeft = singleSetWidth
    } else if (scrollLeft >= singleSetWidth * 2 - 10) {
      scrollRef.current.scrollLeft = singleSetWidth
    }
  }

  const manualScroll = useCallback((direction: 'left' | 'right') => {
    if (isScrolling.current || !scrollRef.current) return

    isScrolling.current = true
    const { scrollLeft, offsetWidth } = scrollRef.current
    const cardWidth = window.innerWidth < 768 ? offsetWidth : 480
    const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth

    scrollRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    })

    setTimeout(() => {
      isScrolling.current = false
    }, 500)
  }, [])

  return (
    <section
      className="py-32 overflow-hidden border-t"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .fade-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        .matrix-text {
          writing-mode: vertical-rl;
          text-orientation: upright;
          font-size: 8px;
          line-height: 1;
          letter-spacing: 2px;
          font-family: monospace;
          color: ${DESIGN_SYSTEM.COLORS.PRIMARY_MUTED};
        }
      `}} />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto mb-20">
          <div className="flex items-center gap-4 mb-6">
            <Swords className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className={cn("text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]")}>COMPETITIVE_INTEL_STREAM</span>
          </div>
          <h2 className="text-6xl md:text-[8rem] font-black italic text-white tracking-tighter uppercase leading-[0.8]">
            THE<br />
            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>ADVERSARIES</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 relative">
          <div
            className="lg:w-[450px] flex-shrink-0 p-8 md:p-12 relative z-30 border shadow-2xl"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
          >
            <div className="absolute top-0 right-0 w-[2px] h-16" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />

            <div className="absolute inset-0 z-0 opacity-10 flex justify-around pointer-events-none">
              {matrixLines.map((line, i) => (
                <motion.div
                  key={i}
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                  className="matrix-text"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div>
                <div className="flex items-center gap-4 mb-16">
                  <div className="size-2 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <span className="text-[10px] font-black text-white uppercase italic tracking-widest">Global_Dominance_Index</span>
                </div>

                <div className="space-y-12">
                  <div>
                    <span className="text-[8px] font-black text-zinc-700 uppercase block mb-3 tracking-widest">H2H_VICTORY_RATE</span>
                    <span className="text-5xl font-black italic text-white tracking-tighter">78.5%</span>
                    <div className="h-1 mt-6 flex gap-1.5">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="h-full flex-1 transition-colors"
                          style={{ backgroundColor: i < 9 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_900 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 md:p-6 bg-black border border-zinc-900 group/stat hover:border-primary/50 transition-colors">
                      <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">Market_Cap_Lead</span>
                      <span className="block text-xl md:text-2xl font-black text-white italic mt-1">+12.4%</span>
                    </div>
                    <div className="p-4 md:p-6 bg-black border border-zinc-900 group/stat hover:border-primary/50 transition-colors">
                      <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">Tech_Superiority</span>
                      <span className="block text-xl md:text-2xl font-black italic mt-1" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>ALPHA</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex gap-4 mb-10">
                  <button
                    onClick={() => manualScroll('left')}
                    className="flex-1 bg-zinc-900 hover:bg-primary hover:text-black py-5 flex items-center justify-center transition-all border border-white/5 active:scale-95"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => manualScroll('right')}
                    className="flex-1 bg-zinc-900 hover:bg-primary hover:text-black py-5 flex items-center justify-center transition-all border border-white/5 active:scale-95"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Zap size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Telemetry_Sync: Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleInfiniteScroll}
            className="flex-1 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory fade-mask relative z-10"
          >
            <div className="flex">
              {INFINITE_RIVALS.map((rival, index) => (
                <div
                  key={`${rival.id}-${index}`}
                  className="min-w-full md:min-w-[480px] flex-shrink-0 snap-start cursor-pointer group relative p-1"
                  onClick={() => setSelectedRival(rival)}
                >
                  <div className="absolute inset-0 z-0 border border-zinc-900 transition-all duration-700 bg-zinc-950 md:-skew-x-12 group-hover:border-primary/30" />

                  <div className="relative z-10 h-full flex flex-col justify-between p-12 md:p-20">
                    <div>
                      <div className="flex justify-between items-start mb-16">
                        <span className="text-6xl md:text-7xl font-black italic tracking-tighter text-zinc-900 group-hover:text-primary transition-colors">
                          {rival.avatar}
                        </span>
                        <div className={cn(
                          "text-[9px] font-black px-5 py-2 italic tracking-[0.2em] transition-all md:skew-x-[-12deg]",
                          rival.status === 'DOMINATED' ? 'bg-zinc-100 text-black' :
                            rival.status === 'CONTESTED' ? 'bg-zinc-800 text-white' :
                              'bg-primary text-black'
                        )}>
                          {rival.status}
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-black italic text-white mb-8 uppercase tracking-tighter group-hover:translate-x-3 transition-transform">
                        {rival.name}
                      </h3>

                      <div className="space-y-8 border-t border-zinc-900 pt-10">
                        <div className="grid grid-cols-2 gap-10">
                          <div>
                            <span className="text-[8px] font-black text-zinc-700 uppercase block mb-2 tracking-widest">DRAG_DIFF</span>
                            <span className="text-2xl md:text-3xl font-black italic text-white leading-none">{rival.metrics.avgGap}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-black text-zinc-700 uppercase block mb-2 tracking-widest">RELIABILITY</span>
                            <span className="text-2xl md:text-3xl font-black italic text-white leading-none">{rival.metrics.reliability}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Threat_Level</span>
                            <span className="text-[10px] font-mono text-zinc-500">{rival.metrics.aggression}%</span>
                          </div>
                          <div className="h-1 w-full bg-zinc-900 overflow-hidden flex">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${rival.metrics.aggression}%` }}
                              className="h-full"
                              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-16 flex items-center justify-between">
                      <div className="flex items-center gap-4 py-3 px-6 border border-zinc-900 group-hover:border-primary/50 transition-colors">
                        <History size={16} className="text-zinc-700 group-hover:text-primary" />
                        <span className="text-[9px] font-black text-zinc-500 uppercase italic group-hover:text-white">ACCESS_HISTORY</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-800 uppercase italic">ID: {rival.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedRival && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRival(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col lg:flex-row"
              style={{ clipPath: 'polygon(0 0, 97% 0, 100% 3%, 100% 100%, 3% 100%, 0 97%)' }}
            >
              <div className="lg:w-1/3 p-8 md:p-12 bg-zinc-900 flex flex-col justify-between border-r border-zinc-800 relative flex-shrink-0">
                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                <div className="relative z-10">
                  <button onClick={() => setSelectedRival(null)} className="p-3 bg-black border border-zinc-800 hover:bg-white hover:text-black transition-all mb-12">
                    <X size={20} />
                  </button>
                  <span className="text-[10px] font-black uppercase mb-4 block italic tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Competitor_Profile</span>
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-10 break-words">{selectedRival.name}</h4>
                </div>
                <div className="pt-12 border-t border-zinc-800 mt-auto">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[8px] font-black text-zinc-700 uppercase block mb-2 tracking-widest">Total_Encounters</span>
                      <span className="text-3xl md:text-4xl font-black italic text-white">{selectedRival.totalRaces}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-black text-zinc-700 uppercase block mb-2 tracking-widest">AFM_Victories</span>
                      <span className="text-3xl md:text-4xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{selectedRival.wins}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-black overflow-hidden flex flex-col min-h-0">
                <div className="p-8 md:p-12 pb-4 border-b border-zinc-900 flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <History size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">ENGAGEMENT_LOGS_ARCHIVE</span>
                  </div>
                </div>

                <div className="flex-1 p-8 md:p-12 pt-4 overflow-y-auto scrollbar-hide space-y-6">
                  {selectedRival.history.map((log, i) => (
                    <div
                      key={i}
                      className="p-6 md:p-8 bg-zinc-950 border border-zinc-900 hover:border-primary/40 transition-colors flex-shrink-0"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
                    >
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                        <div className="min-w-0">
                          <span className="text-[9px] font-mono text-zinc-700 block mb-2 uppercase tracking-widest">{log.date}</span>
                          <span className="text-lg md:text-xl font-black text-white italic uppercase tracking-tight truncate block">{log.event}</span>
                        </div>
                        <div className="flex gap-8 md:gap-12 flex-shrink-0">
                          <div>
                            <span className="text-[8px] font-black text-zinc-700 uppercase block mb-1 tracking-widest">DELTA</span>
                            <span className="text-xl md:text-2xl font-black text-white italic">{log.gap}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-black text-zinc-700 uppercase block mb-1 tracking-widest">OUTCOME</span>
                            <span className="text-xl md:text-2xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{log.result}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="h-8 flex-shrink-0" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}