'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Calendar, ExternalLink, MapPin, Trophy, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface AwardSectionProps {
    leader: any;
}

export default function AwardSection({ leader }: AwardSectionProps) {
    const [selectedAward, setSelectedAward] = useState<any>(null);

    const awards = (leader.details?.awards || [])
        .map((award: any) => (typeof award === 'object' ? award : null))
        .filter(Boolean);

    useEffect(() => {
        if (selectedAward) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedAward]);

    if (awards.length === 0) return null;

    return (
        <section
            className="relative w-full py-32 overflow-hidden select-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="mx-auto px-6 md:px-20">
                <div className="flex flex-col gap-20">
                    <div
                        className="flex flex-col gap-4 border-l-4 pl-8"
                        style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        <span
                            className="text-[11px] font-black uppercase tracking-[0.5em]"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            Competitive Achievement Log
                        </span>
                        <h2
                            className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            Hall of <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Fame</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {awards.map((award: any, i: number) => (
                            <AwardEsportsCard
                                key={award.id || i}
                                award={award}
                                onOpen={() => setSelectedAward(award)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedAward && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAward(null)}
                            className="fixed inset-0 z-[100] backdrop-blur-xl"
                            style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}CC` }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="fixed inset-4 md:inset-12 lg:inset-20 z-[101] flex flex-col md:flex-row overflow-hidden border-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE
                            }}
                        >
                            <div
                                className="w-full md:w-5/12 h-80 md:h-auto relative border-b-4 md:border-b-0 md:border-r-4"
                                style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                            >
                                <img
                                    src={selectedAward.assets?.candid?.url || selectedAward.assets?.thumbnail?.url || `https://picsum.photos/seed/${selectedAward.id}/1200/1600`}
                                    className="w-full h-full object-cover contrast-125"
                                    alt={selectedAward.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-10 flex flex-col gap-2">
                                    <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Victory Asset Archive</span>
                                    <span className="text-white text-lg font-black italic uppercase tracking-tighter">REF_ID_{selectedAward.id.slice(-8).toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col p-10 md:p-20 relative overflow-y-auto">
                                <button
                                    onClick={() => setSelectedAward(null)}
                                    className="absolute top-0 right-0 size-20 border-l-4 border-b-4 flex items-center justify-center transition-colors group"
                                    style={{
                                        borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                        backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                                    }}
                                >
                                    <X className="size-8 transition-transform group-hover:rotate-90" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                                </button>

                                <div className="flex flex-col gap-16">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <Trophy className="size-6" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            <span
                                                className="text-[11px] font-black uppercase tracking-[0.4em]"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                Award Dossier
                                            </span>
                                        </div>
                                        <h3
                                            className="text-5xl md:text-7xl font-black italic uppercase leading-[0.85] tracking-tighter"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            {selectedAward.name}
                                        </h3>
                                        <div className="h-[4px] w-24" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </div>

                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-px border-2"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                    >
                                        <div className="bg-white p-8 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                <Calendar className="size-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Date Awarded</span>
                                            </div>
                                            <span className="text-xl font-black italic uppercase tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                {selectedAward.details?.awarded_date ? new Date(selectedAward.details.awarded_date).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="bg-white p-8 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 mb-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                <MapPin className="size-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Location Code</span>
                                            </div>
                                            <span className="text-xl font-black italic uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                {selectedAward.details?.awarded_location ? `${selectedAward.details.awarded_location[0]}, ${selectedAward.details.awarded_location[1]}` : 'Remote Circuit'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <span className="text-[11px] font-black uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Contextual Brief</span>
                                        <p
                                            className="text-2xl md:text-3xl font-bold italic uppercase leading-tight border-l-8 pl-10"
                                            style={{
                                                color: DESIGN_SYSTEM.COLORS.ZINC[800],
                                                borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY[500]
                                            }}
                                        >
                                            {selectedAward.basics?.description || selectedAward.seo?.description || "High-performance milestone recorded in official circuit archives."}
                                        </p>
                                    </div>

                                    {selectedAward.alias && (
                                        <div
                                            className="pt-12 border-t-2 mt-auto"
                                            style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                        >
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Recognition Alias</span>
                                                <span className="text-2xl font-black italic uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>{selectedAward.alias}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}

function AwardEsportsCard({ award, onOpen }: { award: any; onOpen: () => void }) {
    const imageUrl = award.assets?.thumbnail?.url || award.assets?.candid?.url || `https://picsum.photos/seed/award_${award.id}/800/1000`;
    const year = award.details?.awarded_date ? new Date(award.details.awarded_date).getFullYear() : null;

    return (
        <div
            className="group relative bg-white border-2 overflow-hidden flex flex-col transition-all duration-500"
            style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                <img
                    src={imageUrl}
                    alt={award.name}
                    className="w-full h-full object-cover contrast-125 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:contrast-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-6 left-6">
                    <div
                        className="px-4 py-2 border-2 backdrop-blur-md"
                        style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}1A`, borderColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}33` }}
                    >
                        <span className="text-[12px] font-black text-white italic tabular-nums tracking-widest">
                            {year || 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-[3px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Verified Achievement</span>
                    </div>
                    <h3 className="text-3xl font-black italic uppercase text-white leading-none tracking-tighter">
                        {award.name}
                    </h3>
                </div>
            </div>

            <button
                onClick={onOpen}
                className="w-full py-6 px-8 flex items-center justify-between bg-white transition-colors duration-300 group-hover:bg-black"
            >
                <span
                    className="text-[11px] font-black uppercase tracking-[0.3em] transition-colors"
                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                >
                    View Dossier
                </span>
                <ExternalLink
                    className="size-5 transition-colors"
                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}
                />
            </button>

            <style jsx>{`
                button:hover span { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
                button:hover :global(svg) { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
                div:hover { border-color: ${DESIGN_SYSTEM.COLORS.BLACK.PURE} !important; }
            `}</style>
        </div>
    );
}