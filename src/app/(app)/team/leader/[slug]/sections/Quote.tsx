// sections/Quote.tsx
'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Leader } from '@/payload-types';
import React from 'react';

interface QuoteSectionProps {
    leader: Leader;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ leader }) => {
    if (!leader.details?.quote) return null;

    return (
        <section
            className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND }}
        >
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black uppercase italic leading-none whitespace-nowrap">
                    {leader.last_name}
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-1 flex flex-col items-center gap-6">
                    <div className="w-[2px] h-32 bg-black/10 relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 w-full h-full origin-top animate-in slide-in-from-top duration-1000"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                    </div>
                    <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 rotate-180">
                        Operational_Philosophy
                    </span>
                </div>

                <div className="lg:col-span-8 space-y-16">
                    <blockquote className="relative">
                        <svg
                            className="absolute -top-12 -left-12 size-24 opacity-10"
                            style={{ fill: DESIGN_SYSTEM.COLORS.PRIMARY }}
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 17.2091 21.2261 19 19.017 19H16.017C14.9124 19 14.017 19.8954 14.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H2.017C1.46472 8 1.017 8.44772 1.017 9V12C1.017 12.5523 0.569282 13 0.017 13H-1.983C-2.53528 13 -2.983 12.5523 -2.983 12V9C-2.983 6.79086 -1.19214 5 1.017 5H6.017C8.22614 5 10.017 6.79086 10.017 9V15C10.017 17.2091 8.22614 19 6.017 19H3.017C1.91243 19 1.017 19.8954 1.017 21H1.017Z" />
                        </svg>
                        <p className="text-5xl md:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter text-black">
                            {leader.details.quote}
                        </p>
                    </blockquote>

                    <div className="flex flex-wrap gap-12 border-t pt-12" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                        {leader.details.vision && (
                            <div className="max-w-sm space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-2">
                                    <span className="size-1.5 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    Strategic_Vision
                                </h4>
                                <p className="text-sm font-bold uppercase leading-tight text-black">
                                    {leader.details.vision}
                                </p>
                            </div>
                        )}
                        {leader.details.mission && (
                            <div className="max-w-sm space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-2">
                                    <span className="size-1.5 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    Core_Mission
                                </h4>
                                <p className="text-sm font-bold uppercase leading-tight text-black">
                                    {leader.details.mission}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-3 lg:border-l lg:pl-12 flex flex-col justify-between h-full py-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                    <div className="space-y-1">
                        <p className="text-2xl font-black italic uppercase leading-none text-black">
                            {leader.first_name}<br />{leader.last_name}
                        </p>
                        <p
                            className="text-[10px] font-black uppercase tracking-widest"
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        >
                            {leader.basics?.title}
                        </p>
                    </div>

                    <div className="mt-12 lg:mt-0 flex flex-col gap-4">
                        <div className="flex justify-between items-end border-b pb-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                            <span className="text-[8px] font-bold text-zinc-400 uppercase">Archive_Ref</span>
                            <span className="text-[10px] font-black text-black tabular-nums">#{leader.id.toString().padStart(4, '0')}</span>
                        </div>
                        <div className="flex justify-between items-end border-b pb-2" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                            <span className="text-[8px] font-bold text-zinc-400 uppercase">Origin_Node</span>
                            <span className="text-[10px] font-black text-black uppercase">
                                {(leader.basics?.nationality as any)?.name || 'International'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuoteSection;