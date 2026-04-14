'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit } from '@/payload-types';

interface StatementProps {
    circuit: Circuit;
}

export default function CircuitStatement({ circuit }: StatementProps) {
    if (!circuit.basics?.description) return null;

    return (
        <section
            className="relative w-full border-b overflow-hidden"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.BLACK,
                borderColor: DESIGN_SYSTEM.COLORS.ZINC_800
            }}
        >
            {/* Background Texture/Accent */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${DESIGN_SYSTEM.COLORS.ZINC_700} 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20 py-40 lg:py-64">
                <div className="flex flex-col gap-16 lg:gap-24">

                    {/* Header Labeling */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">
                                Institutional_Thesis
                            </span>
                            <div className="h-px w-24" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-6xl lg:text-9xl font-black italic tracking-tighter text-white/5 tabular-nums select-none">
                                {circuit.basics?.identifiers?.code || 'CRT'}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest -ml-12 lg:-ml-20" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                Registered_Venue_Identity
                            </span>
                        </div>
                    </div>

                    {/* The Core Statement */}
                    <div className="max-w-5xl self-end text-right lg:text-left lg:self-start">
                        <p
                            className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white uppercase italic"
                            style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                        >
                            {circuit.basics.description}
                        </p>
                    </div>

                    {/* Technical Footer Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/10 mt-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Infrastructure_Model</span>
                            <span className="text-sm font-bold text-white uppercase italic">
                                {circuit.details?.type || 'Standard_Permanent_Grade'}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Operating_Status</span>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: `0 0 10px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` }} />
                                <span className="text-sm font-bold text-white uppercase tracking-tighter">System_Online_Primary</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 md:items-end">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 text-right">Coordinate_Node</span>
                            <span className="text-sm font-bold text-white tabular-nums tracking-widest uppercase">
                                {circuit.details?.location
                                    ? `${circuit.details.location[0].toFixed(4)} / ${circuit.details.location[1].toFixed(4)}`
                                    : 'UNKN_LOCATION'
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Decorative Element */}
            <div
                className="absolute bottom-0 right-0 w-32 h-32 lg:w-64 lg:h-64 opacity-20"
                style={{
                    background: `linear-gradient(135deg, transparent 50%, ${DESIGN_SYSTEM.COLORS.ZINC_700} 50%)`,
                    clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP
                }}
            />
        </section>
    );
}