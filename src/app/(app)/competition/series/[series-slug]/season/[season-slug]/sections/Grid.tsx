'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Entry, Media } from '@/payload-types';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface EntryGridProps {
    entries: Entry[];
}

type SortConfig = {
    key: 'number' | 'name' | 'grid' | 'finish' | 'status';
    direction: 'asc' | 'desc';
};

export default function EntryGrid({ entries }: EntryGridProps) {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'grid', direction: 'asc' });

    const sortedEntries = useMemo(() => {
        const items = [...entries];
        items.sort((a, b) => {
            let valA: any;
            let valB: any;

            switch (sortConfig.key) {
                case 'number':
                    valA = parseInt(a.basics?.identifiers?.number || '999');
                    valB = parseInt(b.basics?.identifiers?.number || '999');
                    break;
                case 'name':
                    valA = a.name.toLowerCase();
                    valB = b.name.toLowerCase();
                    break;
                case 'grid':
                    valA = a.details.grid_position || 999;
                    valB = b.details.grid_position || 999;
                    break;
                case 'finish':
                    valA = a.details.finish_position || 999;
                    valB = b.details.finish_position || 999;
                    break;
                case 'status':
                    valA = a.details.status || '';
                    valB = b.details.status || '';
                    break;
                default:
                    return 0;
            }

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return items;
    }, [entries, sortConfig]);

    const requestSort = (key: SortConfig['key']) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const HeaderCell = ({ label, sortKey, className = "" }: { label: string; sortKey: SortConfig['key']; className?: string }) => (
        <th
            onClick={() => requestSort(sortKey)}
            className={`group cursor-pointer py-4 px-6 text-left border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${className}`}
        >
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-black transition-colors whitespace-nowrap">
                    {label}
                </span>
                {sortConfig.key === sortKey && (
                    <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: sortConfig.direction === 'asc' ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.BLACK }}
                    />
                )}
            </div>
        </th>
    );

    return (
        <section className="w-full bg-white border-b border-zinc-100 font-sans">
            <div className="w-full px-6 py-24 md:px-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Race Archives</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-none">Entries</h2>
                </div>
                <div className="text-left md:text-right">
                    <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest block">Active Manifest</span>
                    <span className="text-4xl font-black italic tabular-nums">{entries.length.toString().padStart(2, '0')}</span>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="bg-white">
                            <HeaderCell label="#" sortKey="number" />
                            <HeaderCell label="Competitor" sortKey="name" />
                            <HeaderCell label="Status" sortKey="status" />
                            <HeaderCell label="Grid" sortKey="grid" />
                            <HeaderCell label="Finish" sortKey="finish" />
                            <th className="py-4 px-6 text-right border-b border-zinc-100">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Registry Metrics</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEntries.map((entry, index) => {
                            const thumbnail = (entry.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/entry-${entry.id}/200/200`;

                            return (
                                <motion.tr
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.02 }}
                                    className="group border-b border-zinc-100 hover:bg-black transition-colors duration-300"
                                >
                                    <td className="py-6 px-6">
                                        <span className="text-2xl font-black italic tabular-nums text-zinc-200 group-hover:text-primary transition-colors">
                                            {entry.basics?.identifiers?.number?.padStart(2, '0') || '--'}
                                        </span>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-zinc-100 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 flex-shrink-0">
                                                <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-base font-black uppercase italic text-black group-hover:text-white transition-colors truncate">
                                                    {entry.name}
                                                </span>
                                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 transition-colors truncate">
                                                    {entry.alias || 'Standard Protocol'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                style={{
                                                    backgroundColor: entry.details.status === 'Confirmed' || entry.details.status === 'Classified'
                                                        ? DESIGN_SYSTEM.COLORS.PRIMARY
                                                        : DESIGN_SYSTEM.COLORS.ZINC[200]
                                                }}
                                            />
                                            <span className="text-[10px] font-black uppercase text-black group-hover:text-zinc-500 transition-colors whitespace-nowrap">
                                                {entry.details.status || 'Provisional'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <span className="text-lg font-black italic tabular-nums text-black group-hover:text-white transition-colors">
                                            {entry.details.grid_position ? `P${entry.details.grid_position.toString().padStart(2, '0')}` : '--'}
                                        </span>
                                    </td>
                                    <td className="py-6 px-6">
                                        <span className="text-lg font-black italic tabular-nums text-black group-hover:text-white transition-colors">
                                            {entry.details.finish_position ? `P${entry.details.finish_position.toString().padStart(2, '0')}` : '--'}
                                        </span>
                                    </td>
                                    <td className="py-6 px-6 text-right">
                                        <div className="flex justify-end gap-1 items-center h-full">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 h-4 transition-all duration-300"
                                                    style={{
                                                        backgroundColor: i < (entry.assets?.gallery?.length || 0)
                                                            ? DESIGN_SYSTEM.COLORS.PRIMARY
                                                            : DESIGN_SYSTEM.COLORS.ZINC[100]
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}