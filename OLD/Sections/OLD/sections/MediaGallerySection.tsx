'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Media, Meetup } from '@/payload-types'
import { Camera, ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, Play, Video, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface MediaGallerySectionProps {
    meetup: Meetup
}

export default function MediaGallerySection({ meetup }: MediaGallerySectionProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const gallery = (meetup.assets?.gallery || []) as Media[]
    const videos = meetup.assets?.video ? [meetup.assets.video as Media] : []
    const allMedia = [...videos, ...gallery]

    const nextMedia = () => {
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex + 1) % allMedia.length)
    }

    const prevMedia = () => {
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex - 1 + allMedia.length) % allMedia.length)
    }

    if (allMedia.length === 0) return null

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Camera size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">VISUAL_DOCUMENTATION_ARCHIVE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Media<span className="text-zinc-900"> Gallery</span>
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="px-4 py-2 bg-zinc-950 border border-zinc-900 flex items-center gap-3">
                            <ImageIcon size={10} className="text-zinc-700" />
                            <span className="text-[10px] font-black text-white italic">{gallery.length}</span>
                        </div>
                        <div className="px-4 py-2 bg-zinc-950 border border-zinc-900 flex items-center gap-3">
                            <Video size={10} className="text-zinc-700" />
                            <span className="text-[10px] font-black text-white italic">{videos.length}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allMedia.map((media, idx) => {
                        const isVideo = media.mimeType?.includes('video')
                        return (
                            <motion.div
                                key={media.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedIndex(idx)}
                                className="group relative aspect-square bg-zinc-950 border border-zinc-900 overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={media.url || ''}
                                    alt={media.alt || 'Gallery item'}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                                    {isVideo ? (
                                        <Play size={24} fill="currentColor" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    ) : (
                                        <Maximize2 size={24} className="text-white" />
                                    )}
                                </div>

                                <div className="absolute bottom-4 left-4 flex flex-col">
                                    <span className="text-[7px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        {isVideo ? 'MOTION_CAPTURE' : 'STILL_FRAME'}
                                    </span>
                                    <span className="text-[6px] font-mono text-zinc-500 uppercase">
                                        REF_{media.id.toString().padStart(4, '0')}
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-colors z-[110]"
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={prevMedia}
                            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-primary transition-colors z-[110]"
                        >
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>

                        <button
                            onClick={nextMedia}
                            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-primary transition-colors z-[110]"
                        >
                            <ChevronRight size={48} strokeWidth={1} />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            {allMedia[selectedIndex].mimeType?.includes('video') ? (
                                <video
                                    src={allMedia[selectedIndex].url || ''}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-full border border-zinc-900 shadow-2xl"
                                />
                            ) : (
                                <motion.img
                                    key={allMedia[selectedIndex].id}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    src={allMedia[selectedIndex].url || ''}
                                    className="max-w-full max-h-full object-contain border border-zinc-900 shadow-2xl"
                                />
                            )}

                            <div className="absolute bottom-0 left-0 right-0 py-10 flex flex-col items-center gap-2">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">
                                    {allMedia[selectedIndex].alt || 'OPERATIONAL_VISUAL_LOG'}
                                </span>
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-zinc-800" />
                                    <span className="text-[8px] font-mono text-zinc-600">
                                        INDEX: {selectedIndex + 1} / {allMedia.length}
                                    </span>
                                    <div className="h-px w-12 bg-zinc-800" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}