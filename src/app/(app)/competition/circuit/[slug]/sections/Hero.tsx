'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Country, Media } from '@/payload-types';

interface CircuitHeroProps {
    circuit: Circuit;
}

export default function CircuitHero({ circuit }: CircuitHeroProps) {
    const coverImage = (circuit.assets?.cover as Media)?.url || `https://picsum.photos/seed/circuit-${circuit.id}/1600/900`;
    const circuitMap = (circuit.assets?.circuit_map as Media)?.url;
    const country = circuit.details?.country as Country;

    return (
        <section className="relative w-full min-h-[85vh] flex flex-col lg:flex-row overflow-hidden border-b font-sans" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}>
            <div className="flex-none lg:flex-[1.8] relative overflow-hidden">
                <img
                    src={coverImage}
                    alt={circuit.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-8 sm:p-12 lg:p-20 flex flex-col justify-end">
                    <div className="flex flex-col gap-4 max-w-3xl">
                        <div className="flex items-center gap-4">
                            <div className="w-8 sm:w-12 h-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE_GLOW }}>
                                {country?.name || 'International Proving Ground'}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]" style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}>
                            {circuit.name}
                        </h1>
                        {circuit.basics?.tagline && (
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest mt-2" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                {circuit.basics.tagline}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-none lg:w-[500px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-l" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE, borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                <div className="flex flex-col gap-8 sm:gap-12">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {circuit.basics?.identifiers?.code || 'CIRCUIT_REF'}
                            </span>
                        </div>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_300 }} />
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>
                            GRADE {circuit.details?.fia_grade || 'UNRANKED'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_300 }}>Technical Specification</span>
                        <p className="text-base font-medium leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_600 }}>
                            {circuit.basics?.description || 'Structural parameters and topographic intelligence documentation pending for this sector.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-px border shadow-sm" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_100, borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                        <div className="p-4 sm:p-6 flex flex-col gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}>
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Vector Length</span>
                            <span className="text-lg sm:text-xl font-black italic tabular-nums uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {circuit.details?.length_km ? `${circuit.details.length_km} KM` : 'N/A'}
                            </span>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}>
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Apex Count</span>
                            <span className="text-lg sm:text-xl font-black italic tabular-nums uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {circuit.details?.turns || 'N/A'}
                            </span>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}>
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Direction</span>
                            <span className="text-lg sm:text-xl font-black italic tabular-nums uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {circuit.details?.direction || 'N/A'}
                            </span>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col gap-1" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SURFACE }}>
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}>Elevation</span>
                            <span className="text-lg sm:text-xl font-black italic tabular-nums uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>
                                {circuit.details?.elevation_change ? `${circuit.details.elevation_change} M` : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 sm:mt-16 relative aspect-square border overflow-hidden p-8 flex items-center justify-center bg-zinc-50" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}>
                    {circuitMap ? (
                        <img
                            src={circuitMap}
                            alt="Circuit Map"
                            className="w-full h-full object-contain filter invert opacity-80"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 opacity-20">
                            <div className="w-12 h-12 border-2 rotate-45" style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK }} />
                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Map_Data_Missing</span>
                        </div>
                    )}
                    <div className="absolute top-4 left-4">
                        <span className="text-[7px] font-black uppercase tracking-widest opacity-30" style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}>Topology_Scan_v0.1</span>
                    </div>
                </div>
            </div>
        </section>
    );
}