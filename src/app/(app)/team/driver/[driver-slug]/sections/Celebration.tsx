// sections/Celebration.tsx
'use client';

import { ClippedButton } from '@/components/Clipped/ClippedButton';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Celebration, Media } from '@/payload-types';
import {
    Calendar,
    FileSearch,
    Globe,
    Maximize2,
    X,
    ZoomIn,
    ZoomOut
} from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function CelebrationsSection({ data }: { data: Celebration[] }) {
    const [zoom, setZoom] = useState(0.8);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) setZoom(0.6);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const canvasX = useMotionValue(0);
    const canvasY = useMotionValue(0);
    const springX = useSpring(canvasX, { stiffness: 60, damping: 20 });
    const springY = useSpring(canvasY, { stiffness: 60, damping: 20 });

    return (
        <section
            className="relative w-full h-screen overflow-hidden select-none border-t touch-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND, borderTopColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
        >
            <motion.div
                drag
                dragMomentum={true}
                style={{ x: springX, y: springY, scale: zoom }}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-move"
            >
                <div
                    className="absolute inset-0 w-[5000px] h-[5000px] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(${DESIGN_SYSTEM.COLORS.ZINC_300} 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
                />

                <AnimatePresence>
                    {data.length > 0 ? (
                        data.map((item, idx) => (
                            <CelebrationSlab
                                key={item.id}
                                item={item}
                                index={idx}
                                isMobile={isMobile}
                                onExpand={() => setSelectedId(item.slug || null)}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute flex flex-col items-center justify-center p-12 border border-dashed text-center bg-white/50 backdrop-blur-sm"
                            style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED, width: 400 }}
                        >
                            <FileSearch size={48} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} className="mb-4" />
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-black mb-1">
                                No Archives Located
                            </h3>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                The celebration registry is currently empty.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="absolute top-10 left-10 z-[100] pointer-events-none">
                <div
                    className="p-8 border-l-4 pointer-events-auto bg-white"
                    style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: '10px 10px 0px rgba(0,0,0,0.05)' }}
                >
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-black leading-[0.85]">
                        Archive
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Tactical_Visual_Nodes</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-auto md:top-10 md:right-10 md:left-auto md:translate-x-0 z-[100] flex gap-2">
                <button
                    onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
                    className="size-14 border flex items-center justify-center bg-white transition-all hover:bg-zinc-50 active:scale-95 shadow-sm"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
                ><ZoomIn size={20} className="text-black" /></button>
                <button
                    onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))}
                    className="size-14 border flex items-center justify-center bg-white transition-all hover:bg-zinc-50 active:scale-95 shadow-sm"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
                ><ZoomOut size={20} className="text-black" /></button>
                <button
                    onClick={() => { canvasX.set(0); canvasY.set(0); setZoom(isMobile ? 0.6 : 0.8); }}
                    className="size-14 border flex items-center justify-center bg-white transition-all hover:bg-zinc-50 active:scale-95 shadow-sm"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
                ><Globe size={20} className="text-black" /></button>
            </div>

            <AnimatePresence mode="wait">
                {selectedId && (
                    <CelebrationModal
                        item={data.find(d => d.slug === selectedId) as Celebration}
                        onClose={() => setSelectedId(null)}
                        onNavigate={(slug) => router.push(`/celebrations/${slug}`)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function CelebrationSlab({ item, index, isMobile, onExpand }: { item: Celebration, index: number, isMobile: boolean, onExpand: () => void }) {
    const initialX = useMemo(() => (Math.random() - 0.5) * (isMobile ? 600 : 1400), [isMobile]);
    const initialY = useMemo(() => (Math.random() - 0.5) * (isMobile ? 1000 : 800), [isMobile]);
    const rotation = useMemo(() => (Math.random() - 0.5) * 4, []);
    const imageUrl = (item.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${item.id}/800/500`;

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ x: initialX, y: initialY, opacity: 0, rotate: rotation }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05, zIndex: 1000, rotate: 0 }}
            onClick={() => onExpand()}
            className="absolute w-[320px] p-1 border bg-white cursor-pointer shadow-xl transition-all duration-300"
            style={{
                borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED,
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
            }}
        >
            <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                />
                <div
                    className="absolute bottom-0 right-0 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, color: DESIGN_SYSTEM.COLORS.BLACK }}
                >
                    {item.details?.exclusivity || 'Standard'}
                </div>
            </div>

            <div className="p-6 space-y-4 bg-white">
                <div className="space-y-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Entry_Node_{item.id}</span>
                    <h4 className="text-xl font-black italic text-black uppercase tracking-tighter leading-[0.9]">
                        {item.name}
                    </h4>
                </div>
                <div className="flex justify-between items-center border-t pt-4" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                    <div className="flex items-center gap-2 text-[10px] text-black font-black uppercase tracking-tighter">
                        <Calendar size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        {item.details?.date_time ? new Date(item.details.date_time).getFullYear() : new Date(item.createdAt).getFullYear()}
                    </div>
                    <Maximize2 size={12} className="text-zinc-400" />
                </div>
            </div>
        </motion.div>
    );
}

function CelebrationModal({ item, onClose, onNavigate }: { item: Celebration, onClose: () => void, onNavigate: (slug: string) => void }) {
    if (!item) return null;
    const imageUrl = (item.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${item.id}/1200/800`;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 bg-white/95 backdrop-blur-2xl"
            onClick={onClose}
        >
            <div
                className="w-full max-w-7xl h-fit max-h-[90vh] flex flex-col md:flex-row bg-white border overflow-hidden relative"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 z-[2100] flex items-center justify-center size-16 transition-colors hover:bg-zinc-100 border-l border-b"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED, color: DESIGN_SYSTEM.COLORS.BLACK }}
                >
                    <X size={32} strokeWidth={3} />
                </button>

                <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto bg-zinc-50 border-b md:border-b-0 md:border-r" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                    <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        priority
                    />
                </div>

                <div className="flex-1 p-10 md:p-16 flex flex-col justify-between bg-white">
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[2px] w-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                <span className="text-[11px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                    {item.alias || 'Tactical_Archive_Entry'}
                                </span>
                            </div>
                            <h3 className="text-5xl md:text-7xl font-black italic text-black uppercase tracking-tighter leading-[0.85]">
                                {item.name}
                            </h3>
                        </div>

                        <div className="space-y-8">
                            <p className="text-black text-sm md:text-base font-black uppercase leading-relaxed border-l-4 pl-8 italic"
                                style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                {item.basics?.description || 'No operational description logged for this entry.'}
                            </p>

                            <div className="grid grid-cols-2 gap-px bg-zinc-100 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                                <div className="p-6 bg-white flex flex-col gap-1.5">
                                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Clearance_Level</span>
                                    <span className="text-[11px] font-black text-black uppercase">{item.details?.exclusivity || 'PUBLIC'}</span>
                                </div>
                                <div className="p-6 bg-white flex flex-col gap-1.5 text-right">
                                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Timestamp_Sync</span>
                                    <span className="text-[11px] font-black text-black uppercase tabular-nums">
                                        {item.details?.date_time ? new Date(item.details.date_time).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                        <ClippedButton
                            label="INITIALIZE FULL REPORT"
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-fit"
                            onClick={() => onNavigate(item.slug || '')}
                        />
                        <div className="hidden sm:flex items-center gap-2 px-6">
                            <div className="size-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.3em]">Protocol_v.4.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}