'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Series } from '@/payload-types';
import Link from 'next/link';

interface SeriesIdentityProps {
    series: Series;
}

export default function SeriesIdentity({ series }: SeriesIdentityProps) {
    const predecessor = series.details?.predecessor as Series | null;
    const successor = series.details?.successor as Series | null;
    const coverImage = (series.assets?.cover as Media)?.url || `https://picsum.photos/seed/${series.id}/1600/900`;

    const statusColors: Record<string, string> = {
        Active: DESIGN_SYSTEM.COLORS.PRIMARY,
        Inactive: '#71717a',
        Defunct: '#18181b',
        Upcoming: '#3f3f46',
    };

    const statusColor = series.details?.status
        ? statusColors[series.details.status] || '#27272a'
        : '#27272a';

    return (
        <section className="relative w-full min-h-[85vh] flex flex-col lg:flex-row bg-white overflow-hidden border-b border-zinc-200 font-sans">
            <div className="flex-none lg:flex-[1.8] relative overflow-hidden">
                <img
                    src={coverImage}
                    alt={series.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-12 lg:p-20 flex flex-col justify-end">
                    <div className="flex flex-col gap-4 max-w-3xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-1 bg-white" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Competition Series</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter text-white leading-[0.9]">
                            {series.name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex-none lg:w-[500px] flex flex-col justify-between bg-white p-12 lg:p-16 border-l border-zinc-100">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: statusColor }} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">
                                {series.details?.status || 'Unknown'}
                            </span>
                        </div>
                        <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {series.details?.access || 'Public Access'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Description</span>
                        <p className="text-base font-medium text-zinc-600 leading-relaxed">
                            {series.details?.agenda || 'No formal competition agenda has been registered for this specific series profile.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 shadow-sm">
                        <div className="bg-white p-6 flex flex-col gap-1">
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Inception</span>
                            <span className="text-2xl font-black italic tabular-nums text-black">
                                {series.details?.start_date ? new Date(series.details.start_date).getFullYear() : 'TBD'}
                            </span>
                        </div>
                        <div className="bg-white p-6 flex flex-col gap-1">
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Duration</span>
                            <span className="text-2xl font-black italic tabular-nums" style={{ color: series.details?.end_date ? 'black' : DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                {series.details?.end_date ? new Date(series.details.end_date).getFullYear() : 'Ongoing'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 mt-16">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Sequential History</span>

                    <div className="grid grid-cols-1 gap-2">
                        {predecessor ? (
                            <Link
                                href={`/competition/series/${predecessor.slug}`}
                                className="group flex items-center justify-between p-5 bg-zinc-50 border border-zinc-100 hover:border-black hover:bg-white transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center border border-zinc-200 group-hover:border-black transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400 group-hover:text-black">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">Preceding</span>
                                        <span className="text-xs font-black uppercase italic text-black">{predecessor.name}</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-5 bg-zinc-50/50 border border-zinc-50 flex items-center gap-4 grayscale opacity-40">
                                <div className="w-8 h-8 flex items-center justify-center border border-zinc-200">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-300">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Foundation Series</span>
                            </div>
                        )}

                        {successor ? (
                            <Link
                                href={`/competition/series/${successor.slug}`}
                                className="group flex items-center justify-between p-5 bg-zinc-50 border border-zinc-100 hover:border-black hover:bg-white transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center border border-zinc-200 group-hover:border-black transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400 group-hover:text-black">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">Succeeding</span>
                                        <span className="text-xs font-black uppercase italic text-black">{successor.name}</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-5 bg-black flex items-center justify-between transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center border border-zinc-800">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-700">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Succeeding</span>
                                        <span className="text-xs font-black uppercase italic text-white/50 tracking-tighter">Current Development</span>
                                    </div>
                                </div>
                                <div className="w-1.5 h-1.5 bg-primary rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}