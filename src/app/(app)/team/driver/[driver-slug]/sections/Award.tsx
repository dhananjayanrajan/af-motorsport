'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Calendar, ExternalLink, MapPin, Trophy, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface AwardSectionProps {
    driver: any;
}

export default function AwardSection({ driver }: AwardSectionProps) {
    const [selectedAward, setSelectedAward] = useState<any>(null);

    const awards = (driver.details?.awards || [])
        .map((award: any) => (typeof award === 'object' ? award : null))
        .filter(Boolean);

    useEffect(() => {
        if (selectedAward) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedAward]);

    if (awards.length === 0) return null;

    return (
        <section
            className="relative w-full py-24 overflow-hidden select-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div className="mx-auto px-6 md:px-20">
                <div className="flex flex-col gap-16">
                    <div
                        className="flex flex-col gap-4 border-l-4 pl-8"
                        style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        <span
                            className="text-[10px] font-black uppercase tracking-[0.3em]"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            Competitive Achievement Log
                        </span>
                        <h2
                            className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none transition-colors"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                        >
                            Hall of <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Fame</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8">
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
                            className="fixed inset-0 backdrop-blur-md z-[100]"
                            style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK.PURE}99` }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-12 lg:inset-24 z-[101] shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-sm"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                border: `2px solid ${DESIGN_SYSTEM.COLORS.BLACK.PURE}`
                            }}
                        >
                            <style jsx>{`
                                .close-btn:hover { background-color: ${DESIGN_SYSTEM.COLORS.BLACK.PURE} !important; }
                                .close-btn:hover .close-icon { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
                            `}</style>
                            <div
                                className="w-full md:w-1/2 h-64 md:h-full relative"
                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                            >
                                <img
                                    src={selectedAward.assets?.candid?.url || selectedAward.assets?.thumbnail?.url || `https://picsum.photos/seed/${selectedAward.id}/1200/1600`}
                                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 hover:grayscale-0"
                                    alt={selectedAward.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 flex flex-col gap-1">
                                    <span
                                        className="text-xs font-black uppercase tracking-widest"
                                        style={{ color: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}99` }}
                                    >
                                        Victory Asset Archive
                                    </span>
                                    <span
                                        className="font-black italic uppercase"
                                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                    >
                                        Internal Reference_{selectedAward.id}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col p-8 md:p-16 relative overflow-y-auto">
                                <button
                                    onClick={() => setSelectedAward(null)}
                                    className={`close-btn absolute top-8 right-8 size-12 border-2 flex items-center justify-center transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_BASE}`}
                                    style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                >
                                    <X
                                        className="close-icon size-6 transition-colors"
                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                    />
                                </button>

                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Trophy className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                                            <span
                                                className="text-[11px] font-black uppercase tracking-widest"
                                                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                            >
                                                Award Dossier
                                            </span>
                                        </div>
                                        <h3
                                            className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter"
                                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                        >
                                            {selectedAward.name}
                                        </h3>
                                        <div className="h-1 w-20" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </div>

                                    <div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-px"
                                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100], border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[100]}` }}
                                    >
                                        <div
                                            className="p-6 flex flex-col gap-1 transition-colors hover:bg-zinc-50"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                                <span
                                                    className="text-[10px] font-black uppercase tracking-wider"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                                >
                                                    Date Awarded
                                                </span>
                                            </div>
                                            <span
                                                className="font-black italic uppercase"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                {selectedAward.details?.awarded_date ? new Date(selectedAward.details.awarded_date).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div
                                            className="p-6 flex flex-col gap-1 transition-colors hover:bg-zinc-50"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <MapPin className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                                <span
                                                    className="text-[10px] font-black uppercase tracking-wider"
                                                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                                >
                                                    Location Code
                                                </span>
                                            </div>
                                            <span
                                                className="font-black italic uppercase"
                                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                            >
                                                {selectedAward.details?.awarded_location ? `${selectedAward.details.awarded_location[0]}, ${selectedAward.details.awarded_location[1]}` : 'Remote Circuit'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <span
                                            className="text-xs font-black uppercase tracking-[0.2em]"
                                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                        >
                                            Contextual Brief
                                        </span>
                                        <p
                                            className="text-xl font-bold italic uppercase leading-tight"
                                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[800] }}
                                        >
                                            {selectedAward.basics?.description || selectedAward.seo?.description || "High-performance milestone recorded in official circuit archives."}
                                        </p>
                                    </div>

                                    {selectedAward.alias && (
                                        <div
                                            className="pt-10 border-t mt-auto"
                                            style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col">
                                                    <span
                                                        className="text-[10px] font-black uppercase tracking-widest"
                                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                                    >
                                                        Recognition Alias
                                                    </span>
                                                    <span
                                                        className="text-lg font-black italic uppercase transition-colors"
                                                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                                                    >
                                                        {selectedAward.alias}
                                                    </span>
                                                </div>
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
            className="group relative border-2 overflow-hidden flex flex-col transition-all duration-500 pointer-events-auto"
            style={{
                borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
            }}
        >
            <style jsx>{`
                .group:hover { border-color: ${DESIGN_SYSTEM.COLORS.BLACK.PURE} !important; }
                .dossier-btn:hover { background-color: ${DESIGN_SYSTEM.COLORS.BLACK.PURE} !important; }
                .dossier-btn:hover .btn-label { color: ${DESIGN_SYSTEM.COLORS.ZINC[500]} !important; }
                .dossier-btn:hover .btn-icon { color: ${DESIGN_SYSTEM.COLORS.WHITE.PURE} !important; }
            `}</style>

            <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
            >
                <img
                    src={imageUrl}
                    alt={award.name}
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                    <div
                        className="px-3 py-1 backdrop-blur-md border"
                        style={{
                            backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}1A`,
                            borderColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}33`
                        }}
                    >
                        <span
                            className="text-[10px] font-black italic tracking-widest"
                            style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                        >
                            {year || 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span
                            className="text-[10px] font-black uppercase tracking-tighter"
                            style={{ color: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}99` }}
                        >
                            Verified Achievement
                        </span>
                    </div>
                    <h3
                        className="text-2xl font-black italic uppercase leading-none tracking-tighter"
                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                    >
                        {award.name}
                    </h3>
                </div>
            </div>

            <button
                onClick={onOpen}
                className={`dossier-btn w-full py-5 px-6 flex items-center justify-between transition-all duration-300`}
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
            >
                <span
                    className="btn-label text-[10px] font-black uppercase tracking-widest transition-colors"
                    style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                >
                    View Dossier
                </span>
                <ExternalLink className="btn-icon size-4 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }} />
            </button>
        </div>
    );
}