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
        <section
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={coverUrl}
                    alt={callsign}
                    className="w-full h-full object-cover grayscale opacity-10 contrast-125 transition-transform duration-1000 hover:scale-105"
                />
            </div>

            <div className="relative z-20 w-full max-w-5xl px-12 flex flex-col items-center">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <div className="overflow-hidden">
                        <span
                            className={`block text-[10px] font-black uppercase italic animate-in slide-in-from-bottom-full duration-700 hover:text-black transition-colors ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                        >
                            {callsign}
                        </span>
                    </div>
                    <div
                        className="w-px h-12 animate-in fade-in duration-1000 delay-300"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    />
                </div>

                <blockquote className="relative w-full text-center group cursor-default">
                    <p
                        className={`text-2xl md:text-5xl font-black uppercase italic leading-tight tracking-tighter animate-in fade-in zoom-in-95 duration-1000 delay-200 transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-primary-500`}
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        {catchphrase}
                    </p>
                </blockquote>

                <div className="mt-16 flex items-center gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                    <div className="flex flex-col items-center group pointer-events-auto">
                        <span
                            className={`text-[9px] font-black uppercase transition-colors ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL} group-hover:text-primary-500`}
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                        >
                            Racing Number
                        </span>
                        <span
                            className={`text-3xl font-black italic transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-secondary-500`}
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            {driver.basics?.racing_number || '00'}
                        </span>
                    </div>

                    <div
                        className={`w-10 h-10 border flex items-center justify-center rotate-45 group hover:scale-110 transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE}`}
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                    >
                        <style jsx>{`
                            div:hover { border-color: ${DESIGN_SYSTEM.COLORS.PRIMARY[500]} !important; }
                        `}</style>
                        <div
                            className={`w-1.5 h-1.5 transition-transform group-hover:rotate-45`}
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                    </div>

                    <div className="flex flex-col items-center group pointer-events-auto">
                        <span
                            className={`text-[9px] font-black uppercase transition-colors ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL} group-hover:text-primary-500`}
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                        >
                            Status
                        </span>
                        <span
                            className={`text-3xl font-black italic transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE} group-hover:text-secondary-500`}
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            ACTIVE
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-12 bottom-12 flex justify-between items-center pointer-events-none z-30">
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-[1px]"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                    />
                    <span
                        className={`text-[10px] font-black uppercase tracking-widest transition-colors pointer-events-auto hover:text-black`}
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                    >
                        Scroll to explore
                    </span>
                </div>

                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 h-1 rotate-45 animate-in fade-in duration-500"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                animationDelay: `${i * 150}ms`
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuoteSection;