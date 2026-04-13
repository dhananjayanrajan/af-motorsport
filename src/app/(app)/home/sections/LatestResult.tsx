import { DESIGN_SYSTEM } from '@/lib/constants';
import { motion, Transition } from 'framer-motion';
import React from 'react';

interface ResultProps {
    result: any; // Result collection
}

const LatestResult: React.FC<ResultProps> = ({ result }) => {
    const zipTransition: Transition = {
        ease: [0.87, 0, 0.13, 1],
        duration: 0.6,
    };

    const race = result?.details?.race;
    const driver = result?.details?.driver;
    const circuit = race?.details?.circuit;

    const placeholder = `https://picsum.photos/seed/${result?.id || 'res'}/1200/600?grayscale`;

    return (
        <section
            className="relative w-full py-24 px-20 overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }}
        >
            <div className="flex justify-between items-end mb-12">
                <motion.div
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={zipTransition}
                >
                    <h2 className={`text-xs font-black uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                        {race?.name || 'Latest Result'}
                    </h2>
                    <p className="text-white text-4xl font-black italic uppercase mt-2">Classified Winner</p>
                </motion.div>

                <motion.div
                    initial={{ x: '100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={zipTransition}
                    className="text-right"
                >
                    <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">
                        {circuit?.name || 'Grand Prix'}
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-12 gap-0 border border-zinc-800 relative group overflow-hidden">
                {/* DRIVER IMAGE ZIP REVEAL */}
                <motion.div
                    className="col-span-7 h-[500px] overflow-hidden bg-zinc-900 border-r border-zinc-800"
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={zipTransition}
                >
                    <img
                        src={driver?.assets?.thumbnail?.url || placeholder}
                        alt={driver?.name}
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                </motion.div>

                {/* WINNER DATA ZIP REVEAL */}
                <motion.div
                    className="col-span-5 flex flex-col justify-center px-16 bg-zinc-900"
                    initial={{ x: '100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={zipTransition}
                >
                    <span className="text-[10rem] font-black italic text-white/5 absolute -right-4 top-0 leading-none pointer-events-none">
                        01
                    </span>

                    <h3 className="text-6xl font-black italic uppercase text-white leading-none">
                        {driver?.name || 'Driver'}
                    </h3>
                    <p className="text-zinc-500 uppercase mt-4 font-bold tracking-[0.3em]">
                        {driver?.details?.nationality || 'Finishing Position'}
                    </p>

                    <div className="mt-12 space-y-4">
                        <div className="flex justify-between border-b border-zinc-800 pb-2">
                            <span className="text-zinc-500 uppercase text-[10px] font-bold">Gap</span>
                            <span className="text-white font-mono">INTERVAL</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-800 pb-2">
                            <span className="text-zinc-500 uppercase text-[10px] font-bold">Points</span>
                            <span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} className="font-mono">+25</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LatestResult;