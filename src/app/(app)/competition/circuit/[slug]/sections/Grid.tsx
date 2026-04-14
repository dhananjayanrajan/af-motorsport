'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver } from '@/payload-types';

interface StatGridProps {
    circuit: Circuit;
}

export default function CircuitStatGrid({ circuit }: StatGridProps) {
    const recordDriver = circuit.metrics?.record_lap_driver as Driver;

    const technicalData = [
        { label: 'Infrastructure', value: circuit.details?.type || 'Permanent' },
        { label: 'FIA Grade', value: circuit.details?.fia_grade || 'U' },
        { label: 'DRS Zones', value: circuit.details?.drs_zones || 0 },
        { label: 'Direction', value: circuit.details?.direction || 'N/A' },
    ];

    const performanceData = [
        { label: 'Lap Record', value: circuit.metrics?.record_lap_time || '0:00.000', highlight: true },
        { label: 'Holder', value: recordDriver ? `${recordDriver.first_name} ${recordDriver.last_name}` : 'N/A' },
        { label: 'Season', value: circuit.metrics?.record_lap_year || 'N/A' },
        { label: 'Capacity', value: circuit.details?.capacity?.toLocaleString() || 'N/A' },
    ];

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-px border-b" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_800, borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}>
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK }}>
                <div className="flex items-center gap-4">
                    <div className="w-1 h-6" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Technical_Specification</span>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-12">
                    {technicalData.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                            <span className="text-xl sm:text-2xl font-black italic uppercase text-white">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}>
                <div className="flex items-center gap-4">
                    <div className="w-1 h-6" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Performance_Registry</span>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-12">
                    {performanceData.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                            <span className="text-xl sm:text-2xl font-black italic uppercase" style={{ color: stat.highlight ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.WHITE }}>
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}