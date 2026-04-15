'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Media } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Database,
    Info,
    Maximize2,
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
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const getData = (item: any) => ({
        id: item.id,
        name: item.name || item.basics?.name || 'Untitled',
        description: item.basics?.description || item.details?.notes || "No additional information available.",
        status: item.details?.status || "Active",
        timestamp: item.details?.start_date ? new Date(item.details.start_date).toLocaleDateString() : 'N/A',
        code: item.basics?.identifiers?.code || item.code || "REF",
        access: item.details?.access || "Public",
        thumbnail: (item.assets?.thumbnail as Media)?.url || (item.assets?.cover as Media)?.url || `https://picsum.photos/seed/${item.id}/600/600`,
        asset: (item.assets?.cover as Media)?.url || (item.assets?.poster as Media)?.url || `https://picsum.photos/seed/${item.id}/1600/900`
    });

    return (
        <section
            className="relative w-full py-24 border-b font-sans overflow-hidden"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[100]
            }}
        >
            {/* Animated background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-[100px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-[100px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.SECONDARY[500] }} />
            </div>

            <div className="w-full px-6 md:px-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-4 mb-16"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-[2px]"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                            {label}
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                        {title}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {items.map((item, idx) => {
                        const data = getData(item);
                        const isHovered = hoveredIdx === idx;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                onClick={() => setSelectedIdx(idx)}
                                className="relative group cursor-pointer"
                            >
                                <motion.div
                                    className="relative aspect-square overflow-hidden"
                                    animate={{ scale: isHovered ? 1.02 : 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={data.thumbnail}
                                        alt={data.name}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110"
                                    />

                                    {/* Gradient overlay */}
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(to top, ${DESIGN_SYSTEM.COLORS.BLACK[600]} 0%, transparent 50%)`,
                                            opacity: isHovered ? 0.8 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Content overlay */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 p-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-wider text-white/60">#{String(idx + 1).padStart(2, '0')}</p>
                                        <p className="text-sm font-black uppercase italic text-white mt-1 line-clamp-2">{data.name}</p>
                                    </motion.div>

                                    {/* Border accent */}
                                    <motion.div
                                        className="absolute inset-0 border-2"
                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: isHovered ? 1 : 0.9, opacity: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedIdx !== null && (
                    <Lightbox
                        data={getData(items[selectedIdx])}
                        total={items.length}
                        current={selectedIdx}
                        onClose={() => setSelectedIdx(null)}
                        onPrev={() => setSelectedIdx(prev => prev !== null && prev > 0 ? prev - 1 : items.length - 1)}
                        onNext={() => setSelectedIdx(next => next !== null && next < items.length - 1 ? next + 1 : 0)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function Lightbox({ data, total, current, onClose, onPrev, onNext }: { data: any, total: number, current: number, onClose: () => void, onPrev: () => void, onNext: () => void }) {
    const [isImageHovered, setIsImageHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center"
            style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}E6` }}
        >
            <motion.div
                className="relative w-full h-full flex flex-col max-w-[90vw] max-h-[90vh]"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Header */}
                <div className="px-8 py-6 flex items-center justify-between border-b" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[800] }}>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                <Database size={14} style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-tight" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>{data.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>{data.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                        <button
                            onClick={onClose}
                            className="p-2 transition-all hover:scale-110"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            <X size={20} strokeWidth={2} />
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div
                    className="relative flex-1 flex items-center justify-center overflow-hidden"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                >
                    <motion.div
                        key={data.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={data.asset}
                            alt={data.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    {/* Navigation buttons */}
                    <motion.button
                        onClick={onPrev}
                        className="absolute left-8 p-4 rounded-full transition-all"
                        style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}80`, color: DESIGN_SYSTEM.COLORS.WHITE[50] }}
                        whileHover={{ scale: 1.1, x: -5 }}
                        animate={{ opacity: isImageHovered ? 1 : 0.5 }}
                    >
                        <ChevronLeft size={32} strokeWidth={1.5} />
                    </motion.button>

                    <motion.button
                        onClick={onNext}
                        className="absolute right-8 p-4 rounded-full transition-all"
                        style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}80`, color: DESIGN_SYSTEM.COLORS.WHITE[50] }}
                        whileHover={{ scale: 1.1, x: 5 }}
                        animate={{ opacity: isImageHovered ? 1 : 0.5 }}
                    >
                        <ChevronRight size={32} strokeWidth={1.5} />
                    </motion.button>

                    {/* Expand hint */}
                    <motion.div
                        className="absolute bottom-8 right-8 flex items-center gap-2 px-3 py-2 rounded backdrop-blur-md"
                        style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}80` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isImageHovered ? 1 : 0 }}
                    >
                        <Maximize2 size={12} style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }} />
                        <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>Full Screen</span>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[800], backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[700] }}>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Info size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Description</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}>
                            {data.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <p className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>Date</p>
                            <p className="text-[10px] font-bold uppercase" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>{data.timestamp}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>Code</p>
                            <p className="text-[10px] font-bold uppercase font-mono" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>{data.code}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>Access</p>
                            <p className="text-[10px] font-bold uppercase" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>{data.access}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[7px] font-black uppercase tracking-wider" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>ID</p>
                            <p className="text-[10px] font-bold font-mono" style={{ color: DESIGN_SYSTEM.COLORS.WHITE[50] }}>#{String(data.id).padStart(4, '0')}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}