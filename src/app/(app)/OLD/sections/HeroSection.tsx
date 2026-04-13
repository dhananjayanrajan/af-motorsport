import { DESIGN_SYSTEM } from '@/lib/constants';
import { motion, Transition } from 'framer-motion';
import React from 'react';

interface Media {
    id: number;
    url: string;
}

interface Series {
    name: string;
    basics?: {
        identifiers?: {
            abbreviation?: string | null;
            code?: string | null;
        };
        tagline?: string | null;
    };
    assets?: {
        cover?: Media | null;
    };
}

interface Season {
    name: string;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
    };
    details: {
        series: number | Series;
    };
    assets?: {
        cover?: Media | null;
    };
}

interface HeroProps {
    season: Season;
}

const Hero: React.FC<HeroProps> = ({ season }) => {
    if (!season || !season.details) return null;

    const series = typeof season.details.series === 'object' ? season.details.series : null;

    const backgroundMedia = season.assets?.cover?.url
        || series?.assets?.cover?.url
        || `https://picsum.photos/seed/${season.name.replace(/\s/g, '')}/1920/1080?grayscale`;

    const zipTransition: Transition = {
        ease: [0.87, 0, 0.13, 1],
        duration: 0.6,
    };

    return (
        <section
            className="relative w-full h-screen overflow-hidden flex items-center px-20"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_900 }}
        >
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={zipTransition}
                className="absolute inset-0 z-0"
            >
                <img
                    src={backgroundMedia}
                    alt={season.name}
                    className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
                    onLoad={(e) => (e.currentTarget.style.opacity = "0.4")}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: DESIGN_SYSTEM.EFFECTS.MEDIA_OVERLAY }}
                />
            </motion.div>

            <div className="relative z-10 w-full">
                <div className="flex flex-col gap-2">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{ ...zipTransition, delay: 0.1 }}
                    >
                        <span
                            className={`text-xs font-bold uppercase ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}
                            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        >
                            {series?.basics?.identifiers?.abbreviation || series?.name || season.name}
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ x: '-110%' }}
                        animate={{ x: 0 }}
                        transition={{ ...zipTransition, delay: 0.2 }}
                        className="overflow-hidden"
                    >
                        <h1
                            className="text-[12rem] font-black italic uppercase leading-[0.85] -ml-2"
                            style={{
                                color: DESIGN_SYSTEM.COLORS.WHITE,
                                letterSpacing: '-0.05em'
                            }}
                        >
                            {season.name}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{ ...zipTransition, delay: 0.3 }}
                        className="flex items-center gap-8 mt-6"
                    >
                        <div
                            className="h-px w-32"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <p
                            className={`max-w-md uppercase font-medium text-sm ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}
                            style={{ color: DESIGN_SYSTEM.COLORS.ZINC_400 }}
                        >
                            {series?.basics?.tagline || season.name}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ y: '200%' }}
                    animate={{ y: 0 }}
                    transition={{ ...zipTransition, delay: 0.5 }}
                    className="mt-16"
                >
                    <button
                        className="group relative py-5 px-12 overflow-hidden transition-all"
                        style={{
                            backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                            clipPath: DESIGN_SYSTEM.SHAPES.RECT_CLIP
                        }}
                    >
                        <span
                            className="relative z-10 text-xs font-black uppercase tracking-widest transition-colors duration-300 group-hover:text-white"
                            style={{ color: DESIGN_SYSTEM.COLORS.BLACK }}
                        >
                            {series?.basics?.identifiers?.code || season.basics?.identifiers?.code || season.name}
                        </span>
                        <div
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_800 }}
                        />
                    </button>
                </motion.div>
            </div>

            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ ...zipTransition, delay: 0.4 }}
                className="absolute bottom-10 right-10 flex items-center gap-4"
            >
                <div
                    className="text-[10vw] font-black italic leading-none select-none opacity-5"
                    style={{
                        color: DESIGN_SYSTEM.COLORS.WHITE,
                    }}
                >
                    {series?.basics?.identifiers?.abbreviation || series?.name || season.name}
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;