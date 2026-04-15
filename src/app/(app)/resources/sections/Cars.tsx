'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Car, Media } from '@/payload-types';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu, Gauge, Settings2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface CarsSectionProps {
    cars: Car[];
}

export default function CarsSection({ cars }: CarsSectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
        dragFree: true
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section
            className="w-full py-32 md:py-48"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-24">
                <div className="flex flex-col gap-6 border-l-4 pl-8" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                        Technical Inventory
                    </span>
                    <div className="flex items-end justify-between">
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                            Asset Catalog
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                {(selectedIndex % cars.length) + 1}
                            </span>
                            <span className="text-xl font-black" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}>/</span>
                            <span className="text-xl font-black" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>{cars.length.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {cars.map((car, index) => {
                            const coverImage = (car.assets?.cover as Media)?.url || (car.assets?.avatar as Media)?.url;
                            const placeholderImage = `https://picsum.photos/seed/${car.id || index}/800/450`;

                            return (
                                <div
                                    key={car.id}
                                    className="flex-[0_0_100%] min-w-0 pl-6 md:pl-10"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pr-6 md:pr-10"
                                    >
                                        {/* Technical Header - Mobile Only */}
                                        <div className="lg:hidden flex justify-between items-end border-b pb-4" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                            <h3 className="text-3xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                {car.name}
                                            </h3>
                                            <span className="text-[10px] font-mono font-bold" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                {car.basics?.identifiers?.chassis}
                                            </span>
                                        </div>

                                        {/* Visual Asset Container */}
                                        <div className="lg:col-span-7 relative">
                                            <div className="aspect-[16/9] overflow-hidden relative" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                                <img
                                                    src={coverImage || placeholderImage}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.src = placeholderImage;
                                                    }}
                                                    draggable={false}
                                                />

                                                {/* Status Indicator */}
                                                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                                    <div
                                                        className="px-4 py-2 text-[10px] font-black uppercase tracking-widest backdrop-blur-md border"
                                                        style={{
                                                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[500],
                                                            color: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                                            borderColor: DESIGN_SYSTEM.COLORS.WHITE[300] + '33'
                                                        }}
                                                    >
                                                        {car.details?.status || 'Active'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chassis/Model Labels */}
                                            <div className="mt-6 flex flex-wrap gap-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Chassis_Ref</span>
                                                    <span className="text-xs font-black uppercase tabular-nums group-hover:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{car.basics?.identifiers?.chassis || 'TBD'}</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Model_Year</span>
                                                    <span className="text-xs font-black uppercase tabular-nums group-hover:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{car.basics?.identifiers?.model || '2026'}</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Unit_Ver</span>
                                                    <span className="text-xs font-black uppercase tabular-nums group-hover:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{car.basics?.identifiers?.version || 'EVO.01'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Data Sidebar */}
                                        <div className="lg:col-span-5 flex flex-col gap-10">
                                            <div className="hidden lg:block space-y-4">
                                                <h3
                                                    className="text-5xl font-black uppercase italic tracking-tighter leading-none"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                                >
                                                    <span className="group-hover:text-primary-500 transition-colors">
                                                        {car.name}
                                                    </span>
                                                </h3>
                                                {car.alias && (
                                                    <p className="text-[11px] font-black uppercase tracking-[0.3em] group-hover:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                        {car.alias}
                                                    </p>
                                                )}
                                            </div>

                                            <p className="text-sm font-bold leading-relaxed uppercase group-hover:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                                {car.basics?.tagline || 'Technical documentation for this unit is restricted to authorized engineers.'}
                                            </p>

                                            <div className="grid grid-cols-1 gap-px border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                                {car.details?.specifications?.list?.slice(0, 4).map((spec, sIdx) => (
                                                    <div key={spec.id || sIdx} className="p-4 flex items-center justify-between group/spec" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                                                        <div className="flex items-center gap-3">
                                                            <Settings2 size={12} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }} className="group-hover/spec:text-primary-500 transition-colors" />
                                                            <span className="text-[10px] font-black uppercase tracking-tight group-hover/spec:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                                {spec.parameter}
                                                            </span>
                                                        </div>
                                                        <span className="text-[11px] font-black uppercase italic group-hover/spec:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                            {spec.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-col gap-6 pt-10 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                                <div className="flex items-center gap-4">
                                                    <Cpu size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                        {car.details?.technicalCategories || 'General Assembly'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map((i) => (
                                                            <div
                                                                key={i}
                                                                className="w-8 h-8 rounded-none border-2"
                                                                style={{
                                                                    clipPath: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
                                                                    backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100],
                                                                    borderColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-4 group/btn cursor-pointer">
                                                        <span className="text-[10px] font-black uppercase tracking-widest group-hover/btn:text-primary-600 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                            View Specs
                                                        </span>
                                                        <div
                                                            className="w-10 h-10 flex items-center justify-center transition-all"
                                                            style={{
                                                                clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                                                                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE
                                                            }}
                                                        >
                                                            <Gauge size={16} className="group-hover/btn:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-12">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => emblaApi?.scrollTo(index)}
                                    className="h-1 transition-all duration-300"
                                    style={{
                                        width: index === selectedIndex ? '40px' : '20px',
                                        backgroundColor: index === selectedIndex
                                            ? DESIGN_SYSTEM.COLORS.PRIMARY[500]
                                            : DESIGN_SYSTEM.COLORS.ZINC[200]
                                    }}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={scrollPrev}
                                className="w-12 h-12 flex items-center justify-center border transition-all group/arrow"
                                style={{
                                    borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                                    backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                }}
                            >
                                <ChevronRight size={20} className="rotate-180 group-hover/arrow:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="w-12 h-12 flex items-center justify-center border transition-all group/arrow"
                                style={{
                                    borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                                    backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                }}
                            >
                                <ChevronRight size={20} className="group-hover/arrow:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}