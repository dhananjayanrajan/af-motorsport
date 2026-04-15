// sections/Hero.tsx
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
            className="relative w-full min-h-[80vh] md:h-screen flex flex-col justify-end overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND }}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={coverUrl}
                    alt={leader.last_name}
                    fill
                    priority
                    className="object-cover grayscale opacity-40 md:opacity-100"
                />
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(to top, ${DESIGN_SYSTEM.COLORS.BACKGROUND} 10%, transparent 90%), 
                                     linear-gradient(to right, ${DESIGN_SYSTEM.COLORS.BACKGROUND} 0%, transparent 70%)`
                    }}
                />
            </div>

            <div className="relative z-20 w-full px-6 md:px-20 pb-12 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
                <div className="lg:col-span-9 xl:col-span-8 space-y-6 md:space-y-10">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700">
                            <span
                                className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em]"
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                Executive_Archive
                            </span>
                            <div className="h-px w-8 md:w-16 bg-zinc-800" />
                        </div>
                        <h1
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                        >
                            {leader.first_name}
                            <br />
                            {leader.last_name}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-12 animate-in fade-in duration-1000 delay-500">
                        <div className="space-y-1">
                            <p className="text-[7px] md:text-[8px] font-black text-zinc-400 uppercase tracking-widest">Designation</p>
                            <p className="text-xs md:text-sm font-black uppercase text-black">{leader.basics?.title || 'Operational Lead'}</p>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-zinc-200" />
                        <div className="space-y-1">
                            <p className="text-[7px] md:text-[8px] font-black text-zinc-400 uppercase tracking-widest">Callsign</p>
                            <p className="text-xs md:text-sm font-black uppercase text-black">{leader.alias || '---'}</p>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-zinc-200" />
                        <div className="space-y-1">
                            <p className="text-[7px] md:text-[8px] font-black text-zinc-400 uppercase tracking-widest">Nationality</p>
                            <p className="text-xs md:text-sm font-black uppercase text-black">
                                {(leader.basics?.nationality as any)?.name || 'Global'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block lg:col-span-3 xl:col-span-4">
                    {avatarUrl && (
                        <div className="relative aspect-square w-full max-w-[280px] ml-auto overflow-hidden border border-zinc-200 bg-white p-1.5 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={avatarUrl}
                                    alt={leader.first_name}
                                    fill
                                    className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                                />
                            </div>
                            <div
                                className="absolute -bottom-2 -right-2 size-10 flex items-center justify-center rotate-45 shadow-lg"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                <span className="text-black font-black text-[9px] -rotate-45 tracking-tighter">LEADER</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 right-0 w-full h-1 md:h-1.5 bg-zinc-100/50">
                <div
                    className="h-full w-1/4 animate-in slide-in-from-left duration-1000"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                />
            </div>
        </section>
    );
};

export default HeroSection;