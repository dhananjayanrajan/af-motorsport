import DirectoryGrid from '@/components/Section/DirectoryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import StatsGrid from '@/components/Section/StatsGrid'
import { Media, Season, Series } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getSeason(slug: string): Promise<Season | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'seasons',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function SeasonDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const season = await getSeason(slug)

    if (!season) {
        return notFound()
    }

    const coverImage = season.assets?.cover && typeof season.assets.cover === 'object'
        ? (season.assets.cover as Media)
        : null

    const statsItems = [
        {
            label: 'ENTRIES',
            value: season.details.entries?.toString() || '0',
            unit: 'TEAMS',
            description: 'Registered competitors'
        },
        {
            label: 'RACES',
            value: season.details.races?.toString() || '0',
            unit: 'EVENTS',
            description: 'Scheduled races'
        },
        {
            label: 'STATUS',
            value: season.details.entries ? 'ACTIVE' : 'PENDING',
            unit: '',
            description: 'Season status'
        },
    ]

    let seriesImage: Media | null = null
    const seriesObj = season.details.series
    if (seriesObj && typeof seriesObj === 'object' && 'assets' in seriesObj) {
        const seriesAsset = (seriesObj as Series).assets?.thumbnail
        if (seriesAsset && typeof seriesAsset === 'object') {
            seriesImage = seriesAsset as Media
        }
    }

    const seriesItem = seriesObj && typeof seriesObj === 'object'
        ? [{
            id: (seriesObj as Series).id.toString(),
            title: (seriesObj as Series).name,
            subtitle: (seriesObj as Series).basics?.tagline || undefined,
            label: (seriesObj as Series).basics?.identifiers?.code || 'SERIES',
            image: seriesImage,
            href: `/competition/series/${(seriesObj as Series).slug}`,
            metadata: [
                { label: 'STATUS', value: (seriesObj as Series).details?.status || 'Active' },
            ]
        }]
        : []

    return (
        <main className="w-full">
            <HeroMedia
                id={season.basics?.identifiers?.code || `SSN-${season.id}`}
                title={season.name}
                meta={season.basics?.tagline || 'Technical Specifications'}
                image={coverImage}
                tags={[
                    'Season',
                    'Details'
                ]}
            />

            <StatsGrid
                id="SSN_STATS"
                title="Season Statistics"
                items={statsItems}
                columns={3}
            />

            {seriesItem.length > 0 && (
                <DirectoryGrid
                    id="SSN_SERIES"
                    title="Parent Series"
                    items={seriesItem}
                    variant="square"
                />
            )}
        </main>
    )
}