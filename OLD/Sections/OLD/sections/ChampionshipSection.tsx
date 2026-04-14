'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Trophy, Swords, X, Activity, Timer, Gauge, ExternalLink } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'

export function ChampionshipSection({ results = DUMMY_RESULTS }: { results?: any[] }) {
  const [selectedResult, setSelectedResult] = useState<any | null>(null)

  return (
    <section
      className="relative w-full py-16 border-t overflow-hidden"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="flex items-center gap-4"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                className="h-[1px]"
              />
              <span className={cn("text-[8px] md:text-[10px] font-black italic text-zinc-500 uppercase")}>Live Result Feed</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-[0.8]"
            >
              CHAMPIONSHIP<br />
              <motion.span
                initial={{ color: "#fff" }}
                whileInView={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                FIGHT
              </motion.span>
            </motion.h2>
          </div>
        </div>
      </div>

      <nav className="flex flex-col border-b border-zinc-900">
        {results.map((item, idx) => (
          <MarqueeItem
            key={item.id || idx}
            {...item}
            onClick={() => setSelectedResult(item)}
            speed={15}
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
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-full max-w-xl bg-zinc-950 z-[101] border-l border-zinc-900 p-8 md:p-16 flex flex-col"
        style={{ clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <button onClick={onClose} className="self-end p-4 hover:bg-zinc-900 transition-colors mb-12 border border-zinc-900 cursor-pointer">
          <X className="text-white" size={24} />
        </button>

        <div className="flex-1 space-y-16">
          <div className="space-y-4">
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              RESULT_ID_{data.id}
            </span>
            <h3 className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter leading-none">
              {data.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <ShardStat icon={<Trophy size={16} />} label="POSITION" value={`P${data.metrics.position.overall}`} />
            <ShardStat icon={<Activity size={16} />} label="POINTS" value={`+${data.value}`} />
            <ShardStat icon={<Timer size={16} />} label="INTERVAL" value={data.metrics.performance.time} />
            <ShardStat icon={<Gauge size={16} />} label="SPEED" value={data.metrics.performance.speed} />
          </div>

          <div className="pt-12 border-t border-zinc-900">
            <span className="text-[8px] font-black text-zinc-700 uppercase block mb-4 italic">BASICS_DESCRIPTION</span>
            <p className="text-zinc-400 text-[10px] font-bold leading-relaxed uppercase italic border-l-2 pl-4 py-1" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
              {data.basics.description}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-zinc-900 flex justify-between items-center">
          <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-tighter">{data.details.status}</span>
          <Link href="/pursuit" className="group flex items-center gap-2 text-[8px] font-black text-zinc-600 hover:text-primary transition-colors uppercase">
            SEASON DETAILS
            <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </>
  )
}

function ShardStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 opacity-30">
        {icon}
        <span className="text-[6px] font-black text-white uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-4xl font-black italic text-white uppercase leading-none" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>{value}</span>
    </div>
  )
}

function MarqueeItem({ name, metrics, value, speed, marqueeBgColor, marqueeTextColor, borderColor, onClick }: any) {
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
    if (!marqueeInnerRef.current) return
    const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement
    if (!marqueeContent) return
    if (animationRef.current) animationRef.current.kill()

    animationRef.current = gsap.to(marqueeInnerRef.current, {
      x: -marqueeContent.offsetWidth,
      duration: speed,
      ease: 'none',
      repeat: -1
    })

    return () => {
      if (animationRef.current) animationRef.current.kill()
    }
  }, [name, repetitions, speed])

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
    <div className="relative overflow-hidden h-32 md:h-48 border-t cursor-pointer" style={{ borderColor }} ref={itemRef} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center justify-between px-4 md:px-12 lg:px-24 h-full">
        <div className="flex items-baseline gap-8">
          <span className="text-4xl md:text-7xl font-black italic text-zinc-900 leading-[0.8]">P{metrics.position.overall.toString().padStart(2, '0')}</span>
          <h3 className="text-xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none">{name}</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-mono text-zinc-600 uppercase mb-1">Points_Gain</span>
          <span className="text-2xl md:text-4xl font-black italic text-zinc-800 leading-none">+{value}</span>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="h-full w-fit flex" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex items-center px-4" key={idx} style={{ color: marqueeTextColor }}>
              <span className="whitespace-nowrap uppercase font-black italic text-[4vh] px-8 tracking-tighter">{name} // P{metrics.position.overall} // +{value} PTS</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DUMMY_RESULTS = [
  {
    id: 101,
    name: "MONZA RECOVERY",
    value: 25,
    basics: { description: "STRATEGIC OVERCUT EXECUTED DURING VARIABLE WEATHER CONDITIONS." },
    details: { status: "OFFICIAL" },
    metrics: { position: { overall: 1 }, performance: { time: "+0.422S", speed: "342 KM/H" } }
  },
  {
    id: 102,
    name: "NIGHT SPRINT",
    value: 18,
    basics: { description: "DEFENSIVE DRIVE SECURING PODIUM POSITION UNDER FLOODLIGHTS." },
    details: { status: "CERTIFIED" },
    metrics: { position: { overall: 2 }, performance: { time: "+1.109S", speed: "318 KM/H" } }
  }
]