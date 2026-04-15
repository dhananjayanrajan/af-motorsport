'use client';

import { ClippedButton } from '@/components/Clipped/ClippedButton';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Celebration, Media } from '@/payload-types';
import { cn } from '@/utilities/cn';
import {
    Calendar,
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
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BACKGROUND, borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
        >
            <motion.div
                drag
                dragMomentum={true}
                style={{ x: springX, y: springY, scale: zoom }}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-move"
            >
                <div
                    className="absolute inset-0 w-[5000px] h-[5000px] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(${DESIGN_SYSTEM.COLORS.ZINC[300]} 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
                />

                <AnimatePresence>
                    {data.map((item, idx) => (
                        <CelebrationSlab
                            key={item.id}
                            item={item}
                            index={idx}
                            isMobile={isMobile}
                            onExpand={() => setSelectedId(item.slug || null)}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            <div className="absolute top-10 left-10 z-[100] pointer-events-none">
                <div
                    className="p-6 border-l-4 pointer-events-auto bg-white"
                    style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY, boxShadow: '10px 10px 0px rgba(0,0,0,0.05)' }}
                >
                    <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase text-black leading-[0.9]">
                        Archive
                    </h2>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-auto md:top-10 md:right-10 md:left-auto md:translate-x-0 z-[100] flex gap-2">
                <button
                    onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
                    className="size-12 border flex items-center justify-center bg-white transition-colors hover:bg-zinc-50"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                ><ZoomIn size={18} className="text-black" /></button>
                <button
                    onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))}
                    className="size-12 border flex items-center justify-center bg-white transition-colors hover:bg-zinc-50"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                ><ZoomOut size={18} className="text-black" /></button>
                <button
                    onClick={() => { canvasX.set(0); canvasY.set(0); setZoom(isMobile ? 0.6 : 0.8); }}
                    className="size-12 border flex items-center justify-center bg-white transition-colors hover:bg-zinc-50"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                ><Globe size={18} className="text-black" /></button>
            </div>

            <AnimatePresence>
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
            whileHover={{ scale: 1.02, zIndex: 1000 }}
            onClick={() => onExpand()}
            className="absolute w-[300px] p-1 border bg-white cursor-pointer shadow-xl transition-shadow hover:shadow-2xl"
            style={{
                borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
            }}
        >
            <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div
                    className="absolute bottom-0 right-0 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, color: DESIGN_SYSTEM.COLORS.BLACK }}
                >
                    {item.details?.exclusivity || 'Public'}
                </div>
            </div>

            <div className="p-5 space-y-4">
                <h4 className="text-base font-black italic text-black uppercase tracking-tight leading-tight">
                    {item.name}
                </h4>
                <div className="flex justify-between items-center border-t pt-4" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 font-bold uppercase">
                        <Calendar size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        {item.details?.date_time ? new Date(item.details.date_time).getFullYear() : new Date(item.createdAt).getFullYear()}
                    </div>
                    <Maximize2 size={14} className="text-zinc-400" />
                </div>
            </div>
        </motion.div>
    );
}

function CelebrationModal({ item, onClose, onNavigate }: { item: Celebration, onClose: () => void, onNavigate: (slug: string) => void }) {
    const imageUrl = (item.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${item.id}/1200/800`;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 bg-white/90 backdrop-blur-xl"
        >
            <div
                className="w-full max-w-6xl h-fit max-h-[90vh] flex flex-col md:flex-row bg-white border shadow-2xl relative overflow-hidden"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-black hover:bg-zinc-100 rounded-full z-[2100] transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto bg-zinc-100 border-b md:border-b-0 md:border-r" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                    <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-white">
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <span
                                className={cn("text-xs font-black uppercase tracking-wider", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}
                                style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                {item.alias || 'Entry'}
                            </span>
                            <h3 className="text-4xl md:text-5xl font-black italic text-black uppercase tracking-tighter leading-[0.9]">
                                {item.name}
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <p
                                className="text-zinc-700 text-base md:text-lg font-medium leading-relaxed border-l-4 pl-6"
                                style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                            >
                                {item.basics?.description}
                            </p>

                            <div className="grid grid-cols-2 gap-6 border-t border-zinc-100 pt-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black text-zinc-500 uppercase tracking-wide">Access</span>
                                    <span className="text-sm font-bold text-black uppercase">{item.details?.exclusivity}</span>
                                </div>
                                <div className="flex flex-col gap-1 text-right">
                                    <span className="text-xs font-black text-zinc-500 uppercase tracking-wide">Timestamp</span>
                                    <span className="text-sm font-bold text-black tabular-nums">
                                        {item.details?.date_time ? new Date(item.details.date_time).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <ClippedButton
                            label="View Report"
                            variant="primary"
                            size="lg"
                            className="w-full md:w-fit"
                            onClick={() => onNavigate(item.slug || '')}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}