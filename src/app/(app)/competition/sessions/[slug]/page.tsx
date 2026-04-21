import CardCarousel from '@/components/Section/CardCarousel'
import GalleryGrid from '@/components/Section/GalleryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import ProgressScroller from '@/components/Section/ProgressScroller'
import StatsGrid from '@/components/Section/StatsGrid'
import VideoCarousel from '@/components/Section/VideoCarousel'
import { Entry, Media, Session } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getSession(slug: string): Promise<Session | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'sessions',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

async function getEntriesForSession(sessionId: number): Promise<Entry[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'entries',
        where: {
            'details.session': {
                equals: sessionId,
            },
        },
        limit: 20,
    })
    return docs
}

export default async function SessionPage({ params }: PageProps) {
    const { slug } = await params
    const session = await getSession(slug)

    if (!session) {
        return notFound()
    }

    const videoSlides = session.assets?.videos?.filter((video): video is Media =>
        typeof video === 'object' && video !== null && 'url' in video
    ).map(video => ({
        id: video.id.toString(),
        title: video.filename || 'Video',
        meta: 'SESSION COVERAGE',
        video: video,
        poster: video.thumbnailURL ? { url: video.thumbnailURL } as Media : video,
    })) || []

    const thumbnailImage = session.assets?.thumbnail && typeof session.assets.thumbnail === 'object'
        ? (session.assets.thumbnail as Media)
        : null

    const historySteps = []

    if (session.metrics?.quantifiers?.laps) {
        historySteps.push({
            id: 'laps',
            index: '01',
            heading: 'Total Laps',
            subheading: `${session.metrics.quantifiers.laps} Laps`,
            body: session.metrics.quantifiers.specification || 'Session length',
            percentage: 100
        })
    }

    if (session.metrics?.quantifiers?.duration) {
        historySteps.push({
            id: 'duration',
            index: '02',
            heading: 'Duration',
            subheading: `${session.metrics.quantifiers.duration} Minutes`,
            body: 'Session runtime',
            percentage: 100
        })
    }

    if (session.metrics?.quantifiers?.distance) {
        historySteps.push({
            id: 'distance',
            index: '03',
            heading: 'Distance',
            subheading: `${session.metrics.quantifiers.distance} KM`,
            body: 'Total covered distance',
            percentage: 100
        })
    }

    const statsItems = [
        {
            label: 'ACCESS',
            value: session.details?.access?.toUpperCase() || 'PUBLIC',
            unit: '',
            description: 'Session accessibility'
        },
        {
            label: 'SEGMENT',
            value: session.basics?.segment?.toUpperCase() || 'SESSION',
            unit: '',
            description: 'Session type'
        },
    ]

    const entries = await getEntriesForSession(session.id)

    const entryCards = entries.map(entry => ({
        id: entry.id.toString(),
        title: entry.name,
        category: entry.details.status || 'Entered',
        label: entry.basics?.identifiers?.number || 'ENTRY',
        href: `/competition/entries/${entry.slug}`,
        image: entry.assets?.thumbnail && typeof entry.assets.thumbnail === 'object'
            ? entry.assets.thumbnail as Media
            : null,
        stats: [
            { label: 'GRID', value: entry.details.grid_position?.toString() || 'TBD' },
            { label: 'START', value: entry.details.start_position?.toString() || 'TBD' },
            { label: 'FINISH', value: entry.details.finish_position?.toString() || 'TBD' },
        ]
    }))

    const galleryItems = session.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: session.basics?.segment?.toUpperCase() || 'SESSION'
    })) || []

    return (
        <main className="w-full">
            {videoSlides.length > 0 && (
                <VideoCarousel
                    slides={videoSlides}
                    sectionTitle="SESSION_HIGHLIGHTS"
                />
            )}

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="SES_HISTORY"
                    title="Session Metrics"
                    steps={historySteps}
                />
            )}

            {thumbnailImage && (
                <HeroMedia
                    id={session.basics?.identifiers?.code || `SES-${session.id}`}
                    title={session.name}
                    meta={session.basics?.description || 'Race Session'}
                    image={thumbnailImage}
                    tags={[
                        session.basics?.segment || 'Session',
                        session.details?.access || 'Public'
                    ]}
                />
            )}

            <StatsGrid
                id="SES_STATS"
                title="Session Information"
                items={statsItems}
                columns={2}
            />

            {entryCards.length > 0 && (
                <CardCarousel
                    cards={entryCards}
                    sectionTitle="ENTRY_LIST"
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="SES_GALLERY"
                    title="Session Gallery"
                    items={galleryItems}
                />
            )}
        </main>
    )
}