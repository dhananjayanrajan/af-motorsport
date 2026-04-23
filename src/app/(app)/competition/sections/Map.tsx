'use client'

import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import SectionCTA from '@/components/Section/CTA'
import SectionDescription from '@/components/Section/Description'
import SectionMainTitle from '@/components/Section/Title'
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
import { Circuit as CircuitType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Gauge, MapPin, Navigation2, Target, Trophy, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    const router = useRouter()
    const [activeCircuit, setActiveCircuit] = useState<CircuitType | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [routes, setRoutes] = useState<RouteData[]>([])
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
            setViewport({ center: [lng, lat], zoom: 12, bearing: 0, pitch: 0 })
        }
    }

    useEffect(() => {
        if (!activeCircuit || !showRoutes || !activeCircuit.details?.location) {
            setRoutes([])
            return
        }
        async function fetchConquestPath() {
            if (!activeCircuit?.details?.location) return
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
                console.error('ROUTING_ERROR', error)
            }
        }
        fetchConquestPath()
    }, [activeCircuit, showRoutes])

    return (
        <section className="relative w-full bg-white-pure flex flex-col border-b border-black-pure">
            <SectionHeader
                variant={4}
                title="Global Circuits"
                subtitle="Tactical Deployment Map"
                directoryLabel="LOC_DIR_V4"
                championships={[]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black-pure">
                <div className="p-10 lg:p-20 border-r border-black-pure flex flex-col gap-10">
                    <SectionMainTitle
                        variant={1}
                        label="Location Hub"
                        lineOne="Active Network"
                        lineTwo="Proving Grounds"
                        highlight="Circuits"
                    />
                </div>
                <div className="p-10 lg:p-20 flex flex-col justify-center">
                    <SectionDescription
                        variant={2}
                        text="Strategic overview of all sanctioned racing venues. Access telemetry data, track grades, and logistics routing from central operations headquarters."
                    />
                </div>
            </div>

            <div className="relative w-full h-[750px] overflow-hidden border-b border-black-pure bg-white-50">
                <Map viewport={viewport} onViewportChange={setViewport} theme="light">
                    <MapControls position="bottom-right" />
                    <AnimatePresence>
                        {showRoutes && routes.map((route, idx) => (
                            <MapRoute key={`route-${idx}`} coordinates={route.coordinates} color="#00FF41" width={3} opacity={0.6} />
                        ))}
                    </AnimatePresence>

                    <MapMarker longitude={HQ.lng} latitude={HQ.lat}>
                        <MarkerContent className="size-10 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full animate-pulse scale-150 bg-primary-500/10" />
                            <Navigation2 className="size-5 text-primary-500 fill-primary-500" />
                        </MarkerContent>
                        <MarkerLabel position="bottom" className="text-[7px] font-black px-2 py-1 mt-2 tracking-tighter bg-black-pure text-white-pure uppercase">BASE</MarkerLabel>
                    </MapMarker>

                    {filteredCircuits.map((circuit) => {
                        const location = circuit.details?.location
                        if (!location || location.length < 2) return null
                        const [lat, lng] = location
                        const isSelected = activeCircuit?.id === circuit.id

                        return (
                            <MapMarker key={circuit.id} longitude={lng} latitude={lat} onClick={() => handleCircuitClick(circuit)}>
                                <MarkerContent className="cursor-pointer">
                                    <motion.div
                                        animate={{
                                            scale: isSelected ? 1.3 : 1,
                                            borderColor: isSelected ? '#000000' : '#00FF41',
                                            backgroundColor: isSelected ? '#00FF41' : '#FFFFFF'
                                        }}
                                        className="size-7 rounded-none rotate-45 border-2 flex items-center justify-center transition-all duration-300 relative"
                                    >
                                        <Trophy className="-rotate-45 size-3.5" style={{ color: isSelected ? '#000000' : '#00FF41' }} />
                                    </motion.div>
                                </MarkerContent>
                                <MarkerPopup closeButton={false} className="p-0">
                                    <div className="w-[300px] border-2 border-black-pure bg-white-pure">
                                        <div className="px-4 py-2 border-b border-black-pure bg-black-pure flex justify-between">
                                            <span className="text-[8px] font-black uppercase text-white-pure">Intel</span>
                                            <span className="text-[8px] font-mono text-white-pure/50">REF_{circuit.basics?.identifiers?.code || 'CRT'}</span>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-xl font-race font-black uppercase italic text-black-pure mb-4">{circuit.name}</h3>
                                            <Link href={`/circuits/${circuit.slug || circuit.id}`} className="w-full py-2 flex items-center justify-center gap-2 bg-black-pure group">
                                                <span className="text-[9px] font-black uppercase text-white-pure group-hover:text-primary-500">Record Entry</span>
                                                <ChevronRight size={12} className="text-white-pure" />
                                            </Link>
                                        </div>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        )
                    })}
                </Map>

                <AnimatePresence>
                    {showRoutes && routes.length > 0 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute top-10 left-10 z-20">
                            <div className="bg-white-pure border-4 border-black-pure p-6 shadow-[8px_8px_0px_#00FF41]">
                                <div className="flex items-center gap-4 mb-4 border-b border-black-pure pb-4">
                                    <Gauge className="size-5 text-primary-500" />
                                    <span className="font-race font-black italic">Data Link</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase opacity-40">Time</span>
                                        <span className="text-2xl font-race font-black italic">{formatDuration(routes[0].duration)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase opacity-40">Distance</span>
                                        <span className="text-2xl font-race font-black italic">{formatDistance(routes[0].distance)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black-pure border-b border-black-pure">
                {[
                    { id: 'all', label: 'All Venues', value: circuits.length, icon: Target },
                    { id: 'street', label: 'Urban Tracks', value: circuits.filter(c => c.details?.type === 'street').length, icon: Zap },
                    { id: 'permanent', label: 'Permanent', value: circuits.filter(c => c.details?.type === 'permanent').length, icon: MapPin },
                    { id: 'routes', label: 'Pathing', value: showRoutes ? 'ON' : 'OFF', icon: Navigation2 }
                ].map((stat) => (
                    <button
                        key={stat.id}
                        onClick={() => { if (stat.id === 'routes') setShowRoutes(!showRoutes); else setFilter(stat.id as any); }}
                        className={cn(
                            "flex flex-col p-10 text-left transition-colors",
                            (filter === stat.id || (stat.id === 'routes' && showRoutes)) ? 'bg-primary-500' : 'bg-white-pure hover:bg-white-100'
                        )}
                    >
                        <stat.icon className="size-5 mb-6" />
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">{stat.label}</span>
                        <div className="text-4xl font-race font-black italic uppercase leading-none">{stat.value}</div>
                    </button>
                ))}
            </div>

            <SectionCTA
                variant={1}
                label="Initialize Full Directory"
                path="/circuits"
                description="Access the complete global database of racing venues, including technical blueprints, elevation maps, and historical performance data."
                infoLabel="LOGISTICS_OVERRIDE"
                directoryLabel="PATH://VENUES/GLOBAL"
                onClick={() => router.push('/circuits')}
            />

            <AnimatePresence>
                {sidebarOpen && activeCircuit && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black-pure/60 backdrop-blur-md" onClick={() => setSidebarOpen(false)} />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-2xl z-[101] bg-white-pure border-l-8 border-black-pure">
                            <div className="p-16 flex flex-col h-full justify-between">
                                <div className="space-y-12">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-4">
                                            <div className="w-12 h-1 bg-primary-500" />
                                            <h3 className="text-6xl font-race font-black uppercase italic leading-[0.8]">{activeCircuit.name}</h3>
                                        </div>
                                        <button onClick={() => setSidebarOpen(false)} className="size-12 border-4 border-black-pure flex items-center justify-center hover:bg-primary-500 transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-px bg-black-pure border border-black-pure">
                                        <div className="p-8 bg-white-pure">
                                            <span className="text-[10px] font-black uppercase opacity-40">Grade</span>
                                            <span className="text-4xl font-race font-black italic">{activeCircuit.details?.fia_grade || 'U'}</span>
                                        </div>
                                        <div className="p-8 bg-white-pure">
                                            <span className="text-[10px] font-black uppercase opacity-40">Length</span>
                                            <span className="text-4xl font-race font-black italic">{activeCircuit.details?.length_km || '0.00'}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link href={`/circuits/${activeCircuit.slug || activeCircuit.id}`} className="h-20 bg-black-pure flex items-center justify-between px-10 group hover:bg-primary-500 transition-colors">
                                    <span className="font-race font-black text-2xl text-white-pure group-hover:text-black-pure uppercase italic">Full Record</span>
                                    <ChevronRight className="text-white-pure group-hover:text-black-pure group-hover:translate-x-2 transition-all" size={32} />
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <SectionFooter
                variant={1}
                sanctionedLabel="Sanctioned Venues"
                totalSeriesLabel="Active Circuits"
                activeYearLabel="Season"
                championships={[]}
            />
        </section>
    )
}