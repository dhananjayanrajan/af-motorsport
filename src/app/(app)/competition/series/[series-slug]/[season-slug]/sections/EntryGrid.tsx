'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Driver, Entry, Media } from '@/payload-types';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface EntryGridProps {
    entries: Entry[];
}

type SortKeys = 'number' | 'name' | 'grid' | 'start' | 'finish';

export default function EntryGrid({ entries }: EntryGridProps) {
    const [sortKey, setSortKey] = useState<SortKeys>('finish');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const sortedEntries = useMemo(() => {
        return [...entries].sort((a, b) => {
            let valA: any;
            let valB: any;

            switch (sortKey) {
                case 'number':
                    valA = parseInt(a.basics?.identifiers?.number || '999');
                    valB = parseInt(b.basics?.identifiers?.number || '999');
                    break;
                case 'name':
                    valA = (a as any).driver?.last_name || '';
                    valB = (b as any).driver?.last_name || '';
                    break;
                case 'grid':
                    valA = a.details.grid_position || 999;
                    valB = b.details.grid_position || 999;
                    break;
                case 'start':
                    valA = a.details.start_position || 999;
                    valB = b.details.start_position || 999;
                    break;
                case 'finish':
                    valA = a.details.finish_position || 999;
                    valB = b.details.finish_position || 999;
                    break;
                default:
                    return 0;
            }

            if (sortOrder === 'asc') return valA > valB ? 1 : -1;
            return valA < valB ? 1 : -1;
        });
    }, [entries, sortKey, sortOrder]);

    const toggleSort = (key: SortKeys) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    return (
        <section className="bg-white py-32 font-sans overflow-hidden">
            <div className="px-10 mb-16 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                        Operational_Log
                    </span>
                </div>
                <h2 className="text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
                    Entry_Grid
                </h2>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="border-y border-zinc-100 bg-zinc-50/50">
                            {[
                                { label: 'NO', key: 'number' },
                                { label: 'DRIVER_IDENTITY', key: 'name' },
                                { label: 'SESSION_REF', key: 'session' },
                                { label: 'GRID', key: 'grid' },
                                { label: 'START', key: 'start' },
                                { label: 'FINISH', key: 'finish' }
                            ].map((col) => (
                                <th
                                    key={col.label}
                                    onClick={() => col.key !== 'session' && toggleSort(col.key as SortKeys)}
                                    className={`px-10 py-6 text-left cursor-pointer group transition-colors hover:bg-zinc-100 ${col.key === 'session' ? 'cursor-default' : ''}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black">
                                            {col.label}
                                        </span>
                                        {sortKey === col.key && (
                                            <div className="w-1.5 h-1.5 bg-black rotate-45" />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEntries.map((entry, index) => {
                            const driver = (entry as any).driver as Driver;
                            const avatar = (driver?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/entry-${entry.id}/100/100`;
                            const firstName = (driver as any)?.basics?.first_name || '';
                            const lastName = (driver as any)?.basics?.last_name || 'TBD';
                            const status = entry.details.status;

                            return (
                                <motion.tr
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="group border-b border-zinc-50 hover:bg-zinc-50 transition-colors even:bg-zinc-50/30"
                                >
                                    <td className="px-10 py-5">
                                        <span className="text-2xl font-black italic tabular-nums text-zinc-300 group-hover:text-black transition-colors">
                                            {entry.basics?.identifiers?.number || '--'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-zinc-200 overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-zinc-100">
                                                <img src={avatar} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black uppercase italic text-black">
                                                    {firstName} {lastName}
                                                </span>
                                                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                                                    {status || 'CLASSIFIED'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5">
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tabular-nums tracking-widest">
                                            SR_{entry.id.toString().padStart(4, '0')}
                                        </span>
                                    </td>
                                    <td className="px-10 py-5">
                                        <span className="text-lg font-black italic tabular-nums">
                                            P{entry.details.grid_position || '--'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-5">
                                        <span className="text-lg font-black italic tabular-nums">
                                            P{entry.details.start_position || '--'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-3">
                                            {entry.details.finish_position === 1 && (
                                                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                            )}
                                            <span className={`text-2xl font-black italic tabular-nums ${entry.details.finish_position === 1 ? 'text-primary' : 'text-black'}`} style={{ color: entry.details.finish_position === 1 ? DESIGN_SYSTEM.COLORS.PRIMARY : '' }}>
                                                {entry.details.finish_position || '--'}
                                            </span>
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {sortedEntries.length === 0 && (
                <div className="py-32 flex flex-col items-center border-b border-zinc-100">
                    <span className="text-[10px] font-black text-zinc-200 uppercase tracking-[1em]">Log_Empty</span>
                </div>
            )}
        </section>
    );
}