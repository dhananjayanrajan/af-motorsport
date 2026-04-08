'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Celebration, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Camera, Film, Image as ImageIcon, Layers, Maximize2, Play } from 'lucide-react'
import { motion } from 'motion/react'

interface CelebrationMediaGalleryProps {
    celebration: Celebration
}

export default function CelebrationMediaGallery({ celebration }: CelebrationMediaGalleryProps) {
    const photos = (celebration.assets?.gallery || []) as Media[]
    const video = celebration.assets?.video as Media | null
    const thumbnail = celebration.assets?.thumbnail as Media | null

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Camera size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">EVENT_VISUAL_RECONSTRUCTION</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Moment<span className="text-zinc-900"> Vault</span>
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
                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                <div className="size-20 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-500" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any}>
                                    <Play size={24} className="text-white fill-white ml-1" />
                                </div>
                            </div>

                            {video.url ? (
                                <video
                                    src={video.url}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                                    muted
                                    loop
                                    playsInline
                                    poster={thumbnail?.url || ''}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                    <Film size={48} className="text-zinc-800" />
                                </div>
                            )}

                            <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-zinc-800">
                                <div className="size-1.5 bg-red-600 animate-pulse rounded-full" />
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">MOTION_DATA_ARCHIVE</span>
                            </div>
                        </motion.div>
                    )}

                    <div className={cn(
                        "grid gap-4",
                        video ? "lg:col-span-4 grid-cols-2 lg:grid-cols-1" : "lg:col-span-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    )}>
                        {photos.map((photo, idx) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="relative aspect-square bg-zinc-950 border border-zinc-900 group overflow-hidden"
                            >
                                <img
                                    src={photo.url || ''}
                                    alt={photo.alt || 'Celebration Memory'}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-40 group-hover:opacity-100"
                                />

                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.PRIMARY}20` }} />

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                    <div className="size-8 bg-black border border-zinc-800 flex items-center justify-center">
                                        <Maximize2 size={12} className="text-white" />
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-4">
                                    <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest bg-black/80 px-2 py-1 border border-zinc-900">
                                        FRAME_REF_{photo.id.toString().slice(-4)}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {!video && photos.length === 0 && (
                            <div className="col-span-full py-32 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-6">
                                <Layers size={32} className="text-zinc-900" />
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">NO_VISUAL_ASSETS_SYNCED</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-6">
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-1 w-6 bg-zinc-900" />
                            ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">GALLERY_SEQUENCING_COMPLETE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ImageIcon size={10} className="text-zinc-800" />
                        <span className="text-[7px] font-black text-zinc-800 uppercase italic">ASSET_COUNT: {photos.length + (video ? 1 : 0)}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}