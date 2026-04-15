'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Driver, Helmet, Media } from '@/payload-types';
import { Environment, PerspectiveCamera, SpotLight, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HelmetsSectionProps {
    helmets: Helmet[];
    drivers: Driver[];
}

function HelmetModel({ isActive }: { isActive: boolean }) {
    const group = useRef<THREE.Group>(null);
    const [hasError, setHasError] = useState(false);

    const { scene } = useGLTF('/helmet.gltf', undefined, undefined, (error) => {
        console.warn('GLTF not found, using fallback model');
        setHasError(true);
    });

    useFrame((state) => {
        if (!group.current) return;

        if (isActive) {
            group.current.rotation.y += 0.005;
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    if (hasError) {
        return (
            <mesh ref={group} position={[0, 0, 0]}>
                <sphereGeometry args={[1.2, 64, 64]} />
                <meshStandardMaterial
                    color={DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                    roughness={0.3}
                    metalness={0.7}
                    emissive={DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                    emissiveIntensity={0.1}
                />
            </mesh>
        );
    }

    return <primitive ref={group} object={scene.clone()} scale={2.5} position={[0, -0.5, 0]} />;
}

export default function HelmetsSection({ helmets, drivers }: HelmetsSectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        dragFree: true
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentHelmet = helmets[selectedIndex % helmets.length];
    const currentDriver = drivers[selectedIndex % drivers.length];

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        onSelect();

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    useEffect(() => {
        if (isPaused || !emblaApi) return;

        const timer = setInterval(() => {
            emblaApi.scrollNext();
        }, 8000);

        return () => clearInterval(timer);
    }, [isPaused, emblaApi]);

    return (
        <section
            className="relative w-full h-screen overflow-hidden"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[950] }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={45} />

                    <SpotLight
                        position={[2, 3, 2]}
                        angle={0.5}
                        penumbra={0.5}
                        intensity={2}
                        castShadow
                        color={DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                    />
                    <SpotLight
                        position={[-2, 2, 3]}
                        angle={0.4}
                        penumbra={0.4}
                        intensity={1.5}
                        color="#ffffff"
                    />
                    <SpotLight
                        position={[0, 5, 0]}
                        angle={0.8}
                        penumbra={0.8}
                        intensity={1}
                        color={DESIGN_SYSTEM.COLORS.SECONDARY[500]}
                    />

                    <Environment preset="studio" />

                    <Suspense fallback={null}>
                        <AnimatePresence mode="wait">
                            <HelmetModel key={selectedIndex} isActive={!isPaused} />
                        </AnimatePresence>
                    </Suspense>
                </Canvas>
            </div>

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, transparent 0%, ${DESIGN_SYSTEM.COLORS.BLACK[950]}CC 100%)`
                }}
            />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-30 p-8 md:p-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-[2px]" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                        Protective Aesthetics
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                        {selectedIndex + 1} / {helmets.length}
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-20 h-full flex flex-col justify-end pb-24">
                {/* Embla Carousel - Thumbnail Strip */}
                <div className="w-full overflow-hidden py-8" ref={emblaRef}>
                    <div className="flex">
                        {helmets.map((helmet, index) => {
                            const avatar = (helmet.assets?.avatar as Media)?.url || (helmet.assets?.thumbnail as Media)?.url;
                            const placeholderImage = `https://picsum.photos/seed/helmet-${helmet.id}/200/200`;
                            const isActive = index === selectedIndex;

                            return (
                                <div
                                    key={helmet.id}
                                    className="flex-[0_0_120px] md:flex-[0_0_160px] mx-3 cursor-pointer transition-all duration-500"
                                    style={{
                                        opacity: isActive ? 1 : 0.4,
                                        transform: isActive ? 'scale(1.1)' : 'scale(0.9)',
                                        filter: isActive ? 'blur(0px)' : 'blur(1px)'
                                    }}
                                    onClick={() => emblaApi?.scrollTo(index)}
                                >
                                    <div
                                        className="aspect-square overflow-hidden border-2 transition-all"
                                        style={{
                                            borderColor: isActive ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[700],
                                            clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
                                        }}
                                    >
                                        <img
                                            src={avatar || placeholderImage}
                                            alt={helmet.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = placeholderImage;
                                            }}
                                        />
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeThumb"
                                            className="h-1 mt-2"
                                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Info Panel */}
                <motion.div
                    className="max-w-[1400px] mx-auto px-6 md:px-10 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500], borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                    {currentHelmet?.details?.year || '2026'}
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                    {currentHelmet?.details?.usage || 'PRO TRACK'}
                                </span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                                {currentHelmet?.name}
                            </h2>
                            <p className="text-sm font-bold uppercase max-w-2xl" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                {currentHelmet?.details?.material || 'CARBON COMPOSITE'} / {currentHelmet?.details?.style || 'AERODYNAMIC'}
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link
                                href={`/team/driver/${currentDriver?.slug || '#'}`}
                                className="group flex items-center gap-4"
                            >
                                <div>
                                    <span className="text-[8px] font-black uppercase tracking-widest block" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                        DRIVER
                                    </span>
                                    <span className="text-sm font-black uppercase group-hover:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                                        {currentDriver?.first_name} {currentDriver?.last_name}
                                    </span>
                                </div>
                                <div
                                    className="w-10 h-10 flex items-center justify-center transition-all group-hover:bg-primary-500"
                                    style={{
                                        backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[800],
                                        clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                                    }}
                                >
                                    <ChevronRight size={16} className="group-hover:text-black transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} />
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center transition-all hover:bg-white/10"
                style={{
                    border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[700]}`,
                    clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                }}
            >
                <ChevronRight size={24} className="rotate-180" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} />
            </button>
            <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center transition-all hover:bg-white/10"
                style={{
                    border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[700]}`,
                    clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                }}
            >
                <ChevronRight size={24} style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} />
            </button>
        </section>
    );
}