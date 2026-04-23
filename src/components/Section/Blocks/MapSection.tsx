"use client"
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
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  MapPin,
  Navigation2,
  Target,
  X,
  Zap
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  description?: string
  address?: string
  type?: 'primary' | 'satellite' | 'logistics'
}

interface RouteData {
  coordinates: [number, number][]
  duration: number
  distance: number
}

interface MapLabels {
  hqLabel: string
  intelLabel: string
  routeLabel: string
  timeLabel: string
  distLabel: string
  recordLabel: string
  filterLabels: {
    all: string
    primary: string
    satellite: string
    pathing: string
  }
}

interface MapSectionProps {
  id: string
  title: string
  subtitle: string
  locations: MapLocation[]
  labels: MapLabels
  hqCoords?: { lat: number, lng: number }
  zoom?: number
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  ctaLabel?: string
  ctaPath?: string
  background?: React.ReactNode
}

const formatDuration = (s: number) => {
  const mins = Math.round(s / 60)
  return mins < 60 ? `${mins}` : `${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`
}

const MapSection: React.FC<MapSectionProps> = ({
  id,
  title,
  subtitle,
  locations = [],
  labels = {
    hqLabel: '',
    intelLabel: '',
    routeLabel: '',
    timeLabel: '',
    distLabel: '',
    recordLabel: '',
    filterLabels: {
      all: '',
      primary: '',
      satellite: '',
      pathing: ''
    }
  },
  hqCoords = { lat: 0, lng: 0 },
  zoom = 3,
  headerVariant = 1,
  footerVariant = 1,
  ctaLabel,
  ctaPath,
  background
}) => {
  const [activeLoc, setActiveLoc] = useState<MapLocation | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [route, setRoute] = useState<RouteData | null>(null)
  const [filter, setFilter] = useState<'all' | 'primary' | 'satellite'>('all')
  const [showRoutes, setShowRoutes] = useState(true)

  const [viewport, setViewport] = useState<MapViewport>({
    center: [hqCoords?.lng ?? 0, hqCoords?.lat ?? 0],
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  })

  const filtered = locations.filter(l => filter === 'all' || l.type === filter)

  const handleLocClick = (loc: MapLocation) => {
    setActiveLoc(loc)
    setSidebarOpen(true)
    setViewport({ center: [loc.lng, loc.lat], zoom: 12, bearing: 0, pitch: 0 })
  }

  useEffect(() => {
    if (!activeLoc || !showRoutes || !hqCoords) {
      setRoute(null)
      return
    }
    async function fetchRoute() {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${hqCoords.lng},${hqCoords.lat};${activeLoc?.lng},${activeLoc?.lat}?overview=full&geometries=geojson`
        )
        const data = await response.json()
        if (data.routes?.length > 0) {
          setRoute({
            coordinates: data.routes[0].geometry.coordinates,
            duration: data.routes[0].duration,
            distance: data.routes[0].distance,
          })
        }
      } catch (e) {
        // Handled
      }
    }
    fetchRoute()
  }, [activeLoc, showRoutes, hqCoords])

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}
      <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(locations.length).padStart(2, '0')} />

      <div className="relative w-full h-[600px] border-b border-black-pure bg-neutral-100">
        <Map viewport={viewport} onViewportChange={setViewport} theme="light">
          <MapControls position="bottom-right" />

          {showRoutes && route && (
            <MapRoute coordinates={route.coordinates} color="#00FF41" width={2} opacity={1} />
          )}

          <MapMarker longitude={hqCoords?.lng ?? 0} latitude={hqCoords?.lat ?? 0}>
            <MarkerContent className="size-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary border border-black-pure" />
              <Navigation2 className="size-4 text-black-pure relative z-10" />
            </MarkerContent>
            <MarkerLabel position="bottom" className="text-[8px] font-mono font-black px-2 py-0.5 mt-2 bg-black-pure text-white-pure uppercase">
              {labels.hqLabel}
            </MarkerLabel>
          </MapMarker>

          {filtered.map((loc) => {
            const isSelected = activeLoc?.id === loc.id
            return (
              <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat} onClick={() => handleLocClick(loc)}>
                <MarkerContent>
                  <motion.div
                    animate={{ scale: isSelected ? 1.1 : 1 }}
                    className={`size-6 border border-black-pure flex items-center justify-center transition-colors ${isSelected ? 'bg-primary shadow-[2px_2px_0px_0px_#000000]' : 'bg-white-pure'}`}
                  >
                    <Target className="size-3 text-black-pure" />
                  </motion.div>
                </MarkerContent>
                <MarkerPopup closeButton={false} className="p-0 border-none shadow-none">
                  <div className="w-48 border border-black-pure bg-white-pure p-0 shadow-[4px_4px_0px_0px_#000000]">
                    <div className="px-2 py-1 border-b border-black-pure bg-black-pure">
                      <span className="text-[7px] font-mono font-black text-white-pure uppercase tracking-widest">
                        {labels.intelLabel}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-mono font-black uppercase mb-3">{loc.name}</h3>
                      <button className="w-full py-1.5 bg-primary border border-black-pure group transition-colors hover:bg-black-pure">
                        <span className="text-[8px] font-mono font-black text-black-pure group-hover:text-primary uppercase">
                          {labels.recordLabel}
                        </span>
                      </button>
                    </div>
                  </div>
                </MarkerPopup>
              </MapMarker>
            )
          })}
        </Map>

        <AnimatePresence>
          {showRoutes && route && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-6 left-6 z-20">
              <div className="bg-white-pure border border-black-pure p-4 shadow-[4px_4px_0px_0px_#00FF41]">
                <div className="flex items-center gap-2 mb-4 border-b border-black-pure pb-2">
                  <span className="text-[8px] font-mono font-black uppercase tracking-widest">{labels.routeLabel}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-mono font-black text-neutral-400 uppercase">{labels.timeLabel}</span>
                    <span className="text-lg font-mono font-black tabular-nums">{formatDuration(route.duration)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-mono font-black text-neutral-400 uppercase">{labels.distLabel}</span>
                    <span className="text-lg font-mono font-black tabular-nums">{(route.distance / 1000).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black-pure border-b border-black-pure">
        {[
          { id: 'all', label: labels.filterLabels.all, val: locations.length, icon: Activity },
          { id: 'primary', label: labels.filterLabels.primary, val: locations.filter(l => l.type === 'primary').length, icon: Zap },
          { id: 'satellite', label: labels.filterLabels.satellite, val: locations.filter(l => l.type === 'satellite').length, icon: MapPin },
          { id: 'routes', label: labels.filterLabels.pathing, val: showRoutes ? '01' : '00', icon: Navigation2 }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => btn.id === 'routes' ? setShowRoutes(!showRoutes) : setFilter(btn.id as any)}
            className={`flex flex-col p-6 md:p-8 text-left transition-all ${(filter === btn.id || (btn.id === 'routes' && showRoutes)) ? 'bg-primary' : 'bg-white-pure hover:bg-neutral-50'}`}
          >
            <btn.icon className="size-3.5 mb-4 text-black-pure" />
            <span className="text-[8px] font-mono font-black uppercase text-neutral-500 mb-1">{btn.label}</span>
            <div className="text-2xl font-mono font-black uppercase leading-none tabular-nums">{btn.val}</div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {sidebarOpen && activeLoc && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black-pure/20" onClick={() => setSidebarOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-md z-[101] bg-white-pure border-l border-black-pure p-8 md:p-12 flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-1 bg-primary" />
                  <h3 className="text-3xl font-mono font-black uppercase tracking-tighter leading-none">{activeLoc.name}</h3>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="size-8 border border-black-pure bg-white-pure flex items-center justify-center hover:bg-primary transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-grow">
                <div className="p-5 border border-black-pure bg-neutral-100 shadow-[4px_4px_0px_0px_#000000]">
                  <p className="text-[10px] font-mono font-bold text-black-pure uppercase leading-relaxed tracking-wide">
                    {activeLoc.description || activeLoc.address}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                {ctaLabel && ctaPath && (
                  <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default MapSection