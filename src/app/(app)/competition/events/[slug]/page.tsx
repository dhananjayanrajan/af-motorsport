import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getEventData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'events',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                    description: true,
                    identifiers: { code: true }
                },
                assets: {
                    videos: true,
                    poster: true,
                    thumbnail: true,
                    cover: true
                },
                details: {
                    status: true,
                    access: true,
                    start_date: true,
                    end_date: true,
                    history: true,
                    notes: true,
                    location: true,
                    season: true
                },
                seo: {
                    image: true
                }
            }
        })
        return result.docs[0] || null
    },
    ['event-detail'],
    { revalidate: 3600, tags: ['event'] }
)

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const event = await getEventData(slug)

    if (!event) notFound()

    const videoSlides: any[] = []
    if (event.assets?.videos && Array.isArray(event.assets.videos)) {
        event.assets.videos.forEach((video, idx) => {
            const url = getMediaUrl(video)
            if (url) {
                videoSlides.push({
                    id: String(typeof video === 'object' ? video.id : idx),
                    title: (typeof video === 'object' && video.alt) || 'Race Video',
                    description: event.basics?.tagline || 'Event Highlight',
                    image: resolveAssetUrl(event.assets, 'poster', 'thumbnail') || '',
                    ctaLabel: 'Watch',
                    ctaHref: url,
                })
            }
        })
    }

    const studyImage = resolveAssetUrl(event.assets, 'cover', 'poster', 'thumbnail')

    const study = {
        id: String(event.id),
        title: event.name,
        description: event.basics?.description || event.basics?.tagline || '',
        image: studyImage || '',
        metrics: [
            { label: 'Status', value: (event.details?.status || 'Pending').toUpperCase() },
            { label: 'Access', value: (event.details?.access || 'Public').toUpperCase() },
            { label: 'Starts', value: event.details?.start_date ? new Date(event.details.start_date).toLocaleDateString() : 'TBD' },
            { label: 'Ends', value: event.details?.end_date ? new Date(event.details.end_date).toLocaleDateString() : 'TBD' },
        ],
    }

    const scrollItems: any[] = []
    if (event.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Event History',
            description: 'Background and records for this racing event.',
            content: event.details.history,
            percentage: 100,
        })
    }
    if (event.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'Staff Notes',
            description: 'Administrative notations.',
            content: event.details.notes,
            percentage: 75,
        })
    }

    const heroBackgroundImage = resolveAssetUrl(event.assets, 'cover') || getMediaUrl(event.seo?.image)

    const specItems: any[] = [
        {
            id: 'status',
            title: 'Current Status',
            subtitle: (event.details?.status || 'N/A').toUpperCase(),
        },
        {
            id: 'access',
            title: 'Entry Type',
            subtitle: (event.details?.access || 'N/A').toUpperCase(),
        },
        {
            id: 'code',
            title: 'Event Code',
            subtitle: event.basics?.identifiers?.code || 'N/A',
        },
        {
            id: 'location',
            title: 'Map Location',
            subtitle: event.details?.location ? `${event.details.location[0]}, ${event.details.location[1]}` : 'N/A',
        },
    ]

    const seasonEntries: any[] = []
    if (event.details?.season && typeof event.details.season === 'object') {
        const season = event.details.season as any
        seasonEntries.push({
            id: String(season.id),
            title: (season.name || 'Current Season').toUpperCase(),
            subtitle: season.basics?.tagline || 'Championship details',
            status: season.basics?.identifiers?.code || 'ID',
            href: `/competition/seasons/${season.slug}`,
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="event-cover"
                title={event.name}
                subtitle="Race Event"
                description={event.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={event.details?.status || 'Live'}
            />
            <StudySection
                id="event-details"
                title="Event Details"
                subtitle="Overview and key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {videoSlides.length > 0 && (
                <CarouselSection
                    id="event-videos"
                    slides={videoSlides}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="event-history"
                    title="Background"
                    subtitle="History and additional notes"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'Part',
                        progressLabel: 'Progress',
                        statusComplete: 'Read',
                    }}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <GridSection
                id="event-specifications"
                title="Information"
                subtitle="Specific details and locations"
                items={specItems}
                labels={{
                    unitsCount: 'Details',
                    viewProject: 'View',
                    sectionIndex: 'Ref',
                    fallbackAlt: 'Item',
                }}
                columns={4}
            />
            {seasonEntries.length > 0 && (
                <ListSection
                    id="event-season"
                    title="Season"
                    subtitle="Related championship season"
                    entries={seasonEntries}
                    labels={{
                        statusPrefix: 'Code',
                        timePrefix: 'Date',
                        indexPrefix: 'Sea',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
        </main>
    )
}