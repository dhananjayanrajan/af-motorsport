'use client'

import { Media } from '@/payload-types'
import { Download, FileText } from 'lucide-react'
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
        }, 1000)
    }

    const getFileIcon = (mimeType?: string) => {
        if (!mimeType) return <FileText className="w-5 h-5 md:w-6 md:h-6" />
        if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
        if (mimeType.includes('image')) return <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
        if (mimeType.includes('video')) return <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
        return <FileText className="w-5 h-5 md:w-6 md:h-6" />
    }

    return (
        <section className="relative w-full bg-white-pure flex flex-col">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-secondary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {documents.length} FILES
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-black-pure border-l border-black-pure">
                {documents.map((doc, index) => {
                    const isDownloading = downloadingId === doc.id
                    const fileData = typeof doc.file === 'object' ? doc.file : null
                    const fileSize = fileData?.filesize ? (fileData.filesize / 1024 / 1024).toFixed(2) : '0.00'
                    const fileExt = fileData?.mimeType?.split('/')[1]?.toUpperCase() || 'PDF'

                    return (
                        <div
                            key={doc.id}
                            className="group relative flex flex-col p-6 md:p-8 lg:p-10 min-h-[380px] bg-white-pure hover:bg-gradient-to-br hover:from-white-pure hover:to-secondary-500/5 transition-all duration-500 overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-8 md:mb-10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] md:text-[9px] font-black text-primary-500 uppercase tracking-wider">
                                        {doc.category || 'DOCUMENT'}
                                    </span>
                                    <span className="text-[8px] md:text-[9px] font-mono font-black text-neutral-300">
                                        {(index + 1).toString().padStart(3, '0')}
                                    </span>
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-primary-500 group-hover:scale-110 transition-all duration-300">
                                    {getFileIcon(fileData?.mimeType || undefined)}
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 md:space-y-5">
                                <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1] tracking-tighter group-hover:text-primary-500 transition-colors duration-300 line-clamp-2">
                                    {doc.title}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-black-pure text-white-pure text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                                        {fileExt}
                                    </span>
                                    <span className="px-2 py-0.5 md:px-2.5 md:py-1 border border-black-pure text-black-pure text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                                        {fileSize} MB
                                    </span>
                                    {doc.version && (
                                        <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-neutral-100 text-neutral-500 text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                                            v{doc.version}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 md:mt-10 space-y-4">
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent group-hover:via-primary-500 transition-all duration-500" />
                                <button
                                    onClick={() => handleDownload(doc)}
                                    disabled={isDownloading}
                                    className="w-full flex items-center justify-between group/btn py-2"
                                >
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-black-pure group-hover/btn:translate-x-1 transition-transform duration-300">
                                        {isDownloading ? 'PROCESSING...' : 'DOWNLOAD'}
                                    </span>
                                    {isDownloading ? (
                                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Download className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    )}
                                </button>
                            </div>

                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                        </div>
                    )
                })}
            </div>

            <SectionScroller items={[title, id, "LIBRARY", "RESOURCES", "FILES"]} variant={2} velocity={35} />
        </section>
    )
}

export default DocumentGrid