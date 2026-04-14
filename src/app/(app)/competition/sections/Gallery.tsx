'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Database,
    Hash,
    Info,
    X
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface LightboxGalleryProps {
    items: any[];
    title?: string;
    label?: string;
}

export default function LightboxGallery({
    items,
    title = "Gallery",
    label = "Visual Archives"
}: LightboxGalleryProps) {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const getData = (item: any) => ({
        id: item.id,
        name: item.name || item.basics?.name || 'UNTITLED_NODE',
        description: item.basics?.description || item.details?.notes || "No additional tactical data logged for this node.",
        status: item.details?.status || "OPERATIONAL",
        timestamp: item.details?.start_date ? new Date(item.details.start_date).toLocaleDateString() : 'N/A',
        code: item.basics?.identifiers?.code || item.code || "REF_ID",
        access: item.details?.access || "PUBLIC",
        thumbnail: (item.assets?.thumbnail as Media)?.url || (item.assets?.cover as Media)?.url || `https://picsum.photos/seed/${item.id}/600/600`,
        asset: (item.assets?.cover as Media)?.url || (item.assets?.poster as Media)?.url || `https://picsum.photos/seed/${item.id}/1600/900`
    });

    return (
        <section
            className="relative w-full py-24 bg-white border-b font-sans"
            style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC_100 }}
        >
            <div className="w-full px-6 md:px-20">
                <div className="flex flex-col gap-4 mb-20">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-[2px]"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            {label}
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-zinc-200 border-y border-zinc-200">
                    {items.map((item, idx) => {
                        const data = getData(item);
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedIdx(idx)}
                                className="relative aspect-square bg-white group cursor-crosshair overflow-hidden"
                            >
                                <Image
                                    src={data.thumbnail}
                                    alt={data.name}
                                    fill
                                    className="object-cover grayscale transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Hash size={10} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    <span className="text-[10px] font-black text-black">{(idx + 1).toString().padStart(2, '0')}</span>
                                </div>
                                <div
                                    className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                                    style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedIdx !== null && (
                    <Lightbox
                        data={getData(items[selectedIdx])}
                        onClose={() => setSelectedIdx(null)}
                        onPrev={() => setSelectedIdx(prev => prev !== null && prev > 0 ? prev - 1 : items.length - 1)}
                        onNext={() => setSelectedIdx(next => next !== null && next < items.length - 1 ? next + 1 : 0)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function Lightbox({ data, onClose, onPrev, onNext }: { data: any, onClose: () => void, onPrev: () => void, onNext: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-white/95 backdrop-blur-xl p-4 md:p-12"
        >
            <div
                className="w-full h-full flex flex-col relative border bg-white"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_200 }}
            >
                <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Database size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[12px] font-black text-black uppercase tracking-[0.4em]">{data.name}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <div className="size-1.5 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{data.status}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-black hover:text-primary transition-colors">
                        <X size={32} strokeWidth={3} />
                    </button>
                </div>

                <div className="relative flex-1 bg-zinc-50 flex items-center justify-center overflow-hidden">
                    <motion.div
                        key={data.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full max-h-[80vh]"
                    >
                        <Image
                            src={data.asset}
                            alt={data.name}
                            fill
                            className="object-contain px-4 md:px-20"
                            priority
                        />
                    </motion.div>

                    <button onClick={onPrev} className="absolute left-8 p-6 text-zinc-200 hover:text-black transition-colors z-50">
                        <ChevronLeft size={64} strokeWidth={1} />
                    </button>
                    <button onClick={onNext} className="absolute right-8 p-6 text-zinc-200 hover:text-black transition-colors z-50">
                        <ChevronRight size={64} strokeWidth={1} />
                    </button>
                </div>

                <div className="p-10 border-t border-zinc-100 flex flex-col md:flex-row gap-16 items-start justify-between bg-white">
                    <div className="flex-1 space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Info size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Operational Summary</span>
                            </div>
                            <p className="text-sm font-bold text-black uppercase italic tracking-tight leading-relaxed max-w-3xl">
                                {data.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 shrink-0 border-l border-zinc-100 pl-12">
                        <Metric label="TIMESTAMP" value={data.timestamp} />
                        <Metric label="UNIT CODE" value={data.code} />
                        <Metric label="PROTOCOL" value={data.access} />
                        <Metric label="ID INDEX" value={data.id.toString().padStart(4, '0')} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function Metric({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
            <span className="text-[11px] font-black text-black uppercase tabular-nums tracking-tighter">{value}</span>
        </div>
    );
}