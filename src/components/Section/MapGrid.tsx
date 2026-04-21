'use client'

import { Map, MapControls, MapMarker, type MapViewport } from '@/components/ui/map'
import { MapPin, Navigation, X } from 'lucide-react'
import React, { useState } from 'react'
import SectionScroller from './Scroller'

export interface MapLocation {
    id: string
    title: string
    lat: number
    lng: number
    label?: string
    metadata?: { label: string; value: string }[]
    category?: string
}

interface MapGridProps {
    id: string
    title: string
    locations: MapLocation[]
    initialCenter?: [number, number]
    initialZoom?: number
}

const MapGrid: React.FC<MapGridProps> = ({
    id,
    title,
    locations,
    initialCenter = [0, 20],
    initialZoom = 2
}) => {
    const [viewport, setViewport] = useState<MapViewport>({
        center: initialCenter,
        zoom: initialZoom,
        bearing: 0,
        pitch: 0,
    })
    const [activeLocation, setActiveLocation] = useState<MapLocation | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleMarkerClick = (loc: MapLocation) => {
        setActiveLocation(loc)
        setSidebarOpen(true)
        setViewport(prev => ({
            ...prev,
            center: [loc.lng, loc.lat],
            zoom: 12,
            transitionDuration: 1000
        }))
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
        setTimeout(() => setActiveLocation(null), 300)
    }

    return (
        <section className="relative w-full min-h-[80vh] bg-white-pure flex flex-col overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-4 md:px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-tight text-neutral-400 font-mono">{id}</span>
                    <div className="h-3 w-px bg-neutral-200" />
                    <h2 className="text-[10px] md:text-xs text-primary-500 uppercase tracking-wide font-black">{title}</h2>
                </div>
                <div className="text-[8px] md:text-[10px] font-mono text-neutral-400">
                    {locations.length} LOCATIONS
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative">
                <div className={`lg:w-96 bg-white-pure flex flex-col z-30 transition-all duration-500 ${sidebarOpen ? 'w-full absolute lg:relative inset-0' : 'w-full lg:w-96'}`}>
                    <div className="p-4 md:p-6 lg:p-8 border-b border-black-pure bg-gradient-to-r from-neutral-50 to-white-pure">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[9px] md:text-[10px] font-black text-primary-500 uppercase tracking-wider block mb-1">
                                    ACTIVE NETWORK
                                </span>
                                <h3 className="font-race text-xl md:text-2xl lg:text-3xl text-black-pure uppercase leading-[1.1]">
                                    {activeLocation ? activeLocation.title : 'GLOBAL REGISTRY'}
                                </h3>
                            </div>
                            {sidebarOpen && (
                                <button onClick={closeSidebar} className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-300">
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                        {activeLocation ? (
                            <>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary-500">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider">COORDINATES LOCKED</span>
                                    </div>
                                    {activeLocation.metadata?.map((meta, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-neutral-100 pb-2 group hover:border-primary-500 transition-colors duration-300">
                                            <span className="text-[8px] md:text-[9px] font-black text-neutral-400 uppercase tracking-wider">{meta.label}</span>
                                            <span className="text-[10px] md:text-xs font-black text-black-pure uppercase group-hover:text-primary-500 transition-colors duration-300">{meta.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={closeSidebar}
                                    className="w-full py-3 md:py-4 border-2 border-black-pure text-[9px] md:text-[10px] font-black uppercase tracking-wider hover:bg-black-pure hover:text-white-pure transition-all duration-300"
                                >
                                    RESET VIEWPORT
                                </button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-[10px] md:text-xs text-neutral-500 uppercase leading-relaxed font-medium">
                                    Select a coordinate on the map to access location telemetry and technical data.
                                </p>
                                <div className="pt-4 space-y-2">
                                    {locations.slice(0, 5).map(loc => (
                                        <button
                                            key={loc.id}
                                            onClick={() => handleMarkerClick(loc)}
                                            className="w-full flex items-center justify-between p-3 border border-neutral-100 hover:border-primary-500 text-left group transition-all duration-300"
                                        >
                                            <div>
                                                <span className="text-[9px] md:text-[10px] font-black text-black-pure uppercase">{loc.title}</span>
                                                {loc.label && (
                                                    <p className="text-[8px] text-neutral-400 uppercase mt-0.5">{loc.label}</p>
                                                )}
                                            </div>
                                            <Navigation className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 relative bg-neutral-100 h-[450px] md:h-[500px] lg:h-auto min-h-[500px]">
                    <Map viewport={viewport} onViewportChange={setViewport} theme="light">
                        <MapControls position="bottom-right" />
                        {locations.map((loc) => (
                            <MapMarker
                                key={loc.id}
                                longitude={loc.lng}
                                latitude={loc.lat}
                                onClick={() => handleMarkerClick(loc)}
                            >
                                <div className={`cursor-pointer transition-all duration-500 ${activeLocation?.id === loc.id ? 'scale-150' : 'scale-100 hover:scale-125'}`}>
                                    <div className={`w-5 h-5 md:w-6 md:h-6 rotate-45 border-2 flex items-center justify-center transition-all duration-300 ${activeLocation?.id === loc.id ? 'bg-primary-500 border-black-pure shadow-lg shadow-primary-500/50' : 'bg-white-pure border-primary-500 hover:bg-primary-500'}`}>
                                        <div className="w-1 h-1 bg-black-pure rounded-full" />
                                    </div>
                                    {loc.label && (
                                        <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-black-pure text-white-pure px-2 py-0.5 md:px-2.5 md:py-1 whitespace-nowrap shadow-lg">
                                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-tighter">{loc.label}</span>
                                        </div>
                                    )}
                                </div>
                            </MapMarker>
                        ))}
                    </Map>
                </div>
            </div>

            <SectionScroller items={[title, id, "MAPPED", "COORDINATES", "GLOBAL"]} variant={4} velocity={35} />
        </section>
    )
}

export default MapGrid