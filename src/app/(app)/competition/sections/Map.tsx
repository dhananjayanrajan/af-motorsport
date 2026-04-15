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
import { ChevronRight, ExternalLink, Gauge, Info, Map as MapIcon, MapPin, Navigation2, Target, Trophy, X, Zap } from 'lucide-react'
import Link from 'next/link'
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
const miniBevel = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"

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
    const [sidebarOpen, setSidebarOpen] = useState(false)
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

    const handleCircuitClick = (circuit: CircuitType) => {
        setActiveCircuit(circuit)
        setSidebarOpen(true)

        if (circuit.details?.location) {
            const [lat, lng] = circuit.details.location
            setViewport({
                center: [lng, lat],
                zoom: 12,
                bearing: 0,
                pitch: 0,
            })
        }
    }

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
        <section className="relative w-full border-t" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50], borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
            <div className="px-6 md:px-10 lg:px-20 py-16 lg:py-20 flex items-end justify-between border-b" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-2 h-2"
                            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            Tactical Overview
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                        Circuits
                    </h2>
                </div>
            </div>

            <div className="relative w-full h-[750px] overflow-hidden border-b" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
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
                                color={DESIGN_SYSTEM.COLORS.PRIMARY[500]}
                                width={3}
                                opacity={0.6}
                            />
                        ))}
                    </AnimatePresence>

                    <MapMarker longitude={HQ.lng} latitude={HQ.lat}>
                        <MarkerContent className="size-10 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full animate-pulse scale-150" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], opacity: 0.1 }} />
                            <Navigation2 className="size-5" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500], fill: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </MarkerContent>
                        <MarkerLabel position="bottom" className="text-[7px] font-black px-2 py-1 mt-2 tracking-tighter">BASE_STATION</MarkerLabel>
                    </MapMarker>

                    {filteredCircuits.map((circuit) => {
                        const location = circuit.details?.location
                        if (!location || location.length < 2) return null
                        const [lat, lng] = location
                        const circuitMap = circuit.assets?.circuit_map as Media | undefined
                        const circuitSlug = circuit.slug || `circuit-${circuit.id}`

                        return (
                            <MapMarker key={circuit.id} longitude={lng} latitude={lat} onClick={() => handleCircuitClick(circuit)}>
                                <MarkerContent className="cursor-pointer">
                                    <motion.div
                                        animate={{
                                            scale: activeCircuit?.id === circuit.id ? 1.3 : 1,
                                            borderColor: activeCircuit?.id === circuit.id ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.PRIMARY[500],
                                            backgroundColor: activeCircuit?.id === circuit.id ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.WHITE[50]
                                        }}
                                        className={cn("size-7 rounded-none rotate-45 border-2 flex items-center justify-center transition-all duration-300 relative", activeCircuit?.id === circuit.id && "z-50")}
                                    >
                                        <Trophy className="-rotate-45 size-3.5" style={{ color: activeCircuit?.id === circuit.id ? DESIGN_SYSTEM.COLORS.WHITE[50] : DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                    </motion.div>
                                </MarkerContent>
                                <MarkerPopup closeButton={false} className="p-0">
                                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-[300px] overflow-hidden shadow-2xl" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                        <div className="px-4 py-2 flex justify-between items-center border-b" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                            <div className="flex items-center gap-2">
                                                <div className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>CONQUEST_INTEL</span>
                                            </div>
                                            <span className="text-[8px] font-mono" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>REF_{String(circuit.basics?.identifiers?.code || 'CRT').toUpperCase()}</span>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="max-w-[70%]">
                                                    <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{circuit.name}</h3>
                                                    <span className="text-[8px] font-bold uppercase mt-1.5 block tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                        {circuit.details?.country && typeof circuit.details.country === 'object' ? (circuit.details.country as any).name : 'INTERNATIONAL'}
                                                    </span>
                                                </div>
                                                <div className="text-4xl font-black italic leading-none" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>G{circuit.details?.fia_grade || 'U'}</div>
                                            </div>
                                            <div className="aspect-video border mb-5 flex items-center justify-center overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                                {circuitMap?.url ? (
                                                    <img src={circuitMap.url} alt="Track Map" className="max-h-full max-w-full object-contain filter grayscale contrast-125" />
                                                ) : (
                                                    <MapIcon size={24} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[200] }} />
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="p-2.5 border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                                    <span className="text-[6px] block mb-1 uppercase font-black tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Length</span>
                                                    <span className="text-[10px] font-black" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{circuit.details?.length_km || '0.00'} KM</span>
                                                </div>
                                                <div className="p-2.5 border" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                                    <span className="text-[6px] block mb-1 uppercase font-black tracking-[0.2em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Environment</span>
                                                    <span className="text-[10px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{circuit.details?.type || 'UNKNOWN'}</span>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/circuits/${circuitSlug}`}
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
                                            </Link>
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
                            <div className="backdrop-blur-md p-4 space-y-4 min-w-[200px]" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.WHITE[50]}CC`, borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                <div className="flex items-center gap-3 pb-2 border-b" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                    <span className="text-[10px] font-black italic tracking-widest uppercase flex items-center gap-2" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                        <Gauge className="size-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        Live Telemetry
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-6">
                                        <span className="text-[8px] font-bold uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>Est. Time</span>
                                        <span className="text-xs font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{formatDuration(routes[0].duration)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-6">
                                        <span className="text-[8px] font-bold uppercase tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>Distance</span>
                                        <span className="text-xs font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>{formatDistance(routes[0].distance)}</span>
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
                            "flex flex-col p-8 md:p-12 border-r last:border-r-0 transition-all duration-500 text-left group relative overflow-hidden",
                            (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? 'bg-zinc-50' : 'bg-white hover:bg-zinc-50'
                        )}
                        style={{
                            borderRightColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                            borderTop: (filter === stat.id || (stat.id === 'routes' && showRoutes))
                                ? `2px solid ${DESIGN_SYSTEM.COLORS.PRIMARY[500]}`
                                : `2px solid transparent`
                        }}
                    >
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <stat.icon className="size-4" style={{ color: (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                            <span className="text-[7px] font-mono uppercase tracking-[0.3em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>Module_0{i + 1}</span>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest mb-1 transition-colors relative z-10" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>{stat.label}</span>
                        <div className={cn("text-4xl md:text-5xl font-black italic tracking-tighter transition-colors duration-500 relative z-10", (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? 'text-black' : 'text-zinc-200')} style={{ color: (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? DESIGN_SYSTEM.COLORS.BLACK[600] : DESIGN_SYSTEM.COLORS.ZINC[200] }}>{stat.value}</div>
                    </button>
                ))}
            </div>

            {/* Sidebar Drawer */}
            <AnimatePresence>
                {sidebarOpen && activeCircuit && (
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
                                                Circuit Dossier
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                            {activeCircuit.name}
                                        </h3>
                                        {activeCircuit.alias && (
                                            <p className="text-sm font-black uppercase tracking-widest mt-2" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                {activeCircuit.alias}
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
                                        {activeCircuit.basics?.tagline || 'Technical circuit documentation.'}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Target size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                    Length
                                                </span>
                                            </div>
                                            <span className="text-2xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                {activeCircuit.details?.length_km || '0.00'}
                                            </span>
                                            <span className="text-xs font-black uppercase ml-1" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                KM
                                            </span>
                                        </div>
                                        <div className="p-6 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Trophy size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                    FIA Grade
                                                </span>
                                            </div>
                                            <span className="text-2xl font-black italic" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                                {activeCircuit.details?.fia_grade || 'U'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                                    {activeCircuit.details?.type || 'Circuit'} Track
                                                </span>
                                            </div>
                                            <Link
                                                href={`/circuits/${activeCircuit.slug || `circuit-${activeCircuit.id}`}`}
                                                className="flex items-center gap-2 group/btn"
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest group-hover/btn:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    View Circuit
                                                </span>
                                                <ExternalLink size={14} className="group-hover/btn:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    )
}