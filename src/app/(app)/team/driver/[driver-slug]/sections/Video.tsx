'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import React from 'react';

interface VideoSectionProps {
    driver: any;
}

const VideoSection: React.FC<VideoSectionProps> = ({ driver }) => {
    const videoUrl = driver.assets?.video?.url || 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-fast-on-a-highway-4830-large.mp4';
    const posterUrl = driver.assets?.cover?.url || `https://picsum.photos/seed/${driver.id}/1920/1080`;

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end bg-[#F8F9FA]">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={posterUrl}
                    className="w-full h-full object-cover"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0) 100%)'
                    }}
                />
            </div>

            <div className="relative z-20 w-full px-10 pb-20 flex flex-col items-center text-center">
                <div className="overflow-hidden mb-4">
                    <p
                        className={`text-[#00FF41] text-sm font-black uppercase italic animate-in fade-in slide-in-from-bottom-full duration-500 ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_2XL}`}
                    >
                        Official Driver
                    </p>
                </div>

                <div className="flex flex-col mb-10 overflow-hidden">
                    <h1 className="text-5xl md:text-7xl font-black text-[#FFFFFF] uppercase italic leading-none">
                        <span className="inline-block animate-in fade-in slide-in-from-bottom-full duration-700 delay-100 fill-mode-both">
                            {driver.first_name}
                        </span>
                        <span className="mx-2" />
                        <span className="inline-block animate-in fade-in slide-in-from-bottom-full duration-700 delay-200 fill-mode-both">
                            {driver.last_name}
                        </span>
                    </h1>
                </div>

                <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
                    <div className="flex flex-col items-center -space-y-2 animate-bounce">
                        <svg
                            width="40"
                            height="12"
                            viewBox="0 0 40 15"
                            className="fill-[#00FF41]"
                        >
                            <path d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z" />
                        </svg>
                        <svg
                            width="40"
                            height="12"
                            viewBox="0 0 40 15"
                            className="fill-[#00FF41] opacity-30"
                        >
                            <path d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z" />
                        </svg>
                    </div>
                    <span
                        className={`text-[#FFFFFF] text-[10px] font-black uppercase mt-2 ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}
                    >
                        Scroll Down
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none z-30">
                <div className="absolute top-12 left-12 flex flex-col gap-2">
                    <div className="flex gap-1 animate-in fade-in duration-1000">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="w-10 h-[2px] bg-[#00FF41] origin-left animate-in slide-in-from-left duration-700"
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>
                    <span className={`text-[#FFFFFF] text-[10px] font-black uppercase italic ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT}`}>
                        {driver.basics?.callsign || 'UNIT_01'}
                    </span>
                </div>

                <div className="absolute top-12 right-12 text-right animate-in fade-in slide-in-from-right duration-700">
                    <p className={`text-[#00FF41] text-2xl font-black italic leading-none ${DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL}`}>
                        {driver.basics?.racing_number || '00'}
                    </p>
                    <div className="h-[2px] w-full bg-[#FFFFFF]/20 mt-1" />
                </div>

                <div className="absolute bottom-12 left-12 flex items-center gap-4 animate-in fade-in slide-in-from-left duration-700 delay-300">
                    <div
                        className="w-3 h-3 bg-[#00FF41] rotate-45"
                        style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
                    />
                    <span className="text-[#FFFFFF]/60 text-[9px] font-bold uppercase tracking-widest">
                        AF Motorsport / Driver Roster
                    </span>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;