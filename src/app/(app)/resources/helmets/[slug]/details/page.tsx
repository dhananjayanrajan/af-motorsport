import DirectoryList from '@/components/Section/DirectoryList'
import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import { Helmet, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getHelmet(slug: string): Promise<Helmet | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'helmets',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function HelmetDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const helmet = await getHelmet(slug)

    if (!helmet) {
        return notFound()
    }

    const coverImage = helmet.assets?.thumbnail && typeof helmet.assets.thumbnail === 'object'
        ? helmet.assets.thumbnail as Media
        : null

    const manufacturerItems = helmet.details?.manufacturers?.list?.map(man => ({
        id: man.id || `${helmet.id}-man-${man.name}`,
        title: man.name || 'Manufacturer',
        subtitle: man.description || undefined,
        tag: 'MANUFACTURER',
        timestamp: 'TBD',
        status: 'ACTIVE'
    })) || []

    const classificationPanels = helmet.details?.classifications?.list?.map(classif => ({
        id: classif.id || `${helmet.id}-class-${classif.name}`,
        title: classif.name || 'Classification',
        label: classif.criteria?.toUpperCase() || 'STANDARD',
        summary: classif.definition || 'Helmet classification',
        content: classif.description || 'No additional details',
        metadata: [
            { label: 'CRITERIA', value: classif.criteria || 'TBD' },
            { label: 'STANDARD', value: classif.definition || 'Industry standard' },
        ]
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={`HLM-${helmet.id}`}
                title={helmet.name}
                meta={helmet.basics?.tagline || 'Technical Specifications'}
                image={coverImage}
                tags={[
                    helmet.details?.usage || 'Helmet',
                    'Technical Details'
                ]}
            />

            {manufacturerItems.length > 0 && (
                <DirectoryList
                    id="HLM_MANUFACTURERS"
                    title="Manufacturers"
                    items={manufacturerItems}
                />
            )}

            {classificationPanels.length > 0 && (
                <ExpandableList
                    id="HLM_CLASSIFICATIONS"
                    title="Classifications"
                    panels={classificationPanels}
                />
            )}
        </main>
    )
}