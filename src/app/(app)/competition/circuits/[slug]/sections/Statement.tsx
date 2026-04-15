'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Media } from '@/payload-types';
import { Layers, Maximize2, MoveUpRight, Navigation, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface CircuitStatementProps {
    circuit: Circuit;
}

export default function CircuitStatement({ circuit }: CircuitStatementProps) {
    const mapUrl = (circuit.assets?.circuit_map as Media)?.url;

    const stats = [
        {
            label: 'Trajectory',
            value: circuit.details?.direction || 'Neutral',
            icon: Navigation,
        },
        {
            label: 'Complexity',
            value: `${circuit.details?.turns || 0} Sectors`,
            icon: Layers,
        },
        {
            label: 'Verticality',
            value: circuit.details?.elevation_change ? `${circuit.details.elevation_change}m` : 'Flat',
            icon: MoveUpRight,
        },
        {
            label: 'Scale',
            value: circuit.details?.capacity ? new Intl.NumberFormat().format(circuit.details.capacity) : 'Private',
            icon: Users,
        },
    ];

    return (
        <section
            className="w-full py-24 md:py-40 px-6 md:px-20 relative overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                <div className="lg:col-span-7 flex flex-col order-2 lg:order-1 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <h3
                            className="text-5xl md:text-7xl font-black uppercase italic leading-[0.9] tracking-tighter"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            Executive <br />
                            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Statement</span>
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p
                            className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK[500] }}
                        >
                            {circuit.basics?.description || "No official site brief provided in the current archive."}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t pt-10" style={{ borderColor: DESIGN_SYSTEM.COLORS.WHITE[200] }}>
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <stat.icon size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} strokeWidth={2.5} />
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-40" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                            {stat.label}
                                        </p>
                                        <p className="text-xs font-black uppercase italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-[440px] aspect-square flex items-center justify-center"
                    >
                        <div
                            className="absolute inset-0 rounded-full border border-dashed opacity-10 animate-spin-slow"
                            style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        />

                        <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
                            {mapUrl ? (
                                <img
                                    src={mapUrl}
                                    alt="Technical Map"
                                    className="w-full h-full object-contain grayscale brightness-90 contrast-125 transition-all duration-700 hover:grayscale-0 hover:scale-105"
                                />
                            ) : (
                                <div className="w-2/3 h-2/3 flex items-center justify-center border-2 border-dashed border-zinc-200 opacity-20">
                                    <Maximize2 size={32} />
                                </div>
                            )}
                        </div>

                        <div className="absolute top-4 right-4 flex flex-col items-end bg-white/80 backdrop-blur-sm p-3 border border-zinc-100 shadow-sm">
                            <span className="text-3xl font-black italic leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                {circuit.details?.length_km || '0.00'}
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                Kilometers
                            </span>
                        </div>

                        <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
                            <div className="bg-black text-white px-2 py-1 flex items-center justify-center">
                                <span className="text-[16px] font-mono font-bold uppercase tracking-tighter">
                                    FIA Grade {circuit.details?.fia_grade || 'U'}
                                </span>
                            </div>
                            <div className="border border-black px-2 py-1 flex items-center justify-center bg-white/50">
                                <span className="text-[16px] font-mono font-bold uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                    {circuit.details?.type || 'Permanent'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}