'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Trophy, Swords, X, Activity, Timer, Gauge } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export function ChampionshipSection({ results = DUMMY_RESULTS }) {
  const [selectedResult, setSelectedResult] = useState<any | null>(null)

  return (
    <section
      className="relative w-full py-32 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Swords size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">LIVE_RESULT_FEED</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black italic text-white tracking-tighter uppercase leading-[0.75]">
              CHAMPIONSHIP<br />
              <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>FIGHT</span>
            </h2>
          </div>
        </div>
      </div>

      <nav className="flex flex-col border-b border-zinc-900">
        {results.map((item, idx) => (
          <MarqueeItem
            key={idx}
            {...item}
            onClick={() => setSelectedResult(item)}
            speed={15}
            textColor="#ffffff"
            marqueeBgColor={DESIGN_SYSTEM.COLORS.PRIMARY}
            marqueeTextColor={DESIGN_SYSTEM.COLORS.BLACK}
            borderColor={DESIGN_SYSTEM.COLORS.ZINC_900}
          />
        ))}
      </nav>

      <AnimatePresence>
        {selectedResult && (
          <ResultShard
            data={selectedResult}
            onClose={() => setSelectedResult(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ResultShard({ data, onClose }: { data: any, onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-xl bg-zinc-950 z-[101] border-l border-zinc-800 p-8 md:p-16 flex flex-col"
        style={{ clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <button onClick={onClose} className="self-end p-4 hover:bg-zinc-900 transition-colors mb-12">
          <X className="text-white" size={24} />
        </button>

        <div className="flex-1 space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              ENTRY_DEBRIEF // {data.id}
            </span>
            <h3 className="text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
              {data.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <ShardStat icon={<Trophy size={16} />} label="FINAL_POS" value={`P${data.position}`} />
            <ShardStat icon={<Activity size={16} />} label="POINTS_GAIN" value={`+${data.value}`} />
            <ShardStat icon={<Timer size={16} />} label="GAP_INTERVAL" value={data.metrics.interval} />
            <ShardStat icon={<Gauge size={16} />} label="TOP_VELOCITY" value={data.metrics.speed} />
          </div>

          <div className="pt-12 border-t border-zinc-900">
            <span className="text-[10px] font-black text-zinc-700 uppercase block mb-4 italic">Technical_Narrative</span>
            <p className="text-zinc-500 text-sm font-bold leading-relaxed uppercase italic">
              {data.description}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-zinc-900 flex justify-between items-center opacity-20">
          <span className="text-[8px] font-mono text-white">HASH_REF: {data.id}</span>
          <div className="size-4 bg-primary rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
        </div>
      </motion.div>
    </>
  )
}

function ShardStat({ icon, label, value }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 opacity-30">
        {icon}
        <span className="text-[8px] font-black text-white uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-3xl font-black italic text-white uppercase">{value}</span>
    </div>
  )
}

function MarqueeItem({ name, position, value, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, onClick }: any) {
  const itemRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const [repetitions, setRepetitions] = useState(4)

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement
      if (!marqueeContent) return
      setRepetitions(Math.ceil(window.innerWidth / marqueeContent.offsetWidth) + 2)
    }
    calculateRepetitions()
    window.addEventListener('resize', calculateRepetitions)
    return () => window.removeEventListener('resize', calculateRepetitions)
  }, [name])

  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
    if (!marqueeContent) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(marqueeInnerRef.current, {
      x: -marqueeContent.offsetWidth,
      duration: speed,
      ease: 'none',
      repeat: -1
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [name, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = (ev.clientY - rect.top) < rect.height / 2 ? 'top' : 'bottom'
    gsap.timeline({ defaults: { duration: 0.5, ease: 'expo.out' } })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  const handleMouseLeave = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = (ev.clientY - rect.top) < rect.height / 2 ? 'top' : 'bottom'
    gsap.timeline({ defaults: { duration: 0.5, ease: 'expo.out' } })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <div className="relative overflow-hidden h-32 md:h-48 border-t border-zinc-900" ref={itemRef}>
      <div className="flex items-center justify-between px-6 md:px-12 h-full cursor-pointer" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="flex items-baseline gap-8">
          <span className="text-4xl md:text-7xl font-black italic text-zinc-900">P{position.toString().padStart(2, '0')}</span>
          <h3 className="text-2xl md:text-5xl font-black italic text-white uppercase tracking-tighter">{name}</h3>
        </div>
        <span className="text-2xl md:text-4xl font-black italic text-zinc-700">+{value} PTS</span>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="h-full w-fit flex" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex items-center px-4" key={idx} style={{ color: marqueeTextColor }}>
              <span className="whitespace-nowrap uppercase font-black italic text-[5vh] px-8">{name} // P{position} // +{value} PTS</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DUMMY_RESULTS = [
  { id: "RES_001", name: "MONZA RECOVERY", position: 1, value: 25, description: "FLAWLESS EXECUTION OF OVERCUT STRATEGY DURING MID-RACE RAIN.", metrics: { interval: "+0.422S", speed: "342 KM/H" } },
  { id: "RES_002", name: "NIGHT SPRINT", position: 2, value: 18, description: "PODIUM SECURED AFTER DEFENDING POSITION AGAINST V-CORP FOR 12 LAPS.", metrics: { interval: "+1.109S", speed: "318 KM/H" } },
  { id: "RES_003", name: "ENDURANCE 12H", position: 1, value: 50, description: "DOMINANT RUN WITH ZERO MECHANICAL INCIDENTS OVER 400+ LAPS.", metrics: { interval: "+2 LAPS", speed: "298 KM/H" } },
]