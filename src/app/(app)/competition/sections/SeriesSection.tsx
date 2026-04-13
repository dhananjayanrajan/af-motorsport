'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Series } from '@/payload-types';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SeriesSectionProps {
    series: Series[];
}

export default function SeriesSection({ series }: SeriesSectionProps) {
    return (
        <section
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE }}
            className="relative w-full border-t border-zinc-200"
        >
            <div className="px-20 py-20 flex items-end justify-between border-b border-zinc-200">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-2 h-2"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL} text-zinc-400`}>
                            Complete Overview
                        </span>
                    </div>
                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Series
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-zinc-200 gap-px border-b border-zinc-200">
                {series.map((item) => (
                    <Link
                        key={item.id}
                        href={`/competition/${item.slug}`}
                        className="group relative h-72 bg-white p-8 flex flex-col transition-all duration-300 overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest mb-1 group-hover:text-black transition-colors">
                                    {item.basics?.identifiers?.abbreviation}
                                </span>
                                <span className="text-[9px] font-black tabular-nums text-black">
                                    REF_{item.id}
                                </span>
                            </div>
                            <div className="w-4 h-px bg-zinc-100 group-hover:w-8 group-hover:bg-black transition-all duration-500" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-sm font-black uppercase italic tracking-tight text-black leading-tight group-hover:translate-x-1 transition-transform">
                                {item.name}
                            </h3>
                            {item.basics?.tagline && (
                                <div className="mt-3 flex items-start gap-2">
                                    <div className="w-1 h-1 mt-1 shrink-0 bg-zinc-200 group-hover:bg-black transition-colors" />
                                    <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400 leading-normal line-clamp-2">
                                        {item.basics.tagline}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-zinc-100 mt-6 pt-6">
                            <div className="flex flex-col">
                                <span className="text-[6px] font-black text-zinc-300 uppercase tracking-widest">Status</span>
                                <span className="text-[9px] font-black text-black uppercase italic truncate">
                                    {item.details?.status || 'N/A'}
                                </span>
                            </div>
                            <div className="flex flex-col border-l border-zinc-100 pl-4">
                                <span className="text-[6px] font-black text-zinc-300 uppercase tracking-widest">Access</span>
                                <span className="text-[9px] font-black text-black uppercase italic truncate">
                                    {item.details?.access || 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div
                            className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />

                        <motion.div
                            initial={false}
                            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}