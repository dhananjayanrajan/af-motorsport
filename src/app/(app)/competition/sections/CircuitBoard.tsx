'use client'

import {
    Map,
    MapControls,
    MapMarker,
    MapRoute,
    MarkerContent,
    MarkerLabel,
    MarkerPopup,
    type MapViewport,
} from '@/components/ui/map'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Circuit as CircuitType, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { Gauge, Info, Map as MapIcon, Navigation2, Target, Trophy, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CircuitsSectionProps {
    circuits: CircuitType[]
}

interface RouteData {
    coordinates: [number, number][]
    duration: number
    distance: number
}

const HQ = { lng: 6.9583, lat: 50.9413, name: 'BASE_OPERATIONS' }

function formatDuration(seconds: number): string {
    const mins = Math.round(seconds / 60)
    if (mins < 60) return `${mins} MIN`
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hours}H ${remainingMins}M`
}

function formatDistance(meters: number): string {
    return `${(meters / 1000).toFixed(1)} KM`
}

export default function CircuitBoard({ circuits }: CircuitsSectionProps) {
    const [activeCircuit, setActiveCircuit] = useState<CircuitType | null>(null)
    const [routes, setRoutes] = useState<RouteData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState<'all' | 'permanent' | 'street'>('all')
    const [showRoutes, setShowRoutes] = useState(true)

    const [viewport, setViewport] = useState<MapViewport>({
        center: [15.0, 40.0],
        zoom: 2.5,
        bearing: 0,
        pitch: 0,
    })

    const filteredCircuits = circuits.filter((c) => filter === 'all' || c.details?.type === filter)

    useEffect(() => {
        if (!activeCircuit || !showRoutes || !activeCircuit.details?.location) {
            setRoutes([])
            return
        }

        async function fetchConquestPath() {
            if (!activeCircuit?.details?.location) return

            setIsLoading(true)
            const [lat, lng] = activeCircuit.details.location
            try {
                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${HQ.lng},${HQ.lat};${lng},${lat}?overview=full&geometries=geojson&alternatives=false`
                )
                const resData = await response.json()
                if (resData.routes?.length > 0) {
                    const routeData: RouteData[] = resData.routes.map((route: any) => ({
                        coordinates: route.geometry.coordinates,
                        duration: route.duration,
                        distance: route.distance,
                    }))
                    setRoutes(routeData)
                }
            } catch (error) {
                console.error('TELEMETRY_LINK_ERROR', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConquestPath()
    }, [activeCircuit, showRoutes])

    return (
        <section className="relative w-full bg-white border-t border-zinc-200">
            <div className="px-20 py-20 flex items-end justify-between border-b border-zinc-200">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-2 h-2"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                            Tactical Overview
                        </span>
                    </div>
                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
                        Circuits
                    </h2>
                </div>
            </div>

            <div className="relative w-full h-[750px] bg-zinc-50 overflow-hidden border-b border-zinc-200">
                <Map
                    viewport={viewport}
                    onViewportChange={setViewport}
                    theme="light"
                >
                    <MapControls position="bottom-right" showZoom showCompass showLocate showFullscreen />

                    <AnimatePresence>
                        {showRoutes && routes.map((route, idx) => (
                            <MapRoute
                                key={`route-${idx}`}
                                coordinates={route.coordinates}
                                color={DESIGN_SYSTEM.COLORS.PRIMARY}
                                width={3}
                                opacity={0.6}
                            />
                        ))}
                    </AnimatePresence>

                    <MapMarker longitude={HQ.lng} latitude={HQ.lat}>
                        <MarkerContent className="size-10 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full animate-pulse scale-150" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY, opacity: 0.1 }} />
                            <Navigation2 className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY, fill: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                        </MarkerContent>
                        <MarkerLabel position="bottom" className="text-[7px] font-black text-white px-2 py-1 mt-2 tracking-tighter bg-black">BASE_STATION</MarkerLabel>
                    </MapMarker>

                    {filteredCircuits.map((circuit) => {
                        const location = circuit.details?.location
                        if (!location || location.length < 2) return null
                        const [lat, lng] = location
                        const circuitMap = circuit.assets?.circuit_map as Media | undefined

                        return (
                            <MapMarker key={circuit.id} longitude={lng} latitude={lat} onClick={() => setActiveCircuit(circuit)}>
                                <MarkerContent className="cursor-pointer">
                                    <motion.div
                                        animate={{
                                            scale: activeCircuit?.id === circuit.id ? 1.3 : 1,
                                            borderColor: activeCircuit?.id === circuit.id ? "#000000" : DESIGN_SYSTEM.COLORS.PRIMARY,
                                            backgroundColor: activeCircuit?.id === circuit.id ? DESIGN_SYSTEM.COLORS.PRIMARY : "#ffffff"
                                        }}
                                        className={cn("size-7 rounded-none rotate-45 border-2 flex items-center justify-center transition-all duration-300 relative", activeCircuit?.id === circuit.id && "z-50")}
                                    >
                                        <Trophy className="-rotate-45 size-3.5" style={{ color: activeCircuit?.id === circuit.id ? '#ffffff' : DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                    </motion.div>
                                </MarkerContent>
                                <MarkerPopup closeButton={false} className="p-0">
                                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-[300px] bg-white border border-zinc-200 p-0 overflow-hidden shadow-2xl">
                                        <div className="bg-zinc-50 px-4 py-2 flex justify-between items-center border-b border-zinc-100">
                                            <div className="flex items-center gap-2">
                                                <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                                <span className="text-[8px] font-black text-black tracking-widest uppercase">CONQUEST_INTEL</span>
                                            </div>
                                            <span className="text-[8px] font-mono text-zinc-400">REF_{String(circuit.basics?.identifiers?.code || 'CRT').toUpperCase()}</span>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="max-w-[70%]">
                                                    <h3 className="text-xl font-black italic text-black uppercase tracking-tighter leading-none">{circuit.name}</h3>
                                                    <span className="text-[8px] font-bold text-zinc-400 uppercase mt-1.5 block tracking-widest">
                                                        {circuit.details?.country && typeof circuit.details.country === 'object' ? (circuit.details.country as any).name : 'INTERNATIONAL'}
                                                    </span>
                                                </div>
                                                <div className="text-4xl font-black italic leading-none" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>G{circuit.details?.fia_grade || 'U'}</div>
                                            </div>
                                            <div className="aspect-video bg-zinc-50 border border-zinc-100 mb-5 flex items-center justify-center overflow-hidden">
                                                {circuitMap?.url ? (
                                                    <img src={circuitMap.url} alt="Track Map" className="max-h-full max-w-full object-contain filter grayscale contrast-125" />
                                                ) : (
                                                    <MapIcon size={24} className="text-zinc-200" />
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-zinc-50 p-2.5 border border-zinc-100">
                                                    <span className="text-[6px] text-zinc-400 block mb-1 uppercase font-black tracking-[0.2em]">Length</span>
                                                    <span className="text-[10px] text-black font-black">{circuit.details?.length_km || '0.00'} KM</span>
                                                </div>
                                                <div className="bg-zinc-50 p-2.5 border border-zinc-100">
                                                    <span className="text-[6px] text-zinc-400 block mb-1 uppercase font-black tracking-[0.2em]">Environment</span>
                                                    <span className="text-[10px] text-black font-black uppercase">{circuit.details?.type || 'UNKNOWN'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </MarkerPopup>
                            </MapMarker>
                        )
                    })}
                </Map>

                <AnimatePresence>
                    {showRoutes && routes.length > 0 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                            <div className="bg-white/80 backdrop-blur-md border p-4 space-y-4 min-w-[200px]" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY }}>
                                <div className="flex items-center gap-3 border-b border-zinc-200 pb-2">
                                    <span className="text-[10px] font-black text-black italic tracking-widest uppercase flex items-center gap-2">
                                        <Gauge className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
                                        Live Telemetry
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-6">
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Est. Time</span>
                                        <span className="text-xs font-black text-black italic">{formatDuration(routes[0].duration)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-6">
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Distance</span>
                                        <span className="text-xs font-black text-black italic">{formatDistance(routes[0].distance)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4">
                {[
                    { id: 'all', label: 'ALL_CONQUESTS', value: circuits.length, icon: Target },
                    { id: 'street', label: 'STREET_CIRCUITS', value: circuits.filter(c => c.details?.type === 'street').length, icon: Info },
                    { id: 'permanent', label: 'POWER_TRACKS', value: circuits.filter(c => c.details?.type === 'permanent').length, icon: Zap },
                    { id: 'routes', label: 'TOGGLE_PATH_LINK', value: showRoutes ? 'ON' : 'OFF', icon: Navigation2 }
                ].map((stat, i) => (
                    <button
                        key={stat.id}
                        onClick={() => { if (stat.id === 'routes') setShowRoutes(!showRoutes); else setFilter(stat.id as any); }}
                        className={cn(
                            "flex flex-col p-12 border-r border-zinc-200 last:border-r-0 transition-all duration-500 text-left group relative overflow-hidden",
                            (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? 'bg-zinc-50' : 'bg-white hover:bg-zinc-50'
                        )}
                        style={{
                            borderTop: (filter === stat.id || (stat.id === 'routes' && showRoutes))
                                ? `2px solid ${DESIGN_SYSTEM.COLORS.PRIMARY}`
                                : '2px solid transparent'
                        }}
                    >
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <stat.icon className="size-4" style={{ color: (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? DESIGN_SYSTEM.COLORS.PRIMARY : '#a1a1aa' }} />
                            <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-[0.3em]">Module_0{i + 1}</span>
                        </div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 group-hover:text-black transition-colors relative z-10">{stat.label}</span>
                        <div className={cn("text-5xl font-black italic tracking-tighter transition-colors duration-500 relative z-10", (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? 'text-black' : 'text-zinc-200')}>{stat.value}</div>
                    </button>
                ))}
            </div>
        </section>
    )
}