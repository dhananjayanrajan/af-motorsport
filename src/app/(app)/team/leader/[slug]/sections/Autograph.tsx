'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface AutographSectionProps {
    leader: any;
}

export default function AutographSection({ leader }: AutographSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.3, once: true });

    const signatureUrl = leader.assets?.signature?.url;
    const cardImageUrl = leader.assets?.portrait?.url || leader.assets?.cover?.url || `https://picsum.photos/seed/${leader.id}_card/800/1200`;
    const racingNumber = leader.basics?.racing_number || '00';
    const fullName = `${leader.first_name} ${leader.last_name}`;
    const entryDate = new Date(leader.createdAt).getFullYear();

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 md:py-48 overflow-hidden flex flex-col items-center select-none"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
        >
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            >
                <div className="flex flex-col gap-8 rotate-[-10deg] scale-125">
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="text-[12vw] font-black uppercase italic leading-none whitespace-nowrap">
                            {fullName} // {racingNumber} // {leader.slug}
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
                    <span
                        className="text-xs font-black uppercase tracking-[0.5em]"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                    >
                        {leader.alias || 'Executive'} Profile
                    </span>
                    <h2
                        className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter"
                        style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                    >
                        Signature <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Series</span>
                    </h2>
                </motion.div>

                <div className="relative group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-[320px] md:w-[450px] aspect-[2/3] border-[12px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
                        style={{
                            backgroundColor: DESIGN_SYSTEM.COLORS.BLACK.PURE,
                            borderColor: DESIGN_SYSTEM.COLORS.ZINC[900]
                        }}
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                src={cardImageUrl}
                                alt={fullName}
                                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>

                        <div
                            className="absolute inset-0 z-10 bg-gradient-to-t via-transparent"
                            style={{
                                backgroundImage: `linear-gradient(to top, ${DESIGN_SYSTEM.COLORS.BLACK.PURE}, transparent, ${DESIGN_SYSTEM.COLORS.BLACK.PURE}33)`
                            }}
                        />

                        <div className="absolute top-8 left-8 z-20 flex flex-col">
                            <span
                                className="text-5xl md:text-7xl font-black italic leading-none"
                                style={{ color: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}33` }}
                            >
                                {racingNumber}
                            </span>
                            <div
                                className="h-1 w-12 mt-2"
                                style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}33` }}
                            />
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
                                <span
                                    className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter"
                                    style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                >
                                    {fullName}
                                </span>
                                <span
                                    className="text-[10px] font-black uppercase tracking-[0.3em] mt-1"
                                    style={{ color: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}66` }}
                                >
                                    {leader.basics?.catchphrase || 'Professional Leader'}
                                </span>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 p-8 z-20">
                            <div
                                className="w-10 h-10 border flex items-center justify-center rotate-45"
                                style={{ borderColor: `${DESIGN_SYSTEM.COLORS.WHITE.PURE}1A` }}
                            >
                                <div
                                    className="w-2 h-2"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div
                        className="absolute -inset-4 border -z-10 pointer-events-none"
                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5 }}
                    className="mt-20 flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-8">
                        <div
                            className="h-px w-20"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                        />
                        <span
                            className="text-[10px] font-black uppercase tracking-[0.5em]"
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                        >
                            Serial ID: {leader.id} // Established {entryDate}
                        </span>
                        <div
                            className="h-px w-20"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                        />
                    </div>

                    <p
                        className="max-w-md text-center text-xs font-bold uppercase italic leading-relaxed"
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                    >
                        {leader.seo?.description || `Digital record of ${fullName}. All competitive parameters and career achievements verified via system archive.`}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}