'use client'

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
        <section className="relative w-full bg-white-pure flex flex-col border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={3}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure px-6 items-center">
                <span className="font-mono text-[10px] font-black text-primary-500 uppercase tracking-widest">
                    STORAGE_NODE // {documents.length.toString().padStart(3, '0')}_ASSETS_AVAILABLE
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x-2 divide-y-2 divide-black-pure border-b-2 border-black-pure">
                {documents.map((doc, index) => {
                    const isDownloading = downloadingId === doc.id
                    const fileData = typeof doc.file === 'object' ? doc.file : null
                    const fileSize = fileData?.filesize ? (fileData.filesize / 1024 / 1024).toFixed(2) : '0.00'
                    const fileExt = fileData?.mimeType?.split('/')[1]?.toUpperCase() || 'PDF'

                    return (
                        <div
                            key={doc.id}
                            className="group relative flex flex-col p-8 md:p-12 min-h-[420px] bg-white-pure hover:bg-neutral-50 transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="flex flex-col gap-1">
                                    <span className="font-mono text-[10px] font-black text-primary-500 uppercase tracking-widest italic">
                                        // {doc.category || 'ASSET_TYPE'}
                                    </span>
                                    <span className="font-mono text-[10px] font-black text-black-pure/20">
                                        REF_{(index + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>
                                <div className="w-14 h-14 border-2 border-black-pure flex items-center justify-center bg-white-pure group-hover:bg-black-pure group-hover:text-white-pure transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1">
                                    <FileText className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-2xl md:text-3xl text-black-pure uppercase leading-[0.9] tracking-tighter mb-6 group-hover:text-primary-500 transition-colors italic">
                                    {doc.title}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    <div className="bg-black-pure px-3 py-1 border-2 border-black-pure">
                                        <span className="text-[10px] font-black text-white-pure uppercase font-mono tracking-tighter">
                                            {fileExt}
                                        </span>
                                    </div>
                                    <div className="bg-white-pure px-3 py-1 border-2 border-black-pure">
                                        <span className="text-[10px] font-black text-black-pure uppercase font-mono tracking-tighter">
                                            {fileSize} MB
                                        </span>
                                    </div>
                                    {doc.version && (
                                        <div className="bg-primary-500 px-3 py-1 border-2 border-black-pure">
                                            <span className="text-[10px] font-black text-black-pure uppercase font-mono tracking-tighter">
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
                                    className="w-full flex items-center justify-between py-4 border-t-2 border-black-pure group/btn"
                                >
                                    <span className="font-mono text-xs font-black uppercase text-black-pure group-hover/btn:text-primary-500 transition-colors">
                                        {isDownloading ? 'EXECUTE_TRANSFER...' : 'PULL_FROM_SERVER'}
                                    </span>
                                    <div className="relative overflow-hidden w-6 h-6">
                                        {isDownloading ? (
                                            <div className="w-full h-full border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Download className="w-full h-full group-hover/btn:translate-y-1 transition-transform" />
                                        )}
                                    </div>
                                </button>
                            </div>

                            <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
                                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-black-pure" />
                            </div>
                        </div>
                    )
                })}
            </div>

            <SectionCTA
                label="Full Document Registry"
                path={`/archive/${id}`}
                variant={2}
                infoLabel="ACCESS_FILES"
            />

            <SectionFooter variant={2} />
        </section>
    )
}

export default DocumentGrid