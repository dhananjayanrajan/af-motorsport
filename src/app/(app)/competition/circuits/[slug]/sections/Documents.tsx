'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Circuit, Media } from '@/payload-types';
import { ArrowRight, Check, Download, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

interface CircuitDocumentsProps {
    circuit: Circuit;
}

export default function CircuitDocuments({ circuit }: CircuitDocumentsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [downloadingId, setDownloadingId] = useState<string | number | null>(null);
    const [downloadedIds, setDownloadedIds] = useState<Set<string | number>>(new Set());

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    });

    const scrollScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
    const scrollRotate = useTransform(scrollYProgress, [0, 0.3], [0, -3]);
    const smoothScale = useSpring(scrollScale, { stiffness: 100, damping: 30 });
    const smoothRotate = useSpring(scrollRotate, { stiffness: 100, damping: 30 });

    const mockDocuments: Media[] = [
        {
            id: 101,
            alt: 'Site Technical Layout',
            filename: 'technical_layout_v1.pdf',
            mimeType: 'application/pdf',
            filesize: 3200000,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            id: 102,
            alt: 'Emergency Evacuation Protocol',
            filename: 'safety_evac_2026.pdf',
            mimeType: 'application/pdf',
            filesize: 1800000,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            id: 103,
            alt: 'FIA Grade Certification',
            filename: 'fia_grade_cert.pdf',
            mimeType: 'application/pdf',
            filesize: 900000,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        }
    ];

    const documents = (circuit.assets?.documents?.length ? circuit.assets.documents : mockDocuments) as Media[];

    const handleDownload = (id: string | number, url: string | null) => {
        if (downloadedIds.has(id) || downloadingId) return;
        setDownloadingId(id);

        setTimeout(() => {
            setDownloadingId(null);
            setDownloadedIds(prev => new Set(prev).add(id));
            if (url) window.open(url, '_blank');
        }, 2400);
    };

    return (
        <section ref={sectionRef} style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }} className="w-full py-16 md:py-24 border-t border-zinc-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center mb-32">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 64 }}
                        viewport={{ once: true }}
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        className="w-px mb-8"
                    />
                    <h3 style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} className={`text-[11px] font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL} flex items-center gap-4`}>
                        <ShieldCheck size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        Operational Intelligence Archive
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:gap-x-16">
                    {documents.map((doc, idx) => {
                        const isDownloading = downloadingId === doc.id;
                        const isDownloaded = downloadedIds.has(doc.id);

                        return (
                            <div key={doc.id} className="group perspective-2000">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                                    className="relative preserve-3d h-full origin-center"
                                    style={{ scale: smoothScale, rotateX: smoothRotate }}
                                >
                                    <div
                                        onClick={() => handleDownload(doc.id, doc.url || null)}
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                            borderColor: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE[300],
                                            clipPath: "polygon(0 0, 85% 0, 100% 12%, 100% 100%, 0 100%)"
                                        }}
                                        className="relative cursor-pointer flex flex-col p-10 border-[1px] aspect-[1/1.3] transition-all duration-700 ease-[0.23,1,0.32,1] shadow-sm hover:shadow-xl"
                                    >
                                        <div className="flex justify-between items-start mb-16 border-b border-zinc-100 pb-6">
                                            <div className="flex flex-col gap-1">
                                                <span style={{ color: DESIGN_SYSTEM.COLORS.WHITE[900] }} className="text-[7px] font-black uppercase tracking-widest">Protocol</span>
                                                <span style={{ color: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK.PURE }} className="text-[9px] font-black uppercase">
                                                    {isDownloaded ? 'Verified // Local' : 'Encrypted // Remote'}
                                                </span>
                                            </div>
                                            <div className="h-8 w-8 flex items-center justify-center">
                                                {isDownloading ? (
                                                    <Loader2 size={14} className="animate-spin" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                ) : isDownloaded ? (
                                                    <Check size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                ) : (
                                                    <Download size={14} style={{ color: DESIGN_SYSTEM.COLORS.BLACK[200] }} />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-6 flex-grow">
                                            <div className="flex items-center gap-3">
                                                <div className="h-px flex-grow bg-zinc-100" />
                                                <span className="text-[8px] font-bold text-zinc-300">SITE_{circuit.basics?.identifiers?.code || 'CRT'}-{idx + 1}</span>
                                            </div>

                                            <h4 style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }} className="text-xl font-black uppercase leading-tight tracking-tighter">
                                                {doc.alt || doc.filename}
                                            </h4>

                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[100], color: DESIGN_SYSTEM.COLORS.BLACK[400] }} className="px-2 py-1 text-[7px] font-black uppercase">
                                                    {doc.mimeType?.split('/')[1]?.toUpperCase() || 'DATA'}
                                                </span>
                                                <span style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[100], color: DESIGN_SYSTEM.COLORS.BLACK[400] }} className="px-2 py-1 text-[7px] font-black uppercase">
                                                    {doc.filesize ? (doc.filesize / 1024 / 1024).toFixed(1) : '0.0'}MB
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                                            <span style={{ color: DESIGN_SYSTEM.COLORS.WHITE[950] }} className="text-[8px] font-medium italic">
                                                {new Date(doc.updatedAt).getFullYear()} // ARCHIVE
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${isDownloaded ? 'text-primary' : 'text-black'}`} style={{ color: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                    {isDownloaded ? 'Synced' : 'Request'}
                                                </span>
                                                <ArrowRight size={10} style={{ color: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK.PURE }} />
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isDownloading && (
                                                <motion.div
                                                    initial={{ top: '-10%' }}
                                                    animate={{ top: '110%' }}
                                                    transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
                                                    style={{
                                                        background: `linear-gradient(to bottom, transparent, ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}, transparent)`,
                                                        height: '3px',
                                                        boxShadow: `0 0 15px ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}`
                                                    }}
                                                    className="absolute inset-x-0 z-50 pointer-events-none opacity-60"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                                            clipPath: "polygon(0 0, 85% 0, 100% 12%, 100% 100%, 0 100%)"
                                        }}
                                        className="absolute inset-0 z-20 pointer-events-none origin-left transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) group-hover:rotate-y-[-110deg] shadow-2xl border border-black"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE[900] }} />

                                        <div className="p-10 h-full flex flex-col">
                                            <div className="flex justify-between items-start mb-auto">
                                                <div className="flex flex-col gap-2">
                                                    <div className="w-6 h-1 bg-zinc-800" />
                                                    <div className="w-10 h-1 bg-zinc-800" />
                                                </div>
                                                <Lock size={12} className="text-zinc-700" />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDownloaded ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE[900] }} />
                                                    <span style={{ color: DESIGN_SYSTEM.COLORS.WHITE[800] }} className="text-[9px] font-black uppercase tracking-[0.4em]">
                                                        {isDownloaded ? 'Ready' : 'Secure'}
                                                    </span>
                                                </div>
                                                <h4 style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} className="text-lg font-black uppercase tracking-tighter opacity-30 italic">
                                                    Entry_{idx + 1}
                                                </h4>
                                            </div>

                                            <div className="mt-10 flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] text-zinc-700 font-bold uppercase">Database Index</span>
                                                    <span className="text-[9px] text-zinc-500 font-black">{circuit.basics?.identifiers?.code || 'SEC-DATA'}</span>
                                                </div>
                                                <div className="w-8 h-8 border border-zinc-900 flex items-center justify-center">
                                                    <div className="w-1 h-1 bg-zinc-800" />
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