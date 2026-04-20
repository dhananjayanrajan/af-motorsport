'use client'

import { Country, Driver, Media } from '@/payload-types'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function DriversWall({ drivers }: { drivers: Driver[] }) {
    const targetRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    })

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-70%'])
    const springX = useSpring(x, { stiffness: 80, damping: 25, restDelta: 0.001 })

    if (!mounted) {
        return (
            <section className="relative h-[400vh] bg-white-pure">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <div className="flex items-stretch h-[70vh] z-10">
                        {drivers.map((driver, index) => (
                            <div key={driver.id} className="flex-shrink-0 w-[380px] border-r border-black-pure flex flex-col bg-white-pure">
                                <div className="h-2/3 border-b border-black-pure bg-gray-100 animate-pulse" />
                                <div className="flex-1 p-6 animate-pulse">
                                    <div className="h-4 bg-gray-200 mb-2 w-24" />
                                    <div className="h-8 bg-gray-200 mb-4 w-32" />
                                    <div className="h-12 bg-gray-200 mt-6" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-white-pure">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x: springX }} className="flex items-stretch h-[70vh] z-10">
                    {drivers.map((driver, index) => (
                        <DriverCard key={driver.id} driver={driver} index={index} />
                    ))}
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full h-20 border-t border-black-pure bg-white-pure flex items-center px-12 justify-between">
                    <div className="flex items-center gap-8">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-black-pure">
                            Personnel Directory
                        </span>
                        <div className="flex gap-1">
                            {drivers.map((_, i) => (
                                <div key={i} className="h-1 w-8 bg-black-pure/10" />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono font-black text-black-pure/40">SCROLL TO EXPLORE</span>
                        <ArrowRight className="h-4 w-4 text-primary-500" />
                    </div>
                </div>
            </div>
        </section>
    )
}

function DriverCard({ driver, index }: { driver: Driver; index: number }) {
    const avatarUrl = (driver.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${driver.id}/800/1000`
    const nationality = (driver.basics?.nationality as Country)?.name || 'GLOBAL'
    const firstName = driver.first_name || ''
    const lastName = driver.last_name || 'DRIVER'
    const racingNumber = driver.basics?.racing_number || String(index + 1)
    const competitionName = driver.basics?.competition_name || 'Pro Circuit'
    const callsign = driver.basics?.callsign || 'Active'

    return (
        <div className="group relative flex-shrink-0 w-[380px] border-r border-black-pure flex flex-col bg-white-pure transition-colors duration-500 hover:bg-black-pure">
            <Link href={`/team/driver/${driver.slug}`} className="flex-1 flex flex-col h-full">
                <div className="relative h-2/3 border-b border-black-pure overflow-hidden">
                    <div className="absolute top-6 left-6 z-20 flex flex-col">
                        <span className="text-[10px] font-mono font-black bg-primary-500 text-black-pure px-2 py-1 self-start mb-1 whitespace-nowrap">
                            RANK 0{index + 1}
                        </span>
                        <span className="text-[10px] font-mono font-black bg-black-pure text-white-pure px-2 py-1 self-start group-hover:bg-white-pure group-hover:text-black-pure whitespace-nowrap">
                            {nationality}
                        </span>
                    </div>

                    <img
                        src={avatarUrl}
                        alt={lastName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute bottom-0 right-0 bg-white-pure border-l border-t border-black-pure px-5 py-3 group-hover:bg-secondary-500 group-hover:text-black-pure transition-colors">
                        <span className="text-4xl font-black italic">
                            {racingNumber}
                        </span>
                    </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="overflow-hidden">
                        {firstName && (
                            <h3 className="text-[10px] font-mono font-black text-black-pure/40 group-hover:text-primary-500 transition-colors uppercase tracking-widest mb-1 truncate">
                                {firstName}
                            </h3>
                        )}
                        <h2 className="text-3xl font-black uppercase text-black-pure group-hover:text-white-pure transition-colors leading-tight break-words">
                            {lastName}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-black-pure group-hover:border-white-pure/20">
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] font-mono font-black text-black-pure/30 group-hover:text-white-pure/40 uppercase tracking-tighter">
                                Series
                            </span>
                            <span className="text-xs font-black text-black-pure group-hover:text-white-pure uppercase truncate">
                                {competitionName}
                            </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-tertiary-500 flex-shrink-0" />
                                <span className="text-[9px] font-mono font-black text-black-pure/30 group-hover:text-white-pure/40 uppercase tracking-tighter">
                                    Status
                                </span>
                            </div>
                            <span className="text-xs font-black text-black-pure group-hover:text-white-pure uppercase truncate">
                                {callsign}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-1 bg-black-pure group-hover:bg-primary-500 transition-colors" />
            </Link>
        </div>
    )
}