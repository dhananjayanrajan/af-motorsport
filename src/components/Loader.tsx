"use client"

import { DESIGN_SYSTEM } from '@/lib/constants';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
    const [phase, setPhase] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(res => setTimeout(res, 400));
            setPhase(1);
            await new Promise(res => setTimeout(res, 600));
            setPhase(2);
            await new Promise(res => setTimeout(res, 600));
            setPhase(3);
            await new Promise(res => setTimeout(res, 600));
            setPhase(4);
            await new Promise(res => setTimeout(res, 600));
            setPhase(5);

            const randomHold = Math.random() * (2000 - 800) + 800;
            await new Promise(res => setTimeout(res, randomHold));

            setPhase(6);

            setTimeout(() => setIsLoading(false), 1200);
        };

        sequence();
    }, []);

    const rowVariants: Variants = {
        initial: { opacity: 0.1, scale: 0.95 },
        active: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
                mass: 0.5
            }
        }
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[950] }}
                >
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `conic-gradient(${DESIGN_SYSTEM.COLORS.WHITE.PURE} 90deg, transparent 0 180deg, ${DESIGN_SYSTEM.COLORS.WHITE.PURE} 0 270deg, transparent 0)`,
                        backgroundSize: '12px 12px'
                    }} />

                    <motion.div
                        className="relative z-10 flex gap-4 md:gap-8"
                        animate={phase === 5 ? {
                            x: [-1, 1, -1],
                            y: [1, -1, 1],
                            transition: { repeat: Infinity, duration: 0.08 }
                        } : {}}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                variants={rowVariants}
                                initial="initial"
                                animate={(phase > i && phase < 6) ? "active" : "initial"}
                                className="flex flex-col gap-3 md:gap-5"
                            >
                                <div
                                    className="size-10 md:size-20 rounded-full relative flex items-center justify-center shadow-inner"
                                    style={{
                                        backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                        border: `4px solid ${DESIGN_SYSTEM.COLORS.BLACK[400]}`
                                    }}
                                >
                                    <div
                                        className={`absolute inset-0 rounded-full transition-opacity duration-150 ${(phase > i && phase < 6) ? 'opacity-100' : 'opacity-0'}`}
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                            boxShadow: `0 0 80px 20px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`
                                        }}
                                    />
                                    <div
                                        className="size-3 md:size-6 rounded-full transition-colors duration-150"
                                        style={{ backgroundColor: (phase > i && phase < 6) ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.BLACK[400] }}
                                    />
                                </div>
                                <div
                                    className="size-10 md:size-20 rounded-full relative flex items-center justify-center shadow-inner"
                                    style={{
                                        backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                        border: `4px solid ${DESIGN_SYSTEM.COLORS.BLACK[400]}`
                                    }}
                                >
                                    <div
                                        className={`absolute inset-0 rounded-full transition-opacity duration-150 ${(phase > i && phase < 6) ? 'opacity-100' : 'opacity-0'}`}
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                            boxShadow: `0 0 80px 20px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}`
                                        }}
                                    />
                                    <div
                                        className="size-3 md:size-6 rounded-full transition-colors duration-150"
                                        style={{ backgroundColor: (phase > i && phase < 6) ? DESIGN_SYSTEM.COLORS.WHITE.PURE : DESIGN_SYSTEM.COLORS.BLACK[400] }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {phase === 6 && (
                        <div className="absolute inset-0 z-20 flex">
                            <motion.div
                                initial={{ x: '0%' }}
                                animate={{ x: '-100%' }}
                                transition={{ duration: 0.7, ease: [0.9, 0, 0.1, 1], delay: 0.1 }}
                                className="w-1/2 h-full flex items-center justify-end pr-20"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                    borderRight: `2px solid ${DESIGN_SYSTEM.COLORS.PRIMARY.MUTED}`
                                }}
                            >
                                <div
                                    className="h-1/3 w-1 rounded-full"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], opacity: 0.1 }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ x: '0%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 0.7, ease: [0.9, 0, 0.1, 1], delay: 0.1 }}
                                className="w-1/2 h-full flex items-center justify-start pl-20"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                    borderLeft: `2px solid ${DESIGN_SYSTEM.COLORS.PRIMARY.MUTED}`
                                }}
                            >
                                <div
                                    className="h-1/3 w-1 rounded-full"
                                    style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], opacity: 0.1 }}
                                />
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;