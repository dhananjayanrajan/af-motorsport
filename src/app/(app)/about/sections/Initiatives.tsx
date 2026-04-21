'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Initiative, Media } from '@/payload-types';
import { motion } from 'framer-motion';
import { Calendar, Compass, MapPin, Target } from 'lucide-react';

interface InitiativesSectionProps {
    initiatives: Initiative[];
}

export default function InitiativesSection({ initiatives }: InitiativesSectionProps) {
    const bevelClip = "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)";
    const filteredInitiatives = initiatives;

    if (!initiatives.length) return null;

    return (
        <section
            className="w-full py-32 md:py-48 overflow-hidden"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                borderTop: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-24">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 group/head">
                        <div
                            className="h-[2px] w-12 transition-all duration-500 group-hover/head:w-20"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                        <span
                            className="text-[10px] font-black uppercase tracking-[0.6em] transition-colors"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            <span className="group-hover/head:text-black">Operational Impact</span>
                        </span>
                    </div>
                    <h2
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Project<br />
                        <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Initiatives</span>
                    </h2>
                </div>
            </div>

            <div className="w-full border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                {filteredInitiatives.map((initiative, index) => {
                    const coverImage = (initiative.assets?.cover as Media)?.url || `https://picsum.photos/seed/${initiative.id}/1280/720`;
                    const indexStr = String(index + 1).padStart(2, '0');

                    return (
                        <motion.div
                            key={initiative.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="group relative border-b transition-colors duration-500 overflow-hidden cursor-pointer"
                            style={{
                                borderColor: DESIGN_SYSTEM.COLORS.ZINC[100],
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                            }}
                        >
                            {/* Hover Scan Effect */}
                            <div
                                className="absolute inset-0 z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.85,0,0.15,1]"
                                style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.ZINC[50]}` }}
                            />

                            <div className="relative z-10">
                                <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-20">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                                        {/* 01. Metadata */}
                                        <div className="lg:col-span-3 flex flex-col gap-6">
                                            <div className="flex items-center gap-3 group/meta">
                                                <span
                                                    className="text-[12px] font-black tabular-nums transition-colors"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                                >
                                                    [{indexStr}]
                                                </span>
                                                <div className="h-px flex-1 bg-zinc-100 group-hover/meta:bg-primary-500 transition-colors" />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Target size={14} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">
                                                        Strategic Mission
                                                    </span>
                                                </div>
                                                <h3
                                                    className="text-3xl md:text-4xl font-black uppercase italic leading-[0.9] tracking-tighter transition-colors duration-300"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                                >
                                                    <span className="group-hover:text-primary-600">{initiative.name}</span>
                                                </h3>
                                            </div>
                                        </div>

                                        {/* 02. Visual Core */}
                                        <div className="lg:col-span-5 relative">
                                            <div
                                                className="relative aspect-[16/9] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.02]"
                                                style={{
                                                    clipPath: bevelClip,
                                                    border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}`
                                                }}
                                            >
                                                <img
                                                    src={coverImage}
                                                    alt={initiative.name}
                                                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                                {/* Corner Tech Detail */}
                                                <div
                                                    className="absolute top-0 right-0 p-3 flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity"
                                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                                >
                                                    <span className="text-[8px] font-black text-white uppercase tracking-tighter">Live_Feed</span>
                                                    <div className="w-1 h-1 bg-primary-500 animate-pulse mt-1" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* 03. Context & Action - No Button */}
                                        <div className="lg:col-span-4 flex flex-col gap-10 lg:pl-10">
                                            <p
                                                className="text-base font-bold leading-tight uppercase tracking-tight transition-colors duration-300"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                <span className="group-hover:text-zinc-800">
                                                    {initiative.basics?.tagline || initiative.basics?.mission}
                                                </span>
                                            </p>

                                            <div className="flex flex-wrap gap-8">
                                                <div className="flex flex-col group/data">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Calendar size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                        <span className="text-[9px] font-black uppercase text-zinc-400 group-hover/data:text-black transition-colors">Deployment</span>
                                                    </div>
                                                    <span className="text-sm font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                        {initiative.details?.start_date ? new Date(initiative.details.start_date).getFullYear() : 'TBD'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col group/data">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <MapPin size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                        <span className="text-[9px] font-black uppercase text-zinc-400 group-hover/data:text-black transition-colors">Vector</span>
                                                    </div>
                                                    <span className="text-sm font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                        Global
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Visual indicator only - no button, no link */}
                                            <div className="flex items-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                <div className="w-8 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                    Initiative Details
                                                </span>
                                                <Compass size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Decorative Bottom Progress Bar */}
                            <div
                                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-1000 ease-out"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}