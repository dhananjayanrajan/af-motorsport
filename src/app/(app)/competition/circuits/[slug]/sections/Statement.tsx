'use client'

import SectionDescription from '@/components/Section/Description'
import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionMainTitle from '@/components/Section/Title'
import { Circuit, Country, Media } from '@/payload-types'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Layers, Map, MoveUpRight, Navigation, Users } from 'lucide-react'
import { useRef } from 'react'

interface CircuitStatementProps {
    circuit: Circuit;
}

export default function CircuitStatement({ circuit }: CircuitStatementProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { margin: "-10%", once: true })

    const mapUrl = (circuit.assets?.circuit_map as Media)?.url
        || `https://picsum.photos/seed/${circuit.id}/1000/1000?grayscale`

    const countryName = typeof circuit.details?.country === 'object'
        ? (circuit.details.country as Country)?.name
        : ''

    const metrics = [
        {
            value: circuit.details?.direction || null,
            icon: Navigation,
            color: 'text-primary-500',
            border: 'hover:border-primary-500'
        },
        {
            value: circuit.details?.turns ? `${circuit.details.turns}` : null,
            icon: Layers,
            color: 'text-secondary-500',
            border: 'hover:border-secondary-500'
        },
        {
            value: circuit.details?.elevation_change ? `${circuit.details.elevation_change}M` : null,
            icon: MoveUpRight,
            color: 'text-tertiary-500',
            border: 'hover:border-tertiary-500'
        },
        {
            value: circuit.details?.capacity ? new Intl.NumberFormat().format(circuit.details.capacity) : null,
            icon: Users,
            color: 'text-primary-500',
            border: 'hover:border-primary-500'
        }
    ].filter(m => m.value !== null)

    const handleAction = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            ref={containerRef}
            className="w-full bg-white-pure flex flex-col border-b border-black-pure"
        >
            <SectionHeader
                variant={2}
                title={circuit.name}
                subtitle={countryName}
                officialLabel={circuit.basics?.identifiers?.code || ''}
                championships={[]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black-pure">
                <div className="p-10 lg:p-20 border-r border-black-pure flex flex-col justify-between bg-white-pure">
                    <div className="flex flex-col gap-10">
                        <SectionMainTitle
                            variant={1}
                            label={circuit.basics?.identifiers?.code || ''}
                            lineOne={circuit.name.split(' ')[0]}
                            lineTwo={circuit.name.split(' ').slice(1).join(' ')}
                            highlight={circuit.details?.type || ''}
                        />
                        <div className="max-w-xl">
                            <SectionDescription
                                variant={1}
                                text={circuit.basics?.description || ""}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-20">
                        {metrics.map((metric, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => handleAction('circuit-specs')}
                                className={`flex flex-col gap-4 p-6 border-l-4 border-black-pure/10 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 ${metric.border} hover:bg-white-100 group`}
                            >
                                <metric.icon size={18} className={`${metric.color} group-hover:scale-110 transition-transform`} />
                                <span className="text-xl font-black italic uppercase text-black-pure tracking-tighter">
                                    {metric.value}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="relative bg-white-100 flex items-center justify-center p-10 lg:p-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        className="relative w-full aspect-square max-w-md group"
                    >
                        <img
                            src={mapUrl}
                            alt={circuit.name}
                            className="relative z-10 w-full h-full object-contain grayscale contrast-125 transition-all duration-700 group-hover:contrast-150 group-hover:scale-105"
                        />

                        <div className="absolute top-0 right-0 p-6 border-r-4 border-primary-500 bg-white-pure shadow-xl">
                            <span className="text-4xl font-black italic uppercase text-black-pure tracking-tighter leading-none">
                                {circuit.details?.length_km || '0.00'}
                            </span>
                        </div>

                        <button
                            onClick={() => window.open(`https://www.google.com/maps/search/${circuit.name}+${countryName}`, '_blank')}
                            className="absolute bottom-0 left-0 bg-black-pure text-white-pure p-6 hover:bg-primary-500 transition-colors focus:outline-none"
                        >
                            <div className="flex items-center gap-4">
                                <Map size={16} className="text-primary-500 group-hover:text-white-pure transition-colors" />
                                <span className="text-2xl font-black italic uppercase tracking-tighter">
                                    {circuit.details?.fia_grade ? `Grade ${circuit.details.fia_grade}` : countryName}
                                </span>
                            </div>
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                <button
                    onClick={() => handleAction('circuit-hero')}
                    className="p-12 flex items-center justify-between border-r border-black-pure hover:bg-secondary-500 group transition-all duration-500 focus:outline-none"
                >
                    <span className="text-xl font-black italic uppercase tracking-tighter text-black-pure group-hover:text-white-pure transition-colors">
                        {circuit.name}
                    </span>
                    <ExternalLink size={20} className="text-black-pure/10 group-hover:text-white-pure/40 transition-colors" />
                </button>
                <button
                    onClick={() => handleAction('circuit-details')}
                    className="p-12 flex items-center justify-between hover:bg-tertiary-500 group transition-all duration-500 focus:outline-none"
                >
                    <span className="text-xl font-black italic uppercase tracking-tighter text-black-pure group-hover:text-white-pure transition-colors">
                        {circuit.details?.type || circuit.basics?.identifiers?.code}
                    </span>
                    <Navigation size={20} className="text-black-pure/10 group-hover:text-white-pure/40 transition-colors" />
                </button>
            </div>

            <SectionFooter
                variant={3}
                navigateLabel={circuit.name}
                entryPointsLabel={countryName}
            />
        </section>
    )
}