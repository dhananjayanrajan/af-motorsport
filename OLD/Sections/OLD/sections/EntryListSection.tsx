'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Car, Driver, Entry, Team } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Activity, Car as CarIcon, Fingerprint, Hash, Shield, Users } from 'lucide-react'
import { motion } from 'motion/react'

interface EntryListSectionProps {
    entries: Entry[]
}

export default function EntryListSection({ entries }: EntryListSectionProps) {
    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Users size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">PARTICIPANT_MANIFEST_REGISTRY</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Entry<span className="text-zinc-900"> List</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-900 px-6 py-3">
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">TOTAL_FIELD_CAPACITY</span>
                        <span className="text-xl font-black italic text-white">{entries.length.toString().padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    {entries.map((entry, idx) => {
                        const categories = entry.categories || []

                        const drivers = categories.filter((cat): cat is any =>
                            typeof cat === 'object' && cat !== null && 'first_name' in cat
                        ) as Driver[]

                        const car = categories.find((cat): cat is any =>
                            typeof cat === 'object' && cat !== null && 'basics' in cat && (cat as any).basics?.identifiers?.model !== undefined
                        ) as Car | undefined

                        const team = categories.find((cat): cat is any =>
                            typeof cat === 'object' && cat !== null && 'name' in cat && !('first_name' in cat) && !('basics' in cat && (cat as any).basics?.identifiers?.model !== undefined)
                        ) as Team | undefined

                        return (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.03 }}
                                className="group bg-black p-8 space-y-8 hover:bg-zinc-950 transition-colors duration-500"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="size-14 bg-zinc-950 border border-zinc-900 flex items-center justify-center relative overflow-hidden group-hover:border-primary transition-colors">
                                        <Hash size={12} className="absolute top-1 left-1 text-zinc-800" />
                                        <span className="text-3xl font-black italic text-white">
                                            {entry.basics?.identifiers?.number || '00'}
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 border text-[8px] font-black uppercase tracking-widest italic",
                                        entry.details.status === 'Confirmed' ? "border-zinc-800 text-zinc-500" : "border-primary text-primary"
                                    )} style={{
                                        color: entry.details.status !== 'Confirmed' ? DESIGN_SYSTEM.COLORS.PRIMARY : '',
                                        borderColor: entry.details.status !== 'Confirmed' ? DESIGN_SYSTEM.COLORS.PRIMARY : ''
                                    }}>
                                        {entry.details.status || 'PENDING'}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.2em] block">PRIMARY_OPERATOR</span>
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                                        {drivers.length > 0 ? `${drivers[0].first_name} ${drivers[0].last_name}` : entry.name}
                                    </h3>
                                    <div className="flex gap-1 pt-1">
                                        {drivers.slice(1).map((d, i) => (
                                            <span key={i} className="text-[9px] font-bold text-zinc-600 uppercase italic">/ {d.first_name} {d.last_name}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-zinc-900">
                                    <div className="flex items-center gap-4">
                                        <div className="size-8 bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0">
                                            <CarIcon size={12} className="text-zinc-700" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase">CHASSIS_MODEL</span>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase italic truncate">
                                                {car?.basics?.identifiers?.model || car?.name || 'GENERIC_PROTOTYPE'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="size-8 bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0">
                                            <Shield size={12} className="text-zinc-700" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[7px] font-black text-zinc-800 uppercase">TEAM_AFFILIATION</span>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase italic truncate">
                                                {team?.name || 'INDEPENDENT_ENTRY'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="flex items-center gap-2">
                                        <Activity size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">SYSTEM_IDENT_0x{entry.id}</span>
                                    </div>
                                    <Fingerprint size={12} className="text-zinc-900" />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-zinc-900">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest">REGISTRATION_LOCK:</span>
                        <span className="text-[9px] font-black text-zinc-500 uppercase italic">ACTIVE_FIELD_VERIFIED</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-4 w-1 bg-zinc-950" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}