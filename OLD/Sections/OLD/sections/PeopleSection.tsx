'use client'

import { Country, Driver, Leader, Media, Member } from '@/payload-types'
import { cn } from '@/utilities/cn'
import {
  ArrowRight,
  Award as AwardIcon,
  Calendar,
  ChevronRight,
  Fingerprint,
  Flame,
  Globe,
  User,
  Zap
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type MemberType = 'DRIVERS' | 'LEADERS' | 'MEMBERS'

const CHAMFER = "polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)"
const CHAMFER_SM = "polygon(0 0, 100% 0, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%)"

const SlideTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 0.8
} as const

interface UnifiedPersonnel {
  id: string
  firstName: string
  lastName: string
  type: MemberType
  primaryRole: string
  callsign: string
  statement: string
  summary: string
  status: string
  nationality: string
  subText: string
  stats: {
    label: string
    value: string
    icon: any
  }[]
  assets: {
    avatar: string
  }
  slug: string
}

export default function PeopleSection({ drivers, leaders, members }: { drivers: Driver[], leaders: Leader[], members: Member[] }) {
  const [activeType, setActiveType] = useState<MemberType>('DRIVERS')
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const personnel: UnifiedPersonnel[] = useMemo(() => [
    ...drivers.map((d) => ({
      id: String(d.id),
      firstName: d.first_name?.toUpperCase() || '',
      lastName: d.last_name?.toUpperCase() || '',
      type: 'DRIVERS' as MemberType,
      primaryRole: d.basics?.competition_name || 'PRO RACER',
      callsign: d.basics?.callsign || d.alias || 'ALPHA',
      statement: d.basics?.catchphrase || 'LIMITS ARE FOR OTHERS.',
      summary: d.seo?.description || 'Circuit specialist.',
      status: d.basics?.racing_number ? `#${d.basics.racing_number}` : 'ACTIVE',
      nationality: (d.basics?.nationality as Country)?.name || 'INTL',
      subText: d.basics?.birth_date ? `BORN ${new Date(d.basics.birth_date).getFullYear()}` : 'STABLE',
      slug: `/teams/driver/${d.slug}`,
      assets: {
        avatar: typeof d.assets?.avatar === 'object' ? (d.assets.avatar as Media)?.url || `https://picsum.photos/seed/${d.id}/1200/1600` : `https://picsum.photos/seed/${d.id}/1200/1600`
      },
      stats: [
        { label: 'SKILLS', value: (d.details?.skills?.length || 0).toString(), icon: Flame },
        { label: 'CARS', value: (d.details?.cars?.length || 0).toString(), icon: Zap },
        { label: 'TITLES', value: (d.details?.awards?.length || 0).toString(), icon: AwardIcon }
      ]
    })),
    ...leaders.map((l) => ({
      id: String(l.id),
      firstName: l.first_name?.toUpperCase() || '',
      lastName: l.last_name?.toUpperCase() || '',
      type: 'LEADERS' as MemberType,
      primaryRole: l.basics?.title || 'EXECUTIVE',
      callsign: l.basics?.nickname || l.alias || 'LEAD',
      statement: l.details?.quote || 'VISION DRIVES PERFORMANCE.',
      summary: l.details?.mission || 'Strategic oversight.',
      status: 'CORE',
      nationality: (l.basics?.nationality as Country)?.name || 'INTL',
      subText: l.basics?.debut_date ? `SINCE ${new Date(l.basics.debut_date).getFullYear()}` : 'HQ',
      slug: `/leaders/${l.slug}`,
      assets: {
        avatar: typeof l.assets?.avatar === 'object' ? (l.assets.avatar as Media)?.url || `https://picsum.photos/seed/${l.id}/1200/1600` : `https://picsum.photos/seed/${l.id}/1200/1600`
      },
      stats: [
        { label: 'AWARDS', value: (l.details?.awards?.length || 0).toString(), icon: AwardIcon },
        { label: 'TENURE', value: l.basics?.debut_date ? `${new Date().getFullYear() - new Date(l.basics.debut_date).getFullYear()}Y` : '8Y', icon: Calendar },
        { label: 'RANK', value: 'L1', icon: Fingerprint }
      ]
    })),
    ...members.map((m) => ({
      id: String(m.id),
      firstName: m.first_name?.toUpperCase() || '',
      lastName: m.last_name?.toUpperCase() || '',
      type: 'MEMBERS' as MemberType,
      primaryRole: m.alias || 'SPECIALIST',
      callsign: m.basics?.nickname || 'TECH',
      statement: m.basics?.description || 'PRECISION IS PARAMOUNT.',
      summary: m.details?.duties || 'Technical operations.',
      status: 'OPERATIVE',
      nationality: (m.basics?.nationality as Country)?.name || 'INTL',
      subText: m.basics?.joining_date ? `JOINED ${new Date(m.basics.joining_date).getFullYear()}` : 'UNIT',
      slug: `/members/${m.slug}`,
      assets: {
        avatar: typeof m.assets?.avatar === 'object' ? (m.assets.avatar as Media)?.url || `https://picsum.photos/seed/${m.id}/1200/1600` : `https://picsum.photos/seed/${m.id}/1200/1600`
      },
      stats: [
        { label: 'SKILLS', value: (m.details?.skills?.length || 0).toString(), icon: Zap },
        { label: 'TRAINING', value: (m.details?.trainings?.length || 0).toString(), icon: AwardIcon },
        { label: 'TEAM', value: 'B-1', icon: User }
      ]
    }))
  ], [drivers, leaders, members])

  const filtered = personnel.filter((p) => p.type === activeType)
  const current = filtered[activeIdx]

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [nextSlide, isPaused])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const activeElement = container.children[activeIdx] as HTMLElement
      if (activeElement) {
        container.scrollTo({
          left: activeElement.offsetLeft - container.offsetWidth / 2 + activeElement.offsetWidth / 2,
          behavior: 'smooth'
        })
      }
    }
  }, [activeIdx])

  if (!current) return null

  const textContent = {
    roster: 'ROSTER',
    version: 'v.2026_CORE',
    idPrefix: 'ID:',
    assignment: 'ASSIGNMENT',
    cta: 'VIEW PROFILE'
  }

  return (
    <section
      className="relative w-full min-h-[100dvh] lg:h-[100dvh] bg-white flex flex-col font-mono select-none overflow-x-hidden antialiased text-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <header className="relative z-[60] flex-none h-20 lg:h-24 border-b border-zinc-100 bg-white flex items-stretch">
        <div className="hidden md:flex w-48 lg:w-64 flex-none border-r border-zinc-100 flex-col justify-center px-8 bg-zinc-50/50">
          <span className="text-[10px] font-black tracking-[0.5em] text-black">{textContent.roster}</span>
          <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-1.5">{textContent.version}</span>
        </div>

        <div ref={scrollContainerRef} className="flex-1 flex overflow-x-auto no-scrollbar scroll-smooth">
          {filtered.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "min-w-[160px] lg:min-w-[220px] h-full flex items-center gap-4 px-6 transition-all border-r border-zinc-50 relative group",
                activeIdx === idx ? "bg-zinc-50" : "opacity-30 hover:opacity-100"
              )}
            >
              <div className="relative size-10 flex-none bg-zinc-100 border border-zinc-200 overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}>
                <img src={member.assets.avatar} className={cn("w-full h-full object-cover grayscale transition-all duration-500", activeIdx === idx && "grayscale-0 scale-110")} alt="" />
              </div>
              <div className="flex flex-col items-start truncate">
                <span className={cn("text-[7px] font-black tracking-[0.4em] mb-0.5", activeIdx === idx ? "text-[#00FF41]" : "text-zinc-300")}>{member.status}</span>
                <span className={cn("text-xs font-black italic uppercase tracking-tighter truncate w-24 text-left transition-colors", activeIdx === idx ? "text-black" : "text-zinc-400")}>{member.lastName}</span>
              </div>
              {activeIdx === idx && (
                <motion.div layoutId="nav_indicator" className="absolute top-0 left-0 right-0 h-1 bg-[#00FF41]" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-stretch bg-zinc-50 border-l border-zinc-100">
          <button onClick={() => setActiveIdx((prev) => (prev - 1 + filtered.length) % filtered.length)} className="w-12 lg:w-16 flex items-center justify-center border-r border-zinc-100 text-zinc-300 hover:text-black transition-all">
            <ChevronRight size={18} className="rotate-180" />
          </button>
          <button onClick={nextSlide} className="w-12 lg:w-16 flex items-center justify-center bg-black text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </header>

      <nav className="relative z-50 h-12 border-b border-zinc-100 bg-zinc-50 flex items-center px-6 lg:px-12 gap-8 overflow-hidden">
        <div className="flex items-center gap-8">
          {(['DRIVERS', 'LEADERS', 'MEMBERS'] as MemberType[]).map((type) => (
            <button
              key={type}
              onClick={() => { setActiveType(type); setActiveIdx(0); }}
              className={cn(
                "text-[10px] lg:text-xs font-black tracking-[0.4em] transition-all relative py-1",
                activeType === type ? "text-black" : "text-zinc-300 hover:text-zinc-500"
              )}
            >
              {type}
              {activeType === type && (
                <motion.div layoutId="type_active" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
              )}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex ml-auto items-center gap-6 text-[10px] font-black text-zinc-800 uppercase tracking-widest">
          <span className="flex items-center gap-2 border-r border-zinc-100 pr-6">{textContent.idPrefix} {current.id}</span>
          <span className="text-zinc-400">{current.subText}</span>
        </div>
      </nav>

      <main className="flex-1 relative bg-white lg:overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${activeType}-${current?.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={SlideTransition}
            className="w-full flex flex-col lg:grid lg:grid-cols-12 lg:h-full lg:items-center px-6 md:px-12 lg:px-24 py-10 lg:py-0"
          >
            <div className="order-1 lg:order-2 col-span-12 lg:col-span-7 flex items-center lg:justify-end relative z-10 w-full lg:h-[80%] mb-12 lg:mb-0">
              <div className="relative w-full aspect-[4/5] sm:max-w-md mx-auto lg:mr-0 lg:h-full lg:w-auto bg-white border border-zinc-100 shadow-[20px_20px_0px_#f4f4f5] p-2 lg:p-3 overflow-visible" style={{ clipPath: CHAMFER }}>
                <div className="relative w-full h-full bg-zinc-50 overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={current.assets.avatar}
                    className="absolute inset-0 w-full h-full object-cover z-20 grayscale hover:grayscale-0 transition-all duration-700"
                    alt=""
                  />
                  <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="absolute top-4 right-4 lg:-top-4 lg:-right-4 z-30 flex flex-col gap-2 items-end">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-black text-white px-5 py-2 text-[9px] font-black tracking-widest uppercase shadow-xl"
                  >
                    {current.status}
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#00FF41] text-black px-5 py-2 text-[9px] font-black tracking-widest flex items-center gap-3 uppercase shadow-xl"
                  >
                    <Globe size={10} /> {current.nationality}
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-1 col-span-12 lg:col-span-5 flex flex-col justify-center z-20 space-y-8 lg:space-y-12">
              <div className="space-y-1 relative w-full overflow-hidden">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xl lg:text-3xl font-black text-black uppercase block tracking-tight"
                >
                  {current.firstName}
                </motion.h3>
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[12vw] lg:text-7xl font-black italic text-[#00FF41] uppercase block leading-[0.85] tracking-tighter"
                >
                  {current.lastName}
                </motion.h2>

                <div className="flex items-center gap-4 mt-8">
                  <div className="px-6 py-3 bg-[#00FF41] text-black text-xl lg:text-2xl font-black italic tracking-widest shadow-lg" style={{ clipPath: CHAMFER_SM }}>
                    {current.callsign}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-300 tracking-widest uppercase mb-0.5">{textContent.assignment}</span>
                    <span className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase truncate">{current.primaryRole}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-xl lg:text-2xl font-black text-black italic leading-tight uppercase tracking-tight max-w-lg border-l-4 border-black pl-5">
                    "{current.statement}"
                  </p>
                  <p className="text-[10px] lg:text-[11px] font-bold text-zinc-400 leading-relaxed uppercase tracking-widest max-w-sm ml-6">
                    {current.summary}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-px bg-zinc-100 border border-zinc-200" style={{ clipPath: CHAMFER_SM }}>
                  {current.stats.map((s, i) => (
                    <div key={i} className="bg-white p-5 lg:p-6 flex flex-col gap-2 transition-all hover:bg-zinc-50">
                      <span className="text-[8px] font-black text-zinc-300 tracking-widest uppercase">{s.label}</span>
                      <div className="flex items-center justify-between">
                        <span className="text-xl lg:text-2xl font-black italic text-black tabular-nums">{s.value}</span>
                        <s.icon size={14} className="text-[#00FF41]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link href={current.slug} className="group relative flex items-center justify-between h-16 bg-black px-10 overflow-hidden" style={{ clipPath: CHAMFER_SM }}>
                  <div className="absolute inset-0 bg-[#00FF41] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-in-out" />
                  <span className="relative z-10 text-[10px] lg:text-[11px] font-black tracking-[0.4em] text-white italic group-hover:text-black uppercase">{textContent.cta}</span>
                  <ArrowRight size={20} className="relative z-10 text-white group-hover:text-black group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}