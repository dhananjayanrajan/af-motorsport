'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Car, Driver, Incident, Media } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface IncidentsProps {
    incidents: Incident[];
}

export default function Incidents({ incidents }: IncidentsProps) {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section className="bg-white py-32 border-t border-zinc-100 font-sans">
            <div className="px-10 mb-20 flex items-end justify-between">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-1.5 h-6"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400">
                            Telemetry_Disruptions
                        </span>
                    </div>
                    <h2 className="text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Incidents_Log
                    </h2>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Classification</span>
                    <span className="text-xs font-black text-black uppercase italic">Registry_Archive</span>
                </div>
            </div>

            <div className="flex flex-col border-t border-zinc-100">
                {incidents.map((incident) => {
                    const isOpen = activeId === incident.id;
                    const drivers = incident.details?.drivers as Driver[];
                    const cars = incident.details?.cars as Car[];

                    return (
                        <div key={incident.id} className="border-b border-zinc-100 last:border-0">
                            <button
                                onClick={() => setActiveId(isOpen ? null : incident.id)}
                                className="w-full px-10 py-12 flex flex-col md:flex-row md:items-center justify-between group transition-all hover:bg-zinc-50 text-left outline-none"
                            >
                                <div className="flex flex-col gap-3 mb-8 md:mb-0">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black tabular-nums text-zinc-400 uppercase tracking-widest">
                                            {incident.details?.date_time ? new Date(incident.details.date_time).toLocaleString('en-GB', { hour12: false }) : '00:00:00'}
                                        </span>
                                        <div className="w-[1px] h-3 bg-zinc-200" />
                                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                                            REF_{incident.id}
                                        </span>
                                    </div>
                                    <h3 className={`text-4xl font-black uppercase italic tracking-tighter transition-colors duration-500 ${isOpen ? 'text-black' : 'text-zinc-300 group-hover:text-black'}`}>
                                        {incident.name}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-16">
                                    <div className="flex -space-x-6">
                                        {drivers?.map((driver) => {
                                            const avatarUrl = (driver.assets?.avatar as Media)?.url;
                                            return (
                                                <div key={driver.id} className="w-16 h-16 border-4 border-white bg-zinc-100 overflow-hidden relative group/avatar shadow-sm">
                                                    {avatarUrl ? (
                                                        <img
                                                            src={avatarUrl}
                                                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/avatar:grayscale-0"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                                                            <span className="text-[8px] font-black text-zinc-400">UNIT</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Asset_Index</span>
                                        <div className="flex gap-2">
                                            {cars?.map((car) => (
                                                <span key={car.id} className="px-3 py-1 border border-zinc-200 bg-white text-[10px] font-black text-black uppercase tabular-nums">
                                                    CAR_{car.id}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        className="w-6 h-6 flex items-center justify-center ml-4"
                                    >
                                        <div className="w-2 h-2 border-r-2 border-b-2 border-zinc-300 rotate-45" />
                                    </motion.div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden bg-zinc-50"
                                    >
                                        <div className="px-10 py-24 border-t border-zinc-100 grid grid-cols-12 gap-20">
                                            <div className="col-span-12 lg:col-span-7">
                                                <div className="flex items-center gap-4 mb-10">
                                                    <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black">
                                                        Technical_Summary
                                                    </span>
                                                </div>
                                                <div className="max-w-3xl">
                                                    <p className="text-zinc-600 text-lg font-black uppercase italic leading-tight tracking-tight">
                                                        {incident.basics?.description || 'No descriptive metadata available for this incident ID. Investigation status: Pending.'}
                                                    </p>
                                                    <div className="mt-12 grid grid-cols-3 gap-10">
                                                        <div>
                                                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Severity</p>
                                                            <p className="text-sm font-black text-black uppercase">Level_02</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Review</p>
                                                            <p className="text-sm font-black text-black uppercase">Completed</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status</p>
                                                            <p className="text-sm font-black text-black uppercase">Logged</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-5">
                                                <div className="relative aspect-video bg-zinc-200 border border-zinc-300 flex items-center justify-center overflow-hidden">
                                                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                                                    <span className="relative z-10 text-[10px] font-black text-zinc-400 uppercase tracking-[0.6em]">
                                                        Media_Feed_Offline
                                                    </span>
                                                    <div className="absolute top-6 left-6 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                                                        <span className="text-[8px] font-black text-zinc-400 uppercase">Standby</span>
                                                    </div>
                                                    <div
                                                        className="absolute bottom-0 left-0 w-full h-1"
                                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}