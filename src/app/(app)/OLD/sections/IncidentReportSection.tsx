'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Car, Driver, Incident, Media } from '@/payload-types'
import { AlertTriangle, Car as CarIcon, Clock, Info, ShieldAlert, User } from 'lucide-react'
import { motion } from 'motion/react'

interface IncidentReportSectionProps {
    incidents: Incident[]
}

export default function IncidentReportSection({ incidents }: IncidentReportSectionProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldAlert size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">REGULATORY_INCIDENT_LOG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Incident<span className="text-zinc-900"> Report</span>
                        </h2>
                    </div>
                    <div className="hidden md:flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-12 w-px bg-zinc-900" />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {incidents.length > 0 ? (
                        incidents.map((incident, idx) => {
                            const drivers = (incident.details?.drivers || []).filter((d): d is Driver => typeof d === 'object')
                            const cars = (incident.details?.cars || []).filter((c): c is Car => typeof c === 'object')
                            const thumbnail = incident.assets?.thumbnail as Media

                            return (
                                <motion.div
                                    key={incident.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group grid grid-cols-1 lg:grid-cols-12 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="lg:col-span-1 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-zinc-900 bg-black">
                                        <AlertTriangle size={16} className="text-zinc-800 group-hover:text-primary transition-colors" style={{ color: '' }} />
                                        <span className="text-[10px] font-black text-white mt-2 italic">#{incident.id}</span>
                                    </div>

                                    <div className="lg:col-span-8 p-8 space-y-6">
                                        <div className="flex flex-wrap items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} className="text-zinc-700" />
                                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                                    {incident.details?.date_time ? new Date(incident.details.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'SESSION_TIME_TBD'}
                                                </span>
                                            </div>
                                            <div className="h-1 w-1 bg-zinc-800 rounded-full" />
                                            <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">
                                                {incident.name}
                                            </span>
                                        </div>

                                        <p className="text-xs font-bold text-zinc-500 uppercase italic leading-relaxed max-w-2xl">
                                            {incident.basics?.description || 'NO_DESCRIPTION_LOGGED_BY_STEWARDS_OFFICE.'}
                                        </p>

                                        <div className="flex flex-wrap gap-8 pt-4 border-t border-zinc-900/50">
                                            <div className="space-y-3">
                                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">PERSONNEL_INVOLVED</span>
                                                <div className="flex gap-4">
                                                    {drivers.length > 0 ? drivers.map((driver) => (
                                                        <div key={driver.id} className="flex items-center gap-2 bg-black border border-zinc-900 px-3 py-1.5">
                                                            <User size={10} className="text-zinc-700" />
                                                            <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                                                {driver.last_name}
                                                            </span>
                                                        </div>
                                                    )) : (
                                                        <span className="text-[9px] font-black text-zinc-800 italic uppercase">NON_DRIVER_INCIDENT</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">ASSETS_DAMAGED</span>
                                                <div className="flex gap-4">
                                                    {cars.length > 0 ? cars.map((car) => (
                                                        <div key={car.id} className="flex items-center gap-2 bg-black border border-zinc-900 px-3 py-1.5">
                                                            <CarIcon size={10} className="text-zinc-700" />
                                                            <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                                                {car.basics?.identifiers?.model || 'PROTO_X'}
                                                            </span>
                                                        </div>
                                                    )) : (
                                                        <span className="text-[9px] font-black text-zinc-800 italic uppercase">NO_ASSET_IMPACT</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-3 relative h-48 lg:h-auto bg-black overflow-hidden border-t lg:border-t-0 lg:border-l border-zinc-900">
                                        {thumbnail?.url ? (
                                            <img
                                                src={thumbnail.url}
                                                alt="Incident Evidence"
                                                className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center grayscale opacity-10">
                                                <ShieldAlert size={48} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent lg:hidden" />
                                        <div className="absolute bottom-4 right-4">
                                            <button className="px-4 py-2 bg-white text-black text-[8px] font-black uppercase tracking-widest hover:bg-primary transition-colors">
                                                VIEW_FOOTAGE
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    ) : (
                        <div className="py-20 border border-zinc-900 bg-zinc-950/20 flex flex-col items-center justify-center space-y-4">
                            <Info size={24} className="text-zinc-900" />
                            <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">CLEAN_SESSION_NO_INCIDENTS_DETECTED</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-zinc-900" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">STEWARD_ENCRYPTION_ACTIVE</span>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => <div key={i} className="size-1 bg-zinc-900 rotate-45" />)}
                    </div>
                </div>
            </div>
        </section>
    )
}