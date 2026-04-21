'use client'

import { Media } from '@/payload-types'
import React, { useState } from 'react'
import SectionScroller from './Scroller'

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
        }, 1200)
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-black-pure border-l border-black-pure">
                {documents.map((doc, index) => {
                    const isDownloading = downloadingId === doc.id
                    const fileData = typeof doc.file === 'object' ? doc.file : null
                    const fileSize = fileData?.filesize ? (fileData.filesize / 1024 / 1024).toFixed(2) : '0.00'
                    const fileExt = fileData?.mimeType?.split('/')[1]?.toUpperCase() || 'PDF'

                    return (
                        <div
                            key={doc.id}
                            className="group relative flex flex-col p-10 min-h-[400px] bg-white-pure hover:bg-neutral-50 transition-colors duration-500 overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] font-bold text-primary-500 uppercase tracking-widest">
                                        {doc.category || 'Technical Document'}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-neutral-300 italic">
                                        REF_{String(index + 1).padStart(3, '0')}
                                    </span>
                                </div>
                                <div className="w-10 h-10 border border-neutral-100 flex items-center justify-center group-hover:border-black-pure transition-colors">
                                    <div className={`w-1.5 h-1.5 bg-black-pure ${isDownloading ? 'animate-ping' : ''}`} />
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                <h3 className="font-race text-2xl lg:text-3xl text-black-pure uppercase leading-[0.9] tracking-tighter group-hover:text-primary-500 transition-colors">
                                    {doc.title}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-black-pure text-white-pure text-[8px] font-bold uppercase tracking-widest">
                                        {fileExt}
                                    </span>
                                    <span className="px-2 py-1 border border-black-pure text-black-pure text-[8px] font-bold uppercase tracking-widest">
                                        {fileSize} MB
                                    </span>
                                    {doc.version && (
                                        <span className="px-2 py-1 bg-neutral-100 text-neutral-400 text-[8px] font-bold uppercase tracking-widest">
                                            VER_{doc.version}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-12 space-y-4">
                                <div className="h-[1px] w-full bg-neutral-100 group-hover:bg-black-pure transition-colors" />
                                <button
                                    onClick={() => handleDownload(doc)}
                                    disabled={isDownloading}
                                    className="w-full flex items-center justify-between group/btn"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black-pure group-hover/btn:translate-x-1 transition-transform">
                                        {isDownloading ? 'Processing...' : 'Initialize Download'}
                                    </span>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={isDownloading ? 'opacity-20' : ''}>
                                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>

                            <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-50 -mr-12 -mt-12 rotate-45 pointer-events-none group-hover:bg-primary-500/10 transition-colors" />
                        </div>
                    )
                })}
            </div>

            <div className="z-40 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, "DOCUMENT_ARCHIVE_VERIFIED"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default DocumentGrid