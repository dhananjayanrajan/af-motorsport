'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Session } from '@/payload-types';
import { motion } from 'framer-motion';

interface SessionStackProps {
    sessions: Session[];
}

export default function SessionStack({ sessions }: SessionStackProps) {
    return (
        <section className="w-full bg-white px-6 py-24 md:px-20 border-b border-zinc-100 font-sans">
            <div className="flex flex-col gap-4 mb-20">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-[2px]"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                        Operational Segments
                    </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                    Sessions
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
                {sessions.map((session, index) => {
                    const thumbnail = (session.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/session-${session.id}/800/600`;

                    return (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-white p-10 min-h-[550px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-black"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none scale-110 group-hover:scale-100 duration-1000">
                                <img src={thumbnail} alt="" className="w-full h-full object-cover grayscale" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10 flex justify-between items-start">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                                        {session.basics?.identifiers?.code || `SES_${session.id}`}
                                    </span>
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600">
                                        {session.basics?.segment || 'Standard_Protocol'}
                                    </span>
                                </div>
                                <span className="text-sm font-black italic tabular-nums text-zinc-300 group-hover:text-primary transition-colors">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>

                            <div className="relative z-10 mt-12">
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-black group-hover:text-white transition-colors leading-none mb-6">
                                    {session.name}
                                </h3>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {session.basics?.description || 'No specialized mission parameters have been logged for this operational segment.'}
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 group-hover:border-zinc-800 pt-8 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-zinc-600">Quantifier</span>
                                        <span className="text-xl font-black italic tabular-nums text-black group-hover:text-white transition-colors">
                                            {session.metrics?.quantifiers?.laps || session.metrics?.quantifiers?.duration || '--'}
                                            <span className="text-[10px] ml-1 uppercase not-italic text-zinc-400 group-hover:text-zinc-600">
                                                {session.metrics?.quantifiers?.laps ? 'Laps' : 'Min'}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-zinc-600">Access</span>
                                        <span className="text-xl font-black italic uppercase text-black group-hover:text-white transition-colors">
                                            {session.details?.access || 'Public'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-[1px] bg-zinc-100 group-hover:bg-primary transition-all duration-500 group-hover:w-20" />
                                        <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em] group-hover:text-zinc-500 transition-colors">
                                            Execute_Session
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 border border-zinc-200 rotate-45 flex items-center justify-center transition-all duration-300 group-hover:border-transparent group-hover:bg-primary">
                                        <div className="-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400 group-hover:text-white">
                                                <path d="M7 17l10-10M7 7h10v10" strokeLinecap="square" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}