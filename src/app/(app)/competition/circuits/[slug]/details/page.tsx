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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getCircuitDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'circuits',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                    description: true,
                    identifiers: { abbreviation: true, code: true }
                },
                assets: {
                    cover: true,
                    documents: true,
                    circuit_map: true
                },
                details: {
                    location: true,
                    address: true,
                    type: true,
                    length_km: true,
                    length_miles: true,
                    turns: true,
                    drs_zones: true,
                    fia_grade: true,
                    elevation_change: true,
                    capacity: true,
                    opened: true,
                    renovated: true
                },
                metrics: {
                    record_lap_time: true,
                    record_lap_year: true
                },
                seo: {
                    image: true
                }
            }
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
            name: circuit.name.toUpperCase(),
            lat: circuit.details.location[0],
            lng: circuit.details.location[1],
            description: circuit.basics?.tagline || 'FACILITY_COORDINATES',
            address: circuit.details?.address || 'COORDINATES_ONLY',
            slug: circuit.slug,
        })
    }

    const heroBackgroundImage = resolveAssetUrl(circuit.assets, 'cover') || getMediaUrl(circuit.seo?.image)

    const specItems: any[] = [
        {
            id: 'length-km',
            title: 'LENGTH_KM',
            subtitle: circuit.details?.length_km ? `${circuit.details.length_km} KM` : 'N/A',
        },
        {
            id: 'length-miles',
            title: 'LENGTH_MI',
            subtitle: circuit.details?.length_miles ? `${circuit.details.length_miles} MI` : 'N/A',
        },
        {
            id: 'turns',
            title: 'TURNS',
            subtitle: circuit.details?.turns ? String(circuit.details.turns) : 'N/A',
        },
        {
            id: 'drs-zones',
            title: 'DRS_ZONES',
            subtitle: circuit.details?.drs_zones ? String(circuit.details.drs_zones) : 'N/A',
        },
        {
            id: 'fia-grade',
            title: 'FIA_GRADE',
            subtitle: circuit.details?.fia_grade || 'N/A',
        },
        {
            id: 'elevation',
            title: 'ELEVATION_DELTA',
            subtitle: circuit.details?.elevation_change ? `${circuit.details.elevation_change} M` : 'N/A',
        },
        {
            id: 'capacity',
            title: 'MAX_CAPACITY',
            subtitle: circuit.details?.capacity ? circuit.details.capacity.toLocaleString() : 'N/A',
        },
        {
            id: 'opened',
            title: 'INITIALIZED',
            subtitle: circuit.details?.opened || 'N/A',
        },
        {
            id: 'record-lap',
            title: 'LAP_RECORD',
            subtitle: circuit.metrics?.record_lap_time || 'N/A',
        },
        {
            id: 'record-year',
            title: 'RECORD_YEAR',
            subtitle: circuit.metrics?.record_lap_year || 'N/A',
        },
    ]

    const renovationEntries: any[] = []
    if (circuit.details?.renovated?.list) {
        circuit.details.renovated.list.forEach((reno: any) => {
            if (reno.year) {
                renovationEntries.push({
                    id: reno.id || String(Math.random()),
                    title: String(reno.year),
                    subtitle: reno.description || 'STRUCTURAL_MODIFICATION',
                })
            }
        })
    }

    const documentItems: any[] = []
    if (circuit.assets?.documents && Array.isArray(circuit.assets.documents)) {
        circuit.assets.documents.forEach((doc, idx) => {
            const url = getMediaUrl(doc)
            if (url) {
                documentItems.push({
                    id: (typeof doc === 'object' && doc.id) ? String(doc.id) : `doc-${idx}`,
                    title: (typeof doc === 'object' && (doc.alt || doc.filename)) || `DOC_${idx + 1}`,
                    subtitle: (typeof doc === 'object' && doc.mimeType) || 'APPLICATION/PDF',
                    image: url,
                    href: url,
                })
            }
        })
    }

    if (circuit.assets?.circuit_map) {
        const url = getMediaUrl(circuit.assets.circuit_map)
        if (url) {
            documentItems.push({
                id: 'circuit-map-doc',
                title: 'TRACK_LAYOUT',
                subtitle: 'VECTOR_MAPPING',
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
                    title="GEOLOCATION"
                    subtitle="Global positioning coordinates and facility perimeter"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'HUB',
                        intelLabel: 'DATA',
                        routeLabel: 'SCAN',
                        timeLabel: 'TIME',
                        distLabel: 'KM',
                        recordLabel: 'VIEW',
                        filterLabels: {
                            all: 'GLOBAL',
                            primary: 'PRIMARY',
                            satellite: 'EXT',
                            pathing: 'GPS',
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
                subtitle="OPERATIONAL_SPECIFICATIONS"
                description={circuit.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={circuit.basics?.identifiers?.abbreviation || circuit.basics?.identifiers?.code || 'CRT_ID'}
            />
            <GridSection
                id="circuit-specifications"
                title="PARAMETERS"
                subtitle="Technical facility telemetry and architectural statistics"
                items={specItems}
                labels={{
                    unitsCount: 'SPECS',
                    viewProject: 'DATA',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Spec',
                }}
                columns={4}
            />
            {renovationEntries.length > 0 && (
                <ListSection
                    id="circuit-renovations"
                    title="MODIFICATIONS"
                    subtitle="Documented structural updates and circuit renovations"
                    entries={renovationEntries}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'YEAR',
                        indexPrefix: 'MOD',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="circuit-documents"
                    title="ARCHIVE"
                    subtitle="Technical documentation and layout vector resources"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'FETCH',
                        sectionIndex: 'DAT',
                        fallbackAlt: 'File',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}