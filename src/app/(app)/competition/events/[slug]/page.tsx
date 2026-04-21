import DirectoryList from '@/components/Section/DirectoryList'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import StatsGrid from '@/components/Section/StatsGrid'
import VideoCarousel from '@/components/Section/VideoCarousel'
import { Event, Media, Season } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getEvent(slug: string): Promise<Event | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'events',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function EventPage({ params }: PageProps) {
    const { slug } = await params
    const event = await getEvent(slug)

    if (!event) {
        return notFound()
    }

    const videoSlides = event.assets?.videos?.filter((video): video is Media =>
        typeof video === 'object' && video !== null && 'url' in video
    ).map(video => ({
        id: video.id.toString(),
        title: video.filename || 'Video',
        meta: 'EVENT COVERAGE',
        video: video,
        poster: video.thumbnailURL ? { url: video.thumbnailURL } as Media : video,
    })) || []

    const posterImage = event.assets?.poster && typeof event.assets.poster === 'object'
        ? (event.assets.poster as Media)
        : null

    const coverImage = event.assets?.cover && typeof event.assets.cover === 'object'
        ? (event.assets.cover as Media)
        : null

    const seasonName = event.details.season && typeof event.details.season === 'object'
        ? (event.details.season as Season).name
        : 'TBD'

    const infoBlocks = [
        {
            id: 'event-info',
            label: 'EVENT DETAILS',
            title: event.name,
            description: event.basics?.description || undefined,
            metadata: [
                { key: 'STATUS', value: event.details.status || 'Scheduled' },
                { key: 'ACCESS', value: event.details.access || 'Public' },
                { key: 'SEASON', value: seasonName },
            ]
        },
        {
            id: 'schedule',
            label: 'SCHEDULE',
            title: event.details.start_date ? 'DATES CONFIRMED' : 'TBD',
            description: 'Event timeframe',
            metadata: [
                { key: 'START DATE', value: event.details.start_date?.split('T')[0] || 'TBD' },
                { key: 'END DATE', value: event.details.end_date?.split('T')[0] || 'TBD' },
            ]
        },
    ]

    const historySteps = []

    if (event.details.start_date) {
        historySteps.push({
            id: 'opening',
            index: '01',
            heading: 'Event Start',
            subheading: event.details.start_date.split('T')[0],
            body: event.basics?.tagline || 'Race weekend begins',
            percentage: 100
        })
    }

    if (event.details.end_date) {
        historySteps.push({
            id: 'closing',
            index: '02',
            heading: 'Event Conclusion',
            subheading: event.details.end_date.split('T')[0],
            body: 'Final sessions complete',
            percentage: 100
        })
    }

    const statsItems = [
        {
            label: 'STATUS',
            value: event.details.status?.toUpperCase() || 'SCHEDULED',
            unit: '',
            description: 'Current event status'
        },
        {
            label: 'ACCESS',
            value: event.details.access?.toUpperCase() || 'PUBLIC',
            unit: '',
            description: 'Admission type'
        },
    ]

    const seasonListItem = event.details.season && typeof event.details.season === 'object'
        ? [{
            id: (event.details.season as Season).id.toString(),
            title: (event.details.season as Season).name,
            subtitle: (event.details.season as Season).basics?.tagline || undefined,
            tag: 'SEASON',
            href: `/competition/seasons/${(event.details.season as Season).slug}`,
            timestamp: (event.details.season as Season).createdAt.split('T')[0],
            status: (event.details.season as Season).details.entries ? `${(event.details.season as Season).details.entries} ENTRIES` : undefined
        }]
        : []

    return (
        <main className="w-full">
            {videoSlides.length > 0 && (
                <VideoCarousel
                    slides={videoSlides}
                    sectionTitle="EVENT_HIGHLIGHTS"
                />
            )}

            <InfoGrid
                id="EVT_SPECS"
                title="Event Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="EVT_HISTORY"
                    title="Event Timeline"
                    steps={historySteps}
                />
            )}

            {posterImage && (
                <HeroMedia
                    id={event.basics?.identifiers?.code || `EVT-${event.id}`}
                    title={event.name}
                    meta={event.basics?.tagline || 'Event Poster'}
                    image={posterImage}
                    tags={[
                        event.details.status || 'Event',
                        'Poster'
                    ]}
                />
            )}

            <StatsGrid
                id="EVT_STATS"
                title="Event Status"
                items={statsItems}
                columns={2}
            />

            {seasonListItem.length > 0 && (
                <DirectoryList
                    id="EVT_SEASON"
                    title="Championship Season"
                    items={seasonListItem}
                />
            )}
        </main>
    )
}