import DirectoryGrid from '@/components/Section/DirectoryGrid'
import DocumentGrid from '@/components/Section/DocumentGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import MapGrid from '@/components/Section/MapGrid'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Media, Season, Series } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getSeries(slug: string): Promise<Series | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'series',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

async function getSeasonsForSeries(seriesId: number): Promise<Season[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'seasons',
        where: {
            'details.series': {
                equals: seriesId,
            },
        },
        limit: 20,
        sort: '-createdAt',
    })
    return docs
}

export default async function SeriesDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const series = await getSeries(slug)

    if (!series) {
        return notFound()
    }

    const coverImage = series.assets?.cover && typeof series.assets.cover === 'object'
        ? (series.assets.cover as Media)
        : null

    const seasons = await getSeasonsForSeries(series.id)

    const timelineEvents = []

    if (series.details?.start_date) {
        let status: 'completed' | 'upcoming' | 'active' | undefined = 'upcoming'
        if (new Date(series.details.start_date) <= new Date()) {
            status = 'completed'
        }

        timelineEvents.push({
            id: 'start',
            date: series.details.start_date,
            title: 'Series Inauguration',
            description: series.basics?.description || 'Series established',
            status: status
        })
    }

    if (series.details?.end_date) {
        let status: 'completed' | 'upcoming' | 'active' | undefined = 'upcoming'
        if (new Date(series.details.end_date) <= new Date()) {
            status = 'completed'
        }

        timelineEvents.push({
            id: 'end',
            date: series.details.end_date,
            title: 'Series Conclusion',
            description: 'Final season',
            status: status
        })
    }

    const seasonItems = seasons.map(season => {
        const thumbnail = season.assets?.cover && typeof season.assets.cover === 'object'
            ? season.assets.cover as Media
            : null

        return {
            id: season.id.toString(),
            title: season.name,
            subtitle: season.basics?.tagline || undefined,
            label: season.basics?.identifiers?.code || 'SEASON',
            image: thumbnail,
            href: `/competition/seasons/${season.slug}`,
            metadata: [
                { label: 'ENTRIES', value: season.details.entries?.toString() || 'TBD' },
                { label: 'RACES', value: season.details.races?.toString() || 'TBD' },
            ]
        }
    })

    const mapLocations = series.details?.location ? [{
        id: `${series.id}-location`,
        title: series.name,
        lat: series.details.location[1],
        lng: series.details.location[0],
        label: series.basics?.identifiers?.code || 'HQ',
        metadata: [
            { label: 'STATUS', value: series.details?.status || 'Active' },
            { label: 'ACCESS', value: series.details?.access || 'Public' },
        ]
    }] : []

    const documents = series.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Series Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={series.basics?.identifiers?.code || `SRS-${series.id}`}
                title={series.name}
                meta={series.basics?.tagline || 'Technical Specifications'}
                image={coverImage}
                tags={[
                    series.details?.status || 'Series',
                    'Technical Details'
                ]}
            />

            {timelineEvents.length > 0 && (
                <TimelineScroller
                    id="SRS_TIMELINE"
                    title="Series Timeline"
                    events={timelineEvents}
                />
            )}

            {seasonItems.length > 0 && (
                <DirectoryGrid
                    id="SRS_SEASONS"
                    title="Championship Seasons"
                    items={seasonItems}
                    variant="portrait"
                />
            )}

            {mapLocations.length > 0 && (
                <MapGrid
                    id="SRS_MAP"
                    title="Headquarters Location"
                    locations={mapLocations}
                    initialCenter={[mapLocations[0].lng, mapLocations[0].lat]}
                    initialZoom={10}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="SRS_DOCS"
                    title="Series Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}