'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Championship, Media } from '@/payload-types';
import { ArrowRight, Check, Download, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

interface ChampionshipDocumentsProps {
    championship: Championship;
}

export default function ChampionshipDocuments({ championship }: ChampionshipDocumentsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
    const [downloadedIds, setDownloadedIds] = useState<Set<number>>(new Set());

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    });

    const scrollScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
    const scrollRotate = useTransform(scrollYProgress, [0, 0.3], [0, -5]);
    const smoothScale = useSpring(scrollScale, { stiffness: 100, damping: 30 });
    const smoothRotate = useSpring(scrollRotate, { stiffness: 100, damping: 30 });

    const mockDocuments: Media[] = [
        {
            id: 101,
            alt: 'Technical Regulations v2.4',
            filename: 'tech_regs_2026.pdf',
            mimeType: 'application/pdf',
            filesize: 2400000,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            id: 102,
            alt: 'Sporting Code & Ethics',
            filename: 'sporting_code.pdf',
            mimeType: 'application/pdf',
            filesize: 1200000,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            id: 103,
            alt: 'Circuit Safety Protocol',
            filename: 'safety_guide.pdf',
            mimeType: 'application/pdf',
            filesize: 4500000,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        }
    ];

    const documents = (championship.assets?.documents?.length ? championship.assets.documents : mockDocuments) as Media[];

    const handleDownload = (id: number, url: string | null) => {
        if (downloadedIds.has(id) || downloadingId) return;
        setDownloadingId(id);
        setTimeout(() => {
            setDownloadingId(null);
            setDownloadedIds(prev => new Set(prev).add(id));
            if (url) window.open(url, '_blank');
        }, 3000);
    };

    return (
        <section ref={sectionRef} style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }} className="w-full py-16 md:py-24 border-t border-zinc-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center mb-40">
                    <div
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        className="w-px h-16 mb-8"
                    />
                    <h3 style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} className={`text-[11px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL} flex items-center gap-4`}>
                        <ShieldCheck size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        System Dossier Archive
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {documents.map((doc, idx) => {
                        const isDownloading = downloadingId === doc.id;
                        const isDownloaded = downloadedIds.has(doc.id);

                        return (
                            <div key={doc.id} className="group perspective-2000">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15, duration: 0.8 }}
                                    className="relative preserve-3d h-full origin-center"
                                    style={{ scale: smoothScale, rotateX: smoothRotate }}
                                >
                                    <div
                                        onClick={() => handleDownload(doc.id, doc.url || null)}
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                            borderColor: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200],
                                            clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)"
                                        }}
                                        className="relative cursor-pointer flex flex-col p-12 border-[1px] aspect-[1/1.4] transition-all duration-700 ease-[0.23,1,0.32,1] shadow-inner"
                                    >
                                        <div className="flex justify-between items-start mb-20 border-b border-zinc-100 pb-8">
                                            <div className="flex flex-col gap-1">
                                                <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} className="text-[7px] font-black uppercase tracking-widest">Classification</span>
                                                <span style={{ color: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK.PURE }} className="text-[9px] font-black uppercase">
                                                    {isDownloaded ? 'Verified // Internal' : 'Restricted // 2026'}
                                                </span>
                                            </div>
                                            <div className="h-8 w-8 flex items-center justify-center">
                                                {isDownloading ? (
                                                    <Loader2 size={16} className="animate-spin text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                ) : isDownloaded ? (
                                                    <Check size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                ) : (
                                                    <Download size={16} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }} />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-6 flex-grow">
                                            <div className="flex items-center gap-3">
                                                <div className="h-px flex-grow bg-zinc-100" />
                                                <span className="text-[8px] font-bold text-zinc-300">REF: {championship.basics?.identifiers?.code || 'SYS'}-{doc.id}</span>
                                            </div>

                                            <h4 style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} className="text-xl font-black uppercase leading-[1.1] tracking-tighter">
                                                {doc.alt || doc.filename}
                                            </h4>

                                            <div className="flex flex-wrap gap-2 mt-4">
                                                <span style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], color: DESIGN_SYSTEM.COLORS.ZINC[500] }} className="px-3 py-1 text-[7px] font-black uppercase">
                                                    {doc.mimeType?.split('/')[1]?.toUpperCase() || 'FILE'}
                                                </span>
                                                <span style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], color: DESIGN_SYSTEM.COLORS.ZINC[500] }} className="px-3 py-1 text-[7px] font-black uppercase">
                                                    {(doc.filesize! / 1024 / 1024).toFixed(2)}MB
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-zinc-50 flex items-center justify-between">
                                            <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} className="text-[8px] font-medium italic">
                                                {new Date(doc.updatedAt).toLocaleDateString()}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${isDownloaded ? 'text-primary' : 'text-black'}`}>
                                                    {isDownloaded ? 'Synced' : 'Pull Data'}
                                                </span>
                                                <ArrowRight size={10} className={isDownloaded ? 'text-primary' : 'text-black'} />
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isDownloading && (
                                                <motion.div
                                                    initial={{ top: '-10%' }}
                                                    animate={{ top: '110%' }}
                                                    transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                                                    style={{
                                                        background: `linear-gradient(to bottom, transparent, ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}, transparent)`,
                                                        height: '4px',
                                                        boxShadow: `0 0 20px ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}`
                                                    }}
                                                    className="absolute inset-x-0 z-50 pointer-events-none opacity-80"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {isDownloaded && <div className="absolute inset-0 bg-primary/5 pointer-events-none" />}
                                    </div>

                                    <div
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[900],
                                            clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)"
                                        }}
                                        className="absolute inset-0 z-20 pointer-events-none origin-left transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1) group-hover:rotate-y-[-115deg] shadow-[20px_0_40px_rgba(0,0,0,0.5)] border border-black/50"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[800] }} />

                                        <div className="p-12 h-full flex flex-col">
                                            <div className="flex justify-between items-start mb-auto">
                                                <div className="flex flex-col gap-2">
                                                    <div className="w-8 h-1 bg-zinc-700" />
                                                    <div className="w-12 h-1 bg-zinc-700" />
                                                </div>
                                                <Lock size={14} className="text-zinc-600" />
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[700] }} />
                                                    <span style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }} className="text-[10px] font-black uppercase tracking-[0.5em]">
                                                        {isDownloaded ? 'Verified' : 'Locked'}
                                                    </span>
                                                </div>
                                                <h4 style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} className="text-xl font-black uppercase tracking-tighter opacity-40 italic">
                                                    File_{doc.id}
                                                </h4>
                                            </div>

                                            <div className="mt-12 flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] text-zinc-600 font-bold uppercase">Archive Index</span>
                                                    <span className="text-[9px] text-zinc-400 font-black">{championship.basics?.identifiers?.code || 'ARCH-26'}</span>
                                                </div>
                                                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center">
                                                    <div className="w-1 h-1 bg-zinc-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx global>{`
                .perspective-2000 { perspective: 2000px; }
                .preserve-3d { transform-style: preserve-3d; }
            `}</style>
        </section>
    );
}