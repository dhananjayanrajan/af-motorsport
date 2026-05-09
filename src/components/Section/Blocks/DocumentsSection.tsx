"use client"

import { Media } from '@/payload-types'
import { ArrowRight, Check, Download, Loader2, ShieldCheck } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import React, { useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionSidebar from '../Components/SectionSidebar'

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
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null)

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

    const displayDocs = normalizedDocs.slice(0, 6)

    return (
        <section
            ref={sectionRef}
            id={id}
            className="w-full py-16 md:py-24 bg-white-pure border-t border-black-pure"
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
                        <ShieldCheck size={48} className="text-black-pure" />
                        <span className="text-xs font-mono font-black text-black-pure uppercase tracking-widest">
                            No documents available
                        </span>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayDocs.map((doc, idx) => {
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
                                            className="relative cursor-pointer flex flex-col p-8 border-2 bg-white-pure transition-all duration-700 ease-[0.23,1,0.32,1]"
                                            style={{
                                                borderColor: isDownloaded ? 'var(--primary-500)' : 'var(--black-pure)',
                                            }}
                                        >
                                            <div className="flex justify-between items-start mb-8 border-b-2 border-black-pure pb-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-mono font-black text-black-pure uppercase tracking-widest">
                                                        Document
                                                    </span>
                                                    <span
                                                        className="text-sm font-black uppercase"
                                                        style={{ color: isDownloaded ? 'var(--primary-500)' : 'var(--black-pure)' }}
                                                    >
                                                        {isDownloaded ? 'Downloaded' : 'Available'}
                                                    </span>
                                                </div>
                                                <div className="h-10 w-10 flex items-center justify-center border-2 border-black-pure bg-white-pure">
                                                    {isDownloading && <Loader2 size={18} className="animate-spin text-primary-500" />}
                                                    {isDownloaded && !isDownloading && <Check size={18} className="text-primary-500" />}
                                                    {!isDownloading && !isDownloaded && <Download size={18} className="text-black-pure" />}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-6 flex-grow">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-px flex-grow bg-black-pure" />
                                                    <span className="text-xs font-mono font-bold text-black-pure uppercase">
                                                        REF: {referenceCode}-{doc.id}
                                                    </span>
                                                </div>
                                                <h4 className="text-xl font-black text-black-pure uppercase leading-tight">
                                                    {doc.title}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {doc.mimeType && (
                                                        <span className="px-3 py-1 text-xs font-mono font-black text-black-pure bg-white-pure border-2 border-black-pure uppercase">
                                                            {doc.mimeType.split('/')[1]?.toUpperCase() || doc.mimeType.toUpperCase()}
                                                        </span>
                                                    )}
                                                    {doc.filesize && (
                                                        <span className="px-3 py-1 text-xs font-mono font-black text-black-pure bg-white-pure border-2 border-black-pure uppercase">
                                                            {formatFileSize(doc.filesize)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-auto pt-6 border-t-2 border-black-pure flex items-center justify-between">
                                                <span className="text-xs font-medium text-black-pure">
                                                    {formatDate(doc.updatedAt)}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setActiveDoc(doc)
                                                            setSidebarOpen(true)
                                                        }}
                                                        className="text-xs font-mono font-black uppercase tracking-widest text-black-pure hover:text-primary-500 transition-colors"
                                                    >
                                                        Details
                                                    </button>
                                                    <ArrowRight size={12} className="text-black-pure" />
                                                </div>
                                            </div>
                                            {isDownloading && (
                                                <div className="absolute inset-x-0 z-50 pointer-events-none overflow-hidden">
                                                    <motion.div
                                                        initial={{ top: '-10%' }}
                                                        animate={{ top: '110%' }}
                                                        transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                                                        className="absolute inset-x-0 h-1 bg-primary-500"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })}
                        {normalizedDocs.length > 6 && (
                            <div className="group bg-white-pure border-2 border-black-pure p-8 flex flex-col items-center justify-center min-h-[400px] cursor-pointer hover:bg-primary-500 transition-colors duration-500">
                                <div className="w-20 h-20 border-4 border-black-pure bg-white-pure flex items-center justify-center mb-6 group-hover:bg-black-pure transition-colors duration-500">
                                    <ArrowRight className="w-10 h-10 text-black-pure group-hover:text-white-pure transition-colors duration-500" />
                                </div>
                                <span className="text-lg font-black text-black-pure group-hover:text-white-pure uppercase transition-colors duration-500">
                                    View All Documents
                                </span>
                                <span className="text-sm font-mono font-black text-black-pure group-hover:text-white-pure mt-2 transition-colors duration-500">
                                    {normalizedDocs.length - 6} more
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <style jsx global>{`
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
            <SectionFooter variant={footerVariant} />

            <SectionSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                title={activeDoc?.title || ''}
                description={`File: ${activeDoc?.filename || 'Unknown'}\nType: ${activeDoc?.mimeType || 'Unknown'}\nSize: ${formatFileSize(activeDoc?.filesize) || 'Unknown'}\nUpdated: ${formatDate(activeDoc?.updatedAt) || 'Unknown'}`}
                imageUrl={`https://picsum.photos/seed/${activeDoc?.id}/800/800`}
                idCode={`DOC-${activeDoc?.id}`}
                stats={[
                    { label: 'Size', val: formatFileSize(activeDoc?.filesize) || 'N/A', color: 'bg-primary-500' },
                    { label: 'Type', val: activeDoc?.mimeType?.split('/')[1]?.toUpperCase() || 'N/A', color: 'bg-black-pure' }
                ]}
                buttonLabel={downloadedIds.has(activeDoc?.id || '') ? 'Downloaded' : 'Download'}
                onAction={() => activeDoc && handleDownload(activeDoc)}
            />
        </section>
    )
}

export default DocumentsSection