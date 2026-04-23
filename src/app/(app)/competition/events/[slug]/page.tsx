// app/(frontend)/competition/events/[slug]/page.tsx
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

const getEventData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'events',
            where: { slug: { equals: slug } },
            limit: 1,
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
    if (event.assets?.videos) {
        event.assets.videos.forEach((video, idx) => {
            const media = typeof video === 'object' ? video : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                videoSlides.push({
                    id: String(media.id),
                    title: media.alt || `Video ${idx + 1}`,
                    description: event.basics?.tagline || undefined,
                    image: event.assets?.poster ? getMediaUrl(event.assets.poster) : event.assets?.thumbnail ? getMediaUrl(event.assets.thumbnail) : `https://picsum.photos/seed/${event.slug}-${idx}/800/600`,
                    ctaLabel: 'Watch',
                    ctaHref: url,
                })
            }
        })
    }

    const studyImage = event.assets?.cover
        ? getMediaUrl(event.assets.cover)
        : event.assets?.poster
            ? getMediaUrl(event.assets.poster)
            : event.assets?.thumbnail
                ? getMediaUrl(event.assets.thumbnail)
                : undefined

    const study = {
        id: String(event.id),
        title: event.name,
        description: event.basics?.description || event.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${event.slug}/800/600`,
        metrics: [
            { label: 'Status', value: event.details?.status || 'N/A' },
            { label: 'Access', value: event.details?.access || 'N/A' },
            { label: 'Start', value: event.details?.start_date ? new Date(event.details.start_date).toLocaleDateString() : 'TBD' },
            { label: 'End', value: event.details?.end_date ? new Date(event.details.end_date).toLocaleDateString() : 'TBD' },
        ],
    }

    const scrollItems: any[] = []
    if (event.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Event History',
            description: event.basics?.description || 'A premier racing event.',
            percentage: 100,
        })
    }
    if (event.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'Event Notes',
            description: event.details.notes,
            percentage: 75,
        })
    }

    const heroBackgroundImage = event.assets?.cover
        ? getMediaUrl(event.assets.cover)
        : event.seo?.image
            ? getMediaUrl(event.seo.image)
            : undefined

    const specItems: any[] = [
        {
            id: 'status',
            title: 'Status',
            subtitle: event.details?.status || 'N/A',
        },
        {
            id: 'access',
            title: 'Access',
            subtitle: event.details?.access || 'N/A',
        },
        {
            id: 'code',
            title: 'Event Code',
            subtitle: event.basics?.identifiers?.code || 'N/A',
        },
        {
            id: 'location',
            title: 'Location',
            subtitle: event.details?.location ? `${event.details.location[0]}, ${event.details.location[1]}` : 'N/A',
        },
    ]

    const seasonEntries: any[] = []
    if (event.details.season) {
        const season = event.details.season
        if (typeof season === 'object' && 'name' in season) {
            seasonEntries.push({
                id: String(season.id),
                title: season.name,
                subtitle: season.basics?.tagline || undefined,
                status: season.basics?.identifiers?.code || undefined,
                href: `/competition/seasons/${season.slug}`,
            })
        }
    }

    return (
        <main className="w-full">
            {videoSlides.length > 0 && (
                <CarouselSection
                    id="event-videos"
                    title="Event Videos"
                    subtitle={event.name}
                    slides={videoSlides}
                    variant="card"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="event-details"
                title="Event Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="event-history"
                    title="History & Notes"
                    subtitle="Event background"
                    items={scrollItems}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <HeroSection
                id="event-cover"
                title={event.name}
                subtitle={event.basics?.tagline || ''}
                description={event.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={event.details?.status || undefined}
            />
            <GridSection
                id="event-specifications"
                title="Specifications"
                subtitle="Event details"
                items={specItems}
                columns={4}
                cardVariant={1}
                headerVariant={3}
                footerVariant={2}
            />
            {seasonEntries.length > 0 && (
                <ListSection
                    id="event-season"
                    title="Season"
                    subtitle="Part of championship season"
                    entries={seasonEntries}
                    variant="detailed"
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}