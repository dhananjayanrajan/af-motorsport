'use client'

import { Individual, Interview, Media } from '@/payload-types'
import { ArrowRight, Clock, FileText, Globe, Play, User, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function InterviewsSection({ data }: { data: Interview[] }) {
    const [activeInterview, setActiveInterview] = useState<Interview | null>(null)

    return (
        <section className="w-full py-16 md:py-20 bg-white-pure border-t border-b border-black-pure">
            <div className="w-full px-6 md:px-10 lg:px-20">
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-primary-500 rotate-45" />
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-black-pure/40">Media Archive</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-race font-black uppercase italic tracking-tighter text-black-pure">
                            Interviews
                        </h2>
                        <div className="hidden md:block w-32 h-px bg-black-pure/20" />
                    </div>
                    <div className="w-12 h-px bg-primary-500 mt-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {data.map((interview, idx) => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            onClick={() => setActiveInterview(interview)}
                            index={idx}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeInterview && (
                    <InterviewModal
                        interview={activeInterview}
                        onClose={() => setActiveInterview(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

function InterviewCard({ interview, onClick, index }: { interview: Interview; onClick: () => void; index: number }) {
    const thumbnail = (interview.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${interview.id}/600/800`
    const interviewee = interview.details.interviewee as Individual

    return (
        <motion.button
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col bg-white-pure border border-black-pure/20 hover:border-primary-500 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                <div className="size-1.5 bg-primary-500 rotate-45" />
                <span className="text-[6px] font-black uppercase tracking-wider text-black-pure/40">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-black-pure/5">
                <Image
                    src={thumbnail}
                    alt={interview.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                />
                <div className="absolute inset-0 bg-black-pure/0 group-hover:bg-black-pure/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black-pure/70 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[7px] md:text-[8px] font-black text-white-pure uppercase tracking-wider">
                        {interview.details.format || 'INTERVIEW'}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex flex-col gap-0.5">
                    <h4 className="text-sm md:text-base font-race font-black uppercase italic leading-tight text-black-pure group-hover:text-primary-500 transition-colors">
                        {interviewee?.first_name} {interviewee?.last_name}
                    </h4>
                    <p className="text-[8px] md:text-[9px] font-bold uppercase text-black-pure/40 line-clamp-1">
                        {interview.basics?.tagline || 'Exclusive Interview'}
                    </p>
                </div>
            </div>

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-6 h-6 border border-black-pure/30 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform">
                    <ArrowRight size={10} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
            </div>
        </motion.button>
    )
}

function InterviewModal({ interview, onClose }: { interview: Interview; onClose: () => void }) {
    const videoUrl = (interview.assets?.video as Media)?.url
    const coverUrl = (interview.assets?.cover as Media)?.url || (interview.assets?.thumbnail as Media)?.url || `https://picsum.photos/seed/${interview.id}/1280/720`
    const interviewee = interview.details.interviewee as Individual

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black-pure/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-white-pure border-2 border-black-pure overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 size-10 bg-black-pure hover:bg-primary-500 transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <X size={18} className="text-white-pure" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[400px] bg-black-pure">
                        {videoUrl ? (
                            <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <Image src={coverUrl} alt={interview.name} fill className="object-cover opacity-30 grayscale" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                    <div className="size-16 border-2 border-white-pure/30 flex items-center justify-center rotate-45">
                                        <Play size={24} className="text-white-pure/50 -rotate-45" />
                                    </div>
                                    <span className="text-[10px] font-black text-white-pure/40 uppercase tracking-[0.3em]">Preview Only</span>
                                </div>
                            </>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black-pure to-transparent" />
                    </div>

                    <div className="p-6 md:p-8 flex flex-col h-full">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-px bg-primary-500" />
                                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-primary-600">
                                    {interview.alias || 'EXCLUSIVE INTERVIEW'}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-race font-black uppercase italic leading-[1.1] tracking-tighter text-black-pure">
                                {interviewee?.first_name}<br />{interviewee?.last_name}
                            </h2>
                            <div className="w-10 h-px bg-primary-500 mt-4" />
                        </div>

                        <p className="text-[11px] md:text-xs font-bold leading-relaxed text-black-pure/60 uppercase mb-6">
                            {interview.basics?.description}
                        </p>

                        <div className="grid grid-cols-2 gap-px bg-black-pure/10 border border-black-pure/10 mb-6">
                            <div className="p-3 md:p-4 bg-white-pure">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <User size={12} className="text-primary-500" />
                                    <span className="text-[8px] md:text-[9px] font-black text-black-pure/40 uppercase">Subject</span>
                                </div>
                                <span className="text-[11px] md:text-xs font-race font-black uppercase text-black-pure">
                                    {interviewee?.first_name} {interviewee?.last_name}
                                </span>
                            </div>
                            <div className="p-3 md:p-4 bg-white-pure">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Clock size={12} className="text-primary-500" />
                                    <span className="text-[8px] md:text-[9px] font-black text-black-pure/40 uppercase">Duration</span>
                                </div>
                                <span className="text-[11px] md:text-xs font-race font-black uppercase text-black-pure">
                                    {interview.details.duration} Minutes
                                </span>
                            </div>
                            <div className="p-3 md:p-4 bg-white-pure">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Globe size={12} className="text-primary-500" />
                                    <span className="text-[8px] md:text-[9px] font-black text-black-pure/40 uppercase">Language</span>
                                </div>
                                <span className="text-[11px] md:text-xs font-race font-black uppercase text-black-pure">
                                    {interview.details.language || 'ENGLISH'}
                                </span>
                            </div>
                            <div className="p-3 md:p-4 bg-white-pure">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <FileText size={12} className="text-primary-500" />
                                    <span className="text-[8px] md:text-[9px] font-black text-black-pure/40 uppercase">Format</span>
                                </div>
                                <span className="text-[11px] md:text-xs font-race font-black uppercase text-black-pure">
                                    {interview.details.format || 'VIDEO'}
                                </span>
                            </div>
                        </div>

                        {interview.basics?.summary && (
                            <div className="p-4 md:p-5 border-l-4 border-primary-500 bg-black-pure/5 mb-6">
                                <span className="text-[9px] md:text-[10px] font-black text-black-pure/50 uppercase tracking-wider block mb-2">Executive Summary</span>
                                <p className="text-[11px] md:text-xs font-bold text-black-pure/80 leading-relaxed uppercase italic">
                                    {interview.basics.summary}
                                </p>
                            </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-black-pure/10 flex items-center justify-between">
                            <span className="text-[8px] md:text-[9px] font-black text-black-pure/40 uppercase">
                                Published: {interview.details.published_date || interview.createdAt?.split('T')[0]}
                            </span>
                            <div className="flex gap-1">
                                <div className="w-4 h-px bg-primary-500" />
                                <div className="w-6 h-px bg-secondary-500" />
                                <div className="w-8 h-px bg-tertiary-500" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 flex">
                    <div className="w-1/4 h-full bg-primary-500" />
                    <div className="w-1/4 h-full bg-secondary-500" />
                    <div className="w-1/4 h-full bg-tertiary-500" />
                    <div className="w-1/4 h-full bg-black-pure" />
                </div>
            </motion.div>
        </motion.div>
    )
}