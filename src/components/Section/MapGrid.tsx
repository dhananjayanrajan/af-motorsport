'use client'

import { Map, MapControls, MapMarker, type MapViewport } from '@/components/ui/map'
import { Navigation, X } from 'lucide-react'
import React, { useState } from 'react'
import SectionFooter from './Footer'
import SectionHeader from './Header'

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

    if (!locations || locations.length === 0) return null

    return (
        <section className="relative w-full bg-white-pure flex flex-col overflow-hidden border-b-2 border-black-pure">
            <SectionHeader
                title={title}
                subtitle={id}
                variant={3}
            />

            <div className="flex h-12 bg-black-pure border-b-2 border-black-pure divide-x-2 divide-white-pure/20">
                <div className="flex-1 flex items-center px-6">
                    <span className="font-mono text-[10px] font-black text-primary-500 uppercase">
                        LOCATIONS_DETECTED: {locations.length.toString().padStart(3, '0')}
                    </span>
                </div>
                <button
                    onClick={() => setViewport({ center: initialCenter, zoom: initialZoom, bearing: 0, pitch: 0 })}
                    className="px-6 text-white-pure font-mono text-[10px] font-black hover:bg-white-pure hover:text-black-pure transition-colors"
                >
                    RESET_COORDINATES
                </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative min-h-[600px] lg:min-h-[700px]">
                <div className={`lg:w-[400px] bg-white-pure border-r-2 border-black-pure flex flex-col z-30 transition-all duration-500 ${sidebarOpen ? 'w-full absolute lg:relative inset-0' : 'w-full lg:w-[400px]'}`}>
                    <div className="p-8 border-b-2 border-black-pure bg-neutral-50">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <span className="font-mono text-[10px] font-black text-secondary-500 uppercase block italic">
                                    // DATA_TELEMETRY
                                </span>
                                <h3 className="font-bold text-2xl md:text-3xl text-black-pure uppercase leading-none">
                                    {activeLocation ? activeLocation.title : 'GLOBAL_REGISTRY'}
                                </h3>
                            </div>
                            {sidebarOpen && (
                                <button
                                    onClick={closeSidebar}
                                    className="w-12 h-12 flex items-center justify-center bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {activeLocation ? (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-6 bg-primary-500" />
                                        <span className="font-mono text-[10px] font-black uppercase text-black-pure">LOCATION_METADATA</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {activeLocation.metadata?.map((meta, i) => (
                                            <div key={i} className="p-4 bg-neutral-50 border-2 border-black-pure flex flex-col gap-1">
                                                <span className="font-mono text-[9px] font-black text-neutral-400 uppercase tracking-widest">{meta.label}</span>
                                                <span className="text-sm font-black text-black-pure uppercase">{meta.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 border-2 border-primary-500 bg-primary-500/5">
                                    <p className="font-mono text-[10px] font-black text-black-pure leading-tight uppercase">
                                        LAT: {activeLocation.lat.toFixed(4)} <br />
                                        LNG: {activeLocation.lng.toFixed(4)}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p className="font-mono text-[11px] text-neutral-500 uppercase leading-relaxed font-black">
                                    Select an active coordinate node to access regional telemetry and logistical data streams.
                                </p>
                                <div className="grid gap-2">
                                    {locations.map(loc => (
                                        <button
                                            key={loc.id}
                                            onClick={() => handleMarkerClick(loc)}
                                            className="w-full flex items-center justify-between p-4 bg-white-pure border-2 border-black-pure hover:bg-primary-500 transition-colors group text-left"
                                        >
                                            <div className="space-y-1">
                                                <span className="text-xs font-black text-black-pure uppercase block">{loc.title}</span>
                                                <span className="font-mono text-[9px] text-black-pure/40 uppercase font-black">{loc.category || 'POINT_OF_INTEREST'}</span>
                                            </div>
                                            <Navigation className="w-4 h-4 text-black-pure group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 relative bg-neutral-100">
                    <Map viewport={viewport} onViewportChange={setViewport} theme="light">
                        <MapControls position="bottom-right" />
                        {locations.map((loc) => (
                            <MapMarker
                                key={loc.id}
                                longitude={loc.lng}
                                latitude={loc.lat}
                                onClick={() => handleMarkerClick(loc)}
                            >
                                <div className="relative cursor-pointer group">
                                    <div className={`w-8 h-8 flex items-center justify-center transition-all duration-300 border-2 border-black-pure ${activeLocation?.id === loc.id ? 'bg-primary-500 scale-125 -rotate-45' : 'bg-white-pure rotate-45 group-hover:bg-primary-500'}`}>
                                        <div className={`w-2 h-2 bg-black-pure ${activeLocation?.id === loc.id ? 'animate-pulse' : ''}`} />
                                    </div>
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black-pure px-3 py-1 border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                                        <span className="text-[10px] font-mono font-black text-white-pure whitespace-nowrap uppercase">{loc.title}</span>
                                    </div>
                                </div>
                            </MapMarker>
                        ))}
                    </Map>
                </div>
            </div>

            <SectionFooter variant={2} />
        </section>
    )
}

export default MapGrid