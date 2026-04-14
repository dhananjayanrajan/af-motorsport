'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Calendar, ExternalLink, MapPin, Trophy, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

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
    }, [selectedAward]);

    if (awards.length === 0) return null;

    return (
        <section className="relative w-full py-24 bg-white overflow-hidden">
            <div className="mx-auto px-6 md:px-20 ">
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-2 border-l-2 border-zinc-900 pl-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                            Competitive Achievement Log
                        </span>
                        <h2 className="text-4xl font-black italic uppercase text-zinc-900">
                            Hall of <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Fame</span>
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
                            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-12 lg:inset-24 bg-white z-[101] shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-sm"
                        >
                            <div className="w-full md:w-1/2 h-64 md:h-full relative bg-zinc-100">
                                <img
                                    src={selectedAward.assets?.candid?.url || selectedAward.assets?.thumbnail?.url || `https://picsum.photos/seed/${selectedAward.id}/1200/1600`}
                                    className="w-full h-full object-cover"
                                    alt={selectedAward.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 flex flex-col gap-1">
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Victory Asset Archive</span>
                                    <span className="text-white font-black italic uppercase">Internal Reference_{selectedAward.id}</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col p-8 md:p-16 relative overflow-y-auto">
                                <button
                                    onClick={() => setSelectedAward(null)}
                                    className="absolute top-8 right-8 size-10 border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all"
                                >
                                    <X className="size-5" />
                                </button>

                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Trophy className="size-5 text-zinc-900" />
                                            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Award Dossier</span>
                                        </div>
                                        <h3 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter text-zinc-900">
                                            {selectedAward.name}
                                        </h3>
                                        <div className="h-1 w-20" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100">
                                        <div className="bg-white p-6 flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                                <Calendar className="size-3" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Date Awarded</span>
                                            </div>
                                            <span className="font-black italic text-zinc-900 uppercase">
                                                {selectedAward.details?.awarded_date ? new Date(selectedAward.details.awarded_date).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="bg-white p-6 flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                                <MapPin className="size-3" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Location Code</span>
                                            </div>
                                            <span className="font-black italic text-zinc-900 uppercase">
                                                {selectedAward.details?.awarded_location ? `${selectedAward.details.awarded_location[0]}, ${selectedAward.details.awarded_location[1]}` : 'Remote Circuit'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <span className="text-xs font-black uppercase text-zinc-400 tracking-[0.2em]">Contextual Brief</span>
                                        <p className="text-xl font-bold italic uppercase leading-tight text-zinc-800">
                                            {selectedAward.basics?.description || selectedAward.seo?.description || "High-performance milestone recorded in official circuit archives."}
                                        </p>
                                    </div>

                                    {selectedAward.alias && (
                                        <div className="pt-10 border-t border-zinc-100 mt-auto">
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Recognition Alias</span>
                                                    <span className="text-lg font-black italic uppercase text-zinc-900">{selectedAward.alias}</span>
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
    const cardRef = useRef(null);
    const imageUrl = award.assets?.thumbnail?.url || award.assets?.candid?.url || `https://picsum.photos/seed/award_${award.id}/800/1000`;
    const year = award.details?.awarded_date ? new Date(award.details.awarded_date).getFullYear() : null;

    return (
        <div
            ref={cardRef}
            className="group relative bg-white border border-zinc-200 overflow-hidden flex flex-col transition-all duration-500 hover:border-zinc-900"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                <img
                    src={imageUrl}
                    alt={award.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />

                <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="text-[10px] font-black text-white italic tracking-widest">
                            {year || 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter">Verified Achievement</span>
                    </div>
                    <h3 className="text-2xl font-black italic uppercase text-white leading-none tracking-tighter">
                        {award.name}
                    </h3>
                </div>
            </div>

            <button
                onClick={onOpen}
                className="w-full py-5 px-6 flex items-center justify-between bg-white group-hover:bg-zinc-900 transition-colors duration-300"
            >
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500 transition-colors">
                    View Dossier
                </span>
                <ExternalLink className="size-4 text-zinc-300 group-hover:text-white transition-colors" />
            </button>
        </div>
    );
}