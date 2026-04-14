'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Car, Driver, Media } from '@/payload-types';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, Gauge, Settings2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const getCardClipPath = (index: number) => {
    const variations = [
        'polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%)',
        'polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%, 0% calc(100% - 20px))',
    ];
    return variations[index % variations.length];
};

export default function CarsSection({ driver }: { driver: Driver }) {
    const cars = (driver.details?.cars as Car[]) || [];
    if (cars.length === 0) return null;

    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);

    const duplicatedCars = useMemo(() => {
        const base = [...cars];
        while (base.length < 10) base.push(...cars);
        return [...base, ...base];
    }, [cars]);

    useAnimationFrame((t, delta) => {
        if (isHovered) return;
        const moveBy = delta * 0.001;
        let currentX = x.get() - moveBy;
        if (currentX <= -50) currentX = 0;
        x.set(currentX);
    });

    const xPos = useTransform(x, (v) => `${v}%`);

    return (
        <section
            className="w-full py-24 overflow-hidden border-t"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND, borderTopColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
        >
            <div className="px-6 md:px-12 lg:px-20 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4"
                style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-black leading-none">
                        Garage
                    </h2>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                        Technical_Hardware_Registry
                    </span>
                </div>
                <div className="flex items-center gap-6 font-mono text-[10px] text-zinc-600">
                    <span>Active_Units: {cars.length.toString().padStart(2, '0')}</span>
                </div>
            </div>

            <div
                className="relative flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div className="flex gap-8 px-8" style={{ x: xPos }}>
                    {duplicatedCars.map((car, idx) => (
                        <CarTacticalModule key={`${car.id}-${idx}`} car={car} index={idx} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CarTacticalModule({ car, index }: { car: Car; index: number }) {
    const [localHover, setLocalHover] = useState(false);
    const clip = getCardClipPath(index);
    const imageUrl = (car.assets?.thumbnail as Media)?.url || (car.assets?.cover as Media)?.url || `https://picsum.photos/seed/${car.id}/800/600`;

    return (
        <div
            onMouseEnter={() => setLocalHover(true)}
            onMouseLeave={() => setLocalHover(false)}
            className="relative w-[340px] md:w-[420px] shrink-0 h-full transition-all duration-300"
        >
            <div
                className="relative p-[1px] transition-colors duration-300"
                style={{
                    clipPath: clip,
                    backgroundColor: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.PRIMARY_MUTED
                }}
            >
                <div
                    className="relative bg-white overflow-hidden p-6 h-full flex flex-col"
                    style={{ clipPath: clip }}
                >
                    <div className="relative aspect-video mb-6 overflow-hidden border bg-zinc-100"
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                        <Image
                            src={imageUrl}
                            alt={car.name}
                            fill
                            className="object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 tracking-tighter">
                                {car.details?.status || 'OPERATIONAL'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 mb-6">
                        <div className="flex items-center gap-2">
                            <Gauge size={12} style={{ color: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.NEUTRAL_600 }} />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
                                {car.basics?.identifiers?.model || 'UNIT_REF'}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-black leading-none">
                            {car.name}
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t pt-4 mb-8" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-400 uppercase mb-1">Chassis_Ref</span>
                            <span className="text-[10px] font-bold text-black uppercase truncate">
                                {car.basics?.identifiers?.chassis || 'PROTO_00'}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black text-zinc-400 uppercase mb-1">Classification</span>
                            <span className="text-[10px] font-bold text-black uppercase truncate">
                                {car.details?.technicalCategories || 'Standard'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Settings2 size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Spec_Sheet_V1</span>
                        </div>

                        <Link href={`/resources/cars/${car.slug}`}>
                            <div
                                className="p-2 border transition-all duration-200"
                                style={{
                                    backgroundColor: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.SURFACE,
                                    borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED
                                }}
                            >
                                <ArrowUpRight className="size-4" style={{ color: localHover ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.NEUTRAL_600 }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}