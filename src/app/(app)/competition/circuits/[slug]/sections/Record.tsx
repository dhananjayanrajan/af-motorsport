'use client'

import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionMainTitle from '@/components/Section/Title'
import { Circuit, Driver, Media } from '@/payload-types'
import { motion, useInView } from 'framer-motion'
import { Activity, ArrowRight, Calendar, Map, Timer } from 'lucide-react'
import { useRef } from 'react'

interface LapRecordArchiveProps {
    circuit: Circuit;
}

export default function LapRecordArchive({ circuit }: LapRecordArchiveProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { margin: "-10%", once: true })

    const record = circuit.metrics
    const driver = record?.record_lap_driver as Driver
    const driverName = driver?.last_name ? `${driver.first_name} ${driver.last_name}` : 'Registry Member'
    const recordTime = record?.record_lap_time || '0:00.000'

    const driverImage = (driver?.assets?.avatar as Media)?.url
        || `https://picsum.photos/seed/${driver?.id || 'record'}/1920/1080?grayscale`

    const recordYear = record?.record_lap_year && !isNaN(Date.parse(record.record_lap_year))
        ? new Date(record.record_lap_year).getFullYear()
        : '2026'

    const handleInternalNavigation = (id: string) => {
        const element = document.getElementById(id)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
    }

    if (!record?.record_lap_time) return null

    return (
        <section
            ref={containerRef}
            className="w-full bg-white-pure flex flex-col border-b border-black-pure"
        >
            <SectionHeader
                variant={1}
                title="Performance Data"
                subtitle="Absolute Benchmark"
                officialLabel="Verified Session"
                championships={[]}
            />

            <div className="flex flex-col lg:flex-row border-b border-black-pure">
                <div className="w-full lg:w-1/2 p-10 lg:p-20 border-r border-black-pure flex flex-col justify-between">
                    <SectionMainTitle
                        variant={1}
                        label="Circuit Record"
                        lineOne="Registry"
                        lineTwo="Benchmark"
                        highlight="Timing"
                    />
                    <div className="mt-12 flex flex-col gap-6">
                        <div className="h-2 w-24 bg-primary-500" />
                        <SectionDescription
                            variant={1}
                            text="Verified session data representing the absolute performance limit for this specific layout as recorded in the official archives."
                        />
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => handleInternalNavigation('circuit-map')}
                                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-black-pure hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 p-1"
                            >
                                <Map size={14} /> Compare Layout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 relative min-h-[400px] bg-black-pure overflow-hidden group">
                    <img
                        src={driverImage}
                        alt={driverName}
                        className="w-full h-full object-cover grayscale opacity-40 contrast-125 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-500/10 mix-blend-multiply" />
                    <div className="absolute bottom-10 left-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white-pure/60 mb-2 block">Active Member</span>
                        <span className="text-4xl font-black italic uppercase text-white-pure tracking-tighter leading-none">{driverName}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    onClick={() => handleInternalNavigation('telemetry-logs')}
                    className="p-12 lg:p-16 border-r border-black-pure flex flex-col gap-12 text-left hover:bg-primary-500 group transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-primary-500"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black-pure group-hover:text-white-pure">Timing Value</span>
                        <Timer size={18} className="text-primary-500 group-hover:text-white-pure" />
                    </div>
                    <span className="text-6xl md:text-7xl font-black italic uppercase text-black-pure group-hover:text-white-pure tracking-tighter leading-none">
                        {recordTime}
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-1 bg-primary-500 group-hover:bg-white-pure transition-all group-hover:w-12" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black-pure/40 group-hover:text-white-pure/60">Seconds Metric</span>
                    </div>
                </motion.button>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleInternalNavigation('historical-timeline')}
                    className="p-12 lg:p-16 border-r border-black-pure flex flex-col gap-12 text-left hover:bg-secondary-500 group transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-secondary-500"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black-pure group-hover:text-white-pure">Archive Period</span>
                        <Calendar size={18} className="text-secondary-500 group-hover:text-white-pure" />
                    </div>
                    <span className="text-6xl md:text-7xl font-black italic uppercase text-black-pure group-hover:text-white-pure tracking-tighter leading-none">
                        {recordYear}
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-1 bg-secondary-500 group-hover:bg-white-pure transition-all group-hover:w-12" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black-pure/40 group-hover:text-white-pure/60">Calendar Data</span>
                    </div>
                </motion.button>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                    onClick={() => window.open(`https://www.google.com/search?q=${driverName}+lap+record+${circuit.name}`, '_blank')}
                    className="p-12 lg:p-16 flex flex-col gap-12 text-left hover:bg-tertiary-500 group transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-tertiary-500"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black-pure group-hover:text-white-pure">Session Proof</span>
                        <Activity size={18} className="text-tertiary-500 group-hover:text-white-pure" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-3xl font-black italic uppercase text-black-pure group-hover:text-white-pure tracking-tighter leading-none">View External Source</span>
                        <ArrowRight size={24} className="text-black-pure/20 group-hover:text-white-pure group-hover:translate-x-2 transition-all" />
                    </div>
                    <div className="mt-auto">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black-pure/40 group-hover:text-white-pure/60 italic">Telemetry Validated</span>
                    </div>
                </motion.button>
            </div>

            <SectionFooter
                variant={2}
                navigateLabel="Archive Access"
                entryPointsLabel="Performance Logs"
                championships={[]}
            />
        </section>
    )
}