"use client"

import { Circuit, Event, Race, Season } from '@/payload-types'
import React from 'react'

interface RaceCalendarProps {
    races?: Race[]
}

export const RaceCalendar: React.FC<RaceCalendarProps> = ({ races = [] }) => {
    const getStatusColor = (status: string | null | undefined) => {
        switch (status?.toLowerCase()) {
            case 'completed': return '#00FF41'
            case 'ongoing': return '#FFB800'
            case 'cancelled': return '#FF0000'
            default: return '#18181b'
        }
    }

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return { day: '--', month: '---' }
        const date = new Date(dateString)
        return {
            day: date.getDate().toString().padStart(2, '0'),
            month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        }
    }

    return (
        <section className="w-full bg-white font-sans text-black overflow-x-hidden">
            <div className="max-w-[1800px] mx-auto border-x border-black/5">
                <div className="flex flex-col lg:flex-row border-y border-black">
                    <div className="flex-1 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-black/10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-1.5 h-5 bg-black transition-all duration-300 hover:h-6 hover:bg-[#00FF41]" />
                            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-black/40 transition-colors duration-300 hover:text-black/60">
                                {new Date().getFullYear()} Season
                            </span>
                        </div>
                        <h2 className="text-[clamp(2.5rem,8vw,4rem)] font-black uppercase italic tracking-tighter leading-[0.85]">
                            Race Calendar
                        </h2>
                    </div>
                    <div className="w-full lg:w-64 p-6 md:p-10 flex flex-col justify-end bg-zinc-50 shrink-0">
                        <span className="text-[9px] font-black text-black/40 uppercase tracking-widest block mb-1 transition-all duration-300 hover:text-black/60 hover:tracking-[0.25em]">
                            Events
                        </span>
                        <span className="text-4xl font-black italic transition-all duration-300 hover:scale-105 hover:text-[#00FF41] inline-block">
                            {(races?.length || 0).toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    {races && races.length > 0 ? (
                        races.map((race, idx) => {
                            const raceEvent = race.details.event as Event
                            const raceCircuit = race.details.circuit as Circuit
                            const raceSeason = race.details.season as Season
                            const date = formatDate(race.details.start_date)
                            const statusColor = getStatusColor(race.details.status)

                            return (
                                <div
                                    key={race.id}
                                    className="group flex flex-col md:flex-row items-stretch border-b border-black/5 hover:bg-zinc-50 transition-colors duration-300 w-full"
                                >
                                    <div className="hidden md:flex w-16 lg:w-20 items-center justify-center border-r border-black/5 bg-white group-hover:bg-black group-hover:text-white transition-all duration-300">
                                        <span className="text-xl font-black italic transition-all duration-300 group-hover:scale-110">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    <div className="flex-1 flex flex-col md:flex-row">
                                        <div className="flex-1 p-5 md:p-8 flex flex-col justify-center min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="text-[8px] font-black text-[#00FF41] uppercase bg-black px-1.5 py-0.5 transition-all duration-300 hover:shadow-[0_0_6px_rgba(0,255,65,0.4)]">
                                                    {race.basics?.identifiers?.code || 'RC'}
                                                </span>
                                                <span className="text-[8px] font-black text-black/30 uppercase tracking-widest transition-colors duration-300 group-hover:text-black/40">
                                                    {raceSeason?.basics?.identifiers?.abbreviation || ''}
                                                </span>
                                                <span className="md:hidden ml-auto text-xl font-black italic text-black/10 transition-colors duration-300 group-hover:text-black/20">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight truncate transition-all duration-300 group-hover:tracking-normal">
                                                {race.name}
                                            </h3>
                                            <span className="text-[10px] font-bold text-black/40 uppercase mt-0.5 truncate transition-colors duration-300 group-hover:text-black/50">
                                                {raceEvent?.name || ''}
                                            </span>
                                        </div>

                                        <div className="w-full md:w-auto md:min-w-[240px] p-5 md:p-8 border-t md:border-t-0 md:border-x border-black/5 flex items-center gap-4 bg-zinc-50/30">
                                            <div className="w-10 h-10 shrink-0 bg-white border border-black/10 p-1 flex items-center justify-center transition-all duration-300 group-hover:border-black/20 group-hover:shadow-sm">
                                                {raceCircuit?.assets?.circuit_map && typeof raceCircuit.assets.circuit_map === 'object' ? (
                                                    <img
                                                        src={(raceCircuit.assets.circuit_map as any).url}
                                                        className="w-full h-full object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                                                        alt=""
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-200 transition-colors duration-300 group-hover:bg-zinc-300" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[8px] font-black text-black/30 uppercase block transition-colors duration-300 group-hover:text-black/40">
                                                    Circuit
                                                </span>
                                                <span className="text-sm font-black uppercase italic truncate leading-tight transition-colors duration-300 group-hover:text-black/80">
                                                    {raceCircuit?.name || ''}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-auto md:min-w-[120px] p-5 md:p-8 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start border-t md:border-t-0 border-black/5">
                                            <span className="text-[8px] font-black text-black/30 uppercase md:mb-1 transition-colors duration-300 group-hover:text-black/40">
                                                Time
                                            </span>
                                            <div className="flex items-baseline gap-1 transition-all duration-300 group-hover:scale-105">
                                                <span className="text-xl font-black italic transition-colors duration-300 group-hover:text-[#00FF41]">
                                                    {date.day}
                                                </span>
                                                <span className="text-[10px] font-black italic text-zinc-400 transition-colors duration-300 group-hover:text-zinc-500">
                                                    {date.month}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-auto md:min-w-[160px] p-5 md:p-8 flex items-center justify-between md:justify-end border-t md:border-t-0 md:border-l border-black/5">
                                            <div className="flex flex-col items-end gap-0.5">
                                                <span className="text-[8px] font-black text-black/30 uppercase transition-colors duration-300 group-hover:text-black/40">
                                                    Status
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="text-[10px] font-black uppercase italic transition-all duration-300 hover:scale-105"
                                                        style={{ color: statusColor }}
                                                    >
                                                        {race.details.status || 'scheduled'}
                                                    </span>
                                                    <div
                                                        className="w-1.5 h-4 transition-all duration-300 animate-pulse"
                                                        style={{
                                                            backgroundColor: statusColor,
                                                            boxShadow: `0 0 8px ${statusColor}`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center bg-zinc-50">
                            <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.4em] transition-all duration-500 hover:text-black/30 hover:tracking-[0.5em]">
                                No races scheduled
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap bg-white">
                    {[
                        { label: 'Series', value: 'Championship' },
                        { label: 'Status', value: 'Active' },
                        { label: 'Updated', value: 'Live' },
                        { label: 'Season', value: new Date().getFullYear().toString() }
                    ].map((item, i) => (
                        <div key={i} className="flex-1 min-w-[50%] md:min-w-0 p-5 md:p-6 border-t md:border-t-0 border-r border-black/5 last:border-r-0">
                            <span className="text-[8px] font-black text-black/30 uppercase block tracking-widest transition-all duration-300 hover:text-black/40 hover:tracking-[0.25em]">
                                {item.label}
                            </span>
                            <span className="text-[10px] font-black uppercase italic transition-all duration-300 hover:text-black/80 hover:translate-x-0.5 inline-block">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}