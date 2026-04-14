'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Car as CarType, Driver, Incident } from '@/payload-types'
import { AlertTriangle, ArrowUpDown, Calendar, Car, Info, MapPin, Search, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface IncidentLogProps {
    incidents: Incident[]
}

export default function IncidentLog({ incidents }: IncidentLogProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')

    const filteredIncidents = useMemo(() => {
        let result = incidents.filter(incident =>
            incident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.basics?.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return result.sort((a, b) => {
            const dateA = new Date(a.details?.date_time || 0).getTime()
            const dateB = new Date(b.details?.date_time || 0).getTime()
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
        })
    }, [incidents, searchTerm, sortOrder])

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">OPERATIONAL_INCIDENT_LEDGER</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Incident<span className="text-zinc-900"> Log</span>
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-800" size={14} />
                            <input
                                type="text"
                                placeholder="FILTER_BY_NODE"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-zinc-950 border border-zinc-900 py-3 pl-12 pr-6 text-[10px] font-black uppercase text-white placeholder:text-zinc-800 focus:outline-none focus:border-zinc-700 w-full sm:w-64 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                            className="bg-zinc-950 border border-zinc-900 px-6 py-3 flex items-center gap-3 hover:border-zinc-700 transition-colors"
                        >
                            <ArrowUpDown size={12} className="text-zinc-700" />
                            <span className="text-[10px] font-black text-white uppercase italic">
                                {sortOrder === 'desc' ? 'NEWEST_FIRST' : 'OLDEST_FIRST'}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredIncidents.length > 0 ? (
                        filteredIncidents.map((incident, idx) => {
                            const date = incident.details?.date_time ? new Date(incident.details.date_time) : null
                            const drivers = (incident.details?.drivers || []) as Driver[]
                            const cars = (incident.details?.cars || []) as CarType[]

                            return (
                                <motion.div
                                    key={incident.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-zinc-950 border border-zinc-900 group hover:border-primary transition-all duration-300"
                                    style={{ borderLeftColor: idx % 2 === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        <div className="lg:w-1/4 p-8 border-b lg:border-b-0 lg:border-r border-zinc-900 space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={10} className="text-zinc-800" />
                                                <span className="text-[9px] font-black text-zinc-500 uppercase">
                                                    {date ? date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : 'DATE_PENDING'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black italic text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
                                                {incident.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={10} className="text-zinc-800" />
                                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                                                    {incident.details?.location ? 'COORD_LOCKED' : 'CIRCUIT_UNKNOWN'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lg:w-2/4 p-8 border-b lg:border-b-0 lg:border-r border-zinc-900 space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Info size={10} className="text-zinc-800" />
                                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">INCIDENT_SUMMARY</span>
                                            </div>
                                            <p className="text-[11px] font-bold text-zinc-400 uppercase italic leading-relaxed">
                                                {incident.basics?.description || 'NO_DESCRIPTION_LOGGED_IN_DATABASE'}
                                            </p>
                                        </div>

                                        <div className="lg:w-1/4 p-8 bg-black/40 space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Users size={10} className="text-zinc-800" />
                                                    <span className="text-[7px] font-black text-zinc-800 uppercase">INVOLVED_DRIVERS</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {drivers.map(d => (
                                                        <span key={d.id} className="text-[10px] font-black text-white bg-zinc-900 px-2 py-0.5 italic">
                                                            {d.last_name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Car size={10} className="text-zinc-800" />
                                                    <span className="text-[7px] font-black text-zinc-800 uppercase">AFFECTED_CHASSIS</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {cars.map(c => (
                                                        <span key={c.id} className="text-[10px] font-black text-zinc-500 border border-zinc-900 px-2 py-0.5 italic">
                                                            {c.basics?.identifiers?.chassis || c.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    ) : (
                        <div className="py-32 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-4">
                            <AlertTriangle size={24} className="text-zinc-900" />
                            <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">NO_LOGS_IDENTIFIED</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="size-2 bg-primary animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">STATUS: DATA_INTEGRITY_VERIFIED</span>
                    </div>
                    <div className="flex gap-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-4 w-[1px] bg-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}