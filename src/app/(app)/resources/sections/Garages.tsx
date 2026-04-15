'use client';

import {
    Map,
    MapControls,
    MapMarker,
    MarkerContent,
    MarkerLabel,
    MarkerPopup,
    type MapViewport,
} from '@/components/ui/map';
import { DESIGN_SYSTEM } from '@/lib/constants';
import { Garage, Media } from '@/payload-types';
import { cn } from '@/utilities/cn';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Box,
    Calendar,
    ChevronRight,
    ExternalLink,
    HardHat,
    Home,
    MapPin,
    Ruler,
    Users,
    Warehouse,
    Wrench,
    X
} from 'lucide-react';
import { useState } from 'react';

interface GaragesSectionProps {
    garages: Garage[];
}

const HQ = { lng: 6.9583, lat: 50.9413, name: 'BASE_OPERATIONS' };

export default function GaragesSection({ garages }: GaragesSectionProps) {
    const [activeGarage, setActiveGarage] = useState<Garage | null>(null);
    const [filter, setFilter] = useState<'all' | 'Permanent' | 'Temporary' | 'Mobile' | 'Popup' | 'Shared'>('all');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [viewport, setViewport] = useState<MapViewport>({
        center: [15.0, 40.0],
        zoom: 2.5,
        bearing: 0,
        pitch: 0,
    });

    const filteredGarages = garages.filter((g) => filter === 'all' || g.details?.type === filter);

    const handleGarageClick = (garage: Garage) => {
        setActiveGarage(garage);
        setSidebarOpen(true);

        if (garage.details?.location) {
            const [lat, lng] = garage.details.location;
            setViewport({
                center: [lng, lat],
                zoom: 12,
                bearing: 0,
                pitch: 0,
            });
        }
    };

    const getTypeIcon = (type?: string | null) => {
        switch (type) {
            case 'Permanent': return Home;
            case 'Temporary': return Calendar;
            case 'Mobile': return Warehouse;
            case 'Popup': return Box;
            default: return HardHat;
        }
    };

    const getAccessibilityColor = (accessibility?: string | null) => {
        switch (accessibility) {
            case 'Restricted': return DESIGN_SYSTEM.COLORS.ZINC[600];
            case 'TeamOnly': return DESIGN_SYSTEM.COLORS.PRIMARY[500];
            case 'Paddock': return DESIGN_SYSTEM.COLORS.SECONDARY[500];
            case 'Public': return DESIGN_SYSTEM.COLORS.TERTIARY[500];
            default: return DESIGN_SYSTEM.COLORS.ZINC[400];
        }
    };

    const miniBevel = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

    return (
        <section
            className="relative w-full border-t"
            style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[200]
            }}
        >
            <div
                className="px-6 md:px-10 lg:px-20 py-16 lg:py-20 flex items-end justify-between border-b"
                style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-2 h-2"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            Infrastructure
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                        Garages
                    </h2>
                </div>
            </div>

            <div
                className="relative w-full h-[750px] overflow-hidden border-b"
                style={{
                    backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                    borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[200]
                }}
            >
                <Map
                    viewport={viewport}
                    onViewportChange={setViewport}
                    theme="light"
                >
                    <MapControls position="bottom-right" showZoom showCompass showLocate showFullscreen />

                    <MapMarker longitude={HQ.lng} latitude={HQ.lat}>
                        <MarkerContent className="size-10 flex items-center justify-center">
                            <div
                                className="absolute inset-0 rounded-full animate-pulse scale-150"
                                style={{
                                    backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                    opacity: 0.1
                                }}
                            />
                            <Home
                                className="size-5"
                                style={{
                                    color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                    fill: DESIGN_SYSTEM.COLORS.PRIMARY[500]
                                }}
                            />
                        </MarkerContent>
                        <MarkerLabel position="bottom" className="text-[7px] font-black px-2 py-1 mt-2 tracking-tighter">
                            BASE_STATION
                        </MarkerLabel>
                    </MapMarker>

                    {filteredGarages.map((garage) => {
                        const location = garage.details?.location;
                        if (!location || location.length < 2) return null;
                        const [lat, lng] = location;
                        const TypeIcon = getTypeIcon(garage.details?.type);
                        const accessibilityColor = getAccessibilityColor(garage.details?.accessibility);
                        const thumbnail = (garage.assets?.thumbnail as Media)?.url || (garage.assets?.cover as Media)?.url;
                        const placeholderImage = `https://picsum.photos/seed/${garage.id}/300/200`;

                        return (
                            <MapMarker
                                key={garage.id}
                                longitude={lng}
                                latitude={lat}
                                onClick={() => handleGarageClick(garage)}
                            >
                                <MarkerContent className="cursor-pointer">
                                    <motion.div
                                        animate={{
                                            scale: activeGarage?.id === garage.id ? 1.3 : 1,
                                            borderColor: activeGarage?.id === garage.id
                                                ? DESIGN_SYSTEM.COLORS.BLACK[600]
                                                : accessibilityColor,
                                            backgroundColor: activeGarage?.id === garage.id
                                                ? accessibilityColor
                                                : DESIGN_SYSTEM.COLORS.WHITE[50]
                                        }}
                                        className={cn(
                                            "size-7 flex items-center justify-center border-2 transition-all duration-300 relative",
                                            activeGarage?.id === garage.id && "z-50"
                                        )}
                                        style={{ clipPath: miniBevel }}
                                    >
                                        <TypeIcon
                                            className="size-3.5"
                                            style={{
                                                color: activeGarage?.id === garage.id
                                                    ? DESIGN_SYSTEM.COLORS.WHITE[50]
                                                    : accessibilityColor
                                            }}
                                        />
                                    </motion.div>
                                </MarkerContent>
                                <MarkerPopup closeButton={false} className="p-0">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="w-[300px] overflow-hidden shadow-2xl"
                                        style={{
                                            backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50],
                                            borderColor: DESIGN_SYSTEM.COLORS.ZINC[200]
                                        }}
                                    >
                                        <div
                                            className="px-4 py-2 flex justify-between items-center border-b"
                                            style={{
                                                backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                                                borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[100]
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="size-1.5"
                                                    style={{ backgroundColor: accessibilityColor }}
                                                />
                                                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    FACILITY_INTEL
                                                </span>
                                            </div>
                                            <span className="text-[8px] font-mono" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                {garage.basics?.identifiers?.code || `GRG-${garage.id.toString().padStart(3, '0')}`}
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="max-w-[70%]">
                                                    <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                        {garage.name}
                                                    </h3>
                                                    <span className="text-[8px] font-bold uppercase mt-1.5 block tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                        {garage.details?.type || 'FACILITY'}
                                                    </span>
                                                </div>
                                                <div
                                                    className="px-2 py-1 text-[8px] font-black uppercase"
                                                    style={{
                                                        backgroundColor: accessibilityColor,
                                                        color: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                                        clipPath: miniBevel
                                                    }}
                                                >
                                                    {garage.details?.accessibility || 'RESTRICTED'}
                                                </div>
                                            </div>
                                            <div
                                                className="aspect-video border mb-5 flex items-center justify-center overflow-hidden"
                                                style={{
                                                    backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                                                    borderColor: DESIGN_SYSTEM.COLORS.ZINC[100]
                                                }}
                                            >
                                                <img
                                                    src={thumbnail || placeholderImage}
                                                    alt={garage.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = placeholderImage;
                                                    }}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div
                                                    className="p-2.5 border"
                                                    style={{
                                                        backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                                                        borderColor: DESIGN_SYSTEM.COLORS.ZINC[100]
                                                    }}
                                                >
                                                    <span className="text-[6px] block mb-1 uppercase font-black tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                        Size
                                                    </span>
                                                    <span className="text-[10px] font-black" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                        {garage.details?.size_sq_m || '0'} SQ.M
                                                    </span>
                                                </div>
                                                <div
                                                    className="p-2.5 border"
                                                    style={{
                                                        backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                                                        borderColor: DESIGN_SYSTEM.COLORS.ZINC[100]
                                                    }}
                                                >
                                                    <span className="text-[6px] block mb-1 uppercase font-black tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                        Capacity
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                        {garage.details?.capacity || '0'} UNITS
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleGarageClick(garage)}
                                                className="w-full mt-3 py-2 flex items-center justify-center gap-2 transition-all group/btn"
                                                style={{
                                                    backgroundColor: DESIGN_SYSTEM.COLORS.BLACK[600],
                                                    clipPath: miniBevel
                                                }}
                                            >
                                                <span className="text-[9px] font-black uppercase tracking-widest group-hover/btn:text-primary-400 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                                                    View Full Details
                                                </span>
                                                <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" style={{ color: DESIGN_SYSTEM.COLORS.WHITE.PURE }} />
                                            </button>
                                        </div>
                                    </motion.div>
                                </MarkerPopup>
                            </MapMarker>
                        );
                    })}
                </Map>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5">
                {[
                    { id: 'all', label: 'ALL_FACILITIES', value: garages.length, icon: Warehouse },
                    { id: 'Permanent', label: 'PERMANENT', value: garages.filter(g => g.details?.type === 'Permanent').length, icon: Home },
                    { id: 'Temporary', label: 'TEMPORARY', value: garages.filter(g => g.details?.type === 'Temporary').length, icon: Calendar },
                    { id: 'Mobile', label: 'MOBILE', value: garages.filter(g => g.details?.type === 'Mobile').length, icon: Box },
                    { id: 'Shared', label: 'SHARED', value: garages.filter(g => g.details?.type === 'Shared').length, icon: Users }
                ].map((stat, i) => (
                    <button
                        key={stat.id}
                        onClick={() => setFilter(stat.id as any)}
                        className={cn(
                            "flex flex-col p-8 md:p-12 border-r last:border-r-0 transition-all duration-500 text-left group relative overflow-hidden",
                            filter === stat.id ? 'bg-zinc-50' : 'bg-white hover:bg-zinc-50'
                        )}
                        style={{
                            borderRightColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                            borderTop: filter === stat.id
                                ? `2px solid ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}`
                                : `2px solid transparent`
                        }}
                    >
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <stat.icon
                                className="size-4"
                                style={{
                                    color: filter === stat.id
                                        ? DESIGN_SYSTEM.COLORS.PRIMARY[500]
                                        : DESIGN_SYSTEM.COLORS.ZINC[400]
                                }}
                            />
                            <span className="text-[7px] font-mono uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                Module_0{i + 1}
                            </span>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest mb-1 transition-colors relative z-10" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                            {stat.label}
                        </span>
                        <div
                            className={cn(
                                "text-4xl md:text-5xl font-black italic tracking-tighter transition-colors duration-500 relative z-10",
                                filter === stat.id ? 'text-black' : 'text-zinc-200'
                            )}
                            style={{
                                color: filter === stat.id
                                    ? DESIGN_SYSTEM.COLORS.BLACK[600]
                                    : DESIGN_SYSTEM.COLORS.ZINC[200]
                            }}
                        >
                            {stat.value}
                        </div>
                    </button>
                ))}
            </div>

            {/* Sidebar Drawer */}
            <AnimatePresence>
                {sidebarOpen && activeGarage && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 h-full w-full max-w-2xl z-[101] overflow-y-auto"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                borderLeft: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[200]}`
                            }}
                        >
                            <div className="p-8 md:p-12">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-2 h-8"
                                                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                                            />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                Facility Dossier
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                            {activeGarage.name}
                                        </h3>
                                        {activeGarage.alias && (
                                            <p className="text-sm font-black uppercase tracking-widest mt-2" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                {activeGarage.alias}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-2 hover:bg-zinc-100 transition-colors"
                                        style={{ clipPath: miniBevel }}
                                    >
                                        <X size={20} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }} />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    <p className="text-sm font-bold uppercase leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                        {activeGarage.basics?.tagline || 'Technical facility documentation.'}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Ruler size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                    Dimensions
                                                </span>
                                            </div>
                                            <span className="text-2xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                {activeGarage.details?.size_sq_m || '0'}
                                            </span>
                                            <span className="text-xs font-black uppercase ml-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                SQ.M
                                            </span>
                                        </div>
                                        <div className="p-6 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Users size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                    Capacity
                                                </span>
                                            </div>
                                            <span className="text-2xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                {activeGarage.details?.capacity || '0'}
                                            </span>
                                            <span className="text-xs font-black uppercase ml-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                UNITS
                                            </span>
                                        </div>
                                    </div>

                                    {activeGarage.details?.amenities?.list && activeGarage.details.amenities.list.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                <Wrench size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                Amenities
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeGarage.details.amenities.list.map((amenity, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1.5 text-[9px] font-black uppercase border"
                                                        style={{
                                                            backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50],
                                                            color: DESIGN_SYSTEM.COLORS.ZINC[700],
                                                            borderColor: DESIGN_SYSTEM.COLORS.ZINC[200]
                                                        }}
                                                    >
                                                        {amenity.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                                    {activeGarage.details?.accessibility || 'Restricted'} Access
                                                </span>
                                            </div>
                                            <button className="flex items-center gap-2 group/btn">
                                                <span className="text-[10px] font-black uppercase tracking-widest group-hover/btn:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    Navigate
                                                </span>
                                                <ExternalLink size={14} className="group-hover/btn:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}