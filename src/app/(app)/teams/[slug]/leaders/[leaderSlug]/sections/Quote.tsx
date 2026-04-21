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
            className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden select-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div
                className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden"
                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black uppercase italic leading-none whitespace-nowrap">
                    {leader.last_name}
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-1 flex flex-col items-center gap-8">
                    <div
                        className="w-[3px] h-40 relative overflow-hidden"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-full origin-top animate-in slide-in-from-top duration-1000"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                    </div>
                    <span
                        className="[writing-mode:vertical-lr] text-[11px] font-black uppercase tracking-[0.6em] rotate-180"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                    >
                        Operational_Philosophy
                    </span>
                </div>

                <div className="lg:col-span-8 space-y-20">
                    <blockquote className="relative">
                        <svg
                            className="absolute -top-16 -left-16 size-32 opacity-10"
                            style={{ fill: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 17.2091 21.2261 19 19.017 19H16.017C14.9124 19 14.017 19.8954 14.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H2.017C1.46472 8 1.017 8.44772 1.017 9V12C1.017 12.5523 0.569282 13 0.017 13H-1.983C-2.53528 13 -2.983 12.5523 -2.983 12V9C-2.983 6.79086 -1.19214 5 1.017 5H6.017C8.22614 5 10.017 6.79086 10.017 9V15C10.017 17.2091 8.22614 19 6.017 19H3.017C1.91243 19 1.017 19.8954 1.017 21H1.017Z" />
                        </svg>
                        <p
                            className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-[-0.04em]"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            {leader.details.quote}
                        </p>
                    </blockquote>

                    <div
                        className="flex flex-wrap gap-16 border-t pt-16"
                        style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                    >
                        {leader.details.vision && (
                            <div className="max-w-md space-y-6">
                                <h4
                                    className="text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-3"
                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                >
                                    <span className="size-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    Strategic_Vision
                                </h4>
                                <p
                                    className="text-base font-bold uppercase italic leading-tight"
                                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                >
                                    {leader.details.vision}
                                </p>
                            </div>
                        )}
                        {leader.details.mission && (
                            <div className="max-w-md space-y-6">
                                <h4
                                    className="text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-3"
                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                >
                                    <span className="size-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    Core_Mission
                                </h4>
                                <p
                                    className="text-base font-bold uppercase italic leading-tight"
                                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                >
                                    {leader.details.mission}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className="lg:col-span-3 lg:border-l-2 lg:pl-16 flex flex-col justify-between h-full py-4"
                    style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                >
                    <div className="space-y-2">
                        <p
                            className="text-3xl font-black italic uppercase leading-none"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            {leader.first_name}<br />{leader.last_name}
                        </p>
                        <p
                            className="text-[11px] font-black uppercase tracking-widest"
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        >
                            {leader.basics?.title}
                        </p>
                    </div>

                    <div className="mt-16 lg:mt-0 flex flex-col gap-6">
                        <div
                            className="flex justify-between items-end border-b-2 pb-3"
                            style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                        >
                            <span className="text-[9px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Archive_Ref</span>
                            <span className="text-[11px] font-black tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                #{leader.id.toString().padStart(4, '0')}
                            </span>
                        </div>
                        <div
                            className="flex justify-between items-end border-b-2 pb-3"
                            style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                        >
                            <span className="text-[9px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Origin_Node</span>
                            <span className="text-[11px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
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