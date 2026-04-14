'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver, Event, Media, Race } from '@/payload-types';
import {
    Activity,
    Flag,
    Timer,
    Trophy,
    Zap
} from 'lucide-react';

interface RaceHeroProps {
    race: Race;
}

export default function RaceHero({ race }: RaceHeroProps) {
    const coverImage = (race.assets?.cover as Media)?.url || (race.assets?.poster as Media)?.url || `https://picsum.photos/seed/race-${race.id}/1600/900`;
    const event = race.details.event as Event;
    const circuit = race.details.circuit as Circuit;
    const winner = race.details.winner as Driver | null;

    const statusColors: Record<string, string> = {
        completed: DESIGN_SYSTEM.COLORS.PRIMARY,
        ongoing: '#3b82f6',
        scheduled: DESIGN_SYSTEM.COLORS.ZINC_400,
        cancelled: '#ef4444',
        postponed: '#f59e0b',
    };

    const statusColor = race.details.status
        ? statusColors[race.details.status] || DESIGN_SYSTEM.COLORS.ZINC_600
        : DESIGN_SYSTEM.COLORS.ZINC_600;

    return (
        <section className="relative w-full min-h-[85vh] flex flex-col lg:flex-row overflow-hidden border-b font-sans" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
            <div className="flex-none lg:flex-[1.8] relative overflow-hidden">
                <img
                    src={coverImage}
                    alt={race.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-8 sm:p-12 lg:p-20 flex flex-col justify-end">
                    <div className="flex flex-col gap-6 max-w-4xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE_GLOW }}>
                                {race.details.type?.replace('_', ' ') || 'Race Session'}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter opacity-70 mb-2" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
                                {event?.name || 'Grand Prix Event'}
                            </span>
                            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
                                {race.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-none lg:w-[500px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-l" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Activity size={14} style={{ color: statusColor }} />
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {race.details.status || 'PROVISIONAL'}
                            </span>
                        </div>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_300 }} />
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                            {race.basics?.identifiers?.code || 'RC_REF'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Flag size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Deployment Zone</span>
                        </div>
                        <p className="text-lg font-black uppercase italic tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                            {circuit?.name || 'Street Circuit'}
                        </p>
                        <p className="text-xs font-bold leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>
                            {race.basics?.description || 'Strategic parameters for this session have been logged under the primary event manifest.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-zinc-100 border shadow-sm" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                        <div className="p-6 flex flex-col gap-1 bg-white">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Total Laps</span>
                            <span className="text-3xl font-black italic tabular-nums text-black leading-none">
                                {race.details.laps?.toString().padStart(2, '0') || '--'}
                            </span>
                        </div>
                        <div className="p-6 flex flex-col gap-1 bg-white">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Distance</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black italic tabular-nums text-black leading-none">
                                    {race.details.distance_km || '--'}
                                </span>
                                <span className="text-[10px] font-black uppercase text-zinc-400 italic">KM</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-zinc-50">
                            <div className="flex items-center gap-3">
                                <Zap size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Atmospherics</span>
                            </div>
                            <span className="text-[10px] font-black uppercase text-black italic">{race.details.weather || 'Controlled'}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-zinc-50">
                            <div className="flex items-center gap-3">
                                <Timer size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Fastest Lap</span>
                            </div>
                            <span className="text-[10px] font-black text-black tabular-nums">{race.details.fastest_lap_time || '--:--.---'}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="p-6 border flex flex-col gap-4 relative overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}>
                        <div className="flex items-center gap-4 relative z-10">
                            {winner?.assets?.avatar ? (
                                <div className="w-12 h-12 grayscale">
                                    <img
                                        src={(winner.assets.avatar as Media).url || ''}
                                        alt=""
                                        className="w-full h-full object-cover border"
                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_700 }}
                                    />
                                </div>
                            ) : (
                                <Trophy size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            )}
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}>Session Winner</span>
                                <span className="text-lg font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
                                    {winner ? `${winner.first_name} ${winner.last_name}` : 'Classified'}
                                </span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <Trophy size={80} style={{ color: DESIGN_SYSTEM.COLORS.WHITE }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Metric({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
            <span className="text-[11px] font-black text-black uppercase tabular-nums tracking-tighter">{value}</span>
        </div>
    );
}