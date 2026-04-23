"use client"
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
        <section className="relative w-full bg-background flex flex-col overflow-hidden border-b border-border">
            <SectionHeader title={title} subtitle={id} variant={3} />

            <div className="flex h-12 bg-foreground border-b border-border divide-x divide-white/20">
                <div className="flex-1 flex items-center px-6">
                    <span className="font-mono text-sm font-semibold text-primary uppercase">
                        Locations Detected: {locations.length.toString().padStart(3, '0')}
                    </span>
                </div>
                <button
                    onClick={() => setViewport({ center: initialCenter, zoom: initialZoom, bearing: 0, pitch: 0 })}
                    className="px-6 text-background font-mono text-sm font-semibold hover:bg-background hover:text-foreground transition-colors"
                >
                    Reset Coordinates
                </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative min-h-[600px] lg:min-h-[700px]">
                <div className={`lg:w-[400px] bg-card border-r border-border flex flex-col z-30 transition-all duration-500 ${sidebarOpen ? 'w-full absolute lg:relative inset-0' : 'w-full lg:w-[400px]'
                    }`}>
                    <div className="p-8 border-b border-border bg-muted/30">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <span className="font-mono text-sm font-semibold text-secondary uppercase block italic">
                                    Data Telemetry
                                </span>
                                <h3 className="font-bold text-2xl md:text-3xl text-foreground uppercase leading-none">
                                    {activeLocation ? activeLocation.title : 'Global Registry'}
                                </h3>
                            </div>

                            {sidebarOpen && (
                                <button
                                    onClick={closeSidebar}
                                    className="w-12 h-12 flex items-center justify-center bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors rounded-full"
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
                                        <div className="w-2 h-6 bg-primary rounded-sm" />
                                        <span className="font-mono text-sm font-semibold uppercase text-foreground">Location Metadata</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        {activeLocation.metadata?.map((meta, i) => (
                                            <div key={i} className="p-4 bg-muted/50 border border-border flex flex-col gap-1 rounded-md">
                                                <span className="font-mono text-sm font-semibold text-muted-foreground uppercase tracking-wider">{meta.label}</span>
                                                <span className="text-base font-semibold text-foreground uppercase">{meta.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 border-2 border-primary bg-primary/5 rounded-md">
                                    <p className="font-mono text-sm font-semibold text-foreground leading-tight uppercase">
                                        Lat: {activeLocation.lat.toFixed(4)} <br />
                                        Lng: {activeLocation.lng.toFixed(4)}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p className="font-mono text-base text-muted-foreground uppercase leading-relaxed font-semibold">
                                    Select an active coordinate node to access regional telemetry and logistical data streams.
                                </p>

                                <div className="grid gap-2">
                                    {locations.map(loc => (
                                        <button
                                            key={loc.id}
                                            onClick={() => handleMarkerClick(loc)}
                                            className="w-full flex items-center justify-between p-4 bg-card border border-border hover:bg-primary/10 transition-colors group text-left rounded-md"
                                        >
                                            <div className="space-y-1">
                                                <span className="text-base font-semibold text-foreground uppercase block">{loc.title}</span>
                                                <span className="font-mono text-sm text-muted-foreground/60 uppercase font-semibold">{loc.category || 'Point of Interest'}</span>
                                            </div>
                                            <Navigation className="w-4 h-4 text-foreground group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 relative bg-muted/20">
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
                                    <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300 border-2 border-foreground rounded-full ${activeLocation?.id === loc.id
                                            ? 'bg-primary scale-125'
                                            : 'bg-background rotate-0 group-hover:bg-primary'
                                        }`}>
                                        <div className={`w-3 h-3 bg-foreground rounded-full ${activeLocation?.id === loc.id ? 'animate-pulse' : ''
                                            }`} />
                                    </div>

                                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-foreground px-3 py-1 border border-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none rounded-md whitespace-nowrap">
                                        <span className="text-sm font-mono font-semibold text-background uppercase">{loc.title}</span>
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