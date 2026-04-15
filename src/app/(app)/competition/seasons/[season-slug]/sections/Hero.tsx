'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Season, Series } from '@/payload-types';
import Link from 'next/link';

interface SeasonHeroProps {
    season: Season;
    previousSeason?: { slug: string; name: string } | null;
    nextSeason?: { slug: string; name: string } | null;
}

export default function SeasonHero({ season, previousSeason, nextSeason }: SeasonHeroProps) {
    const parentSeries = season.details?.series as Series;
    const coverImage = (season.assets?.cover as Media)?.url || `https://picsum.photos/seed/season-${season.id}/1600/900`;

    return (
        <section className="relative w-full min-h-[85vh] flex flex-col lg:flex-row overflow-hidden border-b font-sans" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
            <div className="flex-none lg:flex-[1.8] relative overflow-hidden">
                <img
                    src={coverImage}
                    alt={season.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-8 sm:p-12 lg:p-20 flex flex-col justify-end">
                    <div className="flex flex-col gap-4 max-w-3xl">
                        <div className="flex items-center gap-4">
                            <div className="w-8 sm:w-12 h-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE_GLOW }}>
                                {parentSeries?.name || 'Competition Season'}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
                            {season.name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex-none lg:w-[500px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-l" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                <div className="flex flex-col gap-8 sm:gap-12">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {season.basics?.identifiers?.code || 'SEASON_REF'}
                            </span>
                        </div>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[300] }} />
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            {season.basics?.identifiers?.abbreviation || 'REG_ACTIVE'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}>Session Notes</span>
                        <p className="text-base font-medium leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                            {season.details?.notes || 'No formal season agenda has been registered for this specific session profile.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-px border shadow-sm" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                        <div className="p-4 sm:p-6 flex flex-col gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}>
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Entries</span>
                            <span className="text-xl sm:text-2xl font-black italic tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {season.details?.entries?.toString().padStart(2, '0') || '00'}
                            </span>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}>
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Races</span>
                            <span className="text-xl sm:text-2xl font-black italic tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {season.details?.races?.toString().padStart(2, '0') || '00'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 mt-12 sm:mt-16">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Sequential Registry</span>

                    <div className="grid grid-cols-1 gap-2">
                        {previousSeason ? (
                            <Link
                                href={`/competition/series/${parentSeries?.slug}/season/${previousSeason.slug}`}
                                className="group flex items-center justify-between p-4 sm:p-5 border transition-all duration-200"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.SURFACE;
                                    e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.BLACK;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC[50];
                                    e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.ZINC[100];
                                }}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center border transition-colors duration-200" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Previous Season</span>
                                        <span className="text-xs font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{previousSeason.name}</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href={`/competition/series/${parentSeries?.slug}`}
                                className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                            >
                                <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Series Root</span>
                                    <span className="text-xs font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Inaugural Position</span>
                                </div>
                            </Link>
                        )}

                        {nextSeason ? (
                            <Link
                                href={`/competition/series/${parentSeries?.slug}/season/${nextSeason.slug}`}
                                className="group flex items-center justify-between p-4 sm:p-5 border transition-all duration-200"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.SURFACE;
                                    e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.BLACK;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.COLORS.ZINC[50];
                                    e.currentTarget.style.borderColor = DESIGN_SYSTEM.COLORS.ZINC[100];
                                }}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center border transition-colors duration-200" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Next Season</span>
                                        <span className="text-xs font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>{nextSeason.name}</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-4 sm:p-5 flex items-center justify-between border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK, borderColor: DESIGN_SYSTEM.COLORS.BLACK }}>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[700] }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>Live Position</span>
                                        <span className="text-xs font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.WHITE_GLOW }}>Final_Entry_Verified</span>
                                    </div>
                                </div>
                                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}