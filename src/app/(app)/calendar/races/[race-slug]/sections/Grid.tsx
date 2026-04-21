'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Entry, Media } from '@/payload-types';

interface EntryStackedGridProps {
    entries: Entry[];
}

export default function EntryStackedGrid({ entries }: EntryStackedGridProps) {
    return (
        <section className="w-full p-8 sm:p-12 lg:p-20" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND }}>
            <div className="flex flex-col gap-4 mb-12 sm:mb-20">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                        Grid Manifest
                    </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                    Session Entries
                </h2>
            </div>

            <div className="columns-1 md:columns-2 gap-px bg-zinc-200 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                {entries.map((entry, index) => {
                    const thumbnail = (entry.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${entry.id}/800/600`;

                    return (
                        <div
                            key={entry.id}
                            className="break-inside-avoid mb-px relative group overflow-hidden"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}
                        >
                            <div className="relative aspect-[16/10] overflow-hidden group-hover:grayscale-0 transition-all duration-500">
                                <img
                                    src={thumbnail}
                                    alt={entry.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                                <div className="absolute top-0 right-0 p-6">
                                    <span className="text-6xl font-black italic tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
                                        {entry.basics?.identifiers?.number || '--'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                        {entry.details.status || 'Active'}
                                    </span>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                        {entry.name}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Grid</span>
                                        <span className="text-lg font-black italic tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>P{entry.details.grid_position || '--'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Finish</span>
                                        <span className="text-lg font-black italic tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>P{entry.details.finish_position || '--'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Plate</span>
                                        <span className="text-lg font-black italic uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{entry.basics?.identifiers?.plate || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}