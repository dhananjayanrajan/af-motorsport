'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Database,
    Info,
    LayoutGrid,
    X
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface HomeGalleryProps {
    items: any[];
}

export default function HomeGallery({ items }: HomeGalleryProps) {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const displayItems = items.slice(0, 12);

    const getData = (item: any) => ({
        id: item.id,
        name: item.name || item.basics?.name || 'Asset Unnamed',
        description: item.basics?.description || item.details?.notes || "System record without detailed annotation.",
        status: item.details?.status || "Active",
        timestamp: item.details?.start_date ? new Date(item.details.start_date).toLocaleDateString('en-GB') : '--/--/--',
        code: item.basics?.identifiers?.code || item.code || "REF-00",
        access: item.details?.access || "L1-Standard",
        thumbnail: (item.assets?.thumbnail as Media)?.url || (item.assets?.cover as Media)?.url || `https://picsum.photos/seed/${item.id}/600/600`,
        asset: (item.assets?.cover as Media)?.url || (item.assets?.poster as Media)?.url || `https://picsum.photos/seed/${item.id}/1600/900`
    });

    return (
        <section className="relative w-full py-24 md:py-40 bg-white overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-0 right-1/3 w-px h-full bg-zinc-900" />
                <div className="absolute bottom-1/4 left-0 w-full h-px bg-zinc-900" />
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
                <div className="flex flex-col mb-16 md:mb-24">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <LayoutGrid size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className={`text-[10px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>Visual Archive</span>
                    </motion.div>
                    <motion.h2
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter leading-none"
                    >
                        <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Gallery</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-zinc-200 border border-zinc-200 shadow-2xl">
                    {displayItems.map((item, idx) => {
                        const data = getData(item);
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: idx * 0.03 }}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                onClick={() => setSelectedIdx(idx)}
                                className="relative aspect-square bg-white group cursor-pointer overflow-hidden"
                            >
                                <Image
                                    src={data.thumbnail}
                                    alt={data.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                                <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />

                                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <p className="text-[8px] font-black text-primary-400 uppercase tracking-widest mb-1">{data.code}</p>
                                    <p className="text-[10px] font-black text-white uppercase italic leading-none truncate">{data.name}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedIdx !== null && (
                    <Lightbox
                        data={getData(displayItems[selectedIdx])}
                        total={displayItems.length}
                        current={selectedIdx}
                        onClose={() => setSelectedIdx(null)}
                        onPrev={() => setSelectedIdx(prev => prev !== null && prev > 0 ? prev - 1 : displayItems.length - 1)}
                        onNext={() => setSelectedIdx(next => next !== null && next < displayItems.length - 1 ? next + 1 : 0)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function Lightbox({ data, total, current, onClose, onPrev, onNext }: { data: any, total: number, current: number, onClose: () => void, onPrev: () => void, onNext: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-black/95"
        >
            <div className="relative w-full h-full max-w-[1600px] flex flex-col bg-white overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b-2 border-zinc-100">
                    <div className="flex items-center gap-4">
                        <div className="size-10 flex items-center justify-center bg-black">
                            <Database size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase italic text-black leading-none">{data.name}</h3>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Asset Trace: {data.code}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-xs font-black italic tabular-nums text-zinc-300">[{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}]</span>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-100 transition-colors">
                            <X size={24} className="text-black" />
                        </button>
                    </div>
                </div>

                <div className="relative flex-1 bg-zinc-50 group overflow-hidden">
                    <motion.div key={data.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full h-full">
                        <Image src={data.asset} alt={data.name} fill className="object-contain p-4 md:p-12" priority />
                    </motion.div>

                    <button onClick={onPrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/90 hover:bg-black hover:text-white border-2 border-black transition-all">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={onNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/90 hover:bg-black hover:text-white border-2 border-black transition-all">
                        <ChevronRight size={32} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 border-t-2 border-black">
                    <div className="md:col-span-8 p-8 md:p-10 space-y-4">
                        <div className="flex items-center gap-2">
                            <Info size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Archival Log</span>
                        </div>
                        <p className="text-sm md:text-base font-bold uppercase italic text-black leading-snug max-w-3xl">
                            {data.description}
                        </p>
                    </div>
                    <div className="md:col-span-4 p-8 md:p-10 bg-black grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Timestamp</p>
                            <p className="text-xs font-black text-white italic">{data.timestamp}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Access Level</p>
                            <p className="text-xs font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>{data.access}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Status</p>
                            <p className="text-xs font-black text-white italic">{data.status}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Object ID</p>
                            <p className="text-xs font-black text-white italic">#{data.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}