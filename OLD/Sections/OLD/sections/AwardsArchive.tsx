'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Award, Media } from '@/payload-types'
import { ArrowUpRight, Calendar, Filter, MapPin, Search, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface AwardsArchiveProps {
    awards: Award[]
}

export default function AwardsArchive({ awards }: AwardsArchiveProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

    const filteredAwards = useMemo(() => {
        let result = awards.filter(award =>
            award.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            award.categories?.some((cat: any) =>
                typeof cat === 'object' && cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )

        return result.sort((a, b) => {
            const dateA = new Date(a.details?.awarded_date || 0).getTime()
            const dateB = new Date(b.details?.awarded_date || 0).getTime()
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
        })
    }, [awards, searchTerm, sortOrder])

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Trophy size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">RECOGNITION_VALIDATION_ARCHIVE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Awards<span className="text-zinc-900"> Archive</span>
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-primary transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="SEARCH_NOMENCLATURE"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-zinc-950 border border-zinc-900 py-3 pl-12 pr-6 text-[10px] font-black uppercase text-white placeholder:text-zinc-800 focus:outline-none focus:border-zinc-700 w-full sm:w-64 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                            className="bg-zinc-950 border border-zinc-900 px-6 py-3 flex items-center gap-3 hover:border-zinc-700 transition-colors"
                        >
                            <Filter size={12} className="text-zinc-700" />
                            <span className="text-[10px] font-black text-white uppercase italic">
                                SORT: {sortOrder === 'newest' ? 'LATEST_FIRST' : 'CHRONOLOGICAL'}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                    {filteredAwards.map((award, idx) => {
                        const thumbnail = award.assets?.thumbnail as Media
                        const date = award.details?.awarded_date ? new Date(award.details.awarded_date) : null

                        return (
                            <motion.div
                                key={award.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx % 3) * 0.1 }}
                                className="bg-black p-10 flex flex-col gap-10 group hover:bg-zinc-950 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                                    {thumbnail?.url ? (
                                        <img
                                            src={thumbnail.url}
                                            alt={award.name}
                                            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Trophy size={40} className="text-zinc-800" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 size-8 bg-black/80 backdrop-blur border border-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight size={14} className="text-white" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-px w-4 bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">VALIDATED_RECOGNITION</span>
                                        </div>
                                        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                                            {award.name}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={10} className="text-zinc-800" />
                                                <span className="text-[7px] font-black text-zinc-800 uppercase">DATE_STAMP</span>
                                            </div>
                                            <span className="text-[10px] font-black text-zinc-400 italic">
                                                {date ? date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : 'TBD'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={10} className="text-zinc-800" />
                                                <span className="text-[7px] font-black text-zinc-800 uppercase">GEOLOCATION</span>
                                            </div>
                                            <span className="text-[10px] font-black text-zinc-400 italic truncate">
                                                {award.details?.awarded_location ? 'VERIFIED_COORDS' : 'GLOBAL_NODE'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-1 mt-4">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <div key={i} className="h-0.5 w-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors" />
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {!filteredAwards.length && (
                    <div className="py-32 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-6">
                        <Trophy size={48} className="text-zinc-900" />
                        <div className="text-center space-y-2">
                            <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">NO_RECORDS_MATCH_QUERY</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-[8px] font-black text-primary uppercase border-b border-primary hover:text-white hover:border-white transition-colors"
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY, borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                            >
                                RESET_FILTERS
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-3">
                        <div className="size-1.5 bg-zinc-800 rotate-45" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">SYSTEM_ARCHIVE_FOOTPRINT_V2.0</span>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="size-1 bg-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}