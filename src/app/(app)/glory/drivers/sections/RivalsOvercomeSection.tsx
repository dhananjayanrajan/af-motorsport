'use client'

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
    <section className="bg-black py-24 overflow-hidden border-t border-zinc-900">
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
          color: rgba(220, 38, 38, 0.15);
        }
        .card-clip {
           clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%);
        }
        @media (max-width: 768px) {
          .fade-mask { mask-image: none; }
        }
      `}} />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Swords className="size-5 text-red-600" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">Competition_Archive_Matrix</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.85]">
            RIVALS<br />
            <span className="text-red-600">OVERCOME</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 relative">
          <div className="lg:w-[400px] flex-shrink-0 bg-zinc-950 p-10 relative z-30 border border-zinc-800 shadow-[20px_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-right from-transparent via-red-600/50 to-transparent" />
            <div className="absolute top-0 right-0 w-[2px] h-12 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
            <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />

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
                    className="size-3 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Performance_Coefficient</span>
                </div>

                <div className="space-y-8">
                  <div>
                    <span className="text-[8px] font-bold text-zinc-600 uppercase block mb-2">H2H_Dominance</span>
                    <span className="text-4xl font-black italic text-white tracking-tighter">74.2%</span>
                    <div className="h-1 bg-zinc-900 mt-4 overflow-hidden flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`h-full flex-1 ${i < 7 ? 'bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.5)]' : 'bg-zinc-800'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black border border-zinc-800 relative group/stat">
                      <div className="absolute inset-0 bg-red-600/[0.03] opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                      <span className="text-[7px] font-black text-zinc-600 uppercase">Season_Wins</span>
                      <span className="block text-xl font-black text-white italic">64</span>
                    </div>
                    <div className="p-4 bg-black border border-zinc-800 relative group/stat">
                      <div className="absolute inset-0 bg-red-600/[0.03] opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                      <span className="text-[7px] font-black text-zinc-600 uppercase">Global_Rank</span>
                      <span className="block text-xl font-black text-red-600 italic">#04</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex gap-3 mb-8">
                  <button
                    onClick={() => manualScroll('left')}
                    className="flex-1 bg-zinc-900 hover:bg-red-600 py-4 flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
                  >
                    <ChevronLeft className="size-5 text-white" />
                  </button>
                  <button
                    onClick={() => manualScroll('right')}
                    className="flex-1 bg-zinc-900 hover:bg-red-600 py-4 flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)' }}
                  >
                    <ChevronRight className="size-5 text-white" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="size-3 text-red-600" />
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
                      "absolute inset-0 z-0 bg-zinc-950 border border-zinc-900 transition-all duration-500 md:-skew-x-12 md:origin-center md:scale-[0.94] overflow-hidden",
                      "group-hover:bg-zinc-900 group-hover:border-zinc-700"
                    )}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[80px] group-hover:bg-red-600/10 transition-colors" />
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
                          <div className="text-6xl font-black text-zinc-900 italic tracking-tighter group-hover:text-red-600 transition-colors uppercase relative z-10">
                            {rival.avatar}
                          </div>
                          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-zinc-800 group-hover:border-red-600 transition-colors" />
                        </div>
                        <div className={cn(
                          "text-[9px] font-black px-4 py-1.5 italic tracking-widest transition-all",
                          "md:skew-x-[-12deg] shadow-[4px_4px_0_rgba(0,0,0,0.5)]",
                          rival.status === 'DOMINATED' ? 'bg-green-600 text-white' :
                            rival.status === 'CONTESTED' ? 'bg-white text-black' :
                              'bg-red-600 text-white group-hover:shadow-red-600/20'
                        )}>
                          {rival.status}
                        </div>
                      </div>

                      <h3 className="text-4xl font-black italic text-white mb-6 uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                        {rival.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-y-6 gap-x-10 border-t border-zinc-800/50 pt-8 relative">
                        <div className="absolute top-0 left-0 w-8 h-[1px] bg-red-600" />
                        <div>
                          <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest block mb-2">Win_Gap</span>
                          <span className="text-2xl font-black italic text-white leading-none">{rival.metrics.avgGap}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest block mb-2">Reliability</span>
                          <span className="text-2xl font-black italic text-white leading-none">{rival.metrics.reliability}</span>
                        </div>
                        <div className="col-span-2">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Aggression_Rating</span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className={cn("w-3 h-1", i < rival.metrics.aggression / 20 ? "bg-red-600" : "bg-zinc-900")} />
                              ))}
                            </div>
                          </div>
                          <div className="h-1 bg-zinc-900 w-full overflow-hidden flex">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${rival.metrics.aggression}%` }}
                              className="h-full bg-gradient-to-r from-zinc-800 to-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                      <div className="flex items-center gap-3 py-2 px-4 bg-black/40 border border-zinc-800/50 group-hover:border-red-600/30 transition-colors">
                        <History className="size-4 text-zinc-700 group-hover:text-red-600 transition-colors" />
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors italic">Analyze_Log</span>
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
              className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-900 shadow-2xl overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 98% 0, 100% 4%, 100% 100%, 2% 100%, 0 96%)' }}
            >
              <div className="flex flex-col lg:flex-row min-h-[550px]">
                <div className="lg:w-1/3 bg-zinc-900 p-10 flex flex-col justify-between border-r border-zinc-800 relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-red-600" />
                  <div>
                    <button
                      onClick={() => setSelectedRival(null)}
                      className="size-10 bg-black border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all mb-12"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                    >
                      <X className="size-5" />
                    </button>
                    <span className="text-[9px] font-black text-red-600 tracking-[0.4em] uppercase mb-4 block italic">Target_Profile</span>
                    <h4 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-6">{selectedRival.name}</h4>
                    <div className="flex items-center gap-3">
                      <Gauge className="size-4 text-zinc-600" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase italic">Sector_Volatility: Low</span>
                    </div>
                  </div>
                  <div className="pt-10 border-t border-zinc-800">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Total_Races</span>
                        <span className="text-3xl font-black italic text-white">{selectedRival.totalRaces}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Wins</span>
                        <span className="text-3xl font-black italic text-red-600">{selectedRival.wins}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-10 overflow-y-auto max-h-[70vh] lg:max-h-none bg-black">
                  <div className="flex items-center gap-4 mb-8 border-b border-zinc-900 pb-6">
                    <History className="size-5 text-red-600" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Engagement_Archive</span>
                  </div>
                  <div className="space-y-4">
                    {selectedRival.history.map((log, i) => (
                      <div
                        key={i}
                        className="bg-zinc-950 p-6 border border-zinc-900 hover:border-red-600/30 transition-all"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
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
                              <span className="text-xl font-black text-red-600 italic">{log.result}</span>
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