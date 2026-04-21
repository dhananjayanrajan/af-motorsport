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

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

    return (
        <section
            className="relative w-full h-screen overflow-hidden select-none touch-none border-t"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100]
            }}
        >
            <style jsx global>{`
                .slab-hover:hover { border-color: ${DESIGN_SYSTEM.COLORS.BLACK.PURE} !important; }
                .control-btn:hover { background-color: ${DESIGN_SYSTEM.COLORS.ZINC[50]} !important; }
                .modal-close:hover { background-color: ${DESIGN_SYSTEM.COLORS.ZINC[50]} !important; }
            `}</style>

            <motion.div
                drag
                dragMomentum={true}
                style={{ x: springX, y: springY, scale: zoom }}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-move"
            >
                <div
                    className="absolute inset-0 w-[5000px] h-[5000px] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(${DESIGN_SYSTEM.COLORS.ZINC[300]} 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
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
                            className="absolute flex flex-col items-center justify-center p-12 border-2 border-dashed text-center"
                            style={{
                                borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                width: 400
                            }}
                        >
                            <FileSearch size={48} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} className="mb-4" />
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
                    className="p-8 border-l-4 pointer-events-auto shadow-2xl"
                    style={{
                        backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                        borderLeftColor: DESIGN_SYSTEM.COLORS.BLACK.PURE
                    }}
                >
                    <h2
                        className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none transition-colors"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Celebrations
                    </h2>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-auto md:top-10 md:right-10 md:left-auto md:translate-x-0 z-[100] flex gap-2">
                {[
                    { icon: ZoomIn, action: () => setZoom(z => Math.min(z + 0.1, 2)) },
                    { icon: ZoomOut, action: () => setZoom(z => Math.max(z - 0.1, 0.4)) },
                    { icon: Globe, action: () => { canvasX.set(0); canvasY.set(0); setZoom(isMobile ? 0.6 : 0.8); } }
                ].map((ctrl, i) => (
                    <button
                        key={i}
                        onClick={ctrl.action}
                        className="control-btn size-14 border-2 flex items-center justify-center transition-all active:scale-95 shadow-xl"
                        style={{
                            backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                            borderColor: DESIGN_SYSTEM.COLORS.ZINC[100]
                        }}
                    >
                        <ctrl.icon size={20} style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                    </button>
                ))}
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

function CelebrationSlab({ item, isMobile, onExpand }: { item: Celebration, index: number, isMobile: boolean, onExpand: () => void }) {
    const initialX = useMemo(() => (Math.random() - 0.5) * (isMobile ? 600 : 1400), [isMobile]);
    const initialY = useMemo(() => (Math.random() - 0.5) * (isMobile ? 1000 : 800), [isMobile]);
    const rotation = useMemo(() => (Math.random() - 0.5) * 6, []);
    const imageUrl = (item.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${item.id}/800/500`;

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ x: initialX, y: initialY, opacity: 0, rotate: rotation }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05, zIndex: 1000, rotate: 0 }}
            onClick={onExpand}
            className="slab-hover absolute w-[340px] p-1 border-2 bg-white cursor-pointer shadow-2xl transition-all duration-300"
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
                    className="object-cover hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                />
                <div
                    className="absolute bottom-0 right-0 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                >
                    {item.details?.exclusivity || 'Standard'}
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="space-y-1">
                    <h4
                        className="text-2xl font-black italic uppercase tracking-tighter leading-[0.9]"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        {item.name}
                    </h4>
                </div>
                <div className="flex justify-between items-center border-t pt-4" style={{ borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                        <Calendar size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        {item.details?.date_time ? new Date(item.details.date_time).getFullYear() : new Date(item.createdAt).getFullYear()}
                    </div>
                    <Maximize2 size={12} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }} />
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
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 backdrop-blur-3xl"
            style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}F2` }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-7xl h-fit max-h-[90vh] flex flex-col md:flex-row border-4 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.1)]"
                style={{
                    borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                    backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="modal-close absolute top-0 right-0 z-[2100] flex items-center justify-center size-20 transition-colors border-l-4 border-b-4"
                    style={{
                        borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                        color: DESIGN_SYSTEM.COLORS.BLACK.PURE
                    }}
                >
                    <X size={32} strokeWidth={4} />
                </button>

                <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto bg-zinc-50 border-b-4 md:border-b-0 md:border-r-4" style={{ borderColor: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                    <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover contrast-125 transition-all duration-700 hover:grayscale-0 hover:contrast-100"
                        priority
                    />
                </div>

                <div className="flex-1 p-10 md:p-20 flex flex-col justify-between">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[3px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                <span className="text-[12px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                    {item.alias || 'Tactical_Archive_Entry'}
                                </span>
                            </div>
                            <h3
                                className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8]"
                                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                            >
                                {item.name}
                            </h3>
                        </div>

                        <div className="space-y-10">
                            <p
                                className="text-lg font-bold uppercase leading-tight border-l-8 pl-10 italic"
                                style={{
                                    borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                    color: DESIGN_SYSTEM.COLORS.ZINC[800]
                                }}
                            >
                                {item.basics?.description || 'No operational description logged for this entry.'}
                            </p>

                            <div className="grid grid-cols-2 gap-px border-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                <div className="p-8 bg-white flex flex-col gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Clearance_Level</span>
                                    <span className="text-[13px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>{item.details?.exclusivity || 'PUBLIC'}</span>
                                </div>
                                <div className="p-8 bg-white flex flex-col gap-2 text-right">
                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Timestamp_Sync</span>
                                    <span className="text-[13px] font-black uppercase tabular-nums" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                        {item.details?.date_time ? new Date(item.details.date_time).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
                        <ClippedButton
                            label="INITIALIZE FULL REPORT"
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-fit"
                            onClick={() => onNavigate(item.slug || '')}
                        />
                        <div className="hidden sm:flex items-center gap-3 px-8">
                            <div className="size-2 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Protocol_v.4.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}