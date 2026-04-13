'use client'

import { ClippedButton } from '@/components/Clipped/ClippedButton'
import Lenis from 'lenis'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface CarouselRecord {
  id: string
  category: string
  registry: string
  titleMain: string
  titleSub: string
  description: string
  attributes: Array<{ label: string; value: string }>
  mediaUrl: string
  linkUrl: string
}

const DUMMY_RECORDS: CarouselRecord[] = [
  {
    id: '01',
    category: 'COMPETITION',
    registry: 'EVNT-MNZ-26',
    titleMain: 'TEMPLE OF',
    titleSub: 'SPEED',
    description: 'The definitive high-speed proving ground. Low downforce configurations required for maximum velocity.',
    attributes: [
      { label: 'TOP_SPEED', value: '354 KM/H' },
      { label: 'G_FORCE', value: '5.2G' }
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1541348263662-e068f62f4558?q=80&w=1600',
    linkUrl: '/pursuit/events/monza'
  },
  {
    id: '02',
    category: 'RESOURCE',
    registry: 'CRFT-MK4-SYS',
    titleMain: 'AERO UNIT',
    titleSub: 'MARK IV',
    description: 'Carbon-composite dynamics engineered for precision front-end bite in high-velocity cornering phases.',
    attributes: [
      { label: 'WEIGHT', value: '1.2 KG' },
      { label: 'DRAG', value: '-0.12' }
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600',
    linkUrl: '/craft/kits/mark-iv'
  },
  {
    id: '03',
    category: 'ENGINEERING',
    registry: 'ENG-V12-HYB',
    titleMain: 'KINETIC',
    titleSub: 'CORE',
    description: 'A hybrid powertrain synthesis of raw combustion and high-density electrical discharge.',
    attributes: [
      { label: 'OUTPUT', value: '1050 HP' },
      { label: 'RPM_MAX', value: '12500' }
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7fd761?q=80&w=1600',
    linkUrl: '/craft/tech/kinetic-core'
  },
  {
    id: '04',
    category: 'LOGISTICS',
    registry: 'LOG-TRK-EXP',
    titleMain: 'GLOBAL',
    titleSub: 'CIRCUIT',
    description: 'Seamless deployment of competition hardware across intercontinental racing schedules.',
    attributes: [
      { label: 'NODES', value: '24' },
      { label: 'SYNC', value: 'REAL-TIME' }
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600',
    linkUrl: '/pursuit/logistics'
  },
  {
    id: '05',
    category: 'ENTITY',
    registry: 'ENT-VSS-PIL',
    titleMain: 'PILOT',
    titleSub: 'BIOMETRIC',
    description: 'The integration of human intuition and algorithmic data processing at the limit of grip.',
    attributes: [
      { label: 'REACTION', value: '180 MS' },
      { label: 'STAMINA', value: 'LVL 9' }
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1600',
    linkUrl: '/tribe/pilots'
  }
]

export function FullCarouselSection({ data = DUMMY_RECORDS }: { data?: CarouselRecord[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.02,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 15,
    restDelta: 0.0001
  })

  return (
    <div ref={containerRef} className="relative h-[1000vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {data.map((record, i) => {
          const start = i / data.length
          const end = (i + 1) / data.length

          const opacity = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0])
          const imageScale = useTransform(smoothProgress, [start, end], [1.25, 1.0])
          const focalPoint = useTransform(smoothProgress, [start, end], ["45%", "55%"])

          return (
            <motion.div
              key={record.id}
              style={{ opacity }}
              className="absolute inset-0 z-0"
            >
              <motion.div
                style={{ scale: imageScale, objectPosition: focalPoint }}
                className="absolute inset-0"
              >
                <Image
                  src={record.mediaUrl}
                  alt=""
                  fill
                  className="object-cover contrast-[1.15] brightness-[0.4] grayscale-[0.1]"
                  priority
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000_100%)]" />
              </motion.div>

              <div className="relative h-full w-full flex flex-col justify-between p-12 lg:p-24 z-10">

                <div className="flex justify-between items-start border-t border-white/5 pt-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[7px] font-black text-red-600 tracking-[0.8em] uppercase leading-none mb-2">
                      LINKED_NODE // {record.registry}
                    </span>
                    <div className="flex gap-4 items-center">
                      <span className="text-[10px] font-mono text-white/40 tracking-tighter tabular-nums">0{i + 1}</span>
                      <div className="w-40 h-[1px] bg-white/5 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-red-600 shadow-[0_0_10px_#dc2626]"
                          style={{ width: useTransform(smoothProgress, [start, end], ["0%", "100%"]) }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/40 tracking-tighter tabular-nums">0{data.length}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] font-black text-white/10 tracking-[0.5em] uppercase">
                      SECURE_DATA_FEED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-12 lg:col-span-8">
                    <motion.div
                      style={{
                        opacity: useTransform(smoothProgress, [start, start + 0.1], [0, 1]),
                        y: useTransform(smoothProgress, [start, end], [20, -20])
                      }}
                    >
                      <span className="text-[11px] font-black text-white/20 tracking-[1em] uppercase mb-8 block ml-2">
                        {record.category}
                      </span>
                      <h1 className="flex flex-col leading-[0.75] mb-12">
                        <span className="text-7xl lg:text-[9.5rem] font-extralight text-white tracking-[-0.07em] uppercase">
                          {record.titleMain}
                        </span>
                        <span className="text-7xl lg:text-[9.5rem] font-black italic text-red-600 tracking-[-0.07em] uppercase">
                          {record.titleSub}
                        </span>
                      </h1>
                      <p className="max-w-[400px] text-[12px] text-zinc-500 font-bold uppercase tracking-tight leading-loose italic border-l-2 border-red-600/40 pl-8 ml-2">
                        {record.description}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-end justify-between gap-12 border-b border-white/5 pb-8">
                  <div className="flex gap-20">
                    {record.attributes.map((attr, attrIdx) => (
                      <div key={attrIdx} className="flex flex-col">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">{attr.label}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-extralight text-white tabular-nums tracking-tighter leading-none">
                            {attr.value.split(' ')[0]}
                          </span>
                          <span className="text-sm font-black text-red-600 italic uppercase">{attr.value.split(' ')[1]}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ClippedButton
                    label="INITIALIZE_MISSION"
                    variant="primary"
                    size="lg"
                    onClick={() => window.location.href = record.linkUrl}
                  />
                </div>

              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}