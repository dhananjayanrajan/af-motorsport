'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { ChevronLeft, ChevronRight, Gauge, History, Swords, Target, Trophy, X } from 'lucide-react'
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
    name: 'V. SOKOLOV',
    avatar: 'VS',
    totalRaces: 42,
    wins: 28,
    losses: 14,
    lastEncounter: 'SUZUKA_GP',
    status: 'DOMINATED',
    metrics: { avgGap: '-0.420s', reliability: '98%', aggression: 72 },
    history: [
      { event: 'SUZUKA GP', date: '2026-10-12', result: 'P1 / P4', gap: '-2.4s' },
      { event: 'MONZA SPEEDWAY', date: '2026-09-02', result: 'P1 / P2', gap: '-0.8s' }
    ]
  },
  {
    id: 'r2',
    name: 'MARCUS WOLF',
    avatar: 'MW',
    totalRaces: 31,
    wins: 16,
    losses: 15,
    lastEncounter: 'SPA_FRANCORCHAMPS',
    status: 'CONTESTED',
    metrics: { avgGap: '+0.012s', reliability: '94%', aggression: 89 },
    history: [
      { event: 'SPA FRANCORCHAMPS', date: '2026-08-28', result: 'P2 / P1', gap: '+0.1s' },
      { event: 'SILVERSTONE', date: '2026-07-15', result: 'P1 / P2', gap: '-0.3s' }
    ]
  },
  {
    id: 'r3',
    name: 'Y. TANAKA',
    avatar: 'YT',
    totalRaces: 12,
    wins: 4,
    losses: 8,
    lastEncounter: 'MONACO_STREETS',
    status: 'THREAT',
    metrics: { avgGap: '+1.105s', reliability: '91%', aggression: 95 },
    history: [
      { event: 'MONACO STREETS', date: '2026-05-22', result: 'P3 / P1', gap: '+4.2s' },
      { event: 'INTERLAGOS', date: '2025-11-04', result: 'P4 / P2', gap: '+1.5s' }
    ]
  },
  {
    id: 'r4',
    name: 'E. COSTA',
    avatar: 'EC',
    totalRaces: 18,
    wins: 12,
    losses: 6,
    lastEncounter: 'SAO_PAULO',
    status: 'DOMINATED',
    metrics: { avgGap: '-0.215s', reliability: '96%', aggression: 65 },
    history: [
      { event: 'SAO PAULO', date: '2026-11-15', result: 'P1 / P5', gap: '-5.1s' }
    ]
  }
]

const INFINITE_RIVALS = [...RIVALS, ...RIVALS, ...RIVALS]

export function RivalsOvercomeSection({ data }: { data?: any }) {
  const [selectedRival, setSelectedRival] = useState<Rivalry | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  useEffect(() => {
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
    const cardWidth = window.innerWidth < 768 ? offsetWidth : 440
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
      className="py-24 overflow-hidden border-t"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}
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
        @media (max-width: 768px) {
          .fade-mask { mask-image: none; }
        }
      `}} />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Swords className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            <span className={cn("text-[10px] font-black text-zinc-500 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Competition_Archive_Matrix</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.85]">
            RIVALS<br />
            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>OVERCOME</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 relative">
          <div
            className="lg:w-[400px] flex-shrink-0 p-10 relative z-30 border shadow-[20px_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${DESIGN_SYSTEM.COLORS.PRIMARY_MUTED}, transparent)` }} />
            <div className="absolute top-0 right-0 w-[2px] h-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: `0 0 15px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` }} />
            <div className="absolute bottom-0 left-0 w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: `0 0 15px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` }} />

            <div className="absolute inset-0 z-0 opacity-20 flex justify-around pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.8
                  }}
                  className="matrix-text"
                >
                  {Array(20).fill(0).map(() => Math.round(Math.random())).join('')}
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                    className="size-3"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: `0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` }}
                  />
                  <span className={cn("text-[10px] font-black text-white uppercase italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>Performance_Coefficient</span>
                </div>

                <div className="space-y-8">
                  <div>
                    <span className={cn("text-[8px] font-bold text-zinc-600 uppercase block mb-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>H2H_Dominance</span>
                    <span className="text-4xl font-black italic text-white tracking-tighter">74.2%</span>
                    <div className="h-1 mt-4 overflow-hidden flex gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }}>
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="h-full flex-1"
                          style={{
                            backgroundColor: i < 7 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_800,
                            boxShadow: i < 7 ? `0 0 5px ${DESIGN_SYSTEM.COLORS.PRIMARY_MUTED}` : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black border relative group/stat" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                      <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }} />
                      <span className="text-[7px] font-black text-zinc-600 uppercase">Season_Wins</span>
                      <span className="block text-xl font-black text-white italic">64</span>
                    </div>
                    <div className="p-4 bg-black border relative group/stat" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                      <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }} />
                      <span className="text-[7px] font-black text-zinc-600 uppercase">Global_Rank</span>
                      <span className="block text-xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>#04</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex gap-3 mb-8">
                  <button
                    onClick={() => manualScroll('left')}
                    className="flex-1 hover:text-black py-4 flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95"
                    style={{
                      backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_900}
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={() => manualScroll('right')}
                    className="flex-1 hover:text-black py-4 flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95"
                    style={{
                      backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900,
                      clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.PRIMARY}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC_900}
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[8px] font-mono text-zinc-500 uppercase">Status: Elite_Tier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="size-3 text-zinc-700" />
                    <span className="text-[8px] font-mono text-zinc-500 uppercase">Consistency: 98.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleInfiniteScroll}
            className="flex-1 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory lg:snap-none fade-mask relative z-10"
          >
            <div className="flex gap-0">
              {INFINITE_RIVALS.map((rival, index) => (
                <div
                  key={`${rival.id}-${index}`}
                  className="min-w-full md:min-w-[440px] flex-shrink-0 snap-start cursor-pointer group relative"
                  onClick={() => setSelectedRival(rival)}
                >
                  <div
                    className={cn(
                      "absolute inset-0 z-0 border transition-all duration-500 md:-skew-x-12 md:origin-center md:scale-[0.94] overflow-hidden",
                      "group-hover:border-zinc-700"
                    )}
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950, borderColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
                  >
                    <div
                      className="absolute top-0 right-0 w-32 h-32 blur-[80px] group-hover:opacity-100 opacity-50 transition-colors"
                      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
                    />
                    <div className="absolute bottom-4 right-4 flex gap-1 opacity-20">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-8 bg-zinc-800 -skew-x-12" />
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between p-14 md:px-20 md:py-14">
                    <div>
                      <div className="flex justify-between items-start mb-12">
                        <div className="relative">
                          <div
                            className="text-6xl font-black italic tracking-tighter transition-colors uppercase relative z-10 text-zinc-900 group-hover:text-primary"
                            style={{ color: 'var(--primary-color)' }}
                          >
                            {rival.avatar}
                          </div>
                          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-zinc-800 group-hover:border-primary transition-colors" />
                        </div>
                        <div className={cn(
                          "text-[9px] font-black px-4 py-1.5 italic tracking-widest transition-all",
                          "md:skew-x-[-12deg] shadow-[4px_4px_0_rgba(0,0,0,0.5)]",
                          rival.status === 'DOMINATED' ? 'bg-green-600 text-white' :
                            rival.status === 'CONTESTED' ? 'bg-white text-black' :
                              'text-white group-hover:shadow-primary/20'
                        )}
                          style={rival.status === 'THREAT' ? { backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, color: DESIGN_SYSTEM.COLORS.BLACK } : {}}
                        >
                          {rival.status}
                        </div>
                      </div>

                      <h3 className="text-4xl font-black italic text-white mb-6 uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                        {rival.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-y-6 gap-x-10 border-t pt-8 relative" style={{ borderTopColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <div className="absolute top-0 left-0 w-8 h-[1px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <div>
                          <span className={cn("text-[8px] font-bold text-zinc-600 uppercase block mb-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Win_Gap</span>
                          <span className="text-2xl font-black italic text-white leading-none">{rival.metrics.avgGap}</span>
                        </div>
                        <div>
                          <span className={cn("text-[8px] font-bold text-zinc-600 uppercase block mb-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Reliability</span>
                          <span className="text-2xl font-black italic text-white leading-none">{rival.metrics.reliability}</span>
                        </div>
                        <div className="col-span-2">
                          <div className="flex justify-between items-center mb-3">
                            <span className={cn("text-[8px] font-bold text-zinc-600 uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Aggression_Rating</span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-3 h-1" style={{ backgroundColor: i < rival.metrics.aggression / 20 ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_900 }} />
                              ))}
                            </div>
                          </div>
                          <div className="h-1 w-full overflow-hidden flex" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${rival.metrics.aggression}%` }}
                              className="h-full shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                              style={{ backgroundImage: `linear-gradient(to right, ${DESIGN_SYSTEM.COLORS.ZINC_800}, ${DESIGN_SYSTEM.COLORS.PRIMARY})` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                      <div className="flex items-center gap-3 py-2 px-4 border transition-colors bg-black/40" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.PRIMARY_MUTED}>
                        <History className="size-4 text-zinc-700 transition-colors group-hover:text-primary" />
                        <span className={cn("text-[9px] font-black text-zinc-500 uppercase group-hover:text-white transition-colors italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>Analyze_Log</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-800 uppercase italic font-bold">NODE_0{(index % 4) + 1}</span>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRival(null)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-5xl border shadow-2xl overflow-hidden"
              style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950,
                borderColor: DESIGN_SYSTEM.COLORS.ZINC_900,
                clipPath: 'polygon(0 0, 98% 0, 100% 4%, 100% 100%, 2% 100%, 0 96%)'
              }}
            >
              <div className="flex flex-col lg:flex-row min-h-[550px]">
                <div className="lg:w-1/3 p-10 flex flex-col justify-between border-r relative" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900, borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                  <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                  <div>
                    <button
                      onClick={() => setSelectedRival(null)}
                      className="size-10 bg-black border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all mb-12"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                    >
                      <X className="size-5" />
                    </button>
                    <span className={cn("text-[9px] font-black tracking-[0.4em] uppercase mb-4 block italic", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Target_Profile</span>
                    <h4 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-6">{selectedRival.name}</h4>
                    <div className="flex items-center gap-3">
                      <Gauge className="size-4 text-zinc-600" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase italic">Sector_Volatility: Low</span>
                    </div>
                  </div>
                  <div className="pt-10 border-t" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Total_Races</span>
                        <span className="text-3xl font-black italic text-white">{selectedRival.totalRaces}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Wins</span>
                        <span className="text-3xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{selectedRival.wins}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-10 overflow-y-auto max-h-[70vh] lg:max-h-none bg-black">
                  <div className="flex items-center gap-4 mb-8 border-b pb-6" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}>
                    <History className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className={cn("text-[10px] font-black text-white uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>Engagement_Archive</span>
                  </div>
                  <div className="space-y-4">
                    {selectedRival.history.map((log, i) => (
                      <div
                        key={i}
                        className="p-6 border transition-all"
                        style={{
                          backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950,
                          borderColor: DESIGN_SYSTEM.COLORS.ZINC_900,
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.PRIMARY_MUTED}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.ZINC_900}
                      >
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 block mb-1 uppercase">{log.date}</span>
                            <span className="text-lg font-black text-white italic uppercase tracking-tight">{log.event}</span>
                          </div>
                          <div className="flex gap-10">
                            <div>
                              <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Gap</span>
                              <span className="text-xl font-black text-white italic">{log.gap}</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Result</span>
                              <span className="text-xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{log.result}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}