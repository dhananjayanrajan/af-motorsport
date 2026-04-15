'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Country, Driver, Media } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function DriversWall({ drivers }: { drivers: Driver[] }) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);
    const springX = useSpring(x, { stiffness: 80, damping: 25, restDelta: 0.001 });

    return (
        <section
            id="drivers-section"
            ref={targetRef}
            className="relative h-[400vh] bg-white"
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                {/* Background Grid Accent */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${DESIGN_SYSTEM.COLORS.ZINC[400]} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
                </div>

                {/* Driver Sequence */}
                <motion.div style={{ x: springX }} className="flex gap-24 px-[10vw] z-10">
                    {drivers.map((driver, index) => (
                        <DriverCard key={driver.id} driver={driver} index={index} />
                    ))}
                </motion.div>

                {/* Minimalist Scroll Guide */}
                <div className="absolute bottom-16 left-16 flex items-center gap-6 group">
                    <span
                        className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}
                    >
                        Active_Duty_Roster
                    </span>
                    <div className="flex gap-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-1 w-4" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function DriverCard({ driver, index }: { driver: Driver; index: number }) {
    const [hovered, setHovered] = useState(false);

    const avatarUrl = (driver.assets?.avatar as Media)?.url || `https://picsum.photos/seed/${driver.id}/800/1000?grayscale`;
    const nationality = (driver.basics?.nationality as Country)?.name || 'UNSPECIFIED';

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex-shrink-0 w-[320px] md:w-[460px] cursor-pointer"
        >
            <Link href={`/team/driver/${driver.slug}`} className="block relative z-10">

                {/* Visual Block with Depth Layering */}
                <div
                    className="relative aspect-[4/5] overflow-hidden p-3 border-2 transition-all duration-700"
                    style={{
                        borderColor: DESIGN_SYSTEM.COLORS.ZINC[100],
                        backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[100],
                        boxShadow: hovered ? DESIGN_SYSTEM.COLORS.PRIMARY.GLOW : 'none'
                    }}
                >
                    {/* Background Structure Overlay */}
                    <div className="absolute inset-3 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                    <div className="absolute top-3 left-3 w-8 h-8 border-t border-l" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />

                    {/* Image Layer with Zoom/Scale on Hover */}
                    <img
                        src={avatarUrl}
                        alt={driver.last_name}
                        className="relative z-10 w-full h-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                    />

                    {/* Numeric Badge - Tactical Tabular Font */}
                    <div className="absolute top-3 right-3 z-30 overflow-hidden">
                        <div
                            className="bg-black py-4 px-10 border-l-4 transition-colors group-hover:bg-zinc-900"
                            style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        >
                            <span className="text-4xl md:text-7xl font-black italic tabular-nums text-white group-hover:text-primary-500 transition-colors">
                                {driver.basics?.racing_number || index + 1}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Typography Block - Precision Aligned */}
                <div className="mt-12 space-y-6">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            Origin
                        </span>
                        <div className="h-px w-10" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }} />
                        <span className="text-xs font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[950] }}>
                            {nationality}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-sm font-black uppercase text-zinc-500 group-hover:text-black transition-colors">
                            {driver.first_name}
                        </h3>
                        <h2
                            className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.85] transition-colors group-hover:text-primary-600"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[950] }}
                        >
                            {driver.last_name}
                        </h2>
                    </div>

                    {/* Tactical Stats Matrix */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-10 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                        <DataPoint label="Competition" value={driver.basics?.competition_name || 'Global'} color={DESIGN_SYSTEM.COLORS.ZINC[700]} />
                        <DataPoint label="Callsign" value={driver.basics?.callsign || 'UNIT'} icon={Zap} color={DESIGN_SYSTEM.COLORS.ZINC[700]} />
                    </div>

                    {/* Action Hub - Slips In on Hover */}
                    <div className="absolute -bottom-8 -right-8 p-3 bg-zinc-950 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <ArrowUpRight size={24} className="text-white" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function DataPoint({ label, value, icon: Icon, color }: { label: string; value: string; icon?: React.ElementType; color?: string }) {
    return (
        <div className="flex flex-col gap-2 group/point">
            <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
            </div>
            <span
                className="text-lg font-black uppercase italic tracking-tight transition-all duration-300 group-hover/point:text-primary-500 group-hover/point:translate-x-1"
                style={{ color: color || DESIGN_SYSTEM.COLORS.ZINC[950] }}
            >
                {value}
            </span>
        </div>
    );
}