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
        <section className="py-16 md:py-24 lg:py-32 border-t font-sans" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
            <div className="px-4 sm:px-6 lg:px-10 mb-12 md:mb-16 lg:mb-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-0">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-1.5 h-6"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                            Incident Reports
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                        Incidents Log
                    </h2>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-0">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Official Records</span>
                    <span className="text-xs font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Registry Archive</span>
                </div>
            </div>

            <div className="flex flex-col border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                {incidents.map((incident) => {
                    const isOpen = activeId === incident.id;
                    const drivers = incident.details?.drivers as Driver[];
                    const cars = incident.details?.cars as Car[];

                    return (
                        <div key={incident.id} className="border-b last:border-0" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                            <button
                                onClick={() => setActiveId(isOpen ? null : incident.id)}
                                className="w-full px-4 sm:px-6 lg:px-10 py-6 md:py-8 lg:py-12 flex flex-col lg:flex-row lg:items-center justify-between group transition-all duration-200 hover:bg-zinc-50 text-left outline-none"
                            >
                                <div className="flex flex-col gap-3 mb-4 lg:mb-0">
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                        <span className="text-[10px] font-black tabular-nums uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                                            {incident.details?.date_time ? new Date(incident.details.date_time).toLocaleString('en-GB', { hour12: false }) : '00:00:00'}
                                        </span>
                                        <div className="hidden sm:block w-[1px] h-3" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_200 }} />
                                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                                            REF_{incident.id}
                                        </span>
                                    </div>
                                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic tracking-tighter transition-colors duration-200 ${isOpen ? 'text-black' : 'text-zinc-300 group-hover:text-black'}`} style={{ color: isOpen ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                                        {incident.name}
                                    </h3>
                                </div>

                                <div className="flex flex-row items-center justify-between lg:justify-end gap-4 lg:gap-16 w-full lg:w-auto">
                                    <div className="flex -space-x-3 sm:-space-x-4 lg:-space-x-6">
                                        {drivers?.map((driver) => {
                                            const avatarUrl = (driver.assets?.avatar as Media)?.url;
                                            return (
                                                <div key={driver.id} className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-2 sm:border-4 overflow-hidden relative group/avatar shadow-sm" style={{ borderColor: DESIGN_SYSTEM.COLORS.SURFACE, backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                                                    {avatarUrl ? (
                                                        <img
                                                            src={avatarUrl}
                                                            className="w-full h-full object-cover grayscale transition-all duration-200 group-hover/avatar:grayscale-0"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
                                                            <img
                                                                src="https://picsum.photos/seed/driver/64/64"
                                                                className="w-full h-full object-cover"
                                                                alt=""
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-2">
                                        <span className="text-[8px] font-black uppercase tracking-widest hidden sm:block" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Vehicle Registry</span>
                                        <div className="flex gap-1 sm:gap-2">
                                            {cars?.map((car) => (
                                                <span key={car.id} className="px-2 sm:px-3 py-1 border text-[8px] sm:text-[10px] font-black uppercase tabular-nums" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200, backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                    CAR_{car.id}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-6 h-6 flex items-center justify-center"
                                    >
                                        <div className="w-2 h-2 border-r-2 border-b-2 rotate-45" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_300 }} />
                                    </motion.div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_50 }}
                                    >
                                        <div className="px-4 sm:px-6 lg:px-10 py-12 md:py-16 lg:py-24 border-t grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                                            <div className="lg:col-span-7">
                                                <div className="flex items-center gap-4 mb-6 lg:mb-10">
                                                    <div className="w-8 lg:w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                                        Incident Summary
                                                    </span>
                                                </div>
                                                <div className="max-w-3xl">
                                                    <p className="text-base lg:text-lg font-black uppercase italic leading-tight tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}>
                                                        {incident.basics?.description || 'No descriptive metadata available for this incident ID. Investigation status: Pending.'}
                                                    </p>
                                                    <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
                                                        <div>
                                                            <p className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Severity</p>
                                                            <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Level_02</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Review</p>
                                                            <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Completed</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Status</p>
                                                            <p className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Logged</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:col-span-5">
                                                <div className="relative aspect-video border flex items-center justify-center overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_200, borderColor: DESIGN_SYSTEM.COLORS.ZINC_300 }}>
                                                    <img
                                                        src="https://picsum.photos/seed/incident/800/450"
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                    />
                                                    <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_400 }} />
                                                        <span className="text-[8px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Standby</span>
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