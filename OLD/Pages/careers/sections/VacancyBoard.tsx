'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Vacancy } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ArrowUpRight, Clock, Cpu, Filter, Globe, Search, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface VacancyBoardProps {
    vacancies: Vacancy[]
}

export default function VacancyBoard({ vacancies }: VacancyBoardProps) {
    const [filterDept, setFilterDept] = useState<string>('ALL_SECTORS')
    const [searchTerm, setSearchTerm] = useState('')

    const departments = useMemo(() => {
        const depts = new Set(vacancies.map(v => v.details?.department).filter(Boolean))
        return ['ALL_SECTORS', ...Array.from(depts)] as string[]
    }, [vacancies])

    const filteredVacancies = useMemo(() => {
        return vacancies.filter(v => {
            const matchesDept = filterDept === 'ALL_SECTORS' || v.details?.department === filterDept
            const matchesSearch = v.basics.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                v.details?.department?.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesDept && matchesSearch
        })
    }, [vacancies, filterDept, searchTerm])

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Cpu size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">HUMAN_CAPITAL_ACQUISITION</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Vacancy<span className="text-zinc-900"> Board</span>
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-800" size={14} />
                            <input
                                type="text"
                                placeholder="SEARCH_ROLES"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-zinc-950 border border-zinc-900 py-3 pl-12 pr-6 text-[10px] font-black uppercase text-white placeholder:text-zinc-800 focus:outline-none focus:border-zinc-700 w-full transition-all"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={filterDept}
                                onChange={(e) => setFilterDept(e.target.value)}
                                className="appearance-none bg-zinc-950 border border-zinc-900 py-3 pl-6 pr-12 text-[10px] font-black uppercase text-white focus:outline-none focus:border-zinc-700 w-full cursor-pointer"
                            >
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-800 pointer-events-none" size={12} />
                        </div>
                    </div>
                </div>

                <div className="space-y-[1px] bg-zinc-900 border border-zinc-900">
                    <AnimatePresence mode="popLayout">
                        {filteredVacancies.length > 0 ? (
                            filteredVacancies.map((vacancy, idx) => (
                                <motion.div
                                    key={vacancy.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-black group hover:bg-zinc-950 transition-colors"
                                >
                                    <div className="flex flex-col lg:flex-row items-stretch min-h-[120px]">
                                        <div className="lg:w-2/5 p-8 flex flex-col justify-center space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[7px] font-black text-primary uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                    {vacancy.details?.department || 'GENERAL_OPERATIONS'}
                                                </span>
                                                <div className="size-1 bg-zinc-800 rounded-full" />
                                                <span className="text-[7px] font-mono text-zinc-700">ID: {vacancy.id.toString().padStart(4, '0')}</span>
                                            </div>
                                            <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                                                {vacancy.basics.title}
                                            </h3>
                                        </div>

                                        <div className="lg:w-1/5 p-8 flex flex-col justify-center border-y lg:border-y-0 lg:border-x border-zinc-900 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Clock size={12} className="text-zinc-800" />
                                                <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                                    {vacancy.details?.contract?.replace('_', ' ') || 'CONTRACT_PENDING'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Globe size={12} className="text-zinc-800" />
                                                <span className="text-[9px] font-black text-zinc-400 uppercase italic">
                                                    {vacancy.details?.locations ? 'ON_SITE_COORD' : 'REMOTE_DEPLOYMENT'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lg:w-1/5 p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-900">
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest block">POSTING_DATE</span>
                                                <span className="text-[10px] font-black text-zinc-500 uppercase">
                                                    {new Date(vacancy.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lg:w-1/5 p-8 flex items-center justify-end group/btn">
                                            <a
                                                href={`/careers/${vacancy.alias || vacancy.id}`}
                                                className="flex items-center justify-between w-full lg:w-auto gap-6 bg-zinc-900 group-hover/btn:bg-white px-6 py-4 transition-all duration-300"
                                            >
                                                <span className="text-[10px] font-black text-white group-hover/btn:text-black uppercase italic tracking-widest">VIEW_SPEC</span>
                                                <ArrowUpRight size={14} className="text-primary group-hover/btn:text-black" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="bg-black py-40 flex flex-col items-center justify-center gap-6">
                                <Zap size={32} className="text-zinc-900" />
                                <div className="text-center space-y-2">
                                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">NO_OPEN_VACANCIES_MATCHING_QUERY</p>
                                    <button
                                        onClick={() => { setFilterDept('ALL_SECTORS'); setSearchTerm('') }}
                                        className="text-[8px] font-black text-primary uppercase border-b border-primary italic"
                                        style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY, borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                    >
                                        RESET_FILTERS
                                    </button>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} className={cn("h-3 w-[1px]", i % 4 === 0 ? "bg-zinc-700" : "bg-zinc-900")} />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.2em]">SYSTEM_OUTPUT: LIVE_RECRUITMENT_FEED</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">ESTABLISHED_CONNECTIONS</span>
                        <div className="size-2 bg-green-900 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    )
}