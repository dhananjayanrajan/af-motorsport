import CollapsibleGrid from '@/components/Section/CollapsibleGrid'
import DirectoryList from '@/components/Section/DirectoryList'
import DocumentGrid from '@/components/Section/DocumentGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import { Garage, Media, Organization } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getGarage(slug: string): Promise<Garage | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'garages',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function GarageDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const garage = await getGarage(slug)

    if (!garage) {
        return notFound()
    }

    const coverImage = garage.assets?.cover && typeof garage.assets.cover === 'object'
        ? garage.assets.cover as Media
        : null

    const amenityItems = garage.details?.amenities?.list?.map(amenity => ({
        id: amenity.id || `${garage.id}-amen-${amenity.name}`,
        title: amenity.name || 'Amenity',
        subtitle: amenity.description || undefined,
        content: amenity.description || 'Standard amenity',
        label: 'FACILITY'
    })) || []

    const operatorItems = garage.details?.operators?.filter((op): op is Organization =>
        typeof op === 'object' && op !== null && 'name' in op
    ).map(op => ({
        id: op.id.toString(),
        title: op.name,
        subtitle: op.basics?.tagline || op.basics?.type || undefined,
        tag: 'OPERATOR',
        href: `/teams/${op.slug}`,
        timestamp: op.details?.founded?.split('-')[0] || 'TBD',
        status: op.basics?.industry?.split(' ')[0] || 'Service Provider'
    })) || []

    const documents = garage.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Garage Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={garage.basics?.identifiers?.code || `GRG-${garage.id}`}
                title={garage.name}
                meta={garage.basics?.tagline || 'Technical Specifications'}
                image={coverImage}
                tags={[
                    garage.details?.type || 'Garage',
                    'Technical Details'
                ]}
            />

            {amenityItems.length > 0 && (
                <CollapsibleGrid
                    id="GRG_AMENITIES"
                    title="Facility Amenities"
                    items={amenityItems}
                    columns={2}
                />
            )}

            {operatorItems.length > 0 && (
                <DirectoryList
                    id="GRG_OPERATORS"
                    title="Operators"
                    items={operatorItems}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="GRG_DOCS"
                    title="Facility Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}