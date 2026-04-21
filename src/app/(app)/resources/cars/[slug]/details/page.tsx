import DirectoryList from '@/components/Section/DirectoryList'
import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import StatsGrid from '@/components/Section/StatsGrid'
import { Car, Media, Organization } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getCar(slug: string): Promise<Car | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'cars',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function CarDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const car = await getCar(slug)

    if (!car) {
        return notFound()
    }

    const coverImage = car.assets?.cover && typeof car.assets.cover === 'object'
        ? car.assets.cover as Media
        : null

    const manufacturerItems = car.details?.manufacturers?.filter((m): m is Organization =>
        typeof m === 'object' && m !== null && 'name' in m
    ).map(man => ({
        id: man.id.toString(),
        title: man.name,
        subtitle: man.basics?.tagline || man.basics?.type || undefined,
        tag: 'MANUFACTURER',
        href: `/teams/${man.slug}`,
        timestamp: man.details?.founded?.split('-')[0] || 'TBD',
        status: man.basics?.industry?.split(' ')[0] || 'Automotive'
    })) || []

    const classificationPanels = car.details?.classifications?.list?.map(classif => ({
        id: classif.id || `${car.id}-class-${classif.name}`,
        title: classif.name || 'Classification',
        label: classif.criteria?.toUpperCase() || 'STANDARD',
        summary: classif.definition || 'Vehicle classification',
        content: classif.description || 'No additional details',
        metadata: [
            { label: 'CRITERIA', value: classif.criteria || 'TBD' },
            { label: 'STANDARD', value: classif.definition || 'Industry standard' },
        ]
    })) || []

    const specStats = car.details?.specifications?.list?.map(spec => ({
        label: spec.parameter?.toUpperCase() || 'Specification',
        value: spec.value || 'TBD',
        unit: '',
        description: spec.description || 'Technical parameter'
    })) || []

    if (specStats.length === 0) {
        specStats.push(
            { label: 'POWER', value: 'TBD', unit: 'HP', description: 'Engine output' },
            { label: 'WEIGHT', value: 'TBD', unit: 'KG', description: 'Vehicle mass' },
            { label: 'TOP SPEED', value: 'TBD', unit: 'KM/H', description: 'Maximum velocity' },
        )
    }

    const documents = car.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Car Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={car.basics?.identifiers?.chassis || car.basics?.identifiers?.model || `CAR-${car.id}`}
                title={car.name}
                meta={car.basics?.tagline || 'Technical Specifications'}
                image={coverImage}
                tags={[
                    car.details?.status || 'Car',
                    'Technical Details'
                ]}
            />

            {manufacturerItems.length > 0 && (
                <DirectoryList
                    id="CAR_MANUFACTURERS"
                    title="Manufacturers"
                    items={manufacturerItems}
                />
            )}

            {classificationPanels.length > 0 && (
                <ExpandableList
                    id="CAR_CLASSIFICATIONS"
                    title="Classifications"
                    panels={classificationPanels}
                />
            )}

            <StatsGrid
                id="CAR_SPECS_STATS"
                title="Technical Specifications"
                items={specStats}
                columns={3}
            />

            {documents.length > 0 && (
                <DocumentGrid
                    id="CAR_DOCS"
                    title="Vehicle Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}