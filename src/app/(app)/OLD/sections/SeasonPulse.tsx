import { DESIGN_SYSTEM } from '@/lib/constants';
import { motion, Transition } from 'framer-motion';
import React from 'react';

interface SeasonPulseProps {
    season: any;
    nextRace?: any;
    championship?: any;
}

const SeasonPulse: React.FC<SeasonPulseProps> = ({
    season,
    nextRace,
    championship,
}) => {
    const zipTransition: Transition = {
        ease: [0.87, 0, 0.13, 1],
        duration: 0.6,
    };

    const series = season?.details?.series;
    const circuit = nextRace?.details?.circuit;

    return (
        <section
            className="relative w-full py-32 px-20 overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
        >
            <div className="grid grid-cols-12 gap-12 items-end">

                {/* ROUND STATUS */}
                <motion.div
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={zipTransition}
                    className="col-span-3 border-l-2 pl-10"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                >
                    <p
                        className={`text-xs font-bold uppercase mb-4 ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                    >
                        {series?.name || season?.name}
                    </p>
                    <h3 className="text-7xl font-black italic uppercase text-white leading-none">
                        {season?.details?.races || '00'}
                    </h3>
                    <p
                        className={`mt-4 text-[10px] uppercase font-black ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}
                        style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                    >
                        Total Rounds
                    </p>
                </motion.div>

                {/* MAIN PULSE / NEXT RACE */}
                <motion.div
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...zipTransition, delay: 0.1 }}
                    className="col-span-6 flex flex-col items-center justify-center text-center p-20 border"
                    style={{
                        borderColor: DESIGN_SYSTEM.COLORS.ZINC_800,
                        background: `linear-gradient(180deg, ${DESIGN_SYSTEM.COLORS.ZINC_950} 0%, transparent 100%)`
                    }}
                >
                    <div
                        className="w-12 h-[2px] mb-8"
                        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                    />
                    <h2
                        className={`text-xs font-black uppercase mb-6 ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}
                    >
                        Upcoming Event
                    </h2>
                    <h1 className="text-7xl font-black italic uppercase text-white leading-[0.9] mb-8">
                        {nextRace?.name || season?.name}
                    </h1>
                    <div className="flex flex-col gap-2">
                        <span className="text-white font-bold uppercase text-lg italic tracking-tighter">
                            {circuit?.name || 'Circuit Data Pending'}
                        </span>
                        <span
                            className="font-mono text-xl font-bold"
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        >
                            {nextRace?.details?.start_date
                                ? new Date(nextRace.details.start_date).toLocaleDateString()
                                : '00.00.2026'}
                        </span>
                    </div>
                </motion.div>

                {/* CHAMPIONSHIP CONTEXT */}
                <motion.div
                    initial={{ x: '100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...zipTransition, delay: 0.2 }}
                    className="col-span-3 border-r-2 pr-10 text-right"
                    style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}
                >
                    <p
                        className={`text-xs font-bold uppercase mb-4 ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_500 }}
                    >
                        {championship?.basics?.identifiers?.abbreviation || 'CHMP'}
                    </p>
                    <h3
                        className="text-7xl font-black italic uppercase leading-none"
                        style={{ color: DESIGN_SYSTEM.COLORS.WHITE }}
                    >
                        {championship?.details?.standings_scope === 'season_only' ? 'ACTV' : 'OPEN'}
                    </h3>
                    <p
                        className={`mt-4 text-[10px] uppercase font-black ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}
                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}
                    >
                        Season Status
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default SeasonPulse;