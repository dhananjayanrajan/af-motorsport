'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Driver, Organization, Program } from '@/payload-types'
import { ArrowRight, Building2, Globe, Handshake, Shield, Users } from 'lucide-react'
import { motion } from 'motion/react'

interface ProgramParticipantsPartnersProps {
    program: Program
}

export default function ProgramParticipantsPartners({ program }: ProgramParticipantsPartnersProps) {
    const participants = (program.details?.participants || []) as Driver[]
    const partners = (program.details?.partners || []) as Organization[]
    const sponsors = (program.details?.sponsors || []) as Organization[]

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Handshake size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">ALLIANCE_INTEGRATION_NETWORK</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Participants &<span className="text-zinc-900"> Partners</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-6 space-y-12">
                        <div className="flex items-center gap-4">
                            <Users size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ACTIVE_PARTICIPANTS</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-zinc-900 border border-zinc-900">
                            {participants.length > 0 ? participants.map((driver, idx) => (
                                <motion.div
                                    key={driver.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-black p-6 group hover:bg-zinc-950 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 bg-zinc-900 border border-zinc-800 group-hover:grayscale-0 transition-all overflow-hidden">
                                            {typeof driver.assets?.avatar === 'object' && driver.assets?.avatar?.url ? (
                                                <img src={driver.assets.avatar.url} alt={driver.first_name || 'Driver'} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-800 text-[10px] font-black">
                                                    {driver.first_name?.[0] || 'U'}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[7px] font-black text-primary uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                NODE_ID_{driver.id}
                                            </span>
                                            <h4 className="text-sm font-black text-white uppercase italic tracking-tighter">
                                                {driver.first_name} {driver.last_name}
                                            </h4>
                                        </div>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="col-span-full py-20 bg-black flex flex-col items-center justify-center gap-4 opacity-20">
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">ENROLLMENT_PERIOD_ACTIVE</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-6 space-y-12">
                        <div className="flex items-center gap-4">
                            <Building2 size={14} className="text-zinc-800" />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">SUPPORTING_INFRASTRUCTURE</span>
                        </div>

                        <div className="space-y-4">
                            {[...partners, ...sponsors].length > 0 ? [...partners, ...sponsors].map((org, idx) => (
                                <motion.div
                                    key={org.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="size-10 flex items-center justify-center bg-black border border-zinc-900 p-2 group-hover:grayscale-0 transition-all">
                                            {typeof org.assets?.logo === 'object' && org.assets?.logo?.url ? (
                                                <img src={org.assets.logo.url} alt={org.name} className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <Globe size={16} className="text-zinc-800" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">
                                                    {sponsors.some(s => s.id === org.id) ? 'OFFICIAL_SPONSOR' : 'STRATEGIC_PARTNER'}
                                                </span>
                                                {sponsors.some(s => s.id === org.id) && <Shield size={8} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />}
                                            </div>
                                            <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">
                                                {org.name}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="border-t md:border-t-0 md:border-l border-zinc-900 pt-4 md:pt-0 md:pl-8">
                                        <span className="text-[7px] font-black text-zinc-700 uppercase block mb-1">PROGRAM_RELATION</span>
                                        <p className="text-[9px] font-bold text-zinc-500 uppercase italic">
                                            {org.basics?.tagline || 'SYSTEM_ALIGNMENT_VERIFIED'}
                                        </p>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="py-20 bg-zinc-950 border border-zinc-900 border-dashed flex flex-col items-center justify-center opacity-20">
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">NO_PARTNER_DATA_RECOVERED</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-8">
                        <div className="flex gap-1">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="h-1 w-2 bg-zinc-900" />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.4em]">NETWORK_LOAD: STABLE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="size-1 bg-green-900" />
                            <span className="text-[7px] font-black text-zinc-800 uppercase italic">NODES_CONNECTED: {participants.length + partners.length + sponsors.length}</span>
                        </div>
                        <ArrowRight size={12} className="text-zinc-900" />
                    </div>
                </div>
            </div>
        </section>
    )
}