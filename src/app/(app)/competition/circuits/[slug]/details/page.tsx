// app/(frontend)/competition/circuits/[slug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getCircuitDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'circuits',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['circuit-details'],
    { revalidate: 3600, tags: ['circuit-details'] }
)

export default async function CircuitDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const circuit = await getCircuitDetailsData(slug)

    if (!circuit) notFound()

    const mapLocations: any[] = []
    if (circuit.details?.location) {
        mapLocations.push({
            id: String(circuit.id),
            name: circuit.name,
            lat: circuit.details.location[0],
            lng: circuit.details.location[1],
            description: circuit.basics?.tagline || undefined,
            address: circuit.details?.address || undefined,
        })
    }

    const heroBackgroundImage = circuit.assets?.cover
        ? getMediaUrl(circuit.assets.cover)
        : circuit.seo?.image
            ? getMediaUrl(circuit.seo.image)
            : undefined

    const specItems: any[] = [
        {
            id: 'length-km',
            title: 'Length (km)',
            subtitle: circuit.details?.length_km ? `${circuit.details.length_km} km` : 'N/A',
        },
        {
            id: 'length-miles',
            title: 'Length (miles)',
            subtitle: circuit.details?.length_miles ? `${circuit.details.length_miles} mi` : 'N/A',
        },
        {
            id: 'turns',
            title: 'Turns',
            subtitle: circuit.details?.turns ? String(circuit.details.turns) : 'N/A',
        },
        {
            id: 'drs-zones',
            title: 'DRS Zones',
            subtitle: circuit.details?.drs_zones ? String(circuit.details.drs_zones) : 'N/A',
        },
        {
            id: 'fia-grade',
            title: 'FIA Grade',
            subtitle: circuit.details?.fia_grade || 'N/A',
        },
        {
            id: 'elevation',
            title: 'Elevation Change',
            subtitle: circuit.details?.elevation_change ? `${circuit.details.elevation_change} m` : 'N/A',
        },
        {
            id: 'capacity',
            title: 'Capacity',
            subtitle: circuit.details?.capacity ? circuit.details.capacity.toLocaleString() : 'N/A',
        },
        {
            id: 'opened',
            title: 'Opened',
            subtitle: circuit.details?.opened || 'N/A',
        },
        {
            id: 'record-lap',
            title: 'Lap Record',
            subtitle: circuit.metrics?.record_lap_time || 'N/A',
        },
        {
            id: 'record-year',
            title: 'Record Year',
            subtitle: circuit.metrics?.record_lap_year || 'N/A',
        },
    ]

    const renovationEntries: any[] = []
    if (circuit.details?.renovated?.list) {
        circuit.details.renovated.list.forEach((reno) => {
            if (reno.year) {
                renovationEntries.push({
                    id: reno.id || String(Math.random()),
                    title: reno.year,
                    subtitle: reno.description || undefined,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (circuit.assets?.documents) {
        circuit.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                documentItems.push({
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    subtitle: media.mimeType || undefined,
                    image: url,
                    href: url,
                })
            }
        })
    }
    if (circuit.assets?.circuit_map) {
        const url = getMediaUrl(circuit.assets.circuit_map)
        if (url) {
            const media = circuit.assets.circuit_map as Media
            documentItems.push({
                id: String(media.id),
                title: 'Circuit Map',
                subtitle: 'Track layout',
                image: url,
                href: url,
            })
        }
    }

    return (
        <main className="w-full">
            {mapLocations.length > 0 && (
                <MapSection
                    id="circuit-map"
                    title="Location"
                    subtitle="Circuit location"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'HQ',
                        intelLabel: 'INTEL',
                        routeLabel: 'ROUTE',
                        timeLabel: 'TIME',
                        distLabel: 'DIST',
                        recordLabel: 'VIEW',
                        filterLabels: {
                            all: 'ALL',
                            primary: 'PRIMARY',
                            satellite: 'SATELLITE',
                            pathing: 'ROUTES',
                        },
                    }}
                    zoom={14}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <HeroSection
                id="circuit-details-cover"
                title={circuit.name}
                subtitle={circuit.basics?.tagline || 'Circuit Specifications'}
                description={circuit.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={circuit.basics?.identifiers?.abbreviation || circuit.basics?.identifiers?.code || circuit.details?.type || undefined}
            />
            <GridSection
                id="circuit-specifications"
                title="Specifications"
                subtitle="Technical details"
                items={specItems}
                labels={{
                    unitsCount: 'SPECS',
                    viewProject: 'VIEW',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Spec',
                }}
                columns={4}
            />
            {renovationEntries.length > 0 && (
                <ListSection
                    id="circuit-renovations"
                    title="Renovations"
                    subtitle="Track modifications and updates"
                    entries={renovationEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'REN',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="circuit-documents"
                    title="Documents"
                    subtitle="Circuit documentation"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'VIEW',
                        sectionIndex: 'DOC',
                        fallbackAlt: 'Document',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}