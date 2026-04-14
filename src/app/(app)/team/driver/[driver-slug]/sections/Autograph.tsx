'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface AutographSectionProps {
    driver: any;
}

export default function AutographSection({ driver }: AutographSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.3, once: true });

    const signatureUrl = driver.assets?.signature?.url;
    const cardImageUrl = driver.assets?.portrait?.url || driver.assets?.cover?.url || `https://picsum.photos/seed/${driver.id}_card/800/1200`;
    const racingNumber = driver.basics?.racing_number || '00';
    const fullName = `${driver.first_name} ${driver.last_name}`;
    const entryDate = new Date(driver.createdAt).getFullYear();

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 md:py-48 bg-white overflow-hidden flex flex-col items-center"
        >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
                <div className="flex flex-col gap-8 rotate-[-10deg] scale-125">
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="text-[12vw] font-black uppercase italic leading-none whitespace-nowrap">
                            {fullName} // {racingNumber} // {driver.slug}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="flex flex-col items-center gap-4 mb-20 text-center"
                >
                    <span className="text-xs font-black uppercase tracking-[0.5em] text-zinc-400">
                        {driver.alias || 'Driver'} Profile
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter text-zinc-900">
                        Signature <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>Series</span>
                    </h2>
                </motion.div>

                <div className="relative group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-[320px] md:w-[450px] aspect-[2/3] bg-zinc-950 border-[12px] border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                src={cardImageUrl}
                                alt={fullName}
                                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>

                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20" />

                        <div className="absolute top-8 left-8 z-20 flex flex-col">
                            <span className="text-5xl md:text-7xl font-black italic text-white/20 leading-none">
                                {racingNumber}
                            </span>
                            <div className="h-1 w-12 bg-white/20 mt-2" />
                        </div>

                        <div className="absolute inset-x-8 bottom-12 z-20 flex flex-col items-center">
                            {signatureUrl && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.8, duration: 1 }}
                                    className="w-full h-32 md:h-40 relative mb-6"
                                >
                                    <img
                                        src={signatureUrl}
                                        alt={`${fullName} Signature`}
                                        className="w-full h-full object-contain invert brightness-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                    />
                                </motion.div>
                            )}

                            <div className="flex flex-col items-center">
                                <span className="text-2xl md:text-3xl font-black italic uppercase text-white tracking-tighter">
                                    {fullName}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mt-1">
                                    {driver.basics?.catchphrase || 'Professional Driver'}
                                </span>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 p-8 z-20">
                            <div className="w-10 h-10 border border-white/10 flex items-center justify-center rotate-45">
                                <div className="w-2 h-2 bg-white" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="absolute -inset-4 border border-zinc-100 -z-10 pointer-events-none" />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5 }}
                    className="mt-20 flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-8">
                        <div className="h-px w-20 bg-zinc-200" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            Serial ID: {driver.id} // Established {entryDate}
                        </span>
                        <div className="h-px w-20 bg-zinc-200" />
                    </div>

                    <p className="max-w-md text-center text-xs font-bold uppercase italic text-zinc-400 leading-relaxed">
                        {driver.seo?.description || `Digital record of ${fullName}. All competitive parameters and career achievements verified via system archive.`}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}