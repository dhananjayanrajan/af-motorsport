'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Award, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Camera, Film, Image as ImageIcon, Maximize2, Play } from 'lucide-react'
import { motion } from 'motion/react'

interface AwardMediaGalleryProps {
    award: Award
}

export default function AwardMediaGallery({ award }: AwardMediaGalleryProps) {
    const photos = [
        award.assets?.thumbnail,
        award.assets?.candid
    ].filter((item): item is Media => !!item && typeof item === 'object')

    const video = award.assets?.video as Media | null

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Camera size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">VISUAL_ASSET_RECONSTRUCTION</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Ceremony<span className="text-zinc-900"> Media</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {video && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-8 relative aspect-video bg-zinc-950 border border-zinc-900 group overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="size-20 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-500" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any}>
                                    <Play size={24} className="text-white fill-white ml-1" />
                                </div>
                            </div>

                            {video.url ? (
                                <video
                                    src={video.url}
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                    <Film size={48} className="text-zinc-800" />
                                </div>
                            )}

                            <div className="absolute top-6 left-6 flex items-center gap-3">
                                <div className="size-2 bg-red-600 animate-pulse" />
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">LIVE_CAPTURE_REPLAY</span>
                            </div>

                            <div className="absolute bottom-6 right-6">
                                <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest italic">STREAM_ID: {video.id}</span>
                            </div>
                        </motion.div>
                    )}

                    <div className={cn(
                        "grid gap-4",
                        video ? "lg:col-span-4 grid-cols-1" : "lg:col-span-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    )}>
                        {photos.map((photo, idx) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative aspect-square bg-zinc-950 border border-zinc-900 group overflow-hidden"
                            >
                                <img
                                    src={photo.url || ''}
                                    alt={photo.alt || 'Award Media'}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                                />

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 size={20} className="text-white" />
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-black/80 backdrop-blur-sm border-t border-zinc-800">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[8px] font-black text-white uppercase italic tracking-widest">STILL_FRAME_{idx + 1}</span>
                                        <ImageIcon size={10} className="text-primary" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {!video && photos.length === 0 && (
                            <div className="col-span-full py-32 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-4">
                                <Film size={24} className="text-zinc-900" />
                                <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">NO_CEREMONY_DATA_RECORDED</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="h-0.5 w-12 bg-zinc-900" />
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">MEDIA_VAULT_INTEGRITY: 100%</span>
                    </div>
                    <div className="flex gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="size-1.5 border border-zinc-900" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}