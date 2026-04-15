'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Driver, Media } from '@/payload-types';
import { Calendar, Timer, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface LapRecordArchiveProps {
    circuit: Circuit;
}

export default function LapRecordArchive({ circuit }: LapRecordArchiveProps) {
    const record = circuit.metrics;
    const driver = record?.record_lap_driver as Driver;

    const driverImage = (driver?.assets?.avatar as Media)?.url
        || (circuit.assets?.cover as Media)?.url
        || `https://picsum.photos/seed/${circuit.id}/1920/1080?grayscale`;

    if (!record?.record_lap_time) return null;

    const recordYear = record.record_lap_year && !isNaN(Date.parse(record.record_lap_year))
        ? new Date(record.record_lap_year).getFullYear()
        : 'N/A';

    return (
        <section
            className="w-full py-12 px-6 md:px-20 border-t relative overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE, borderColor: DESIGN_SYSTEM.COLORS.WHITE[200] }}
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(${DESIGN_SYSTEM.COLORS.BLACK.PURE} 1.5px, transparent 1.5px), linear-gradient(90deg, ${DESIGN_SYSTEM.COLORS.BLACK.PURE} 1.5px, transparent 1.5px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="absolute top-0 left-1/4 w-px h-full opacity-10" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
            <div className="absolute top-0 right-1/4 w-px h-full opacity-10" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16 items-center md:items-start">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span
                            className="text-[10px] font-black uppercase"
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500], letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL }}
                        >
                            Metric Validation // 05
                        </span>
                    </div>
                    <h2
                        className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-none"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Absolute Lap Record
                    </h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full group"
                    style={{
                        clipPath: 'polygon(0 0, 97% 0, 100% 15%, 100% 100%, 3% 100%, 0 85%)'
                    }}
                >
                    <div
                        className="relative w-full overflow-hidden p-[1px]"
                        style={{
                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-1000 scale-110 group-hover:scale-100 blur-sm group-hover:blur-none grayscale"
                            style={{
                                backgroundImage: `url(${driverImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 20%'
                            }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />

                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-15 opacity-20"
                            style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${DESIGN_SYSTEM.COLORS.BLACK.PURE} 4px)`
                            }}
                        />

                        <div className="relative z-20 p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="flex flex-col gap-4 text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                                    <div className="p-2 rounded-full border border-primary-500/30" style={{ borderColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}4D` }}>
                                        <Trophy size={18} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </div>
                                    <span
                                        className="text-[11px] font-black uppercase tracking-[0.5em]"
                                        style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                    >
                                        Championship Verified
                                    </span>
                                </div>
                                <h3
                                    className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
                                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                >
                                    {driver?.first_name ? `${driver.first_name} ${driver.last_name}` : 'Archive Entry Absent'}
                                </h3>
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-6 h-px" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[300] }} />
                                    <p
                                        className="text-xs font-black uppercase tracking-widest opacity-40 italic"
                                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE[100] }}
                                    >
                                        {circuit.name} Site Protocol
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 w-full lg:w-auto border-t lg:border-t-0 lg:border-l pt-12 lg:pt-0 lg:pl-24" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                <div className="flex flex-col items-center lg:items-start gap-4">
                                    <div className="flex items-center gap-3 opacity-30" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                                        <Timer size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Telemetry Time</span>
                                    </div>
                                    <span
                                        className="text-6xl md:text-7xl font-mono font-black italic leading-none"
                                        style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500], textShadow: `0 0 30px ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}66` }}
                                    >
                                        {record.record_lap_time}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center lg:items-start gap-4">
                                    <div className="flex items-center gap-3 opacity-30" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>
                                        <Calendar size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Temporal Stamp</span>
                                    </div>
                                    <span
                                        className="text-6xl md:text-7xl font-mono font-black italic leading-none"
                                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                    >
                                        {recordYear}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-16 flex justify-between items-center opacity-20 px-4">
                    <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>System Status: Operational</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>{circuit.basics?.identifiers?.code} // ARC-05</span>
                </div>
            </div>
        </section>
    );
}