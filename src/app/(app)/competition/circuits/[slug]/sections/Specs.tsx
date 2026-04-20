'use client'

import SectionDescription from '@/components/Section/Description'
import SectionHeader from '@/components/Section/Header'
import SectionMainTitle from '@/components/Section/Title'
import { Circuit } from '@/payload-types'
import { motion, useInView } from 'framer-motion'
import {
    Activity,
    Calendar,
    Hash,
    Layers,
    RotateCcw,
    RotateCw,
    Ruler,
    ShieldCheck,
    Users,
    Zap
} from 'lucide-react'
import { useMemo, useRef } from 'react'

interface PhysicalSpecsProps {
    circuit: Circuit;
}

export default function PhysicalSpecs({ circuit }: PhysicalSpecsProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { margin: "-100px 0px", once: true })

    const specs = useMemo(() => [
        {
            label: 'Rotation Flow',
            value: circuit.details?.direction || 'Standard',
            icon: circuit.details?.direction === 'anticlockwise' ? RotateCcw : RotateCw,
            sub: 'Operational Vector',
            color: 'text-primary-500',
            bg: 'hover:bg-primary-500'
        },
        {
            label: 'Vertical Delta',
            value: `${circuit.details?.elevation_change || 0}M`,
            icon: Activity,
            sub: 'Height Displacement',
            color: 'text-secondary-500',
            bg: 'hover:bg-secondary-500'
        },
        {
            label: 'Regulatory Grade',
            value: circuit.details?.fia_grade ? `Level ${circuit.details.fia_grade}` : 'Unranked',
            icon: ShieldCheck,
            sub: 'Sanctioning Status',
            color: 'text-tertiary-500',
            bg: 'hover:bg-tertiary-500'
        },
        {
            label: 'Distance Metric',
            value: circuit.details?.length_km ? `${circuit.details.length_km} KM` : '0.00 KM',
            icon: Ruler,
            sub: 'Total Path Length',
            color: 'text-primary-500',
            bg: 'hover:bg-primary-500'
        },
        {
            label: 'Apex Count',
            value: `${circuit.details?.turns || 0}`,
            icon: Hash,
            sub: 'Directional Changes',
            color: 'text-secondary-500',
            bg: 'hover:bg-secondary-500'
        },
        {
            label: 'Overtake Zones',
            value: `${circuit.details?.drs_zones || 0}`,
            icon: Zap,
            sub: 'Active Drag Reduction',
            color: 'text-tertiary-500',
            bg: 'hover:bg-tertiary-500'
        },
        {
            label: 'Founding Date',
            value: circuit.details?.opened || '2026',
            icon: Calendar,
            sub: 'Inaugural Session',
            color: 'text-primary-500',
            bg: 'hover:bg-primary-500'
        },
        {
            label: 'Seating Volume',
            value: circuit.details?.capacity?.toLocaleString() || '0',
            icon: Users,
            sub: 'Spectator Limit',
            color: 'text-secondary-500',
            bg: 'hover:bg-secondary-500'
        }
    ], [circuit])

    return (
        <section
            ref={containerRef}
            className="w-full bg-white-pure flex flex-col border-b border-black-pure"
        >
            <SectionHeader
                variant={2}
                title="Technical Data"
                subtitle="Physical Specifications"
                officialLabel="Verified Registry"
                championships={[]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black-pure">
                <div className="p-10 lg:p-20 border-r border-black-pure">
                    <SectionMainTitle
                        variant={1}
                        label="Circuit Physics"
                        lineOne="Structural"
                        lineTwo="Metrics"
                        highlight="Analysis"
                    />
                </div>
                <div className="p-10 lg:p-20 flex items-center bg-white-100">
                    <SectionDescription
                        variant={1}
                        text="The following metrics represent the absolute physical constraints of the racing environment, including elevation variance, total turns, and official classification levels."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
                {specs.map((spec, i) => (
                    <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        className={`relative flex flex-col p-12 text-left border-r border-b border-black-pure transition-all duration-300 group focus:outline-none focus:ring-inset focus:ring-4 focus:ring-primary-500 ${spec.bg}`}
                    >
                        <div className="flex justify-between items-start mb-16">
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black-pure group-hover:text-white-pure transition-colors">
                                {spec.label}
                            </span>
                            <spec.icon
                                size={20}
                                className={`${spec.color} group-hover:text-white-pure transition-colors`}
                            />
                        </div>

                        <div className="mt-auto flex flex-col gap-2">
                            <span className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-black-pure group-hover:text-white-pure transition-colors leading-none">
                                {spec.value}
                            </span>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-1 transition-all duration-300 ${spec.color === 'text-primary-500' ? 'bg-primary-500' : spec.color === 'text-secondary-500' ? 'bg-secondary-500' : 'bg-tertiary-500'} group-hover:bg-white-pure group-hover:w-12`} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-black-pure/40 group-hover:text-white-pure/60 transition-colors">
                                    {spec.sub}
                                </span>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Layers size={14} className="text-white-pure" />
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    )
}