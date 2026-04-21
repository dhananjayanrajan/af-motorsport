'use client'

import { Map, MapControls, MapMarker, type MapViewport } from '@/components/ui/map'
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
    initialCenter?: [number, number] // [lng, lat]
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

    const handleMarkerClick = (loc: MapLocation) => {
        setActiveLocation(loc)
        setViewport(prev => ({
            ...prev,
            center: [loc.lng, loc.lat],
            zoom: 10,
            transitionDuration: 1000
        }))
    }

    return (
        <section className="relative w-full min-h-[80vh] bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-40 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-black-pure">
                {/* Information Sidebar */}
                <div className="w-full lg:w-96 bg-white-pure flex flex-col z-30">
                    <div className="p-8 border-b border-black-pure bg-neutral-50">
                        <span className="text-[9px] font-bold text-primary-500 uppercase tracking-widest block mb-2">Network Status</span>
                        <h3 className="font-race text-3xl text-black-pure uppercase leading-none">
                            {activeLocation ? activeLocation.title : 'Global Registry'}
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {activeLocation ? (
                            <>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Technical Data</span>
                                    {activeLocation.metadata?.map((meta, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-neutral-100 pb-2">
                                            <span className="text-[9px] font-bold text-neutral-400 uppercase">{meta.label}</span>
                                            <span className="text-[11px] font-bold text-black-pure uppercase">{meta.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setActiveLocation(null)}
                                    className="w-full py-4 border border-black-pure text-[10px] font-bold uppercase hover:bg-black-pure hover:text-white-pure transition-colors"
                                >
                                    Reset Viewport
                                </button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-[11px] text-neutral-500 uppercase leading-relaxed">
                                    Select a tactical coordinate on the map to initialize data link and retrieve specific location telemetry.
                                </p>
                                <div className="pt-4 space-y-2">
                                    {locations.slice(0, 5).map(loc => (
                                        <button
                                            key={loc.id}
                                            onClick={() => handleMarkerClick(loc)}
                                            className="w-full flex items-center justify-between p-3 border border-neutral-100 hover:border-black-pure text-left group transition-all"
                                        >
                                            <span className="text-[10px] font-bold text-black-pure uppercase">{loc.title}</span>
                                            <span className="text-[9px] text-primary-500 font-bold uppercase opacity-0 group-hover:opacity-100">Focus</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Interface */}
                <div className="flex-1 relative bg-neutral-100 h-[500px] lg:h-auto">
                    <Map viewport={viewport} onViewportChange={setViewport} theme="light">
                        <MapControls position="bottom-right" />
                        {locations.map((loc) => (
                            <MapMarker
                                key={loc.id}
                                longitude={loc.lng}
                                latitude={loc.lat}
                                onClick={() => handleMarkerClick(loc)}
                            >
                                <div className={`cursor-pointer transition-all duration-500 ${activeLocation?.id === loc.id ? 'scale-125' : 'scale-100 hover:scale-110'}`}>
                                    <div className={`w-6 h-6 rotate-45 border-2 flex items-center justify-center transition-colors ${activeLocation?.id === loc.id ? 'bg-primary-500 border-black-pure' : 'bg-white-pure border-primary-500'}`}>
                                        <div className="w-1.5 h-1.5 bg-black-pure rounded-full" />
                                    </div>
                                    {loc.label && (
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black-pure text-white-pure px-2 py-1 whitespace-nowrap">
                                            <span className="text-[8px] font-bold uppercase tracking-tighter">{loc.label}</span>
                                        </div>
                                    )}
                                </div>
                            </MapMarker>
                        ))}
                    </Map>
                </div>
            </div>

            <div className="z-40 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, `COORDINATES_MAPPED_${locations.length}`]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default MapGrid