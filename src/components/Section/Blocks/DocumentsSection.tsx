// components/Section/Blocks/DocumentsSection.tsx
"use client"

import { Media } from '@/payload-types'
import { ArrowRight, Check, Download, Loader2, Lock, ShieldCheck } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import React, { useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface DocumentItem {
    id: number | string
    title: string
    filename?: string | null
    mimeType?: string | null
    filesize?: number | null
    url?: string | null
    updatedAt?: string | null
}

interface DocumentsSectionProps {
    id: string
    title: string
    subtitle: string
    documents: (number | Media | DocumentItem)[] | null | undefined
    referenceCode?: string
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
    background?: React.ReactNode
}

function normalizeDocuments(
    docs: (number | Media | DocumentItem)[] | null | undefined
): DocumentItem[] {
    if (!docs) return []
    return docs.map((doc, index) => {
        if (typeof doc === 'number') {
            return { id: doc, title: `Document ${doc}` }
        }
        if ('title' in doc && typeof doc.title === 'string') {
            return doc
        }
        const media = doc as Media
        return {
            id: media.id ?? index,
            title: media.alt || media.filename || `Document ${media.id}`,
            filename: media.filename ?? null,
            mimeType: media.mimeType ?? null,
            filesize: media.filesize ?? null,
            url: media.url ?? null,
            updatedAt: media.updatedAt ?? null,
        }
    })
}

function formatFileSize(bytes: number | null | undefined): string {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
}

function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return ''
    try {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    } catch {
        return ''
    }
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
    id,
    title,
    subtitle,
    documents,
    referenceCode = 'SYS',
    headerVariant = 1,
    footerVariant = 1,
    background,
}) => {
    const normalizedDocs = normalizeDocuments(documents)
    const sectionRef = useRef<HTMLElement>(null)
    const [downloadingId, setDownloadingId] = useState<number | string | null>(null)
    const [downloadedIds, setDownloadedIds] = useState<Set<number | string>>(new Set())

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const scrollScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85])
    const scrollRotate = useTransform(scrollYProgress, [0, 0.3], [0, -5])
    const smoothScale = useSpring(scrollScale, { stiffness: 100, damping: 30 })
    const smoothRotate = useSpring(scrollRotate, { stiffness: 100, damping: 30 })

    const handleDownload = (doc: DocumentItem) => {
        if (downloadedIds.has(doc.id) || downloadingId) return
        setDownloadingId(doc.id)
        setTimeout(() => {
            setDownloadingId(null)
            setDownloadedIds((prev) => new Set(prev).add(doc.id))
            if (doc.url) window.open(doc.url, '_blank')
        }, 3000)
    }

    return (
        <section
            ref={sectionRef}
            id={id}
            className="w-full py-16 md:py-24 bg-white-pure border-t border-zinc-100"
        >
            {background}
            <SectionHeader
                title={title}
                subtitle={subtitle}
                variant={headerVariant}
                metadata={String(normalizedDocs.length).padStart(2, '0')}
            />
            {normalizedDocs.length === 0 ? (
                <div className="max-w-7xl mx-auto px-6 py-20 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6">
                        <ShieldCheck size={48} className="text-black-pure/10" />
                        <span className="text-xs font-mono font-black text-black-pure/20 uppercase tracking-widest">
                            No documents available
                        </span>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-40">
                        <div className="w-px h-16 mb-8 bg-primary-500" />
                        <h3 className="text-[11px] font-black text-black-pure uppercase tracking-[0.2em] flex items-center gap-4">
                            <ShieldCheck size={14} className="text-primary-500" />
                            System Dossier Archive
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                        {normalizedDocs.map((doc, idx) => {
                            const isDownloading = downloadingId === doc.id
                            const isDownloaded = downloadedIds.has(doc.id)
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
                                            onClick={() => handleDownload(doc)}
                                            className="relative cursor-pointer flex flex-col p-12 border bg-white-pure transition-all duration-700 ease-[0.23,1,0.32,1] shadow-inner aspect-[1/1.4]"
                                            style={{
                                                borderColor: isDownloaded ? 'var(--primary-500)' : 'var(--zinc-200)',
                                                clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)',
                                            }}
                                        >
                                            <div className="flex justify-between items-start mb-20 border-b border-zinc-100 pb-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">
                                                        Classification
                                                    </span>
                                                    <span
                                                        className="text-[9px] font-black uppercase"
                                                        style={{ color: isDownloaded ? 'var(--primary-500)' : 'var(--black-pure)' }}
                                                    >
                                                        {isDownloaded ? 'Verified // Internal' : 'Restricted // 2026'}
                                                    </span>
                                                </div>
                                                <div className="h-8 w-8 flex items-center justify-center">
                                                    {isDownloading && <Loader2 size={16} className="animate-spin text-primary-500" />}
                                                    {isDownloaded && !isDownloading && <Check size={16} className="text-primary-500" />}
                                                    {!isDownloading && !isDownloaded && <Download size={16} className="text-zinc-300" />}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-6 flex-grow">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-px flex-grow bg-zinc-100" />
                                                    <span className="text-[8px] font-bold text-zinc-300 uppercase">
                                                        REF: {referenceCode}-{doc.id}
                                                    </span>
                                                </div>
                                                <h4 className="text-xl font-black text-black-pure uppercase leading-[1.1] tracking-tighter">
                                                    {doc.title}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {doc.mimeType && (
                                                        <span className="px-3 py-1 text-[7px] font-black text-zinc-500 bg-zinc-50 uppercase">
                                                            {doc.mimeType.split('/')[1]?.toUpperCase() || doc.mimeType.toUpperCase()}
                                                        </span>
                                                    )}
                                                    {doc.filesize && (
                                                        <span className="px-3 py-1 text-[7px] font-black text-zinc-500 bg-zinc-50 uppercase">
                                                            {formatFileSize(doc.filesize)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-auto pt-8 border-t border-zinc-50 flex items-center justify-between">
                                                <span className="text-[8px] font-medium text-zinc-400 italic">
                                                    {formatDate(doc.updatedAt)}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="text-[8px] font-black uppercase tracking-widest"
                                                        style={{ color: isDownloaded ? 'var(--primary-500)' : 'var(--black-pure)' }}
                                                    >
                                                        {isDownloaded ? 'Synced' : 'Pull Data'}
                                                    </span>
                                                    <ArrowRight
                                                        size={10}
                                                        style={{ color: isDownloaded ? 'var(--primary-500)' : 'var(--black-pure)' }}
                                                    />
                                                </div>
                                            </div>
                                            {isDownloading && (
                                                <div className="absolute inset-x-0 z-50 pointer-events-none opacity-80 overflow-hidden">
                                                    <motion.div
                                                        initial={{ top: '-10%' }}
                                                        animate={{ top: '110%' }}
                                                        transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                                                        className="absolute inset-x-0 h-1"
                                                        style={{
                                                            background: 'var(--primary-500)',
                                                            boxShadow: '0 0 20px var(--primary-500)',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            {isDownloaded && (
                                                <div className="absolute inset-0 pointer-events-none bg-primary-500/5" />
                                            )}
                                        </div>
                                        <div
                                            className="absolute inset-0 z-20 pointer-events-none origin-left transition-transform duration-1000 ease-[0.23,1,0.32,1] group-hover:rotate-y-[-115deg] shadow-[20px_0_40px_rgba(0,0,0,0.5)] border border-black-pure/50"
                                            style={{
                                                backgroundColor: '#1a1a1a',
                                                clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)',
                                            }}
                                        >
                                            <div
                                                className="absolute top-0 left-0 w-1 h-full"
                                                style={{ backgroundColor: isDownloaded ? 'var(--primary-500)' : '#333333' }}
                                            />
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
                                                        <div
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: isDownloaded ? 'var(--primary-500)' : '#333333' }}
                                                        />
                                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">
                                                            {isDownloaded ? 'Verified' : 'Locked'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xl font-black text-white-pure uppercase tracking-tighter opacity-40 italic">
                                                        File_{doc.id}
                                                    </h4>
                                                </div>
                                                <div className="mt-12 flex justify-between items-end">
                                                    <div className="flex flex-col">
                                                        <span className="text-[7px] font-bold text-zinc-600 uppercase">
                                                            Archive Index
                                                        </span>
                                                        <span className="text-[9px] font-black text-zinc-400">{referenceCode}</span>
                                                    </div>
                                                    <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center">
                                                        <div className="w-1 h-1 bg-zinc-700" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            <style jsx global>{`
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
            <SectionFooter variant={footerVariant} />
        </section>
    )
}

export default DocumentsSection