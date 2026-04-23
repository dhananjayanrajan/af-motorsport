"use client"
import { Media } from '@/payload-types'
import { Download, FileText } from 'lucide-react'
import React, { useState } from 'react'
import SectionCTA from './CTA'
import SectionFooter from './Footer'
import SectionHeader from './Header'

export interface DocumentItem {
    id: string | number
    title: string
    file: Media | string
    label?: string
    version?: string
    category?: string
}

interface DocumentGridProps {
    id: string
    title: string
    documents: DocumentItem[]
}

const DocumentGrid: React.FC<DocumentGridProps> = ({ id, title, documents }) => {
    const [downloadingId, setDownloadingId] = useState<string | number | null>(null)

    const handleDownload = (doc: DocumentItem) => {
        const url = typeof doc.file === 'object' ? doc.file.url : doc.file
        if (!url) return

        setDownloadingId(doc.id)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', doc.title)
        link.setAttribute('target', '_blank')
        document.body.appendChild(link)

        setTimeout(() => {
            link.click()
            document.body.removeChild(link)
            setDownloadingId(null)
        }, 1000)
    }

    if (!documents || documents.length === 0) return null

    return (
        <section className="relative w-full bg-background flex flex-col py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <SectionHeader title={title} subtitle={id} variant={3} />

                <div className="mt-8 mb-12 flex items-center">
                    <span className="font-mono text-sm font-semibold text-primary uppercase tracking-wider">
                        Storage Node // {documents.length.toString().padStart(3, '0')} Assets Available
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {documents.map((doc, index) => {
                        const isDownloading = downloadingId === doc.id
                        const fileData = typeof doc.file === 'object' ? doc.file : null
                        const fileSize = fileData?.filesize ? (fileData.filesize / 1024 / 1024).toFixed(2) : '0.00'
                        const fileExt = fileData?.mimeType?.split('/')[1]?.toUpperCase() || 'PDF'

                        return (
                            <div
                                key={doc.id}
                                className="group relative flex flex-col p-8 md:p-12 min-h-[420px] bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors duration-300 shadow-sm hover:shadow-md"
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-sm font-semibold text-primary uppercase tracking-wider italic">
                                            {doc.category || 'Asset Type'}
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-muted-foreground/30">
                                            Ref {(index + 1).toString().padStart(3, '0')}
                                        </span>
                                    </div>

                                    <div className="w-14 h-14 border-2 border-foreground flex items-center justify-center bg-card group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-sm rounded-full">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-2xl md:text-3xl text-foreground uppercase leading-[0.9] tracking-tighter mb-6 group-hover:text-primary transition-colors italic">
                                        {doc.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        <div className="bg-foreground px-3 py-1 border border-foreground rounded-md">
                                            <span className="text-sm font-semibold text-background uppercase font-mono tracking-tighter">
                                                {fileExt}
                                            </span>
                                        </div>
                                        <div className="bg-card px-3 py-1 border border-border rounded-md">
                                            <span className="text-sm font-semibold text-foreground uppercase font-mono tracking-tighter">
                                                {fileSize} MB
                                            </span>
                                        </div>
                                        {doc.version && (
                                            <div className="bg-primary px-3 py-1 border border-primary rounded-md">
                                                <span className="text-sm font-semibold text-primary-foreground uppercase font-mono tracking-tighter">
                                                    V_{doc.version}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <button
                                        onClick={() => handleDownload(doc)}
                                        disabled={isDownloading}
                                        className="w-full flex items-center justify-between py-4 border-t border-border group/btn"
                                    >
                                        <span className="font-mono text-sm font-semibold uppercase text-foreground group-hover/btn:text-primary transition-colors">
                                            {isDownloading ? 'Processing...' : 'Download'}
                                        </span>
                                        <div className="relative overflow-hidden w-6 h-6">
                                            {isDownloading ? (
                                                <div className="w-full h-full border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Download className="w-full h-full group-hover/btn:translate-y-1 transition-transform" />
                                            )}
                                        </div>
                                    </button>
                                </div>

                                <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
                                    <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-foreground rounded-tr-lg" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 flex justify-center">
                    <SectionCTA
                        label="Full Document Registry"
                        path={`/archive/${id}`}
                        variant={2}
                        infoLabel="Access Files"
                    />
                </div>

                <div className="mt-16">
                    <SectionFooter variant={2} />
                </div>
            </div>
        </section>
    )
}

export default DocumentGrid