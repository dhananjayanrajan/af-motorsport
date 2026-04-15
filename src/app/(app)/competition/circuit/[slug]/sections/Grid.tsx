'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver } from '@/payload-types';
import { motion } from 'motion/react';

interface StatGridProps {
    circuit: Circuit;
}

export default function CircuitStatGrid({ circuit }: StatGridProps) {
    const recordDriver = circuit.metrics?.record_lap_driver as Driver;

    const technicalData = [
        { label: 'Infrastructure', value: circuit.details?.type || 'Permanent' },
        { label: 'FIA Grade', value: circuit.details?.fia_grade ? `Grade ${circuit.details.fia_grade}` : 'Unrated' },
        { label: 'DRS Zones', value: circuit.details?.drs_zones || 'None' },
        { label: 'Direction', value: circuit.details?.direction || 'N/A' },
    ];

    const performanceData = [
        { label: 'Lap Record', value: circuit.metrics?.record_lap_time || '0:00.000', highlight: true },
        { label: 'Holder', value: recordDriver?.first_name ? `${recordDriver.first_name} ${recordDriver.last_name}` : 'Archive Empty' },
        {
            label: 'Year', value: circuit.metrics?.record_lap_year && !isNaN(Date.parse(circuit.metrics.record_lap_year))
                ? new Date(circuit.metrics.record_lap_year).getFullYear()
                : 'N/A'
        },
        { label: 'Capacity', value: circuit.details?.capacity ? circuit.details.capacity.toLocaleString() : 'Classified' },
    ];

    return (
        <section
            className="grid grid-cols-1 lg:grid-cols-2 gap-px border-y overflow-hidden"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[200],
                borderColor: DESIGN_SYSTEM.COLORS.WHITE[200]
            }}
        >
            <div
                className="p-12 md:p-20 flex flex-col gap-16 relative"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            >
                <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(${DESIGN_SYSTEM.COLORS.WHITE.PURE} 1px, transparent 1px)`,
                        backgroundSize: '16px 16px'
                    }}
                />

                <div className="flex items-center gap-6">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 24 }}
                        className="w-1"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                    />
                    <span
                        className="text-[10px] font-black uppercase tracking-[0.4em]"
                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE[400] }}
                    >
                        Technical_Specification
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-y-12 gap-x-8 sm:gap-x-12 relative z-10">
                    {technicalData.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col gap-3 group"
                        >
                            <span
                                className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors group-hover:text-white"
                                style={{ color: DESIGN_SYSTEM.COLORS.WHITE[800] }}
                            >
                                {stat.label}
                            </span>
                            <span className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tighter">
                                {stat.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div
                className="p-12 md:p-20 flex flex-col gap-16 relative"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
            >
                <div className="flex items-center gap-6">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 24 }}
                        className="w-1"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    />
                    <span
                        className="text-[10px] font-black uppercase tracking-[0.4em]"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK[500] }}
                    >
                        Performance_Registry
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-y-12 gap-x-8 sm:gap-x-12">
                    {performanceData.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col gap-3 group"
                        >
                            <span
                                className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors group-hover:text-black"
                                style={{ color: DESIGN_SYSTEM.COLORS.WHITE[900] }}
                            >
                                {stat.label}
                            </span>
                            <span
                                className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter"
                                style={{ color: stat.highlight ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                            >
                                {stat.value}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="absolute bottom-8 right-8 pointer-events-none">
                    <span className="text-[60px] font-black italic opacity-[0.03] select-none leading-none">
                        {circuit.basics?.identifiers?.code || 'DATA'}
                    </span>
                </div>
            </div>
        </section>
    );
}