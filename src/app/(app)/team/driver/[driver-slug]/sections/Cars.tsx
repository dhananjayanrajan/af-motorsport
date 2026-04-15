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
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND.DEFAULT,
                borderTopColor: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED
            }}
        >
            <div className="px-6 md:px-12 lg:px-20 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4"
                style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                <div className="flex flex-col gap-2">
                    <h2
                        className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none transition-colors"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Garage
                    </h2>
                    <span
                        className="text-[10px] font-black uppercase tracking-[0.4em]"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                    >
                        Technical_Hardware_Registry
                    </span>
                </div>
                <div className="flex items-center gap-6 font-mono text-[10px]">
                    <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                        Active_Units: {cars.length.toString().padStart(2, '0')}
                    </span>
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
                    backgroundColor: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.PRIMARY.MUTED
                }}
            >
                <div
                    className="relative overflow-hidden p-6 h-full flex flex-col transition-colors duration-300"
                    style={{
                        clipPath: clip,
                        backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                    }}
                >
                    <div
                        className="relative aspect-video mb-6 overflow-hidden border bg-zinc-100"
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED }}
                    >
                        <Image
                            src={imageUrl}
                            alt={car.name}
                            fill
                            className="object-cover transition-all duration-500"
                            style={{
                                filter: localHover ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.95)',
                                transform: localHover ? 'scale(1.05)' : 'scale(1)'
                            }}
                        />
                        <div className="absolute top-3 left-3">
                            <span
                                className="text-[10px] font-black px-2 py-0.5 tracking-tighter transition-colors"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                    color: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE.PURE
                                }}
                            >
                                {car.details?.status || 'OPERATIONAL'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 mb-6">
                        <div className="flex items-center gap-2">
                            <Gauge size={12} style={{ color: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.NEUTRAL[600] }} />
                            <span
                                className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors"
                                style={{ color: localHover ? DESIGN_SYSTEM.COLORS.BLACK.PURE : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                {car.basics?.identifiers?.model || 'UNIT_REF'}
                            </span>
                        </div>
                        <h3
                            className="text-3xl font-black italic uppercase tracking-tighter leading-none transition-colors"
                            style={{ color: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY[600] : DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            {car.name}
                        </h3>
                    </div>

                    <div
                        className="grid grid-cols-2 gap-4 border-t pt-4 mb-8"
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED }}
                    >
                        <div className="flex flex-col">
                            <span
                                className="text-[7px] font-black uppercase mb-1 transition-colors"
                                style={{ color: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                Chassis_Ref
                            </span>
                            <span
                                className="text-[10px] font-bold uppercase truncate transition-colors"
                                style={{ color: localHover ? DESIGN_SYSTEM.COLORS.BLACK.PURE : DESIGN_SYSTEM.COLORS.ZINC[900] }}
                            >
                                {car.basics?.identifiers?.chassis || 'PROTO_00'}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span
                                className="text-[7px] font-black uppercase mb-1 transition-colors"
                                style={{ color: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                Classification
                            </span>
                            <span
                                className="text-[10px] font-bold uppercase truncate transition-colors"
                                style={{ color: localHover ? DESIGN_SYSTEM.COLORS.BLACK.PURE : DESIGN_SYSTEM.COLORS.ZINC[900] }}
                            >
                                {car.details?.technicalCategories || 'Standard'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                            <Settings2 size={12} style={{ color: localHover ? DESIGN_SYSTEM.COLORS.SECONDARY[500] : DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span
                                className="text-[8px] font-black uppercase tracking-widest transition-colors"
                                style={{ color: localHover ? DESIGN_SYSTEM.COLORS.BLACK.PURE : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                            >
                                Spec_Sheet_V1
                            </span>
                        </div>

                        <Link href={`/resources/cars/${car.slug}`}>
                            <div
                                className="p-2 border transition-all duration-200"
                                style={{
                                    backgroundColor: localHover ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.SURFACE.DEFAULT,
                                    borderColor: DESIGN_SYSTEM.COLORS.PRIMARY.MUTED,
                                    transform: localHover ? 'scale(1.1)' : 'scale(1)'
                                }}
                            >
                                <ArrowUpRight
                                    className="size-4 transition-colors"
                                    style={{ color: localHover ? DESIGN_SYSTEM.COLORS.BLACK.PURE : DESIGN_SYSTEM.COLORS.NEUTRAL[600] }}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}