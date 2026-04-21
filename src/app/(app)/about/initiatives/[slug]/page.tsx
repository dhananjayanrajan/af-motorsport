import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import MapGrid from '@/components/Section/MapGrid'
import PullQuote from '@/components/Section/PullQuote'
import { Initiative, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getInitiative(slug: string): Promise<Initiative | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'initiatives',
        where: {
            slug: {
                equals: slug,
            },
        },
    })
    return docs[0] || null
}

export default async function InitiativePage({ params }: PageProps) {
    const { slug } = await params
    const initiative = await getInitiative(slug)

    if (!initiative) {
        return notFound()
    }

    const coverImage = initiative.assets?.cover && typeof initiative.assets.cover === 'object'
        ? (initiative.assets.cover as Media)
        : null

    const infoBlocks = [
        {
            id: 'timeline',
            label: 'TIMEFRAME',
            title: initiative.details?.start_date ? 'ACTIVE' : 'PENDING',
            description: initiative.basics?.description || undefined,
            metadata: [
                { key: 'START DATE', value: initiative.details?.start_date || 'TBD' },
                { key: 'END DATE', value: initiative.details?.end_date || 'TBD' },
            ]
        },
        {
            id: 'mission',
            label: 'CORE OBJECTIVE',
            title: initiative.basics?.mission?.toUpperCase() || 'MISSION PENDING',
            description: initiative.basics?.tagline || undefined,
            metadata: []
        },
    ]

    const mapLocations = initiative.details?.locations ? [{
        id: `${initiative.id}-location`,
        title: initiative.name,
        lat: initiative.details.locations[1],
        lng: initiative.details.locations[0],
        label: initiative.basics?.tagline || 'Location',
        metadata: [
            { label: 'START', value: initiative.details?.start_date || 'TBD' },
            { label: 'END', value: initiative.details?.end_date || 'TBD' },
        ]
    }] : []

    const expectationPanels = initiative.details?.expectations?.list?.map(exp => ({
        id: exp.id || `${initiative.id}-exp-${exp.name}`,
        title: exp.name || 'Expectation',
        label: exp.type?.toUpperCase() || 'REQUIREMENT',
        summary: exp.criteria || 'No criteria specified',
        content: exp.statement || 'No additional details available',
        metadata: [
            { label: 'TYPE', value: exp.type?.toUpperCase() || 'STANDARD' },
            { label: 'CRITERIA', value: exp.criteria || 'NOT DEFINED' },
        ]
    })) || []

    const documents = initiative.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Initiative Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={`INT-${initiative.id}`}
                title={initiative.name}
                meta={initiative.basics?.tagline || 'Community Initiative'}
                image={coverImage}
                tags={[
                    'Initiative',
                    initiative.details?.start_date ? 'Active' : 'Planning'
                ]}
            />

            <InfoGrid
                id="INT_SPECS"
                title="Initiative Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            <PullQuote
                id="INT_MISSION"
                title="Mission Statement"
                quote={initiative.basics?.mission || initiative.basics?.description || 'Mission statement pending'}
                attribution={initiative.basics?.tagline || 'Initiative'}
                variant="center"
            />

            {mapLocations.length > 0 && (
                <MapGrid
                    id="INT_LOCATION"
                    title="Geographic Footprint"
                    locations={mapLocations}
                    initialCenter={[mapLocations[0].lng, mapLocations[0].lat]}
                    initialZoom={12}
                />
            )}

            {expectationPanels.length > 0 && (
                <ExpandableList
                    id="INT_EXPECTATIONS"
                    title="Expectations & Requirements"
                    panels={expectationPanels}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="INT_DOCS"
                    title="Supporting Documents"
                    documents={documents}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/about/initiatives/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Details →
                </Link>
            </section>
        </main>
    )
}