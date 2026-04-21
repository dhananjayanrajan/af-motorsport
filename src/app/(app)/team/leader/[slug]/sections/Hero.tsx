'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Leader, Media } from '@/payload-types';
import Image from 'next/image';
import React from 'react';

interface HeroSectionProps {
    leader: Leader;
}

const HeroSection: React.FC<HeroSectionProps> = ({ leader }) => {
    const coverUrl = (leader.assets?.cover as Media)?.url || `https://picsum.photos/seed/${leader.id}/1920/1080`;
    const avatarUrl = (leader.assets?.avatar as Media)?.url;

    return (
        <section
            className="relative w-full min-h-[80vh] md:h-screen flex flex-col justify-end overflow-hidden select-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={coverUrl}
                    alt={leader.last_name || 'Leader Cover'}
                    fill
                    priority
                    className="object-cover contrast-125 opacity-40 md:opacity-100"
                />
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(to top, ${DESIGN_SYSTEM.COLORS.WHITE.PURE} 5%, transparent 100%), 
                                     linear-gradient(to right, ${DESIGN_SYSTEM.COLORS.WHITE.PURE} 0%, transparent 60%)`
                    }}
                />
            </div>

            <div className="relative z-20 w-full px-6 md:px-20 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
                <div className="lg:col-span-9 xl:col-span-8 space-y-8 md:space-y-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left duration-700">
                            <span
                                className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em]"
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                Executive_Archive
                            </span>
                            <div className="h-[2px] w-12 md:w-24" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }} />
                        </div>
                        <h1
                            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase italic leading-[0.75] tracking-[ -0.05em] animate-in fade-in slide-in-from-bottom-8 duration-1000"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            {leader.first_name}
                            <br />
                            <span style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>{leader.last_name}</span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-6 md:gap-x-16 animate-in fade-in duration-1000 delay-500">
                        <div className="space-y-2">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Designation</p>
                            <p className="text-sm md:text-base font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                {leader.basics?.title || 'Operational Lead'}
                            </p>
                        </div>
                        <div className="hidden sm:block w-[2px] h-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                        <div className="space-y-2">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Callsign</p>
                            <p className="text-sm md:text-base font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                {leader.alias || '---'}
                            </p>
                        </div>
                        <div className="hidden sm:block w-[2px] h-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                        <div className="space-y-2">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Nationality</p>
                            <p className="text-sm md:text-base font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                {(leader.basics?.nationality as any)?.name || 'Global'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block lg:col-span-3 xl:col-span-4">
                    {avatarUrl && (
                        <div
                            className="relative aspect-[3/4] w-full max-w-[320px] ml-auto overflow-hidden border-2 p-1.5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] rotate-2 hover:rotate-0 transition-transform duration-700"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                borderColor: DESIGN_SYSTEM.COLORS.ZINC[100]
                            }}
                        >
                            <div className="relative w-full h-full overflow-hidden contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700">
                                <Image
                                    src={avatarUrl}
                                    alt={leader.first_name || 'Leader Avatar'}
                                    fill
                                    className="object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                                />
                            </div>
                            <div
                                className="absolute -bottom-4 -right-4 size-14 flex items-center justify-center rotate-12 shadow-xl"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                            >
                                <span
                                    className="font-black text-[10px] tracking-tighter italic"
                                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                >
                                    DIRECTOR
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="absolute bottom-0 right-0 w-full h-2"
                style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.ZINC[100]}80` }}
            >
                <div
                    className="h-full w-1/3 animate-in slide-in-from-left duration-1000"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                />
            </div>
        </section>
    );
};

export default HeroSection;