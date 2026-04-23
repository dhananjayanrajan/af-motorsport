"use client"
import React, { useState } from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import BlueprintsBackground from '../Backgrounds/BlueprintsBackground'

export interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  description?: string
  address?: string
}

interface MapSectionProps {
  id: string
  title: string
  subtitle: string
  locations: MapLocation[]
  apiKey?: string
  zoom?: number
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const MapSection: React.FC<MapSectionProps> = ({
  id,
  title,
  subtitle,
  locations,
  zoom = 12,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <BlueprintsBackground opacity={0.3} />
}) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(locations.length)} />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${selectedLocation?.id === loc.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
              >
                <h3 className="font-bold text-foreground">{loc.name}</h3>
                {loc.address && <p className="text-sm text-muted-foreground mt-1">{loc.address}</p>}
              </button>
            ))}
          </div>
          <div className="lg:col-span-2 h-[400px] bg-muted rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="font-mono text-sm">Map visualization would render here</p>
                <p className="text-xs">(Requires Google Maps or Mapbox integration)</p>
                <p className="text-xs mt-2">Locations: {locations.length}</p>
              </div>
            </div>
            {selectedLocation && (
              <div className="absolute bottom-4 left-4 right-4 bg-card p-4 rounded-lg shadow-lg border border-primary animate-in slide-in-from-bottom-4">
                <h4 className="font-bold">{selectedLocation.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedLocation.description || selectedLocation.address}</p>
              </div>
            )}
          </div>
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default MapSection
