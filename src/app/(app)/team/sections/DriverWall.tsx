'use client';

import { ClippedButton } from '@/components/Clipped/ClippedButton';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Country, Driver, Media } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function DriversWall({ drivers }: { drivers: Driver[] }) {
    const [showNav, setShowNav] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end start"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            setShowNav(v > 0.05 && v < 0.95);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const scrollToLeaders = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('leaders-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section
            id="drivers-section"
            ref={sectionRef}
            className="relative w-full py-24 md:py-40 overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND }}
        >
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] overflow-hidden">
                <div className="grid grid-cols-8 md:grid-cols-12 gap-8 w-[120%] h-[120%] -rotate-6">
                    {Array.from({ length: 96 }).map((_, i) => (
                        <motion.span
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: Math.random() * 4 + 2, repeat: Infinity }}
                            className="text-[10px] font-black font-mono"
                        >
                            {Math.random() > 0.5 ? 'SYNC_ACTIVE' : `0x${i.toString(16)}`}
                        </motion.span>
                    ))}
                </div>
            </div>

            <div className="w-full px-6 md:px-12 lg:px-20 flex flex-col gap-48 md:gap-64 lg:gap-80 relative z-10">
                {drivers.map((driver, index) => (
                    <DriverSequence key={driver.id} driver={driver} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ y: 100, x: '-50%', opacity: 0 }}
                animate={{ y: showNav ? 0 : 100, x: '-50%', opacity: showNav ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.87, 0, 0.13, 1] }}
                className="fixed bottom-10 left-1/2 z-[100]"
            >
                <button
                    onClick={scrollToLeaders}
                    className="appearance-none bg-transparent border-none p-0 m-0 cursor-pointer block"
                >
                    <ClippedButton
                        label="Scroll to Leaders"
                        variant="outline"
                        size="sm"
                        className="shadow-2xl shadow-black/20 pointer-events-none"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-black italic">SCROLL TO LEADERS</span>
                            <ArrowDown className="size-3 animate-bounce" />
                        </div>
                    </ClippedButton>
                </button>
            </motion.div>
        </section>
    );
}

function DriverSequence({ driver, index }: { driver: Driver; index: number }) {
    const containerRef = useRef(null);
    const isEven = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const xPos = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [isEven ? -100 : 100, 0, 0, isEven ? 100 : -100]);

    const avatarUrl = (driver.assets?.avatar as Media)?.url || `https://picsum.photos/seed/driver-${driver.id}/1200/1600`;
    const nationality = (driver.basics?.nationality as Country)?.name;

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className={cn(
                "relative flex flex-col items-center gap-12 md:gap-16 lg:gap-32",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            <motion.div
                style={{ x: xPos }}
                className="relative w-full md:w-1/2 lg:w-5/12 z-10"
            >
                <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden border border-zinc-200 shadow-xl">
                    <motion.img
                        src={avatarUrl}
                        alt={driver.last_name}
                        whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
                        className="w-full h-full object-cover grayscale transition-all duration-700 ease-in-out"
                    />

                    <div className="absolute top-0 right-0 p-4 md:p-6">
                        <div className="bg-black px-4 md:px-6 py-2 md:py-3 border-l-4" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                            <span className="text-2xl md:text-4xl font-black text-white italic tabular-nums">
                                #{driver.basics?.racing_number || index + 1}
                            </span>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black via-black/40 to-transparent">
                        <span className="text-[10px] md:text-[11px] font-black text-[#00FF41] uppercase tracking-[0.3em]">
                            Callsign: {driver.basics?.callsign || 'N/A'}
                        </span>
                    </div>
                </div>
            </motion.div>

            <div
                className={cn(
                    "w-full md:w-1/2 lg:w-7/12 z-10 flex flex-col",
                    isEven ? "md:items-start" : "md:items-end md:text-right"
                )}
            >
                <div className="w-full max-w-2xl">
                    <div className={cn("flex items-center gap-4 mb-4 md:mb-6", !isEven && "md:flex-row-reverse")}>
                        <div className="h-[2px] w-10 md:w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span
                            className={cn("text-[10px] md:text-xs font-black uppercase", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL)}
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                        >
                            {nationality} // {driver.basics?.competition_name || 'GRID_ACTIVE'}
                        </span>
                    </div>

                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.8] my-10 md:my-16"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                    >
                        {driver.first_name}<br />{driver.last_name}
                    </h2>

                    <div className={cn(
                        "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 py-8 md:py-10 border-y mb-10 md:mb-12 w-full",
                        isEven ? "border-zinc-200" : "border-zinc-200 md:justify-items-end"
                    )}>
                        <DateBlock label="Debut" date={driver.basics?.debut_date} />
                        <DataPoint label="Competition" value={driver.basics?.competition_name || 'Global'} />
                        <DataPoint label="Pronouns" value={driver.basics?.pronouns || 'N/A'} />
                        <DataPoint label="Nickname" value={driver.basics?.nickname || '---'} />
                    </div>

                    <div className={cn("flex", !isEven && "md:justify-end")}>
                        <Link href={`/team/driver/${driver.slug}`}>
                            <ClippedButton label="View Profile" variant="primary" size="lg" className="md:size-xl" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function DateBlock({ label, date }: { label: string; date?: string | null }) {
    if (!date) return <DataPoint label={label} value="2026" />;
    const parts = date.split('-');
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
            <div className="flex items-center gap-1">
                {parts.map((part, i) => (
                    <div key={i} className="flex items-center gap-1">
                        <span className="bg-zinc-100 px-2 py-1 text-[13px] font-black text-black tabular-nums border border-zinc-200">
                            {part}
                        </span>
                        {i < parts.length - 1 && <span className="text-zinc-300">/</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function DataPoint({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1 md:gap-2">
            <span className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
            <span className="text-sm md:text-base font-bold text-black uppercase truncate">{value}</span>
        </div>
    );
}