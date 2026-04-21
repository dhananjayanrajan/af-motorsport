import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import PullQuote from '@/components/Section/PullQuote'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Circuit, Country, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
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

export default async function CircuitPage({ params }: PageProps) {
    const { slug } = await params
    const circuit = await getCircuit(slug)

    if (!circuit) {
        return notFound()
    }

    const videoAsset = circuit.assets?.video && typeof circuit.assets.video === 'object'
        ? (circuit.assets.video as Media)
        : null

    const posterAsset = circuit.assets?.thumbnail && typeof circuit.assets.thumbnail === 'object'
        ? (circuit.assets.thumbnail as Media)
        : null

    const countryName = circuit.details?.country && typeof circuit.details.country === 'object'
        ? (circuit.details.country as Country).name
        : 'TBD'

    const infoBlocks = [
        {
            id: 'specs',
            label: 'TECHNICAL SPECS',
            title: circuit.details?.type?.toUpperCase() || 'PERMANENT',
            description: circuit.basics?.description || undefined,
            metadata: [
                { key: 'LENGTH', value: circuit.details?.length_km ? `${circuit.details.length_km} KM` : 'TBD' },
                { key: 'TURNS', value: circuit.details?.turns?.toString() || 'TBD' },
                { key: 'DIRECTION', value: circuit.details?.direction?.toUpperCase() || 'CLOCKWISE' },
                { key: 'FIA GRADE', value: circuit.details?.fia_grade || 'TBD' },
            ]
        },
        {
            id: 'location',
            label: 'LOCATION',
            title: countryName,
            description: circuit.details?.address || undefined,
            metadata: [
                { key: 'CAPACITY', value: circuit.details?.capacity?.toLocaleString() || 'TBD' },
                { key: 'OPENED', value: circuit.details?.opened || 'TBD' },
                { key: 'ELEVATION', value: circuit.details?.elevation_change ? `${circuit.details.elevation_change}M` : 'TBD' },
            ]
        },
    ]

    const historySteps = []

    if (circuit.details?.opened) {
        historySteps.push({
            id: 'opened',
            index: '01',
            heading: 'Inauguration',
            subheading: circuit.details.opened,
            body: circuit.basics?.description || 'Circuit established',
            percentage: 100
        })
    }

    if (circuit.metrics?.record_lap_time) {
        const driverName = circuit.metrics.record_lap_driver && typeof circuit.metrics.record_lap_driver === 'object'
            ? `${(circuit.metrics.record_lap_driver as { first_name: string; last_name: string }).first_name} ${(circuit.metrics.record_lap_driver as { first_name: string; last_name: string }).last_name}`
            : 'TBD'

        historySteps.push({
            id: 'record',
            index: '02',
            heading: 'Lap Record',
            subheading: circuit.metrics.record_lap_time,
            body: driverName,
            percentage: 100
        })
    }

    const galleryItems = circuit.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: circuit.basics?.identifiers?.code || 'CIRCUIT'
    })) || []

    return (
        <main className="w-full">
            <VideoPlayer
                id={circuit.basics?.identifiers?.code || `CCT-${circuit.id}`}
                title={circuit.name}
                meta={circuit.basics?.tagline || 'Racing Circuit'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    circuit.details?.type || 'Circuit',
                    circuit.details?.direction || 'Clockwise'
                ]}
            />

            <InfoGrid
                id="CCT_SPECS"
                title="Circuit Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            <PullQuote
                id="CCT_QUOTE"
                title="Circuit Statement"
                quote={circuit.basics?.tagline || circuit.basics?.description || 'Legendary racing venue'}
                attribution={circuit.name}
                role={circuit.details?.type?.toUpperCase() || 'RACING CIRCUIT'}
                variant="center"
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="CCT_HISTORY"
                    title="Circuit History"
                    steps={historySteps}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="CCT_GALLERY"
                    title="Circuit Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/competition/circuits/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Technical Details →
                </Link>
            </section>
        </main>
    )
}