'use client'

import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionMainTitle from '@/components/Section/Title'
import { Championship, Driver, Media } from '@/payload-types'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ChampionshipTimelineProps {
    championship: Championship
}

export default function ChampionshipTimeline({ championship }: ChampionshipTimelineProps) {
    const targetRef = useRef<HTMLDivElement>(null)

    const startDate = championship.details?.start_date
    const endDate = championship.details?.end_date
    const winner = championship.details?.winner as Driver
    const coverImage = (championship.assets?.cover as Media)?.url || 'https://picsum.photos/1920/1080?grayscale'

    const events = [
        {
            year: startDate || '2026',
            label: 'Phase 01: Commencement',
            description: 'Validation of entries and official seasonal rollout for all registered competitors.'
        },
        {
            year: startDate && endDate ? new Date(new Date(startDate).getTime() + (new Date(endDate).getTime() - new Date(startDate).getTime()) / 2).toISOString() : '2026',
            label: 'Phase 02: Verification',
            description: 'Mid-point technical auditing and performance trajectory assessment across the field.'
        },
        {
            year: endDate || '2026',
            label: 'Phase 03: Finalization',
            description: winner?.last_name
                ? `${winner.last_name} secured verified absolute title status following the final classification.`
                : 'Seasonal culmination and final results classification locked for the registry.'
        }
    ].sort((a, b) => new Date(a.year).getTime() - new Date(b.year).getTime())

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"])
    const smoothX = useSpring(x, { stiffness: 45, damping: 25 })
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section
            ref={targetRef}
            className="relative h-[400vh] bg-white-pure flex flex-col border-b border-black-pure"
        >
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
                <SectionHeader
                    variant={3}
                    title="Championship Timeline"
                    subtitle="Temporal Data Points"
                    officialLabel="Historical Record"
                    championships={[championship]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black-pure shrink-0">
                    <div className="p-10 lg:p-14 border-r border-black-pure flex items-center">
                        <SectionMainTitle
                            variant={2}
                            label="Seasonal Progress"
                            lineOne="Temporal"
                            lineTwo="Sequence"
                            highlight="Registry"
                        />
                    </div>
                    <div className="relative h-full min-h-[120px] lg:min-h-0 bg-white-200 overflow-hidden">
                        <img
                            src={coverImage}
                            className="w-full h-full object-cover contrast-125 border-l border-black-pure"
                            alt="Registry Context"
                        />
                        <div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply" />
                    </div>
                </div>

                <div className="relative flex-1 flex flex-col justify-center bg-white-pure overflow-hidden py-20 lg:py-32">
                    <div className="absolute top-0 left-0 w-full h-4 bg-white-200 border-b border-black-pure z-20">
                        <motion.div
                            className="h-full bg-primary-500"
                            style={{ width: progressWidth }}
                        />
                    </div>

                    <motion.div style={{ x: smoothX }} className="flex relative z-10 pl-10 md:pl-24">
                        {events.map((event, i) => {
                            const dateObj = new Date(event.year)
                            const formattedDate = !isNaN(dateObj.getTime())
                                ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                : event.year

                            return (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-[90vw] md:w-[65vw] lg:w-[55vw] pr-20 md:pr-48"
                                >
                                    <div className="flex flex-col border-l-4 md:border-l-[12px] border-black-pure pl-10 md:pl-16 py-6">
                                        <div className="flex items-center gap-4 mb-8">
                                            <span className="bg-black-pure text-white-pure px-4 py-1.5 font-mono text-[11px] font-black uppercase tracking-[0.2em]">
                                                MARK_{i + 1}
                                            </span>
                                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-500">
                                                {event.label}
                                            </span>
                                        </div>

                                        <span className="text-2xl md:text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-black-pure leading-[0.8] mb-6 py-2">
                                            {formattedDate}
                                        </span>

                                        <div className="max-w-lg">
                                            <SectionDescription
                                                variant={2}
                                                text={event.description}
                                            />
                                        </div>

                                        <div className="mt-12 flex items-center gap-4">
                                            <div className="w-20 h-2 bg-primary-500" />
                                            <span className="text-[12px] font-black uppercase tracking-[0.5em] text-black-pure/40">
                                                STAMP_{dateObj.getFullYear()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>
                </div>

                <SectionFooter
                    variant={1}
                    totalSeriesLabel="Timeline Verification"
                    filterStatusLabel="Data Status"
                    filterValueLabel="Synchronized"
                    championships={[]}
                />
            </div>
        </section>
    )
}