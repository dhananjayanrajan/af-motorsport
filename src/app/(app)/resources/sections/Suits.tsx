'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Driver, Media, Suit } from '@/payload-types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Layers, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

interface SuitsSectionProps {
    suits: Suit[];
    drivers: Driver[];
}

export default function SuitsSection({ suits, drivers }: SuitsSectionProps) {
    return (
        <section
            className="w-full py-20 md:py-32"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[950] }}
        >
            <div className="sticky top-0 z-20 py-6 mb-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[950] }}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-[1px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                    Tactical Apparel
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.9]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                                Technical Uniforms
                            </h2>
                        </div>
                        <div className="max-w-xs">
                            <p className="text-[9px] font-bold uppercase tracking-widest leading-loose" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                Multi-layer fire-retardant membranes integrated with kinetic-stretch panels.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                {suits.map((suit, index) => {
                    const thumbnail = (suit.assets?.thumbnail as Media)?.url;
                    const driver = drivers[index % drivers.length];
                    const autograph = (driver?.assets?.autograph as Media)?.url;
                    const placeholderImage = `https://picsum.photos/seed/${suit.id || index}/800/600`;

                    const itemRef = useRef<HTMLDivElement>(null);
                    const { scrollYProgress } = useScroll({
                        target: itemRef,
                        offset: ["start end", "end start"]
                    });

                    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
                    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

                    return (
                        <motion.div
                            ref={itemRef}
                            key={suit.id}
                            style={{ y, opacity }}
                            className="sticky top-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group mb-16"
                        >
                            {/* Visual Display */}
                            <div className="lg:col-span-7 relative">
                                <div
                                    className="aspect-[4/5] md:aspect-[16/10] relative overflow-hidden"
                                    style={{
                                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                                        backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[900]
                                    }}
                                >
                                    <img
                                        src={thumbnail || placeholderImage}
                                        alt={suit.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 hover:grayscale-0"
                                        onError={(e) => {
                                            e.currentTarget.src = placeholderImage;
                                        }}
                                    />

                                    {autograph && (
                                        <img
                                            src={autograph}
                                            alt="Driver Autograph"
                                            className="absolute bottom-8 right-8 w-40 h-auto invert opacity-30 pointer-events-none group-hover:opacity-80 group-hover:-rotate-3 transition-all duration-500"
                                        />
                                    )}

                                    <div className="absolute top-6 left-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Registry_No</span>
                                            <span className="text-lg font-black tabular-nums group-hover:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>#00{suit.id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Data Column */}
                            <div className="lg:col-span-5 space-y-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                                        <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-primary-500 transition-colors">{suit.details?.appearance} Line</span>
                                        <div className="h-px flex-grow" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[800] }} />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter group-hover:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                                        {suit.name}
                                    </h3>
                                    <p className="text-xs font-bold uppercase leading-relaxed group-hover:text-zinc-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                        {suit.basics?.description || 'Engineered for high-g thermal environments with integrated hydration routing.'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-px border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[800], borderColor: DESIGN_SYSTEM.COLORS.ZINC[800] }}>
                                    <div className="p-5 flex flex-col gap-3 group/spec hover:bg-zinc-800/80 transition-colors" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[900] + '80' }}>
                                        <Layers size={14} className="group-hover/spec:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        <div className="space-y-1">
                                            <p className="text-[8px] font-black uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>Primary Fabric</p>
                                            <p className="text-[10px] font-black uppercase group-hover/spec:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>{suit.details?.material || 'Nomex'}</p>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-3 group/spec hover:bg-zinc-800/80 transition-colors" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[900] + '80' }}>
                                        <ShieldAlert size={14} className="group-hover/spec:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        <div className="space-y-1">
                                            <p className="text-[8px] font-black uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>Durability Rating</p>
                                            <p className="text-[10px] font-black uppercase group-hover/spec:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>{suit.details?.durability || 'Extreme'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex items-center justify-between group/link">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>Assigned Driver</span>
                                        <Link
                                            href={`/team/driver/${driver?.slug || '#'}`}
                                            className="text-base font-black uppercase italic transition-colors hover:text-primary-400"
                                            style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                        >
                                            {driver?.first_name} {driver?.last_name}
                                        </Link>
                                    </div>
                                    <Link
                                        href={`/team/driver/${driver?.slug || '#'}`}
                                        className="w-10 h-10 flex items-center justify-center rounded-full border transition-all hover:bg-primary-500 hover:border-primary-500 group"
                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[800] }}
                                    >
                                        <ChevronRight size={16} className="transition-colors group-hover:text-black" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} />
                                    </Link>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {suit.details?.manufacturers?.list?.map((man, mIdx) => (
                                        <span
                                            key={mIdx}
                                            className="px-2 py-1 text-[8px] font-black uppercase tracking-widest border group-hover:bg-primary-500/10 group-hover:border-primary-500/30 group-hover:text-primary-400 transition-all"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[800],
                                                color: DESIGN_SYSTEM.COLORS.ZINC[400],
                                                borderColor: DESIGN_SYSTEM.COLORS.ZINC[700]
                                            }}
                                        >
                                            {man.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}