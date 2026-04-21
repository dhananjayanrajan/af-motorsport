import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import MapGrid from '@/components/Section/MapGrid'
import StatsGrid from '@/components/Section/StatsGrid'
import { Circuit, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getCircuit(slug: string): Promise<Circuit | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'circuits',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function CircuitDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const circuit = await getCircuit(slug)

    if (!circuit) {
        return notFound()
    }

    const coverImage = circuit.assets?.cover && typeof circuit.assets.cover === 'object'
        ? (circuit.assets.cover as Media)
        : null

    const mapLocations = circuit.details?.location ? [{
        id: `${circuit.id}-location`,
        title: circuit.name,
        lat: circuit.details.location[1],
        lng: circuit.details.location[0],
        label: circuit.basics?.identifiers?.code || 'TRACK',
        metadata: [
            { label: 'TYPE', value: circuit.details?.type?.toUpperCase() || 'PERMANENT' },
            { label: 'LENGTH', value: circuit.details?.length_km ? `${circuit.details.length_km} KM` : 'TBD' },
        ]
    }] : []

    const statsItems = [
        {
            label: 'LENGTH',
            value: circuit.details?.length_km?.toString() || '0',
            unit: 'KM',
            description: 'Track distance'
        },
        {
            label: 'LENGTH (MILES)',
            value: circuit.details?.length_miles?.toString() || '0',
            unit: 'MI',
            description: 'Imperial measurement'
        },
        {
            label: 'TURNS',
            value: circuit.details?.turns?.toString() || '0',
            unit: '',
            description: 'Total corners'
        },
        {
            label: 'DRS ZONES',
            value: circuit.details?.drs_zones?.toString() || '0',
            unit: 'ZONES',
            description: 'Overtaking assistance zones'
        },
    ]

    const renovationPanels = circuit.details?.renovated?.list?.map(ren => ({
        id: ren.id || `${circuit.id}-ren-${ren.year}`,
        title: ren.year || 'Renovation',
        label: 'RENOVATION',
        summary: ren.description || 'Circuit update',
        content: ren.description || 'Full renovation details available',
        metadata: [
            { label: 'YEAR', value: ren.year || 'TBD' },
            { label: 'SCOPE', value: 'TRACK MODIFICATION' },
        ]
    })) || []

    const documents = circuit.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Circuit Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            {mapLocations.length > 0 && (
                <MapGrid
                    id="CCT_MAP"
                    title="Circuit Location"
                    locations={mapLocations}
                    initialCenter={[mapLocations[0].lng, mapLocations[0].lat]}
                    initialZoom={12}
                />
            )}

            <HeroMedia
                id={circuit.basics?.identifiers?.code || `CCT-${circuit.id}`}
                title={circuit.name}
                meta={circuit.basics?.tagline || 'Technical Specifications'}
                image={coverImage}
                tags={[
                    circuit.details?.type || 'Circuit',
                    'Technical Specs'
                ]}
            />

            <StatsGrid
                id="CCT_STATS"
                title="Track Statistics"
                items={statsItems}
                columns={4}
            />

            {renovationPanels.length > 0 && (
                <ExpandableList
                    id="CCT_RENOVATIONS"
                    title="Renovation History"
                    panels={renovationPanels}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="CCT_DOCS"
                    title="Circuit Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}