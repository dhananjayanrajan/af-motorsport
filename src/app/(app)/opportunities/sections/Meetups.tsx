'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media, Meetup } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { ArrowUpRight, Lock, MapPin, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface MeetupsSectionProps {
    meetups: Meetup[];
}

export default function MeetupsSection({ meetups }: MeetupsSectionProps) {
    const [hoveredId, setHoveredId] = useState<string | number | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate().toString().padStart(2, '0'),
            month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
    };

    return (
        <section
            className="w-full py-32 md:py-56"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="flex flex-col gap-8 mb-32 border-l-4 pl-8 md:pl-12" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                    <span
                        className={cn("text-xs font-black uppercase tracking-[0.3em]", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL)}
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                    >
                        Network_Events_2026
                    </span>
                    <h2
                        className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.8]"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[950] }}
                    >
                        Fan<br />
                        Meetups
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border-y border-zinc-200">
                    {meetups.map((meetup, index) => {
                        const isHovered = hoveredId === meetup.id;
                        const dateInfo = formatDate(meetup.details.start_date);
                        const thumbnail = (meetup.assets?.thumbnail as Media)?.url || (meetup.assets?.cover as Media)?.url;

                        return (
                            <Link
                                href={`/meetups/${meetup.slug}`}
                                key={meetup.id}
                                onMouseEnter={() => setHoveredId(meetup.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="relative bg-white group cursor-pointer transition-colors duration-500 block"
                                style={{
                                    backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.ZINC[950] : DESIGN_SYSTEM.COLORS.WHITE.PURE
                                }}
                            >
                                <div className="relative aspect-video overflow-hidden bg-zinc-100">
                                    {thumbnail && (
                                        <img
                                            src={thumbnail}
                                            alt={meetup.name}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                            style={{ filter: isHovered ? 'grayscale(0) brightness(0.6)' : 'grayscale(1) brightness(1)' }}
                                        />
                                    )}
                                    <div
                                        className="absolute inset-0 transition-opacity duration-500"
                                        style={{
                                            background: `linear-gradient(to top, ${DESIGN_SYSTEM.COLORS.ZINC[950]}, transparent)`,
                                            opacity: isHovered ? 0.9 : 0
                                        }}
                                    />

                                    <div className="absolute top-0 left-0 p-6 flex flex-col items-center border-r border-b border-white/10 bg-black/20 backdrop-blur-md">
                                        <span className="text-2xl font-black text-white leading-none">{dateInfo.day}</span>
                                        <span className="text-[10px] font-black text-white/60 uppercase">{dateInfo.month}</span>
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col h-[420px]">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                            />
                                            <span
                                                className="text-[10px] font-black uppercase tracking-widest"
                                                style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.ZINC[400] : DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                            >
                                                {meetup.details.access}
                                            </span>
                                        </div>
                                        <span
                                            className="text-[10px] font-mono font-bold"
                                            style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[300] }}
                                        >
                                            {dateInfo.time}_UTC
                                        </span>
                                    </div>

                                    <h3
                                        className="text-3xl font-black uppercase italic mb-6"
                                        style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.ZINC[950] }}
                                    >
                                        {meetup.name}
                                    </h3>

                                    <p
                                        className="text-xs font-bold uppercase leading-relaxed mb-8 transition-colors line-clamp-3"
                                        style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.ZINC[500] : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                    >
                                        {meetup.basics?.description}
                                    </p>

                                    <div className="mt-auto pt-8 border-t flex items-center justify-between" style={{ borderColor: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                {meetup.details.format === 'virtual' ? <Video size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} /> : <MapPin size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />}
                                                <span className="text-[10px] font-black uppercase text-zinc-500">
                                                    {meetup.details.format}
                                                </span>
                                            </div>
                                            {meetup.details.access === 'exclusive' && (
                                                <Lock size={12} style={{ color: DESIGN_SYSTEM.COLORS.SECONDARY[500] }} />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 group/link">
                                            <span
                                                className="text-[9px] font-black uppercase tracking-widest transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                            >
                                                View_Brief
                                            </span>
                                            <ArrowUpRight
                                                size={20}
                                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                                style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.ZINC[950] }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="absolute top-0 left-0 w-full h-[2px] transition-transform origin-left duration-500 scale-x-0 group-hover:scale-x-100"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}