'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { Incident, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Camera, Film, Image as ImageIcon, Maximize2, Play, ShieldAlert, Zap } from 'lucide-react'
import { motion } from 'motion/react'

interface IncidentMediaGalleryProps {
    incident: Incident
}

export default function IncidentMediaGallery({ incident }: IncidentMediaGalleryProps) {
    const photos = (incident.assets?.gallery || []) as Media[]
    const video = incident.assets?.video as Media | null
    const thumbnail = incident.assets?.thumbnail as Media | null

    return (
        <section className="w-full py-24 px-10 md:px-16 bg-black border-b border-zinc-900">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Camera size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em]">VISUAL_EVIDENCE_RECOVERY</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                            Evidence<span className="text-zinc-900"> Vault</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-900">
                        <ShieldAlert size={12} className="text-red-600" />
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest italic">FORENSIC_ASSET_LOG</span>
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
                                <div className="size-20 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all duration-500">
                                    <Play size={24} className="text-white fill-white ml-1" />
                                </div>
                            </div>

                            {video.url ? (
                                <video
                                    src={video.url}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
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

                            <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/80 px-4 py-2 border border-zinc-800">
                                <div className="size-1.5 bg-red-600 animate-pulse rounded-full" />
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">CRASH_CAM_RECONSTRUCTION</span>
                            </div>

                            <div className="absolute bottom-6 right-6 flex items-center gap-4">
                                <span className="text-[7px] font-mono text-zinc-600 uppercase">ASSET_ID: {video.id}</span>
                                <div className="h-4 w-[1px] bg-zinc-800" />
                                <span className="text-[7px] font-mono text-zinc-600 uppercase">FPS: 60.00</span>
                            </div>
                        </motion.div>
                    )}

                    <div className={cn(
                        "grid gap-4",
                        video ? "lg:col-span-4 grid-cols-1" : "lg:col-span-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
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
                                    alt={photo.alt || 'Incident Frame'}
                                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                <div className="absolute top-4 right-4">
                                    <Maximize2 size={14} className="text-zinc-800 group-hover:text-white transition-colors" />
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">EVIDENCE_STILL</span>
                                        <span className="text-[9px] font-black text-white uppercase italic">REF_DATA_{idx + 1}</span>
                                    </div>
                                    <ImageIcon size={12} className="text-zinc-800" />
                                </div>
                            </motion.div>
                        ))}

                        {!video && photos.length === 0 && (
                            <div className="col-span-full py-32 border border-dashed border-zinc-900 flex flex-col items-center justify-center gap-6">
                                <Zap size={32} className="text-zinc-900" />
                                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">NO_VISUAL_LOGS_RECOVERED</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-900">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">RECORDS: {photos.length + (video ? 1 : 0)}</span>
                            <div className="h-3 w-[1px] bg-zinc-900" />
                            <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest italic">STORAGE: COLD_VAULT</span>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="size-1 bg-zinc-900 rotate-45" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}