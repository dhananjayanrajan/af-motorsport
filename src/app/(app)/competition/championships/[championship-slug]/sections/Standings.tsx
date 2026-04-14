'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Driver, Media, Point } from '@/payload-types';
import { motion } from 'framer-motion';

interface DriverStandingsProps {
    points: Point[];
}

export default function DriverStandings({ points }: DriverStandingsProps) {
    return (
        <section className="w-full py-32 bg-white border-b border-zinc-100">
            <div className="max-w-7xl mx-auto px-10">
                <div className="flex flex-col mb-16">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-400 mb-2">Classification</span>
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic text-black">Driver Standings</h2>
                </div>

                <div className="flex flex-col border-t border-zinc-200">
                    {points.map((point, index) => {
                        const driver = point.categories?.[0] as unknown as Driver; // Adjusted for data mapping
                        const portrait = (driver?.assets?.avatar as Media)?.url || `https://picsum.photos/seed/driver-${index}/100/100`;
                        const delta = point.details?.delta || 0;
                        const isPositive = delta > 0;

                        return (
                            <motion.div
                                key={point.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative flex items-center justify-between py-6 border-b border-zinc-100 hover:bg-zinc-50 transition-colors px-4"
                            >
                                <div className="flex items-center gap-12">
                                    <span className="text-2xl font-black italic text-zinc-300 tabular-nums w-12">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>

                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-zinc-200 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <img src={portrait} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Driver</span>
                                                <div className="w-4 h-[1px] bg-zinc-200" />
                                            </div>
                                            <span className="text-xl font-black uppercase italic text-black">
                                                {driver?.first_name} {driver?.last_name}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-16">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Previous</span>
                                        <span className="text-sm font-medium text-zinc-500 tabular-nums">
                                            {point.details?.before || 0}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-end w-20">
                                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Delta</span>
                                        <div
                                            className="px-2 py-0.5 mt-0.5 text-[10px] font-black tabular-nums"
                                            style={{
                                                backgroundColor: isPositive ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.ZINC_200,
                                                color: isPositive ? DESIGN_SYSTEM.COLORS.BLACK : DESIGN_SYSTEM.COLORS.ZINC_600
                                            }}
                                        >
                                            {isPositive ? `+${delta}` : delta}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end min-w-[80px]">
                                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Points</span>
                                        <span className="text-2xl font-black text-black tabular-nums">
                                            {point.details?.after || 0}
                                        </span>
                                    </div>

                                    {point.details?.adjustment ? (
                                        <div className="flex items-center justify-center w-6 h-6 border border-zinc-200 rounded-full" title="Adjustment Applied">
                                            <span className="text-[10px] font-black text-zinc-400">†</span>
                                        </div>
                                    ) : (
                                        <div className="w-6" />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}