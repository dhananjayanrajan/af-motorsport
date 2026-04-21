import GalleryGrid from '@/components/Section/GalleryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import StatsGrid from '@/components/Section/StatsGrid'
import { Event, Media, Race, Season, Series } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getRace(slug: string): Promise<Race | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'races',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function RaceDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const race = await getRace(slug)

    if (!race) {
        return notFound()
    }

    const coverImage = race.assets?.cover && typeof race.assets.cover === 'object'
        ? (race.assets.cover as Media)
        : null

    const statsItems = [
        {
            label: 'LAPS',
            value: race.details.laps?.toString() || 'TBD',
            unit: 'LAPS',
            description: 'Total race distance'
        },
        {
            label: 'DISTANCE',
            value: race.details.distance_km?.toString() || 'TBD',
            unit: 'KM',
            description: 'Race length'
        },
        {
            label: 'SAFETY CAR',
            value: race.details.safety_car_periods?.toString() || '0',
            unit: 'PERIODS',
            description: 'Safety car deployments'
        },
        {
            label: 'RED FLAGS',
            value: race.details.red_flags?.toString() || '0',
            unit: 'FLAGS',
            description: 'Race stoppages'
        },
    ]

    const eventName = race.details.event && typeof race.details.event === 'object'
        ? (race.details.event as Event).name
        : 'TBD'

    const seasonName = race.details.season && typeof race.details.season === 'object'
        ? (race.details.season as Season).name
        : 'TBD'

    const seriesName = race.details.series && typeof race.details.series === 'object'
        ? (race.details.series as Series).name
        : 'TBD'

    const competitionBlocks = [
        {
            id: 'event',
            label: 'EVENT',
            title: eventName,
            description: 'Parent event',
            metadata: [
                { key: 'SEASON', value: seasonName },
                { key: 'SERIES', value: seriesName },
            ]
        },
        {
            id: 'weather',
            label: 'CONDITIONS',
            title: race.details.weather?.toUpperCase() || 'TBD',
            description: 'Track conditions during race',
            metadata: [
                { key: 'FASTEST LAP', value: race.details.fastest_lap_time || 'TBD' },
            ]
        },
    ]

    const highlightItems = race.assets?.highlights?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Highlight',
        category: 'RACE HIGHLIGHT'
    })) || []

    const documentItems = race.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id.toString(),
        image: doc,
        title: doc.filename || 'Document',
        category: 'RACE DOCUMENT'
    })) || []

    const allMediaItems = [...highlightItems, ...documentItems]

    return (
        <main className="w-full">
            <HeroMedia
                id={race.basics?.identifiers?.code || `RCE-${race.id}`}
                title={race.name}
                meta={race.basics?.tagline || 'Race Details'}
                image={coverImage}
                tags={[
                    race.details.type || 'Race',
                    race.details.status || 'Scheduled'
                ]}
            />

            <StatsGrid
                id="RCE_STATS"
                title="Race Statistics"
                items={statsItems}
                columns={4}
            />

            <InfoGrid
                id="RCE_COMPETITION"
                title="Competition Information"
                blocks={competitionBlocks}
                columns={2}
            />

            {allMediaItems.length > 0 && (
                <GalleryGrid
                    id="RCE_MEDIA"
                    title="Highlights & Documents"
                    items={allMediaItems}
                />
            )}
        </main>
    )
}