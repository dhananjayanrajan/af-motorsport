'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import React from 'react';

interface QuoteSectionProps {
    driver: any;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ driver }) => {
    const coverUrl = driver.assets?.cover?.url || `https://picsum.photos/seed/${driver.id + 99}/1920/1080`;
    const callsign = driver.basics?.callsign || driver.alias || 'DRIVER';
    const catchphrase = driver.basics?.catchphrase || 'PRECISION OVER EVERYTHING.';

    return (
        <section className={`relative w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden`}>
            <div className="absolute inset-0 z-0">
                <img
                    src={coverUrl}
                    alt={callsign}
                    className="w-full h-full object-cover grayscale opacity-10 contrast-125"
                />
            </div>

            <div className="relative z-20 w-full max-w-5xl px-12 flex flex-col items-center">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <div className="overflow-hidden">
                        <span
                            className={`block text-zinc-500 text-[10px] font-black uppercase italic animate-in slide-in-from-bottom-full duration-700 ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}
                        >
                            {callsign}
                        </span>
                    </div>
                    <div className={`w-px h-12 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] animate-in fade-in duration-1000 delay-300`} />
                </div>

                <blockquote className="relative w-full text-center">
                    <p className={`text-2xl md:text-5xl font-black text-zinc-900 uppercase italic leading-tight tracking-tighter animate-in fade-in zoom-in-95 duration-1000 delay-200`}>
                        {catchphrase}
                    </p>
                </blockquote>

                <div className="mt-16 flex items-center gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                    <div className="flex flex-col items-center">
                        <span className={`text-zinc-500 text-[9px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}>
                            Racing Number
                        </span>
                        <span className={`text-zinc-900 text-3xl font-black italic`}>
                            {driver.basics?.racing_number || '00'}
                        </span>
                    </div>

                    <div
                        className={`w-10 h-10 border border-zinc-200 flex items-center justify-center rotate-45 group hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] transition-colors duration-300`}
                    >
                        <div className={`w-1.5 h-1.5 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />
                    </div>

                    <div className="flex flex-col items-center">
                        <span className={`text-zinc-500 text-[9px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}>
                            Status
                        </span>
                        <span className={`text-zinc-900 text-3xl font-black italic`}>
                            ACTIVE
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-12 bottom-12 flex justify-between items-center pointer-events-none z-30">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-[1px] bg-zinc-200`} />
                    <span className={`text-zinc-400 text-[10px] font-black uppercase tracking-widest`}>
                        Scroll to explore
                    </span>
                </div>

                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 h-1 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] rotate-45 animate-in fade-in duration-500`}
                            style={{ animationDelay: `${i * 150}ms` }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuoteSection;