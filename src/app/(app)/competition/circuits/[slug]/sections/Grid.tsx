'use client'

import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import { Circuit, Driver } from '@/payload-types'
import { motion, useInView } from 'framer-motion'
import { Activity, BarChart3, ChevronRight, Info, Shield } from 'lucide-react'
import { useRef } from 'react'

interface StatGridProps {
    circuit: Circuit;
}

export default function CircuitStatGrid({ circuit }: StatGridProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { margin: "-10%", once: true })
    const recordDriver = circuit.metrics?.record_lap_driver as Driver

    const handleScrollToDetail = (id: string) => {
        const element = document.getElementById(id)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
    }

    const technicalData = [
        { value: circuit.details?.type || null, icon: Shield },
        { value: circuit.details?.fia_grade || null, icon: Info },
        { value: circuit.details?.drs_zones || null, icon: Activity },
        { value: circuit.details?.direction || null, icon: BarChart3 },
    ].filter(item => item.value !== null)

    const performanceData = [
        {
            value: circuit.metrics?.record_lap_time || '0:00.000',
            highlight: true,
            action: 'record-archive'
        },
        {
            value: recordDriver?.last_name ? `${recordDriver.first_name} ${recordDriver.last_name}` : null,
            action: 'driver-profile'
        },
        {
            value: circuit.metrics?.record_lap_year && !isNaN(Date.parse(circuit.metrics.record_lap_year))
                ? new Date(circuit.metrics.record_lap_year).getFullYear().toString()
                : null,
            action: 'history-timeline'
        },
        {
            value: circuit.details?.capacity ? circuit.details.capacity.toLocaleString() : null,
            action: 'physical-specs'
        },
    ].filter(item => item.value !== null)

    return (
        <section
            ref={containerRef}
            className="w-full bg-white-pure flex flex-col border-b border-black-pure"
        >
            <SectionHeader
                variant={3}
                title={circuit.name}
                subtitle={circuit.basics?.identifiers?.code || ''}
                officialLabel=""
                championships={[]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-black-pure flex flex-col">
                    <div className="p-10 lg:p-20 border-b border-white-pure/10 flex items-center gap-6">
                        <div className="w-1 h-8 bg-primary-500" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white-pure/40">
                            {circuit.basics?.identifiers?.code}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 flex-1">
                        {technicalData.map((stat, i) => (
                            <button
                                key={i}
                                onClick={() => handleScrollToDetail('physical-specifications')}
                                className="p-10 lg:p-12 border-r border-b border-white-pure/10 text-left hover:bg-white-pure/5 transition-all group focus:outline-none focus:ring-4 focus:ring-inset focus:ring-primary-500"
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white-pure/30 group-hover:text-primary-500 transition-colors">
                                        {circuit.details?.type}
                                    </span>
                                    <stat.icon size={16} className="text-white-pure/10 group-hover:text-white-pure transition-colors" />
                                </div>
                                <span className="text-2xl lg:text-3xl font-black italic uppercase text-white-pure tracking-tighter leading-none block">
                                    {stat.value}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white-pure flex flex-col border-l border-black-pure">
                    <div className="p-10 lg:p-20 border-b border-black-pure/10 flex items-center gap-6">
                        <div className="w-1 h-8 bg-black-pure" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black-pure/40">
                            {circuit.name}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 flex-1">
                        {performanceData.map((stat, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => handleScrollToDetail(stat.action)}
                                className="p-10 lg:p-12 border-r border-b border-black-pure/10 text-left hover:bg-black-pure/5 transition-all group focus:outline-none focus:ring-4 focus:ring-inset focus:ring-secondary-500"
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-black-pure/30 group-hover:text-secondary-500 transition-colors">
                                        {circuit.basics?.identifiers?.code}
                                    </span>
                                    <ChevronRight size={16} className="text-black-pure/10 group-hover:text-black-pure transition-colors" />
                                </div>
                                <span
                                    className={`text-2xl lg:text-3xl font-black italic uppercase tracking-tighter leading-none block ${stat.highlight ? 'text-primary-500' : 'text-black-pure'}`}
                                >
                                    {stat.value}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            <SectionFooter
                variant={1}
                navigateLabel={circuit.name}
                entryPointsLabel={circuit.basics?.identifiers?.code || ''}
                championships={[]}
            />
        </section>
    )
}